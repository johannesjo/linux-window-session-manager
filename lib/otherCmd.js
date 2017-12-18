'use strict';

const exec = require('child_process').exec;
const spawn = require('child_process').spawn;
const parseCmdToSpawn = require('./parseCmdToSpawn');

// 500kb
const MAX_BUFFER = 1024 * 500;
const EXEC_OPTS = {
  maxBuffer: MAX_BUFFER,
};

let CFG;

module.exports = (passedCFG) => {
  CFG = passedCFG;
  return {
    getActiveWindowList,
    getConnectedDisplaysId,
    readAndSetAdditionalMetaDataForWin,
    startProgram,
  };
};

function catchGenericErr(err) {
  console.error('otherCmd: Generic Error', err, err.stack);
  console.log('otherCmd:', arguments);
}

// display
// -------
function getConnectedDisplaysId() {
  const cmd = CFG.CMD.GET_DISPLAY_ID;
  return new Promise((fulfill, reject) => {
    exec(cmd, EXEC_OPTS, (error, stdout, stderr) => {
      if (error || stderr) {
        console.error(error, stderr);
        reject(error || stderr);
      } else {
        const connectedDisplaysId = parseConnectedDisplaysId(stdout);
        fulfill(connectedDisplaysId);
      }
    });
  }).catch(catchGenericErr);
}

function parseConnectedDisplaysId(stdout) {
  let idString = '';
  const RESOLUTION_REG_EX = /[0-9]{3,5}x[0-9]{3,5}/;
  const lines = stdout.split('\n');
  lines.forEach((line) => {
    if (line !== '') {
      const resolution = RESOLUTION_REG_EX.exec(line);
      // only do this if we have a resolution as that means that the display is active
      if (resolution) {
        idString += resolution + ';';
      }
    }
  });

  if (idString.length) {
    // cut off last semicolon
    return idString.substring(0, idString.length - 1);
  }
}

// Other
// --------
function readAndSetAdditionalMetaDataForWin(win) {
  return new Promise((fulfill, reject) => {
    exec(`${CFG.CMD.XPROP_ID} ${win.windowId}`, EXEC_OPTS, (error, stdout, stderr) => {
      if (error || stderr) {
        console.error(win, error, stderr);
        reject(error || stderr);
      } else {
        const lines = stdout.split('\n');

        lines.forEach((line) => {
          const words = line.split(' ');
          const propertyName = words[0];

          // remove property name and "="
          words.splice(0, 2);
          const value = words.join(' ');
          const propertyNameFromMap = CFG.WM_META_MAP[propertyName];
          // parse wmClassName
          if (propertyName === 'WM_CLASS(STRING)') {
            const propertyNameFromMap = CFG.WM_META_MAP[propertyName]
            const classNames = value.split(', ');
            let className = '';
            classNames.forEach((state) => {
              if (state !== '') {
                className += state.replace(/"/g, '') + '.';
              }
            });
            win[propertyNameFromMap] = className.substr(0, className.length - 1);
          }
          // parse states
          else if (propertyName === '_NET_WM_STATE(ATOM)') {
            const states = value.split(', ');
            win.states = [];
            states.forEach((state) => {
              if (state !== '') {
                win.states.push(state);
              }
            });
          }
          // parse simple strings and integers
          else if (propertyNameFromMap) {
            // special handle number types
            if (CFG.WM_META_MAP_NUMBER_TYPES.indexOf(propertyName) > -1) {
              win[propertyNameFromMap] = parseInt(value, 10);
            } else {
              win[propertyNameFromMap] = value;
            }
          }
        });
        fulfill(win);
      }
    });
  }).catch(catchGenericErr);
}

// TODO prettify args structure
function startProgram(executableFile, desktopFilePath) {
  let cmd;
  let args = [];
  if (desktopFilePath) {
    cmd = `awk`;
    args.push('/^Exec=/ {sub("^Exec=", ""); gsub(" ?%[cDdFfikmNnUuv]", ""); exit system($0)}');
    args.push(desktopFilePath);
  } else {
    const parsedCmd = parseCmdToSpawn(executableFile);
    cmd = parsedCmd[0];
    args = parsedCmd[1];
  }

  return new Promise((fulfill) => {
    spawn(cmd, args, {
      stdio: 'ignore',
      detached: true,
    }).unref();

    // currently we have no error handling as the process is started detached
    fulfill();
  }).catch(catchGenericErr);
}

// GET ACTIVE WINDOW LIST
// ----------------------
function getActiveWindowList() {
  return new Promise((fulfill, reject) => {
    getActiveWindowIds()
      .then((windowIds) => {
        const windowList = [];
        windowIds.forEach((windowId) => {
          windowList.push({
            windowId: windowId,
            windowIdDec: parseInt(windowId, 16),
          });
        });

        // add meta data right away
        const promises = [];
        windowList.forEach((win) => {
          promises.push(readAndSetAdditionalMetaDataForWin(win));
        });

        Promise.all(promises)
          .then(() => {
            const filteredWindows =
              windowList
                .filter((win) => {
                  // filter none normal windows, excluded class names and incomplete windows
                  const isNormalWindow = (!win.wmType || win.wmType === '_NET_WM_WINDOW_TYPE_NORMAL');

                  const isNotExcluded = !(isExcludedWmClassName(win.wmClassName));
                  const hasWmClassName = !!(win.wmClassName);

                  // warn if no wmClassName even though there should be
                  if (isNormalWindow && isNotExcluded && !hasWmClassName) {
                    console.warn(win.windowId + ' has no wmClassName. Win: ', win);
                  }

                  return (isNormalWindow && isNotExcluded && hasWmClassName);
                });
            fulfill(filteredWindows);
          }).catch(reject);
      }).catch(reject);
  }).catch(catchGenericErr);
}

function getActiveWindowIds() {
  const cmd = 'xprop -root|grep ^_NET_CLIENT_LIST\\(WINDOW\\)';
  return new Promise((fulfill, reject) => {
    exec(cmd, EXEC_OPTS, (error, stdout, stderr) => {
      if (error || stderr) {
        console.error('xprop', error, stderr);
        reject(error | stderr);
      } else {
        const windowIds = parseWindowIds(stdout);
        fulfill(windowIds);
      }
    });
  }).catch(catchGenericErr);
}

function parseWindowIds(stdout) {
  const str = stdout.replace('_NET_CLIENT_LIST(WINDOW): window id #', '');
  return str.split(', ');
}

function isExcludedWmClassName(wmClassName) {
  return CFG.WM_CLASS_EXCLUSIONS.indexOf(wmClassName) > -1;
}
