'use strict';

const Store = require('jfs');
const fs = require('fs');
const waterfall = require('promise-waterfall');
const DEFAULT_CFG = require('./defaultConfig');
const DESKTOP_ENV = process.env.DESKTOP_SESSION;
const CFG_DATA_DIR = getUserHome() + '/.lwsm';
const CFG_FILE_PATH = CFG_DATA_DIR + '/config.json';
const SESSION_DATA_DIR = CFG_DATA_DIR + '/sessionData';
const util = require('./utility');

let metaW;

let db;
let CFG;

// INIT
// ------------
try {
  // if config is already in place
  CFG = JSON.parse(fs.readFileSync(CFG_FILE_PATH, 'utf8'));
} catch (e) {
  console.log('lwsm: no config file present or it contains invalid json. Creating new one...');

  // if there is no config yet load default cfg and create files and dirs
  CFG = DEFAULT_CFG;

  // save executable paths to cfg
  CFG.CMD_JSFILE_PATH = __dirname + '/../cmd.js';
  CFG.JSFILE_INDEX_PATH = __dirname + '/index.js';

  util.mkdirSync(CFG_DATA_DIR);
  util.mkdirSync(SESSION_DATA_DIR);

  // write config to user dir
  fs.writeFileSync(CFG_FILE_PATH, JSON.stringify(CFG, null, 2), 'utf8');
}

// create data store
db = new Store(SESSION_DATA_DIR, { pretty: CFG.SAVE_SESSION_IN_PRETTY_FORMAT });

// also make data dirs accessible to the outside
CFG.DATA_DIR = CFG_DATA_DIR;
CFG.SESSION_DATA_DIR = SESSION_DATA_DIR;

// setup meta wrapper
const metaWMod = require('./metaWrapper');
metaW = metaWMod(CFG);

// EXPORT
// ------
module.exports = {
  listSessions,
  renameSession,
  saveSession,
  removeSession,
  restoreSession,
  getSessions,
  x11Helper: metaW.x11Helper,
  getConnectedDisplaysId: metaW.getConnectedDisplaysId,
  resetCfg: () => {
    const configFilePath = CFG.DATA_DIR + '/config.json';
    if (fs.existsSync(configFilePath)) {
      fs.unlinkSync(configFilePath);
    } else {
      console.error('No Config present in ' + configFilePath);
    }
  },
  getCfg: () => {
    return CFG;
  },
  getDb: () => {
    return db;
  }
};

// HELPER
// --------
function getUserHome() {
  return process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'];
}

function catchGenericErr(err) {
  console.error('Generic Error in Main Handler', err, err.stack);
  throw err;
}

function getSessions() {
  return db.allSync()
}

// MAIN FUNCTIONS
// --------------
function listSessions() {
  let list = Object.keys(getSessions());
  list.forEach((name) => {
    console.log(name)
  })
}

function renameSession(oldName,newName) {
  let obj = db.getSync(oldName)
  if(obj.message){
    if(obj.message === 'could not load data'){
      console.log(`Error: Could not find a session named '${oldName}'`)
    }
    else {
      console.log(obj.message)
    }
    return
  }
  db.saveSync(newName,obj)
  db.delete(oldName)
}

