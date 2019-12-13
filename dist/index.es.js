import { mkdirSync as mkdirSync$1, readFileSync, writeFileSync, existsSync, unlinkSync, unlink } from 'fs';
import { spawn } from 'child_process';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

function mkdirSync(dirPath) {
    try {
        mkdirSync$1(dirPath);
    }
    catch (err) {
        if (err.code !== 'EEXIST') {
            throw err;
        }
    }
}
function mergeDeep() {
    var objects = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        objects[_i] = arguments[_i];
    }
    var isObject = function (obj) { return obj && typeof obj === 'object'; };
    return objects.reduce(function (prev, obj) {
        Object.keys(obj).forEach(function (key) {
            var pVal = prev[key];
            var oVal = obj[key];
            if (Array.isArray(pVal) && Array.isArray(oVal)) {
                prev[key] = pVal.concat.apply(pVal, oVal);
            }
            else if (isObject(pVal) && isObject(oVal)) {
                prev[key] = mergeDeep(pVal, oVal);
            }
            else {
                prev[key] = oVal;
            }
        });
        return prev;
    }, {});
}

var DEFAULT_CFG = {
    "GIVE_X11_TIME_TIMEOUT": 80,
    "POLL_ALL_APPS_STARTED_INTERVAL": 2000,
    "POLL_ALL_MAX_TIMEOUT": 120000,
    "SAVE_SESSION_IN_PRETTY_FORMAT": true,
    "WM_CLASS_AND_EXECUTABLE_FILE_MAP": {
        "gnome-terminal-server.Gnome-terminal": "gnome-terminal",
        "google-chrome.Google-chrome": "google-chrome.desktop",
        "brave-browser.Brave-browser": "brave-browser.desktop",
        "Mail.Thunderbird": "thunderbird.desktop",
        "nautilus.Nautilus": "nautilus",
        "org.gnome.Nautilus.Org.gnome.Nautilus": "nautilus",
        "Navigator.Firefox": "firefox.desktop",
        "Navigator.Pale": "palemoon.desktop",
        "skype.Skype": "skypeforlinux.desktop",
        "sun-awt-X11-XFramePeer.jetbrains-idea": "jetbrains-idea.desktop",
        "VirtualBox.VirtualBox": "virtualbox.desktop",
        "Telegram.TelegramDesktop": "telegram-desktop_telegramdesktop.desktop",
        "telegram-desktop.TelegramDesktop": "telegramdesktop.desktop",
        "keepassxc.keepassxc": "keepassxc_keepassxc.desktop",
        "slack.Slack": "com.slack.Slack.desktop",
        "signal.Signal": "signal-desktop.desktop",
    },
    "WM_CLASS_EXCLUSIONS": [
        "N/A",
        "tilda.Tilda",
        "Popup.desktop",
        "update-manager.Update-manager",
        "desktop_window.Nautilus",
        "electron.Electron",
        "guake.Main.py",
        'gnome-software.Gnome-software'
    ],
    "WM_META_MAP": {
        "WM_CLASS(STRING)": "wmClassName",
        "_NET_WM_STATE(ATOM)": "states",
        "_NET_WM_DESKTOP(CARDINAL)": "wmCurrentDesktopNr",
        "WM_NAME(UTF8_STRING)": "wmTitle",
        "_NET_WM_PID(CARDINAL)": "wmPid",
        "_NET_WM_WINDOW_TYPE(ATOM)": "wmType",
        "_BAMF_DESKTOP_FILE(STRING)": "executableFile"
    },
    "WM_META_MAP_NUMBER_TYPES": [
        "_NET_WM_PID(CARDINAL)",
        "_NET_WM_DESKTOP(CARDINAL)"
    ],
    "DESKTOP_FILE_LOCATIONS": [
        "{home}/.local/share/applications",
        "{home}/.gnome/apps/",
        "/usr/share/applications",
        "/usr/local/share/applications",
        "/usr/share/app-install",
        "{home}/.config/autostart/",
        "/var/lib/snapd/desktop/applications",
        "/var/lib/flatpak/app",
        "/snap/bin"
    ]
};

var log = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return console.log.apply(console, args);
};

var cfg;
var CFG_DATA_DIR = _getUserHome() + '/.lwsm';
var CFG_FILE_PATH = CFG_DATA_DIR + '/config.json';
var SESSION_DATA_DIR = CFG_DATA_DIR + '/sessionData';
// INIT
// ------------
try {
    // if config is already in place
    var fromFile = JSON.parse(readFileSync(CFG_FILE_PATH, 'utf8'));
    cfg = mergeDeep(DEFAULT_CFG, fromFile);
}
catch (e) {
    log('lwsm: no config file present or it contains invalid json. Creating new one...');
    // if there is no config yet load default cfg and create files and dirs
    cfg = DEFAULT_CFG;
    // save executable paths to cfg
    cfg.CMD_JSFILE_PATH = __dirname + '/../cmd.js';
    cfg.JSFILE_INDEX_PATH = __dirname + '/index.js';
    mkdirSync(CFG_DATA_DIR);
    mkdirSync(SESSION_DATA_DIR);
    // write config to user dir
    writeFileSync(CFG_FILE_PATH, JSON.stringify(cfg, null, 2), 'utf8');
}
// also make data dirs accessible to the outside
cfg.DATA_DIR = CFG_DATA_DIR;
cfg.SESSION_DATA_DIR = SESSION_DATA_DIR;
var CFG = cfg;
function _getUserHome() {
    return process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'];
}

var IS_DEBUG = process.argv.indexOf('--debug') > -1;

var parseCmdArgs = function (cmd) {
    var cmdAllSplit = cmd.split(/ /);
    var mainCommand = cmdAllSplit[0];
    var args = [];
    cmdAllSplit.map(function (s, i) {
        if (i !== 0) {
            args[i - 1] = cmdAllSplit[i];
        }
    });
    return [mainCommand, _mergeQuotedStringParams(args)];
};
function _mergeQuotedStringParams(args) {
    var newArgs = [];
    var isInQuotation = false;
    var currentQuotationArg;
    // TODO make it work with more different quotation types
    args.forEach(function (arg) {
        // match quotation end
        if (arg.match(/'$/)) {
            currentQuotationArg += ' ' + arg.slice(0, arg.length - 1);
            newArgs.push(currentQuotationArg);
            currentQuotationArg = undefined;
            isInQuotation = false;
        }
        // match quotation start
        else if (arg.match(/^'/)) {
            isInQuotation = true;
            currentQuotationArg = arg.substr(1, arg.length);
        }
        // while in quotation
        else if (isInQuotation) {
            currentQuotationArg += ' ' + arg;
        }
        else if (arg !== '') {
            newArgs.push(arg);
        }
    });
    return newArgs;
}

var x11 = require('x11');
var X;
var root;
var display;
// export const getWindowInfo = wrapX11(_getWindowInfo);
var getX = function () { return X; };
function catchGenericErr(err) {
    console.error('x11Wrapper: ', err, err.stack);
}
var isClientInitialized = false;
var initPromise;
function initX11() {
    if (isClientInitialized) {
        return Promise.resolve();
    }
    if (initPromise) {
        return initPromise;
    }
    initPromise = new Promise(function (fulfill, reject) {
        x11.createClient(function (err, displayIn) {
            if (err) {
                reject(err);
            }
            else {
                display = displayIn;
                X = display.client;
                root = display.screen[0].root;
                isClientInitialized = true;
                fulfill();
            }
        }).on('error', function (err) {
            console.error(err);
        });
    }).catch(catchGenericErr);
    return initPromise;
}
// METHODS
// -------
function getDisplays() {
    if (!display) {
        throw new Error('X11 not initialized / No screen available');
    }
    return display.screen;
}
function getWindowGeometry(winId) {
    var geo = {};
    return new Promise(function (fulfill, reject) {
        X.TranslateCoordinates(winId, root, 0, 0, function (err, res) {
            if (err) {
                reject(err);
            }
            else {
                geo.x = res.destX;
                geo.y = res.destY;
                X.GetGeometry(winId, function (err, res) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        geo.width = res.width;
                        geo.height = res.height;
                        fulfill(geo);
                    }
                });
            }
        });
    }).catch(catchGenericErr);
}
function getActiveWindowIds() {
    return __awaiter(this, void 0, Promise, function () {
        var PROP_NAME, propId, idStr;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    PROP_NAME = '_NET_CLIENT_LIST';
                    return [4 /*yield*/, _getPropertyIdByName(root, PROP_NAME)];
                case 1:
                    propId = _a.sent();
                    return [4 /*yield*/, getProp(root, propId)];
                case 2:
                    idStr = _a.sent();
                    return [2 /*return*/, _parseWindowIds(idStr)];
            }
        });
    });
}
function restoreWindowPosition(win) {
    log('Restoring window position for "' + win.wmClassName + '"');
    var STATES_TO_RESET = [
        '_NET_WM_STATE_MAXIMIZED_VERT',
        '_NET_WM_STATE_MAXIMIZED_HORZ'
    ];
    return new Promise(function (fulfill, reject) {
        setState(win.windowId, 'remove', STATES_TO_RESET)
            .catch(reject)
            .then(function () {
            X.MoveResizeWindow(win.windowId, win.x, win.y, win.width, win.height);
            setState(win.windowId, 'add', win.states)
                .catch(reject)
                .then(function () {
                fulfill();
            });
        })
            .catch(reject);
    }).catch(catchGenericErr);
}
function closeWindow(winId) {
    return _sendX11ClientMessage(winId, '_NET_CLOSE_WINDOW');
}
function moveToWorkspace(winId, workSpaceNr) {
    // NOTE: if it doesn't work we might also want to use _WIN_WORKSPACE
    return _sendX11ClientMessage(winId, '_NET_WM_DESKTOP', [{
            value: workSpaceNr,
        }]);
}
function goToViewport(x, y) {
    return _sendX11ClientMessage(root, '_NET_DESKTOP_VIEWPORT', [
        { value: x },
        { value: y },
    ]);
}
function setState(wid, actionStr, statesToHandle) {
    var ACTIONS_MAP = {
        remove: 0,
        add: 1,
        toggle: 2,
    };
    var action = ACTIONS_MAP[actionStr];
    var properties = [
        { value: action },
    ];
    // all properties need to be looked up for their atom id
    if (Array.isArray(statesToHandle) && statesToHandle.length > 0) {
        statesToHandle.forEach(function (stateProperty) {
            properties.push({
                isAtom: true,
                value: stateProperty,
            });
        });
        return _sendX11ClientMessage(wid, '_NET_WM_STATE', properties);
    }
    else {
        return Promise.resolve();
    }
}
var PROPS_TO_GET = [
    'WM_CLASS',
    '_NET_WM_STATE',
    '_NET_WM_DESKTOP',
    'WM_NAME',
    '_NET_WM_PID',
    '_NET_WM_WINDOW_TYPE',
    '_BAMF_DESKTOP_FILE',
];
function getWindowInfo(wid) {
    return __awaiter(this, void 0, Promise, function () {
        var props, promises;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, _xCbToPromise(X.ListProperties, wid)];
                case 1:
                    props = _a.sent();
                    promises = props.map(function (p) {
                        return __awaiter(this, void 0, void 0, function () {
                            var _this = this;
                            return __generator(this, function (_a) {
                                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                                        var propName, propVal, typeName, decodedData, e_1;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    _a.trys.push([0, 7, , 8]);
                                                    return [4 /*yield*/, _xCbToPromise(X.GetAtomName, p)];
                                                case 1:
                                                    propName = _a.sent();
                                                    if (!PROPS_TO_GET.includes(propName)) return [3 /*break*/, 5];
                                                    return [4 /*yield*/, _xCbToPromise(X.GetProperty, 0, wid, p, 0, 0, 10000000)];
                                                case 2:
                                                    propVal = _a.sent();
                                                    return [4 /*yield*/, _xCbToPromise(X.GetAtomName, propVal.type)];
                                                case 3:
                                                    typeName = _a.sent();
                                                    return [4 /*yield*/, _decodeProperty(typeName, propVal.data)];
                                                case 4:
                                                    decodedData = _a.sent();
                                                    resolve(propName + '(' + typeName + ') = ' + decodedData);
                                                    return [3 /*break*/, 6];
                                                case 5:
                                                    resolve('');
                                                    _a.label = 6;
                                                case 6: return [3 /*break*/, 8];
                                                case 7:
                                                    e_1 = _a.sent();
                                                    reject(e_1);
                                                    return [3 /*break*/, 8];
                                                case 8: return [2 /*return*/];
                                            }
                                        });
                                    }); })];
                            });
                        });
                    });
                    return [2 /*return*/, Promise.all(promises).then(function (results) {
                            return results.join('\n');
                        })];
            }
        });
    });
}
function getProp(id, propId) {
    if (id === void 0) { id = root; }
    return __awaiter(this, void 0, Promise, function () {
        var propVal, typeName;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, _xCbToPromise(X.GetProperty, 0, id, propId, 0, 0, 10000000)];
                case 1:
                    propVal = _a.sent();
                    return [4 /*yield*/, _xCbToPromise(X.GetAtomName, propVal.type)];
                case 2:
                    typeName = _a.sent();
                    return [4 /*yield*/, _decodeProperty(typeName, propVal.data)];
                case 3: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
// HELPER
// ------
function _xCbToPromise(fn) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return new Promise(function (fulfill, reject) {
        fn.apply(X, __spreadArrays(args, [function (err, res) {
                return err ? reject(err) : fulfill(res);
            }]));
    });
}
function _counter(initialVal, modifier) {
    // to start at val we need to subtract the modifier first
    var val = initialVal - modifier;
    return function () {
        val += modifier;
        return val;
    };
}
function _getAtoms(list, cb) {
    var res = {};
    var getAtom = function () {
        if (list.length === 0) {
            return cb(null, res);
        }
        else {
            var name_1 = list.shift();
            X.InternAtom(false, name_1, function (err, atom) {
                if (err) {
                    return cb(err);
                }
                else {
                    res[name_1] = atom;
                    getAtom();
                }
            });
        }
    };
    getAtom();
}
function _getPropertyIdByName(wid, nameToGet) {
    return __awaiter(this, void 0, Promise, function () {
        var props, promises, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, _xCbToPromise(X.ListProperties, wid)];
                case 1:
                    props = _a.sent();
                    promises = props.map(function (p) {
                        return __awaiter(this, void 0, void 0, function () {
                            var propName;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, _xCbToPromise(X.GetAtomName, p)];
                                    case 1:
                                        propName = _a.sent();
                                        if (nameToGet === propName) {
                                            return [2 /*return*/, p];
                                        }
                                        else {
                                            return [2 /*return*/, false];
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        });
                    });
                    return [4 /*yield*/, Promise.all(promises)];
                case 2:
                    res = _a.sent();
                    return [2 /*return*/, res.find(function (item) { return item > 0; })];
            }
        });
    });
}
function _sendX11ClientMessage(wid, eventName, eventProperties, optionalEventMask) {
    if (eventProperties === void 0) { eventProperties = []; }
    if (eventProperties.length > 4) {
        throw 'only supports 4 properties at once max';
    }
    var offsetCounter = _counter(4, 4);
    var eventMask = optionalEventMask || x11.eventMask.SubstructureRedirect;
    // create atoms to look up
    var atomsList = [];
    atomsList.push(eventName);
    eventProperties.forEach(function (eventProperty) {
        if (eventProperty.isAtom) {
            atomsList.push(eventProperty.value);
        }
    });
    // start buffer input
    var data = new Buffer(32);
    data.fill(0);
    data.writeInt8(33, 0); // 33 = ClientMessage
    data.writeInt8(32, 1); // format
    data.writeUInt32LE(wid, offsetCounter());
    return new Promise(function (fulfill, reject) {
        _getAtoms(atomsList, function (err, atoms) {
            if (err) {
                reject(err);
                throw err;
            }
            else {
                data.writeUInt32LE(atoms[eventName], offsetCounter());
                eventProperties.forEach(function (eventProperty) {
                    if (eventProperty.isAtom) {
                        data.writeUInt32LE(atoms[eventProperty.value], offsetCounter());
                    }
                    else {
                        data.writeUInt32LE(eventProperty.value, offsetCounter());
                    }
                });
                var sourceIndication = 1;
                data.writeUInt32LE(sourceIndication, offsetCounter());
                X.SendEvent(root, 0, eventMask, data);
                // we need a little time for the buffer to be processed
                setTimeout(fulfill, CFG.GIVE_X11_TIME_TIMEOUT);
            }
        });
    }).catch(catchGenericErr);
}
function _decodeProperty(type, data) {
    return __awaiter(this, void 0, Promise, function () {
        var _a, result, s, i, promises, i, a, res_1, i, res, i, e_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 8, , 9]);
                    _a = type;
                    switch (_a) {
                        case 'STRING': return [3 /*break*/, 1];
                        case 'ATOM': return [3 /*break*/, 2];
                        case 'CARDINAL': return [3 /*break*/, 4];
                        case 'INTEGER': return [3 /*break*/, 4];
                        case 'WINDOW': return [3 /*break*/, 5];
                    }
                    return [3 /*break*/, 6];
                case 1:
                    {
                        result = [];
                        s = '';
                        for (i = 0; i < data.length; ++i) {
                            if (data[i] == 0) {
                                result.push(s);
                                s = '';
                                continue;
                            }
                            s += String.fromCharCode(data[i]);
                        }
                        result.push(s);
                        return [2 /*return*/, result.map(quotize).join(', ')];
                    }
                    _b.label = 2;
                case 2:
                    if (data.length > 32) {
                        return [2 /*return*/, 'LOOOOOOOOOOOOOOOOOOOOOOOOOOOOOONG'];
                    }
                    promises = [];
                    for (i = 0; i < data.length; i += 4) {
                        a = data.unpack('L', i)[0];
                        promises.push(_xCbToPromise(X.GetAtomName, a));
                    }
                    return [4 /*yield*/, Promise.all(promises).then(function (res) {
                            return res.join(', ');
                        })];
                case 3: return [2 /*return*/, _b.sent()];
                case 4:
                    {
                        res_1 = [];
                        for (i = 0; i < data.length; i += 4) {
                            res_1.push(data.unpack('L', i)[0]);
                        }
                        return [2 /*return*/, res_1.join(', ')];
                    }
                    _b.label = 5;
                case 5:
                    res = [];
                    for (i = 0; i < data.length; i += 4) {
                        res.push(data.unpack('L', i)[0]);
                    }
                    return [2 /*return*/, 'window id# ' + res.map(function (n) {
                            return '0x' + n.toString(16);
                        }).join(', ')];
                case 6: return [2 /*return*/, 'WTF ' + type];
                case 7: return [3 /*break*/, 9];
                case 8:
                    e_2 = _b.sent();
                    console.log(type, data);
                    console.error(e_2);
                    throw new Error(e_2);
                case 9: return [2 /*return*/];
            }
        });
    });
}
function quotize(i) {
    return '\"' + i + '\"';
}
function _parseWindowIds(strIn) {
    var str = strIn.replace('window id# ', '');
    return str.split(', ');
}

