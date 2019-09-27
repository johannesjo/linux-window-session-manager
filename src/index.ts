'use strict';
import {CFG, SESSION_DATA_DIR} from './config';
import * as Store from 'jfs';
import * as fs from 'fs';
import {getActiveWindowList, getConnectedDisplaysId, startProgram} from './otherCmd';
import {closeWindow, goToWorkspace, restoreWindowPosition, X} from './x11Wrapper';
import {findDesktopFile, getActiveWindowListFlow, goToFirstWorkspace} from './metaWrapper';

const waterfall = require('promise-waterfall');


CFG();


// create data store
const db = new Store(SESSION_DATA_DIR, {pretty: CFG().SAVE_SESSION_IN_PRETTY_FORMAT});


// setup meta wrapper

// EXPORT
// ------
export default {
    listSessions,
    renameSession,
    saveSession,
    removeSession,
    restoreSession,
    getSessions,
    X: X,


    getConnectedDisplaysId,
    resetCfg: () => {
        const configFilePath = CFG().DATA_DIR + '/config.json';
        if (fs.existsSync(configFilePath)) {
            fs.unlinkSync(configFilePath);
        } else {
            console.error('No Config present in ' + configFilePath);
        }
    },
    getCfg: () => {
        return CFG();
    },
    getDb: () => {
        return db;
    }
};

// HELPER
// --------
function _catchGenericErr(err) {
    console.error('Generic Error in Main Handler', err, err.stack);
    throw err;
}

function getSessions() {
    return db.allSync();
}

// MAIN FUNCTIONS
// --------------
function listSessions() {
    let list = Object.keys(getSessions());
    list.forEach((name) => {
        console.log(name);
    });
}

function renameSession(oldName, newName) {
    let obj = db.getSync(oldName);
    if (obj.message) {
        if (obj.message === 'could not load data') {
            console.log(`Error: Could not find a session named '${oldName}'`);
        } else {
            console.log(obj.message);
        }
        return;
    }
    db.saveSync(newName, obj);
    db.delete(oldName);
}

function saveSession(sessionName, inputHandlers) {
    const sessionToHandle = sessionName || 'DEFAULT';

    return getActiveWindowList()
        .then((windowList) => {
            // desktop file paths and connected display ids
            return Promise.all([
                _guessAndSetDesktopFilePaths(windowList, inputHandlers.desktopFilePath),
                getConnectedDisplaysId(),
            ]);
        })
        .then((results) => {
            const windowList = results[0];
            const connectedDisplaysId = results[1];
            return saveSessionForDisplayToDb(sessionToHandle, connectedDisplaysId, windowList);
        })
        .catch((err) => {
            console.error('saveSession(): An error occurred', err);
            throw err;
        });
}

function saveSessionForDisplayToDb(sessionToHandle, connectedDisplaysId, windowList) {
    return new Promise((fulfill, reject) => {
        // check if entry exists and update
        db.get(sessionToHandle, (err, sessionData) => {
            if (err) {
                // NOTE: we're not failing because, the case is probably that there is no session file yet
                console.log(`saveSessionForDisplayToDb: no session file present yet for "${sessionToHandle}", creating a new one...`);
            }

            if (!sessionData) {
                // create new object
                sessionData = {
                    name: sessionToHandle,
                };
            }
            if (!sessionData.displaysCombinations || !Array.isArray(sessionData.displaysCombinations)) {
                // create new array
                sessionData.displaysCombinations = [];
            }

            const existingDisplayEntry = sessionData.displaysCombinations.find((entry) => entry.id === connectedDisplaysId);
            if (existingDisplayEntry) {
                existingDisplayEntry.windowList = windowList;
            } else {
                sessionData.displaysCombinations.push({
                    id: connectedDisplaysId,
                    windowList,
                });
            }

            db.save(sessionToHandle, sessionData, (err) => {
                if (err) {
                    reject(err);
                } else {
                    console.log('SAVED SESSION: ' + sessionToHandle);
                    fulfill();
                }
            });
        });
    });
}

