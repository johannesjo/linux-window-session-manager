'use strict';

let otherCmd;
let x11w;
let CFG;
const waterfall = require('promise-waterfall');

module.exports = (passedCFG) => {
  CFG = passedCFG;
  otherCmd = require('./other-cmd')(CFG);
  x11w = require('./x11-wrapper')(CFG);

  return {
    // expose x11 helper
    x11Helper: x11w,

    // node x11
    goToFirstWorkspace,
    restoreWindowPosition,
    getWindowGeometry,
    closeWindow,
    goToWorkspace,

    // other cmd
    getActiveWindowList,
    getConnectedDisplaysId,
    readAndSetAdditionalMetaDataForWin,
    locate,
    startProgram,
  };
};

// NODE X11
function closeWindow(windowId) {
  return x11w.closeWindow(windowId);
}

function goToFirstWorkspace() {
  return x11w.goToViewport(0, 0);
}

function restoreWindowPosition(win) {
  return x11w.restoreWindowPosition(win);
}

function getWindowGeometry(winId) {
  return x11w.getWindowGeometry(winId);
}

function goToWorkspace(winId, workSpaceNr) {
  return x11w.goToWorkspace(winId, workSpaceNr);
}

// OTHER CMD
function getConnectedDisplaysId() {
  return otherCmd.getConnectedDisplaysId();
}

function readAndSetAdditionalMetaDataForWin(win) {
  return otherCmd.readAndSetAdditionalMetaDataForWin(win);
}

function locate(file) {
  return otherCmd.locate(file);
}

function startProgram(executableFile, desktopFilePath) {
  return otherCmd.startProgram(executableFile, desktopFilePath);
}

// MIXED
function getActiveWindowList() {
  return new Promise((fulfill, reject) => {
    return otherCmd.getActiveWindowList()
      .then((windowList) => {
        const promises = [];

        windowList.forEach((win) => {
          promises.push(() => {
            return getWindowGeometry(win.windowId)
              .then((geo) => {
                for (let prop in geo) {
                  if (geo.hasOwnProperty(prop)) {
                    win[prop] = geo[prop];
                  }
                }

                // TODO organize adding of all those different properties better
                // add missing static properties
                win.simpleName = parseSimpleWindowName(win.wmClassName);
                win.executableFile = parseExecutableFileFromWmClassName(win.wmClassName);
              });
          });
        });

        // we're using a waterfall because we're dealing with x11 requests
        waterfall(promises)
          .then(() => {
            fulfill(windowList);
          })
          .catch(reject);
      });
  });
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