// display
// -------
function getConnectedDisplaysId() {
    var displays = getDisplays();
    return displays.map(function (screen) { return screen.pixel_width + 'x' + screen.pixel_height; }).join(';');
}
// Other
// --------
function getAdditionalMetaDataForWin(win) {
    return __awaiter(this, void 0, Promise, function () {
        var stdout, lines, winCopy;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getWindowInfo(win.windowId)];
                case 1:
                    stdout = _a.sent();
                    lines = stdout.split('\n');
                    winCopy = __assign({}, win);
                    lines.forEach(function (line) {
                        var words = line.split(' ');
                        var propertyName = words[0];
                        // remove property name and "="
                        words.splice(0, 2);
                        var value = words.join(' ');
                        var propertyNameFromMap = CFG.WM_META_MAP[propertyName];
                        // parse wmClassName
                        if (propertyName === 'WM_CLASS(STRING)') {
                            var propertyNameFromMap_1 = CFG.WM_META_MAP[propertyName];
                            var classNames = value.split(', ');
                            var className_1 = '';
                            classNames.forEach(function (state) {
                                if (state !== '') {
                                    className_1 += state.replace(/"/g, '') + '.';
                                }
                            });
                            winCopy[propertyNameFromMap_1] = className_1.substr(0, className_1.length - 2);
                        }
                        // parse states
                        else if (propertyName === '_NET_WM_STATE(ATOM)') {
                            var states = value.split(', ');
                            winCopy.states = [];
                            states.forEach(function (state) {
                                if (state !== '') {
                                    winCopy.states.push(state);
                                }
                            });
                        }
                        // parse simple strings and integers
                        else if (propertyNameFromMap) {
                            // special handle number types
                            if (CFG.WM_META_MAP_NUMBER_TYPES.indexOf(propertyName) > -1) {
                                winCopy[propertyNameFromMap] = parseInt(value, 10);
                            }
                            else {
                                winCopy[propertyNameFromMap] = value;
                            }
                        }
                    });
                    // console.log(winCopy);
                    return [2 /*return*/, winCopy];
            }
        });
    });
}
// TODO prettify args structure
function startProgram(executableFile, desktopFilePath) {
    IS_DEBUG && console.log('DEBUG: startProgram():', executableFile, desktopFilePath);
    var cmd;
    var args = [];
    if (desktopFilePath) {
        cmd = "awk";
        args.push('/^Exec=/ {sub("^Exec=", ""); gsub(" ?%[cDdFfikmNnUuv]", ""); exit system($0)}');
        args.push(desktopFilePath);
    }
    else {
        var parsedCmd = parseCmdArgs(executableFile);
        cmd = parsedCmd[0];
        args = parsedCmd[1];
    }
    return new Promise(function (fulfill) {
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
function getActiveWindowList() {
    return __awaiter(this, void 0, Promise, function () {
        var windowIds, windowList, promises, windowsWithData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getActiveWindowIds()];
                case 1:
                    windowIds = _a.sent();
                    windowList = [];
                    windowIds.forEach(function (windowId) {
                        windowList.push({
                            windowId: windowId,
                            windowIdDec: parseInt(windowId, 16),
                        });
                    });
                    promises = windowList.map(function (win) { return getAdditionalMetaDataForWin(win); });
                    return [4 /*yield*/, Promise.all(promises)];
                case 2:
                    windowsWithData = _a.sent();
                    IS_DEBUG && console.log('DEBUG: getActiveWindowList():', windowList);
                    return [2 /*return*/, windowsWithData.filter(_filterInvalidWindows)];
            }
        });
    });
}
function _filterInvalidWindows(win) {
    // filter none normal windows, excluded class names and incomplete windows
    var isNormalWindow = (!win.wmType || win.wmType === '_NET_WM_WINDOW_TYPE_NORMAL');
    var isNotExcluded = !(_isExcludedWmClassName(win.wmClassName));
    var hasWmClassName = !!(win.wmClassName);
    // warn if no wmClassName even though there should be
    if (isNormalWindow && isNotExcluded && !hasWmClassName) {
        console.warn(win.windowId + ' has no wmClassName. Win: ', win);
    }
    return (isNormalWindow && isNotExcluded && hasWmClassName);
}
function _isExcludedWmClassName(wmClassName) {
    return CFG.WM_CLASS_EXCLUSIONS.indexOf(wmClassName) > -1;
}

var findup = require('findup-sync');
var HOME_DIR = process.env['HOME'];
var DEFAULT_DESKTOP_FILE_LOCATIONS = [
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
function goToFirstWorkspace() {
    return goToViewport(0, 0);
}
function findDesktopFile(fileName) {
    return new Promise(function (fulfill, reject) {
        var desktopFileLocations = CFG.DESKTOP_FILE_LOCATIONS || DEFAULT_DESKTOP_FILE_LOCATIONS;
        var patterns = [];
        var parentDirs = desktopFileLocations.map(function (parentDir) {
            return parentDir.replace('{home}', HOME_DIR);
        });
        var firstFile;
        var match = parentDirs.find(function (dir) {
            firstFile = findup(fileName, { cwd: dir });
            return firstFile;
        });
        if (!firstFile || !match) {
            var err = 'findDesktopFile cant find file; searched patterns';
            console.error(err, patterns);
            reject(err);
        }
        else {
            fulfill(firstFile);
        }
    }).catch(_catchGenericErr);
}
function getActiveWindowListFlow() {
    var _this = this;
    return new Promise(function (fulfill, reject) { return __awaiter(_this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            return [2 /*return*/, getActiveWindowList()
                    .then(function (windowList) { return __awaiter(_this, void 0, void 0, function () {
                    var promises, _i, promises_1, promise, e_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                promises = windowList.map(function (win) {
                                    return getWindowGeometry(win.windowId)
                                        .then(function (geo) {
                                        for (var prop in geo) {
                                            if (geo.hasOwnProperty(prop)) {
                                                win[prop] = geo[prop];
                                            }
                                        }
                                        // TODO organize adding of all those different properties better
                                        // add missing static properties
                                        win.simpleName = _parseSimpleWindowName(win.wmClassName);
                                        return win;
                                    });
                                });
                                if (!promises.length) return [3 /*break*/, 7];
                                _i = 0, promises_1 = promises;
                                _a.label = 1;
                            case 1:
                                if (!(_i < promises_1.length)) return [3 /*break*/, 6];
                                promise = promises_1[_i];
                                _a.label = 2;
                            case 2:
                                _a.trys.push([2, 4, , 5]);
                                return [4 /*yield*/, promise];
                            case 3:
                                _a.sent();
                                return [3 /*break*/, 5];
                            case 4:
                                e_1 = _a.sent();
                                reject(e_1);
                                return [3 /*break*/, 5];
                            case 5:
                                _i++;
                                return [3 /*break*/, 1];
                            case 6:
                                _addParsedExecutableFilesFromWmClassNames(windowList)
                                    .then(function (windowListWithWmClassNames) {
                                    fulfill(windowListWithWmClassNames);
                                });
                                return [3 /*break*/, 8];
                            case 7:
                                fulfill([]);
                                _a.label = 8;
                            case 8: return [2 /*return*/];
                        }
                    });
                }); })];
        });
    }); }).catch(_catchGenericErr);
}
// MIXED
function _addParsedExecutableFilesFromWmClassNames(windowList) {
    var _this = this;
    return new Promise(function (fulfill, reject) { return __awaiter(_this, void 0, void 0, function () {
        var promises, _i, promises_2, promise, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    promises = windowList.filter(function (win) { return !win.executableFile; })
                        .map(function (win) {
                        return _parseExecutableFileFromWmClassName(win.wmClassName)
                            .then(function (fileName) {
                            win.executableFile = fileName;
                        });
                    });
                    if (!promises.length) return [3 /*break*/, 7];
                    _i = 0, promises_2 = promises;
                    _a.label = 1;
                case 1:
                    if (!(_i < promises_2.length)) return [3 /*break*/, 6];
                    promise = promises_2[_i];
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, promise];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    e_2 = _a.sent();
                    reject(e_2);
                    return [3 /*break*/, 5];
                case 5:
                    _i++;
                    return [3 /*break*/, 1];
                case 6:
                    fulfill(windowList);
                    return [3 /*break*/, 8];
                case 7:
                    fulfill(windowList);
                    _a.label = 8;
                case 8: return [2 /*return*/];
            }
        });
    }); }).catch(_catchGenericErr);
}
function _parseExecutableFileFromWmClassName(wmClassName) {
    return new Promise(function (fulfill, reject) {
        var executableFileFromMap = CFG.WM_CLASS_AND_EXECUTABLE_FILE_MAP[wmClassName];
        if (executableFileFromMap) {
            fulfill(executableFileFromMap);
        }
        else {
            var splitValues = wmClassName.split('.');
            var fileName = splitValues[0];
            if (_isChromeApp(fileName)) {
                _parseChromeAppDesktopFileName(fileName)
                    .then(fulfill)
                    .catch(reject);
            }
            else {
                fulfill(fileName + '.desktop');
            }
        }
    }).catch(_catchGenericErr);
}
function _parseSimpleWindowName(wmClassName) {
    var splitValues = wmClassName.split('.');
    if (splitValues[1]) {
        return splitValues[1];
    }
    else {
        return wmClassName;
    }
}
function _isChromeApp(fileName) {
    return !!fileName.match(/^crx_/);
}
function _parseChromeAppDesktopFileName(fileName) {
    return new Promise(function (resolve, reject) {
        // we wan't to search from desktop files only
        var locateStr = fileName.replace('crx_', '*') + '*.desktop';
        findDesktopFile(locateStr)
            .then(resolve)
            .catch(reject);
    }).catch(_catchGenericErr);
}

// import * as Store from 'jfs';
var Store = require('jfs');
// create data store
var db = new Store(SESSION_DATA_DIR, { pretty: CFG.SAVE_SESSION_IN_PRETTY_FORMAT });
// setup meta wrapper
// EXPORT
// ------
var index = {
    listSessions: listSessions,
    renameSession: renameSession,
    saveSession: saveSession,
    removeSession: removeSession,
    restoreSession: restoreSession,
    getSessions: getSessions,
    getX: getX,
    getConnectedDisplaysId: getConnectedDisplaysId,
    resetCfg: function () {
        var configFilePath = CFG.DATA_DIR + '/config.json';
        if (existsSync(configFilePath)) {
            unlinkSync(configFilePath);
        }
        else {
            console.error('No Config present in ' + configFilePath);
        }
    },
    getCfg: function () {
        return CFG;
    },
    getDb: function () {
        return db;
    }
};
// HELPER
// --------
function _catchGenericErr$1(err) {
    console.error('Generic Error in Main Handler', err, err.stack);
    throw err;
}
function getSessions() {
    return db.allSync();
}
// MAIN FUNCTIONS
// --------------
function listSessions() {
    var list = Object.keys(getSessions());
    list.forEach(function (name) {
        log(name);
    });
}
function renameSession(oldName, newName) {
    var obj = db.getSync(oldName);
    if (obj.message) {
        if (obj.message === 'could not load data') {
            log("Error: Could not find a session named '" + oldName + "'");
        }
        else {
            log(obj.message);
        }
        return;
    }
    db.saveSync(newName, obj);
    db.delete(oldName);
}
function saveSession(sessionName, inputHandlers) {
    var sessionToHandle = sessionName || 'DEFAULT';
    return initX11()
        .then(function () {
        return getActiveWindowListFlow();
    })
        .then(function (windowList) {
        // desktop file paths and connected display ids
        return _guessAndSetDesktopFilePaths(windowList, inputHandlers.desktopFilePath);
    })
        .then(function (windowList) {
        var connectedDisplaysId = getConnectedDisplaysId();
        return saveSessionForDisplayToDb(sessionToHandle, connectedDisplaysId, windowList);
    })
        .catch(function (err) {
        console.error('saveSession(): An error occurred', err);
        throw err;
    });
}
function saveSessionForDisplayToDb(sessionToHandle, connectedDisplaysId, windowList) {
    return new Promise(function (fulfill, reject) {
        // check if entry exists and update
        db.get(sessionToHandle, function (err, sessionData) {
            if (err) {
                // NOTE: we're not failing because, the case is probably that there is no session file yet
                log("saveSessionForDisplayToDb: no session file present yet for \"" + sessionToHandle + "\", creating a new one...");
            }
            if (!sessionData) {
                // create new object
                sessionData = {
                    name: sessionToHandle,
                };
            }
            if (!sessionData.displaysCombinations || !Array.isArray(sessionData.displaysCombinations)) {
                // create new array
                sessionData.displaysCombinations = [];
            }
            var existingDisplayEntry = sessionData.displaysCombinations.find(function (entry) { return entry.id === connectedDisplaysId; });
            if (existingDisplayEntry) {
                existingDisplayEntry.windowList = windowList;
            }
            else {
                sessionData.displaysCombinations.push({
                    id: connectedDisplaysId,
                    windowList: windowList,
                });
            }
            db.save(sessionToHandle, sessionData, function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    log('SAVED SESSION: ' + sessionToHandle);
                    fulfill();
                }
            });
        });
    });
}
function restoreSession(sessionName, isCloseAllOpenWindows) {
    var sessionToHandle = sessionName || 'DEFAULT';
    return new Promise(function (fulfill, reject) {
        db.get(sessionToHandle || 'DEFAULT', function (err, sessionData) {
            if (err) {
                reject(err);
                return;
            }
            var savedWindowList;
            initX11()
                .then(function () {
                return _closeAllWindowsIfSet(isCloseAllOpenWindows);
            })
                .then(goToFirstWorkspace)
                .then(getConnectedDisplaysId)
                .then(function (connectedDisplaysId) {
                if (!sessionData.displaysCombinations) {
                    console.error("no display combinations saved yet");
                    return;
                }
                var displayEntry = sessionData.displaysCombinations.find(function (entry) { return entry.id === connectedDisplaysId; });
                if (displayEntry) {
                    savedWindowList = displayEntry.windowList;
                }
                else {
                    console.error("no data for current display id '" + connectedDisplaysId + "' saved yet");
                    return;
                }
                return getActiveWindowListFlow();
            })
                .then(function (currentWindowList) {
                return _startSessionPrograms(savedWindowList, currentWindowList);
            })
                .then(function () {
                // gets current window list by itself and returns the updated variant
                return _waitForAllAppsToStart(savedWindowList);
            })
                .then(function (updatedCurrentWindowList) {
                _updateWindowIds(savedWindowList, updatedCurrentWindowList);
                return _restoreWindowPositions(savedWindowList);
            })
                .then(function () {
                log('RESTORED SESSION: ' + sessionToHandle);
            })
                .catch(function (err) {
                console.error('An error occurred', err);
                reject(err);
            })
                .then(fulfill);
        });
    }).catch(_catchGenericErr$1);
}
function removeSession(sessionName) {
    return new Promise(function (fulfill, reject) {
        unlink(CFG.SESSION_DATA_DIR + '/' + sessionName + '.json', function (error) {
            if (error) {
                console.error(error);
                reject(error);
            }
            else {
                fulfill();
            }
        });
    }).catch(_catchGenericErr$1);
}
function _closeAllWindowsIfSet(isCloseAll) {
    return new Promise(function (fulfill, reject) {
        if (isCloseAll) {
            log('Closing opened applications');
            getActiveWindowListFlow()
                .then(function (currentWindowList) {
                currentWindowList.forEach(function (win) {
                    closeWindow(win.windowId);
                });
                _waitForAllAppsToClose()
                    .then(fulfill)
                    .catch(reject);
            })
                .catch(reject);
        }
        else {
            fulfill();
        }
    }).catch(_catchGenericErr$1);
}
function _waitForAllAppsToClose() {
    var totalTimeWaited = 0;
    return new Promise(function (fulfill, reject) {
        function pollAllAppsClosed() {
            setTimeout(function () {
                getActiveWindowListFlow()
                    .then(function (currentWindowList) {
                    totalTimeWaited += CFG.POLL_ALL_APPS_STARTED_INTERVAL;
                    if (currentWindowList.length !== 0) {
                        if (totalTimeWaited > CFG.POLL_ALL_MAX_TIMEOUT) {
                            console.error('POLL_ALL_MAX_TIMEOUT reached');
                            reject('POLL_ALL_MAX_TIMEOUT reached');
                        }
                        else {
                            // call recursively
                            pollAllAppsClosed();
                        }
                    }
                    else {
                        fulfill(currentWindowList);
                    }
                })
                    .catch(reject);
            }, CFG.POLL_ALL_APPS_STARTED_INTERVAL);
        }
        // start once initially
        pollAllAppsClosed();
    }).catch(_catchGenericErr$1);
}
function _waitForAllAppsToStart(savedWindowList) {
    log('Waiting for all applications to start...');
    var totalTimeWaited = 0;
    var timeout;
    return new Promise(function (fulfill, reject) {
        function pollAllAppsStarted(savedWindowList, timeoutDuration) {
            if (timeoutDuration === void 0) { timeoutDuration = CFG.POLL_ALL_APPS_STARTED_INTERVAL; }
            timeout = setTimeout(function () {
                // clear timeout to be save
                if (timeout) {
                    clearTimeout(timeout);
                }
                getActiveWindowListFlow()
                    .then(function (currentWindowList) {
                    totalTimeWaited += CFG.POLL_ALL_APPS_STARTED_INTERVAL;
                    if (!_isAllAppsStarted(savedWindowList, currentWindowList)) {
                        if (totalTimeWaited > CFG.POLL_ALL_MAX_TIMEOUT) {
                            console.error('POLL_ALL_MAX_TIMEOUT reached');
                            console.error('Unable to start the following apps', _getNotStartedApps(savedWindowList, currentWindowList));
                            reject('POLL_ALL_MAX_TIMEOUT reached');
                        }
                        else {
                            // call recursively
                            pollAllAppsStarted(savedWindowList);
                        }
                    }
                    else {
                        log('All applications started');
                        fulfill(currentWindowList);
                    }
                })
                    .catch(reject);
            }, timeoutDuration);
        }
        // start once initially
        pollAllAppsStarted(savedWindowList, 500);
    }).catch(_catchGenericErr$1);
}
function _getNotStartedApps(savedWindowList, currentWindowList) {
    var nonStartedApps = [];
    savedWindowList.forEach(function (win) {
        if (!_getMatchingWindowId(win, currentWindowList)) {
            nonStartedApps.push(win);
        }
    });
    return nonStartedApps;
}
function _isAllAppsStarted(savedWindowList, currentWindowList) {
    var isAllStarted = true;
    var currentWindowListCopy = currentWindowList.slice(0);
    savedWindowList.forEach(function (win) {
        if (!_getMatchingWindowId(win, currentWindowListCopy)) {
            isAllStarted = false;
        }
        else {
            var index = currentWindowListCopy.findIndex(function (winFromCurrent) { return win.wmClassName === winFromCurrent.wmClassName; });
            currentWindowListCopy.splice(index, 1);
        }
    });
    return isAllStarted;
}
function _guessAndSetDesktopFilePaths(windowList, inputHandler) {
    return __awaiter(this, void 0, Promise, function () {
        var promises, _i, promises_1, promise, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    promises = windowList.map(function (win) { return _guessFilePath(win, inputHandler); });
                    _i = 0, promises_1 = promises;
                    _a.label = 1;
                case 1:
                    if (!(_i < promises_1.length)) return [3 /*break*/, 6];
                    promise = promises_1[_i];
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, promise];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    e_1 = _a.sent();
                    _catchGenericErr$1(e_1);
                    return [3 /*break*/, 5];
                case 5:
                    _i++;
                    return [3 /*break*/, 1];
                case 6: return [2 /*return*/, windowList];
            }
        });
    });
}
function _guessFilePath(win, inputHandler) {
    return new Promise(function (fulfill, reject) {
        function callInputHandler(error, stdout) {
            inputHandler(error, win, stdout)
                .then(function (input) {
                if (_isDesktopFile(win.executableFile)) {
                    win.desktopFilePath = input;
                    fulfill(win.desktopFilePath);
                }
                else {
                    win.executableFile = input;
                    fulfill(win.executableFile);
                }
            })
                .catch(reject);
        }
        if (_isDesktopFile(win.executableFile)) {
            findDesktopFile(win.executableFile)
                .then(function (stdout) {
                callInputHandler(null, stdout);
            })
                .catch(callInputHandler);
        }
        else {
            callInputHandler(true, win.executableFile);
        }
    }).catch(_catchGenericErr$1);
}
// TODO check for how many instances there should be running of a program
function _startSessionPrograms(windowList, currentWindowList) {
    return __awaiter(this, void 0, Promise, function () {
        var promises;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // set instances started to 0
                    windowList.forEach(function (win) { return win.instancesStarted = 0; });
                    promises = windowList
                        .filter(function (win) {
                        var numberOfInstancesOfWin = _getNumberOfInstancesToRun(win, windowList);
                        return (!_isProgramAlreadyRunning(win.wmClassName, currentWindowList, numberOfInstancesOfWin, win.instancesStarted));
                    })
                        .map(function (win) {
                        win.instancesStarted += 1;
                        return startProgram(win.executableFile, win.desktopFilePath);
                    });
                    return [4 /*yield*/, Promise.all(promises)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function _getNumberOfInstancesToRun(windowToMatch, windowList) {
    return windowList.filter(function (win) {
        return win.wmClassName === windowToMatch.wmClassName;
    }).length;
}
function _isProgramAlreadyRunning(wmClassName, currentWindowList, numberOfInstancesToRun, instancesStarted) {
    if (!numberOfInstancesToRun) {
        numberOfInstancesToRun = 1;
    }
    if (!instancesStarted) {
        instancesStarted = 0;
    }
    var instancesRunning = 0;
    currentWindowList.forEach(function (win) {
        if (win.wmClassName === wmClassName) {
            instancesRunning++;
        }
    });
    log('Status: "' + wmClassName + '" is running:', (instancesRunning + instancesStarted >= numberOfInstancesToRun), numberOfInstancesToRun, instancesStarted);
    return instancesRunning + instancesStarted >= numberOfInstancesToRun;
}
function _isDesktopFile(executableFile) {
    return executableFile && !!executableFile.match(/desktop$/);
}
function _updateWindowIds(savedWindowList, currentWindowList) {
    var wmClassNameMap = {};
    savedWindowList.forEach(function (win) {
        if (!wmClassNameMap[win.wmClassName]) {
            wmClassNameMap[win.wmClassName] = _getMatchingWindows(win, currentWindowList);
        }
        win.windowId = wmClassNameMap[win.wmClassName][0].windowId;
        win.windowIdDec = parseInt(win.windowId, 16);
        // remove first entry
        wmClassNameMap[win.wmClassName].shift();
    });
}
function _getMatchingWindowId(win, currentWindowList) {
    var currentWindow = currentWindowList.find(function (winFromCurrent) { return win.wmClassName === winFromCurrent.wmClassName; });
    return currentWindow && currentWindow.windowId;
}
function _getMatchingWindows(win, currentWindowList) {
    return currentWindowList.filter(function (winFromCurrent) { return win.wmClassName === winFromCurrent.wmClassName; });
}
function _restoreWindowPositions(savedWindowList) {
    return __awaiter(this, void 0, Promise, function () {
        var promises, _i, promises_2, promise, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    promises = [];
                    savedWindowList.forEach(function (win) {
                        promises.push(restoreWindowPosition(win));
                        promises.push(moveToWorkspace(win.windowId, win.wmCurrentDesktopNr));
                    });
                    _i = 0, promises_2 = promises;
                    _a.label = 1;
                case 1:
                    if (!(_i < promises_2.length)) return [3 /*break*/, 6];
                    promise = promises_2[_i];
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, promise];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    e_2 = _a.sent();
                    _catchGenericErr$1(e_2);
                    return [3 /*break*/, 5];
                case 5:
                    _i++;
                    return [3 /*break*/, 1];
                case 6: return [2 /*return*/];
            }
        });
    });
}

