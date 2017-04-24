const exec = require('child_process').exec;
const spawn = require('child_process').spawn;
const parseCmdToSpawn = require('./parseCmdToSpawn');

let CFG;

module.exports = (passedCFG) => {
  CFG = passedCFG;
  return {
    getConnectedDisplaysId,
    readAndSetAdditionalMetaDataForWin,
    locate,
    startProgram,
  };
};

function catchGenericErr(err) {
  console.error('otherCmd: Generic Error', err);
}

// display
// -------
function getConnectedDisplaysId() {
  const cmd = CFG.CMD.GET_DISPLAY_ID;
  return new Promise((fulfill, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error || stderr) {
        console.error(error, stderr);
        reject(error || stderr);
      } else {
        const connectedDisplaysId = parseConnectedDisplaysId(stdout);
        fulfill(connectedDisplaysId);
      }
    });
  }).catch(catchGenericErr);
}

function parseConnectedDisplaysId(stdout) {
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

// Other
// --------
function readAndSetAdditionalMetaDataForWin(win) {
  return new Promise((fulfill, reject) => {
    exec(`${CFG.CMD.XPROP_ID} ${win.windowId}`, (error, stdout, stderr) => {
      if (error || stderr) {
        console.error(error, stderr);
        reject(error || stderr);
      } else {
        const lines = stdout.split('\n');

        lines.forEach((line) => {
          const words = line.split(' ');
          const propertyName = words[0];

          // remove property name and "="
          words.splice(0, 2);
          const value = words.join(' ');
          const propertyNameFromMap = CFG.WM_META_MAP[propertyName];
          if (propertyNameFromMap) {
            // special handle number types
            if (CFG.WM_META_MAP_NUMBER_TYPES.indexOf(propertyName) > -1) {
              win[propertyNameFromMap] = parseInt(value, 10);
            } else {
              win[propertyNameFromMap] = value;
            }
          }
          // parse states
          else if (propertyName === '_NET_WM_STATE(ATOM)') {
            const states = value.split(', ');
            win.states = [];
            states.forEach((state) => {
              if (state !== '') {
                win.states.push(state);
              }
            });
          }
        });
        fulfill(win);
      }
    });
  }).catch(catchGenericErr);
}

// TODO give an array as response
function locate(file) {
  return new Promise((fulfill, reject) => {
    exec(CFG.CMD.LOCATE + ' ' + file, (error, stdout, stderr) => {
      if (error || stderr) {
        reject(error | stderr);
      } else {
        fulfill(stdout);
      }
    });
  }).catch(catchGenericErr);
}

// TODO prettify args structure
function startProgram(executableFile, desktopFilePath) {
  let cmd;
  let args = [];
  if (desktopFilePath) {
    cmd = `awk`;
    args.push('/^Exec=/ {sub("^Exec=", ""); gsub(" ?%[cDdFfikmNnUuv]", ""); exit system($0)}');
    args.push(desktopFilePath);
  } else {
    [cmd, args] = parseCmdToSpawn(executableFile);
  }

  return new Promise((fulfill) => {
    spawn(cmd, args, {
      stdio: 'ignore',
      detached: true,
    }).unref();

    // currently we have no error handling as the process is started detached
    fulfill();
  }).catch(catchGenericErr);
}