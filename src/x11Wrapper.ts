'use strict';

import {log} from './log';
import {CFG} from './config';

const x11 = require('x11');

export let X;
let root;
let display;


// export const getWindowInfo = wrapX11(_getWindowInfo);
export const getX = () => X;

function catchGenericErr(err) {
    console.error('x11Wrapper: ', err, err.stack);
}

let isClientInitialized = false;
let initPromise;

export function initX11(): Promise<any> {
    if (isClientInitialized) {
        return Promise.resolve();
    }
    if (initPromise) {
        return initPromise;
    }
    initPromise = new Promise((fulfill, reject) => {
        x11.createClient((err, displayIn) => {
            if (err) {
                reject(err);
            } else {
                display = displayIn;
                X = display.client;

                root = display.screen[0].root;
                isClientInitialized = true;
                fulfill();
            }
        }).on('error', (err) => {
            console.error(err);
        });
    }).catch(catchGenericErr);
    return initPromise;
}

// METHODS
// -------
export function getDisplays(): any[] {
    if (!display) {
        throw new Error('X11 not initialized / No screen available');
    }
    return display.screen;
}

export function getWindowGeometry(winId) {
    const geo: any = {};

    return new Promise((fulfill, reject) => {
        X.TranslateCoordinates(winId, root, 0, 0, (err, res) => {
            if (err) {
                reject(err);
            } else {
                geo.x = res.destX;
                geo.y = res.destY;

                X.GetGeometry(winId, (err, res) => {
                    if (err) {
                        reject(err);
                    } else {
                        geo.width = res.width;
                        geo.height = res.height;
                        fulfill(geo);
                    }
                });
            }
        });
    }).catch(catchGenericErr);
}

export async function getActiveWindowIds(): Promise<string[]> {
    const idStr = await getProp(root, 498);
    return _parseWindowIds(idStr);
}

export function restoreWindowPosition(win) {
    log('Restoring window position for "' + win.wmClassName + '"');
    const STATES_TO_RESET = [
        '_NET_WM_STATE_MAXIMIZED_VERT',
        '_NET_WM_STATE_MAXIMIZED_HORZ'
    ];
    return new Promise((fulfill, reject) => {
        setState(win.windowId, 'remove', STATES_TO_RESET)
            .catch(reject)
            .then(() => {
                X.MoveResizeWindow(win.windowId, win.x, win.y, win.width, win.height);
                setState(win.windowId, 'add', win.states)
                    .catch(reject)
                    .then(() => {
                        fulfill();
                    });
            })
            .catch(reject);
    }).catch(catchGenericErr);
}

export function closeWindow(winId) {
    return _sendX11ClientMessage(winId, '_NET_CLOSE_WINDOW');
}

export function moveToWorkspace(winId, workSpaceNr) {
    // NOTE: if it doesn't work we might also want to use _WIN_WORKSPACE
    return _sendX11ClientMessage(winId, '_NET_WM_DESKTOP', [{
        value: workSpaceNr,
    }]);
}

export function goToViewport(x, y) {
    return _sendX11ClientMessage(root, '_NET_DESKTOP_VIEWPORT', [
            {value: x},
            {value: y},
        ]
    );
}

export function setState(wid, actionStr, statesToHandle) {
    const ACTIONS_MAP = {
        remove: 0,
        add: 1,
        toggle: 2,
    };
    const action = ACTIONS_MAP[actionStr];
    let properties: any[] = [
        {value: action},
    ];

    // all properties need to be looked up for their atom id
    if (Array.isArray(statesToHandle) && statesToHandle.length > 0) {
        statesToHandle.forEach((stateProperty) => {
            properties.push({
                isAtom: true,
                value: stateProperty,
            });
        });
        return _sendX11ClientMessage(wid, '_NET_WM_STATE', properties);
    } else {
        return Promise.resolve();
    }
}

const PROPS_TO_GET = [
    'WM_CLASS',
    '_NET_WM_STATE',
    '_NET_WM_DESKTOP',
    'WM_NAME',
    '_NET_WM_PID',
    '_NET_WM_WINDOW_TYPE',
    '_BAMF_DESKTOP_FILE',
];

export async function getWindowInfo(wid): Promise<any> {
    // X.GetGeometry(wid, function (err, clientGeom) {
    //   console.log("window geometry: ", clientGeom);
    // });

    const props: any[] = await _xCbToPromise(X.ListProperties, wid);

    const promises = props.map(async function (p) {
        return new Promise(async (resolve, reject) => {
            try {
                const propName = await _xCbToPromise(X.GetAtomName, p);
                if (PROPS_TO_GET.includes(propName)) {
                    const propVal = await _xCbToPromise(X.GetProperty, 0, wid, p, 0, 0, 10000000);
                    const typeName = await _xCbToPromise(X.GetAtomName, propVal.type);
                    // console.log(propVal, typeName, propName);
                    const decodedData = await _decodeProperty(typeName, propVal.data);
                    resolve(propName + '(' + typeName + ') = ' + decodedData);
                } else {
                    resolve('');
                }
            } catch (e) {
                reject(e);
            }
        });
    });

    return Promise.all(promises).then(results => {
        return results.join('\n');
    });
}

