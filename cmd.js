#!/usr/bin/env node
'use strict';
const base = require('./lib/index');
const omelette = require('omelette');

const createWhatTodoTxt = (win) => `
LWSM was unable to guess the location of your executable/desktop file.
 
There are two things, that you can do now: 

Either you can locate the executable or desktop file manually for 
the application  which isn't started (e.g. via the locate command), 
and add it to ~/.lwsm/{currentSessionName}.json. If you want to 
persist the mapping you might also want to open ~/.lwsm/config.json 
and edit the WM_CLASS_AND_EXECUTABLE_FILE_MAP property by adding a 
mapping for '${win.wmClassName}'.

If there is a desktop file for the application you might want 
to add it's location to the DESKTOP_FILE_LOCATIONS property 
in ~/.lwsm/config.json to make sure this folder is also searched
the next LWSM tries to guess an desktop file path.

If you want LWSM to ignore the application, you can add 
the application to the ignore list in ~/.lwsm/config.json which 
is located under the WM_CLASS_EXCLUSIONS property.

If everything fails please open up an issue at:
https://github.com/johannesjo/linux-window-session-manager/issues

`;


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
          reject('No input for desktop file path for window "' + win.wmClassName + '". Please fix this manually in config file for this session in ~/.lwsm/{currentSessionName}.json\n'+createWhatTodoTxt(win));
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

if (action === 'save') {
  base.saveSession(sessionName, savePrompts);
} else if (action === 'restore') {
  base.restoreSession(sessionName, isCloseAllWinBefore);
} else if (action === 'remove') {
  base.removeSession(sessionName);
} else if (action === 'resetCfg') {
  base.resetCfg();
} else if (action === 'list') {
  base.listSessions();
} else if (action === 'rename' && sessionName && (process.argv[4] && !process.argv[4].match(/^--/))) {
  base.renameSession(sessionName,process.argv[4]);
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
