let wmctrl;
let otherCmd;
let x11w;
let CFG;
module.exports = (passedCFG) => {
  CFG = passedCFG;
  wmctrl = require('./wmctrl')(CFG);
  otherCmd = require('./other-cmd')(CFG);
  x11w = require('./x11-wrapper')(CFG);

  return {
    // wmctrl
    getActiveWindowList,
    closeWindow,
    restoreWindowPosition,

    // node x11
    goToFirstWorkspace,

    // other cmd
    getConnectedDisplaysId,
    readAndSetAdditionalMetaDataForWin,
    locate,
    startProgram,
  };
};

// WMCTRL
function getActiveWindowList() {
  return wmctrl.getActiveWindowList();
}

function closeWindow(windowId) {
  return wmctrl.closeWindow(windowId);
}

function restoreWindowPosition(win) {
  return wmctrl.restoreWindowPosition(win);
}

// NODE X11
function goToFirstWorkspace() {
  return x11w.goToViewport(0, 0);
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