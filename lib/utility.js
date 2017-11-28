const findup = require('findup-sync');

const HOME_DIR = process.env['HOME'];
const DEFAULT_DESKTOP_FILE_LOCATIONS = [
  '{home}/.local/share/applications',
  '{home}/.gnome/apps/',
  '/usr/share/applications',
  '/usr/local/share/applications',
  '/usr/share/app-install',
];

let CFG;

module.exports = (passedCFG) => {
  CFG = passedCFG;
  return {
    findDesktopFile,
  };
};

function catchGenericErr(err) {
  console.error('util: Generic Error', err, err.stack);
  console.log('util:', arguments);
}

function findDesktopFile(fileName) {
  return new Promise((fulfill, reject) => {
    const desktopFileLocations = CFG.DESKTOP_FILE_LOCATIONS || DEFAULT_DESKTOP_FILE_LOCATIONS;
    const patterns = [];
    desktopFileLocations.forEach((parentDir) => {
      const parDirWithHome = parentDir.replace('{home}', HOME_DIR);

      patterns.push(parDirWithHome + '/' + fileName);
      patterns.push(parDirWithHome + '/**/' + fileName);
    });

    const firstFile = findup(patterns);

    if (!firstFile) {
      const err = 'findDesktopFile cant find file; searched patterns';
      console.error(err, patterns);
      reject(err);
    } else {
      fulfill(firstFile);
    }
  }).catch(catchGenericErr);
}
