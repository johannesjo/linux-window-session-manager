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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlsaXR5LnRzIiwiLi4vc3JjL2RlZmF1bHRDb25maWcudHMiLCIuLi9zcmMvbG9nLnRzIiwiLi4vc3JjL2NvbmZpZy50cyIsIi4uL3NyYy9pc0RlYnVnLnRzIiwiLi4vc3JjL3BhcnNlQ21kVG9TcGF3bi50cyIsIi4uL3NyYy94MTFXcmFwcGVyLnRzIiwiLi4vc3JjL290aGVyQ21kLnRzIiwiLi4vc3JjL21ldGFXcmFwcGVyLnRzIiwiLi4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGZzIGZyb20gXCJmc1wiO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tIFwicGF0aFwiO1xuXG5leHBvcnQgZnVuY3Rpb24gbWtkaXJTeW5jKGRpclBhdGgpIHtcbiAgdHJ5IHtcbiAgICBmcy5ta2RpclN5bmMoZGlyUGF0aCk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGlmIChlcnIuY29kZSAhPT0gXCJFRVhJU1RcIikge1xuICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbWtmaWxlU3luYyhmaWxlUGF0aCkge1xuICB0cnkge1xuICAgIGZzLndyaXRlRmlsZVN5bmMoZmlsZVBhdGgsIHsgZmxhZzogXCJ3eFwiIH0pO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBpZiAoZXJyLmNvZGUgIT09IFwiRUVYSVNUXCIpIHtcbiAgICAgIHRocm93IGVycjtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvcHlTeW5jKHNyYywgZGVzdCkge1xuICBpZiAoIWZzLmV4aXN0c1N5bmMoc3JjKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBjb25zdCBkYXRhID0gZnMucmVhZEZpbGVTeW5jKHNyYywgXCJ1dGYtOFwiKTtcbiAgZnMud3JpdGVGaWxlU3luYyhkZXN0LCBkYXRhKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlRGVlcCguLi5vYmplY3RzKSB7XG4gIGNvbnN0IGlzT2JqZWN0ID0gb2JqID0+IG9iaiAmJiB0eXBlb2Ygb2JqID09PSBcIm9iamVjdFwiO1xuXG4gIHJldHVybiBvYmplY3RzLnJlZHVjZSgocHJldiwgb2JqKSA9PiB7XG4gICAgT2JqZWN0LmtleXMob2JqKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICBjb25zdCBwVmFsID0gcHJldltrZXldO1xuICAgICAgY29uc3Qgb1ZhbCA9IG9ialtrZXldO1xuXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShwVmFsKSAmJiBBcnJheS5pc0FycmF5KG9WYWwpKSB7XG4gICAgICAgIHByZXZba2V5XSA9IHBWYWwuY29uY2F0KC4uLm9WYWwpO1xuICAgICAgfSBlbHNlIGlmIChpc09iamVjdChwVmFsKSAmJiBpc09iamVjdChvVmFsKSkge1xuICAgICAgICBwcmV2W2tleV0gPSBtZXJnZURlZXAocFZhbCwgb1ZhbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwcmV2W2tleV0gPSBvVmFsO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHByZXY7XG4gIH0sIHt9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1vdmVkaXIoZnJvbSwgdG8pIHtcbiAgbWtkaXJTeW5jKHRvKTtcbiAgbGV0IGNvbnRlbnRzID0gZnMucmVhZGRpclN5bmMoZnJvbSk7XG5cbiAgZm9yIChjb25zdCBlbGVtZW50IG9mIGNvbnRlbnRzKSB7XG4gICAgbGV0IGZyb21fZWxlbWVudCA9IHBhdGguam9pbihmcm9tLCBlbGVtZW50KTtcbiAgICBsZXQgdG9fZWxlbWVudCA9IHBhdGguam9pbih0bywgZWxlbWVudCk7XG5cbiAgICBpZiAoZnMubHN0YXRTeW5jKGZyb21fZWxlbWVudCkuaXNEaXJlY3RvcnkoKSkge1xuICAgICAgbW92ZWRpcihmcm9tX2VsZW1lbnQsIHRvX2VsZW1lbnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmcy5jb3B5RmlsZVN5bmMoZnJvbV9lbGVtZW50LCB0b19lbGVtZW50KTtcbiAgICAgIGZzLnVubGlua1N5bmMoZnJvbV9lbGVtZW50KTtcbiAgICB9XG4gIH1cbiAgZnMucm1kaXJTeW5jKGZyb20pO1xufVxuIiwiZXhwb3J0IGNvbnN0IERFRkFVTFRfQ0ZHID0ge1xuICBHSVZFX1gxMV9USU1FX1RJTUVPVVQ6IDgwLFxuICBQT0xMX0FMTF9BUFBTX1NUQVJURURfSU5URVJWQUw6IDIwMDAsXG4gIFBPTExfQUxMX01BWF9USU1FT1VUOiAxMjAwMDAsXG4gIFNBVkVfU0VTU0lPTl9JTl9QUkVUVFlfRk9STUFUOiB0cnVlLFxuICBXTV9DTEFTU19BTkRfRVhFQ1VUQUJMRV9GSUxFX01BUDoge1xuICAgIFwiZ25vbWUtdGVybWluYWwtc2VydmVyLkdub21lLXRlcm1pbmFsXCI6IFwiZ25vbWUtdGVybWluYWxcIixcbiAgICBcImdvb2dsZS1jaHJvbWUuR29vZ2xlLWNocm9tZVwiOiBcImdvb2dsZS1jaHJvbWUuZGVza3RvcFwiLFxuICAgIFwiYnJhdmUtYnJvd3Nlci5CcmF2ZS1icm93c2VyXCI6IFwiYnJhdmUtYnJvd3Nlci5kZXNrdG9wXCIsXG4gICAgXCJNYWlsLlRodW5kZXJiaXJkXCI6IFwidGh1bmRlcmJpcmQuZGVza3RvcFwiLFxuICAgIFwibmF1dGlsdXMuTmF1dGlsdXNcIjogXCJuYXV0aWx1c1wiLFxuICAgIFwib3JnLmdub21lLk5hdXRpbHVzLk9yZy5nbm9tZS5OYXV0aWx1c1wiOiBcIm5hdXRpbHVzXCIsXG4gICAgXCJOYXZpZ2F0b3IuRmlyZWZveFwiOiBcImZpcmVmb3guZGVza3RvcFwiLFxuICAgIFwiTmF2aWdhdG9yLlBhbGVcIjogXCJwYWxlbW9vbi5kZXNrdG9wXCIsXG4gICAgXCJza3lwZS5Ta3lwZVwiOiBcInNreXBlZm9ybGludXguZGVza3RvcFwiLFxuICAgIFwic3VuLWF3dC1YMTEtWEZyYW1lUGVlci5qZXRicmFpbnMtaWRlYVwiOiBcImpldGJyYWlucy1pZGVhLmRlc2t0b3BcIixcbiAgICBcIlZpcnR1YWxCb3guVmlydHVhbEJveFwiOiBcInZpcnR1YWxib3guZGVza3RvcFwiLFxuICAgIFwiVGVsZWdyYW0uVGVsZWdyYW1EZXNrdG9wXCI6IFwidGVsZWdyYW0tZGVza3RvcF90ZWxlZ3JhbWRlc2t0b3AuZGVza3RvcFwiLFxuICAgIFwidGVsZWdyYW0tZGVza3RvcC5UZWxlZ3JhbURlc2t0b3BcIjogXCJ0ZWxlZ3JhbWRlc2t0b3AuZGVza3RvcFwiLFxuICAgIFwia2VlcGFzc3hjLmtlZXBhc3N4Y1wiOiBcImtlZXBhc3N4Y19rZWVwYXNzeGMuZGVza3RvcFwiLFxuICAgIFwic2xhY2suU2xhY2tcIjogXCJjb20uc2xhY2suU2xhY2suZGVza3RvcFwiLFxuICAgIFwic2lnbmFsLlNpZ25hbFwiOiBcInNpZ25hbC1kZXNrdG9wLmRlc2t0b3BcIixcbiAgICBcIm1pY3Jvc29mdCB0ZWFtcyAtIHByZXZpZXcuTWljcm9zb2Z0IFRlYW1zIC0gUHJldmlld1wiOiBcInRlYW1zLmRlc2t0b3BcIlxuICB9LFxuICBXTV9DTEFTU19FWENMVVNJT05TOiBbXG4gICAgXCJOL0FcIixcbiAgICBcInRpbGRhLlRpbGRhXCIsXG4gICAgXCJQb3B1cC5kZXNrdG9wXCIsXG4gICAgXCJ1cGRhdGUtbWFuYWdlci5VcGRhdGUtbWFuYWdlclwiLFxuICAgIFwiZGVza3RvcF93aW5kb3cuTmF1dGlsdXNcIixcbiAgICBcImVsZWN0cm9uLkVsZWN0cm9uXCIsXG4gICAgXCJndWFrZS5NYWluLnB5XCIsXG4gICAgXCJnbm9tZS1zb2Z0d2FyZS5Hbm9tZS1zb2Z0d2FyZVwiXG4gIF0sXG4gIFdNX01FVEFfTUFQOiB7XG4gICAgXCJXTV9XSU5ET1dfUk9MRShTVFJJTkcpXCI6IFwid21Sb2xlXCIsXG4gICAgXCJXTV9DTEFTUyhTVFJJTkcpXCI6IFwid21DbGFzc05hbWVcIixcbiAgICBcIl9ORVRfV01fU1RBVEUoQVRPTSlcIjogXCJzdGF0ZXNcIixcbiAgICBcIl9ORVRfV01fREVTS1RPUChDQVJESU5BTClcIjogXCJ3bUN1cnJlbnREZXNrdG9wTnJcIixcbiAgICBcIldNX05BTUUoVVRGOF9TVFJJTkcpXCI6IFwid21UaXRsZVwiLFxuICAgIFwiX05FVF9XTV9QSUQoQ0FSRElOQUwpXCI6IFwid21QaWRcIixcbiAgICBcIl9ORVRfV01fV0lORE9XX1RZUEUoQVRPTSlcIjogXCJ3bVR5cGVcIixcbiAgICBcIl9CQU1GX0RFU0tUT1BfRklMRShTVFJJTkcpXCI6IFwiZXhlY3V0YWJsZUZpbGVcIlxuICB9LFxuICBXTV9NRVRBX01BUF9OVU1CRVJfVFlQRVM6IFtcbiAgICBcIl9ORVRfV01fUElEKENBUkRJTkFMKVwiLFxuICAgIFwiX05FVF9XTV9ERVNLVE9QKENBUkRJTkFMKVwiXG4gIF0sXG4gIERFU0tUT1BfRklMRV9MT0NBVElPTlM6IFtcbiAgICBcIntob21lfS8ubG9jYWwvc2hhcmUvYXBwbGljYXRpb25zXCIsXG4gICAgXCJ7aG9tZX0vLmdub21lL2FwcHNcIixcbiAgICBcIi91c3Ivc2hhcmUvYXBwbGljYXRpb25zXCIsXG4gICAgXCIvdXNyL2xvY2FsL3NoYXJlL2FwcGxpY2F0aW9uc1wiLFxuICAgIFwiL3Vzci9zaGFyZS9hcHAtaW5zdGFsbFwiLFxuICAgIFwie2hvbWV9Ly5jb25maWcvYXV0b3N0YXJ0XCIsXG4gICAgXCIvdmFyL2xpYi9zbmFwZC9kZXNrdG9wL2FwcGxpY2F0aW9uc1wiLFxuICAgIFwiL3Zhci9saWIvZmxhdHBhay9hcHBcIixcbiAgICBcIi92YXIvbGliL2ZsYXRwYWsvZXhwb3J0cy9zaGFyZS9hcHBsaWNhdGlvbnNcIixcbiAgICBcIi9zbmFwL2JpblwiXG4gIF1cbn07XG4iLCJleHBvcnQgY29uc3QgbG9nID0gKC4uLmFyZ3MpID0+IGNvbnNvbGUubG9nKC4uLmFyZ3MpO1xuIiwiaW1wb3J0IHsgbWVyZ2VEZWVwLCBta2RpclN5bmMsIG1vdmVkaXIgfSBmcm9tIFwiLi91dGlsaXR5XCI7XG5pbXBvcnQgeyBERUZBVUxUX0NGRyB9IGZyb20gXCIuL2RlZmF1bHRDb25maWdcIjtcbmltcG9ydCAqIGFzIGZzIGZyb20gXCJmc1wiO1xuaW1wb3J0IHsgbG9nIH0gZnJvbSBcIi4vbG9nXCI7XG5cbmxldCBjZmc7XG5cbmV4cG9ydCBjb25zdCBDRkdfREFUQV9ESVJfTEVHQUNZID0gX2dldFVzZXJIb21lKCkgKyBcIi8ubHdzbVwiO1xuZXhwb3J0IGNvbnN0IENGR19EQVRBX0RJUiA9IF9nZXRVc2VySG9tZSgpICsgXCIvLmNvbmZpZy9sd3NtXCI7XG5leHBvcnQgY29uc3QgQ0ZHX0ZJTEVfUEFUSCA9IENGR19EQVRBX0RJUiArIFwiL2NvbmZpZy5qc29uXCI7XG5leHBvcnQgY29uc3QgU0VTU0lPTl9EQVRBX0RJUiA9IENGR19EQVRBX0RJUiArIFwiL3Nlc3Npb25EYXRhXCI7XG5cbi8vIElOSVRcbi8vIC0tLS0tLS0tLS0tLVxudHJ5IHtcbiAgLy8gaWYgQ0ZHX0RBVEFfRElSX0xFR0FDWSBleGlzdHMsIG1vdmUgaXQgdG8gQ0ZHX0RBVEFfRElSXG4gIGlmIChmcy5leGlzdHNTeW5jKENGR19EQVRBX0RJUl9MRUdBQ1kpKSB7XG4gICAgaWYgKCFmcy5leGlzdHNTeW5jKENGR19EQVRBX0RJUikpIHtcbiAgICAgIG1vdmVkaXIoQ0ZHX0RBVEFfRElSX0xFR0FDWSwgQ0ZHX0RBVEFfRElSKTtcbiAgICAgIGxvZyhcbiAgICAgICAgYGx3c206IG1vdmVkIGNvbmZpZyBkaXJlY3RvcnkgJHtDRkdfREFUQV9ESVJfTEVHQUNZfSB0byAke0NGR19EQVRBX0RJUn1gXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBsb2coYGx3c206IGlnbm9yZWQgbGVnYWN5IGNvbmZpZyBkaXJlY3RvcnkgJHtDRkdfREFUQV9ESVJfTEVHQUNZfWApO1xuICAgIH1cbiAgfVxuXG4gIC8vIGlmIGNvbmZpZyBpcyBhbHJlYWR5IGluIHBsYWNlXG4gIGNvbnN0IGZyb21GaWxlID0gSlNPTi5wYXJzZShmcy5yZWFkRmlsZVN5bmMoQ0ZHX0ZJTEVfUEFUSCwgXCJ1dGY4XCIpKTtcbiAgY2ZnID0gbWVyZ2VEZWVwKERFRkFVTFRfQ0ZHLCBmcm9tRmlsZSk7XG59IGNhdGNoIChlKSB7XG4gIGxvZyhcbiAgICBcImx3c206IG5vIGNvbmZpZyBmaWxlIHByZXNlbnQgb3IgaXQgY29udGFpbnMgaW52YWxpZCBqc29uLiBDcmVhdGluZyBuZXcgb25lLi4uXCJcbiAgKTtcblxuICAvLyBpZiB0aGVyZSBpcyBubyBjb25maWcgeWV0IGxvYWQgZGVmYXVsdCBjZmcgYW5kIGNyZWF0ZSBmaWxlcyBhbmQgZGlyc1xuICBjZmcgPSBERUZBVUxUX0NGRztcblxuICAvLyBzYXZlIGV4ZWN1dGFibGUgcGF0aHMgdG8gY2ZnXG4gIGNmZy5DTURfSlNGSUxFX1BBVEggPSBfX2Rpcm5hbWUgKyBcIi8uLi9jbWQuanNcIjtcbiAgY2ZnLkpTRklMRV9JTkRFWF9QQVRIID0gX19kaXJuYW1lICsgXCIvaW5kZXguanNcIjtcblxuICBta2RpclN5bmMoQ0ZHX0RBVEFfRElSKTtcbiAgbWtkaXJTeW5jKFNFU1NJT05fREFUQV9ESVIpO1xuXG4gIC8vIHdyaXRlIGNvbmZpZyB0byB1c2VyIGRpclxuICBmcy53cml0ZUZpbGVTeW5jKENGR19GSUxFX1BBVEgsIEpTT04uc3RyaW5naWZ5KGNmZywgbnVsbCwgMiksIFwidXRmOFwiKTtcbn1cblxuLy8gYWxzbyBtYWtlIGRhdGEgZGlycyBhY2Nlc3NpYmxlIHRvIHRoZSBvdXRzaWRlXG5jZmcuREFUQV9ESVIgPSBDRkdfREFUQV9ESVI7XG5jZmcuU0VTU0lPTl9EQVRBX0RJUiA9IFNFU1NJT05fREFUQV9ESVI7XG5cbmV4cG9ydCBjb25zdCBDRkcgPSBjZmc7XG5cbmZ1bmN0aW9uIF9nZXRVc2VySG9tZSgpIHtcbiAgcmV0dXJuIHByb2Nlc3MuZW52W3Byb2Nlc3MucGxhdGZvcm0gPT09IFwid2luMzJcIiA/IFwiVVNFUlBST0ZJTEVcIiA6IFwiSE9NRVwiXTtcbn1cbiIsImV4cG9ydCBjb25zdCBJU19ERUJVRyA9IHByb2Nlc3MuYXJndi5pbmRleE9mKFwiLS1kZWJ1Z1wiKSA+IC0xO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydCBjb25zdCBwYXJzZUNtZEFyZ3MgPSBjbWQgPT4ge1xuICBsZXQgY21kQWxsU3BsaXQgPSBjbWQuc3BsaXQoLyAvKTtcbiAgbGV0IG1haW5Db21tYW5kID0gY21kQWxsU3BsaXRbMF07XG4gIGxldCBhcmdzID0gW107XG4gIGNtZEFsbFNwbGl0Lm1hcChmdW5jdGlvbihzLCBpKSB7XG4gICAgaWYgKGkgIT09IDApIHtcbiAgICAgIGFyZ3NbaSAtIDFdID0gY21kQWxsU3BsaXRbaV07XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIFttYWluQ29tbWFuZCwgX21lcmdlUXVvdGVkU3RyaW5nUGFyYW1zKGFyZ3MpXTtcbn07XG5cbmZ1bmN0aW9uIF9tZXJnZVF1b3RlZFN0cmluZ1BhcmFtcyhhcmdzKSB7XG4gIGNvbnN0IG5ld0FyZ3MgPSBbXTtcbiAgbGV0IGlzSW5RdW90YXRpb24gPSBmYWxzZTtcbiAgbGV0IGN1cnJlbnRRdW90YXRpb25Bcmc7XG5cbiAgLy8gVE9ETyBtYWtlIGl0IHdvcmsgd2l0aCBtb3JlIGRpZmZlcmVudCBxdW90YXRpb24gdHlwZXNcbiAgYXJncy5mb3JFYWNoKGFyZyA9PiB7XG4gICAgLy8gbWF0Y2ggcXVvdGF0aW9uIGVuZFxuICAgIGlmIChhcmcubWF0Y2goLyckLykpIHtcbiAgICAgIGN1cnJlbnRRdW90YXRpb25BcmcgKz0gXCIgXCIgKyBhcmcuc2xpY2UoMCwgYXJnLmxlbmd0aCAtIDEpO1xuICAgICAgbmV3QXJncy5wdXNoKGN1cnJlbnRRdW90YXRpb25BcmcpO1xuICAgICAgY3VycmVudFF1b3RhdGlvbkFyZyA9IHVuZGVmaW5lZDtcbiAgICAgIGlzSW5RdW90YXRpb24gPSBmYWxzZTtcbiAgICB9XG4gICAgLy8gbWF0Y2ggcXVvdGF0aW9uIHN0YXJ0XG4gICAgZWxzZSBpZiAoYXJnLm1hdGNoKC9eJy8pKSB7XG4gICAgICBpc0luUXVvdGF0aW9uID0gdHJ1ZTtcbiAgICAgIGN1cnJlbnRRdW90YXRpb25BcmcgPSBhcmcuc3Vic3RyKDEsIGFyZy5sZW5ndGgpO1xuICAgIH1cbiAgICAvLyB3aGlsZSBpbiBxdW90YXRpb25cbiAgICBlbHNlIGlmIChpc0luUXVvdGF0aW9uKSB7XG4gICAgICBjdXJyZW50UXVvdGF0aW9uQXJnICs9IFwiIFwiICsgYXJnO1xuICAgIH0gZWxzZSBpZiAoYXJnICE9PSBcIlwiKSB7XG4gICAgICBuZXdBcmdzLnB1c2goYXJnKTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBuZXdBcmdzO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IGxvZyB9IGZyb20gXCIuL2xvZ1wiO1xuaW1wb3J0IHsgQ0ZHIH0gZnJvbSBcIi4vY29uZmlnXCI7XG5cbmNvbnN0IHgxMSA9IHJlcXVpcmUoXCJ4MTFcIik7XG5cbmV4cG9ydCBsZXQgWDtcbmxldCByb290O1xubGV0IGRpc3BsYXk7XG5cbi8vIGV4cG9ydCBjb25zdCBnZXRXaW5kb3dJbmZvID0gd3JhcFgxMShfZ2V0V2luZG93SW5mbyk7XG5leHBvcnQgY29uc3QgZ2V0WCA9ICgpID0+IFg7XG5cbmZ1bmN0aW9uIGNhdGNoR2VuZXJpY0VycihlcnIpIHtcbiAgY29uc29sZS5lcnJvcihcIngxMVdyYXBwZXI6IFwiLCBlcnIsIGVyci5zdGFjayk7XG59XG5cbmxldCBpc0NsaWVudEluaXRpYWxpemVkID0gZmFsc2U7XG5sZXQgaW5pdFByb21pc2U7XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0WDExKCk6IFByb21pc2U8YW55PiB7XG4gIGlmIChpc0NsaWVudEluaXRpYWxpemVkKSB7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICB9XG4gIGlmIChpbml0UHJvbWlzZSkge1xuICAgIHJldHVybiBpbml0UHJvbWlzZTtcbiAgfVxuICBpbml0UHJvbWlzZSA9IG5ldyBQcm9taXNlKChmdWxmaWxsLCByZWplY3QpID0+IHtcbiAgICB4MTFcbiAgICAgIC5jcmVhdGVDbGllbnQoKGVyciwgZGlzcGxheUluKSA9PiB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkaXNwbGF5ID0gZGlzcGxheUluO1xuICAgICAgICAgIFggPSBkaXNwbGF5LmNsaWVudDtcblxuICAgICAgICAgIHJvb3QgPSBkaXNwbGF5LnNjcmVlblswXS5yb290O1xuICAgICAgICAgIGlzQ2xpZW50SW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgICAgICAgIGZ1bGZpbGwoKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC5vbihcImVycm9yXCIsIGVyciA9PiB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgIH0pO1xuICB9KS5jYXRjaChjYXRjaEdlbmVyaWNFcnIpO1xuICByZXR1cm4gaW5pdFByb21pc2U7XG59XG5cbi8vIE1FVEhPRFNcbi8vIC0tLS0tLS1cbmV4cG9ydCBmdW5jdGlvbiBnZXREaXNwbGF5cygpOiBhbnlbXSB7XG4gIGlmICghZGlzcGxheSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIlgxMSBub3QgaW5pdGlhbGl6ZWQgLyBObyBzY3JlZW4gYXZhaWxhYmxlXCIpO1xuICB9XG4gIHJldHVybiBkaXNwbGF5LnNjcmVlbjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFdpbmRvd0dlb21ldHJ5KHdpbklkKSB7XG4gIGNvbnN0IGdlbzogYW55ID0ge307XG5cbiAgcmV0dXJuIG5ldyBQcm9taXNlKChmdWxmaWxsLCByZWplY3QpID0+IHtcbiAgICBYLlRyYW5zbGF0ZUNvb3JkaW5hdGVzKHdpbklkLCByb290LCAwLCAwLCAoZXJyLCByZXMpID0+IHtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBnZW8ueCA9IHJlcy5kZXN0WDtcbiAgICAgICAgZ2VvLnkgPSByZXMuZGVzdFk7XG5cbiAgICAgICAgWC5HZXRHZW9tZXRyeSh3aW5JZCwgKGVyciwgcmVzKSA9PiB7XG4gICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGdlby53aWR0aCA9IHJlcy53aWR0aDtcbiAgICAgICAgICAgIGdlby5oZWlnaHQgPSByZXMuaGVpZ2h0O1xuICAgICAgICAgICAgZnVsZmlsbChnZW8pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pLmNhdGNoKGNhdGNoR2VuZXJpY0Vycik7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRBY3RpdmVXaW5kb3dJZHMoKTogUHJvbWlzZTxzdHJpbmdbXT4ge1xuICBjb25zdCBQUk9QX05BTUUgPSBcIl9ORVRfQ0xJRU5UX0xJU1RcIjtcbiAgY29uc3QgcHJvcElkID0gYXdhaXQgX2dldFByb3BlcnR5SWRCeU5hbWUocm9vdCwgUFJPUF9OQU1FKTtcbiAgY29uc3QgaWRTdHIgPSBhd2FpdCBnZXRQcm9wKHJvb3QsIHByb3BJZCBhcyBudW1iZXIpO1xuICByZXR1cm4gX3BhcnNlV2luZG93SWRzKGlkU3RyKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlc3RvcmVXaW5kb3dQb3NpdGlvbih3aW4pIHtcbiAgbG9nKCdSZXN0b3Jpbmcgd2luZG93IHBvc2l0aW9uIGZvciBcIicgKyB3aW4ud21DbGFzc05hbWUgKyAnXCInKTtcbiAgY29uc3QgU1RBVEVTX1RPX1JFU0VUID0gW1xuICAgIFwiX05FVF9XTV9TVEFURV9NQVhJTUlaRURfVkVSVFwiLFxuICAgIFwiX05FVF9XTV9TVEFURV9NQVhJTUlaRURfSE9SWlwiXG4gIF07XG4gIHJldHVybiBuZXcgUHJvbWlzZSgoZnVsZmlsbCwgcmVqZWN0KSA9PiB7XG4gICAgc2V0U3RhdGUod2luLndpbmRvd0lkLCBcInJlbW92ZVwiLCBTVEFURVNfVE9fUkVTRVQpXG4gICAgICAuY2F0Y2gocmVqZWN0KVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICBYLk1vdmVSZXNpemVXaW5kb3cod2luLndpbmRvd0lkLCB3aW4ueCwgd2luLnksIHdpbi53aWR0aCwgd2luLmhlaWdodCk7XG4gICAgICAgIHNldFN0YXRlKHdpbi53aW5kb3dJZCwgXCJhZGRcIiwgd2luLnN0YXRlcylcbiAgICAgICAgICAuY2F0Y2gocmVqZWN0KVxuICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIGZ1bGZpbGwoKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2gocmVqZWN0KTtcbiAgfSkuY2F0Y2goY2F0Y2hHZW5lcmljRXJyKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsb3NlV2luZG93KHdpbklkKSB7XG4gIHJldHVybiBfc2VuZFgxMUNsaWVudE1lc3NhZ2Uod2luSWQsIFwiX05FVF9DTE9TRV9XSU5ET1dcIik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtb3ZlVG9Xb3Jrc3BhY2Uod2luSWQsIHdvcmtTcGFjZU5yKSB7XG4gIC8vIE5PVEU6IGlmIGl0IGRvZXNuJ3Qgd29yayB3ZSBtaWdodCBhbHNvIHdhbnQgdG8gdXNlIF9XSU5fV09SS1NQQUNFXG4gIHJldHVybiBfc2VuZFgxMUNsaWVudE1lc3NhZ2Uod2luSWQsIFwiX05FVF9XTV9ERVNLVE9QXCIsIFtcbiAgICB7XG4gICAgICB2YWx1ZTogd29ya1NwYWNlTnJcbiAgICB9XG4gIF0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ29Ub1ZpZXdwb3J0KHgsIHkpIHtcbiAgcmV0dXJuIF9zZW5kWDExQ2xpZW50TWVzc2FnZShyb290LCBcIl9ORVRfREVTS1RPUF9WSUVXUE9SVFwiLCBbXG4gICAgeyB2YWx1ZTogeCB9LFxuICAgIHsgdmFsdWU6IHkgfVxuICBdKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldFN0YXRlKHdpZCwgYWN0aW9uU3RyLCBzdGF0ZXNUb0hhbmRsZSkge1xuICBjb25zdCBBQ1RJT05TX01BUCA9IHtcbiAgICByZW1vdmU6IDAsXG4gICAgYWRkOiAxLFxuICAgIHRvZ2dsZTogMlxuICB9O1xuICBjb25zdCBhY3Rpb24gPSBBQ1RJT05TX01BUFthY3Rpb25TdHJdO1xuICBsZXQgcHJvcGVydGllczogYW55W10gPSBbeyB2YWx1ZTogYWN0aW9uIH1dO1xuXG4gIC8vIGFsbCBwcm9wZXJ0aWVzIG5lZWQgdG8gYmUgbG9va2VkIHVwIGZvciB0aGVpciBhdG9tIGlkXG4gIGlmIChBcnJheS5pc0FycmF5KHN0YXRlc1RvSGFuZGxlKSAmJiBzdGF0ZXNUb0hhbmRsZS5sZW5ndGggPiAwKSB7XG4gICAgc3RhdGVzVG9IYW5kbGUuZm9yRWFjaChzdGF0ZVByb3BlcnR5ID0+IHtcbiAgICAgIHByb3BlcnRpZXMucHVzaCh7XG4gICAgICAgIGlzQXRvbTogdHJ1ZSxcbiAgICAgICAgdmFsdWU6IHN0YXRlUHJvcGVydHlcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHJldHVybiBfc2VuZFgxMUNsaWVudE1lc3NhZ2Uod2lkLCBcIl9ORVRfV01fU1RBVEVcIiwgcHJvcGVydGllcyk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICB9XG59XG5cbmNvbnN0IFBST1BTX1RPX0dFVCA9IFtcbiAgXCJXTV9DTEFTU1wiLFxuICBcIl9ORVRfV01fU1RBVEVcIixcbiAgXCJfTkVUX1dNX0RFU0tUT1BcIixcbiAgXCJXTV9OQU1FXCIsXG4gIFwiX05FVF9XTV9QSURcIixcbiAgXCJfTkVUX1dNX1dJTkRPV19UWVBFXCIsXG4gIFwiX0JBTUZfREVTS1RPUF9GSUxFXCJcbl07XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRXaW5kb3dJbmZvKHdpZCk6IFByb21pc2U8YW55PiB7XG4gIC8vIFguR2V0R2VvbWV0cnkod2lkLCBmdW5jdGlvbiAoZXJyLCBjbGllbnRHZW9tKSB7XG4gIC8vICAgY29uc29sZS5sb2coXCJ3aW5kb3cgZ2VvbWV0cnk6IFwiLCBjbGllbnRHZW9tKTtcbiAgLy8gfSk7XG5cbiAgY29uc3QgcHJvcHM6IGFueVtdID0gYXdhaXQgX3hDYlRvUHJvbWlzZShYLkxpc3RQcm9wZXJ0aWVzLCB3aWQpO1xuXG4gIGNvbnN0IHByb21pc2VzID0gcHJvcHMubWFwKGFzeW5jIGZ1bmN0aW9uKHApIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcHJvcE5hbWUgPSBhd2FpdCBfeENiVG9Qcm9taXNlKFguR2V0QXRvbU5hbWUsIHApO1xuICAgICAgICBpZiAoUFJPUFNfVE9fR0VULmluY2x1ZGVzKHByb3BOYW1lKSkge1xuICAgICAgICAgIGNvbnN0IHByb3BWYWwgPSBhd2FpdCBfeENiVG9Qcm9taXNlKFxuICAgICAgICAgICAgWC5HZXRQcm9wZXJ0eSxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICB3aWQsXG4gICAgICAgICAgICBwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAxMDAwMDAwMFxuICAgICAgICAgICk7XG4gICAgICAgICAgY29uc3QgdHlwZU5hbWUgPSBhd2FpdCBfeENiVG9Qcm9taXNlKFguR2V0QXRvbU5hbWUsIHByb3BWYWwudHlwZSk7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2cocHJvcFZhbCwgdHlwZU5hbWUsIHByb3BOYW1lKTtcbiAgICAgICAgICBjb25zdCBkZWNvZGVkRGF0YSA9IGF3YWl0IF9kZWNvZGVQcm9wZXJ0eSh0eXBlTmFtZSwgcHJvcFZhbC5kYXRhKTtcbiAgICAgICAgICByZXNvbHZlKHByb3BOYW1lICsgXCIoXCIgKyB0eXBlTmFtZSArIFwiKSA9IFwiICsgZGVjb2RlZERhdGEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc29sdmUoXCJcIik7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcblxuICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4ocmVzdWx0cyA9PiB7XG4gICAgcmV0dXJuIHJlc3VsdHMuam9pbihcIlxcblwiKTtcbiAgfSk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRQcm9wKGlkID0gcm9vdCwgcHJvcElkOiBudW1iZXIpOiBQcm9taXNlPGFueT4ge1xuICBjb25zdCBwcm9wVmFsID0gYXdhaXQgX3hDYlRvUHJvbWlzZShcbiAgICBYLkdldFByb3BlcnR5LFxuICAgIDAsXG4gICAgaWQsXG4gICAgcHJvcElkLFxuICAgIDAsXG4gICAgMCxcbiAgICAxMDAwMDAwMFxuICApO1xuICBjb25zdCB0eXBlTmFtZSA9IGF3YWl0IF94Q2JUb1Byb21pc2UoWC5HZXRBdG9tTmFtZSwgcHJvcFZhbC50eXBlKTtcbiAgcmV0dXJuIGF3YWl0IF9kZWNvZGVQcm9wZXJ0eSh0eXBlTmFtZSwgcHJvcFZhbC5kYXRhKTtcbn1cblxuLy8gSEVMUEVSXG4vLyAtLS0tLS1cbmZ1bmN0aW9uIF94Q2JUb1Byb21pc2UoZm4sIC4uLmFyZ3MpOiBhbnkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKGZ1bGZpbGwsIHJlamVjdCkgPT4ge1xuICAgIGZuLmFwcGx5KFgsIFtcbiAgICAgIC4uLmFyZ3MsXG4gICAgICAoZXJyLCByZXMpID0+IHtcbiAgICAgICAgcmV0dXJuIGVyciA/IHJlamVjdChlcnIpIDogZnVsZmlsbChyZXMpO1xuICAgICAgfVxuICAgIF0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gX2NvdW50ZXIoaW5pdGlhbFZhbCwgbW9kaWZpZXIpIHtcbiAgLy8gdG8gc3RhcnQgYXQgdmFsIHdlIG5lZWQgdG8gc3VidHJhY3QgdGhlIG1vZGlmaWVyIGZpcnN0XG4gIGxldCB2YWwgPSBpbml0aWFsVmFsIC0gbW9kaWZpZXI7XG4gIHJldHVybiAoKSA9PiB7XG4gICAgdmFsICs9IG1vZGlmaWVyO1xuICAgIHJldHVybiB2YWw7XG4gIH07XG59XG5cbmZ1bmN0aW9uIF9nZXRBdG9tcyhsaXN0LCBjYikge1xuICBjb25zdCByZXMgPSB7fTtcbiAgY29uc3QgZ2V0QXRvbSA9ICgpID0+IHtcbiAgICBpZiAobGlzdC5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBjYihudWxsLCByZXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBuYW1lID0gbGlzdC5zaGlmdCgpO1xuICAgICAgWC5JbnRlcm5BdG9tKGZhbHNlLCBuYW1lLCAoZXJyLCBhdG9tKSA9PiB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICByZXR1cm4gY2IoZXJyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXNbbmFtZV0gPSBhdG9tO1xuICAgICAgICAgIGdldEF0b20oKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuICBnZXRBdG9tKCk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIF9nZXRQcm9wZXJ0eUlkQnlOYW1lKFxuICB3aWQ6IHN0cmluZyxcbiAgbmFtZVRvR2V0OiBzdHJpbmdcbik6IFByb21pc2U8bnVtYmVyPiB7XG4gIGNvbnN0IHByb3BzOiBhbnlbXSA9IGF3YWl0IF94Q2JUb1Byb21pc2UoWC5MaXN0UHJvcGVydGllcywgd2lkKTtcbiAgY29uc3QgcHJvbWlzZXMgPSBwcm9wcy5tYXAoYXN5bmMgZnVuY3Rpb24ocCkge1xuICAgIGNvbnN0IHByb3BOYW1lID0gYXdhaXQgX3hDYlRvUHJvbWlzZShYLkdldEF0b21OYW1lLCBwKTtcbiAgICBpZiAobmFtZVRvR2V0ID09PSBwcm9wTmFtZSkge1xuICAgICAgcmV0dXJuIHA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH0pO1xuXG4gIGNvbnN0IHJlcyA9IGF3YWl0IFByb21pc2UuYWxsKHByb21pc2VzKTtcbiAgcmV0dXJuIHJlcy5maW5kKGl0ZW0gPT4gaXRlbSA+IDApO1xufVxuXG5mdW5jdGlvbiBfc2VuZFgxMUNsaWVudE1lc3NhZ2UoXG4gIHdpZCxcbiAgZXZlbnROYW1lLFxuICBldmVudFByb3BlcnRpZXMgPSBbXSxcbiAgb3B0aW9uYWxFdmVudE1hc2s/XG4pIHtcbiAgaWYgKGV2ZW50UHJvcGVydGllcy5sZW5ndGggPiA0KSB7XG4gICAgdGhyb3cgXCJvbmx5IHN1cHBvcnRzIDQgcHJvcGVydGllcyBhdCBvbmNlIG1heFwiO1xuICB9XG5cbiAgY29uc3Qgb2Zmc2V0Q291bnRlciA9IF9jb3VudGVyKDQsIDQpO1xuICBjb25zdCBldmVudE1hc2sgPSBvcHRpb25hbEV2ZW50TWFzayB8fCB4MTEuZXZlbnRNYXNrLlN1YnN0cnVjdHVyZVJlZGlyZWN0O1xuXG4gIC8vIGNyZWF0ZSBhdG9tcyB0byBsb29rIHVwXG4gIGxldCBhdG9tc0xpc3QgPSBbXTtcbiAgYXRvbXNMaXN0LnB1c2goZXZlbnROYW1lKTtcbiAgZXZlbnRQcm9wZXJ0aWVzLmZvckVhY2goZXZlbnRQcm9wZXJ0eSA9PiB7XG4gICAgaWYgKGV2ZW50UHJvcGVydHkuaXNBdG9tKSB7XG4gICAgICBhdG9tc0xpc3QucHVzaChldmVudFByb3BlcnR5LnZhbHVlKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIHN0YXJ0IGJ1ZmZlciBpbnB1dFxuICBjb25zdCBkYXRhID0gbmV3IEJ1ZmZlcigzMik7XG4gIGRhdGEuZmlsbCgwKTtcbiAgZGF0YS53cml0ZUludDgoMzMsIDApOyAvLyAzMyA9IENsaWVudE1lc3NhZ2VcbiAgZGF0YS53cml0ZUludDgoMzIsIDEpOyAvLyBmb3JtYXRcbiAgZGF0YS53cml0ZVVJbnQzMkxFKHdpZCwgb2Zmc2V0Q291bnRlcigpKTtcblxuICByZXR1cm4gbmV3IFByb21pc2UoKGZ1bGZpbGwsIHJlamVjdCkgPT4ge1xuICAgIF9nZXRBdG9tcyhhdG9tc0xpc3QsIChlcnIsIGF0b21zKSA9PiB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkYXRhLndyaXRlVUludDMyTEUoYXRvbXNbZXZlbnROYW1lXSwgb2Zmc2V0Q291bnRlcigpKTtcblxuICAgICAgICBldmVudFByb3BlcnRpZXMuZm9yRWFjaChldmVudFByb3BlcnR5ID0+IHtcbiAgICAgICAgICBpZiAoZXZlbnRQcm9wZXJ0eS5pc0F0b20pIHtcbiAgICAgICAgICAgIGRhdGEud3JpdGVVSW50MzJMRShhdG9tc1tldmVudFByb3BlcnR5LnZhbHVlXSwgb2Zmc2V0Q291bnRlcigpKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGF0YS53cml0ZVVJbnQzMkxFKGV2ZW50UHJvcGVydHkudmFsdWUsIG9mZnNldENvdW50ZXIoKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgc291cmNlSW5kaWNhdGlvbiA9IDE7XG4gICAgICAgIGRhdGEud3JpdGVVSW50MzJMRShzb3VyY2VJbmRpY2F0aW9uLCBvZmZzZXRDb3VudGVyKCkpO1xuXG4gICAgICAgIFguU2VuZEV2ZW50KHJvb3QsIDAsIGV2ZW50TWFzaywgZGF0YSk7XG5cbiAgICAgICAgLy8gd2UgbmVlZCBhIGxpdHRsZSB0aW1lIGZvciB0aGUgYnVmZmVyIHRvIGJlIHByb2Nlc3NlZFxuICAgICAgICBzZXRUaW1lb3V0KGZ1bGZpbGwsIENGRy5HSVZFX1gxMV9USU1FX1RJTUVPVVQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KS5jYXRjaChjYXRjaEdlbmVyaWNFcnIpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBfZGVjb2RlUHJvcGVydHkodHlwZSwgZGF0YSk6IFByb21pc2U8YW55PiB7XG4gIHRyeSB7XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlIFwiU1RSSU5HXCI6IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgICAgIGxldCBzID0gXCJcIjtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgaWYgKGRhdGFbaV0gPT0gMCkge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2gocyk7XG4gICAgICAgICAgICBzID0gXCJcIjtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBzICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoZGF0YVtpXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmVzdWx0LnB1c2gocyk7XG4gICAgICAgIHJldHVybiByZXN1bHQubWFwKHF1b3RpemUpLmpvaW4oXCIsIFwiKTtcbiAgICAgIH1cbiAgICAgIGNhc2UgXCJBVE9NXCI6XG4gICAgICAgIGlmIChkYXRhLmxlbmd0aCA+IDMyKSB7XG4gICAgICAgICAgcmV0dXJuIFwiTE9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT05HXCI7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwcm9taXNlcyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpICs9IDQpIHtcbiAgICAgICAgICBjb25zdCBhID0gZGF0YS51bnBhY2soXCJMXCIsIGkpWzBdO1xuICAgICAgICAgIHByb21pc2VzLnB1c2goX3hDYlRvUHJvbWlzZShYLkdldEF0b21OYW1lLCBhKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGF3YWl0IFByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgcmV0dXJuIHJlcy5qb2luKFwiLCBcIik7XG4gICAgICAgIH0pO1xuXG4gICAgICBjYXNlIFwiQ0FSRElOQUxcIjpcbiAgICAgIGNhc2UgXCJJTlRFR0VSXCI6IHtcbiAgICAgICAgY29uc3QgcmVzID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkgKz0gNCkge1xuICAgICAgICAgIHJlcy5wdXNoKGRhdGEudW5wYWNrKFwiTFwiLCBpKVswXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlcy5qb2luKFwiLCBcIik7XG4gICAgICB9XG4gICAgICBjYXNlIFwiV0lORE9XXCI6XG4gICAgICAgIGNvbnN0IHJlcyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpICs9IDQpIHtcbiAgICAgICAgICByZXMucHVzaChkYXRhLnVucGFjayhcIkxcIiwgaSlbMF0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgXCJ3aW5kb3cgaWQjIFwiICtcbiAgICAgICAgICByZXNcbiAgICAgICAgICAgIC5tYXAobiA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiBcIjB4XCIgKyBuLnRvU3RyaW5nKDE2KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuam9pbihcIiwgXCIpXG4gICAgICAgICk7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBcIldURiBcIiArIHR5cGU7XG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gICAgY29uc29sZS5sb2codHlwZSwgZGF0YSk7XG4gICAgY29uc29sZS5lcnJvcihlKTtcbiAgICB0aHJvdyBuZXcgRXJyb3IoZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcXVvdGl6ZShpKSB7XG4gIHJldHVybiAnXCInICsgaSArICdcIic7XG59XG5cbmZ1bmN0aW9uIF9wYXJzZVdpbmRvd0lkcyhzdHJJbik6IHN0cmluZ1tdIHtcbiAgY29uc3Qgc3RyID0gc3RySW4ucmVwbGFjZShcIndpbmRvdyBpZCMgXCIsIFwiXCIpO1xuICByZXR1cm4gc3RyLnNwbGl0KFwiLCBcIik7XG59XG5cbi8vY29uc3QgdGVzdEZuID0gd3JhcFgxMShjbG9zZVdpbmRvdyk7XG4vL3Rlc3RGbignMHgwNGEwMDAwMScpLnRoZW4oKGdlbykgPT4ge1xuLy99KTtcblxuLy9jb25zdCB0ZXN0Rm4gPSB3cmFwWDExKG1vdmVUb1dvcmtzcGFjZSk7XG4vL3Rlc3RGbignMHgwNGUwMDAwMSAnLCAyKTtcblxuLy9jb25zdCB0ZXN0Rm5YID0gd3JhcFgxMShyZXN0b3JlV2luZG93UG9zaXRpb24pO1xuLy90ZXN0Rm5YKHtcbi8vICB3aW5kb3dJZDogJzB4MDRhMDAwMDEnLFxuLy8gIHg6IDAsXG4vLyAgeTogMCxcbi8vICB3aWR0aDogNTAwLFxuLy8gIGhlaWdodDogNTAwLFxuLy8gIHN0YXRlczogW1xuLy8gICAgJ19ORVRfV01fU1RBVEVfTUFYSU1JWkVEX1ZFUlQnXG4vLyAgXVxuLy99KTtcblxuLy9jb25zdCB0ZXN0Rm4yID0gd3JhcFgxMShzZXRTdGF0ZSk7XG4vL3Rlc3RGbjIoJzB4MDRhMDAwMDEnLCAncmVtb3ZlJywgWydfTkVUX1dNX1NUQVRFX01BWElNSVpFRF9WRVJUJywgJ19ORVRfV01fU1RBVEVfTUFYSU1JWkVEX0hPUlonLCAnX05FVF9XTV9TVEFURV9GVUxMU0NSRUVOJ10pXG4vLyAgLnRoZW4oKHJlcykgPT4ge1xuLy8gICAgY29uc29sZS5sb2coJ05PUk1BTCcsIHJlcyk7XG4vLyAgfSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgSVNfREVCVUcgfSBmcm9tIFwiLi9pc0RlYnVnXCI7XG5pbXBvcnQgeyBDRkcgfSBmcm9tIFwiLi9jb25maWdcIjtcbmltcG9ydCB7IHNwYXduIH0gZnJvbSBcImNoaWxkX3Byb2Nlc3NcIjtcbmltcG9ydCB7IHBhcnNlQ21kQXJncyB9IGZyb20gXCIuL3BhcnNlQ21kVG9TcGF3blwiO1xuaW1wb3J0IHsgV2luT2JqLCBXaW5PYmpJZE9ubHkgfSBmcm9tIFwiLi9tb2RlbFwiO1xuaW1wb3J0IHsgbG9nIH0gZnJvbSBcIi4vbG9nXCI7XG5pbXBvcnQgeyBnZXRBY3RpdmVXaW5kb3dJZHMsIGdldERpc3BsYXlzLCBnZXRXaW5kb3dJbmZvIH0gZnJvbSBcIi4veDExV3JhcHBlclwiO1xuXG4vLyA1MDBrYlxuY29uc3QgTUFYX0JVRkZFUiA9IDEwMjQgKiA1MDA7XG5jb25zdCBFWEVDX09QVFMgPSB7XG4gIG1heEJ1ZmZlcjogTUFYX0JVRkZFUlxufTtcblxuLy8gZGlzcGxheVxuLy8gLS0tLS0tLVxuZXhwb3J0IGZ1bmN0aW9uIGdldENvbm5lY3RlZERpc3BsYXlzSWQoKTogc3RyaW5nIHtcbiAgY29uc3QgZGlzcGxheXMgPSBnZXREaXNwbGF5cygpO1xuICByZXR1cm4gZGlzcGxheXNcbiAgICAubWFwKHNjcmVlbiA9PiBzY3JlZW4ucGl4ZWxfd2lkdGggKyBcInhcIiArIHNjcmVlbi5waXhlbF9oZWlnaHQpXG4gICAgLmpvaW4oXCI7XCIpO1xufVxuXG4vLyBPdGhlclxuLy8gLS0tLS0tLS1cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRBZGRpdGlvbmFsTWV0YURhdGFGb3JXaW4oXG4gIHdpbjogV2luT2JqSWRPbmx5XG4pOiBQcm9taXNlPFdpbk9iaj4ge1xuICBjb25zdCBzdGRvdXQgPSBhd2FpdCBnZXRXaW5kb3dJbmZvKHdpbi53aW5kb3dJZCk7XG4gIGNvbnN0IGxpbmVzID0gc3Rkb3V0LnNwbGl0KFwiXFxuXCIpO1xuICBjb25zdCB3aW5Db3B5OiBhbnkgPSB7IC4uLndpbiB9O1xuXG4gIGxpbmVzLmZvckVhY2gobGluZSA9PiB7XG4gICAgY29uc3Qgd29yZHMgPSBsaW5lLnNwbGl0KFwiIFwiKTtcbiAgICBjb25zdCBwcm9wZXJ0eU5hbWUgPSB3b3Jkc1swXTtcblxuICAgIC8vIHJlbW92ZSBwcm9wZXJ0eSBuYW1lIGFuZCBcIj1cIlxuICAgIHdvcmRzLnNwbGljZSgwLCAyKTtcbiAgICBjb25zdCB2YWx1ZSA9IHdvcmRzLmpvaW4oXCIgXCIpO1xuICAgIGNvbnN0IHByb3BlcnR5TmFtZUZyb21NYXAgPSBDRkcuV01fTUVUQV9NQVBbcHJvcGVydHlOYW1lXTtcbiAgICAvLyBwYXJzZSB3bUNsYXNzTmFtZVxuICAgIGlmIChwcm9wZXJ0eU5hbWUgPT09IFwiV01fQ0xBU1MoU1RSSU5HKVwiKSB7XG4gICAgICBjb25zdCBwcm9wZXJ0eU5hbWVGcm9tTWFwID0gQ0ZHLldNX01FVEFfTUFQW3Byb3BlcnR5TmFtZV07XG4gICAgICBjb25zdCBjbGFzc05hbWVzID0gdmFsdWUuc3BsaXQoXCIsIFwiKTtcbiAgICAgIGxldCBjbGFzc05hbWUgPSBcIlwiO1xuICAgICAgY2xhc3NOYW1lcy5mb3JFYWNoKHN0YXRlID0+IHtcbiAgICAgICAgaWYgKHN0YXRlICE9PSBcIlwiKSB7XG4gICAgICAgICAgY2xhc3NOYW1lICs9IHN0YXRlLnJlcGxhY2UoL1wiL2csIFwiXCIpICsgXCIuXCI7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgd2luQ29weVtwcm9wZXJ0eU5hbWVGcm9tTWFwXSA9IGNsYXNzTmFtZS5zdWJzdHIoMCwgY2xhc3NOYW1lLmxlbmd0aCAtIDIpO1xuICAgIH1cbiAgICAvLyBwYXJzZSBzdGF0ZXNcbiAgICBlbHNlIGlmIChwcm9wZXJ0eU5hbWUgPT09IFwiX05FVF9XTV9TVEFURShBVE9NKVwiKSB7XG4gICAgICBjb25zdCBzdGF0ZXMgPSB2YWx1ZS5zcGxpdChcIiwgXCIpO1xuICAgICAgd2luQ29weS5zdGF0ZXMgPSBbXTtcbiAgICAgIHN0YXRlcy5mb3JFYWNoKHN0YXRlID0+IHtcbiAgICAgICAgaWYgKHN0YXRlICE9PSBcIlwiKSB7XG4gICAgICAgICAgd2luQ29weS5zdGF0ZXMucHVzaChzdGF0ZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICAvLyBwYXJzZSBzaW1wbGUgc3RyaW5ncyBhbmQgaW50ZWdlcnNcbiAgICBlbHNlIGlmIChwcm9wZXJ0eU5hbWVGcm9tTWFwKSB7XG4gICAgICAvLyBzcGVjaWFsIGhhbmRsZSBudW1iZXIgdHlwZXNcbiAgICAgIGlmIChDRkcuV01fTUVUQV9NQVBfTlVNQkVSX1RZUEVTLmluZGV4T2YocHJvcGVydHlOYW1lKSA+IC0xKSB7XG4gICAgICAgIHdpbkNvcHlbcHJvcGVydHlOYW1lRnJvbU1hcF0gPSBwYXJzZUludCh2YWx1ZSwgMTApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2luQ29weVtwcm9wZXJ0eU5hbWVGcm9tTWFwXSA9IHZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG4gIC8vIGNvbnNvbGUubG9nKHdpbkNvcHkpO1xuICByZXR1cm4gd2luQ29weTtcbn1cblxuLy8gVE9ETyBwcmV0dGlmeSBhcmdzIHN0cnVjdHVyZVxuZXhwb3J0IGZ1bmN0aW9uIHN0YXJ0UHJvZ3JhbShcbiAgZXhlY3V0YWJsZUZpbGU6IHN0cmluZyxcbiAgZGVza3RvcEZpbGVQYXRoOiBzdHJpbmdcbik6IFByb21pc2U8dm9pZD4ge1xuICBJU19ERUJVRyAmJlxuICAgIGNvbnNvbGUubG9nKFwiREVCVUc6IHN0YXJ0UHJvZ3JhbSgpOlwiLCBleGVjdXRhYmxlRmlsZSwgZGVza3RvcEZpbGVQYXRoKTtcblxuICBsZXQgY21kO1xuICBsZXQgYXJncyA9IFtdO1xuICBpZiAoZGVza3RvcEZpbGVQYXRoKSB7XG4gICAgY21kID0gYGF3a2A7XG4gICAgYXJncy5wdXNoKFxuICAgICAgJy9eRXhlYz0vIHtzdWIoXCJeRXhlYz1cIiwgXCJcIik7IGdzdWIoXCIgPyVbY0RkRmZpa21OblV1dl1cIiwgXCJcIik7IGV4aXQgc3lzdGVtKCQwKX0nXG4gICAgKTtcbiAgICBhcmdzLnB1c2goZGVza3RvcEZpbGVQYXRoKTtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBwYXJzZWRDbWQgPSBwYXJzZUNtZEFyZ3MoZXhlY3V0YWJsZUZpbGUpO1xuICAgIGNtZCA9IHBhcnNlZENtZFswXTtcbiAgICBhcmdzID0gcGFyc2VkQ21kWzFdO1xuICB9XG5cbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bGZpbGwgPT4ge1xuICAgIHNwYXduKGNtZCwgYXJncywge1xuICAgICAgc3RkaW86IFwiaWdub3JlXCIsXG4gICAgICBkZXRhY2hlZDogdHJ1ZVxuICAgIH0pLnVucmVmKCk7XG5cbiAgICAvLyBjdXJyZW50bHkgd2UgaGF2ZSBubyBlcnJvciBoYW5kbGluZyBhcyB0aGUgcHJvY2VzcyBpcyBzdGFydGVkIGRldGFjaGVkXG4gICAgZnVsZmlsbCgpO1xuICB9KTtcbn1cblxuLy8gR0VUIEFDVElWRSBXSU5ET1cgTElTVFxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEFjdGl2ZVdpbmRvd0xpc3QoKTogUHJvbWlzZTxXaW5PYmpbXT4ge1xuICBjb25zdCB3aW5kb3dJZHMgPSBhd2FpdCBnZXRBY3RpdmVXaW5kb3dJZHMoKTtcbiAgY29uc3Qgd2luZG93TGlzdDogV2luT2JqSWRPbmx5W10gPSBbXTtcbiAgd2luZG93SWRzLmZvckVhY2god2luZG93SWQgPT4ge1xuICAgIHdpbmRvd0xpc3QucHVzaCh7XG4gICAgICB3aW5kb3dJZDogd2luZG93SWQsXG4gICAgICB3aW5kb3dJZERlYzogcGFyc2VJbnQod2luZG93SWQsIDE2KVxuICAgIH0pO1xuICB9KTtcblxuICAvLyBhZGQgbWV0YSBkYXRhIHJpZ2h0IGF3YXlcbiAgY29uc3QgcHJvbWlzZXMgPSB3aW5kb3dMaXN0Lm1hcCh3aW4gPT4gZ2V0QWRkaXRpb25hbE1ldGFEYXRhRm9yV2luKHdpbikpO1xuXG4gIGNvbnN0IHdpbmRvd3NXaXRoRGF0YTogV2luT2JqW10gPSAoYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZXMpKSBhcyBXaW5PYmpbXTtcblxuICBJU19ERUJVRyAmJiBjb25zb2xlLmxvZyhcIkRFQlVHOiBnZXRBY3RpdmVXaW5kb3dMaXN0KCk6XCIsIHdpbmRvd0xpc3QpO1xuICByZXR1cm4gd2luZG93c1dpdGhEYXRhLmZpbHRlcihfZmlsdGVySW52YWxpZFdpbmRvd3MpO1xufVxuXG5mdW5jdGlvbiBfZmlsdGVySW52YWxpZFdpbmRvd3Mod2luOiBXaW5PYmopOiBib29sZWFuIHtcbiAgLy8gZmlsdGVyIG5vbmUgbm9ybWFsIHdpbmRvd3MsIGV4Y2x1ZGVkIGNsYXNzIG5hbWVzIGFuZCBpbmNvbXBsZXRlIHdpbmRvd3NcbiAgLy8gTk9URTogaWYgdGhlcmUgaXMgbm8gdHlwZSB3ZSBhc3N1bWUgaXQncyBub3JtYWwgdG9vXG4gIGNvbnN0IGlzTm9ybWFsV2luZG93ID1cbiAgICAoIXdpbi53bVR5cGUgfHwgd2luLndtVHlwZS5pbmNsdWRlcyhcIl9ORVRfV01fV0lORE9XX1RZUEVfTk9STUFMXCIpKSAmJlxuICAgICghd2luLndtUm9sZSB8fCB3aW4ud21Sb2xlICE9PSBcInBvcC11cFwiKTtcblxuICBjb25zdCBpc05vdEV4Y2x1ZGVkID0gIV9pc0V4Y2x1ZGVkV21DbGFzc05hbWUod2luLndtQ2xhc3NOYW1lKTtcbiAgY29uc3QgaGFzV21DbGFzc05hbWUgPSAhIXdpbi53bUNsYXNzTmFtZTtcblxuICAvLyB3YXJuIGlmIG5vIHdtQ2xhc3NOYW1lIGV2ZW4gdGhvdWdoIHRoZXJlIHNob3VsZCBiZVxuICBpZiAoaXNOb3JtYWxXaW5kb3cgJiYgaXNOb3RFeGNsdWRlZCAmJiAhaGFzV21DbGFzc05hbWUpIHtcbiAgICBjb25zb2xlLndhcm4od2luLndpbmRvd0lkICsgXCIgaGFzIG5vIHdtQ2xhc3NOYW1lLiBXaW46IFwiLCB3aW4pO1xuICB9XG5cbiAgcmV0dXJuIGlzTm9ybWFsV2luZG93ICYmIGlzTm90RXhjbHVkZWQgJiYgaGFzV21DbGFzc05hbWU7XG59XG5cbmZ1bmN0aW9uIF9pc0V4Y2x1ZGVkV21DbGFzc05hbWUod21DbGFzc05hbWUpOiBib29sZWFuIHtcbiAgcmV0dXJuIENGRy5XTV9DTEFTU19FWENMVVNJT05TLmluZGV4T2Yod21DbGFzc05hbWUpID4gLTE7XG59XG5cbmZ1bmN0aW9uIF9jYXRjaEdlbmVyaWNFcnIoZXJyKTogdm9pZCB7XG4gIGNvbnNvbGUuZXJyb3IoXCJvdGhlckNtZDogR2VuZXJpYyBFcnJvclwiLCBlcnIsIGVyci5zdGFjayk7XG4gIGxvZyhcIm90aGVyQ21kOlwiLCBhcmd1bWVudHMpO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5pbXBvcnQgeyBnZXRXaW5kb3dHZW9tZXRyeSwgZ29Ub1ZpZXdwb3J0IH0gZnJvbSBcIi4veDExV3JhcHBlclwiO1xuaW1wb3J0IHsgZ2V0QWN0aXZlV2luZG93TGlzdCB9IGZyb20gXCIuL290aGVyQ21kXCI7XG5pbXBvcnQgeyBDRkcgfSBmcm9tIFwiLi9jb25maWdcIjtcbmltcG9ydCB7IFdpbk9iaiB9IGZyb20gXCIuL21vZGVsXCI7XG5cbmNvbnN0IGZpbmR1cCA9IHJlcXVpcmUoXCJmaW5kdXAtc3luY1wiKTtcblxuY29uc3QgSE9NRV9ESVIgPSBwcm9jZXNzLmVudltcIkhPTUVcIl07XG5jb25zdCBERUZBVUxUX0RFU0tUT1BfRklMRV9MT0NBVElPTlMgPSBbXG4gIFwie2hvbWV9Ly5sb2NhbC9zaGFyZS9hcHBsaWNhdGlvbnNcIixcbiAgXCJ7aG9tZX0vLmdub21lL2FwcHMvXCIsXG4gIFwiL3Vzci9zaGFyZS9hcHBsaWNhdGlvbnNcIixcbiAgXCIvdXNyL2xvY2FsL3NoYXJlL2FwcGxpY2F0aW9uc1wiLFxuICBcIi91c3Ivc2hhcmUvYXBwLWluc3RhbGxcIlxuXTtcblxuZnVuY3Rpb24gX2NhdGNoR2VuZXJpY0VycihlcnIpIHtcbiAgY29uc29sZS5lcnJvcihcIkdlbmVyaWMgRXJyb3IgaW4gTWV0YSBXcmFwcGVyXCIsIGVyciwgZXJyLnN0YWNrKTtcbiAgdGhyb3cgZXJyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ29Ub0ZpcnN0V29ya3NwYWNlKCkge1xuICByZXR1cm4gZ29Ub1ZpZXdwb3J0KDAsIDApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmluZERlc2t0b3BGaWxlKGZpbGVOYW1lKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgoZnVsZmlsbCwgcmVqZWN0KSA9PiB7XG4gICAgY29uc3QgZGVza3RvcEZpbGVMb2NhdGlvbnMgPVxuICAgICAgQ0ZHLkRFU0tUT1BfRklMRV9MT0NBVElPTlMgfHwgREVGQVVMVF9ERVNLVE9QX0ZJTEVfTE9DQVRJT05TO1xuXG4gICAgY29uc3QgcGFyZW50RGlycyA9IGRlc2t0b3BGaWxlTG9jYXRpb25zLm1hcChwYXJlbnREaXIgPT4ge1xuICAgICAgcmV0dXJuIHBhcmVudERpci5yZXBsYWNlKFwie2hvbWV9XCIsIEhPTUVfRElSKTtcbiAgICB9KTtcblxuICAgIGxldCBmaXJzdEZpbGU7XG4gICAgY29uc3QgbWF0Y2ggPSBwYXJlbnREaXJzLmZpbmQoZGlyID0+IHtcbiAgICAgIGZpcnN0RmlsZSA9IGZpbmR1cChmaWxlTmFtZSwgeyBjd2Q6IGRpciB9KTtcblxuICAgICAgaWYgKCFmaXJzdEZpbGUpIHtcbiAgICAgICAgLy8gc25hcCBkZXNrdG9wIGZpbGVzIG5vdyBsb29rIGxpa2UgdGhpcyA9PiBmaXJlZm94X2ZpcmVmb3guZGVza3RvcFxuICAgICAgICBmaXJzdEZpbGUgPSBmaW5kdXAoYCR7ZmlsZU5hbWUucmVwbGFjZShcIi5kZXNrdG9wXCIsIFwiX1wiKX0ke2ZpbGVOYW1lfWAsIHtcbiAgICAgICAgICBjd2Q6IGRpclxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmaXJzdEZpbGU7XG4gICAgfSk7XG5cbiAgICBpZiAoIWZpcnN0RmlsZSB8fCAhbWF0Y2gpIHtcbiAgICAgIGNvbnN0IGVyciA9IGBFUlI6IGZpbmREZXNrdG9wRmlsZSgpIGNhbnQgZmluZCBmaWxlIFwiJHtmaWxlTmFtZX1cIiEgU2VhcmNoZWQgZGVza3RvcEZpbGVMb2NhdGlvbnM6YDtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyLCBkZXNrdG9wRmlsZUxvY2F0aW9ucyk7XG4gICAgICByZWplY3QoZXJyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZnVsZmlsbChmaXJzdEZpbGUpO1xuICAgIH1cbiAgfSkuY2F0Y2goX2NhdGNoR2VuZXJpY0Vycik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRBY3RpdmVXaW5kb3dMaXN0RmxvdygpOiBQcm9taXNlPFdpbk9ialtdIHwgYW55PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAoZnVsZmlsbCwgcmVqZWN0KSA9PiB7XG4gICAgcmV0dXJuIGdldEFjdGl2ZVdpbmRvd0xpc3QoKS50aGVuKGFzeW5jICh3aW5kb3dMaXN0OiBhbnlbXSkgPT4ge1xuICAgICAgY29uc3QgcHJvbWlzZXMgPSB3aW5kb3dMaXN0Lm1hcCh3aW4gPT4ge1xuICAgICAgICByZXR1cm4gZ2V0V2luZG93R2VvbWV0cnkod2luLndpbmRvd0lkKS50aGVuKChnZW86IGFueSkgPT4ge1xuICAgICAgICAgIGZvciAobGV0IHByb3AgaW4gZ2VvKSB7XG4gICAgICAgICAgICBpZiAoZ2VvLmhhc093blByb3BlcnR5KHByb3ApKSB7XG4gICAgICAgICAgICAgIHdpbltwcm9wXSA9IGdlb1twcm9wXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBUT0RPIG9yZ2FuaXplIGFkZGluZyBvZiBhbGwgdGhvc2UgZGlmZmVyZW50IHByb3BlcnRpZXMgYmV0dGVyXG4gICAgICAgICAgLy8gYWRkIG1pc3Npbmcgc3RhdGljIHByb3BlcnRpZXNcbiAgICAgICAgICB3aW4uc2ltcGxlTmFtZSA9IF9wYXJzZVNpbXBsZVdpbmRvd05hbWUod2luLndtQ2xhc3NOYW1lKTtcbiAgICAgICAgICByZXR1cm4gd2luO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyB3ZSdyZSB1c2luZyBhIHdhdGVyZmFsbCBiZWNhdXNlIHdlJ3JlIGRlYWxpbmcgd2l0aCB4MTEgcmVxdWVzdHNcbiAgICAgIGlmIChwcm9taXNlcy5sZW5ndGgpIHtcbiAgICAgICAgZm9yIChjb25zdCBwcm9taXNlIG9mIHByb21pc2VzKSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGF3YWl0IHByb21pc2U7XG4gICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfYWRkUGFyc2VkRXhlY3V0YWJsZUZpbGVzRnJvbVdtQ2xhc3NOYW1lcyh3aW5kb3dMaXN0KS50aGVuKFxuICAgICAgICAgIHdpbmRvd0xpc3RXaXRoV21DbGFzc05hbWVzID0+IHtcbiAgICAgICAgICAgIGZ1bGZpbGwod2luZG93TGlzdFdpdGhXbUNsYXNzTmFtZXMpO1xuICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZ1bGZpbGwoW10pO1xuICAgICAgfVxuICAgIH0pO1xuICB9KS5jYXRjaChfY2F0Y2hHZW5lcmljRXJyKTtcbn1cblxuLy8gTUlYRURcbmZ1bmN0aW9uIF9hZGRQYXJzZWRFeGVjdXRhYmxlRmlsZXNGcm9tV21DbGFzc05hbWVzKHdpbmRvd0xpc3QpOiBQcm9taXNlPGFueT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKGZ1bGZpbGwsIHJlamVjdCkgPT4ge1xuICAgIGNvbnN0IHByb21pc2VzID0gd2luZG93TGlzdFxuICAgICAgLmZpbHRlcih3aW4gPT4gIXdpbi5leGVjdXRhYmxlRmlsZSlcbiAgICAgIC5tYXAod2luID0+IHtcbiAgICAgICAgcmV0dXJuIF9wYXJzZUV4ZWN1dGFibGVGaWxlRnJvbVdtQ2xhc3NOYW1lKHdpbi53bUNsYXNzTmFtZSkudGhlbihcbiAgICAgICAgICBmaWxlTmFtZSA9PiB7XG4gICAgICAgICAgICB3aW4uZXhlY3V0YWJsZUZpbGUgPSBmaWxlTmFtZTtcbiAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICB9KTtcblxuICAgIGlmIChwcm9taXNlcy5sZW5ndGgpIHtcbiAgICAgIGZvciAoY29uc3QgcHJvbWlzZSBvZiBwcm9taXNlcykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGF3YWl0IHByb21pc2U7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICByZWplY3QoZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGZ1bGZpbGwod2luZG93TGlzdCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZ1bGZpbGwod2luZG93TGlzdCk7XG4gICAgfVxuICB9KS5jYXRjaChfY2F0Y2hHZW5lcmljRXJyKTtcbn1cblxuZnVuY3Rpb24gX3BhcnNlRXhlY3V0YWJsZUZpbGVGcm9tV21DbGFzc05hbWUod21DbGFzc05hbWUpOiBQcm9taXNlPGFueT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKGZ1bGZpbGwsIHJlamVjdCkgPT4ge1xuICAgIGNvbnN0IGV4ZWN1dGFibGVGaWxlRnJvbU1hcCA9XG4gICAgICBDRkcuV01fQ0xBU1NfQU5EX0VYRUNVVEFCTEVfRklMRV9NQVBbd21DbGFzc05hbWVdO1xuICAgIGlmIChleGVjdXRhYmxlRmlsZUZyb21NYXApIHtcbiAgICAgIGZ1bGZpbGwoZXhlY3V0YWJsZUZpbGVGcm9tTWFwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qgc3BsaXRWYWx1ZXMgPSB3bUNsYXNzTmFtZS5zcGxpdChcIi5cIik7XG4gICAgICBjb25zdCBmaWxlTmFtZSA9IHNwbGl0VmFsdWVzWzBdO1xuICAgICAgaWYgKF9pc0Nocm9tZUFwcChmaWxlTmFtZSkpIHtcbiAgICAgICAgX3BhcnNlQ2hyb21lQXBwRGVza3RvcEZpbGVOYW1lKGZpbGVOYW1lKVxuICAgICAgICAgIC50aGVuKGZ1bGZpbGwpXG4gICAgICAgICAgLmNhdGNoKHJlamVjdCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmdWxmaWxsKGZpbGVOYW1lICsgXCIuZGVza3RvcFwiKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pLmNhdGNoKF9jYXRjaEdlbmVyaWNFcnIpO1xufVxuXG5mdW5jdGlvbiBfcGFyc2VTaW1wbGVXaW5kb3dOYW1lKHdtQ2xhc3NOYW1lKSB7XG4gIGNvbnN0IHNwbGl0VmFsdWVzID0gd21DbGFzc05hbWUuc3BsaXQoXCIuXCIpO1xuICBpZiAoc3BsaXRWYWx1ZXNbMV0pIHtcbiAgICByZXR1cm4gc3BsaXRWYWx1ZXNbMV07XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHdtQ2xhc3NOYW1lO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9pc0Nocm9tZUFwcChmaWxlTmFtZSkge1xuICByZXR1cm4gISFmaWxlTmFtZS5tYXRjaCgvXmNyeF8vKTtcbn1cblxuZnVuY3Rpb24gX3BhcnNlQ2hyb21lQXBwRGVza3RvcEZpbGVOYW1lKGZpbGVOYW1lKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgLy8gd2Ugd2FuJ3QgdG8gc2VhcmNoIGZyb20gZGVza3RvcCBmaWxlcyBvbmx5XG4gICAgY29uc3QgbG9jYXRlU3RyID0gZmlsZU5hbWUucmVwbGFjZShcImNyeF9cIiwgXCIqXCIpICsgXCIqLmRlc2t0b3BcIjtcbiAgICBmaW5kRGVza3RvcEZpbGUobG9jYXRlU3RyKVxuICAgICAgLnRoZW4ocmVzb2x2ZSlcbiAgICAgIC5jYXRjaChyZWplY3QpO1xuICB9KS5jYXRjaChfY2F0Y2hHZW5lcmljRXJyKTtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuaW1wb3J0IHsgQ0ZHLCBTRVNTSU9OX0RBVEFfRElSIH0gZnJvbSBcIi4vY29uZmlnXCI7XG5pbXBvcnQgKiBhcyBmcyBmcm9tIFwiZnNcIjtcbmltcG9ydCB7IGdldENvbm5lY3RlZERpc3BsYXlzSWQsIHN0YXJ0UHJvZ3JhbSB9IGZyb20gXCIuL290aGVyQ21kXCI7XG5pbXBvcnQge1xuICBjbG9zZVdpbmRvdyxcbiAgZ2V0WCxcbiAgaW5pdFgxMSxcbiAgbW92ZVRvV29ya3NwYWNlLFxuICByZXN0b3JlV2luZG93UG9zaXRpb25cbn0gZnJvbSBcIi4veDExV3JhcHBlclwiO1xuaW1wb3J0IHtcbiAgZmluZERlc2t0b3BGaWxlLFxuICBnZXRBY3RpdmVXaW5kb3dMaXN0RmxvdyxcbiAgZ29Ub0ZpcnN0V29ya3NwYWNlXG59IGZyb20gXCIuL21ldGFXcmFwcGVyXCI7XG5pbXBvcnQgeyBsb2cgfSBmcm9tIFwiLi9sb2dcIjtcbmltcG9ydCB7IFdpbk9iaiB9IGZyb20gXCIuL21vZGVsXCI7XG5pbXBvcnQgeyBleGVjIH0gZnJvbSBcImNoaWxkX3Byb2Nlc3NcIjtcblxuLy8gaW1wb3J0ICogYXMgU3RvcmUgZnJvbSAnamZzJztcbmNvbnN0IFN0b3JlID0gcmVxdWlyZShcImpmc1wiKTtcblxuLy8gY3JlYXRlIGRhdGEgc3RvcmVcbmNvbnN0IGRiID0gbmV3IFN0b3JlKFNFU1NJT05fREFUQV9ESVIsIHtcbiAgcHJldHR5OiBDRkcuU0FWRV9TRVNTSU9OX0lOX1BSRVRUWV9GT1JNQVRcbn0pO1xuXG4vLyBzZXR1cCBtZXRhIHdyYXBwZXJcblxuLy8gRVhQT1JUXG4vLyAtLS0tLS1cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbGlzdFNlc3Npb25zLFxuICByZW5hbWVTZXNzaW9uLFxuICBzYXZlU2Vzc2lvbixcbiAgcmVtb3ZlU2Vzc2lvbixcbiAgcmVzdG9yZVNlc3Npb24sXG4gIGdldFNlc3Npb25zLFxuICBnZXRYOiBnZXRYLFxuXG4gIGdldENvbm5lY3RlZERpc3BsYXlzSWQsXG4gIHJlc2V0Q2ZnOiAoKSA9PiB7XG4gICAgY29uc3QgY29uZmlnRmlsZVBhdGggPSBDRkcuREFUQV9ESVIgKyBcIi9jb25maWcuanNvblwiO1xuICAgIGlmIChmcy5leGlzdHNTeW5jKGNvbmZpZ0ZpbGVQYXRoKSkge1xuICAgICAgZnMudW5saW5rU3luYyhjb25maWdGaWxlUGF0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJObyBDb25maWcgcHJlc2VudCBpbiBcIiArIGNvbmZpZ0ZpbGVQYXRoKTtcbiAgICB9XG4gIH0sXG4gIGdldENmZzogKCkgPT4ge1xuICAgIHJldHVybiBDRkc7XG4gIH0sXG4gIGdldERiOiAoKSA9PiB7XG4gICAgcmV0dXJuIGRiO1xuICB9XG59O1xuXG4vLyBIRUxQRVJcbi8vIC0tLS0tLS0tXG5mdW5jdGlvbiBfY2F0Y2hHZW5lcmljRXJyKGVycikge1xuICBjb25zb2xlLmVycm9yKFwiR2VuZXJpYyBFcnJvciBpbiBNYWluIEhhbmRsZXJcIiwgZXJyLCBlcnIuc3RhY2spO1xuICB0aHJvdyBlcnI7XG59XG5cbmZ1bmN0aW9uIGdldFNlc3Npb25zKCkge1xuICByZXR1cm4gZGIuYWxsU3luYygpO1xufVxuXG4vLyBNQUlOIEZVTkNUSU9OU1xuLy8gLS0tLS0tLS0tLS0tLS1cbmZ1bmN0aW9uIGxpc3RTZXNzaW9ucygpIHtcbiAgbGV0IGxpc3QgPSBPYmplY3Qua2V5cyhnZXRTZXNzaW9ucygpKTtcbiAgbGlzdC5mb3JFYWNoKG5hbWUgPT4ge1xuICAgIGxvZyhuYW1lKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHJlbmFtZVNlc3Npb24ob2xkTmFtZTogc3RyaW5nLCBuZXdOYW1lOiBzdHJpbmcpIHtcbiAgbGV0IG9iaiA9IGRiLmdldFN5bmMob2xkTmFtZSk7XG4gIGlmIChvYmoubWVzc2FnZSkge1xuICAgIGlmIChvYmoubWVzc2FnZSA9PT0gXCJjb3VsZCBub3QgbG9hZCBkYXRhXCIpIHtcbiAgICAgIGxvZyhgRXJyb3I6IENvdWxkIG5vdCBmaW5kIGEgc2Vzc2lvbiBuYW1lZCAnJHtvbGROYW1lfSdgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbG9nKG9iai5tZXNzYWdlKTtcbiAgICB9XG4gICAgcmV0dXJuO1xuICB9XG4gIGRiLnNhdmVTeW5jKG5ld05hbWUsIG9iaik7XG4gIGRiLmRlbGV0ZShvbGROYW1lKTtcbn1cblxuZnVuY3Rpb24gc2F2ZVNlc3Npb24oc2Vzc2lvbk5hbWU6IHN0cmluZywgaW5wdXRIYW5kbGVycyk6IFByb21pc2U8YW55PiB7XG4gIGNvbnN0IHNlc3Npb25Ub0hhbmRsZSA9IHNlc3Npb25OYW1lIHx8IFwiREVGQVVMVFwiO1xuXG4gIHJldHVybiBpbml0WDExKClcbiAgICAudGhlbigoKSA9PiB7XG4gICAgICByZXR1cm4gZ2V0QWN0aXZlV2luZG93TGlzdEZsb3coKTtcbiAgICB9KVxuICAgIC50aGVuKHdpbmRvd0xpc3QgPT4ge1xuICAgICAgLy8gZGVza3RvcCBmaWxlIHBhdGhzIGFuZCBjb25uZWN0ZWQgZGlzcGxheSBpZHNcbiAgICAgIHJldHVybiBfZ3Vlc3NBbmRTZXREZXNrdG9wRmlsZVBhdGhzKFxuICAgICAgICB3aW5kb3dMaXN0LFxuICAgICAgICBpbnB1dEhhbmRsZXJzLmRlc2t0b3BGaWxlUGF0aFxuICAgICAgKTtcbiAgICB9KVxuICAgIC50aGVuKHdpbmRvd0xpc3QgPT4ge1xuICAgICAgY29uc3QgY29ubmVjdGVkRGlzcGxheXNJZCA9IGdldENvbm5lY3RlZERpc3BsYXlzSWQoKTtcbiAgICAgIHJldHVybiBzYXZlU2Vzc2lvbkZvckRpc3BsYXlUb0RiKFxuICAgICAgICBzZXNzaW9uVG9IYW5kbGUsXG4gICAgICAgIGNvbm5lY3RlZERpc3BsYXlzSWQsXG4gICAgICAgIHdpbmRvd0xpc3RcbiAgICAgICk7XG4gICAgfSlcbiAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJzYXZlU2Vzc2lvbigpOiBBbiBlcnJvciBvY2N1cnJlZFwiLCBlcnIpO1xuICAgICAgdGhyb3cgZXJyO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBzYXZlU2Vzc2lvbkZvckRpc3BsYXlUb0RiKFxuICBzZXNzaW9uVG9IYW5kbGU6IHN0cmluZyxcbiAgY29ubmVjdGVkRGlzcGxheXNJZDogc3RyaW5nLFxuICB3aW5kb3dMaXN0OiBXaW5PYmpbXVxuKTogUHJvbWlzZTx2b2lkPiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgoZnVsZmlsbCwgcmVqZWN0KSA9PiB7XG4gICAgLy8gY2hlY2sgaWYgZW50cnkgZXhpc3RzIGFuZCB1cGRhdGVcbiAgICBkYi5nZXQoc2Vzc2lvblRvSGFuZGxlLCAoZXJyLCBzZXNzaW9uRGF0YSkgPT4ge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICAvLyBOT1RFOiB3ZSdyZSBub3QgZmFpbGluZyBiZWNhdXNlLCB0aGUgY2FzZSBpcyBwcm9iYWJseSB0aGF0IHRoZXJlIGlzIG5vIHNlc3Npb24gZmlsZSB5ZXRcbiAgICAgICAgbG9nKFxuICAgICAgICAgIGBzYXZlU2Vzc2lvbkZvckRpc3BsYXlUb0RiOiBubyBzZXNzaW9uIGZpbGUgcHJlc2VudCB5ZXQgZm9yIFwiJHtzZXNzaW9uVG9IYW5kbGV9XCIsIGNyZWF0aW5nIGEgbmV3IG9uZS4uLmBcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFzZXNzaW9uRGF0YSkge1xuICAgICAgICAvLyBjcmVhdGUgbmV3IG9iamVjdFxuICAgICAgICBzZXNzaW9uRGF0YSA9IHtcbiAgICAgICAgICBuYW1lOiBzZXNzaW9uVG9IYW5kbGVcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIGlmIChcbiAgICAgICAgIXNlc3Npb25EYXRhLmRpc3BsYXlzQ29tYmluYXRpb25zIHx8XG4gICAgICAgICFBcnJheS5pc0FycmF5KHNlc3Npb25EYXRhLmRpc3BsYXlzQ29tYmluYXRpb25zKVxuICAgICAgKSB7XG4gICAgICAgIC8vIGNyZWF0ZSBuZXcgYXJyYXlcbiAgICAgICAgc2Vzc2lvbkRhdGEuZGlzcGxheXNDb21iaW5hdGlvbnMgPSBbXTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZXhpc3RpbmdEaXNwbGF5RW50cnkgPSBzZXNzaW9uRGF0YS5kaXNwbGF5c0NvbWJpbmF0aW9ucy5maW5kKFxuICAgICAgICBlbnRyeSA9PiBlbnRyeS5pZCA9PT0gY29ubmVjdGVkRGlzcGxheXNJZFxuICAgICAgKTtcbiAgICAgIGlmIChleGlzdGluZ0Rpc3BsYXlFbnRyeSkge1xuICAgICAgICBleGlzdGluZ0Rpc3BsYXlFbnRyeS53aW5kb3dMaXN0ID0gd2luZG93TGlzdDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNlc3Npb25EYXRhLmRpc3BsYXlzQ29tYmluYXRpb25zLnB1c2goe1xuICAgICAgICAgIGlkOiBjb25uZWN0ZWREaXNwbGF5c0lkLFxuICAgICAgICAgIHdpbmRvd0xpc3RcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGRiLnNhdmUoc2Vzc2lvblRvSGFuZGxlLCBzZXNzaW9uRGF0YSwgZXJyID0+IHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxvZyhcIlNBVkVEIFNFU1NJT046IFwiICsgc2Vzc2lvblRvSGFuZGxlKTtcbiAgICAgICAgICBmdWxmaWxsKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gcmVzdG9yZVNlc3Npb24oXG4gIHNlc3Npb25OYW1lOiBzdHJpbmcsXG4gIGlzQ2xvc2VBbGxPcGVuV2luZG93czogYm9vbGVhblxuKTogUHJvbWlzZTxhbnk+IHtcbiAgY29uc3Qgc2Vzc2lvblRvSGFuZGxlID0gc2Vzc2lvbk5hbWUgfHwgXCJERUZBVUxUXCI7XG5cbiAgcmV0dXJuIG5ldyBQcm9taXNlKChmdWxmaWxsLCByZWplY3QpID0+IHtcbiAgICBkYi5nZXQoc2Vzc2lvblRvSGFuZGxlIHx8IFwiREVGQVVMVFwiLCAoZXJyLCBzZXNzaW9uRGF0YSkgPT4ge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBsZXQgc2F2ZWRXaW5kb3dMaXN0O1xuXG4gICAgICBpbml0WDExKClcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIHJldHVybiBfY2xvc2VBbGxXaW5kb3dzSWZTZXQoaXNDbG9zZUFsbE9wZW5XaW5kb3dzKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oZ29Ub0ZpcnN0V29ya3NwYWNlKVxuICAgICAgICAudGhlbihnZXRDb25uZWN0ZWREaXNwbGF5c0lkKVxuICAgICAgICAudGhlbihjb25uZWN0ZWREaXNwbGF5c0lkID0+IHtcbiAgICAgICAgICBpZiAoIXNlc3Npb25EYXRhLmRpc3BsYXlzQ29tYmluYXRpb25zKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBubyBkaXNwbGF5IGNvbWJpbmF0aW9ucyBzYXZlZCB5ZXRgKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBkaXNwbGF5RW50cnkgPSBzZXNzaW9uRGF0YS5kaXNwbGF5c0NvbWJpbmF0aW9ucy5maW5kKFxuICAgICAgICAgICAgZW50cnkgPT4gZW50cnkuaWQgPT09IGNvbm5lY3RlZERpc3BsYXlzSWRcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgaWYgKGRpc3BsYXlFbnRyeSkge1xuICAgICAgICAgICAgc2F2ZWRXaW5kb3dMaXN0ID0gZGlzcGxheUVudHJ5LndpbmRvd0xpc3Q7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgICAgIGBubyBkYXRhIGZvciBjdXJyZW50IGRpc3BsYXkgaWQgJyR7Y29ubmVjdGVkRGlzcGxheXNJZH0nIHNhdmVkIHlldGBcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBnZXRBY3RpdmVXaW5kb3dMaXN0RmxvdygpO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbihjdXJyZW50V2luZG93TGlzdCA9PiB7XG4gICAgICAgICAgcmV0dXJuIF9zdGFydFNlc3Npb25Qcm9ncmFtcyhzYXZlZFdpbmRvd0xpc3QsIGN1cnJlbnRXaW5kb3dMaXN0KTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIC8vIGdldHMgY3VycmVudCB3aW5kb3cgbGlzdCBieSBpdHNlbGYgYW5kIHJldHVybnMgdGhlIHVwZGF0ZWQgdmFyaWFudFxuICAgICAgICAgIHJldHVybiBfd2FpdEZvckFsbEFwcHNUb1N0YXJ0KHNhdmVkV2luZG93TGlzdCk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKCh1cGRhdGVkQ3VycmVudFdpbmRvd0xpc3Q6IFdpbk9ialtdKSA9PiB7XG4gICAgICAgICAgX3VwZGF0ZVdpbmRvd0lkcyhzYXZlZFdpbmRvd0xpc3QsIHVwZGF0ZWRDdXJyZW50V2luZG93TGlzdCk7XG4gICAgICAgICAgcmV0dXJuIF9yZXN0b3JlV2luZG93UG9zaXRpb25zKHNhdmVkV2luZG93TGlzdCk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICBsb2coXCJSRVNUT1JFRCBTRVNTSU9OOiBcIiArIHNlc3Npb25Ub0hhbmRsZSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJBbiBlcnJvciBvY2N1cnJlZFwiLCBlcnIpO1xuICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbihmdWxmaWxsKTtcbiAgICB9KTtcbiAgfSkuY2F0Y2goX2NhdGNoR2VuZXJpY0Vycik7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVNlc3Npb24oc2Vzc2lvbk5hbWU6IHN0cmluZyk6IFByb21pc2U8dW5rbm93bj4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKGZ1bGZpbGwsIHJlamVjdCkgPT4ge1xuICAgIGZzLnVubGluayhDRkcuU0VTU0lPTl9EQVRBX0RJUiArIFwiL1wiICsgc2Vzc2lvbk5hbWUgKyBcIi5qc29uXCIsIGVycm9yID0+IHtcbiAgICAgIGlmIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZ1bGZpbGwoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSkuY2F0Y2goX2NhdGNoR2VuZXJpY0Vycik7XG59XG5cbmZ1bmN0aW9uIF9jbG9zZUFsbFdpbmRvd3NJZlNldChpc0Nsb3NlQWxsOiBib29sZWFuKTogUHJvbWlzZTx1bmtub3duPiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgoZnVsZmlsbCwgcmVqZWN0KSA9PiB7XG4gICAgaWYgKGlzQ2xvc2VBbGwpIHtcbiAgICAgIGxvZyhcIkNsb3Npbmcgb3BlbmVkIGFwcGxpY2F0aW9uc1wiKTtcbiAgICAgIGdldEFjdGl2ZVdpbmRvd0xpc3RGbG93KClcbiAgICAgICAgLnRoZW4oKGN1cnJlbnRXaW5kb3dMaXN0OiBhbnlbXSkgPT4ge1xuICAgICAgICAgIGN1cnJlbnRXaW5kb3dMaXN0LmZvckVhY2god2luID0+IHtcbiAgICAgICAgICAgIGNsb3NlV2luZG93KHdpbi53aW5kb3dJZCk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBfd2FpdEZvckFsbEFwcHNUb0Nsb3NlKClcbiAgICAgICAgICAgIC50aGVuKGZ1bGZpbGwpXG4gICAgICAgICAgICAuY2F0Y2gocmVqZWN0KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKHJlamVjdCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZ1bGZpbGwoKTtcbiAgICB9XG4gIH0pLmNhdGNoKF9jYXRjaEdlbmVyaWNFcnIpO1xufVxuXG5mdW5jdGlvbiBfd2FpdEZvckFsbEFwcHNUb0Nsb3NlKCk6IFByb21pc2U8dW5rbm93bj4ge1xuICBsZXQgdG90YWxUaW1lV2FpdGVkID0gMDtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChmdWxmaWxsLCByZWplY3QpID0+IHtcbiAgICBmdW5jdGlvbiBwb2xsQWxsQXBwc0Nsb3NlZCgpIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBnZXRBY3RpdmVXaW5kb3dMaXN0RmxvdygpXG4gICAgICAgICAgLnRoZW4oKGN1cnJlbnRXaW5kb3dMaXN0OiBXaW5PYmpbXSkgPT4ge1xuICAgICAgICAgICAgdG90YWxUaW1lV2FpdGVkICs9IENGRy5QT0xMX0FMTF9BUFBTX1NUQVJURURfSU5URVJWQUw7XG4gICAgICAgICAgICBpZiAoY3VycmVudFdpbmRvd0xpc3QubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgICAgIGlmICh0b3RhbFRpbWVXYWl0ZWQgPiBDRkcuUE9MTF9BTExfTUFYX1RJTUVPVVQpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiUE9MTF9BTExfTUFYX1RJTUVPVVQgcmVhY2hlZFwiKTtcbiAgICAgICAgICAgICAgICByZWplY3QoXCJQT0xMX0FMTF9NQVhfVElNRU9VVCByZWFjaGVkXCIpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIGNhbGwgcmVjdXJzaXZlbHlcbiAgICAgICAgICAgICAgICBwb2xsQWxsQXBwc0Nsb3NlZCgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBmdWxmaWxsKGN1cnJlbnRXaW5kb3dMaXN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaChyZWplY3QpO1xuICAgICAgfSwgQ0ZHLlBPTExfQUxMX0FQUFNfU1RBUlRFRF9JTlRFUlZBTCk7XG4gICAgfVxuXG4gICAgLy8gc3RhcnQgb25jZSBpbml0aWFsbHlcbiAgICBwb2xsQWxsQXBwc0Nsb3NlZCgpO1xuICB9KS5jYXRjaChfY2F0Y2hHZW5lcmljRXJyKTtcbn1cblxuZnVuY3Rpb24gX3dhaXRGb3JBbGxBcHBzVG9TdGFydChzYXZlZFdpbmRvd0xpc3QpOiBQcm9taXNlPFdpbk9ialtdIHwgdW5rbm93bj4ge1xuICBsb2coXCJXYWl0aW5nIGZvciBhbGwgYXBwbGljYXRpb25zIHRvIHN0YXJ0Li4uXCIpO1xuXG4gIGxldCB0b3RhbFRpbWVXYWl0ZWQgPSAwO1xuICBsZXQgdGltZW91dDtcblxuICByZXR1cm4gbmV3IFByb21pc2UoKGZ1bGZpbGwsIHJlamVjdCkgPT4ge1xuICAgIGZ1bmN0aW9uIHBvbGxBbGxBcHBzU3RhcnRlZChcbiAgICAgIHNhdmVkV2luZG93TGlzdDogV2luT2JqW10sXG4gICAgICB0aW1lb3V0RHVyYXRpb24gPSBDRkcuUE9MTF9BTExfQVBQU19TVEFSVEVEX0lOVEVSVkFMXG4gICAgKSB7XG4gICAgICB0aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIC8vIGNsZWFyIHRpbWVvdXQgdG8gYmUgc2F2ZVxuICAgICAgICBpZiAodGltZW91dCkge1xuICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldEFjdGl2ZVdpbmRvd0xpc3RGbG93KClcbiAgICAgICAgICAudGhlbihjdXJyZW50V2luZG93TGlzdCA9PiB7XG4gICAgICAgICAgICB0b3RhbFRpbWVXYWl0ZWQgKz0gQ0ZHLlBPTExfQUxMX0FQUFNfU1RBUlRFRF9JTlRFUlZBTDtcbiAgICAgICAgICAgIGlmICghX2lzQWxsQXBwc1N0YXJ0ZWQoc2F2ZWRXaW5kb3dMaXN0LCBjdXJyZW50V2luZG93TGlzdCkpIHtcbiAgICAgICAgICAgICAgaWYgKHRvdGFsVGltZVdhaXRlZCA+IENGRy5QT0xMX0FMTF9NQVhfVElNRU9VVCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJQT0xMX0FMTF9NQVhfVElNRU9VVCByZWFjaGVkXCIpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgICAgICAgICBcIlVuYWJsZSB0byBzdGFydCB0aGUgZm9sbG93aW5nIGFwcHNcIixcbiAgICAgICAgICAgICAgICAgIF9nZXROb3RTdGFydGVkQXBwcyhzYXZlZFdpbmRvd0xpc3QsIGN1cnJlbnRXaW5kb3dMaXN0KVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgcmVqZWN0KFwiUE9MTF9BTExfTUFYX1RJTUVPVVQgcmVhY2hlZFwiKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBjYWxsIHJlY3Vyc2l2ZWx5XG4gICAgICAgICAgICAgICAgcG9sbEFsbEFwcHNTdGFydGVkKHNhdmVkV2luZG93TGlzdCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGxvZyhcIkFsbCBhcHBsaWNhdGlvbnMgc3RhcnRlZFwiKTtcbiAgICAgICAgICAgICAgZnVsZmlsbChjdXJyZW50V2luZG93TGlzdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2gocmVqZWN0KTtcbiAgICAgIH0sIHRpbWVvdXREdXJhdGlvbik7XG4gICAgfVxuXG4gICAgLy8gc3RhcnQgb25jZSBpbml0aWFsbHlcbiAgICBwb2xsQWxsQXBwc1N0YXJ0ZWQoc2F2ZWRXaW5kb3dMaXN0LCA1MDApO1xuICB9KS5jYXRjaChfY2F0Y2hHZW5lcmljRXJyKTtcbn1cblxuZnVuY3Rpb24gX2dldE5vdFN0YXJ0ZWRBcHBzKFxuICBzYXZlZFdpbmRvd0xpc3Q6IFdpbk9ialtdLFxuICBjdXJyZW50V2luZG93TGlzdDogV2luT2JqW11cbik6IFdpbk9ialtdIHtcbiAgbGV0IG5vblN0YXJ0ZWRBcHBzID0gW107XG4gIHNhdmVkV2luZG93TGlzdC5mb3JFYWNoKHdpbiA9PiB7XG4gICAgaWYgKCFfZ2V0TWF0Y2hpbmdXaW5kb3dJZCh3aW4sIGN1cnJlbnRXaW5kb3dMaXN0KSkge1xuICAgICAgbm9uU3RhcnRlZEFwcHMucHVzaCh3aW4pO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBub25TdGFydGVkQXBwcztcbn1cblxuZnVuY3Rpb24gX2lzQWxsQXBwc1N0YXJ0ZWQoXG4gIHNhdmVkV2luZG93TGlzdDogV2luT2JqW10sXG4gIGN1cnJlbnRXaW5kb3dMaXN0OiBXaW5PYmpbXVxuKTogYm9vbGVhbiB7XG4gIGxldCBpc0FsbFN0YXJ0ZWQgPSB0cnVlO1xuICBjb25zdCBjdXJyZW50V2luZG93TGlzdENvcHkgPSBjdXJyZW50V2luZG93TGlzdC5zbGljZSgwKTtcbiAgc2F2ZWRXaW5kb3dMaXN0LmZvckVhY2god2luID0+IHtcbiAgICBpZiAoIV9nZXRNYXRjaGluZ1dpbmRvd0lkKHdpbiwgY3VycmVudFdpbmRvd0xpc3RDb3B5KSkge1xuICAgICAgaXNBbGxTdGFydGVkID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGluZGV4ID0gY3VycmVudFdpbmRvd0xpc3RDb3B5LmZpbmRJbmRleChcbiAgICAgICAgd2luRnJvbUN1cnJlbnQgPT4gd2luLndtQ2xhc3NOYW1lID09PSB3aW5Gcm9tQ3VycmVudC53bUNsYXNzTmFtZVxuICAgICAgKTtcbiAgICAgIGN1cnJlbnRXaW5kb3dMaXN0Q29weS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBpc0FsbFN0YXJ0ZWQ7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIF9ndWVzc0FuZFNldERlc2t0b3BGaWxlUGF0aHMoXG4gIHdpbmRvd0xpc3Q6IFdpbk9ialtdLFxuICBpbnB1dEhhbmRsZXJcbik6IFByb21pc2U8V2luT2JqW10+IHtcbiAgY29uc3QgcHJvbWlzZXMgPSB3aW5kb3dMaXN0Lm1hcCh3aW4gPT4gX2d1ZXNzRmlsZVBhdGgod2luLCBpbnB1dEhhbmRsZXIpKTtcblxuICBmb3IgKGNvbnN0IHByb21pc2Ugb2YgcHJvbWlzZXMpIHtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgcHJvbWlzZTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBfY2F0Y2hHZW5lcmljRXJyKGUpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gd2luZG93TGlzdDtcbn1cblxuZnVuY3Rpb24gX2d1ZXNzRmlsZVBhdGgod2luOiBXaW5PYmosIGlucHV0SGFuZGxlcik6IFByb21pc2U8c3RyaW5nIHwgdW5rbm93bj4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKGZ1bGZpbGwsIHJlamVjdCkgPT4ge1xuICAgIGZ1bmN0aW9uIGNhbGxJbnB1dEhhbmRsZXIoZXJyb3I/LCBzdGRvdXQ/KSB7XG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgYFxcbiBUcnlpbmcgYWx0ZXJuYXRpdmUgZ3Vlc3NpbmcgYXBwcm9hY2ggZm9yIFwiJHt3aW4uc2ltcGxlTmFtZX1cIi4uLi4uYFxuICAgICAgICApO1xuICAgICAgICBleGVjKGBjYXQgL3Byb2MvJHt3aW4ud21QaWR9L2NtZGxpbmVgLCAoZXJyb3IxLCBzdGRvdXQxKSA9PiB7XG4gICAgICAgICAgaWYgKGVycm9yMSB8fCAhc3Rkb3V0MS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFUlIgX2d1ZXNzRmlsZVBhdGgoKVwiLCBlcnJvcjEpO1xuICAgICAgICAgICAgcmVqZWN0KGVycm9yMSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGVudCA9IHN0ZG91dDEuc3BsaXQoXCJcXHUwMDAwXCIpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICAgIGBcXG4gQWx0ZXJuYXRpdmUgZ3Vlc3NpbmcgYXBwcm9hY2ggZm9yIFwiJHt3aW4uc2ltcGxlTmFtZX1cIiBTVUNDRVNTIC0+ICR7ZW50WzBdfWBcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB3aW4uZXhlY3V0YWJsZUZpbGUgPSBlbnRbMF07XG4gICAgICAgICAgICBmdWxmaWxsKHdpbi5leGVjdXRhYmxlRmlsZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlucHV0SGFuZGxlcihlcnJvciwgd2luLCBzdGRvdXQpXG4gICAgICAgICAgLnRoZW4oaW5wdXQgPT4ge1xuICAgICAgICAgICAgaWYgKF9pc0Rlc2t0b3BGaWxlKHdpbi5leGVjdXRhYmxlRmlsZSkpIHtcbiAgICAgICAgICAgICAgd2luLmRlc2t0b3BGaWxlUGF0aCA9IGlucHV0O1xuICAgICAgICAgICAgICBmdWxmaWxsKHdpbi5kZXNrdG9wRmlsZVBhdGgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgd2luLmV4ZWN1dGFibGVGaWxlID0gaW5wdXQ7XG4gICAgICAgICAgICAgIGZ1bGZpbGwod2luLmV4ZWN1dGFibGVGaWxlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaChyZWplY3QpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChfaXNEZXNrdG9wRmlsZSh3aW4uZXhlY3V0YWJsZUZpbGUpKSB7XG4gICAgICBmaW5kRGVza3RvcEZpbGUod2luLmV4ZWN1dGFibGVGaWxlKVxuICAgICAgICAudGhlbihzdGRvdXQgPT4ge1xuICAgICAgICAgIGNhbGxJbnB1dEhhbmRsZXIobnVsbCwgc3Rkb3V0KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGNhbGxJbnB1dEhhbmRsZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjYWxsSW5wdXRIYW5kbGVyKHRydWUsIHdpbi5leGVjdXRhYmxlRmlsZSk7XG4gICAgfVxuICB9KS5jYXRjaChfY2F0Y2hHZW5lcmljRXJyKTtcbn1cblxuLy8gVE9ETyBjaGVjayBmb3IgaG93IG1hbnkgaW5zdGFuY2VzIHRoZXJlIHNob3VsZCBiZSBydW5uaW5nIG9mIGEgcHJvZ3JhbVxuYXN5bmMgZnVuY3Rpb24gX3N0YXJ0U2Vzc2lvblByb2dyYW1zKFxuICB3aW5kb3dMaXN0OiBXaW5PYmpbXSxcbiAgY3VycmVudFdpbmRvd0xpc3Q6IFdpbk9ialtdXG4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgLy8gc2V0IGluc3RhbmNlcyBzdGFydGVkIHRvIDBcbiAgd2luZG93TGlzdC5mb3JFYWNoKHdpbiA9PiAod2luLmluc3RhbmNlc1N0YXJ0ZWQgPSAwKSk7XG4gIGNvbnN0IHByb21pc2VzID0gd2luZG93TGlzdFxuICAgIC5maWx0ZXIod2luID0+IHtcbiAgICAgIGNvbnN0IG51bWJlck9mSW5zdGFuY2VzT2ZXaW4gPSBfZ2V0TnVtYmVyT2ZJbnN0YW5jZXNUb1J1bihcbiAgICAgICAgd2luLFxuICAgICAgICB3aW5kb3dMaXN0XG4gICAgICApO1xuICAgICAgcmV0dXJuICFfaXNQcm9ncmFtQWxyZWFkeVJ1bm5pbmcoXG4gICAgICAgIHdpbi53bUNsYXNzTmFtZSxcbiAgICAgICAgY3VycmVudFdpbmRvd0xpc3QsXG4gICAgICAgIG51bWJlck9mSW5zdGFuY2VzT2ZXaW4sXG4gICAgICAgIHdpbi5pbnN0YW5jZXNTdGFydGVkXG4gICAgICApO1xuICAgIH0pXG4gICAgLm1hcCh3aW4gPT4ge1xuICAgICAgd2luLmluc3RhbmNlc1N0YXJ0ZWQgKz0gMTtcbiAgICAgIHJldHVybiBzdGFydFByb2dyYW0od2luLmV4ZWN1dGFibGVGaWxlLCB3aW4uZGVza3RvcEZpbGVQYXRoKTtcbiAgICB9KTtcblxuICBhd2FpdCBQcm9taXNlLmFsbChwcm9taXNlcyk7XG59XG5cbmZ1bmN0aW9uIF9nZXROdW1iZXJPZkluc3RhbmNlc1RvUnVuKFxuICB3aW5kb3dUb01hdGNoOiBXaW5PYmosXG4gIHdpbmRvd0xpc3Q6IFdpbk9ialtdXG4pOiBudW1iZXIge1xuICByZXR1cm4gd2luZG93TGlzdC5maWx0ZXIod2luID0+IHtcbiAgICByZXR1cm4gd2luLndtQ2xhc3NOYW1lID09PSB3aW5kb3dUb01hdGNoLndtQ2xhc3NOYW1lO1xuICB9KS5sZW5ndGg7XG59XG5cbmZ1bmN0aW9uIF9pc1Byb2dyYW1BbHJlYWR5UnVubmluZyhcbiAgd21DbGFzc05hbWU6IHN0cmluZyxcbiAgY3VycmVudFdpbmRvd0xpc3Q6IFdpbk9ialtdLFxuICBudW1iZXJPZkluc3RhbmNlc1RvUnVuOiBudW1iZXIsXG4gIGluc3RhbmNlc1N0YXJ0ZWQ6IG51bWJlclxuKTogYm9vbGVhbiB7XG4gIGlmICghbnVtYmVyT2ZJbnN0YW5jZXNUb1J1bikge1xuICAgIG51bWJlck9mSW5zdGFuY2VzVG9SdW4gPSAxO1xuICB9XG5cbiAgaWYgKCFpbnN0YW5jZXNTdGFydGVkKSB7XG4gICAgaW5zdGFuY2VzU3RhcnRlZCA9IDA7XG4gIH1cblxuICBsZXQgaW5zdGFuY2VzUnVubmluZyA9IDA7XG4gIGN1cnJlbnRXaW5kb3dMaXN0LmZvckVhY2god2luID0+IHtcbiAgICBpZiAod2luLndtQ2xhc3NOYW1lID09PSB3bUNsYXNzTmFtZSkge1xuICAgICAgaW5zdGFuY2VzUnVubmluZysrO1xuICAgIH1cbiAgfSk7XG4gIGxvZyhcbiAgICAnU3RhdHVzOiBcIicgKyB3bUNsYXNzTmFtZSArICdcIiBpcyBydW5uaW5nOicsXG4gICAgaW5zdGFuY2VzUnVubmluZyArIGluc3RhbmNlc1N0YXJ0ZWQgPj0gbnVtYmVyT2ZJbnN0YW5jZXNUb1J1bixcbiAgICBudW1iZXJPZkluc3RhbmNlc1RvUnVuLFxuICAgIGluc3RhbmNlc1N0YXJ0ZWRcbiAgKTtcbiAgcmV0dXJuIGluc3RhbmNlc1J1bm5pbmcgKyBpbnN0YW5jZXNTdGFydGVkID49IG51bWJlck9mSW5zdGFuY2VzVG9SdW47XG59XG5cbmZ1bmN0aW9uIF9pc0Rlc2t0b3BGaWxlKGV4ZWN1dGFibGVGaWxlOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgcmV0dXJuIGV4ZWN1dGFibGVGaWxlICYmICEhZXhlY3V0YWJsZUZpbGUubWF0Y2goL2Rlc2t0b3AkLyk7XG59XG5cbmZ1bmN0aW9uIF91cGRhdGVXaW5kb3dJZHMoXG4gIHNhdmVkV2luZG93TGlzdDogV2luT2JqW10sXG4gIGN1cnJlbnRXaW5kb3dMaXN0OiBXaW5PYmpbXVxuKSB7XG4gIGNvbnN0IHdtQ2xhc3NOYW1lTWFwID0ge307XG4gIHNhdmVkV2luZG93TGlzdC5mb3JFYWNoKHdpbiA9PiB7XG4gICAgaWYgKCF3bUNsYXNzTmFtZU1hcFt3aW4ud21DbGFzc05hbWVdKSB7XG4gICAgICB3bUNsYXNzTmFtZU1hcFt3aW4ud21DbGFzc05hbWVdID0gX2dldE1hdGNoaW5nV2luZG93cyhcbiAgICAgICAgd2luLFxuICAgICAgICBjdXJyZW50V2luZG93TGlzdFxuICAgICAgKTtcbiAgICB9XG5cbiAgICB3aW4ud2luZG93SWQgPSB3bUNsYXNzTmFtZU1hcFt3aW4ud21DbGFzc05hbWVdWzBdLndpbmRvd0lkO1xuICAgIHdpbi53aW5kb3dJZERlYyA9IHBhcnNlSW50KHdpbi53aW5kb3dJZCwgMTYpO1xuXG4gICAgLy8gcmVtb3ZlIGZpcnN0IGVudHJ5XG4gICAgd21DbGFzc05hbWVNYXBbd2luLndtQ2xhc3NOYW1lXS5zaGlmdCgpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gX2dldE1hdGNoaW5nV2luZG93SWQoXG4gIHdpbjogV2luT2JqLFxuICBjdXJyZW50V2luZG93TGlzdDogV2luT2JqW11cbik6IHN0cmluZyB7XG4gIGNvbnN0IGN1cnJlbnRXaW5kb3cgPSBjdXJyZW50V2luZG93TGlzdC5maW5kKFxuICAgIHdpbkZyb21DdXJyZW50ID0+IHdpbi53bUNsYXNzTmFtZSA9PT0gd2luRnJvbUN1cnJlbnQud21DbGFzc05hbWVcbiAgKTtcbiAgcmV0dXJuIGN1cnJlbnRXaW5kb3cgJiYgY3VycmVudFdpbmRvdy53aW5kb3dJZDtcbn1cblxuZnVuY3Rpb24gX2dldE1hdGNoaW5nV2luZG93cyhcbiAgd2luOiBXaW5PYmosXG4gIGN1cnJlbnRXaW5kb3dMaXN0OiBXaW5PYmpbXVxuKTogV2luT2JqW10ge1xuICByZXR1cm4gY3VycmVudFdpbmRvd0xpc3QuZmlsdGVyKFxuICAgIHdpbkZyb21DdXJyZW50ID0+IHdpbi53bUNsYXNzTmFtZSA9PT0gd2luRnJvbUN1cnJlbnQud21DbGFzc05hbWVcbiAgKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gX3Jlc3RvcmVXaW5kb3dQb3NpdGlvbnMoXG4gIHNhdmVkV2luZG93TGlzdDogV2luT2JqW11cbik6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCBwcm9taXNlcyA9IFtdO1xuICBsZXQgbGFzdF9kZXNrdG9wX25yID0gMDtcblxuICAvLyBTb3J0IHRoZSB3aW5kb3cgb2JqZWN0cyBiYXNlZCBvbiB3aGljaCB3b3Jrc3BhY2UgdGhleSBhcmUgbG9jYXRlLFxuICAvLyBzbyB0aGUgd2luZG93cyBjYW4gYmUgbW92ZWQgd29ya3NwYWNlIGJ5IHdvcmtzcGFjZVxuICAvLyBUaGlzIGlzIG5lZWRlZCBiZWNhdXNlIHRoZSB3aW5kb3cgbWFuYWdlciBqdXN0IGNyZWF0ZXMgYW4gYWRpdGlvbmFsIHdvcmtzcGFjZSB3aGVuXG4gIC8vIHRoZSBwcmV2aW91cyBvbmUgaGFzIHNvbWUgd2luZG93IG9uIGl0LlxuICBzYXZlZFdpbmRvd0xpc3QgPSBzYXZlZFdpbmRvd0xpc3QuY29uY2F0KCkuc29ydCgoYSwgYikgPT4ge1xuICAgIHJldHVybiBhLndtQ3VycmVudERlc2t0b3BOciAtIGIud21DdXJyZW50RGVza3RvcE5yO1xuICB9KTtcblxuICBmb3IgKGNvbnN0IHdpbiBvZiBzYXZlZFdpbmRvd0xpc3QpIHtcbiAgICBwcm9taXNlcy5wdXNoKHJlc3RvcmVXaW5kb3dQb3NpdGlvbih3aW4pKTtcbiAgICBwcm9taXNlcy5wdXNoKG1vdmVUb1dvcmtzcGFjZSh3aW4ud2luZG93SWQsIHdpbi53bUN1cnJlbnREZXNrdG9wTnIpKTtcblxuICAgIC8vIFRoZSBwcm9taXNlcyBhcmUgbm90IGV4ZWN1dGVkIHVudGlsIHRoZSBsYXN0IGl0ZW0gaXMgcmVhY2hlZCBvclxuICAgIC8vIHRoZSBkZXNrdG9wX25yIGlzIGRpZmZlcmVudCBmcm9tIHRoZSBwcmV2aW91cyBlbnRyeSBhbmQgd2hpY2ggY2FzZVxuICAgIC8vIHRoZSBhcHAgd2FpdHMgZm9yIHRob3NlIHRvIGZpbmlzaCBiZWZvcmUgY29udGludWluZyB0aGUgcHJvY2Vzc1xuICAgIGlmIChcbiAgICAgIHdpbi53bUN1cnJlbnREZXNrdG9wTnIgIT09IGxhc3RfZGVza3RvcF9uciB8fFxuICAgICAgd2luID09PSBzYXZlZFdpbmRvd0xpc3Quc2xpY2UoLTEpWzBdXG4gICAgKSB7XG4gICAgICBmb3IgKGNvbnN0IHByb21pc2Ugb2YgcHJvbWlzZXMpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBhd2FpdCBwcm9taXNlO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgX2NhdGNoR2VuZXJpY0VycihlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGFzdF9kZXNrdG9wX25yID0gd2luLndtQ3VycmVudERlc2t0b3BOcjtcbiAgICAgIHByb21pc2VzLmxlbmd0aCA9IDA7XG4gICAgfVxuICB9XG59XG4iXSwibmFtZXMiOlsiZnMubWtkaXJTeW5jIiwiZnMucmVhZGRpclN5bmMiLCJwYXRoLmpvaW4iLCJmcy5sc3RhdFN5bmMiLCJmcy5jb3B5RmlsZVN5bmMiLCJmcy51bmxpbmtTeW5jIiwiZnMucm1kaXJTeW5jIiwiZnMuZXhpc3RzU3luYyIsImZzLnJlYWRGaWxlU3luYyIsImZzLndyaXRlRmlsZVN5bmMiLCJzcGF3biIsIl9jYXRjaEdlbmVyaWNFcnIiLCJmcy51bmxpbmsiLCJleGVjIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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
