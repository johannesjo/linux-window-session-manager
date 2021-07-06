import { mkdirSync as mkdirSync$1, readdirSync, lstatSync, copyFileSync, unlinkSync, rmdirSync, existsSync, readFileSync, writeFileSync, unlink } from 'fs';
import { join } from 'path';
import { spawn, exec } from 'child_process';

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
    var contents = readdirSync(from);
    for (var _i = 0, contents_1 = contents; _i < contents_1.length; _i++) {
        var element = contents_1[_i];
        var from_element = join(from, element);
        var to_element = join(to, element);
        if (lstatSync(from_element).isDirectory()) {
            movedir(from_element, to_element);
        }
        else {
            copyFileSync(from_element, to_element);
            unlinkSync(from_element);
        }
    }
    rmdirSync(from);
}

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
        "{home}/.local/share/flatpak/exports/share/applications",
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
var CFG_DATA_DIR_LEGACY = _getUserHome() + "/.lwsm";
var CFG_DATA_DIR = _getUserHome() + "/.config/lwsm";
var CFG_FILE_PATH = CFG_DATA_DIR + "/config.json";
var SESSION_DATA_DIR = CFG_DATA_DIR + "/sessionData";
// INIT
// ------------
try {
    // if CFG_DATA_DIR_LEGACY exists, move it to CFG_DATA_DIR
    if (existsSync(CFG_DATA_DIR_LEGACY)) {
        if (!existsSync(CFG_DATA_DIR)) {
            movedir(CFG_DATA_DIR_LEGACY, CFG_DATA_DIR);
            log("lwsm: moved config directory " + CFG_DATA_DIR_LEGACY + " to " + CFG_DATA_DIR);
        }
        else {
            log("lwsm: ignored legacy config directory " + CFG_DATA_DIR_LEGACY);
        }
    }
    // if config is already in place
    var fromFile = JSON.parse(readFileSync(CFG_FILE_PATH, "utf8"));
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
    writeFileSync(CFG_FILE_PATH, JSON.stringify(cfg, null, 2), "utf8");
}
// also make data dirs accessible to the outside
cfg.DATA_DIR = CFG_DATA_DIR;
cfg.SESSION_DATA_DIR = SESSION_DATA_DIR;
var CFG = cfg;
function _getUserHome() {
    return process.env[process.platform === "win32" ? "USERPROFILE" : "HOME"];
}

