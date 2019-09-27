'use strict';
import {getWindowGeometry, goToViewport} from './x11Wrapper';
import {getActiveWindowList} from './otherCmd';
import {CFG} from './config';

const waterfall = require('promise-waterfall');
const findup = require('findup-sync');


const HOME_DIR = process.env['HOME'];
const DEFAULT_DESKTOP_FILE_LOCATIONS = [
    '{home}/.local/share/applications',
    '{home}/.gnome/apps/',
    '/usr/share/applications',
    '/usr/local/share/applications',
    '/usr/share/app-install',
];


function _catchGenericErr(err) {
    console.error('Generic Error in Meta Wrapper', err, err.stack);
    throw err;
}

export function goToFirstWorkspace() {
    return goToViewport(0, 0);
}

export function findDesktopFile(fileName) {
    console.log(fileName);
    console.log(fileName);
    console.log(fileName);

    return new Promise((fulfill, reject) => {
        const desktopFileLocations = CFG().DESKTOP_FILE_LOCATIONS || DEFAULT_DESKTOP_FILE_LOCATIONS;
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
    }).catch(_catchGenericErr);
}


export function getActiveWindowListFlow() {
    return new Promise((fulfill, reject) => {
        return getActiveWindowList()
            .then((windowList: any[]) => {
                const promises = [];

                windowList.forEach((win) => {
                    promises.push(() => {
                        return getWindowGeometry(win.windowId)
                            .then((geo) => {
                                for (let prop in geo) {
                                    if (geo.hasOwnProperty(prop)) {
                                        win[prop] = geo[prop];
                                    }
                                }

                                // TODO organize adding of all those different properties better
                                // add missing static properties
                                win.simpleName = _parseSimpleWindowName(win.wmClassName);
                            });
                    });
                });

                // we're using a waterfall because we're dealing with x11 requests

                if (promises.length > 0) {
                    waterfall(promises)
                        .then(() => {
                            _addParsedExecutableFilesFromWmClassNames(windowList)
                                .then((windowListWithWmClassNames) => {
                                    fulfill(windowListWithWmClassNames);
                                });
                        })
                        .catch(reject);
                } else {
                    fulfill([]);
                }
            });
    }).catch(_catchGenericErr);
}

// MIXED
function _addParsedExecutableFilesFromWmClassNames(windowList) {
    return new Promise((fulfill, reject) => {
        const promises = windowList.filter(win => !win.executableFile)
            .map((win) => {
                return _parseExecutableFileFromWmClassName(win.wmClassName)
                    .then((fileName) => {
                        win.executableFile = fileName;
                    });
            });

        // TODO replace waterfall with regular exec
        console.log(promises);
        
        if (promises.length) {
            waterfall(promises)
                .then(() => {
                    fulfill(windowList);
                })
                .catch(reject);
        } else {
            fulfill(windowList);
        }
    }).catch(_catchGenericErr);
}

function _parseExecutableFileFromWmClassName(wmClassName) {
    return new Promise((fulfill, reject) => {
        console.log(wmClassName);

        const executableFileFromMap = CFG().WM_CLASS_AND_EXECUTABLE_FILE_MAP[wmClassName];
        if (executableFileFromMap) {
            fulfill(executableFileFromMap);
        } else {
            const splitValues = wmClassName.split('.');
            const fileName = splitValues[0];
            if (_isChromeApp(fileName)) {
                _parseChromeAppDesktopFileName(fileName)
                    .then(fulfill)
                    .catch(reject);
            } else {
                fulfill(fileName + '.desktop');
            }
        }
    }).catch(_catchGenericErr);
}

function _parseSimpleWindowName(wmClassName) {
    const splitValues = wmClassName.split('.');
    if (splitValues[1]) {
        return splitValues[1];
    } else {
        return wmClassName;
    }
}

function _isChromeApp(fileName) {
    return !!fileName.match(/^crx_/);
}

function _parseChromeAppDesktopFileName(fileName) {
    return new Promise((resolve, reject) => {
        // we wan't to search from desktop files only
        const locateStr = fileName.replace('crx_', '*') + '*.desktop';
        findDesktopFile(locateStr)
            .then(resolve)
            .catch(reject);
    }).catch(_catchGenericErr);
}