export async function getProp(id = root, propId: number): Promise<any> {
    const propVal = await _xCbToPromise(X.GetProperty, 0, id, propId, 0, 0, 10000000);
    const typeName = await _xCbToPromise(X.GetAtomName, propVal.type);
    return await _decodeProperty(typeName, propVal.data);
}

// HELPER
// ------
function _xCbToPromise(fn, ...args): any {
    return new Promise((fulfill, reject) => {
        fn.apply(X, [...args, (err, res) => {
            return err ? reject(err) : fulfill(res);
        }]);
    });
}

function _counter(initialVal, modifier) {
    // to start at val we need to subtract the modifier first
    let val = initialVal - modifier;
    return () => {
        val += modifier;
        return val;
    };
}

function _getAtoms(list, cb) {
    const res = {};
    const getAtom = () => {
        if (list.length === 0) {
            return cb(null, res);
        } else {
            const name = list.shift();
            X.InternAtom(false, name, (err, atom) => {
                if (err) {
                    return cb(err);
                } else {
                    res[name] = atom;
                    getAtom();
                }
            });
        }
    };
    getAtom();
}


function _sendX11ClientMessage(wid, eventName, eventProperties = [], optionalEventMask?) {
    if (eventProperties.length > 4) {
        throw 'only supports 4 properties at once max';
    }

    const offsetCounter = _counter(4, 4);
    const eventMask = optionalEventMask || x11.eventMask.SubstructureRedirect;

    // create atoms to look up
    let atomsList = [];
    atomsList.push(eventName);
    eventProperties.forEach((eventProperty) => {
        if (eventProperty.isAtom) {
            atomsList.push(eventProperty.value);
        }
    });

    // start buffer input
    const data = new Buffer(32);
    data.fill(0);
    data.writeInt8(33, 0); // 33 = ClientMessage
    data.writeInt8(32, 1); // format
    data.writeUInt32LE(wid, offsetCounter());

    return new Promise((fulfill, reject) => {
        _getAtoms(atomsList, (err, atoms) => {
            if (err) {
                reject(err);
                throw err;
            } else {
                data.writeUInt32LE(atoms[eventName], offsetCounter());

                eventProperties.forEach((eventProperty) => {
                    if (eventProperty.isAtom) {
                        data.writeUInt32LE(atoms[eventProperty.value], offsetCounter());
                    } else {
                        data.writeUInt32LE(eventProperty.value, offsetCounter());
                    }
                });

                let sourceIndication = 1;
                data.writeUInt32LE(sourceIndication, offsetCounter());

                X.SendEvent(root, 0, eventMask, data);

                // we need a little time for the buffer to be processed
                setTimeout(fulfill, CFG.GIVE_X11_TIME_TIMEOUT);
            }
        });
    }).catch(catchGenericErr);
}

async function _decodeProperty(type, data): Promise<any> {
    switch (type) {
        case 'STRING': {
            const result = [];
            let s = '';
            for (let i = 0; i < data.length; ++i) {
                if (data[i] == 0) {
                    result.push(s);
                    s = '';
                    continue;
                }
                s += String.fromCharCode(data[i]);
            }
            result.push(s);
            return result.map(quotize).join(', ');
        }
        case 'ATOM':
            if (data.length > 32) {
                return 'LOOOOOOOOOOOOOOOOOOOOOOOOOOOOOONG';
            }

            const promises = [];
            for (let i = 0; i < data.length; i += 4) {
                const a = data.unpack('L', i)[0];
                promises.push(_xCbToPromise(X.GetAtomName, a));
            }
            return await Promise.all(promises).then(res => {
                return res.join(', ');
            });

        case 'CARDINAL':
        case 'INTEGER': {
            const res = [];
            for (let i = 0; i < data.length; i += 4) {
                res.push(data.unpack('L', i)[0]);
            }
            return res.join(', ');
        }
        case 'WINDOW':
            const res = [];
            for (let i = 0; i < data.length; i += 4) {
                res.push(data.unpack('L', i)[0]);
            }
            return 'window id# ' + res.map((n) => {
                return '0x' + n.toString(16);
            }).join(', ');

        default:
            return 'WTF ' + type;
    }
}

function quotize(i) {
    return '\"' + i + '\"';
}

function _parseWindowIds(strIn): string[] {
    const str = strIn.replace('window id# ', '');
    return str.split(', ');
}

//const testFn = wrapX11(closeWindow);
//testFn('0x04a00001').then((geo) => {
//});

//const testFn = wrapX11(moveToWorkspace);
//testFn('0x04e00001 ', 2);

//const testFnX = wrapX11(restoreWindowPosition);
//testFnX({
//  windowId: '0x04a00001',
//  x: 0,
//  y: 0,
//  width: 500,
//  height: 500,
//  states: [
//    '_NET_WM_STATE_MAXIMIZED_VERT'
//  ]
//});

//const testFn2 = wrapX11(setState);
//testFn2('0x04a00001', 'remove', ['_NET_WM_STATE_MAXIMIZED_VERT', '_NET_WM_STATE_MAXIMIZED_HORZ', '_NET_WM_STATE_FULLSCREEN'])
//  .then((res) => {
//    console.log('NORMAL', res);
//  });
