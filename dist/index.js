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
//# sourceMappingURL=utility.js.map

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
        "Navigator.Firefox": "firefox.desktop",
        "Navigator.Pale": "palemoon.desktop",
        "skype.Skype": "skypeforlinux.desktop",
        "sun-awt-X11-XFramePeer.jetbrains-idea": "jetbrains-idea.desktop",
        "VirtualBox.VirtualBox": "virtualbox.desktop",
        "Telegram.TelegramDesktop": "telegram-desktop_telegramdesktop.desktop",
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
//# sourceMappingURL=defaultConfig.js.map

var log = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return console.log.apply(console, args);
};
//# sourceMappingURL=log.js.map

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
//# sourceMappingURL=isDebug.js.map

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
//# sourceMappingURL=parseCmdToSpawn.js.map

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
//# sourceMappingURL=x11Wrapper.js.map

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
//# sourceMappingURL=otherCmd.js.map

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
//# sourceMappingURL=metaWrapper.js.map

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
//# sourceMappingURL=index.js.map

module.exports = index;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlsaXR5LnRzIiwiLi4vc3JjL2RlZmF1bHRDb25maWcudHMiLCIuLi9zcmMvbG9nLnRzIiwiLi4vc3JjL2NvbmZpZy50cyIsIi4uL3NyYy9pc0RlYnVnLnRzIiwiLi4vc3JjL3BhcnNlQ21kVG9TcGF3bi50cyIsIi4uL3NyYy94MTFXcmFwcGVyLnRzIiwiLi4vc3JjL290aGVyQ21kLnRzIiwiLi4vc3JjL21ldGFXcmFwcGVyLnRzIiwiLi4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGZzIGZyb20gJ2ZzJztcblxuXG5leHBvcnQgZnVuY3Rpb24gbWtkaXJTeW5jKGRpclBhdGgpIHtcbiAgICB0cnkge1xuICAgICAgICBmcy5ta2RpclN5bmMoZGlyUGF0aCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGlmIChlcnIuY29kZSAhPT0gJ0VFWElTVCcpIHtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1rZmlsZVN5bmMoZmlsZVBhdGgpIHtcbiAgICB0cnkge1xuICAgICAgICBmcy53cml0ZUZpbGVTeW5jKGZpbGVQYXRoLCB7ZmxhZzogJ3d4J30pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBpZiAoZXJyLmNvZGUgIT09ICdFRVhJU1QnKSB7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb3B5U3luYyhzcmMsIGRlc3QpIHtcbiAgICBpZiAoIWZzLmV4aXN0c1N5bmMoc3JjKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IGRhdGEgPSBmcy5yZWFkRmlsZVN5bmMoc3JjLCAndXRmLTgnKTtcbiAgICBmcy53cml0ZUZpbGVTeW5jKGRlc3QsIGRhdGEpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VEZWVwKC4uLm9iamVjdHMpIHtcbiAgICBjb25zdCBpc09iamVjdCA9IG9iaiA9PiBvYmogJiYgdHlwZW9mIG9iaiA9PT0gJ29iamVjdCc7XG5cbiAgICByZXR1cm4gb2JqZWN0cy5yZWR1Y2UoKHByZXYsIG9iaikgPT4ge1xuICAgICAgICBPYmplY3Qua2V5cyhvYmopLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHBWYWwgPSBwcmV2W2tleV07XG4gICAgICAgICAgICBjb25zdCBvVmFsID0gb2JqW2tleV07XG5cbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHBWYWwpICYmIEFycmF5LmlzQXJyYXkob1ZhbCkpIHtcbiAgICAgICAgICAgICAgICBwcmV2W2tleV0gPSBwVmFsLmNvbmNhdCguLi5vVmFsKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNPYmplY3QocFZhbCkgJiYgaXNPYmplY3Qob1ZhbCkpIHtcbiAgICAgICAgICAgICAgICBwcmV2W2tleV0gPSBtZXJnZURlZXAocFZhbCwgb1ZhbCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHByZXZba2V5XSA9IG9WYWw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBwcmV2O1xuICAgIH0sIHt9KTtcbn1cbiIsImV4cG9ydCBjb25zdCBERUZBVUxUX0NGRyA9IHtcbiAgICBcIkdJVkVfWDExX1RJTUVfVElNRU9VVFwiOiA4MCxcbiAgICBcIlBPTExfQUxMX0FQUFNfU1RBUlRFRF9JTlRFUlZBTFwiOiAyMDAwLFxuICAgIFwiUE9MTF9BTExfTUFYX1RJTUVPVVRcIjogMTIwMDAwLFxuICAgIFwiU0FWRV9TRVNTSU9OX0lOX1BSRVRUWV9GT1JNQVRcIjogdHJ1ZSxcbiAgICBcIldNX0NMQVNTX0FORF9FWEVDVVRBQkxFX0ZJTEVfTUFQXCI6IHtcbiAgICAgICAgXCJnbm9tZS10ZXJtaW5hbC1zZXJ2ZXIuR25vbWUtdGVybWluYWxcIjogXCJnbm9tZS10ZXJtaW5hbFwiLFxuICAgICAgICBcImdvb2dsZS1jaHJvbWUuR29vZ2xlLWNocm9tZVwiOiBcImdvb2dsZS1jaHJvbWUuZGVza3RvcFwiLFxuICAgICAgICBcImJyYXZlLWJyb3dzZXIuQnJhdmUtYnJvd3NlclwiOiBcImJyYXZlLWJyb3dzZXIuZGVza3RvcFwiLFxuICAgICAgICBcIk1haWwuVGh1bmRlcmJpcmRcIjogXCJ0aHVuZGVyYmlyZC5kZXNrdG9wXCIsXG4gICAgICAgIFwibmF1dGlsdXMuTmF1dGlsdXNcIjogXCJuYXV0aWx1c1wiLFxuICAgICAgICBcIk5hdmlnYXRvci5GaXJlZm94XCI6IFwiZmlyZWZveC5kZXNrdG9wXCIsXG4gICAgICAgIFwiTmF2aWdhdG9yLlBhbGVcIjogXCJwYWxlbW9vbi5kZXNrdG9wXCIsXG4gICAgICAgIFwic2t5cGUuU2t5cGVcIjogXCJza3lwZWZvcmxpbnV4LmRlc2t0b3BcIixcbiAgICAgICAgXCJzdW4tYXd0LVgxMS1YRnJhbWVQZWVyLmpldGJyYWlucy1pZGVhXCI6IFwiamV0YnJhaW5zLWlkZWEuZGVza3RvcFwiLFxuICAgICAgICBcIlZpcnR1YWxCb3guVmlydHVhbEJveFwiOiBcInZpcnR1YWxib3guZGVza3RvcFwiLFxuICAgICAgICBcIlRlbGVncmFtLlRlbGVncmFtRGVza3RvcFwiOiBcInRlbGVncmFtLWRlc2t0b3BfdGVsZWdyYW1kZXNrdG9wLmRlc2t0b3BcIixcbiAgICAgICAgXCJrZWVwYXNzeGMua2VlcGFzc3hjXCI6IFwia2VlcGFzc3hjX2tlZXBhc3N4Yy5kZXNrdG9wXCIsXG4gICAgICAgIFwic2xhY2suU2xhY2tcIjogXCJjb20uc2xhY2suU2xhY2suZGVza3RvcFwiLFxuICAgICAgICBcInNpZ25hbC5TaWduYWxcIjogXCJzaWduYWwtZGVza3RvcC5kZXNrdG9wXCIsXG4gICAgfSxcbiAgICBcIldNX0NMQVNTX0VYQ0xVU0lPTlNcIjogW1xuICAgICAgICBcIk4vQVwiLFxuICAgICAgICBcInRpbGRhLlRpbGRhXCIsXG4gICAgICAgIFwiUG9wdXAuZGVza3RvcFwiLFxuICAgICAgICBcInVwZGF0ZS1tYW5hZ2VyLlVwZGF0ZS1tYW5hZ2VyXCIsXG4gICAgICAgIFwiZGVza3RvcF93aW5kb3cuTmF1dGlsdXNcIixcbiAgICAgICAgXCJlbGVjdHJvbi5FbGVjdHJvblwiLFxuICAgICAgICBcImd1YWtlLk1haW4ucHlcIixcbiAgICAgICAgJ2dub21lLXNvZnR3YXJlLkdub21lLXNvZnR3YXJlJ1xuICAgIF0sXG4gICAgXCJXTV9NRVRBX01BUFwiOiB7XG4gICAgICAgIFwiV01fQ0xBU1MoU1RSSU5HKVwiOiBcIndtQ2xhc3NOYW1lXCIsXG4gICAgICAgIFwiX05FVF9XTV9TVEFURShBVE9NKVwiOiBcInN0YXRlc1wiLFxuICAgICAgICBcIl9ORVRfV01fREVTS1RPUChDQVJESU5BTClcIjogXCJ3bUN1cnJlbnREZXNrdG9wTnJcIixcbiAgICAgICAgXCJXTV9OQU1FKFVURjhfU1RSSU5HKVwiOiBcIndtVGl0bGVcIixcbiAgICAgICAgXCJfTkVUX1dNX1BJRChDQVJESU5BTClcIjogXCJ3bVBpZFwiLFxuICAgICAgICBcIl9ORVRfV01fV0lORE9XX1RZUEUoQVRPTSlcIjogXCJ3bVR5cGVcIixcbiAgICAgICAgXCJfQkFNRl9ERVNLVE9QX0ZJTEUoU1RSSU5HKVwiOiBcImV4ZWN1dGFibGVGaWxlXCJcbiAgICB9LFxuICAgIFwiV01fTUVUQV9NQVBfTlVNQkVSX1RZUEVTXCI6IFtcbiAgICAgICAgXCJfTkVUX1dNX1BJRChDQVJESU5BTClcIixcbiAgICAgICAgXCJfTkVUX1dNX0RFU0tUT1AoQ0FSRElOQUwpXCJcbiAgICBdLFxuICAgIFwiREVTS1RPUF9GSUxFX0xPQ0FUSU9OU1wiOiBbXG4gICAgICAgIFwie2hvbWV9Ly5sb2NhbC9zaGFyZS9hcHBsaWNhdGlvbnNcIixcbiAgICAgICAgXCJ7aG9tZX0vLmdub21lL2FwcHMvXCIsXG4gICAgICAgIFwiL3Vzci9zaGFyZS9hcHBsaWNhdGlvbnNcIixcbiAgICAgICAgXCIvdXNyL2xvY2FsL3NoYXJlL2FwcGxpY2F0aW9uc1wiLFxuICAgICAgICBcIi91c3Ivc2hhcmUvYXBwLWluc3RhbGxcIixcbiAgICAgICAgXCJ7aG9tZX0vLmNvbmZpZy9hdXRvc3RhcnQvXCIsXG4gICAgICAgIFwiL3Zhci9saWIvc25hcGQvZGVza3RvcC9hcHBsaWNhdGlvbnNcIixcbiAgICAgICAgXCIvdmFyL2xpYi9mbGF0cGFrL2FwcFwiLFxuICAgICAgICBcIi9zbmFwL2JpblwiXG4gICAgXVxufTtcbiIsImV4cG9ydCBjb25zdCBsb2cgPSAoLi4uYXJncykgPT4gY29uc29sZS5sb2coLi4uYXJncyk7XG4iLCJpbXBvcnQge21lcmdlRGVlcCwgbWtkaXJTeW5jfSBmcm9tICcuL3V0aWxpdHknO1xuaW1wb3J0IHtERUZBVUxUX0NGR30gZnJvbSAnLi9kZWZhdWx0Q29uZmlnJztcbmltcG9ydCAqIGFzIGZzIGZyb20gJ2ZzJztcbmltcG9ydCB7bG9nfSBmcm9tICcuL2xvZyc7XG5cbmxldCBjZmc7XG5cbmV4cG9ydCBjb25zdCBDRkdfREFUQV9ESVIgPSBfZ2V0VXNlckhvbWUoKSArICcvLmx3c20nO1xuZXhwb3J0IGNvbnN0IENGR19GSUxFX1BBVEggPSBDRkdfREFUQV9ESVIgKyAnL2NvbmZpZy5qc29uJztcbmV4cG9ydCBjb25zdCBTRVNTSU9OX0RBVEFfRElSID0gQ0ZHX0RBVEFfRElSICsgJy9zZXNzaW9uRGF0YSc7XG5cbi8vIElOSVRcbi8vIC0tLS0tLS0tLS0tLVxudHJ5IHtcbiAgICAvLyBpZiBjb25maWcgaXMgYWxyZWFkeSBpbiBwbGFjZVxuICAgIGNvbnN0IGZyb21GaWxlID0gSlNPTi5wYXJzZShmcy5yZWFkRmlsZVN5bmMoQ0ZHX0ZJTEVfUEFUSCwgJ3V0ZjgnKSk7XG4gICAgY2ZnID0gbWVyZ2VEZWVwKERFRkFVTFRfQ0ZHLCBmcm9tRmlsZSk7XG59IGNhdGNoIChlKSB7XG4gICAgbG9nKCdsd3NtOiBubyBjb25maWcgZmlsZSBwcmVzZW50IG9yIGl0IGNvbnRhaW5zIGludmFsaWQganNvbi4gQ3JlYXRpbmcgbmV3IG9uZS4uLicpO1xuXG4gICAgLy8gaWYgdGhlcmUgaXMgbm8gY29uZmlnIHlldCBsb2FkIGRlZmF1bHQgY2ZnIGFuZCBjcmVhdGUgZmlsZXMgYW5kIGRpcnNcbiAgICBjZmcgPSBERUZBVUxUX0NGRztcblxuICAgIC8vIHNhdmUgZXhlY3V0YWJsZSBwYXRocyB0byBjZmdcbiAgICBjZmcuQ01EX0pTRklMRV9QQVRIID0gX19kaXJuYW1lICsgJy8uLi9jbWQuanMnO1xuICAgIGNmZy5KU0ZJTEVfSU5ERVhfUEFUSCA9IF9fZGlybmFtZSArICcvaW5kZXguanMnO1xuXG4gICAgbWtkaXJTeW5jKENGR19EQVRBX0RJUik7XG4gICAgbWtkaXJTeW5jKFNFU1NJT05fREFUQV9ESVIpO1xuXG4gICAgLy8gd3JpdGUgY29uZmlnIHRvIHVzZXIgZGlyXG4gICAgZnMud3JpdGVGaWxlU3luYyhDRkdfRklMRV9QQVRILCBKU09OLnN0cmluZ2lmeShjZmcsIG51bGwsIDIpLCAndXRmOCcpO1xufVxuXG5cbi8vIGFsc28gbWFrZSBkYXRhIGRpcnMgYWNjZXNzaWJsZSB0byB0aGUgb3V0c2lkZVxuY2ZnLkRBVEFfRElSID0gQ0ZHX0RBVEFfRElSO1xuY2ZnLlNFU1NJT05fREFUQV9ESVIgPSBTRVNTSU9OX0RBVEFfRElSO1xuXG5leHBvcnQgY29uc3QgQ0ZHID0gY2ZnO1xuXG5cbmZ1bmN0aW9uIF9nZXRVc2VySG9tZSgpIHtcbiAgICByZXR1cm4gcHJvY2Vzcy5lbnZbKHByb2Nlc3MucGxhdGZvcm0gPT09ICd3aW4zMicpID8gJ1VTRVJQUk9GSUxFJyA6ICdIT01FJ107XG59XG4iLCJleHBvcnQgY29uc3QgSVNfREVCVUcgPSBwcm9jZXNzLmFyZ3YuaW5kZXhPZignLS1kZWJ1ZycpID4gLTE7XG4iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydCBjb25zdCBwYXJzZUNtZEFyZ3MgPSAoY21kKSA9PiB7XG4gICAgbGV0IGNtZEFsbFNwbGl0ID0gY21kLnNwbGl0KC8gLyk7XG4gICAgbGV0IG1haW5Db21tYW5kID0gY21kQWxsU3BsaXRbMF07XG4gICAgbGV0IGFyZ3MgPSBbXTtcbiAgICBjbWRBbGxTcGxpdC5tYXAoZnVuY3Rpb24gKHMsIGkpIHtcbiAgICAgICAgaWYgKGkgIT09IDApIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gY21kQWxsU3BsaXRbaV07XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gW21haW5Db21tYW5kLCBfbWVyZ2VRdW90ZWRTdHJpbmdQYXJhbXMoYXJncyldO1xufTtcblxuZnVuY3Rpb24gX21lcmdlUXVvdGVkU3RyaW5nUGFyYW1zKGFyZ3MpIHtcbiAgICBjb25zdCBuZXdBcmdzID0gW107XG4gICAgbGV0IGlzSW5RdW90YXRpb24gPSBmYWxzZTtcbiAgICBsZXQgY3VycmVudFF1b3RhdGlvbkFyZztcblxuICAgIC8vIFRPRE8gbWFrZSBpdCB3b3JrIHdpdGggbW9yZSBkaWZmZXJlbnQgcXVvdGF0aW9uIHR5cGVzXG4gICAgYXJncy5mb3JFYWNoKChhcmcpID0+IHtcbiAgICAgICAgLy8gbWF0Y2ggcXVvdGF0aW9uIGVuZFxuICAgICAgICBpZiAoYXJnLm1hdGNoKC8nJC8pKSB7XG4gICAgICAgICAgICBjdXJyZW50UXVvdGF0aW9uQXJnICs9ICcgJyArIGFyZy5zbGljZSgwLCBhcmcubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICBuZXdBcmdzLnB1c2goY3VycmVudFF1b3RhdGlvbkFyZyk7XG4gICAgICAgICAgICBjdXJyZW50UXVvdGF0aW9uQXJnID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgaXNJblF1b3RhdGlvbiA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIC8vIG1hdGNoIHF1b3RhdGlvbiBzdGFydFxuICAgICAgICBlbHNlIGlmIChhcmcubWF0Y2goL14nLykpIHtcbiAgICAgICAgICAgIGlzSW5RdW90YXRpb24gPSB0cnVlO1xuICAgICAgICAgICAgY3VycmVudFF1b3RhdGlvbkFyZyA9IGFyZy5zdWJzdHIoMSwgYXJnLmxlbmd0aCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gd2hpbGUgaW4gcXVvdGF0aW9uXG4gICAgICAgIGVsc2UgaWYgKGlzSW5RdW90YXRpb24pIHtcbiAgICAgICAgICAgIGN1cnJlbnRRdW90YXRpb25BcmcgKz0gJyAnICsgYXJnO1xuICAgICAgICB9IGVsc2UgaWYgKGFyZyAhPT0gJycpIHtcbiAgICAgICAgICAgIG5ld0FyZ3MucHVzaChhcmcpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gbmV3QXJncztcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHtsb2d9IGZyb20gJy4vbG9nJztcbmltcG9ydCB7Q0ZHfSBmcm9tICcuL2NvbmZpZyc7XG5cbmNvbnN0IHgxMSA9IHJlcXVpcmUoJ3gxMScpO1xuXG5leHBvcnQgbGV0IFg7XG5sZXQgcm9vdDtcbmxldCBkaXNwbGF5O1xuXG5cbi8vIGV4cG9ydCBjb25zdCBnZXRXaW5kb3dJbmZvID0gd3JhcFgxMShfZ2V0V2luZG93SW5mbyk7XG5leHBvcnQgY29uc3QgZ2V0WCA9ICgpID0+IFg7XG5cbmZ1bmN0aW9uIGNhdGNoR2VuZXJpY0VycihlcnIpIHtcbiAgICBjb25zb2xlLmVycm9yKCd4MTFXcmFwcGVyOiAnLCBlcnIsIGVyci5zdGFjayk7XG59XG5cbmxldCBpc0NsaWVudEluaXRpYWxpemVkID0gZmFsc2U7XG5sZXQgaW5pdFByb21pc2U7XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0WDExKCk6IFByb21pc2U8YW55PiB7XG4gICAgaWYgKGlzQ2xpZW50SW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgIH1cbiAgICBpZiAoaW5pdFByb21pc2UpIHtcbiAgICAgICAgcmV0dXJuIGluaXRQcm9taXNlO1xuICAgIH1cbiAgICBpbml0UHJvbWlzZSA9IG5ldyBQcm9taXNlKChmdWxmaWxsLCByZWplY3QpID0+IHtcbiAgICAgICAgeDExLmNyZWF0ZUNsaWVudCgoZXJyLCBkaXNwbGF5SW4pID0+IHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZGlzcGxheSA9IGRpc3BsYXlJbjtcbiAgICAgICAgICAgICAgICBYID0gZGlzcGxheS5jbGllbnQ7XG5cbiAgICAgICAgICAgICAgICByb290ID0gZGlzcGxheS5zY3JlZW5bMF0ucm9vdDtcbiAgICAgICAgICAgICAgICBpc0NsaWVudEluaXRpYWxpemVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBmdWxmaWxsKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLm9uKCdlcnJvcicsIChlcnIpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSkuY2F0Y2goY2F0Y2hHZW5lcmljRXJyKTtcbiAgICByZXR1cm4gaW5pdFByb21pc2U7XG59XG5cbi8vIE1FVEhPRFNcbi8vIC0tLS0tLS1cbmV4cG9ydCBmdW5jdGlvbiBnZXREaXNwbGF5cygpOiBhbnlbXSB7XG4gICAgaWYgKCFkaXNwbGF5KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignWDExIG5vdCBpbml0aWFsaXplZCAvIE5vIHNjcmVlbiBhdmFpbGFibGUnKTtcbiAgICB9XG4gICAgcmV0dXJuIGRpc3BsYXkuc2NyZWVuO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0V2luZG93R2VvbWV0cnkod2luSWQpIHtcbiAgICBjb25zdCBnZW86IGFueSA9IHt9O1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChmdWxmaWxsLCByZWplY3QpID0+IHtcbiAgICAgICAgWC5UcmFuc2xhdGVDb29yZGluYXRlcyh3aW5JZCwgcm9vdCwgMCwgMCwgKGVyciwgcmVzKSA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGdlby54ID0gcmVzLmRlc3RYO1xuICAgICAgICAgICAgICAgIGdlby55ID0gcmVzLmRlc3RZO1xuXG4gICAgICAgICAgICAgICAgWC5HZXRHZW9tZXRyeSh3aW5JZCwgKGVyciwgcmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZ2VvLndpZHRoID0gcmVzLndpZHRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgZ2VvLmhlaWdodCA9IHJlcy5oZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBmdWxmaWxsKGdlbyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSkuY2F0Y2goY2F0Y2hHZW5lcmljRXJyKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEFjdGl2ZVdpbmRvd0lkcygpOiBQcm9taXNlPHN0cmluZ1tdPiB7XG4gICAgY29uc3QgUFJPUF9OQU1FID0gJ19ORVRfQ0xJRU5UX0xJU1QnO1xuICAgIGNvbnN0IHByb3BJZCA9IGF3YWl0IF9nZXRQcm9wZXJ0eUlkQnlOYW1lKHJvb3QsIFBST1BfTkFNRSk7XG4gICAgY29uc3QgaWRTdHIgPSBhd2FpdCBnZXRQcm9wKHJvb3QsIHByb3BJZCBhcyBudW1iZXIpO1xuICAgIHJldHVybiBfcGFyc2VXaW5kb3dJZHMoaWRTdHIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVzdG9yZVdpbmRvd1Bvc2l0aW9uKHdpbikge1xuICAgIGxvZygnUmVzdG9yaW5nIHdpbmRvdyBwb3NpdGlvbiBmb3IgXCInICsgd2luLndtQ2xhc3NOYW1lICsgJ1wiJyk7XG4gICAgY29uc3QgU1RBVEVTX1RPX1JFU0VUID0gW1xuICAgICAgICAnX05FVF9XTV9TVEFURV9NQVhJTUlaRURfVkVSVCcsXG4gICAgICAgICdfTkVUX1dNX1NUQVRFX01BWElNSVpFRF9IT1JaJ1xuICAgIF07XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChmdWxmaWxsLCByZWplY3QpID0+IHtcbiAgICAgICAgc2V0U3RhdGUod2luLndpbmRvd0lkLCAncmVtb3ZlJywgU1RBVEVTX1RPX1JFU0VUKVxuICAgICAgICAgICAgLmNhdGNoKHJlamVjdClcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBYLk1vdmVSZXNpemVXaW5kb3cod2luLndpbmRvd0lkLCB3aW4ueCwgd2luLnksIHdpbi53aWR0aCwgd2luLmhlaWdodCk7XG4gICAgICAgICAgICAgICAgc2V0U3RhdGUod2luLndpbmRvd0lkLCAnYWRkJywgd2luLnN0YXRlcylcbiAgICAgICAgICAgICAgICAgICAgLmNhdGNoKHJlamVjdClcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZnVsZmlsbCgpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2gocmVqZWN0KTtcbiAgICB9KS5jYXRjaChjYXRjaEdlbmVyaWNFcnIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xvc2VXaW5kb3cod2luSWQpIHtcbiAgICByZXR1cm4gX3NlbmRYMTFDbGllbnRNZXNzYWdlKHdpbklkLCAnX05FVF9DTE9TRV9XSU5ET1cnKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1vdmVUb1dvcmtzcGFjZSh3aW5JZCwgd29ya1NwYWNlTnIpIHtcbiAgICAvLyBOT1RFOiBpZiBpdCBkb2Vzbid0IHdvcmsgd2UgbWlnaHQgYWxzbyB3YW50IHRvIHVzZSBfV0lOX1dPUktTUEFDRVxuICAgIHJldHVybiBfc2VuZFgxMUNsaWVudE1lc3NhZ2Uod2luSWQsICdfTkVUX1dNX0RFU0tUT1AnLCBbe1xuICAgICAgICB2YWx1ZTogd29ya1NwYWNlTnIsXG4gICAgfV0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ29Ub1ZpZXdwb3J0KHgsIHkpIHtcbiAgICByZXR1cm4gX3NlbmRYMTFDbGllbnRNZXNzYWdlKHJvb3QsICdfTkVUX0RFU0tUT1BfVklFV1BPUlQnLCBbXG4gICAgICAgICAgICB7dmFsdWU6IHh9LFxuICAgICAgICAgICAge3ZhbHVlOiB5fSxcbiAgICAgICAgXVxuICAgICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRTdGF0ZSh3aWQsIGFjdGlvblN0ciwgc3RhdGVzVG9IYW5kbGUpIHtcbiAgICBjb25zdCBBQ1RJT05TX01BUCA9IHtcbiAgICAgICAgcmVtb3ZlOiAwLFxuICAgICAgICBhZGQ6IDEsXG4gICAgICAgIHRvZ2dsZTogMixcbiAgICB9O1xuICAgIGNvbnN0IGFjdGlvbiA9IEFDVElPTlNfTUFQW2FjdGlvblN0cl07XG4gICAgbGV0IHByb3BlcnRpZXM6IGFueVtdID0gW1xuICAgICAgICB7dmFsdWU6IGFjdGlvbn0sXG4gICAgXTtcblxuICAgIC8vIGFsbCBwcm9wZXJ0aWVzIG5lZWQgdG8gYmUgbG9va2VkIHVwIGZvciB0aGVpciBhdG9tIGlkXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoc3RhdGVzVG9IYW5kbGUpICYmIHN0YXRlc1RvSGFuZGxlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgc3RhdGVzVG9IYW5kbGUuZm9yRWFjaCgoc3RhdGVQcm9wZXJ0eSkgPT4ge1xuICAgICAgICAgICAgcHJvcGVydGllcy5wdXNoKHtcbiAgICAgICAgICAgICAgICBpc0F0b206IHRydWUsXG4gICAgICAgICAgICAgICAgdmFsdWU6IHN0YXRlUHJvcGVydHksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBfc2VuZFgxMUNsaWVudE1lc3NhZ2Uod2lkLCAnX05FVF9XTV9TVEFURScsIHByb3BlcnRpZXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICB9XG59XG5cbmNvbnN0IFBST1BTX1RPX0dFVCA9IFtcbiAgICAnV01fQ0xBU1MnLFxuICAgICdfTkVUX1dNX1NUQVRFJyxcbiAgICAnX05FVF9XTV9ERVNLVE9QJyxcbiAgICAnV01fTkFNRScsXG4gICAgJ19ORVRfV01fUElEJyxcbiAgICAnX05FVF9XTV9XSU5ET1dfVFlQRScsXG4gICAgJ19CQU1GX0RFU0tUT1BfRklMRScsXG5dO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0V2luZG93SW5mbyh3aWQpOiBQcm9taXNlPGFueT4ge1xuICAgIC8vIFguR2V0R2VvbWV0cnkod2lkLCBmdW5jdGlvbiAoZXJyLCBjbGllbnRHZW9tKSB7XG4gICAgLy8gICBjb25zb2xlLmxvZyhcIndpbmRvdyBnZW9tZXRyeTogXCIsIGNsaWVudEdlb20pO1xuICAgIC8vIH0pO1xuXG4gICAgY29uc3QgcHJvcHM6IGFueVtdID0gYXdhaXQgX3hDYlRvUHJvbWlzZShYLkxpc3RQcm9wZXJ0aWVzLCB3aWQpO1xuXG4gICAgY29uc3QgcHJvbWlzZXMgPSBwcm9wcy5tYXAoYXN5bmMgZnVuY3Rpb24gKHApIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJvcE5hbWUgPSBhd2FpdCBfeENiVG9Qcm9taXNlKFguR2V0QXRvbU5hbWUsIHApO1xuICAgICAgICAgICAgICAgIGlmIChQUk9QU19UT19HRVQuaW5jbHVkZXMocHJvcE5hbWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb3BWYWwgPSBhd2FpdCBfeENiVG9Qcm9taXNlKFguR2V0UHJvcGVydHksIDAsIHdpZCwgcCwgMCwgMCwgMTAwMDAwMDApO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0eXBlTmFtZSA9IGF3YWl0IF94Q2JUb1Byb21pc2UoWC5HZXRBdG9tTmFtZSwgcHJvcFZhbC50eXBlKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocHJvcFZhbCwgdHlwZU5hbWUsIHByb3BOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGVjb2RlZERhdGEgPSBhd2FpdCBfZGVjb2RlUHJvcGVydHkodHlwZU5hbWUsIHByb3BWYWwuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUocHJvcE5hbWUgKyAnKCcgKyB0eXBlTmFtZSArICcpID0gJyArIGRlY29kZWREYXRhKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCcnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbihyZXN1bHRzID0+IHtcbiAgICAgICAgcmV0dXJuIHJlc3VsdHMuam9pbignXFxuJyk7XG4gICAgfSk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRQcm9wKGlkID0gcm9vdCwgcHJvcElkOiBudW1iZXIpOiBQcm9taXNlPGFueT4ge1xuICAgIGNvbnN0IHByb3BWYWwgPSBhd2FpdCBfeENiVG9Qcm9taXNlKFguR2V0UHJvcGVydHksIDAsIGlkLCBwcm9wSWQsIDAsIDAsIDEwMDAwMDAwKTtcbiAgICBjb25zdCB0eXBlTmFtZSA9IGF3YWl0IF94Q2JUb1Byb21pc2UoWC5HZXRBdG9tTmFtZSwgcHJvcFZhbC50eXBlKTtcbiAgICByZXR1cm4gYXdhaXQgX2RlY29kZVByb3BlcnR5KHR5cGVOYW1lLCBwcm9wVmFsLmRhdGEpO1xufVxuXG4vLyBIRUxQRVJcbi8vIC0tLS0tLVxuZnVuY3Rpb24gX3hDYlRvUHJvbWlzZShmbiwgLi4uYXJncyk6IGFueSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChmdWxmaWxsLCByZWplY3QpID0+IHtcbiAgICAgICAgZm4uYXBwbHkoWCwgWy4uLmFyZ3MsIChlcnIsIHJlcykgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGVyciA/IHJlamVjdChlcnIpIDogZnVsZmlsbChyZXMpO1xuICAgICAgICB9XSk7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIF9jb3VudGVyKGluaXRpYWxWYWwsIG1vZGlmaWVyKSB7XG4gICAgLy8gdG8gc3RhcnQgYXQgdmFsIHdlIG5lZWQgdG8gc3VidHJhY3QgdGhlIG1vZGlmaWVyIGZpcnN0XG4gICAgbGV0IHZhbCA9IGluaXRpYWxWYWwgLSBtb2RpZmllcjtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICB2YWwgKz0gbW9kaWZpZXI7XG4gICAgICAgIHJldHVybiB2YWw7XG4gICAgfTtcbn1cblxuZnVuY3Rpb24gX2dldEF0b21zKGxpc3QsIGNiKSB7XG4gICAgY29uc3QgcmVzID0ge307XG4gICAgY29uc3QgZ2V0QXRvbSA9ICgpID0+IHtcbiAgICAgICAgaWYgKGxpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gY2IobnVsbCwgcmVzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBsaXN0LnNoaWZ0KCk7XG4gICAgICAgICAgICBYLkludGVybkF0b20oZmFsc2UsIG5hbWUsIChlcnIsIGF0b20pID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjYihlcnIpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc1tuYW1lXSA9IGF0b207XG4gICAgICAgICAgICAgICAgICAgIGdldEF0b20oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgZ2V0QXRvbSgpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBfZ2V0UHJvcGVydHlJZEJ5TmFtZSh3aWQ6IHN0cmluZywgbmFtZVRvR2V0OiBzdHJpbmcpOiBQcm9taXNlPG51bWJlcj4ge1xuICAgIGNvbnN0IHByb3BzOiBhbnlbXSA9IGF3YWl0IF94Q2JUb1Byb21pc2UoWC5MaXN0UHJvcGVydGllcywgd2lkKTtcbiAgICBjb25zdCBwcm9taXNlcyA9IHByb3BzLm1hcChhc3luYyBmdW5jdGlvbiAocCkge1xuICAgICAgICBjb25zdCBwcm9wTmFtZSA9IGF3YWl0IF94Q2JUb1Byb21pc2UoWC5HZXRBdG9tTmFtZSwgcCk7XG4gICAgICAgIGlmIChuYW1lVG9HZXQgPT09IHByb3BOYW1lKSB7XG4gICAgICAgICAgICByZXR1cm4gcDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgcmVzID0gYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuICAgIHJldHVybiByZXMuZmluZChpdGVtID0+IGl0ZW0gPiAwKTtcbn1cblxuXG5mdW5jdGlvbiBfc2VuZFgxMUNsaWVudE1lc3NhZ2Uod2lkLCBldmVudE5hbWUsIGV2ZW50UHJvcGVydGllcyA9IFtdLCBvcHRpb25hbEV2ZW50TWFzaz8pIHtcbiAgICBpZiAoZXZlbnRQcm9wZXJ0aWVzLmxlbmd0aCA+IDQpIHtcbiAgICAgICAgdGhyb3cgJ29ubHkgc3VwcG9ydHMgNCBwcm9wZXJ0aWVzIGF0IG9uY2UgbWF4JztcbiAgICB9XG5cbiAgICBjb25zdCBvZmZzZXRDb3VudGVyID0gX2NvdW50ZXIoNCwgNCk7XG4gICAgY29uc3QgZXZlbnRNYXNrID0gb3B0aW9uYWxFdmVudE1hc2sgfHwgeDExLmV2ZW50TWFzay5TdWJzdHJ1Y3R1cmVSZWRpcmVjdDtcblxuICAgIC8vIGNyZWF0ZSBhdG9tcyB0byBsb29rIHVwXG4gICAgbGV0IGF0b21zTGlzdCA9IFtdO1xuICAgIGF0b21zTGlzdC5wdXNoKGV2ZW50TmFtZSk7XG4gICAgZXZlbnRQcm9wZXJ0aWVzLmZvckVhY2goKGV2ZW50UHJvcGVydHkpID0+IHtcbiAgICAgICAgaWYgKGV2ZW50UHJvcGVydHkuaXNBdG9tKSB7XG4gICAgICAgICAgICBhdG9tc0xpc3QucHVzaChldmVudFByb3BlcnR5LnZhbHVlKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gc3RhcnQgYnVmZmVyIGlucHV0XG4gICAgY29uc3QgZGF0YSA9IG5ldyBCdWZmZXIoMzIpO1xuICAgIGRhdGEuZmlsbCgwKTtcbiAgICBkYXRhLndyaXRlSW50OCgzMywgMCk7IC8vIDMzID0gQ2xpZW50TWVzc2FnZVxuICAgIGRhdGEud3JpdGVJbnQ4KDMyLCAxKTsgLy8gZm9ybWF0XG4gICAgZGF0YS53cml0ZVVJbnQzMkxFKHdpZCwgb2Zmc2V0Q291bnRlcigpKTtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgoZnVsZmlsbCwgcmVqZWN0KSA9PiB7XG4gICAgICAgIF9nZXRBdG9tcyhhdG9tc0xpc3QsIChlcnIsIGF0b21zKSA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkYXRhLndyaXRlVUludDMyTEUoYXRvbXNbZXZlbnROYW1lXSwgb2Zmc2V0Q291bnRlcigpKTtcblxuICAgICAgICAgICAgICAgIGV2ZW50UHJvcGVydGllcy5mb3JFYWNoKChldmVudFByb3BlcnR5KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChldmVudFByb3BlcnR5LmlzQXRvbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS53cml0ZVVJbnQzMkxFKGF0b21zW2V2ZW50UHJvcGVydHkudmFsdWVdLCBvZmZzZXRDb3VudGVyKCkpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS53cml0ZVVJbnQzMkxFKGV2ZW50UHJvcGVydHkudmFsdWUsIG9mZnNldENvdW50ZXIoKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGxldCBzb3VyY2VJbmRpY2F0aW9uID0gMTtcbiAgICAgICAgICAgICAgICBkYXRhLndyaXRlVUludDMyTEUoc291cmNlSW5kaWNhdGlvbiwgb2Zmc2V0Q291bnRlcigpKTtcblxuICAgICAgICAgICAgICAgIFguU2VuZEV2ZW50KHJvb3QsIDAsIGV2ZW50TWFzaywgZGF0YSk7XG5cbiAgICAgICAgICAgICAgICAvLyB3ZSBuZWVkIGEgbGl0dGxlIHRpbWUgZm9yIHRoZSBidWZmZXIgdG8gYmUgcHJvY2Vzc2VkXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdWxmaWxsLCBDRkcuR0lWRV9YMTFfVElNRV9USU1FT1VUKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSkuY2F0Y2goY2F0Y2hHZW5lcmljRXJyKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gX2RlY29kZVByb3BlcnR5KHR5cGUsIGRhdGEpOiBQcm9taXNlPGFueT4ge1xuICAgIHRyeSB7XG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnU1RSSU5HJzoge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuICAgICAgICAgICAgICAgIGxldCBzID0gJyc7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhW2ldID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcyA9ICcnO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGRhdGFbaV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChzKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0Lm1hcChxdW90aXplKS5qb2luKCcsICcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSAnQVRPTSc6XG4gICAgICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoID4gMzIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdMT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PTkcnO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnN0IHByb21pc2VzID0gW107XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSArPSA0KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGEgPSBkYXRhLnVucGFjaygnTCcsIGkpWzBdO1xuICAgICAgICAgICAgICAgICAgICBwcm9taXNlcy5wdXNoKF94Q2JUb1Byb21pc2UoWC5HZXRBdG9tTmFtZSwgYSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5qb2luKCcsICcpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBjYXNlICdDQVJESU5BTCc6XG4gICAgICAgICAgICBjYXNlICdJTlRFR0VSJzoge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlcyA9IFtdO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkgKz0gNCkge1xuICAgICAgICAgICAgICAgICAgICByZXMucHVzaChkYXRhLnVucGFjaygnTCcsIGkpWzBdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5qb2luKCcsICcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSAnV0lORE9XJzpcbiAgICAgICAgICAgICAgICBjb25zdCByZXMgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpICs9IDQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzLnB1c2goZGF0YS51bnBhY2soJ0wnLCBpKVswXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiAnd2luZG93IGlkIyAnICsgcmVzLm1hcCgobikgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJzB4JyArIG4udG9TdHJpbmcoMTYpO1xuICAgICAgICAgICAgICAgIH0pLmpvaW4oJywgJyk7XG5cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdXVEYgJyArIHR5cGU7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHR5cGUsIGRhdGEpO1xuICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBxdW90aXplKGkpIHtcbiAgICByZXR1cm4gJ1xcXCInICsgaSArICdcXFwiJztcbn1cblxuZnVuY3Rpb24gX3BhcnNlV2luZG93SWRzKHN0ckluKTogc3RyaW5nW10ge1xuICAgIGNvbnN0IHN0ciA9IHN0ckluLnJlcGxhY2UoJ3dpbmRvdyBpZCMgJywgJycpO1xuICAgIHJldHVybiBzdHIuc3BsaXQoJywgJyk7XG59XG5cbi8vY29uc3QgdGVzdEZuID0gd3JhcFgxMShjbG9zZVdpbmRvdyk7XG4vL3Rlc3RGbignMHgwNGEwMDAwMScpLnRoZW4oKGdlbykgPT4ge1xuLy99KTtcblxuLy9jb25zdCB0ZXN0Rm4gPSB3cmFwWDExKG1vdmVUb1dvcmtzcGFjZSk7XG4vL3Rlc3RGbignMHgwNGUwMDAwMSAnLCAyKTtcblxuLy9jb25zdCB0ZXN0Rm5YID0gd3JhcFgxMShyZXN0b3JlV2luZG93UG9zaXRpb24pO1xuLy90ZXN0Rm5YKHtcbi8vICB3aW5kb3dJZDogJzB4MDRhMDAwMDEnLFxuLy8gIHg6IDAsXG4vLyAgeTogMCxcbi8vICB3aWR0aDogNTAwLFxuLy8gIGhlaWdodDogNTAwLFxuLy8gIHN0YXRlczogW1xuLy8gICAgJ19ORVRfV01fU1RBVEVfTUFYSU1JWkVEX1ZFUlQnXG4vLyAgXVxuLy99KTtcblxuLy9jb25zdCB0ZXN0Rm4yID0gd3JhcFgxMShzZXRTdGF0ZSk7XG4vL3Rlc3RGbjIoJzB4MDRhMDAwMDEnLCAncmVtb3ZlJywgWydfTkVUX1dNX1NUQVRFX01BWElNSVpFRF9WRVJUJywgJ19ORVRfV01fU1RBVEVfTUFYSU1JWkVEX0hPUlonLCAnX05FVF9XTV9TVEFURV9GVUxMU0NSRUVOJ10pXG4vLyAgLnRoZW4oKHJlcykgPT4ge1xuLy8gICAgY29uc29sZS5sb2coJ05PUk1BTCcsIHJlcyk7XG4vLyAgfSk7XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB7SVNfREVCVUd9IGZyb20gJy4vaXNEZWJ1Zyc7XG5pbXBvcnQge0NGR30gZnJvbSAnLi9jb25maWcnO1xuaW1wb3J0IHtzcGF3bn0gZnJvbSAnY2hpbGRfcHJvY2Vzcyc7XG5pbXBvcnQge3BhcnNlQ21kQXJnc30gZnJvbSAnLi9wYXJzZUNtZFRvU3Bhd24nO1xuaW1wb3J0IHtXaW5PYmosIFdpbk9iaklkT25seX0gZnJvbSAnLi9tb2RlbCc7XG5pbXBvcnQge2xvZ30gZnJvbSAnLi9sb2cnO1xuaW1wb3J0IHtnZXRBY3RpdmVXaW5kb3dJZHMsIGdldERpc3BsYXlzLCBnZXRXaW5kb3dJbmZvfSBmcm9tICcuL3gxMVdyYXBwZXInO1xuXG4vLyA1MDBrYlxuY29uc3QgTUFYX0JVRkZFUiA9IDEwMjQgKiA1MDA7XG5jb25zdCBFWEVDX09QVFMgPSB7XG4gICAgbWF4QnVmZmVyOiBNQVhfQlVGRkVSLFxufTtcblxuXG4vLyBkaXNwbGF5XG4vLyAtLS0tLS0tXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29ubmVjdGVkRGlzcGxheXNJZCgpOiBzdHJpbmcge1xuICAgIGNvbnN0IGRpc3BsYXlzID0gZ2V0RGlzcGxheXMoKTtcbiAgICByZXR1cm4gZGlzcGxheXMubWFwKHNjcmVlbiA9PiBzY3JlZW4ucGl4ZWxfd2lkdGggKyAneCcgKyBzY3JlZW4ucGl4ZWxfaGVpZ2h0KS5qb2luKCc7Jyk7XG59XG5cblxuLy8gT3RoZXJcbi8vIC0tLS0tLS0tXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0QWRkaXRpb25hbE1ldGFEYXRhRm9yV2luKHdpbjogV2luT2JqSWRPbmx5KTogUHJvbWlzZTxXaW5PYmo+IHtcbiAgICBjb25zdCBzdGRvdXQgPSBhd2FpdCBnZXRXaW5kb3dJbmZvKHdpbi53aW5kb3dJZCk7XG4gICAgY29uc3QgbGluZXMgPSBzdGRvdXQuc3BsaXQoJ1xcbicpO1xuICAgIGNvbnN0IHdpbkNvcHk6IGFueSA9IHsuLi53aW59O1xuXG4gICAgbGluZXMuZm9yRWFjaCgobGluZSkgPT4ge1xuICAgICAgICBjb25zdCB3b3JkcyA9IGxpbmUuc3BsaXQoJyAnKTtcbiAgICAgICAgY29uc3QgcHJvcGVydHlOYW1lID0gd29yZHNbMF07XG5cbiAgICAgICAgLy8gcmVtb3ZlIHByb3BlcnR5IG5hbWUgYW5kIFwiPVwiXG4gICAgICAgIHdvcmRzLnNwbGljZSgwLCAyKTtcbiAgICAgICAgY29uc3QgdmFsdWUgPSB3b3Jkcy5qb2luKCcgJyk7XG4gICAgICAgIGNvbnN0IHByb3BlcnR5TmFtZUZyb21NYXAgPSBDRkcuV01fTUVUQV9NQVBbcHJvcGVydHlOYW1lXTtcbiAgICAgICAgLy8gcGFyc2Ugd21DbGFzc05hbWVcbiAgICAgICAgaWYgKHByb3BlcnR5TmFtZSA9PT0gJ1dNX0NMQVNTKFNUUklORyknKSB7XG4gICAgICAgICAgICBjb25zdCBwcm9wZXJ0eU5hbWVGcm9tTWFwID0gQ0ZHLldNX01FVEFfTUFQW3Byb3BlcnR5TmFtZV07XG4gICAgICAgICAgICBjb25zdCBjbGFzc05hbWVzID0gdmFsdWUuc3BsaXQoJywgJyk7XG4gICAgICAgICAgICBsZXQgY2xhc3NOYW1lID0gJyc7XG4gICAgICAgICAgICBjbGFzc05hbWVzLmZvckVhY2goKHN0YXRlKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHN0YXRlICE9PSAnJykge1xuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWUgKz0gc3RhdGUucmVwbGFjZSgvXCIvZywgJycpICsgJy4nO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgd2luQ29weVtwcm9wZXJ0eU5hbWVGcm9tTWFwXSA9IGNsYXNzTmFtZS5zdWJzdHIoMCwgY2xhc3NOYW1lLmxlbmd0aCAtIDIpO1xuICAgICAgICB9XG4gICAgICAgIC8vIHBhcnNlIHN0YXRlc1xuICAgICAgICBlbHNlIGlmIChwcm9wZXJ0eU5hbWUgPT09ICdfTkVUX1dNX1NUQVRFKEFUT00pJykge1xuICAgICAgICAgICAgY29uc3Qgc3RhdGVzID0gdmFsdWUuc3BsaXQoJywgJyk7XG4gICAgICAgICAgICB3aW5Db3B5LnN0YXRlcyA9IFtdO1xuICAgICAgICAgICAgc3RhdGVzLmZvckVhY2goKHN0YXRlKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHN0YXRlICE9PSAnJykge1xuICAgICAgICAgICAgICAgICAgICB3aW5Db3B5LnN0YXRlcy5wdXNoKHN0YXRlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBwYXJzZSBzaW1wbGUgc3RyaW5ncyBhbmQgaW50ZWdlcnNcbiAgICAgICAgZWxzZSBpZiAocHJvcGVydHlOYW1lRnJvbU1hcCkge1xuICAgICAgICAgICAgLy8gc3BlY2lhbCBoYW5kbGUgbnVtYmVyIHR5cGVzXG4gICAgICAgICAgICBpZiAoQ0ZHLldNX01FVEFfTUFQX05VTUJFUl9UWVBFUy5pbmRleE9mKHByb3BlcnR5TmFtZSkgPiAtMSkge1xuICAgICAgICAgICAgICAgIHdpbkNvcHlbcHJvcGVydHlOYW1lRnJvbU1hcF0gPSBwYXJzZUludCh2YWx1ZSwgMTApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB3aW5Db3B5W3Byb3BlcnR5TmFtZUZyb21NYXBdID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICAvLyBjb25zb2xlLmxvZyh3aW5Db3B5KTtcbiAgICByZXR1cm4gd2luQ29weTtcbn1cblxuLy8gVE9ETyBwcmV0dGlmeSBhcmdzIHN0cnVjdHVyZVxuZXhwb3J0IGZ1bmN0aW9uIHN0YXJ0UHJvZ3JhbShleGVjdXRhYmxlRmlsZTogc3RyaW5nLCBkZXNrdG9wRmlsZVBhdGg6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgIElTX0RFQlVHICYmIGNvbnNvbGUubG9nKCdERUJVRzogc3RhcnRQcm9ncmFtKCk6JywgZXhlY3V0YWJsZUZpbGUsIGRlc2t0b3BGaWxlUGF0aCk7XG5cbiAgICBsZXQgY21kO1xuICAgIGxldCBhcmdzID0gW107XG4gICAgaWYgKGRlc2t0b3BGaWxlUGF0aCkge1xuICAgICAgICBjbWQgPSBgYXdrYDtcbiAgICAgICAgYXJncy5wdXNoKCcvXkV4ZWM9LyB7c3ViKFwiXkV4ZWM9XCIsIFwiXCIpOyBnc3ViKFwiID8lW2NEZEZmaWttTm5VdXZdXCIsIFwiXCIpOyBleGl0IHN5c3RlbSgkMCl9Jyk7XG4gICAgICAgIGFyZ3MucHVzaChkZXNrdG9wRmlsZVBhdGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHBhcnNlZENtZCA9IHBhcnNlQ21kQXJncyhleGVjdXRhYmxlRmlsZSk7XG4gICAgICAgIGNtZCA9IHBhcnNlZENtZFswXTtcbiAgICAgICAgYXJncyA9IHBhcnNlZENtZFsxXTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKGZ1bGZpbGwpID0+IHtcbiAgICAgICAgc3Bhd24oY21kLCBhcmdzLCB7XG4gICAgICAgICAgICBzdGRpbzogJ2lnbm9yZScsXG4gICAgICAgICAgICBkZXRhY2hlZDogdHJ1ZSxcbiAgICAgICAgfSkudW5yZWYoKTtcblxuICAgICAgICAvLyBjdXJyZW50bHkgd2UgaGF2ZSBubyBlcnJvciBoYW5kbGluZyBhcyB0aGUgcHJvY2VzcyBpcyBzdGFydGVkIGRldGFjaGVkXG4gICAgICAgIGZ1bGZpbGwoKTtcbiAgICB9KTtcbn1cblxuLy8gR0VUIEFDVElWRSBXSU5ET1cgTElTVFxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEFjdGl2ZVdpbmRvd0xpc3QoKTogUHJvbWlzZTxXaW5PYmpbXT4ge1xuICAgIGNvbnN0IHdpbmRvd0lkcyA9IGF3YWl0IGdldEFjdGl2ZVdpbmRvd0lkcygpO1xuICAgIGNvbnN0IHdpbmRvd0xpc3Q6IFdpbk9iaklkT25seVtdID0gW107XG4gICAgd2luZG93SWRzLmZvckVhY2goKHdpbmRvd0lkKSA9PiB7XG4gICAgICAgIHdpbmRvd0xpc3QucHVzaCh7XG4gICAgICAgICAgICB3aW5kb3dJZDogd2luZG93SWQsXG4gICAgICAgICAgICB3aW5kb3dJZERlYzogcGFyc2VJbnQod2luZG93SWQsIDE2KSxcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvLyBhZGQgbWV0YSBkYXRhIHJpZ2h0IGF3YXlcbiAgICBjb25zdCBwcm9taXNlcyA9IHdpbmRvd0xpc3QubWFwKCh3aW4pID0+IGdldEFkZGl0aW9uYWxNZXRhRGF0YUZvcldpbih3aW4pKTtcblxuICAgIGNvbnN0IHdpbmRvd3NXaXRoRGF0YTogV2luT2JqW10gPSBhd2FpdCBQcm9taXNlLmFsbChwcm9taXNlcykgYXMgV2luT2JqW107XG5cbiAgICBJU19ERUJVRyAmJiBjb25zb2xlLmxvZygnREVCVUc6IGdldEFjdGl2ZVdpbmRvd0xpc3QoKTonLCB3aW5kb3dMaXN0KTtcbiAgICByZXR1cm4gd2luZG93c1dpdGhEYXRhLmZpbHRlcihfZmlsdGVySW52YWxpZFdpbmRvd3MpO1xufVxuXG5mdW5jdGlvbiBfZmlsdGVySW52YWxpZFdpbmRvd3Mod2luOiBXaW5PYmopOiBib29sZWFuIHtcbiAgICAvLyBmaWx0ZXIgbm9uZSBub3JtYWwgd2luZG93cywgZXhjbHVkZWQgY2xhc3MgbmFtZXMgYW5kIGluY29tcGxldGUgd2luZG93c1xuICAgIGNvbnN0IGlzTm9ybWFsV2luZG93ID0gKCF3aW4ud21UeXBlIHx8IHdpbi53bVR5cGUgPT09ICdfTkVUX1dNX1dJTkRPV19UWVBFX05PUk1BTCcpO1xuXG4gICAgY29uc3QgaXNOb3RFeGNsdWRlZCA9ICEoX2lzRXhjbHVkZWRXbUNsYXNzTmFtZSh3aW4ud21DbGFzc05hbWUpKTtcbiAgICBjb25zdCBoYXNXbUNsYXNzTmFtZSA9ICEhKHdpbi53bUNsYXNzTmFtZSk7XG5cbiAgICAvLyB3YXJuIGlmIG5vIHdtQ2xhc3NOYW1lIGV2ZW4gdGhvdWdoIHRoZXJlIHNob3VsZCBiZVxuICAgIGlmIChpc05vcm1hbFdpbmRvdyAmJiBpc05vdEV4Y2x1ZGVkICYmICFoYXNXbUNsYXNzTmFtZSkge1xuICAgICAgICBjb25zb2xlLndhcm4od2luLndpbmRvd0lkICsgJyBoYXMgbm8gd21DbGFzc05hbWUuIFdpbjogJywgd2luKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKGlzTm9ybWFsV2luZG93ICYmIGlzTm90RXhjbHVkZWQgJiYgaGFzV21DbGFzc05hbWUpO1xufVxuXG5cbmZ1bmN0aW9uIF9pc0V4Y2x1ZGVkV21DbGFzc05hbWUod21DbGFzc05hbWUpOiBib29sZWFuIHtcbiAgICByZXR1cm4gQ0ZHLldNX0NMQVNTX0VYQ0xVU0lPTlMuaW5kZXhPZih3bUNsYXNzTmFtZSkgPiAtMTtcbn1cblxuZnVuY3Rpb24gX2NhdGNoR2VuZXJpY0VycihlcnIpOiB2b2lkIHtcbiAgICBjb25zb2xlLmVycm9yKCdvdGhlckNtZDogR2VuZXJpYyBFcnJvcicsIGVyciwgZXJyLnN0YWNrKTtcbiAgICBsb2coJ290aGVyQ21kOicsIGFyZ3VtZW50cyk7XG59XG4iLCIndXNlIHN0cmljdCc7XG5pbXBvcnQge2dldFdpbmRvd0dlb21ldHJ5LCBnb1RvVmlld3BvcnR9IGZyb20gJy4veDExV3JhcHBlcic7XG5pbXBvcnQge2dldEFjdGl2ZVdpbmRvd0xpc3R9IGZyb20gJy4vb3RoZXJDbWQnO1xuaW1wb3J0IHtDRkd9IGZyb20gJy4vY29uZmlnJztcbmltcG9ydCB7V2luT2JqfSBmcm9tICcuL21vZGVsJztcblxuY29uc3QgZmluZHVwID0gcmVxdWlyZSgnZmluZHVwLXN5bmMnKTtcblxuXG5jb25zdCBIT01FX0RJUiA9IHByb2Nlc3MuZW52WydIT01FJ107XG5jb25zdCBERUZBVUxUX0RFU0tUT1BfRklMRV9MT0NBVElPTlMgPSBbXG4gICAgJ3tob21lfS8ubG9jYWwvc2hhcmUvYXBwbGljYXRpb25zJyxcbiAgICAne2hvbWV9Ly5nbm9tZS9hcHBzLycsXG4gICAgJy91c3Ivc2hhcmUvYXBwbGljYXRpb25zJyxcbiAgICAnL3Vzci9sb2NhbC9zaGFyZS9hcHBsaWNhdGlvbnMnLFxuICAgICcvdXNyL3NoYXJlL2FwcC1pbnN0YWxsJyxcbl07XG5cblxuZnVuY3Rpb24gX2NhdGNoR2VuZXJpY0VycihlcnIpIHtcbiAgICBjb25zb2xlLmVycm9yKCdHZW5lcmljIEVycm9yIGluIE1ldGEgV3JhcHBlcicsIGVyciwgZXJyLnN0YWNrKTtcbiAgICB0aHJvdyBlcnI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnb1RvRmlyc3RXb3Jrc3BhY2UoKSB7XG4gICAgcmV0dXJuIGdvVG9WaWV3cG9ydCgwLCAwKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpbmREZXNrdG9wRmlsZShmaWxlTmFtZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgoZnVsZmlsbCwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGNvbnN0IGRlc2t0b3BGaWxlTG9jYXRpb25zID0gQ0ZHLkRFU0tUT1BfRklMRV9MT0NBVElPTlMgfHwgREVGQVVMVF9ERVNLVE9QX0ZJTEVfTE9DQVRJT05TO1xuICAgICAgICBjb25zdCBwYXR0ZXJucyA9IFtdO1xuXG4gICAgICAgIGNvbnN0IHBhcmVudERpcnMgPSBkZXNrdG9wRmlsZUxvY2F0aW9ucy5tYXAoKHBhcmVudERpcikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHBhcmVudERpci5yZXBsYWNlKCd7aG9tZX0nLCBIT01FX0RJUik7XG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgbGV0IGZpcnN0RmlsZTtcbiAgICAgICAgY29uc3QgbWF0Y2ggPSBwYXJlbnREaXJzLmZpbmQoKGRpcikgPT4ge1xuICAgICAgICAgICAgZmlyc3RGaWxlID0gZmluZHVwKGZpbGVOYW1lLCB7Y3dkOiBkaXJ9KTtcbiAgICAgICAgICAgIHJldHVybiBmaXJzdEZpbGU7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICghZmlyc3RGaWxlIHx8ICFtYXRjaCkge1xuICAgICAgICAgICAgY29uc3QgZXJyID0gJ2ZpbmREZXNrdG9wRmlsZSBjYW50IGZpbmQgZmlsZTsgc2VhcmNoZWQgcGF0dGVybnMnO1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIsIHBhdHRlcm5zKTtcbiAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZnVsZmlsbChmaXJzdEZpbGUpO1xuICAgICAgICB9XG4gICAgfSkuY2F0Y2goX2NhdGNoR2VuZXJpY0Vycik7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEFjdGl2ZVdpbmRvd0xpc3RGbG93KCk6IFByb21pc2U8V2luT2JqW10gfCBhbnk+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKGZ1bGZpbGwsIHJlamVjdCkgPT4ge1xuICAgICAgICByZXR1cm4gZ2V0QWN0aXZlV2luZG93TGlzdCgpXG4gICAgICAgICAgICAudGhlbihhc3luYyAod2luZG93TGlzdDogYW55W10pID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9taXNlcyA9IHdpbmRvd0xpc3QubWFwKCh3aW4pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGdldFdpbmRvd0dlb21ldHJ5KHdpbi53aW5kb3dJZClcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChnZW86IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHByb3AgaW4gZ2VvKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChnZW8uaGFzT3duUHJvcGVydHkocHJvcCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbltwcm9wXSA9IGdlb1twcm9wXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE8gb3JnYW5pemUgYWRkaW5nIG9mIGFsbCB0aG9zZSBkaWZmZXJlbnQgcHJvcGVydGllcyBiZXR0ZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBhZGQgbWlzc2luZyBzdGF0aWMgcHJvcGVydGllc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbi5zaW1wbGVOYW1lID0gX3BhcnNlU2ltcGxlV2luZG93TmFtZSh3aW4ud21DbGFzc05hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB3aW47XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcblxuXG4gICAgICAgICAgICAgICAgLy8gd2UncmUgdXNpbmcgYSB3YXRlcmZhbGwgYmVjYXVzZSB3ZSdyZSBkZWFsaW5nIHdpdGggeDExIHJlcXVlc3RzXG4gICAgICAgICAgICAgICAgaWYgKHByb21pc2VzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHByb21pc2Ugb2YgcHJvbWlzZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgcHJvbWlzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgX2FkZFBhcnNlZEV4ZWN1dGFibGVGaWxlc0Zyb21XbUNsYXNzTmFtZXMod2luZG93TGlzdClcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKCh3aW5kb3dMaXN0V2l0aFdtQ2xhc3NOYW1lcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bGZpbGwod2luZG93TGlzdFdpdGhXbUNsYXNzTmFtZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZnVsZmlsbChbXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgfSkuY2F0Y2goX2NhdGNoR2VuZXJpY0Vycik7XG59XG5cbi8vIE1JWEVEXG5mdW5jdGlvbiBfYWRkUGFyc2VkRXhlY3V0YWJsZUZpbGVzRnJvbVdtQ2xhc3NOYW1lcyh3aW5kb3dMaXN0KTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKGZ1bGZpbGwsIHJlamVjdCkgPT4ge1xuICAgICAgICBjb25zdCBwcm9taXNlcyA9IHdpbmRvd0xpc3QuZmlsdGVyKHdpbiA9PiAhd2luLmV4ZWN1dGFibGVGaWxlKVxuICAgICAgICAgICAgLm1hcCgod2luKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9wYXJzZUV4ZWN1dGFibGVGaWxlRnJvbVdtQ2xhc3NOYW1lKHdpbi53bUNsYXNzTmFtZSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKGZpbGVOYW1lKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aW4uZXhlY3V0YWJsZUZpbGUgPSBmaWxlTmFtZTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICBpZiAocHJvbWlzZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHByb21pc2Ugb2YgcHJvbWlzZXMpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCBwcm9taXNlO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZ1bGZpbGwod2luZG93TGlzdCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmdWxmaWxsKHdpbmRvd0xpc3QpO1xuICAgICAgICB9XG4gICAgfSkuY2F0Y2goX2NhdGNoR2VuZXJpY0Vycik7XG59XG5cbmZ1bmN0aW9uIF9wYXJzZUV4ZWN1dGFibGVGaWxlRnJvbVdtQ2xhc3NOYW1lKHdtQ2xhc3NOYW1lKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKGZ1bGZpbGwsIHJlamVjdCkgPT4ge1xuICAgICAgICBjb25zdCBleGVjdXRhYmxlRmlsZUZyb21NYXAgPSBDRkcuV01fQ0xBU1NfQU5EX0VYRUNVVEFCTEVfRklMRV9NQVBbd21DbGFzc05hbWVdO1xuICAgICAgICBpZiAoZXhlY3V0YWJsZUZpbGVGcm9tTWFwKSB7XG4gICAgICAgICAgICBmdWxmaWxsKGV4ZWN1dGFibGVGaWxlRnJvbU1hcCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBzcGxpdFZhbHVlcyA9IHdtQ2xhc3NOYW1lLnNwbGl0KCcuJyk7XG4gICAgICAgICAgICBjb25zdCBmaWxlTmFtZSA9IHNwbGl0VmFsdWVzWzBdO1xuICAgICAgICAgICAgaWYgKF9pc0Nocm9tZUFwcChmaWxlTmFtZSkpIHtcbiAgICAgICAgICAgICAgICBfcGFyc2VDaHJvbWVBcHBEZXNrdG9wRmlsZU5hbWUoZmlsZU5hbWUpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bGZpbGwpXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaChyZWplY3QpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBmdWxmaWxsKGZpbGVOYW1lICsgJy5kZXNrdG9wJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KS5jYXRjaChfY2F0Y2hHZW5lcmljRXJyKTtcbn1cblxuZnVuY3Rpb24gX3BhcnNlU2ltcGxlV2luZG93TmFtZSh3bUNsYXNzTmFtZSkge1xuICAgIGNvbnN0IHNwbGl0VmFsdWVzID0gd21DbGFzc05hbWUuc3BsaXQoJy4nKTtcbiAgICBpZiAoc3BsaXRWYWx1ZXNbMV0pIHtcbiAgICAgICAgcmV0dXJuIHNwbGl0VmFsdWVzWzFdO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB3bUNsYXNzTmFtZTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIF9pc0Nocm9tZUFwcChmaWxlTmFtZSkge1xuICAgIHJldHVybiAhIWZpbGVOYW1lLm1hdGNoKC9eY3J4Xy8pO1xufVxuXG5mdW5jdGlvbiBfcGFyc2VDaHJvbWVBcHBEZXNrdG9wRmlsZU5hbWUoZmlsZU5hbWUpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAvLyB3ZSB3YW4ndCB0byBzZWFyY2ggZnJvbSBkZXNrdG9wIGZpbGVzIG9ubHlcbiAgICAgICAgY29uc3QgbG9jYXRlU3RyID0gZmlsZU5hbWUucmVwbGFjZSgnY3J4XycsICcqJykgKyAnKi5kZXNrdG9wJztcbiAgICAgICAgZmluZERlc2t0b3BGaWxlKGxvY2F0ZVN0cilcbiAgICAgICAgICAgIC50aGVuKHJlc29sdmUpXG4gICAgICAgICAgICAuY2F0Y2gocmVqZWN0KTtcbiAgICB9KS5jYXRjaChfY2F0Y2hHZW5lcmljRXJyKTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcbmltcG9ydCB7Q0ZHLCBTRVNTSU9OX0RBVEFfRElSfSBmcm9tICcuL2NvbmZpZyc7XG5pbXBvcnQgKiBhcyBmcyBmcm9tICdmcyc7XG5pbXBvcnQge2dldENvbm5lY3RlZERpc3BsYXlzSWQsIHN0YXJ0UHJvZ3JhbX0gZnJvbSAnLi9vdGhlckNtZCc7XG5pbXBvcnQge2Nsb3NlV2luZG93LCBnZXRYLCBpbml0WDExLCBtb3ZlVG9Xb3Jrc3BhY2UsIHJlc3RvcmVXaW5kb3dQb3NpdGlvbn0gZnJvbSAnLi94MTFXcmFwcGVyJztcbmltcG9ydCB7ZmluZERlc2t0b3BGaWxlLCBnZXRBY3RpdmVXaW5kb3dMaXN0RmxvdywgZ29Ub0ZpcnN0V29ya3NwYWNlfSBmcm9tICcuL21ldGFXcmFwcGVyJztcbmltcG9ydCB7bG9nfSBmcm9tICcuL2xvZyc7XG5pbXBvcnQge1dpbk9ian0gZnJvbSAnLi9tb2RlbCc7XG4vLyBpbXBvcnQgKiBhcyBTdG9yZSBmcm9tICdqZnMnO1xuY29uc3QgU3RvcmUgPSByZXF1aXJlKCdqZnMnKTtcblxuXG4vLyBjcmVhdGUgZGF0YSBzdG9yZVxuY29uc3QgZGIgPSBuZXcgU3RvcmUoU0VTU0lPTl9EQVRBX0RJUiwge3ByZXR0eTogQ0ZHLlNBVkVfU0VTU0lPTl9JTl9QUkVUVFlfRk9STUFUfSk7XG5cblxuLy8gc2V0dXAgbWV0YSB3cmFwcGVyXG5cbi8vIEVYUE9SVFxuLy8gLS0tLS0tXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgbGlzdFNlc3Npb25zLFxuICAgIHJlbmFtZVNlc3Npb24sXG4gICAgc2F2ZVNlc3Npb24sXG4gICAgcmVtb3ZlU2Vzc2lvbixcbiAgICByZXN0b3JlU2Vzc2lvbixcbiAgICBnZXRTZXNzaW9ucyxcbiAgICBnZXRYOiBnZXRYLFxuXG5cbiAgICBnZXRDb25uZWN0ZWREaXNwbGF5c0lkLFxuICAgIHJlc2V0Q2ZnOiAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGNvbmZpZ0ZpbGVQYXRoID0gQ0ZHLkRBVEFfRElSICsgJy9jb25maWcuanNvbic7XG4gICAgICAgIGlmIChmcy5leGlzdHNTeW5jKGNvbmZpZ0ZpbGVQYXRoKSkge1xuICAgICAgICAgICAgZnMudW5saW5rU3luYyhjb25maWdGaWxlUGF0aCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdObyBDb25maWcgcHJlc2VudCBpbiAnICsgY29uZmlnRmlsZVBhdGgpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBnZXRDZmc6ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIENGRztcbiAgICB9LFxuICAgIGdldERiOiAoKSA9PiB7XG4gICAgICAgIHJldHVybiBkYjtcbiAgICB9XG59O1xuXG4vLyBIRUxQRVJcbi8vIC0tLS0tLS0tXG5mdW5jdGlvbiBfY2F0Y2hHZW5lcmljRXJyKGVycikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0dlbmVyaWMgRXJyb3IgaW4gTWFpbiBIYW5kbGVyJywgZXJyLCBlcnIuc3RhY2spO1xuICAgIHRocm93IGVycjtcbn1cblxuZnVuY3Rpb24gZ2V0U2Vzc2lvbnMoKSB7XG4gICAgcmV0dXJuIGRiLmFsbFN5bmMoKTtcbn1cblxuLy8gTUFJTiBGVU5DVElPTlNcbi8vIC0tLS0tLS0tLS0tLS0tXG5mdW5jdGlvbiBsaXN0U2Vzc2lvbnMoKSB7XG4gICAgbGV0IGxpc3QgPSBPYmplY3Qua2V5cyhnZXRTZXNzaW9ucygpKTtcbiAgICBsaXN0LmZvckVhY2goKG5hbWUpID0+IHtcbiAgICAgICAgbG9nKG5hbWUpO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiByZW5hbWVTZXNzaW9uKG9sZE5hbWU6IHN0cmluZywgbmV3TmFtZTogc3RyaW5nKSB7XG4gICAgbGV0IG9iaiA9IGRiLmdldFN5bmMob2xkTmFtZSk7XG4gICAgaWYgKG9iai5tZXNzYWdlKSB7XG4gICAgICAgIGlmIChvYmoubWVzc2FnZSA9PT0gJ2NvdWxkIG5vdCBsb2FkIGRhdGEnKSB7XG4gICAgICAgICAgICBsb2coYEVycm9yOiBDb3VsZCBub3QgZmluZCBhIHNlc3Npb24gbmFtZWQgJyR7b2xkTmFtZX0nYCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsb2cob2JqLm1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZGIuc2F2ZVN5bmMobmV3TmFtZSwgb2JqKTtcbiAgICBkYi5kZWxldGUob2xkTmFtZSk7XG59XG5cbmZ1bmN0aW9uIHNhdmVTZXNzaW9uKHNlc3Npb25OYW1lOiBzdHJpbmcsIGlucHV0SGFuZGxlcnMpOiBQcm9taXNlPGFueT4ge1xuICAgIGNvbnN0IHNlc3Npb25Ub0hhbmRsZSA9IHNlc3Npb25OYW1lIHx8ICdERUZBVUxUJztcblxuICAgIHJldHVybiBpbml0WDExKClcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGdldEFjdGl2ZVdpbmRvd0xpc3RGbG93KCk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKCh3aW5kb3dMaXN0KSA9PiB7XG4gICAgICAgICAgICAvLyBkZXNrdG9wIGZpbGUgcGF0aHMgYW5kIGNvbm5lY3RlZCBkaXNwbGF5IGlkc1xuICAgICAgICAgICAgcmV0dXJuIF9ndWVzc0FuZFNldERlc2t0b3BGaWxlUGF0aHMod2luZG93TGlzdCwgaW5wdXRIYW5kbGVycy5kZXNrdG9wRmlsZVBhdGgpO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbigod2luZG93TGlzdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY29ubmVjdGVkRGlzcGxheXNJZCA9IGdldENvbm5lY3RlZERpc3BsYXlzSWQoKTtcbiAgICAgICAgICAgIHJldHVybiBzYXZlU2Vzc2lvbkZvckRpc3BsYXlUb0RiKHNlc3Npb25Ub0hhbmRsZSwgY29ubmVjdGVkRGlzcGxheXNJZCwgd2luZG93TGlzdCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdzYXZlU2Vzc2lvbigpOiBBbiBlcnJvciBvY2N1cnJlZCcsIGVycik7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH0pO1xufVxuXG5mdW5jdGlvbiBzYXZlU2Vzc2lvbkZvckRpc3BsYXlUb0RiKHNlc3Npb25Ub0hhbmRsZTogc3RyaW5nLCBjb25uZWN0ZWREaXNwbGF5c0lkOiBzdHJpbmcsIHdpbmRvd0xpc3Q6IFdpbk9ialtdKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChmdWxmaWxsLCByZWplY3QpID0+IHtcbiAgICAgICAgLy8gY2hlY2sgaWYgZW50cnkgZXhpc3RzIGFuZCB1cGRhdGVcbiAgICAgICAgZGIuZ2V0KHNlc3Npb25Ub0hhbmRsZSwgKGVyciwgc2Vzc2lvbkRhdGEpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAvLyBOT1RFOiB3ZSdyZSBub3QgZmFpbGluZyBiZWNhdXNlLCB0aGUgY2FzZSBpcyBwcm9iYWJseSB0aGF0IHRoZXJlIGlzIG5vIHNlc3Npb24gZmlsZSB5ZXRcbiAgICAgICAgICAgICAgICBsb2coYHNhdmVTZXNzaW9uRm9yRGlzcGxheVRvRGI6IG5vIHNlc3Npb24gZmlsZSBwcmVzZW50IHlldCBmb3IgXCIke3Nlc3Npb25Ub0hhbmRsZX1cIiwgY3JlYXRpbmcgYSBuZXcgb25lLi4uYCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghc2Vzc2lvbkRhdGEpIHtcbiAgICAgICAgICAgICAgICAvLyBjcmVhdGUgbmV3IG9iamVjdFxuICAgICAgICAgICAgICAgIHNlc3Npb25EYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBzZXNzaW9uVG9IYW5kbGUsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghc2Vzc2lvbkRhdGEuZGlzcGxheXNDb21iaW5hdGlvbnMgfHwgIUFycmF5LmlzQXJyYXkoc2Vzc2lvbkRhdGEuZGlzcGxheXNDb21iaW5hdGlvbnMpKSB7XG4gICAgICAgICAgICAgICAgLy8gY3JlYXRlIG5ldyBhcnJheVxuICAgICAgICAgICAgICAgIHNlc3Npb25EYXRhLmRpc3BsYXlzQ29tYmluYXRpb25zID0gW107XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IGV4aXN0aW5nRGlzcGxheUVudHJ5ID0gc2Vzc2lvbkRhdGEuZGlzcGxheXNDb21iaW5hdGlvbnMuZmluZCgoZW50cnkpID0+IGVudHJ5LmlkID09PSBjb25uZWN0ZWREaXNwbGF5c0lkKTtcbiAgICAgICAgICAgIGlmIChleGlzdGluZ0Rpc3BsYXlFbnRyeSkge1xuICAgICAgICAgICAgICAgIGV4aXN0aW5nRGlzcGxheUVudHJ5LndpbmRvd0xpc3QgPSB3aW5kb3dMaXN0O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZXNzaW9uRGF0YS5kaXNwbGF5c0NvbWJpbmF0aW9ucy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGNvbm5lY3RlZERpc3BsYXlzSWQsXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvd0xpc3QsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRiLnNhdmUoc2Vzc2lvblRvSGFuZGxlLCBzZXNzaW9uRGF0YSwgKGVycikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbG9nKCdTQVZFRCBTRVNTSU9OOiAnICsgc2Vzc2lvblRvSGFuZGxlKTtcbiAgICAgICAgICAgICAgICAgICAgZnVsZmlsbCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gcmVzdG9yZVNlc3Npb24oc2Vzc2lvbk5hbWU6IHN0cmluZywgaXNDbG9zZUFsbE9wZW5XaW5kb3dzOiBib29sZWFuKTogUHJvbWlzZTxhbnk+IHtcbiAgICBjb25zdCBzZXNzaW9uVG9IYW5kbGUgPSBzZXNzaW9uTmFtZSB8fCAnREVGQVVMVCc7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKGZ1bGZpbGwsIHJlamVjdCkgPT4ge1xuICAgICAgICBkYi5nZXQoc2Vzc2lvblRvSGFuZGxlIHx8ICdERUZBVUxUJywgKGVyciwgc2Vzc2lvbkRhdGEpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBzYXZlZFdpbmRvd0xpc3Q7XG5cbiAgICAgICAgICAgIGluaXRYMTEoKVxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jbG9zZUFsbFdpbmRvd3NJZlNldChpc0Nsb3NlQWxsT3BlbldpbmRvd3MpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4oZ29Ub0ZpcnN0V29ya3NwYWNlKVxuICAgICAgICAgICAgICAgIC50aGVuKGdldENvbm5lY3RlZERpc3BsYXlzSWQpXG4gICAgICAgICAgICAgICAgLnRoZW4oKGNvbm5lY3RlZERpc3BsYXlzSWQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzZXNzaW9uRGF0YS5kaXNwbGF5c0NvbWJpbmF0aW9ucykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihgbm8gZGlzcGxheSBjb21iaW5hdGlvbnMgc2F2ZWQgeWV0YCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBkaXNwbGF5RW50cnkgPSBzZXNzaW9uRGF0YS5kaXNwbGF5c0NvbWJpbmF0aW9ucy5maW5kKChlbnRyeSkgPT4gZW50cnkuaWQgPT09IGNvbm5lY3RlZERpc3BsYXlzSWQpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChkaXNwbGF5RW50cnkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNhdmVkV2luZG93TGlzdCA9IGRpc3BsYXlFbnRyeS53aW5kb3dMaXN0O1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihgbm8gZGF0YSBmb3IgY3VycmVudCBkaXNwbGF5IGlkICcke2Nvbm5lY3RlZERpc3BsYXlzSWR9JyBzYXZlZCB5ZXRgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZ2V0QWN0aXZlV2luZG93TGlzdEZsb3coKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKChjdXJyZW50V2luZG93TGlzdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3N0YXJ0U2Vzc2lvblByb2dyYW1zKHNhdmVkV2luZG93TGlzdCwgY3VycmVudFdpbmRvd0xpc3QpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyBnZXRzIGN1cnJlbnQgd2luZG93IGxpc3QgYnkgaXRzZWxmIGFuZCByZXR1cm5zIHRoZSB1cGRhdGVkIHZhcmlhbnRcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF93YWl0Rm9yQWxsQXBwc1RvU3RhcnQoc2F2ZWRXaW5kb3dMaXN0KTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKCh1cGRhdGVkQ3VycmVudFdpbmRvd0xpc3Q6IFdpbk9ialtdKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIF91cGRhdGVXaW5kb3dJZHMoc2F2ZWRXaW5kb3dMaXN0LCB1cGRhdGVkQ3VycmVudFdpbmRvd0xpc3QpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3Jlc3RvcmVXaW5kb3dQb3NpdGlvbnMoc2F2ZWRXaW5kb3dMaXN0KTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbG9nKCdSRVNUT1JFRCBTRVNTSU9OOiAnICsgc2Vzc2lvblRvSGFuZGxlKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0FuIGVycm9yIG9jY3VycmVkJywgZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbihmdWxmaWxsKTtcbiAgICAgICAgfSk7XG4gICAgfSkuY2F0Y2goX2NhdGNoR2VuZXJpY0Vycik7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVNlc3Npb24oc2Vzc2lvbk5hbWU6IHN0cmluZyk6IFByb21pc2U8dW5rbm93bj4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgoZnVsZmlsbCwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGZzLnVubGluayhDRkcuU0VTU0lPTl9EQVRBX0RJUiArICcvJyArIHNlc3Npb25OYW1lICsgJy5qc29uJywgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBmdWxmaWxsKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pLmNhdGNoKF9jYXRjaEdlbmVyaWNFcnIpO1xufVxuXG5mdW5jdGlvbiBfY2xvc2VBbGxXaW5kb3dzSWZTZXQoaXNDbG9zZUFsbDogYm9vbGVhbik6IFByb21pc2U8dW5rbm93bj4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgoZnVsZmlsbCwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGlmIChpc0Nsb3NlQWxsKSB7XG4gICAgICAgICAgICBsb2coJ0Nsb3Npbmcgb3BlbmVkIGFwcGxpY2F0aW9ucycpO1xuICAgICAgICAgICAgZ2V0QWN0aXZlV2luZG93TGlzdEZsb3coKVxuICAgICAgICAgICAgICAgIC50aGVuKChjdXJyZW50V2luZG93TGlzdDogYW55W10pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFdpbmRvd0xpc3QuZm9yRWFjaCgod2luKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbG9zZVdpbmRvdyh3aW4ud2luZG93SWQpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICBfd2FpdEZvckFsbEFwcHNUb0Nsb3NlKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bGZpbGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2gocmVqZWN0KTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaChyZWplY3QpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZnVsZmlsbCgpO1xuICAgICAgICB9XG4gICAgfSkuY2F0Y2goX2NhdGNoR2VuZXJpY0Vycik7XG59XG5cbmZ1bmN0aW9uIF93YWl0Rm9yQWxsQXBwc1RvQ2xvc2UoKTogUHJvbWlzZTx1bmtub3duPiB7XG4gICAgbGV0IHRvdGFsVGltZVdhaXRlZCA9IDA7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChmdWxmaWxsLCByZWplY3QpID0+IHtcbiAgICAgICAgZnVuY3Rpb24gcG9sbEFsbEFwcHNDbG9zZWQoKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBnZXRBY3RpdmVXaW5kb3dMaXN0RmxvdygpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKChjdXJyZW50V2luZG93TGlzdDogV2luT2JqW10pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdGFsVGltZVdhaXRlZCArPSBDRkcuUE9MTF9BTExfQVBQU19TVEFSVEVEX0lOVEVSVkFMO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRXaW5kb3dMaXN0Lmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0b3RhbFRpbWVXYWl0ZWQgPiBDRkcuUE9MTF9BTExfTUFYX1RJTUVPVVQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignUE9MTF9BTExfTUFYX1RJTUVPVVQgcmVhY2hlZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoJ1BPTExfQUxMX01BWF9USU1FT1VUIHJlYWNoZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjYWxsIHJlY3Vyc2l2ZWx5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvbGxBbGxBcHBzQ2xvc2VkKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdWxmaWxsKGN1cnJlbnRXaW5kb3dMaXN0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLmNhdGNoKHJlamVjdCk7XG4gICAgICAgICAgICB9LCBDRkcuUE9MTF9BTExfQVBQU19TVEFSVEVEX0lOVEVSVkFMKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHN0YXJ0IG9uY2UgaW5pdGlhbGx5XG4gICAgICAgIHBvbGxBbGxBcHBzQ2xvc2VkKCk7XG4gICAgfSkuY2F0Y2goX2NhdGNoR2VuZXJpY0Vycik7XG59XG5cbmZ1bmN0aW9uIF93YWl0Rm9yQWxsQXBwc1RvU3RhcnQoc2F2ZWRXaW5kb3dMaXN0KTogUHJvbWlzZTxXaW5PYmpbXSB8IHVua25vd24+IHtcbiAgICBsb2coJ1dhaXRpbmcgZm9yIGFsbCBhcHBsaWNhdGlvbnMgdG8gc3RhcnQuLi4nKTtcblxuICAgIGxldCB0b3RhbFRpbWVXYWl0ZWQgPSAwO1xuICAgIGxldCB0aW1lb3V0O1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChmdWxmaWxsLCByZWplY3QpID0+IHtcbiAgICAgICAgZnVuY3Rpb24gcG9sbEFsbEFwcHNTdGFydGVkKHNhdmVkV2luZG93TGlzdDogV2luT2JqW10sIHRpbWVvdXREdXJhdGlvbiA9IENGRy5QT0xMX0FMTF9BUFBTX1NUQVJURURfSU5URVJWQUwpIHtcblxuICAgICAgICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIGNsZWFyIHRpbWVvdXQgdG8gYmUgc2F2ZVxuICAgICAgICAgICAgICAgIGlmICh0aW1lb3V0KSB7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBnZXRBY3RpdmVXaW5kb3dMaXN0RmxvdygpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKChjdXJyZW50V2luZG93TGlzdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG90YWxUaW1lV2FpdGVkICs9IENGRy5QT0xMX0FMTF9BUFBTX1NUQVJURURfSU5URVJWQUw7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIV9pc0FsbEFwcHNTdGFydGVkKHNhdmVkV2luZG93TGlzdCwgY3VycmVudFdpbmRvd0xpc3QpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRvdGFsVGltZVdhaXRlZCA+IENGRy5QT0xMX0FMTF9NQVhfVElNRU9VVCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdQT0xMX0FMTF9NQVhfVElNRU9VVCByZWFjaGVkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1VuYWJsZSB0byBzdGFydCB0aGUgZm9sbG93aW5nIGFwcHMnLCBfZ2V0Tm90U3RhcnRlZEFwcHMoc2F2ZWRXaW5kb3dMaXN0LCBjdXJyZW50V2luZG93TGlzdCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoJ1BPTExfQUxMX01BWF9USU1FT1VUIHJlYWNoZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjYWxsIHJlY3Vyc2l2ZWx5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvbGxBbGxBcHBzU3RhcnRlZChzYXZlZFdpbmRvd0xpc3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9nKCdBbGwgYXBwbGljYXRpb25zIHN0YXJ0ZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdWxmaWxsKGN1cnJlbnRXaW5kb3dMaXN0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLmNhdGNoKHJlamVjdCk7XG4gICAgICAgICAgICB9LCB0aW1lb3V0RHVyYXRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gc3RhcnQgb25jZSBpbml0aWFsbHlcbiAgICAgICAgcG9sbEFsbEFwcHNTdGFydGVkKHNhdmVkV2luZG93TGlzdCwgNTAwKTtcbiAgICB9KS5jYXRjaChfY2F0Y2hHZW5lcmljRXJyKTtcbn1cblxuZnVuY3Rpb24gX2dldE5vdFN0YXJ0ZWRBcHBzKHNhdmVkV2luZG93TGlzdDogV2luT2JqW10sIGN1cnJlbnRXaW5kb3dMaXN0OiBXaW5PYmpbXSk6IFdpbk9ialtdIHtcbiAgICBsZXQgbm9uU3RhcnRlZEFwcHMgPSBbXTtcbiAgICBzYXZlZFdpbmRvd0xpc3QuZm9yRWFjaCgod2luKSA9PiB7XG4gICAgICAgIGlmICghX2dldE1hdGNoaW5nV2luZG93SWQod2luLCBjdXJyZW50V2luZG93TGlzdCkpIHtcbiAgICAgICAgICAgIG5vblN0YXJ0ZWRBcHBzLnB1c2god2luKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBub25TdGFydGVkQXBwcztcbn1cblxuZnVuY3Rpb24gX2lzQWxsQXBwc1N0YXJ0ZWQoc2F2ZWRXaW5kb3dMaXN0OiBXaW5PYmpbXSwgY3VycmVudFdpbmRvd0xpc3Q6IFdpbk9ialtdKTogYm9vbGVhbiB7XG4gICAgbGV0IGlzQWxsU3RhcnRlZCA9IHRydWU7XG4gICAgY29uc3QgY3VycmVudFdpbmRvd0xpc3RDb3B5ID0gY3VycmVudFdpbmRvd0xpc3Quc2xpY2UoMCk7XG4gICAgc2F2ZWRXaW5kb3dMaXN0LmZvckVhY2goKHdpbikgPT4ge1xuICAgICAgICBpZiAoIV9nZXRNYXRjaGluZ1dpbmRvd0lkKHdpbiwgY3VycmVudFdpbmRvd0xpc3RDb3B5KSkge1xuICAgICAgICAgICAgaXNBbGxTdGFydGVkID0gZmFsc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IGN1cnJlbnRXaW5kb3dMaXN0Q29weS5maW5kSW5kZXgoKHdpbkZyb21DdXJyZW50KSA9PiB3aW4ud21DbGFzc05hbWUgPT09IHdpbkZyb21DdXJyZW50LndtQ2xhc3NOYW1lKTtcbiAgICAgICAgICAgIGN1cnJlbnRXaW5kb3dMaXN0Q29weS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGlzQWxsU3RhcnRlZDtcbn1cblxuYXN5bmMgZnVuY3Rpb24gX2d1ZXNzQW5kU2V0RGVza3RvcEZpbGVQYXRocyh3aW5kb3dMaXN0OiBXaW5PYmpbXSwgaW5wdXRIYW5kbGVyKTogUHJvbWlzZTxXaW5PYmpbXT4ge1xuICAgIGNvbnN0IHByb21pc2VzID0gd2luZG93TGlzdC5tYXAoKHdpbikgPT4gX2d1ZXNzRmlsZVBhdGgod2luLCBpbnB1dEhhbmRsZXIpKTtcblxuICAgIGZvciAoY29uc3QgcHJvbWlzZSBvZiBwcm9taXNlcykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgYXdhaXQgcHJvbWlzZTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgX2NhdGNoR2VuZXJpY0VycihlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gd2luZG93TGlzdDtcbn1cblxuZnVuY3Rpb24gX2d1ZXNzRmlsZVBhdGgod2luOiBXaW5PYmosIGlucHV0SGFuZGxlcik6IFByb21pc2U8c3RyaW5nIHwgdW5rbm93bj4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgoZnVsZmlsbCwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGZ1bmN0aW9uIGNhbGxJbnB1dEhhbmRsZXIoZXJyb3I/LCBzdGRvdXQ/KSB7XG4gICAgICAgICAgICBpbnB1dEhhbmRsZXIoZXJyb3IsIHdpbiwgc3Rkb3V0KVxuICAgICAgICAgICAgICAgIC50aGVuKChpbnB1dCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoX2lzRGVza3RvcEZpbGUod2luLmV4ZWN1dGFibGVGaWxlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2luLmRlc2t0b3BGaWxlUGF0aCA9IGlucHV0O1xuICAgICAgICAgICAgICAgICAgICAgICAgZnVsZmlsbCh3aW4uZGVza3RvcEZpbGVQYXRoKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbi5leGVjdXRhYmxlRmlsZSA9IGlucHV0O1xuICAgICAgICAgICAgICAgICAgICAgICAgZnVsZmlsbCh3aW4uZXhlY3V0YWJsZUZpbGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2gocmVqZWN0KTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgaWYgKF9pc0Rlc2t0b3BGaWxlKHdpbi5leGVjdXRhYmxlRmlsZSkpIHtcbiAgICAgICAgICAgIGZpbmREZXNrdG9wRmlsZSh3aW4uZXhlY3V0YWJsZUZpbGUpXG4gICAgICAgICAgICAgICAgLnRoZW4oKHN0ZG91dCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjYWxsSW5wdXRIYW5kbGVyKG51bGwsIHN0ZG91dCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goY2FsbElucHV0SGFuZGxlcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWxsSW5wdXRIYW5kbGVyKHRydWUsIHdpbi5leGVjdXRhYmxlRmlsZSk7XG4gICAgICAgIH1cbiAgICB9KS5jYXRjaChfY2F0Y2hHZW5lcmljRXJyKTtcbn1cblxuLy8gVE9ETyBjaGVjayBmb3IgaG93IG1hbnkgaW5zdGFuY2VzIHRoZXJlIHNob3VsZCBiZSBydW5uaW5nIG9mIGEgcHJvZ3JhbVxuYXN5bmMgZnVuY3Rpb24gX3N0YXJ0U2Vzc2lvblByb2dyYW1zKHdpbmRvd0xpc3Q6IFdpbk9ialtdLCBjdXJyZW50V2luZG93TGlzdDogV2luT2JqW10pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAvLyBzZXQgaW5zdGFuY2VzIHN0YXJ0ZWQgdG8gMFxuICAgIHdpbmRvd0xpc3QuZm9yRWFjaCgod2luKSA9PiB3aW4uaW5zdGFuY2VzU3RhcnRlZCA9IDApO1xuICAgIGNvbnN0IHByb21pc2VzID0gd2luZG93TGlzdFxuICAgICAgICAuZmlsdGVyKCh3aW4pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG51bWJlck9mSW5zdGFuY2VzT2ZXaW4gPSBfZ2V0TnVtYmVyT2ZJbnN0YW5jZXNUb1J1bih3aW4sIHdpbmRvd0xpc3QpO1xuICAgICAgICAgICAgcmV0dXJuICghX2lzUHJvZ3JhbUFscmVhZHlSdW5uaW5nKHdpbi53bUNsYXNzTmFtZSwgY3VycmVudFdpbmRvd0xpc3QsIG51bWJlck9mSW5zdGFuY2VzT2ZXaW4sIHdpbi5pbnN0YW5jZXNTdGFydGVkKSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5tYXAoKHdpbikgPT4ge1xuICAgICAgICAgICAgd2luLmluc3RhbmNlc1N0YXJ0ZWQgKz0gMTtcbiAgICAgICAgICAgIHJldHVybiBzdGFydFByb2dyYW0od2luLmV4ZWN1dGFibGVGaWxlLCB3aW4uZGVza3RvcEZpbGVQYXRoKTtcbiAgICAgICAgfSk7XG5cbiAgICBhd2FpdCBQcm9taXNlLmFsbChwcm9taXNlcyk7XG59XG5cbmZ1bmN0aW9uIF9nZXROdW1iZXJPZkluc3RhbmNlc1RvUnVuKHdpbmRvd1RvTWF0Y2g6IFdpbk9iaiwgd2luZG93TGlzdDogV2luT2JqW10pOiBudW1iZXIge1xuICAgIHJldHVybiB3aW5kb3dMaXN0LmZpbHRlcigod2luKSA9PiB7XG4gICAgICAgIHJldHVybiB3aW4ud21DbGFzc05hbWUgPT09IHdpbmRvd1RvTWF0Y2gud21DbGFzc05hbWU7XG4gICAgfSkubGVuZ3RoO1xufVxuXG5mdW5jdGlvbiBfaXNQcm9ncmFtQWxyZWFkeVJ1bm5pbmcod21DbGFzc05hbWU6IHN0cmluZywgY3VycmVudFdpbmRvd0xpc3Q6IFdpbk9ialtdLCBudW1iZXJPZkluc3RhbmNlc1RvUnVuOiBudW1iZXIsIGluc3RhbmNlc1N0YXJ0ZWQ6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIGlmICghbnVtYmVyT2ZJbnN0YW5jZXNUb1J1bikge1xuICAgICAgICBudW1iZXJPZkluc3RhbmNlc1RvUnVuID0gMTtcbiAgICB9XG5cbiAgICBpZiAoIWluc3RhbmNlc1N0YXJ0ZWQpIHtcbiAgICAgICAgaW5zdGFuY2VzU3RhcnRlZCA9IDA7XG4gICAgfVxuXG4gICAgbGV0IGluc3RhbmNlc1J1bm5pbmcgPSAwO1xuICAgIGN1cnJlbnRXaW5kb3dMaXN0LmZvckVhY2goKHdpbikgPT4ge1xuICAgICAgICBpZiAod2luLndtQ2xhc3NOYW1lID09PSB3bUNsYXNzTmFtZSkge1xuICAgICAgICAgICAgaW5zdGFuY2VzUnVubmluZysrO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgbG9nKCdTdGF0dXM6IFwiJyArIHdtQ2xhc3NOYW1lICsgJ1wiIGlzIHJ1bm5pbmc6JywgKGluc3RhbmNlc1J1bm5pbmcgKyBpbnN0YW5jZXNTdGFydGVkID49IG51bWJlck9mSW5zdGFuY2VzVG9SdW4pLCBudW1iZXJPZkluc3RhbmNlc1RvUnVuLCBpbnN0YW5jZXNTdGFydGVkKTtcbiAgICByZXR1cm4gaW5zdGFuY2VzUnVubmluZyArIGluc3RhbmNlc1N0YXJ0ZWQgPj0gbnVtYmVyT2ZJbnN0YW5jZXNUb1J1bjtcbn1cblxuZnVuY3Rpb24gX2lzRGVza3RvcEZpbGUoZXhlY3V0YWJsZUZpbGU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBleGVjdXRhYmxlRmlsZSAmJiAhIWV4ZWN1dGFibGVGaWxlLm1hdGNoKC9kZXNrdG9wJC8pO1xufVxuXG5mdW5jdGlvbiBfdXBkYXRlV2luZG93SWRzKHNhdmVkV2luZG93TGlzdDogV2luT2JqW10sIGN1cnJlbnRXaW5kb3dMaXN0OiBXaW5PYmpbXSkge1xuICAgIGNvbnN0IHdtQ2xhc3NOYW1lTWFwID0ge307XG4gICAgc2F2ZWRXaW5kb3dMaXN0LmZvckVhY2goKHdpbikgPT4ge1xuICAgICAgICBpZiAoIXdtQ2xhc3NOYW1lTWFwW3dpbi53bUNsYXNzTmFtZV0pIHtcbiAgICAgICAgICAgIHdtQ2xhc3NOYW1lTWFwW3dpbi53bUNsYXNzTmFtZV0gPSBfZ2V0TWF0Y2hpbmdXaW5kb3dzKHdpbiwgY3VycmVudFdpbmRvd0xpc3QpO1xuICAgICAgICB9XG5cbiAgICAgICAgd2luLndpbmRvd0lkID0gd21DbGFzc05hbWVNYXBbd2luLndtQ2xhc3NOYW1lXVswXS53aW5kb3dJZDtcbiAgICAgICAgd2luLndpbmRvd0lkRGVjID0gcGFyc2VJbnQod2luLndpbmRvd0lkLCAxNik7XG5cbiAgICAgICAgLy8gcmVtb3ZlIGZpcnN0IGVudHJ5XG4gICAgICAgIHdtQ2xhc3NOYW1lTWFwW3dpbi53bUNsYXNzTmFtZV0uc2hpZnQoKTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gX2dldE1hdGNoaW5nV2luZG93SWQod2luOiBXaW5PYmosIGN1cnJlbnRXaW5kb3dMaXN0OiBXaW5PYmpbXSk6IHN0cmluZyB7XG4gICAgY29uc3QgY3VycmVudFdpbmRvdyA9IGN1cnJlbnRXaW5kb3dMaXN0LmZpbmQoKHdpbkZyb21DdXJyZW50KSA9PiB3aW4ud21DbGFzc05hbWUgPT09IHdpbkZyb21DdXJyZW50LndtQ2xhc3NOYW1lKTtcbiAgICByZXR1cm4gY3VycmVudFdpbmRvdyAmJiBjdXJyZW50V2luZG93LndpbmRvd0lkO1xufVxuXG5mdW5jdGlvbiBfZ2V0TWF0Y2hpbmdXaW5kb3dzKHdpbjogV2luT2JqLCBjdXJyZW50V2luZG93TGlzdDogV2luT2JqW10pOiBXaW5PYmpbXSB7XG4gICAgcmV0dXJuIGN1cnJlbnRXaW5kb3dMaXN0LmZpbHRlcigod2luRnJvbUN1cnJlbnQpID0+IHdpbi53bUNsYXNzTmFtZSA9PT0gd2luRnJvbUN1cnJlbnQud21DbGFzc05hbWUpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBfcmVzdG9yZVdpbmRvd1Bvc2l0aW9ucyhzYXZlZFdpbmRvd0xpc3Q6IFdpbk9ialtdKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgcHJvbWlzZXMgPSBbXTtcbiAgICBzYXZlZFdpbmRvd0xpc3QuZm9yRWFjaCgod2luKSA9PiB7XG4gICAgICAgIHByb21pc2VzLnB1c2gocmVzdG9yZVdpbmRvd1Bvc2l0aW9uKHdpbikpO1xuICAgICAgICBwcm9taXNlcy5wdXNoKG1vdmVUb1dvcmtzcGFjZSh3aW4ud2luZG93SWQsIHdpbi53bUN1cnJlbnREZXNrdG9wTnIpKTtcbiAgICB9KTtcblxuXG4gICAgZm9yIChjb25zdCBwcm9taXNlIG9mIHByb21pc2VzKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCBwcm9taXNlO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBfY2F0Y2hHZW5lcmljRXJyKGUpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl0sIm5hbWVzIjpbImZzLm1rZGlyU3luYyIsImZzLnJlYWRGaWxlU3luYyIsImZzLndyaXRlRmlsZVN5bmMiLCJzcGF3biIsImZzLmV4aXN0c1N5bmMiLCJmcy51bmxpbmtTeW5jIiwiX2NhdGNoR2VuZXJpY0VyciIsImZzLnVubGluayJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztTQUdnQixTQUFTLENBQUMsT0FBTztJQUM3QixJQUFJO1FBQ0FBLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUN6QjtJQUFDLE9BQU8sR0FBRyxFQUFFO1FBQ1YsSUFBSSxHQUFHLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRTtZQUN2QixNQUFNLEdBQUcsQ0FBQztTQUNiO0tBQ0o7Q0FDSjtBQUVELFNBa0JnQixTQUFTO0lBQUMsaUJBQVU7U0FBVixVQUFVLEVBQVYscUJBQVUsRUFBVixJQUFV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