function saveSession(sessionName, inputHandlers) {
  const sessionToHandle = sessionName || 'DEFAULT';

  return metaW.getActiveWindowList()
    .then((windowList) => {
      // desktop file paths and connected display ids
      return Promise.all([
        guessAndSetDesktopFilePaths(windowList, inputHandlers.desktopFilePath),
        metaW.getConnectedDisplaysId(),
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

      closeAllWindowsIfSet(isCloseAllOpenWindows)
        .then(metaW.goToFirstWorkspace)
        .then(metaW.getConnectedDisplaysId)
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
          return metaW.getActiveWindowList();
        })
        .then((currentWindowList) => {
          return startSessionPrograms(savedWindowList, currentWindowList);
        })
        .then(() => {
          // gets current window list by itself and returns the updated variant
          return waitForAllAppsToStart(savedWindowList)
        })
        .then((updatedCurrentWindowList) => {
          updateWindowIds(savedWindowList, updatedCurrentWindowList);
          return restoreWindowPositions(savedWindowList);
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
  }).catch(catchGenericErr);
}

function removeSession(sessionName) {
  return new Promise((fulfill, reject) => {
    fs.unlink(CFG.SESSION_DATA_DIR + '/' + sessionName + '.json', (error) => {
      if (error) {
        console.error(error);
        reject(error);
      } else {
        fulfill();
      }
    });
  }).catch(catchGenericErr);
}

function closeAllWindowsIfSet(isCloseAll) {
  return new Promise((fulfill, reject) => {
    if (isCloseAll) {
      console.log('Closing opened applications');
      metaW.getActiveWindowList()
        .then((currentWindowList) => {
          currentWindowList.forEach((win) => {
            metaW.closeWindow(win.windowId);
          });

          waitForAllAppsToClose()
            .then(fulfill)
            .catch(reject);
        })
        .catch(reject);
    } else {
      fulfill();
    }
  }).catch(catchGenericErr);
}

function waitForAllAppsToClose() {
  let totalTimeWaited = 0;
  return new Promise((fulfill, reject) => {
    function pollAllAppsClosed() {
      setTimeout(() => {
        metaW.getActiveWindowList()
          .then((currentWindowList) => {
            totalTimeWaited += CFG.POLL_ALL_APPS_STARTED_INTERVAL;
            if (currentWindowList.length !== 0) {
              if (totalTimeWaited > CFG.POLL_ALL_MAX_TIMEOUT) {
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
      }, CFG.POLL_ALL_APPS_STARTED_INTERVAL);
    }

    // start once initially
    pollAllAppsClosed();
  }).catch(catchGenericErr);
}

function waitForAllAppsToStart(savedWindowList) {
  console.log('Wait for all applications to start');

  let totalTimeWaited = 0;
  let timeout;

  return new Promise((fulfill, reject) => {
    function pollAllAppsStarted(savedWindowList) {
      timeout = setTimeout(() => {
        // clear timeout to be save
        if (timeout) {
          clearTimeout(timeout)
        }

        metaW.getActiveWindowList()
          .then((currentWindowList) => {
            totalTimeWaited += CFG.POLL_ALL_APPS_STARTED_INTERVAL;
            if (!isAllAppsStarted(savedWindowList, currentWindowList)) {
              if (totalTimeWaited > CFG.POLL_ALL_MAX_TIMEOUT) {
                console.error('POLL_ALL_MAX_TIMEOUT reached');
                console.error('Unable to start the following apps', getNotStartedApps(savedWindowList, currentWindowList));
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
      }, CFG.POLL_ALL_APPS_STARTED_INTERVAL);
    }

    // start once initially
    pollAllAppsStarted(savedWindowList);
  }).catch(catchGenericErr);
}

function getNotStartedApps(savedWindowList, currentWindowList) {
  let nonStartedApps = [];
  savedWindowList.forEach((win) => {
    if (!getMatchingWindowId(win, currentWindowList)) {
      nonStartedApps.push(win);
    }
  });
  return nonStartedApps;
}

function isAllAppsStarted(savedWindowList, currentWindowList) {
  let isAllStarted = true;
  savedWindowList.forEach((win) => {
    if (!getMatchingWindowId(win, currentWindowList)) {
      isAllStarted = false;
    }
  });
  return isAllStarted;
}

function guessAndSetDesktopFilePaths(windowList, inputHandler) {
  const promises = [];
  windowList.forEach((win) => {
    promises.push(() => {
      return guessFilePath(win, inputHandler);
    });
  });

  return new Promise((fulfill, reject) => {
    waterfall(promises)
      .then(() => {
        fulfill(windowList);
      })
      .catch(reject);
  }).catch(catchGenericErr);
}

function guessFilePath(win, inputHandler) {
  return new Promise((fulfill, reject) => {
    function callInputHandler(error, stdout) {
      inputHandler(error, win, stdout)
        .then((input) => {
          if (isDesktopFile(win.executableFile)) {
            win.desktopFilePath = input;
            fulfill(win.desktopFilePath);
          } else {
            win.executableFile = input;
            fulfill(win.executableFile);
          }
        })
        .catch(reject);
    }

    if (isDesktopFile(win.executableFile)) {
      metaW.findDesktopFile(win.executableFile)
        .then((stdout) => {
          callInputHandler(null, stdout)
        })
        .catch(callInputHandler);
    } else {
      callInputHandler(true, win.executableFile);
    }
  }).catch(catchGenericErr);
}

// TODO check for how many instances there should be running of a program
function startSessionPrograms(windowList, currentWindowList) {
  const promises = [];

  // set instances started to 0
  windowList.forEach((win) => win.instancesStarted = 0);
  windowList.forEach((win) => {
    const numberOfInstancesOfWin = getNumberOfInstancesToRun(win, windowList);
    if (!isProgramAlreadyRunning(win.wmClassName, currentWindowList, numberOfInstancesOfWin, win.instancesStarted)) {
      promises.push(metaW.startProgram(win.executableFile, win.desktopFilePath));
      win.instancesStarted += 1;
    }
  });

  return new Promise((fulfill, reject) => {
    Promise.all(promises)
      .then((results) => {
        fulfill(results);
      })
      .catch(reject);
  }).catch(catchGenericErr);
}

function getNumberOfInstancesToRun(windowToMatch, windowList) {
  return windowList.filter((win) => {
    return win.wmClassName === windowToMatch.wmClassName;
  }).length;
}

function isProgramAlreadyRunning(wmClassName, currentWindowList, numberOfInstancesToRun, instancesStarted) {
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

function isDesktopFile(executableFile) {
  return executableFile && executableFile.match(/desktop$/);
}

function updateWindowIds(savedWindowList, currentWindowList) {
  const wmClassNameMap = {};
  savedWindowList.forEach((win) => {
    if (!wmClassNameMap[win.wmClassName]) {
      wmClassNameMap[win.wmClassName] = getMatchingWindows(win, currentWindowList);
    }

    win.windowId = wmClassNameMap[win.wmClassName][0].windowId;
    win.windowIdDec = parseInt(win.windowId, 16);

    // remove first entry
    wmClassNameMap[win.wmClassName].shift();
  });
}

function getMatchingWindowId(win, currentWindowList) {
  const currentWindow = currentWindowList.find((winFromCurrent) => win.wmClassName === winFromCurrent.wmClassName);
  return currentWindow && currentWindow.windowId;
}

function getMatchingWindows(win, currentWindowList) {
  return currentWindowList.filter((winFromCurrent) => win.wmClassName === winFromCurrent.wmClassName);
}

function restoreWindowPositions(savedWindowList) {
  const promises = [];
  savedWindowList.forEach((win) => {
    promises.push(() => {
      return metaW.restoreWindowPosition(win);
    });
    promises.push(() => {
      return metaW.goToWorkspace(win.windowId, win.wmCurrentDesktopNr);
    });
  });

  return new Promise((fulfill, reject) => {
    waterfall(promises)
      .then((results) => {
        fulfill(results);
      })
      .catch(reject);
  }).catch(catchGenericErr);
}
