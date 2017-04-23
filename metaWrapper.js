let wmctrl;
let CFG;
module.exports = (passedCFG) => {
  CFG = passedCFG;
  wmctrl = require('./wmctrl')(CFG)
  return {
    getActiveWindowList,
    closeWindow,
    restoreWindowPosition,
  };
};

function getActiveWindowList() {
  return wmctrl.getActiveWindowList();
}

function closeWindow(windowId) {
  return wmctrl.closeWindow(windowId);
}

function restoreWindowPosition(win) {
  return wmctrl.restoreWindowPosition(win);
}