var IS_DEBUG = process.argv.indexOf("--debug") > -1;

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
    var split = str.split(", ");
    return split[0] === "" ? [] : split;
}

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
        spawn(cmd, args, {
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
        // chrome wm class uses prefix crx_ (one underscore)
        // edge wm class uses prefix crx__ (two underscores)
        var locateStr = fileName.replace(/crx__?/, "*") + "*.desktop";
        findDesktopFile(locateStr)
            .then(resolve)
            .catch(reject);
    }).catch(_catchGenericErr);
}

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
        if (existsSync(configFilePath)) {
            unlinkSync(configFilePath);
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
    // throw err;
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
                    }, 250);
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
        unlink(CFG.SESSION_DATA_DIR + "/" + sessionName + ".json", function (error) {
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
    var currentWindowListCopy = currentWindowList.slice(0).filter(
    // some apps have a splash screen (intellij idea), we want to wait for those
    function (winFromCurrent) { var _a; return !((_a = winFromCurrent.states) === null || _a === void 0 ? void 0 : _a.includes("_NET_WM_STATE_SKIP_TASKBAR")); });
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
                exec("cat /proc/" + win.wmPid + "/cmdline", function (error1, stdout1) {
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
                    // This is needed because the window manager just creates an additional workspace when
                    // the previous one has some window on it.
                    savedWindowList = savedWindowList.concat().sort(function (a, b) {
                        // NOTE: we need to fallback to zero because otherwise we get NAN for undefined and this
                        // messes up everything
                        return (a.wmCurrentDesktopNr || 0) - (b.wmCurrentDesktopNr || 0);
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

export default index;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguZXMuanMiLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlsaXR5LnRzIiwiLi4vc3JjL2RlZmF1bHRDb25maWcudHMiLCIuLi9zcmMvbG9nLnRzIiwiLi4vc3JjL2NvbmZpZy50cyIsIi4uL3NyYy9pc0RlYnVnLnRzIiwiLi4vc3JjL3BhcnNlQ21kVG9TcGF3bi50cyIsIi4uL3NyYy94MTFXcmFwcGVyLnRzIiwiLi4vc3JjL290aGVyQ21kLnRzIiwiLi4vc3JjL21ldGFXcmFwcGVyLnRzIiwiLi4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGZzIGZyb20gXCJmc1wiO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tIFwicGF0aFwiO1xuXG5leHBvcnQgZnVuY3Rpb24gbWtkaXJTeW5jKGRpclBhdGgpIHtcbiAgdHJ5IHtcbiAgICBmcy5ta2RpclN5bmMoZGlyUGF0aCk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGlmIChlcnIuY29kZSAhPT0gXCJFRVhJU1RcIikge1xuICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbWtmaWxlU3luYyhmaWxlUGF0aCkge1xuICB0cnkge1xuICAgIGZzLndyaXRlRmlsZVN5bmMoZmlsZVBhdGgsIHsgZmxhZzogXCJ3eFwiIH0pO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBpZiAoZXJyLmNvZGUgIT09IFwiRUVYSVNUXCIpIHtcbiAgICAgIHRocm93IGVycjtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvcHlTeW5jKHNyYywgZGVzdCkge1xuICBpZiAoIWZzLmV4aXN0c1N5bmMoc3JjKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBjb25zdCBkYXRhID0gZnMucmVhZEZpbGVTeW5jKHNyYywgXCJ1dGYtOFwiKTtcbiAgZnMud3JpdGVGaWxlU3luYyhkZXN0LCBkYXRhKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlRGVlcCguLi5vYmplY3RzKSB7XG4gIGNvbnN0IGlzT2JqZWN0ID0gb2JqID0+IG9iaiAmJiB0eXBlb2Ygb2JqID09PSBcIm9iamVjdFwiO1xuXG4gIHJldHVybiBvYmplY3RzLnJlZHVjZSgocHJldiwgb2JqKSA9PiB7XG4gICAgT2JqZWN0LmtleXMob2JqKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICBjb25zdCBwVmFsID0gcHJldltrZXldO1xuICAgICAgY29uc3Qgb1ZhbCA9IG9ialtrZXldO1xuXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShwVmFsKSAmJiBBcnJheS5pc0FycmF5KG9WYWwpKSB7XG4gICAgICAgIHByZXZba2V5XSA9IHBWYWwuY29uY2F0KC4uLm9WYWwpO1xuICAgICAgfSBlbHNlIGlmIChpc09iamVjdChwVmFsKSAmJiBpc09iamVjdChvVmFsKSkge1xuICAgICAgICBwcmV2W2tleV0gPSBtZXJnZURlZXAocFZhbCwgb1ZhbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwcmV2W2tleV0gPSBvVmFsO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHByZXY7XG4gIH0sIHt9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1vdmVkaXIoZnJvbSwgdG8pIHtcbiAgbWtkaXJTeW5jKHRvKTtcbiAgbGV0IGNvbnRlbnRzID0gZnMucmVhZGRpclN5bmMoZnJvbSk7XG5cbiAgZm9yIChjb25zdCBlbGVtZW50IG9mIGNvbnRlbnRzKSB7XG4gICAgbGV0IGZyb21fZWxlbWVudCA9IHBhdGguam9pbihmcm9tLCBlbGVtZW50KTtcbiAgICBsZXQgdG9fZWxlbWVudCA9IHBhdGguam9pbih0bywgZWxlbWVudCk7XG5cbiAgICBpZiAoZnMubHN0YXRTeW5jKGZyb21fZWxlbWVudCkuaXNEaXJlY3RvcnkoKSkge1xuICAgICAgbW92ZWRpcihmcm9tX2VsZW1lbnQsIHRvX2VsZW1lbnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmcy5jb3B5RmlsZVN5bmMoZnJvbV9lbGVtZW50LCB0b19lbGVtZW50KTtcbiAgICAgIGZzLnVubGlua1N5bmMoZnJvbV9lbGVtZW50KTtcbiAgICB9XG4gIH1cbiAgZnMucm1kaXJTeW5jKGZyb20pO1xufVxuIiwiZXhwb3J0IGNvbnN0IERFRkFVTFRfQ0ZHID0ge1xuICBHSVZFX1gxMV9USU1FX1RJTUVPVVQ6IDgwLFxuICBQT0xMX0FMTF9BUFBTX1NUQVJURURfSU5URVJWQUw6IDIwMDAsXG4gIFBPTExfQUxMX01BWF9USU1FT1VUOiAxMjAwMDAsXG4gIFNBVkVfU0VTU0lPTl9JTl9QUkVUVFlfRk9STUFUOiB0cnVlLFxuICBXTV9DTEFTU19BTkRfRVhFQ1VUQUJMRV9GSUxFX01BUDoge1xuICAgIFwiZ25vbWUtdGVybWluYWwtc2VydmVyLkdub21lLXRlcm1pbmFsXCI6IFwiZ25vbWUtdGVybWluYWxcIixcbiAgICBcImdvb2dsZS1jaHJvbWUuR29vZ2xlLWNocm9tZVwiOiBcImdvb2dsZS1jaHJvbWUuZGVza3RvcFwiLFxuICAgIFwiYnJhdmUtYnJvd3Nlci5CcmF2ZS1icm93c2VyXCI6IFwiYnJhdmUtYnJvd3Nlci5kZXNrdG9wXCIsXG4gICAgXCJNYWlsLlRodW5kZXJiaXJkXCI6IFwidGh1bmRlcmJpcmQuZGVza3RvcFwiLFxuICAgIFwibmF1dGlsdXMuTmF1dGlsdXNcIjogXCJuYXV0aWx1c1wiLFxuICAgIFwib3JnLmdub21lLk5hdXRpbHVzLk9yZy5nbm9tZS5OYXV0aWx1c1wiOiBcIm5hdXRpbHVzXCIsXG4gICAgXCJOYXZpZ2F0b3IuRmlyZWZveFwiOiBcImZpcmVmb3guZGVza3RvcFwiLFxuICAgIFwiTmF2aWdhdG9yLlBhbGVcIjogXCJwYWxlbW9vbi5kZXNrdG9wXCIsXG4gICAgXCJza3lwZS5Ta3lwZVwiOiBcInNreXBlZm9ybGludXguZGVza3RvcFwiLFxuICAgIFwic3VuLWF3dC1YMTEtWEZyYW1lUGVlci5qZXRicmFpbnMtaWRlYVwiOiBcImpldGJyYWlucy1pZGVhLmRlc2t0b3BcIixcbiAgICBcIlZpcnR1YWxCb3guVmlydHVhbEJveFwiOiBcInZpcnR1YWxib3guZGVza3RvcFwiLFxuICAgIFwiVGVsZWdyYW0uVGVsZWdyYW1EZXNrdG9wXCI6IFwidGVsZWdyYW0tZGVza3RvcF90ZWxlZ3JhbWRlc2t0b3AuZGVza3RvcFwiLFxuICAgIFwidGVsZWdyYW0tZGVza3RvcC5UZWxlZ3JhbURlc2t0b3BcIjogXCJ0ZWxlZ3JhbWRlc2t0b3AuZGVza3RvcFwiLFxuICAgIFwia2VlcGFzc3hjLmtlZXBhc3N4Y1wiOiBcImtlZXBhc3N4Y19rZWVwYXNzeGMuZGVza3RvcFwiLFxuICAgIFwic2xhY2suU2xhY2tcIjogXCJjb20uc2xhY2suU2xhY2suZGVza3RvcFwiLFxuICAgIFwic2lnbmFsLlNpZ25hbFwiOiBcInNpZ25hbC1kZXNrdG9wLmRlc2t0b3BcIixcbiAgICBcIm1pY3Jvc29mdCB0ZWFtcyAtIHByZXZpZXcuTWljcm9zb2Z0IFRlYW1zIC0gUHJldmlld1wiOiBcInRlYW1zLmRlc2t0b3BcIlxuICB9LFxuICBXTV9DTEFTU19FWENMVVNJT05TOiBbXG4gICAgXCJOL0FcIixcbiAgICBcInRpbGRhLlRpbGRhXCIsXG4gICAgXCJQb3B1cC5kZXNrdG9wXCIsXG4gICAgXCJ1cGRhdGUtbWFuYWdlci5VcGRhdGUtbWFuYWdlclwiLFxuICAgIFwiZGVza3RvcF93aW5kb3cuTmF1dGlsdXNcIixcbiAgICBcImVsZWN0cm9uLkVsZWN0cm9uXCIsXG4gICAgXCJndWFrZS5NYWluLnB5XCIsXG4gICAgXCJnbm9tZS1zb2Z0d2FyZS5Hbm9tZS1zb2Z0d2FyZVwiXG4gIF0sXG4gIFdNX01FVEFfTUFQOiB7XG4gICAgXCJXTV9XSU5ET1dfUk9MRShTVFJJTkcpXCI6IFwid21Sb2xlXCIsXG4gICAgXCJXTV9DTEFTUyhTVFJJTkcpXCI6IFwid21DbGFzc05hbWVcIixcbiAgICBcIl9ORVRfV01fU1RBVEUoQVRPTSlcIjogXCJzdGF0ZXNcIixcbiAgICBcIl9ORVRfV01fREVTS1RPUChDQVJESU5BTClcIjogXCJ3bUN1cnJlbnREZXNrdG9wTnJcIixcbiAgICBcIldNX05BTUUoVVRGOF9TVFJJTkcpXCI6IFwid21UaXRsZVwiLFxuICAgIFwiX05FVF9XTV9QSUQoQ0FSRElOQUwpXCI6IFwid21QaWRcIixcbiAgICBcIl9ORVRfV01fV0lORE9XX1RZUEUoQVRPTSlcIjogXCJ3bVR5cGVcIixcbiAgICBcIl9CQU1GX0RFU0tUT1BfRklMRShTVFJJTkcpXCI6IFwiZXhlY3V0YWJsZUZpbGVcIlxuICB9LFxuICBXTV9NRVRBX01BUF9OVU1CRVJfVFlQRVM6IFtcbiAgICBcIl9ORVRfV01fUElEKENBUkRJTkFMKVwiLFxuICAgIFwiX05FVF9XTV9ERVNLVE9QKENBUkRJTkFMKVwiXG4gIF0sXG4gIERFU0tUT1BfRklMRV9MT0NBVElPTlM6IFtcbiAgICBcIntob21lfS8ubG9jYWwvc2hhcmUvYXBwbGljYXRpb25zXCIsXG4gICAgXCJ7aG9tZX0vLmdub21lL2FwcHNcIixcbiAgICBcIi91c3Ivc2hhcmUvYXBwbGljYXRpb25zXCIsXG4gICAgXCIvdXNyL2xvY2FsL3NoYXJlL2FwcGxpY2F0aW9uc1wiLFxuICAgIFwiL3Vzci9zaGFyZS9hcHAtaW5zdGFsbFwiLFxuICAgIFwie2hvbWV9Ly5jb25maWcvYXV0b3N0YXJ0XCIsXG4gICAgXCIvdmFyL2xpYi9zbmFwZC9kZXNrdG9wL2FwcGxpY2F0aW9uc1wiLFxuICAgIFwiL3Zhci9saWIvZmxhdHBhay9hcHBcIixcbiAgICBcIi92YXIvbGliL2ZsYXRwYWsvZXhwb3J0cy9zaGFyZS9hcHBsaWNhdGlvbnNcIixcbiAgICBcIntob21lfS8ubG9jYWwvc2hhcmUvZmxhdHBhay9leHBvcnRzL3NoYXJlL2FwcGxpY2F0aW9uc1wiLFxuICAgIFwiL3NuYXAvYmluXCJcbiAgXVxufTtcbiIsImV4cG9ydCBjb25zdCBsb2cgPSAoLi4uYXJncykgPT4gY29uc29sZS5sb2coLi4uYXJncyk7XG4iLCJpbXBvcnQgeyBtZXJnZURlZXAsIG1rZGlyU3luYywgbW92ZWRpciB9IGZyb20gXCIuL3V0aWxpdHlcIjtcbmltcG9ydCB7IERFRkFVTFRfQ0ZHIH0gZnJvbSBcIi4vZGVmYXVsdENvbmZpZ1wiO1xuaW1wb3J0ICogYXMgZnMgZnJvbSBcImZzXCI7XG5pbXBvcnQgeyBsb2cgfSBmcm9tIFwiLi9sb2dcIjtcblxubGV0IGNmZztcblxuZXhwb3J0IGNvbnN0IENGR19EQVRBX0RJUl9MRUdBQ1kgPSBfZ2V0VXNlckhvbWUoKSArIFwiLy5sd3NtXCI7XG5leHBvcnQgY29uc3QgQ0ZHX0RBVEFfRElSID0gX2dldFVzZXJIb21lKCkgKyBcIi8uY29uZmlnL2x3c21cIjtcbmV4cG9ydCBjb25zdCBDRkdfRklMRV9QQVRIID0gQ0ZHX0RBVEFfRElSICsgXCIvY29uZmlnLmpzb25cIjtcbmV4cG9ydCBjb25zdCBTRVNTSU9OX0RBVEFfRElSID0gQ0ZHX0RBVEFfRElSICsgXCIvc2Vzc2lvbkRhdGFcIjtcblxuLy8gSU5JVFxuLy8gLS0tLS0tLS0tLS0tXG50cnkge1xuICAvLyBpZiBDRkdfREFUQV9ESVJfTEVHQUNZIGV4aXN0cywgbW92ZSBpdCB0byBDRkdfREFUQV9ESVJcbiAgaWYgKGZzLmV4aXN0c1N5bmMoQ0ZHX0RBVEFfRElSX0xFR0FDWSkpIHtcbiAgICBpZiAoIWZzLmV4aXN0c1N5bmMoQ0ZHX0RBVEFfRElSKSkge1xuICAgICAgbW92ZWRpcihDRkdfREFUQV9ESVJfTEVHQUNZLCBDRkdfREFUQV9ESVIpO1xuICAgICAgbG9nKFxuICAgICAgICBgbHdzbTogbW92ZWQgY29uZmlnIGRpcmVjdG9yeSAke0NGR19EQVRBX0RJUl9MRUdBQ1l9IHRvICR7Q0ZHX0RBVEFfRElSfWBcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvZyhgbHdzbTogaWdub3JlZCBsZWdhY3kgY29uZmlnIGRpcmVjdG9yeSAke0NGR19EQVRBX0RJUl9MRUdBQ1l9YCk7XG4gICAgfVxuICB9XG5cbiAgLy8gaWYgY29uZmlnIGlzIGFscmVhZHkgaW4gcGxhY2VcbiAgY29uc3QgZnJvbUZpbGUgPSBKU09OLnBhcnNlKGZzLnJlYWRGaWxlU3luYyhDRkdfRklMRV9QQVRILCBcInV0ZjhcIikpO1xuICBjZmcgPSBtZXJnZURlZXAoREVGQVVMVF9DRkcsIGZyb21GaWxlKTtcbn0gY2F0Y2ggKGUpIHtcbiAgbG9nKFxuICAgIFwibHdzbTogbm8gY29uZmlnIGZpbGUgcHJlc2VudCBvciBpdCBjb250YWlucyBpbnZhbGlkIGpzb24uIENyZWF0aW5nIG5ldyBvbmUuLi5cIlxuICApO1xuXG4gIC8vIGlmIHRoZXJlIGlzIG5vIGNvbmZpZyB5ZXQgbG9hZCBkZWZhdWx0IGNmZyBhbmQgY3JlYXRlIGZpbGVzIGFuZCBkaXJzXG4gIGNmZyA9IERFRkFVTFRfQ0ZHO1xuXG4gIC8vIHNhdmUgZXhlY3V0YWJsZSBwYXRocyB0byBjZmdcbiAgY2ZnLkNNRF9KU0ZJTEVfUEFUSCA9IF9fZGlybmFtZSArIFwiLy4uL2NtZC5qc1wiO1xuICBjZmcuSlNGSUxFX0lOREVYX1BBVEggPSBfX2Rpcm5hbWUgKyBcIi9pbmRleC5qc1wiO1xuXG4gIG1rZGlyU3luYyhDRkdfREFUQV9ESVIpO1xuICBta2RpclN5bmMoU0VTU0lPTl9EQVRBX0RJUik7XG5cbiAgLy8gd3JpdGUgY29uZmlnIHRvIHVzZXIgZGlyXG4gIGZzLndyaXRlRmlsZVN5bmMoQ0ZHX0ZJTEVfUEFUSCwgSlNPTi5zdHJpbmdpZnkoY2ZnLCBudWxsLCAyKSwgXCJ1dGY4XCIpO1xufVxuXG4vLyBhbHNvIG1ha2UgZGF0YSBkaXJzIGFjY2Vzc2libGUgdG8gdGhlIG91dHNpZGVcbmNmZy5EQVRBX0RJUiA9IENGR19EQVRBX0RJUjtcbmNmZy5TRVNTSU9OX0RBVEFfRElSID0gU0VTU0lPTl9EQVRBX0RJUjtcblxuZXhwb3J0IGNvbnN0IENGRyA9IGNmZztcblxuZnVuY3Rpb24gX2dldFVzZXJIb21lKCkge1xuICByZXR1cm4gcHJvY2Vzcy5lbnZbcHJvY2Vzcy5wbGF0Zm9ybSA9PT0gXCJ3aW4zMlwiID8gXCJVU0VSUFJPRklMRVwiIDogXCJIT01FXCJdO1xufVxuIiwiZXhwb3J0IGNvbnN0IElTX0RFQlVHID0gcHJvY2Vzcy5hcmd2LmluZGV4T2YoXCItLWRlYnVnXCIpID4gLTE7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0IGNvbnN0IHBhcnNlQ21kQXJncyA9IGNtZCA9PiB7XG4gIGxldCBjbWRBbGxTcGxpdCA9IGNtZC5zcGxpdCgvIC8pO1xuICBsZXQgbWFpbkNvbW1hbmQgPSBjbWRBbGxTcGxpdFswXTtcbiAgbGV0IGFyZ3MgPSBbXTtcbiAgY21kQWxsU3BsaXQubWFwKGZ1bmN0aW9uKHMsIGkpIHtcbiAgICBpZiAoaSAhPT0gMCkge1xuICAgICAgYXJnc1tpIC0gMV0gPSBjbWRBbGxTcGxpdFtpXTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gW21haW5Db21tYW5kLCBfbWVyZ2VRdW90ZWRTdHJpbmdQYXJhbXMoYXJncyldO1xufTtcblxuZnVuY3Rpb24gX21lcmdlUXVvdGVkU3RyaW5nUGFyYW1zKGFyZ3MpIHtcbiAgY29uc3QgbmV3QXJncyA9IFtdO1xuICBsZXQgaXNJblF1b3RhdGlvbiA9IGZhbHNlO1xuICBsZXQgY3VycmVudFF1b3RhdGlvbkFyZztcblxuICAvLyBUT0RPIG1ha2UgaXQgd29yayB3aXRoIG1vcmUgZGlmZmVyZW50IHF1b3RhdGlvbiB0eXBlc1xuICBhcmdzLmZvckVhY2goYXJnID0+IHtcbiAgICAvLyBtYXRjaCBxdW90YXRpb24gZW5kXG4gICAgaWYgKGFyZy5tYXRjaCgvJyQvKSkge1xuICAgICAgY3VycmVudFF1b3RhdGlvbkFyZyArPSBcIiBcIiArIGFyZy5zbGljZSgwLCBhcmcubGVuZ3RoIC0gMSk7XG4gICAgICBuZXdBcmdzLnB1c2goY3VycmVudFF1b3RhdGlvbkFyZyk7XG4gICAgICBjdXJyZW50UXVvdGF0aW9uQXJnID0gdW5kZWZpbmVkO1xuICAgICAgaXNJblF1b3RhdGlvbiA9IGZhbHNlO1xuICAgIH1cbiAgICAvLyBtYXRjaCBxdW90YXRpb24gc3RhcnRcbiAgICBlbHNlIGlmIChhcmcubWF0Y2goL14nLykpIHtcbiAgICAgIGlzSW5RdW90YXRpb24gPSB0cnVlO1xuICAgICAgY3VycmVudFF1b3RhdGlvbkFyZyA9IGFyZy5zdWJzdHIoMSwgYXJnLmxlbmd0aCk7XG4gICAgfVxuICAgIC8vIHdoaWxlIGluIHF1b3RhdGlvblxuICAgIGVsc2UgaWYgKGlzSW5RdW90YXRpb24pIHtcbiAgICAgIGN1cnJlbnRRdW90YXRpb25BcmcgKz0gXCIgXCIgKyBhcmc7XG4gICAgfSBlbHNlIGlmIChhcmcgIT09IFwiXCIpIHtcbiAgICAgIG5ld0FyZ3MucHVzaChhcmcpO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIG5ld0FyZ3M7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgbG9nIH0gZnJvbSBcIi4vbG9nXCI7XG5pbXBvcnQgeyBDRkcgfSBmcm9tIFwiLi9jb25maWdcIjtcblxuY29uc3QgeDExID0gcmVxdWlyZShcIngxMVwiKTtcblxuZXhwb3J0IGxldCBYO1xubGV0IHJvb3Q7XG5sZXQgZGlzcGxheTtcblxuLy8gZXhwb3J0IGNvbnN0IGdldFdpbmRvd0luZm8gPSB3cmFwWDExKF9nZXRXaW5kb3dJbmZvKTtcbmV4cG9ydCBjb25zdCBnZXRYID0gKCkgPT4gWDtcblxuZnVuY3Rpb24gY2F0Y2hHZW5lcmljRXJyKGVycikge1xuICBjb25zb2xlLmVycm9yKFwieDExV3JhcHBlcjogXCIsIGVyciwgZXJyLnN0YWNrKTtcbn1cblxubGV0IGlzQ2xpZW50SW5pdGlhbGl6ZWQgPSBmYWxzZTtcbmxldCBpbml0UHJvbWlzZTtcblxuZXhwb3J0IGZ1bmN0aW9uIGluaXRYMTEoKTogUHJvbWlzZTxhbnk+IHtcbiAgaWYgKGlzQ2xpZW50SW5pdGlhbGl6ZWQpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cbiAgaWYgKGluaXRQcm9taXNlKSB7XG4gICAgcmV0dXJuIGluaXRQcm9taXNlO1xuICB9XG4gIGluaXRQcm9taXNlID0gbmV3IFByb21pc2UoKGZ1bGZpbGwsIHJlamVjdCkgPT4ge1xuICAgIHgxMVxuICAgICAgLmNyZWF0ZUNsaWVudCgoZXJyLCBkaXNwbGF5SW4pID0+IHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRpc3BsYXkgPSBkaXNwbGF5SW47XG4gICAgICAgICAgWCA9IGRpc3BsYXkuY2xpZW50O1xuXG4gICAgICAgICAgcm9vdCA9IGRpc3BsYXkuc2NyZWVuWzBdLnJvb3Q7XG4gICAgICAgICAgaXNDbGllbnRJbml0aWFsaXplZCA9IHRydWU7XG4gICAgICAgICAgZnVsZmlsbCgpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLm9uKFwiZXJyb3JcIiwgZXJyID0+IHtcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgfSk7XG4gIH0pLmNhdGNoKGNhdGNoR2VuZXJpY0Vycik7XG4gIHJldHVybiBpbml0UHJvbWlzZTtcbn1cblxuLy8gTUVUSE9EU1xuLy8gLS0tLS0tLVxuZXhwb3J0IGZ1bmN0aW9uIGdldERpc3BsYXlzKCk6IGFueVtdIHtcbiAgaWYgKCFkaXNwbGF5KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiWDExIG5vdCBpbml0aWFsaXplZCAvIE5vIHNjcmVlbiBhdmFpbGFibGVcIik7XG4gIH1cbiAgcmV0dXJuIGRpc3BsYXkuc2NyZWVuO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0V2luZG93R2VvbWV0cnkod2luSWQpIHtcbiAgY29uc3QgZ2VvOiBhbnkgPSB7fTtcblxuICByZXR1cm4gbmV3IFByb21pc2UoKGZ1bGZpbGwsIHJlamVjdCkgPT4ge1xuICAgIFguVHJhbnNsYXRlQ29vcmRpbmF0ZXMod2luSWQsIHJvb3QsIDAsIDAsIChlcnIsIHJlcykgPT4ge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGdlby54ID0gcmVzLmRlc3RYO1xuICAgICAgICBnZW8ueSA9IHJlcy5kZXN0WTtcblxuICAgICAgICBYLkdldEdlb21ldHJ5KHdpbklkLCAoZXJyLCByZXMpID0+IHtcbiAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZ2VvLndpZHRoID0gcmVzLndpZHRoO1xuICAgICAgICAgICAgZ2VvLmhlaWdodCA9IHJlcy5oZWlnaHQ7XG4gICAgICAgICAgICBmdWxmaWxsKGdlbyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSkuY2F0Y2goY2F0Y2hHZW5lcmljRXJyKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEFjdGl2ZVdpbmRvd0lkcygpOiBQcm9taXNlPHN0cmluZ1tdPiB7XG4gIGNvbnN0IFBST1BfTkFNRSA9IFwiX05FVF9DTElFTlRfTElTVFwiO1xuICBjb25zdCBwcm9wSWQgPSBhd2FpdCBfZ2V0UHJvcGVydHlJZEJ5TmFtZShyb290LCBQUk9QX05BTUUpO1xuICBjb25zdCBpZFN0ciA9IGF3YWl0IGdldFByb3Aocm9vdCwgcHJvcElkIGFzIG51bWJlcik7XG4gIHJldHVybiBfcGFyc2VXaW5kb3dJZHMoaWRTdHIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVzdG9yZVdpbmRvd1Bvc2l0aW9uKHdpbikge1xuICBsb2coJ1Jlc3RvcmluZyB3aW5kb3cgcG9zaXRpb24gZm9yIFwiJyArIHdpbi53bUNsYXNzTmFtZSArICdcIicpO1xuICBjb25zdCBTVEFURVNfVE9fUkVTRVQgPSBbXG4gICAgXCJfTkVUX1dNX1NUQVRFX01BWElNSVpFRF9WRVJUXCIsXG4gICAgXCJfTkVUX1dNX1NUQVRFX01BWElNSVpFRF9IT1JaXCJcbiAgXTtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChmdWxmaWxsLCByZWplY3QpID0+IHtcbiAgICBzZXRTdGF0ZSh3aW4ud2luZG93SWQsIFwicmVtb3ZlXCIsIFNUQVRFU19UT19SRVNFVClcbiAgICAgIC5jYXRjaChyZWplY3QpXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIFguTW92ZVJlc2l6ZVdpbmRvdyh3aW4ud2luZG93SWQsIHdpbi54LCB3aW4ueSwgd2luLndpZHRoLCB3aW4uaGVpZ2h0KTtcbiAgICAgICAgc2V0U3RhdGUod2luLndpbmRvd0lkLCBcImFkZFwiLCB3aW4uc3RhdGVzKVxuICAgICAgICAgIC5jYXRjaChyZWplY3QpXG4gICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgZnVsZmlsbCgpO1xuICAgICAgICAgIH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChyZWplY3QpO1xuICB9KS5jYXRjaChjYXRjaEdlbmVyaWNFcnIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xvc2VXaW5kb3cod2luSWQpIHtcbiAgcmV0dXJuIF9zZW5kWDExQ2xpZW50TWVzc2FnZSh3aW5JZCwgXCJfTkVUX0NMT1NFX1dJTkRPV1wiKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1vdmVUb1dvcmtzcGFjZSh3aW5JZCwgd29ya1NwYWNlTnIpIHtcbiAgLy8gTk9URTogaWYgaXQgZG9lc24ndCB3b3JrIHdlIG1pZ2h0IGFsc28gd2FudCB0byB1c2UgX1dJTl9XT1JLU1BBQ0VcbiAgcmV0dXJuIF9zZW5kWDExQ2xpZW50TWVzc2FnZSh3aW5JZCwgXCJfTkVUX1dNX0RFU0tUT1BcIiwgW1xuICAgIHtcbiAgICAgIHZhbHVlOiB3b3JrU3BhY2VOclxuICAgIH1cbiAgXSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnb1RvVmlld3BvcnQoeCwgeSkge1xuICByZXR1cm4gX3NlbmRYMTFDbGllbnRNZXNzYWdlKHJvb3QsIFwiX05FVF9ERVNLVE9QX1ZJRVdQT1JUXCIsIFtcbiAgICB7IHZhbHVlOiB4IH0sXG4gICAgeyB2YWx1ZTogeSB9XG4gIF0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0U3RhdGUod2lkLCBhY3Rpb25TdHIsIHN0YXRlc1RvSGFuZGxlKSB7XG4gIGNvbnN0IEFDVElPTlNfTUFQID0ge1xuICAgIHJlbW92ZTogMCxcbiAgICBhZGQ6IDEsXG4gICAgdG9nZ2xlOiAyXG4gIH07XG4gIGNvbnN0IGFjdGlvbiA9IEFDVElPTlNfTUFQW2FjdGlvblN0cl07XG4gIGxldCBwcm9wZXJ0aWVzOiBhbnlbXSA9IFt7IHZhbHVlOiBhY3Rpb24gfV07XG5cbiAgLy8gYWxsIHByb3BlcnRpZXMgbmVlZCB0byBiZSBsb29rZWQgdXAgZm9yIHRoZWlyIGF0b20gaWRcbiAgaWYgKEFycmF5LmlzQXJyYXkoc3RhdGVzVG9IYW5kbGUpICYmIHN0YXRlc1RvSGFuZGxlLmxlbmd0aCA+IDApIHtcbiAgICBzdGF0ZXNUb0hhbmRsZS5mb3JFYWNoKHN0YXRlUHJvcGVydHkgPT4ge1xuICAgICAgcHJvcGVydGllcy5wdXNoKHtcbiAgICAgICAgaXNBdG9tOiB0cnVlLFxuICAgICAgICB2YWx1ZTogc3RhdGVQcm9wZXJ0eVxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIF9zZW5kWDExQ2xpZW50TWVzc2FnZSh3aWQsIFwiX05FVF9XTV9TVEFURVwiLCBwcm9wZXJ0aWVzKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cbn1cblxuY29uc3QgUFJPUFNfVE9fR0VUID0gW1xuICBcIldNX0NMQVNTXCIsXG4gIFwiX05FVF9XTV9TVEFURVwiLFxuICBcIl9ORVRfV01fREVTS1RPUFwiLFxuICBcIldNX05BTUVcIixcbiAgXCJfTkVUX1dNX1BJRFwiLFxuICBcIl9ORVRfV01fV0lORE9XX1RZUEVcIixcbiAgXCJfQkFNRl9ERVNLVE9QX0ZJTEVcIlxuXTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFdpbmRvd0luZm8od2lkKTogUHJvbWlzZTxhbnk+IHtcbiAgLy8gWC5HZXRHZW9tZXRyeSh3aWQsIGZ1bmN0aW9uIChlcnIsIGNsaWVudEdlb20pIHtcbiAgLy8gICBjb25zb2xlLmxvZyhcIndpbmRvdyBnZW9tZXRyeTogXCIsIGNsaWVudEdlb20pO1xuICAvLyB9KTtcblxuICBjb25zdCBwcm9wczogYW55W10gPSBhd2FpdCBfeENiVG9Qcm9taXNlKFguTGlzdFByb3BlcnRpZXMsIHdpZCk7XG5cbiAgY29uc3QgcHJvbWlzZXMgPSBwcm9wcy5tYXAoYXN5bmMgZnVuY3Rpb24ocCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBwcm9wTmFtZSA9IGF3YWl0IF94Q2JUb1Byb21pc2UoWC5HZXRBdG9tTmFtZSwgcCk7XG4gICAgICAgIGlmIChQUk9QU19UT19HRVQuaW5jbHVkZXMocHJvcE5hbWUpKSB7XG4gICAgICAgICAgY29uc3QgcHJvcFZhbCA9IGF3YWl0IF94Q2JUb1Byb21pc2UoXG4gICAgICAgICAgICBYLkdldFByb3BlcnR5LFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIHdpZCxcbiAgICAgICAgICAgIHAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDEwMDAwMDAwXG4gICAgICAgICAgKTtcbiAgICAgICAgICBjb25zdCB0eXBlTmFtZSA9IGF3YWl0IF94Q2JUb1Byb21pc2UoWC5HZXRBdG9tTmFtZSwgcHJvcFZhbC50eXBlKTtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhwcm9wVmFsLCB0eXBlTmFtZSwgcHJvcE5hbWUpO1xuICAgICAgICAgIGNvbnN0IGRlY29kZWREYXRhID0gYXdhaXQgX2RlY29kZVByb3BlcnR5KHR5cGVOYW1lLCBwcm9wVmFsLmRhdGEpO1xuICAgICAgICAgIHJlc29sdmUocHJvcE5hbWUgKyBcIihcIiArIHR5cGVOYW1lICsgXCIpID0gXCIgKyBkZWNvZGVkRGF0YSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzb2x2ZShcIlwiKTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICByZWplY3QoZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xuXG4gIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbihyZXN1bHRzID0+IHtcbiAgICByZXR1cm4gcmVzdWx0cy5qb2luKFwiXFxuXCIpO1xuICB9KTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFByb3AoaWQgPSByb290LCBwcm9wSWQ6IG51bWJlcik6IFByb21pc2U8YW55PiB7XG4gIGNvbnN0IHByb3BWYWwgPSBhd2FpdCBfeENiVG9Qcm9taXNlKFxuICAgIFguR2V0UHJvcGVydHksXG4gICAgMCxcbiAgICBpZCxcbiAgICBwcm9wSWQsXG4gICAgMCxcbiAgICAwLFxuICAgIDEwMDAwMDAwXG4gICk7XG4gIGNvbnN0IHR5cGVOYW1lID0gYXdhaXQgX3hDYlRvUHJvbWlzZShYLkdldEF0b21OYW1lLCBwcm9wVmFsLnR5cGUpO1xuICByZXR1cm4gYXdhaXQgX2RlY29kZVByb3BlcnR5KHR5cGVOYW1lLCBwcm9wVmFsLmRhdGEpO1xufVxuXG4vLyBIRUxQRVJcbi8vIC0tLS0tLVxuZnVuY3Rpb24gX3hDYlRvUHJvbWlzZShmbiwgLi4uYXJncyk6IGFueSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgoZnVsZmlsbCwgcmVqZWN0KSA9PiB7XG4gICAgZm4uYXBwbHkoWCwgW1xuICAgICAgLi4uYXJncyxcbiAgICAgIChlcnIsIHJlcykgPT4ge1xuICAgICAgICByZXR1cm4gZXJyID8gcmVqZWN0KGVycikgOiBmdWxmaWxsKHJlcyk7XG4gICAgICB9XG4gICAgXSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBfY291bnRlcihpbml0aWFsVmFsLCBtb2RpZmllcikge1xuICAvLyB0byBzdGFydCBhdCB2YWwgd2UgbmVlZCB0byBzdWJ0cmFjdCB0aGUgbW9kaWZpZXIgZmlyc3RcbiAgbGV0IHZhbCA9IGluaXRpYWxWYWwgLSBtb2RpZmllcjtcbiAgcmV0dXJuICgpID0+IHtcbiAgICB2YWwgKz0gbW9kaWZpZXI7XG4gICAgcmV0dXJuIHZhbDtcbiAgfTtcbn1cblxuZnVuY3Rpb24gX2dldEF0b21zKGxpc3QsIGNiKSB7XG4gIGNvbnN0IHJlcyA9IHt9O1xuICBjb25zdCBnZXRBdG9tID0gKCkgPT4ge1xuICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIGNiKG51bGwsIHJlcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG5hbWUgPSBsaXN0LnNoaWZ0KCk7XG4gICAgICBYLkludGVybkF0b20oZmFsc2UsIG5hbWUsIChlcnIsIGF0b20pID0+IHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIHJldHVybiBjYihlcnIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc1tuYW1lXSA9IGF0b207XG4gICAgICAgICAgZ2V0QXRvbSgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG4gIGdldEF0b20oKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gX2dldFByb3BlcnR5SWRCeU5hbWUoXG4gIHdpZDogc3RyaW5nLFxuICBuYW1lVG9HZXQ6IHN0cmluZ1xuKTogUHJvbWlzZTxudW1iZXI+IHtcbiAgY29uc3QgcHJvcHM6IGFueVtdID0gYXdhaXQgX3hDYlRvUHJvbWlzZShYLkxpc3RQcm9wZXJ0aWVzLCB3aWQpO1xuICBjb25zdCBwcm9taXNlcyA9IHByb3BzLm1hcChhc3luYyBmdW5jdGlvbihwKSB7XG4gICAgY29uc3QgcHJvcE5hbWUgPSBhd2FpdCBfeENiVG9Qcm9taXNlKFguR2V0QXRvbU5hbWUsIHApO1xuICAgIGlmIChuYW1lVG9HZXQgPT09IHByb3BOYW1lKSB7XG4gICAgICByZXR1cm4gcDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfSk7XG5cbiAgY29uc3QgcmVzID0gYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuICByZXR1cm4gcmVzLmZpbmQoaXRlbSA9PiBpdGVtID4gMCk7XG59XG5cbmZ1bmN0aW9uIF9zZW5kWDExQ2xpZW50TWVzc2FnZShcbiAgd2lkLFxuICBldmVudE5hbWUsXG4gIGV2ZW50UHJvcGVydGllcyA9IFtdLFxuICBvcHRpb25hbEV2ZW50TWFzaz9cbikge1xuICBpZiAoZXZlbnRQcm9wZXJ0aWVzLmxlbmd0aCA+IDQpIHtcbiAgICB0aHJvdyBcIm9ubHkgc3VwcG9ydHMgNCBwcm9wZXJ0aWVzIGF0IG9uY2UgbWF4XCI7XG4gIH1cblxuICBjb25zdCBvZmZzZXRDb3VudGVyID0gX2NvdW50ZXIoNCwgNCk7XG4gIGNvbnN0IGV2ZW50TWFzayA9IG9wdGlvbmFsRXZlbnRNYXNrIHx8IHgxMS5ldmVudE1hc2suU3Vic3RydWN0dXJlUmVkaXJlY3Q7XG5cbiAgLy8gY3JlYXRlIGF0b21zIHRvIGxvb2sgdXBcbiAgbGV0IGF0b21zTGlzdCA9IFtdO1xuICBhdG9tc0xpc3QucHVzaChldmVudE5hbWUpO1xuICBldmVudFByb3BlcnRpZXMuZm9yRWFjaChldmVudFByb3BlcnR5ID0+IHtcbiAgICBpZiAoZXZlbnRQcm9wZXJ0eS5pc0F0b20pIHtcbiAgICAgIGF0b21zTGlzdC5wdXNoKGV2ZW50UHJvcGVydHkudmFsdWUpO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gc3RhcnQgYnVmZmVyIGlucHV0XG4gIGNvbnN0IGRhdGEgPSBuZXcgQnVmZmVyKDMyKTtcbiAgZGF0YS5maWxsKDApO1xuICBkYXRhLndyaXRlSW50OCgzMywgMCk7IC8vIDMzID0gQ2xpZW50TWVzc2FnZVxuICBkYXRhLndyaXRlSW50OCgzMiwgMSk7IC8vIGZvcm1hdFxuICBkYXRhLndyaXRlVUludDMyTEUod2lkLCBvZmZzZXRDb3VudGVyKCkpO1xuXG4gIHJldHVybiBuZXcgUHJvbWlzZSgoZnVsZmlsbCwgcmVqZWN0KSA9PiB7XG4gICAgX2dldEF0b21zKGF0b21zTGlzdCwgKGVyciwgYXRvbXMpID0+IHtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgIHRocm93IGVycjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRhdGEud3JpdGVVSW50MzJMRShhdG9tc1tldmVudE5hbWVdLCBvZmZzZXRDb3VudGVyKCkpO1xuXG4gICAgICAgIGV2ZW50UHJvcGVydGllcy5mb3JFYWNoKGV2ZW50UHJvcGVydHkgPT4ge1xuICAgICAgICAgIGlmIChldmVudFByb3BlcnR5LmlzQXRvbSkge1xuICAgICAgICAgICAgZGF0YS53cml0ZVVJbnQzMkxFKGF0b21zW2V2ZW50UHJvcGVydHkudmFsdWVdLCBvZmZzZXRDb3VudGVyKCkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkYXRhLndyaXRlVUludDMyTEUoZXZlbnRQcm9wZXJ0eS52YWx1ZSwgb2Zmc2V0Q291bnRlcigpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxldCBzb3VyY2VJbmRpY2F0aW9uID0gMTtcbiAgICAgICAgZGF0YS53cml0ZVVJbnQzMkxFKHNvdXJjZUluZGljYXRpb24sIG9mZnNldENvdW50ZXIoKSk7XG5cbiAgICAgICAgWC5TZW5kRXZlbnQocm9vdCwgMCwgZXZlbnRNYXNrLCBkYXRhKTtcblxuICAgICAgICAvLyB3ZSBuZWVkIGEgbGl0dGxlIHRpbWUgZm9yIHRoZSBidWZmZXIgdG8gYmUgcHJvY2Vzc2VkXG4gICAgICAgIHNldFRpbWVvdXQoZnVsZmlsbCwgQ0ZHLkdJVkVfWDExX1RJTUVfVElNRU9VVCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pLmNhdGNoKGNhdGNoR2VuZXJpY0Vycik7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIF9kZWNvZGVQcm9wZXJ0eSh0eXBlLCBkYXRhKTogUHJvbWlzZTxhbnk+IHtcbiAgdHJ5IHtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgXCJTVFJJTkdcIjoge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBbXTtcbiAgICAgICAgbGV0IHMgPSBcIlwiO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICBpZiAoZGF0YVtpXSA9PSAwKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaChzKTtcbiAgICAgICAgICAgIHMgPSBcIlwiO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIHMgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShkYXRhW2ldKTtcbiAgICAgICAgfVxuICAgICAgICByZXN1bHQucHVzaChzKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdC5tYXAocXVvdGl6ZSkuam9pbihcIiwgXCIpO1xuICAgICAgfVxuICAgICAgY2FzZSBcIkFUT01cIjpcbiAgICAgICAgaWYgKGRhdGEubGVuZ3RoID4gMzIpIHtcbiAgICAgICAgICByZXR1cm4gXCJMT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PTkdcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHByb21pc2VzID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkgKz0gNCkge1xuICAgICAgICAgIGNvbnN0IGEgPSBkYXRhLnVucGFjayhcIkxcIiwgaSlbMF07XG4gICAgICAgICAgcHJvbWlzZXMucHVzaChfeENiVG9Qcm9taXNlKFguR2V0QXRvbU5hbWUsIGEpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICByZXR1cm4gcmVzLmpvaW4oXCIsIFwiKTtcbiAgICAgICAgfSk7XG5cbiAgICAgIGNhc2UgXCJDQVJESU5BTFwiOlxuICAgICAgY2FzZSBcIklOVEVHRVJcIjoge1xuICAgICAgICBjb25zdCByZXMgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSArPSA0KSB7XG4gICAgICAgICAgcmVzLnB1c2goZGF0YS51bnBhY2soXCJMXCIsIGkpWzBdKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzLmpvaW4oXCIsIFwiKTtcbiAgICAgIH1cbiAgICAgIGNhc2UgXCJXSU5ET1dcIjpcbiAgICAgICAgY29uc3QgcmVzID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkgKz0gNCkge1xuICAgICAgICAgIHJlcy5wdXNoKGRhdGEudW5wYWNrKFwiTFwiLCBpKVswXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICBcIndpbmRvdyBpZCMgXCIgK1xuICAgICAgICAgIHJlc1xuICAgICAgICAgICAgLm1hcChuID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIFwiMHhcIiArIG4udG9TdHJpbmcoMTYpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5qb2luKFwiLCBcIilcbiAgICAgICAgKTtcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIFwiV1RGIFwiICsgdHlwZTtcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjb25zb2xlLmxvZyh0eXBlLCBkYXRhKTtcbiAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgIHRocm93IG5ldyBFcnJvcihlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBxdW90aXplKGkpIHtcbiAgcmV0dXJuICdcIicgKyBpICsgJ1wiJztcbn1cblxuZnVuY3Rpb24gX3BhcnNlV2luZG93SWRzKHN0ckluKTogc3RyaW5nW10ge1xuICBjb25zdCBzdHIgPSBzdHJJbi5yZXBsYWNlKFwid2luZG93IGlkIyBcIiwgXCJcIik7XG4gIGNvbnN0IHNwbGl0ID0gc3RyLnNwbGl0KFwiLCBcIik7XG4gIHJldHVybiBzcGxpdFswXSA9PT0gXCJcIiA/IFtdIDogc3BsaXQ7XG59XG5cbi8vY29uc3QgdGVzdEZuID0gd3JhcFgxMShjbG9zZVdpbmRvdyk7XG4vL3Rlc3RGbignMHgwNGEwMDAwMScpLnRoZW4oKGdlbykgPT4ge1xuLy99KTtcblxuLy9jb25zdCB0ZXN0Rm4gPSB3cmFwWDExKG1vdmVUb1dvcmtzcGFjZSk7XG4vL3Rlc3RGbignMHgwNGUwMDAwMSAnLCAyKTtcblxuLy9jb25zdCB0ZXN0Rm5YID0gd3JhcFgxMShyZXN0b3JlV2luZG93UG9zaXRpb24pO1xuLy90ZXN0Rm5YKHtcbi8vICB3aW5kb3dJZDogJzB4MDRhMDAwMDEnLFxuLy8gIHg6IDAsXG4vLyAgeTogMCxcbi8vICB3aWR0aDogNTAwLFxuLy8gIGhlaWdodDogNTAwLFxuLy8gIHN0YXRlczogW1xuLy8gICAgJ19ORVRfV01fU1RBVEVfTUFYSU1JWkVEX1ZFUlQnXG4vLyAgXVxuLy99KTtcblxuLy9jb25zdCB0ZXN0Rm4yID0gd3JhcFgxMShzZXRTdGF0ZSk7XG4vL3Rlc3RGbjIoJzB4MDRhMDAwMDEnLCAncmVtb3ZlJywgWydfTkVUX1dNX1NUQVRFX01BWElNSVpFRF9WRVJUJywgJ19ORVRfV01fU1RBVEVfTUFYSU1JWkVEX0hPUlonLCAnX05FVF9XTV9TVEFURV9GVUxMU0NSRUVOJ10pXG4vLyAgLnRoZW4oKHJlcykgPT4ge1xuLy8gICAgY29uc29sZS5sb2coJ05PUk1BTCcsIHJlcyk7XG4vLyAgfSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgSVNfREVCVUcgfSBmcm9tIFwiLi9pc0RlYnVnXCI7XG5pbXBvcnQgeyBDRkcgfSBmcm9tIFwiLi9jb25maWdcIjtcbmltcG9ydCB7IHNwYXduIH0gZnJvbSBcImNoaWxkX3Byb2Nlc3NcIjtcbmltcG9ydCB7IHBhcnNlQ21kQXJncyB9IGZyb20gXCIuL3BhcnNlQ21kVG9TcGF3blwiO1xuaW1wb3J0IHsgV2luT2JqLCBXaW5PYmpJZE9ubHkgfSBmcm9tIFwiLi9tb2RlbFwiO1xuaW1wb3J0IHsgbG9nIH0gZnJvbSBcIi4vbG9nXCI7XG5pbXBvcnQgeyBnZXRBY3RpdmVXaW5kb3dJZHMsIGdldERpc3BsYXlzLCBnZXRXaW5kb3dJbmZvIH0gZnJvbSBcIi4veDExV3JhcHBlclwiO1xuXG4vLyA1MDBrYlxuY29uc3QgTUFYX0JVRkZFUiA9IDEwMjQgKiA1MDA7XG5jb25zdCBFWEVDX09QVFMgPSB7XG4gIG1heEJ1ZmZlcjogTUFYX0JVRkZFUlxufTtcblxuLy8gZGlzcGxheVxuLy8gLS0tLS0tLVxuZXhwb3J0IGZ1bmN0aW9uIGdldENvbm5lY3RlZERpc3BsYXlzSWQoKTogc3RyaW5nIHtcbiAgY29uc3QgZGlzcGxheXMgPSBnZXREaXNwbGF5cygpO1xuICByZXR1cm4gZGlzcGxheXNcbiAgICAubWFwKHNjcmVlbiA9PiBzY3JlZW4ucGl4ZWxfd2lkdGggKyBcInhcIiArIHNjcmVlbi5waXhlbF9oZWlnaHQpXG4gICAgLmpvaW4oXCI7XCIpO1xufVxuXG4vLyBPdGhlclxuLy8gLS0tLS0tLS1cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRBZGRpdGlvbmFsTWV0YURhdGFGb3JXaW4oXG4gIHdpbjogV2luT2JqSWRPbmx5XG4pOiBQcm9taXNlPFdpbk9iaj4ge1xuICBjb25zdCBzdGRvdXQgPSBhd2FpdCBnZXRXaW5kb3dJbmZvKHdpbi53aW5kb3dJZCk7XG4gIGNvbnN0IGxpbmVzID0gc3Rkb3V0LnNwbGl0KFwiXFxuXCIpO1xuICBjb25zdCB3aW5Db3B5OiBhbnkgPSB7IC4uLndpbiB9O1xuXG4gIGxpbmVzLmZvckVhY2gobGluZSA9PiB7XG4gICAgY29uc3Qgd29yZHMgPSBsaW5lLnNwbGl0KFwiIFwiKTtcbiAgICBjb25zdCBwcm9wZXJ0eU5hbWUgPSB3b3Jkc1swXTtcblxuICAgIC8vIHJlbW92ZSBwcm9wZXJ0eSBuYW1lIGFuZCBcIj1cIlxuICAgIHdvcmRzLnNwbGljZSgwLCAyKTtcbiAgICBjb25zdCB2YWx1ZSA9IHdvcmRzLmpvaW4oXCIgXCIpO1xuICAgIGNvbnN0IHByb3BlcnR5TmFtZUZyb21NYXAgPSBDRkcuV01fTUVUQV9NQVBbcHJvcGVydHlOYW1lXTtcbiAgICAvLyBwYXJzZSB3bUNsYXNzTmFtZVxuICAgIGlmIChwcm9wZXJ0eU5hbWUgPT09IFwiV01fQ0xBU1MoU1RSSU5HKVwiKSB7XG4gICAgICBjb25zdCBwcm9wZXJ0eU5hbWVGcm9tTWFwID0gQ0ZHLldNX01FVEFfTUFQW3Byb3BlcnR5TmFtZV07XG4gICAgICBjb25zdCBjbGFzc05hbWVzID0gdmFsdWUuc3BsaXQoXCIsIFwiKTtcbiAgICAgIGxldCBjbGFzc05hbWUgPSBcIlwiO1xuICAgICAgY2xhc3NOYW1lcy5mb3JFYWNoKHN0YXRlID0+IHtcbiAgICAgICAgaWYgKHN0YXRlICE9PSBcIlwiKSB7XG4gICAgICAgICAgY2xhc3NOYW1lICs9IHN0YXRlLnJlcGxhY2UoL1wiL2csIFwiXCIpICsgXCIuXCI7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgd2luQ29weVtwcm9wZXJ0eU5hbWVGcm9tTWFwXSA9IGNsYXNzTmFtZS5zdWJzdHIoMCwgY2xhc3NOYW1lLmxlbmd0aCAtIDIpO1xuICAgIH1cbiAgICAvLyBwYXJzZSBzdGF0ZXNcbiAgICBlbHNlIGlmIChwcm9wZXJ0eU5hbWUgPT09IFwiX05FVF9XTV9TVEFURShBVE9NKVwiKSB7XG4gICAgICBjb25zdCBzdGF0ZXMgPSB2YWx1ZS5zcGxpdChcIiwgXCIpO1xuICAgICAgd2luQ29weS5zdGF0ZXMgPSBbXTtcbiAgICAgIHN0YXRlcy5mb3JFYWNoKHN0YXRlID0+IHtcbiAgICAgICAgaWYgKHN0YXRlICE9PSBcIlwiKSB7XG4gICAgICAgICAgd2luQ29weS5zdGF0ZXMucHVzaChzdGF0ZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICAvLyBwYXJzZSBzaW1wbGUgc3RyaW5ncyBhbmQgaW50ZWdlcnNcbiAgICBlbHNlIGlmIChwcm9wZXJ0eU5hbWVGcm9tTWFwKSB7XG4gICAgICAvLyBzcGVjaWFsIGhhbmRsZSBudW1iZXIgdHlwZXNcbiAgICAgIGlmIChDRkcuV01fTUVUQV9NQVBfTlVNQkVSX1RZUEVTLmluZGV4T2YocHJvcGVydHlOYW1lKSA+IC0xKSB7XG4gICAgICAgIHdpbkNvcHlbcHJvcGVydHlOYW1lRnJvbU1hcF0gPSBwYXJzZUludCh2YWx1ZSwgMTApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2luQ29weVtwcm9wZXJ0eU5hbWVGcm9tTWFwXSA9IHZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG4gIC8vIGNvbnNvbGUubG9nKHdpbkNvcHkpO1xuICByZXR1cm4gd2luQ29weTtcbn1cblxuLy8gVE9ETyBwcmV0dGlmeSBhcmdzIHN0cnVjdHVyZVxuZXhwb3J0IGZ1bmN0aW9uIHN0YXJ0UHJvZ3JhbShcbiAgZXhlY3V0YWJsZUZpbGU6IHN0cmluZyxcbiAgZGVza3RvcEZpbGVQYXRoOiBzdHJpbmdcbik6IFByb21pc2U8dm9pZD4ge1xuICBJU19ERUJVRyAmJlxuICAgIGNvbnNvbGUubG9nKFwiREVCVUc6IHN0YXJ0UHJvZ3JhbSgpOlwiLCBleGVjdXRhYmxlRmlsZSwgZGVza3RvcEZpbGVQYXRoKTtcblxuICBsZXQgY21kO1xuICBsZXQgYXJncyA9IFtdO1xuICBpZiAoZGVza3RvcEZpbGVQYXRoKSB7XG4gICAgY21kID0gYGF3a2A7XG4gICAgYXJncy5wdXNoKFxuICAgICAgJy9eRXhlYz0vIHtzdWIoXCJeRXhlYz1cIiwgXCJcIik7IGdzdWIoXCIgPyVbY0RkRmZpa21OblV1dl1cIiwgXCJcIik7IGV4aXQgc3lzdGVtKCQwKX0nXG4gICAgKTtcbiAgICBhcmdzLnB1c2goZGVza3RvcEZpbGVQYXRoKTtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBwYXJzZWRDbWQgPSBwYXJzZUNtZEFyZ3MoZXhlY3V0YWJsZUZpbGUpO1xuICAgIGNtZCA9IHBhcnNlZENtZFswXTtcbiAgICBhcmdzID0gcGFyc2VkQ21kWzFdO1xuICB9XG5cbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bGZpbGwgPT4ge1xuICAgIHNwYXduKGNtZCwgYXJncywge1xuICAgICAgc3RkaW86IFwiaWdub3JlXCIsXG4gICAgICBkZXRhY2hlZDogdHJ1ZVxuICAgIH0pLnVucmVmKCk7XG5cbiAgICAvLyBjdXJyZW50bHkgd2UgaGF2ZSBubyBlcnJvciBoYW5kbGluZyBhcyB0aGUgcHJvY2VzcyBpcyBzdGFydGVkIGRldGFjaGVkXG4gICAgZnVsZmlsbCgpO1xuICB9KTtcbn1cblxuLy8gR0VUIEFDVElWRSBXSU5ET1cgTElTVFxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEFjdGl2ZVdpbmRvd0xpc3QoKTogUHJvbWlzZTxXaW5PYmpbXT4ge1xuICBjb25zdCB3aW5kb3dJZHMgPSBhd2FpdCBnZXRBY3RpdmVXaW5kb3dJZHMoKTtcbiAgY29uc3Qgd2luZG93TGlzdDogV2luT2JqSWRPbmx5W10gPSBbXTtcbiAgd2luZG93SWRzLmZvckVhY2god2luZG93SWQgPT4ge1xuICAgIHdpbmRvd0xpc3QucHVzaCh7XG4gICAgICB3aW5kb3dJZDogd2luZG93SWQsXG4gICAgICB3aW5kb3dJZERlYzogcGFyc2VJbnQod2luZG93SWQsIDE2KVxuICAgIH0pO1xuICB9KTtcblxuICAvLyBhZGQgbWV0YSBkYXRhIHJpZ2h0IGF3YXlcbiAgY29uc3QgcHJvbWlzZXMgPSB3aW5kb3dMaXN0Lm1hcCh3aW4gPT4gZ2V0QWRkaXRpb25hbE1ldGFEYXRhRm9yV2luKHdpbikpO1xuXG4gIGNvbnN0IHdpbmRvd3NXaXRoRGF0YTogV2luT2JqW10gPSAoYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZXMpKSBhcyBXaW5PYmpbXTtcblxuICBJU19ERUJVRyAmJiBjb25zb2xlLmxvZyhcIkRFQlVHOiBnZXRBY3RpdmVXaW5kb3dMaXN0KCk6XCIsIHdpbmRvd0xpc3QpO1xuICByZXR1cm4gd2luZG93c1dpdGhEYXRhLmZpbHRlcihfZmlsdGVySW52YWxpZFdpbmRvd3MpO1xufVxuXG5mdW5jdGlvbiBfZmlsdGVySW52YWxpZFdpbmRvd3Mod2luOiBXaW5PYmopOiBib29sZWFuIHtcbiAgLy8gZmlsdGVyIG5vbmUgbm9ybWFsIHdpbmRvd3MsIGV4Y2x1ZGVkIGNsYXNzIG5hbWVzIGFuZCBpbmNvbXBsZXRlIHdpbmRvd3NcbiAgLy8gTk9URTogaWYgdGhlcmUgaXMgbm8gdHlwZSB3ZSBhc3N1bWUgaXQncyBub3JtYWwgdG9vXG4gIGNvbnN0IGlzTm9ybWFsV2luZG93ID1cbiAgICAoIXdpbi53bVR5cGUgfHwgd2luLndtVHlwZS5pbmNsdWRlcyhcIl9ORVRfV01fV0lORE9XX1RZUEVfTk9STUFMXCIpKSAmJlxuICAgICghd2luLndtUm9sZSB8fCB3aW4ud21Sb2xlICE9PSBcInBvcC11cFwiKTtcblxuICBjb25zdCBpc05vdEV4Y2x1ZGVkID0gIV9pc0V4Y2x1ZGVkV21DbGFzc05hbWUod2luLndtQ2xhc3NOYW1lKTtcbiAgY29uc3QgaGFzV21DbGFzc05hbWUgPSAhIXdpbi53bUNsYXNzTmFtZTtcblxuICAvLyB3YXJuIGlmIG5vIHdtQ2xhc3NOYW1lIGV2ZW4gdGhvdWdoIHRoZXJlIHNob3VsZCBiZVxuICBpZiAoaXNOb3JtYWxXaW5kb3cgJiYgaXNOb3RFeGNsdWRlZCAmJiAhaGFzV21DbGFzc05hbWUpIHtcbiAgICBjb25zb2xlLndhcm4od2luLndpbmRvd0lkICsgXCIgaGFzIG5vIHdtQ2xhc3NOYW1lLiBXaW46IFwiLCB3aW4pO1xuICB9XG5cbiAgcmV0dXJuIGlzTm9ybWFsV2luZG93ICYmIGlzTm90RXhjbHVkZWQgJiYgaGFzV21DbGFzc05hbWU7XG59XG5cbmZ1bmN0aW9uIF9pc0V4Y2x1ZGVkV21DbGFzc05hbWUod21DbGFzc05hbWUpOiBib29sZWFuIHtcbiAgcmV0dXJuIENGRy5XTV9DTEFTU19FWENMVVNJT05TLmluZGV4T2Yod21DbGFzc05hbWUpID4gLTE7XG59XG5cbmZ1bmN0aW9uIF9jYXRjaEdlbmVyaWNFcnIoZXJyKTogdm9pZCB7XG4gIGNvbnNvbGUuZXJyb3IoXCJvdGhlckNtZDogR2VuZXJpYyBFcnJvclwiLCBlcnIsIGVyci5zdGFjayk7XG4gIGxvZyhcIm90aGVyQ21kOlwiLCBhcmd1bWVudHMpO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5pbXBvcnQgeyBnZXRXaW5kb3dHZW9tZXRyeSwgZ29Ub1ZpZXdwb3J0IH0gZnJvbSBcIi4veDExV3JhcHBlclwiO1xuaW1wb3J0IHsgZ2V0QWN0aXZlV2luZG93TGlzdCB9IGZyb20gXCIuL290aGVyQ21kXCI7XG5pbXBvcnQgeyBDRkcgfSBmcm9tIFwiLi9jb25maWdcIjtcbmltcG9ydCB7IFdpbk9iaiB9IGZyb20gXCIuL21vZGVsXCI7XG5cbmNvbnN0IGZpbmR1cCA9IHJlcXVpcmUoXCJmaW5kdXAtc3luY1wiKTtcblxuY29uc3QgSE9NRV9ESVIgPSBwcm9jZXNzLmVudltcIkhPTUVcIl07XG5jb25zdCBERUZBVUxUX0RFU0tUT1BfRklMRV9MT0NBVElPTlMgPSBbXG4gIFwie2hvbWV9Ly5sb2NhbC9zaGFyZS9hcHBsaWNhdGlvbnNcIixcbiAgXCJ7aG9tZX0vLmdub21lL2FwcHMvXCIsXG4gIFwiL3Vzci9zaGFyZS9hcHBsaWNhdGlvbnNcIixcbiAgXCIvdXNyL2xvY2FsL3NoYXJlL2FwcGxpY2F0aW9uc1wiLFxuICBcIi91c3Ivc2hhcmUvYXBwLWluc3RhbGxcIlxuXTtcblxuZnVuY3Rpb24gX2NhdGNoR2VuZXJpY0VycihlcnIpIHtcbiAgY29uc29sZS5lcnJvcihcIkdlbmVyaWMgRXJyb3IgaW4gTWV0YSBXcmFwcGVyXCIsIGVyciwgZXJyLnN0YWNrKTtcbiAgdGhyb3cgZXJyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ29Ub0ZpcnN0V29ya3NwYWNlKCkge1xuICByZXR1cm4gZ29Ub1ZpZXdwb3J0KDAsIDApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmluZERlc2t0b3BGaWxlKGZpbGVOYW1lKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgoZnVsZmlsbCwgcmVqZWN0KSA9PiB7XG4gICAgY29uc3QgZGVza3RvcEZpbGVMb2NhdGlvbnMgPVxuICAgICAgQ0ZHLkRFU0tUT1BfRklMRV9MT0NBVElPTlMgfHwgREVGQVVMVF9ERVNLVE9QX0ZJTEVfTE9DQVRJT05TO1xuXG4gICAgY29uc3QgcGFyZW50RGlycyA9IGRlc2t0b3BGaWxlTG9jYXRpb25zLm1hcChwYXJlbnREaXIgPT4ge1xuICAgICAgcmV0dXJuIHBhcmVudERpci5yZXBsYWNlKFwie2hvbWV9XCIsIEhPTUVfRElSKTtcbiAgICB9KTtcblxuICAgIGxldCBmaXJzdEZpbGU7XG4gICAgY29uc3QgbWF0Y2ggPSBwYXJlbnREaXJzLmZpbmQoZGlyID0+IHtcbiAgICAgIGZpcnN0RmlsZSA9IGZpbmR1cChmaWxlTmFtZSwgeyBjd2Q6IGRpciB9KTtcblxuICAgICAgaWYgKCFmaXJzdEZpbGUpIHtcbiAgICAgICAgLy8gc25hcCBkZXNrdG9wIGZpbGVzIG5vdyBsb29rIGxpa2UgdGhpcyA9PiBmaXJlZm94X2ZpcmVmb3guZGVza3RvcFxuICAgICAgICBmaXJzdEZpbGUgPSBmaW5kdXAoYCR7ZmlsZU5hbWUucmVwbGFjZShcIi5kZXNrdG9wXCIsIFwiX1wiKX0ke2ZpbGVOYW1lfWAsIHtcbiAgICAgICAgICBjd2Q6IGRpclxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmaXJzdEZpbGU7XG4gICAgfSk7XG5cbiAgICBpZiAoIWZpcnN0RmlsZSB8fCAhbWF0Y2gpIHtcbiAgICAgIGNvbnN0IGVyciA9IGBFUlI6IGZpbmREZXNrdG9wRmlsZSgpIGNhbnQgZmluZCBmaWxlIFwiJHtmaWxlTmFtZX1cIiEgU2VhcmNoZWQgZGVza3RvcEZpbGVMb2NhdGlvbnM6YDtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyLCBkZXNrdG9wRmlsZUxvY2F0aW9ucyk7XG4gICAgICByZWplY3QoZXJyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZnVsZmlsbChmaXJzdEZpbGUpO1xuICAgIH1cbiAgfSkuY2F0Y2goX2NhdGNoR2VuZXJpY0Vycik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRBY3RpdmVXaW5kb3dMaXN0RmxvdygpOiBQcm9taXNlPFdpbk9ialtdIHwgYW55PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAoZnVsZmlsbCwgcmVqZWN0KSA9PiB7XG4gICAgcmV0dXJuIGdldEFjdGl2ZVdpbmRvd0xpc3QoKS50aGVuKGFzeW5jICh3aW5kb3dMaXN0OiBhbnlbXSkgPT4ge1xuICAgICAgY29uc3QgcHJvbWlzZXMgPSB3aW5kb3dMaXN0Lm1hcCh3aW4gPT4ge1xuICAgICAgICByZXR1cm4gZ2V0V2luZG93R2VvbWV0cnkod2luLndpbmRvd0lkKS50aGVuKChnZW86IGFueSkgPT4ge1xuICAgICAgICAgIGZvciAobGV0IHByb3AgaW4gZ2VvKSB7XG4gICAgICAgICAgICBpZiAoZ2VvLmhhc093blByb3BlcnR5KHByb3ApKSB7XG4gICAgICAgICAgICAgIHdpbltwcm9wXSA9IGdlb1twcm9wXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBUT0RPIG9yZ2FuaXplIGFkZGluZyBvZiBhbGwgdGhvc2UgZGlmZmVyZW50IHByb3BlcnRpZXMgYmV0dGVyXG4gICAgICAgICAgLy8gYWRkIG1pc3Npbmcgc3RhdGljIHByb3BlcnRpZXNcbiAgICAgICAgICB3aW4uc2ltcGxlTmFtZSA9IF9wYXJzZVNpbXBsZVdpbmRvd05hbWUod2luLndtQ2xhc3NOYW1lKTtcbiAgICAgICAgICByZXR1cm4gd2luO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyB3ZSdyZSB1c2luZyBhIHdhdGVyZmFsbCBiZWNhdXNlIHdlJ3JlIGRlYWxpbmcgd2l0aCB4MTEgcmVxdWVzdHNcbiAgICAgIGlmIChwcm9taXNlcy5sZW5ndGgpIHtcbiAgICAgICAgZm9yIChjb25zdCBwcm9taXNlIG9mIHByb21pc2VzKSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGF3YWl0IHByb21pc2U7XG4gICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfYWRkUGFyc2VkRXhlY3V0YWJsZUZpbGVzRnJvbVdtQ2xhc3NOYW1lcyh3aW5kb3dMaXN0KS50aGVuKFxuICAgICAgICAgIHdpbmRvd0xpc3RXaXRoV21DbGFzc05hbWVzID0+IHtcbiAgICAgICAgICAgIGZ1bGZpbGwod2luZG93TGlzdFdpdGhXbUNsYXNzTmFtZXMpO1xuICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZ1bGZpbGwoW10pO1xuICAgICAgfVxuICAgIH0pO1xuICB9KS5jYXRjaChfY2F0Y2hHZW5lcmljRXJyKTtcbn1cblxuLy8gTUlYRURcbmZ1bmN0aW9uIF9hZGRQYXJzZWRFeGVjdXRhYmxlRmlsZXNGcm9tV21DbGFzc05hbWVzKHdpbmRvd0xpc3QpOiBQcm9taXNlPGFueT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKGZ1bGZpbGwsIHJlamVjdCkgPT4ge1xuICAgIGNvbnN0IHByb21pc2VzID0gd2luZG93TGlzdFxuICAgICAgLmZpbHRlcih3aW4gPT4gIXdpbi5leGVjdXRhYmxlRmlsZSlcbiAgICAgIC5tYXAod2luID0+IHtcbiAgICAgICAgcmV0dXJuIF9wYXJzZUV4ZWN1dGFibGVGaWxlRnJvbVdtQ2xhc3NOYW1lKHdpbi53bUNsYXNzTmFtZSkudGhlbihcbiAgICAgICAgICBmaWxlTmFtZSA9PiB7XG4gICAgICAgICAgICB3aW4uZXhlY3V0YWJsZUZpbGUgPSBmaWxlTmFtZTtcbiAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICB9KTtcblxuICAgIGlmIChwcm9taXNlcy5sZW5ndGgpIHtcbiAgICAgIGZvciAoY29uc3QgcHJvbWlzZSBvZiBwcm9taXNlcykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGF3YWl0IHByb21pc2U7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICByZWplY3QoZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGZ1bGZpbGwod2luZG93TGlzdCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZ1bGZpbGwod2luZG93TGlzdCk7XG4gICAgfVxuICB9KS5jYXRjaChfY2F0Y2hHZW5lcmljRXJyKTtcbn1cblxuZnVuY3Rpb24gX3BhcnNlRXhlY3V0YWJsZUZpbGVGcm9tV21DbGFzc05hbWUod21DbGFzc05hbWUpOiBQcm9taXNlPGFueT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKGZ1bGZpbGwsIHJlamVjdCkgPT4ge1xuICAgIGNvbnN0IGV4ZWN1dGFibGVGaWxlRnJvbU1hcCA9XG4gICAgICBDRkcuV01fQ0xBU1NfQU5EX0VYRUNVVEFCTEVfRklMRV9NQVBbd21DbGFzc05hbWVdO1xuICAgIGlmIChleGVjdXRhYmxlRmlsZUZyb21NYXApIHtcbiAgICAgIGZ1bGZpbGwoZXhlY3V0YWJsZUZpbGVGcm9tTWFwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qgc3BsaXRWYWx1ZXMgPSB3bUNsYXNzTmFtZS5zcGxpdChcIi5cIik7XG4gICAgICBjb25zdCBmaWxlTmFtZSA9IHNwbGl0VmFsdWVzWzBdO1xuICAgICAgaWYgKF9pc0Nocm9tZUFwcChmaWxlTmFtZSkpIHtcbiAgICAgICAgX3BhcnNlQ2hyb21lQXBwRGVza3RvcEZpbGVOYW1lKGZpbGVOYW1lKVxuICAgICAgICAgIC50aGVuKGZ1bGZpbGwpXG4gICAgICAgICAgLmNhdGNoKHJlamVjdCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmdWxmaWxsKGZpbGVOYW1lICsgXCIuZGVza3RvcFwiKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pLmNhdGNoKF9jYXRjaEdlbmVyaWNFcnIpO1xufVxuXG5mdW5jdGlvbiBfcGFyc2VTaW1wbGVXaW5kb3dOYW1lKHdtQ2xhc3NOYW1lKSB7XG4gIGNvbnN0IHNwbGl0VmFsdWVzID0gd21DbGFzc05hbWUuc3BsaXQoXCIuXCIpO1xuICBpZiAoc3BsaXRWYWx1ZXNbMV0pIHtcbiAgICByZXR1cm4gc3BsaXRWYWx1ZXNbMV07XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHdtQ2xhc3NOYW1lO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9pc0Nocm9tZUFwcChmaWxlTmFtZSkge1xuICByZXR1cm4gISFmaWxlTmFtZS5tYXRjaCgvXmNyeF8vKTtcbn1cblxuZnVuY3Rpb24gX3BhcnNlQ2hyb21lQXBwRGVza3RvcEZpbGVOYW1lKGZpbGVOYW1lKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgLy8gd2Ugd2FuJ3QgdG8gc2VhcmNoIGZyb20gZGVza3RvcCBmaWxlcyBvbmx5XG4gICAgLy8gY2hyb21lIHdtIGNsYXNzIHVzZXMgcHJlZml4IGNyeF8gKG9uZSB1bmRlcnNjb3JlKVxuICAgIC8vIGVkZ2Ugd20gY2xhc3MgdXNlcyBwcmVmaXggY3J4X18gKHR3byB1bmRlcnNjb3JlcylcbiAgICBjb25zdCBsb2NhdGVTdHIgPSBmaWxlTmFtZS5yZXBsYWNlKC9jcnhfXz8vLCBcIipcIikgKyBcIiouZGVza3RvcFwiO1xuICAgIGZpbmREZXNrdG9wRmlsZShsb2NhdGVTdHIpXG4gICAgICAudGhlbihyZXNvbHZlKVxuICAgICAgLmNhdGNoKHJlamVjdCk7XG4gIH0pLmNhdGNoKF9jYXRjaEdlbmVyaWNFcnIpO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5pbXBvcnQgeyBDRkcsIFNFU1NJT05fREFUQV9ESVIgfSBmcm9tIFwiLi9jb25maWdcIjtcbmltcG9ydCAqIGFzIGZzIGZyb20gXCJmc1wiO1xuaW1wb3J0IHsgZ2V0Q29ubmVjdGVkRGlzcGxheXNJZCwgc3RhcnRQcm9ncmFtIH0gZnJvbSBcIi4vb3RoZXJDbWRcIjtcbmltcG9ydCB7XG4gIGNsb3NlV2luZG93LFxuICBnZXRYLFxuICBpbml0WDExLFxuICBtb3ZlVG9Xb3Jrc3BhY2UsXG4gIHJlc3RvcmVXaW5kb3dQb3NpdGlvblxufSBmcm9tIFwiLi94MTFXcmFwcGVyXCI7XG5pbXBvcnQge1xuICBmaW5kRGVza3RvcEZpbGUsXG4gIGdldEFjdGl2ZVdpbmRvd0xpc3RGbG93LFxuICBnb1RvRmlyc3RXb3Jrc3BhY2Vcbn0gZnJvbSBcIi4vbWV0YVdyYXBwZXJcIjtcbmltcG9ydCB7IGxvZyB9IGZyb20gXCIuL2xvZ1wiO1xuaW1wb3J0IHsgV2luT2JqIH0gZnJvbSBcIi4vbW9kZWxcIjtcbmltcG9ydCB7IGV4ZWMgfSBmcm9tIFwiY2hpbGRfcHJvY2Vzc1wiO1xuXG4vLyBpbXBvcnQgKiBhcyBTdG9yZSBmcm9tICdqZnMnO1xuY29uc3QgU3RvcmUgPSByZXF1aXJlKFwiamZzXCIpO1xuXG4vLyBjcmVhdGUgZGF0YSBzdG9yZVxuY29uc3QgZGIgPSBuZXcgU3RvcmUoU0VTU0lPTl9EQVRBX0RJUiwge1xuICBwcmV0dHk6IENGRy5TQVZFX1NFU1NJT05fSU5fUFJFVFRZX0ZPUk1BVFxufSk7XG5cbi8vIHNldHVwIG1ldGEgd3JhcHBlclxuXG4vLyBFWFBPUlRcbi8vIC0tLS0tLVxuZXhwb3J0IGRlZmF1bHQge1xuICBsaXN0U2Vzc2lvbnMsXG4gIHJlbmFtZVNlc3Npb24sXG4gIHNhdmVTZXNzaW9uLFxuICByZW1vdmVTZXNzaW9uLFxuICByZXN0b3JlU2Vzc2lvbixcbiAgZ2V0U2Vzc2lvbnMsXG4gIGdldFg6IGdldFgsXG5cbiAgZ2V0Q29ubmVjdGVkRGlzcGxheXNJZCxcbiAgcmVzZXRDZmc6ICgpID0+IHtcbiAgICBjb25zdCBjb25maWdGaWxlUGF0aCA9IENGRy5EQVRBX0RJUiArIFwiL2NvbmZpZy5qc29uXCI7XG4gICAgaWYgKGZzLmV4aXN0c1N5bmMoY29uZmlnRmlsZVBhdGgpKSB7XG4gICAgICBmcy51bmxpbmtTeW5jKGNvbmZpZ0ZpbGVQYXRoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5lcnJvcihcIk5vIENvbmZpZyBwcmVzZW50IGluIFwiICsgY29uZmlnRmlsZVBhdGgpO1xuICAgIH1cbiAgfSxcbiAgZ2V0Q2ZnOiAoKSA9PiB7XG4gICAgcmV0dXJuIENGRztcbiAgfSxcbiAgZ2V0RGI6ICgpID0+IHtcbiAgICByZXR1cm4gZGI7XG4gIH1cbn07XG5cbi8vIEhFTFBFUlxuLy8gLS0tLS0tLS1cbmZ1bmN0aW9uIF9jYXRjaEdlbmVyaWNFcnIoZXJyKSB7XG4gIGNvbnNvbGUuZXJyb3IoXCJHZW5lcmljIEVycm9yIGluIE1haW4gSGFuZGxlclwiLCBlcnIsIGVyci5zdGFjayk7XG4gIC8vIHRocm93IGVycjtcbn1cblxuZnVuY3Rpb24gZ2V0U2Vzc2lvbnMoKSB7XG4gIHJldHVybiBkYi5hbGxTeW5jKCk7XG59XG5cbi8vIE1BSU4gRlVOQ1RJT05TXG4vLyAtLS0tLS0tLS0tLS0tLVxuZnVuY3Rpb24gbGlzdFNlc3Npb25zKCkge1xuICBsZXQgbGlzdCA9IE9iamVjdC5rZXlzKGdldFNlc3Npb25zKCkpO1xuICBsaXN0LmZvckVhY2gobmFtZSA9PiB7XG4gICAgbG9nKG5hbWUpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gcmVuYW1lU2Vzc2lvbihvbGROYW1lOiBzdHJpbmcsIG5ld05hbWU6IHN0cmluZykge1xuICBsZXQgb2JqID0gZGIuZ2V0U3luYyhvbGROYW1lKTtcbiAgaWYgKG9iai5tZXNzYWdlKSB7XG4gICAgaWYgKG9iai5tZXNzYWdlID09PSBcImNvdWxkIG5vdCBsb2FkIGRhdGFcIikge1xuICAgICAgbG9nKGBFcnJvcjogQ291bGQgbm90IGZpbmQgYSBzZXNzaW9uIG5hbWVkICcke29sZE5hbWV9J2ApO1xuICAgIH0gZWxzZSB7XG4gICAgICBsb2cob2JqLm1lc3NhZ2UpO1xuICAgIH1cbiAgICByZXR1cm47XG4gIH1cbiAgZGIuc2F2ZVN5bmMobmV3TmFtZSwgb2JqKTtcbiAgZGIuZGVsZXRlKG9sZE5hbWUpO1xufVxuXG5mdW5jdGlvbiBzYXZlU2Vzc2lvbihzZXNzaW9uTmFtZTogc3RyaW5nLCBpbnB1dEhhbmRsZXJzKTogUHJvbWlzZTxhbnk+IHtcbiAgY29uc3Qgc2Vzc2lvblRvSGFuZGxlID0gc2Vzc2lvbk5hbWUgfHwgXCJERUZBVUxUXCI7XG5cbiAgcmV0dXJuIGluaXRYMTEoKVxuICAgIC50aGVuKCgpID0+IHtcbiAgICAgIHJldHVybiBnZXRBY3RpdmVXaW5kb3dMaXN0RmxvdygpO1xuICAgIH0pXG4gICAgLnRoZW4od2luZG93TGlzdCA9PiB7XG4gICAgICAvLyBkZXNrdG9wIGZpbGUgcGF0aHMgYW5kIGNvbm5lY3RlZCBkaXNwbGF5IGlkc1xuICAgICAgcmV0dXJuIF9ndWVzc0FuZFNldERlc2t0b3BGaWxlUGF0aHMoXG4gICAgICAgIHdpbmRvd0xpc3QsXG4gICAgICAgIGlucHV0SGFuZGxlcnMuZGVza3RvcEZpbGVQYXRoXG4gICAgICApO1xuICAgIH0pXG4gICAgLnRoZW4od2luZG93TGlzdCA9PiB7XG4gICAgICBjb25zdCBjb25uZWN0ZWREaXNwbGF5c0lkID0gZ2V0Q29ubmVjdGVkRGlzcGxheXNJZCgpO1xuICAgICAgcmV0dXJuIHNhdmVTZXNzaW9uRm9yRGlzcGxheVRvRGIoXG4gICAgICAgIHNlc3Npb25Ub0hhbmRsZSxcbiAgICAgICAgY29ubmVjdGVkRGlzcGxheXNJZCxcbiAgICAgICAgd2luZG93TGlzdFxuICAgICAgKTtcbiAgICB9KVxuICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgY29uc29sZS5lcnJvcihcInNhdmVTZXNzaW9uKCk6IEFuIGVycm9yIG9jY3VycmVkXCIsIGVycik7XG4gICAgICB0aHJvdyBlcnI7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIHNhdmVTZXNzaW9uRm9yRGlzcGxheVRvRGIoXG4gIHNlc3Npb25Ub0hhbmRsZTogc3RyaW5nLFxuICBjb25uZWN0ZWREaXNwbGF5c0lkOiBzdHJpbmcsXG4gIHdpbmRvd0xpc3Q6IFdpbk9ialtdXG4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChmdWxmaWxsLCByZWplY3QpID0+IHtcbiAgICAvLyBjaGVjayBpZiBlbnRyeSBleGlzdHMgYW5kIHVwZGF0ZVxuICAgIGRiLmdldChzZXNzaW9uVG9IYW5kbGUsIChlcnIsIHNlc3Npb25EYXRhKSA9PiB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIC8vIE5PVEU6IHdlJ3JlIG5vdCBmYWlsaW5nIGJlY2F1c2UsIHRoZSBjYXNlIGlzIHByb2JhYmx5IHRoYXQgdGhlcmUgaXMgbm8gc2Vzc2lvbiBmaWxlIHlldFxuICAgICAgICBsb2coXG4gICAgICAgICAgYHNhdmVTZXNzaW9uRm9yRGlzcGxheVRvRGI6IG5vIHNlc3Npb24gZmlsZSBwcmVzZW50IHlldCBmb3IgXCIke3Nlc3Npb25Ub0hhbmRsZX1cIiwgY3JlYXRpbmcgYSBuZXcgb25lLi4uYFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXNlc3Npb25EYXRhKSB7XG4gICAgICAgIC8vIGNyZWF0ZSBuZXcgb2JqZWN0XG4gICAgICAgIHNlc3Npb25EYXRhID0ge1xuICAgICAgICAgIG5hbWU6IHNlc3Npb25Ub0hhbmRsZVxuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgaWYgKFxuICAgICAgICAhc2Vzc2lvbkRhdGEuZGlzcGxheXNDb21iaW5hdGlvbnMgfHxcbiAgICAgICAgIUFycmF5LmlzQXJyYXkoc2Vzc2lvbkRhdGEuZGlzcGxheXNDb21iaW5hdGlvbnMpXG4gICAgICApIHtcbiAgICAgICAgLy8gY3JlYXRlIG5ldyBhcnJheVxuICAgICAgICBzZXNzaW9uRGF0YS5kaXNwbGF5c0NvbWJpbmF0aW9ucyA9IFtdO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBleGlzdGluZ0Rpc3BsYXlFbnRyeSA9IHNlc3Npb25EYXRhLmRpc3BsYXlzQ29tYmluYXRpb25zLmZpbmQoXG4gICAgICAgIGVudHJ5ID0+IGVudHJ5LmlkID09PSBjb25uZWN0ZWREaXNwbGF5c0lkXG4gICAgICApO1xuICAgICAgaWYgKGV4aXN0aW5nRGlzcGxheUVudHJ5KSB7XG4gICAgICAgIGV4aXN0aW5nRGlzcGxheUVudHJ5LndpbmRvd0xpc3QgPSB3aW5kb3dMaXN0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2Vzc2lvbkRhdGEuZGlzcGxheXNDb21iaW5hdGlvbnMucHVzaCh7XG4gICAgICAgICAgaWQ6IGNvbm5lY3RlZERpc3BsYXlzSWQsXG4gICAgICAgICAgd2luZG93TGlzdFxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgZGIuc2F2ZShzZXNzaW9uVG9IYW5kbGUsIHNlc3Npb25EYXRhLCBlcnIgPT4ge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbG9nKFwiU0FWRUQgU0VTU0lPTjogXCIgKyBzZXNzaW9uVG9IYW5kbGUpO1xuICAgICAgICAgIGZ1bGZpbGwoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiByZXN0b3JlU2Vzc2lvbihcbiAgc2Vzc2lvbk5hbWU6IHN0cmluZyxcbiAgaXNDbG9zZUFsbE9wZW5XaW5kb3dzOiBib29sZWFuXG4pOiBQcm9taXNlPGFueT4ge1xuICBjb25zdCBzZXNzaW9uVG9IYW5kbGUgPSBzZXNzaW9uTmFtZSB8fCBcIkRFRkFVTFRcIjtcblxuICByZXR1cm4gbmV3IFByb21pc2UoKGZ1bGZpbGwsIHJlamVjdCkgPT4ge1xuICAgIGRiLmdldChzZXNzaW9uVG9IYW5kbGUgfHwgXCJERUZBVUxUXCIsIChlcnIsIHNlc3Npb25EYXRhKSA9PiB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGxldCBzYXZlZFdpbmRvd0xpc3Q7XG5cbiAgICAgIGluaXRYMTEoKVxuICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIF9jbG9zZUFsbFdpbmRvd3NJZlNldChpc0Nsb3NlQWxsT3BlbldpbmRvd3MpO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbihnb1RvRmlyc3RXb3Jrc3BhY2UpXG4gICAgICAgIC50aGVuKGdldENvbm5lY3RlZERpc3BsYXlzSWQpXG4gICAgICAgIC50aGVuKGNvbm5lY3RlZERpc3BsYXlzSWQgPT4ge1xuICAgICAgICAgIGlmICghc2Vzc2lvbkRhdGEuZGlzcGxheXNDb21iaW5hdGlvbnMpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYG5vIGRpc3BsYXkgY29tYmluYXRpb25zIHNhdmVkIHlldGApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IGRpc3BsYXlFbnRyeSA9IHNlc3Npb25EYXRhLmRpc3BsYXlzQ29tYmluYXRpb25zLmZpbmQoXG4gICAgICAgICAgICBlbnRyeSA9PiBlbnRyeS5pZCA9PT0gY29ubmVjdGVkRGlzcGxheXNJZFxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBpZiAoZGlzcGxheUVudHJ5KSB7XG4gICAgICAgICAgICBzYXZlZFdpbmRvd0xpc3QgPSBkaXNwbGF5RW50cnkud2luZG93TGlzdDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICAgICAgYG5vIGRhdGEgZm9yIGN1cnJlbnQgZGlzcGxheSBpZCAnJHtjb25uZWN0ZWREaXNwbGF5c0lkfScgc2F2ZWQgeWV0YFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGdldEFjdGl2ZVdpbmRvd0xpc3RGbG93KCk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKGN1cnJlbnRXaW5kb3dMaXN0ID0+IHtcbiAgICAgICAgICByZXR1cm4gX3N0YXJ0U2Vzc2lvblByb2dyYW1zKHNhdmVkV2luZG93TGlzdCwgY3VycmVudFdpbmRvd0xpc3QpO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgLy8gZ2V0cyBjdXJyZW50IHdpbmRvdyBsaXN0IGJ5IGl0c2VsZiBhbmQgcmV0dXJucyB0aGUgdXBkYXRlZCB2YXJpYW50XG4gICAgICAgICAgcmV0dXJuIF93YWl0Rm9yQWxsQXBwc1RvU3RhcnQoc2F2ZWRXaW5kb3dMaXN0KTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oXG4gICAgICAgICAgKHVwZGF0ZWRDdXJyZW50V2luZG93TGlzdDogV2luT2JqW10pID0+XG4gICAgICAgICAgICBuZXcgUHJvbWlzZShyZXNvbHZlID0+XG4gICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJlc29sdmUodXBkYXRlZEN1cnJlbnRXaW5kb3dMaXN0KTtcbiAgICAgICAgICAgICAgfSwgMjUwKVxuICAgICAgICAgICAgKVxuICAgICAgICApXG4gICAgICAgIC50aGVuKCh1cGRhdGVkQ3VycmVudFdpbmRvd0xpc3Q6IFdpbk9ialtdKSA9PiB7XG4gICAgICAgICAgX3VwZGF0ZVdpbmRvd0lkcyhzYXZlZFdpbmRvd0xpc3QsIHVwZGF0ZWRDdXJyZW50V2luZG93TGlzdCk7XG4gICAgICAgICAgcmV0dXJuIF9yZXN0b3JlV2luZG93UG9zaXRpb25zKHNhdmVkV2luZG93TGlzdCk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICBsb2coXCJSRVNUT1JFRCBTRVNTSU9OOiBcIiArIHNlc3Npb25Ub0hhbmRsZSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJBbiBlcnJvciBvY2N1cnJlZFwiLCBlcnIpO1xuICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbihmdWxmaWxsKTtcbiAgICB9KTtcbiAgfSkuY2F0Y2goX2NhdGNoR2VuZXJpY0Vycik7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVNlc3Npb24oc2Vzc2lvbk5hbWU6IHN0cmluZyk6IFByb21pc2U8dW5rbm93bj4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKGZ1bGZpbGwsIHJlamVjdCkgPT4ge1xuICAgIGZzLnVubGluayhDRkcuU0VTU0lPTl9EQVRBX0RJUiArIFwiL1wiICsgc2Vzc2lvbk5hbWUgKyBcIi5qc29uXCIsIGVycm9yID0+IHtcbiAgICAgIGlmIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZ1bGZpbGwoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSkuY2F0Y2goX2NhdGNoR2VuZXJpY0Vycik7XG59XG5cbmZ1bmN0aW9uIF9jbG9zZUFsbFdpbmRvd3NJZlNldChpc0Nsb3NlQWxsOiBib29sZWFuKTogUHJvbWlzZTx1bmtub3duPiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgoZnVsZmlsbCwgcmVqZWN0KSA9PiB7XG4gICAgaWYgKGlzQ2xvc2VBbGwpIHtcbiAgICAgIGxvZyhcIkNsb3Npbmcgb3BlbmVkIGFwcGxpY2F0aW9uc1wiKTtcbiAgICAgIGdldEFjdGl2ZVdpbmRvd0xpc3RGbG93KClcbiAgICAgICAgLnRoZW4oKGN1cnJlbnRXaW5kb3dMaXN0OiBhbnlbXSkgPT4ge1xuICAgICAgICAgIGN1cnJlbnRXaW5kb3dMaXN0LmZvckVhY2god2luID0+IHtcbiAgICAgICAgICAgIGNsb3NlV2luZG93KHdpbi53aW5kb3dJZCk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBfd2FpdEZvckFsbEFwcHNUb0Nsb3NlKClcbiAgICAgICAgICAgIC50aGVuKGZ1bGZpbGwpXG4gICAgICAgICAgICAuY2F0Y2gocmVqZWN0KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKHJlamVjdCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZ1bGZpbGwoKTtcbiAgICB9XG4gIH0pLmNhdGNoKF9jYXRjaEdlbmVyaWNFcnIpO1xufVxuXG5mdW5jdGlvbiBfd2FpdEZvckFsbEFwcHNUb0Nsb3NlKCk6IFByb21pc2U8dW5rbm93bj4ge1xuICBsZXQgdG90YWxUaW1lV2FpdGVkID0gMDtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChmdWxmaWxsLCByZWplY3QpID0+IHtcbiAgICBmdW5jdGlvbiBwb2xsQWxsQXBwc0Nsb3NlZCgpIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBnZXRBY3RpdmVXaW5kb3dMaXN0RmxvdygpXG4gICAgICAgICAgLnRoZW4oKGN1cnJlbnRXaW5kb3dMaXN0OiBXaW5PYmpbXSkgPT4ge1xuICAgICAgICAgICAgdG90YWxUaW1lV2FpdGVkICs9IENGRy5QT0xMX0FMTF9BUFBTX1NUQVJURURfSU5URVJWQUw7XG4gICAgICAgICAgICBpZiAoY3VycmVudFdpbmRvd0xpc3QubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgICAgIGlmICh0b3RhbFRpbWVXYWl0ZWQgPiBDRkcuUE9MTF9BTExfTUFYX1RJTUVPVVQpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiUE9MTF9BTExfTUFYX1RJTUVPVVQgcmVhY2hlZFwiKTtcbiAgICAgICAgICAgICAgICByZWplY3QoXCJQT0xMX0FMTF9NQVhfVElNRU9VVCByZWFjaGVkXCIpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIGNhbGwgcmVjdXJzaXZlbHlcbiAgICAgICAgICAgICAgICBwb2xsQWxsQXBwc0Nsb3NlZCgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBmdWxmaWxsKGN1cnJlbnRXaW5kb3dMaXN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaChyZWplY3QpO1xuICAgICAgfSwgQ0ZHLlBPTExfQUxMX0FQUFNfU1RBUlRFRF9JTlRFUlZBTCk7XG4gICAgfVxuXG4gICAgLy8gc3RhcnQgb25jZSBpbml0aWFsbHlcbiAgICBwb2xsQWxsQXBwc0Nsb3NlZCgpO1xuICB9KS5jYXRjaChfY2F0Y2hHZW5lcmljRXJyKTtcbn1cblxuZnVuY3Rpb24gX3dhaXRGb3JBbGxBcHBzVG9TdGFydChzYXZlZFdpbmRvd0xpc3QpOiBQcm9taXNlPFdpbk9ialtdIHwgdW5rbm93bj4ge1xuICBsb2coXCJXYWl0aW5nIGZvciBhbGwgYXBwbGljYXRpb25zIHRvIHN0YXJ0Li4uXCIpO1xuXG4gIGxldCB0b3RhbFRpbWVXYWl0ZWQgPSAwO1xuICBsZXQgdGltZW91dDtcblxuICByZXR1cm4gbmV3IFByb21pc2UoKGZ1bGZpbGwsIHJlamVjdCkgPT4ge1xuICAgIGZ1bmN0aW9uIHBvbGxBbGxBcHBzU3RhcnRlZChcbiAgICAgIHNhdmVkV2luZG93TGlzdDogV2luT2JqW10sXG4gICAgICB0aW1lb3V0RHVyYXRpb24gPSBDRkcuUE9MTF9BTExfQVBQU19TVEFSVEVEX0lOVEVSVkFMXG4gICAgKSB7XG4gICAgICB0aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIC8vIGNsZWFyIHRpbWVvdXQgdG8gYmUgc2F2ZVxuICAgICAgICBpZiAodGltZW91dCkge1xuICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldEFjdGl2ZVdpbmRvd0xpc3RGbG93KClcbiAgICAgICAgICAudGhlbihjdXJyZW50V2luZG93TGlzdCA9PiB7XG4gICAgICAgICAgICB0b3RhbFRpbWVXYWl0ZWQgKz0gQ0ZHLlBPTExfQUxMX0FQUFNfU1RBUlRFRF9JTlRFUlZBTDtcbiAgICAgICAgICAgIGlmICghX2lzQWxsQXBwc1N0YXJ0ZWQoc2F2ZWRXaW5kb3dMaXN0LCBjdXJyZW50V2luZG93TGlzdCkpIHtcbiAgICAgICAgICAgICAgaWYgKHRvdGFsVGltZVdhaXRlZCA+IENGRy5QT0xMX0FMTF9NQVhfVElNRU9VVCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJQT0xMX0FMTF9NQVhfVElNRU9VVCByZWFjaGVkXCIpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgICAgICAgICBcIlVuYWJsZSB0byBzdGFydCB0aGUgZm9sbG93aW5nIGFwcHNcIixcbiAgICAgICAgICAgICAgICAgIF9nZXROb3RTdGFydGVkQXBwcyhzYXZlZFdpbmRvd0xpc3QsIGN1cnJlbnRXaW5kb3dMaXN0KVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgcmVqZWN0KFwiUE9MTF9BTExfTUFYX1RJTUVPVVQgcmVhY2hlZFwiKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBjYWxsIHJlY3Vyc2l2ZWx5XG4gICAgICAgICAgICAgICAgcG9sbEFsbEFwcHNTdGFydGVkKHNhdmVkV2luZG93TGlzdCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGxvZyhcIkFsbCBhcHBsaWNhdGlvbnMgc3RhcnRlZFwiKTtcbiAgICAgICAgICAgICAgZnVsZmlsbChjdXJyZW50V2luZG93TGlzdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2gocmVqZWN0KTtcbiAgICAgIH0sIHRpbWVvdXREdXJhdGlvbik7XG4gICAgfVxuXG4gICAgLy8gc3RhcnQgb25jZSBpbml0aWFsbHlcbiAgICBwb2xsQWxsQXBwc1N0YXJ0ZWQoc2F2ZWRXaW5kb3dMaXN0LCA1MDApO1xuICB9KS5jYXRjaChfY2F0Y2hHZW5lcmljRXJyKTtcbn1cblxuZnVuY3Rpb24gX2dldE5vdFN0YXJ0ZWRBcHBzKFxuICBzYXZlZFdpbmRvd0xpc3Q6IFdpbk9ialtdLFxuICBjdXJyZW50V2luZG93TGlzdDogV2luT2JqW11cbik6IFdpbk9ialtdIHtcbiAgbGV0IG5vblN0YXJ0ZWRBcHBzID0gW107XG4gIHNhdmVkV2luZG93TGlzdC5mb3JFYWNoKHdpbiA9PiB7XG4gICAgaWYgKCFfZ2V0TWF0Y2hpbmdXaW5kb3dJZCh3aW4sIGN1cnJlbnRXaW5kb3dMaXN0KSkge1xuICAgICAgbm9uU3RhcnRlZEFwcHMucHVzaCh3aW4pO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBub25TdGFydGVkQXBwcztcbn1cblxuZnVuY3Rpb24gX2lzQWxsQXBwc1N0YXJ0ZWQoXG4gIHNhdmVkV2luZG93TGlzdDogV2luT2JqW10sXG4gIGN1cnJlbnRXaW5kb3dMaXN0OiBXaW5PYmpbXVxuKTogYm9vbGVhbiB7XG4gIGxldCBpc0FsbFN0YXJ0ZWQgPSB0cnVlO1xuICBjb25zdCBjdXJyZW50V2luZG93TGlzdENvcHkgPSBjdXJyZW50V2luZG93TGlzdC5zbGljZSgwKS5maWx0ZXIoXG4gICAgLy8gc29tZSBhcHBzIGhhdmUgYSBzcGxhc2ggc2NyZWVuIChpbnRlbGxpaiBpZGVhKSwgd2Ugd2FudCB0byB3YWl0IGZvciB0aG9zZVxuICAgIHdpbkZyb21DdXJyZW50ID0+XG4gICAgICAhd2luRnJvbUN1cnJlbnQuc3RhdGVzPy5pbmNsdWRlcyhcIl9ORVRfV01fU1RBVEVfU0tJUF9UQVNLQkFSXCIpXG4gICk7XG5cbiAgc2F2ZWRXaW5kb3dMaXN0LmZvckVhY2god2luID0+IHtcbiAgICBpZiAoIV9nZXRNYXRjaGluZ1dpbmRvd0lkKHdpbiwgY3VycmVudFdpbmRvd0xpc3RDb3B5KSkge1xuICAgICAgaXNBbGxTdGFydGVkID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGluZGV4ID0gY3VycmVudFdpbmRvd0xpc3RDb3B5LmZpbmRJbmRleChcbiAgICAgICAgd2luRnJvbUN1cnJlbnQgPT4gd2luLndtQ2xhc3NOYW1lID09PSB3aW5Gcm9tQ3VycmVudC53bUNsYXNzTmFtZVxuICAgICAgKTtcbiAgICAgIGN1cnJlbnRXaW5kb3dMaXN0Q29weS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBpc0FsbFN0YXJ0ZWQ7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIF9ndWVzc0FuZFNldERlc2t0b3BGaWxlUGF0aHMoXG4gIHdpbmRvd0xpc3Q6IFdpbk9ialtdLFxuICBpbnB1dEhhbmRsZXJcbik6IFByb21pc2U8V2luT2JqW10+IHtcbiAgY29uc3QgcHJvbWlzZXMgPSB3aW5kb3dMaXN0Lm1hcCh3aW4gPT4gX2d1ZXNzRmlsZVBhdGgod2luLCBpbnB1dEhhbmRsZXIpKTtcblxuICBmb3IgKGNvbnN0IHByb21pc2Ugb2YgcHJvbWlzZXMpIHtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgcHJvbWlzZTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBfY2F0Y2hHZW5lcmljRXJyKGUpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gd2luZG93TGlzdDtcbn1cblxuZnVuY3Rpb24gX2d1ZXNzRmlsZVBhdGgod2luOiBXaW5PYmosIGlucHV0SGFuZGxlcik6IFByb21pc2U8c3RyaW5nIHwgdW5rbm93bj4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKGZ1bGZpbGwsIHJlamVjdCkgPT4ge1xuICAgIGZ1bmN0aW9uIGNhbGxJbnB1dEhhbmRsZXIoZXJyb3I/LCBzdGRvdXQ/KSB7XG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgYFxcbiBUcnlpbmcgYWx0ZXJuYXRpdmUgZ3Vlc3NpbmcgYXBwcm9hY2ggZm9yIFwiJHt3aW4uc2ltcGxlTmFtZX1cIi4uLi4uYFxuICAgICAgICApO1xuICAgICAgICBleGVjKGBjYXQgL3Byb2MvJHt3aW4ud21QaWR9L2NtZGxpbmVgLCAoZXJyb3IxLCBzdGRvdXQxKSA9PiB7XG4gICAgICAgICAgaWYgKGVycm9yMSB8fCAhc3Rkb3V0MS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFUlIgX2d1ZXNzRmlsZVBhdGgoKVwiLCBlcnJvcjEpO1xuICAgICAgICAgICAgcmVqZWN0KGVycm9yMSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGVudCA9IHN0ZG91dDEuc3BsaXQoXCJcXHUwMDAwXCIpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICAgIGBcXG4gQWx0ZXJuYXRpdmUgZ3Vlc3NpbmcgYXBwcm9hY2ggZm9yIFwiJHt3aW4uc2ltcGxlTmFtZX1cIiBTVUNDRVNTIC0+ICR7ZW50WzBdfWBcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB3aW4uZXhlY3V0YWJsZUZpbGUgPSBlbnRbMF07XG4gICAgICAgICAgICBmdWxmaWxsKHdpbi5leGVjdXRhYmxlRmlsZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlucHV0SGFuZGxlcihlcnJvciwgd2luLCBzdGRvdXQpXG4gICAgICAgICAgLnRoZW4oaW5wdXQgPT4ge1xuICAgICAgICAgICAgaWYgKF9pc0Rlc2t0b3BGaWxlKHdpbi5leGVjdXRhYmxlRmlsZSkpIHtcbiAgICAgICAgICAgICAgd2luLmRlc2t0b3BGaWxlUGF0aCA9IGlucHV0O1xuICAgICAgICAgICAgICBmdWxmaWxsKHdpbi5kZXNrdG9wRmlsZVBhdGgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgd2luLmV4ZWN1dGFibGVGaWxlID0gaW5wdXQ7XG4gICAgICAgICAgICAgIGZ1bGZpbGwod2luLmV4ZWN1dGFibGVGaWxlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaChyZWplY3QpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChfaXNEZXNrdG9wRmlsZSh3aW4uZXhlY3V0YWJsZUZpbGUpKSB7XG4gICAgICBmaW5kRGVza3RvcEZpbGUod2luLmV4ZWN1dGFibGVGaWxlKVxuICAgICAgICAudGhlbihzdGRvdXQgPT4ge1xuICAgICAgICAgIGNhbGxJbnB1dEhhbmRsZXIobnVsbCwgc3Rkb3V0KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGNhbGxJbnB1dEhhbmRsZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjYWxsSW5wdXRIYW5kbGVyKHRydWUsIHdpbi5leGVjdXRhYmxlRmlsZSk7XG4gICAgfVxuICB9KS5jYXRjaChfY2F0Y2hHZW5lcmljRXJyKTtcbn1cblxuLy8gVE9ETyBjaGVjayBmb3IgaG93IG1hbnkgaW5zdGFuY2VzIHRoZXJlIHNob3VsZCBiZSBydW5uaW5nIG9mIGEgcHJvZ3JhbVxuYXN5bmMgZnVuY3Rpb24gX3N0YXJ0U2Vzc2lvblByb2dyYW1zKFxuICB3aW5kb3dMaXN0OiBXaW5PYmpbXSxcbiAgY3VycmVudFdpbmRvd0xpc3Q6IFdpbk9ialtdXG4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgLy8gc2V0IGluc3RhbmNlcyBzdGFydGVkIHRvIDBcbiAgd2luZG93TGlzdC5mb3JFYWNoKHdpbiA9PiAod2luLmluc3RhbmNlc1N0YXJ0ZWQgPSAwKSk7XG4gIGNvbnN0IHByb21pc2VzID0gd2luZG93TGlzdFxuICAgIC5maWx0ZXIod2luID0+IHtcbiAgICAgIGNvbnN0IG51bWJlck9mSW5zdGFuY2VzT2ZXaW4gPSBfZ2V0TnVtYmVyT2ZJbnN0YW5jZXNUb1J1bihcbiAgICAgICAgd2luLFxuICAgICAgICB3aW5kb3dMaXN0XG4gICAgICApO1xuICAgICAgcmV0dXJuICFfaXNQcm9ncmFtQWxyZWFkeVJ1bm5pbmcoXG4gICAgICAgIHdpbi53bUNsYXNzTmFtZSxcbiAgICAgICAgY3VycmVudFdpbmRvd0xpc3QsXG4gICAgICAgIG51bWJlck9mSW5zdGFuY2VzT2ZXaW4sXG4gICAgICAgIHdpbi5pbnN0YW5jZXNTdGFydGVkXG4gICAgICApO1xuICAgIH0pXG4gICAgLm1hcCh3aW4gPT4ge1xuICAgICAgd2luLmluc3RhbmNlc1N0YXJ0ZWQgKz0gMTtcbiAgICAgIHJldHVybiBzdGFydFByb2dyYW0od2luLmV4ZWN1dGFibGVGaWxlLCB3aW4uZGVza3RvcEZpbGVQYXRoKTtcbiAgICB9KTtcblxuICBhd2FpdCBQcm9taXNlLmFsbChwcm9taXNlcyk7XG59XG5cbmZ1bmN0aW9uIF9nZXROdW1iZXJPZkluc3RhbmNlc1RvUnVuKFxuICB3aW5kb3dUb01hdGNoOiBXaW5PYmosXG4gIHdpbmRvd0xpc3Q6IFdpbk9ialtdXG4pOiBudW1iZXIge1xuICByZXR1cm4gd2luZG93TGlzdC5maWx0ZXIod2luID0+IHtcbiAgICByZXR1cm4gd2luLndtQ2xhc3NOYW1lID09PSB3aW5kb3dUb01hdGNoLndtQ2xhc3NOYW1lO1xuICB9KS5sZW5ndGg7XG59XG5cbmZ1bmN0aW9uIF9pc1Byb2dyYW1BbHJlYWR5UnVubmluZyhcbiAgd21DbGFzc05hbWU6IHN0cmluZyxcbiAgY3VycmVudFdpbmRvd0xpc3Q6IFdpbk9ialtdLFxuICBudW1iZXJPZkluc3RhbmNlc1RvUnVuOiBudW1iZXIsXG4gIGluc3RhbmNlc1N0YXJ0ZWQ6IG51bWJlclxuKTogYm9vbGVhbiB7XG4gIGlmICghbnVtYmVyT2ZJbnN0YW5jZXNUb1J1bikge1xuICAgIG51bWJlck9mSW5zdGFuY2VzVG9SdW4gPSAxO1xuICB9XG5cbiAgaWYgKCFpbnN0YW5jZXNTdGFydGVkKSB7XG4gICAgaW5zdGFuY2VzU3RhcnRlZCA9IDA7XG4gIH1cblxuICBsZXQgaW5zdGFuY2VzUnVubmluZyA9IDA7XG4gIGN1cnJlbnRXaW5kb3dMaXN0LmZvckVhY2god2luID0+IHtcbiAgICBpZiAod2luLndtQ2xhc3NOYW1lID09PSB3bUNsYXNzTmFtZSkge1xuICAgICAgaW5zdGFuY2VzUnVubmluZysrO1xuICAgIH1cbiAgfSk7XG4gIGxvZyhcbiAgICAnU3RhdHVzOiBcIicgKyB3bUNsYXNzTmFtZSArICdcIiBpcyBydW5uaW5nOicsXG4gICAgaW5zdGFuY2VzUnVubmluZyArIGluc3RhbmNlc1N0YXJ0ZWQgPj0gbnVtYmVyT2ZJbnN0YW5jZXNUb1J1bixcbiAgICBudW1iZXJPZkluc3RhbmNlc1RvUnVuLFxuICAgIGluc3RhbmNlc1N0YXJ0ZWRcbiAgKTtcbiAgcmV0dXJuIGluc3RhbmNlc1J1bm5pbmcgKyBpbnN0YW5jZXNTdGFydGVkID49IG51bWJlck9mSW5zdGFuY2VzVG9SdW47XG59XG5cbmZ1bmN0aW9uIF9pc0Rlc2t0b3BGaWxlKGV4ZWN1dGFibGVGaWxlOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgcmV0dXJuIGV4ZWN1dGFibGVGaWxlICYmICEhZXhlY3V0YWJsZUZpbGUubWF0Y2goL2Rlc2t0b3AkLyk7XG59XG5cbmZ1bmN0aW9uIF91cGRhdGVXaW5kb3dJZHMoXG4gIHNhdmVkV2luZG93TGlzdDogV2luT2JqW10sXG4gIGN1cnJlbnRXaW5kb3dMaXN0OiBXaW5PYmpbXVxuKSB7XG4gIGNvbnN0IHdtQ2xhc3NOYW1lTWFwID0ge307XG4gIHNhdmVkV2luZG93TGlzdC5mb3JFYWNoKHdpbiA9PiB7XG4gICAgaWYgKCF3bUNsYXNzTmFtZU1hcFt3aW4ud21DbGFzc05hbWVdKSB7XG4gICAgICB3bUNsYXNzTmFtZU1hcFt3aW4ud21DbGFzc05hbWVdID0gX2dldE1hdGNoaW5nV2luZG93cyhcbiAgICAgICAgd2luLFxuICAgICAgICBjdXJyZW50V2luZG93TGlzdFxuICAgICAgKTtcbiAgICB9XG5cbiAgICB3aW4ud2luZG93SWQgPSB3bUNsYXNzTmFtZU1hcFt3aW4ud21DbGFzc05hbWVdWzBdLndpbmRvd0lkO1xuICAgIHdpbi53aW5kb3dJZERlYyA9IHBhcnNlSW50KHdpbi53aW5kb3dJZCwgMTYpO1xuXG4gICAgLy8gcmVtb3ZlIGZpcnN0IGVudHJ5XG4gICAgd21DbGFzc05hbWVNYXBbd2luLndtQ2xhc3NOYW1lXS5zaGlmdCgpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gX2dldE1hdGNoaW5nV2luZG93SWQoXG4gIHdpbjogV2luT2JqLFxuICBjdXJyZW50V2luZG93TGlzdDogV2luT2JqW11cbik6IHN0cmluZyB7XG4gIGNvbnN0IGN1cnJlbnRXaW5kb3cgPSBjdXJyZW50V2luZG93TGlzdC5maW5kKFxuICAgIHdpbkZyb21DdXJyZW50ID0+IHdpbi53bUNsYXNzTmFtZSA9PT0gd2luRnJvbUN1cnJlbnQud21DbGFzc05hbWVcbiAgKTtcbiAgcmV0dXJuIGN1cnJlbnRXaW5kb3cgJiYgY3VycmVudFdpbmRvdy53aW5kb3dJZDtcbn1cblxuZnVuY3Rpb24gX2dldE1hdGNoaW5nV2luZG93cyhcbiAgd2luOiBXaW5PYmosXG4gIGN1cnJlbnRXaW5kb3dMaXN0OiBXaW5PYmpbXVxuKTogV2luT2JqW10ge1xuICByZXR1cm4gY3VycmVudFdpbmRvd0xpc3QuZmlsdGVyKFxuICAgIHdpbkZyb21DdXJyZW50ID0+IHdpbi53bUNsYXNzTmFtZSA9PT0gd2luRnJvbUN1cnJlbnQud21DbGFzc05hbWVcbiAgKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gX3Jlc3RvcmVXaW5kb3dQb3NpdGlvbnMoXG4gIHNhdmVkV2luZG93TGlzdDogV2luT2JqW11cbik6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCBwcm9taXNlcyA9IFtdO1xuICBsZXQgbGFzdF9kZXNrdG9wX25yID0gMDtcblxuICAvLyBTb3J0IHRoZSB3aW5kb3cgb2JqZWN0cyBiYXNlZCBvbiB3aGljaCB3b3Jrc3BhY2UgdGhleSBhcmUgbG9jYXRlLFxuICAvLyBzbyB0aGUgd2luZG93cyBjYW4gYmUgbW92ZWQgd29ya3NwYWNlIGJ5IHdvcmtzcGFjZVxuICAvLyBUaGlzIGlzIG5lZWRlZCBiZWNhdXNlIHRoZSB3aW5kb3cgbWFuYWdlciBqdXN0IGNyZWF0ZXMgYW4gYWRkaXRpb25hbCB3b3Jrc3BhY2Ugd2hlblxuICAvLyB0aGUgcHJldmlvdXMgb25lIGhhcyBzb21lIHdpbmRvdyBvbiBpdC5cbiAgc2F2ZWRXaW5kb3dMaXN0ID0gc2F2ZWRXaW5kb3dMaXN0LmNvbmNhdCgpLnNvcnQoKGEsIGIpID0+IHtcbiAgICAvLyBOT1RFOiB3ZSBuZWVkIHRvIGZhbGxiYWNrIHRvIHplcm8gYmVjYXVzZSBvdGhlcndpc2Ugd2UgZ2V0IE5BTiBmb3IgdW5kZWZpbmVkIGFuZCB0aGlzXG4gICAgLy8gbWVzc2VzIHVwIGV2ZXJ5dGhpbmdcbiAgICByZXR1cm4gKGEud21DdXJyZW50RGVza3RvcE5yIHx8IDApIC0gKGIud21DdXJyZW50RGVza3RvcE5yIHx8IDApO1xuICB9KTtcblxuICBmb3IgKGNvbnN0IHdpbiBvZiBzYXZlZFdpbmRvd0xpc3QpIHtcbiAgICBwcm9taXNlcy5wdXNoKHJlc3RvcmVXaW5kb3dQb3NpdGlvbih3aW4pKTtcbiAgICBwcm9taXNlcy5wdXNoKG1vdmVUb1dvcmtzcGFjZSh3aW4ud2luZG93SWQsIHdpbi53bUN1cnJlbnREZXNrdG9wTnIpKTtcblxuICAgIC8vIFRoZSBwcm9taXNlcyBhcmUgbm90IGV4ZWN1dGVkIHVudGlsIHRoZSBsYXN0IGl0ZW0gaXMgcmVhY2hlZCBvclxuICAgIC8vIHRoZSBkZXNrdG9wX25yIGlzIGRpZmZlcmVudCBmcm9tIHRoZSBwcmV2aW91cyBlbnRyeSBhbmQgd2hpY2ggY2FzZVxuICAgIC8vIHRoZSBhcHAgd2FpdHMgZm9yIHRob3NlIHRvIGZpbmlzaCBiZWZvcmUgY29udGludWluZyB0aGUgcHJvY2Vzc1xuICAgIGlmIChcbiAgICAgIHdpbi53bUN1cnJlbnREZXNrdG9wTnIgIT09IGxhc3RfZGVza3RvcF9uciB8fFxuICAgICAgd2luID09PSBzYXZlZFdpbmRvd0xpc3Quc2xpY2UoLTEpWzBdXG4gICAgKSB7XG4gICAgICBmb3IgKGNvbnN0IHByb21pc2Ugb2YgcHJvbWlzZXMpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBhd2FpdCBwcm9taXNlO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgX2NhdGNoR2VuZXJpY0VycihlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGFzdF9kZXNrdG9wX25yID0gd2luLndtQ3VycmVudERlc2t0b3BOcjtcbiAgICAgIHByb21pc2VzLmxlbmd0aCA9IDA7XG4gICAgfVxuICB9XG59XG4iXSwibmFtZXMiOlsiZnMubWtkaXJTeW5jIiwiZnMucmVhZGRpclN5bmMiLCJwYXRoLmpvaW4iLCJmcy5sc3RhdFN5bmMiLCJmcy5jb3B5RmlsZVN5bmMiLCJmcy51bmxpbmtTeW5jIiwiZnMucm1kaXJTeW5jIiwiZnMuZXhpc3RzU3luYyIsImZzLnJlYWRGaWxlU3luYyIsImZzLndyaXRlRmlsZVN5bmMiLCJfY2F0Y2hHZW5lcmljRXJyIiwiZnMudW5saW5rIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7U0FHZ0IsU0FBUyxDQUFDLE9BQU87SUFDL0IsSUFBSTtRQUNGQSxXQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDdkI7SUFBQyxPQUFPLEdBQUcsRUFBRTtRQUNa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