export default index;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguZXMuanMiLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlsaXR5LnRzIiwiLi4vc3JjL2RlZmF1bHRDb25maWcudHMiLCIuLi9zcmMvbG9nLnRzIiwiLi4vc3JjL2NvbmZpZy50cyIsIi4uL3NyYy9pc0RlYnVnLnRzIiwiLi4vc3JjL3BhcnNlQ21kVG9TcGF3bi50cyIsIi4uL3NyYy94MTFXcmFwcGVyLnRzIiwiLi4vc3JjL290aGVyQ21kLnRzIiwiLi4vc3JjL21ldGFXcmFwcGVyLnRzIiwiLi4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGZzIGZyb20gJ2ZzJztcblxuXG5leHBvcnQgZnVuY3Rpb24gbWtkaXJTeW5jKGRpclBhdGgpIHtcbiAgICB0cnkge1xuICAgICAgICBmcy5ta2RpclN5bmMoZGlyUGF0aCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGlmIChlcnIuY29kZSAhPT0gJ0VFWElTVCcpIHtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1rZmlsZVN5bmMoZmlsZVBhdGgpIHtcbiAgICB0cnkge1xuICAgICAgICBmcy53cml0ZUZpbGVTeW5jKGZpbGVQYXRoLCB7ZmxhZzogJ3d4J30pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBpZiAoZXJyLmNvZGUgIT09ICdFRVhJU1QnKSB7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb3B5U3luYyhzcmMsIGRlc3QpIHtcbiAgICBpZiAoIWZzLmV4aXN0c1N5bmMoc3JjKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IGRhdGEgPSBmcy5yZWFkRmlsZVN5bmMoc3JjLCAndXRmLTgnKTtcbiAgICBmcy53cml0ZUZpbGVTeW5jKGRlc3QsIGRhdGEpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VEZWVwKC4uLm9iamVjdHMpIHtcbiAgICBjb25zdCBpc09iamVjdCA9IG9iaiA9PiBvYmogJiYgdHlwZW9mIG9iaiA9PT0gJ29iamVjdCc7XG5cbiAgICByZXR1cm4gb2JqZWN0cy5yZWR1Y2UoKHByZXYsIG9iaikgPT4ge1xuICAgICAgICBPYmplY3Qua2V5cyhvYmopLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHBWYWwgPSBwcmV2W2tleV07XG4gICAgICAgICAgICBjb25zdCBvVmFsID0gb2JqW2tleV07XG5cbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHBWYWwpICYmIEFycmF5LmlzQXJyYXkob1ZhbCkpIHtcbiAgICAgICAgICAgICAgICBwcmV2W2tleV0gPSBwVmFsLmNvbmNhdCguLi5vVmFsKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNPYmplY3QocFZhbCkgJiYgaXNPYmplY3Qob1ZhbCkpIHtcbiAgICAgICAgICAgICAgICBwcmV2W2tleV0gPSBtZXJnZURlZXAocFZhbCwgb1ZhbCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHByZXZba2V5XSA9IG9WYWw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBwcmV2O1xuICAgIH0sIHt9KTtcbn1cbiIsImV4cG9ydCBjb25zdCBERUZBVUxUX0NGRyA9IHtcbiAgICBcIkdJVkVfWDExX1RJTUVfVElNRU9VVFwiOiA4MCxcbiAgICBcIlBPTExfQUxMX0FQUFNfU1RBUlRFRF9JTlRFUlZBTFwiOiAyMDAwLFxuICAgIFwiUE9MTF9BTExfTUFYX1RJTUVPVVRcIjogMTIwMDAwLFxuICAgIFwiU0FWRV9TRVNTSU9OX0lOX1BSRVRUWV9GT1JNQVRcIjogdHJ1ZSxcbiAgICBcIldNX0NMQVNTX0FORF9FWEVDVVRBQkxFX0ZJTEVfTUFQXCI6IHtcbiAgICAgICAgXCJnbm9tZS10ZXJtaW5hbC1zZXJ2ZXIuR25vbWUtdGVybWluYWxcIjogXCJnbm9tZS10ZXJtaW5hbFwiLFxuICAgICAgICBcImdvb2dsZS1jaHJvbWUuR29vZ2xlLWNocm9tZVwiOiBcImdvb2dsZS1jaHJvbWUuZGVza3RvcFwiLFxuICAgICAgICBcImJyYXZlLWJyb3dzZXIuQnJhdmUtYnJvd3NlclwiOiBcImJyYXZlLWJyb3dzZXIuZGVza3RvcFwiLFxuICAgICAgICBcIk1haWwuVGh1bmRlcmJpcmRcIjogXCJ0aHVuZGVyYmlyZC5kZXNrdG9wXCIsXG4gICAgICAgIFwibmF1dGlsdXMuTmF1dGlsdXNcIjogXCJuYXV0aWx1c1wiLFxuICAgICAgICBcIm9yZy5nbm9tZS5OYXV0aWx1cy5PcmcuZ25vbWUuTmF1dGlsdXNcIjogXCJuYXV0aWx1c1wiLFxuICAgICAgICBcIk5hdmlnYXRvci5GaXJlZm94XCI6IFwiZmlyZWZveC5kZXNrdG9wXCIsXG4gICAgICAgIFwiTmF2aWdhdG9yLlBhbGVcIjogXCJwYWxlbW9vbi5kZXNrdG9wXCIsXG4gICAgICAgIFwic2t5cGUuU2t5cGVcIjogXCJza3lwZWZvcmxpbnV4LmRlc2t0b3BcIixcbiAgICAgICAgXCJzdW4tYXd0LVgxMS1YRnJhbWVQZWVyLmpldGJyYWlucy1pZGVhXCI6IFwiamV0YnJhaW5zLWlkZWEuZGVza3RvcFwiLFxuICAgICAgICBcIlZpcnR1YWxCb3guVmlydHVhbEJveFwiOiBcInZpcnR1YWxib3guZGVza3RvcFwiLFxuICAgICAgICBcIlRlbGVncmFtLlRlbGVncmFtRGVza3RvcFwiOiBcInRlbGVncmFtLWRlc2t0b3BfdGVsZWdyYW1kZXNrdG9wLmRlc2t0b3BcIixcbiAgICAgICAgXCJ0ZWxlZ3JhbS1kZXNrdG9wLlRlbGVncmFtRGVza3RvcFwiOiBcInRlbGVncmFtZGVza3RvcC5kZXNrdG9wXCIsXG4gICAgICAgIFwia2VlcGFzc3hjLmtlZXBhc3N4Y1wiOiBcImtlZXBhc3N4Y19rZWVwYXNzeGMuZGVza3RvcFwiLFxuICAgICAgICBcInNsYWNrLlNsYWNrXCI6IFwiY29tLnNsYWNrLlNsYWNrLmRlc2t0b3BcIixcbiAgICAgICAgXCJzaWduYWwuU2lnbmFsXCI6IFwic2lnbmFsLWRlc2t0b3AuZGVza3RvcFwiLFxuICAgIH0sXG4gICAgXCJXTV9DTEFTU19FWENMVVNJT05TXCI6IFtcbiAgICAgICAgXCJOL0FcIixcbiAgICAgICAgXCJ0aWxkYS5UaWxkYVwiLFxuICAgICAgICBcIlBvcHVwLmRlc2t0b3BcIixcbiAgICAgICAgXCJ1cGRhdGUtbWFuYWdlci5VcGRhdGUtbWFuYWdlclwiLFxuICAgICAgICBcImRlc2t0b3Bfd2luZG93Lk5hdXRpbHVzXCIsXG4gICAgICAgIFwiZWxlY3Ryb24uRWxlY3Ryb25cIixcbiAgICAgICAgXCJndWFrZS5NYWluLnB5XCIsXG4gICAgICAgICdnbm9tZS1zb2Z0d2FyZS5Hbm9tZS1zb2Z0d2FyZSdcbiAgICBdLFxuICAgIFwiV01fTUVUQV9NQVBcIjoge1xuICAgICAgICBcIldNX0NMQVNTKFNUUklORylcIjogXCJ3bUNsYXNzTmFtZVwiLFxuICAgICAgICBcIl9ORVRfV01fU1RBVEUoQVRPTSlcIjogXCJzdGF0ZXNcIixcbiAgICAgICAgXCJfTkVUX1dNX0RFU0tUT1AoQ0FSRElOQUwpXCI6IFwid21DdXJyZW50RGVza3RvcE5yXCIsXG4gICAgICAgIFwiV01fTkFNRShVVEY4X1NUUklORylcIjogXCJ3bVRpdGxlXCIsXG4gICAgICAgIFwiX05FVF9XTV9QSUQoQ0FSRElOQUwpXCI6IFwid21QaWRcIixcbiAgICAgICAgXCJfTkVUX1dNX1dJTkRPV19UWVBFKEFUT00pXCI6IFwid21UeXBlXCIsXG4gICAgICAgIFwiX0JBTUZfREVTS1RPUF9GSUxFKFNUUklORylcIjogXCJleGVjdXRhYmxlRmlsZVwiXG4gICAgfSxcbiAgICBcIldNX01FVEFfTUFQX05VTUJFUl9UWVBFU1wiOiBbXG4gICAgICAgIFwiX05FVF9XTV9QSUQoQ0FSRElOQUwpXCIsXG4gICAgICAgIFwiX05FVF9XTV9ERVNLVE9QKENBUkRJTkFMKVwiXG4gICAgXSxcbiAgICBcIkRFU0tUT1BfRklMRV9MT0NBVElPTlNcIjogW1xuICAgICAgICBcIntob21lfS8ubG9jYWwvc2hhcmUvYXBwbGljYXRpb25zXCIsXG4gICAgICAgIFwie2hvbWV9Ly5nbm9tZS9hcHBzL1wiLFxuICAgICAgICBcIi91c3Ivc2hhcmUvYXBwbGljYXRpb25zXCIsXG4gICAgICAgIFwiL3Vzci9sb2NhbC9zaGFyZS9hcHBsaWNhdGlvbnNcIixcbiAgICAgICAgXCIvdXNyL3NoYXJlL2FwcC1pbnN0YWxsXCIsXG4gICAgICAgIFwie2hvbWV9Ly5jb25maWcvYXV0b3N0YXJ0L1wiLFxuICAgICAgICBcIi92YXIvbGliL3NuYXBkL2Rlc2t0b3AvYXBwbGljYXRpb25zXCIsXG4gICAgICAgIFwiL3Zhci9saWIvZmxhdHBhay9hcHBcIixcbiAgICAgICAgXCIvc25hcC9iaW5cIlxuICAgIF1cbn07XG4iLCJleHBvcnQgY29uc3QgbG9nID0gKC4uLmFyZ3MpID0+IGNvbnNvbGUubG9nKC4uLmFyZ3MpO1xuIiwiaW1wb3J0IHttZXJnZURlZXAsIG1rZGlyU3luY30gZnJvbSAnLi91dGlsaXR5JztcbmltcG9ydCB7REVGQVVMVF9DRkd9IGZyb20gJy4vZGVmYXVsdENvbmZpZyc7XG5pbXBvcnQgKiBhcyBmcyBmcm9tICdmcyc7XG5pbXBvcnQge2xvZ30gZnJvbSAnLi9sb2cnO1xuXG5sZXQgY2ZnO1xuXG5leHBvcnQgY29uc3QgQ0ZHX0RBVEFfRElSID0gX2dldFVzZXJIb21lKCkgKyAnLy5sd3NtJztcbmV4cG9ydCBjb25zdCBDRkdfRklMRV9QQVRIID0gQ0ZHX0RBVEFfRElSICsgJy9jb25maWcuanNvbic7XG5leHBvcnQgY29uc3QgU0VTU0lPTl9EQVRBX0RJUiA9IENGR19EQVRBX0RJUiArICcvc2Vzc2lvbkRhdGEnO1xuXG4vLyBJTklUXG4vLyAtLS0tLS0tLS0tLS1cbnRyeSB7XG4gICAgLy8gaWYgY29uZmlnIGlzIGFscmVhZHkgaW4gcGxhY2VcbiAgICBjb25zdCBmcm9tRmlsZSA9IEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKENGR19GSUxFX1BBVEgsICd1dGY4JykpO1xuICAgIGNmZyA9IG1lcmdlRGVlcChERUZBVUxUX0NGRywgZnJvbUZpbGUpO1xufSBjYXRjaCAoZSkge1xuICAgIGxvZygnbHdzbTogbm8gY29uZmlnIGZpbGUgcHJlc2VudCBvciBpdCBjb250YWlucyBpbnZhbGlkIGpzb24uIENyZWF0aW5nIG5ldyBvbmUuLi4nKTtcblxuICAgIC8vIGlmIHRoZXJlIGlzIG5vIGNvbmZpZyB5ZXQgbG9hZCBkZWZhdWx0IGNmZyBhbmQgY3JlYXRlIGZpbGVzIGFuZCBkaXJzXG4gICAgY2ZnID0gREVGQVVMVF9DRkc7XG5cbiAgICAvLyBzYXZlIGV4ZWN1dGFibGUgcGF0aHMgdG8gY2ZnXG4gICAgY2ZnLkNNRF9KU0ZJTEVfUEFUSCA9IF9fZGlybmFtZSArICcvLi4vY21kLmpzJztcbiAgICBjZmcuSlNGSUxFX0lOREVYX1BBVEggPSBfX2Rpcm5hbWUgKyAnL2luZGV4LmpzJztcblxuICAgIG1rZGlyU3luYyhDRkdfREFUQV9ESVIpO1xuICAgIG1rZGlyU3luYyhTRVNTSU9OX0RBVEFfRElSKTtcblxuICAgIC8vIHdyaXRlIGNvbmZpZyB0byB1c2VyIGRpclxuICAgIGZzLndyaXRlRmlsZVN5bmMoQ0ZHX0ZJTEVfUEFUSCwgSlNPTi5zdHJpbmdpZnkoY2ZnLCBudWxsLCAyKSwgJ3V0ZjgnKTtcbn1cblxuXG4vLyBhbHNvIG1ha2UgZGF0YSBkaXJzIGFjY2Vzc2libGUgdG8gdGhlIG91dHNpZGVcbmNmZy5EQVRBX0RJUiA9IENGR19EQVRBX0RJUjtcbmNmZy5TRVNTSU9OX0RBVEFfRElSID0gU0VTU0lPTl9EQVRBX0RJUjtcblxuZXhwb3J0IGNvbnN0IENGRyA9IGNmZztcblxuXG5mdW5jdGlvbiBfZ2V0VXNlckhvbWUoKSB7XG4gICAgcmV0dXJuIHByb2Nlc3MuZW52Wyhwcm9jZXNzLnBsYXRmb3JtID09PSAnd2luMzInKSA/ICdVU0VSUFJPRklMRScgOiAnSE9NRSddO1xufVxuIiwiZXhwb3J0IGNvbnN0IElTX0RFQlVHID0gcHJvY2Vzcy5hcmd2LmluZGV4T2YoJy0tZGVidWcnKSA+IC0xO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnQgY29uc3QgcGFyc2VDbWRBcmdzID0gKGNtZCkgPT4ge1xuICAgIGxldCBjbWRBbGxTcGxpdCA9IGNtZC5zcGxpdCgvIC8pO1xuICAgIGxldCBtYWluQ29tbWFuZCA9IGNtZEFsbFNwbGl0WzBdO1xuICAgIGxldCBhcmdzID0gW107XG4gICAgY21kQWxsU3BsaXQubWFwKGZ1bmN0aW9uIChzLCBpKSB7XG4gICAgICAgIGlmIChpICE9PSAwKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGNtZEFsbFNwbGl0W2ldO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIFttYWluQ29tbWFuZCwgX21lcmdlUXVvdGVkU3RyaW5nUGFyYW1zKGFyZ3MpXTtcbn07XG5cbmZ1bmN0aW9uIF9tZXJnZVF1b3RlZFN0cmluZ1BhcmFtcyhhcmdzKSB7XG4gICAgY29uc3QgbmV3QXJncyA9IFtdO1xuICAgIGxldCBpc0luUXVvdGF0aW9uID0gZmFsc2U7XG4gICAgbGV0IGN1cnJlbnRRdW90YXRpb25Bcmc7XG5cbiAgICAvLyBUT0RPIG1ha2UgaXQgd29yayB3aXRoIG1vcmUgZGlmZmVyZW50IHF1b3RhdGlvbiB0eXBlc1xuICAgIGFyZ3MuZm9yRWFjaCgoYXJnKSA9PiB7XG4gICAgICAgIC8vIG1hdGNoIHF1b3RhdGlvbiBlbmRcbiAgICAgICAgaWYgKGFyZy5tYXRjaCgvJyQvKSkge1xuICAgICAgICAgICAgY3VycmVudFF1b3RhdGlvbkFyZyArPSAnICcgKyBhcmcuc2xpY2UoMCwgYXJnLmxlbmd0aCAtIDEpO1xuICAgICAgICAgICAgbmV3QXJncy5wdXNoKGN1cnJlbnRRdW90YXRpb25BcmcpO1xuICAgICAgICAgICAgY3VycmVudFF1b3RhdGlvbkFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGlzSW5RdW90YXRpb24gPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICAvLyBtYXRjaCBxdW90YXRpb24gc3RhcnRcbiAgICAgICAgZWxzZSBpZiAoYXJnLm1hdGNoKC9eJy8pKSB7XG4gICAgICAgICAgICBpc0luUXVvdGF0aW9uID0gdHJ1ZTtcbiAgICAgICAgICAgIGN1cnJlbnRRdW90YXRpb25BcmcgPSBhcmcuc3Vic3RyKDEsIGFyZy5sZW5ndGgpO1xuICAgICAgICB9XG4gICAgICAgIC8vIHdoaWxlIGluIHF1b3RhdGlvblxuICAgICAgICBlbHNlIGlmIChpc0luUXVvdGF0aW9uKSB7XG4gICAgICAgICAgICBjdXJyZW50UXVvdGF0aW9uQXJnICs9ICcgJyArIGFyZztcbiAgICAgICAgfSBlbHNlIGlmIChhcmcgIT09ICcnKSB7XG4gICAgICAgICAgICBuZXdBcmdzLnB1c2goYXJnKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIG5ld0FyZ3M7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB7bG9nfSBmcm9tICcuL2xvZyc7XG5pbXBvcnQge0NGR30gZnJvbSAnLi9jb25maWcnO1xuXG5jb25zdCB4MTEgPSByZXF1aXJlKCd4MTEnKTtcblxuZXhwb3J0IGxldCBYO1xubGV0IHJvb3Q7XG5sZXQgZGlzcGxheTtcblxuXG4vLyBleHBvcnQgY29uc3QgZ2V0V2luZG93SW5mbyA9IHdyYXBYMTEoX2dldFdpbmRvd0luZm8pO1xuZXhwb3J0IGNvbnN0IGdldFggPSAoKSA9PiBYO1xuXG5mdW5jdGlvbiBjYXRjaEdlbmVyaWNFcnIoZXJyKSB7XG4gICAgY29uc29sZS5lcnJvcigneDExV3JhcHBlcjogJywgZXJyLCBlcnIuc3RhY2spO1xufVxuXG5sZXQgaXNDbGllbnRJbml0aWFsaXplZCA9IGZhbHNlO1xubGV0IGluaXRQcm9taXNlO1xuXG5leHBvcnQgZnVuY3Rpb24gaW5pdFgxMSgpOiBQcm9taXNlPGFueT4ge1xuICAgIGlmIChpc0NsaWVudEluaXRpYWxpemVkKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICB9XG4gICAgaWYgKGluaXRQcm9taXNlKSB7XG4gICAgICAgIHJldHVybiBpbml0UHJvbWlzZTtcbiAgICB9XG4gICAgaW5pdFByb21pc2UgPSBuZXcgUHJvbWlzZSgoZnVsZmlsbCwgcmVqZWN0KSA9PiB7XG4gICAgICAgIHgxMS5jcmVhdGVDbGllbnQoKGVyciwgZGlzcGxheUluKSA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRpc3BsYXkgPSBkaXNwbGF5SW47XG4gICAgICAgICAgICAgICAgWCA9IGRpc3BsYXkuY2xpZW50O1xuXG4gICAgICAgICAgICAgICAgcm9vdCA9IGRpc3BsYXkuc2NyZWVuWzBdLnJvb3Q7XG4gICAgICAgICAgICAgICAgaXNDbGllbnRJbml0aWFsaXplZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgZnVsZmlsbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KS5vbignZXJyb3InLCAoZXJyKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgIH0pO1xuICAgIH0pLmNhdGNoKGNhdGNoR2VuZXJpY0Vycik7XG4gICAgcmV0dXJuIGluaXRQcm9taXNlO1xufVxuXG4vLyBNRVRIT0RTXG4vLyAtLS0tLS0tXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGlzcGxheXMoKTogYW55W10ge1xuICAgIGlmICghZGlzcGxheSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1gxMSBub3QgaW5pdGlhbGl6ZWQgLyBObyBzY3JlZW4gYXZhaWxhYmxlJyk7XG4gICAgfVxuICAgIHJldHVybiBkaXNwbGF5LnNjcmVlbjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFdpbmRvd0dlb21ldHJ5KHdpbklkKSB7XG4gICAgY29uc3QgZ2VvOiBhbnkgPSB7fTtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgoZnVsZmlsbCwgcmVqZWN0KSA9PiB7XG4gICAgICAgIFguVHJhbnNsYXRlQ29vcmRpbmF0ZXMod2luSWQsIHJvb3QsIDAsIDAsIChlcnIsIHJlcykgPT4ge1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBnZW8ueCA9IHJlcy5kZXN0WDtcbiAgICAgICAgICAgICAgICBnZW8ueSA9IHJlcy5kZXN0WTtcblxuICAgICAgICAgICAgICAgIFguR2V0R2VvbWV0cnkod2luSWQsIChlcnIsIHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdlby53aWR0aCA9IHJlcy53aWR0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdlby5oZWlnaHQgPSByZXMuaGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICAgICAgZnVsZmlsbChnZW8pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pLmNhdGNoKGNhdGNoR2VuZXJpY0Vycik7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRBY3RpdmVXaW5kb3dJZHMoKTogUHJvbWlzZTxzdHJpbmdbXT4ge1xuICAgIGNvbnN0IFBST1BfTkFNRSA9ICdfTkVUX0NMSUVOVF9MSVNUJztcbiAgICBjb25zdCBwcm9wSWQgPSBhd2FpdCBfZ2V0UHJvcGVydHlJZEJ5TmFtZShyb290LCBQUk9QX05BTUUpO1xuICAgIGNvbnN0IGlkU3RyID0gYXdhaXQgZ2V0UHJvcChyb290LCBwcm9wSWQgYXMgbnVtYmVyKTtcbiAgICByZXR1cm4gX3BhcnNlV2luZG93SWRzKGlkU3RyKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlc3RvcmVXaW5kb3dQb3NpdGlvbih3aW4pIHtcbiAgICBsb2coJ1Jlc3RvcmluZyB3aW5kb3cgcG9zaXRpb24gZm9yIFwiJyArIHdpbi53bUNsYXNzTmFtZSArICdcIicpO1xuICAgIGNvbnN0IFNUQVRFU19UT19SRVNFVCA9IFtcbiAgICAgICAgJ19ORVRfV01fU1RBVEVfTUFYSU1JWkVEX1ZFUlQnLFxuICAgICAgICAnX05FVF9XTV9TVEFURV9NQVhJTUlaRURfSE9SWidcbiAgICBdO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgoZnVsZmlsbCwgcmVqZWN0KSA9PiB7XG4gICAgICAgIHNldFN0YXRlKHdpbi53aW5kb3dJZCwgJ3JlbW92ZScsIFNUQVRFU19UT19SRVNFVClcbiAgICAgICAgICAgIC5jYXRjaChyZWplY3QpXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgWC5Nb3ZlUmVzaXplV2luZG93KHdpbi53aW5kb3dJZCwgd2luLngsIHdpbi55LCB3aW4ud2lkdGgsIHdpbi5oZWlnaHQpO1xuICAgICAgICAgICAgICAgIHNldFN0YXRlKHdpbi53aW5kb3dJZCwgJ2FkZCcsIHdpbi5zdGF0ZXMpXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaChyZWplY3QpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bGZpbGwoKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKHJlamVjdCk7XG4gICAgfSkuY2F0Y2goY2F0Y2hHZW5lcmljRXJyKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsb3NlV2luZG93KHdpbklkKSB7XG4gICAgcmV0dXJuIF9zZW5kWDExQ2xpZW50TWVzc2FnZSh3aW5JZCwgJ19ORVRfQ0xPU0VfV0lORE9XJyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtb3ZlVG9Xb3Jrc3BhY2Uod2luSWQsIHdvcmtTcGFjZU5yKSB7XG4gICAgLy8gTk9URTogaWYgaXQgZG9lc24ndCB3b3JrIHdlIG1pZ2h0IGFsc28gd2FudCB0byB1c2UgX1dJTl9XT1JLU1BBQ0VcbiAgICByZXR1cm4gX3NlbmRYMTFDbGllbnRNZXNzYWdlKHdpbklkLCAnX05FVF9XTV9ERVNLVE9QJywgW3tcbiAgICAgICAgdmFsdWU6IHdvcmtTcGFjZU5yLFxuICAgIH1dKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdvVG9WaWV3cG9ydCh4LCB5KSB7XG4gICAgcmV0dXJuIF9zZW5kWDExQ2xpZW50TWVzc2FnZShyb290LCAnX05FVF9ERVNLVE9QX1ZJRVdQT1JUJywgW1xuICAgICAgICAgICAge3ZhbHVlOiB4fSxcbiAgICAgICAgICAgIHt2YWx1ZTogeX0sXG4gICAgICAgIF1cbiAgICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0U3RhdGUod2lkLCBhY3Rpb25TdHIsIHN0YXRlc1RvSGFuZGxlKSB7XG4gICAgY29uc3QgQUNUSU9OU19NQVAgPSB7XG4gICAgICAgIHJlbW92ZTogMCxcbiAgICAgICAgYWRkOiAxLFxuICAgICAgICB0b2dnbGU6IDIsXG4gICAgfTtcbiAgICBjb25zdCBhY3Rpb24gPSBBQ1RJT05TX01BUFthY3Rpb25TdHJdO1xuICAgIGxldCBwcm9wZXJ0aWVzOiBhbnlbXSA9IFtcbiAgICAgICAge3ZhbHVlOiBhY3Rpb259LFxuICAgIF07XG5cbiAgICAvLyBhbGwgcHJvcGVydGllcyBuZWVkIHRvIGJlIGxvb2tlZCB1cCBmb3IgdGhlaXIgYXRvbSBpZFxuICAgIGlmIChBcnJheS5pc0FycmF5KHN0YXRlc1RvSGFuZGxlKSAmJiBzdGF0ZXNUb0hhbmRsZS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHN0YXRlc1RvSGFuZGxlLmZvckVhY2goKHN0YXRlUHJvcGVydHkpID0+IHtcbiAgICAgICAgICAgIHByb3BlcnRpZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgaXNBdG9tOiB0cnVlLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBzdGF0ZVByb3BlcnR5LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gX3NlbmRYMTFDbGllbnRNZXNzYWdlKHdpZCwgJ19ORVRfV01fU1RBVEUnLCBwcm9wZXJ0aWVzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgfVxufVxuXG5jb25zdCBQUk9QU19UT19HRVQgPSBbXG4gICAgJ1dNX0NMQVNTJyxcbiAgICAnX05FVF9XTV9TVEFURScsXG4gICAgJ19ORVRfV01fREVTS1RPUCcsXG4gICAgJ1dNX05BTUUnLFxuICAgICdfTkVUX1dNX1BJRCcsXG4gICAgJ19ORVRfV01fV0lORE9XX1RZUEUnLFxuICAgICdfQkFNRl9ERVNLVE9QX0ZJTEUnLFxuXTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFdpbmRvd0luZm8od2lkKTogUHJvbWlzZTxhbnk+IHtcbiAgICAvLyBYLkdldEdlb21ldHJ5KHdpZCwgZnVuY3Rpb24gKGVyciwgY2xpZW50R2VvbSkge1xuICAgIC8vICAgY29uc29sZS5sb2coXCJ3aW5kb3cgZ2VvbWV0cnk6IFwiLCBjbGllbnRHZW9tKTtcbiAgICAvLyB9KTtcblxuICAgIGNvbnN0IHByb3BzOiBhbnlbXSA9IGF3YWl0IF94Q2JUb1Byb21pc2UoWC5MaXN0UHJvcGVydGllcywgd2lkKTtcblxuICAgIGNvbnN0IHByb21pc2VzID0gcHJvcHMubWFwKGFzeW5jIGZ1bmN0aW9uIChwKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHByb3BOYW1lID0gYXdhaXQgX3hDYlRvUHJvbWlzZShYLkdldEF0b21OYW1lLCBwKTtcbiAgICAgICAgICAgICAgICBpZiAoUFJPUFNfVE9fR0VULmluY2x1ZGVzKHByb3BOYW1lKSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm9wVmFsID0gYXdhaXQgX3hDYlRvUHJvbWlzZShYLkdldFByb3BlcnR5LCAwLCB3aWQsIHAsIDAsIDAsIDEwMDAwMDAwKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdHlwZU5hbWUgPSBhd2FpdCBfeENiVG9Qcm9taXNlKFguR2V0QXRvbU5hbWUsIHByb3BWYWwudHlwZSk7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHByb3BWYWwsIHR5cGVOYW1lLCBwcm9wTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRlY29kZWREYXRhID0gYXdhaXQgX2RlY29kZVByb3BlcnR5KHR5cGVOYW1lLCBwcm9wVmFsLmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHByb3BOYW1lICsgJygnICsgdHlwZU5hbWUgKyAnKSA9ICcgKyBkZWNvZGVkRGF0YSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgnJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIHJlamVjdChlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4ocmVzdWx0cyA9PiB7XG4gICAgICAgIHJldHVybiByZXN1bHRzLmpvaW4oJ1xcbicpO1xuICAgIH0pO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0UHJvcChpZCA9IHJvb3QsIHByb3BJZDogbnVtYmVyKTogUHJvbWlzZTxhbnk+IHtcbiAgICBjb25zdCBwcm9wVmFsID0gYXdhaXQgX3hDYlRvUHJvbWlzZShYLkdldFByb3BlcnR5LCAwLCBpZCwgcHJvcElkLCAwLCAwLCAxMDAwMDAwMCk7XG4gICAgY29uc3QgdHlwZU5hbWUgPSBhd2FpdCBfeENiVG9Qcm9taXNlKFguR2V0QXRvbU5hbWUsIHByb3BWYWwudHlwZSk7XG4gICAgcmV0dXJuIGF3YWl0IF9kZWNvZGVQcm9wZXJ0eSh0eXBlTmFtZSwgcHJvcFZhbC5kYXRhKTtcbn1cblxuLy8gSEVMUEVSXG4vLyAtLS0tLS1cbmZ1bmN0aW9uIF94Q2JUb1Byb21pc2UoZm4sIC4uLmFyZ3MpOiBhbnkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgoZnVsZmlsbCwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGZuLmFwcGx5KFgsIFsuLi5hcmdzLCAoZXJyLCByZXMpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBlcnIgPyByZWplY3QoZXJyKSA6IGZ1bGZpbGwocmVzKTtcbiAgICAgICAgfV0pO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBfY291bnRlcihpbml0aWFsVmFsLCBtb2RpZmllcikge1xuICAgIC8vIHRvIHN0YXJ0IGF0IHZhbCB3ZSBuZWVkIHRvIHN1YnRyYWN0IHRoZSBtb2RpZmllciBmaXJzdFxuICAgIGxldCB2YWwgPSBpbml0aWFsVmFsIC0gbW9kaWZpZXI7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgdmFsICs9IG1vZGlmaWVyO1xuICAgICAgICByZXR1cm4gdmFsO1xuICAgIH07XG59XG5cbmZ1bmN0aW9uIF9nZXRBdG9tcyhsaXN0LCBjYikge1xuICAgIGNvbnN0IHJlcyA9IHt9O1xuICAgIGNvbnN0IGdldEF0b20gPSAoKSA9PiB7XG4gICAgICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIGNiKG51bGwsIHJlcyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBuYW1lID0gbGlzdC5zaGlmdCgpO1xuICAgICAgICAgICAgWC5JbnRlcm5BdG9tKGZhbHNlLCBuYW1lLCAoZXJyLCBhdG9tKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2IoZXJyKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXNbbmFtZV0gPSBhdG9tO1xuICAgICAgICAgICAgICAgICAgICBnZXRBdG9tKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGdldEF0b20oKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gX2dldFByb3BlcnR5SWRCeU5hbWUod2lkOiBzdHJpbmcsIG5hbWVUb0dldDogc3RyaW5nKTogUHJvbWlzZTxudW1iZXI+IHtcbiAgICBjb25zdCBwcm9wczogYW55W10gPSBhd2FpdCBfeENiVG9Qcm9taXNlKFguTGlzdFByb3BlcnRpZXMsIHdpZCk7XG4gICAgY29uc3QgcHJvbWlzZXMgPSBwcm9wcy5tYXAoYXN5bmMgZnVuY3Rpb24gKHApIHtcbiAgICAgICAgY29uc3QgcHJvcE5hbWUgPSBhd2FpdCBfeENiVG9Qcm9taXNlKFguR2V0QXRvbU5hbWUsIHApO1xuICAgICAgICBpZiAobmFtZVRvR2V0ID09PSBwcm9wTmFtZSkge1xuICAgICAgICAgICAgcmV0dXJuIHA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IHJlcyA9IGF3YWl0IFByb21pc2UuYWxsKHByb21pc2VzKTtcbiAgICByZXR1cm4gcmVzLmZpbmQoaXRlbSA9PiBpdGVtID4gMCk7XG59XG5cblxuZnVuY3Rpb24gX3NlbmRYMTFDbGllbnRNZXNzYWdlKHdpZCwgZXZlbnROYW1lLCBldmVudFByb3BlcnRpZXMgPSBbXSwgb3B0aW9uYWxFdmVudE1hc2s/KSB7XG4gICAgaWYgKGV2ZW50UHJvcGVydGllcy5sZW5ndGggPiA0KSB7XG4gICAgICAgIHRocm93ICdvbmx5IHN1cHBvcnRzIDQgcHJvcGVydGllcyBhdCBvbmNlIG1heCc7XG4gICAgfVxuXG4gICAgY29uc3Qgb2Zmc2V0Q291bnRlciA9IF9jb3VudGVyKDQsIDQpO1xuICAgIGNvbnN0IGV2ZW50TWFzayA9IG9wdGlvbmFsRXZlbnRNYXNrIHx8IHgxMS5ldmVudE1hc2suU3Vic3RydWN0dXJlUmVkaXJlY3Q7XG5cbiAgICAvLyBjcmVhdGUgYXRvbXMgdG8gbG9vayB1cFxuICAgIGxldCBhdG9tc0xpc3QgPSBbXTtcbiAgICBhdG9tc0xpc3QucHVzaChldmVudE5hbWUpO1xuICAgIGV2ZW50UHJvcGVydGllcy5mb3JFYWNoKChldmVudFByb3BlcnR5KSA9PiB7XG4gICAgICAgIGlmIChldmVudFByb3BlcnR5LmlzQXRvbSkge1xuICAgICAgICAgICAgYXRvbXNMaXN0LnB1c2goZXZlbnRQcm9wZXJ0eS52YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIHN0YXJ0IGJ1ZmZlciBpbnB1dFxuICAgIGNvbnN0IGRhdGEgPSBuZXcgQnVmZmVyKDMyKTtcbiAgICBkYXRhLmZpbGwoMCk7XG4gICAgZGF0YS53cml0ZUludDgoMzMsIDApOyAvLyAzMyA9IENsaWVudE1lc3NhZ2VcbiAgICBkYXRhLndyaXRlSW50OCgzMiwgMSk7IC8vIGZvcm1hdFxuICAgIGRhdGEud3JpdGVVSW50MzJMRSh3aWQsIG9mZnNldENvdW50ZXIoKSk7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKGZ1bGZpbGwsIHJlamVjdCkgPT4ge1xuICAgICAgICBfZ2V0QXRvbXMoYXRvbXNMaXN0LCAoZXJyLCBhdG9tcykgPT4ge1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZGF0YS53cml0ZVVJbnQzMkxFKGF0b21zW2V2ZW50TmFtZV0sIG9mZnNldENvdW50ZXIoKSk7XG5cbiAgICAgICAgICAgICAgICBldmVudFByb3BlcnRpZXMuZm9yRWFjaCgoZXZlbnRQcm9wZXJ0eSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnRQcm9wZXJ0eS5pc0F0b20pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEud3JpdGVVSW50MzJMRShhdG9tc1tldmVudFByb3BlcnR5LnZhbHVlXSwgb2Zmc2V0Q291bnRlcigpKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEud3JpdGVVSW50MzJMRShldmVudFByb3BlcnR5LnZhbHVlLCBvZmZzZXRDb3VudGVyKCkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBsZXQgc291cmNlSW5kaWNhdGlvbiA9IDE7XG4gICAgICAgICAgICAgICAgZGF0YS53cml0ZVVJbnQzMkxFKHNvdXJjZUluZGljYXRpb24sIG9mZnNldENvdW50ZXIoKSk7XG5cbiAgICAgICAgICAgICAgICBYLlNlbmRFdmVudChyb290LCAwLCBldmVudE1hc2ssIGRhdGEpO1xuXG4gICAgICAgICAgICAgICAgLy8gd2UgbmVlZCBhIGxpdHRsZSB0aW1lIGZvciB0aGUgYnVmZmVyIHRvIGJlIHByb2Nlc3NlZFxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVsZmlsbCwgQ0ZHLkdJVkVfWDExX1RJTUVfVElNRU9VVCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pLmNhdGNoKGNhdGNoR2VuZXJpY0Vycik7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIF9kZWNvZGVQcm9wZXJ0eSh0eXBlLCBkYXRhKTogUHJvbWlzZTxhbnk+IHtcbiAgICB0cnkge1xuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ1NUUklORyc6IHtcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBbXTtcbiAgICAgICAgICAgICAgICBsZXQgcyA9ICcnO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YVtpXSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHMgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHMgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShkYXRhW2ldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2gocyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5tYXAocXVvdGl6ZSkuam9pbignLCAnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgJ0FUT00nOlxuICAgICAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA+IDMyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnTE9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT05HJztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb25zdCBwcm9taXNlcyA9IFtdO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkgKz0gNCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhID0gZGF0YS51bnBhY2soJ0wnLCBpKVswXTtcbiAgICAgICAgICAgICAgICAgICAgcHJvbWlzZXMucHVzaChfeENiVG9Qcm9taXNlKFguR2V0QXRvbU5hbWUsIGEpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGF3YWl0IFByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXMuam9pbignLCAnKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgY2FzZSAnQ0FSRElOQUwnOlxuICAgICAgICAgICAgY2FzZSAnSU5URUdFUic6IHtcbiAgICAgICAgICAgICAgICBjb25zdCByZXMgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpICs9IDQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzLnB1c2goZGF0YS51bnBhY2soJ0wnLCBpKVswXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiByZXMuam9pbignLCAnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgJ1dJTkRPVyc6XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzID0gW107XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSArPSA0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJlcy5wdXNoKGRhdGEudW5wYWNrKCdMJywgaSlbMF0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gJ3dpbmRvdyBpZCMgJyArIHJlcy5tYXAoKG4pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICcweCcgKyBuLnRvU3RyaW5nKDE2KTtcbiAgICAgICAgICAgICAgICB9KS5qb2luKCcsICcpO1xuXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiAnV1RGICcgKyB0eXBlO1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmxvZyh0eXBlLCBkYXRhKTtcbiAgICAgICAgY29uc29sZS5lcnJvcihlKTtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGUpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gcXVvdGl6ZShpKSB7XG4gICAgcmV0dXJuICdcXFwiJyArIGkgKyAnXFxcIic7XG59XG5cbmZ1bmN0aW9uIF9wYXJzZVdpbmRvd0lkcyhzdHJJbik6IHN0cmluZ1tdIHtcbiAgICBjb25zdCBzdHIgPSBzdHJJbi5yZXBsYWNlKCd3aW5kb3cgaWQjICcsICcnKTtcbiAgICByZXR1cm4gc3RyLnNwbGl0KCcsICcpO1xufVxuXG4vL2NvbnN0IHRlc3RGbiA9IHdyYXBYMTEoY2xvc2VXaW5kb3cpO1xuLy90ZXN0Rm4oJzB4MDRhMDAwMDEnKS50aGVuKChnZW8pID0+IHtcbi8vfSk7XG5cbi8vY29uc3QgdGVzdEZuID0gd3JhcFgxMShtb3ZlVG9Xb3Jrc3BhY2UpO1xuLy90ZXN0Rm4oJzB4MDRlMDAwMDEgJywgMik7XG5cbi8vY29uc3QgdGVzdEZuWCA9IHdyYXBYMTEocmVzdG9yZVdpbmRvd1Bvc2l0aW9uKTtcbi8vdGVzdEZuWCh7XG4vLyAgd2luZG93SWQ6ICcweDA0YTAwMDAxJyxcbi8vICB4OiAwLFxuLy8gIHk6IDAsXG4vLyAgd2lkdGg6IDUwMCxcbi8vICBoZWlnaHQ6IDUwMCxcbi8vICBzdGF0ZXM6IFtcbi8vICAgICdfTkVUX1dNX1NUQVRFX01BWElNSVpFRF9WRVJUJ1xuLy8gIF1cbi8vfSk7XG5cbi8vY29uc3QgdGVzdEZuMiA9IHdyYXBYMTEoc2V0U3RhdGUpO1xuLy90ZXN0Rm4yKCcweDA0YTAwMDAxJywgJ3JlbW92ZScsIFsnX05FVF9XTV9TVEFURV9NQVhJTUlaRURfVkVSVCcsICdfTkVUX1dNX1NUQVRFX01BWElNSVpFRF9IT1JaJywgJ19ORVRfV01fU1RBVEVfRlVMTFNDUkVFTiddKVxuLy8gIC50aGVuKChyZXMpID0+IHtcbi8vICAgIGNvbnNvbGUubG9nKCdOT1JNQUwnLCByZXMpO1xuLy8gIH0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQge0lTX0RFQlVHfSBmcm9tICcuL2lzRGVidWcnO1xuaW1wb3J0IHtDRkd9IGZyb20gJy4vY29uZmlnJztcbmltcG9ydCB7c3Bhd259IGZyb20gJ2NoaWxkX3Byb2Nlc3MnO1xuaW1wb3J0IHtwYXJzZUNtZEFyZ3N9IGZyb20gJy4vcGFyc2VDbWRUb1NwYXduJztcbmltcG9ydCB7V2luT2JqLCBXaW5PYmpJZE9ubHl9IGZyb20gJy4vbW9kZWwnO1xuaW1wb3J0IHtsb2d9IGZyb20gJy4vbG9nJztcbmltcG9ydCB7Z2V0QWN0aXZlV2luZG93SWRzLCBnZXREaXNwbGF5cywgZ2V0V2luZG93SW5mb30gZnJvbSAnLi94MTFXcmFwcGVyJztcblxuLy8gNTAwa2JcbmNvbnN0IE1BWF9CVUZGRVIgPSAxMDI0ICogNTAwO1xuY29uc3QgRVhFQ19PUFRTID0ge1xuICAgIG1heEJ1ZmZlcjogTUFYX0JVRkZFUixcbn07XG5cblxuLy8gZGlzcGxheVxuLy8gLS0tLS0tLVxuZXhwb3J0IGZ1bmN0aW9uIGdldENvbm5lY3RlZERpc3BsYXlzSWQoKTogc3RyaW5nIHtcbiAgICBjb25zdCBkaXNwbGF5cyA9IGdldERpc3BsYXlzKCk7XG4gICAgcmV0dXJuIGRpc3BsYXlzLm1hcChzY3JlZW4gPT4gc2NyZWVuLnBpeGVsX3dpZHRoICsgJ3gnICsgc2NyZWVuLnBpeGVsX2hlaWdodCkuam9pbignOycpO1xufVxuXG5cbi8vIE90aGVyXG4vLyAtLS0tLS0tLVxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEFkZGl0aW9uYWxNZXRhRGF0YUZvcldpbih3aW46IFdpbk9iaklkT25seSk6IFByb21pc2U8V2luT2JqPiB7XG4gICAgY29uc3Qgc3Rkb3V0ID0gYXdhaXQgZ2V0V2luZG93SW5mbyh3aW4ud2luZG93SWQpO1xuICAgIGNvbnN0IGxpbmVzID0gc3Rkb3V0LnNwbGl0KCdcXG4nKTtcbiAgICBjb25zdCB3aW5Db3B5OiBhbnkgPSB7Li4ud2lufTtcblxuICAgIGxpbmVzLmZvckVhY2goKGxpbmUpID0+IHtcbiAgICAgICAgY29uc3Qgd29yZHMgPSBsaW5lLnNwbGl0KCcgJyk7XG4gICAgICAgIGNvbnN0IHByb3BlcnR5TmFtZSA9IHdvcmRzWzBdO1xuXG4gICAgICAgIC8vIHJlbW92ZSBwcm9wZXJ0eSBuYW1lIGFuZCBcIj1cIlxuICAgICAgICB3b3Jkcy5zcGxpY2UoMCwgMik7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gd29yZHMuam9pbignICcpO1xuICAgICAgICBjb25zdCBwcm9wZXJ0eU5hbWVGcm9tTWFwID0gQ0ZHLldNX01FVEFfTUFQW3Byb3BlcnR5TmFtZV07XG4gICAgICAgIC8vIHBhcnNlIHdtQ2xhc3NOYW1lXG4gICAgICAgIGlmIChwcm9wZXJ0eU5hbWUgPT09ICdXTV9DTEFTUyhTVFJJTkcpJykge1xuICAgICAgICAgICAgY29uc3QgcHJvcGVydHlOYW1lRnJvbU1hcCA9IENGRy5XTV9NRVRBX01BUFtwcm9wZXJ0eU5hbWVdO1xuICAgICAgICAgICAgY29uc3QgY2xhc3NOYW1lcyA9IHZhbHVlLnNwbGl0KCcsICcpO1xuICAgICAgICAgICAgbGV0IGNsYXNzTmFtZSA9ICcnO1xuICAgICAgICAgICAgY2xhc3NOYW1lcy5mb3JFYWNoKChzdGF0ZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChzdGF0ZSAhPT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lICs9IHN0YXRlLnJlcGxhY2UoL1wiL2csICcnKSArICcuJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHdpbkNvcHlbcHJvcGVydHlOYW1lRnJvbU1hcF0gPSBjbGFzc05hbWUuc3Vic3RyKDAsIGNsYXNzTmFtZS5sZW5ndGggLSAyKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBwYXJzZSBzdGF0ZXNcbiAgICAgICAgZWxzZSBpZiAocHJvcGVydHlOYW1lID09PSAnX05FVF9XTV9TVEFURShBVE9NKScpIHtcbiAgICAgICAgICAgIGNvbnN0IHN0YXRlcyA9IHZhbHVlLnNwbGl0KCcsICcpO1xuICAgICAgICAgICAgd2luQ29weS5zdGF0ZXMgPSBbXTtcbiAgICAgICAgICAgIHN0YXRlcy5mb3JFYWNoKChzdGF0ZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChzdGF0ZSAhPT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgd2luQ29weS5zdGF0ZXMucHVzaChzdGF0ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gcGFyc2Ugc2ltcGxlIHN0cmluZ3MgYW5kIGludGVnZXJzXG4gICAgICAgIGVsc2UgaWYgKHByb3BlcnR5TmFtZUZyb21NYXApIHtcbiAgICAgICAgICAgIC8vIHNwZWNpYWwgaGFuZGxlIG51bWJlciB0eXBlc1xuICAgICAgICAgICAgaWYgKENGRy5XTV9NRVRBX01BUF9OVU1CRVJfVFlQRVMuaW5kZXhPZihwcm9wZXJ0eU5hbWUpID4gLTEpIHtcbiAgICAgICAgICAgICAgICB3aW5Db3B5W3Byb3BlcnR5TmFtZUZyb21NYXBdID0gcGFyc2VJbnQodmFsdWUsIDEwKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgd2luQ29weVtwcm9wZXJ0eU5hbWVGcm9tTWFwXSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG4gICAgLy8gY29uc29sZS5sb2cod2luQ29weSk7XG4gICAgcmV0dXJuIHdpbkNvcHk7XG59XG5cbi8vIFRPRE8gcHJldHRpZnkgYXJncyBzdHJ1Y3R1cmVcbmV4cG9ydCBmdW5jdGlvbiBzdGFydFByb2dyYW0oZXhlY3V0YWJsZUZpbGU6IHN0cmluZywgZGVza3RvcEZpbGVQYXRoOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBJU19ERUJVRyAmJiBjb25zb2xlLmxvZygnREVCVUc6IHN0YXJ0UHJvZ3JhbSgpOicsIGV4ZWN1dGFibGVGaWxlLCBkZXNrdG9wRmlsZVBhdGgpO1xuXG4gICAgbGV0IGNtZDtcbiAgICBsZXQgYXJncyA9IFtdO1xuICAgIGlmIChkZXNrdG9wRmlsZVBhdGgpIHtcbiAgICAgICAgY21kID0gYGF3a2A7XG4gICAgICAgIGFyZ3MucHVzaCgnL15FeGVjPS8ge3N1YihcIl5FeGVjPVwiLCBcIlwiKTsgZ3N1YihcIiA/JVtjRGRGZmlrbU5uVXV2XVwiLCBcIlwiKTsgZXhpdCBzeXN0ZW0oJDApfScpO1xuICAgICAgICBhcmdzLnB1c2goZGVza3RvcEZpbGVQYXRoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBwYXJzZWRDbWQgPSBwYXJzZUNtZEFyZ3MoZXhlY3V0YWJsZUZpbGUpO1xuICAgICAgICBjbWQgPSBwYXJzZWRDbWRbMF07XG4gICAgICAgIGFyZ3MgPSBwYXJzZWRDbWRbMV07XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChmdWxmaWxsKSA9PiB7XG4gICAgICAgIHNwYXduKGNtZCwgYXJncywge1xuICAgICAgICAgICAgc3RkaW86ICdpZ25vcmUnLFxuICAgICAgICAgICAgZGV0YWNoZWQ6IHRydWUsXG4gICAgICAgIH0pLnVucmVmKCk7XG5cbiAgICAgICAgLy8gY3VycmVudGx5IHdlIGhhdmUgbm8gZXJyb3IgaGFuZGxpbmcgYXMgdGhlIHByb2Nlc3MgaXMgc3RhcnRlZCBkZXRhY2hlZFxuICAgICAgICBmdWxmaWxsKCk7XG4gICAgfSk7XG59XG5cbi8vIEdFVCBBQ1RJVkUgV0lORE9XIExJU1Rcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRBY3RpdmVXaW5kb3dMaXN0KCk6IFByb21pc2U8V2luT2JqW10+IHtcbiAgICBjb25zdCB3aW5kb3dJZHMgPSBhd2FpdCBnZXRBY3RpdmVXaW5kb3dJZHMoKTtcbiAgICBjb25zdCB3aW5kb3dMaXN0OiBXaW5PYmpJZE9ubHlbXSA9IFtdO1xuICAgIHdpbmRvd0lkcy5mb3JFYWNoKCh3aW5kb3dJZCkgPT4ge1xuICAgICAgICB3aW5kb3dMaXN0LnB1c2goe1xuICAgICAgICAgICAgd2luZG93SWQ6IHdpbmRvd0lkLFxuICAgICAgICAgICAgd2luZG93SWREZWM6IHBhcnNlSW50KHdpbmRvd0lkLCAxNiksXG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgLy8gYWRkIG1ldGEgZGF0YSByaWdodCBhd2F5XG4gICAgY29uc3QgcHJvbWlzZXMgPSB3aW5kb3dMaXN0Lm1hcCgod2luKSA9PiBnZXRBZGRpdGlvbmFsTWV0YURhdGFGb3JXaW4od2luKSk7XG5cbiAgICBjb25zdCB3aW5kb3dzV2l0aERhdGE6IFdpbk9ialtdID0gYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZXMpIGFzIFdpbk9ialtdO1xuXG4gICAgSVNfREVCVUcgJiYgY29uc29sZS5sb2coJ0RFQlVHOiBnZXRBY3RpdmVXaW5kb3dMaXN0KCk6Jywgd2luZG93TGlzdCk7XG4gICAgcmV0dXJuIHdpbmRvd3NXaXRoRGF0YS5maWx0ZXIoX2ZpbHRlckludmFsaWRXaW5kb3dzKTtcbn1cblxuZnVuY3Rpb24gX2ZpbHRlckludmFsaWRXaW5kb3dzKHdpbjogV2luT2JqKTogYm9vbGVhbiB7XG4gICAgLy8gZmlsdGVyIG5vbmUgbm9ybWFsIHdpbmRvd3MsIGV4Y2x1ZGVkIGNsYXNzIG5hbWVzIGFuZCBpbmNvbXBsZXRlIHdpbmRvd3NcbiAgICBjb25zdCBpc05vcm1hbFdpbmRvdyA9ICghd2luLndtVHlwZSB8fCB3aW4ud21UeXBlID09PSAnX05FVF9XTV9XSU5ET1dfVFlQRV9OT1JNQUwnKTtcblxuICAgIGNvbnN0IGlzTm90RXhjbHVkZWQgPSAhKF9pc0V4Y2x1ZGVkV21DbGFzc05hbWUod2luLndtQ2xhc3NOYW1lKSk7XG4gICAgY29uc3QgaGFzV21DbGFzc05hbWUgPSAhISh3aW4ud21DbGFzc05hbWUpO1xuXG4gICAgLy8gd2FybiBpZiBubyB3bUNsYXNzTmFtZSBldmVuIHRob3VnaCB0aGVyZSBzaG91bGQgYmVcbiAgICBpZiAoaXNOb3JtYWxXaW5kb3cgJiYgaXNOb3RFeGNsdWRlZCAmJiAhaGFzV21DbGFzc05hbWUpIHtcbiAgICAgICAgY29uc29sZS53YXJuKHdpbi53aW5kb3dJZCArICcgaGFzIG5vIHdtQ2xhc3NOYW1lLiBXaW46ICcsIHdpbik7XG4gICAgfVxuXG4gICAgcmV0dXJuIChpc05vcm1hbFdpbmRvdyAmJiBpc05vdEV4Y2x1ZGVkICYmIGhhc1dtQ2xhc3NOYW1lKTtcbn1cblxuXG5mdW5jdGlvbiBfaXNFeGNsdWRlZFdtQ2xhc3NOYW1lKHdtQ2xhc3NOYW1lKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIENGRy5XTV9DTEFTU19FWENMVVNJT05TLmluZGV4T2Yod21DbGFzc05hbWUpID4gLTE7XG59XG5cbmZ1bmN0aW9uIF9jYXRjaEdlbmVyaWNFcnIoZXJyKTogdm9pZCB7XG4gICAgY29uc29sZS5lcnJvcignb3RoZXJDbWQ6IEdlbmVyaWMgRXJyb3InLCBlcnIsIGVyci5zdGFjayk7XG4gICAgbG9nKCdvdGhlckNtZDonLCBhcmd1bWVudHMpO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuaW1wb3J0IHtnZXRXaW5kb3dHZW9tZXRyeSwgZ29Ub1ZpZXdwb3J0fSBmcm9tICcuL3gxMVdyYXBwZXInO1xuaW1wb3J0IHtnZXRBY3RpdmVXaW5kb3dMaXN0fSBmcm9tICcuL290aGVyQ21kJztcbmltcG9ydCB7Q0ZHfSBmcm9tICcuL2NvbmZpZyc7XG5pbXBvcnQge1dpbk9ian0gZnJvbSAnLi9tb2RlbCc7XG5cbmNvbnN0IGZpbmR1cCA9IHJlcXVpcmUoJ2ZpbmR1cC1zeW5jJyk7XG5cblxuY29uc3QgSE9NRV9ESVIgPSBwcm9jZXNzLmVudlsnSE9NRSddO1xuY29uc3QgREVGQVVMVF9ERVNLVE9QX0ZJTEVfTE9DQVRJT05TID0gW1xuICAgICd7aG9tZX0vLmxvY2FsL3NoYXJlL2FwcGxpY2F0aW9ucycsXG4gICAgJ3tob21lfS8uZ25vbWUvYXBwcy8nLFxuICAgICcvdXNyL3NoYXJlL2FwcGxpY2F0aW9ucycsXG4gICAgJy91c3IvbG9jYWwvc2hhcmUvYXBwbGljYXRpb25zJyxcbiAgICAnL3Vzci9zaGFyZS9hcHAtaW5zdGFsbCcsXG5dO1xuXG5cbmZ1bmN0aW9uIF9jYXRjaEdlbmVyaWNFcnIoZXJyKSB7XG4gICAgY29uc29sZS5lcnJvcignR2VuZXJpYyBFcnJvciBpbiBNZXRhIFdyYXBwZXInLCBlcnIsIGVyci5zdGFjayk7XG4gICAgdGhyb3cgZXJyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ29Ub0ZpcnN0V29ya3NwYWNlKCkge1xuICAgIHJldHVybiBnb1RvVmlld3BvcnQoMCwgMCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmaW5kRGVza3RvcEZpbGUoZmlsZU5hbWUpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKGZ1bGZpbGwsIHJlamVjdCkgPT4ge1xuICAgICAgICBjb25zdCBkZXNrdG9wRmlsZUxvY2F0aW9ucyA9IENGRy5ERVNLVE9QX0ZJTEVfTE9DQVRJT05TIHx8IERFRkFVTFRfREVTS1RPUF9GSUxFX0xPQ0FUSU9OUztcbiAgICAgICAgY29uc3QgcGF0dGVybnMgPSBbXTtcblxuICAgICAgICBjb25zdCBwYXJlbnREaXJzID0gZGVza3RvcEZpbGVMb2NhdGlvbnMubWFwKChwYXJlbnREaXIpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBwYXJlbnREaXIucmVwbGFjZSgne2hvbWV9JywgSE9NRV9ESVIpO1xuICAgICAgICB9KTtcblxuXG4gICAgICAgIGxldCBmaXJzdEZpbGU7XG4gICAgICAgIGNvbnN0IG1hdGNoID0gcGFyZW50RGlycy5maW5kKChkaXIpID0+IHtcbiAgICAgICAgICAgIGZpcnN0RmlsZSA9IGZpbmR1cChmaWxlTmFtZSwge2N3ZDogZGlyfSk7XG4gICAgICAgICAgICByZXR1cm4gZmlyc3RGaWxlO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoIWZpcnN0RmlsZSB8fCAhbWF0Y2gpIHtcbiAgICAgICAgICAgIGNvbnN0IGVyciA9ICdmaW5kRGVza3RvcEZpbGUgY2FudCBmaW5kIGZpbGU7IHNlYXJjaGVkIHBhdHRlcm5zJztcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyLCBwYXR0ZXJucyk7XG4gICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZ1bGZpbGwoZmlyc3RGaWxlKTtcbiAgICAgICAgfVxuICAgIH0pLmNhdGNoKF9jYXRjaEdlbmVyaWNFcnIpO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRBY3RpdmVXaW5kb3dMaXN0RmxvdygpOiBQcm9taXNlPFdpbk9ialtdIHwgYW55PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChmdWxmaWxsLCByZWplY3QpID0+IHtcbiAgICAgICAgcmV0dXJuIGdldEFjdGl2ZVdpbmRvd0xpc3QoKVxuICAgICAgICAgICAgLnRoZW4oYXN5bmMgKHdpbmRvd0xpc3Q6IGFueVtdKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJvbWlzZXMgPSB3aW5kb3dMaXN0Lm1hcCgod2luKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBnZXRXaW5kb3dHZW9tZXRyeSh3aW4ud2luZG93SWQpXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoZ2VvOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBwcm9wIGluIGdlbykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ2VvLmhhc093blByb3BlcnR5KHByb3ApKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5bcHJvcF0gPSBnZW9bcHJvcF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPIG9yZ2FuaXplIGFkZGluZyBvZiBhbGwgdGhvc2UgZGlmZmVyZW50IHByb3BlcnRpZXMgYmV0dGVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWRkIG1pc3Npbmcgc3RhdGljIHByb3BlcnRpZXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW4uc2ltcGxlTmFtZSA9IF9wYXJzZVNpbXBsZVdpbmRvd05hbWUod2luLndtQ2xhc3NOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gd2luO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cblxuICAgICAgICAgICAgICAgIC8vIHdlJ3JlIHVzaW5nIGEgd2F0ZXJmYWxsIGJlY2F1c2Ugd2UncmUgZGVhbGluZyB3aXRoIHgxMSByZXF1ZXN0c1xuICAgICAgICAgICAgICAgIGlmIChwcm9taXNlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBwcm9taXNlIG9mIHByb21pc2VzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IHByb21pc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF9hZGRQYXJzZWRFeGVjdXRhYmxlRmlsZXNGcm9tV21DbGFzc05hbWVzKHdpbmRvd0xpc3QpXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbigod2luZG93TGlzdFdpdGhXbUNsYXNzTmFtZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdWxmaWxsKHdpbmRvd0xpc3RXaXRoV21DbGFzc05hbWVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGZ1bGZpbGwoW10pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIH0pLmNhdGNoKF9jYXRjaEdlbmVyaWNFcnIpO1xufVxuXG4vLyBNSVhFRFxuZnVuY3Rpb24gX2FkZFBhcnNlZEV4ZWN1dGFibGVGaWxlc0Zyb21XbUNsYXNzTmFtZXMod2luZG93TGlzdCk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChmdWxmaWxsLCByZWplY3QpID0+IHtcbiAgICAgICAgY29uc3QgcHJvbWlzZXMgPSB3aW5kb3dMaXN0LmZpbHRlcih3aW4gPT4gIXdpbi5leGVjdXRhYmxlRmlsZSlcbiAgICAgICAgICAgIC5tYXAoKHdpbikgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBfcGFyc2VFeGVjdXRhYmxlRmlsZUZyb21XbUNsYXNzTmFtZSh3aW4ud21DbGFzc05hbWUpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKChmaWxlTmFtZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2luLmV4ZWN1dGFibGVGaWxlID0gZmlsZU5hbWU7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHByb21pc2VzLmxlbmd0aCkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBwcm9taXNlIG9mIHByb21pc2VzKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgcHJvbWlzZTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdWxmaWxsKHdpbmRvd0xpc3QpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZnVsZmlsbCh3aW5kb3dMaXN0KTtcbiAgICAgICAgfVxuICAgIH0pLmNhdGNoKF9jYXRjaEdlbmVyaWNFcnIpO1xufVxuXG5mdW5jdGlvbiBfcGFyc2VFeGVjdXRhYmxlRmlsZUZyb21XbUNsYXNzTmFtZSh3bUNsYXNzTmFtZSk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChmdWxmaWxsLCByZWplY3QpID0+IHtcbiAgICAgICAgY29uc3QgZXhlY3V0YWJsZUZpbGVGcm9tTWFwID0gQ0ZHLldNX0NMQVNTX0FORF9FWEVDVVRBQkxFX0ZJTEVfTUFQW3dtQ2xhc3NOYW1lXTtcbiAgICAgICAgaWYgKGV4ZWN1dGFibGVGaWxlRnJvbU1hcCkge1xuICAgICAgICAgICAgZnVsZmlsbChleGVjdXRhYmxlRmlsZUZyb21NYXApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3Qgc3BsaXRWYWx1ZXMgPSB3bUNsYXNzTmFtZS5zcGxpdCgnLicpO1xuICAgICAgICAgICAgY29uc3QgZmlsZU5hbWUgPSBzcGxpdFZhbHVlc1swXTtcbiAgICAgICAgICAgIGlmIChfaXNDaHJvbWVBcHAoZmlsZU5hbWUpKSB7XG4gICAgICAgICAgICAgICAgX3BhcnNlQ2hyb21lQXBwRGVza3RvcEZpbGVOYW1lKGZpbGVOYW1lKVxuICAgICAgICAgICAgICAgICAgICAudGhlbihmdWxmaWxsKVxuICAgICAgICAgICAgICAgICAgICAuY2F0Y2gocmVqZWN0KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZnVsZmlsbChmaWxlTmFtZSArICcuZGVza3RvcCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSkuY2F0Y2goX2NhdGNoR2VuZXJpY0Vycik7XG59XG5cbmZ1bmN0aW9uIF9wYXJzZVNpbXBsZVdpbmRvd05hbWUod21DbGFzc05hbWUpIHtcbiAgICBjb25zdCBzcGxpdFZhbHVlcyA9IHdtQ2xhc3NOYW1lLnNwbGl0KCcuJyk7XG4gICAgaWYgKHNwbGl0VmFsdWVzWzFdKSB7XG4gICAgICAgIHJldHVybiBzcGxpdFZhbHVlc1sxXTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gd21DbGFzc05hbWU7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBfaXNDaHJvbWVBcHAoZmlsZU5hbWUpIHtcbiAgICByZXR1cm4gISFmaWxlTmFtZS5tYXRjaCgvXmNyeF8vKTtcbn1cblxuZnVuY3Rpb24gX3BhcnNlQ2hyb21lQXBwRGVza3RvcEZpbGVOYW1lKGZpbGVOYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgLy8gd2Ugd2FuJ3QgdG8gc2VhcmNoIGZyb20gZGVza3RvcCBmaWxlcyBvbmx5XG4gICAgICAgIGNvbnN0IGxvY2F0ZVN0ciA9IGZpbGVOYW1lLnJlcGxhY2UoJ2NyeF8nLCAnKicpICsgJyouZGVza3RvcCc7XG4gICAgICAgIGZpbmREZXNrdG9wRmlsZShsb2NhdGVTdHIpXG4gICAgICAgICAgICAudGhlbihyZXNvbHZlKVxuICAgICAgICAgICAgLmNhdGNoKHJlamVjdCk7XG4gICAgfSkuY2F0Y2goX2NhdGNoR2VuZXJpY0Vycik7XG59XG4iLCIndXNlIHN0cmljdCc7XG5pbXBvcnQge0NGRywgU0VTU0lPTl9EQVRBX0RJUn0gZnJvbSAnLi9jb25maWcnO1xuaW1wb3J0ICogYXMgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IHtnZXRDb25uZWN0ZWREaXNwbGF5c0lkLCBzdGFydFByb2dyYW19IGZyb20gJy4vb3RoZXJDbWQnO1xuaW1wb3J0IHtjbG9zZVdpbmRvdywgZ2V0WCwgaW5pdFgxMSwgbW92ZVRvV29ya3NwYWNlLCByZXN0b3JlV2luZG93UG9zaXRpb259IGZyb20gJy4veDExV3JhcHBlcic7XG5pbXBvcnQge2ZpbmREZXNrdG9wRmlsZSwgZ2V0QWN0aXZlV2luZG93TGlzdEZsb3csIGdvVG9GaXJzdFdvcmtzcGFjZX0gZnJvbSAnLi9tZXRhV3JhcHBlcic7XG5pbXBvcnQge2xvZ30gZnJvbSAnLi9sb2cnO1xuaW1wb3J0IHtXaW5PYmp9IGZyb20gJy4vbW9kZWwnO1xuLy8gaW1wb3J0ICogYXMgU3RvcmUgZnJvbSAnamZzJztcbmNvbnN0IFN0b3JlID0gcmVxdWlyZSgnamZzJyk7XG5cblxuLy8gY3JlYXRlIGRhdGEgc3RvcmVcbmNvbnN0IGRiID0gbmV3IFN0b3JlKFNFU1NJT05fREFUQV9ESVIsIHtwcmV0dHk6IENGRy5TQVZFX1NFU1NJT05fSU5fUFJFVFRZX0ZPUk1BVH0pO1xuXG5cbi8vIHNldHVwIG1ldGEgd3JhcHBlclxuXG4vLyBFWFBPUlRcbi8vIC0tLS0tLVxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGxpc3RTZXNzaW9ucyxcbiAgICByZW5hbWVTZXNzaW9uLFxuICAgIHNhdmVTZXNzaW9uLFxuICAgIHJlbW92ZVNlc3Npb24sXG4gICAgcmVzdG9yZVNlc3Npb24sXG4gICAgZ2V0U2Vzc2lvbnMsXG4gICAgZ2V0WDogZ2V0WCxcblxuXG4gICAgZ2V0Q29ubmVjdGVkRGlzcGxheXNJZCxcbiAgICByZXNldENmZzogKCkgPT4ge1xuICAgICAgICBjb25zdCBjb25maWdGaWxlUGF0aCA9IENGRy5EQVRBX0RJUiArICcvY29uZmlnLmpzb24nO1xuICAgICAgICBpZiAoZnMuZXhpc3RzU3luYyhjb25maWdGaWxlUGF0aCkpIHtcbiAgICAgICAgICAgIGZzLnVubGlua1N5bmMoY29uZmlnRmlsZVBhdGgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignTm8gQ29uZmlnIHByZXNlbnQgaW4gJyArIGNvbmZpZ0ZpbGVQYXRoKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgZ2V0Q2ZnOiAoKSA9PiB7XG4gICAgICAgIHJldHVybiBDRkc7XG4gICAgfSxcbiAgICBnZXREYjogKCkgPT4ge1xuICAgICAgICByZXR1cm4gZGI7XG4gICAgfVxufTtcblxuLy8gSEVMUEVSXG4vLyAtLS0tLS0tLVxuZnVuY3Rpb24gX2NhdGNoR2VuZXJpY0VycihlcnIpIHtcbiAgICBjb25zb2xlLmVycm9yKCdHZW5lcmljIEVycm9yIGluIE1haW4gSGFuZGxlcicsIGVyciwgZXJyLnN0YWNrKTtcbiAgICB0aHJvdyBlcnI7XG59XG5cbmZ1bmN0aW9uIGdldFNlc3Npb25zKCkge1xuICAgIHJldHVybiBkYi5hbGxTeW5jKCk7XG59XG5cbi8vIE1BSU4gRlVOQ1RJT05TXG4vLyAtLS0tLS0tLS0tLS0tLVxuZnVuY3Rpb24gbGlzdFNlc3Npb25zKCkge1xuICAgIGxldCBsaXN0ID0gT2JqZWN0LmtleXMoZ2V0U2Vzc2lvbnMoKSk7XG4gICAgbGlzdC5mb3JFYWNoKChuYW1lKSA9PiB7XG4gICAgICAgIGxvZyhuYW1lKTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gcmVuYW1lU2Vzc2lvbihvbGROYW1lOiBzdHJpbmcsIG5ld05hbWU6IHN0cmluZykge1xuICAgIGxldCBvYmogPSBkYi5nZXRTeW5jKG9sZE5hbWUpO1xuICAgIGlmIChvYmoubWVzc2FnZSkge1xuICAgICAgICBpZiAob2JqLm1lc3NhZ2UgPT09ICdjb3VsZCBub3QgbG9hZCBkYXRhJykge1xuICAgICAgICAgICAgbG9nKGBFcnJvcjogQ291bGQgbm90IGZpbmQgYSBzZXNzaW9uIG5hbWVkICcke29sZE5hbWV9J2ApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbG9nKG9iai5tZXNzYWdlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRiLnNhdmVTeW5jKG5ld05hbWUsIG9iaik7XG4gICAgZGIuZGVsZXRlKG9sZE5hbWUpO1xufVxuXG5mdW5jdGlvbiBzYXZlU2Vzc2lvbihzZXNzaW9uTmFtZTogc3RyaW5nLCBpbnB1dEhhbmRsZXJzKTogUHJvbWlzZTxhbnk+IHtcbiAgICBjb25zdCBzZXNzaW9uVG9IYW5kbGUgPSBzZXNzaW9uTmFtZSB8fCAnREVGQVVMVCc7XG5cbiAgICByZXR1cm4gaW5pdFgxMSgpXG4gICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBnZXRBY3RpdmVXaW5kb3dMaXN0RmxvdygpO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbigod2luZG93TGlzdCkgPT4ge1xuICAgICAgICAgICAgLy8gZGVza3RvcCBmaWxlIHBhdGhzIGFuZCBjb25uZWN0ZWQgZGlzcGxheSBpZHNcbiAgICAgICAgICAgIHJldHVybiBfZ3Vlc3NBbmRTZXREZXNrdG9wRmlsZVBhdGhzKHdpbmRvd0xpc3QsIGlucHV0SGFuZGxlcnMuZGVza3RvcEZpbGVQYXRoKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHdpbmRvd0xpc3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNvbm5lY3RlZERpc3BsYXlzSWQgPSBnZXRDb25uZWN0ZWREaXNwbGF5c0lkKCk7XG4gICAgICAgICAgICByZXR1cm4gc2F2ZVNlc3Npb25Gb3JEaXNwbGF5VG9EYihzZXNzaW9uVG9IYW5kbGUsIGNvbm5lY3RlZERpc3BsYXlzSWQsIHdpbmRvd0xpc3QpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignc2F2ZVNlc3Npb24oKTogQW4gZXJyb3Igb2NjdXJyZWQnLCBlcnIpO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9KTtcbn1cblxuZnVuY3Rpb24gc2F2ZVNlc3Npb25Gb3JEaXNwbGF5VG9EYihzZXNzaW9uVG9IYW5kbGU6IHN0cmluZywgY29ubmVjdGVkRGlzcGxheXNJZDogc3RyaW5nLCB3aW5kb3dMaXN0OiBXaW5PYmpbXSk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgoZnVsZmlsbCwgcmVqZWN0KSA9PiB7XG4gICAgICAgIC8vIGNoZWNrIGlmIGVudHJ5IGV4aXN0cyBhbmQgdXBkYXRlXG4gICAgICAgIGRiLmdldChzZXNzaW9uVG9IYW5kbGUsIChlcnIsIHNlc3Npb25EYXRhKSA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgLy8gTk9URTogd2UncmUgbm90IGZhaWxpbmcgYmVjYXVzZSwgdGhlIGNhc2UgaXMgcHJvYmFibHkgdGhhdCB0aGVyZSBpcyBubyBzZXNzaW9uIGZpbGUgeWV0XG4gICAgICAgICAgICAgICAgbG9nKGBzYXZlU2Vzc2lvbkZvckRpc3BsYXlUb0RiOiBubyBzZXNzaW9uIGZpbGUgcHJlc2VudCB5ZXQgZm9yIFwiJHtzZXNzaW9uVG9IYW5kbGV9XCIsIGNyZWF0aW5nIGEgbmV3IG9uZS4uLmApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIXNlc3Npb25EYXRhKSB7XG4gICAgICAgICAgICAgICAgLy8gY3JlYXRlIG5ldyBvYmplY3RcbiAgICAgICAgICAgICAgICBzZXNzaW9uRGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogc2Vzc2lvblRvSGFuZGxlLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXNlc3Npb25EYXRhLmRpc3BsYXlzQ29tYmluYXRpb25zIHx8ICFBcnJheS5pc0FycmF5KHNlc3Npb25EYXRhLmRpc3BsYXlzQ29tYmluYXRpb25zKSkge1xuICAgICAgICAgICAgICAgIC8vIGNyZWF0ZSBuZXcgYXJyYXlcbiAgICAgICAgICAgICAgICBzZXNzaW9uRGF0YS5kaXNwbGF5c0NvbWJpbmF0aW9ucyA9IFtdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBleGlzdGluZ0Rpc3BsYXlFbnRyeSA9IHNlc3Npb25EYXRhLmRpc3BsYXlzQ29tYmluYXRpb25zLmZpbmQoKGVudHJ5KSA9PiBlbnRyeS5pZCA9PT0gY29ubmVjdGVkRGlzcGxheXNJZCk7XG4gICAgICAgICAgICBpZiAoZXhpc3RpbmdEaXNwbGF5RW50cnkpIHtcbiAgICAgICAgICAgICAgICBleGlzdGluZ0Rpc3BsYXlFbnRyeS53aW5kb3dMaXN0ID0gd2luZG93TGlzdDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2Vzc2lvbkRhdGEuZGlzcGxheXNDb21iaW5hdGlvbnMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBjb25uZWN0ZWREaXNwbGF5c0lkLFxuICAgICAgICAgICAgICAgICAgICB3aW5kb3dMaXN0LFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkYi5zYXZlKHNlc3Npb25Ub0hhbmRsZSwgc2Vzc2lvbkRhdGEsIChlcnIpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGxvZygnU0FWRUQgU0VTU0lPTjogJyArIHNlc3Npb25Ub0hhbmRsZSk7XG4gICAgICAgICAgICAgICAgICAgIGZ1bGZpbGwoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIHJlc3RvcmVTZXNzaW9uKHNlc3Npb25OYW1lOiBzdHJpbmcsIGlzQ2xvc2VBbGxPcGVuV2luZG93czogYm9vbGVhbik6IFByb21pc2U8YW55PiB7XG4gICAgY29uc3Qgc2Vzc2lvblRvSGFuZGxlID0gc2Vzc2lvbk5hbWUgfHwgJ0RFRkFVTFQnO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChmdWxmaWxsLCByZWplY3QpID0+IHtcbiAgICAgICAgZGIuZ2V0KHNlc3Npb25Ub0hhbmRsZSB8fCAnREVGQVVMVCcsIChlcnIsIHNlc3Npb25EYXRhKSA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgc2F2ZWRXaW5kb3dMaXN0O1xuXG4gICAgICAgICAgICBpbml0WDExKClcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfY2xvc2VBbGxXaW5kb3dzSWZTZXQoaXNDbG9zZUFsbE9wZW5XaW5kb3dzKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKGdvVG9GaXJzdFdvcmtzcGFjZSlcbiAgICAgICAgICAgICAgICAudGhlbihnZXRDb25uZWN0ZWREaXNwbGF5c0lkKVxuICAgICAgICAgICAgICAgIC50aGVuKChjb25uZWN0ZWREaXNwbGF5c0lkKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghc2Vzc2lvbkRhdGEuZGlzcGxheXNDb21iaW5hdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYG5vIGRpc3BsYXkgY29tYmluYXRpb25zIHNhdmVkIHlldGApO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGlzcGxheUVudHJ5ID0gc2Vzc2lvbkRhdGEuZGlzcGxheXNDb21iaW5hdGlvbnMuZmluZCgoZW50cnkpID0+IGVudHJ5LmlkID09PSBjb25uZWN0ZWREaXNwbGF5c0lkKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoZGlzcGxheUVudHJ5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzYXZlZFdpbmRvd0xpc3QgPSBkaXNwbGF5RW50cnkud2luZG93TGlzdDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYG5vIGRhdGEgZm9yIGN1cnJlbnQgZGlzcGxheSBpZCAnJHtjb25uZWN0ZWREaXNwbGF5c0lkfScgc2F2ZWQgeWV0YCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGdldEFjdGl2ZVdpbmRvd0xpc3RGbG93KCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbigoY3VycmVudFdpbmRvd0xpc3QpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9zdGFydFNlc3Npb25Qcm9ncmFtcyhzYXZlZFdpbmRvd0xpc3QsIGN1cnJlbnRXaW5kb3dMaXN0KTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZ2V0cyBjdXJyZW50IHdpbmRvdyBsaXN0IGJ5IGl0c2VsZiBhbmQgcmV0dXJucyB0aGUgdXBkYXRlZCB2YXJpYW50XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfd2FpdEZvckFsbEFwcHNUb1N0YXJ0KHNhdmVkV2luZG93TGlzdCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbigodXBkYXRlZEN1cnJlbnRXaW5kb3dMaXN0OiBXaW5PYmpbXSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBfdXBkYXRlV2luZG93SWRzKHNhdmVkV2luZG93TGlzdCwgdXBkYXRlZEN1cnJlbnRXaW5kb3dMaXN0KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9yZXN0b3JlV2luZG93UG9zaXRpb25zKHNhdmVkV2luZG93TGlzdCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxvZygnUkVTVE9SRUQgU0VTU0lPTjogJyArIHNlc3Npb25Ub0hhbmRsZSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdBbiBlcnJvciBvY2N1cnJlZCcsIGVycik7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVsZmlsbCk7XG4gICAgICAgIH0pO1xuICAgIH0pLmNhdGNoKF9jYXRjaEdlbmVyaWNFcnIpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTZXNzaW9uKHNlc3Npb25OYW1lOiBzdHJpbmcpOiBQcm9taXNlPHVua25vd24+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKGZ1bGZpbGwsIHJlamVjdCkgPT4ge1xuICAgICAgICBmcy51bmxpbmsoQ0ZHLlNFU1NJT05fREFUQV9ESVIgKyAnLycgKyBzZXNzaW9uTmFtZSArICcuanNvbicsIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZnVsZmlsbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KS5jYXRjaChfY2F0Y2hHZW5lcmljRXJyKTtcbn1cblxuZnVuY3Rpb24gX2Nsb3NlQWxsV2luZG93c0lmU2V0KGlzQ2xvc2VBbGw6IGJvb2xlYW4pOiBQcm9taXNlPHVua25vd24+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKGZ1bGZpbGwsIHJlamVjdCkgPT4ge1xuICAgICAgICBpZiAoaXNDbG9zZUFsbCkge1xuICAgICAgICAgICAgbG9nKCdDbG9zaW5nIG9wZW5lZCBhcHBsaWNhdGlvbnMnKTtcbiAgICAgICAgICAgIGdldEFjdGl2ZVdpbmRvd0xpc3RGbG93KClcbiAgICAgICAgICAgICAgICAudGhlbigoY3VycmVudFdpbmRvd0xpc3Q6IGFueVtdKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRXaW5kb3dMaXN0LmZvckVhY2goKHdpbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VXaW5kb3cod2luLndpbmRvd0lkKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgX3dhaXRGb3JBbGxBcHBzVG9DbG9zZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdWxmaWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmNhdGNoKHJlamVjdCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2gocmVqZWN0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZ1bGZpbGwoKTtcbiAgICAgICAgfVxuICAgIH0pLmNhdGNoKF9jYXRjaEdlbmVyaWNFcnIpO1xufVxuXG5mdW5jdGlvbiBfd2FpdEZvckFsbEFwcHNUb0Nsb3NlKCk6IFByb21pc2U8dW5rbm93bj4ge1xuICAgIGxldCB0b3RhbFRpbWVXYWl0ZWQgPSAwO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgoZnVsZmlsbCwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGZ1bmN0aW9uIHBvbGxBbGxBcHBzQ2xvc2VkKCkge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgZ2V0QWN0aXZlV2luZG93TGlzdEZsb3coKVxuICAgICAgICAgICAgICAgICAgICAudGhlbigoY3VycmVudFdpbmRvd0xpc3Q6IFdpbk9ialtdKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b3RhbFRpbWVXYWl0ZWQgKz0gQ0ZHLlBPTExfQUxMX0FQUFNfU1RBUlRFRF9JTlRFUlZBTDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50V2luZG93TGlzdC5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodG90YWxUaW1lV2FpdGVkID4gQ0ZHLlBPTExfQUxMX01BWF9USU1FT1VUKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1BPTExfQUxMX01BWF9USU1FT1VUIHJlYWNoZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KCdQT0xMX0FMTF9NQVhfVElNRU9VVCByZWFjaGVkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2FsbCByZWN1cnNpdmVseVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb2xsQWxsQXBwc0Nsb3NlZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVsZmlsbChjdXJyZW50V2luZG93TGlzdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaChyZWplY3QpO1xuICAgICAgICAgICAgfSwgQ0ZHLlBPTExfQUxMX0FQUFNfU1RBUlRFRF9JTlRFUlZBTCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBzdGFydCBvbmNlIGluaXRpYWxseVxuICAgICAgICBwb2xsQWxsQXBwc0Nsb3NlZCgpO1xuICAgIH0pLmNhdGNoKF9jYXRjaEdlbmVyaWNFcnIpO1xufVxuXG5mdW5jdGlvbiBfd2FpdEZvckFsbEFwcHNUb1N0YXJ0KHNhdmVkV2luZG93TGlzdCk6IFByb21pc2U8V2luT2JqW10gfCB1bmtub3duPiB7XG4gICAgbG9nKCdXYWl0aW5nIGZvciBhbGwgYXBwbGljYXRpb25zIHRvIHN0YXJ0Li4uJyk7XG5cbiAgICBsZXQgdG90YWxUaW1lV2FpdGVkID0gMDtcbiAgICBsZXQgdGltZW91dDtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgoZnVsZmlsbCwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGZ1bmN0aW9uIHBvbGxBbGxBcHBzU3RhcnRlZChzYXZlZFdpbmRvd0xpc3Q6IFdpbk9ialtdLCB0aW1lb3V0RHVyYXRpb24gPSBDRkcuUE9MTF9BTExfQVBQU19TVEFSVEVEX0lOVEVSVkFMKSB7XG5cbiAgICAgICAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBjbGVhciB0aW1lb3V0IHRvIGJlIHNhdmVcbiAgICAgICAgICAgICAgICBpZiAodGltZW91dCkge1xuICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZ2V0QWN0aXZlV2luZG93TGlzdEZsb3coKVxuICAgICAgICAgICAgICAgICAgICAudGhlbigoY3VycmVudFdpbmRvd0xpc3QpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdGFsVGltZVdhaXRlZCArPSBDRkcuUE9MTF9BTExfQVBQU19TVEFSVEVEX0lOVEVSVkFMO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFfaXNBbGxBcHBzU3RhcnRlZChzYXZlZFdpbmRvd0xpc3QsIGN1cnJlbnRXaW5kb3dMaXN0KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0b3RhbFRpbWVXYWl0ZWQgPiBDRkcuUE9MTF9BTExfTUFYX1RJTUVPVVQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignUE9MTF9BTExfTUFYX1RJTUVPVVQgcmVhY2hlZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdVbmFibGUgdG8gc3RhcnQgdGhlIGZvbGxvd2luZyBhcHBzJywgX2dldE5vdFN0YXJ0ZWRBcHBzKHNhdmVkV2luZG93TGlzdCwgY3VycmVudFdpbmRvd0xpc3QpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KCdQT0xMX0FMTF9NQVhfVElNRU9VVCByZWFjaGVkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2FsbCByZWN1cnNpdmVseVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb2xsQWxsQXBwc1N0YXJ0ZWQoc2F2ZWRXaW5kb3dMaXN0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvZygnQWxsIGFwcGxpY2F0aW9ucyBzdGFydGVkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVsZmlsbChjdXJyZW50V2luZG93TGlzdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaChyZWplY3QpO1xuICAgICAgICAgICAgfSwgdGltZW91dER1cmF0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHN0YXJ0IG9uY2UgaW5pdGlhbGx5XG4gICAgICAgIHBvbGxBbGxBcHBzU3RhcnRlZChzYXZlZFdpbmRvd0xpc3QsIDUwMCk7XG4gICAgfSkuY2F0Y2goX2NhdGNoR2VuZXJpY0Vycik7XG59XG5cbmZ1bmN0aW9uIF9nZXROb3RTdGFydGVkQXBwcyhzYXZlZFdpbmRvd0xpc3Q6IFdpbk9ialtdLCBjdXJyZW50V2luZG93TGlzdDogV2luT2JqW10pOiBXaW5PYmpbXSB7XG4gICAgbGV0IG5vblN0YXJ0ZWRBcHBzID0gW107XG4gICAgc2F2ZWRXaW5kb3dMaXN0LmZvckVhY2goKHdpbikgPT4ge1xuICAgICAgICBpZiAoIV9nZXRNYXRjaGluZ1dpbmRvd0lkKHdpbiwgY3VycmVudFdpbmRvd0xpc3QpKSB7XG4gICAgICAgICAgICBub25TdGFydGVkQXBwcy5wdXNoKHdpbik7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gbm9uU3RhcnRlZEFwcHM7XG59XG5cbmZ1bmN0aW9uIF9pc0FsbEFwcHNTdGFydGVkKHNhdmVkV2luZG93TGlzdDogV2luT2JqW10sIGN1cnJlbnRXaW5kb3dMaXN0OiBXaW5PYmpbXSk6IGJvb2xlYW4ge1xuICAgIGxldCBpc0FsbFN0YXJ0ZWQgPSB0cnVlO1xuICAgIGNvbnN0IGN1cnJlbnRXaW5kb3dMaXN0Q29weSA9IGN1cnJlbnRXaW5kb3dMaXN0LnNsaWNlKDApO1xuICAgIHNhdmVkV2luZG93TGlzdC5mb3JFYWNoKCh3aW4pID0+IHtcbiAgICAgICAgaWYgKCFfZ2V0TWF0Y2hpbmdXaW5kb3dJZCh3aW4sIGN1cnJlbnRXaW5kb3dMaXN0Q29weSkpIHtcbiAgICAgICAgICAgIGlzQWxsU3RhcnRlZCA9IGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgaW5kZXggPSBjdXJyZW50V2luZG93TGlzdENvcHkuZmluZEluZGV4KCh3aW5Gcm9tQ3VycmVudCkgPT4gd2luLndtQ2xhc3NOYW1lID09PSB3aW5Gcm9tQ3VycmVudC53bUNsYXNzTmFtZSk7XG4gICAgICAgICAgICBjdXJyZW50V2luZG93TGlzdENvcHkuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBpc0FsbFN0YXJ0ZWQ7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIF9ndWVzc0FuZFNldERlc2t0b3BGaWxlUGF0aHMod2luZG93TGlzdDogV2luT2JqW10sIGlucHV0SGFuZGxlcik6IFByb21pc2U8V2luT2JqW10+IHtcbiAgICBjb25zdCBwcm9taXNlcyA9IHdpbmRvd0xpc3QubWFwKCh3aW4pID0+IF9ndWVzc0ZpbGVQYXRoKHdpbiwgaW5wdXRIYW5kbGVyKSk7XG5cbiAgICBmb3IgKGNvbnN0IHByb21pc2Ugb2YgcHJvbWlzZXMpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGF3YWl0IHByb21pc2U7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIF9jYXRjaEdlbmVyaWNFcnIoZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHdpbmRvd0xpc3Q7XG59XG5cbmZ1bmN0aW9uIF9ndWVzc0ZpbGVQYXRoKHdpbjogV2luT2JqLCBpbnB1dEhhbmRsZXIpOiBQcm9taXNlPHN0cmluZyB8IHVua25vd24+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKGZ1bGZpbGwsIHJlamVjdCkgPT4ge1xuICAgICAgICBmdW5jdGlvbiBjYWxsSW5wdXRIYW5kbGVyKGVycm9yPywgc3Rkb3V0Pykge1xuICAgICAgICAgICAgaW5wdXRIYW5kbGVyKGVycm9yLCB3aW4sIHN0ZG91dClcbiAgICAgICAgICAgICAgICAudGhlbigoaW5wdXQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKF9pc0Rlc2t0b3BGaWxlKHdpbi5leGVjdXRhYmxlRmlsZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbi5kZXNrdG9wRmlsZVBhdGggPSBpbnB1dDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bGZpbGwod2luLmRlc2t0b3BGaWxlUGF0aCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aW4uZXhlY3V0YWJsZUZpbGUgPSBpbnB1dDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bGZpbGwod2luLmV4ZWN1dGFibGVGaWxlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKHJlamVjdCk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGlmIChfaXNEZXNrdG9wRmlsZSh3aW4uZXhlY3V0YWJsZUZpbGUpKSB7XG4gICAgICAgICAgICBmaW5kRGVza3RvcEZpbGUod2luLmV4ZWN1dGFibGVGaWxlKVxuICAgICAgICAgICAgICAgIC50aGVuKChzdGRvdXQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbElucHV0SGFuZGxlcihudWxsLCBzdGRvdXQpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKGNhbGxJbnB1dEhhbmRsZXIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FsbElucHV0SGFuZGxlcih0cnVlLCB3aW4uZXhlY3V0YWJsZUZpbGUpO1xuICAgICAgICB9XG4gICAgfSkuY2F0Y2goX2NhdGNoR2VuZXJpY0Vycik7XG59XG5cbi8vIFRPRE8gY2hlY2sgZm9yIGhvdyBtYW55IGluc3RhbmNlcyB0aGVyZSBzaG91bGQgYmUgcnVubmluZyBvZiBhIHByb2dyYW1cbmFzeW5jIGZ1bmN0aW9uIF9zdGFydFNlc3Npb25Qcm9ncmFtcyh3aW5kb3dMaXN0OiBXaW5PYmpbXSwgY3VycmVudFdpbmRvd0xpc3Q6IFdpbk9ialtdKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgLy8gc2V0IGluc3RhbmNlcyBzdGFydGVkIHRvIDBcbiAgICB3aW5kb3dMaXN0LmZvckVhY2goKHdpbikgPT4gd2luLmluc3RhbmNlc1N0YXJ0ZWQgPSAwKTtcbiAgICBjb25zdCBwcm9taXNlcyA9IHdpbmRvd0xpc3RcbiAgICAgICAgLmZpbHRlcigod2luKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBudW1iZXJPZkluc3RhbmNlc09mV2luID0gX2dldE51bWJlck9mSW5zdGFuY2VzVG9SdW4od2luLCB3aW5kb3dMaXN0KTtcbiAgICAgICAgICAgIHJldHVybiAoIV9pc1Byb2dyYW1BbHJlYWR5UnVubmluZyh3aW4ud21DbGFzc05hbWUsIGN1cnJlbnRXaW5kb3dMaXN0LCBudW1iZXJPZkluc3RhbmNlc09mV2luLCB3aW4uaW5zdGFuY2VzU3RhcnRlZCkpO1xuICAgICAgICB9KVxuICAgICAgICAubWFwKCh3aW4pID0+IHtcbiAgICAgICAgICAgIHdpbi5pbnN0YW5jZXNTdGFydGVkICs9IDE7XG4gICAgICAgICAgICByZXR1cm4gc3RhcnRQcm9ncmFtKHdpbi5leGVjdXRhYmxlRmlsZSwgd2luLmRlc2t0b3BGaWxlUGF0aCk7XG4gICAgICAgIH0pO1xuXG4gICAgYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xufVxuXG5mdW5jdGlvbiBfZ2V0TnVtYmVyT2ZJbnN0YW5jZXNUb1J1bih3aW5kb3dUb01hdGNoOiBXaW5PYmosIHdpbmRvd0xpc3Q6IFdpbk9ialtdKTogbnVtYmVyIHtcbiAgICByZXR1cm4gd2luZG93TGlzdC5maWx0ZXIoKHdpbikgPT4ge1xuICAgICAgICByZXR1cm4gd2luLndtQ2xhc3NOYW1lID09PSB3aW5kb3dUb01hdGNoLndtQ2xhc3NOYW1lO1xuICAgIH0pLmxlbmd0aDtcbn1cblxuZnVuY3Rpb24gX2lzUHJvZ3JhbUFscmVhZHlSdW5uaW5nKHdtQ2xhc3NOYW1lOiBzdHJpbmcsIGN1cnJlbnRXaW5kb3dMaXN0OiBXaW5PYmpbXSwgbnVtYmVyT2ZJbnN0YW5jZXNUb1J1bjogbnVtYmVyLCBpbnN0YW5jZXNTdGFydGVkOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICBpZiAoIW51bWJlck9mSW5zdGFuY2VzVG9SdW4pIHtcbiAgICAgICAgbnVtYmVyT2ZJbnN0YW5jZXNUb1J1biA9IDE7XG4gICAgfVxuXG4gICAgaWYgKCFpbnN0YW5jZXNTdGFydGVkKSB7XG4gICAgICAgIGluc3RhbmNlc1N0YXJ0ZWQgPSAwO1xuICAgIH1cblxuICAgIGxldCBpbnN0YW5jZXNSdW5uaW5nID0gMDtcbiAgICBjdXJyZW50V2luZG93TGlzdC5mb3JFYWNoKCh3aW4pID0+IHtcbiAgICAgICAgaWYgKHdpbi53bUNsYXNzTmFtZSA9PT0gd21DbGFzc05hbWUpIHtcbiAgICAgICAgICAgIGluc3RhbmNlc1J1bm5pbmcrKztcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGxvZygnU3RhdHVzOiBcIicgKyB3bUNsYXNzTmFtZSArICdcIiBpcyBydW5uaW5nOicsIChpbnN0YW5jZXNSdW5uaW5nICsgaW5zdGFuY2VzU3RhcnRlZCA+PSBudW1iZXJPZkluc3RhbmNlc1RvUnVuKSwgbnVtYmVyT2ZJbnN0YW5jZXNUb1J1biwgaW5zdGFuY2VzU3RhcnRlZCk7XG4gICAgcmV0dXJuIGluc3RhbmNlc1J1bm5pbmcgKyBpbnN0YW5jZXNTdGFydGVkID49IG51bWJlck9mSW5zdGFuY2VzVG9SdW47XG59XG5cbmZ1bmN0aW9uIF9pc0Rlc2t0b3BGaWxlKGV4ZWN1dGFibGVGaWxlOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gZXhlY3V0YWJsZUZpbGUgJiYgISFleGVjdXRhYmxlRmlsZS5tYXRjaCgvZGVza3RvcCQvKTtcbn1cblxuZnVuY3Rpb24gX3VwZGF0ZVdpbmRvd0lkcyhzYXZlZFdpbmRvd0xpc3Q6IFdpbk9ialtdLCBjdXJyZW50V2luZG93TGlzdDogV2luT2JqW10pIHtcbiAgICBjb25zdCB3bUNsYXNzTmFtZU1hcCA9IHt9O1xuICAgIHNhdmVkV2luZG93TGlzdC5mb3JFYWNoKCh3aW4pID0+IHtcbiAgICAgICAgaWYgKCF3bUNsYXNzTmFtZU1hcFt3aW4ud21DbGFzc05hbWVdKSB7XG4gICAgICAgICAgICB3bUNsYXNzTmFtZU1hcFt3aW4ud21DbGFzc05hbWVdID0gX2dldE1hdGNoaW5nV2luZG93cyh3aW4sIGN1cnJlbnRXaW5kb3dMaXN0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHdpbi53aW5kb3dJZCA9IHdtQ2xhc3NOYW1lTWFwW3dpbi53bUNsYXNzTmFtZV1bMF0ud2luZG93SWQ7XG4gICAgICAgIHdpbi53aW5kb3dJZERlYyA9IHBhcnNlSW50KHdpbi53aW5kb3dJZCwgMTYpO1xuXG4gICAgICAgIC8vIHJlbW92ZSBmaXJzdCBlbnRyeVxuICAgICAgICB3bUNsYXNzTmFtZU1hcFt3aW4ud21DbGFzc05hbWVdLnNoaWZ0KCk7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIF9nZXRNYXRjaGluZ1dpbmRvd0lkKHdpbjogV2luT2JqLCBjdXJyZW50V2luZG93TGlzdDogV2luT2JqW10pOiBzdHJpbmcge1xuICAgIGNvbnN0IGN1cnJlbnRXaW5kb3cgPSBjdXJyZW50V2luZG93TGlzdC5maW5kKCh3aW5Gcm9tQ3VycmVudCkgPT4gd2luLndtQ2xhc3NOYW1lID09PSB3aW5Gcm9tQ3VycmVudC53bUNsYXNzTmFtZSk7XG4gICAgcmV0dXJuIGN1cnJlbnRXaW5kb3cgJiYgY3VycmVudFdpbmRvdy53aW5kb3dJZDtcbn1cblxuZnVuY3Rpb24gX2dldE1hdGNoaW5nV2luZG93cyh3aW46IFdpbk9iaiwgY3VycmVudFdpbmRvd0xpc3Q6IFdpbk9ialtdKTogV2luT2JqW10ge1xuICAgIHJldHVybiBjdXJyZW50V2luZG93TGlzdC5maWx0ZXIoKHdpbkZyb21DdXJyZW50KSA9PiB3aW4ud21DbGFzc05hbWUgPT09IHdpbkZyb21DdXJyZW50LndtQ2xhc3NOYW1lKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gX3Jlc3RvcmVXaW5kb3dQb3NpdGlvbnMoc2F2ZWRXaW5kb3dMaXN0OiBXaW5PYmpbXSk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHByb21pc2VzID0gW107XG4gICAgc2F2ZWRXaW5kb3dMaXN0LmZvckVhY2goKHdpbikgPT4ge1xuICAgICAgICBwcm9taXNlcy5wdXNoKHJlc3RvcmVXaW5kb3dQb3NpdGlvbih3aW4pKTtcbiAgICAgICAgcHJvbWlzZXMucHVzaChtb3ZlVG9Xb3Jrc3BhY2Uod2luLndpbmRvd0lkLCB3aW4ud21DdXJyZW50RGVza3RvcE5yKSk7XG4gICAgfSk7XG5cblxuICAgIGZvciAoY29uc3QgcHJvbWlzZSBvZiBwcm9taXNlcykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgYXdhaXQgcHJvbWlzZTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgX2NhdGNoR2VuZXJpY0VycihlKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdLCJuYW1lcyI6WyJmcy5ta2RpclN5bmMiLCJmcy5yZWFkRmlsZVN5bmMiLCJmcy53cml0ZUZpbGVTeW5jIiwiZnMuZXhpc3RzU3luYyIsImZzLnVubGlua1N5bmMiLCJfY2F0Y2hHZW5lcmljRXJyIiwiZnMudW5saW5rIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztTQUdnQixTQUFTLENBQUMsT0FBTztJQUM3QixJQUFJO1FBQ0FBLFdBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUN6QjtJQUFDLE9BQU8sR0FBRyxFQUFF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
