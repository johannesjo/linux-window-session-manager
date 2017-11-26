const findup = require('findup-sync');

const HOME_DIR = process.env['HOME'];
const DESKTOP_FILE_LOCATIONS = [
  HOME_DIR + '/.local/share/applications',
  HOME_DIR + '/.gnome/apps/',
  '/usr/share/applications',
  '/usr/local/share/applications',
  '/usr/share/app-install',
];

module.exports = {
  findDesktopFile,
};

function catchGenericErr(err) {
  console.error('util: Generic Error', err, err.stack);
  console.log('util:', arguments);
}

function findDesktopFile(fileName) {
  return new Promise((fulfill, reject) => {
    const patterns = [];
    DESKTOP_FILE_LOCATIONS.forEach((parentDir) => {
      patterns.push(parentDir + '/' + fileName);
      patterns.push(parentDir + '/**/' + fileName);
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
