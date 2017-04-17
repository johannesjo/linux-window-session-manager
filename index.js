const exec = require('child_process').exec;
const spawn = require('child_process').spawn;
const Store = require('jfs');
const db = new Store('sessionStore');
const POLL_ALL_APPS_STARTED_TIMEOUT = 2000;
const EXECUTABLE_FILE_MAP = {
  'sun-awt-X11-XFramePeer.jetbrains-idea': 'jetbrains-idea.desktop',
  'gnome-terminal-server.Gnome-terminal': 'gnome-terminal',
};

const EXECUTABLE_FILE_EXCLUSIONS = [
  'N/A',
  'desktop_window.Nautilus',
  'tilda.Tilda',
];
const STATES_MAP = {
  '_NET_WM_STATE_MAXIMIZED_VERT': 'maximized_vert',
  '_NET_WM_STATE_MAXIMIZED_HORZ': 'maximized_horz',
  '_NET_WM_STATE_FULLSCREEN': 'fullscreen',
  '_NET_WM_STATE_ABOVE': 'above',
  '_NET_WM_STATE_BELOW': 'below',
};

function savePositions(sessionName) {
  const sessionToHandle = sessionName || 'DEFAULT';

  getActiveWindowList((windowList) => {
    readWindowStates(windowList, () => {
      readDesktopFilePaths(windowList, () => {
        getConnectedDisplaysId((connectedDisplaysId) => {

          // check if entry exists and update
          db.get(sessionToHandle, (err, sessionData) => {
            if (sessionData) {
              console.log(sessionData);

              sessionData[connectedDisplaysId] = windowList;
              db.save(sessionToHandle, sessionData);
            } else {
              const newSession = {};
              newSession[connectedDisplaysId] = windowList;
              db.save(sessionToHandle, newSession);
            }
          });
        });
      });
    });
  });
}

function startSession(sessionName) {
  const sessionToHandle = sessionName || 'DEFAULT';

  db.get(sessionToHandle || 'DEFAULT', (err, sessionData) => {
    getConnectedDisplaysId((connectedDisplaysId) => {
      const savedWindowList = sessionData[connectedDisplaysId];

      if (!savedWindowList) {
        console.error(`no data for current display id ${connectedDisplaysId} saved yet`);
        return;
      }

      getActiveWindowList((currentWindowList) => {
        startSessionPrograms(savedWindowList, currentWindowList);
        waitForAllAppsToStart(savedWindowList, (updatedCurrentWindowList) => {
          updateWindowIds(savedWindowList, updatedCurrentWindowList);
          restoreWindowPositions(savedWindowList, () => {
            console.log('RESTORED SESSION');
          });
        });
      });
    });
  });
}

function getConnectedDisplaysId(cb) {
  const cmd = `xrandr --query | grep '\\bconnected\\b'`;
  exec(cmd, (error, stdout, stderr) => {
    if (error || stderr) {
      console.error(error, stderr);
    } else {
      const connectedDisplaysId = createConnectedDisplaysId(stdout);
      cb(connectedDisplaysId);
    }
  });
}

function createConnectedDisplaysId(stdout) {
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

function waitForAllAppsToStart(savedWindowList, cb) {
  setTimeout(() => {
    getActiveWindowList((currentWindowList) => {
      if (!isAllAppsStarted(savedWindowList, currentWindowList)) {
        waitForAllAppsToStart(savedWindowList, cb);
      } else {
        cb(currentWindowList);
      }
    });
  }, POLL_ALL_APPS_STARTED_TIMEOUT);
}

function isAllAppsStarted(savedWindowList, currentWindowList) {
  let isAllStarted = true;
  savedWindowList.forEach((win) => {
    if (!getMatchingWindowId(win, currentWindowList)) {
      isAllStarted = false;
    }
  });
  return isAllStarted;
}

function readWindowStates(windowList, cb) {
  const promises = [];
  windowList.forEach((win) => {
    promises.push(readWindowState(win));
  });

  Promise.all(promises).then((results) => {
    cb(results);
  });
}

function readWindowState(win) {
  return new Promise(function (fulfill, reject) {
    exec(`xprop -id ${win.windowId} | grep "_NET_WM_STATE(ATOM)"`, (error, stdout, stderr) => {
      if (error || stderr) {
        console.error(error, stderr);
        reject(error || stderr);
      } else {
        const stringStates = stdout.replace('_NET_WM_STATE(ATOM) = ', '')
          .replace('\n', '');
        const states = stringStates.split(' = ');
        win.states = [];
        states.forEach((state) => {
          if (state !== '' && STATES_MAP[state]) {
            win.states.push(STATES_MAP[state]);
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
        console.error(error, stderr);
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
      console.error(error, stderr);
    } else {
      cb(data);
    }
  });
}

function isDesktopFile(executableFile) {
  return executableFile.match(/desktop$/);
}

function isExcluded(executableFile) {
  return EXECUTABLE_FILE_EXCLUSIONS.indexOf(executableFile) > -1;
}

function startProgram(executableFile, desktopFilePath) {
  let cmd;
  let args = [];
  if (desktopFilePath) {
    cmd = `awk`;
    args.push('/^Exec=/ {sub("^Exec=", ""); gsub(" ?%[cDdFfikmNnUuv]", ""); exit system($0)}');
    args.push(desktopFilePath);
  } else {
    cmd = executableFile;
    // TODO split args if necessary
  }
  spawn(cmd, args, {
    stdio: 'ignore',
    detached: true,
  }, (error, stdout, stderr) => {
    if (error || stderr) {
      console.error(error, stderr);
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
  if (EXECUTABLE_FILE_MAP[executableFileString]) {
    return EXECUTABLE_FILE_MAP[executableFileString];
  } else {
    const splitValues = executableFileString.split('.');
    return splitValues[0] + '.desktop';
  }
}

function updateWindowIds(savedWindowList, currentWindowList) {
  savedWindowList.forEach((win) => {
    win.windowId = getMatchingWindowId(win, currentWindowList);
  });
}

function getMatchingWindowId(win, currentWindowList) {
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
  const removeStatesStr = 'remove,maximized_vert,maximized_horz,fullscreen,above,below,hidden,sticky,modal,shaded,demands_attention';
  const baseCmd = `wmctrl -i -r ${win.windowId}`;

  // add remove states command
  let cmd = `${baseCmd} -b  ${removeStatesStr}`;

  // add add states command
  if (win.states && win.states.length > 0) {
    cmd = `${cmd} &&  ${baseCmd} -b add,${win.states.join(',')}`;
  }

  // add restore positions command
  cmd = `${cmd} && ${baseCmd} -e ${newPositionStr}`;

  return new Promise(function (fulfill, reject) {
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
  });
}

if (process.argv[2] === 'save') {
  savePositions();
} else {
  startSession();
}

