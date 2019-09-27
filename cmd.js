#!/usr/bin/env node
'use strict';
const base = require('./dist/index');
const omelette = require('omelette');

const createWhatTodoTxt = (win) => ``;



// There should be no output to stdin until completion.init()
const sessionList = Object.keys(base.getSessions());

let completion = omelette('lwsm');
completion.tree({
  save: sessionList,
  restore: sessionList
});
completion.init();

if (~process.argv.indexOf('--setupCompletion')) {
  completion.setupShellInitFile()
}

function catchInputHandlerErr(err) {
  console.error('Input Handler Error: ', err, err.stack);
}

const savePrompts = {
  desktopFilePath: (error, win, stdout) => {
    return new Promise((fulfill, reject) => {
      function askForVal(displayEntries) {
        // autosave first entry for now
        if (displayEntries && displayEntries[0]) {
          // take appimagekit links into account
          if (displayEntries[0].match(/appimagekit/) && displayEntries[1]) {
            fulfill(displayEntries[1]);
          } else {
            fulfill(displayEntries[0]);
          }
        } else {
          reject('No input for desktop file path for window "' + win.wmClassName + '". Please fix this manually in config file for this session in ~/.lwsm/{currentSessionName}.json\n' + createWhatTodoTxt(win));
        }
      }

      if (error) {
        if (stdout && stdout.split) {
          askForVal(stdout.split('\n'));
        } else {
          askForVal();
        }
      } else if (stdout && stdout.split) {
        const displayEntries = stdout.split('\n');
        let displayStr = '';
        for (let i = 0; i < displayEntries.length; i++) {
          if (displayEntries[i] !== '') {
            displayStr += `${i + 1}. ${displayEntries[i]} \n`;
          }
        }

        askForVal(displayEntries);
      } else {
        askForVal();
      }
    }).catch(catchInputHandlerErr);
  }
};

const isCloseAllWinBefore = process.argv.indexOf('--closeAllOpenWindows') > -1;
const action = process.argv[2];
let sessionName;
if (process.argv[3] && !process.argv[3].match(/^--/)) {
  sessionName = process.argv[3];
}

function killX11() {
  const x = x11().X;
  if (x) {
    x.terminate();
  }
}

if (action === 'save') {
  base.saveSession(sessionName, savePrompts).then(killX11);
} else if (action === 'restore') {
  base.restoreSession(sessionName, isCloseAllWinBefore).then(killX11);
} else if (action === 'remove') {
  base.removeSession(sessionName).then(killX11);
} else if (action === 'resetCfg') {
  base.resetCfg();
} else if (action === 'list') {
  base.listSessions();
} else if (action === 'rename' && sessionName && (process.argv[4] && !process.argv[4].match(/^--/))) {
  base.renameSession(sessionName, process.argv[4]);
} else {
  console.log(`
  Usage:\n
  Saving your current windows:
  lwsm save [OPTIONAL_SESSION_ID]
  
  Restoring a session:
  lwsm restore [OPTIONAL_SESSION_ID] [--closeAllOpenWindows]

  List all saved sessions:
  lwsm list

  Renaming a session:
  lwsm save [OLD_NAME] [NEW_NAME]
  `);
}
