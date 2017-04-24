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
    closeWindow,

    // node x11
    goToFirstWorkspace,
    restoreWindowPosition,

    // other cmd
    getActiveWindowList,
    getConnectedDisplaysId,
    readAndSetAdditionalMetaDataForWin,
    locate,
    startProgram,
  };
};

// WMCTRL
function closeWindow(windowId) {
  return wmctrl.closeWindow(windowId);
}

// NODE X11
function goToFirstWorkspace() {
  return x11w.goToViewport(0, 0);
}

function restoreWindowPosition(win) {
  return x11w.restoreWindowPosition(win);
}

// OTHER CMD
function getActiveWindowList() {
  return otherCmd.getActiveWindowList();
}

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