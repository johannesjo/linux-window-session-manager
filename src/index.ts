"use strict";
import { CFG, SESSION_DATA_DIR } from "./config";
import * as fs from "fs";
import { getConnectedDisplaysId, startProgram } from "./otherCmd";
import {
  closeWindow,
  getX,
  initX11,
  moveToWorkspace,
  restoreWindowPosition
} from "./x11Wrapper";
import {
  findDesktopFile,
  getActiveWindowListFlow,
  goToFirstWorkspace
} from "./metaWrapper";
import { log } from "./log";
import { WinObj } from "./model";
import { exec } from "child_process";

// import * as Store from 'jfs';
const Store = require("jfs");

// create data store
const db = new Store(SESSION_DATA_DIR, {
  pretty: CFG.SAVE_SESSION_IN_PRETTY_FORMAT
});

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
  getX: getX,

  getConnectedDisplaysId,
  resetCfg: () => {
    const configFilePath = CFG.DATA_DIR + "/config.json";
    if (fs.existsSync(configFilePath)) {
      fs.unlinkSync(configFilePath);
    } else {
      console.error("No Config present in " + configFilePath);
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
function _catchGenericErr(err) {
  console.error("Generic Error in Main Handler", err, err.stack);
  throw err;
}

function getSessions() {
  return db.allSync();
}

// MAIN FUNCTIONS
// --------------
function listSessions() {
  let list = Object.keys(getSessions());
  list.forEach(name => {
    log(name);
  });
}

function renameSession(oldName: string, newName: string) {
  let obj = db.getSync(oldName);
  if (obj.message) {
    if (obj.message === "could not load data") {
      log(`Error: Could not find a session named '${oldName}'`);
    } else {
      log(obj.message);
    }
    return;
  }
  db.saveSync(newName, obj);
  db.delete(oldName);
}

function saveSession(sessionName: string, inputHandlers): Promise<any> {
  const sessionToHandle = sessionName || "DEFAULT";

  return initX11()
    .then(() => {
      return getActiveWindowListFlow();
    })
    .then(windowList => {
      // desktop file paths and connected display ids
      return _guessAndSetDesktopFilePaths(
        windowList,
        inputHandlers.desktopFilePath
      );
    })
    .then(windowList => {
      const connectedDisplaysId = getConnectedDisplaysId();
      return saveSessionForDisplayToDb(
        sessionToHandle,
        connectedDisplaysId,
        windowList
      );
    })
    .catch(err => {
      console.error("saveSession(): An error occurred", err);
      throw err;
    });
}

function saveSessionForDisplayToDb(
  sessionToHandle: string,
  connectedDisplaysId: string,
  windowList: WinObj[]
): Promise<void> {
  return new Promise((fulfill, reject) => {
    // check if entry exists and update
    db.get(sessionToHandle, (err, sessionData) => {
      if (err) {
        // NOTE: we're not failing because, the case is probably that there is no session file yet
        log(
          `saveSessionForDisplayToDb: no session file present yet for "${sessionToHandle}", creating a new one...`
        );
      }

      if (!sessionData) {
        // create new object
        sessionData = {
          name: sessionToHandle
        };
      }
      if (
        !sessionData.displaysCombinations ||
        !Array.isArray(sessionData.displaysCombinations)
      ) {
        // create new array
        sessionData.displaysCombinations = [];
      }

      const existingDisplayEntry = sessionData.displaysCombinations.find(
        entry => entry.id === connectedDisplaysId
      );
      if (existingDisplayEntry) {
        existingDisplayEntry.windowList = windowList;
      } else {
        sessionData.displaysCombinations.push({
          id: connectedDisplaysId,
          windowList
        });
      }

      db.save(sessionToHandle, sessionData, err => {
        if (err) {
          reject(err);
        } else {
          log("SAVED SESSION: " + sessionToHandle);
          fulfill();
        }
      });
    });
  });
}

function restoreSession(
  sessionName: string,
  isCloseAllOpenWindows: boolean,
  isAllowInputArgs: boolean
): Promise<any> {
  const sessionToHandle = sessionName || "DEFAULT";

  return new Promise((fulfill, reject) => {
    db.get(sessionToHandle || "DEFAULT", (err, sessionData) => {
      if (err) {
        reject(err);
        return;
      }

      let savedWindowList;

      initX11()
        .then(() => {
          return _closeAllWindowsIfSet(isCloseAllOpenWindows);
        })
        .then(goToFirstWorkspace)
        .then(getConnectedDisplaysId)
        .then(connectedDisplaysId => {
          if (!sessionData.displaysCombinations) {
            console.error(`no display combinations saved yet`);
            return;
          }

          const displayEntry = sessionData.displaysCombinations.find(
            entry => entry.id === connectedDisplaysId
          );

          if (displayEntry) {
            savedWindowList = displayEntry.windowList;
          } else {
            console.error(
              `no data for current display id '${connectedDisplaysId}' saved yet`
            );
            return;
          }
          return getActiveWindowListFlow();
        })
        .then(currentWindowList => {
          if (isAllowInputArgs) {
            return _startAndWaitPrograms(savedWindowList);
          } else {
            return _startSessionPrograms(savedWindowList, currentWindowList)
              .then(() => {
                // gets current window list by itself and returns the updated variant
                return _waitForAllAppsToStart(savedWindowList);
              })
              .then((updatedCurrentWindowList: WinObj[]) => {
                return _updateWindowIds(
                  savedWindowList,
                  updatedCurrentWindowList
                );
              });
          }
        })
        .then(() => {
          // gets current window list by itself and returns the updated variant
          return _waitForAllAppsToStart(savedWindowList);
        })
        .then(
          (updatedCurrentWindowList: WinObj[]) =>
            new Promise(resolve =>
              setTimeout(() => {
                resolve(updatedCurrentWindowList);
              }, 250)
            )
        )
        .then((updatedCurrentWindowList: WinObj[]) => {
          _updateWindowIds(savedWindowList, updatedCurrentWindowList);
          return _restoreWindowPositions(savedWindowList);
        })
        .then(() => {
          log("RESTORED SESSION: " + sessionToHandle);
        })
        .catch(err => {
          console.error("An error occurred", err);
          reject(err);
        })
        .then(fulfill);
    });
  }).catch(_catchGenericErr);
}

function removeSession(sessionName: string): Promise<unknown> {
  return new Promise((fulfill, reject) => {
    fs.unlink(CFG.SESSION_DATA_DIR + "/" + sessionName + ".json", error => {
      if (error) {
        console.error(error);
        reject(error);
      } else {
        fulfill();
      }
    });
  }).catch(_catchGenericErr);
}

function _closeAllWindowsIfSet(isCloseAll: boolean): Promise<unknown> {
  return new Promise((fulfill, reject) => {
    if (isCloseAll) {
      log("Closing opened applications");
      getActiveWindowListFlow()
        .then((currentWindowList: any[]) => {
          currentWindowList.forEach(win => {
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

function _waitForAllAppsToClose(): Promise<unknown> {
  let totalTimeWaited = 0;
  return new Promise((fulfill, reject) => {
    function pollAllAppsClosed() {
      setTimeout(() => {
        getActiveWindowListFlow()
          .then((currentWindowList: WinObj[]) => {
            totalTimeWaited += CFG.POLL_ALL_APPS_STARTED_INTERVAL;
            if (currentWindowList.length !== 0) {
              if (totalTimeWaited > CFG.POLL_ALL_MAX_TIMEOUT) {
                console.error("POLL_ALL_MAX_TIMEOUT reached");
                reject("POLL_ALL_MAX_TIMEOUT reached");
              } else {
                // call recursively
                pollAllAppsClosed();
              }
            } else {
              fulfill(currentWindowList);
            }
          })
          .catch(reject);
      }, CFG.POLL_ALL_APPS_STARTED_INTERVAL);
    }

    // start once initially
    pollAllAppsClosed();
  }).catch(_catchGenericErr);
}

function _waitForAllAppsToStart(savedWindowList): Promise<WinObj[] | unknown> {
  log("Waiting for all applications to start...");

  let totalTimeWaited = 0;
  let timeout;

  return new Promise((fulfill, reject) => {
    function pollAllAppsStarted(
      savedWindowList: WinObj[],
      timeoutDuration = CFG.POLL_ALL_APPS_STARTED_INTERVAL
    ) {
      timeout = setTimeout(() => {
        // clear timeout to be save
        if (timeout) {
          clearTimeout(timeout);
        }

        getActiveWindowListFlow()
          .then(currentWindowList => {
            totalTimeWaited += CFG.POLL_ALL_APPS_STARTED_INTERVAL;
            if (!_isAllAppsStarted(savedWindowList, currentWindowList)) {
              if (totalTimeWaited > CFG.POLL_ALL_MAX_TIMEOUT) {
                console.error("POLL_ALL_MAX_TIMEOUT reached");
                console.error(
                  "Unable to start the following apps",
                  _getNotStartedApps(savedWindowList, currentWindowList)
                );
                reject("POLL_ALL_MAX_TIMEOUT reached");
              } else {
                // call recursively
                pollAllAppsStarted(savedWindowList);
              }
            } else {
              log("All applications started");
              fulfill(currentWindowList);
            }
          })
          .catch(reject);
      }, timeoutDuration);
    }

    // start once initially
    pollAllAppsStarted(savedWindowList, 500);
  }).catch(_catchGenericErr);
}

function _getNotStartedApps(
  savedWindowList: WinObj[],
  currentWindowList: WinObj[]
): WinObj[] {
  let nonStartedApps = [];
  savedWindowList.forEach(win => {
    if (!_getMatchingWindowId(win, currentWindowList)) {
      nonStartedApps.push(win);
    }
  });
  return nonStartedApps;
}

function _isAllAppsStarted(
  savedWindowList: WinObj[],
  currentWindowList: WinObj[]
): boolean {
  let isAllStarted = true;
  const currentWindowListCopy = currentWindowList.slice(0);
  savedWindowList.forEach(win => {
    if (!_getMatchingWindowId(win, currentWindowListCopy)) {
      isAllStarted = false;
    } else {
      const index = currentWindowListCopy.findIndex(
        winFromCurrent => win.wmClassName === winFromCurrent.wmClassName
      );
      currentWindowListCopy.splice(index, 1);
    }
  });
  return isAllStarted;
}

async function _guessAndSetDesktopFilePaths(
  windowList: WinObj[],
  inputHandler
): Promise<WinObj[]> {
  const promises = windowList.map(win => _guessFilePath(win, inputHandler));

  for (const promise of promises) {
    try {
      await promise;
    } catch (e) {
      _catchGenericErr(e);
    }
  }
  return windowList;
}

function _guessFilePath(win: WinObj, inputHandler): Promise<string | unknown> {
  return new Promise((fulfill, reject) => {
    function callInputHandler(error?, stdout?) {
      if (error) {
        console.log(
          `\n Trying alternative guessing approach for "${win.simpleName}".....`
        );
        exec(`cat /proc/${win.wmPid}/cmdline`, (error1, stdout1) => {
          if (error1 || !stdout1.length) {
            console.error("ERR _guessFilePath()", error1);
            reject(error1);
          } else {
            const ent = stdout1.split("\u0000");
            console.log(
              `\n Alternative guessing approach for "${win.simpleName}" SUCCESS -> ${ent[0]}`
            );
            win.executableFile = ent[0];
            fulfill(win.executableFile);
          }
        });
      } else {
        inputHandler(error, win, stdout)
          .then(input => {
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
    }

    if (_isDesktopFile(win.executableFile)) {
      findDesktopFile(win.executableFile)
        .then(stdout => {
          callInputHandler(null, stdout);
        })
        .catch(callInputHandler);
    } else {
      callInputHandler(true, win.executableFile);
    }
  }).catch(_catchGenericErr);
}

// TODO check for how many instances there should be running of a program
async function _startSessionPrograms(
  windowList: WinObj[],
  currentWindowList: WinObj[]
): Promise<void> {
  // set instances started to 0
  windowList.forEach(win => (win.instancesStarted = 0));
  const promises = windowList
    .filter(win => {
      const numberOfInstancesOfWin = _getNumberOfInstancesToRun(
        win,
        windowList
      );
      return !_isProgramAlreadyRunning(
        win.wmClassName,
        currentWindowList,
        numberOfInstancesOfWin,
        win.instancesStarted
      );
    })
    .map(win => {
      win.instancesStarted += 1;
      return startProgram(
        win.executableFile,
        win.desktopFilePath,
        win.executableArgs
      );
    });

  await Promise.all(promises);
}

// This function is necessary to make possible sending custom arguments to applications to start,
// making sure it will keep track of which windows correspond to which instance of the applications
async function _startAndWaitPrograms(windowList: WinObj[]) {
  // Clear the windowIds from the window objects
  windowList.forEach(win => {
    win.windowId = null;
    win.windowIdDec = null;
  });

  // Get the windowIds of all Ids that were previously opened in order to
  // avoid these windows from being used isntead of the newly created windows
  // (necessary for windows with custom input arguments)
  var activeWindows = await getActiveWindowListFlow();
  var blackWinIdList = activeWindows.map(win => win.windowId);

  // Match all the previously opened windows with the windows that do not have
  // custom arguments (in this case, no blacklist needed)
  await _matchWindows(windowList, false, []);

  var windowsNotStarted = windowList.filter(win => win.windowId === null);
  var windowStarted = windowList.filter(win => win.windowId !== null);
  var windowsToStart = _getWindowsToStart(windowsNotStarted, windowStarted);

  let totalTimeWaited = 0;
  // Runs the loop until all windows have been opened or time limit is over
  while (windowList.find(win => win.windowId === null)) {
    totalTimeWaited += CFG.POLL_ALL_APPS_STARTED_INTERVAL;
    if (totalTimeWaited > CFG.POLL_ALL_MAX_TIMEOUT_ALLOW_ARGS) {
      console.error("POLL_ALL_MAX_TIMEOUT_ALLOW_ARGS reached");
      windowList
        .filter(win => win.windowId === null)
        .forEach(e => {
          console.log("Unable to start: ", e.wmClassName);
        });
      break;
    }

    let promises = windowsToStart.map(win => {
      startProgram(win.executableFile, win.desktopFilePath, win.executableArgs);
    });
    await Promise.all(promises);

    // Try to match newly started windows, the black list is needed to avoid matching
    // windows that have custom arguments with windows oppened before running lwsm
    await _matchWindows(windowList, true, blackWinIdList);
    // Update the lists with the windows not to be started yet, the windows to be started next
    // and the ones that already have the command to start sent
    windowsNotStarted = windowsNotStarted.filter(
      winNotStarted =>
        !windowsToStart.find(winToStart => winToStart === winNotStarted)
    );
    windowStarted = windowStarted.concat(windowsToStart);
    windowsToStart = _getWindowsToStart(windowsNotStarted, windowStarted);
  }

  windowList.forEach(win => {
    win.windowIdDec = parseInt(win.windowId, 16);
  });
}

// Get, from windowList, all the windows that can be started without the risk of
// mixing same application windows with different arguments. The others will have to wait for the
// previous windows to start, before the command can be issued
function _getWindowsToStart(windowList: WinObj[], windowsStarted: WinObj[]) {
  var windowsToStart = [];
  for (var win of windowList) {
    let shouldAdd = true;
    // If another instance of the same application with different input arguments
    // is in the list of windows to start, then the current one should not be added
    windowsToStart.forEach(winToRun => {
      if (
        win.executableFile === winToRun.executableFile &&
        win.executableArgs !== winToRun.executableArgs
      ) {
        shouldAdd = false;
      }
    });
    // If another instance of the same application is in the list of windows that
    // have been sent command to start, but still don't have a windowId, the current one should not be added
    if (
      windowsStarted.find(
        winStarted =>
          winStarted.windowId === null &&
          winStarted.wmClassName === win.wmClassName
      )
    ) {
      shouldAdd = false;
    }
    if (!win.windowId && shouldAdd) {
      windowsToStart.push(win);
    }
  }
  return windowsToStart;
}

// Match the windows that have been opened already to the windows on windowList
async function _matchWindows(
  windowList: WinObj[],
  includeExecsWithArgs: boolean,
  blackWinIdList: String[]
) {
  var activeWindows = await getActiveWindowListFlow();
  // Remove the active windows that already have a window assigned on windowList
  // and the ones that are on the black list
  activeWindows = activeWindows.filter(
    actWin => !windowList.find(win => win.windowId === actWin.windowId)
  );
  activeWindows = activeWindows.filter(
    actWin => !blackWinIdList.find(windowId => windowId === actWin.windowId)
  );

  for (var win of windowList.filter(win => win.windowId === null)) {
    let activeWindowMatch = activeWindows.find(
      actWin => actWin.wmClassName == win.wmClassName
    );
    if (
      activeWindowMatch &&
      (!win.executableArgs || win.executableArgs === "" || includeExecsWithArgs)
    ) {
      win.windowId = activeWindowMatch.windowId;
      activeWindows = activeWindows.filter(e => e !== activeWindowMatch);
    }
  }
}

function _getNumberOfInstancesToRun(
  windowToMatch: WinObj,
  windowList: WinObj[]
): number {
  return windowList.filter(win => {
    return win.wmClassName === windowToMatch.wmClassName;
  }).length;
}

function _isProgramAlreadyRunning(
  wmClassName: string,
  currentWindowList: WinObj[],
  numberOfInstancesToRun: number,
  instancesStarted: number
): boolean {
  if (!numberOfInstancesToRun) {
    numberOfInstancesToRun = 1;
  }

  if (!instancesStarted) {
    instancesStarted = 0;
  }

  let instancesRunning = 0;
  currentWindowList.forEach(win => {
    if (win.wmClassName === wmClassName) {
      instancesRunning++;
    }
  });
  log(
    'Status: "' + wmClassName + '" is running:',
    instancesRunning + instancesStarted >= numberOfInstancesToRun,
    numberOfInstancesToRun,
    instancesStarted
  );
  return instancesRunning + instancesStarted >= numberOfInstancesToRun;
}

function _isDesktopFile(executableFile: string): boolean {
  return executableFile && !!executableFile.match(/desktop$/);
}

function _updateWindowIds(
  savedWindowList: WinObj[],
  currentWindowList: WinObj[]
) {
  const wmClassNameMap = {};
  savedWindowList.forEach(win => {
    if (!wmClassNameMap[win.wmClassName]) {
      wmClassNameMap[win.wmClassName] = _getMatchingWindows(
        win,
        currentWindowList
      );
    }

    win.windowId = wmClassNameMap[win.wmClassName][0].windowId;
    win.windowIdDec = parseInt(win.windowId, 16);

    // remove first entry
    wmClassNameMap[win.wmClassName].shift();
  });
}

function _getMatchingWindowId(
  win: WinObj,
  currentWindowList: WinObj[]
): string {
  const currentWindow = currentWindowList.find(
    winFromCurrent => win.wmClassName === winFromCurrent.wmClassName
  );
  return currentWindow && currentWindow.windowId;
}

function _getMatchingWindows(
  win: WinObj,
  currentWindowList: WinObj[]
): WinObj[] {
  return currentWindowList.filter(
    winFromCurrent => win.wmClassName === winFromCurrent.wmClassName
  );
}

async function _restoreWindowPositions(
  savedWindowList: WinObj[]
): Promise<void> {
  const promises = [];
  let last_desktop_nr = 0;

  // Sort the window objects based on which workspace they are locate,
  // so the windows can be moved workspace by workspace
  // This is needed because the window manager just creates an additional workspace when
  // the previous one has some window on it.
  savedWindowList = savedWindowList.concat().sort((a, b) => {
    // NOTE: we need to fallback to zero because otherwise we get NAN for undefined and this
    // messes up everything
    return (a.wmCurrentDesktopNr || 0) - (b.wmCurrentDesktopNr || 0);
  });

  for (const win of savedWindowList) {
    promises.push(restoreWindowPosition(win));
    promises.push(moveToWorkspace(win.windowId, win.wmCurrentDesktopNr));
    // The promises are not executed until the last item is reached or
    // the desktop_nr is different from the previous entry and which case
    // the app waits for those to finish before continuing the process
    if (
      win.wmCurrentDesktopNr !== last_desktop_nr ||
      win === savedWindowList.slice(-1)[0]
    ) {
      for (const promise of promises) {
        try {
          await promise;
        } catch (e) {
          _catchGenericErr(e);
        }
      }
      last_desktop_nr = win.wmCurrentDesktopNr;
      promises.length = 0;
    }
  }
}
