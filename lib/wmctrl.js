'use strict';

const exec = require('child_process').exec;
let x11w;
let CFG;

module.exports = (passedCFG) => {
  CFG = passedCFG;
  x11w = require('./x11Wrapper')(CFG);

  return {
    getActiveWindowList,
    closeWindow,
    restoreWindowPosition,
    goToFirstWorkspace,
  };
};

function catchGenericErr(err) {
  console.error('wmctrl: Generic Error', err, err.stack);
}

// GET ACTIVE WINDOW LIST STUFF
// ---------------------------
function getActiveWindowList() {
  const cmd = 'wmctrl -p -G -l -x';
  return new Promise((fulfill, reject) => {
    exec(cmd, function (error, stdout, stderr) {
      const windowList = transformWmctrlList(stdout);
      if (error || stderr) {
        console.error(error, stderr);
        reject(error | stderr);
      } else {
        fulfill(windowList);
      }
    });
  }).catch(catchGenericErr);
}

function transformWmctrlList(stdout) {
  const LINE_REG_EX = /([^\s]+)\s+(-*\d+)\s+(-*\d+)\s+(-*\d+)\s+(-*\d+)\s+(-*\d+)\s+(-*\d+)\s+([^\s]+)/;
  const data = [];
  const lines = stdout.split('\n');
  lines.forEach((line) => {
    const fields = LINE_REG_EX.exec(line);
    if (fields && !isExcludedWmClassName(fields[8])) {
      data.push({
        windowId: fields[1],
        windowIdDec: parseInt(fields[1], 16),
        gravity: parseInt(fields[2], 10),
        x: parseInt(fields[4], 10),
        y: parseInt(fields[5], 10),
        width: parseInt(fields[6], 10),
        height: parseInt(fields[7], 10),
        wmClassName: fields[8],
        simpleName: parseSimpleWindowName(fields[8]),
        executableFile: parseExecutableFileFromWmClassName(fields[8]),
      });
    }
  });
  return data;
}

function parseExecutableFileFromWmClassName(wmClassName) {
  const executableFile = CFG.WM_CLASS_AND_EXECUTABLE_FILE_MAP[wmClassName];
  if (executableFile) {
    return executableFile;
  } else {
    const splitValues = wmClassName.split('.');
    return splitValues[0] + '.desktop';
  }
}

function parseSimpleWindowName(wmClassName) {
  const splitValues = wmClassName.split('.');
  if (splitValues[1]) {
    return splitValues[1];
  } else {
    return wmClassName;
  }
}

function isExcludedWmClassName(wmClassName) {
  return CFG.WM_CLASS_EXCLUSIONS.indexOf(wmClassName) > -1;
}

// OTHER STUFF
// -----------
function closeWindow(windowId) {
  const cmd = 'wmctrl -ic ' + windowId;
  return new Promise((fulfill, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error || stderr) {
        console.error(error, stderr);
        reject(error || stderr);
      } else {
        fulfill();
      }
    });
  }).catch(catchGenericErr);
}

function restoreWindowPosition(win) {
  const HEIGHT_FIXER_OFFSET = 58;
  // try to fix window resizing on the wrong desktop
  if (win.states.indexOf('_NET_WM_STATE_MAXIMIZED_VERT') > -1) {
    win.height -= HEIGHT_FIXER_OFFSET;
  }
  const newPositionStr = `${win.gravity},${win.x},${win.y},${win.width},${win.height}`;
  const removeStatesStr = [
    '_NET_WM_STATE_MAXIMIZED_VERT',
    '_NET_WM_STATE_MAXIMIZED_HORZ'
  ];
  const baseCmd = `wmctrl -i -r ${win.windowId}`;

  // move pos
  let cmd = `${baseCmd} -e ${newPositionStr}`;

  return new Promise((fulfill, reject) => {
    x11w.setState(win.windowIdDec, 'remove', removeStatesStr)
      .then(() => {
        setTimeout(() => {
          console.log(win.executableFile, cmd);

          // we use a minor timeout to give x11 a little time
          exec(cmd, (error, stdout, stderr) => {
            if (error || stderr) {
              console.error(error, stderr);
              reject(error || stderr);
            } else {
              setTimeout(() => {
                if (win.states && win.states.length > 0) {
                  x11w.setState(win.windowIdDec, 'add', win.states)
                    .then(() => {
                      fulfill();
                    });
                } else {
                  fulfill();
                }
              }, CFG.GIVE_X11_TIME_TIMEOUT);
            }
          });
        }, CFG.GIVE_X11_TIME_TIMEOUT);
      });
  }).catch(catchGenericErr);
}

function goToFirstWorkspace() {
  const cmd = 'wmctrl -o 0,0';
  return new Promise((fulfill, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error || stderr) {
        console.error(error, stderr);
        reject(error || stderr);
      } else {
        fulfill();
      }
    });
  }).catch(catchGenericErr);
}