#!/usr/bin/env node
'use strict';
const base = require('./index');
const prompt = require('prompt');

const savePrompts = {
  desktopFilePath: (error, win, stdout) => {
    return new Promise((fulfill, reject) => {
      function askForVal(displayEntries) {
        prompt.get('input', (err, result) => {
          const intVal = parseInt(result.input, 10);

          if (result.input && result.input.length > 2) {
            fulfill(result.input);
            console.log(`Saving ${result.input}\n`);
          } else if (displayEntries && intVal > 0 && displayEntries[intVal - 1]) {
            fulfill(displayEntries[intVal - 1]);
            console.log(`Saving ${displayEntries[intVal - 1]}\n`);
          } else {
            reject();
          }
        });
      }

      if (error) {
        console.log(`Please enter a executable path or desktop file location for ${win.executableFile}`);
        if (stdout) {
          askForVal(stdout.split('\n'));
        } else {
          askForVal();
        }
      } else {
        console.log(`We found the following entries for ${win.executableFile} as executable / desktop file to launch:`);
        const displayEntries = stdout.split('\n');
        let displayStr = '';
        for (let i = 0; i < displayEntries.length; i++) {
          if (displayEntries[i] !== '') {
            displayStr += `${i + 1}. ${displayEntries[i]} \n`;
          }
        }
        console.log(displayStr);
        console.log('Please select one by typing in the corresponding number or enter a path manually:');

        askForVal(displayEntries);
      }
    });
  }
};

if (process.argv[2] === 'save') {
  base.savePositions(process.argv[3], savePrompts);
} else if (process.argv[2] === 'restore') {
  base.restoreSession(process.argv[3]);
} else {
  console.log(`
  Usage:\n
  Saving your current windows:
  lwsm save [OPTIONAL_SESSION_ID]
  
  Restoring a session:
  lwsm restore [OPTIONAL_SESSION_ID]
  `);
}