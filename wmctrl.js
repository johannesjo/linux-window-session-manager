const exec = require('child_process').exec;
let CFG;

module.exports = (passedCFG) => {
  CFG = passedCFG;
  return {
    getActiveWindowList,
    closeWindow,
    restoreWindowPosition,
    goToFirstWorkspace,
  };
};

function catchGenericErr(err) {
  console.error('wmctrl: Generic Error', err);
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
  const newPositionStr = `${win.gravity},${win.x},${win.y},${win.width},${win.height}`;
  const removeStatesStr = 'remove,maximized_vert,maximized_horz,fullscreen,above,below,hidden,sticky,modal,shaded,demands_attention';
  const baseCmd = `wmctrl -i -r ${win.windowId}`;

  // add remove states command
  let cmd = `${baseCmd} -b  ${removeStatesStr}`;

  // add restore positions command
  //if (CFG.IS_USE_XDOTOOL) {
  //  const decId = win.windowIdDec;
  //  // this is what the implementation with xdotool would look like
  //  cmd = `${cmd} && xdotool windowsize ${decId} ${win.width} ${win.height} windowmove ${decId} ${win.x} ${win.y}`
  //} else {
  cmd = `${cmd} && ${baseCmd} -e ${newPositionStr}`;
  //}

  // add add states command
  if (win.states && win.states.length > 0) {
    cmd = `${cmd} &&  ${baseCmd} -b add,${win.states.join(',')}`;
  }

  return new Promise((fulfill, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error || stderr) {
        console.error(error, stderr);
        reject(error || stderr);
      } else {
        const lines = stdout.split('\n');
        win.desktopFilePath = lines[0];
        fulfill(stdout);
      }
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