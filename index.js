const exec = require('child_process').exec;
const Store = require('jfs');
const db = new Store('sessionStore');
const executableFileMap = {
  'sun-awt-X11-XFramePeer.jetbrains-idea': 'jetbrains-idea.desktop',
  'gnome-terminal-server.Gnome-terminal': 'gnome-terminal',
};

const executableFileExclusions = [
  'N/A',
  'desktop_window.Nautilus',
];

function savePositions(sessionName) {
  getActiveWindowList((windowList) => {
    setDesktopFilePaths(windowList, () => {
      db.save(sessionName || 'DEFAULT', windowList)
    });
  });
}

function startSession(sessionName) {
  db.get(sessionName || 'DEFAULT', (err, windowList) => {
    getActiveWindowList((currentWindowList) => {
      startSessionPrograms(windowList, currentWindowList);
    });
  });
}

function setDesktopFilePaths(windowList, cb) {
  const promises = [];
  windowList.forEach((win) => {
    if (isDesktopFile(win.executableFile)) {
      promises.push(setFilePath(win));
    }
  });

  Promise.all(promises).then((results) => {
    console.log('PROMISES DONE');
    console.log(results);
    cb(results);
  });
}

function setFilePath(win) {
  return new Promise(function (fulfill, reject) {
    exec('locate ' + win.executableFile, (error, stdout, stderr) => {
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
    cmd = `awk '/^Exec=/ {sub("^Exec=", ""); gsub(" ?%[cDdFfikmNnUuv]", ""); exit system($0)}' ${executableFile}`;
  } else {
    cmd = executableFile;
  }
  exec(cmd, (error, stdout, stderr) => {
    if (error || stderr) {
      console.log(error, stderr);
    }
  });
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
        left: parseInt(fields[4], 10),
        top: parseInt(fields[5], 10),
        bottom: parseInt(fields[6], 10),
        right: parseInt(fields[7], 10),
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

//savePositions();
startSession();