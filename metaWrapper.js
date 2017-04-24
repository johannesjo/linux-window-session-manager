let wmctrl;
let otherCmd;
let CFG;
module.exports = (passedCFG) => {
  CFG = passedCFG;
  wmctrl = require('./wmctrl')(CFG);
  otherCmd = require('./other-cmd')(CFG);
  return {
    // wmctrl
    getActiveWindowList,
    closeWindow,
    restoreWindowPosition,
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

function goToFirstWorkspace() {
  return wmctrl.goToFirstWorkspace();
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