function restoreSession(sessionName, isCloseAllOpenWindows) {
    const sessionToHandle = sessionName || 'DEFAULT';

    return new Promise((fulfill, reject) => {
        db.get(sessionToHandle || 'DEFAULT', (err, sessionData) => {
            if (err) {
                reject(err);
                return;
            }

            let savedWindowList;

            _closeAllWindowsIfSet(isCloseAllOpenWindows)
                .then(goToFirstWorkspace)
                .then(getConnectedDisplaysId)
                .then((connectedDisplaysId) => {
                    if (!sessionData.displaysCombinations) {
                        console.error(`no display combinations saved yet`);
                        return;
                    }

                    const displayEntry = sessionData.displaysCombinations.find((entry) => entry.id === connectedDisplaysId);

                    if (displayEntry) {
                        savedWindowList = displayEntry.windowList;
                    } else {
                        console.error(`no data for current display id '${connectedDisplaysId}' saved yet`);
                        return;
                    }
                    return getActiveWindowListFlow();
                })
                .then((currentWindowList) => {
                    return _startSessionPrograms(savedWindowList, currentWindowList);
                })
                .then(() => {
                    // gets current window list by itself and returns the updated variant
                    return _waitForAllAppsToStart(savedWindowList);
                })
                .then((updatedCurrentWindowList) => {
                    _updateWindowIds(savedWindowList, updatedCurrentWindowList);
                    return _restoreWindowPositions(savedWindowList);
                })
                .then(() => {
                    console.log('RESTORED SESSION: ' + sessionToHandle);
                })
                .catch((err) => {
                    console.error('An error occurred', err);
                    reject(err);
                })
                .then(fulfill);
        });
    }).catch(_catchGenericErr);
}

function removeSession(sessionName) {
    return new Promise((fulfill, reject) => {
        fs.unlink(CFG().SESSION_DATA_DIR + '/' + sessionName + '.json', (error) => {
            if (error) {
                console.error(error);
                reject(error);
            } else {
                fulfill();
            }
        });
    }).catch(_catchGenericErr);
}

function _closeAllWindowsIfSet(isCloseAll) {
    return new Promise((fulfill, reject) => {
        if (isCloseAll) {
            console.log('Closing opened applications');
            getActiveWindowListFlow()
                .then((currentWindowList: any[]) => {
                    currentWindowList.forEach((win) => {
                        closeWindow(win.windowId);
                    });

                    _waitForAllAppsToClose()
                        .then(fulfill)
                        .catch(reject);
                })
                .catch(reject);
        } else {
            fulfill();
        }
    }).catch(_catchGenericErr);
}

function _waitForAllAppsToClose() {
    let totalTimeWaited = 0;
    return new Promise((fulfill, reject) => {
        function pollAllAppsClosed() {
            setTimeout(() => {
                getActiveWindowListFlow()
                    .then((currentWindowList: any[]) => {
                        totalTimeWaited += CFG().POLL_ALL_APPS_STARTED_INTERVAL;
                        if (currentWindowList.length !== 0) {
                            if (totalTimeWaited > CFG().POLL_ALL_MAX_TIMEOUT) {
                                console.error('POLL_ALL_MAX_TIMEOUT reached');
                                reject('POLL_ALL_MAX_TIMEOUT reached');
                            } else {
                                // call recursively
                                pollAllAppsClosed();
                            }
                        } else {
                            fulfill(currentWindowList);
                        }
                    })
                    .catch(reject);
                ;
            }, CFG().POLL_ALL_APPS_STARTED_INTERVAL);
        }

        // start once initially
        pollAllAppsClosed();
    }).catch(_catchGenericErr);
}

function _waitForAllAppsToStart(savedWindowList) {
    console.log('Wait for all applications to start');

    let totalTimeWaited = 0;
    let timeout;

    return new Promise((fulfill, reject) => {
        function pollAllAppsStarted(savedWindowList) {
            timeout = setTimeout(() => {
                // clear timeout to be save
                if (timeout) {
                    clearTimeout(timeout);
                }

                getActiveWindowListFlow()
                    .then((currentWindowList) => {
                        totalTimeWaited += CFG().POLL_ALL_APPS_STARTED_INTERVAL;
                        if (!_isAllAppsStarted(savedWindowList, currentWindowList)) {
                            if (totalTimeWaited > CFG().POLL_ALL_MAX_TIMEOUT) {
                                console.error('POLL_ALL_MAX_TIMEOUT reached');
                                console.error('Unable to start the following apps', _getNotStartedApps(savedWindowList, currentWindowList));
                                reject('POLL_ALL_MAX_TIMEOUT reached');
                            } else {
                                // call recursively
                                pollAllAppsStarted(savedWindowList);
                            }
                        } else {
                            console.log('All applications started');
                            fulfill(currentWindowList);
                        }
                    })
                    .catch(reject);
            }, CFG().POLL_ALL_APPS_STARTED_INTERVAL);
        }

        // start once initially
        pollAllAppsStarted(savedWindowList);
    }).catch(_catchGenericErr);
}

function _getNotStartedApps(savedWindowList, currentWindowList) {
    let nonStartedApps = [];
    savedWindowList.forEach((win) => {
        if (!_getMatchingWindowId(win, currentWindowList)) {
            nonStartedApps.push(win);
        }
    });
    return nonStartedApps;
}

