'use strict';

import {IS_DEBUG} from './isDebug';
import {CFG} from './config';
import {exec, spawn} from 'child_process';
import {parseCmdArgs} from './parseCmdToSpawn';
import {WinObj, WinObjIdOnly} from './model';
import {log} from './log';

// 500kb
const MAX_BUFFER = 1024 * 500;
const EXEC_OPTS = {
    maxBuffer: MAX_BUFFER,
};


// display
// -------
export function getConnectedDisplaysId(): Promise<string | any> {
    const cmd = CFG.CMD.GET_DISPLAY_ID;
    return new Promise((fulfill, reject) => {
        exec(cmd, EXEC_OPTS, (error, stdout, stderr) => {
            if (error || stderr) {
                console.error(error, stderr);
                reject(error || stderr);
            } else {
                const connectedDisplaysId = _parseConnectedDisplaysId(stdout);
                fulfill(connectedDisplaysId);
            }
        });
    }).catch(_catchGenericErr);
}

function _parseConnectedDisplaysId(stdout): string {
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
export function getAdditionalMetaDataForWin(win: WinObjIdOnly): Promise<WinObj | unknown> {
    const tmpWin: any = {...win};
    return new Promise((fulfill, reject) => {
        exec(`${CFG.CMD.XPROP_ID} ${tmpWin.windowId}`, EXEC_OPTS, (error, stdout, stderr) => {
            if (error || stderr) {
                console.error(tmpWin, error, stderr);
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
                    // parse wmClassName
                    if (propertyName === 'WM_CLASS(STRING)') {
                        const propertyNameFromMap = CFG.WM_META_MAP[propertyName];
                        const classNames = value.split(', ');
                        let className = '';
                        classNames.forEach((state) => {
                            if (state !== '') {
                                className += state.replace(/"/g, '') + '.';
                            }
                        });
                        tmpWin[propertyNameFromMap] = className.substr(0, className.length - 1);
                    }
                    // parse states
                    else if (propertyName === '_NET_WM_STATE(ATOM)') {
                        const states = value.split(', ');
                        tmpWin.states = [];
                        states.forEach((state) => {
                            if (state !== '') {
                                tmpWin.states.push(state);
                            }
                        });
                    }
                    // parse simple strings and integers
                    else if (propertyNameFromMap) {
                        // special handle number types
                        if (CFG.WM_META_MAP_NUMBER_TYPES.indexOf(propertyName) > -1) {
                            tmpWin[propertyNameFromMap] = parseInt(value, 10);
                        } else {
                            tmpWin[propertyNameFromMap] = value;
                        }
                    }
                });
                fulfill(tmpWin);
            }
        });
    }).catch(_catchGenericErr);
}

// TODO prettify args structure
export function startProgram(executableFile: string, desktopFilePath: string): Promise<void> {
    IS_DEBUG && console.log('DEBUG: startProgram():', executableFile, desktopFilePath);

    let cmd;
    let args = [];
    if (desktopFilePath) {
        cmd = `awk`;
        args.push('/^Exec=/ {sub("^Exec=", ""); gsub(" ?%[cDdFfikmNnUuv]", ""); exit system($0)}');
        args.push(desktopFilePath);
    } else {
        const parsedCmd = parseCmdArgs(executableFile);
        cmd = parsedCmd[0];
        args = parsedCmd[1];
    }

    return new Promise((fulfill) => {
        spawn(cmd, args, {
            stdio: 'ignore',
            detached: true,
        }).unref();

        // currently we have no error handling as the process is started detached
        fulfill();
    });
}

// GET ACTIVE WINDOW LIST
// ----------------------
export async function getActiveWindowList(): Promise<WinObj[]> {
    const windowIds = await _getActiveWindowIds();
    const windowList: WinObjIdOnly[] = [];
    windowIds.forEach((windowId) => {
        windowList.push({
            windowId: windowId,
            windowIdDec: parseInt(windowId, 16),
        });
    });

    // add meta data right away
    const promises = windowList.map((win) => getAdditionalMetaDataForWin(win));

    const windowsWithData: WinObj[] = await Promise.all(promises) as WinObj[];

    IS_DEBUG && console.log('DEBUG: getActiveWindowList():', windowList);
    return windowsWithData.filter(_filterInvalidWindows);
}

function _filterInvalidWindows(win: WinObj): boolean {
    // filter none normal windows, excluded class names and incomplete windows
    const isNormalWindow = (!win.wmType || win.wmType === '_NET_WM_WINDOW_TYPE_NORMAL');

    const isNotExcluded = !(_isExcludedWmClassName(win.wmClassName));
    const hasWmClassName = !!(win.wmClassName);

    // warn if no wmClassName even though there should be
    if (isNormalWindow && isNotExcluded && !hasWmClassName) {
        console.warn(win.windowId + ' has no wmClassName. Win: ', win);
    }

    return (isNormalWindow && isNotExcluded && hasWmClassName);
}

function _getActiveWindowIds(): Promise<string[] | any> {
    const cmd = 'xprop -root|grep ^_NET_CLIENT_LIST\\(WINDOW\\)';
    return new Promise((fulfill, reject) => {
        exec(cmd, EXEC_OPTS, (error, stdout, stderr) => {
            if (error || stderr) {
                console.error('xprop', error, stderr);
                reject(error || stderr);
            } else {
                const windowIds = _parseWindowIds(stdout);
                fulfill(windowIds);
            }
        });
    }).catch(_catchGenericErr);
}

function _parseWindowIds(stdout): string[] {
    const str = stdout.replace('_NET_CLIENT_LIST(WINDOW): window id #', '');
    return str.split(', ');
}

function _isExcludedWmClassName(wmClassName): boolean {
    return CFG.WM_CLASS_EXCLUSIONS.indexOf(wmClassName) > -1;
}

function _catchGenericErr(err): void {
    console.error('otherCmd: Generic Error', err, err.stack);
    log('otherCmd:', arguments);
}
