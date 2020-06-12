'use strict';

var fs = require('fs');
var path = require('path');
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
        if (err.code !== "EEXIST") {
            throw err;
        }
    }
}
function mergeDeep() {
    var objects = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        objects[_i] = arguments[_i];
    }
    var isObject = function (obj) { return obj && typeof obj === "object"; };
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
function movedir(from, to) {
    mkdirSync(to);
    var contents = fs.readdirSync(from);
    for (var _i = 0, contents_1 = contents; _i < contents_1.length; _i++) {
        var element = contents_1[_i];
        var from_element = path.join(from, element);
        var to_element = path.join(to, element);
        if (fs.lstatSync(from_element).isDirectory()) {
            movedir(from_element, to_element);
        }
        else {
            fs.copyFileSync(from_element, to_element);
            fs.unlinkSync(from_element);
        }
    }
    fs.rmdirSync(from);
}
//# sourceMappingURL=utility.js.map

var DEFAULT_CFG = {
    GIVE_X11_TIME_TIMEOUT: 80,
    POLL_ALL_APPS_STARTED_INTERVAL: 2000,
    POLL_ALL_MAX_TIMEOUT: 120000,
    SAVE_SESSION_IN_PRETTY_FORMAT: true,
    WM_CLASS_AND_EXECUTABLE_FILE_MAP: {
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
        "microsoft teams - preview.Microsoft Teams - Preview": "teams.desktop"
    },
    WM_CLASS_EXCLUSIONS: [
        "N/A",
        "tilda.Tilda",
        "Popup.desktop",
        "update-manager.Update-manager",
        "desktop_window.Nautilus",
        "electron.Electron",
        "guake.Main.py",
        "gnome-software.Gnome-software"
    ],
    WM_META_MAP: {
        "WM_WINDOW_ROLE(STRING)": "wmRole",
        "WM_CLASS(STRING)": "wmClassName",
        "_NET_WM_STATE(ATOM)": "states",
        "_NET_WM_DESKTOP(CARDINAL)": "wmCurrentDesktopNr",
        "WM_NAME(UTF8_STRING)": "wmTitle",
        "_NET_WM_PID(CARDINAL)": "wmPid",
        "_NET_WM_WINDOW_TYPE(ATOM)": "wmType",
        "_BAMF_DESKTOP_FILE(STRING)": "executableFile"
    },
    WM_META_MAP_NUMBER_TYPES: [
        "_NET_WM_PID(CARDINAL)",
        "_NET_WM_DESKTOP(CARDINAL)"
    ],
    DESKTOP_FILE_LOCATIONS: [
        "{home}/.local/share/applications",
        "{home}/.gnome/apps",
        "/usr/share/applications",
        "/usr/local/share/applications",
        "/usr/share/app-install",
        "{home}/.config/autostart",
        "/var/lib/snapd/desktop/applications",
        "/var/lib/flatpak/app",
        "/var/lib/flatpak/exports/share/applications",
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
var CFG_DATA_DIR_LEGACY = _getUserHome() + "/.lwsm";
var CFG_DATA_DIR = _getUserHome() + "/.config/lwsm";
var CFG_FILE_PATH = CFG_DATA_DIR + "/config.json";
var SESSION_DATA_DIR = CFG_DATA_DIR + "/sessionData";
// INIT
// ------------
try {
    // if CFG_DATA_DIR_LEGACY exists, move it to CFG_DATA_DIR
    if (fs.existsSync(CFG_DATA_DIR_LEGACY)) {
        if (!fs.existsSync(CFG_DATA_DIR)) {
            movedir(CFG_DATA_DIR_LEGACY, CFG_DATA_DIR);
            log("lwsm: moved config directory " + CFG_DATA_DIR_LEGACY + " to " + CFG_DATA_DIR);
        }
        else {
            log("lwsm: ignored legacy config directory " + CFG_DATA_DIR_LEGACY);
        }
    }
    // if config is already in place
    var fromFile = JSON.parse(fs.readFileSync(CFG_FILE_PATH, "utf8"));
    cfg = mergeDeep(DEFAULT_CFG, fromFile);
}
catch (e) {
    log("lwsm: no config file present or it contains invalid json. Creating new one...");
    // if there is no config yet load default cfg and create files and dirs
    cfg = DEFAULT_CFG;
    // save executable paths to cfg
    cfg.CMD_JSFILE_PATH = __dirname + "/../cmd.js";
    cfg.JSFILE_INDEX_PATH = __dirname + "/index.js";
    mkdirSync(CFG_DATA_DIR);
    mkdirSync(SESSION_DATA_DIR);
    // write config to user dir
    fs.writeFileSync(CFG_FILE_PATH, JSON.stringify(cfg, null, 2), "utf8");
}
// also make data dirs accessible to the outside
cfg.DATA_DIR = CFG_DATA_DIR;
cfg.SESSION_DATA_DIR = SESSION_DATA_DIR;
var CFG = cfg;
function _getUserHome() {
    return process.env[process.platform === "win32" ? "USERPROFILE" : "HOME"];
}
//# sourceMappingURL=config.js.map

var IS_DEBUG = process.argv.indexOf("--debug") > -1;
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
            currentQuotationArg += " " + arg.slice(0, arg.length - 1);
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
            currentQuotationArg += " " + arg;
        }
        else if (arg !== "") {
            newArgs.push(arg);
        }
    });
    return newArgs;
}
//# sourceMappingURL=parseCmdToSpawn.js.map

var x11 = require("x11");
var X;
var root;
var display;
// export const getWindowInfo = wrapX11(_getWindowInfo);
var getX = function () { return X; };
function catchGenericErr(err) {
    console.error("x11Wrapper: ", err, err.stack);
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
        x11
            .createClient(function (err, displayIn) {
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
        })
            .on("error", function (err) {
            console.error(err);
        });
    }).catch(catchGenericErr);
    return initPromise;
}
// METHODS
// -------
function getDisplays() {
    if (!display) {
        throw new Error("X11 not initialized / No screen available");
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
                    PROP_NAME = "_NET_CLIENT_LIST";
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
        "_NET_WM_STATE_MAXIMIZED_VERT",
        "_NET_WM_STATE_MAXIMIZED_HORZ"
    ];
    return new Promise(function (fulfill, reject) {
        setState(win.windowId, "remove", STATES_TO_RESET)
            .catch(reject)
            .then(function () {
            X.MoveResizeWindow(win.windowId, win.x, win.y, win.width, win.height);
            setState(win.windowId, "add", win.states)
                .catch(reject)
                .then(function () {
                fulfill();
            });
        })
            .catch(reject);
    }).catch(catchGenericErr);
}
function closeWindow(winId) {
    return _sendX11ClientMessage(winId, "_NET_CLOSE_WINDOW");
}
function moveToWorkspace(winId, workSpaceNr) {
    // NOTE: if it doesn't work we might also want to use _WIN_WORKSPACE
    return _sendX11ClientMessage(winId, "_NET_WM_DESKTOP", [
        {
            value: workSpaceNr
        }
    ]);
}
function goToViewport(x, y) {
    return _sendX11ClientMessage(root, "_NET_DESKTOP_VIEWPORT", [
        { value: x },
        { value: y }
    ]);
}
function setState(wid, actionStr, statesToHandle) {
    var ACTIONS_MAP = {
        remove: 0,
        add: 1,
        toggle: 2
    };
    var action = ACTIONS_MAP[actionStr];
    var properties = [{ value: action }];
    // all properties need to be looked up for their atom id
    if (Array.isArray(statesToHandle) && statesToHandle.length > 0) {
        statesToHandle.forEach(function (stateProperty) {
            properties.push({
                isAtom: true,
                value: stateProperty
            });
        });
        return _sendX11ClientMessage(wid, "_NET_WM_STATE", properties);
    }
    else {
        return Promise.resolve();
    }
}
var PROPS_TO_GET = [
    "WM_CLASS",
    "_NET_WM_STATE",
    "_NET_WM_DESKTOP",
    "WM_NAME",
    "_NET_WM_PID",
    "_NET_WM_WINDOW_TYPE",
    "_BAMF_DESKTOP_FILE"
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
                                                    resolve(propName + "(" + typeName + ") = " + decodedData);
                                                    return [3 /*break*/, 6];
                                                case 5:
                                                    resolve("");
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
                            return results.join("\n");
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
        fn.apply(X, __spreadArrays(args, [
            function (err, res) {
                return err ? reject(err) : fulfill(res);
            }
        ]));
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
        throw "only supports 4 properties at once max";
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
                        case "STRING": return [3 /*break*/, 1];
                        case "ATOM": return [3 /*break*/, 2];
                        case "CARDINAL": return [3 /*break*/, 4];
                        case "INTEGER": return [3 /*break*/, 4];
                        case "WINDOW": return [3 /*break*/, 5];
                    }
                    return [3 /*break*/, 6];
                case 1:
                    {
                        result = [];
                        s = "";
                        for (i = 0; i < data.length; ++i) {
                            if (data[i] == 0) {
                                result.push(s);
                                s = "";
                                continue;
                            }
                            s += String.fromCharCode(data[i]);
                        }
                        result.push(s);
                        return [2 /*return*/, result.map(quotize).join(", ")];
                    }
                case 2:
                    if (data.length > 32) {
                        return [2 /*return*/, "LOOOOOOOOOOOOOOOOOOOOOOOOOOOOOONG"];
                    }
                    promises = [];
                    for (i = 0; i < data.length; i += 4) {
                        a = data.unpack("L", i)[0];
                        promises.push(_xCbToPromise(X.GetAtomName, a));
                    }
                    return [4 /*yield*/, Promise.all(promises).then(function (res) {
                            return res.join(", ");
                        })];
                case 3: return [2 /*return*/, _b.sent()];
                case 4:
                    {
                        res_1 = [];
                        for (i = 0; i < data.length; i += 4) {
                            res_1.push(data.unpack("L", i)[0]);
                        }
                        return [2 /*return*/, res_1.join(", ")];
                    }
                case 5:
                    res = [];
                    for (i = 0; i < data.length; i += 4) {
                        res.push(data.unpack("L", i)[0]);
                    }
                    return [2 /*return*/, ("window id# " +
                            res
                                .map(function (n) {
                                return "0x" + n.toString(16);
                            })
                                .join(", "))];
                case 6: return [2 /*return*/, "WTF " + type];
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
    return '"' + i + '"';
}
function _parseWindowIds(strIn) {
    var str = strIn.replace("window id# ", "");
    return str.split(", ");
}
//# sourceMappingURL=x11Wrapper.js.map

// display
// -------
function getConnectedDisplaysId() {
    var displays = getDisplays();
    return displays
        .map(function (screen) { return screen.pixel_width + "x" + screen.pixel_height; })
        .join(";");
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
                    lines = stdout.split("\n");
                    winCopy = __assign({}, win);
                    lines.forEach(function (line) {
                        var words = line.split(" ");
                        var propertyName = words[0];
                        // remove property name and "="
                        words.splice(0, 2);
                        var value = words.join(" ");
                        var propertyNameFromMap = CFG.WM_META_MAP[propertyName];
                        // parse wmClassName
                        if (propertyName === "WM_CLASS(STRING)") {
                            var propertyNameFromMap_1 = CFG.WM_META_MAP[propertyName];
                            var classNames = value.split(", ");
                            var className_1 = "";
                            classNames.forEach(function (state) {
                                if (state !== "") {
                                    className_1 += state.replace(/"/g, "") + ".";
                                }
                            });
                            winCopy[propertyNameFromMap_1] = className_1.substr(0, className_1.length - 2);
                        }
                        // parse states
                        else if (propertyName === "_NET_WM_STATE(ATOM)") {
                            var states = value.split(", ");
                            winCopy.states = [];
                            states.forEach(function (state) {
                                if (state !== "") {
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
    IS_DEBUG &&
        console.log("DEBUG: startProgram():", executableFile, desktopFilePath);
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
            stdio: "ignore",
            detached: true
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
                            windowIdDec: parseInt(windowId, 16)
                        });
                    });
                    promises = windowList.map(function (win) { return getAdditionalMetaDataForWin(win); });
                    return [4 /*yield*/, Promise.all(promises)];
                case 2:
                    windowsWithData = (_a.sent());
                    IS_DEBUG && console.log("DEBUG: getActiveWindowList():", windowList);
                    return [2 /*return*/, windowsWithData.filter(_filterInvalidWindows)];
            }
        });
    });
}
function _filterInvalidWindows(win) {
    // filter none normal windows, excluded class names and incomplete windows
    // NOTE: if there is no type we assume it's normal too
    var isNormalWindow = (!win.wmType || win.wmType.includes("_NET_WM_WINDOW_TYPE_NORMAL")) &&
        (!win.wmRole || win.wmRole !== "pop-up");
    var isNotExcluded = !_isExcludedWmClassName(win.wmClassName);
    var hasWmClassName = !!win.wmClassName;
    // warn if no wmClassName even though there should be
    if (isNormalWindow && isNotExcluded && !hasWmClassName) {
        console.warn(win.windowId + " has no wmClassName. Win: ", win);
    }
    return isNormalWindow && isNotExcluded && hasWmClassName;
}
function _isExcludedWmClassName(wmClassName) {
    return CFG.WM_CLASS_EXCLUSIONS.indexOf(wmClassName) > -1;
}
//# sourceMappingURL=otherCmd.js.map