function _isAllAppsStarted(savedWindowList, currentWindowList) {
    let isAllStarted = true;
    const currentWindowListCopy = currentWindowList.slice(0);
    savedWindowList.forEach((win) => {
        if (!_getMatchingWindowId(win, currentWindowListCopy)) {
            isAllStarted = false;
        } else {
            const index = currentWindowListCopy.findIndex((winFromCurrent) => win.wmClassName === winFromCurrent.wmClassName);
            currentWindowListCopy.splice(index, 1);
        }
    });
    return isAllStarted;
}

function _guessAndSetDesktopFilePaths(windowList, inputHandler) {
    const promises = [];
    windowList.forEach((win) => {
        promises.push(() => {
            return _guessFilePath(win, inputHandler);
        });
    });

    return new Promise((fulfill, reject) => {
        waterfall(promises)
            .then(() => {
                fulfill(windowList);
            })
            .catch(reject);
    }).catch(_catchGenericErr);
}

function _guessFilePath(win, inputHandler) {
    return new Promise((fulfill, reject) => {
        function callInputHandler(error?, stdout?) {
            inputHandler(error, win, stdout)
                .then((input) => {
                    if (_isDesktopFile(win.executableFile)) {
                        win.desktopFilePath = input;
                        fulfill(win.desktopFilePath);
                    } else {
                        win.executableFile = input;
                        fulfill(win.executableFile);
                    }
                })
                .catch(reject);
        }

        console.log(_isDesktopFile(win.executableFile), win.executableFile);



        if (_isDesktopFile(win.executableFile)) {
            findDesktopFile(win.executableFile)
                .then((stdout) => {
                    callInputHandler(null, stdout);
                })
                .catch(callInputHandler);
        } else {
            callInputHandler(true, win.executableFile);
        }
    }).catch(_catchGenericErr);
}

// TODO check for how many instances there should be running of a program
function _startSessionPrograms(windowList, currentWindowList) {
    const promises = [];

    // set instances started to 0
    windowList.forEach((win) => win.instancesStarted = 0);
    windowList.forEach((win) => {
        const numberOfInstancesOfWin = _getNumberOfInstancesToRun(win, windowList);
        if (!_isProgramAlreadyRunning(win.wmClassName, currentWindowList, numberOfInstancesOfWin, win.instancesStarted)) {
            promises.push(startProgram(win.executableFile, win.desktopFilePath));
            win.instancesStarted += 1;
        }
    });

    return new Promise((fulfill, reject) => {
        Promise.all(promises)
            .then((results) => {
                fulfill(results);
            })
            .catch(reject);
    }).catch(_catchGenericErr);
}

function _getNumberOfInstancesToRun(windowToMatch, windowList) {
    return windowList.filter((win) => {
        return win.wmClassName === windowToMatch.wmClassName;
    }).length;
}

function _isProgramAlreadyRunning(wmClassName, currentWindowList, numberOfInstancesToRun, instancesStarted) {
    if (!numberOfInstancesToRun) {
        numberOfInstancesToRun = 1;
    }

    if (!instancesStarted) {
        instancesStarted = 0;
    }

    let instancesRunning = 0;
    currentWindowList.forEach((win) => {
        if (win.wmClassName === wmClassName) {
            instancesRunning++;
        }
    });
    console.log('Status: "' + wmClassName + '" is running:', (instancesRunning + instancesStarted >= numberOfInstancesToRun), numberOfInstancesToRun, instancesStarted);
    return instancesRunning + instancesStarted >= numberOfInstancesToRun;
}

function _isDesktopFile(executableFile) {
    return executableFile && executableFile.match(/desktop$/);
}

function _updateWindowIds(savedWindowList, currentWindowList) {
    const wmClassNameMap = {};
    savedWindowList.forEach((win) => {
        if (!wmClassNameMap[win.wmClassName]) {
            wmClassNameMap[win.wmClassName] = _getMatchingWindows(win, currentWindowList);
        }

        win.windowId = wmClassNameMap[win.wmClassName][0].windowId;
        win.windowIdDec = parseInt(win.windowId, 16);

        // remove first entry
        wmClassNameMap[win.wmClassName].shift();
    });
}

function _getMatchingWindowId(win, currentWindowList) {
    const currentWindow = currentWindowList.find((winFromCurrent) => win.wmClassName === winFromCurrent.wmClassName);
    return currentWindow && currentWindow.windowId;
}

function _getMatchingWindows(win, currentWindowList) {
    return currentWindowList.filter((winFromCurrent) => win.wmClassName === winFromCurrent.wmClassName);
}

function _restoreWindowPositions(savedWindowList) {
    const promises = [];
    savedWindowList.forEach((win) => {
        promises.push(() => {
            return restoreWindowPosition(win);
        });
        promises.push(() => {
            return goToWorkspace(win.windowId, win.wmCurrentDesktopNr);
        });
    });

    return new Promise((fulfill, reject) => {
        waterfall(promises)
            .then((results) => {
                fulfill(results);
            })
            .catch(reject);
    }).catch(_catchGenericErr);
}
