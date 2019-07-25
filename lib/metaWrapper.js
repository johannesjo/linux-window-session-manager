'use strict';

let otherCmd;
let x11w;
let CFG;
let utilWithCfg;
const waterfall = require('promise-waterfall');
const fs = require('fs');
const path = require('path');
const otherCmdMod = require('./otherCmd');
const x11wMod = require('./x11Wrapper');
const util = require('./utility');
const findup = require('findup-sync');

module.exports = (passedCFG) => {
  CFG = passedCFG;
  otherCmd = otherCmdMod(CFG);
  x11w = x11wMod(CFG);
  utilWithCfg = util.withCfg(CFG);

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
    findDesktopFile,
    startProgram,
  };
};

function catchGenericErr(err) {
  console.error('Generic Error in Meta Wrapper', err, err.stack);
  throw err;
}

// NODE X11
function closeWindow(windowId) {
  return x11w.closeWindow(windowId);
}

function goToFirstWorkspace() {
  return x11w.goToViewport(0, 0);
}

function restoreWindowPosition(win) {
  console.log('Restoring window position for "' + win.wmClassName + '"');
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

function findDesktopFile(file) {
  return utilWithCfg.findDesktopFile(file);
}

function startProgram(executableFile, desktopFilePath) {
  console.log('Starting: ' + (executableFile || desktopFilePath));
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
              });
          });
        });

        // we're using a waterfall because we're dealing with x11 requests

        if (promises.length > 0) {
          waterfall(promises)
            .then(() => {
              addParsedExecutableFilesFromWmClassNames(windowList)
                .then((windowListWithWmClassNames) => {
                  fulfill(windowListWithWmClassNames);
                });
            })
            .catch(reject);
        } else {
          fulfill([])
        }
      });
  }).catch(catchGenericErr);
}

// MIXED
function addParsedExecutableFilesFromWmClassNames(windowList) {
  return new Promise((fulfill, reject) => {
    const promises = [];
    windowList.forEach((win) => {
      // only if we're unable to parse this via xprop
      if (!win.executableFile) {
        promises.push(() => {
          return parseExecutableFileFromWmClassName(win.wmClassName)
            .then((fileName) => {
              win.executableFile = fileName;
            });
        });
      }
    });

    // TODO replace waterfall with regular exec
    if (promises.length) {
      waterfall(promises)
        .then(() => {
          fulfill(windowList);
        })
        .catch(reject);
    } else {
      fulfill(windowList);
    }
  }).catch(catchGenericErr);
}

function parseExecutableFileFromWmClassName(wmClassName) {
  return new Promise((fulfill, reject) => {
    const executableFileFromMap = CFG.WM_CLASS_AND_EXECUTABLE_FILE_MAP[wmClassName];
    if (executableFileFromMap) {
      fulfill(executableFileFromMap);
    } else {
      const splitValues = wmClassName.split('.');
      const fileName = splitValues[0];
      if (isChromeApp(fileName)) {
        parseChromeAppDesktopFileName(fileName)
          .then(fulfill)
          .catch(reject);
      } else {
        fulfill(fileName + '.desktop');
      }
    }
  }).catch(catchGenericErr);
}

function parseSimpleWindowName(wmClassName) {
  const splitValues = wmClassName.split('.');
  if (splitValues[1]) {
    return splitValues[1];
  } else {
    return wmClassName;
  }
}

function isChromeApp(fileName) {
  return !!fileName.match(/^crx_/);
}

function parseChromeAppDesktopFileName(fileName) {
  return new Promise((resolve, reject) => {
    // we wan't to search from desktop files only
    const locateStr = fileName.replace('crx_', '*') + '*.desktop';
    findDesktopFile(locateStr)
      .then(resolve)
      .catch(reject);
  }).catch(catchGenericErr);
}
