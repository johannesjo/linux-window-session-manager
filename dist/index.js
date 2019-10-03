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
    ],
    "CMD": {
        "GET_DISPLAY_ID": "xrandr --query | grep '[^s]connected '",
        "XPROP_ID": "xprop -id"
    }
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
    cfg = JSON.parse(fs.readFileSync(CFG_FILE_PATH, 'utf8'));
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
//# sourceMappingURL=config.js.map

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

// 500kb
var MAX_BUFFER = 1024 * 500;
var EXEC_OPTS = {
    maxBuffer: MAX_BUFFER,
};
// display
// -------
function getConnectedDisplaysId() {
    var cmd = CFG.CMD.GET_DISPLAY_ID;
    return new Promise(function (fulfill, reject) {
        child_process.exec(cmd, EXEC_OPTS, function (error, stdout, stderr) {
            if (error || stderr) {
                console.error(error, stderr);
                reject(error || stderr);
            }
            else {
                var connectedDisplaysId = _parseConnectedDisplaysId(stdout);
                fulfill(connectedDisplaysId);
            }
        });
    }).catch(_catchGenericErr);
}
function _parseConnectedDisplaysId(stdout) {
    var idString = '';
    var RESOLUTION_REG_EX = /[0-9]{3,5}x[0-9]{3,5}/;
    var lines = stdout.split('\n');
    lines.forEach(function (line) {
        if (line !== '') {
            var resolution = RESOLUTION_REG_EX.exec(line);
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
function getAdditionalMetaDataForWin(win) {
    var tmpWin = __assign({}, win);
    return new Promise(function (fulfill, reject) {
        child_process.exec(CFG.CMD.XPROP_ID + " " + tmpWin.windowId, EXEC_OPTS, function (error, stdout, stderr) {
            if (error || stderr) {
                console.error(tmpWin, error, stderr);
                reject(error || stderr);
            }
            else {
                var lines = stdout.split('\n');
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
                        tmpWin[propertyNameFromMap_1] = className_1.substr(0, className_1.length - 1);
                    }
                    // parse states
                    else if (propertyName === '_NET_WM_STATE(ATOM)') {
                        var states = value.split(', ');
                        tmpWin.states = [];
                        states.forEach(function (state) {
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
                        }
                        else {
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
                case 0: return [4 /*yield*/, _getActiveWindowIds()];
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
function _getActiveWindowIds() {
    var cmd = 'xprop -root|grep ^_NET_CLIENT_LIST\\(WINDOW\\)';
    return new Promise(function (fulfill, reject) {
        child_process.exec(cmd, EXEC_OPTS, function (error, stdout, stderr) {
            if (error || stderr) {
                console.error('xprop', error, stderr);
                reject(error || stderr);
            }
            else {
                var windowIds = _parseWindowIds(stdout);
                fulfill(windowIds);
            }
        });
    }).catch(_catchGenericErr);
}
function _parseWindowIds(stdout) {
    var str = stdout.replace('_NET_CLIENT_LIST(WINDOW): window id #', '');
    return str.split(', ');
}
function _isExcludedWmClassName(wmClassName) {
    return CFG.WM_CLASS_EXCLUSIONS.indexOf(wmClassName) > -1;
}
function _catchGenericErr(err) {
    console.error('otherCmd: Generic Error', err, err.stack);
    log('otherCmd:', arguments);
}
//# sourceMappingURL=otherCmd.js.map

var x11 = require('x11');
var X;
var root;
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
        x11.createClient(function (err, display) {
            if (err) {
                reject(err);
            }
            else {
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
// HELPER
// ------
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
//# sourceMappingURL=x11Wrapper.js.map

var findup = require('findup-sync');
var HOME_DIR = process.env['HOME'];
var DEFAULT_DESKTOP_FILE_LOCATIONS = [
    '{home}/.local/share/applications',
    '{home}/.gnome/apps/',
    '/usr/share/applications',
    '/usr/local/share/applications',
    '/usr/share/app-install',
];
function _catchGenericErr$1(err) {
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
    }).catch(_catchGenericErr$1);
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
    }); }).catch(_catchGenericErr$1);
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
    }); }).catch(_catchGenericErr$1);
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
    }).catch(_catchGenericErr$1);
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
    }).catch(_catchGenericErr$1);
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
function _catchGenericErr$2(err) {
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
        return Promise.all([
            _guessAndSetDesktopFilePaths(windowList, inputHandlers.desktopFilePath),
            getConnectedDisplaysId(),
        ]);
    })
        .then(function (results) {
        var windowList = results[0];
        var connectedDisplaysId = results[1];
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
    }).catch(_catchGenericErr$2);
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
    }).catch(_catchGenericErr$2);
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
    }).catch(_catchGenericErr$2);
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
    }).catch(_catchGenericErr$2);
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
    }).catch(_catchGenericErr$2);
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
                    _catchGenericErr$2(e_1);
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
    }).catch(_catchGenericErr$2);
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
                    _catchGenericErr$2(e_2);
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
