'use strict';

var fs = require('fs');
var child_process = require('child_process');

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
        fs.mkdirSync(dirPath);
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
    var fromFile = JSON.parse(fs.readFileSync(CFG_FILE_PATH, 'utf8'));
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
    fs.writeFileSync(CFG_FILE_PATH, JSON.stringify(cfg, null, 2), 'utf8');
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
        child_process.spawn(cmd, args, {
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
        if (fs.existsSync(configFilePath)) {
            fs.unlinkSync(configFilePath);
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
        fs.unlink(CFG.SESSION_DATA_DIR + '/' + sessionName + '.json', function (error) {
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

module.exports = index;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlsaXR5LnRzIiwiLi4vc3JjL2RlZmF1bHRDb25maWcudHMiLCIuLi9zcmMvbG9nLnRzIiwiLi4vc3JjL2NvbmZpZy50cyIsIi4uL3NyYy9pc0RlYnVnLnRzIiwiLi4vc3JjL3BhcnNlQ21kVG9TcGF3bi50cyIsIi4uL3NyYy94MTFXcmFwcGVyLnRzIiwiLi4vc3JjL290aGVyQ21kLnRzIiwiLi4vc3JjL21ldGFXcmFwcGVyLnRzIiwiLi4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGZzIGZyb20gJ2ZzJztcblxuXG5leHBvcnQgZnVuY3Rpb24gbWtkaXJTeW5jKGRpclBhdGgpIHtcbiAgICB0cnkge1xuICAgICAgICBmcy5ta2RpclN5bmMoZGlyUGF0aCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGlmIChlcnIuY29kZSAhPT0gJ0VFWElTVCcpIHtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1rZmlsZVN5bmMoZmlsZVBhdGgpIHtcbiAgICB0cnkge1xuICAgICAgICBmcy53cml0ZUZpbGVTeW5jKGZpbGVQYXRoLCB7ZmxhZzogJ3d4J30pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBpZiAoZXJyLmNvZGUgIT09ICdFRVhJU1QnKSB7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb3B5U3luYyhzcmMsIGRlc3QpIHtcbiAgICBpZiAoIWZzLmV4aXN0c1N5bmMoc3JjKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IGRhdGEgPSBmcy5yZWFkRmlsZVN5bmMoc3JjLCAndXRmLTgnKTtcbiAgICBmcy53cml0ZUZpbGVTeW5jKGRlc3QsIGRhdGEpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VEZWVwKC4uLm9iamVjdHMpIHtcbiAgICBjb25zdCBpc09iamVjdCA9IG9iaiA9PiBvYmogJiYgdHlwZW9mIG9iaiA9PT0gJ29iamVjdCc7XG5cbiAgICByZXR1cm4gb2JqZWN0cy5yZWR1Y2UoKHByZXYsIG9iaikgPT4ge1xuICAgICAgICBPYmplY3Qua2V5cyhvYmopLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHBWYWwgPSBwcmV2W2tleV07XG4gICAgICAgICAgICBjb25zdCBvVmFsID0gb2JqW2tleV07XG5cbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHBWYWwpICYmIEFycmF5LmlzQXJyYXkob1ZhbCkpIHtcbiAgICAgICAgICAgICAgICBwcmV2W2tleV0gPSBwVmFsLmNvbmNhdCguLi5vVmFsKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNPYmplY3QocFZhbCkgJiYgaXNPYmplY3Qob1ZhbCkpIHtcbiAgICAgICAgICAgICAgICBwcmV2W2tleV0gPSBtZXJnZURlZXAocFZhbCwgb1ZhbCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHByZXZba2V5XSA9IG9WYWw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBwcmV2O1xuICAgIH0sIHt9KTtcbn1cbiIsImV4cG9ydCBjb25zdCBERUZBVUxUX0NGRyA9IHtcbiAgICBcIkdJVkVfWDExX1RJTUVfVElNRU9VVFwiOiA4MCxcbiAgICBcIlBPTExfQUxMX0FQUFNfU1RBUlRFRF9JTlRFUlZBTFwiOiAyMDAwLFxuICAgIFwiUE9MTF9BTExfTUFYX1RJTUVPVVRcIjogMTIwMDAwLFxuICAgIFwiU0FWRV9TRVNTSU9OX0lOX1BSRVRUWV9GT1JNQVRcIjogdHJ1ZSxcbiAgICBcIldNX0NMQVNTX0FORF9FWEVDVVRBQkxFX0ZJTEVfTUFQXCI6IHtcbiAgICAgICAgXCJnbm9tZS10ZXJtaW5hbC1zZXJ2ZXIuR25vbWUtdGVybWluYWxcIjogXCJnbm9tZS10ZXJtaW5hbFwiLFxuICAgICAgICBcImdvb2dsZS1jaHJvbWUuR29vZ2xlLWNocm9tZVwiOiBcImdvb2dsZS1jaHJvbWUuZGVza3RvcFwiLFxuICAgICAgICBcImJyYXZlLWJyb3dzZXIuQnJhdmUtYnJvd3NlclwiOiBcImJyYXZlLWJyb3dzZXIuZGVza3RvcFwiLFxuICAgICAgICBcIk1haWwuVGh1bmRlcmJpcmRcIjogXCJ0aHVuZGVyYmlyZC5kZXNrdG9wXCIsXG4gICAgICAgIFwibmF1dGlsdXMuTmF1dGlsdXNcIjogXCJuYXV0aWx1c1wiLFxuICAgICAgICBcIm9yZy5nbm9tZS5OYXV0aWx1cy5PcmcuZ25vbWUuTmF1dGlsdXNcIjogXCJuYXV0aWx1c1wiLFxuICAgICAgICBcIk5hdmlnYXRvci5GaXJlZm94XCI6IFwiZmlyZWZveC5kZXNrdG9wXCIsXG4gICAgICAgIFwiTmF2aWdhdG9yLlBhbGVcIjogXCJwYWxlbW9vbi5kZXNrdG9wXCIsXG4gICAgICAgIFwic2t5cGUuU2t5cGVcIjogXCJza3lwZWZvcmxpbnV4LmRlc2t0b3BcIixcbiAgICAgICAgXCJzdW4tYXd0LVgxMS1YRnJhbWVQZWVyLmpldGJyYWlucy1pZGVhXCI6IFwiamV0YnJhaW5zLWlkZWEuZGVza3RvcFwiLFxuICAgICAgICBcIlZpcnR1YWxCb3guVmlydHVhbEJveFwiOiBcInZpcnR1YWxib3guZGVza3RvcFwiLFxuICAgICAgICBcIlRlbGVncmFtLlRlbGVncmFtRGVza3RvcFwiOiBcInRlbGVncmFtLWRlc2t0b3BfdGVsZWdyYW1kZXNrdG9wLmRlc2t0b3BcIixcbiAgICAgICAgXCJ0ZWxlZ3JhbS1kZXNrdG9wLlRlbGVncmFtRGVza3RvcFwiOiBcInRlbGVncmFtZGVza3RvcC5kZXNrdG9wXCIsXG4gICAgICAgIFwia2VlcGFzc3hjLmtlZXBhc3N4Y1wiOiBcImtlZXBhc3N4Y19rZWVwYXNzeGMuZGVza3RvcFwiLFxuICAgICAgICBcInNsYWNrLlNsYWNrXCI6IFwiY29tLnNsYWNrLlNsYWNrLmRlc2t0b3BcIixcbiAgICAgICAgXCJzaWduYWwuU2lnbmFsXCI6IFwic2lnbmFsLWRlc2t0b3AuZGVza3RvcFwiLFxuICAgIH0sXG4gICAgXCJXTV9DTEFTU19FWENMVVNJT05TXCI6IFtcbiAgICAgICAgXCJOL0FcIixcbiAgICAgICAgXCJ0aWxkYS5UaWxkYVwiLFxuICAgICAgICBcIlBvcHVwLmRlc2t0b3BcIixcbiAgICAgICAgXCJ1cGRhdGUtbWFuYWdlci5VcGRhdGUtbWFuYWdlclwiLFxuICAgICAgICBcImRlc2t0b3Bfd2luZG93Lk5hdXRpbHVzXCIsXG4gICAgICAgIFwiZWxlY3Ryb24uRWxlY3Ryb25cIixcbiAgICAgICAgXCJndWFrZS5NYWluLnB5XCIsXG4gICAgICAgICdnbm9tZS1zb2Z0d2FyZS5Hbm9tZS1zb2Z0d2FyZSdcbiAgICBdLFxuICAgIFwiV01fTUVUQV9NQVBcIjoge1xuICAgICAgICBcIldNX0NMQVNTKFNUUklORylcIjogXCJ3bUNsYXNzTmFtZVwiLFxuICAgICAgICBcIl9ORVRfV01fU1RBVEUoQVRPTSlcIjogXCJzdGF0ZXNcIixcbiAgICAgICAgXCJfTkVUX1dNX0RFU0tUT1AoQ0FSRElOQUwpXCI6IFwid21DdXJyZW50RGVza3RvcE5yXCIsXG4gICAgICAgIFwiV01fTkFNRShVVEY4X1NUUklORylcIjogXCJ3bVRpdGxlXCIsXG4gICAgICAgIFwiX05FVF9XTV9QSUQoQ0FSRElOQUwpXCI6IFwid21QaWRcIixcbiAgICAgICAgXCJfTkVUX1dNX1dJTkRPV19UWVBFKEFUT00pXCI6IFwid21UeXBlXCIsXG4gICAgICAgIFwiX0JBTUZfREVTS1RPUF9GSUxFKFNUUklORylcIjogXCJleGVjdXRhYmxlRmlsZVwiXG4gICAgfSxcbiAgICBcIldNX01FVEFfTUFQX05VTUJFUl9UWVBFU1wiOiBbXG4gICAgICAgIFwiX05FVF9XTV9QSUQoQ0FSRElOQUwpXCIsXG4gICAgICAgIFwiX05FVF9XTV9ERVNLVE9QKENBUkRJTkFMKVwiXG4gICAgXSxcbiAgICBcIkRFU0tUT1BfRklMRV9MT0NBVElPTlNcIjogW1xuICAgICAgICBcIntob21lfS8ubG9jYWwvc2hhcmUvYXBwbGljYXRpb25zXCIsXG4gICAgICAgIFwie2hvbWV9Ly5nbm9tZS9hcHBzL1wiLFxuICAgICAgICBcIi91c3Ivc2hhcmUvYXBwbGljYXRpb25zXCIsXG4gICAgICAgIFwiL3Vzci9sb2NhbC9zaGFyZS9hcHBsaWNhdGlvbnNcIixcbiAgICAgICAgXCIvdXNyL3NoYXJlL2FwcC1pbnN0YWxsXCIsXG4gICAgICAgIFwie2hvbWV9Ly5jb25maWcvYXV0b3N0YXJ0L1wiLFxuICAgICAgICBcIi92YXIvbGliL3NuYXBkL2Rlc2t0b3AvYXBwbGljYXRpb25zXCIsXG4gICAgICAgIFwiL3Zhci9saWIvZmxhdHBhay9hcHBcIixcbiAgICAgICAgXCIvc25hcC9iaW5cIlxuICAgIF1cbn07XG4iLCJleHBvcnQgY29uc3QgbG9nID0gKC4uLmFyZ3MpID0+IGNvbnNvbGUubG9nKC4uLmFyZ3MpO1xuIiwiaW1wb3J0IHttZXJnZURlZXAsIG1rZGlyU3luY30gZnJvbSAnLi91dGlsaXR5JztcbmltcG9ydCB7REVGQVVMVF9DRkd9IGZyb20gJy4vZGVmYXVsdENvbmZpZyc7XG5pbXBvcnQgKiBhcyBmcyBmcm9tICdmcyc7XG5pbXBvcnQge2xvZ30gZnJvbSAnLi9sb2cnO1xuXG5sZXQgY2ZnO1xuXG5leHBvcnQgY29uc3QgQ0ZHX0RBVEFfRElSID0gX2dldFVzZXJIb21lKCkgKyAnLy5sd3NtJztcbmV4cG9ydCBjb25zdCBDRkdfRklMRV9QQVRIID0gQ0ZHX0RBVEFfRElSICsgJy9jb25maWcuanNvbic7XG5leHBvcnQgY29uc3QgU0VTU0lPTl9EQVRBX0RJUiA9IENGR19EQVRBX0RJUiArICcvc2Vzc2lvbkRhdGEnO1xuXG4vLyBJTklUXG4vLyAtLS0tLS0tLS0tLS1cbnRyeSB7XG4gICAgLy8gaWYgY29uZmlnIGlzIGFscmVhZHkgaW4gcGxhY2VcbiAgICBjb25zdCBmcm9tRmlsZSA9IEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKENGR19GSUxFX1BBVEgsICd1dGY4JykpO1xuICAgIGNmZyA9IG1lcmdlRGVlcChERUZBVUxUX0NGRywgZnJvbUZpbGUpO1xufSBjYXRjaCAoZSkge1xuICAgIGxvZygnbHdzbTogbm8gY29uZmlnIGZpbGUgcHJlc2VudCBvciBpdCBjb250YWlucyBpbnZhbGlkIGpzb24uIENyZWF0aW5nIG5ldyBvbmUuLi4nKTtcblxuICAgIC8vIGlmIHRoZXJlIGlzIG5vIGNvbmZpZyB5ZXQgbG9hZCBkZWZhdWx0IGNmZyBhbmQgY3JlYXRlIGZpbGVzIGFuZCBkaXJzXG4gICAgY2ZnID0gREVGQVVMVF9DRkc7XG5cbiAgICAvLyBzYXZlIGV4ZWN1dGFibGUgcGF0aHMgdG8gY2ZnXG4gICAgY2ZnLkNNRF9KU0ZJTEVfUEFUSCA9IF9fZGlybmFtZSArICcvLi4vY21kLmpzJztcbiAgICBjZmcuSlNGSUxFX0lOREVYX1BBVEggPSBfX2Rpcm5hbWUgKyAnL2luZGV4LmpzJztcblxuICAgIG1rZGlyU3luYyhDRkdfREFUQV9ESVIpO1xuICAgIG1rZGlyU3luYyhTRVNTSU9OX0RBVEFfRElSKTtcblxuICAgIC8vIHdyaXRlIGNvbmZpZyB0byB1c2VyIGRpclxuICAgIGZzLndyaXRlRmlsZVN5bmMoQ0ZHX0ZJTEVfUEFUSCwgSlNPTi5zdHJpbmdpZnkoY2ZnLCBudWxsLCAyKSwgJ3V0ZjgnKTtcbn1cblxuXG4vLyBhbHNvIG1ha2UgZGF0YSBkaXJzIGFjY2Vzc2libGUgdG8gdGhlIG91dHNpZGVcbmNmZy5EQVRBX0RJUiA9IENGR19EQVRBX0RJUjtcbmNmZy5TRVNTSU9OX0RBVEFfRElSID0gU0VTU0lPTl9EQVRBX0RJUjtcblxuZXhwb3J0IGNvbnN0IENGRyA9IGNmZztcblxuXG5mdW5jdGlvbiBfZ2V0VXNlckhvbWUoKSB7XG4gICAgcmV0dXJuIHByb2Nlc3MuZW52Wyhwcm9jZXNzLnBsYXRmb3JtID09PSAnd2luMzInKSA/ICdVU0VSUFJPRklMRScgOiAnSE9NRSddO1xufVxuIiwiZXhwb3J0IGNvbnN0IElTX0RFQlVHID0gcHJvY2Vzcy5hcmd2LmluZGV4T2YoJy0tZGVidWcnKSA+IC0xO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnQgY29uc3QgcGFyc2VDbWRBcmdzID0gKGNtZCkgPT4ge1xuICAgIGxldCBjbWRBbGxTcGxpdCA9IGNtZC5zcGxpdCgvIC8pO1xuICAgIGxldCBtYWluQ29tbWFuZCA9IGNtZEFsbFNwbGl0WzBdO1xuICAgIGxldCBhcmdzID0gW107XG4gICAgY21kQWxsU3BsaXQubWFwKGZ1bmN0aW9uIChzLCBpKSB7XG4gICAgICAgIGlmIChpICE9PSAwKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGNtZEFsbFNwbGl0W2ldO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIFttYWluQ29tbWFuZCwgX21lcmdlUXVvdGVkU3RyaW5nUGFyYW1zKGFyZ3MpXTtcbn07XG5cbmZ1bmN0aW9uIF9tZXJnZVF1b3RlZFN0cmluZ1BhcmFtcyhhcmdzKSB7XG4gICAgY29uc3QgbmV3QXJncyA9IFtdO1xuICAgIGxldCBpc0luUXVvdGF0aW9uID0gZmFsc2U7XG4gICAgbGV0IGN1cnJlbnRRdW90YXRpb25Bcmc7XG5cbiAgICAvLyBUT0RPIG1ha2UgaXQgd29yayB3aXRoIG1vcmUgZGlmZmVyZW50IHF1b3RhdGlvbiB0eXBlc1xuICAgIGFyZ3MuZm9yRWFjaCgoYXJnKSA9PiB7XG4gICAgICAgIC8vIG1hdGNoIHF1b3RhdGlvbiBlbmRcbiAgICAgICAgaWYgKGFyZy5tYXRjaCgvJyQvKSkge1xuICAgICAgICAgICAgY3VycmVudFF1b3RhdGlvbkFyZyArPSAnICcgKyBhcmcuc2xpY2UoMCwgYXJnLmxlbmd0aCAtIDEpO1xuICAgICAgICAgICAgbmV3QXJncy5wdXNoKGN1cnJlbnRRdW90YXRpb25BcmcpO1xuICAgICAgICAgICAgY3VycmVudFF1b3RhdGlvbkFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGlzSW5RdW90YXRpb24gPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICAvLyBtYXRjaCBxdW90YXRpb24gc3RhcnRcbiAgICAgICAgZWxzZSBpZiAoYXJnLm1hdGNoKC9eJy8pKSB7XG4gICAgICAgICAgICBpc0luUXVvdGF0aW9uID0gdHJ1ZTtcbiAgICAgICAgICAgIGN1cnJlbnRRdW90YXRpb25BcmcgPSBhcmcuc3Vic3RyKDEsIGFyZy5sZW5ndGgpO1xuICAgICAgICB9XG4gICAgICAgIC8vIHdoaWxlIGluIHF1b3RhdGlvblxuICAgICAgICBlbHNlIGlmIChpc0luUXVvdGF0aW9uKSB7XG4gICAgICAgICAgICBjdXJyZW50UXVvdGF0aW9uQXJnICs9ICcgJyArIGFyZztcbiAgICAgICAgfSBlbHNlIGlmIChhcmcgIT09ICcnKSB7XG4gICAgICAgICAgICBuZXdBcmdzLnB1c2goYXJnKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIG5ld0FyZ3M7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB7bG9nfSBmcm9tICcuL2xvZyc7XG5pbXBvcnQge0NGR30gZnJvbSAnLi9jb25maWcnO1xuXG5jb25zdCB4MTEgPSByZXF1aXJlKCd4MTEnKTtcblxuZXhwb3J0IGxldCBYO1xubGV0IHJvb3Q7XG5sZXQgZGlzcGxheTtcblxuXG4vLyBleHBvcnQgY29uc3QgZ2V0V2luZG93SW5mbyA9IHdyYXBYMTEoX2dldFdpbmRvd0luZm8pO1xuZXhwb3J0IGNvbnN0IGdldFggPSAoKSA9PiBYO1xuXG5mdW5jdGlvbiBjYXRjaEdlbmVyaWNFcnIoZXJyKSB7XG4gICAgY29uc29sZS5lcnJvcigneDExV3JhcHBlcjogJywgZXJyLCBlcnIuc3RhY2spO1xufVxuXG5sZXQgaXNDbGllbnRJbml0aWFsaXplZCA9IGZhbHNlO1xubGV0IGluaXRQcm9taXNlO1xuXG5leHBvcnQgZnVuY3Rpb24gaW5pdFgxMSgpOiBQcm9taXNlPGFueT4ge1xuICAgIGlmIChpc0NsaWVudEluaXRpYWxpemVkKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICB9XG4gICAgaWYgKGluaXRQcm9taXNlKSB7XG4gICAgICAgIHJldHVybiBpbml0UHJvbWlzZTtcbiAgICB9XG4gICAgaW5pdFByb21pc2UgPSBuZXcgUHJvbWlzZSgoZnVsZmlsbCwgcmVqZWN0KSA9PiB7XG4gICAgICAgIHgxMS5jcmVhdGVDbGllbnQoKGVyciwgZGlzcGxheUluKSA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRpc3BsYXkgPSBkaXNwbGF5SW47XG4gICAgICAgICAgICAgICAgWCA9IGRpc3BsYXkuY2xpZW50O1xuXG4gICAgICAgICAgICAgICAgcm9vdCA9IGRpc3BsYXkuc2NyZWVuWzBdLnJvb3Q7XG4gICAgICAgICAgICAgICAgaXNDbGllbnRJbml0aWFsaXplZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgZnVsZmlsbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KS5vbignZXJyb3InLCAoZXJyKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgIH0pO1xuICAgIH0pLmNhdGNoKGNhdGNoR2VuZXJpY0Vycik7XG4gICAgcmV0dXJuIGluaXRQcm9taXNlO1xufVxuXG4vLyBNRVRIT0RTXG4vLyAtLS0tLS0tXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGlzcGxheXMoKTogYW55W10ge1xuICAgIGlmICghZGlzcGxheSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1gxMSBub3QgaW5pdGlhbGl6ZWQgLyBObyBzY3JlZW4gYXZhaWxhYmxlJyk7XG4gICAgfVxuICAgIHJldHVybiBkaXNwbGF5LnNjcmVlbjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFdpbmRvd0dlb21ldHJ5KHdpbklkKSB7XG4gICAgY29uc3QgZ2VvOiBhbnkgPSB7fTtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgoZnVsZmlsbCwgcmVqZWN0KSA9PiB7XG4gICAgICAgIFguVHJhbnNsYXRlQ29vcmRpbmF0ZXMod2luSWQsIHJvb3QsIDAsIDAsIChlcnIsIHJlcykgPT4ge1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBnZW8ueCA9IHJlcy5kZXN0WDtcbiAgICAgICAgICAgICAgICBnZW8ueSA9IHJlcy5kZXN0WTtcblxuICAgICAgICAgICAgICAgIFguR2V0R2VvbWV0cnkod2luSWQsIChlcnIsIHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdlby53aWR0aCA9IHJlcy53aWR0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdlby5oZWlnaHQgPSByZXMuaGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICAgICAgZnVsZmlsbChnZW8pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pLmNhdGNoKGNhdGNoR2VuZXJpY0Vycik7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRBY3RpdmVXaW5kb3dJZHMoKTogUHJvbWlzZTxzdHJpbmdbXT4ge1xuICAgIGNvbnN0IFBST1BfTkFNRSA9ICdfTkVUX0NMSUVOVF9MSVNUJztcbiAgICBjb25zdCBwcm9wSWQgPSBhd2FpdCBfZ2V0UHJvcGVydHlJZEJ5TmFtZShyb290LCBQUk9QX05BTUUpO1xuICAgIGNvbnN0IGlkU3RyID0gYXdhaXQgZ2V0UHJvcChyb290LCBwcm9wSWQgYXMgbnVtYmVyKTtcbiAgICByZXR1cm4gX3BhcnNlV2luZG93SWRzKGlkU3RyKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlc3RvcmVXaW5kb3dQb3NpdGlvbih3aW4pIHtcbiAgICBsb2coJ1Jlc3RvcmluZyB3aW5kb3cgcG9zaXRpb24gZm9yIFwiJyArIHdpbi53bUNsYXNzTmFtZSArICdcIicpO1xuICAgIGNvbnN0IFNUQVRFU19UT19SRVNFVCA9IFtcbiAgICAgICAgJ19ORVRfV01fU1RBVEVfTUFYSU1JWkVEX1ZFUlQnLFxuICAgICAgICAnX05FVF9XTV9TVEFURV9NQVhJTUlaRURfSE9SWidcbiAgICBdO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgoZnVsZmlsbCwgcmVqZWN0KSA9PiB7XG4gICAgICAgIHNldFN0YXRlKHdpbi53aW5kb3dJZCwgJ3JlbW92ZScsIFNUQVRFU19UT19SRVNFVClcbiAgICAgICAgICAgIC5jYXRjaChyZWplY3QpXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgWC5Nb3ZlUmVzaXplV2luZG93KHdpbi53aW5kb3dJZCwgd2luLngsIHdpbi55LCB3aW4ud2lkdGgsIHdpbi5oZWlnaHQpO1xuICAgICAgICAgICAgICAgIHNldFN0YXRlKHdpbi53aW5kb3dJZCwgJ2FkZCcsIHdpbi5zdGF0ZXMpXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaChyZWplY3QpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bGZpbGwoKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKHJlamVjdCk7XG4gICAgfSkuY2F0Y2goY2F0Y2hHZW5lcmljRXJyKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsb3NlV2luZG93KHdpbklkKSB7XG4gICAgcmV0dXJuIF9zZW5kWDExQ2xpZW50TWVzc2FnZSh3aW5JZCwgJ19ORVRfQ0xPU0VfV0lORE9XJyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtb3ZlVG9Xb3Jrc3BhY2Uod2luSWQsIHdvcmtTcGFjZU5yKSB7XG4gICAgLy8gTk9URTogaWYgaXQgZG9lc24ndCB3b3JrIHdlIG1pZ2h0IGFsc28gd2FudCB0byB1c2UgX1dJTl9XT1JLU1BBQ0VcbiAgICByZXR1cm4gX3NlbmRYMTFDbGllbnRNZXNzYWdlKHdpbklkLCAnX05FVF9XTV9ERVNLVE9QJywgW3tcbiAgICAgICAgdmFsdWU6IHdvcmtTcGFjZU5yLFxuICAgIH1dKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdvVG9WaWV3cG9ydCh4LCB5KSB7XG4gICAgcmV0dXJuIF9zZW5kWDExQ2xpZW50TWVzc2FnZShyb290LCAnX05FVF9ERVNLVE9QX1ZJRVdQT1JUJywgW1xuICAgICAgICAgICAge3ZhbHVlOiB4fSxcbiAgICAgICAgICAgIHt2YWx1ZTogeX0sXG4gICAgICAgIF1cbiAgICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0U3RhdGUod2lkLCBhY3Rpb25TdHIsIHN0YXRlc1RvSGFuZGxlKSB7XG4gICAgY29uc3QgQUNUSU9OU19NQVAgPSB7XG4gICAgICAgIHJlbW92ZTogMCxcbiAgICAgICAgYWRkOiAxLFxuICAgICAgICB0b2dnbGU6IDIsXG4gICAgfTtcbiAgICBjb25zdCBhY3Rpb24gPSBBQ1RJT05TX01BUFthY3Rpb25TdHJdO1xuICAgIGxldCBwcm9wZXJ0aWVzOiBhbnlbXSA9IFtcbiAgICAgICAge3ZhbHVlOiBhY3Rpb259LFxuICAgIF07XG5cbiAgICAvLyBhbGwgcHJvcGVydGllcyBuZWVkIHRvIGJlIGxvb2tlZCB1cCBmb3IgdGhlaXIgYXRvbSBpZFxuICAgIGlmIChBcnJheS5pc0FycmF5KHN0YXRlc1RvSGFuZGxlKSAmJiBzdGF0ZXNUb0hhbmRsZS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHN0YXRlc1RvSGFuZGxlLmZvckVhY2goKHN0YXRlUHJvcGVydHkpID0+IHtcbiAgICAgICAgICAgIHByb3BlcnRpZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgaXNBdG9tOiB0cnVlLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBzdGF0ZVByb3BlcnR5LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gX3NlbmRYMTFDbGllbnRNZXNzYWdlKHdpZCwgJ19ORVRfV01fU1RBVEUnLCBwcm9wZXJ0aWVzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgfVxufVxuXG5jb25zdCBQUk9QU19UT19HRVQgPSBbXG4gICAgJ1dNX0NMQVNTJyxcbiAgICAnX05FVF9XTV9TVEFURScsXG4gICAgJ19ORVRfV01fREVTS1RPUCcsXG4gICAgJ1dNX05BTUUnLFxuICAgICdfTkVUX1dNX1BJRCcsXG4gICAgJ19ORVRfV01fV0lORE9XX1RZUEUnLFxuICAgICdfQkFNRl9ERVNLVE9QX0ZJTEUnLFxuXTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFdpbmRvd0luZm8od2lkKTogUHJvbWlzZTxhbnk+IHtcbiAgICAvLyBYLkdldEdlb21ldHJ5KHdpZCwgZnVuY3Rpb24gKGVyciwgY2xpZW50R2VvbSkge1xuICAgIC8vICAgY29uc29sZS5sb2coXCJ3aW5kb3cgZ2VvbWV0cnk6IFwiLCBjbGllbnRHZW9tKTtcbiAgICAvLyB9KTtcblxuICAgIGNvbnN0IHByb3BzOiBhbnlbXSA9IGF3YWl0IF94Q2JUb1Byb21pc2UoWC5MaXN0UHJvcGVydGllcywgd2lkKTtcblxuICAgIGNvbnN0IHByb21pc2VzID0gcHJvcHMubWFwKGFzeW5jIGZ1bmN0aW9uIChwKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHByb3BOYW1lID0gYXdhaXQgX3hDYlRvUHJvbWlzZShYLkdldEF0b21OYW1lLCBwKTtcbiAgICAgICAgICAgICAgICBpZiAoUFJPUFNfVE9fR0VULmluY2x1ZGVzKHByb3BOYW1lKSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm9wVmFsID0gYXdhaXQgX3hDYlRvUHJvbWlzZShYLkdldFByb3BlcnR5LCAwLCB3aWQsIHAsIDAsIDAsIDEwMDAwMDAwKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdHlwZU5hbWUgPSBhd2FpdCBfeENiVG9Qcm9taXNlKFguR2V0QXRvbU5hbWUsIHByb3BWYWwudHlwZSk7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHByb3BWYWwsIHR5cGVOYW1lLCBwcm9wTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRlY29kZWREYXRhID0gYXdhaXQgX2RlY29kZVByb3BlcnR5KHR5cGVOYW1lLCBwcm9wVmFsLmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHByb3BOYW1lICsgJygnICsgdHlwZU5hbWUgKyAnKSA9ICcgKyBkZWNvZGVkRGF0YSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgnJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIHJlamVjdChlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4ocmVzdWx0cyA9PiB7XG4gICAgICAgIHJldHVybiByZXN1bHRzLmpvaW4oJ1xcbicpO1xuICAgIH0pO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0UHJvcChpZCA9IHJvb3QsIHByb3BJZDogbnVtYmVyKTogUHJvbWlzZTxhbnk+IHtcbiAgICBjb25zdCBwcm9wVmFsID0gYXdhaXQgX3hDYlRvUHJvbWlzZShYLkdldFByb3BlcnR5LCAwLCBpZCwgcHJvcElkLCAwLCAwLCAxMDAwMDAwMCk7XG4gICAgY29uc3QgdHlwZU5hbWUgPSBhd2FpdCBfeENiVG9Qcm9taXNlKFguR2V0QXRvbU5hbWUsIHByb3BWYWwudHlwZSk7XG4gICAgcmV0dXJuIGF3YWl0IF9kZWNvZGVQcm9wZXJ0eSh0eXBlTmFtZSwgcHJvcFZhbC5kYXRhKTtcbn1cblxuLy8gSEVMUEVSXG4vLyAtLS0tLS1cbmZ1bmN0aW9uIF94Q2JUb1Byb21pc2UoZm4sIC4uLmFyZ3MpOiBhbnkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgoZnVsZmlsbCwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGZuLmFwcGx5KFgsIFsuLi5hcmdzLCAoZXJyLCByZXMpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBlcnIgPyByZWplY3QoZXJyKSA6IGZ1bGZpbGwocmVzKTtcbiAgICAgICAgfV0pO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBfY291bnRlcihpbml0aWFsVmFsLCBtb2RpZmllcikge1xuICAgIC8vIHRvIHN0YXJ0IGF0IHZhbCB3ZSBuZWVkIHRvIHN1YnRyYWN0IHRoZSBtb2RpZmllciBmaXJzdFxuICAgIGxldCB2YWwgPSBpbml0aWFsVmFsIC0gbW9kaWZpZXI7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgdmFsICs9IG1vZGlmaWVyO1xuICAgICAgICByZXR1cm4gdmFsO1xuICAgIH07XG59XG5cbmZ1bmN0aW9uIF9nZXRBdG9tcyhsaXN0LCBjYikge1xuICAgIGNvbnN0IHJlcyA9IHt9O1xuICAgIGNvbnN0IGdldEF0b20gPSAoKSA9PiB7XG4gICAgICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIGNiKG51bGwsIHJlcyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBuYW1lID0gbGlzdC5zaGlmdCgpO1xuICAgICAgICAgICAgWC5JbnRlcm5BdG9tKGZhbHNlLCBuYW1lLCAoZXJyLCBhdG9tKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2IoZXJyKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXNbbmFtZV0gPSBhdG9tO1xuICAgICAgICAgICAgICAgICAgICBnZXRBdG9tKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGdldEF0b20oKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gX2dldFByb3BlcnR5SWRCeU5hbWUod2lkOiBzdHJpbmcsIG5hbWVUb0dldDogc3RyaW5nKTogUHJvbWlzZTxudW1iZXI+IHtcbiAgICBjb25zdCBwcm9wczogYW55W10gPSBhd2FpdCBfeENiVG9Qcm9taXNlKFguTGlzdFByb3BlcnRpZXMsIHdpZCk7XG4gICAgY29uc3QgcHJvbWlzZXMgPSBwcm9wcy5tYXAoYXN5bmMgZnVuY3Rpb24gKHApIHtcbiAgICAgICAgY29uc3QgcHJvcE5hbWUgPSBhd2FpdCBfeENiVG9Qcm9taXNlKFguR2V0QXRvbU5hbWUsIHApO1xuICAgICAgICBpZiAobmFtZVRvR2V0ID09PSBwcm9wTmFtZSkge1xuICAgICAgICAgICAgcmV0dXJuIHA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IHJlcyA9IGF3YWl0IFByb21pc2UuYWxsKHByb21pc2VzKTtcbiAgICByZXR1cm4gcmVzLmZpbmQoaXRlbSA9PiBpdGVtID4gMCk7XG59XG5cblxuZnVuY3Rpb24gX3NlbmRYMTFDbGllbnRNZXNzYWdlKHdpZCwgZXZlbnROYW1lLCBldmVudFByb3BlcnRpZXMgPSBbXSwgb3B0aW9uYWxFdmVudE1hc2s/KSB7XG4gICAgaWYgKGV2ZW50UHJvcGVydGllcy5sZW5ndGggPiA0KSB7XG4gICAgICAgIHRocm93ICdvbmx5IHN1cHBvcnRzIDQgcHJvcGVydGllcyBhdCBvbmNlIG1heCc7XG4gICAgfVxuXG4gICAgY29uc3Qgb2Zmc2V0Q291bnRlciA9IF9jb3VudGVyKDQsIDQpO1xuICAgIGNvbnN0IGV2ZW50TWFzayA9IG9wdGlvbmFsRXZlbnRNYXNrIHx8IHgxMS5ldmVudE1hc2suU3Vic3RydWN0dXJlUmVkaXJlY3Q7XG5cbiAgICAvLyBjcmVhdGUgYXRvbXMgdG8gbG9vayB1cFxuICAgIGxldCBhdG9tc0xpc3QgPSBbXTtcbiAgICBhdG9tc0xpc3QucHVzaChldmVudE5hbWUpO1xuICAgIGV2ZW50UHJvcGVydGllcy5mb3JFYWNoKChldmVudFByb3BlcnR5KSA9PiB7XG4gICAgICAgIGlmIChldmVudFByb3BlcnR5LmlzQXRvbSkge1xuICAgICAgICAgICAgYXRvbXNMaXN0LnB1c2goZXZlbnRQcm9wZXJ0eS52YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIHN0YXJ0IGJ1ZmZlciBpbnB1dFxuICAgIGNvbnN0IGRhdGEgPSBuZXcgQnVmZmVyKDMyKTtcbiAgICBkYXRhLmZpbGwoMCk7XG4gICAgZGF0YS53cml0ZUludDgoMzMsIDApOyAvLyAzMyA9IENsaWVudE1lc3NhZ2VcbiAgICBkYXRhLndyaXRlSW50OCgzMiwgMSk7IC8vIGZvcm1hdFxuICAgIGRhdGEud3JpdGVVSW50MzJMRSh3aWQsIG9mZnNldENvdW50ZXIoKSk7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKGZ1bGZpbGwsIHJlamVjdCkgPT4ge1xuICAgICAgICBfZ2V0QXRvbXMoYXRvbXNMaXN0LCAoZXJyLCBhdG9tcykgPT4ge1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZGF0YS53cml0ZVVJbnQzMkxFKGF0b21zW2V2ZW50TmFtZV0sIG9mZnNldENvdW50ZXIoKSk7XG5cbiAgICAgICAgICAgICAgICBldmVudFByb3BlcnRpZXMuZm9yRWFjaCgoZXZlbnRQcm9wZXJ0eSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnRQcm9wZXJ0eS5pc0F0b20pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEud3JpdGVVSW50MzJMRShhdG9tc1tldmVudFByb3BlcnR5LnZhbHVlXSwgb2Zmc2V0Q291bnRlcigpKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEud3JpdGVVSW50MzJMRShldmVudFByb3BlcnR5LnZhbHVlLCBvZmZzZXRDb3VudGVyKCkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBsZXQgc291cmNlSW5kaWNhdGlvbiA9IDE7XG4gICAgICAgICAgICAgICAgZGF0YS53cml0ZVVJbnQzMkxFKHNvdXJjZUluZGljYXRpb24sIG9mZnNldENvdW50ZXIoKSk7XG5cbiAgICAgICAgICAgICAgICBYLlNlbmRFdmVudChyb290LCAwLCBldmVudE1hc2ssIGRhdGEpO1xuXG4gICAgICAgICAgICAgICAgLy8gd2UgbmVlZCBhIGxpdHRsZSB0aW1lIGZvciB0aGUgYnVmZmVyIHRvIGJlIHByb2Nlc3NlZFxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVsZmlsbCwgQ0ZHLkdJVkVfWDExX1RJTUVfVElNRU9VVCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pLmNhdGNoKGNhdGNoR2VuZXJpY0Vycik7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIF9kZWNvZGVQcm9wZXJ0eSh0eXBlLCBkYXRhKTogUHJvbWlzZTxhbnk+IHtcbiAgICB0cnkge1xuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ1NUUklORyc6IHtcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBbXTtcbiAgICAgICAgICAgICAgICBsZXQgcyA9ICcnO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YVtpXSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHMgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHMgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShkYXRhW2ldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2gocyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5tYXAocXVvdGl6ZSkuam9pbignLCAnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgJ0FUT00nOlxuICAgICAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA+IDMyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnTE9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT05HJztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb25zdCBwcm9taXNlcyA9IFtdO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkgKz0gNCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhID0gZGF0YS51bnBhY2soJ0wnLCBpKVswXTtcbiAgICAgICAgICAgICAgICAgICAgcHJvbWlzZXMucHVzaChfeENiVG9Qcm9taXNlKFguR2V0QXRvbU5hbWUsIGEpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGF3YWl0IFByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXMuam9pbignLCAnKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgY2FzZSAnQ0FSRElOQUwnOlxuICAgICAgICAgICAgY2FzZSAnSU5URUdFUic6IHtcbiAgICAgICAgICAgICAgICBjb25zdCByZXMgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpICs9IDQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzLnB1c2goZGF0YS51bnBhY2soJ0wnLCBpKVswXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiByZXMuam9pbignLCAnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgJ1dJTkRPVyc6XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzID0gW107XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSArPSA0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJlcy5wdXNoKGRhdGEudW5wYWNrKCdMJywgaSlbMF0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gJ3dpbmRvdyBpZCMgJyArIHJlcy5tYXAoKG4pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICcweCcgKyBuLnRvU3RyaW5nKDE2KTtcbiAgICAgICAgICAgICAgICB9KS5qb2luKCcsICcpO1xuXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiAnV1RGICcgKyB0eXBlO1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmxvZyh0eXBlLCBkYXRhKTtcbiAgICAgICAgY29uc29sZS5lcnJvcihlKTtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGUpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gcXVvdGl6ZShpKSB7XG4gICAgcmV0dXJuICdcXFwiJyArIGkgKyAnXFxcIic7XG59XG5cbmZ1bmN0aW9uIF9wYXJzZVdpbmRvd0lkcyhzdHJJbik6IHN0cmluZ1tdIHtcbiAgICBjb25zdCBzdHIgPSBzdHJJbi5yZXBsYWNlKCd3aW5kb3cgaWQjICcsICcnKTtcbiAgICByZXR1cm4gc3RyLnNwbGl0KCcsICcpO1xufVxuXG4vL2NvbnN0IHRlc3RGbiA9IHdyYXBYMTEoY2xvc2VXaW5kb3cpO1xuLy90ZXN0Rm4oJzB4MDRhMDAwMDEnKS50aGVuKChnZW8pID0+IHtcbi8vfSk7XG5cbi8vY29uc3QgdGVzdEZuID0gd3JhcFgxMShtb3ZlVG9Xb3Jrc3BhY2UpO1xuLy90ZXN0Rm4oJzB4MDRlMDAwMDEgJywgMik7XG5cbi8vY29uc3QgdGVzdEZuWCA9IHdyYXBYMTEocmVzdG9yZVdpbmRvd1Bvc2l0aW9uKTtcbi8vdGVzdEZuWCh7XG4vLyAgd2luZG93SWQ6ICcweDA0YTAwMDAxJyxcbi8vICB4OiAwLFxuLy8gIHk6IDAsXG4vLyAgd2lkdGg6IDUwMCxcbi8vICBoZWlnaHQ6IDUwMCxcbi8vICBzdGF0ZXM6IFtcbi8vICAgICdfTkVUX1dNX1NUQVRFX01BWElNSVpFRF9WRVJUJ1xuLy8gIF1cbi8vfSk7XG5cbi8vY29uc3QgdGVzdEZuMiA9IHdyYXBYMTEoc2V0U3RhdGUpO1xuLy90ZXN0Rm4yKCcweDA0YTAwMDAxJywgJ3JlbW92ZScsIFsnX05FVF9XTV9TVEFURV9NQVhJTUlaRURfVkVSVCcsICdfTkVUX1dNX1NUQVRFX01BWElNSVpFRF9IT1JaJywgJ19ORVRfV01fU1RBVEVfRlVMTFNDUkVFTiddKVxuLy8gIC50aGVuKChyZXMpID0+IHtcbi8vICAgIGNvbnNvbGUubG9nKCdOT1JNQUwnLCByZXMpO1xuLy8gIH0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQge0lTX0RFQlVHfSBmcm9tICcuL2lzRGVidWcnO1xuaW1wb3J0IHtDRkd9IGZyb20gJy4vY29uZmlnJztcbmltcG9ydCB7c3Bhd259IGZyb20gJ2NoaWxkX3Byb2Nlc3MnO1xuaW1wb3J0IHtwYXJzZUNtZEFyZ3N9IGZyb20gJy4vcGFyc2VDbWRUb1NwYXduJztcbmltcG9ydCB7V2luT2JqLCBXaW5PYmpJZE9ubHl9IGZyb20gJy4vbW9kZWwnO1xuaW1wb3J0IHtsb2d9IGZyb20gJy4vbG9nJztcbmltcG9ydCB7Z2V0QWN0aXZlV2luZG93SWRzLCBnZXREaXNwbGF5cywgZ2V0V2luZG93SW5mb30gZnJvbSAnLi94MTFXcmFwcGVyJztcblxuLy8gNTAwa2JcbmNvbnN0IE1BWF9CVUZGRVIgPSAxMDI0ICogNTAwO1xuY29uc3QgRVhFQ19PUFRTID0ge1xuICAgIG1heEJ1ZmZlcjogTUFYX0JVRkZFUixcbn07XG5cblxuLy8gZGlzcGxheVxuLy8gLS0tLS0tLVxuZXhwb3J0IGZ1bmN0aW9uIGdldENvbm5lY3RlZERpc3BsYXlzSWQoKTogc3RyaW5nIHtcbiAgICBjb25zdCBkaXNwbGF5cyA9IGdldERpc3BsYXlzKCk7XG4gICAgcmV0dXJuIGRpc3BsYXlzLm1hcChzY3JlZW4gPT4gc2NyZWVuLnBpeGVsX3dpZHRoICsgJ3gnICsgc2NyZWVuLnBpeGVsX2hlaWdodCkuam9pbignOycpO1xufVxuXG5cbi8vIE90aGVyXG4vLyAtLS0tLS0tLVxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEFkZGl0aW9uYWxNZXRhRGF0YUZvcldpbih3aW46IFdpbk9iaklkT25seSk6IFByb21pc2U8V2luT2JqPiB7XG4gICAgY29uc3Qgc3Rkb3V0ID0gYXdhaXQgZ2V0V2luZG93SW5mbyh3aW4ud2luZG93SWQpO1xuICAgIGNvbnN0IGxpbmVzID0gc3Rkb3V0LnNwbGl0KCdcXG4nKTtcbiAgICBjb25zdCB3aW5Db3B5OiBhbnkgPSB7Li4ud2lufTtcblxuICAgIGxpbmVzLmZvckVhY2goKGxpbmUpID0+IHtcbiAgICAgICAgY29uc3Qgd29yZHMgPSBsaW5lLnNwbGl0KCcgJyk7XG4gICAgICAgIGNvbnN0IHByb3BlcnR5TmFtZSA9IHdvcmRzWzBdO1xuXG4gICAgICAgIC8vIHJlbW92ZSBwcm9wZXJ0eSBuYW1lIGFuZCBcIj1cIlxuICAgICAgICB3b3Jkcy5zcGxpY2UoMCwgMik7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gd29yZHMuam9pbignICcpO1xuICAgICAgICBjb25zdCBwcm9wZXJ0eU5hbWVGcm9tTWFwID0gQ0ZHLldNX01FVEFfTUFQW3Byb3BlcnR5TmFtZV07XG4gICAgICAgIC8vIHBhcnNlIHdtQ2xhc3NOYW1lXG4gICAgICAgIGlmIChwcm9wZXJ0eU5hbWUgPT09ICdXTV9DTEFTUyhTVFJJTkcpJykge1xuICAgICAgICAgICAgY29uc3QgcHJvcGVydHlOYW1lRnJvbU1hcCA9IENGRy5XTV9NRVRBX01BUFtwcm9wZXJ0eU5hbWVdO1xuICAgICAgICAgICAgY29uc3QgY2xhc3NOYW1lcyA9IHZhbHVlLnNwbGl0KCcsICcpO1xuICAgICAgICAgICAgbGV0IGNsYXNzTmFtZSA9ICcnO1xuICAgICAgICAgICAgY2xhc3NOYW1lcy5mb3JFYWNoKChzdGF0ZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChzdGF0ZSAhPT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lICs9IHN0YXRlLnJlcGxhY2UoL1wiL2csICcnKSArICcuJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHdpbkNvcHlbcHJvcGVydHlOYW1lRnJvbU1hcF0gPSBjbGFzc05hbWUuc3Vic3RyKDAsIGNsYXNzTmFtZS5sZW5ndGggLSAyKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBwYXJzZSBzdGF0ZXNcbiAgICAgICAgZWxzZSBpZiAocHJvcGVydHlOYW1lID09PSAnX05FVF9XTV9TVEFURShBVE9NKScpIHtcbiAgICAgICAgICAgIGNvbnN0IHN0YXRlcyA9IHZhbHVlLnNwbGl0KCcsICcpO1xuICAgICAgICAgICAgd2luQ29weS5zdGF0ZXMgPSBbXTtcbiAgICAgICAgICAgIHN0YXRlcy5mb3JFYWNoKChzdGF0ZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChzdGF0ZSAhPT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgd2luQ29weS5zdGF0ZXMucHVzaChzdGF0ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gcGFyc2Ugc2ltcGxlIHN0cmluZ3MgYW5kIGludGVnZXJzXG4gICAgICAgIGVsc2UgaWYgKHByb3BlcnR5TmFtZUZyb21NYXApIHtcbiAgICAgICAgICAgIC8vIHNwZWNpYWwgaGFuZGxlIG51bWJlciB0eXBlc1xuICAgICAgICAgICAgaWYgKENGRy5XTV9NRVRBX01BUF9OVU1CRVJfVFlQRVMuaW5kZXhPZihwcm9wZXJ0eU5hbWUpID4gLTEpIHtcbiAgICAgICAgICAgICAgICB3aW5Db3B5W3Byb3BlcnR5TmFtZUZyb21NYXBdID0gcGFyc2VJbnQodmFsdWUsIDEwKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgd2luQ29weVtwcm9wZXJ0eU5hbWVGcm9tTWFwXSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG4gICAgLy8gY29uc29sZS5sb2cod2luQ29weSk7XG4gICAgcmV0dXJuIHdpbkNvcHk7XG59XG5cbi8vIFRPRE8gcHJldHRpZnkgYXJncyBzdHJ1Y3R1cmVcbmV4cG9ydCBmdW5jdGlvbiBzdGFydFByb2dyYW0oZXhlY3V0YWJsZUZpbGU6IHN0cmluZywgZGVza3RvcEZpbGVQYXRoOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBJU19ERUJVRyAmJiBjb25zb2xlLmxvZygnREVCVUc6IHN0YXJ0UHJvZ3JhbSgpOicsIGV4ZWN1dGFibGVGaWxlLCBkZXNrdG9wRmlsZVBhdGgpO1xuXG4gICAgbGV0IGNtZDtcbiAgICBsZXQgYXJncyA9IFtdO1xuICAgIGlmIChkZXNrdG9wRmlsZVBhdGgpIHtcbiAgICAgICAgY21kID0gYGF3a2A7XG4gICAgICAgIGFyZ3MucHVzaCgnL15FeGVjPS8ge3N1YihcIl5FeGVjPVwiLCBcIlwiKTsgZ3N1YihcIiA/JVtjRGRGZmlrbU5uVXV2XVwiLCBcIlwiKTsgZXhpdCBzeXN0ZW0oJDApfScpO1xuICAgICAgICBhcmdzLnB1c2goZGVza3RvcEZpbGVQYXRoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBwYXJzZWRDbWQgPSBwYXJzZUNtZEFyZ3MoZXhlY3V0YWJsZUZpbGUpO1xuICAgICAgICBjbWQgPSBwYXJzZWRDbWRbMF07XG4gICAgICAgIGFyZ3MgPSBwYXJzZWRDbWRbMV07XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChmdWxmaWxsKSA9PiB7XG4gICAgICAgIHNwYXduKGNtZCwgYXJncywge1xuICAgICAgICAgICAgc3RkaW86ICdpZ25vcmUnLFxuICAgICAgICAgICAgZGV0YWNoZWQ6IHRydWUsXG4gICAgICAgIH0pLnVucmVmKCk7XG5cbiAgICAgICAgLy8gY3VycmVudGx5IHdlIGhhdmUgbm8gZXJyb3IgaGFuZGxpbmcgYXMgdGhlIHByb2Nlc3MgaXMgc3RhcnRlZCBkZXRhY2hlZFxuICAgICAgICBmdWxmaWxsKCk7XG4gICAgfSk7XG59XG5cbi8vIEdFVCBBQ1RJVkUgV0lORE9XIExJU1Rcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRBY3RpdmVXaW5kb3dMaXN0KCk6IFByb21pc2U8V2luT2JqW10+IHtcbiAgICBjb25zdCB3aW5kb3dJZHMgPSBhd2FpdCBnZXRBY3RpdmVXaW5kb3dJZHMoKTtcbiAgICBjb25zdCB3aW5kb3dMaXN0OiBXaW5PYmpJZE9ubHlbXSA9IFtdO1xuICAgIHdpbmRvd0lkcy5mb3JFYWNoKCh3aW5kb3dJZCkgPT4ge1xuICAgICAgICB3aW5kb3dMaXN0LnB1c2goe1xuICAgICAgICAgICAgd2luZG93SWQ6IHdpbmRvd0lkLFxuICAgICAgICAgICAgd2luZG93SWREZWM6IHBhcnNlSW50KHdpbmRvd0lkLCAxNiksXG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgLy8gYWRkIG1ldGEgZGF0YSByaWdodCBhd2F5XG4gICAgY29uc3QgcHJvbWlzZXMgPSB3aW5kb3dMaXN0Lm1hcCgod2luKSA9PiBnZXRBZGRpdGlvbmFsTWV0YURhdGFGb3JXaW4od2luKSk7XG5cbiAgICBjb25zdCB3aW5kb3dzV2l0aERhdGE6IFdpbk9ialtdID0gYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZXMpIGFzIFdpbk9ialtdO1xuXG4gICAgSVNfREVCVUcgJiYgY29uc29sZS5sb2coJ0RFQlVHOiBnZXRBY3RpdmVXaW5kb3dMaXN0KCk6Jywgd2luZG93TGlzdCk7XG4gICAgcmV0dXJuIHdpbmRvd3NXaXRoRGF0YS5maWx0ZXIoX2ZpbHRlckludmFsaWRXaW5kb3dzKTtcbn1cblxuZnVuY3Rpb24gX2ZpbHRlckludmFsaWRXaW5kb3dzKHdpbjogV2luT2JqKTogYm9vbGVhbiB7XG4gICAgLy8gZmlsdGVyIG5vbmUgbm9ybWFsIHdpbmRvd3MsIGV4Y2x1ZGVkIGNsYXNzIG5hbWVzIGFuZCBpbmNvbXBsZXRlIHdpbmRvd3NcbiAgICBjb25zdCBpc05vcm1hbFdpbmRvdyA9ICghd2luLndtVHlwZSB8fCB3aW4ud21UeXBlID09PSAnX05FVF9XTV9XSU5ET1dfVFlQRV9OT1JNQUwnKTtcblxuICAgIGNvbnN0IGlzTm90RXhjbHVkZWQgPSAhKF9pc0V4Y2x1ZGVkV21DbGFzc05hbWUod2luLndtQ2xhc3NOYW1lKSk7XG4gICAgY29uc3QgaGFzV21DbGFzc05hbWUgPSAhISh3aW4ud21DbGFzc05hbWUpO1xuXG4gICAgLy8gd2FybiBpZiBubyB3bUNsYXNzTmFtZSBldmVuIHRob3VnaCB0aGVyZSBzaG91bGQgYmVcbiAgICBpZiAoaXNOb3JtYWxXaW5kb3cgJiYgaXNOb3RFeGNsdWRlZCAmJiAhaGFzV21DbGFzc05hbWUpIHtcbiAgICAgICAgY29uc29sZS53YXJuKHdpbi53aW5kb3dJZCArICcgaGFzIG5vIHdtQ2xhc3NOYW1lLiBXaW46ICcsIHdpbik7XG4gICAgfVxuXG4gICAgcmV0dXJuIChpc05vcm1hbFdpbmRvdyAmJiBpc05vdEV4Y2x1ZGVkICYmIGhhc1dtQ2xhc3NOYW1lKTtcbn1cblxuXG5mdW5jdGlvbiBfaXNFeGNsdWRlZFdtQ2xhc3NOYW1lKHdtQ2xhc3NOYW1lKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIENGRy5XTV9DTEFTU19FWENMVVNJT05TLmluZGV4T2Yod21DbGFzc05hbWUpID4gLTE7XG59XG5cbmZ1bmN0aW9uIF9jYXRjaEdlbmVyaWNFcnIoZXJyKTogdm9pZCB7XG4gICAgY29uc29sZS5lcnJvcignb3RoZXJDbWQ6IEdlbmVyaWMgRXJyb3InLCBlcnIsIGVyci5zdGFjayk7XG4gICAgbG9nKCdvdGhlckNtZDonLCBhcmd1bWVudHMpO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuaW1wb3J0IHtnZXRXaW5kb3dHZW9tZXRyeSwgZ29Ub1ZpZXdwb3J0fSBmcm9tICcuL3gxMVdyYXBwZXInO1xuaW1wb3J0IHtnZXRBY3RpdmVXaW5kb3dMaXN0fSBmcm9tICcuL290aGVyQ21kJztcbmltcG9ydCB7Q0ZHfSBmcm9tICcuL2NvbmZpZyc7XG5pbXBvcnQge1dpbk9ian0gZnJvbSAnLi9tb2RlbCc7XG5cbmNvbnN0IGZpbmR1cCA9IHJlcXVpcmUoJ2ZpbmR1cC1zeW5jJyk7XG5cblxuY29uc3QgSE9NRV9ESVIgPSBwcm9jZXNzLmVudlsnSE9NRSddO1xuY29uc3QgREVGQVVMVF9ERVNLVE9QX0ZJTEVfTE9DQVRJT05TID0gW1xuICAgICd7aG9tZX0vLmxvY2FsL3NoYXJlL2FwcGxpY2F0aW9ucycsXG4gICAgJ3tob21lfS8uZ25vbWUvYXBwcy8nLFxuICAgICcvdXNyL3NoYXJlL2FwcGxpY2F0aW9ucycsXG4gICAgJy91c3IvbG9jYWwvc2hhcmUvYXBwbGljYXRpb25zJyxcbiAgICAnL3Vzci9zaGFyZS9hcHAtaW5zdGFsbCcsXG5dO1xuXG5cbmZ1bmN0aW9uIF9jYXRjaEdlbmVyaWNFcnIoZXJyKSB7XG4gICAgY29uc29sZS5lcnJvcignR2VuZXJpYyBFcnJvciBpbiBNZXRhIFdyYXBwZXInLCBlcnIsIGVyci5zdGFjayk7XG4gICAgdGhyb3cgZXJyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ29Ub0ZpcnN0V29ya3NwYWNlKCkge1xuICAgIHJldHVybiBnb1RvVmlld3BvcnQoMCwgMCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmaW5kRGVza3RvcEZpbGUoZmlsZU5hbWUpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKGZ1bGZpbGwsIHJlamVjdCkgPT4ge1xuICAgICAgICBjb25zdCBkZXNrdG9wRmlsZUxvY2F0aW9ucyA9IENGRy5ERVNLVE9QX0ZJTEVfTE9DQVRJT05TIHx8IERFRkFVTFRfREVTS1RPUF9GSUxFX0xPQ0FUSU9OUztcbiAgICAgICAgY29uc3QgcGF0dGVybnMgPSBbXTtcblxuICAgICAgICBjb25zdCBwYXJlbnREaXJzID0gZGVza3RvcEZpbGVMb2NhdGlvbnMubWFwKChwYXJlbnREaXIpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBwYXJlbnREaXIucmVwbGFjZSgne2hvbWV9JywgSE9NRV9ESVIpO1xuICAgICAgICB9KTtcblxuXG4gICAgICAgIGxldCBmaXJzdEZpbGU7XG4gICAgICAgIGNvbnN0IG1hdGNoID0gcGFyZW50RGlycy5maW5kKChkaXIpID0+IHtcbiAgICAgICAgICAgIGZpcnN0RmlsZSA9IGZpbmR1cChmaWxlTmFtZSwge2N3ZDogZGlyfSk7XG4gICAgICAgICAgICByZXR1cm4gZmlyc3RGaWxlO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoIWZpcnN0RmlsZSB8fCAhbWF0Y2gpIHtcbiAgICAgICAgICAgIGNvbnN0IGVyciA9ICdmaW5kRGVza3RvcEZpbGUgY2FudCBmaW5kIGZpbGU7IHNlYXJjaGVkIHBhdHRlcm5zJztcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyLCBwYXR0ZXJucyk7XG4gICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZ1bGZpbGwoZmlyc3RGaWxlKTtcbiAgICAgICAgfVxuICAgIH0pLmNhdGNoKF9jYXRjaEdlbmVyaWNFcnIpO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRBY3RpdmVXaW5kb3dMaXN0RmxvdygpOiBQcm9taXNlPFdpbk9ialtdIHwgYW55PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChmdWxmaWxsLCByZWplY3QpID0+IHtcbiAgICAgICAgcmV0dXJuIGdldEFjdGl2ZVdpbmRvd0xpc3QoKVxuICAgICAgICAgICAgLnRoZW4oYXN5bmMgKHdpbmRvd0xpc3Q6IGFueVtdKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJvbWlzZXMgPSB3aW5kb3dMaXN0Lm1hcCgod2luKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBnZXRXaW5kb3dHZW9tZXRyeSh3aW4ud2luZG93SWQpXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoZ2VvOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBwcm9wIGluIGdlbykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ2VvLmhhc093blByb3BlcnR5KHByb3ApKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5bcHJvcF0gPSBnZW9bcHJvcF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPIG9yZ2FuaXplIGFkZGluZyBvZiBhbGwgdGhvc2UgZGlmZmVyZW50IHByb3BlcnRpZXMgYmV0dGVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWRkIG1pc3Npbmcgc3RhdGljIHByb3BlcnRpZXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW4uc2ltcGxlTmFtZSA9IF9wYXJzZVNpbXBsZVdpbmRvd05hbWUod2luLndtQ2xhc3NOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gd2luO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cblxuICAgICAgICAgICAgICAgIC8vIHdlJ3JlIHVzaW5nIGEgd2F0ZXJmYWxsIGJlY2F1c2Ugd2UncmUgZGVhbGluZyB3aXRoIHgxMSByZXF1ZXN0c1xuICAgICAgICAgICAgICAgIGlmIChwcm9taXNlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBwcm9taXNlIG9mIHByb21pc2VzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IHByb21pc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF9hZGRQYXJzZWRFeGVjdXRhYmxlRmlsZXNGcm9tV21DbGFzc05hbWVzKHdpbmRvd0xpc3QpXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbigod2luZG93TGlzdFdpdGhXbUNsYXNzTmFtZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdWxmaWxsKHdpbmRvd0xpc3RXaXRoV21DbGFzc05hbWVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGZ1bGZpbGwoW10pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIH0pLmNhdGNoKF9jYXRjaEdlbmVyaWNFcnIpO1xufVxuXG4vLyBNSVhFRFxuZnVuY3Rpb24gX2FkZFBhcnNlZEV4ZWN1dGFibGVGaWxlc0Zyb21XbUNsYXNzTmFtZXMod2luZG93TGlzdCk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChmdWxmaWxsLCByZWplY3QpID0+IHtcbiAgICAgICAgY29uc3QgcHJvbWlzZXMgPSB3aW5kb3dMaXN0LmZpbHRlcih3aW4gPT4gIXdpbi5leGVjdXRhYmxlRmlsZSlcbiAgICAgICAgICAgIC5tYXAoKHdpbikgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBfcGFyc2VFeGVjdXRhYmxlRmlsZUZyb21XbUNsYXNzTmFtZSh3aW4ud21DbGFzc05hbWUpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKChmaWxlTmFtZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2luLmV4ZWN1dGFibGVGaWxlID0gZmlsZU5hbWU7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHByb21pc2VzLmxlbmd0aCkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBwcm9taXNlIG9mIHByb21pc2VzKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgcHJvbWlzZTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdWxmaWxsKHdpbmRvd0xpc3QpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZnVsZmlsbCh3aW5kb3dMaXN0KTtcbiAgICAgICAgfVxuICAgIH0pLmNhdGNoKF9jYXRjaEdlbmVyaWNFcnIpO1xufVxuXG5mdW5jdGlvbiBfcGFyc2VFeGVjdXRhYmxlRmlsZUZyb21XbUNsYXNzTmFtZSh3bUNsYXNzTmFtZSk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChmdWxmaWxsLCByZWplY3QpID0+IHtcbiAgICAgICAgY29uc3QgZXhlY3V0YWJsZUZpbGVGcm9tTWFwID0gQ0ZHLldNX0NMQVNTX0FORF9FWEVDVVRBQkxFX0ZJTEVfTUFQW3dtQ2xhc3NOYW1lXTtcbiAgICAgICAgaWYgKGV4ZWN1dGFibGVGaWxlRnJvbU1hcCkge1xuICAgICAgICAgICAgZnVsZmlsbChleGVjdXRhYmxlRmlsZUZyb21NYXApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3Qgc3BsaXRWYWx1ZXMgPSB3bUNsYXNzTmFtZS5zcGxpdCgnLicpO1xuICAgICAgICAgICAgY29uc3QgZmlsZU5hbWUgPSBzcGxpdFZhbHVlc1swXTtcbiAgICAgICAgICAgIGlmIChfaXNDaHJvbWVBcHAoZmlsZU5hbWUpKSB7XG4gICAgICAgICAgICAgICAgX3BhcnNlQ2hyb21lQXBwRGVza3RvcEZpbGVOYW1lKGZpbGVOYW1lKVxuICAgICAgICAgICAgICAgICAgICAudGhlbihmdWxmaWxsKVxuICAgICAgICAgICAgICAgICAgICAuY2F0Y2gocmVqZWN0KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZnVsZmlsbChmaWxlTmFtZSArICcuZGVza3RvcCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSkuY2F0Y2goX2NhdGNoR2VuZXJpY0Vycik7XG59XG5cbmZ1bmN0aW9uIF9wYXJzZVNpbXBsZVdpbmRvd05hbWUod21DbGFzc05hbWUpIHtcbiAgICBjb25zdCBzcGxpdFZhbHVlcyA9IHdtQ2xhc3NOYW1lLnNwbGl0KCcuJyk7XG4gICAgaWYgKHNwbGl0VmFsdWVzWzFdKSB7XG4gICAgICAgIHJldHVybiBzcGxpdFZhbHVlc1sxXTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gd21DbGFzc05hbWU7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBfaXNDaHJvbWVBcHAoZmlsZU5hbWUpIHtcbiAgICByZXR1cm4gISFmaWxlTmFtZS5tYXRjaCgvXmNyeF8vKTtcbn1cblxuZnVuY3Rpb24gX3BhcnNlQ2hyb21lQXBwRGVza3RvcEZpbGVOYW1lKGZpbGVOYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgLy8gd2Ugd2FuJ3QgdG8gc2VhcmNoIGZyb20gZGVza3RvcCBmaWxlcyBvbmx5XG4gICAgICAgIGNvbnN0IGxvY2F0ZVN0ciA9IGZpbGVOYW1lLnJlcGxhY2UoJ2NyeF8nLCAnKicpICsgJyouZGVza3RvcCc7XG4gICAgICAgIGZpbmREZXNrdG9wRmlsZShsb2NhdGVTdHIpXG4gICAgICAgICAgICAudGhlbihyZXNvbHZlKVxuICAgICAgICAgICAgLmNhdGNoKHJlamVjdCk7XG4gICAgfSkuY2F0Y2goX2NhdGNoR2VuZXJpY0Vycik7XG59XG4iLCIndXNlIHN0cmljdCc7XG5pbXBvcnQge0NGRywgU0VTU0lPTl9EQVRBX0RJUn0gZnJvbSAnLi9jb25maWcnO1xuaW1wb3J0ICogYXMgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IHtnZXRDb25uZWN0ZWREaXNwbGF5c0lkLCBzdGFydFByb2dyYW19IGZyb20gJy4vb3RoZXJDbWQnO1xuaW1wb3J0IHtjbG9zZVdpbmRvdywgZ2V0WCwgaW5pdFgxMSwgbW92ZVRvV29ya3NwYWNlLCByZXN0b3JlV2luZG93UG9zaXRpb259IGZyb20gJy4veDExV3JhcHBlcic7XG5pbXBvcnQge2ZpbmREZXNrdG9wRmlsZSwgZ2V0QWN0aXZlV2luZG93TGlzdEZsb3csIGdvVG9GaXJzdFdvcmtzcGFjZX0gZnJvbSAnLi9tZXRhV3JhcHBlcic7XG5pbXBvcnQge2xvZ30gZnJvbSAnLi9sb2cnO1xuaW1wb3J0IHtXaW5PYmp9IGZyb20gJy4vbW9kZWwnO1xuLy8gaW1wb3J0ICogYXMgU3RvcmUgZnJvbSAnamZzJztcbmNvbnN0IFN0b3JlID0gcmVxdWlyZSgnamZzJyk7XG5cblxuLy8gY3JlYXRlIGRhdGEgc3RvcmVcbmNvbnN0IGRiID0gbmV3IFN0b3JlKFNFU1NJT05fREFUQV9ESVIsIHtwcmV0dHk6IENGRy5TQVZFX1NFU1NJT05fSU5fUFJFVFRZX0ZPUk1BVH0pO1xuXG5cbi8vIHNldHVwIG1ldGEgd3JhcHBlclxuXG4vLyBFWFBPUlRcbi8vIC0tLS0tLVxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGxpc3RTZXNzaW9ucyxcbiAgICByZW5hbWVTZXNzaW9uLFxuICAgIHNhdmVTZXNzaW9uLFxuICAgIHJlbW92ZVNlc3Npb24sXG4gICAgcmVzdG9yZVNlc3Npb24sXG4gICAgZ2V0U2Vzc2lvbnMsXG4gICAgZ2V0WDogZ2V0WCxcblxuXG4gICAgZ2V0Q29ubmVjdGVkRGlzcGxheXNJZCxcbiAgICByZXNldENmZzogKCkgPT4ge1xuICAgICAgICBjb25zdCBjb25maWdGaWxlUGF0aCA9IENGRy5EQVRBX0RJUiArICcvY29uZmlnLmpzb24nO1xuICAgICAgICBpZiAoZnMuZXhpc3RzU3luYyhjb25maWdGaWxlUGF0aCkpIHtcbiAgICAgICAgICAgIGZzLnVubGlua1N5bmMoY29uZmlnRmlsZVBhdGgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignTm8gQ29uZmlnIHByZXNlbnQgaW4gJyArIGNvbmZpZ0ZpbGVQYXRoKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgZ2V0Q2ZnOiAoKSA9PiB7XG4gICAgICAgIHJldHVybiBDRkc7XG4gICAgfSxcbiAgICBnZXREYjogKCkgPT4ge1xuICAgICAgICByZXR1cm4gZGI7XG4gICAgfVxufTtcblxuLy8gSEVMUEVSXG4vLyAtLS0tLS0tLVxuZnVuY3Rpb24gX2NhdGNoR2VuZXJpY0VycihlcnIpIHtcbiAgICBjb25zb2xlLmVycm9yKCdHZW5lcmljIEVycm9yIGluIE1haW4gSGFuZGxlcicsIGVyciwgZXJyLnN0YWNrKTtcbiAgICB0aHJvdyBlcnI7XG59XG5cbmZ1bmN0aW9uIGdldFNlc3Npb25zKCkge1xuICAgIHJldHVybiBkYi5hbGxTeW5jKCk7XG59XG5cbi8vIE1BSU4gRlVOQ1RJT05TXG4vLyAtLS0tLS0tLS0tLS0tLVxuZnVuY3Rpb24gbGlzdFNlc3Npb25zKCkge1xuICAgIGxldCBsaXN0ID0gT2JqZWN0LmtleXMoZ2V0U2Vzc2lvbnMoKSk7XG4gICAgbGlzdC5mb3JFYWNoKChuYW1lKSA9PiB7XG4gICAgICAgIGxvZyhuYW1lKTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gcmVuYW1lU2Vzc2lvbihvbGROYW1lOiBzdHJpbmcsIG5ld05hbWU6IHN0cmluZykge1xuICAgIGxldCBvYmogPSBkYi5nZXRTeW5jKG9sZE5hbWUpO1xuICAgIGlmIChvYmoubWVzc2FnZSkge1xuICAgICAgICBpZiAob2JqLm1lc3NhZ2UgPT09ICdjb3VsZCBub3QgbG9hZCBkYXRhJykge1xuICAgICAgICAgICAgbG9nKGBFcnJvcjogQ291bGQgbm90IGZpbmQgYSBzZXNzaW9uIG5hbWVkICcke29sZE5hbWV9J2ApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbG9nKG9iai5tZXNzYWdlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRiLnNhdmVTeW5jKG5ld05hbWUsIG9iaik7XG4gICAgZGIuZGVsZXRlKG9sZE5hbWUpO1xufVxuXG5mdW5jdGlvbiBzYXZlU2Vzc2lvbihzZXNzaW9uTmFtZTogc3RyaW5nLCBpbnB1dEhhbmRsZXJzKTogUHJvbWlzZTxhbnk+IHtcbiAgICBjb25zdCBzZXNzaW9uVG9IYW5kbGUgPSBzZXNzaW9uTmFtZSB8fCAnREVGQVVMVCc7XG5cbiAgICByZXR1cm4gaW5pdFgxMSgpXG4gICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBnZXRBY3RpdmVXaW5kb3dMaXN0RmxvdygpO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbigod2luZG93TGlzdCkgPT4ge1xuICAgICAgICAgICAgLy8gZGVza3RvcCBmaWxlIHBhdGhzIGFuZCBjb25uZWN0ZWQgZGlzcGxheSBpZHNcbiAgICAgICAgICAgIHJldHVybiBfZ3Vlc3NBbmRTZXREZXNrdG9wRmlsZVBhdGhzKHdpbmRvd0xpc3QsIGlucHV0SGFuZGxlcnMuZGVza3RvcEZpbGVQYXRoKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHdpbmRvd0xpc3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNvbm5lY3RlZERpc3BsYXlzSWQgPSBnZXRDb25uZWN0ZWREaXNwbGF5c0lkKCk7XG4gICAgICAgICAgICByZXR1cm4gc2F2ZVNlc3Npb25Gb3JEaXNwbGF5VG9EYihzZXNzaW9uVG9IYW5kbGUsIGNvbm5lY3RlZERpc3BsYXlzSWQsIHdpbmRvd0xpc3QpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignc2F2ZVNlc3Npb24oKTogQW4gZXJyb3Igb2NjdXJyZWQnLCBlcnIpO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9KTtcbn1cblxuZnVuY3Rpb24gc2F2ZVNlc3Npb25Gb3JEaXNwbGF5VG9EYihzZXNzaW9uVG9IYW5kbGU6IHN0cmluZywgY29ubmVjdGVkRGlzcGxheXNJZDogc3RyaW5nLCB3aW5kb3dMaXN0OiBXaW5PYmpbXSk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgoZnVsZmlsbCwgcmVqZWN0KSA9PiB7XG4gICAgICAgIC8vIGNoZWNrIGlmIGVudHJ5IGV4aXN0cyBhbmQgdXBkYXRlXG4gICAgICAgIGRiLmdldChzZXNzaW9uVG9IYW5kbGUsIChlcnIsIHNlc3Npb25EYXRhKSA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgLy8gTk9URTogd2UncmUgbm90IGZhaWxpbmcgYmVjYXVzZSwgdGhlIGNhc2UgaXMgcHJvYmFibHkgdGhhdCB0aGVyZSBpcyBubyBzZXNzaW9uIGZpbGUgeWV0XG4gICAgICAgICAgICAgICAgbG9nKGBzYXZlU2Vzc2lvbkZvckRpc3BsYXlUb0RiOiBubyBzZXNzaW9uIGZpbGUgcHJlc2VudCB5ZXQgZm9yIFwiJHtzZXNzaW9uVG9IYW5kbGV9XCIsIGNyZWF0aW5nIGEgbmV3IG9uZS4uLmApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIXNlc3Npb25EYXRhKSB7XG4gICAgICAgICAgICAgICAgLy8gY3JlYXRlIG5ldyBvYmplY3RcbiAgICAgICAgICAgICAgICBzZXNzaW9uRGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogc2Vzc2lvblRvSGFuZGxlLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXNlc3Npb25EYXRhLmRpc3BsYXlzQ29tYmluYXRpb25zIHx8ICFBcnJheS5pc0FycmF5KHNlc3Npb25EYXRhLmRpc3BsYXlzQ29tYmluYXRpb25zKSkge1xuICAgICAgICAgICAgICAgIC8vIGNyZWF0ZSBuZXcgYXJyYXlcbiAgICAgICAgICAgICAgICBzZXNzaW9uRGF0YS5kaXNwbGF5c0NvbWJpbmF0aW9ucyA9IFtdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBleGlzdGluZ0Rpc3BsYXlFbnRyeSA9IHNlc3Npb25EYXRhLmRpc3BsYXlzQ29tYmluYXRpb25zLmZpbmQoKGVudHJ5KSA9PiBlbnRyeS5pZCA9PT0gY29ubmVjdGVkRGlzcGxheXNJZCk7XG4gICAgICAgICAgICBpZiAoZXhpc3RpbmdEaXNwbGF5RW50cnkpIHtcbiAgICAgICAgICAgICAgICBleGlzdGluZ0Rpc3BsYXlFbnRyeS53aW5kb3dMaXN0ID0gd2luZG93TGlzdDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2Vzc2lvbkRhdGEuZGlzcGxheXNDb21iaW5hdGlvbnMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBjb25uZWN0ZWREaXNwbGF5c0lkLFxuICAgICAgICAgICAgICAgICAgICB3aW5kb3dMaXN0LFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkYi5zYXZlKHNlc3Npb25Ub0hhbmRsZSwgc2Vzc2lvbkRhdGEsIChlcnIpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGxvZygnU0FWRUQgU0VTU0lPTjogJyArIHNlc3Npb25Ub0hhbmRsZSk7XG4gICAgICAgICAgICAgICAgICAgIGZ1bGZpbGwoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIHJlc3RvcmVTZXNzaW9uKHNlc3Npb25OYW1lOiBzdHJpbmcsIGlzQ2xvc2VBbGxPcGVuV2luZG93czogYm9vbGVhbik6IFByb21pc2U8YW55PiB7XG4gICAgY29uc3Qgc2Vzc2lvblRvSGFuZGxlID0gc2Vzc2lvbk5hbWUgfHwgJ0RFRkFVTFQnO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChmdWxmaWxsLCByZWplY3QpID0+IHtcbiAgICAgICAgZGIuZ2V0KHNlc3Npb25Ub0hhbmRsZSB8fCAnREVGQVVMVCcsIChlcnIsIHNlc3Npb25EYXRhKSA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgc2F2ZWRXaW5kb3dMaXN0O1xuXG4gICAgICAgICAgICBpbml0WDExKClcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfY2xvc2VBbGxXaW5kb3dzSWZTZXQoaXNDbG9zZUFsbE9wZW5XaW5kb3dzKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKGdvVG9GaXJzdFdvcmtzcGFjZSlcbiAgICAgICAgICAgICAgICAudGhlbihnZXRDb25uZWN0ZWREaXNwbGF5c0lkKVxuICAgICAgICAgICAgICAgIC50aGVuKChjb25uZWN0ZWREaXNwbGF5c0lkKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghc2Vzc2lvbkRhdGEuZGlzcGxheXNDb21iaW5hdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYG5vIGRpc3BsYXkgY29tYmluYXRpb25zIHNhdmVkIHlldGApO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGlzcGxheUVudHJ5ID0gc2Vzc2lvbkRhdGEuZGlzcGxheXNDb21iaW5hdGlvbnMuZmluZCgoZW50cnkpID0+IGVudHJ5LmlkID09PSBjb25uZWN0ZWREaXNwbGF5c0lkKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoZGlzcGxheUVudHJ5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzYXZlZFdpbmRvd0xpc3QgPSBkaXNwbGF5RW50cnkud2luZG93TGlzdDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYG5vIGRhdGEgZm9yIGN1cnJlbnQgZGlzcGxheSBpZCAnJHtjb25uZWN0ZWREaXNwbGF5c0lkfScgc2F2ZWQgeWV0YCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGdldEFjdGl2ZVdpbmRvd0xpc3RGbG93KCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbigoY3VycmVudFdpbmRvd0xpc3QpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9zdGFydFNlc3Npb25Qcm9ncmFtcyhzYXZlZFdpbmRvd0xpc3QsIGN1cnJlbnRXaW5kb3dMaXN0KTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZ2V0cyBjdXJyZW50IHdpbmRvdyBsaXN0IGJ5IGl0c2VsZiBhbmQgcmV0dXJucyB0aGUgdXBkYXRlZCB2YXJpYW50XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfd2FpdEZvckFsbEFwcHNUb1N0YXJ0KHNhdmVkV2luZG93TGlzdCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbigodXBkYXRlZEN1cnJlbnRXaW5kb3dMaXN0OiBXaW5PYmpbXSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBfdXBkYXRlV2luZG93SWRzKHNhdmVkV2luZG93TGlzdCwgdXBkYXRlZEN1cnJlbnRXaW5kb3dMaXN0KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9yZXN0b3JlV2luZG93UG9zaXRpb25zKHNhdmVkV2luZG93TGlzdCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxvZygnUkVTVE9SRUQgU0VTU0lPTjogJyArIHNlc3Npb25Ub0hhbmRsZSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdBbiBlcnJvciBvY2N1cnJlZCcsIGVycik7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVsZmlsbCk7XG4gICAgICAgIH0pO1xuICAgIH0pLmNhdGNoKF9jYXRjaEdlbmVyaWNFcnIpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTZXNzaW9uKHNlc3Npb25OYW1lOiBzdHJpbmcpOiBQcm9taXNlPHVua25vd24+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKGZ1bGZpbGwsIHJlamVjdCkgPT4ge1xuICAgICAgICBmcy51bmxpbmsoQ0ZHLlNFU1NJT05fREFUQV9ESVIgKyAnLycgKyBzZXNzaW9uTmFtZSArICcuanNvbicsIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZnVsZmlsbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KS5jYXRjaChfY2F0Y2hHZW5lcmljRXJyKTtcbn1cblxuZnVuY3Rpb24gX2Nsb3NlQWxsV2luZG93c0lmU2V0KGlzQ2xvc2VBbGw6IGJvb2xlYW4pOiBQcm9taXNlPHVua25vd24+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKGZ1bGZpbGwsIHJlamVjdCkgPT4ge1xuICAgICAgICBpZiAoaXNDbG9zZUFsbCkge1xuICAgICAgICAgICAgbG9nKCdDbG9zaW5nIG9wZW5lZCBhcHBsaWNhdGlvbnMnKTtcbiAgICAgICAgICAgIGdldEFjdGl2ZVdpbmRvd0xpc3RGbG93KClcbiAgICAgICAgICAgICAgICAudGhlbigoY3VycmVudFdpbmRvd0xpc3Q6IGFueVtdKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRXaW5kb3dMaXN0LmZvckVhY2goKHdpbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VXaW5kb3cod2luLndpbmRvd0lkKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgX3dhaXRGb3JBbGxBcHBzVG9DbG9zZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdWxmaWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmNhdGNoKHJlamVjdCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2gocmVqZWN0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZ1bGZpbGwoKTtcbiAgICAgICAgfVxuICAgIH0pLmNhdGNoKF9jYXRjaEdlbmVyaWNFcnIpO1xufVxuXG5mdW5jdGlvbiBfd2FpdEZvckFsbEFwcHNUb0Nsb3NlKCk6IFByb21pc2U8dW5rbm93bj4ge1xuICAgIGxldCB0b3RhbFRpbWVXYWl0ZWQgPSAwO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgoZnVsZmlsbCwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGZ1bmN0aW9uIHBvbGxBbGxBcHBzQ2xvc2VkKCkge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgZ2V0QWN0aXZlV2luZG93TGlzdEZsb3coKVxuICAgICAgICAgICAgICAgICAgICAudGhlbigoY3VycmVudFdpbmRvd0xpc3Q6IFdpbk9ialtdKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b3RhbFRpbWVXYWl0ZWQgKz0gQ0ZHLlBPTExfQUxMX0FQUFNfU1RBUlRFRF9JTlRFUlZBTDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50V2luZG93TGlzdC5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodG90YWxUaW1lV2FpdGVkID4gQ0ZHLlBPTExfQUxMX01BWF9USU1FT1VUKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1BPTExfQUxMX01BWF9USU1FT1VUIHJlYWNoZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KCdQT0xMX0FMTF9NQVhfVElNRU9VVCByZWFjaGVkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2FsbCByZWN1cnNpdmVseVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb2xsQWxsQXBwc0Nsb3NlZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVsZmlsbChjdXJyZW50V2luZG93TGlzdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaChyZWplY3QpO1xuICAgICAgICAgICAgfSwgQ0ZHLlBPTExfQUxMX0FQUFNfU1RBUlRFRF9JTlRFUlZBTCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBzdGFydCBvbmNlIGluaXRpYWxseVxuICAgICAgICBwb2xsQWxsQXBwc0Nsb3NlZCgpO1xuICAgIH0pLmNhdGNoKF9jYXRjaEdlbmVyaWNFcnIpO1xufVxuXG5mdW5jdGlvbiBfd2FpdEZvckFsbEFwcHNUb1N0YXJ0KHNhdmVkV2luZG93TGlzdCk6IFByb21pc2U8V2luT2JqW10gfCB1bmtub3duPiB7XG4gICAgbG9nKCdXYWl0aW5nIGZvciBhbGwgYXBwbGljYXRpb25zIHRvIHN0YXJ0Li4uJyk7XG5cbiAgICBsZXQgdG90YWxUaW1lV2FpdGVkID0gMDtcbiAgICBsZXQgdGltZW91dDtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgoZnVsZmlsbCwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGZ1bmN0aW9uIHBvbGxBbGxBcHBzU3RhcnRlZChzYXZlZFdpbmRvd0xpc3Q6IFdpbk9ialtdLCB0aW1lb3V0RHVyYXRpb24gPSBDRkcuUE9MTF9BTExfQVBQU19TVEFSVEVEX0lOVEVSVkFMKSB7XG5cbiAgICAgICAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBjbGVhciB0aW1lb3V0IHRvIGJlIHNhdmVcbiAgICAgICAgICAgICAgICBpZiAodGltZW91dCkge1xuICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZ2V0QWN0aXZlV2luZG93TGlzdEZsb3coKVxuICAgICAgICAgICAgICAgICAgICAudGhlbigoY3VycmVudFdpbmRvd0xpc3QpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdGFsVGltZVdhaXRlZCArPSBDRkcuUE9MTF9BTExfQVBQU19TVEFSVEVEX0lOVEVSVkFMO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFfaXNBbGxBcHBzU3RhcnRlZChzYXZlZFdpbmRvd0xpc3QsIGN1cnJlbnRXaW5kb3dMaXN0KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0b3RhbFRpbWVXYWl0ZWQgPiBDRkcuUE9MTF9BTExfTUFYX1RJTUVPVVQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignUE9MTF9BTExfTUFYX1RJTUVPVVQgcmVhY2hlZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdVbmFibGUgdG8gc3RhcnQgdGhlIGZvbGxvd2luZyBhcHBzJywgX2dldE5vdFN0YXJ0ZWRBcHBzKHNhdmVkV2luZG93TGlzdCwgY3VycmVudFdpbmRvd0xpc3QpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KCdQT0xMX0FMTF9NQVhfVElNRU9VVCByZWFjaGVkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2FsbCByZWN1cnNpdmVseVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb2xsQWxsQXBwc1N0YXJ0ZWQoc2F2ZWRXaW5kb3dMaXN0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvZygnQWxsIGFwcGxpY2F0aW9ucyBzdGFydGVkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVsZmlsbChjdXJyZW50V2luZG93TGlzdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaChyZWplY3QpO1xuICAgICAgICAgICAgfSwgdGltZW91dER1cmF0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHN0YXJ0IG9uY2UgaW5pdGlhbGx5XG4gICAgICAgIHBvbGxBbGxBcHBzU3RhcnRlZChzYXZlZFdpbmRvd0xpc3QsIDUwMCk7XG4gICAgfSkuY2F0Y2goX2NhdGNoR2VuZXJpY0Vycik7XG59XG5cbmZ1bmN0aW9uIF9nZXROb3RTdGFydGVkQXBwcyhzYXZlZFdpbmRvd0xpc3Q6IFdpbk9ialtdLCBjdXJyZW50V2luZG93TGlzdDogV2luT2JqW10pOiBXaW5PYmpbXSB7XG4gICAgbGV0IG5vblN0YXJ0ZWRBcHBzID0gW107XG4gICAgc2F2ZWRXaW5kb3dMaXN0LmZvckVhY2goKHdpbikgPT4ge1xuICAgICAgICBpZiAoIV9nZXRNYXRjaGluZ1dpbmRvd0lkKHdpbiwgY3VycmVudFdpbmRvd0xpc3QpKSB7XG4gICAgICAgICAgICBub25TdGFydGVkQXBwcy5wdXNoKHdpbik7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gbm9uU3RhcnRlZEFwcHM7XG59XG5cbmZ1bmN0aW9uIF9pc0FsbEFwcHNTdGFydGVkKHNhdmVkV2luZG93TGlzdDogV2luT2JqW10sIGN1cnJlbnRXaW5kb3dMaXN0OiBXaW5PYmpbXSk6IGJvb2xlYW4ge1xuICAgIGxldCBpc0FsbFN0YXJ0ZWQgPSB0cnVlO1xuICAgIGNvbnN0IGN1cnJlbnRXaW5kb3dMaXN0Q29weSA9IGN1cnJlbnRXaW5kb3dMaXN0LnNsaWNlKDApO1xuICAgIHNhdmVkV2luZG93TGlzdC5mb3JFYWNoKCh3aW4pID0+IHtcbiAgICAgICAgaWYgKCFfZ2V0TWF0Y2hpbmdXaW5kb3dJZCh3aW4sIGN1cnJlbnRXaW5kb3dMaXN0Q29weSkpIHtcbiAgICAgICAgICAgIGlzQWxsU3RhcnRlZCA9IGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgaW5kZXggPSBjdXJyZW50V2luZG93TGlzdENvcHkuZmluZEluZGV4KCh3aW5Gcm9tQ3VycmVudCkgPT4gd2luLndtQ2xhc3NOYW1lID09PSB3aW5Gcm9tQ3VycmVudC53bUNsYXNzTmFtZSk7XG4gICAgICAgICAgICBjdXJyZW50V2luZG93TGlzdENvcHkuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBpc0FsbFN0YXJ0ZWQ7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIF9ndWVzc0FuZFNldERlc2t0b3BGaWxlUGF0aHMod2luZG93TGlzdDogV2luT2JqW10sIGlucHV0SGFuZGxlcik6IFByb21pc2U8V2luT2JqW10+IHtcbiAgICBjb25zdCBwcm9taXNlcyA9IHdpbmRvd0xpc3QubWFwKCh3aW4pID0+IF9ndWVzc0ZpbGVQYXRoKHdpbiwgaW5wdXRIYW5kbGVyKSk7XG5cbiAgICBmb3IgKGNvbnN0IHByb21pc2Ugb2YgcHJvbWlzZXMpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGF3YWl0IHByb21pc2U7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIF9jYXRjaEdlbmVyaWNFcnIoZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHdpbmRvd0xpc3Q7XG59XG5cbmZ1bmN0aW9uIF9ndWVzc0ZpbGVQYXRoKHdpbjogV2luT2JqLCBpbnB1dEhhbmRsZXIpOiBQcm9taXNlPHN0cmluZyB8IHVua25vd24+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKGZ1bGZpbGwsIHJlamVjdCkgPT4ge1xuICAgICAgICBmdW5jdGlvbiBjYWxsSW5wdXRIYW5kbGVyKGVycm9yPywgc3Rkb3V0Pykge1xuICAgICAgICAgICAgaW5wdXRIYW5kbGVyKGVycm9yLCB3aW4sIHN0ZG91dClcbiAgICAgICAgICAgICAgICAudGhlbigoaW5wdXQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKF9pc0Rlc2t0b3BGaWxlKHdpbi5leGVjdXRhYmxlRmlsZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbi5kZXNrdG9wRmlsZVBhdGggPSBpbnB1dDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bGZpbGwod2luLmRlc2t0b3BGaWxlUGF0aCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aW4uZXhlY3V0YWJsZUZpbGUgPSBpbnB1dDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bGZpbGwod2luLmV4ZWN1dGFibGVGaWxlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKHJlamVjdCk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGlmIChfaXNEZXNrdG9wRmlsZSh3aW4uZXhlY3V0YWJsZUZpbGUpKSB7XG4gICAgICAgICAgICBmaW5kRGVza3RvcEZpbGUod2luLmV4ZWN1dGFibGVGaWxlKVxuICAgICAgICAgICAgICAgIC50aGVuKChzdGRvdXQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbElucHV0SGFuZGxlcihudWxsLCBzdGRvdXQpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKGNhbGxJbnB1dEhhbmRsZXIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FsbElucHV0SGFuZGxlcih0cnVlLCB3aW4uZXhlY3V0YWJsZUZpbGUpO1xuICAgICAgICB9XG4gICAgfSkuY2F0Y2goX2NhdGNoR2VuZXJpY0Vycik7XG59XG5cbi8vIFRPRE8gY2hlY2sgZm9yIGhvdyBtYW55IGluc3RhbmNlcyB0aGVyZSBzaG91bGQgYmUgcnVubmluZyBvZiBhIHByb2dyYW1cbmFzeW5jIGZ1bmN0aW9uIF9zdGFydFNlc3Npb25Qcm9ncmFtcyh3aW5kb3dMaXN0OiBXaW5PYmpbXSwgY3VycmVudFdpbmRvd0xpc3Q6IFdpbk9ialtdKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgLy8gc2V0IGluc3RhbmNlcyBzdGFydGVkIHRvIDBcbiAgICB3aW5kb3dMaXN0LmZvckVhY2goKHdpbikgPT4gd2luLmluc3RhbmNlc1N0YXJ0ZWQgPSAwKTtcbiAgICBjb25zdCBwcm9taXNlcyA9IHdpbmRvd0xpc3RcbiAgICAgICAgLmZpbHRlcigod2luKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBudW1iZXJPZkluc3RhbmNlc09mV2luID0gX2dldE51bWJlck9mSW5zdGFuY2VzVG9SdW4od2luLCB3aW5kb3dMaXN0KTtcbiAgICAgICAgICAgIHJldHVybiAoIV9pc1Byb2dyYW1BbHJlYWR5UnVubmluZyh3aW4ud21DbGFzc05hbWUsIGN1cnJlbnRXaW5kb3dMaXN0LCBudW1iZXJPZkluc3RhbmNlc09mV2luLCB3aW4uaW5zdGFuY2VzU3RhcnRlZCkpO1xuICAgICAgICB9KVxuICAgICAgICAubWFwKCh3aW4pID0+IHtcbiAgICAgICAgICAgIHdpbi5pbnN0YW5jZXNTdGFydGVkICs9IDE7XG4gICAgICAgICAgICByZXR1cm4gc3RhcnRQcm9ncmFtKHdpbi5leGVjdXRhYmxlRmlsZSwgd2luLmRlc2t0b3BGaWxlUGF0aCk7XG4gICAgICAgIH0pO1xuXG4gICAgYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xufVxuXG5mdW5jdGlvbiBfZ2V0TnVtYmVyT2ZJbnN0YW5jZXNUb1J1bih3aW5kb3dUb01hdGNoOiBXaW5PYmosIHdpbmRvd0xpc3Q6IFdpbk9ialtdKTogbnVtYmVyIHtcbiAgICByZXR1cm4gd2luZG93TGlzdC5maWx0ZXIoKHdpbikgPT4ge1xuICAgICAgICByZXR1cm4gd2luLndtQ2xhc3NOYW1lID09PSB3aW5kb3dUb01hdGNoLndtQ2xhc3NOYW1lO1xuICAgIH0pLmxlbmd0aDtcbn1cblxuZnVuY3Rpb24gX2lzUHJvZ3JhbUFscmVhZHlSdW5uaW5nKHdtQ2xhc3NOYW1lOiBzdHJpbmcsIGN1cnJlbnRXaW5kb3dMaXN0OiBXaW5PYmpbXSwgbnVtYmVyT2ZJbnN0YW5jZXNUb1J1bjogbnVtYmVyLCBpbnN0YW5jZXNTdGFydGVkOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICBpZiAoIW51bWJlck9mSW5zdGFuY2VzVG9SdW4pIHtcbiAgICAgICAgbnVtYmVyT2ZJbnN0YW5jZXNUb1J1biA9IDE7XG4gICAgfVxuXG4gICAgaWYgKCFpbnN0YW5jZXNTdGFydGVkKSB7XG4gICAgICAgIGluc3RhbmNlc1N0YXJ0ZWQgPSAwO1xuICAgIH1cblxuICAgIGxldCBpbnN0YW5jZXNSdW5uaW5nID0gMDtcbiAgICBjdXJyZW50V2luZG93TGlzdC5mb3JFYWNoKCh3aW4pID0+IHtcbiAgICAgICAgaWYgKHdpbi53bUNsYXNzTmFtZSA9PT0gd21DbGFzc05hbWUpIHtcbiAgICAgICAgICAgIGluc3RhbmNlc1J1bm5pbmcrKztcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGxvZygnU3RhdHVzOiBcIicgKyB3bUNsYXNzTmFtZSArICdcIiBpcyBydW5uaW5nOicsIChpbnN0YW5jZXNSdW5uaW5nICsgaW5zdGFuY2VzU3RhcnRlZCA+PSBudW1iZXJPZkluc3RhbmNlc1RvUnVuKSwgbnVtYmVyT2ZJbnN0YW5jZXNUb1J1biwgaW5zdGFuY2VzU3RhcnRlZCk7XG4gICAgcmV0dXJuIGluc3RhbmNlc1J1bm5pbmcgKyBpbnN0YW5jZXNTdGFydGVkID49IG51bWJlck9mSW5zdGFuY2VzVG9SdW47XG59XG5cbmZ1bmN0aW9uIF9pc0Rlc2t0b3BGaWxlKGV4ZWN1dGFibGVGaWxlOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gZXhlY3V0YWJsZUZpbGUgJiYgISFleGVjdXRhYmxlRmlsZS5tYXRjaCgvZGVza3RvcCQvKTtcbn1cblxuZnVuY3Rpb24gX3VwZGF0ZVdpbmRvd0lkcyhzYXZlZFdpbmRvd0xpc3Q6IFdpbk9ialtdLCBjdXJyZW50V2luZG93TGlzdDogV2luT2JqW10pIHtcbiAgICBjb25zdCB3bUNsYXNzTmFtZU1hcCA9IHt9O1xuICAgIHNhdmVkV2luZG93TGlzdC5mb3JFYWNoKCh3aW4pID0+IHtcbiAgICAgICAgaWYgKCF3bUNsYXNzTmFtZU1hcFt3aW4ud21DbGFzc05hbWVdKSB7XG4gICAgICAgICAgICB3bUNsYXNzTmFtZU1hcFt3aW4ud21DbGFzc05hbWVdID0gX2dldE1hdGNoaW5nV2luZG93cyh3aW4sIGN1cnJlbnRXaW5kb3dMaXN0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHdpbi53aW5kb3dJZCA9IHdtQ2xhc3NOYW1lTWFwW3dpbi53bUNsYXNzTmFtZV1bMF0ud2luZG93SWQ7XG4gICAgICAgIHdpbi53aW5kb3dJZERlYyA9IHBhcnNlSW50KHdpbi53aW5kb3dJZCwgMTYpO1xuXG4gICAgICAgIC8vIHJlbW92ZSBmaXJzdCBlbnRyeVxuICAgICAgICB3bUNsYXNzTmFtZU1hcFt3aW4ud21DbGFzc05hbWVdLnNoaWZ0KCk7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIF9nZXRNYXRjaGluZ1dpbmRvd0lkKHdpbjogV2luT2JqLCBjdXJyZW50V2luZG93TGlzdDogV2luT2JqW10pOiBzdHJpbmcge1xuICAgIGNvbnN0IGN1cnJlbnRXaW5kb3cgPSBjdXJyZW50V2luZG93TGlzdC5maW5kKCh3aW5Gcm9tQ3VycmVudCkgPT4gd2luLndtQ2xhc3NOYW1lID09PSB3aW5Gcm9tQ3VycmVudC53bUNsYXNzTmFtZSk7XG4gICAgcmV0dXJuIGN1cnJlbnRXaW5kb3cgJiYgY3VycmVudFdpbmRvdy53aW5kb3dJZDtcbn1cblxuZnVuY3Rpb24gX2dldE1hdGNoaW5nV2luZG93cyh3aW46IFdpbk9iaiwgY3VycmVudFdpbmRvd0xpc3Q6IFdpbk9ialtdKTogV2luT2JqW10ge1xuICAgIHJldHVybiBjdXJyZW50V2luZG93TGlzdC5maWx0ZXIoKHdpbkZyb21DdXJyZW50KSA9PiB3aW4ud21DbGFzc05hbWUgPT09IHdpbkZyb21DdXJyZW50LndtQ2xhc3NOYW1lKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gX3Jlc3RvcmVXaW5kb3dQb3NpdGlvbnMoc2F2ZWRXaW5kb3dMaXN0OiBXaW5PYmpbXSk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHByb21pc2VzID0gW107XG4gICAgc2F2ZWRXaW5kb3dMaXN0LmZvckVhY2goKHdpbikgPT4ge1xuICAgICAgICBwcm9taXNlcy5wdXNoKHJlc3RvcmVXaW5kb3dQb3NpdGlvbih3aW4pKTtcbiAgICAgICAgcHJvbWlzZXMucHVzaChtb3ZlVG9Xb3Jrc3BhY2Uod2luLndpbmRvd0lkLCB3aW4ud21DdXJyZW50RGVza3RvcE5yKSk7XG4gICAgfSk7XG5cblxuICAgIGZvciAoY29uc3QgcHJvbWlzZSBvZiBwcm9taXNlcykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgYXdhaXQgcHJvbWlzZTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgX2NhdGNoR2VuZXJpY0VycihlKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdLCJuYW1lcyI6WyJmcy5ta2RpclN5bmMiLCJmcy5yZWFkRmlsZVN5bmMiLCJmcy53cml0ZUZpbGVTeW5jIiwic3Bhd24iLCJmcy5leGlzdHNTeW5jIiwiZnMudW5saW5rU3luYyIsIl9jYXRjaEdlbmVyaWNFcnIiLCJmcy51bmxpbmsiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7U0FHZ0IsU0FBUyxDQUFDLE9BQU87SUFDN0IsSUFBSTtRQUNBQSxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDekI7SUFBQyxPQUFPLEdB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
