const findup = require('findup-sync');
const fs = require('fs');

const HOME_DIR = process.env['HOME'];
const DEFAULT_DESKTOP_FILE_LOCATIONS = [
  '{home}/.local/share/applications',
  '{home}/.gnome/apps/',
  '/usr/share/applications',
  '/usr/local/share/applications',
  '/usr/share/app-install',
];

let CFG;

module.exports = {
  mkdirSync,
  mkfileSync,
  copySync,
  withCfg: (passedCFG) => {
    CFG = passedCFG;
    return {findDesktopFile: ME_findDesktopFile};
  }
};

function catchGenericErr(err) {
  console.error('util: Generic Error', err, err.stack);
  console.log('util:', arguments);
}


function findDesktopFile(fileName) {
  return new Promise((fulfill, reject) => {
    const desktopFileLocations = CFG.DESKTOP_FILE_LOCATIONS || DEFAULT_DESKTOP_FILE_LOCATIONS;
    const patterns = [];

    const parentDirs = desktopFileLocations.map((parentDir) => {
      return parentDir.replace('{home}', HOME_DIR);
    });


    let firstFile;
    const match = parentDirs.find((dir) => {
      firstFile = findup(fileName, {cwd: dir});
      return firstFile;
    });

    if (!firstFile || !match) {
      const err = 'findDesktopFile cant find file; searched patterns';
      console.error(err, patterns);
      reject(err);
    } else {
      fulfill(firstFile);
    }
  }).catch(catchGenericErr);
}

function mkdirSync(dirPath) {
  try {
    fs.mkdirSync(dirPath);
  } catch (err) {
    if (err.code !== 'EEXIST') {
      throw err;
    }
  }
}

function mkfileSync(filePath) {
  try {
    fs.writeFileSync(filePath, {flag: 'wx'});
  } catch (err) {
    if (err.code !== 'EEXIST') {
      throw err;
    }
  }
}

function copySync(src, dest) {
  if (!fs.existsSync(src)) {
    return false;
  }
  const data = fs.readFileSync(src, 'utf-8');
  fs.writeFileSync(dest, data);
}
