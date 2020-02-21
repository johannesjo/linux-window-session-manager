import { mkdirSync as mkdirSync$1, readFileSync, writeFileSync, existsSync, unlinkSync, unlink } from 'fs';
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

var log = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return console.log.apply(console, args);
};

var cfg;
var CFG_DATA_DIR = _getUserHome() + "/.lwsm";
var CFG_FILE_PATH = CFG_DATA_DIR + "/config.json";
var SESSION_DATA_DIR = CFG_DATA_DIR + "/sessionData";
// INIT
// ------------
try {
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
    return str.split(", ");
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
        var locateStr = fileName.replace("crx_", "*") + "*.desktop";
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
                exec("cat /proc/" + win.wmPid + "/cmdline", function (error1, stdout1) {
                    if (error1 || !stdout1.length) {
                        console.error('ERR _guessFilePath()', error1);
                        reject(error1);
                    }
                    else {
                        var ent = stdout1.split('\u0000');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguZXMuanMiLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlsaXR5LnRzIiwiLi4vc3JjL2RlZmF1bHRDb25maWcudHMiLCIuLi9zcmMvbG9nLnRzIiwiLi4vc3JjL2NvbmZpZy50cyIsIi4uL3NyYy9pc0RlYnVnLnRzIiwiLi4vc3JjL3BhcnNlQ21kVG9TcGF3bi50cyIsIi4uL3NyYy94MTFXcmFwcGVyLnRzIiwiLi4vc3JjL290aGVyQ21kLnRzIiwiLi4vc3JjL21ldGFXcmFwcGVyLnRzIiwiLi4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGZzIGZyb20gXCJmc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gbWtkaXJTeW5jKGRpclBhdGgpIHtcbiAgdHJ5IHtcbiAgICBmcy5ta2RpclN5bmMoZGlyUGF0aCk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGlmIChlcnIuY29kZSAhPT0gXCJFRVhJU1RcIikge1xuICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbWtmaWxlU3luYyhmaWxlUGF0aCkge1xuICB0cnkge1xuICAgIGZzLndyaXRlRmlsZVN5bmMoZmlsZVBhdGgsIHsgZmxhZzogXCJ3eFwiIH0pO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBpZiAoZXJyLmNvZGUgIT09IFwiRUVYSVNUXCIpIHtcbiAgICAgIHRocm93IGVycjtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvcHlTeW5jKHNyYywgZGVzdCkge1xuICBpZiAoIWZzLmV4aXN0c1N5bmMoc3JjKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBjb25zdCBkYXRhID0gZnMucmVhZEZpbGVTeW5jKHNyYywgXCJ1dGYtOFwiKTtcbiAgZnMud3JpdGVGaWxlU3luYyhkZXN0LCBkYXRhKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlRGVlcCguLi5vYmplY3RzKSB7XG4gIGNvbnN0IGlzT2JqZWN0ID0gb2JqID0+IG9iaiAmJiB0eXBlb2Ygb2JqID09PSBcIm9iamVjdFwiO1xuXG4gIHJldHVybiBvYmplY3RzLnJlZHVjZSgocHJldiwgb2JqKSA9PiB7XG4gICAgT2JqZWN0LmtleXMob2JqKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICBjb25zdCBwVmFsID0gcHJldltrZXldO1xuICAgICAgY29uc3Qgb1ZhbCA9IG9ialtrZXldO1xuXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShwVmFsKSAmJiBBcnJheS5pc0FycmF5KG9WYWwpKSB7XG4gICAgICAgIHByZXZba2V5XSA9IHBWYWwuY29uY2F0KC4uLm9WYWwpO1xuICAgICAgfSBlbHNlIGlmIChpc09iamVjdChwVmFsKSAmJiBpc09iamVjdChvVmFsKSkge1xuICAgICAgICBwcmV2W2tleV0gPSBtZXJnZURlZXAocFZhbCwgb1ZhbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwcmV2W2tleV0gPSBvVmFsO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHByZXY7XG4gIH0sIHt9KTtcbn1cbiIsImV4cG9ydCBjb25zdCBERUZBVUxUX0NGRyA9IHtcbiAgR0lWRV9YMTFfVElNRV9USU1FT1VUOiA4MCxcbiAgUE9MTF9BTExfQVBQU19TVEFSVEVEX0lOVEVSVkFMOiAyMDAwLFxuICBQT0xMX0FMTF9NQVhfVElNRU9VVDogMTIwMDAwLFxuICBTQVZFX1NFU1NJT05fSU5fUFJFVFRZX0ZPUk1BVDogdHJ1ZSxcbiAgV01fQ0xBU1NfQU5EX0VYRUNVVEFCTEVfRklMRV9NQVA6IHtcbiAgICBcImdub21lLXRlcm1pbmFsLXNlcnZlci5Hbm9tZS10ZXJtaW5hbFwiOiBcImdub21lLXRlcm1pbmFsXCIsXG4gICAgXCJnb29nbGUtY2hyb21lLkdvb2dsZS1jaHJvbWVcIjogXCJnb29nbGUtY2hyb21lLmRlc2t0b3BcIixcbiAgICBcImJyYXZlLWJyb3dzZXIuQnJhdmUtYnJvd3NlclwiOiBcImJyYXZlLWJyb3dzZXIuZGVza3RvcFwiLFxuICAgIFwiTWFpbC5UaHVuZGVyYmlyZFwiOiBcInRodW5kZXJiaXJkLmRlc2t0b3BcIixcbiAgICBcIm5hdXRpbHVzLk5hdXRpbHVzXCI6IFwibmF1dGlsdXNcIixcbiAgICBcIm9yZy5nbm9tZS5OYXV0aWx1cy5PcmcuZ25vbWUuTmF1dGlsdXNcIjogXCJuYXV0aWx1c1wiLFxuICAgIFwiTmF2aWdhdG9yLkZpcmVmb3hcIjogXCJmaXJlZm94LmRlc2t0b3BcIixcbiAgICBcIk5hdmlnYXRvci5QYWxlXCI6IFwicGFsZW1vb24uZGVza3RvcFwiLFxuICAgIFwic2t5cGUuU2t5cGVcIjogXCJza3lwZWZvcmxpbnV4LmRlc2t0b3BcIixcbiAgICBcInN1bi1hd3QtWDExLVhGcmFtZVBlZXIuamV0YnJhaW5zLWlkZWFcIjogXCJqZXRicmFpbnMtaWRlYS5kZXNrdG9wXCIsXG4gICAgXCJWaXJ0dWFsQm94LlZpcnR1YWxCb3hcIjogXCJ2aXJ0dWFsYm94LmRlc2t0b3BcIixcbiAgICBcIlRlbGVncmFtLlRlbGVncmFtRGVza3RvcFwiOiBcInRlbGVncmFtLWRlc2t0b3BfdGVsZWdyYW1kZXNrdG9wLmRlc2t0b3BcIixcbiAgICBcInRlbGVncmFtLWRlc2t0b3AuVGVsZWdyYW1EZXNrdG9wXCI6IFwidGVsZWdyYW1kZXNrdG9wLmRlc2t0b3BcIixcbiAgICBcImtlZXBhc3N4Yy5rZWVwYXNzeGNcIjogXCJrZWVwYXNzeGNfa2VlcGFzc3hjLmRlc2t0b3BcIixcbiAgICBcInNsYWNrLlNsYWNrXCI6IFwiY29tLnNsYWNrLlNsYWNrLmRlc2t0b3BcIixcbiAgICBcInNpZ25hbC5TaWduYWxcIjogXCJzaWduYWwtZGVza3RvcC5kZXNrdG9wXCIsXG4gICAgXCJtaWNyb3NvZnQgdGVhbXMgLSBwcmV2aWV3Lk1pY3Jvc29mdCBUZWFtcyAtIFByZXZpZXdcIjogXCJ0ZWFtcy5kZXNrdG9wXCJcbiAgfSxcbiAgV01fQ0xBU1NfRVhDTFVTSU9OUzogW1xuICAgIFwiTi9BXCIsXG4gICAgXCJ0aWxkYS5UaWxkYVwiLFxuICAgIFwiUG9wdXAuZGVza3RvcFwiLFxuICAgIFwidXBkYXRlLW1hbmFnZXIuVXBkYXRlLW1hbmFnZXJcIixcbiAgICBcImRlc2t0b3Bfd2luZG93Lk5hdXRpbHVzXCIsXG4gICAgXCJlbGVjdHJvbi5FbGVjdHJvblwiLFxuICAgIFwiZ3Vha2UuTWFpbi5weVwiLFxuICAgIFwiZ25vbWUtc29mdHdhcmUuR25vbWUtc29mdHdhcmVcIlxuICBdLFxuICBXTV9NRVRBX01BUDoge1xuICAgIFwiV01fV0lORE9XX1JPTEUoU1RSSU5HKVwiOiBcIndtUm9sZVwiLFxuICAgIFwiV01fQ0xBU1MoU1RSSU5HKVwiOiBcIndtQ2xhc3NOYW1lXCIsXG4gICAgXCJfTkVUX1dNX1NUQVRFKEFUT00pXCI6IFwic3RhdGVzXCIsXG4gICAgXCJfTkVUX1dNX0RFU0tUT1AoQ0FSRElOQUwpXCI6IFwid21DdXJyZW50RGVza3RvcE5yXCIsXG4gICAgXCJXTV9OQU1FKFVURjhfU1RSSU5HKVwiOiBcIndtVGl0bGVcIixcbiAgICBcIl9ORVRfV01fUElEKENBUkRJTkFMKVwiOiBcIndtUGlkXCIsXG4gICAgXCJfTkVUX1dNX1dJTkRPV19UWVBFKEFUT00pXCI6IFwid21UeXBlXCIsXG4gICAgXCJfQkFNRl9ERVNLVE9QX0ZJTEUoU1RSSU5HKVwiOiBcImV4ZWN1dGFibGVGaWxlXCJcbiAgfSxcbiAgV01fTUVUQV9NQVBfTlVNQkVSX1RZUEVTOiBbXG4gICAgXCJfTkVUX1dNX1BJRChDQVJESU5BTClcIixcbiAgICBcIl9ORVRfV01fREVTS1RPUChDQVJESU5BTClcIlxuICBdLFxuICBERVNLVE9QX0ZJTEVfTE9DQVRJT05TOiBbXG4gICAgXCJ7aG9tZX0vLmxvY2FsL3NoYXJlL2FwcGxpY2F0aW9uc1wiLFxuICAgIFwie2hvbWV9Ly5nbm9tZS9hcHBzXCIsXG4gICAgXCIvdXNyL3NoYXJlL2FwcGxpY2F0aW9uc1wiLFxuICAgIFwiL3Vzci9sb2NhbC9zaGFyZS9hcHBsaWNhdGlvbnNcIixcbiAgICBcIi91c3Ivc2hhcmUvYXBwLWluc3RhbGxcIixcbiAgICBcIntob21lfS8uY29uZmlnL2F1dG9zdGFydFwiLFxuICAgIFwiL3Zhci9saWIvc25hcGQvZGVza3RvcC9hcHBsaWNhdGlvbnNcIixcbiAgICBcIi92YXIvbGliL2ZsYXRwYWsvYXBwXCIsXG4gICAgXCIvdmFyL2xpYi9mbGF0cGFrL2V4cG9ydHMvc2hhcmUvYXBwbGljYXRpb25zXCIsXG4gICAgXCIvc25hcC9iaW5cIlxuICBdXG59O1xuXG4iLCJleHBvcnQgY29uc3QgbG9nID0gKC4uLmFyZ3MpID0+IGNvbnNvbGUubG9nKC4uLmFyZ3MpO1xuIiwiaW1wb3J0IHsgbWVyZ2VEZWVwLCBta2RpclN5bmMgfSBmcm9tIFwiLi91dGlsaXR5XCI7XG5pbXBvcnQgeyBERUZBVUxUX0NGRyB9IGZyb20gXCIuL2RlZmF1bHRDb25maWdcIjtcbmltcG9ydCAqIGFzIGZzIGZyb20gXCJmc1wiO1xuaW1wb3J0IHsgbG9nIH0gZnJvbSBcIi4vbG9nXCI7XG5cbmxldCBjZmc7XG5cbmV4cG9ydCBjb25zdCBDRkdfREFUQV9ESVIgPSBfZ2V0VXNlckhvbWUoKSArIFwiLy5sd3NtXCI7XG5leHBvcnQgY29uc3QgQ0ZHX0ZJTEVfUEFUSCA9IENGR19EQVRBX0RJUiArIFwiL2NvbmZpZy5qc29uXCI7XG5leHBvcnQgY29uc3QgU0VTU0lPTl9EQVRBX0RJUiA9IENGR19EQVRBX0RJUiArIFwiL3Nlc3Npb25EYXRhXCI7XG5cbi8vIElOSVRcbi8vIC0tLS0tLS0tLS0tLVxudHJ5IHtcbiAgLy8gaWYgY29uZmlnIGlzIGFscmVhZHkgaW4gcGxhY2VcbiAgY29uc3QgZnJvbUZpbGUgPSBKU09OLnBhcnNlKGZzLnJlYWRGaWxlU3luYyhDRkdfRklMRV9QQVRILCBcInV0ZjhcIikpO1xuICBjZmcgPSBtZXJnZURlZXAoREVGQVVMVF9DRkcsIGZyb21GaWxlKTtcbn0gY2F0Y2ggKGUpIHtcbiAgbG9nKFxuICAgIFwibHdzbTogbm8gY29uZmlnIGZpbGUgcHJlc2VudCBvciBpdCBjb250YWlucyBpbnZhbGlkIGpzb24uIENyZWF0aW5nIG5ldyBvbmUuLi5cIlxuICApO1xuXG4gIC8vIGlmIHRoZXJlIGlzIG5vIGNvbmZpZyB5ZXQgbG9hZCBkZWZhdWx0IGNmZyBhbmQgY3JlYXRlIGZpbGVzIGFuZCBkaXJzXG4gIGNmZyA9IERFRkFVTFRfQ0ZHO1xuXG4gIC8vIHNhdmUgZXhlY3V0YWJsZSBwYXRocyB0byBjZmdcbiAgY2ZnLkNNRF9KU0ZJTEVfUEFUSCA9IF9fZGlybmFtZSArIFwiLy4uL2NtZC5qc1wiO1xuICBjZmcuSlNGSUxFX0lOREVYX1BBVEggPSBfX2Rpcm5hbWUgKyBcIi9pbmRleC5qc1wiO1xuXG4gIG1rZGlyU3luYyhDRkdfREFUQV9ESVIpO1xuICBta2RpclN5bmMoU0VTU0lPTl9EQVRBX0RJUik7XG5cbiAgLy8gd3JpdGUgY29uZmlnIHRvIHVzZXIgZGlyXG4gIGZzLndyaXRlRmlsZVN5bmMoQ0ZHX0ZJTEVfUEFUSCwgSlNPTi5zdHJpbmdpZnkoY2ZnLCBudWxsLCAyKSwgXCJ1dGY4XCIpO1xufVxuXG4vLyBhbHNvIG1ha2UgZGF0YSBkaXJzIGFjY2Vzc2libGUgdG8gdGhlIG91dHNpZGVcbmNmZy5EQVRBX0RJUiA9IENGR19EQVRBX0RJUjtcbmNmZy5TRVNTSU9OX0RBVEFfRElSID0gU0VTU0lPTl9EQVRBX0RJUjtcblxuZXhwb3J0IGNvbnN0IENGRyA9IGNmZztcblxuZnVuY3Rpb24gX2dldFVzZXJIb21lKCkge1xuICByZXR1cm4gcHJvY2Vzcy5lbnZbcHJvY2Vzcy5wbGF0Zm9ybSA9PT0gXCJ3aW4zMlwiID8gXCJVU0VSUFJPRklMRVwiIDogXCJIT01FXCJdO1xufVxuIiwiZXhwb3J0IGNvbnN0IElTX0RFQlVHID0gcHJvY2Vzcy5hcmd2LmluZGV4T2YoXCItLWRlYnVnXCIpID4gLTE7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0IGNvbnN0IHBhcnNlQ21kQXJncyA9IGNtZCA9PiB7XG4gIGxldCBjbWRBbGxTcGxpdCA9IGNtZC5zcGxpdCgvIC8pO1xuICBsZXQgbWFpbkNvbW1hbmQgPSBjbWRBbGxTcGxpdFswXTtcbiAgbGV0IGFyZ3MgPSBbXTtcbiAgY21kQWxsU3BsaXQubWFwKGZ1bmN0aW9uKHMsIGkpIHtcbiAgICBpZiAoaSAhPT0gMCkge1xuICAgICAgYXJnc1tpIC0gMV0gPSBjbWRBbGxTcGxpdFtpXTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gW21haW5Db21tYW5kLCBfbWVyZ2VRdW90ZWRTdHJpbmdQYXJhbXMoYXJncyldO1xufTtcblxuZnVuY3Rpb24gX21lcmdlUXVvdGVkU3RyaW5nUGFyYW1zKGFyZ3MpIHtcbiAgY29uc3QgbmV3QXJncyA9IFtdO1xuICBsZXQgaXNJblF1b3RhdGlvbiA9IGZhbHNlO1xuICBsZXQgY3VycmVudFF1b3RhdGlvbkFyZztcblxuICAvLyBUT0RPIG1ha2UgaXQgd29yayB3aXRoIG1vcmUgZGlmZmVyZW50IHF1b3RhdGlvbiB0eXBlc1xuICBhcmdzLmZvckVhY2goYXJnID0+IHtcbiAgICAvLyBtYXRjaCBxdW90YXRpb24gZW5kXG4gICAgaWYgKGFyZy5tYXRjaCgvJyQvKSkge1xuICAgICAgY3VycmVudFF1b3RhdGlvbkFyZyArPSBcIiBcIiArIGFyZy5zbGljZSgwLCBhcmcubGVuZ3RoIC0gMSk7XG4gICAgICBuZXdBcmdzLnB1c2goY3VycmVudFF1b3RhdGlvbkFyZyk7XG4gICAgICBjdXJyZW50UXVvdGF0aW9uQXJnID0gdW5kZWZpbmVkO1xuICAgICAgaXNJblF1b3RhdGlvbiA9IGZhbHNlO1xuICAgIH1cbiAgICAvLyBtYXRjaCBxdW90YXRpb24gc3RhcnRcbiAgICBlbHNlIGlmIChhcmcubWF0Y2goL14nLykpIHtcbiAgICAgIGlzSW5RdW90YXRpb24gPSB0cnVlO1xuICAgICAgY3VycmVudFF1b3RhdGlvbkFyZyA9IGFyZy5zdWJzdHIoMSwgYXJnLmxlbmd0aCk7XG4gICAgfVxuICAgIC8vIHdoaWxlIGluIHF1b3RhdGlvblxuICAgIGVsc2UgaWYgKGlzSW5RdW90YXRpb24pIHtcbiAgICAgIGN1cnJlbnRRdW90YXRpb25BcmcgKz0gXCIgXCIgKyBhcmc7XG4gICAgfSBlbHNlIGlmIChhcmcgIT09IFwiXCIpIHtcbiAgICAgIG5ld0FyZ3MucHVzaChhcmcpO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIG5ld0FyZ3M7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgbG9nIH0gZnJvbSBcIi4vbG9nXCI7XG5pbXBvcnQgeyBDRkcgfSBmcm9tIFwiLi9jb25maWdcIjtcblxuY29uc3QgeDExID0gcmVxdWlyZShcIngxMVwiKTtcblxuZXhwb3J0IGxldCBYO1xubGV0IHJvb3Q7XG5sZXQgZGlzcGxheTtcblxuLy8gZXhwb3J0IGNvbnN0IGdldFdpbmRvd0luZm8gPSB3cmFwWDExKF9nZXRXaW5kb3dJbmZvKTtcbmV4cG9ydCBjb25zdCBnZXRYID0gKCkgPT4gWDtcblxuZnVuY3Rpb24gY2F0Y2hHZW5lcmljRXJyKGVycikge1xuICBjb25zb2xlLmVycm9yKFwieDExV3JhcHBlcjogXCIsIGVyciwgZXJyLnN0YWNrKTtcbn1cblxubGV0IGlzQ2xpZW50SW5pdGlhbGl6ZWQgPSBmYWxzZTtcbmxldCBpbml0UHJvbWlzZTtcblxuZXhwb3J0IGZ1bmN0aW9uIGluaXRYMTEoKTogUHJvbWlzZTxhbnk+IHtcbiAgaWYgKGlzQ2xpZW50SW5pdGlhbGl6ZWQpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cbiAgaWYgKGluaXRQcm9taXNlKSB7XG4gICAgcmV0dXJuIGluaXRQcm9taXNlO1xuICB9XG4gIGluaXRQcm9taXNlID0gbmV3IFByb21pc2UoKGZ1bGZpbGwsIHJlamVjdCkgPT4ge1xuICAgIHgxMVxuICAgICAgLmNyZWF0ZUNsaWVudCgoZXJyLCBkaXNwbGF5SW4pID0+IHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRpc3BsYXkgPSBkaXNwbGF5SW47XG4gICAgICAgICAgWCA9IGRpc3BsYXkuY2xpZW50O1xuXG4gICAgICAgICAgcm9vdCA9IGRpc3BsYXkuc2NyZWVuWzBdLnJvb3Q7XG4gICAgICAgICAgaXNDbGllbnRJbml0aWFsaXplZCA9IHRydWU7XG4gICAgICAgICAgZnVsZmlsbCgpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLm9uKFwiZXJyb3JcIiwgZXJyID0+IHtcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgfSk7XG4gIH0pLmNhdGNoKGNhdGNoR2VuZXJpY0Vycik7XG4gIHJldHVybiBpbml0UHJvbWlzZTtcbn1cblxuLy8gTUVUSE9EU1xuLy8gLS0tLS0tLVxuZXhwb3J0IGZ1bmN0aW9uIGdldERpc3BsYXlzKCk6IGFueVtdIHtcbiAgaWYgKCFkaXNwbGF5KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiWDExIG5vdCBpbml0aWFsaXplZCAvIE5vIHNjcmVlbiBhdmFpbGFibGVcIik7XG4gIH1cbiAgcmV0dXJuIGRpc3BsYXkuc2NyZWVuO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0V2luZG93R2VvbWV0cnkod2luSWQpIHtcbiAgY29uc3QgZ2VvOiBhbnkgPSB7fTtcblxuICByZXR1cm4gbmV3IFByb21pc2UoKGZ1bGZpbGwsIHJlamVjdCkgPT4ge1xuICAgIFguVHJhbnNsYXRlQ29vcmRpbmF0ZXMod2luSWQsIHJvb3QsIDAsIDAsIChlcnIsIHJlcykgPT4ge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGdlby54ID0gcmVzLmRlc3RYO1xuICAgICAgICBnZW8ueSA9IHJlcy5kZXN0WTtcblxuICAgICAgICBYLkdldEdlb21ldHJ5KHdpbklkLCAoZXJyLCByZXMpID0+IHtcbiAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZ2VvLndpZHRoID0gcmVzLndpZHRoO1xuICAgICAgICAgICAgZ2VvLmhlaWdodCA9IHJlcy5oZWlnaHQ7XG4gICAgICAgICAgICBmdWxmaWxsKGdlbyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSkuY2F0Y2goY2F0Y2hHZW5lcmljRXJyKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEFjdGl2ZVdpbmRvd0lkcygpOiBQcm9taXNlPHN0cmluZ1tdPiB7XG4gIGNvbnN0IFBST1BfTkFNRSA9IFwiX05FVF9DTElFTlRfTElTVFwiO1xuICBjb25zdCBwcm9wSWQgPSBhd2FpdCBfZ2V0UHJvcGVydHlJZEJ5TmFtZShyb290LCBQUk9QX05BTUUpO1xuICBjb25zdCBpZFN0ciA9IGF3YWl0IGdldFByb3Aocm9vdCwgcHJvcElkIGFzIG51bWJlcik7XG4gIHJldHVybiBfcGFyc2VXaW5kb3dJZHMoaWRTdHIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVzdG9yZVdpbmRvd1Bvc2l0aW9uKHdpbikge1xuICBsb2coJ1Jlc3RvcmluZyB3aW5kb3cgcG9zaXRpb24gZm9yIFwiJyArIHdpbi53bUNsYXNzTmFtZSArICdcIicpO1xuICBjb25zdCBTVEFURVNfVE9fUkVTRVQgPSBbXG4gICAgXCJfTkVUX1dNX1NUQVRFX01BWElNSVpFRF9WRVJUXCIsXG4gICAgXCJfTkVUX1dNX1NUQVRFX01BWElNSVpFRF9IT1JaXCJcbiAgXTtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChmdWxmaWxsLCByZWplY3QpID0+IHtcbiAgICBzZXRTdGF0ZSh3aW4ud2luZG93SWQsIFwicmVtb3ZlXCIsIFNUQVRFU19UT19SRVNFVClcbiAgICAgIC5jYXRjaChyZWplY3QpXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIFguTW92ZVJlc2l6ZVdpbmRvdyh3aW4ud2luZG93SWQsIHdpbi54LCB3aW4ueSwgd2luLndpZHRoLCB3aW4uaGVpZ2h0KTtcbiAgICAgICAgc2V0U3RhdGUod2luLndpbmRvd0lkLCBcImFkZFwiLCB3aW4uc3RhdGVzKVxuICAgICAgICAgIC5jYXRjaChyZWplY3QpXG4gICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgZnVsZmlsbCgpO1xuICAgICAgICAgIH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChyZWplY3QpO1xuICB9KS5jYXRjaChjYXRjaEdlbmVyaWNFcnIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xvc2VXaW5kb3cod2luSWQpIHtcbiAgcmV0dXJuIF9zZW5kWDExQ2xpZW50TWVzc2FnZSh3aW5JZCwgXCJfTkVUX0NMT1NFX1dJTkRPV1wiKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1vdmVUb1dvcmtzcGFjZSh3aW5JZCwgd29ya1NwYWNlTnIpIHtcbiAgLy8gTk9URTogaWYgaXQgZG9lc24ndCB3b3JrIHdlIG1pZ2h0IGFsc28gd2FudCB0byB1c2UgX1dJTl9XT1JLU1BBQ0VcbiAgcmV0dXJuIF9zZW5kWDExQ2xpZW50TWVzc2FnZSh3aW5JZCwgXCJfTkVUX1dNX0RFU0tUT1BcIiwgW1xuICAgIHtcbiAgICAgIHZhbHVlOiB3b3JrU3BhY2VOclxuICAgIH1cbiAgXSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnb1RvVmlld3BvcnQoeCwgeSkge1xuICByZXR1cm4gX3NlbmRYMTFDbGllbnRNZXNzYWdlKHJvb3QsIFwiX05FVF9ERVNLVE9QX1ZJRVdQT1JUXCIsIFtcbiAgICB7IHZhbHVlOiB4IH0sXG4gICAgeyB2YWx1ZTogeSB9XG4gIF0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0U3RhdGUod2lkLCBhY3Rpb25TdHIsIHN0YXRlc1RvSGFuZGxlKSB7XG4gIGNvbnN0IEFDVElPTlNfTUFQID0ge1xuICAgIHJlbW92ZTogMCxcbiAgICBhZGQ6IDEsXG4gICAgdG9nZ2xlOiAyXG4gIH07XG4gIGNvbnN0IGFjdGlvbiA9IEFDVElPTlNfTUFQW2FjdGlvblN0cl07XG4gIGxldCBwcm9wZXJ0aWVzOiBhbnlbXSA9IFt7IHZhbHVlOiBhY3Rpb24gfV07XG5cbiAgLy8gYWxsIHByb3BlcnRpZXMgbmVlZCB0byBiZSBsb29rZWQgdXAgZm9yIHRoZWlyIGF0b20gaWRcbiAgaWYgKEFycmF5LmlzQXJyYXkoc3RhdGVzVG9IYW5kbGUpICYmIHN0YXRlc1RvSGFuZGxlLmxlbmd0aCA+IDApIHtcbiAgICBzdGF0ZXNUb0hhbmRsZS5mb3JFYWNoKHN0YXRlUHJvcGVydHkgPT4ge1xuICAgICAgcHJvcGVydGllcy5wdXNoKHtcbiAgICAgICAgaXNBdG9tOiB0cnVlLFxuICAgICAgICB2YWx1ZTogc3RhdGVQcm9wZXJ0eVxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIF9zZW5kWDExQ2xpZW50TWVzc2FnZSh3aWQsIFwiX05FVF9XTV9TVEFURVwiLCBwcm9wZXJ0aWVzKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cbn1cblxuY29uc3QgUFJPUFNfVE9fR0VUID0gW1xuICBcIldNX0NMQVNTXCIsXG4gIFwiX05FVF9XTV9TVEFURVwiLFxuICBcIl9ORVRfV01fREVTS1RPUFwiLFxuICBcIldNX05BTUVcIixcbiAgXCJfTkVUX1dNX1BJRFwiLFxuICBcIl9ORVRfV01fV0lORE9XX1RZUEVcIixcbiAgXCJfQkFNRl9ERVNLVE9QX0ZJTEVcIlxuXTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFdpbmRvd0luZm8od2lkKTogUHJvbWlzZTxhbnk+IHtcbiAgLy8gWC5HZXRHZW9tZXRyeSh3aWQsIGZ1bmN0aW9uIChlcnIsIGNsaWVudEdlb20pIHtcbiAgLy8gICBjb25zb2xlLmxvZyhcIndpbmRvdyBnZW9tZXRyeTogXCIsIGNsaWVudEdlb20pO1xuICAvLyB9KTtcblxuICBjb25zdCBwcm9wczogYW55W10gPSBhd2FpdCBfeENiVG9Qcm9taXNlKFguTGlzdFByb3BlcnRpZXMsIHdpZCk7XG5cbiAgY29uc3QgcHJvbWlzZXMgPSBwcm9wcy5tYXAoYXN5bmMgZnVuY3Rpb24ocCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBwcm9wTmFtZSA9IGF3YWl0IF94Q2JUb1Byb21pc2UoWC5HZXRBdG9tTmFtZSwgcCk7XG4gICAgICAgIGlmIChQUk9QU19UT19HRVQuaW5jbHVkZXMocHJvcE5hbWUpKSB7XG4gICAgICAgICAgY29uc3QgcHJvcFZhbCA9IGF3YWl0IF94Q2JUb1Byb21pc2UoXG4gICAgICAgICAgICBYLkdldFByb3BlcnR5LFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIHdpZCxcbiAgICAgICAgICAgIHAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDEwMDAwMDAwXG4gICAgICAgICAgKTtcbiAgICAgICAgICBjb25zdCB0eXBlTmFtZSA9IGF3YWl0IF94Q2JUb1Byb21pc2UoWC5HZXRBdG9tTmFtZSwgcHJvcFZhbC50eXBlKTtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhwcm9wVmFsLCB0eXBlTmFtZSwgcHJvcE5hbWUpO1xuICAgICAgICAgIGNvbnN0IGRlY29kZWREYXRhID0gYXdhaXQgX2RlY29kZVByb3BlcnR5KHR5cGVOYW1lLCBwcm9wVmFsLmRhdGEpO1xuICAgICAgICAgIHJlc29sdmUocHJvcE5hbWUgKyBcIihcIiArIHR5cGVOYW1lICsgXCIpID0gXCIgKyBkZWNvZGVkRGF0YSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzb2x2ZShcIlwiKTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICByZWplY3QoZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xuXG4gIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbihyZXN1bHRzID0+IHtcbiAgICByZXR1cm4gcmVzdWx0cy5qb2luKFwiXFxuXCIpO1xuICB9KTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFByb3AoaWQgPSByb290LCBwcm9wSWQ6IG51bWJlcik6IFByb21pc2U8YW55PiB7XG4gIGNvbnN0IHByb3BWYWwgPSBhd2FpdCBfeENiVG9Qcm9taXNlKFxuICAgIFguR2V0UHJvcGVydHksXG4gICAgMCxcbiAgICBpZCxcbiAgICBwcm9wSWQsXG4gICAgMCxcbiAgICAwLFxuICAgIDEwMDAwMDAwXG4gICk7XG4gIGNvbnN0IHR5cGVOYW1lID0gYXdhaXQgX3hDYlRvUHJvbWlzZShYLkdldEF0b21OYW1lLCBwcm9wVmFsLnR5cGUpO1xuICByZXR1cm4gYXdhaXQgX2RlY29kZVByb3BlcnR5KHR5cGVOYW1lLCBwcm9wVmFsLmRhdGEpO1xufVxuXG4vLyBIRUxQRVJcbi8vIC0tLS0tLVxuZnVuY3Rpb24gX3hDYlRvUHJvbWlzZShmbiwgLi4uYXJncyk6IGFueSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgoZnVsZmlsbCwgcmVqZWN0KSA9PiB7XG4gICAgZm4uYXBwbHkoWCwgW1xuICAgICAgLi4uYXJncyxcbiAgICAgIChlcnIsIHJlcykgPT4ge1xuICAgICAgICByZXR1cm4gZXJyID8gcmVqZWN0KGVycikgOiBmdWxmaWxsKHJlcyk7XG4gICAgICB9XG4gICAgXSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBfY291bnRlcihpbml0aWFsVmFsLCBtb2RpZmllcikge1xuICAvLyB0byBzdGFydCBhdCB2YWwgd2UgbmVlZCB0byBzdWJ0cmFjdCB0aGUgbW9kaWZpZXIgZmlyc3RcbiAgbGV0IHZhbCA9IGluaXRpYWxWYWwgLSBtb2RpZmllcjtcbiAgcmV0dXJuICgpID0+IHtcbiAgICB2YWwgKz0gbW9kaWZpZXI7XG4gICAgcmV0dXJuIHZhbDtcbiAgfTtcbn1cblxuZnVuY3Rpb24gX2dldEF0b21zKGxpc3QsIGNiKSB7XG4gIGNvbnN0IHJlcyA9IHt9O1xuICBjb25zdCBnZXRBdG9tID0gKCkgPT4ge1xuICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIGNiKG51bGwsIHJlcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG5hbWUgPSBsaXN0LnNoaWZ0KCk7XG4gICAgICBYLkludGVybkF0b20oZmFsc2UsIG5hbWUsIChlcnIsIGF0b20pID0+IHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIHJldHVybiBjYihlcnIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc1tuYW1lXSA9IGF0b207XG4gICAgICAgICAgZ2V0QXRvbSgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG4gIGdldEF0b20oKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gX2dldFByb3BlcnR5SWRCeU5hbWUoXG4gIHdpZDogc3RyaW5nLFxuICBuYW1lVG9HZXQ6IHN0cmluZ1xuKTogUHJvbWlzZTxudW1iZXI+IHtcbiAgY29uc3QgcHJvcHM6IGFueVtdID0gYXdhaXQgX3hDYlRvUHJvbWlzZShYLkxpc3RQcm9wZXJ0aWVzLCB3aWQpO1xuICBjb25zdCBwcm9taXNlcyA9IHByb3BzLm1hcChhc3luYyBmdW5jdGlvbihwKSB7XG4gICAgY29uc3QgcHJvcE5hbWUgPSBhd2FpdCBfeENiVG9Qcm9taXNlKFguR2V0QXRvbU5hbWUsIHApO1xuICAgIGlmIChuYW1lVG9HZXQgPT09IHByb3BOYW1lKSB7XG4gICAgICByZXR1cm4gcDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfSk7XG5cbiAgY29uc3QgcmVzID0gYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuICByZXR1cm4gcmVzLmZpbmQoaXRlbSA9PiBpdGVtID4gMCk7XG59XG5cbmZ1bmN0aW9uIF9zZW5kWDExQ2xpZW50TWVzc2FnZShcbiAgd2lkLFxuICBldmVudE5hbWUsXG4gIGV2ZW50UHJvcGVydGllcyA9IFtdLFxuICBvcHRpb25hbEV2ZW50TWFzaz9cbikge1xuICBpZiAoZXZlbnRQcm9wZXJ0aWVzLmxlbmd0aCA+IDQpIHtcbiAgICB0aHJvdyBcIm9ubHkgc3VwcG9ydHMgNCBwcm9wZXJ0aWVzIGF0IG9uY2UgbWF4XCI7XG4gIH1cblxuICBjb25zdCBvZmZzZXRDb3VudGVyID0gX2NvdW50ZXIoNCwgNCk7XG4gIGNvbnN0IGV2ZW50TWFzayA9IG9wdGlvbmFsRXZlbnRNYXNrIHx8IHgxMS5ldmVudE1hc2suU3Vic3RydWN0dXJlUmVkaXJlY3Q7XG5cbiAgLy8gY3JlYXRlIGF0b21zIHRvIGxvb2sgdXBcbiAgbGV0IGF0b21zTGlzdCA9IFtdO1xuICBhdG9tc0xpc3QucHVzaChldmVudE5hbWUpO1xuICBldmVudFByb3BlcnRpZXMuZm9yRWFjaChldmVudFByb3BlcnR5ID0+IHtcbiAgICBpZiAoZXZlbnRQcm9wZXJ0eS5pc0F0b20pIHtcbiAgICAgIGF0b21zTGlzdC5wdXNoKGV2ZW50UHJvcGVydHkudmFsdWUpO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gc3RhcnQgYnVmZmVyIGlucHV0XG4gIGNvbnN0IGRhdGEgPSBuZXcgQnVmZmVyKDMyKTtcbiAgZGF0YS5maWxsKDApO1xuICBkYXRhLndyaXRlSW50OCgzMywgMCk7IC8vIDMzID0gQ2xpZW50TWVzc2FnZVxuICBkYXRhLndyaXRlSW50OCgzMiwgMSk7IC8vIGZvcm1hdFxuICBkYXRhLndyaXRlVUludDMyTEUod2lkLCBvZmZzZXRDb3VudGVyKCkpO1xuXG4gIHJldHVybiBuZXcgUHJvbWlzZSgoZnVsZmlsbCwgcmVqZWN0KSA9PiB7XG4gICAgX2dldEF0b21zKGF0b21zTGlzdCwgKGVyciwgYXRvbXMpID0+IHtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgIHRocm93IGVycjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRhdGEud3JpdGVVSW50MzJMRShhdG9tc1tldmVudE5hbWVdLCBvZmZzZXRDb3VudGVyKCkpO1xuXG4gICAgICAgIGV2ZW50UHJvcGVydGllcy5mb3JFYWNoKGV2ZW50UHJvcGVydHkgPT4ge1xuICAgICAgICAgIGlmIChldmVudFByb3BlcnR5LmlzQXRvbSkge1xuICAgICAgICAgICAgZGF0YS53cml0ZVVJbnQzMkxFKGF0b21zW2V2ZW50UHJvcGVydHkudmFsdWVdLCBvZmZzZXRDb3VudGVyKCkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkYXRhLndyaXRlVUludDMyTEUoZXZlbnRQcm9wZXJ0eS52YWx1ZSwgb2Zmc2V0Q291bnRlcigpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxldCBzb3VyY2VJbmRpY2F0aW9uID0gMTtcbiAgICAgICAgZGF0YS53cml0ZVVJbnQzMkxFKHNvdXJjZUluZGljYXRpb24sIG9mZnNldENvdW50ZXIoKSk7XG5cbiAgICAgICAgWC5TZW5kRXZlbnQocm9vdCwgMCwgZXZlbnRNYXNrLCBkYXRhKTtcblxuICAgICAgICAvLyB3ZSBuZWVkIGEgbGl0dGxlIHRpbWUgZm9yIHRoZSBidWZmZXIgdG8gYmUgcHJvY2Vzc2VkXG4gICAgICAgIHNldFRpbWVvdXQoZnVsZmlsbCwgQ0ZHLkdJVkVfWDExX1RJTUVfVElNRU9VVCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pLmNhdGNoKGNhdGNoR2VuZXJpY0Vycik7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIF9kZWNvZGVQcm9wZXJ0eSh0eXBlLCBkYXRhKTogUHJvbWlzZTxhbnk+IHtcbiAgdHJ5IHtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgXCJTVFJJTkdcIjoge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBbXTtcbiAgICAgICAgbGV0IHMgPSBcIlwiO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICBpZiAoZGF0YVtpXSA9PSAwKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaChzKTtcbiAgICAgICAgICAgIHMgPSBcIlwiO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIHMgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShkYXRhW2ldKTtcbiAgICAgICAgfVxuICAgICAgICByZXN1bHQucHVzaChzKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdC5tYXAocXVvdGl6ZSkuam9pbihcIiwgXCIpO1xuICAgICAgfVxuICAgICAgY2FzZSBcIkFUT01cIjpcbiAgICAgICAgaWYgKGRhdGEubGVuZ3RoID4gMzIpIHtcbiAgICAgICAgICByZXR1cm4gXCJMT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PTkdcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHByb21pc2VzID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkgKz0gNCkge1xuICAgICAgICAgIGNvbnN0IGEgPSBkYXRhLnVucGFjayhcIkxcIiwgaSlbMF07XG4gICAgICAgICAgcHJvbWlzZXMucHVzaChfeENiVG9Qcm9taXNlKFguR2V0QXRvbU5hbWUsIGEpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICByZXR1cm4gcmVzLmpvaW4oXCIsIFwiKTtcbiAgICAgICAgfSk7XG5cbiAgICAgIGNhc2UgXCJDQVJESU5BTFwiOlxuICAgICAgY2FzZSBcIklOVEVHRVJcIjoge1xuICAgICAgICBjb25zdCByZXMgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSArPSA0KSB7XG4gICAgICAgICAgcmVzLnB1c2goZGF0YS51bnBhY2soXCJMXCIsIGkpWzBdKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzLmpvaW4oXCIsIFwiKTtcbiAgICAgIH1cbiAgICAgIGNhc2UgXCJXSU5ET1dcIjpcbiAgICAgICAgY29uc3QgcmVzID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkgKz0gNCkge1xuICAgICAgICAgIHJlcy5wdXNoKGRhdGEudW5wYWNrKFwiTFwiLCBpKVswXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICBcIndpbmRvdyBpZCMgXCIgK1xuICAgICAgICAgIHJlc1xuICAgICAgICAgICAgLm1hcChuID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIFwiMHhcIiArIG4udG9TdHJpbmcoMTYpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5qb2luKFwiLCBcIilcbiAgICAgICAgKTtcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIFwiV1RGIFwiICsgdHlwZTtcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjb25zb2xlLmxvZyh0eXBlLCBkYXRhKTtcbiAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgIHRocm93IG5ldyBFcnJvcihlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBxdW90aXplKGkpIHtcbiAgcmV0dXJuICdcIicgKyBpICsgJ1wiJztcbn1cblxuZnVuY3Rpb24gX3BhcnNlV2luZG93SWRzKHN0ckluKTogc3RyaW5nW10ge1xuICBjb25zdCBzdHIgPSBzdHJJbi5yZXBsYWNlKFwid2luZG93IGlkIyBcIiwgXCJcIik7XG4gIHJldHVybiBzdHIuc3BsaXQoXCIsIFwiKTtcbn1cblxuLy9jb25zdCB0ZXN0Rm4gPSB3cmFwWDExKGNsb3NlV2luZG93KTtcbi8vdGVzdEZuKCcweDA0YTAwMDAxJykudGhlbigoZ2VvKSA9PiB7XG4vL30pO1xuXG4vL2NvbnN0IHRlc3RGbiA9IHdyYXBYMTEobW92ZVRvV29ya3NwYWNlKTtcbi8vdGVzdEZuKCcweDA0ZTAwMDAxICcsIDIpO1xuXG4vL2NvbnN0IHRlc3RGblggPSB3cmFwWDExKHJlc3RvcmVXaW5kb3dQb3NpdGlvbik7XG4vL3Rlc3RGblgoe1xuLy8gIHdpbmRvd0lkOiAnMHgwNGEwMDAwMScsXG4vLyAgeDogMCxcbi8vICB5OiAwLFxuLy8gIHdpZHRoOiA1MDAsXG4vLyAgaGVpZ2h0OiA1MDAsXG4vLyAgc3RhdGVzOiBbXG4vLyAgICAnX05FVF9XTV9TVEFURV9NQVhJTUlaRURfVkVSVCdcbi8vICBdXG4vL30pO1xuXG4vL2NvbnN0IHRlc3RGbjIgPSB3cmFwWDExKHNldFN0YXRlKTtcbi8vdGVzdEZuMignMHgwNGEwMDAwMScsICdyZW1vdmUnLCBbJ19ORVRfV01fU1RBVEVfTUFYSU1JWkVEX1ZFUlQnLCAnX05FVF9XTV9TVEFURV9NQVhJTUlaRURfSE9SWicsICdfTkVUX1dNX1NUQVRFX0ZVTExTQ1JFRU4nXSlcbi8vICAudGhlbigocmVzKSA9PiB7XG4vLyAgICBjb25zb2xlLmxvZygnTk9STUFMJywgcmVzKTtcbi8vICB9KTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQge0lTX0RFQlVHfSBmcm9tIFwiLi9pc0RlYnVnXCI7XG5pbXBvcnQge0NGR30gZnJvbSBcIi4vY29uZmlnXCI7XG5pbXBvcnQge3NwYXdufSBmcm9tIFwiY2hpbGRfcHJvY2Vzc1wiO1xuaW1wb3J0IHtwYXJzZUNtZEFyZ3N9IGZyb20gXCIuL3BhcnNlQ21kVG9TcGF3blwiO1xuaW1wb3J0IHtXaW5PYmosIFdpbk9iaklkT25seX0gZnJvbSBcIi4vbW9kZWxcIjtcbmltcG9ydCB7bG9nfSBmcm9tIFwiLi9sb2dcIjtcbmltcG9ydCB7Z2V0QWN0aXZlV2luZG93SWRzLCBnZXREaXNwbGF5cywgZ2V0V2luZG93SW5mb30gZnJvbSBcIi4veDExV3JhcHBlclwiO1xuXG4vLyA1MDBrYlxuY29uc3QgTUFYX0JVRkZFUiA9IDEwMjQgKiA1MDA7XG5jb25zdCBFWEVDX09QVFMgPSB7XG4gIG1heEJ1ZmZlcjogTUFYX0JVRkZFUlxufTtcblxuLy8gZGlzcGxheVxuLy8gLS0tLS0tLVxuZXhwb3J0IGZ1bmN0aW9uIGdldENvbm5lY3RlZERpc3BsYXlzSWQoKTogc3RyaW5nIHtcbiAgY29uc3QgZGlzcGxheXMgPSBnZXREaXNwbGF5cygpO1xuICByZXR1cm4gZGlzcGxheXNcbiAgICAubWFwKHNjcmVlbiA9PiBzY3JlZW4ucGl4ZWxfd2lkdGggKyBcInhcIiArIHNjcmVlbi5waXhlbF9oZWlnaHQpXG4gICAgLmpvaW4oXCI7XCIpO1xufVxuXG4vLyBPdGhlclxuLy8gLS0tLS0tLS1cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRBZGRpdGlvbmFsTWV0YURhdGFGb3JXaW4oXG4gIHdpbjogV2luT2JqSWRPbmx5XG4pOiBQcm9taXNlPFdpbk9iaj4ge1xuICBjb25zdCBzdGRvdXQgPSBhd2FpdCBnZXRXaW5kb3dJbmZvKHdpbi53aW5kb3dJZCk7XG4gIGNvbnN0IGxpbmVzID0gc3Rkb3V0LnNwbGl0KFwiXFxuXCIpO1xuICBjb25zdCB3aW5Db3B5OiBhbnkgPSB7Li4ud2lufTtcblxuICBsaW5lcy5mb3JFYWNoKGxpbmUgPT4ge1xuICAgIGNvbnN0IHdvcmRzID0gbGluZS5zcGxpdChcIiBcIik7XG4gICAgY29uc3QgcHJvcGVydHlOYW1lID0gd29yZHNbMF07XG5cbiAgICAvLyByZW1vdmUgcHJvcGVydHkgbmFtZSBhbmQgXCI9XCJcbiAgICB3b3Jkcy5zcGxpY2UoMCwgMik7XG4gICAgY29uc3QgdmFsdWUgPSB3b3Jkcy5qb2luKFwiIFwiKTtcbiAgICBjb25zdCBwcm9wZXJ0eU5hbWVGcm9tTWFwID0gQ0ZHLldNX01FVEFfTUFQW3Byb3BlcnR5TmFtZV07XG4gICAgLy8gcGFyc2Ugd21DbGFzc05hbWVcbiAgICBpZihwcm9wZXJ0eU5hbWUgPT09IFwiV01fQ0xBU1MoU1RSSU5HKVwiKSB7XG4gICAgICBjb25zdCBwcm9wZXJ0eU5hbWVGcm9tTWFwID0gQ0ZHLldNX01FVEFfTUFQW3Byb3BlcnR5TmFtZV07XG4gICAgICBjb25zdCBjbGFzc05hbWVzID0gdmFsdWUuc3BsaXQoXCIsIFwiKTtcbiAgICAgIGxldCBjbGFzc05hbWUgPSBcIlwiO1xuICAgICAgY2xhc3NOYW1lcy5mb3JFYWNoKHN0YXRlID0+IHtcbiAgICAgICAgaWYoc3RhdGUgIT09IFwiXCIpIHtcbiAgICAgICAgICBjbGFzc05hbWUgKz0gc3RhdGUucmVwbGFjZSgvXCIvZywgXCJcIikgKyBcIi5cIjtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICB3aW5Db3B5W3Byb3BlcnR5TmFtZUZyb21NYXBdID0gY2xhc3NOYW1lLnN1YnN0cigwLCBjbGFzc05hbWUubGVuZ3RoIC0gMik7XG4gICAgfVxuICAgIC8vIHBhcnNlIHN0YXRlc1xuICAgIGVsc2UgaWYocHJvcGVydHlOYW1lID09PSBcIl9ORVRfV01fU1RBVEUoQVRPTSlcIikge1xuICAgICAgY29uc3Qgc3RhdGVzID0gdmFsdWUuc3BsaXQoXCIsIFwiKTtcbiAgICAgIHdpbkNvcHkuc3RhdGVzID0gW107XG4gICAgICBzdGF0ZXMuZm9yRWFjaChzdGF0ZSA9PiB7XG4gICAgICAgIGlmKHN0YXRlICE9PSBcIlwiKSB7XG4gICAgICAgICAgd2luQ29weS5zdGF0ZXMucHVzaChzdGF0ZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICAvLyBwYXJzZSBzaW1wbGUgc3RyaW5ncyBhbmQgaW50ZWdlcnNcbiAgICBlbHNlIGlmKHByb3BlcnR5TmFtZUZyb21NYXApIHtcbiAgICAgIC8vIHNwZWNpYWwgaGFuZGxlIG51bWJlciB0eXBlc1xuICAgICAgaWYoQ0ZHLldNX01FVEFfTUFQX05VTUJFUl9UWVBFUy5pbmRleE9mKHByb3BlcnR5TmFtZSkgPiAtMSkge1xuICAgICAgICB3aW5Db3B5W3Byb3BlcnR5TmFtZUZyb21NYXBdID0gcGFyc2VJbnQodmFsdWUsIDEwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdpbkNvcHlbcHJvcGVydHlOYW1lRnJvbU1hcF0gPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuICAvLyBjb25zb2xlLmxvZyh3aW5Db3B5KTtcbiAgcmV0dXJuIHdpbkNvcHk7XG59XG5cbi8vIFRPRE8gcHJldHRpZnkgYXJncyBzdHJ1Y3R1cmVcbmV4cG9ydCBmdW5jdGlvbiBzdGFydFByb2dyYW0oXG4gIGV4ZWN1dGFibGVGaWxlOiBzdHJpbmcsXG4gIGRlc2t0b3BGaWxlUGF0aDogc3RyaW5nXG4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgSVNfREVCVUcgJiZcbiAgY29uc29sZS5sb2coXCJERUJVRzogc3RhcnRQcm9ncmFtKCk6XCIsIGV4ZWN1dGFibGVGaWxlLCBkZXNrdG9wRmlsZVBhdGgpO1xuXG4gIGxldCBjbWQ7XG4gIGxldCBhcmdzID0gW107XG4gIGlmKGRlc2t0b3BGaWxlUGF0aCkge1xuICAgIGNtZCA9IGBhd2tgO1xuICAgIGFyZ3MucHVzaChcbiAgICAgICcvXkV4ZWM9LyB7c3ViKFwiXkV4ZWM9XCIsIFwiXCIpOyBnc3ViKFwiID8lW2NEZEZmaWttTm5VdXZdXCIsIFwiXCIpOyBleGl0IHN5c3RlbSgkMCl9J1xuICAgICk7XG4gICAgYXJncy5wdXNoKGRlc2t0b3BGaWxlUGF0aCk7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgcGFyc2VkQ21kID0gcGFyc2VDbWRBcmdzKGV4ZWN1dGFibGVGaWxlKTtcbiAgICBjbWQgPSBwYXJzZWRDbWRbMF07XG4gICAgYXJncyA9IHBhcnNlZENtZFsxXTtcbiAgfVxuXG4gIHJldHVybiBuZXcgUHJvbWlzZShmdWxmaWxsID0+IHtcbiAgICBzcGF3bihjbWQsIGFyZ3MsIHtcbiAgICAgIHN0ZGlvOiBcImlnbm9yZVwiLFxuICAgICAgZGV0YWNoZWQ6IHRydWVcbiAgICB9KS51bnJlZigpO1xuXG4gICAgLy8gY3VycmVudGx5IHdlIGhhdmUgbm8gZXJyb3IgaGFuZGxpbmcgYXMgdGhlIHByb2Nlc3MgaXMgc3RhcnRlZCBkZXRhY2hlZFxuICAgIGZ1bGZpbGwoKTtcbiAgfSk7XG59XG5cbi8vIEdFVCBBQ1RJVkUgV0lORE9XIExJU1Rcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRBY3RpdmVXaW5kb3dMaXN0KCk6IFByb21pc2U8V2luT2JqW10+IHtcbiAgY29uc3Qgd2luZG93SWRzID0gYXdhaXQgZ2V0QWN0aXZlV2luZG93SWRzKCk7XG4gIGNvbnN0IHdpbmRvd0xpc3Q6IFdpbk9iaklkT25seVtdID0gW107XG4gIHdpbmRvd0lkcy5mb3JFYWNoKHdpbmRvd0lkID0+IHtcbiAgICB3aW5kb3dMaXN0LnB1c2goe1xuICAgICAgd2luZG93SWQ6IHdpbmRvd0lkLFxuICAgICAgd2luZG93SWREZWM6IHBhcnNlSW50KHdpbmRvd0lkLCAxNilcbiAgICB9KTtcbiAgfSk7XG5cbiAgLy8gYWRkIG1ldGEgZGF0YSByaWdodCBhd2F5XG4gIGNvbnN0IHByb21pc2VzID0gd2luZG93TGlzdC5tYXAod2luID0+IGdldEFkZGl0aW9uYWxNZXRhRGF0YUZvcldpbih3aW4pKTtcblxuICBjb25zdCB3aW5kb3dzV2l0aERhdGE6IFdpbk9ialtdID0gKGF3YWl0IFByb21pc2UuYWxsKHByb21pc2VzKSkgYXMgV2luT2JqW107XG5cbiAgSVNfREVCVUcgJiYgY29uc29sZS5sb2coXCJERUJVRzogZ2V0QWN0aXZlV2luZG93TGlzdCgpOlwiLCB3aW5kb3dMaXN0KTtcbiAgcmV0dXJuIHdpbmRvd3NXaXRoRGF0YS5maWx0ZXIoX2ZpbHRlckludmFsaWRXaW5kb3dzKTtcbn1cblxuZnVuY3Rpb24gX2ZpbHRlckludmFsaWRXaW5kb3dzKHdpbjogV2luT2JqKTogYm9vbGVhbiB7XG4gIC8vIGZpbHRlciBub25lIG5vcm1hbCB3aW5kb3dzLCBleGNsdWRlZCBjbGFzcyBuYW1lcyBhbmQgaW5jb21wbGV0ZSB3aW5kb3dzXG4gIC8vIE5PVEU6IGlmIHRoZXJlIGlzIG5vIHR5cGUgd2UgYXNzdW1lIGl0J3Mgbm9ybWFsIHRvb1xuICBjb25zdCBpc05vcm1hbFdpbmRvdyA9XG4gICAgKCF3aW4ud21UeXBlIHx8IHdpbi53bVR5cGUuaW5jbHVkZXMoXCJfTkVUX1dNX1dJTkRPV19UWVBFX05PUk1BTFwiKSkgJiZcbiAgICAoIXdpbi53bVJvbGUgfHwgd2luLndtUm9sZSAhPT0gXCJwb3AtdXBcIik7XG5cbiAgY29uc3QgaXNOb3RFeGNsdWRlZCA9ICFfaXNFeGNsdWRlZFdtQ2xhc3NOYW1lKHdpbi53bUNsYXNzTmFtZSk7XG4gIGNvbnN0IGhhc1dtQ2xhc3NOYW1lID0gISF3aW4ud21DbGFzc05hbWU7XG5cbiAgLy8gd2FybiBpZiBubyB3bUNsYXNzTmFtZSBldmVuIHRob3VnaCB0aGVyZSBzaG91bGQgYmVcbiAgaWYoaXNOb3JtYWxXaW5kb3cgJiYgaXNOb3RFeGNsdWRlZCAmJiAhaGFzV21DbGFzc05hbWUpIHtcbiAgICBjb25zb2xlLndhcm4od2luLndpbmRvd0lkICsgXCIgaGFzIG5vIHdtQ2xhc3NOYW1lLiBXaW46IFwiLCB3aW4pO1xuICB9XG5cbiAgcmV0dXJuIGlzTm9ybWFsV2luZG93ICYmIGlzTm90RXhjbHVkZWQgJiYgaGFzV21DbGFzc05hbWU7XG59XG5cbmZ1bmN0aW9uIF9pc0V4Y2x1ZGVkV21DbGFzc05hbWUod21DbGFzc05hbWUpOiBib29sZWFuIHtcbiAgcmV0dXJuIENGRy5XTV9DTEFTU19FWENMVVNJT05TLmluZGV4T2Yod21DbGFzc05hbWUpID4gLTE7XG59XG5cbmZ1bmN0aW9uIF9jYXRjaEdlbmVyaWNFcnIoZXJyKTogdm9pZCB7XG4gIGNvbnNvbGUuZXJyb3IoXCJvdGhlckNtZDogR2VuZXJpYyBFcnJvclwiLCBlcnIsIGVyci5zdGFjayk7XG4gIGxvZyhcIm90aGVyQ21kOlwiLCBhcmd1bWVudHMpO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5pbXBvcnQgeyBnZXRXaW5kb3dHZW9tZXRyeSwgZ29Ub1ZpZXdwb3J0IH0gZnJvbSBcIi4veDExV3JhcHBlclwiO1xuaW1wb3J0IHsgZ2V0QWN0aXZlV2luZG93TGlzdCB9IGZyb20gXCIuL290aGVyQ21kXCI7XG5pbXBvcnQgeyBDRkcgfSBmcm9tIFwiLi9jb25maWdcIjtcbmltcG9ydCB7IFdpbk9iaiB9IGZyb20gXCIuL21vZGVsXCI7XG5cbmNvbnN0IGZpbmR1cCA9IHJlcXVpcmUoXCJmaW5kdXAtc3luY1wiKTtcblxuY29uc3QgSE9NRV9ESVIgPSBwcm9jZXNzLmVudltcIkhPTUVcIl07XG5jb25zdCBERUZBVUxUX0RFU0tUT1BfRklMRV9MT0NBVElPTlMgPSBbXG4gIFwie2hvbWV9Ly5sb2NhbC9zaGFyZS9hcHBsaWNhdGlvbnNcIixcbiAgXCJ7aG9tZX0vLmdub21lL2FwcHMvXCIsXG4gIFwiL3Vzci9zaGFyZS9hcHBsaWNhdGlvbnNcIixcbiAgXCIvdXNyL2xvY2FsL3NoYXJlL2FwcGxpY2F0aW9uc1wiLFxuICBcIi91c3Ivc2hhcmUvYXBwLWluc3RhbGxcIlxuXTtcblxuZnVuY3Rpb24gX2NhdGNoR2VuZXJpY0VycihlcnIpIHtcbiAgY29uc29sZS5lcnJvcihcIkdlbmVyaWMgRXJyb3IgaW4gTWV0YSBXcmFwcGVyXCIsIGVyciwgZXJyLnN0YWNrKTtcbiAgdGhyb3cgZXJyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ29Ub0ZpcnN0V29ya3NwYWNlKCkge1xuICByZXR1cm4gZ29Ub1ZpZXdwb3J0KDAsIDApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmluZERlc2t0b3BGaWxlKGZpbGVOYW1lKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgoZnVsZmlsbCwgcmVqZWN0KSA9PiB7XG4gICAgY29uc3QgZGVza3RvcEZpbGVMb2NhdGlvbnMgPVxuICAgICAgQ0ZHLkRFU0tUT1BfRklMRV9MT0NBVElPTlMgfHwgREVGQVVMVF9ERVNLVE9QX0ZJTEVfTE9DQVRJT05TO1xuXG4gICAgY29uc3QgcGFyZW50RGlycyA9IGRlc2t0b3BGaWxlTG9jYXRpb25zLm1hcChwYXJlbnREaXIgPT4ge1xuICAgICAgcmV0dXJuIHBhcmVudERpci5yZXBsYWNlKFwie2hvbWV9XCIsIEhPTUVfRElSKTtcbiAgICB9KTtcblxuICAgIGxldCBmaXJzdEZpbGU7XG4gICAgY29uc3QgbWF0Y2ggPSBwYXJlbnREaXJzLmZpbmQoZGlyID0+IHtcbiAgICAgIGZpcnN0RmlsZSA9IGZpbmR1cChmaWxlTmFtZSwgeyBjd2Q6IGRpciB9KTtcblxuICAgICAgaWYgKCFmaXJzdEZpbGUpIHtcbiAgICAgICAgLy8gc25hcCBkZXNrdG9wIGZpbGVzIG5vdyBsb29rIGxpa2UgdGhpcyA9PiBmaXJlZm94X2ZpcmVmb3guZGVza3RvcFxuICAgICAgICBmaXJzdEZpbGUgPSBmaW5kdXAoYCR7ZmlsZU5hbWUucmVwbGFjZShcIi5kZXNrdG9wXCIsIFwiX1wiKX0ke2ZpbGVOYW1lfWAsIHtcbiAgICAgICAgICBjd2Q6IGRpclxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmaXJzdEZpbGU7XG4gICAgfSk7XG5cbiAgICBpZiAoIWZpcnN0RmlsZSB8fCAhbWF0Y2gpIHtcbiAgICAgIGNvbnN0IGVyciA9XG4gICAgICAgIGBFUlI6IGZpbmREZXNrdG9wRmlsZSgpIGNhbnQgZmluZCBmaWxlIFwiJHtmaWxlTmFtZX1cIiEgU2VhcmNoZWQgZGVza3RvcEZpbGVMb2NhdGlvbnM6YDtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyLCBkZXNrdG9wRmlsZUxvY2F0aW9ucyk7XG4gICAgICByZWplY3QoZXJyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZnVsZmlsbChmaXJzdEZpbGUpO1xuICAgIH1cbiAgfSkuY2F0Y2goX2NhdGNoR2VuZXJpY0Vycik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRBY3RpdmVXaW5kb3dMaXN0RmxvdygpOiBQcm9taXNlPFdpbk9ialtdIHwgYW55PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAoZnVsZmlsbCwgcmVqZWN0KSA9PiB7XG4gICAgcmV0dXJuIGdldEFjdGl2ZVdpbmRvd0xpc3QoKS50aGVuKGFzeW5jICh3aW5kb3dMaXN0OiBhbnlbXSkgPT4ge1xuICAgICAgY29uc3QgcHJvbWlzZXMgPSB3aW5kb3dMaXN0Lm1hcCh3aW4gPT4ge1xuICAgICAgICByZXR1cm4gZ2V0V2luZG93R2VvbWV0cnkod2luLndpbmRvd0lkKS50aGVuKChnZW86IGFueSkgPT4ge1xuICAgICAgICAgIGZvciAobGV0IHByb3AgaW4gZ2VvKSB7XG4gICAgICAgICAgICBpZiAoZ2VvLmhhc093blByb3BlcnR5KHByb3ApKSB7XG4gICAgICAgICAgICAgIHdpbltwcm9wXSA9IGdlb1twcm9wXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBUT0RPIG9yZ2FuaXplIGFkZGluZyBvZiBhbGwgdGhvc2UgZGlmZmVyZW50IHByb3BlcnRpZXMgYmV0dGVyXG4gICAgICAgICAgLy8gYWRkIG1pc3Npbmcgc3RhdGljIHByb3BlcnRpZXNcbiAgICAgICAgICB3aW4uc2ltcGxlTmFtZSA9IF9wYXJzZVNpbXBsZVdpbmRvd05hbWUod2luLndtQ2xhc3NOYW1lKTtcbiAgICAgICAgICByZXR1cm4gd2luO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyB3ZSdyZSB1c2luZyBhIHdhdGVyZmFsbCBiZWNhdXNlIHdlJ3JlIGRlYWxpbmcgd2l0aCB4MTEgcmVxdWVzdHNcbiAgICAgIGlmIChwcm9taXNlcy5sZW5ndGgpIHtcbiAgICAgICAgZm9yIChjb25zdCBwcm9taXNlIG9mIHByb21pc2VzKSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGF3YWl0IHByb21pc2U7XG4gICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfYWRkUGFyc2VkRXhlY3V0YWJsZUZpbGVzRnJvbVdtQ2xhc3NOYW1lcyh3aW5kb3dMaXN0KS50aGVuKFxuICAgICAgICAgIHdpbmRvd0xpc3RXaXRoV21DbGFzc05hbWVzID0+IHtcbiAgICAgICAgICAgIGZ1bGZpbGwod2luZG93TGlzdFdpdGhXbUNsYXNzTmFtZXMpO1xuICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZ1bGZpbGwoW10pO1xuICAgICAgfVxuICAgIH0pO1xuICB9KS5jYXRjaChfY2F0Y2hHZW5lcmljRXJyKTtcbn1cblxuLy8gTUlYRURcbmZ1bmN0aW9uIF9hZGRQYXJzZWRFeGVjdXRhYmxlRmlsZXNGcm9tV21DbGFzc05hbWVzKHdpbmRvd0xpc3QpOiBQcm9taXNlPGFueT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKGZ1bGZpbGwsIHJlamVjdCkgPT4ge1xuICAgIGNvbnN0IHByb21pc2VzID0gd2luZG93TGlzdFxuICAgICAgLmZpbHRlcih3aW4gPT4gIXdpbi5leGVjdXRhYmxlRmlsZSlcbiAgICAgIC5tYXAod2luID0+IHtcbiAgICAgICAgcmV0dXJuIF9wYXJzZUV4ZWN1dGFibGVGaWxlRnJvbVdtQ2xhc3NOYW1lKHdpbi53bUNsYXNzTmFtZSkudGhlbihcbiAgICAgICAgICBmaWxlTmFtZSA9PiB7XG4gICAgICAgICAgICB3aW4uZXhlY3V0YWJsZUZpbGUgPSBmaWxlTmFtZTtcbiAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICB9KTtcblxuICAgIGlmIChwcm9taXNlcy5sZW5ndGgpIHtcbiAgICAgIGZvciAoY29uc3QgcHJvbWlzZSBvZiBwcm9taXNlcykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGF3YWl0IHByb21pc2U7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICByZWplY3QoZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGZ1bGZpbGwod2luZG93TGlzdCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZ1bGZpbGwod2luZG93TGlzdCk7XG4gICAgfVxuICB9KS5jYXRjaChfY2F0Y2hHZW5lcmljRXJyKTtcbn1cblxuZnVuY3Rpb24gX3BhcnNlRXhlY3V0YWJsZUZpbGVGcm9tV21DbGFzc05hbWUod21DbGFzc05hbWUpOiBQcm9taXNlPGFueT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKGZ1bGZpbGwsIHJlamVjdCkgPT4ge1xuICAgIGNvbnN0IGV4ZWN1dGFibGVGaWxlRnJvbU1hcCA9XG4gICAgICBDRkcuV01fQ0xBU1NfQU5EX0VYRUNVVEFCTEVfRklMRV9NQVBbd21DbGFzc05hbWVdO1xuICAgIGlmIChleGVjdXRhYmxlRmlsZUZyb21NYXApIHtcbiAgICAgIGZ1bGZpbGwoZXhlY3V0YWJsZUZpbGVGcm9tTWFwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qgc3BsaXRWYWx1ZXMgPSB3bUNsYXNzTmFtZS5zcGxpdChcIi5cIik7XG4gICAgICBjb25zdCBmaWxlTmFtZSA9IHNwbGl0VmFsdWVzWzBdO1xuICAgICAgaWYgKF9pc0Nocm9tZUFwcChmaWxlTmFtZSkpIHtcbiAgICAgICAgX3BhcnNlQ2hyb21lQXBwRGVza3RvcEZpbGVOYW1lKGZpbGVOYW1lKVxuICAgICAgICAgIC50aGVuKGZ1bGZpbGwpXG4gICAgICAgICAgLmNhdGNoKHJlamVjdCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmdWxmaWxsKGZpbGVOYW1lICsgXCIuZGVza3RvcFwiKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pLmNhdGNoKF9jYXRjaEdlbmVyaWNFcnIpO1xufVxuXG5mdW5jdGlvbiBfcGFyc2VTaW1wbGVXaW5kb3dOYW1lKHdtQ2xhc3NOYW1lKSB7XG4gIGNvbnN0IHNwbGl0VmFsdWVzID0gd21DbGFzc05hbWUuc3BsaXQoXCIuXCIpO1xuICBpZiAoc3BsaXRWYWx1ZXNbMV0pIHtcbiAgICByZXR1cm4gc3BsaXRWYWx1ZXNbMV07XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHdtQ2xhc3NOYW1lO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9pc0Nocm9tZUFwcChmaWxlTmFtZSkge1xuICByZXR1cm4gISFmaWxlTmFtZS5tYXRjaCgvXmNyeF8vKTtcbn1cblxuZnVuY3Rpb24gX3BhcnNlQ2hyb21lQXBwRGVza3RvcEZpbGVOYW1lKGZpbGVOYW1lKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgLy8gd2Ugd2FuJ3QgdG8gc2VhcmNoIGZyb20gZGVza3RvcCBmaWxlcyBvbmx5XG4gICAgY29uc3QgbG9jYXRlU3RyID0gZmlsZU5hbWUucmVwbGFjZShcImNyeF9cIiwgXCIqXCIpICsgXCIqLmRlc2t0b3BcIjtcbiAgICBmaW5kRGVza3RvcEZpbGUobG9jYXRlU3RyKVxuICAgICAgLnRoZW4ocmVzb2x2ZSlcbiAgICAgIC5jYXRjaChyZWplY3QpO1xuICB9KS5jYXRjaChfY2F0Y2hHZW5lcmljRXJyKTtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuaW1wb3J0IHtDRkcsIFNFU1NJT05fREFUQV9ESVJ9IGZyb20gXCIuL2NvbmZpZ1wiO1xuaW1wb3J0ICogYXMgZnMgZnJvbSBcImZzXCI7XG5pbXBvcnQge2dldENvbm5lY3RlZERpc3BsYXlzSWQsIHN0YXJ0UHJvZ3JhbX0gZnJvbSBcIi4vb3RoZXJDbWRcIjtcbmltcG9ydCB7Y2xvc2VXaW5kb3csIGdldFgsIGluaXRYMTEsIG1vdmVUb1dvcmtzcGFjZSwgcmVzdG9yZVdpbmRvd1Bvc2l0aW9ufSBmcm9tIFwiLi94MTFXcmFwcGVyXCI7XG5pbXBvcnQge2ZpbmREZXNrdG9wRmlsZSwgZ2V0QWN0aXZlV2luZG93TGlzdEZsb3csIGdvVG9GaXJzdFdvcmtzcGFjZX0gZnJvbSBcIi4vbWV0YVdyYXBwZXJcIjtcbmltcG9ydCB7bG9nfSBmcm9tIFwiLi9sb2dcIjtcbmltcG9ydCB7V2luT2JqfSBmcm9tIFwiLi9tb2RlbFwiO1xuaW1wb3J0IHtleGVjfSBmcm9tIFwiY2hpbGRfcHJvY2Vzc1wiO1xuXG4vLyBpbXBvcnQgKiBhcyBTdG9yZSBmcm9tICdqZnMnO1xuY29uc3QgU3RvcmUgPSByZXF1aXJlKFwiamZzXCIpO1xuXG4vLyBjcmVhdGUgZGF0YSBzdG9yZVxuY29uc3QgZGIgPSBuZXcgU3RvcmUoU0VTU0lPTl9EQVRBX0RJUiwge1xuICBwcmV0dHk6IENGRy5TQVZFX1NFU1NJT05fSU5fUFJFVFRZX0ZPUk1BVFxufSk7XG5cbi8vIHNldHVwIG1ldGEgd3JhcHBlclxuXG4vLyBFWFBPUlRcbi8vIC0tLS0tLVxuZXhwb3J0IGRlZmF1bHQge1xuICBsaXN0U2Vzc2lvbnMsXG4gIHJlbmFtZVNlc3Npb24sXG4gIHNhdmVTZXNzaW9uLFxuICByZW1vdmVTZXNzaW9uLFxuICByZXN0b3JlU2Vzc2lvbixcbiAgZ2V0U2Vzc2lvbnMsXG4gIGdldFg6IGdldFgsXG5cbiAgZ2V0Q29ubmVjdGVkRGlzcGxheXNJZCxcbiAgcmVzZXRDZmc6ICgpID0+IHtcbiAgICBjb25zdCBjb25maWdGaWxlUGF0aCA9IENGRy5EQVRBX0RJUiArIFwiL2NvbmZpZy5qc29uXCI7XG4gICAgaWYoZnMuZXhpc3RzU3luYyhjb25maWdGaWxlUGF0aCkpIHtcbiAgICAgIGZzLnVubGlua1N5bmMoY29uZmlnRmlsZVBhdGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiTm8gQ29uZmlnIHByZXNlbnQgaW4gXCIgKyBjb25maWdGaWxlUGF0aCk7XG4gICAgfVxuICB9LFxuICBnZXRDZmc6ICgpID0+IHtcbiAgICByZXR1cm4gQ0ZHO1xuICB9LFxuICBnZXREYjogKCkgPT4ge1xuICAgIHJldHVybiBkYjtcbiAgfVxufTtcblxuLy8gSEVMUEVSXG4vLyAtLS0tLS0tLVxuZnVuY3Rpb24gX2NhdGNoR2VuZXJpY0VycihlcnIpIHtcbiAgY29uc29sZS5lcnJvcihcIkdlbmVyaWMgRXJyb3IgaW4gTWFpbiBIYW5kbGVyXCIsIGVyciwgZXJyLnN0YWNrKTtcbiAgdGhyb3cgZXJyO1xufVxuXG5mdW5jdGlvbiBnZXRTZXNzaW9ucygpIHtcbiAgcmV0dXJuIGRiLmFsbFN5bmMoKTtcbn1cblxuLy8gTUFJTiBGVU5DVElPTlNcbi8vIC0tLS0tLS0tLS0tLS0tXG5mdW5jdGlvbiBsaXN0U2Vzc2lvbnMoKSB7XG4gIGxldCBsaXN0ID0gT2JqZWN0LmtleXMoZ2V0U2Vzc2lvbnMoKSk7XG4gIGxpc3QuZm9yRWFjaChuYW1lID0+IHtcbiAgICBsb2cobmFtZSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiByZW5hbWVTZXNzaW9uKG9sZE5hbWU6IHN0cmluZywgbmV3TmFtZTogc3RyaW5nKSB7XG4gIGxldCBvYmogPSBkYi5nZXRTeW5jKG9sZE5hbWUpO1xuICBpZihvYmoubWVzc2FnZSkge1xuICAgIGlmKG9iai5tZXNzYWdlID09PSBcImNvdWxkIG5vdCBsb2FkIGRhdGFcIikge1xuICAgICAgbG9nKGBFcnJvcjogQ291bGQgbm90IGZpbmQgYSBzZXNzaW9uIG5hbWVkICcke29sZE5hbWV9J2ApO1xuICAgIH0gZWxzZSB7XG4gICAgICBsb2cob2JqLm1lc3NhZ2UpO1xuICAgIH1cbiAgICByZXR1cm47XG4gIH1cbiAgZGIuc2F2ZVN5bmMobmV3TmFtZSwgb2JqKTtcbiAgZGIuZGVsZXRlKG9sZE5hbWUpO1xufVxuXG5mdW5jdGlvbiBzYXZlU2Vzc2lvbihzZXNzaW9uTmFtZTogc3RyaW5nLCBpbnB1dEhhbmRsZXJzKTogUHJvbWlzZTxhbnk+IHtcbiAgY29uc3Qgc2Vzc2lvblRvSGFuZGxlID0gc2Vzc2lvbk5hbWUgfHwgXCJERUZBVUxUXCI7XG5cbiAgcmV0dXJuIGluaXRYMTEoKVxuICAgIC50aGVuKCgpID0+IHtcbiAgICAgIHJldHVybiBnZXRBY3RpdmVXaW5kb3dMaXN0RmxvdygpO1xuICAgIH0pXG4gICAgLnRoZW4od2luZG93TGlzdCA9PiB7XG4gICAgICAvLyBkZXNrdG9wIGZpbGUgcGF0aHMgYW5kIGNvbm5lY3RlZCBkaXNwbGF5IGlkc1xuICAgICAgcmV0dXJuIF9ndWVzc0FuZFNldERlc2t0b3BGaWxlUGF0aHMoXG4gICAgICAgIHdpbmRvd0xpc3QsXG4gICAgICAgIGlucHV0SGFuZGxlcnMuZGVza3RvcEZpbGVQYXRoXG4gICAgICApO1xuICAgIH0pXG4gICAgLnRoZW4od2luZG93TGlzdCA9PiB7XG4gICAgICBjb25zdCBjb25uZWN0ZWREaXNwbGF5c0lkID0gZ2V0Q29ubmVjdGVkRGlzcGxheXNJZCgpO1xuICAgICAgcmV0dXJuIHNhdmVTZXNzaW9uRm9yRGlzcGxheVRvRGIoXG4gICAgICAgIHNlc3Npb25Ub0hhbmRsZSxcbiAgICAgICAgY29ubmVjdGVkRGlzcGxheXNJZCxcbiAgICAgICAgd2luZG93TGlzdFxuICAgICAgKTtcbiAgICB9KVxuICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgY29uc29sZS5lcnJvcihcInNhdmVTZXNzaW9uKCk6IEFuIGVycm9yIG9jY3VycmVkXCIsIGVycik7XG4gICAgICB0aHJvdyBlcnI7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIHNhdmVTZXNzaW9uRm9yRGlzcGxheVRvRGIoXG4gIHNlc3Npb25Ub0hhbmRsZTogc3RyaW5nLFxuICBjb25uZWN0ZWREaXNwbGF5c0lkOiBzdHJpbmcsXG4gIHdpbmRvd0xpc3Q6IFdpbk9ialtdXG4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChmdWxmaWxsLCByZWplY3QpID0+IHtcbiAgICAvLyBjaGVjayBpZiBlbnRyeSBleGlzdHMgYW5kIHVwZGF0ZVxuICAgIGRiLmdldChzZXNzaW9uVG9IYW5kbGUsIChlcnIsIHNlc3Npb25EYXRhKSA9PiB7XG4gICAgICBpZihlcnIpIHtcbiAgICAgICAgLy8gTk9URTogd2UncmUgbm90IGZhaWxpbmcgYmVjYXVzZSwgdGhlIGNhc2UgaXMgcHJvYmFibHkgdGhhdCB0aGVyZSBpcyBubyBzZXNzaW9uIGZpbGUgeWV0XG4gICAgICAgIGxvZyhcbiAgICAgICAgICBgc2F2ZVNlc3Npb25Gb3JEaXNwbGF5VG9EYjogbm8gc2Vzc2lvbiBmaWxlIHByZXNlbnQgeWV0IGZvciBcIiR7c2Vzc2lvblRvSGFuZGxlfVwiLCBjcmVhdGluZyBhIG5ldyBvbmUuLi5gXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIGlmKCFzZXNzaW9uRGF0YSkge1xuICAgICAgICAvLyBjcmVhdGUgbmV3IG9iamVjdFxuICAgICAgICBzZXNzaW9uRGF0YSA9IHtcbiAgICAgICAgICBuYW1lOiBzZXNzaW9uVG9IYW5kbGVcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIGlmKFxuICAgICAgICAhc2Vzc2lvbkRhdGEuZGlzcGxheXNDb21iaW5hdGlvbnMgfHxcbiAgICAgICAgIUFycmF5LmlzQXJyYXkoc2Vzc2lvbkRhdGEuZGlzcGxheXNDb21iaW5hdGlvbnMpXG4gICAgICApIHtcbiAgICAgICAgLy8gY3JlYXRlIG5ldyBhcnJheVxuICAgICAgICBzZXNzaW9uRGF0YS5kaXNwbGF5c0NvbWJpbmF0aW9ucyA9IFtdO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBleGlzdGluZ0Rpc3BsYXlFbnRyeSA9IHNlc3Npb25EYXRhLmRpc3BsYXlzQ29tYmluYXRpb25zLmZpbmQoXG4gICAgICAgIGVudHJ5ID0+IGVudHJ5LmlkID09PSBjb25uZWN0ZWREaXNwbGF5c0lkXG4gICAgICApO1xuICAgICAgaWYoZXhpc3RpbmdEaXNwbGF5RW50cnkpIHtcbiAgICAgICAgZXhpc3RpbmdEaXNwbGF5RW50cnkud2luZG93TGlzdCA9IHdpbmRvd0xpc3Q7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZXNzaW9uRGF0YS5kaXNwbGF5c0NvbWJpbmF0aW9ucy5wdXNoKHtcbiAgICAgICAgICBpZDogY29ubmVjdGVkRGlzcGxheXNJZCxcbiAgICAgICAgICB3aW5kb3dMaXN0XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBkYi5zYXZlKHNlc3Npb25Ub0hhbmRsZSwgc2Vzc2lvbkRhdGEsIGVyciA9PiB7XG4gICAgICAgIGlmKGVycikge1xuICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxvZyhcIlNBVkVEIFNFU1NJT046IFwiICsgc2Vzc2lvblRvSGFuZGxlKTtcbiAgICAgICAgICBmdWxmaWxsKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gcmVzdG9yZVNlc3Npb24oXG4gIHNlc3Npb25OYW1lOiBzdHJpbmcsXG4gIGlzQ2xvc2VBbGxPcGVuV2luZG93czogYm9vbGVhblxuKTogUHJvbWlzZTxhbnk+IHtcbiAgY29uc3Qgc2Vzc2lvblRvSGFuZGxlID0gc2Vzc2lvbk5hbWUgfHwgXCJERUZBVUxUXCI7XG5cbiAgcmV0dXJuIG5ldyBQcm9taXNlKChmdWxmaWxsLCByZWplY3QpID0+IHtcbiAgICBkYi5nZXQoc2Vzc2lvblRvSGFuZGxlIHx8IFwiREVGQVVMVFwiLCAoZXJyLCBzZXNzaW9uRGF0YSkgPT4ge1xuICAgICAgaWYoZXJyKSB7XG4gICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGxldCBzYXZlZFdpbmRvd0xpc3Q7XG5cbiAgICAgIGluaXRYMTEoKVxuICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIF9jbG9zZUFsbFdpbmRvd3NJZlNldChpc0Nsb3NlQWxsT3BlbldpbmRvd3MpO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbihnb1RvRmlyc3RXb3Jrc3BhY2UpXG4gICAgICAgIC50aGVuKGdldENvbm5lY3RlZERpc3BsYXlzSWQpXG4gICAgICAgIC50aGVuKGNvbm5lY3RlZERpc3BsYXlzSWQgPT4ge1xuICAgICAgICAgIGlmKCFzZXNzaW9uRGF0YS5kaXNwbGF5c0NvbWJpbmF0aW9ucykge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgbm8gZGlzcGxheSBjb21iaW5hdGlvbnMgc2F2ZWQgeWV0YCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgZGlzcGxheUVudHJ5ID0gc2Vzc2lvbkRhdGEuZGlzcGxheXNDb21iaW5hdGlvbnMuZmluZChcbiAgICAgICAgICAgIGVudHJ5ID0+IGVudHJ5LmlkID09PSBjb25uZWN0ZWREaXNwbGF5c0lkXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIGlmKGRpc3BsYXlFbnRyeSkge1xuICAgICAgICAgICAgc2F2ZWRXaW5kb3dMaXN0ID0gZGlzcGxheUVudHJ5LndpbmRvd0xpc3Q7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgICAgIGBubyBkYXRhIGZvciBjdXJyZW50IGRpc3BsYXkgaWQgJyR7Y29ubmVjdGVkRGlzcGxheXNJZH0nIHNhdmVkIHlldGBcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBnZXRBY3RpdmVXaW5kb3dMaXN0RmxvdygpO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbihjdXJyZW50V2luZG93TGlzdCA9PiB7XG4gICAgICAgICAgcmV0dXJuIF9zdGFydFNlc3Npb25Qcm9ncmFtcyhzYXZlZFdpbmRvd0xpc3QsIGN1cnJlbnRXaW5kb3dMaXN0KTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIC8vIGdldHMgY3VycmVudCB3aW5kb3cgbGlzdCBieSBpdHNlbGYgYW5kIHJldHVybnMgdGhlIHVwZGF0ZWQgdmFyaWFudFxuICAgICAgICAgIHJldHVybiBfd2FpdEZvckFsbEFwcHNUb1N0YXJ0KHNhdmVkV2luZG93TGlzdCk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKCh1cGRhdGVkQ3VycmVudFdpbmRvd0xpc3Q6IFdpbk9ialtdKSA9PiB7XG4gICAgICAgICAgX3VwZGF0ZVdpbmRvd0lkcyhzYXZlZFdpbmRvd0xpc3QsIHVwZGF0ZWRDdXJyZW50V2luZG93TGlzdCk7XG4gICAgICAgICAgcmV0dXJuIF9yZXN0b3JlV2luZG93UG9zaXRpb25zKHNhdmVkV2luZG93TGlzdCk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICBsb2coXCJSRVNUT1JFRCBTRVNTSU9OOiBcIiArIHNlc3Npb25Ub0hhbmRsZSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJBbiBlcnJvciBvY2N1cnJlZFwiLCBlcnIpO1xuICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbihmdWxmaWxsKTtcbiAgICB9KTtcbiAgfSkuY2F0Y2goX2NhdGNoR2VuZXJpY0Vycik7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVNlc3Npb24oc2Vzc2lvbk5hbWU6IHN0cmluZyk6IFByb21pc2U8dW5rbm93bj4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKGZ1bGZpbGwsIHJlamVjdCkgPT4ge1xuICAgIGZzLnVubGluayhDRkcuU0VTU0lPTl9EQVRBX0RJUiArIFwiL1wiICsgc2Vzc2lvbk5hbWUgKyBcIi5qc29uXCIsIGVycm9yID0+IHtcbiAgICAgIGlmKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZnVsZmlsbCgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KS5jYXRjaChfY2F0Y2hHZW5lcmljRXJyKTtcbn1cblxuZnVuY3Rpb24gX2Nsb3NlQWxsV2luZG93c0lmU2V0KGlzQ2xvc2VBbGw6IGJvb2xlYW4pOiBQcm9taXNlPHVua25vd24+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChmdWxmaWxsLCByZWplY3QpID0+IHtcbiAgICBpZihpc0Nsb3NlQWxsKSB7XG4gICAgICBsb2coXCJDbG9zaW5nIG9wZW5lZCBhcHBsaWNhdGlvbnNcIik7XG4gICAgICBnZXRBY3RpdmVXaW5kb3dMaXN0RmxvdygpXG4gICAgICAgIC50aGVuKChjdXJyZW50V2luZG93TGlzdDogYW55W10pID0+IHtcbiAgICAgICAgICBjdXJyZW50V2luZG93TGlzdC5mb3JFYWNoKHdpbiA9PiB7XG4gICAgICAgICAgICBjbG9zZVdpbmRvdyh3aW4ud2luZG93SWQpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgX3dhaXRGb3JBbGxBcHBzVG9DbG9zZSgpXG4gICAgICAgICAgICAudGhlbihmdWxmaWxsKVxuICAgICAgICAgICAgLmNhdGNoKHJlamVjdCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChyZWplY3QpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmdWxmaWxsKCk7XG4gICAgfVxuICB9KS5jYXRjaChfY2F0Y2hHZW5lcmljRXJyKTtcbn1cblxuZnVuY3Rpb24gX3dhaXRGb3JBbGxBcHBzVG9DbG9zZSgpOiBQcm9taXNlPHVua25vd24+IHtcbiAgbGV0IHRvdGFsVGltZVdhaXRlZCA9IDA7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgoZnVsZmlsbCwgcmVqZWN0KSA9PiB7XG4gICAgZnVuY3Rpb24gcG9sbEFsbEFwcHNDbG9zZWQoKSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgZ2V0QWN0aXZlV2luZG93TGlzdEZsb3coKVxuICAgICAgICAgIC50aGVuKChjdXJyZW50V2luZG93TGlzdDogV2luT2JqW10pID0+IHtcbiAgICAgICAgICAgIHRvdGFsVGltZVdhaXRlZCArPSBDRkcuUE9MTF9BTExfQVBQU19TVEFSVEVEX0lOVEVSVkFMO1xuICAgICAgICAgICAgaWYoY3VycmVudFdpbmRvd0xpc3QubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgICAgIGlmKHRvdGFsVGltZVdhaXRlZCA+IENGRy5QT0xMX0FMTF9NQVhfVElNRU9VVCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJQT0xMX0FMTF9NQVhfVElNRU9VVCByZWFjaGVkXCIpO1xuICAgICAgICAgICAgICAgIHJlamVjdChcIlBPTExfQUxMX01BWF9USU1FT1VUIHJlYWNoZWRcIik7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gY2FsbCByZWN1cnNpdmVseVxuICAgICAgICAgICAgICAgIHBvbGxBbGxBcHBzQ2xvc2VkKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGZ1bGZpbGwoY3VycmVudFdpbmRvd0xpc3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKHJlamVjdCk7XG4gICAgICB9LCBDRkcuUE9MTF9BTExfQVBQU19TVEFSVEVEX0lOVEVSVkFMKTtcbiAgICB9XG5cbiAgICAvLyBzdGFydCBvbmNlIGluaXRpYWxseVxuICAgIHBvbGxBbGxBcHBzQ2xvc2VkKCk7XG4gIH0pLmNhdGNoKF9jYXRjaEdlbmVyaWNFcnIpO1xufVxuXG5mdW5jdGlvbiBfd2FpdEZvckFsbEFwcHNUb1N0YXJ0KHNhdmVkV2luZG93TGlzdCk6IFByb21pc2U8V2luT2JqW10gfCB1bmtub3duPiB7XG4gIGxvZyhcIldhaXRpbmcgZm9yIGFsbCBhcHBsaWNhdGlvbnMgdG8gc3RhcnQuLi5cIik7XG5cbiAgbGV0IHRvdGFsVGltZVdhaXRlZCA9IDA7XG4gIGxldCB0aW1lb3V0O1xuXG4gIHJldHVybiBuZXcgUHJvbWlzZSgoZnVsZmlsbCwgcmVqZWN0KSA9PiB7XG4gICAgZnVuY3Rpb24gcG9sbEFsbEFwcHNTdGFydGVkKFxuICAgICAgc2F2ZWRXaW5kb3dMaXN0OiBXaW5PYmpbXSxcbiAgICAgIHRpbWVvdXREdXJhdGlvbiA9IENGRy5QT0xMX0FMTF9BUFBTX1NUQVJURURfSU5URVJWQUxcbiAgICApIHtcbiAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgLy8gY2xlYXIgdGltZW91dCB0byBiZSBzYXZlXG4gICAgICAgIGlmKHRpbWVvdXQpIHtcbiAgICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICAgIH1cblxuICAgICAgICBnZXRBY3RpdmVXaW5kb3dMaXN0RmxvdygpXG4gICAgICAgICAgLnRoZW4oY3VycmVudFdpbmRvd0xpc3QgPT4ge1xuICAgICAgICAgICAgdG90YWxUaW1lV2FpdGVkICs9IENGRy5QT0xMX0FMTF9BUFBTX1NUQVJURURfSU5URVJWQUw7XG4gICAgICAgICAgICBpZighX2lzQWxsQXBwc1N0YXJ0ZWQoc2F2ZWRXaW5kb3dMaXN0LCBjdXJyZW50V2luZG93TGlzdCkpIHtcbiAgICAgICAgICAgICAgaWYodG90YWxUaW1lV2FpdGVkID4gQ0ZHLlBPTExfQUxMX01BWF9USU1FT1VUKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlBPTExfQUxMX01BWF9USU1FT1VUIHJlYWNoZWRcIik7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICAgICAgICAgIFwiVW5hYmxlIHRvIHN0YXJ0IHRoZSBmb2xsb3dpbmcgYXBwc1wiLFxuICAgICAgICAgICAgICAgICAgX2dldE5vdFN0YXJ0ZWRBcHBzKHNhdmVkV2luZG93TGlzdCwgY3VycmVudFdpbmRvd0xpc3QpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICByZWplY3QoXCJQT0xMX0FMTF9NQVhfVElNRU9VVCByZWFjaGVkXCIpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIGNhbGwgcmVjdXJzaXZlbHlcbiAgICAgICAgICAgICAgICBwb2xsQWxsQXBwc1N0YXJ0ZWQoc2F2ZWRXaW5kb3dMaXN0KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgbG9nKFwiQWxsIGFwcGxpY2F0aW9ucyBzdGFydGVkXCIpO1xuICAgICAgICAgICAgICBmdWxmaWxsKGN1cnJlbnRXaW5kb3dMaXN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaChyZWplY3QpO1xuICAgICAgfSwgdGltZW91dER1cmF0aW9uKTtcbiAgICB9XG5cbiAgICAvLyBzdGFydCBvbmNlIGluaXRpYWxseVxuICAgIHBvbGxBbGxBcHBzU3RhcnRlZChzYXZlZFdpbmRvd0xpc3QsIDUwMCk7XG4gIH0pLmNhdGNoKF9jYXRjaEdlbmVyaWNFcnIpO1xufVxuXG5mdW5jdGlvbiBfZ2V0Tm90U3RhcnRlZEFwcHMoXG4gIHNhdmVkV2luZG93TGlzdDogV2luT2JqW10sXG4gIGN1cnJlbnRXaW5kb3dMaXN0OiBXaW5PYmpbXVxuKTogV2luT2JqW10ge1xuICBsZXQgbm9uU3RhcnRlZEFwcHMgPSBbXTtcbiAgc2F2ZWRXaW5kb3dMaXN0LmZvckVhY2god2luID0+IHtcbiAgICBpZighX2dldE1hdGNoaW5nV2luZG93SWQod2luLCBjdXJyZW50V2luZG93TGlzdCkpIHtcbiAgICAgIG5vblN0YXJ0ZWRBcHBzLnB1c2god2luKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gbm9uU3RhcnRlZEFwcHM7XG59XG5cbmZ1bmN0aW9uIF9pc0FsbEFwcHNTdGFydGVkKFxuICBzYXZlZFdpbmRvd0xpc3Q6IFdpbk9ialtdLFxuICBjdXJyZW50V2luZG93TGlzdDogV2luT2JqW11cbik6IGJvb2xlYW4ge1xuICBsZXQgaXNBbGxTdGFydGVkID0gdHJ1ZTtcbiAgY29uc3QgY3VycmVudFdpbmRvd0xpc3RDb3B5ID0gY3VycmVudFdpbmRvd0xpc3Quc2xpY2UoMCk7XG4gIHNhdmVkV2luZG93TGlzdC5mb3JFYWNoKHdpbiA9PiB7XG4gICAgaWYoIV9nZXRNYXRjaGluZ1dpbmRvd0lkKHdpbiwgY3VycmVudFdpbmRvd0xpc3RDb3B5KSkge1xuICAgICAgaXNBbGxTdGFydGVkID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGluZGV4ID0gY3VycmVudFdpbmRvd0xpc3RDb3B5LmZpbmRJbmRleChcbiAgICAgICAgd2luRnJvbUN1cnJlbnQgPT4gd2luLndtQ2xhc3NOYW1lID09PSB3aW5Gcm9tQ3VycmVudC53bUNsYXNzTmFtZVxuICAgICAgKTtcbiAgICAgIGN1cnJlbnRXaW5kb3dMaXN0Q29weS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBpc0FsbFN0YXJ0ZWQ7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIF9ndWVzc0FuZFNldERlc2t0b3BGaWxlUGF0aHMoXG4gIHdpbmRvd0xpc3Q6IFdpbk9ialtdLFxuICBpbnB1dEhhbmRsZXJcbik6IFByb21pc2U8V2luT2JqW10+IHtcbiAgY29uc3QgcHJvbWlzZXMgPSB3aW5kb3dMaXN0Lm1hcCh3aW4gPT4gX2d1ZXNzRmlsZVBhdGgod2luLCBpbnB1dEhhbmRsZXIpKTtcblxuICBmb3IgKGNvbnN0IHByb21pc2Ugb2YgcHJvbWlzZXMpIHtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgcHJvbWlzZTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBfY2F0Y2hHZW5lcmljRXJyKGUpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gd2luZG93TGlzdDtcbn1cblxuZnVuY3Rpb24gX2d1ZXNzRmlsZVBhdGgod2luOiBXaW5PYmosIGlucHV0SGFuZGxlcik6IFByb21pc2U8c3RyaW5nIHwgdW5rbm93bj4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKGZ1bGZpbGwsIHJlamVjdCkgPT4ge1xuICAgIGZ1bmN0aW9uIGNhbGxJbnB1dEhhbmRsZXIoZXJyb3I/LCBzdGRvdXQ/KSB7XG4gICAgICBpZihlcnJvcikge1xuICAgICAgICBjb25zb2xlLmxvZyhgXFxuIFRyeWluZyBhbHRlcm5hdGl2ZSBndWVzc2luZyBhcHByb2FjaCBmb3IgXCIke3dpbi5zaW1wbGVOYW1lfVwiLi4uLi5gKTtcbiAgICAgICAgZXhlYyhgY2F0IC9wcm9jLyR7d2luLndtUGlkfS9jbWRsaW5lYCwgKGVycm9yMSwgc3Rkb3V0MSkgPT4ge1xuICAgICAgICAgIGlmKGVycm9yMSB8fCAhc3Rkb3V0MS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0VSUiBfZ3Vlc3NGaWxlUGF0aCgpJywgZXJyb3IxKTtcbiAgICAgICAgICAgIHJlamVjdChlcnJvcjEpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBlbnQgPSBzdGRvdXQxLnNwbGl0KCdcXHUwMDAwJyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgXFxuIEFsdGVybmF0aXZlIGd1ZXNzaW5nIGFwcHJvYWNoIGZvciBcIiR7d2luLnNpbXBsZU5hbWV9XCIgU1VDQ0VTUyAtPiAke2VudFswXX1gKTtcbiAgICAgICAgICAgIHdpbi5leGVjdXRhYmxlRmlsZSA9IGVudFswXTtcbiAgICAgICAgICAgIGZ1bGZpbGwod2luLmV4ZWN1dGFibGVGaWxlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaW5wdXRIYW5kbGVyKGVycm9yLCB3aW4sIHN0ZG91dClcbiAgICAgICAgICAudGhlbihpbnB1dCA9PiB7XG4gICAgICAgICAgICBpZihfaXNEZXNrdG9wRmlsZSh3aW4uZXhlY3V0YWJsZUZpbGUpKSB7XG4gICAgICAgICAgICAgIHdpbi5kZXNrdG9wRmlsZVBhdGggPSBpbnB1dDtcbiAgICAgICAgICAgICAgZnVsZmlsbCh3aW4uZGVza3RvcEZpbGVQYXRoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHdpbi5leGVjdXRhYmxlRmlsZSA9IGlucHV0O1xuICAgICAgICAgICAgICBmdWxmaWxsKHdpbi5leGVjdXRhYmxlRmlsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2gocmVqZWN0KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZihfaXNEZXNrdG9wRmlsZSh3aW4uZXhlY3V0YWJsZUZpbGUpKSB7XG4gICAgICBmaW5kRGVza3RvcEZpbGUod2luLmV4ZWN1dGFibGVGaWxlKVxuICAgICAgICAudGhlbihzdGRvdXQgPT4ge1xuICAgICAgICAgIGNhbGxJbnB1dEhhbmRsZXIobnVsbCwgc3Rkb3V0KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGNhbGxJbnB1dEhhbmRsZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjYWxsSW5wdXRIYW5kbGVyKHRydWUsIHdpbi5leGVjdXRhYmxlRmlsZSk7XG4gICAgfVxuICB9KS5jYXRjaChfY2F0Y2hHZW5lcmljRXJyKTtcbn1cblxuLy8gVE9ETyBjaGVjayBmb3IgaG93IG1hbnkgaW5zdGFuY2VzIHRoZXJlIHNob3VsZCBiZSBydW5uaW5nIG9mIGEgcHJvZ3JhbVxuYXN5bmMgZnVuY3Rpb24gX3N0YXJ0U2Vzc2lvblByb2dyYW1zKFxuICB3aW5kb3dMaXN0OiBXaW5PYmpbXSxcbiAgY3VycmVudFdpbmRvd0xpc3Q6IFdpbk9ialtdXG4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgLy8gc2V0IGluc3RhbmNlcyBzdGFydGVkIHRvIDBcbiAgd2luZG93TGlzdC5mb3JFYWNoKHdpbiA9PiAod2luLmluc3RhbmNlc1N0YXJ0ZWQgPSAwKSk7XG4gIGNvbnN0IHByb21pc2VzID0gd2luZG93TGlzdFxuICAgIC5maWx0ZXIod2luID0+IHtcbiAgICAgIGNvbnN0IG51bWJlck9mSW5zdGFuY2VzT2ZXaW4gPSBfZ2V0TnVtYmVyT2ZJbnN0YW5jZXNUb1J1bihcbiAgICAgICAgd2luLFxuICAgICAgICB3aW5kb3dMaXN0XG4gICAgICApO1xuICAgICAgcmV0dXJuICFfaXNQcm9ncmFtQWxyZWFkeVJ1bm5pbmcoXG4gICAgICAgIHdpbi53bUNsYXNzTmFtZSxcbiAgICAgICAgY3VycmVudFdpbmRvd0xpc3QsXG4gICAgICAgIG51bWJlck9mSW5zdGFuY2VzT2ZXaW4sXG4gICAgICAgIHdpbi5pbnN0YW5jZXNTdGFydGVkXG4gICAgICApO1xuICAgIH0pXG4gICAgLm1hcCh3aW4gPT4ge1xuICAgICAgd2luLmluc3RhbmNlc1N0YXJ0ZWQgKz0gMTtcbiAgICAgIHJldHVybiBzdGFydFByb2dyYW0od2luLmV4ZWN1dGFibGVGaWxlLCB3aW4uZGVza3RvcEZpbGVQYXRoKTtcbiAgICB9KTtcblxuICBhd2FpdCBQcm9taXNlLmFsbChwcm9taXNlcyk7XG59XG5cbmZ1bmN0aW9uIF9nZXROdW1iZXJPZkluc3RhbmNlc1RvUnVuKFxuICB3aW5kb3dUb01hdGNoOiBXaW5PYmosXG4gIHdpbmRvd0xpc3Q6IFdpbk9ialtdXG4pOiBudW1iZXIge1xuICByZXR1cm4gd2luZG93TGlzdC5maWx0ZXIod2luID0+IHtcbiAgICByZXR1cm4gd2luLndtQ2xhc3NOYW1lID09PSB3aW5kb3dUb01hdGNoLndtQ2xhc3NOYW1lO1xuICB9KS5sZW5ndGg7XG59XG5cbmZ1bmN0aW9uIF9pc1Byb2dyYW1BbHJlYWR5UnVubmluZyhcbiAgd21DbGFzc05hbWU6IHN0cmluZyxcbiAgY3VycmVudFdpbmRvd0xpc3Q6IFdpbk9ialtdLFxuICBudW1iZXJPZkluc3RhbmNlc1RvUnVuOiBudW1iZXIsXG4gIGluc3RhbmNlc1N0YXJ0ZWQ6IG51bWJlclxuKTogYm9vbGVhbiB7XG4gIGlmKCFudW1iZXJPZkluc3RhbmNlc1RvUnVuKSB7XG4gICAgbnVtYmVyT2ZJbnN0YW5jZXNUb1J1biA9IDE7XG4gIH1cblxuICBpZighaW5zdGFuY2VzU3RhcnRlZCkge1xuICAgIGluc3RhbmNlc1N0YXJ0ZWQgPSAwO1xuICB9XG5cbiAgbGV0IGluc3RhbmNlc1J1bm5pbmcgPSAwO1xuICBjdXJyZW50V2luZG93TGlzdC5mb3JFYWNoKHdpbiA9PiB7XG4gICAgaWYod2luLndtQ2xhc3NOYW1lID09PSB3bUNsYXNzTmFtZSkge1xuICAgICAgaW5zdGFuY2VzUnVubmluZysrO1xuICAgIH1cbiAgfSk7XG4gIGxvZyhcbiAgICAnU3RhdHVzOiBcIicgKyB3bUNsYXNzTmFtZSArICdcIiBpcyBydW5uaW5nOicsXG4gICAgaW5zdGFuY2VzUnVubmluZyArIGluc3RhbmNlc1N0YXJ0ZWQgPj0gbnVtYmVyT2ZJbnN0YW5jZXNUb1J1bixcbiAgICBudW1iZXJPZkluc3RhbmNlc1RvUnVuLFxuICAgIGluc3RhbmNlc1N0YXJ0ZWRcbiAgKTtcbiAgcmV0dXJuIGluc3RhbmNlc1J1bm5pbmcgKyBpbnN0YW5jZXNTdGFydGVkID49IG51bWJlck9mSW5zdGFuY2VzVG9SdW47XG59XG5cbmZ1bmN0aW9uIF9pc0Rlc2t0b3BGaWxlKGV4ZWN1dGFibGVGaWxlOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgcmV0dXJuIGV4ZWN1dGFibGVGaWxlICYmICEhZXhlY3V0YWJsZUZpbGUubWF0Y2goL2Rlc2t0b3AkLyk7XG59XG5cbmZ1bmN0aW9uIF91cGRhdGVXaW5kb3dJZHMoXG4gIHNhdmVkV2luZG93TGlzdDogV2luT2JqW10sXG4gIGN1cnJlbnRXaW5kb3dMaXN0OiBXaW5PYmpbXVxuKSB7XG4gIGNvbnN0IHdtQ2xhc3NOYW1lTWFwID0ge307XG4gIHNhdmVkV2luZG93TGlzdC5mb3JFYWNoKHdpbiA9PiB7XG4gICAgaWYoIXdtQ2xhc3NOYW1lTWFwW3dpbi53bUNsYXNzTmFtZV0pIHtcbiAgICAgIHdtQ2xhc3NOYW1lTWFwW3dpbi53bUNsYXNzTmFtZV0gPSBfZ2V0TWF0Y2hpbmdXaW5kb3dzKFxuICAgICAgICB3aW4sXG4gICAgICAgIGN1cnJlbnRXaW5kb3dMaXN0XG4gICAgICApO1xuICAgIH1cblxuICAgIHdpbi53aW5kb3dJZCA9IHdtQ2xhc3NOYW1lTWFwW3dpbi53bUNsYXNzTmFtZV1bMF0ud2luZG93SWQ7XG4gICAgd2luLndpbmRvd0lkRGVjID0gcGFyc2VJbnQod2luLndpbmRvd0lkLCAxNik7XG5cbiAgICAvLyByZW1vdmUgZmlyc3QgZW50cnlcbiAgICB3bUNsYXNzTmFtZU1hcFt3aW4ud21DbGFzc05hbWVdLnNoaWZ0KCk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBfZ2V0TWF0Y2hpbmdXaW5kb3dJZChcbiAgd2luOiBXaW5PYmosXG4gIGN1cnJlbnRXaW5kb3dMaXN0OiBXaW5PYmpbXVxuKTogc3RyaW5nIHtcbiAgY29uc3QgY3VycmVudFdpbmRvdyA9IGN1cnJlbnRXaW5kb3dMaXN0LmZpbmQoXG4gICAgd2luRnJvbUN1cnJlbnQgPT4gd2luLndtQ2xhc3NOYW1lID09PSB3aW5Gcm9tQ3VycmVudC53bUNsYXNzTmFtZVxuICApO1xuICByZXR1cm4gY3VycmVudFdpbmRvdyAmJiBjdXJyZW50V2luZG93LndpbmRvd0lkO1xufVxuXG5mdW5jdGlvbiBfZ2V0TWF0Y2hpbmdXaW5kb3dzKFxuICB3aW46IFdpbk9iaixcbiAgY3VycmVudFdpbmRvd0xpc3Q6IFdpbk9ialtdXG4pOiBXaW5PYmpbXSB7XG4gIHJldHVybiBjdXJyZW50V2luZG93TGlzdC5maWx0ZXIoXG4gICAgd2luRnJvbUN1cnJlbnQgPT4gd2luLndtQ2xhc3NOYW1lID09PSB3aW5Gcm9tQ3VycmVudC53bUNsYXNzTmFtZVxuICApO1xufVxuXG5hc3luYyBmdW5jdGlvbiBfcmVzdG9yZVdpbmRvd1Bvc2l0aW9ucyhcbiAgc2F2ZWRXaW5kb3dMaXN0OiBXaW5PYmpbXVxuKTogUHJvbWlzZTx2b2lkPiB7XG4gIGNvbnN0IHByb21pc2VzID0gW107XG4gIHNhdmVkV2luZG93TGlzdC5mb3JFYWNoKHdpbiA9PiB7XG4gICAgcHJvbWlzZXMucHVzaChyZXN0b3JlV2luZG93UG9zaXRpb24od2luKSk7XG4gICAgcHJvbWlzZXMucHVzaChtb3ZlVG9Xb3Jrc3BhY2Uod2luLndpbmRvd0lkLCB3aW4ud21DdXJyZW50RGVza3RvcE5yKSk7XG4gIH0pO1xuXG4gIGZvciAoY29uc3QgcHJvbWlzZSBvZiBwcm9taXNlcykge1xuICAgIHRyeSB7XG4gICAgICBhd2FpdCBwcm9taXNlO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIF9jYXRjaEdlbmVyaWNFcnIoZSk7XG4gICAgfVxuICB9XG59XG4iXSwibmFtZXMiOlsiZnMubWtkaXJTeW5jIiwiZnMucmVhZEZpbGVTeW5jIiwiZnMud3JpdGVGaWxlU3luYyIsImZzLmV4aXN0c1N5bmMiLCJmcy51bmxpbmtTeW5jIiwiX2NhdGNoR2VuZXJpY0VyciIsImZzLnVubGluayJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7U0FFZ0IsU0FBUyxDQUFDLE9BQU87SUFDL0IsSUFBSTtRQUNGQSxXQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDdkI7SUFBQyxPQUFPLEdBQUcsRUFBRTtRQUNaLElBQUksR0FBRyxDQUFDLElBQUksS0FBSyxRQUFRLEVBQUU7WUFDekIsTUFBTSxHQUFHLENBQUM7U0FDWDtLQUNGO0FBQ0gsQ0FBQztTQW9CZSxTQUFTO0lBQUMsaUJBQVU7U0FBVixVQUFVLEVBQVYscUJBQVUsRUFBVixJQUFVO1FBQVYsNEJBQVU7O0lBQ2xDLElBQU0sUUFBUSxHQUFHLFVBQUEsR0FBRyxJQUFJ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
