#!/usr/bin/env node
const base = require('./index');

if (process.argv[2] === 'save') {
  base.savePositions(process.argv[3]);
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