var findup = require("findup-sync");
var HOME_DIR = process.env["HOME"];
var DEFAULT_DESKTOP_FILE_LOCATIONS = [
    "{home}/.local/share/applications",
    "{home}/.gnome/apps/",
    "/usr/share/applications",
    "/usr/local/share/applications",
    "/usr/share/app-install"
];
function _catchGenericErr(err) {
    console.error("Generic Error in Meta Wrapper", err, err.stack);
    throw err;
}
function goToFirstWorkspace() {
    return goToViewport(0, 0);
}
function findDesktopFile(fileName) {
    return new Promise(function (fulfill, reject) {
        var desktopFileLocations = CFG.DESKTOP_FILE_LOCATIONS || DEFAULT_DESKTOP_FILE_LOCATIONS;
        var parentDirs = desktopFileLocations.map(function (parentDir) {
            return parentDir.replace("{home}", HOME_DIR);
        });
        var firstFile;
        var match = parentDirs.find(function (dir) {
            firstFile = findup(fileName, { cwd: dir });
            if (!firstFile) {
                // snap desktop files now look like this => firefox_firefox.desktop
                firstFile = findup("" + fileName.replace(".desktop", "_") + fileName, {
                    cwd: dir
                });
            }
            return firstFile;
        });
        if (!firstFile || !match) {
            var err = "ERR: findDesktopFile() cant find file \"" + fileName + "\"! Searched desktopFileLocations:";
            console.error(err, desktopFileLocations);
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
            return [2 /*return*/, getActiveWindowList().then(function (windowList) { return __awaiter(_this, void 0, void 0, function () {
                    var promises, _i, promises_1, promise, e_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                promises = windowList.map(function (win) {
                                    return getWindowGeometry(win.windowId).then(function (geo) {
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
                                _addParsedExecutableFilesFromWmClassNames(windowList).then(function (windowListWithWmClassNames) {
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
                    promises = windowList
                        .filter(function (win) { return !win.executableFile; })
                        .map(function (win) {
                        return _parseExecutableFileFromWmClassName(win.wmClassName).then(function (fileName) {
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
            var splitValues = wmClassName.split(".");
            var fileName = splitValues[0];
            if (_isChromeApp(fileName)) {
                _parseChromeAppDesktopFileName(fileName)
                    .then(fulfill)
                    .catch(reject);
            }
            else {
                fulfill(fileName + ".desktop");
            }
        }
    }).catch(_catchGenericErr);
}
function _parseSimpleWindowName(wmClassName) {
    var splitValues = wmClassName.split(".");
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
        var locateStr = fileName.replace("crx_", "*") + "*.desktop";
        findDesktopFile(locateStr)
            .then(resolve)
            .catch(reject);
    }).catch(_catchGenericErr);
}
//# sourceMappingURL=metaWrapper.js.map

// import * as Store from 'jfs';
var Store = require("jfs");
// create data store
var db = new Store(SESSION_DATA_DIR, {
    pretty: CFG.SAVE_SESSION_IN_PRETTY_FORMAT
});
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
        var configFilePath = CFG.DATA_DIR + "/config.json";
        if (fs.existsSync(configFilePath)) {
            fs.unlinkSync(configFilePath);
        }
        else {
            console.error("No Config present in " + configFilePath);
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
    console.error("Generic Error in Main Handler", err, err.stack);
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
        if (obj.message === "could not load data") {
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
    var sessionToHandle = sessionName || "DEFAULT";
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
        console.error("saveSession(): An error occurred", err);
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
                    name: sessionToHandle
                };
            }
            if (!sessionData.displaysCombinations ||
                !Array.isArray(sessionData.displaysCombinations)) {
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
                    windowList: windowList
                });
            }
            db.save(sessionToHandle, sessionData, function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    log("SAVED SESSION: " + sessionToHandle);
                    fulfill();
                }
            });
        });
    });
}
function restoreSession(sessionName, isCloseAllOpenWindows) {
    var sessionToHandle = sessionName || "DEFAULT";
    return new Promise(function (fulfill, reject) {
        db.get(sessionToHandle || "DEFAULT", function (err, sessionData) {
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
                return new Promise(function (resolve) {
                    return setTimeout(function () {
                        resolve(updatedCurrentWindowList);
                    }, 500);
                });
            })
                .then(function (updatedCurrentWindowList) {
                _updateWindowIds(savedWindowList, updatedCurrentWindowList);
                return _restoreWindowPositions(savedWindowList);
            })
                .then(function () {
                log("RESTORED SESSION: " + sessionToHandle);
            })
                .catch(function (err) {
                console.error("An error occurred", err);
                reject(err);
            })
                .then(fulfill);
        });
    }).catch(_catchGenericErr$1);
}
function removeSession(sessionName) {
    return new Promise(function (fulfill, reject) {
        fs.unlink(CFG.SESSION_DATA_DIR + "/" + sessionName + ".json", function (error) {
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
            log("Closing opened applications");
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
                            console.error("POLL_ALL_MAX_TIMEOUT reached");
                            reject("POLL_ALL_MAX_TIMEOUT reached");
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
    log("Waiting for all applications to start...");
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
                            console.error("POLL_ALL_MAX_TIMEOUT reached");
                            console.error("Unable to start the following apps", _getNotStartedApps(savedWindowList, currentWindowList));
                            reject("POLL_ALL_MAX_TIMEOUT reached");
                        }
                        else {
                            // call recursively
                            pollAllAppsStarted(savedWindowList);
                        }
                    }
                    else {
                        log("All applications started");
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
            if (error) {
                console.log("\n Trying alternative guessing approach for \"" + win.simpleName + "\".....");
                child_process.exec("cat /proc/" + win.wmPid + "/cmdline", function (error1, stdout1) {
                    if (error1 || !stdout1.length) {
                        console.error("ERR _guessFilePath()", error1);
                        reject(error1);
                    }
                    else {
                        var ent = stdout1.split("\u0000");
                        console.log("\n Alternative guessing approach for \"" + win.simpleName + "\" SUCCESS -> " + ent[0]);
                        win.executableFile = ent[0];
                        fulfill(win.executableFile);
                    }
                });
            }
            else {
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
                    windowList.forEach(function (win) { return (win.instancesStarted = 0); });
                    promises = windowList
                        .filter(function (win) {
                        var numberOfInstancesOfWin = _getNumberOfInstancesToRun(win, windowList);
                        return !_isProgramAlreadyRunning(win.wmClassName, currentWindowList, numberOfInstancesOfWin, win.instancesStarted);
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
    log('Status: "' + wmClassName + '" is running:', instancesRunning + instancesStarted >= numberOfInstancesToRun, numberOfInstancesToRun, instancesStarted);
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
        var promises, last_desktop_nr, _i, savedWindowList_1, win, _a, promises_2, promise, e_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    promises = [];
                    last_desktop_nr = 0;
                    // Sort the window objects based on which workspace they are locate,
                    // so the windows can be moved workspace by workspace
                    // This is needed because the window manager just creates an aditional workspace when
                    // the previous one has some window on it.
                    savedWindowList = savedWindowList.concat().sort(function (a, b) {
                        return a.wmCurrentDesktopNr - b.wmCurrentDesktopNr;
                    });
                    _i = 0, savedWindowList_1 = savedWindowList;
                    _b.label = 1;
                case 1:
                    if (!(_i < savedWindowList_1.length)) return [3 /*break*/, 9];
                    win = savedWindowList_1[_i];
                    promises.push(restoreWindowPosition(win));
                    promises.push(moveToWorkspace(win.windowId, win.wmCurrentDesktopNr));
                    if (!(win.wmCurrentDesktopNr !== last_desktop_nr ||
                        win === savedWindowList.slice(-1)[0])) return [3 /*break*/, 8];
                    _a = 0, promises_2 = promises;
                    _b.label = 2;
                case 2:
                    if (!(_a < promises_2.length)) return [3 /*break*/, 7];
                    promise = promises_2[_a];
                    _b.label = 3;
                case 3:
                    _b.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, promise];
                case 4:
                    _b.sent();
                    return [3 /*break*/, 6];
                case 5:
                    e_2 = _b.sent();
                    _catchGenericErr$1(e_2);
                    return [3 /*break*/, 6];
                case 6:
                    _a++;
                    return [3 /*break*/, 2];
                case 7:
                    last_desktop_nr = win.wmCurrentDesktopNr;
                    promises.length = 0;
                    _b.label = 8;
                case 8:
                    _i++;
                    return [3 /*break*/, 1];
                case 9: return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=index.js.map

module.exports = index;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlsaXR5LnRzIiwiLi4vc3JjL2RlZmF1bHRDb25maWcudHMiLCIuLi9zcmMvbG9nLnRzIiwiLi4vc3JjL2NvbmZpZy50cyIsIi4uL3NyYy9pc0RlYnVnLnRzIiwiLi4vc3JjL3BhcnNlQ21kVG9TcGF3bi50cyIsIi4uL3NyYy94MTFXcmFwcGVyLnRzIiwiLi4vc3JjL290aGVyQ21kLnRzIiwiLi4vc3JjL21ldGFXcmFwcGVyLnRzIiwiLi4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGZzIGZyb20gXCJmc1wiO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tIFwicGF0aFwiO1xuXG5leHBvcnQgZnVuY3Rpb24gbWtkaXJTeW5jKGRpclBhdGgpIHtcbiAgdHJ5IHtcbiAgICBmcy5ta2RpclN5bmMoZGlyUGF0aCk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGlmIChlcnIuY29kZSAhPT0gXCJFRVhJU1RcIikge1xuICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbWtmaWxlU3luYyhmaWxlUGF0aCkge1xuICB0cnkge1xuICAgIGZzLndyaXRlRmlsZVN5bmMoZmlsZVBhdGgsIHsgZmxhZzogXCJ3eFwiIH0pO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBpZiAoZXJyLmNvZGUgIT09IFwiRUVYSVNUXCIpIHtcbiAgICAgIHRocm93IGVycjtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvcHlTeW5jKHNyYywgZGVzdCkge1xuICBpZiAoIWZzLmV4aXN0c1N5bmMoc3JjKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBjb25zdCBkYXRhID0gZnMucmVhZEZpbGVTeW5jKHNyYywgXCJ1dGYtOFwiKTtcbiAgZnMud3JpdGVGaWxlU3luYyhkZXN0LCBkYXRhKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlRGVlcCguLi5vYmplY3RzKSB7XG4gIGNvbnN0IGlzT2JqZWN0ID0gb2JqID0+IG9iaiAmJiB0eXBlb2Ygb2JqID09PSBcIm9iamVjdFwiO1xuXG4gIHJldHVybiBvYmplY3RzLnJlZHVjZSgocHJldiwgb2JqKSA9PiB7XG4gICAgT2JqZWN0LmtleXMob2JqKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICBjb25zdCBwVmFsID0gcHJldltrZXldO1xuICAgICAgY29uc3Qgb1ZhbCA9IG9ialtrZXldO1xuXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShwVmFsKSAmJiBBcnJheS5pc0FycmF5KG9WYWwpKSB7XG4gICAgICAgIHByZXZba2V5XSA9IHBWYWwuY29uY2F0KC4uLm9WYWwpO1xuICAgICAgfSBlbHNlIGlmIChpc09iamVjdChwVmFsKSAmJiBpc09iamVjdChvVmFsKSkge1xuICAgICAgICBwcmV2W2tleV0gPSBtZXJnZURlZXAocFZhbCwgb1ZhbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwcmV2W2tleV0gPSBvVmFsO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHByZXY7XG4gIH0sIHt9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1vdmVkaXIoZnJvbSwgdG8pIHtcbiAgbWtkaXJTeW5jKHRvKTtcbiAgbGV0IGNvbnRlbnRzID0gZnMucmVhZGRpclN5bmMoZnJvbSk7XG5cbiAgZm9yIChjb25zdCBlbGVtZW50IG9mIGNvbnRlbnRzKSB7XG4gICAgbGV0IGZyb21fZWxlbWVudCA9IHBhdGguam9pbihmcm9tLCBlbGVtZW50KTtcbiAgICBsZXQgdG9fZWxlbWVudCA9IHBhdGguam9pbih0bywgZWxlbWVudCk7XG5cbiAgICBpZiAoZnMubHN0YXRTeW5jKGZyb21fZWxlbWVudCkuaXNEaXJlY3RvcnkoKSkge1xuICAgICAgbW92ZWRpcihmcm9tX2VsZW1lbnQsIHRvX2VsZW1lbnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmcy5jb3B5RmlsZVN5bmMoZnJvbV9lbGVtZW50LCB0b19lbGVtZW50KTtcbiAgICAgIGZzLnVubGlua1N5bmMoZnJvbV9lbGVtZW50KTtcbiAgICB9XG4gIH1cbiAgZnMucm1kaXJTeW5jKGZyb20pO1xufVxuIiwiZXhwb3J0IGNvbnN0IERFRkFVTFRfQ0ZHID0ge1xuICBHSVZFX1gxMV9USU1FX1RJTUVPVVQ6IDgwLFxuICBQT0xMX0FMTF9BUFBTX1NUQVJURURfSU5URVJWQUw6IDIwMDAsXG4gIFBPTExfQUxMX01BWF9USU1FT1VUOiAxMjAwMDAsXG4gIFNBVkVfU0VTU0lPTl9JTl9QUkVUVFlfRk9STUFUOiB0cnVlLFxuICBXTV9DTEFTU19BTkRfRVhFQ1VUQUJMRV9GSUxFX01BUDoge1xuICAgIFwiZ25vbWUtdGVybWluYWwtc2VydmVyLkdub21lLXRlcm1pbmFsXCI6IFwiZ25vbWUtdGVybWluYWxcIixcbiAgICBcImdvb2dsZS1jaHJvbWUuR29vZ2xlLWNocm9tZVwiOiBcImdvb2dsZS1jaHJvbWUuZGVza3RvcFwiLFxuICAgIFwiYnJhdmUtYnJvd3Nlci5CcmF2ZS1icm93c2VyXCI6IFwiYnJhdmUtYnJvd3Nlci5kZXNrdG9wXCIsXG4gICAgXCJNYWlsLlRodW5kZXJiaXJkXCI6IFwidGh1bmRlcmJpcmQuZGVza3RvcFwiLFxuICAgIFwibmF1dGlsdXMuTmF1dGlsdXNcIjogXCJuYXV0aWx1c1wiLFxuICAgIFwib3JnLmdub21lLk5hdXRpbHVzLk9yZy5nbm9tZS5OYXV0aWx1c1wiOiBcIm5hdXRpbHVzXCIsXG4gICAgXCJOYXZpZ2F0b3IuRmlyZWZveFwiOiBcImZpcmVmb3guZGVza3RvcFwiLFxuICAgIFwiTmF2aWdhdG9yLlBhbGVcIjogXCJwYWxlbW9vbi5kZXNrdG9wXCIsXG4gICAgXCJza3lwZS5Ta3lwZVwiOiBcInNreXBlZm9ybGludXguZGVza3RvcFwiLFxuICAgIFwic3VuLWF3dC1YMTEtWEZyYW1lUGVlci5qZXRicmFpbnMtaWRlYVwiOiBcImpldGJyYWlucy1pZGVhLmRlc2t0b3BcIixcbiAgICBcIlZpcnR1YWxCb3guVmlydHVhbEJveFwiOiBcInZpcnR1YWxib3guZGVza3RvcFwiLFxuICAgIFwiVGVsZWdyYW0uVGVsZWdyYW1EZXNrdG9wXCI6IFwidGVsZWdyYW0tZGVza3RvcF90ZWxlZ3JhbWRlc2t0b3AuZGVza3RvcFwiLFxuICAgIFwidGVsZWdyYW0tZGVza3RvcC5UZWxlZ3JhbURlc2t0b3BcIjogXCJ0ZWxlZ3JhbWRlc2t0b3AuZGVza3RvcFwiLFxuICAgIFwia2VlcGFzc3hjLmtlZXBhc3N4Y1wiOiBcImtlZXBhc3N4Y19rZWVwYXNzeGMuZGVza3RvcFwiLFxuICAgIFwic2xhY2suU2xhY2tcIjogXCJjb20uc2xhY2suU2xhY2suZGVza3RvcFwiLFxuICAgIFwic2lnbmFsLlNpZ25hbFwiOiBcInNpZ25hbC1kZXNrdG9wLmRlc2t0b3BcIixcbiAgICBcIm1pY3Jvc29mdCB0ZWFtcyAtIHByZXZpZXcuTWljcm9zb2Z0IFRlYW1zIC0gUHJldmlld1wiOiBcInRlYW1zLmRlc2t0b3BcIlxuICB9LFxuICBXTV9DTEFTU19FWENMVVNJT05TOiBbXG4gICAgXCJOL0FcIixcbiAgICBcInRpbGRhLlRpbGRhXCIsXG4gICAgXCJQb3B1cC5kZXNrdG9wXCIsXG4gICAgXCJ1cGRhdGUtbWFuYWdlci5VcGRhdGUtbWFuYWdlclwiLFxuICAgIFwiZGVza3RvcF93aW5kb3cuTmF1dGlsdXNcIixcbiAgICBcImVsZWN0cm9uLkVsZWN0cm9uXCIsXG4gICAgXCJndWFrZS5NYWluLnB5XCIsXG4gICAgXCJnbm9tZS1zb2Z0d2FyZS5Hbm9tZS1zb2Z0d2FyZVwiXG4gIF0sXG4gIFdNX01FVEFfTUFQOiB7XG4gICAgXCJXTV9XSU5ET1dfUk9MRShTVFJJTkcpXCI6IFwid21Sb2xlXCIsXG4gICAgXCJXTV9DTEFTUyhTVFJJTkcpXCI6IFwid21DbGFzc05hbWVcIixcbiAgICBcIl9ORVRfV01fU1RBVEUoQVRPTSlcIjogXCJzdGF0ZXNcIixcbiAgICBcIl9ORVRfV01fREVTS1RPUChDQVJESU5BTClcIjogXCJ3bUN1cnJlbnREZXNrdG9wTnJcIixcbiAgICBcIldNX05BTUUoVVRGOF9TVFJJTkcpXCI6IFwid21UaXRsZVwiLFxuICAgIFwiX05FVF9XTV9QSUQoQ0FSRElOQUwpXCI6IFwid21QaWRcIixcbiAgICBcIl9ORVRfV01fV0lORE9XX1RZUEUoQVRPTSlcIjogXCJ3bVR5cGVcIixcbiAgICBcIl9CQU1GX0RFU0tUT1BfRklMRShTVFJJTkcpXCI6IFwiZXhlY3V0YWJsZUZpbGVcIlxuICB9LFxuICBXTV9NRVRBX01BUF9OVU1CRVJfVFlQRVM6IFtcbiAgICBcIl9ORVRfV01fUElEKENBUkRJTkFMKVwiLFxuICAgIFwiX05FVF9XTV9ERVNLVE9QKENBUkRJTkFMKVwiXG4gIF0sXG4gIERFU0tUT1BfRklMRV9MT0NBVElPTlM6IFtcbiAgICBcIntob21lfS8ubG9jYWwvc2hhcmUvYXBwbGljYXRpb25zXCIsXG4gICAgXCJ7aG9tZX0vLmdub21lL2FwcHNcIixcbiAgICBcIi91c3Ivc2hhcmUvYXBwbGljYXRpb25zXCIsXG4gICAgXCIvdXNyL2xvY2FsL3NoYXJlL2FwcGxpY2F0aW9uc1wiLFxuICAgIFwiL3Vzci9zaGFyZS9hcHAtaW5zdGFsbFwiLFxuICAgIFwie2hvbWV9Ly5jb25maWcvYXV0b3N0YXJ0XCIsXG4gICAgXCIvdmFyL2xpYi9zbmFwZC9kZXNrdG9wL2FwcGxpY2F0aW9uc1wiLFxuICAgIFwiL3Zhci9saWIvZmxhdHBhay9hcHBcIixcbiAgICBcIi92YXIvbGliL2ZsYXRwYWsvZXhwb3J0cy9zaGFyZS9hcHBsaWNhdGlvbnNcIixcbiAgICBcIi9zbmFwL2JpblwiXG4gIF1cbn07XG4iLCJleHBvcnQgY29uc3QgbG9nID0gKC4uLmFyZ3MpID0+IGNvbnNvbGUubG9nKC4uLmFyZ3MpO1xuIiwiaW1wb3J0IHsgbWVyZ2VEZWVwLCBta2RpclN5bmMsIG1vdmVkaXIgfSBmcm9tIFwiLi91dGlsaXR5XCI7XG5pbXBvcnQgeyBERUZBVUxUX0NGRyB9IGZyb20gXCIuL2RlZmF1bHRDb25maWdcIjtcbmltcG9ydCAqIGFzIGZzIGZyb20gXCJmc1wiO1xuaW1wb3J0IHsgbG9nIH0gZnJvbSBcIi4vbG9nXCI7XG5cbmxldCBjZmc7XG5cbmV4cG9ydCBjb25zdCBDRkdfREFUQV9ESVJfTEVHQUNZID0gX2dldFVzZXJIb21lKCkgKyBcIi8ubHdzbVwiO1xuZXhwb3J0IGNvbnN0IENGR19EQVRBX0RJUiA9IF9nZXRVc2VySG9tZSgpICsgXCIvLmNvbmZpZy9sd3NtXCI7XG5leHBvcnQgY29uc3QgQ0ZHX0ZJTEVfUEFUSCA9IENGR19EQVRBX0RJUiArIFwiL2NvbmZpZy5qc29uXCI7XG5leHBvcnQgY29uc3QgU0VTU0lPTl9EQVRBX0RJUiA9IENGR19EQVRBX0RJUiArIFwiL3Nlc3Npb25EYXRhXCI7XG5cbi8vIElOSVRcbi8vIC0tLS0tLS0tLS0tLVxudHJ5IHtcbiAgLy8gaWYgQ0ZHX0RBVEFfRElSX0xFR0FDWSBleGlzdHMsIG1vdmUgaXQgdG8gQ0ZHX0RBVEFfRElSXG4gIGlmIChmcy5leGlzdHNTeW5jKENGR19EQVRBX0RJUl9MRUdBQ1kpKSB7XG4gICAgaWYgKCFmcy5leGlzdHNTeW5jKENGR19EQVRBX0RJUikpIHtcbiAgICAgIG1vdmVkaXIoQ0ZHX0RBVEFfRElSX0xFR0FDWSwgQ0ZHX0RBVEFfRElSKTtcbiAgICAgIGxvZyhcbiAgICAgICAgYGx3c206IG1vdmVkIGNvbmZpZyBkaXJlY3RvcnkgJHtDRkdfREFUQV9ESVJfTEVHQUNZfSB0byAke0NGR19EQVRBX0RJUn1gXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBsb2coYGx3c206IGlnbm9yZWQgbGVnYWN5IGNvbmZpZyBkaXJlY3RvcnkgJHtDRkdfREFUQV9ESVJfTEVHQUNZfWApO1xuICAgIH1cbiAgfVxuXG4gIC8vIGlmIGNvbmZpZyBpcyBhbHJlYWR5IGluIHBsYWNlXG4gIGNvbnN0IGZyb21GaWxlID0gSlNPTi5wYXJzZShmcy5yZWFkRmlsZVN5bmMoQ0ZHX0ZJTEVfUEFUSCwgXCJ1dGY4XCIpKTtcbiAgY2ZnID0gbWVyZ2VEZWVwKERFRkFVTFRfQ0ZHLCBmcm9tRmlsZSk7XG59IGNhdGNoIChlKSB7XG4gIGxvZyhcbiAgICBcImx3c206IG5vIGNvbmZpZyBmaWxlIHByZXNlbnQgb3IgaXQgY29udGFpbnMgaW52YWxpZCBqc29uLiBDcmVhdGluZyBuZXcgb25lLi4uXCJcbiAgKTtcblxuICAvLyBpZiB0aGVyZSBpcyBubyBjb25maWcgeWV0IGxvYWQgZGVmYXVsdCBjZmcgYW5kIGNyZWF0ZSBmaWxlcyBhbmQgZGlyc1xuICBjZmcgPSBERUZBVUxUX0NGRztcblxuICAvLyBzYXZlIGV4ZWN1dGFibGUgcGF0aHMgdG8gY2ZnXG4gIGNmZy5DTURfSlNGSUxFX1BBVEggPSBfX2Rpcm5hbWUgKyBcIi8uLi9jbWQuanNcIjtcbiAgY2ZnLkpTRklMRV9JTkRFWF9QQVRIID0gX19kaXJuYW1lICsgXCIvaW5kZXguanNcIjtcblxuICBta2RpclN5bmMoQ0ZHX0RBVEFfRElSKTtcbiAgbWtkaXJTeW5jKFNFU1NJT05fREFUQV9ESVIpO1xuXG4gIC8vIHdyaXRlIGNvbmZpZyB0byB1c2VyIGRpclxuICBmcy53cml0ZUZpbGVTeW5jKENGR19GSUxFX1BBVEgsIEpTT04uc3RyaW5naWZ5KGNmZywgbnVsbCwgMiksIFwidXRmOFwiKTtcbn1cblxuLy8gYWxzbyBtYWtlIGRhdGEgZGlycyBhY2Nlc3NpYmxlIHRvIHRoZSBvdXRzaWRlXG5jZmcuREFUQV9ESVIgPSBDRkdfREFUQV9ESVI7XG5jZmcuU0VTU0lPTl9EQVRBX0RJUiA9IFNFU1NJT05fREFUQV9ESVI7XG5cbmV4cG9ydCBjb25zdCBDRkcgPSBjZmc7XG5cbmZ1bmN0aW9uIF9nZXRVc2VySG9tZSgpIHtcbiAgcmV0dXJuIHByb2Nlc3MuZW52W3Byb2Nlc3MucGxhdGZvcm0gPT09IFwid2luMzJcIiA/IFwiVVNFUlBST0ZJTEVcIiA6IFwiSE9NRVwiXTtcbn1cbiIsImV4cG9ydCBjb25zdCBJU19ERUJVRyA9IHByb2Nlc3MuYXJndi5pbmRleE9mKFwiLS1kZWJ1Z1wiKSA+IC0xO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydCBjb25zdCBwYXJzZUNtZEFyZ3MgPSBjbWQgPT4ge1xuICBsZXQgY21kQWxsU3BsaXQgPSBjbWQuc3BsaXQoLyAvKTtcbiAgbGV0IG1haW5Db21tYW5kID0gY21kQWxsU3BsaXRbMF07XG4gIGxldCBhcmdzID0gW107XG4gIGNtZEFsbFNwbGl0Lm1hcChmdW5jdGlvbihzLCBpKSB7XG4gICAgaWYgKGkgIT09IDApIHtcbiAgICAgIGFyZ3NbaSAtIDFdID0gY21kQWxsU3BsaXRbaV07XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIFttYWluQ29tbWFuZCwgX21lcmdlUXVvdGVkU3RyaW5nUGFyYW1zKGFyZ3MpXTtcbn07XG5cbmZ1bmN0aW9uIF9tZXJnZVF1b3RlZFN0cmluZ1BhcmFtcyhhcmdzKSB7XG4gIGNvbnN0IG5ld0FyZ3MgPSBbXTtcbiAgbGV0IGlzSW5RdW90YXRpb24gPSBmYWxzZTtcbiAgbGV0IGN1cnJlbnRRdW90YXRpb25Bcmc7XG5cbiAgLy8gVE9ETyBtYWtlIGl0IHdvcmsgd2l0aCBtb3JlIGRpZmZlcmVudCBxdW90YXRpb24gdHlwZXNcbiAgYXJncy5mb3JFYWNoKGFyZyA9PiB7XG4gICAgLy8gbWF0Y2ggcXVvdGF0aW9uIGVuZFxuICAgIGlmIChhcmcubWF0Y2goLyckLykpIHtcbiAgICAgIGN1cnJlbnRRdW90YXRpb25BcmcgKz0gXCIgXCIgKyBhcmcuc2xpY2UoMCwgYXJnLmxlbmd0aCAtIDEpO1xuICAgICAgbmV3QXJncy5wdXNoKGN1cnJlbnRRdW90YXRpb25BcmcpO1xuICAgICAgY3VycmVudFF1b3RhdGlvbkFyZyA9IHVuZGVmaW5lZDtcbiAgICAgIGlzSW5RdW90YXRpb24gPSBmYWxzZTtcbiAgICB9XG4gICAgLy8gbWF0Y2ggcXVvdGF0aW9uIHN0YXJ0XG4gICAgZWxzZSBpZiAoYXJnLm1hdGNoKC9eJy8pKSB7XG4gICAgICBpc0luUXVvdGF0aW9uID0gdHJ1ZTtcbiAgICAgIGN1cnJlbnRRdW90YXRpb25BcmcgPSBhcmcuc3Vic3RyKDEsIGFyZy5sZW5ndGgpO1xuICAgIH1cbiAgICAvLyB3aGlsZSBpbiBxdW90YXRpb25cbiAgICBlbHNlIGlmIChpc0luUXVvdGF0aW9uKSB7XG4gICAgICBjdXJyZW50UXVvdGF0aW9uQXJnICs9IFwiIFwiICsgYXJnO1xuICAgIH0gZWxzZSBpZiAoYXJnICE9PSBcIlwiKSB7XG4gICAgICBuZXdBcmdzLnB1c2goYXJnKTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBuZXdBcmdzO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IGxvZyB9IGZyb20gXCIuL2xvZ1wiO1xuaW1wb3J0IHsgQ0ZHIH0gZnJvbSBcIi4vY29uZmlnXCI7XG5cbmNvbnN0IHgxMSA9IHJlcXVpcmUoXCJ4MTFcIik7XG5cbmV4cG9ydCBsZXQgWDtcbmxldCByb290O1xubGV0IGRpc3BsYXk7XG5cbi8vIGV4cG9ydCBjb25zdCBnZXRXaW5kb3dJbmZvID0gd3JhcFgxMShfZ2V0V2luZG93SW5mbyk7XG5leHBvcnQgY29uc3QgZ2V0WCA9ICgpID0+IFg7XG5cbmZ1bmN0aW9uIGNhdGNoR2VuZXJpY0VycihlcnIpIHtcbiAgY29uc29sZS5lcnJvcihcIngxMVdyYXBwZXI6IFwiLCBlcnIsIGVyci5zdGFjayk7XG59XG5cbmxldCBpc0NsaWVudEluaXRpYWxpemVkID0gZmFsc2U7XG5sZXQgaW5pdFByb21pc2U7XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0WDExKCk6IFByb21pc2U8YW55PiB7XG4gIGlmIChpc0NsaWVudEluaXRpYWxpemVkKSB7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICB9XG4gIGlmIChpbml0UHJvbWlzZSkge1xuICAgIHJldHVybiBpbml0UHJvbWlzZTtcbiAgfVxuICBpbml0UHJvbWlzZSA9IG5ldyBQcm9taXNlKChmdWxmaWxsLCByZWplY3QpID0+IHtcbiAgICB4MTFcbiAgICAgIC5jcmVhdGVDbGllbnQoKGVyciwgZGlzcGxheUluKSA9PiB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkaXNwbGF5ID0gZGlzcGxheUluO1xuICAgICAgICAgIFggPSBkaXNwbGF5LmNsaWVudDtcblxuICAgICAgICAgIHJvb3QgPSBkaXNwbGF5LnNjcmVlblswXS5yb290O1xuICAgICAgICAgIGlzQ2xpZW50SW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgICAgICAgIGZ1bGZpbGwoKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC5vbihcImVycm9yXCIsIGVyciA9PiB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgIH0pO1xuICB9KS5jYXRjaChjYXRjaEdlbmVyaWNFcnIpO1xuICByZXR1cm4gaW5pdFByb21pc2U7XG59XG5cbi8vIE1FVEhPRFNcbi8vIC0tLS0tLS1cbmV4cG9ydCBmdW5jdGlvbiBnZXREaXNwbGF5cygpOiBhbnlbXSB7XG4gIGlmICghZGlzcGxheSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIlgxMSBub3QgaW5pdGlhbGl6ZWQgLyBObyBzY3JlZW4gYXZhaWxhYmxlXCIpO1xuICB9XG4gIHJldHVybiBkaXNwbGF5LnNjcmVlbjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFdpbmRvd0dlb21ldHJ5KHdpbklkKSB7XG4gIGNvbnN0IGdlbzogYW55ID0ge307XG5cbiAgcmV0dXJuIG5ldyBQcm9taXNlKChmdWxmaWxsLCByZWplY3QpID0+IHtcbiAgICBYLlRyYW5zbGF0ZUNvb3JkaW5hdGVzKHdpbklkLCByb290LCAwLCAwLCAoZXJyLCByZXMpID0+IHtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBnZW8ueCA9IHJlcy5kZXN0WDtcbiAgICAgICAgZ2VvLnkgPSByZXMuZGVzdFk7XG5cbiAgICAgICAgWC5HZXRHZW9tZXRyeSh3aW5JZCwgKGVyciwgcmVzKSA9PiB7XG4gICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGdlby53aWR0aCA9IHJlcy53aWR0aDtcbiAgICAgICAgICAgIGdlby5oZWlnaHQgPSByZXMuaGVpZ2h0O1xuICAgICAgICAgICAgZnVsZmlsbChnZW8pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pLmNhdGNoKGNhdGNoR2VuZXJpY0Vycik7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRBY3RpdmVXaW5kb3dJZHMoKTogUHJvbWlzZTxzdHJpbmdbXT4ge1xuICBjb25zdCBQUk9QX05BTUUgPSBcIl9ORVRfQ0xJRU5UX0xJU1RcIjtcbiAgY29uc3QgcHJvcElkID0gYXdhaXQgX2dldFByb3BlcnR5SWRCeU5hbWUocm9vdCwgUFJPUF9OQU1FKTtcbiAgY29uc3QgaWRTdHIgPSBhd2FpdCBnZXRQcm9wKHJvb3QsIHByb3BJZCBhcyBudW1iZXIpO1xuICByZXR1cm4gX3BhcnNlV2luZG93SWRzKGlkU3RyKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlc3RvcmVXaW5kb3dQb3NpdGlvbih3aW4pIHtcbiAgbG9nKCdSZXN0b3Jpbmcgd2luZG93IHBvc2l0aW9uIGZvciBcIicgKyB3aW4ud21DbGFzc05hbWUgKyAnXCInKTtcbiAgY29uc3QgU1RBVEVTX1RPX1JFU0VUID0gW1xuICAgIFwiX05FVF9XTV9TVEFURV9NQVhJTUlaRURfVkVSVFwiLFxuICAgIFwiX05FVF9XTV9TVEFURV9NQVhJTUlaRURfSE9SWlwiXG4gIF07XG4gIHJldHVybiBuZXcgUHJvbWlzZSgoZnVsZmlsbCwgcmVqZWN0KSA9PiB7XG4gICAgc2V0U3RhdGUod2luLndpbmRvd0lkLCBcInJlbW92ZVwiLCBTVEFURVNfVE9fUkVTRVQpXG4gICAgICAuY2F0Y2gocmVqZWN0KVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICBYLk1vdmVSZXNpemVXaW5kb3cod2luLndpbmRvd0lkLCB3aW4ueCwgd2luLnksIHdpbi53aWR0aCwgd2luLmhlaWdodCk7XG4gICAgICAgIHNldFN0YXRlKHdpbi53aW5kb3dJZCwgXCJhZGRcIiwgd2luLnN0YXRlcylcbiAgICAgICAgICAuY2F0Y2gocmVqZWN0KVxuICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIGZ1bGZpbGwoKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2gocmVqZWN0KTtcbiAgfSkuY2F0Y2goY2F0Y2hHZW5lcmljRXJyKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsb3NlV2luZG93KHdpbklkKSB7XG4gIHJldHVybiBfc2VuZFgxMUNsaWVudE1lc3NhZ2Uod2luSWQsIFwiX05FVF9DTE9TRV9XSU5ET1dcIik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtb3ZlVG9Xb3Jrc3BhY2Uod2luSWQsIHdvcmtTcGFjZU5yKSB7XG4gIC8vIE5PVEU6IGlmIGl0IGRvZXNuJ3Qgd29yayB3ZSBtaWdodCBhbHNvIHdhbnQgdG8gdXNlIF9XSU5fV09SS1NQQUNFXG4gIHJldHVybiBfc2VuZFgxMUNsaWVudE1lc3NhZ2Uod2luSWQsIFwiX05FVF9XTV9ERVNLVE9QXCIsIFtcbiAgICB7XG4gICAgICB2YWx1ZTogd29ya1NwYWNlTnJcbiAgICB9XG4gIF0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ29Ub1ZpZXdwb3J0KHgsIHkpIHtcbiAgcmV0dXJuIF9zZW5kWDExQ2xpZW50TWVzc2FnZShyb290LCBcIl9ORVRfREVTS1RPUF9WSUVXUE9SVFwiLCBbXG4gICAgeyB2YWx1ZTogeCB9LFxuICAgIHsgdmFsdWU6IHkgfVxuICBdKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldFN0YXRlKHdpZCwgYWN0aW9uU3RyLCBzdGF0ZXNUb0hhbmRsZSkge1xuICBjb25zdCBBQ1RJT05TX01BUCA9IHtcbiAgICByZW1vdmU6IDAsXG4gICAgYWRkOiAxLFxuICAgIHRvZ2dsZTogMlxuICB9O1xuICBjb25zdCBhY3Rpb24gPSBBQ1RJT05TX01BUFthY3Rpb25TdHJdO1xuICBsZXQgcHJvcGVydGllczogYW55W10gPSBbeyB2YWx1ZTogYWN0aW9uIH1dO1xuXG4gIC8vIGFsbCBwcm9wZXJ0aWVzIG5lZWQgdG8gYmUgbG9va2VkIHVwIGZvciB0aGVpciBhdG9tIGlkXG4gIGlmIChBcnJheS5pc0FycmF5KHN0YXRlc1RvSGFuZGxlKSAmJiBzdGF0ZXNUb0hhbmRsZS5sZW5ndGggPiAwKSB7XG4gICAgc3RhdGVzVG9IYW5kbGUuZm9yRWFjaChzdGF0ZVByb3BlcnR5ID0+IHtcbiAgICAgIHByb3BlcnRpZXMucHVzaCh7XG4gICAgICAgIGlzQXRvbTogdHJ1ZSxcbiAgICAgICAgdmFsdWU6IHN0YXRlUHJvcGVydHlcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHJldHVybiBfc2VuZFgxMUNsaWVudE1lc3NhZ2Uod2lkLCBcIl9ORVRfV01fU1RBVEVcIiwgcHJvcGVydGllcyk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICB9XG59XG5cbmNvbnN0IFBST1BTX1RPX0dFVCA9IFtcbiAgXCJXTV9DTEFTU1wiLFxuICBcIl9ORVRfV01fU1RBVEVcIixcbiAgXCJfTkVUX1dNX0RFU0tUT1BcIixcbiAgXCJXTV9OQU1FXCIsXG4gIFwiX05FVF9XTV9QSURcIixcbiAgXCJfTkVUX1dNX1dJTkRPV19UWVBFXCIsXG4gIFwiX0JBTUZfREVTS1RPUF9GSUxFXCJcbl07XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRXaW5kb3dJbmZvKHdpZCk6IFByb21pc2U8YW55PiB7XG4gIC8vIFguR2V0R2VvbWV0cnkod2lkLCBmdW5jdGlvbiAoZXJyLCBjbGllbnRHZW9tKSB7XG4gIC8vICAgY29uc29sZS5sb2coXCJ3aW5kb3cgZ2VvbWV0cnk6IFwiLCBjbGllbnRHZW9tKTtcbiAgLy8gfSk7XG5cbiAgY29uc3QgcHJvcHM6IGFueVtdID0gYXdhaXQgX3hDYlRvUHJvbWlzZShYLkxpc3RQcm9wZXJ0aWVzLCB3aWQpO1xuXG4gIGNvbnN0IHByb21pc2VzID0gcHJvcHMubWFwKGFzeW5jIGZ1bmN0aW9uKHApIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcHJvcE5hbWUgPSBhd2FpdCBfeENiVG9Qcm9taXNlKFguR2V0QXRvbU5hbWUsIHApO1xuICAgICAgICBpZiAoUFJPUFNfVE9fR0VULmluY2x1ZGVzKHByb3BOYW1lKSkge1xuICAgICAgICAgIGNvbnN0IHByb3BWYWwgPSBhd2FpdCBfeENiVG9Qcm9taXNlKFxuICAgICAgICAgICAgWC5HZXRQcm9wZXJ0eSxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICB3aWQsXG4gICAgICAgICAgICBwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAxMDAwMDAwMFxuICAgICAgICAgICk7XG4gICAgICAgICAgY29uc3QgdHlwZU5hbWUgPSBhd2FpdCBfeENiVG9Qcm9taXNlKFguR2V0QXRvbU5hbWUsIHByb3BWYWwudHlwZSk7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2cocHJvcFZhbCwgdHlwZU5hbWUsIHByb3BOYW1lKTtcbiAgICAgICAgICBjb25zdCBkZWNvZGVkRGF0YSA9IGF3YWl0IF9kZWNvZGVQcm9wZXJ0eSh0eXBlTmFtZSwgcHJvcFZhbC5kYXRhKTtcbiAgICAgICAgICByZXNvbHZlKHByb3BOYW1lICsgXCIoXCIgKyB0eXBlTmFtZSArIFwiKSA9IFwiICsgZGVjb2RlZERhdGEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc29sdmUoXCJcIik7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcblxuICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4ocmVzdWx0cyA9PiB7XG4gICAgcmV0dXJuIHJlc3VsdHMuam9pbihcIlxcblwiKTtcbiAgfSk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRQcm9wKGlkID0gcm9vdCwgcHJvcElkOiBudW1iZXIpOiBQcm9taXNlPGFueT4ge1xuICBjb25zdCBwcm9wVmFsID0gYXdhaXQgX3hDYlRvUHJvbWlzZShcbiAgICBYLkdldFByb3BlcnR5LFxuICAgIDAsXG4gICAgaWQsXG4gICAgcHJvcElkLFxuICAgIDAsXG4gICAgMCxcbiAgICAxMDAwMDAwMFxuICApO1xuICBjb25zdCB0eXBlTmFtZSA9IGF3YWl0IF94Q2JUb1Byb21pc2UoWC5HZXRBdG9tTmFtZSwgcHJvcFZhbC50eXBlKTtcbiAgcmV0dXJuIGF3YWl0IF9kZWNvZGVQcm9wZXJ0eSh0eXBlTmFtZSwgcHJvcFZhbC5kYXRhKTtcbn1cblxuLy8gSEVMUEVSXG4vLyAtLS0tLS1cbmZ1bmN0aW9uIF94Q2JUb1Byb21pc2UoZm4sIC4uLmFyZ3MpOiBhbnkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKGZ1bGZpbGwsIHJlamVjdCkgPT4ge1xuICAgIGZuLmFwcGx5KFgsIFtcbiAgICAgIC4uLmFyZ3MsXG4gICAgICAoZXJyLCByZXMpID0+IHtcbiAgICAgICAgcmV0dXJuIGVyciA/IHJlamVjdChlcnIpIDogZnVsZmlsbChyZXMpO1xuICAgICAgfVxuICAgIF0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gX2NvdW50ZXIoaW5pdGlhbFZhbCwgbW9kaWZpZXIpIHtcbiAgLy8gdG8gc3RhcnQgYXQgdmFsIHdlIG5lZWQgdG8gc3VidHJhY3QgdGhlIG1vZGlmaWVyIGZpcnN0XG4gIGxldCB2YWwgPSBpbml0aWFsVmFsIC0gbW9kaWZpZXI7XG4gIHJldHVybiAoKSA9PiB7XG4gICAgdmFsICs9IG1vZGlmaWVyO1xuICAgIHJldHVybiB2YWw7XG4gIH07XG59XG5cbmZ1bmN0aW9uIF9nZXRBdG9tcyhsaXN0LCBjYikge1xuICBjb25zdCByZXMgPSB7fTtcbiAgY29uc3QgZ2V0QXRvbSA9ICgpID0+IHtcbiAgICBpZiAobGlzdC5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBjYihudWxsLCByZXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBuYW1lID0gbGlzdC5zaGlmdCgpO1xuICAgICAgWC5JbnRlcm5BdG9tKGZhbHNlLCBuYW1lLCAoZXJyLCBhdG9tKSA9PiB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICByZXR1cm4gY2IoZXJyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXNbbmFtZV0gPSBhdG9tO1xuICAgICAgICAgIGdldEF0b20oKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuICBnZXRBdG9tKCk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIF9nZXRQcm9wZXJ0eUlkQnlOYW1lKFxuICB3aWQ6IHN0cmluZyxcbiAgbmFtZVRvR2V0OiBzdHJpbmdcbik6IFByb21pc2U8bnVtYmVyPiB7XG4gIGNvbnN0IHByb3BzOiBhbnlbXSA9IGF3YWl0IF94Q2JUb1Byb21pc2UoWC5MaXN0UHJvcGVydGllcywgd2lkKTtcbiAgY29uc3QgcHJvbWlzZXMgPSBwcm9wcy5tYXAoYXN5bmMgZnVuY3Rpb24ocCkge1xuICAgIGNvbnN0IHByb3BOYW1lID0gYXdhaXQgX3hDYlRvUHJvbWlzZShYLkdldEF0b21OYW1lLCBwKTtcbiAgICBpZiAobmFtZVRvR2V0ID09PSBwcm9wTmFtZSkge1xuICAgICAgcmV0dXJuIHA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH0pO1xuXG4gIGNvbnN0IHJlcyA9IGF3YWl0IFByb21pc2UuYWxsKHByb21pc2VzKTtcbiAgcmV0dXJuIHJlcy5maW5kKGl0ZW0gPT4gaXRlbSA+IDApO1xufVxuXG5mdW5jdGlvbiBfc2VuZFgxMUNsaWVudE1lc3NhZ2UoXG4gIHdpZCxcbiAgZXZlbnROYW1lLFxuICBldmVudFByb3BlcnRpZXMgPSBbXSxcbiAgb3B0aW9uYWxFdmVudE1hc2s/XG4pIHtcbiAgaWYgKGV2ZW50UHJvcGVydGllcy5sZW5ndGggPiA0KSB7XG4gICAgdGhyb3cgXCJvbmx5IHN1cHBvcnRzIDQgcHJvcGVydGllcyBhdCBvbmNlIG1heFwiO1xuICB9XG5cbiAgY29uc3Qgb2Zmc2V0Q291bnRlciA9IF9jb3VudGVyKDQsIDQpO1xuICBjb25zdCBldmVudE1hc2sgPSBvcHRpb25hbEV2ZW50TWFzayB8fCB4MTEuZXZlbnRNYXNrLlN1YnN0cnVjdHVyZVJlZGlyZWN0O1xuXG4gIC8vIGNyZWF0ZSBhdG9tcyB0byBsb29rIHVwXG4gIGxldCBhdG9tc0xpc3QgPSBbXTtcbiAgYXRvbXNMaXN0LnB1c2goZXZlbnROYW1lKTtcbiAgZXZlbnRQcm9wZXJ0aWVzLmZvckVhY2goZXZlbnRQcm9wZXJ0eSA9PiB7XG4gICAgaWYgKGV2ZW50UHJvcGVydHkuaXNBdG9tKSB7XG4gICAgICBhdG9tc0xpc3QucHVzaChldmVudFByb3BlcnR5LnZhbHVlKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIHN0YXJ0IGJ1ZmZlciBpbnB1dFxuICBjb25zdCBkYXRhID0gbmV3IEJ1ZmZlcigzMik7XG4gIGRhdGEuZmlsbCgwKTtcbiAgZGF0YS53cml0ZUludDgoMzMsIDApOyAvLyAzMyA9IENsaWVudE1lc3NhZ2VcbiAgZGF0YS53cml0ZUludDgoMzIsIDEpOyAvLyBmb3JtYXRcbiAgZGF0YS53cml0ZVVJbnQzMkxFKHdpZCwgb2Zmc2V0Q291bnRlcigpKTtcblxuICByZXR1cm4gbmV3IFByb21pc2UoKGZ1bGZpbGwsIHJlamVjdCkgPT4ge1xuICAgIF9nZXRBdG9tcyhhdG9tc0xpc3QsIChlcnIsIGF0b21zKSA9PiB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkYXRhLndyaXRlVUludDMyTEUoYXRvbXNbZXZlbnROYW1lXSwgb2Zmc2V0Q291bnRlcigpKTtcblxuICAgICAgICBldmVudFByb3BlcnRpZXMuZm9yRWFjaChldmVudFByb3BlcnR5ID0+IHtcbiAgICAgICAgICBpZiAoZXZlbnRQcm9wZXJ0eS5pc0F0b20pIHtcbiAgICAgICAgICAgIGRhdGEud3JpdGVVSW50MzJMRShhdG9tc1tldmVudFByb3BlcnR5LnZhbHVlXSwgb2Zmc2V0Q291bnRlcigpKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGF0YS53cml0ZVVJbnQzMkxFKGV2ZW50UHJvcGVydHkudmFsdWUsIG9mZnNldENvdW50ZXIoKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgc291cmNlSW5kaWNhdGlvbiA9IDE7XG4gICAgICAgIGRhdGEud3JpdGVVSW50MzJMRShzb3VyY2VJbmRpY2F0aW9uLCBvZmZzZXRDb3VudGVyKCkpO1xuXG4gICAgICAgIFguU2VuZEV2ZW50KHJvb3QsIDAsIGV2ZW50TWFzaywgZGF0YSk7XG5cbiAgICAgICAgLy8gd2UgbmVlZCBhIGxpdHRsZSB0aW1lIGZvciB0aGUgYnVmZmVyIHRvIGJlIHByb2Nlc3NlZFxuICAgICAgICBzZXRUaW1lb3V0KGZ1bGZpbGwsIENGRy5HSVZFX1gxMV9USU1FX1RJTUVPVVQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KS5jYXRjaChjYXRjaEdlbmVyaWNFcnIpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBfZGVjb2RlUHJvcGVydHkodHlwZSwgZGF0YSk6IFByb21pc2U8YW55PiB7XG4gIHRyeSB7XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlIFwiU1RSSU5HXCI6IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgICAgIGxldCBzID0gXCJcIjtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgaWYgKGRhdGFbaV0gPT0gMCkge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2gocyk7XG4gICAgICAgICAgICBzID0gXCJcIjtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBzICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoZGF0YVtpXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmVzdWx0LnB1c2gocyk7XG4gICAgICAgIHJldHVybiByZXN1bHQubWFwKHF1b3RpemUpLmpvaW4oXCIsIFwiKTtcbiAgICAgIH1cbiAgICAgIGNhc2UgXCJBVE9NXCI6XG4gICAgICAgIGlmIChkYXRhLmxlbmd0aCA+IDMyKSB7XG4gICAgICAgICAgcmV0dXJuIFwiTE9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT05HXCI7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwcm9taXNlcyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpICs9IDQpIHtcbiAgICAgICAgICBjb25zdCBhID0gZGF0YS51bnBhY2soXCJMXCIsIGkpWzBdO1xuICAgICAgICAgIHByb21pc2VzLnB1c2goX3hDYlRvUHJvbWlzZShYLkdldEF0b21OYW1lLCBhKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGF3YWl0IFByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgcmV0dXJuIHJlcy5qb2luKFwiLCBcIik7XG4gICAgICAgIH0pO1xuXG4gICAgICBjYXNlIFwiQ0FSRElOQUxcIjpcbiAgICAgIGNhc2UgXCJJTlRFR0VSXCI6IHtcbiAgICAgICAgY29uc3QgcmVzID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkgKz0gNCkge1xuICAgICAgICAgIHJlcy5wdXNoKGRhdGEudW5wYWNrKFwiTFwiLCBpKVswXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlcy5qb2luKFwiLCBcIik7XG4gICAgICB9XG4gICAgICBjYXNlIFwiV0lORE9XXCI6XG4gICAgICAgIGNvbnN0IHJlcyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpICs9IDQpIHtcbiAgICAgICAgICByZXMucHVzaChkYXRhLnVucGFjayhcIkxcIiwgaSlbMF0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgXCJ3aW5kb3cgaWQjIFwiICtcbiAgICAgICAgICByZXNcbiAgICAgICAgICAgIC5tYXAobiA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiBcIjB4XCIgKyBuLnRvU3RyaW5nKDE2KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuam9pbihcIiwgXCIpXG4gICAgICAgICk7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBcIldURiBcIiArIHR5cGU7XG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gICAgY29uc29sZS5sb2codHlwZSwgZGF0YSk7XG4gICAgY29uc29sZS5lcnJvcihlKTtcbiAgICB0aHJvdyBuZXcgRXJyb3IoZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcXVvdGl6ZShpKSB7XG4gIHJldHVybiAnXCInICsgaSArICdcIic7XG59XG5cbmZ1bmN0aW9uIF9wYXJzZVdpbmRvd0lkcyhzdHJJbik6IHN0cmluZ1tdIHtcbiAgY29uc3Qgc3RyID0gc3RySW4ucmVwbGFjZShcIndpbmRvdyBpZCMgXCIsIFwiXCIpO1xuICByZXR1cm4gc3RyLnNwbGl0KFwiLCBcIik7XG59XG5cbi8vY29uc3QgdGVzdEZuID0gd3JhcFgxMShjbG9zZVdpbmRvdyk7XG4vL3Rlc3RGbignMHgwNGEwMDAwMScpLnRoZW4oKGdlbykgPT4ge1xuLy99KTtcblxuLy9jb25zdCB0ZXN0Rm4gPSB3cmFwWDExKG1vdmVUb1dvcmtzcGFjZSk7XG4vL3Rlc3RGbignMHgwNGUwMDAwMSAnLCAyKTtcblxuLy9jb25zdCB0ZXN0Rm5YID0gd3JhcFgxMShyZXN0b3JlV2luZG93UG9zaXRpb24pO1xuLy90ZXN0Rm5YKHtcbi8vICB3aW5kb3dJZDogJzB4MDRhMDAwMDEnLFxuLy8gIHg6IDAsXG4vLyAgeTogMCxcbi8vICB3aWR0aDogNTAwLFxuLy8gIGhlaWdodDogNTAwLFxuLy8gIHN0YXRlczogW1xuLy8gICAgJ19ORVRfV01fU1RBVEVfTUFYSU1JWkVEX1ZFUlQnXG4vLyAgXVxuLy99KTtcblxuLy9jb25zdCB0ZXN0Rm4yID0gd3JhcFgxMShzZXRTdGF0ZSk7XG4vL3Rlc3RGbjIoJzB4MDRhMDAwMDEnLCAncmVtb3ZlJywgWydfTkVUX1dNX1NUQVRFX01BWElNSVpFRF9WRVJUJywgJ19ORVRfV01fU1RBVEVfTUFYSU1JWkVEX0hPUlonLCAnX05FVF9XTV9TVEFURV9GVUxMU0NSRUVOJ10pXG4vLyAgLnRoZW4oKHJlcykgPT4ge1xuLy8gICAgY29uc29sZS5sb2coJ05PUk1BTCcsIHJlcyk7XG4vLyAgfSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgSVNfREVCVUcgfSBmcm9tIFwiLi9pc0RlYnVnXCI7XG5pbXBvcnQgeyBDRkcgfSBmcm9tIFwiLi9jb25maWdcIjtcbmltcG9ydCB7IHNwYXduIH0gZnJvbSBcImNoaWxkX3Byb2Nlc3NcIjtcbmltcG9ydCB7IHBhcnNlQ21kQXJncyB9IGZyb20gXCIuL3BhcnNlQ21kVG9TcGF3blwiO1xuaW1wb3J0IHsgV2luT2JqLCBXaW5PYmpJZE9ubHkgfSBmcm9tIFwiLi9tb2RlbFwiO1xuaW1wb3J0IHsgbG9nIH0gZnJvbSBcIi4vbG9nXCI7XG5pbXBvcnQgeyBnZXRBY3RpdmVXaW5kb3dJZHMsIGdldERpc3BsYXlzLCBnZXRXaW5kb3dJbmZvIH0gZnJvbSBcIi4veDExV3JhcHBlclwiO1xuXG4vLyA1MDBrYlxuY29uc3QgTUFYX0JVRkZFUiA9IDEwMjQgKiA1MDA7XG5jb25zdCBFWEVDX09QVFMgPSB7XG4gIG1heEJ1ZmZlcjogTUFYX0JVRkZFUlxufTtcblxuLy8gZGlzcGxheVxuLy8gLS0tLS0tLVxuZXhwb3J0IGZ1bmN0aW9uIGdldENvbm5lY3RlZERpc3BsYXlzSWQoKTogc3RyaW5nIHtcbiAgY29uc3QgZGlzcGxheXMgPSBnZXREaXNwbGF5cygpO1xuICByZXR1cm4gZGlzcGxheXNcbiAgICAubWFwKHNjcmVlbiA9PiBzY3JlZW4ucGl4ZWxfd2lkdGggKyBcInhcIiArIHNjcmVlbi5waXhlbF9oZWlnaHQpXG4gICAgLmpvaW4oXCI7XCIpO1xufVxuXG4vLyBPdGhlclxuLy8gLS0tLS0tLS1cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRBZGRpdGlvbmFsTWV0YURhdGFGb3JXaW4oXG4gIHdpbjogV2luT2JqSWRPbmx5XG4pOiBQcm9taXNlPFdpbk9iaj4ge1xuICBjb25zdCBzdGRvdXQgPSBhd2FpdCBnZXRXaW5kb3dJbmZvKHdpbi53aW5kb3dJZCk7XG4gIGNvbnN0IGxpbmVzID0gc3Rkb3V0LnNwbGl0KFwiXFxuXCIpO1xuICBjb25zdCB3aW5Db3B5OiBhbnkgPSB7IC4uLndpbiB9O1xuXG4gIGxpbmVzLmZvckVhY2gobGluZSA9PiB7XG4gICAgY29uc3Qgd29yZHMgPSBsaW5lLnNwbGl0KFwiIFwiKTtcbiAgICBjb25zdCBwcm9wZXJ0eU5hbWUgPSB3b3Jkc1swXTtcblxuICAgIC8vIHJlbW92ZSBwcm9wZXJ0eSBuYW1lIGFuZCBcIj1cIlxuICAgIHdvcmRzLnNwbGljZSgwLCAyKTtcbiAgICBjb25zdCB2YWx1ZSA9IHdvcmRzLmpvaW4oXCIgXCIpO1xuICAgIGNvbnN0IHByb3BlcnR5TmFtZUZyb21NYXAgPSBDRkcuV01fTUVUQV9NQVBbcHJvcGVydHlOYW1lXTtcbiAgICAvLyBwYXJzZSB3bUNsYXNzTmFtZVxuICAgIGlmIChwcm9wZXJ0eU5hbWUgPT09IFwiV01fQ0xBU1MoU1RSSU5HKVwiKSB7XG4gICAgICBjb25zdCBwcm9wZXJ0eU5hbWVGcm9tTWFwID0gQ0ZHLldNX01FVEFfTUFQW3Byb3BlcnR5TmFtZV07XG4gICAgICBjb25zdCBjbGFzc05hbWVzID0gdmFsdWUuc3BsaXQoXCIsIFwiKTtcbiAgICAgIGxldCBjbGFzc05hbWUgPSBcIlwiO1xuICAgICAgY2xhc3NOYW1lcy5mb3JFYWNoKHN0YXRlID0+IHtcbiAgICAgICAgaWYgKHN0YXRlICE9PSBcIlwiKSB7XG4gICAgICAgICAgY2xhc3NOYW1lICs9IHN0YXRlLnJlcGxhY2UoL1wiL2csIFwiXCIpICsgXCIuXCI7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgd2luQ29weVtwcm9wZXJ0eU5hbWVGcm9tTWFwXSA9IGNsYXNzTmFtZS5zdWJzdHIoMCwgY2xhc3NOYW1lLmxlbmd0aCAtIDIpO1xuICAgIH1cbiAgICAvLyBwYXJzZSBzdGF0ZXNcbiAgICBlbHNlIGlmIChwcm9wZXJ0eU5hbWUgPT09IFwiX05FVF9XTV9TVEFURShBVE9NKVwiKSB7XG4gICAgICBjb25zdCBzdGF0ZXMgPSB2YWx1ZS5zcGxpdChcIiwgXCIpO1xuICAgICAgd2luQ29weS5zdGF0ZXMgPSBbXTtcbiAgICAgIHN0YXRlcy5mb3JFYWNoKHN0YXRlID0+IHtcbiAgICAgICAgaWYgKHN0YXRlICE9PSBcIlwiKSB7XG4gICAgICAgICAgd2luQ29weS5zdGF0ZXMucHVzaChzdGF0ZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICAvLyBwYXJzZSBzaW1wbGUgc3RyaW5ncyBhbmQgaW50ZWdlcnNcbiAgICBlbHNlIGlmIChwcm9wZXJ0eU5hbWVGcm9tTWFwKSB7XG4gICAgICAvLyBzcGVjaWFsIGhhbmRsZSBudW1iZXIgdHlwZXNcbiAgICAgIGlmIChDRkcuV01fTUVUQV9NQVBfTlVNQkVSX1RZUEVTLmluZGV4T2YocHJvcGVydHlOYW1lKSA+IC0xKSB7XG4gICAgICAgIHdpbkNvcHlbcHJvcGVydHlOYW1lRnJvbU1hcF0gPSBwYXJzZUludCh2YWx1ZSwgMTApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2luQ29weVtwcm9wZXJ0eU5hbWVGcm9tTWFwXSA9IHZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG4gIC8vIGNvbnNvbGUubG9nKHdpbkNvcHkpO1xuICByZXR1cm4gd2luQ29weTtcbn1cblxuLy8gVE9ETyBwcmV0dGlmeSBhcmdzIHN0cnVjdHVyZVxuZXhwb3J0IGZ1bmN0aW9uIHN0YXJ0UHJvZ3JhbShcbiAgZXhlY3V0YWJsZUZpbGU6IHN0cmluZyxcbiAgZGVza3RvcEZpbGVQYXRoOiBzdHJpbmdcbik6IFByb21pc2U8dm9pZD4ge1xuICBJU19ERUJVRyAmJlxuICAgIGNvbnNvbGUubG9nKFwiREVCVUc6IHN0YXJ0UHJvZ3JhbSgpOlwiLCBleGVjdXRhYmxlRmlsZSwgZGVza3RvcEZpbGVQYXRoKTtcblxuICBsZXQgY21kO1xuICBsZXQgYXJncyA9IFtdO1xuICBpZiAoZGVza3RvcEZpbGVQYXRoKSB7XG4gICAgY21kID0gYGF3a2A7XG4gICAgYXJncy5wdXNoKFxuICAgICAgJy9eRXhlYz0vIHtzdWIoXCJeRXhlYz1cIiwgXCJcIik7IGdzdWIoXCIgPyVbY0RkRmZpa21OblV1dl1cIiwgXCJcIik7IGV4aXQgc3lzdGVtKCQwKX0nXG4gICAgKTtcbiAgICBhcmdzLnB1c2goZGVza3RvcEZpbGVQYXRoKTtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBwYXJzZWRDbWQgPSBwYXJzZUNtZEFyZ3MoZXhlY3V0YWJsZUZpbGUpO1xuICAgIGNtZCA9IHBhcnNlZENtZFswXTtcbiAgICBhcmdzID0gcGFyc2VkQ21kWzFdO1xuICB9XG5cbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bGZpbGwgPT4ge1xuICAgIHNwYXduKGNtZCwgYXJncywge1xuICAgICAgc3RkaW86IFwiaWdub3JlXCIsXG4gICAgICBkZXRhY2hlZDogdHJ1ZVxuICAgIH0pLnVucmVmKCk7XG5cbiAgICAvLyBjdXJyZW50bHkgd2UgaGF2ZSBubyBlcnJvciBoYW5kbGluZyBhcyB0aGUgcHJvY2VzcyBpcyBzdGFydGVkIGRldGFjaGVkXG4gICAgZnVsZmlsbCgpO1xuICB9KTtcbn1cblxuLy8gR0VUIEFDVElWRSBXSU5ET1cgTElTVFxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEFjdGl2ZVdpbmRvd0xpc3QoKTogUHJvbWlzZTxXaW5PYmpbXT4ge1xuICBjb25zdCB3aW5kb3dJZHMgPSBhd2FpdCBnZXRBY3RpdmVXaW5kb3dJZHMoKTtcbiAgY29uc3Qgd2luZG93TGlzdDogV2luT2JqSWRPbmx5W10gPSBbXTtcbiAgd2luZG93SWRzLmZvckVhY2god2luZG93SWQgPT4ge1xuICAgIHdpbmRvd0xpc3QucHVzaCh7XG4gICAgICB3aW5kb3dJZDogd2luZG93SWQsXG4gICAgICB3aW5kb3dJZERlYzogcGFyc2VJbnQod2luZG93SWQsIDE2KVxuICAgIH0pO1xuICB9KTtcblxuICAvLyBhZGQgbWV0YSBkYXRhIHJpZ2h0IGF3YXlcbiAgY29uc3QgcHJvbWlzZXMgPSB3aW5kb3dMaXN0Lm1hcCh3aW4gPT4gZ2V0QWRkaXRpb25hbE1ldGFEYXRhRm9yV2luKHdpbikpO1xuXG4gIGNvbnN0IHdpbmRvd3NXaXRoRGF0YTogV2luT2JqW10gPSAoYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZXMpKSBhcyBXaW5PYmpbXTtcblxuICBJU19ERUJVRyAmJiBjb25zb2xlLmxvZyhcIkRFQlVHOiBnZXRBY3RpdmVXaW5kb3dMaXN0KCk6XCIsIHdpbmRvd0xpc3QpO1xuICByZXR1cm4gd2luZG93c1dpdGhEYXRhLmZpbHRlcihfZmlsdGVySW52YWxpZFdpbmRvd3MpO1xufVxuXG5mdW5jdGlvbiBfZmlsdGVySW52YWxpZFdpbmRvd3Mod2luOiBXaW5PYmopOiBib29sZWFuIHtcbiAgLy8gZmlsdGVyIG5vbmUgbm9ybWFsIHdpbmRvd3MsIGV4Y2x1ZGVkIGNsYXNzIG5hbWVzIGFuZCBpbmNvbXBsZXRlIHdpbmRvd3NcbiAgLy8gTk9URTogaWYgdGhlcmUgaXMgbm8gdHlwZSB3ZSBhc3N1bWUgaXQncyBub3JtYWwgdG9vXG4gIGNvbnN0IGlzTm9ybWFsV2luZG93ID1cbiAgICAoIXdpbi53bVR5cGUgfHwgd2luLndtVHlwZS5pbmNsdWRlcyhcIl9ORVRfV01fV0lORE9XX1RZUEVfTk9STUFMXCIpKSAmJlxuICAgICghd2luLndtUm9sZSB8fCB3aW4ud21Sb2xlICE9PSBcInBvcC11cFwiKTtcblxuICBjb25zdCBpc05vdEV4Y2x1ZGVkID0gIV9pc0V4Y2x1ZGVkV21DbGFzc05hbWUod2luLndtQ2xhc3NOYW1lKTtcbiAgY29uc3QgaGFzV21DbGFzc05hbWUgPSAhIXdpbi53bUNsYXNzTmFtZTtcblxuICAvLyB3YXJuIGlmIG5vIHdtQ2xhc3NOYW1lIGV2ZW4gdGhvdWdoIHRoZXJlIHNob3VsZCBiZVxuICBpZiAoaXNOb3JtYWxXaW5kb3cgJiYgaXNOb3RFeGNsdWRlZCAmJiAhaGFzV21DbGFzc05hbWUpIHtcbiAgICBjb25zb2xlLndhcm4od2luLndpbmRvd0lkICsgXCIgaGFzIG5vIHdtQ2xhc3NOYW1lLiBXaW46IFwiLCB3aW4pO1xuICB9XG5cbiAgcmV0dXJuIGlzTm9ybWFsV2luZG93ICYmIGlzTm90RXhjbHVkZWQgJiYgaGFzV21DbGFzc05hbWU7XG59XG5cbmZ1bmN0aW9uIF9pc0V4Y2x1ZGVkV21DbGFzc05hbWUod21DbGFzc05hbWUpOiBib29sZWFuIHtcbiAgcmV0dXJuIENGRy5XTV9DTEFTU19FWENMVVNJT05TLmluZGV4T2Yod21DbGFzc05hbWUpID4gLTE7XG59XG5cbmZ1bmN0aW9uIF9jYXRjaEdlbmVyaWNFcnIoZXJyKTogdm9pZCB7XG4gIGNvbnNvbGUuZXJyb3IoXCJvdGhlckNtZDogR2VuZXJpYyBFcnJvclwiLCBlcnIsIGVyci5zdGFjayk7XG4gIGxvZyhcIm90aGVyQ21kOlwiLCBhcmd1bWVudHMpO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5pbXBvcnQgeyBnZXRXaW5kb3dHZW9tZXRyeSwgZ29Ub1ZpZXdwb3J0IH0gZnJvbSBcIi4veDExV3JhcHBlclwiO1xuaW1wb3J0IHsgZ2V0QWN0aXZlV2luZG93TGlzdCB9IGZyb20gXCIuL290aGVyQ21kXCI7XG5pbXBvcnQgeyBDRkcgfSBmcm9tIFwiLi9jb25maWdcIjtcbmltcG9ydCB7IFdpbk9iaiB9IGZyb20gXCIuL21vZGVsXCI7XG5cbmNvbnN0IGZpbmR1cCA9IHJlcXVpcmUoXCJmaW5kdXAtc3luY1wiKTtcblxuY29uc3QgSE9NRV9ESVIgPSBwcm9jZXNzLmVudltcIkhPTUVcIl07XG5jb25zdCBERUZBVUxUX0RFU0tUT1BfRklMRV9MT0NBVElPTlMgPSBbXG4gIFwie2hvbWV9Ly5sb2NhbC9zaGFyZS9hcHBsaWNhdGlvbnNcIixcbiAgXCJ7aG9tZX0vLmdub21lL2FwcHMvXCIsXG4gIFwiL3Vzci9zaGFyZS9hcHBsaWNhdGlvbnNcIixcbiAgXCIvdXNyL2xvY2FsL3NoYXJlL2FwcGxpY2F0aW9uc1wiLFxuICBcIi91c3Ivc2hhcmUvYXBwLWluc3RhbGxcIlxuXTtcblxuZnVuY3Rpb24gX2NhdGNoR2VuZXJpY0VycihlcnIpIHtcbiAgY29uc29sZS5lcnJvcihcIkdlbmVyaWMgRXJyb3IgaW4gTWV0YSBXcmFwcGVyXCIsIGVyciwgZXJyLnN0YWNrKTtcbiAgdGhyb3cgZXJyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ29Ub0ZpcnN0V29ya3NwYWNlKCkge1xuICByZXR1cm4gZ29Ub1ZpZXdwb3J0KDAsIDApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmluZERlc2t0b3BGaWxlKGZpbGVOYW1lKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgoZnVsZmlsbCwgcmVqZWN0KSA9PiB7XG4gICAgY29uc3QgZGVza3RvcEZpbGVMb2NhdGlvbnMgPVxuICAgICAgQ0ZHLkRFU0tUT1BfRklMRV9MT0NBVElPTlMgfHwgREVGQVVMVF9ERVNLVE9QX0ZJTEVfTE9DQVRJT05TO1xuXG4gICAgY29uc3QgcGFyZW50RGlycyA9IGRlc2t0b3BGaWxlTG9jYXRpb25zLm1hcChwYXJlbnREaXIgPT4ge1xuICAgICAgcmV0dXJuIHBhcmVudERpci5yZXBsYWNlKFwie2hvbWV9XCIsIEhPTUVfRElSKTtcbiAgICB9KTtcblxuICAgIGxldCBmaXJzdEZpbGU7XG4gICAgY29uc3QgbWF0Y2ggPSBwYXJlbnREaXJzLmZpbmQoZGlyID0+IHtcbiAgICAgIGZpcnN0RmlsZSA9IGZpbmR1cChmaWxlTmFtZSwgeyBjd2Q6IGRpciB9KTtcblxuICAgICAgaWYgKCFmaXJzdEZpbGUpIHtcbiAgICAgICAgLy8gc25hcCBkZXNrdG9wIGZpbGVzIG5vdyBsb29rIGxpa2UgdGhpcyA9PiBmaXJlZm94X2ZpcmVmb3guZGVza3RvcFxuICAgICAgICBmaXJzdEZpbGUgPSBmaW5kdXAoYCR7ZmlsZU5hbWUucmVwbGFjZShcIi5kZXNrdG9wXCIsIFwiX1wiKX0ke2ZpbGVOYW1lfWAsIHtcbiAgICAgICAgICBjd2Q6IGRpclxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmaXJzdEZpbGU7XG4gICAgfSk7XG5cbiAgICBpZiAoIWZpcnN0RmlsZSB8fCAhbWF0Y2gpIHtcbiAgICAgIGNvbnN0IGVyciA9IGBFUlI6IGZpbmREZXNrdG9wRmlsZSgpIGNhbnQgZmluZCBmaWxlIFwiJHtmaWxlTmFtZX1cIiEgU2VhcmNoZWQgZGVza3RvcEZpbGVMb2NhdGlvbnM6YDtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyLCBkZXNrdG9wRmlsZUxvY2F0aW9ucyk7XG4gICAgICByZWplY3QoZXJyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZnVsZmlsbChmaXJzdEZpbGUpO1xuICAgIH1cbiAgfSkuY2F0Y2goX2NhdGNoR2VuZXJpY0Vycik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRBY3RpdmVXaW5kb3dMaXN0RmxvdygpOiBQcm9taXNlPFdpbk9ialtdIHwgYW55PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAoZnVsZmlsbCwgcmVqZWN0KSA9PiB7XG4gICAgcmV0dXJuIGdldEFjdGl2ZVdpbmRvd0xpc3QoKS50aGVuKGFzeW5jICh3aW5kb3dMaXN0OiBhbnlbXSkgPT4ge1xuICAgICAgY29uc3QgcHJvbWlzZXMgPSB3aW5kb3dMaXN0Lm1hcCh3aW4gPT4ge1xuICAgICAgICByZXR1cm4gZ2V0V2luZG93R2VvbWV0cnkod2luLndpbmRvd0lkKS50aGVuKChnZW86IGFueSkgPT4ge1xuICAgICAgICAgIGZvciAobGV0IHByb3AgaW4gZ2VvKSB7XG4gICAgICAgICAgICBpZiAoZ2VvLmhhc093blByb3BlcnR5KHByb3ApKSB7XG4gICAgICAgICAgICAgIHdpbltwcm9wXSA9IGdlb1twcm9wXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBUT0RPIG9yZ2FuaXplIGFkZGluZyBvZiBhbGwgdGhvc2UgZGlmZmVyZW50IHByb3BlcnRpZXMgYmV0dGVyXG4gICAgICAgICAgLy8gYWRkIG1pc3Npbmcgc3RhdGljIHByb3BlcnRpZXNcbiAgICAgICAgICB3aW4uc2ltcGxlTmFtZSA9IF9wYXJzZVNpbXBsZVdpbmRvd05hbWUod2luLndtQ2xhc3NOYW1lKTtcbiAgICAgICAgICByZXR1cm4gd2luO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyB3ZSdyZSB1c2luZyBhIHdhdGVyZmFsbCBiZWNhdXNlIHdlJ3JlIGRlYWxpbmcgd2l0aCB4MTEgcmVxdWVzdHNcbiAgICAgIGlmIChwcm9taXNlcy5sZW5ndGgpIHtcbiAgICAgICAgZm9yIChjb25zdCBwcm9taXNlIG9mIHByb21pc2VzKSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGF3YWl0IHByb21pc2U7XG4gICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfYWRkUGFyc2VkRXhlY3V0YWJsZUZpbGVzRnJvbVdtQ2xhc3NOYW1lcyh3aW5kb3dMaXN0KS50aGVuKFxuICAgICAgICAgIHdpbmRvd0xpc3RXaXRoV21DbGFzc05hbWVzID0+IHtcbiAgICAgICAgICAgIGZ1bGZpbGwod2luZG93TGlzdFdpdGhXbUNsYXNzTmFtZXMpO1xuICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZ1bGZpbGwoW10pO1xuICAgICAgfVxuICAgIH0pO1xuICB9KS5jYXRjaChfY2F0Y2hHZW5lcmljRXJyKTtcbn1cblxuLy8gTUlYRURcbmZ1bmN0aW9uIF9hZGRQYXJzZWRFeGVjdXRhYmxlRmlsZXNGcm9tV21DbGFzc05hbWVzKHdpbmRvd0xpc3QpOiBQcm9taXNlPGFueT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKGZ1bGZpbGwsIHJlamVjdCkgPT4ge1xuICAgIGNvbnN0IHByb21pc2VzID0gd2luZG93TGlzdFxuICAgICAgLmZpbHRlcih3aW4gPT4gIXdpbi5leGVjdXRhYmxlRmlsZSlcbiAgICAgIC5tYXAod2luID0+IHtcbiAgICAgICAgcmV0dXJuIF9wYXJzZUV4ZWN1dGFibGVGaWxlRnJvbVdtQ2xhc3NOYW1lKHdpbi53bUNsYXNzTmFtZSkudGhlbihcbiAgICAgICAgICBmaWxlTmFtZSA9PiB7XG4gICAgICAgICAgICB3aW4uZXhlY3V0YWJsZUZpbGUgPSBmaWxlTmFtZTtcbiAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICB9KTtcblxuICAgIGlmIChwcm9taXNlcy5sZW5ndGgpIHtcbiAgICAgIGZvciAoY29uc3QgcHJvbWlzZSBvZiBwcm9taXNlcykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGF3YWl0IHByb21pc2U7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICByZWplY3QoZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGZ1bGZpbGwod2luZG93TGlzdCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZ1bGZpbGwod2luZG93TGlzdCk7XG4gICAgfVxuICB9KS5jYXRjaChfY2F0Y2hHZW5lcmljRXJyKTtcbn1cblxuZnVuY3Rpb24gX3BhcnNlRXhlY3V0YWJsZUZpbGVGcm9tV21DbGFzc05hbWUod21DbGFzc05hbWUpOiBQcm9taXNlPGFueT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKGZ1bGZpbGwsIHJlamVjdCkgPT4ge1xuICAgIGNvbnN0IGV4ZWN1dGFibGVGaWxlRnJvbU1hcCA9XG4gICAgICBDRkcuV01fQ0xBU1NfQU5EX0VYRUNVVEFCTEVfRklMRV9NQVBbd21DbGFzc05hbWVdO1xuICAgIGlmIChleGVjdXRhYmxlRmlsZUZyb21NYXApIHtcbiAgICAgIGZ1bGZpbGwoZXhlY3V0YWJsZUZpbGVGcm9tTWFwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qgc3BsaXRWYWx1ZXMgPSB3bUNsYXNzTmFtZS5zcGxpdChcIi5cIik7XG4gICAgICBjb25zdCBmaWxlTmFtZSA9IHNwbGl0VmFsdWVzWzBdO1xuICAgICAgaWYgKF9pc0Nocm9tZUFwcChmaWxlTmFtZSkpIHtcbiAgICAgICAgX3BhcnNlQ2hyb21lQXBwRGVza3RvcEZpbGVOYW1lKGZpbGVOYW1lKVxuICAgICAgICAgIC50aGVuKGZ1bGZpbGwpXG4gICAgICAgICAgLmNhdGNoKHJlamVjdCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmdWxmaWxsKGZpbGVOYW1lICsgXCIuZGVza3RvcFwiKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pLmNhdGNoKF9jYXRjaEdlbmVyaWNFcnIpO1xufVxuXG5mdW5jdGlvbiBfcGFyc2VTaW1wbGVXaW5kb3dOYW1lKHdtQ2xhc3NOYW1lKSB7XG4gIGNvbnN0IHNwbGl0VmFsdWVzID0gd21DbGFzc05hbWUuc3BsaXQoXCIuXCIpO1xuICBpZiAoc3BsaXRWYWx1ZXNbMV0pIHtcbiAgICByZXR1cm4gc3BsaXRWYWx1ZXNbMV07XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHdtQ2xhc3NOYW1lO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9pc0Nocm9tZUFwcChmaWxlTmFtZSkge1xuICByZXR1cm4gISFmaWxlTmFtZS5tYXRjaCgvXmNyeF8vKTtcbn1cblxuZnVuY3Rpb24gX3BhcnNlQ2hyb21lQXBwRGVza3RvcEZpbGVOYW1lKGZpbGVOYW1lKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgLy8gd2Ugd2FuJ3QgdG8gc2VhcmNoIGZyb20gZGVza3RvcCBmaWxlcyBvbmx5XG4gICAgY29uc3QgbG9jYXRlU3RyID0gZmlsZU5hbWUucmVwbGFjZShcImNyeF9cIiwgXCIqXCIpICsgXCIqLmRlc2t0b3BcIjtcbiAgICBmaW5kRGVza3RvcEZpbGUobG9jYXRlU3RyKVxuICAgICAgLnRoZW4ocmVzb2x2ZSlcbiAgICAgIC5jYXRjaChyZWplY3QpO1xuICB9KS5jYXRjaChfY2F0Y2hHZW5lcmljRXJyKTtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuaW1wb3J0IHsgQ0ZHLCBTRVNTSU9OX0RBVEFfRElSIH0gZnJvbSBcIi4vY29uZmlnXCI7XG5pbXBvcnQgKiBhcyBmcyBmcm9tIFwiZnNcIjtcbmltcG9ydCB7IGdldENvbm5lY3RlZERpc3BsYXlzSWQsIHN0YXJ0UHJvZ3JhbSB9IGZyb20gXCIuL290aGVyQ21kXCI7XG5pbXBvcnQge1xuICBjbG9zZVdpbmRvdyxcbiAgZ2V0WCxcbiAgaW5pdFgxMSxcbiAgbW92ZVRvV29ya3NwYWNlLFxuICByZXN0b3JlV2luZG93UG9zaXRpb25cbn0gZnJvbSBcIi4veDExV3JhcHBlclwiO1xuaW1wb3J0IHtcbiAgZmluZERlc2t0b3BGaWxlLFxuICBnZXRBY3RpdmVXaW5kb3dMaXN0RmxvdyxcbiAgZ29Ub0ZpcnN0V29ya3NwYWNlXG59IGZyb20gXCIuL21ldGFXcmFwcGVyXCI7XG5pbXBvcnQgeyBsb2cgfSBmcm9tIFwiLi9sb2dcIjtcbmltcG9ydCB7IFdpbk9iaiB9IGZyb20gXCIuL21vZGVsXCI7XG5pbXBvcnQgeyBleGVjIH0gZnJvbSBcImNoaWxkX3Byb2Nlc3NcIjtcblxuLy8gaW1wb3J0ICogYXMgU3RvcmUgZnJvbSAnamZzJztcbmNvbnN0IFN0b3JlID0gcmVxdWlyZShcImpmc1wiKTtcblxuLy8gY3JlYXRlIGRhdGEgc3RvcmVcbmNvbnN0IGRiID0gbmV3IFN0b3JlKFNFU1NJT05fREFUQV9ESVIsIHtcbiAgcHJldHR5OiBDRkcuU0FWRV9TRVNTSU9OX0lOX1BSRVRUWV9GT1JNQVRcbn0pO1xuXG4vLyBzZXR1cCBtZXRhIHdyYXBwZXJcblxuLy8gRVhQT1JUXG4vLyAtLS0tLS1cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbGlzdFNlc3Npb25zLFxuICByZW5hbWVTZXNzaW9uLFxuICBzYXZlU2Vzc2lvbixcbiAgcmVtb3ZlU2Vzc2lvbixcbiAgcmVzdG9yZVNlc3Npb24sXG4gIGdldFNlc3Npb25zLFxuICBnZXRYOiBnZXRYLFxuXG4gIGdldENvbm5lY3RlZERpc3BsYXlzSWQsXG4gIHJlc2V0Q2ZnOiAoKSA9PiB7XG4gICAgY29uc3QgY29uZmlnRmlsZVBhdGggPSBDRkcuREFUQV9ESVIgKyBcIi9jb25maWcuanNvblwiO1xuICAgIGlmIChmcy5leGlzdHNTeW5jKGNvbmZpZ0ZpbGVQYXRoKSkge1xuICAgICAgZnMudW5saW5rU3luYyhjb25maWdGaWxlUGF0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJObyBDb25maWcgcHJlc2VudCBpbiBcIiArIGNvbmZpZ0ZpbGVQYXRoKTtcbiAgICB9XG4gIH0sXG4gIGdldENmZzogKCkgPT4ge1xuICAgIHJldHVybiBDRkc7XG4gIH0sXG4gIGdldERiOiAoKSA9PiB7XG4gICAgcmV0dXJuIGRiO1xuICB9XG59O1xuXG4vLyBIRUxQRVJcbi8vIC0tLS0tLS0tXG5mdW5jdGlvbiBfY2F0Y2hHZW5lcmljRXJyKGVycikge1xuICBjb25zb2xlLmVycm9yKFwiR2VuZXJpYyBFcnJvciBpbiBNYWluIEhhbmRsZXJcIiwgZXJyLCBlcnIuc3RhY2spO1xuICB0aHJvdyBlcnI7XG59XG5cbmZ1bmN0aW9uIGdldFNlc3Npb25zKCkge1xuICByZXR1cm4gZGIuYWxsU3luYygpO1xufVxuXG4vLyBNQUlOIEZVTkNUSU9OU1xuLy8gLS0tLS0tLS0tLS0tLS1cbmZ1bmN0aW9uIGxpc3RTZXNzaW9ucygpIHtcbiAgbGV0IGxpc3QgPSBPYmplY3Qua2V5cyhnZXRTZXNzaW9ucygpKTtcbiAgbGlzdC5mb3JFYWNoKG5hbWUgPT4ge1xuICAgIGxvZyhuYW1lKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHJlbmFtZVNlc3Npb24ob2xkTmFtZTogc3RyaW5nLCBuZXdOYW1lOiBzdHJpbmcpIHtcbiAgbGV0IG9iaiA9IGRiLmdldFN5bmMob2xkTmFtZSk7XG4gIGlmIChvYmoubWVzc2FnZSkge1xuICAgIGlmIChvYmoubWVzc2FnZSA9PT0gXCJjb3VsZCBub3QgbG9hZCBkYXRhXCIpIHtcbiAgICAgIGxvZyhgRXJyb3I6IENvdWxkIG5vdCBmaW5kIGEgc2Vzc2lvbiBuYW1lZCAnJHtvbGROYW1lfSdgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbG9nKG9iai5tZXNzYWdlKTtcbiAgICB9XG4gICAgcmV0dXJuO1xuICB9XG4gIGRiLnNhdmVTeW5jKG5ld05hbWUsIG9iaik7XG4gIGRiLmRlbGV0ZShvbGROYW1lKTtcbn1cblxuZnVuY3Rpb24gc2F2ZVNlc3Npb24oc2Vzc2lvbk5hbWU6IHN0cmluZywgaW5wdXRIYW5kbGVycyk6IFByb21pc2U8YW55PiB7XG4gIGNvbnN0IHNlc3Npb25Ub0hhbmRsZSA9IHNlc3Npb25OYW1lIHx8IFwiREVGQVVMVFwiO1xuXG4gIHJldHVybiBpbml0WDExKClcbiAgICAudGhlbigoKSA9PiB7XG4gICAgICByZXR1cm4gZ2V0QWN0aXZlV2luZG93TGlzdEZsb3coKTtcbiAgICB9KVxuICAgIC50aGVuKHdpbmRvd0xpc3QgPT4ge1xuICAgICAgLy8gZGVza3RvcCBmaWxlIHBhdGhzIGFuZCBjb25uZWN0ZWQgZGlzcGxheSBpZHNcbiAgICAgIHJldHVybiBfZ3Vlc3NBbmRTZXREZXNrdG9wRmlsZVBhdGhzKFxuICAgICAgICB3aW5kb3dMaXN0LFxuICAgICAgICBpbnB1dEhhbmRsZXJzLmRlc2t0b3BGaWxlUGF0aFxuICAgICAgKTtcbiAgICB9KVxuICAgIC50aGVuKHdpbmRvd0xpc3QgPT4ge1xuICAgICAgY29uc3QgY29ubmVjdGVkRGlzcGxheXNJZCA9IGdldENvbm5lY3RlZERpc3BsYXlzSWQoKTtcbiAgICAgIHJldHVybiBzYXZlU2Vzc2lvbkZvckRpc3BsYXlUb0RiKFxuICAgICAgICBzZXNzaW9uVG9IYW5kbGUsXG4gICAgICAgIGNvbm5lY3RlZERpc3BsYXlzSWQsXG4gICAgICAgIHdpbmRvd0xpc3RcbiAgICAgICk7XG4gICAgfSlcbiAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJzYXZlU2Vzc2lvbigpOiBBbiBlcnJvciBvY2N1cnJlZFwiLCBlcnIpO1xuICAgICAgdGhyb3cgZXJyO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBzYXZlU2Vzc2lvbkZvckRpc3BsYXlUb0RiKFxuICBzZXNzaW9uVG9IYW5kbGU6IHN0cmluZyxcbiAgY29ubmVjdGVkRGlzcGxheXNJZDogc3RyaW5nLFxuICB3aW5kb3dMaXN0OiBXaW5PYmpbXVxuKTogUHJvbWlzZTx2b2lkPiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgoZnVsZmlsbCwgcmVqZWN0KSA9PiB7XG4gICAgLy8gY2hlY2sgaWYgZW50cnkgZXhpc3RzIGFuZCB1cGRhdGVcbiAgICBkYi5nZXQoc2Vzc2lvblRvSGFuZGxlLCAoZXJyLCBzZXNzaW9uRGF0YSkgPT4ge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICAvLyBOT1RFOiB3ZSdyZSBub3QgZmFpbGluZyBiZWNhdXNlLCB0aGUgY2FzZSBpcyBwcm9iYWJseSB0aGF0IHRoZXJlIGlzIG5vIHNlc3Npb24gZmlsZSB5ZXRcbiAgICAgICAgbG9nKFxuICAgICAgICAgIGBzYXZlU2Vzc2lvbkZvckRpc3BsYXlUb0RiOiBubyBzZXNzaW9uIGZpbGUgcHJlc2VudCB5ZXQgZm9yIFwiJHtzZXNzaW9uVG9IYW5kbGV9XCIsIGNyZWF0aW5nIGEgbmV3IG9uZS4uLmBcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFzZXNzaW9uRGF0YSkge1xuICAgICAgICAvLyBjcmVhdGUgbmV3IG9iamVjdFxuICAgICAgICBzZXNzaW9uRGF0YSA9IHtcbiAgICAgICAgICBuYW1lOiBzZXNzaW9uVG9IYW5kbGVcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIGlmIChcbiAgICAgICAgIXNlc3Npb25EYXRhLmRpc3BsYXlzQ29tYmluYXRpb25zIHx8XG4gICAgICAgICFBcnJheS5pc0FycmF5KHNlc3Npb25EYXRhLmRpc3BsYXlzQ29tYmluYXRpb25zKVxuICAgICAgKSB7XG4gICAgICAgIC8vIGNyZWF0ZSBuZXcgYXJyYXlcbiAgICAgICAgc2Vzc2lvbkRhdGEuZGlzcGxheXNDb21iaW5hdGlvbnMgPSBbXTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZXhpc3RpbmdEaXNwbGF5RW50cnkgPSBzZXNzaW9uRGF0YS5kaXNwbGF5c0NvbWJpbmF0aW9ucy5maW5kKFxuICAgICAgICBlbnRyeSA9PiBlbnRyeS5pZCA9PT0gY29ubmVjdGVkRGlzcGxheXNJZFxuICAgICAgKTtcbiAgICAgIGlmIChleGlzdGluZ0Rpc3BsYXlFbnRyeSkge1xuICAgICAgICBleGlzdGluZ0Rpc3BsYXlFbnRyeS53aW5kb3dMaXN0ID0gd2luZG93TGlzdDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNlc3Npb25EYXRhLmRpc3BsYXlzQ29tYmluYXRpb25zLnB1c2goe1xuICAgICAgICAgIGlkOiBjb25uZWN0ZWREaXNwbGF5c0lkLFxuICAgICAgICAgIHdpbmRvd0xpc3RcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGRiLnNhdmUoc2Vzc2lvblRvSGFuZGxlLCBzZXNzaW9uRGF0YSwgZXJyID0+IHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxvZyhcIlNBVkVEIFNFU1NJT046IFwiICsgc2Vzc2lvblRvSGFuZGxlKTtcbiAgICAgICAgICBmdWxmaWxsKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gcmVzdG9yZVNlc3Npb24oXG4gIHNlc3Npb25OYW1lOiBzdHJpbmcsXG4gIGlzQ2xvc2VBbGxPcGVuV2luZG93czogYm9vbGVhblxuKTogUHJvbWlzZTxhbnk+IHtcbiAgY29uc3Qgc2Vzc2lvblRvSGFuZGxlID0gc2Vzc2lvbk5hbWUgfHwgXCJERUZBVUxUXCI7XG5cbiAgcmV0dXJuIG5ldyBQcm9taXNlKChmdWxmaWxsLCByZWplY3QpID0+IHtcbiAgICBkYi5nZXQoc2Vzc2lvblRvSGFuZGxlIHx8IFwiREVGQVVMVFwiLCAoZXJyLCBzZXNzaW9uRGF0YSkgPT4ge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBsZXQgc2F2ZWRXaW5kb3dMaXN0O1xuXG4gICAgICBpbml0WDExKClcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIHJldHVybiBfY2xvc2VBbGxXaW5kb3dzSWZTZXQoaXNDbG9zZUFsbE9wZW5XaW5kb3dzKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oZ29Ub0ZpcnN0V29ya3NwYWNlKVxuICAgICAgICAudGhlbihnZXRDb25uZWN0ZWREaXNwbGF5c0lkKVxuICAgICAgICAudGhlbihjb25uZWN0ZWREaXNwbGF5c0lkID0+IHtcbiAgICAgICAgICBpZiAoIXNlc3Npb25EYXRhLmRpc3BsYXlzQ29tYmluYXRpb25zKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBubyBkaXNwbGF5IGNvbWJpbmF0aW9ucyBzYXZlZCB5ZXRgKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBkaXNwbGF5RW50cnkgPSBzZXNzaW9uRGF0YS5kaXNwbGF5c0NvbWJpbmF0aW9ucy5maW5kKFxuICAgICAgICAgICAgZW50cnkgPT4gZW50cnkuaWQgPT09IGNvbm5lY3RlZERpc3BsYXlzSWRcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgaWYgKGRpc3BsYXlFbnRyeSkge1xuICAgICAgICAgICAgc2F2ZWRXaW5kb3dMaXN0ID0gZGlzcGxheUVudHJ5LndpbmRvd0xpc3Q7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgICAgIGBubyBkYXRhIGZvciBjdXJyZW50IGRpc3BsYXkgaWQgJyR7Y29ubmVjdGVkRGlzcGxheXNJZH0nIHNhdmVkIHlldGBcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBnZXRBY3RpdmVXaW5kb3dMaXN0RmxvdygpO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbihjdXJyZW50V2luZG93TGlzdCA9PiB7XG4gICAgICAgICAgcmV0dXJuIF9zdGFydFNlc3Npb25Qcm9ncmFtcyhzYXZlZFdpbmRvd0xpc3QsIGN1cnJlbnRXaW5kb3dMaXN0KTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIC8vIGdldHMgY3VycmVudCB3aW5kb3cgbGlzdCBieSBpdHNlbGYgYW5kIHJldHVybnMgdGhlIHVwZGF0ZWQgdmFyaWFudFxuICAgICAgICAgIHJldHVybiBfd2FpdEZvckFsbEFwcHNUb1N0YXJ0KHNhdmVkV2luZG93TGlzdCk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKFxuICAgICAgICAgICh1cGRhdGVkQ3VycmVudFdpbmRvd0xpc3Q6IFdpbk9ialtdKSA9PlxuICAgICAgICAgICAgbmV3IFByb21pc2UocmVzb2x2ZSA9PlxuICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHVwZGF0ZWRDdXJyZW50V2luZG93TGlzdCk7XG4gICAgICAgICAgICAgIH0sIDUwMClcbiAgICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgICAudGhlbigodXBkYXRlZEN1cnJlbnRXaW5kb3dMaXN0OiBXaW5PYmpbXSkgPT4ge1xuICAgICAgICAgIF91cGRhdGVXaW5kb3dJZHMoc2F2ZWRXaW5kb3dMaXN0LCB1cGRhdGVkQ3VycmVudFdpbmRvd0xpc3QpO1xuICAgICAgICAgIHJldHVybiBfcmVzdG9yZVdpbmRvd1Bvc2l0aW9ucyhzYXZlZFdpbmRvd0xpc3QpO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgbG9nKFwiUkVTVE9SRUQgU0VTU0lPTjogXCIgKyBzZXNzaW9uVG9IYW5kbGUpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiQW4gZXJyb3Igb2NjdXJyZWRcIiwgZXJyKTtcbiAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oZnVsZmlsbCk7XG4gICAgfSk7XG4gIH0pLmNhdGNoKF9jYXRjaEdlbmVyaWNFcnIpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTZXNzaW9uKHNlc3Npb25OYW1lOiBzdHJpbmcpOiBQcm9taXNlPHVua25vd24+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChmdWxmaWxsLCByZWplY3QpID0+IHtcbiAgICBmcy51bmxpbmsoQ0ZHLlNFU1NJT05fREFUQV9ESVIgKyBcIi9cIiArIHNlc3Npb25OYW1lICsgXCIuanNvblwiLCBlcnJvciA9PiB7XG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmdWxmaWxsKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pLmNhdGNoKF9jYXRjaEdlbmVyaWNFcnIpO1xufVxuXG5mdW5jdGlvbiBfY2xvc2VBbGxXaW5kb3dzSWZTZXQoaXNDbG9zZUFsbDogYm9vbGVhbik6IFByb21pc2U8dW5rbm93bj4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKGZ1bGZpbGwsIHJlamVjdCkgPT4ge1xuICAgIGlmIChpc0Nsb3NlQWxsKSB7XG4gICAgICBsb2coXCJDbG9zaW5nIG9wZW5lZCBhcHBsaWNhdGlvbnNcIik7XG4gICAgICBnZXRBY3RpdmVXaW5kb3dMaXN0RmxvdygpXG4gICAgICAgIC50aGVuKChjdXJyZW50V2luZG93TGlzdDogYW55W10pID0+IHtcbiAgICAgICAgICBjdXJyZW50V2luZG93TGlzdC5mb3JFYWNoKHdpbiA9PiB7XG4gICAgICAgICAgICBjbG9zZVdpbmRvdyh3aW4ud2luZG93SWQpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgX3dhaXRGb3JBbGxBcHBzVG9DbG9zZSgpXG4gICAgICAgICAgICAudGhlbihmdWxmaWxsKVxuICAgICAgICAgICAgLmNhdGNoKHJlamVjdCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChyZWplY3QpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmdWxmaWxsKCk7XG4gICAgfVxuICB9KS5jYXRjaChfY2F0Y2hHZW5lcmljRXJyKTtcbn1cblxuZnVuY3Rpb24gX3dhaXRGb3JBbGxBcHBzVG9DbG9zZSgpOiBQcm9taXNlPHVua25vd24+IHtcbiAgbGV0IHRvdGFsVGltZVdhaXRlZCA9IDA7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgoZnVsZmlsbCwgcmVqZWN0KSA9PiB7XG4gICAgZnVuY3Rpb24gcG9sbEFsbEFwcHNDbG9zZWQoKSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgZ2V0QWN0aXZlV2luZG93TGlzdEZsb3coKVxuICAgICAgICAgIC50aGVuKChjdXJyZW50V2luZG93TGlzdDogV2luT2JqW10pID0+IHtcbiAgICAgICAgICAgIHRvdGFsVGltZVdhaXRlZCArPSBDRkcuUE9MTF9BTExfQVBQU19TVEFSVEVEX0lOVEVSVkFMO1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRXaW5kb3dMaXN0Lmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgICAgICBpZiAodG90YWxUaW1lV2FpdGVkID4gQ0ZHLlBPTExfQUxMX01BWF9USU1FT1VUKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlBPTExfQUxMX01BWF9USU1FT1VUIHJlYWNoZWRcIik7XG4gICAgICAgICAgICAgICAgcmVqZWN0KFwiUE9MTF9BTExfTUFYX1RJTUVPVVQgcmVhY2hlZFwiKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBjYWxsIHJlY3Vyc2l2ZWx5XG4gICAgICAgICAgICAgICAgcG9sbEFsbEFwcHNDbG9zZWQoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZnVsZmlsbChjdXJyZW50V2luZG93TGlzdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2gocmVqZWN0KTtcbiAgICAgIH0sIENGRy5QT0xMX0FMTF9BUFBTX1NUQVJURURfSU5URVJWQUwpO1xuICAgIH1cblxuICAgIC8vIHN0YXJ0IG9uY2UgaW5pdGlhbGx5XG4gICAgcG9sbEFsbEFwcHNDbG9zZWQoKTtcbiAgfSkuY2F0Y2goX2NhdGNoR2VuZXJpY0Vycik7XG59XG5cbmZ1bmN0aW9uIF93YWl0Rm9yQWxsQXBwc1RvU3RhcnQoc2F2ZWRXaW5kb3dMaXN0KTogUHJvbWlzZTxXaW5PYmpbXSB8IHVua25vd24+IHtcbiAgbG9nKFwiV2FpdGluZyBmb3IgYWxsIGFwcGxpY2F0aW9ucyB0byBzdGFydC4uLlwiKTtcblxuICBsZXQgdG90YWxUaW1lV2FpdGVkID0gMDtcbiAgbGV0IHRpbWVvdXQ7XG5cbiAgcmV0dXJuIG5ldyBQcm9taXNlKChmdWxmaWxsLCByZWplY3QpID0+IHtcbiAgICBmdW5jdGlvbiBwb2xsQWxsQXBwc1N0YXJ0ZWQoXG4gICAgICBzYXZlZFdpbmRvd0xpc3Q6IFdpbk9ialtdLFxuICAgICAgdGltZW91dER1cmF0aW9uID0gQ0ZHLlBPTExfQUxMX0FQUFNfU1RBUlRFRF9JTlRFUlZBTFxuICAgICkge1xuICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAvLyBjbGVhciB0aW1lb3V0IHRvIGJlIHNhdmVcbiAgICAgICAgaWYgKHRpbWVvdXQpIHtcbiAgICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICAgIH1cblxuICAgICAgICBnZXRBY3RpdmVXaW5kb3dMaXN0RmxvdygpXG4gICAgICAgICAgLnRoZW4oY3VycmVudFdpbmRvd0xpc3QgPT4ge1xuICAgICAgICAgICAgdG90YWxUaW1lV2FpdGVkICs9IENGRy5QT0xMX0FMTF9BUFBTX1NUQVJURURfSU5URVJWQUw7XG4gICAgICAgICAgICBpZiAoIV9pc0FsbEFwcHNTdGFydGVkKHNhdmVkV2luZG93TGlzdCwgY3VycmVudFdpbmRvd0xpc3QpKSB7XG4gICAgICAgICAgICAgIGlmICh0b3RhbFRpbWVXYWl0ZWQgPiBDRkcuUE9MTF9BTExfTUFYX1RJTUVPVVQpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiUE9MTF9BTExfTUFYX1RJTUVPVVQgcmVhY2hlZFwiKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAgICAgICAgICAgXCJVbmFibGUgdG8gc3RhcnQgdGhlIGZvbGxvd2luZyBhcHBzXCIsXG4gICAgICAgICAgICAgICAgICBfZ2V0Tm90U3RhcnRlZEFwcHMoc2F2ZWRXaW5kb3dMaXN0LCBjdXJyZW50V2luZG93TGlzdClcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHJlamVjdChcIlBPTExfQUxMX01BWF9USU1FT1VUIHJlYWNoZWRcIik7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gY2FsbCByZWN1cnNpdmVseVxuICAgICAgICAgICAgICAgIHBvbGxBbGxBcHBzU3RhcnRlZChzYXZlZFdpbmRvd0xpc3QpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBsb2coXCJBbGwgYXBwbGljYXRpb25zIHN0YXJ0ZWRcIik7XG4gICAgICAgICAgICAgIGZ1bGZpbGwoY3VycmVudFdpbmRvd0xpc3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKHJlamVjdCk7XG4gICAgICB9LCB0aW1lb3V0RHVyYXRpb24pO1xuICAgIH1cblxuICAgIC8vIHN0YXJ0IG9uY2UgaW5pdGlhbGx5XG4gICAgcG9sbEFsbEFwcHNTdGFydGVkKHNhdmVkV2luZG93TGlzdCwgNTAwKTtcbiAgfSkuY2F0Y2goX2NhdGNoR2VuZXJpY0Vycik7XG59XG5cbmZ1bmN0aW9uIF9nZXROb3RTdGFydGVkQXBwcyhcbiAgc2F2ZWRXaW5kb3dMaXN0OiBXaW5PYmpbXSxcbiAgY3VycmVudFdpbmRvd0xpc3Q6IFdpbk9ialtdXG4pOiBXaW5PYmpbXSB7XG4gIGxldCBub25TdGFydGVkQXBwcyA9IFtdO1xuICBzYXZlZFdpbmRvd0xpc3QuZm9yRWFjaCh3aW4gPT4ge1xuICAgIGlmICghX2dldE1hdGNoaW5nV2luZG93SWQod2luLCBjdXJyZW50V2luZG93TGlzdCkpIHtcbiAgICAgIG5vblN0YXJ0ZWRBcHBzLnB1c2god2luKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gbm9uU3RhcnRlZEFwcHM7XG59XG5cbmZ1bmN0aW9uIF9pc0FsbEFwcHNTdGFydGVkKFxuICBzYXZlZFdpbmRvd0xpc3Q6IFdpbk9ialtdLFxuICBjdXJyZW50V2luZG93TGlzdDogV2luT2JqW11cbik6IGJvb2xlYW4ge1xuICBsZXQgaXNBbGxTdGFydGVkID0gdHJ1ZTtcbiAgY29uc3QgY3VycmVudFdpbmRvd0xpc3RDb3B5ID0gY3VycmVudFdpbmRvd0xpc3Quc2xpY2UoMCk7XG4gIHNhdmVkV2luZG93TGlzdC5mb3JFYWNoKHdpbiA9PiB7XG4gICAgaWYgKCFfZ2V0TWF0Y2hpbmdXaW5kb3dJZCh3aW4sIGN1cnJlbnRXaW5kb3dMaXN0Q29weSkpIHtcbiAgICAgIGlzQWxsU3RhcnRlZCA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBpbmRleCA9IGN1cnJlbnRXaW5kb3dMaXN0Q29weS5maW5kSW5kZXgoXG4gICAgICAgIHdpbkZyb21DdXJyZW50ID0+IHdpbi53bUNsYXNzTmFtZSA9PT0gd2luRnJvbUN1cnJlbnQud21DbGFzc05hbWVcbiAgICAgICk7XG4gICAgICBjdXJyZW50V2luZG93TGlzdENvcHkuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gaXNBbGxTdGFydGVkO1xufVxuXG5hc3luYyBmdW5jdGlvbiBfZ3Vlc3NBbmRTZXREZXNrdG9wRmlsZVBhdGhzKFxuICB3aW5kb3dMaXN0OiBXaW5PYmpbXSxcbiAgaW5wdXRIYW5kbGVyXG4pOiBQcm9taXNlPFdpbk9ialtdPiB7XG4gIGNvbnN0IHByb21pc2VzID0gd2luZG93TGlzdC5tYXAod2luID0+IF9ndWVzc0ZpbGVQYXRoKHdpbiwgaW5wdXRIYW5kbGVyKSk7XG5cbiAgZm9yIChjb25zdCBwcm9taXNlIG9mIHByb21pc2VzKSB7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IHByb21pc2U7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgX2NhdGNoR2VuZXJpY0VycihlKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHdpbmRvd0xpc3Q7XG59XG5cbmZ1bmN0aW9uIF9ndWVzc0ZpbGVQYXRoKHdpbjogV2luT2JqLCBpbnB1dEhhbmRsZXIpOiBQcm9taXNlPHN0cmluZyB8IHVua25vd24+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChmdWxmaWxsLCByZWplY3QpID0+IHtcbiAgICBmdW5jdGlvbiBjYWxsSW5wdXRIYW5kbGVyKGVycm9yPywgc3Rkb3V0Pykge1xuICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgIGBcXG4gVHJ5aW5nIGFsdGVybmF0aXZlIGd1ZXNzaW5nIGFwcHJvYWNoIGZvciBcIiR7d2luLnNpbXBsZU5hbWV9XCIuLi4uLmBcbiAgICAgICAgKTtcbiAgICAgICAgZXhlYyhgY2F0IC9wcm9jLyR7d2luLndtUGlkfS9jbWRsaW5lYCwgKGVycm9yMSwgc3Rkb3V0MSkgPT4ge1xuICAgICAgICAgIGlmIChlcnJvcjEgfHwgIXN0ZG91dDEubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRVJSIF9ndWVzc0ZpbGVQYXRoKClcIiwgZXJyb3IxKTtcbiAgICAgICAgICAgIHJlamVjdChlcnJvcjEpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBlbnQgPSBzdGRvdXQxLnNwbGl0KFwiXFx1MDAwMFwiKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgICBgXFxuIEFsdGVybmF0aXZlIGd1ZXNzaW5nIGFwcHJvYWNoIGZvciBcIiR7d2luLnNpbXBsZU5hbWV9XCIgU1VDQ0VTUyAtPiAke2VudFswXX1gXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgd2luLmV4ZWN1dGFibGVGaWxlID0gZW50WzBdO1xuICAgICAgICAgICAgZnVsZmlsbCh3aW4uZXhlY3V0YWJsZUZpbGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpbnB1dEhhbmRsZXIoZXJyb3IsIHdpbiwgc3Rkb3V0KVxuICAgICAgICAgIC50aGVuKGlucHV0ID0+IHtcbiAgICAgICAgICAgIGlmIChfaXNEZXNrdG9wRmlsZSh3aW4uZXhlY3V0YWJsZUZpbGUpKSB7XG4gICAgICAgICAgICAgIHdpbi5kZXNrdG9wRmlsZVBhdGggPSBpbnB1dDtcbiAgICAgICAgICAgICAgZnVsZmlsbCh3aW4uZGVza3RvcEZpbGVQYXRoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHdpbi5leGVjdXRhYmxlRmlsZSA9IGlucHV0O1xuICAgICAgICAgICAgICBmdWxmaWxsKHdpbi5leGVjdXRhYmxlRmlsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2gocmVqZWN0KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoX2lzRGVza3RvcEZpbGUod2luLmV4ZWN1dGFibGVGaWxlKSkge1xuICAgICAgZmluZERlc2t0b3BGaWxlKHdpbi5leGVjdXRhYmxlRmlsZSlcbiAgICAgICAgLnRoZW4oc3Rkb3V0ID0+IHtcbiAgICAgICAgICBjYWxsSW5wdXRIYW5kbGVyKG51bGwsIHN0ZG91dCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChjYWxsSW5wdXRIYW5kbGVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2FsbElucHV0SGFuZGxlcih0cnVlLCB3aW4uZXhlY3V0YWJsZUZpbGUpO1xuICAgIH1cbiAgfSkuY2F0Y2goX2NhdGNoR2VuZXJpY0Vycik7XG59XG5cbi8vIFRPRE8gY2hlY2sgZm9yIGhvdyBtYW55IGluc3RhbmNlcyB0aGVyZSBzaG91bGQgYmUgcnVubmluZyBvZiBhIHByb2dyYW1cbmFzeW5jIGZ1bmN0aW9uIF9zdGFydFNlc3Npb25Qcm9ncmFtcyhcbiAgd2luZG93TGlzdDogV2luT2JqW10sXG4gIGN1cnJlbnRXaW5kb3dMaXN0OiBXaW5PYmpbXVxuKTogUHJvbWlzZTx2b2lkPiB7XG4gIC8vIHNldCBpbnN0YW5jZXMgc3RhcnRlZCB0byAwXG4gIHdpbmRvd0xpc3QuZm9yRWFjaCh3aW4gPT4gKHdpbi5pbnN0YW5jZXNTdGFydGVkID0gMCkpO1xuICBjb25zdCBwcm9taXNlcyA9IHdpbmRvd0xpc3RcbiAgICAuZmlsdGVyKHdpbiA9PiB7XG4gICAgICBjb25zdCBudW1iZXJPZkluc3RhbmNlc09mV2luID0gX2dldE51bWJlck9mSW5zdGFuY2VzVG9SdW4oXG4gICAgICAgIHdpbixcbiAgICAgICAgd2luZG93TGlzdFxuICAgICAgKTtcbiAgICAgIHJldHVybiAhX2lzUHJvZ3JhbUFscmVhZHlSdW5uaW5nKFxuICAgICAgICB3aW4ud21DbGFzc05hbWUsXG4gICAgICAgIGN1cnJlbnRXaW5kb3dMaXN0LFxuICAgICAgICBudW1iZXJPZkluc3RhbmNlc09mV2luLFxuICAgICAgICB3aW4uaW5zdGFuY2VzU3RhcnRlZFxuICAgICAgKTtcbiAgICB9KVxuICAgIC5tYXAod2luID0+IHtcbiAgICAgIHdpbi5pbnN0YW5jZXNTdGFydGVkICs9IDE7XG4gICAgICByZXR1cm4gc3RhcnRQcm9ncmFtKHdpbi5leGVjdXRhYmxlRmlsZSwgd2luLmRlc2t0b3BGaWxlUGF0aCk7XG4gICAgfSk7XG5cbiAgYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xufVxuXG5mdW5jdGlvbiBfZ2V0TnVtYmVyT2ZJbnN0YW5jZXNUb1J1bihcbiAgd2luZG93VG9NYXRjaDogV2luT2JqLFxuICB3aW5kb3dMaXN0OiBXaW5PYmpbXVxuKTogbnVtYmVyIHtcbiAgcmV0dXJuIHdpbmRvd0xpc3QuZmlsdGVyKHdpbiA9PiB7XG4gICAgcmV0dXJuIHdpbi53bUNsYXNzTmFtZSA9PT0gd2luZG93VG9NYXRjaC53bUNsYXNzTmFtZTtcbiAgfSkubGVuZ3RoO1xufVxuXG5mdW5jdGlvbiBfaXNQcm9ncmFtQWxyZWFkeVJ1bm5pbmcoXG4gIHdtQ2xhc3NOYW1lOiBzdHJpbmcsXG4gIGN1cnJlbnRXaW5kb3dMaXN0OiBXaW5PYmpbXSxcbiAgbnVtYmVyT2ZJbnN0YW5jZXNUb1J1bjogbnVtYmVyLFxuICBpbnN0YW5jZXNTdGFydGVkOiBudW1iZXJcbik6IGJvb2xlYW4ge1xuICBpZiAoIW51bWJlck9mSW5zdGFuY2VzVG9SdW4pIHtcbiAgICBudW1iZXJPZkluc3RhbmNlc1RvUnVuID0gMTtcbiAgfVxuXG4gIGlmICghaW5zdGFuY2VzU3RhcnRlZCkge1xuICAgIGluc3RhbmNlc1N0YXJ0ZWQgPSAwO1xuICB9XG5cbiAgbGV0IGluc3RhbmNlc1J1bm5pbmcgPSAwO1xuICBjdXJyZW50V2luZG93TGlzdC5mb3JFYWNoKHdpbiA9PiB7XG4gICAgaWYgKHdpbi53bUNsYXNzTmFtZSA9PT0gd21DbGFzc05hbWUpIHtcbiAgICAgIGluc3RhbmNlc1J1bm5pbmcrKztcbiAgICB9XG4gIH0pO1xuICBsb2coXG4gICAgJ1N0YXR1czogXCInICsgd21DbGFzc05hbWUgKyAnXCIgaXMgcnVubmluZzonLFxuICAgIGluc3RhbmNlc1J1bm5pbmcgKyBpbnN0YW5jZXNTdGFydGVkID49IG51bWJlck9mSW5zdGFuY2VzVG9SdW4sXG4gICAgbnVtYmVyT2ZJbnN0YW5jZXNUb1J1bixcbiAgICBpbnN0YW5jZXNTdGFydGVkXG4gICk7XG4gIHJldHVybiBpbnN0YW5jZXNSdW5uaW5nICsgaW5zdGFuY2VzU3RhcnRlZCA+PSBudW1iZXJPZkluc3RhbmNlc1RvUnVuO1xufVxuXG5mdW5jdGlvbiBfaXNEZXNrdG9wRmlsZShleGVjdXRhYmxlRmlsZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gIHJldHVybiBleGVjdXRhYmxlRmlsZSAmJiAhIWV4ZWN1dGFibGVGaWxlLm1hdGNoKC9kZXNrdG9wJC8pO1xufVxuXG5mdW5jdGlvbiBfdXBkYXRlV2luZG93SWRzKFxuICBzYXZlZFdpbmRvd0xpc3Q6IFdpbk9ialtdLFxuICBjdXJyZW50V2luZG93TGlzdDogV2luT2JqW11cbikge1xuICBjb25zdCB3bUNsYXNzTmFtZU1hcCA9IHt9O1xuICBzYXZlZFdpbmRvd0xpc3QuZm9yRWFjaCh3aW4gPT4ge1xuICAgIGlmICghd21DbGFzc05hbWVNYXBbd2luLndtQ2xhc3NOYW1lXSkge1xuICAgICAgd21DbGFzc05hbWVNYXBbd2luLndtQ2xhc3NOYW1lXSA9IF9nZXRNYXRjaGluZ1dpbmRvd3MoXG4gICAgICAgIHdpbixcbiAgICAgICAgY3VycmVudFdpbmRvd0xpc3RcbiAgICAgICk7XG4gICAgfVxuXG4gICAgd2luLndpbmRvd0lkID0gd21DbGFzc05hbWVNYXBbd2luLndtQ2xhc3NOYW1lXVswXS53aW5kb3dJZDtcbiAgICB3aW4ud2luZG93SWREZWMgPSBwYXJzZUludCh3aW4ud2luZG93SWQsIDE2KTtcblxuICAgIC8vIHJlbW92ZSBmaXJzdCBlbnRyeVxuICAgIHdtQ2xhc3NOYW1lTWFwW3dpbi53bUNsYXNzTmFtZV0uc2hpZnQoKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIF9nZXRNYXRjaGluZ1dpbmRvd0lkKFxuICB3aW46IFdpbk9iaixcbiAgY3VycmVudFdpbmRvd0xpc3Q6IFdpbk9ialtdXG4pOiBzdHJpbmcge1xuICBjb25zdCBjdXJyZW50V2luZG93ID0gY3VycmVudFdpbmRvd0xpc3QuZmluZChcbiAgICB3aW5Gcm9tQ3VycmVudCA9PiB3aW4ud21DbGFzc05hbWUgPT09IHdpbkZyb21DdXJyZW50LndtQ2xhc3NOYW1lXG4gICk7XG4gIHJldHVybiBjdXJyZW50V2luZG93ICYmIGN1cnJlbnRXaW5kb3cud2luZG93SWQ7XG59XG5cbmZ1bmN0aW9uIF9nZXRNYXRjaGluZ1dpbmRvd3MoXG4gIHdpbjogV2luT2JqLFxuICBjdXJyZW50V2luZG93TGlzdDogV2luT2JqW11cbik6IFdpbk9ialtdIHtcbiAgcmV0dXJuIGN1cnJlbnRXaW5kb3dMaXN0LmZpbHRlcihcbiAgICB3aW5Gcm9tQ3VycmVudCA9PiB3aW4ud21DbGFzc05hbWUgPT09IHdpbkZyb21DdXJyZW50LndtQ2xhc3NOYW1lXG4gICk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIF9yZXN0b3JlV2luZG93UG9zaXRpb25zKFxuICBzYXZlZFdpbmRvd0xpc3Q6IFdpbk9ialtdXG4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgY29uc3QgcHJvbWlzZXMgPSBbXTtcbiAgbGV0IGxhc3RfZGVza3RvcF9uciA9IDA7XG5cbiAgLy8gU29ydCB0aGUgd2luZG93IG9iamVjdHMgYmFzZWQgb24gd2hpY2ggd29ya3NwYWNlIHRoZXkgYXJlIGxvY2F0ZSxcbiAgLy8gc28gdGhlIHdpbmRvd3MgY2FuIGJlIG1vdmVkIHdvcmtzcGFjZSBieSB3b3Jrc3BhY2VcbiAgLy8gVGhpcyBpcyBuZWVkZWQgYmVjYXVzZSB0aGUgd2luZG93IG1hbmFnZXIganVzdCBjcmVhdGVzIGFuIGFkaXRpb25hbCB3b3Jrc3BhY2Ugd2hlblxuICAvLyB0aGUgcHJldmlvdXMgb25lIGhhcyBzb21lIHdpbmRvdyBvbiBpdC5cbiAgc2F2ZWRXaW5kb3dMaXN0ID0gc2F2ZWRXaW5kb3dMaXN0LmNvbmNhdCgpLnNvcnQoKGEsIGIpID0+IHtcbiAgICByZXR1cm4gYS53bUN1cnJlbnREZXNrdG9wTnIgLSBiLndtQ3VycmVudERlc2t0b3BOcjtcbiAgfSk7XG5cbiAgZm9yIChjb25zdCB3aW4gb2Ygc2F2ZWRXaW5kb3dMaXN0KSB7XG4gICAgcHJvbWlzZXMucHVzaChyZXN0b3JlV2luZG93UG9zaXRpb24od2luKSk7XG4gICAgcHJvbWlzZXMucHVzaChtb3ZlVG9Xb3Jrc3BhY2Uod2luLndpbmRvd0lkLCB3aW4ud21DdXJyZW50RGVza3RvcE5yKSk7XG5cbiAgICAvLyBUaGUgcHJvbWlzZXMgYXJlIG5vdCBleGVjdXRlZCB1bnRpbCB0aGUgbGFzdCBpdGVtIGlzIHJlYWNoZWQgb3JcbiAgICAvLyB0aGUgZGVza3RvcF9uciBpcyBkaWZmZXJlbnQgZnJvbSB0aGUgcHJldmlvdXMgZW50cnkgYW5kIHdoaWNoIGNhc2VcbiAgICAvLyB0aGUgYXBwIHdhaXRzIGZvciB0aG9zZSB0byBmaW5pc2ggYmVmb3JlIGNvbnRpbnVpbmcgdGhlIHByb2Nlc3NcbiAgICBpZiAoXG4gICAgICB3aW4ud21DdXJyZW50RGVza3RvcE5yICE9PSBsYXN0X2Rlc2t0b3BfbnIgfHxcbiAgICAgIHdpbiA9PT0gc2F2ZWRXaW5kb3dMaXN0LnNsaWNlKC0xKVswXVxuICAgICkge1xuICAgICAgZm9yIChjb25zdCBwcm9taXNlIG9mIHByb21pc2VzKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgYXdhaXQgcHJvbWlzZTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIF9jYXRjaEdlbmVyaWNFcnIoZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxhc3RfZGVza3RvcF9uciA9IHdpbi53bUN1cnJlbnREZXNrdG9wTnI7XG4gICAgICBwcm9taXNlcy5sZW5ndGggPSAwO1xuICAgIH1cbiAgfVxufVxuIl0sIm5hbWVzIjpbImZzLm1rZGlyU3luYyIsImZzLnJlYWRkaXJTeW5jIiwicGF0aC5qb2luIiwiZnMubHN0YXRTeW5jIiwiZnMuY29weUZpbGVTeW5jIiwiZnMudW5saW5rU3luYyIsImZzLnJtZGlyU3luYyIsImZzLmV4aXN0c1N5bmMiLCJmcy5yZWFkRmlsZVN5bmMiLCJmcy53cml0ZUZpbGVTeW5jIiwic3Bhd24iLCJfY2F0Y2hHZW5lcmljRXJyIiwiZnMudW5saW5rIiwiZXhlYyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7U0FHZ0IsU0FBUyxDQUFDLE9BQU87SUFDL0IsSUFBSTtRQUNGQSxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDdkI7SUFBQyxPQUFPLEdBQUcsRUFBRTtRQUNaLElBQUksR0FBRyxDQUFDLElBQUksS0FBSyxRQUFRLEVBQUU7WUFDekIsTUFBTSxHQUFHLENBQUM7U0FDWDtLQUNGO0FBQ0gsQ0FBQztTQW9CZSxTQUFTO0lBQUMsaUJBQVU7U0FBVixVQUFVLEVBQVYscUJBQVUsRUFBVixJQUFVO1FBQVYsNEJBQVU7O0lBQ2xDLElBQU0sUUFBUSxHQUFHLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxJQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVEsR0FBQSxDQUFDO0lBRXZELE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxVQUFDLElBQUksRUFBRSxHQUFHO1FBQzlCLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUEsR0FBRztZQUMxQixJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdkIsSUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRXRCLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUM5QyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFD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
