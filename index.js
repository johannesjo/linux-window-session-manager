const exec = require('child_process').exec;
const spawn = require('child_process').spawn;
const execFile = require('child_process').execFile;
const Store = require('jfs');
const db = new Store('sessionStore');
const WAIT_FOR_PROGRAMS_TO_START_TIMEOUT = 1000;
const executableFileMap = {
  'sun-awt-X11-XFramePeer.jetbrains-idea': 'jetbrains-idea.desktop',
  'gnome-terminal-server.Gnome-terminal': 'gnome-terminal',
};

const executableFileExclusions = [
  'N/A',
  'desktop_window.Nautilus',
  'tilda.Tilda',
];

function savePositions(sessionName) {
  getActiveWindowList((windowList) => {
    readWindowStates(windowList, () => {
      readDesktopFilePaths(windowList, () => {
        db.save(sessionName || 'DEFAULT', windowList)
      });
    });
  });
}

function startSession(sessionName) {
  db.get(sessionName || 'DEFAULT', (err, savedWindowList) => {
    getActiveWindowList((currentWindowList) => {
      startSessionPrograms(savedWindowList, currentWindowList);

      // TODO make this smarter by actively polling the opened windows
      setTimeout(() => {
        updateWindowIds(savedWindowList, currentWindowList);
        restoreWindowPositions(savedWindowList, () => {
          console.log('RESTORE SESSION');
        });
      }, WAIT_FOR_PROGRAMS_TO_START_TIMEOUT);
    });
  });
}

function readWindowStates(windowList, cb) {
  const promises = [];
  windowList.forEach((win) => {
    promises.push(readWindowState(win));
  });

  Promise.all(promises).then((results) => {
    console.log(results);
    cb(results);
  });
}

function readWindowState(win) {
  return new Promise(function (fulfill, reject) {
    exec(`xprop -id ${win.windowId} | grep "_NET_WM_STATE(ATOM)"`, (error, stdout, stderr) => {
      if (error || stderr) {
        console.log(error, stderr);
        reject(error || stderr);
      } else {
        const stringStates = stdout.replace('_NET_WM_STATE(ATOM) = ', '')
          .replace('\n', '');
        const states = stringStates.split(' = ');
        win.states = [];
        states.forEach((state) => {
          if (state !== '') {
            win.states.push(state);
          }
        });
        fulfill(win.states);
      }
    });
  });
}


function readDesktopFilePaths(windowList, cb) {
  const promises = [];
  windowList.forEach((win) => {
    if (isDesktopFile(win.executableFile)) {
      promises.push(readFilePath(win));
    }
  });

  Promise.all(promises).then((results) => {
    cb(results);
  });
}

function readFilePath(win) {
  return new Promise(function (fulfill, reject) {
    exec('locate ' + win.executableFile, (error, stdout, stderr) => {
      if (error || stderr) {
        console.log(error, stderr);
        reject(error || stderr);
      } else {
        const lines = stdout.split('\n');
        // just default to first for now
        win.desktopFilePath = lines[0];
        fulfill(win.desktopFilePath);
      }
    });
  });
}

// TODO check for how many instances there should be running of a program
function startSessionPrograms(windowList, currentWindowList) {
  windowList.forEach((win) => {
    if (!isProgramAlreadyRunning(win.executableFile, currentWindowList)) {
      startProgram(win.executableFile, win.desktopFilePath);
    }
  });
}

function isProgramAlreadyRunning(executableFile, currentWindowList, numberOfInstancesToRun = 1) {
  let instancesRunning = 0;
  currentWindowList.forEach((win) => {
    if (win.executableFile === executableFile) {
      instancesRunning++;
    }
  });
  console.log(executableFile + ' is running: ', instancesRunning >= numberOfInstancesToRun);
  return instancesRunning >= numberOfInstancesToRun;
}

function getActiveWindowList(cb) {
  const cmd = 'wmctrl -p -G -l -x';

  exec(cmd, function (error, stdout, stderr) {
    const data = transformWmctrlList(stdout);
    if (error || stderr) {
      console.log(error, stderr);
    } else {
      cb(data);
    }
  });
}

function isDesktopFile(executableFile) {
  return executableFile.match(/desktop$/);
}

function isExcluded(executableFile) {
  return executableFileExclusions.indexOf(executableFile) > -1;
}

function startProgram(executableFile, desktopFilePath) {
  let cmd;
  if (desktopFilePath) {
    cmd = `awk '/^Exec=/ {sub("^Exec=", ""); gsub(" ?%[cDdFfikmNnUuv]", ""); exit system($0)}' ${desktopFilePath}`;
  } else {
    cmd = executableFile;
  }
  exec(cmd, {
    detached: true,
  }, (error, stdout, stderr) => {
    if (error || stderr) {
      console.log(error, stderr);
    }
  }).unref();
}

function transformWmctrlList(stdout) {
  const LINE_REG_EX = /([^\s]+)\s+(-*\d+)\s+(-*\d+)\s+(-*\d+)\s+(-*\d+)\s+(-*\d+)\s+(-*\d+)\s+([^\s]+)/;
  const data = [];
  const lines = stdout.split('\n');
  lines.forEach((line) => {
    const fields = LINE_REG_EX.exec(line);
    if (fields && !isExcluded(fields[8])) {
      data.push({
        windowId: fields[1],
        gravity: parseInt(fields[2], 10),
        x: parseInt(fields[4], 10),
        y: parseInt(fields[5], 10),
        width: parseInt(fields[6], 10),
        height: parseInt(fields[7], 10),
        executableFile: handleDesktopFiles(fields[8]),
      });
    }
  });
  return data;
}

function handleDesktopFiles(executableFileString) {
  if (executableFileMap[executableFileString]) {
    return executableFileMap[executableFileString];
  } else {
    const splitValues = executableFileString.split('.');
    return splitValues[0] + '.desktop';
  }
}

function updateWindowIds(savedWindowList, currentWindowList) {
  savedWindowList.forEach((win) => {
    win.windowId = getWindowIdByExecutableFileString(win, currentWindowList);
  });
}

function getWindowIdByExecutableFileString(win, currentWindowList) {
  const currentWindow = currentWindowList.find((winFromCurrent) => win.executableFile === winFromCurrent.executableFile);
  return currentWindow && currentWindow.windowId;
}

function restoreWindowPositions(savedWindowList, cb) {
  const promises = [];
  savedWindowList.forEach((win) => {
    if (win.windowId) {
      promises.push(restoreWindowPosition(win));
    }
  });

  Promise.all(promises).then((results) => {
    cb(results);
  });
}

function restoreWindowPosition(win) {
  const newPositionStr = `${win.gravity},${win.x},${win.y},${win.width},${win.height}`;
  const states = 'remove,maximized_vert,maximized_horz,fullscreen,above,below';
  const cmd = `wmctrl -i -r ${win.windowId} -e ${newPositionStr}  -b ${states}`;
  console.log(cmd, win.executableFile);

  //console.log(win.windowId, win.executableFile, newPositionStr);

  return new Promise(function (fulfill, reject) {
    exec(cmd, (error, stdout, stderr) => {
      if (error || stderr) {
        console.log(error, stderr);
        reject(error || stderr);
      } else {
        console.log(stdout);
        const lines = stdout.split('\n');
        win.desktopFilePath = lines[0];
        fulfill(stdout);
      }
    });
  });
}
console.log(process.argv);

if (process.argv[2] === 'save') {
  savePositions();
} else {
  startSession();
}
