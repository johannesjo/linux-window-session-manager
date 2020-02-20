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
    var isNormalWindow = (!win.wmType || win.wmType === "_NET_WM_WINDOW_TYPE_NORMAL") &&
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

module.exports = index;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlsaXR5LnRzIiwiLi4vc3JjL2RlZmF1bHRDb25maWcudHMiLCIuLi9zcmMvbG9nLnRzIiwiLi4vc3JjL2NvbmZpZy50cyIsIi4uL3NyYy9pc0RlYnVnLnRzIiwiLi4vc3JjL3BhcnNlQ21kVG9TcGF3bi50cyIsIi4uL3NyYy94MTFXcmFwcGVyLnRzIiwiLi4vc3JjL290aGVyQ21kLnRzIiwiLi4vc3JjL21ldGFXcmFwcGVyLnRzIiwiLi4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGZzIGZyb20gXCJmc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gbWtkaXJTeW5jKGRpclBhdGgpIHtcbiAgdHJ5IHtcbiAgICBmcy5ta2RpclN5bmMoZGlyUGF0aCk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGlmIChlcnIuY29kZSAhPT0gXCJFRVhJU1RcIikge1xuICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbWtmaWxlU3luYyhmaWxlUGF0aCkge1xuICB0cnkge1xuICAgIGZzLndyaXRlRmlsZVN5bmMoZmlsZVBhdGgsIHsgZmxhZzogXCJ3eFwiIH0pO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBpZiAoZXJyLmNvZGUgIT09IFwiRUVYSVNUXCIpIHtcbiAgICAgIHRocm93IGVycjtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvcHlTeW5jKHNyYywgZGVzdCkge1xuICBpZiAoIWZzLmV4aXN0c1N5bmMoc3JjKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBjb25zdCBkYXRhID0gZnMucmVhZEZpbGVTeW5jKHNyYywgXCJ1dGYtOFwiKTtcbiAgZnMud3JpdGVGaWxlU3luYyhkZXN0LCBkYXRhKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlRGVlcCguLi5vYmplY3RzKSB7XG4gIGNvbnN0IGlzT2JqZWN0ID0gb2JqID0+IG9iaiAmJiB0eXBlb2Ygb2JqID09PSBcIm9iamVjdFwiO1xuXG4gIHJldHVybiBvYmplY3RzLnJlZHVjZSgocHJldiwgb2JqKSA9PiB7XG4gICAgT2JqZWN0LmtleXMob2JqKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICBjb25zdCBwVmFsID0gcHJldltrZXldO1xuICAgICAgY29uc3Qgb1ZhbCA9IG9ialtrZXldO1xuXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShwVmFsKSAmJiBBcnJheS5pc0FycmF5KG9WYWwpKSB7XG4gICAgICAgIHByZXZba2V5XSA9IHBWYWwuY29uY2F0KC4uLm9WYWwpO1xuICAgICAgfSBlbHNlIGlmIChpc09iamVjdChwVmFsKSAmJiBpc09iamVjdChvVmFsKSkge1xuICAgICAgICBwcmV2W2tleV0gPSBtZXJnZURlZXAocFZhbCwgb1ZhbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwcmV2W2tleV0gPSBvVmFsO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHByZXY7XG4gIH0sIHt9KTtcbn1cbiIsImV4cG9ydCBjb25zdCBERUZBVUxUX0NGRyA9IHtcbiAgR0lWRV9YMTFfVElNRV9USU1FT1VUOiA4MCxcbiAgUE9MTF9BTExfQVBQU19TVEFSVEVEX0lOVEVSVkFMOiAyMDAwLFxuICBQT0xMX0FMTF9NQVhfVElNRU9VVDogMTIwMDAwLFxuICBTQVZFX1NFU1NJT05fSU5fUFJFVFRZX0ZPUk1BVDogdHJ1ZSxcbiAgV01fQ0xBU1NfQU5EX0VYRUNVVEFCTEVfRklMRV9NQVA6IHtcbiAgICBcImdub21lLXRlcm1pbmFsLXNlcnZlci5Hbm9tZS10ZXJtaW5hbFwiOiBcImdub21lLXRlcm1pbmFsXCIsXG4gICAgXCJnb29nbGUtY2hyb21lLkdvb2dsZS1jaHJvbWVcIjogXCJnb29nbGUtY2hyb21lLmRlc2t0b3BcIixcbiAgICBcImJyYXZlLWJyb3dzZXIuQnJhdmUtYnJvd3NlclwiOiBcImJyYXZlLWJyb3dzZXIuZGVza3RvcFwiLFxuICAgIFwiTWFpbC5UaHVuZGVyYmlyZFwiOiBcInRodW5kZXJiaXJkLmRlc2t0b3BcIixcbiAgICBcIm5hdXRpbHVzLk5hdXRpbHVzXCI6IFwibmF1dGlsdXNcIixcbiAgICBcIm9yZy5nbm9tZS5OYXV0aWx1cy5PcmcuZ25vbWUuTmF1dGlsdXNcIjogXCJuYXV0aWx1c1wiLFxuICAgIFwiTmF2aWdhdG9yLkZpcmVmb3hcIjogXCJmaXJlZm94LmRlc2t0b3BcIixcbiAgICBcIk5hdmlnYXRvci5QYWxlXCI6IFwicGFsZW1vb24uZGVza3RvcFwiLFxuICAgIFwic2t5cGUuU2t5cGVcIjogXCJza3lwZWZvcmxpbnV4LmRlc2t0b3BcIixcbiAgICBcInN1bi1hd3QtWDExLVhGcmFtZVBlZXIuamV0YnJhaW5zLWlkZWFcIjogXCJqZXRicmFpbnMtaWRlYS5kZXNrdG9wXCIsXG4gICAgXCJWaXJ0dWFsQm94LlZpcnR1YWxCb3hcIjogXCJ2aXJ0dWFsYm94LmRlc2t0b3BcIixcbiAgICBcIlRlbGVncmFtLlRlbGVncmFtRGVza3RvcFwiOiBcInRlbGVncmFtLWRlc2t0b3BfdGVsZWdyYW1kZXNrdG9wLmRlc2t0b3BcIixcbiAgICBcInRlbGVncmFtLWRlc2t0b3AuVGVsZWdyYW1EZXNrdG9wXCI6IFwidGVsZWdyYW1kZXNrdG9wLmRlc2t0b3BcIixcbiAgICBcImtlZXBhc3N4Yy5rZWVwYXNzeGNcIjogXCJrZWVwYXNzeGNfa2VlcGFzc3hjLmRlc2t0b3BcIixcbiAgICBcInNsYWNrLlNsYWNrXCI6IFwiY29tLnNsYWNrLlNsYWNrLmRlc2t0b3BcIixcbiAgICBcInNpZ25hbC5TaWduYWxcIjogXCJzaWduYWwtZGVza3RvcC5kZXNrdG9wXCIsXG4gICAgXCJtaWNyb3NvZnQgdGVhbXMgLSBwcmV2aWV3Lk1pY3Jvc29mdCBUZWFtcyAtIFByZXZpZXdcIjogXCJ0ZWFtcy5kZXNrdG9wXCJcbiAgfSxcbiAgV01fQ0xBU1NfRVhDTFVTSU9OUzogW1xuICAgIFwiTi9BXCIsXG4gICAgXCJ0aWxkYS5UaWxkYVwiLFxuICAgIFwiUG9wdXAuZGVza3RvcFwiLFxuICAgIFwidXBkYXRlLW1hbmFnZXIuVXBkYXRlLW1hbmFnZXJcIixcbiAgICBcImRlc2t0b3Bfd2luZG93Lk5hdXRpbHVzXCIsXG4gICAgXCJlbGVjdHJvbi5FbGVjdHJvblwiLFxuICAgIFwiZ3Vha2UuTWFpbi5weVwiLFxuICAgIFwiZ25vbWUtc29mdHdhcmUuR25vbWUtc29mdHdhcmVcIlxuICBdLFxuICBXTV9NRVRBX01BUDoge1xuICAgIFwiV01fV0lORE9XX1JPTEUoU1RSSU5HKVwiOiBcIndtUm9sZVwiLFxuICAgIFwiV01fQ0xBU1MoU1RSSU5HKVwiOiBcIndtQ2xhc3NOYW1lXCIsXG4gICAgXCJfTkVUX1dNX1NUQVRFKEFUT00pXCI6IFwic3RhdGVzXCIsXG4gICAgXCJfTkVUX1dNX0RFU0tUT1AoQ0FSRElOQUwpXCI6IFwid21DdXJyZW50RGVza3RvcE5yXCIsXG4gICAgXCJXTV9OQU1FKFVURjhfU1RSSU5HKVwiOiBcIndtVGl0bGVcIixcbiAgICBcIl9ORVRfV01fUElEKENBUkRJTkFMKVwiOiBcIndtUGlkXCIsXG4gICAgXCJfTkVUX1dNX1dJTkRPV19UWVBFKEFUT00pXCI6IFwid21UeXBlXCIsXG4gICAgXCJfQkFNRl9ERVNLVE9QX0ZJTEUoU1RSSU5HKVwiOiBcImV4ZWN1dGFibGVGaWxlXCJcbiAgfSxcbiAgV01fTUVUQV9NQVBfTlVNQkVSX1RZUEVTOiBbXG4gICAgXCJfTkVUX1dNX1BJRChDQVJESU5BTClcIixcbiAgICBcIl9ORVRfV01fREVTS1RPUChDQVJESU5BTClcIlxuICBdLFxuICBERVNLVE9QX0ZJTEVfTE9DQVRJT05TOiBbXG4gICAgXCJ7aG9tZX0vLmxvY2FsL3NoYXJlL2FwcGxpY2F0aW9uc1wiLFxuICAgIFwie2hvbWV9Ly5nbm9tZS9hcHBzXCIsXG4gICAgXCIvdXNyL3NoYXJlL2FwcGxpY2F0aW9uc1wiLFxuICAgIFwiL3Vzci9sb2NhbC9zaGFyZS9hcHBsaWNhdGlvbnNcIixcbiAgICBcIi91c3Ivc2hhcmUvYXBwLWluc3RhbGxcIixcbiAgICBcIntob21lfS8uY29uZmlnL2F1dG9zdGFydFwiLFxuICAgIFwiL3Zhci9saWIvc25hcGQvZGVza3RvcC9hcHBsaWNhdGlvbnNcIixcbiAgICBcIi92YXIvbGliL2ZsYXRwYWsvYXBwXCIsXG4gICAgXCIvdmFyL2xpYi9mbGF0cGFrL2V4cG9ydHMvc2hhcmUvYXBwbGljYXRpb25zXCIsXG4gICAgXCIvc25hcC9iaW5cIlxuICBdXG59O1xuXG4iLCJleHBvcnQgY29uc3QgbG9nID0gKC4uLmFyZ3MpID0+IGNvbnNvbGUubG9nKC4uLmFyZ3MpO1xuIiwiaW1wb3J0IHsgbWVyZ2VEZWVwLCBta2RpclN5bmMgfSBmcm9tIFwiLi91dGlsaXR5XCI7XG5pbXBvcnQgeyBERUZBVUxUX0NGRyB9IGZyb20gXCIuL2RlZmF1bHRDb25maWdcIjtcbmltcG9ydCAqIGFzIGZzIGZyb20gXCJmc1wiO1xuaW1wb3J0IHsgbG9nIH0gZnJvbSBcIi4vbG9nXCI7XG5cbmxldCBjZmc7XG5cbmV4cG9ydCBjb25zdCBDRkdfREFUQV9ESVIgPSBfZ2V0VXNlckhvbWUoKSArIFwiLy5sd3NtXCI7XG5leHBvcnQgY29uc3QgQ0ZHX0ZJTEVfUEFUSCA9IENGR19EQVRBX0RJUiArIFwiL2NvbmZpZy5qc29uXCI7XG5leHBvcnQgY29uc3QgU0VTU0lPTl9EQVRBX0RJUiA9IENGR19EQVRBX0RJUiArIFwiL3Nlc3Npb25EYXRhXCI7XG5cbi8vIElOSVRcbi8vIC0tLS0tLS0tLS0tLVxudHJ5IHtcbiAgLy8gaWYgY29uZmlnIGlzIGFscmVhZHkgaW4gcGxhY2VcbiAgY29uc3QgZnJvbUZpbGUgPSBKU09OLnBhcnNlKGZzLnJlYWRGaWxlU3luYyhDRkdfRklMRV9QQVRILCBcInV0ZjhcIikpO1xuICBjZmcgPSBtZXJnZURlZXAoREVGQVVMVF9DRkcsIGZyb21GaWxlKTtcbn0gY2F0Y2ggKGUpIHtcbiAgbG9nKFxuICAgIFwibHdzbTogbm8gY29uZmlnIGZpbGUgcHJlc2VudCBvciBpdCBjb250YWlucyBpbnZhbGlkIGpzb24uIENyZWF0aW5nIG5ldyBvbmUuLi5cIlxuICApO1xuXG4gIC8vIGlmIHRoZXJlIGlzIG5vIGNvbmZpZyB5ZXQgbG9hZCBkZWZhdWx0IGNmZyBhbmQgY3JlYXRlIGZpbGVzIGFuZCBkaXJzXG4gIGNmZyA9IERFRkFVTFRfQ0ZHO1xuXG4gIC8vIHNhdmUgZXhlY3V0YWJsZSBwYXRocyB0byBjZmdcbiAgY2ZnLkNNRF9KU0ZJTEVfUEFUSCA9IF9fZGlybmFtZSArIFwiLy4uL2NtZC5qc1wiO1xuICBjZmcuSlNGSUxFX0lOREVYX1BBVEggPSBfX2Rpcm5hbWUgKyBcIi9pbmRleC5qc1wiO1xuXG4gIG1rZGlyU3luYyhDRkdfREFUQV9ESVIpO1xuICBta2RpclN5bmMoU0VTU0lPTl9EQVRBX0RJUik7XG5cbiAgLy8gd3JpdGUgY29uZmlnIHRvIHVzZXIgZGlyXG4gIGZzLndyaXRlRmlsZVN5bmMoQ0ZHX0ZJTEVfUEFUSCwgSlNPTi5zdHJpbmdpZnkoY2ZnLCBudWxsLCAyKSwgXCJ1dGY4XCIpO1xufVxuXG4vLyBhbHNvIG1ha2UgZGF0YSBkaXJzIGFjY2Vzc2libGUgdG8gdGhlIG91dHNpZGVcbmNmZy5EQVRBX0RJUiA9IENGR19EQVRBX0RJUjtcbmNmZy5TRVNTSU9OX0RBVEFfRElSID0gU0VTU0lPTl9EQVRBX0RJUjtcblxuZXhwb3J0IGNvbnN0IENGRyA9IGNmZztcblxuZnVuY3Rpb24gX2dldFVzZXJIb21lKCkge1xuICByZXR1cm4gcHJvY2Vzcy5lbnZbcHJvY2Vzcy5wbGF0Zm9ybSA9PT0gXCJ3aW4zMlwiID8gXCJVU0VSUFJPRklMRVwiIDogXCJIT01FXCJdO1xufVxuIiwiZXhwb3J0IGNvbnN0IElTX0RFQlVHID0gcHJvY2Vzcy5hcmd2LmluZGV4T2YoXCItLWRlYnVnXCIpID4gLTE7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0IGNvbnN0IHBhcnNlQ21kQXJncyA9IGNtZCA9PiB7XG4gIGxldCBjbWRBbGxTcGxpdCA9IGNtZC5zcGxpdCgvIC8pO1xuICBsZXQgbWFpbkNvbW1hbmQgPSBjbWRBbGxTcGxpdFswXTtcbiAgbGV0IGFyZ3MgPSBbXTtcbiAgY21kQWxsU3BsaXQubWFwKGZ1bmN0aW9uKHMsIGkpIHtcbiAgICBpZiAoaSAhPT0gMCkge1xuICAgICAgYXJnc1tpIC0gMV0gPSBjbWRBbGxTcGxpdFtpXTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gW21haW5Db21tYW5kLCBfbWVyZ2VRdW90ZWRTdHJpbmdQYXJhbXMoYXJncyldO1xufTtcblxuZnVuY3Rpb24gX21lcmdlUXVvdGVkU3RyaW5nUGFyYW1zKGFyZ3MpIHtcbiAgY29uc3QgbmV3QXJncyA9IFtdO1xuICBsZXQgaXNJblF1b3RhdGlvbiA9IGZhbHNlO1xuICBsZXQgY3VycmVudFF1b3RhdGlvbkFyZztcblxuICAvLyBUT0RPIG1ha2UgaXQgd29yayB3aXRoIG1vcmUgZGlmZmVyZW50IHF1b3RhdGlvbiB0eXBlc1xuICBhcmdzLmZvckVhY2goYXJnID0+IHtcbiAgICAvLyBtYXRjaCBxdW90YXRpb24gZW5kXG4gICAgaWYgKGFyZy5tYXRjaCgvJyQvKSkge1xuICAgICAgY3VycmVudFF1b3RhdGlvbkFyZyArPSBcIiBcIiArIGFyZy5zbGljZSgwLCBhcmcubGVuZ3RoIC0gMSk7XG4gICAgICBuZXdBcmdzLnB1c2goY3VycmVudFF1b3RhdGlvbkFyZyk7XG4gICAgICBjdXJyZW50UXVvdGF0aW9uQXJnID0gdW5kZWZpbmVkO1xuICAgICAgaXNJblF1b3RhdGlvbiA9IGZhbHNlO1xuICAgIH1cbiAgICAvLyBtYXRjaCBxdW90YXRpb24gc3RhcnRcbiAgICBlbHNlIGlmIChhcmcubWF0Y2goL14nLykpIHtcbiAgICAgIGlzSW5RdW90YXRpb24gPSB0cnVlO1xuICAgICAgY3VycmVudFF1b3RhdGlvbkFyZyA9IGFyZy5zdWJzdHIoMSwgYXJnLmxlbmd0aCk7XG4gICAgfVxuICAgIC8vIHdoaWxlIGluIHF1b3RhdGlvblxuICAgIGVsc2UgaWYgKGlzSW5RdW90YXRpb24pIHtcbiAgICAgIGN1cnJlbnRRdW90YXRpb25BcmcgKz0gXCIgXCIgKyBhcmc7XG4gICAgfSBlbHNlIGlmIChhcmcgIT09IFwiXCIpIHtcbiAgICAgIG5ld0FyZ3MucHVzaChhcmcpO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIG5ld0FyZ3M7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgbG9nIH0gZnJvbSBcIi4vbG9nXCI7XG5pbXBvcnQgeyBDRkcgfSBmcm9tIFwiLi9jb25maWdcIjtcblxuY29uc3QgeDExID0gcmVxdWlyZShcIngxMVwiKTtcblxuZXhwb3J0IGxldCBYO1xubGV0IHJvb3Q7XG5sZXQgZGlzcGxheTtcblxuLy8gZXhwb3J0IGNvbnN0IGdldFdpbmRvd0luZm8gPSB3cmFwWDExKF9nZXRXaW5kb3dJbmZvKTtcbmV4cG9ydCBjb25zdCBnZXRYID0gKCkgPT4gWDtcblxuZnVuY3Rpb24gY2F0Y2hHZW5lcmljRXJyKGVycikge1xuICBjb25zb2xlLmVycm9yKFwieDExV3JhcHBlcjogXCIsIGVyciwgZXJyLnN0YWNrKTtcbn1cblxubGV0IGlzQ2xpZW50SW5pdGlhbGl6ZWQgPSBmYWxzZTtcbmxldCBpbml0UHJvbWlzZTtcblxuZXhwb3J0IGZ1bmN0aW9uIGluaXRYMTEoKTogUHJvbWlzZTxhbnk+IHtcbiAgaWYgKGlzQ2xpZW50SW5pdGlhbGl6ZWQpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cbiAgaWYgKGluaXRQcm9taXNlKSB7XG4gICAgcmV0dXJuIGluaXRQcm9taXNlO1xuICB9XG4gIGluaXRQcm9taXNlID0gbmV3IFByb21pc2UoKGZ1bGZpbGwsIHJlamVjdCkgPT4ge1xuICAgIHgxMVxuICAgICAgLmNyZWF0ZUNsaWVudCgoZXJyLCBkaXNwbGF5SW4pID0+IHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRpc3BsYXkgPSBkaXNwbGF5SW47XG4gICAgICAgICAgWCA9IGRpc3BsYXkuY2xpZW50O1xuXG4gICAgICAgICAgcm9vdCA9IGRpc3BsYXkuc2NyZWVuWzBdLnJvb3Q7XG4gICAgICAgICAgaXNDbGllbnRJbml0aWFsaXplZCA9IHRydWU7XG4gICAgICAgICAgZnVsZmlsbCgpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLm9uKFwiZXJyb3JcIiwgZXJyID0+IHtcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgfSk7XG4gIH0pLmNhdGNoKGNhdGNoR2VuZXJpY0Vycik7XG4gIHJldHVybiBpbml0UHJvbWlzZTtcbn1cblxuLy8gTUVUSE9EU1xuLy8gLS0tLS0tLVxuZXhwb3J0IGZ1bmN0aW9uIGdldERpc3BsYXlzKCk6IGFueVtdIHtcbiAgaWYgKCFkaXNwbGF5KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiWDExIG5vdCBpbml0aWFsaXplZCAvIE5vIHNjcmVlbiBhdmFpbGFibGVcIik7XG4gIH1cbiAgcmV0dXJuIGRpc3BsYXkuc2NyZWVuO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0V2luZG93R2VvbWV0cnkod2luSWQpIHtcbiAgY29uc3QgZ2VvOiBhbnkgPSB7fTtcblxuICByZXR1cm4gbmV3IFByb21pc2UoKGZ1bGZpbGwsIHJlamVjdCkgPT4ge1xuICAgIFguVHJhbnNsYXRlQ29vcmRpbmF0ZXMod2luSWQsIHJvb3QsIDAsIDAsIChlcnIsIHJlcykgPT4ge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGdlby54ID0gcmVzLmRlc3RYO1xuICAgICAgICBnZW8ueSA9IHJlcy5kZXN0WTtcblxuICAgICAgICBYLkdldEdlb21ldHJ5KHdpbklkLCAoZXJyLCByZXMpID0+IHtcbiAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZ2VvLndpZHRoID0gcmVzLndpZHRoO1xuICAgICAgICAgICAgZ2VvLmhlaWdodCA9IHJlcy5oZWlnaHQ7XG4gICAgICAgICAgICBmdWxmaWxsKGdlbyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSkuY2F0Y2goY2F0Y2hHZW5lcmljRXJyKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEFjdGl2ZVdpbmRvd0lkcygpOiBQcm9taXNlPHN0cmluZ1tdPiB7XG4gIGNvbnN0IFBST1BfTkFNRSA9IFwiX05FVF9DTElFTlRfTElTVFwiO1xuICBjb25zdCBwcm9wSWQgPSBhd2FpdCBfZ2V0UHJvcGVydHlJZEJ5TmFtZShyb290LCBQUk9QX05BTUUpO1xuICBjb25zdCBpZFN0ciA9IGF3YWl0IGdldFByb3Aocm9vdCwgcHJvcElkIGFzIG51bWJlcik7XG4gIHJldHVybiBfcGFyc2VXaW5kb3dJZHMoaWRTdHIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVzdG9yZVdpbmRvd1Bvc2l0aW9uKHdpbikge1xuICBsb2coJ1Jlc3RvcmluZyB3aW5kb3cgcG9zaXRpb24gZm9yIFwiJyArIHdpbi53bUNsYXNzTmFtZSArICdcIicpO1xuICBjb25zdCBTVEFURVNfVE9fUkVTRVQgPSBbXG4gICAgXCJfTkVUX1dNX1NUQVRFX01BWElNSVpFRF9WRVJUXCIsXG4gICAgXCJfTkVUX1dNX1NUQVRFX01BWElNSVpFRF9IT1JaXCJcbiAgXTtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChmdWxmaWxsLCByZWplY3QpID0+IHtcbiAgICBzZXRTdGF0ZSh3aW4ud2luZG93SWQsIFwicmVtb3ZlXCIsIFNUQVRFU19UT19SRVNFVClcbiAgICAgIC5jYXRjaChyZWplY3QpXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIFguTW92ZVJlc2l6ZVdpbmRvdyh3aW4ud2luZG93SWQsIHdpbi54LCB3aW4ueSwgd2luLndpZHRoLCB3aW4uaGVpZ2h0KTtcbiAgICAgICAgc2V0U3RhdGUod2luLndpbmRvd0lkLCBcImFkZFwiLCB3aW4uc3RhdGVzKVxuICAgICAgICAgIC5jYXRjaChyZWplY3QpXG4gICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgZnVsZmlsbCgpO1xuICAgICAgICAgIH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChyZWplY3QpO1xuICB9KS5jYXRjaChjYXRjaEdlbmVyaWNFcnIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xvc2VXaW5kb3cod2luSWQpIHtcbiAgcmV0dXJuIF9zZW5kWDExQ2xpZW50TWVzc2FnZSh3aW5JZCwgXCJfTkVUX0NMT1NFX1dJTkRPV1wiKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1vdmVUb1dvcmtzcGFjZSh3aW5JZCwgd29ya1NwYWNlTnIpIHtcbiAgLy8gTk9URTogaWYgaXQgZG9lc24ndCB3b3JrIHdlIG1pZ2h0IGFsc28gd2FudCB0byB1c2UgX1dJTl9XT1JLU1BBQ0VcbiAgcmV0dXJuIF9zZW5kWDExQ2xpZW50TWVzc2FnZSh3aW5JZCwgXCJfTkVUX1dNX0RFU0tUT1BcIiwgW1xuICAgIHtcbiAgICAgIHZhbHVlOiB3b3JrU3BhY2VOclxuICAgIH1cbiAgXSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnb1RvVmlld3BvcnQoeCwgeSkge1xuICByZXR1cm4gX3NlbmRYMTFDbGllbnRNZXNzYWdlKHJvb3QsIFwiX05FVF9ERVNLVE9QX1ZJRVdQT1JUXCIsIFtcbiAgICB7IHZhbHVlOiB4IH0sXG4gICAgeyB2YWx1ZTogeSB9XG4gIF0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0U3RhdGUod2lkLCBhY3Rpb25TdHIsIHN0YXRlc1RvSGFuZGxlKSB7XG4gIGNvbnN0IEFDVElPTlNfTUFQID0ge1xuICAgIHJlbW92ZTogMCxcbiAgICBhZGQ6IDEsXG4gICAgdG9nZ2xlOiAyXG4gIH07XG4gIGNvbnN0IGFjdGlvbiA9IEFDVElPTlNfTUFQW2FjdGlvblN0cl07XG4gIGxldCBwcm9wZXJ0aWVzOiBhbnlbXSA9IFt7IHZhbHVlOiBhY3Rpb24gfV07XG5cbiAgLy8gYWxsIHByb3BlcnRpZXMgbmVlZCB0byBiZSBsb29rZWQgdXAgZm9yIHRoZWlyIGF0b20gaWRcbiAgaWYgKEFycmF5LmlzQXJyYXkoc3RhdGVzVG9IYW5kbGUpICYmIHN0YXRlc1RvSGFuZGxlLmxlbmd0aCA+IDApIHtcbiAgICBzdGF0ZXNUb0hhbmRsZS5mb3JFYWNoKHN0YXRlUHJvcGVydHkgPT4ge1xuICAgICAgcHJvcGVydGllcy5wdXNoKHtcbiAgICAgICAgaXNBdG9tOiB0cnVlLFxuICAgICAgICB2YWx1ZTogc3RhdGVQcm9wZXJ0eVxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIF9zZW5kWDExQ2xpZW50TWVzc2FnZSh3aWQsIFwiX05FVF9XTV9TVEFURVwiLCBwcm9wZXJ0aWVzKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cbn1cblxuY29uc3QgUFJPUFNfVE9fR0VUID0gW1xuICBcIldNX0NMQVNTXCIsXG4gIFwiX05FVF9XTV9TVEFURVwiLFxuICBcIl9ORVRfV01fREVTS1RPUFwiLFxuICBcIldNX05BTUVcIixcbiAgXCJfTkVUX1dNX1BJRFwiLFxuICBcIl9ORVRfV01fV0lORE9XX1RZUEVcIixcbiAgXCJfQkFNRl9ERVNLVE9QX0ZJTEVcIlxuXTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFdpbmRvd0luZm8od2lkKTogUHJvbWlzZTxhbnk+IHtcbiAgLy8gWC5HZXRHZW9tZXRyeSh3aWQsIGZ1bmN0aW9uIChlcnIsIGNsaWVudEdlb20pIHtcbiAgLy8gICBjb25zb2xlLmxvZyhcIndpbmRvdyBnZW9tZXRyeTogXCIsIGNsaWVudEdlb20pO1xuICAvLyB9KTtcblxuICBjb25zdCBwcm9wczogYW55W10gPSBhd2FpdCBfeENiVG9Qcm9taXNlKFguTGlzdFByb3BlcnRpZXMsIHdpZCk7XG5cbiAgY29uc3QgcHJvbWlzZXMgPSBwcm9wcy5tYXAoYXN5bmMgZnVuY3Rpb24ocCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBwcm9wTmFtZSA9IGF3YWl0IF94Q2JUb1Byb21pc2UoWC5HZXRBdG9tTmFtZSwgcCk7XG4gICAgICAgIGlmIChQUk9QU19UT19HRVQuaW5jbHVkZXMocHJvcE5hbWUpKSB7XG4gICAgICAgICAgY29uc3QgcHJvcFZhbCA9IGF3YWl0IF94Q2JUb1Byb21pc2UoXG4gICAgICAgICAgICBYLkdldFByb3BlcnR5LFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIHdpZCxcbiAgICAgICAgICAgIHAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDEwMDAwMDAwXG4gICAgICAgICAgKTtcbiAgICAgICAgICBjb25zdCB0eXBlTmFtZSA9IGF3YWl0IF94Q2JUb1Byb21pc2UoWC5HZXRBdG9tTmFtZSwgcHJvcFZhbC50eXBlKTtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhwcm9wVmFsLCB0eXBlTmFtZSwgcHJvcE5hbWUpO1xuICAgICAgICAgIGNvbnN0IGRlY29kZWREYXRhID0gYXdhaXQgX2RlY29kZVByb3BlcnR5KHR5cGVOYW1lLCBwcm9wVmFsLmRhdGEpO1xuICAgICAgICAgIHJlc29sdmUocHJvcE5hbWUgKyBcIihcIiArIHR5cGVOYW1lICsgXCIpID0gXCIgKyBkZWNvZGVkRGF0YSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzb2x2ZShcIlwiKTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICByZWplY3QoZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xuXG4gIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbihyZXN1bHRzID0+IHtcbiAgICByZXR1cm4gcmVzdWx0cy5qb2luKFwiXFxuXCIpO1xuICB9KTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFByb3AoaWQgPSByb290LCBwcm9wSWQ6IG51bWJlcik6IFByb21pc2U8YW55PiB7XG4gIGNvbnN0IHByb3BWYWwgPSBhd2FpdCBfeENiVG9Qcm9taXNlKFxuICAgIFguR2V0UHJvcGVydHksXG4gICAgMCxcbiAgICBpZCxcbiAgICBwcm9wSWQsXG4gICAgMCxcbiAgICAwLFxuICAgIDEwMDAwMDAwXG4gICk7XG4gIGNvbnN0IHR5cGVOYW1lID0gYXdhaXQgX3hDYlRvUHJvbWlzZShYLkdldEF0b21OYW1lLCBwcm9wVmFsLnR5cGUpO1xuICByZXR1cm4gYXdhaXQgX2RlY29kZVByb3BlcnR5KHR5cGVOYW1lLCBwcm9wVmFsLmRhdGEpO1xufVxuXG4vLyBIRUxQRVJcbi8vIC0tLS0tLVxuZnVuY3Rpb24gX3hDYlRvUHJvbWlzZShmbiwgLi4uYXJncyk6IGFueSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgoZnVsZmlsbCwgcmVqZWN0KSA9PiB7XG4gICAgZm4uYXBwbHkoWCwgW1xuICAgICAgLi4uYXJncyxcbiAgICAgIChlcnIsIHJlcykgPT4ge1xuICAgICAgICByZXR1cm4gZXJyID8gcmVqZWN0KGVycikgOiBmdWxmaWxsKHJlcyk7XG4gICAgICB9XG4gICAgXSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBfY291bnRlcihpbml0aWFsVmFsLCBtb2RpZmllcikge1xuICAvLyB0byBzdGFydCBhdCB2YWwgd2UgbmVlZCB0byBzdWJ0cmFjdCB0aGUgbW9kaWZpZXIgZmlyc3RcbiAgbGV0IHZhbCA9IGluaXRpYWxWYWwgLSBtb2RpZmllcjtcbiAgcmV0dXJuICgpID0+IHtcbiAgICB2YWwgKz0gbW9kaWZpZXI7XG4gICAgcmV0dXJuIHZhbDtcbiAgfTtcbn1cblxuZnVuY3Rpb24gX2dldEF0b21zKGxpc3QsIGNiKSB7XG4gIGNvbnN0IHJlcyA9IHt9O1xuICBjb25zdCBnZXRBdG9tID0gKCkgPT4ge1xuICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIGNiKG51bGwsIHJlcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG5hbWUgPSBsaXN0LnNoaWZ0KCk7XG4gICAgICBYLkludGVybkF0b20oZmFsc2UsIG5hbWUsIChlcnIsIGF0b20pID0+IHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIHJldHVybiBjYihlcnIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc1tuYW1lXSA9IGF0b207XG4gICAgICAgICAgZ2V0QXRvbSgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG4gIGdldEF0b20oKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gX2dldFByb3BlcnR5SWRCeU5hbWUoXG4gIHdpZDogc3RyaW5nLFxuICBuYW1lVG9HZXQ6IHN0cmluZ1xuKTogUHJvbWlzZTxudW1iZXI+IHtcbiAgY29uc3QgcHJvcHM6IGFueVtdID0gYXdhaXQgX3hDYlRvUHJvbWlzZShYLkxpc3RQcm9wZXJ0aWVzLCB3aWQpO1xuICBjb25zdCBwcm9taXNlcyA9IHByb3BzLm1hcChhc3luYyBmdW5jdGlvbihwKSB7XG4gICAgY29uc3QgcHJvcE5hbWUgPSBhd2FpdCBfeENiVG9Qcm9taXNlKFguR2V0QXRvbU5hbWUsIHApO1xuICAgIGlmIChuYW1lVG9HZXQgPT09IHByb3BOYW1lKSB7XG4gICAgICByZXR1cm4gcDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfSk7XG5cbiAgY29uc3QgcmVzID0gYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuICByZXR1cm4gcmVzLmZpbmQoaXRlbSA9PiBpdGVtID4gMCk7XG59XG5cbmZ1bmN0aW9uIF9zZW5kWDExQ2xpZW50TWVzc2FnZShcbiAgd2lkLFxuICBldmVudE5hbWUsXG4gIGV2ZW50UHJvcGVydGllcyA9IFtdLFxuICBvcHRpb25hbEV2ZW50TWFzaz9cbikge1xuICBpZiAoZXZlbnRQcm9wZXJ0aWVzLmxlbmd0aCA+IDQpIHtcbiAgICB0aHJvdyBcIm9ubHkgc3VwcG9ydHMgNCBwcm9wZXJ0aWVzIGF0IG9uY2UgbWF4XCI7XG4gIH1cblxuICBjb25zdCBvZmZzZXRDb3VudGVyID0gX2NvdW50ZXIoNCwgNCk7XG4gIGNvbnN0IGV2ZW50TWFzayA9IG9wdGlvbmFsRXZlbnRNYXNrIHx8IHgxMS5ldmVudE1hc2suU3Vic3RydWN0dXJlUmVkaXJlY3Q7XG5cbiAgLy8gY3JlYXRlIGF0b21zIHRvIGxvb2sgdXBcbiAgbGV0IGF0b21zTGlzdCA9IFtdO1xuICBhdG9tc0xpc3QucHVzaChldmVudE5hbWUpO1xuICBldmVudFByb3BlcnRpZXMuZm9yRWFjaChldmVudFByb3BlcnR5ID0+IHtcbiAgICBpZiAoZXZlbnRQcm9wZXJ0eS5pc0F0b20pIHtcbiAgICAgIGF0b21zTGlzdC5wdXNoKGV2ZW50UHJvcGVydHkudmFsdWUpO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gc3RhcnQgYnVmZmVyIGlucHV0XG4gIGNvbnN0IGRhdGEgPSBuZXcgQnVmZmVyKDMyKTtcbiAgZGF0YS5maWxsKDApO1xuICBkYXRhLndyaXRlSW50OCgzMywgMCk7IC8vIDMzID0gQ2xpZW50TWVzc2FnZVxuICBkYXRhLndyaXRlSW50OCgzMiwgMSk7IC8vIGZvcm1hdFxuICBkYXRhLndyaXRlVUludDMyTEUod2lkLCBvZmZzZXRDb3VudGVyKCkpO1xuXG4gIHJldHVybiBuZXcgUHJvbWlzZSgoZnVsZmlsbCwgcmVqZWN0KSA9PiB7XG4gICAgX2dldEF0b21zKGF0b21zTGlzdCwgKGVyciwgYXRvbXMpID0+IHtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgIHRocm93IGVycjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRhdGEud3JpdGVVSW50MzJMRShhdG9tc1tldmVudE5hbWVdLCBvZmZzZXRDb3VudGVyKCkpO1xuXG4gICAgICAgIGV2ZW50UHJvcGVydGllcy5mb3JFYWNoKGV2ZW50UHJvcGVydHkgPT4ge1xuICAgICAgICAgIGlmIChldmVudFByb3BlcnR5LmlzQXRvbSkge1xuICAgICAgICAgICAgZGF0YS53cml0ZVVJbnQzMkxFKGF0b21zW2V2ZW50UHJvcGVydHkudmFsdWVdLCBvZmZzZXRDb3VudGVyKCkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkYXRhLndyaXRlVUludDMyTEUoZXZlbnRQcm9wZXJ0eS52YWx1ZSwgb2Zmc2V0Q291bnRlcigpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxldCBzb3VyY2VJbmRpY2F0aW9uID0gMTtcbiAgICAgICAgZGF0YS53cml0ZVVJbnQzMkxFKHNvdXJjZUluZGljYXRpb24sIG9mZnNldENvdW50ZXIoKSk7XG5cbiAgICAgICAgWC5TZW5kRXZlbnQocm9vdCwgMCwgZXZlbnRNYXNrLCBkYXRhKTtcblxuICAgICAgICAvLyB3ZSBuZWVkIGEgbGl0dGxlIHRpbWUgZm9yIHRoZSBidWZmZXIgdG8gYmUgcHJvY2Vzc2VkXG4gICAgICAgIHNldFRpbWVvdXQoZnVsZmlsbCwgQ0ZHLkdJVkVfWDExX1RJTUVfVElNRU9VVCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pLmNhdGNoKGNhdGNoR2VuZXJpY0Vycik7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIF9kZWNvZGVQcm9wZXJ0eSh0eXBlLCBkYXRhKTogUHJvbWlzZTxhbnk+IHtcbiAgdHJ5IHtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgXCJTVFJJTkdcIjoge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBbXTtcbiAgICAgICAgbGV0IHMgPSBcIlwiO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICBpZiAoZGF0YVtpXSA9PSAwKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaChzKTtcbiAgICAgICAgICAgIHMgPSBcIlwiO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIHMgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShkYXRhW2ldKTtcbiAgICAgICAgfVxuICAgICAgICByZXN1bHQucHVzaChzKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdC5tYXAocXVvdGl6ZSkuam9pbihcIiwgXCIpO1xuICAgICAgfVxuICAgICAgY2FzZSBcIkFUT01cIjpcbiAgICAgICAgaWYgKGRhdGEubGVuZ3RoID4gMzIpIHtcbiAgICAgICAgICByZXR1cm4gXCJMT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PTkdcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHByb21pc2VzID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkgKz0gNCkge1xuICAgICAgICAgIGNvbnN0IGEgPSBkYXRhLnVucGFjayhcIkxcIiwgaSlbMF07XG4gICAgICAgICAgcHJvbWlzZXMucHVzaChfeENiVG9Qcm9taXNlKFguR2V0QXRvbU5hbWUsIGEpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICByZXR1cm4gcmVzLmpvaW4oXCIsIFwiKTtcbiAgICAgICAgfSk7XG5cbiAgICAgIGNhc2UgXCJDQVJESU5BTFwiOlxuICAgICAgY2FzZSBcIklOVEVHRVJcIjoge1xuICAgICAgICBjb25zdCByZXMgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSArPSA0KSB7XG4gICAgICAgICAgcmVzLnB1c2goZGF0YS51bnBhY2soXCJMXCIsIGkpWzBdKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzLmpvaW4oXCIsIFwiKTtcbiAgICAgIH1cbiAgICAgIGNhc2UgXCJXSU5ET1dcIjpcbiAgICAgICAgY29uc3QgcmVzID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkgKz0gNCkge1xuICAgICAgICAgIHJlcy5wdXNoKGRhdGEudW5wYWNrKFwiTFwiLCBpKVswXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICBcIndpbmRvdyBpZCMgXCIgK1xuICAgICAgICAgIHJlc1xuICAgICAgICAgICAgLm1hcChuID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIFwiMHhcIiArIG4udG9TdHJpbmcoMTYpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5qb2luKFwiLCBcIilcbiAgICAgICAgKTtcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIFwiV1RGIFwiICsgdHlwZTtcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjb25zb2xlLmxvZyh0eXBlLCBkYXRhKTtcbiAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgIHRocm93IG5ldyBFcnJvcihlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBxdW90aXplKGkpIHtcbiAgcmV0dXJuICdcIicgKyBpICsgJ1wiJztcbn1cblxuZnVuY3Rpb24gX3BhcnNlV2luZG93SWRzKHN0ckluKTogc3RyaW5nW10ge1xuICBjb25zdCBzdHIgPSBzdHJJbi5yZXBsYWNlKFwid2luZG93IGlkIyBcIiwgXCJcIik7XG4gIHJldHVybiBzdHIuc3BsaXQoXCIsIFwiKTtcbn1cblxuLy9jb25zdCB0ZXN0Rm4gPSB3cmFwWDExKGNsb3NlV2luZG93KTtcbi8vdGVzdEZuKCcweDA0YTAwMDAxJykudGhlbigoZ2VvKSA9PiB7XG4vL30pO1xuXG4vL2NvbnN0IHRlc3RGbiA9IHdyYXBYMTEobW92ZVRvV29ya3NwYWNlKTtcbi8vdGVzdEZuKCcweDA0ZTAwMDAxICcsIDIpO1xuXG4vL2NvbnN0IHRlc3RGblggPSB3cmFwWDExKHJlc3RvcmVXaW5kb3dQb3NpdGlvbik7XG4vL3Rlc3RGblgoe1xuLy8gIHdpbmRvd0lkOiAnMHgwNGEwMDAwMScsXG4vLyAgeDogMCxcbi8vICB5OiAwLFxuLy8gIHdpZHRoOiA1MDAsXG4vLyAgaGVpZ2h0OiA1MDAsXG4vLyAgc3RhdGVzOiBbXG4vLyAgICAnX05FVF9XTV9TVEFURV9NQVhJTUlaRURfVkVSVCdcbi8vICBdXG4vL30pO1xuXG4vL2NvbnN0IHRlc3RGbjIgPSB3cmFwWDExKHNldFN0YXRlKTtcbi8vdGVzdEZuMignMHgwNGEwMDAwMScsICdyZW1vdmUnLCBbJ19ORVRfV01fU1RBVEVfTUFYSU1JWkVEX1ZFUlQnLCAnX05FVF9XTV9TVEFURV9NQVhJTUlaRURfSE9SWicsICdfTkVUX1dNX1NUQVRFX0ZVTExTQ1JFRU4nXSlcbi8vICAudGhlbigocmVzKSA9PiB7XG4vLyAgICBjb25zb2xlLmxvZygnTk9STUFMJywgcmVzKTtcbi8vICB9KTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBJU19ERUJVRyB9IGZyb20gXCIuL2lzRGVidWdcIjtcbmltcG9ydCB7IENGRyB9IGZyb20gXCIuL2NvbmZpZ1wiO1xuaW1wb3J0IHsgc3Bhd24gfSBmcm9tIFwiY2hpbGRfcHJvY2Vzc1wiO1xuaW1wb3J0IHsgcGFyc2VDbWRBcmdzIH0gZnJvbSBcIi4vcGFyc2VDbWRUb1NwYXduXCI7XG5pbXBvcnQgeyBXaW5PYmosIFdpbk9iaklkT25seSB9IGZyb20gXCIuL21vZGVsXCI7XG5pbXBvcnQgeyBsb2cgfSBmcm9tIFwiLi9sb2dcIjtcbmltcG9ydCB7IGdldEFjdGl2ZVdpbmRvd0lkcywgZ2V0RGlzcGxheXMsIGdldFdpbmRvd0luZm8gfSBmcm9tIFwiLi94MTFXcmFwcGVyXCI7XG5cbi8vIDUwMGtiXG5jb25zdCBNQVhfQlVGRkVSID0gMTAyNCAqIDUwMDtcbmNvbnN0IEVYRUNfT1BUUyA9IHtcbiAgbWF4QnVmZmVyOiBNQVhfQlVGRkVSXG59O1xuXG4vLyBkaXNwbGF5XG4vLyAtLS0tLS0tXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29ubmVjdGVkRGlzcGxheXNJZCgpOiBzdHJpbmcge1xuICBjb25zdCBkaXNwbGF5cyA9IGdldERpc3BsYXlzKCk7XG4gIHJldHVybiBkaXNwbGF5c1xuICAgIC5tYXAoc2NyZWVuID0+IHNjcmVlbi5waXhlbF93aWR0aCArIFwieFwiICsgc2NyZWVuLnBpeGVsX2hlaWdodClcbiAgICAuam9pbihcIjtcIik7XG59XG5cbi8vIE90aGVyXG4vLyAtLS0tLS0tLVxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEFkZGl0aW9uYWxNZXRhRGF0YUZvcldpbihcbiAgd2luOiBXaW5PYmpJZE9ubHlcbik6IFByb21pc2U8V2luT2JqPiB7XG4gIGNvbnN0IHN0ZG91dCA9IGF3YWl0IGdldFdpbmRvd0luZm8od2luLndpbmRvd0lkKTtcbiAgY29uc3QgbGluZXMgPSBzdGRvdXQuc3BsaXQoXCJcXG5cIik7XG4gIGNvbnN0IHdpbkNvcHk6IGFueSA9IHsgLi4ud2luIH07XG5cbiAgbGluZXMuZm9yRWFjaChsaW5lID0+IHtcbiAgICBjb25zdCB3b3JkcyA9IGxpbmUuc3BsaXQoXCIgXCIpO1xuICAgIGNvbnN0IHByb3BlcnR5TmFtZSA9IHdvcmRzWzBdO1xuXG4gICAgLy8gcmVtb3ZlIHByb3BlcnR5IG5hbWUgYW5kIFwiPVwiXG4gICAgd29yZHMuc3BsaWNlKDAsIDIpO1xuICAgIGNvbnN0IHZhbHVlID0gd29yZHMuam9pbihcIiBcIik7XG4gICAgY29uc3QgcHJvcGVydHlOYW1lRnJvbU1hcCA9IENGRy5XTV9NRVRBX01BUFtwcm9wZXJ0eU5hbWVdO1xuICAgIC8vIHBhcnNlIHdtQ2xhc3NOYW1lXG4gICAgaWYgKHByb3BlcnR5TmFtZSA9PT0gXCJXTV9DTEFTUyhTVFJJTkcpXCIpIHtcbiAgICAgIGNvbnN0IHByb3BlcnR5TmFtZUZyb21NYXAgPSBDRkcuV01fTUVUQV9NQVBbcHJvcGVydHlOYW1lXTtcbiAgICAgIGNvbnN0IGNsYXNzTmFtZXMgPSB2YWx1ZS5zcGxpdChcIiwgXCIpO1xuICAgICAgbGV0IGNsYXNzTmFtZSA9IFwiXCI7XG4gICAgICBjbGFzc05hbWVzLmZvckVhY2goc3RhdGUgPT4ge1xuICAgICAgICBpZiAoc3RhdGUgIT09IFwiXCIpIHtcbiAgICAgICAgICBjbGFzc05hbWUgKz0gc3RhdGUucmVwbGFjZSgvXCIvZywgXCJcIikgKyBcIi5cIjtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICB3aW5Db3B5W3Byb3BlcnR5TmFtZUZyb21NYXBdID0gY2xhc3NOYW1lLnN1YnN0cigwLCBjbGFzc05hbWUubGVuZ3RoIC0gMik7XG4gICAgfVxuICAgIC8vIHBhcnNlIHN0YXRlc1xuICAgIGVsc2UgaWYgKHByb3BlcnR5TmFtZSA9PT0gXCJfTkVUX1dNX1NUQVRFKEFUT00pXCIpIHtcbiAgICAgIGNvbnN0IHN0YXRlcyA9IHZhbHVlLnNwbGl0KFwiLCBcIik7XG4gICAgICB3aW5Db3B5LnN0YXRlcyA9IFtdO1xuICAgICAgc3RhdGVzLmZvckVhY2goc3RhdGUgPT4ge1xuICAgICAgICBpZiAoc3RhdGUgIT09IFwiXCIpIHtcbiAgICAgICAgICB3aW5Db3B5LnN0YXRlcy5wdXNoKHN0YXRlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIC8vIHBhcnNlIHNpbXBsZSBzdHJpbmdzIGFuZCBpbnRlZ2Vyc1xuICAgIGVsc2UgaWYgKHByb3BlcnR5TmFtZUZyb21NYXApIHtcbiAgICAgIC8vIHNwZWNpYWwgaGFuZGxlIG51bWJlciB0eXBlc1xuICAgICAgaWYgKENGRy5XTV9NRVRBX01BUF9OVU1CRVJfVFlQRVMuaW5kZXhPZihwcm9wZXJ0eU5hbWUpID4gLTEpIHtcbiAgICAgICAgd2luQ29weVtwcm9wZXJ0eU5hbWVGcm9tTWFwXSA9IHBhcnNlSW50KHZhbHVlLCAxMCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3aW5Db3B5W3Byb3BlcnR5TmFtZUZyb21NYXBdID0gdmFsdWU7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbiAgLy8gY29uc29sZS5sb2cod2luQ29weSk7XG4gIHJldHVybiB3aW5Db3B5O1xufVxuXG4vLyBUT0RPIHByZXR0aWZ5IGFyZ3Mgc3RydWN0dXJlXG5leHBvcnQgZnVuY3Rpb24gc3RhcnRQcm9ncmFtKFxuICBleGVjdXRhYmxlRmlsZTogc3RyaW5nLFxuICBkZXNrdG9wRmlsZVBhdGg6IHN0cmluZ1xuKTogUHJvbWlzZTx2b2lkPiB7XG4gIElTX0RFQlVHICYmXG4gICAgY29uc29sZS5sb2coXCJERUJVRzogc3RhcnRQcm9ncmFtKCk6XCIsIGV4ZWN1dGFibGVGaWxlLCBkZXNrdG9wRmlsZVBhdGgpO1xuXG4gIGxldCBjbWQ7XG4gIGxldCBhcmdzID0gW107XG4gIGlmIChkZXNrdG9wRmlsZVBhdGgpIHtcbiAgICBjbWQgPSBgYXdrYDtcbiAgICBhcmdzLnB1c2goXG4gICAgICAnL15FeGVjPS8ge3N1YihcIl5FeGVjPVwiLCBcIlwiKTsgZ3N1YihcIiA/JVtjRGRGZmlrbU5uVXV2XVwiLCBcIlwiKTsgZXhpdCBzeXN0ZW0oJDApfSdcbiAgICApO1xuICAgIGFyZ3MucHVzaChkZXNrdG9wRmlsZVBhdGgpO1xuICB9IGVsc2Uge1xuICAgIGNvbnN0IHBhcnNlZENtZCA9IHBhcnNlQ21kQXJncyhleGVjdXRhYmxlRmlsZSk7XG4gICAgY21kID0gcGFyc2VkQ21kWzBdO1xuICAgIGFyZ3MgPSBwYXJzZWRDbWRbMV07XG4gIH1cblxuICByZXR1cm4gbmV3IFByb21pc2UoZnVsZmlsbCA9PiB7XG4gICAgc3Bhd24oY21kLCBhcmdzLCB7XG4gICAgICBzdGRpbzogXCJpZ25vcmVcIixcbiAgICAgIGRldGFjaGVkOiB0cnVlXG4gICAgfSkudW5yZWYoKTtcblxuICAgIC8vIGN1cnJlbnRseSB3ZSBoYXZlIG5vIGVycm9yIGhhbmRsaW5nIGFzIHRoZSBwcm9jZXNzIGlzIHN0YXJ0ZWQgZGV0YWNoZWRcbiAgICBmdWxmaWxsKCk7XG4gIH0pO1xufVxuXG4vLyBHRVQgQUNUSVZFIFdJTkRPVyBMSVNUXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0QWN0aXZlV2luZG93TGlzdCgpOiBQcm9taXNlPFdpbk9ialtdPiB7XG4gIGNvbnN0IHdpbmRvd0lkcyA9IGF3YWl0IGdldEFjdGl2ZVdpbmRvd0lkcygpO1xuICBjb25zdCB3aW5kb3dMaXN0OiBXaW5PYmpJZE9ubHlbXSA9IFtdO1xuICB3aW5kb3dJZHMuZm9yRWFjaCh3aW5kb3dJZCA9PiB7XG4gICAgd2luZG93TGlzdC5wdXNoKHtcbiAgICAgIHdpbmRvd0lkOiB3aW5kb3dJZCxcbiAgICAgIHdpbmRvd0lkRGVjOiBwYXJzZUludCh3aW5kb3dJZCwgMTYpXG4gICAgfSk7XG4gIH0pO1xuXG4gIC8vIGFkZCBtZXRhIGRhdGEgcmlnaHQgYXdheVxuICBjb25zdCBwcm9taXNlcyA9IHdpbmRvd0xpc3QubWFwKHdpbiA9PiBnZXRBZGRpdGlvbmFsTWV0YURhdGFGb3JXaW4od2luKSk7XG5cbiAgY29uc3Qgd2luZG93c1dpdGhEYXRhOiBXaW5PYmpbXSA9IChhd2FpdCBQcm9taXNlLmFsbChwcm9taXNlcykpIGFzIFdpbk9ialtdO1xuXG4gIElTX0RFQlVHICYmIGNvbnNvbGUubG9nKFwiREVCVUc6IGdldEFjdGl2ZVdpbmRvd0xpc3QoKTpcIiwgd2luZG93TGlzdCk7XG4gIHJldHVybiB3aW5kb3dzV2l0aERhdGEuZmlsdGVyKF9maWx0ZXJJbnZhbGlkV2luZG93cyk7XG59XG5cbmZ1bmN0aW9uIF9maWx0ZXJJbnZhbGlkV2luZG93cyh3aW46IFdpbk9iaik6IGJvb2xlYW4ge1xuICAvLyBmaWx0ZXIgbm9uZSBub3JtYWwgd2luZG93cywgZXhjbHVkZWQgY2xhc3MgbmFtZXMgYW5kIGluY29tcGxldGUgd2luZG93c1xuICBjb25zdCBpc05vcm1hbFdpbmRvdyA9XG4gICAgKCF3aW4ud21UeXBlIHx8IHdpbi53bVR5cGUgPT09IFwiX05FVF9XTV9XSU5ET1dfVFlQRV9OT1JNQUxcIikgJiZcbiAgICAoIXdpbi53bVJvbGUgfHwgd2luLndtUm9sZSAhPT0gXCJwb3AtdXBcIik7XG5cbiAgY29uc3QgaXNOb3RFeGNsdWRlZCA9ICFfaXNFeGNsdWRlZFdtQ2xhc3NOYW1lKHdpbi53bUNsYXNzTmFtZSk7XG4gIGNvbnN0IGhhc1dtQ2xhc3NOYW1lID0gISF3aW4ud21DbGFzc05hbWU7XG5cbiAgLy8gd2FybiBpZiBubyB3bUNsYXNzTmFtZSBldmVuIHRob3VnaCB0aGVyZSBzaG91bGQgYmVcbiAgaWYgKGlzTm9ybWFsV2luZG93ICYmIGlzTm90RXhjbHVkZWQgJiYgIWhhc1dtQ2xhc3NOYW1lKSB7XG4gICAgY29uc29sZS53YXJuKHdpbi53aW5kb3dJZCArIFwiIGhhcyBubyB3bUNsYXNzTmFtZS4gV2luOiBcIiwgd2luKTtcbiAgfVxuXG4gIHJldHVybiBpc05vcm1hbFdpbmRvdyAmJiBpc05vdEV4Y2x1ZGVkICYmIGhhc1dtQ2xhc3NOYW1lO1xufVxuXG5mdW5jdGlvbiBfaXNFeGNsdWRlZFdtQ2xhc3NOYW1lKHdtQ2xhc3NOYW1lKTogYm9vbGVhbiB7XG4gIHJldHVybiBDRkcuV01fQ0xBU1NfRVhDTFVTSU9OUy5pbmRleE9mKHdtQ2xhc3NOYW1lKSA+IC0xO1xufVxuXG5mdW5jdGlvbiBfY2F0Y2hHZW5lcmljRXJyKGVycik6IHZvaWQge1xuICBjb25zb2xlLmVycm9yKFwib3RoZXJDbWQ6IEdlbmVyaWMgRXJyb3JcIiwgZXJyLCBlcnIuc3RhY2spO1xuICBsb2coXCJvdGhlckNtZDpcIiwgYXJndW1lbnRzKTtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuaW1wb3J0IHsgZ2V0V2luZG93R2VvbWV0cnksIGdvVG9WaWV3cG9ydCB9IGZyb20gXCIuL3gxMVdyYXBwZXJcIjtcbmltcG9ydCB7IGdldEFjdGl2ZVdpbmRvd0xpc3QgfSBmcm9tIFwiLi9vdGhlckNtZFwiO1xuaW1wb3J0IHsgQ0ZHIH0gZnJvbSBcIi4vY29uZmlnXCI7XG5pbXBvcnQgeyBXaW5PYmogfSBmcm9tIFwiLi9tb2RlbFwiO1xuXG5jb25zdCBmaW5kdXAgPSByZXF1aXJlKFwiZmluZHVwLXN5bmNcIik7XG5cbmNvbnN0IEhPTUVfRElSID0gcHJvY2Vzcy5lbnZbXCJIT01FXCJdO1xuY29uc3QgREVGQVVMVF9ERVNLVE9QX0ZJTEVfTE9DQVRJT05TID0gW1xuICBcIntob21lfS8ubG9jYWwvc2hhcmUvYXBwbGljYXRpb25zXCIsXG4gIFwie2hvbWV9Ly5nbm9tZS9hcHBzL1wiLFxuICBcIi91c3Ivc2hhcmUvYXBwbGljYXRpb25zXCIsXG4gIFwiL3Vzci9sb2NhbC9zaGFyZS9hcHBsaWNhdGlvbnNcIixcbiAgXCIvdXNyL3NoYXJlL2FwcC1pbnN0YWxsXCJcbl07XG5cbmZ1bmN0aW9uIF9jYXRjaEdlbmVyaWNFcnIoZXJyKSB7XG4gIGNvbnNvbGUuZXJyb3IoXCJHZW5lcmljIEVycm9yIGluIE1ldGEgV3JhcHBlclwiLCBlcnIsIGVyci5zdGFjayk7XG4gIHRocm93IGVycjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdvVG9GaXJzdFdvcmtzcGFjZSgpIHtcbiAgcmV0dXJuIGdvVG9WaWV3cG9ydCgwLCAwKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpbmREZXNrdG9wRmlsZShmaWxlTmFtZSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKGZ1bGZpbGwsIHJlamVjdCkgPT4ge1xuICAgIGNvbnN0IGRlc2t0b3BGaWxlTG9jYXRpb25zID1cbiAgICAgIENGRy5ERVNLVE9QX0ZJTEVfTE9DQVRJT05TIHx8IERFRkFVTFRfREVTS1RPUF9GSUxFX0xPQ0FUSU9OUztcblxuICAgIGNvbnN0IHBhcmVudERpcnMgPSBkZXNrdG9wRmlsZUxvY2F0aW9ucy5tYXAocGFyZW50RGlyID0+IHtcbiAgICAgIHJldHVybiBwYXJlbnREaXIucmVwbGFjZShcIntob21lfVwiLCBIT01FX0RJUik7XG4gICAgfSk7XG5cbiAgICBsZXQgZmlyc3RGaWxlO1xuICAgIGNvbnN0IG1hdGNoID0gcGFyZW50RGlycy5maW5kKGRpciA9PiB7XG4gICAgICBmaXJzdEZpbGUgPSBmaW5kdXAoZmlsZU5hbWUsIHsgY3dkOiBkaXIgfSk7XG5cbiAgICAgIGlmICghZmlyc3RGaWxlKSB7XG4gICAgICAgIC8vIHNuYXAgZGVza3RvcCBmaWxlcyBub3cgbG9vayBsaWtlIHRoaXMgPT4gZmlyZWZveF9maXJlZm94LmRlc2t0b3BcbiAgICAgICAgZmlyc3RGaWxlID0gZmluZHVwKGAke2ZpbGVOYW1lLnJlcGxhY2UoXCIuZGVza3RvcFwiLCBcIl9cIil9JHtmaWxlTmFtZX1gLCB7XG4gICAgICAgICAgY3dkOiBkaXJcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmlyc3RGaWxlO1xuICAgIH0pO1xuXG4gICAgaWYgKCFmaXJzdEZpbGUgfHwgIW1hdGNoKSB7XG4gICAgICBjb25zdCBlcnIgPVxuICAgICAgICBgRVJSOiBmaW5kRGVza3RvcEZpbGUoKSBjYW50IGZpbmQgZmlsZSBcIiR7ZmlsZU5hbWV9XCIhIFNlYXJjaGVkIGRlc2t0b3BGaWxlTG9jYXRpb25zOmA7XG4gICAgICBjb25zb2xlLmVycm9yKGVyciwgZGVza3RvcEZpbGVMb2NhdGlvbnMpO1xuICAgICAgcmVqZWN0KGVycik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZ1bGZpbGwoZmlyc3RGaWxlKTtcbiAgICB9XG4gIH0pLmNhdGNoKF9jYXRjaEdlbmVyaWNFcnIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0QWN0aXZlV2luZG93TGlzdEZsb3coKTogUHJvbWlzZTxXaW5PYmpbXSB8IGFueT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKGZ1bGZpbGwsIHJlamVjdCkgPT4ge1xuICAgIHJldHVybiBnZXRBY3RpdmVXaW5kb3dMaXN0KCkudGhlbihhc3luYyAod2luZG93TGlzdDogYW55W10pID0+IHtcbiAgICAgIGNvbnN0IHByb21pc2VzID0gd2luZG93TGlzdC5tYXAod2luID0+IHtcbiAgICAgICAgcmV0dXJuIGdldFdpbmRvd0dlb21ldHJ5KHdpbi53aW5kb3dJZCkudGhlbigoZ2VvOiBhbnkpID0+IHtcbiAgICAgICAgICBmb3IgKGxldCBwcm9wIGluIGdlbykge1xuICAgICAgICAgICAgaWYgKGdlby5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xuICAgICAgICAgICAgICB3aW5bcHJvcF0gPSBnZW9bcHJvcF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gVE9ETyBvcmdhbml6ZSBhZGRpbmcgb2YgYWxsIHRob3NlIGRpZmZlcmVudCBwcm9wZXJ0aWVzIGJldHRlclxuICAgICAgICAgIC8vIGFkZCBtaXNzaW5nIHN0YXRpYyBwcm9wZXJ0aWVzXG4gICAgICAgICAgd2luLnNpbXBsZU5hbWUgPSBfcGFyc2VTaW1wbGVXaW5kb3dOYW1lKHdpbi53bUNsYXNzTmFtZSk7XG4gICAgICAgICAgcmV0dXJuIHdpbjtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgLy8gd2UncmUgdXNpbmcgYSB3YXRlcmZhbGwgYmVjYXVzZSB3ZSdyZSBkZWFsaW5nIHdpdGggeDExIHJlcXVlc3RzXG4gICAgICBpZiAocHJvbWlzZXMubGVuZ3RoKSB7XG4gICAgICAgIGZvciAoY29uc3QgcHJvbWlzZSBvZiBwcm9taXNlcykge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCBwcm9taXNlO1xuICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHJlamVjdChlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgX2FkZFBhcnNlZEV4ZWN1dGFibGVGaWxlc0Zyb21XbUNsYXNzTmFtZXMod2luZG93TGlzdCkudGhlbihcbiAgICAgICAgICB3aW5kb3dMaXN0V2l0aFdtQ2xhc3NOYW1lcyA9PiB7XG4gICAgICAgICAgICBmdWxmaWxsKHdpbmRvd0xpc3RXaXRoV21DbGFzc05hbWVzKTtcbiAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmdWxmaWxsKFtdKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSkuY2F0Y2goX2NhdGNoR2VuZXJpY0Vycik7XG59XG5cbi8vIE1JWEVEXG5mdW5jdGlvbiBfYWRkUGFyc2VkRXhlY3V0YWJsZUZpbGVzRnJvbVdtQ2xhc3NOYW1lcyh3aW5kb3dMaXN0KTogUHJvbWlzZTxhbnk+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChmdWxmaWxsLCByZWplY3QpID0+IHtcbiAgICBjb25zdCBwcm9taXNlcyA9IHdpbmRvd0xpc3RcbiAgICAgIC5maWx0ZXIod2luID0+ICF3aW4uZXhlY3V0YWJsZUZpbGUpXG4gICAgICAubWFwKHdpbiA9PiB7XG4gICAgICAgIHJldHVybiBfcGFyc2VFeGVjdXRhYmxlRmlsZUZyb21XbUNsYXNzTmFtZSh3aW4ud21DbGFzc05hbWUpLnRoZW4oXG4gICAgICAgICAgZmlsZU5hbWUgPT4ge1xuICAgICAgICAgICAgd2luLmV4ZWN1dGFibGVGaWxlID0gZmlsZU5hbWU7XG4gICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgfSk7XG5cbiAgICBpZiAocHJvbWlzZXMubGVuZ3RoKSB7XG4gICAgICBmb3IgKGNvbnN0IHByb21pc2Ugb2YgcHJvbWlzZXMpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBhd2FpdCBwcm9taXNlO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBmdWxmaWxsKHdpbmRvd0xpc3QpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmdWxmaWxsKHdpbmRvd0xpc3QpO1xuICAgIH1cbiAgfSkuY2F0Y2goX2NhdGNoR2VuZXJpY0Vycik7XG59XG5cbmZ1bmN0aW9uIF9wYXJzZUV4ZWN1dGFibGVGaWxlRnJvbVdtQ2xhc3NOYW1lKHdtQ2xhc3NOYW1lKTogUHJvbWlzZTxhbnk+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChmdWxmaWxsLCByZWplY3QpID0+IHtcbiAgICBjb25zdCBleGVjdXRhYmxlRmlsZUZyb21NYXAgPVxuICAgICAgQ0ZHLldNX0NMQVNTX0FORF9FWEVDVVRBQkxFX0ZJTEVfTUFQW3dtQ2xhc3NOYW1lXTtcbiAgICBpZiAoZXhlY3V0YWJsZUZpbGVGcm9tTWFwKSB7XG4gICAgICBmdWxmaWxsKGV4ZWN1dGFibGVGaWxlRnJvbU1hcCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHNwbGl0VmFsdWVzID0gd21DbGFzc05hbWUuc3BsaXQoXCIuXCIpO1xuICAgICAgY29uc3QgZmlsZU5hbWUgPSBzcGxpdFZhbHVlc1swXTtcbiAgICAgIGlmIChfaXNDaHJvbWVBcHAoZmlsZU5hbWUpKSB7XG4gICAgICAgIF9wYXJzZUNocm9tZUFwcERlc2t0b3BGaWxlTmFtZShmaWxlTmFtZSlcbiAgICAgICAgICAudGhlbihmdWxmaWxsKVxuICAgICAgICAgIC5jYXRjaChyZWplY3QpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZnVsZmlsbChmaWxlTmFtZSArIFwiLmRlc2t0b3BcIik7XG4gICAgICB9XG4gICAgfVxuICB9KS5jYXRjaChfY2F0Y2hHZW5lcmljRXJyKTtcbn1cblxuZnVuY3Rpb24gX3BhcnNlU2ltcGxlV2luZG93TmFtZSh3bUNsYXNzTmFtZSkge1xuICBjb25zdCBzcGxpdFZhbHVlcyA9IHdtQ2xhc3NOYW1lLnNwbGl0KFwiLlwiKTtcbiAgaWYgKHNwbGl0VmFsdWVzWzFdKSB7XG4gICAgcmV0dXJuIHNwbGl0VmFsdWVzWzFdO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB3bUNsYXNzTmFtZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfaXNDaHJvbWVBcHAoZmlsZU5hbWUpIHtcbiAgcmV0dXJuICEhZmlsZU5hbWUubWF0Y2goL15jcnhfLyk7XG59XG5cbmZ1bmN0aW9uIF9wYXJzZUNocm9tZUFwcERlc2t0b3BGaWxlTmFtZShmaWxlTmFtZSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIC8vIHdlIHdhbid0IHRvIHNlYXJjaCBmcm9tIGRlc2t0b3AgZmlsZXMgb25seVxuICAgIGNvbnN0IGxvY2F0ZVN0ciA9IGZpbGVOYW1lLnJlcGxhY2UoXCJjcnhfXCIsIFwiKlwiKSArIFwiKi5kZXNrdG9wXCI7XG4gICAgZmluZERlc2t0b3BGaWxlKGxvY2F0ZVN0cilcbiAgICAgIC50aGVuKHJlc29sdmUpXG4gICAgICAuY2F0Y2gocmVqZWN0KTtcbiAgfSkuY2F0Y2goX2NhdGNoR2VuZXJpY0Vycik7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbmltcG9ydCB7Q0ZHLCBTRVNTSU9OX0RBVEFfRElSfSBmcm9tIFwiLi9jb25maWdcIjtcbmltcG9ydCAqIGFzIGZzIGZyb20gXCJmc1wiO1xuaW1wb3J0IHtnZXRDb25uZWN0ZWREaXNwbGF5c0lkLCBzdGFydFByb2dyYW19IGZyb20gXCIuL290aGVyQ21kXCI7XG5pbXBvcnQge2Nsb3NlV2luZG93LCBnZXRYLCBpbml0WDExLCBtb3ZlVG9Xb3Jrc3BhY2UsIHJlc3RvcmVXaW5kb3dQb3NpdGlvbn0gZnJvbSBcIi4veDExV3JhcHBlclwiO1xuaW1wb3J0IHtmaW5kRGVza3RvcEZpbGUsIGdldEFjdGl2ZVdpbmRvd0xpc3RGbG93LCBnb1RvRmlyc3RXb3Jrc3BhY2V9IGZyb20gXCIuL21ldGFXcmFwcGVyXCI7XG5pbXBvcnQge2xvZ30gZnJvbSBcIi4vbG9nXCI7XG5pbXBvcnQge1dpbk9ian0gZnJvbSBcIi4vbW9kZWxcIjtcbmltcG9ydCB7ZXhlY30gZnJvbSBcImNoaWxkX3Byb2Nlc3NcIjtcblxuLy8gaW1wb3J0ICogYXMgU3RvcmUgZnJvbSAnamZzJztcbmNvbnN0IFN0b3JlID0gcmVxdWlyZShcImpmc1wiKTtcblxuLy8gY3JlYXRlIGRhdGEgc3RvcmVcbmNvbnN0IGRiID0gbmV3IFN0b3JlKFNFU1NJT05fREFUQV9ESVIsIHtcbiAgcHJldHR5OiBDRkcuU0FWRV9TRVNTSU9OX0lOX1BSRVRUWV9GT1JNQVRcbn0pO1xuXG4vLyBzZXR1cCBtZXRhIHdyYXBwZXJcblxuLy8gRVhQT1JUXG4vLyAtLS0tLS1cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbGlzdFNlc3Npb25zLFxuICByZW5hbWVTZXNzaW9uLFxuICBzYXZlU2Vzc2lvbixcbiAgcmVtb3ZlU2Vzc2lvbixcbiAgcmVzdG9yZVNlc3Npb24sXG4gIGdldFNlc3Npb25zLFxuICBnZXRYOiBnZXRYLFxuXG4gIGdldENvbm5lY3RlZERpc3BsYXlzSWQsXG4gIHJlc2V0Q2ZnOiAoKSA9PiB7XG4gICAgY29uc3QgY29uZmlnRmlsZVBhdGggPSBDRkcuREFUQV9ESVIgKyBcIi9jb25maWcuanNvblwiO1xuICAgIGlmKGZzLmV4aXN0c1N5bmMoY29uZmlnRmlsZVBhdGgpKSB7XG4gICAgICBmcy51bmxpbmtTeW5jKGNvbmZpZ0ZpbGVQYXRoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5lcnJvcihcIk5vIENvbmZpZyBwcmVzZW50IGluIFwiICsgY29uZmlnRmlsZVBhdGgpO1xuICAgIH1cbiAgfSxcbiAgZ2V0Q2ZnOiAoKSA9PiB7XG4gICAgcmV0dXJuIENGRztcbiAgfSxcbiAgZ2V0RGI6ICgpID0+IHtcbiAgICByZXR1cm4gZGI7XG4gIH1cbn07XG5cbi8vIEhFTFBFUlxuLy8gLS0tLS0tLS1cbmZ1bmN0aW9uIF9jYXRjaEdlbmVyaWNFcnIoZXJyKSB7XG4gIGNvbnNvbGUuZXJyb3IoXCJHZW5lcmljIEVycm9yIGluIE1haW4gSGFuZGxlclwiLCBlcnIsIGVyci5zdGFjayk7XG4gIHRocm93IGVycjtcbn1cblxuZnVuY3Rpb24gZ2V0U2Vzc2lvbnMoKSB7XG4gIHJldHVybiBkYi5hbGxTeW5jKCk7XG59XG5cbi8vIE1BSU4gRlVOQ1RJT05TXG4vLyAtLS0tLS0tLS0tLS0tLVxuZnVuY3Rpb24gbGlzdFNlc3Npb25zKCkge1xuICBsZXQgbGlzdCA9IE9iamVjdC5rZXlzKGdldFNlc3Npb25zKCkpO1xuICBsaXN0LmZvckVhY2gobmFtZSA9PiB7XG4gICAgbG9nKG5hbWUpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gcmVuYW1lU2Vzc2lvbihvbGROYW1lOiBzdHJpbmcsIG5ld05hbWU6IHN0cmluZykge1xuICBsZXQgb2JqID0gZGIuZ2V0U3luYyhvbGROYW1lKTtcbiAgaWYob2JqLm1lc3NhZ2UpIHtcbiAgICBpZihvYmoubWVzc2FnZSA9PT0gXCJjb3VsZCBub3QgbG9hZCBkYXRhXCIpIHtcbiAgICAgIGxvZyhgRXJyb3I6IENvdWxkIG5vdCBmaW5kIGEgc2Vzc2lvbiBuYW1lZCAnJHtvbGROYW1lfSdgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbG9nKG9iai5tZXNzYWdlKTtcbiAgICB9XG4gICAgcmV0dXJuO1xuICB9XG4gIGRiLnNhdmVTeW5jKG5ld05hbWUsIG9iaik7XG4gIGRiLmRlbGV0ZShvbGROYW1lKTtcbn1cblxuZnVuY3Rpb24gc2F2ZVNlc3Npb24oc2Vzc2lvbk5hbWU6IHN0cmluZywgaW5wdXRIYW5kbGVycyk6IFByb21pc2U8YW55PiB7XG4gIGNvbnN0IHNlc3Npb25Ub0hhbmRsZSA9IHNlc3Npb25OYW1lIHx8IFwiREVGQVVMVFwiO1xuXG4gIHJldHVybiBpbml0WDExKClcbiAgICAudGhlbigoKSA9PiB7XG4gICAgICByZXR1cm4gZ2V0QWN0aXZlV2luZG93TGlzdEZsb3coKTtcbiAgICB9KVxuICAgIC50aGVuKHdpbmRvd0xpc3QgPT4ge1xuICAgICAgLy8gZGVza3RvcCBmaWxlIHBhdGhzIGFuZCBjb25uZWN0ZWQgZGlzcGxheSBpZHNcbiAgICAgIHJldHVybiBfZ3Vlc3NBbmRTZXREZXNrdG9wRmlsZVBhdGhzKFxuICAgICAgICB3aW5kb3dMaXN0LFxuICAgICAgICBpbnB1dEhhbmRsZXJzLmRlc2t0b3BGaWxlUGF0aFxuICAgICAgKTtcbiAgICB9KVxuICAgIC50aGVuKHdpbmRvd0xpc3QgPT4ge1xuICAgICAgY29uc3QgY29ubmVjdGVkRGlzcGxheXNJZCA9IGdldENvbm5lY3RlZERpc3BsYXlzSWQoKTtcbiAgICAgIHJldHVybiBzYXZlU2Vzc2lvbkZvckRpc3BsYXlUb0RiKFxuICAgICAgICBzZXNzaW9uVG9IYW5kbGUsXG4gICAgICAgIGNvbm5lY3RlZERpc3BsYXlzSWQsXG4gICAgICAgIHdpbmRvd0xpc3RcbiAgICAgICk7XG4gICAgfSlcbiAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJzYXZlU2Vzc2lvbigpOiBBbiBlcnJvciBvY2N1cnJlZFwiLCBlcnIpO1xuICAgICAgdGhyb3cgZXJyO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBzYXZlU2Vzc2lvbkZvckRpc3BsYXlUb0RiKFxuICBzZXNzaW9uVG9IYW5kbGU6IHN0cmluZyxcbiAgY29ubmVjdGVkRGlzcGxheXNJZDogc3RyaW5nLFxuICB3aW5kb3dMaXN0OiBXaW5PYmpbXVxuKTogUHJvbWlzZTx2b2lkPiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgoZnVsZmlsbCwgcmVqZWN0KSA9PiB7XG4gICAgLy8gY2hlY2sgaWYgZW50cnkgZXhpc3RzIGFuZCB1cGRhdGVcbiAgICBkYi5nZXQoc2Vzc2lvblRvSGFuZGxlLCAoZXJyLCBzZXNzaW9uRGF0YSkgPT4ge1xuICAgICAgaWYoZXJyKSB7XG4gICAgICAgIC8vIE5PVEU6IHdlJ3JlIG5vdCBmYWlsaW5nIGJlY2F1c2UsIHRoZSBjYXNlIGlzIHByb2JhYmx5IHRoYXQgdGhlcmUgaXMgbm8gc2Vzc2lvbiBmaWxlIHlldFxuICAgICAgICBsb2coXG4gICAgICAgICAgYHNhdmVTZXNzaW9uRm9yRGlzcGxheVRvRGI6IG5vIHNlc3Npb24gZmlsZSBwcmVzZW50IHlldCBmb3IgXCIke3Nlc3Npb25Ub0hhbmRsZX1cIiwgY3JlYXRpbmcgYSBuZXcgb25lLi4uYFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBpZighc2Vzc2lvbkRhdGEpIHtcbiAgICAgICAgLy8gY3JlYXRlIG5ldyBvYmplY3RcbiAgICAgICAgc2Vzc2lvbkRhdGEgPSB7XG4gICAgICAgICAgbmFtZTogc2Vzc2lvblRvSGFuZGxlXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICBpZihcbiAgICAgICAgIXNlc3Npb25EYXRhLmRpc3BsYXlzQ29tYmluYXRpb25zIHx8XG4gICAgICAgICFBcnJheS5pc0FycmF5KHNlc3Npb25EYXRhLmRpc3BsYXlzQ29tYmluYXRpb25zKVxuICAgICAgKSB7XG4gICAgICAgIC8vIGNyZWF0ZSBuZXcgYXJyYXlcbiAgICAgICAgc2Vzc2lvbkRhdGEuZGlzcGxheXNDb21iaW5hdGlvbnMgPSBbXTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZXhpc3RpbmdEaXNwbGF5RW50cnkgPSBzZXNzaW9uRGF0YS5kaXNwbGF5c0NvbWJpbmF0aW9ucy5maW5kKFxuICAgICAgICBlbnRyeSA9PiBlbnRyeS5pZCA9PT0gY29ubmVjdGVkRGlzcGxheXNJZFxuICAgICAgKTtcbiAgICAgIGlmKGV4aXN0aW5nRGlzcGxheUVudHJ5KSB7XG4gICAgICAgIGV4aXN0aW5nRGlzcGxheUVudHJ5LndpbmRvd0xpc3QgPSB3aW5kb3dMaXN0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2Vzc2lvbkRhdGEuZGlzcGxheXNDb21iaW5hdGlvbnMucHVzaCh7XG4gICAgICAgICAgaWQ6IGNvbm5lY3RlZERpc3BsYXlzSWQsXG4gICAgICAgICAgd2luZG93TGlzdFxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgZGIuc2F2ZShzZXNzaW9uVG9IYW5kbGUsIHNlc3Npb25EYXRhLCBlcnIgPT4ge1xuICAgICAgICBpZihlcnIpIHtcbiAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsb2coXCJTQVZFRCBTRVNTSU9OOiBcIiArIHNlc3Npb25Ub0hhbmRsZSk7XG4gICAgICAgICAgZnVsZmlsbCgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHJlc3RvcmVTZXNzaW9uKFxuICBzZXNzaW9uTmFtZTogc3RyaW5nLFxuICBpc0Nsb3NlQWxsT3BlbldpbmRvd3M6IGJvb2xlYW5cbik6IFByb21pc2U8YW55PiB7XG4gIGNvbnN0IHNlc3Npb25Ub0hhbmRsZSA9IHNlc3Npb25OYW1lIHx8IFwiREVGQVVMVFwiO1xuXG4gIHJldHVybiBuZXcgUHJvbWlzZSgoZnVsZmlsbCwgcmVqZWN0KSA9PiB7XG4gICAgZGIuZ2V0KHNlc3Npb25Ub0hhbmRsZSB8fCBcIkRFRkFVTFRcIiwgKGVyciwgc2Vzc2lvbkRhdGEpID0+IHtcbiAgICAgIGlmKGVycikge1xuICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBsZXQgc2F2ZWRXaW5kb3dMaXN0O1xuXG4gICAgICBpbml0WDExKClcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIHJldHVybiBfY2xvc2VBbGxXaW5kb3dzSWZTZXQoaXNDbG9zZUFsbE9wZW5XaW5kb3dzKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oZ29Ub0ZpcnN0V29ya3NwYWNlKVxuICAgICAgICAudGhlbihnZXRDb25uZWN0ZWREaXNwbGF5c0lkKVxuICAgICAgICAudGhlbihjb25uZWN0ZWREaXNwbGF5c0lkID0+IHtcbiAgICAgICAgICBpZighc2Vzc2lvbkRhdGEuZGlzcGxheXNDb21iaW5hdGlvbnMpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYG5vIGRpc3BsYXkgY29tYmluYXRpb25zIHNhdmVkIHlldGApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IGRpc3BsYXlFbnRyeSA9IHNlc3Npb25EYXRhLmRpc3BsYXlzQ29tYmluYXRpb25zLmZpbmQoXG4gICAgICAgICAgICBlbnRyeSA9PiBlbnRyeS5pZCA9PT0gY29ubmVjdGVkRGlzcGxheXNJZFxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBpZihkaXNwbGF5RW50cnkpIHtcbiAgICAgICAgICAgIHNhdmVkV2luZG93TGlzdCA9IGRpc3BsYXlFbnRyeS53aW5kb3dMaXN0O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAgICAgICBgbm8gZGF0YSBmb3IgY3VycmVudCBkaXNwbGF5IGlkICcke2Nvbm5lY3RlZERpc3BsYXlzSWR9JyBzYXZlZCB5ZXRgXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZ2V0QWN0aXZlV2luZG93TGlzdEZsb3coKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oY3VycmVudFdpbmRvd0xpc3QgPT4ge1xuICAgICAgICAgIHJldHVybiBfc3RhcnRTZXNzaW9uUHJvZ3JhbXMoc2F2ZWRXaW5kb3dMaXN0LCBjdXJyZW50V2luZG93TGlzdCk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAvLyBnZXRzIGN1cnJlbnQgd2luZG93IGxpc3QgYnkgaXRzZWxmIGFuZCByZXR1cm5zIHRoZSB1cGRhdGVkIHZhcmlhbnRcbiAgICAgICAgICByZXR1cm4gX3dhaXRGb3JBbGxBcHBzVG9TdGFydChzYXZlZFdpbmRvd0xpc3QpO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbigodXBkYXRlZEN1cnJlbnRXaW5kb3dMaXN0OiBXaW5PYmpbXSkgPT4ge1xuICAgICAgICAgIF91cGRhdGVXaW5kb3dJZHMoc2F2ZWRXaW5kb3dMaXN0LCB1cGRhdGVkQ3VycmVudFdpbmRvd0xpc3QpO1xuICAgICAgICAgIHJldHVybiBfcmVzdG9yZVdpbmRvd1Bvc2l0aW9ucyhzYXZlZFdpbmRvd0xpc3QpO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgbG9nKFwiUkVTVE9SRUQgU0VTU0lPTjogXCIgKyBzZXNzaW9uVG9IYW5kbGUpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiQW4gZXJyb3Igb2NjdXJyZWRcIiwgZXJyKTtcbiAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oZnVsZmlsbCk7XG4gICAgfSk7XG4gIH0pLmNhdGNoKF9jYXRjaEdlbmVyaWNFcnIpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTZXNzaW9uKHNlc3Npb25OYW1lOiBzdHJpbmcpOiBQcm9taXNlPHVua25vd24+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChmdWxmaWxsLCByZWplY3QpID0+IHtcbiAgICBmcy51bmxpbmsoQ0ZHLlNFU1NJT05fREFUQV9ESVIgKyBcIi9cIiArIHNlc3Npb25OYW1lICsgXCIuanNvblwiLCBlcnJvciA9PiB7XG4gICAgICBpZihlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZ1bGZpbGwoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSkuY2F0Y2goX2NhdGNoR2VuZXJpY0Vycik7XG59XG5cbmZ1bmN0aW9uIF9jbG9zZUFsbFdpbmRvd3NJZlNldChpc0Nsb3NlQWxsOiBib29sZWFuKTogUHJvbWlzZTx1bmtub3duPiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgoZnVsZmlsbCwgcmVqZWN0KSA9PiB7XG4gICAgaWYoaXNDbG9zZUFsbCkge1xuICAgICAgbG9nKFwiQ2xvc2luZyBvcGVuZWQgYXBwbGljYXRpb25zXCIpO1xuICAgICAgZ2V0QWN0aXZlV2luZG93TGlzdEZsb3coKVxuICAgICAgICAudGhlbigoY3VycmVudFdpbmRvd0xpc3Q6IGFueVtdKSA9PiB7XG4gICAgICAgICAgY3VycmVudFdpbmRvd0xpc3QuZm9yRWFjaCh3aW4gPT4ge1xuICAgICAgICAgICAgY2xvc2VXaW5kb3cod2luLndpbmRvd0lkKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIF93YWl0Rm9yQWxsQXBwc1RvQ2xvc2UoKVxuICAgICAgICAgICAgLnRoZW4oZnVsZmlsbClcbiAgICAgICAgICAgIC5jYXRjaChyZWplY3QpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2gocmVqZWN0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZnVsZmlsbCgpO1xuICAgIH1cbiAgfSkuY2F0Y2goX2NhdGNoR2VuZXJpY0Vycik7XG59XG5cbmZ1bmN0aW9uIF93YWl0Rm9yQWxsQXBwc1RvQ2xvc2UoKTogUHJvbWlzZTx1bmtub3duPiB7XG4gIGxldCB0b3RhbFRpbWVXYWl0ZWQgPSAwO1xuICByZXR1cm4gbmV3IFByb21pc2UoKGZ1bGZpbGwsIHJlamVjdCkgPT4ge1xuICAgIGZ1bmN0aW9uIHBvbGxBbGxBcHBzQ2xvc2VkKCkge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGdldEFjdGl2ZVdpbmRvd0xpc3RGbG93KClcbiAgICAgICAgICAudGhlbigoY3VycmVudFdpbmRvd0xpc3Q6IFdpbk9ialtdKSA9PiB7XG4gICAgICAgICAgICB0b3RhbFRpbWVXYWl0ZWQgKz0gQ0ZHLlBPTExfQUxMX0FQUFNfU1RBUlRFRF9JTlRFUlZBTDtcbiAgICAgICAgICAgIGlmKGN1cnJlbnRXaW5kb3dMaXN0Lmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgICAgICBpZih0b3RhbFRpbWVXYWl0ZWQgPiBDRkcuUE9MTF9BTExfTUFYX1RJTUVPVVQpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiUE9MTF9BTExfTUFYX1RJTUVPVVQgcmVhY2hlZFwiKTtcbiAgICAgICAgICAgICAgICByZWplY3QoXCJQT0xMX0FMTF9NQVhfVElNRU9VVCByZWFjaGVkXCIpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIGNhbGwgcmVjdXJzaXZlbHlcbiAgICAgICAgICAgICAgICBwb2xsQWxsQXBwc0Nsb3NlZCgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBmdWxmaWxsKGN1cnJlbnRXaW5kb3dMaXN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaChyZWplY3QpO1xuICAgICAgfSwgQ0ZHLlBPTExfQUxMX0FQUFNfU1RBUlRFRF9JTlRFUlZBTCk7XG4gICAgfVxuXG4gICAgLy8gc3RhcnQgb25jZSBpbml0aWFsbHlcbiAgICBwb2xsQWxsQXBwc0Nsb3NlZCgpO1xuICB9KS5jYXRjaChfY2F0Y2hHZW5lcmljRXJyKTtcbn1cblxuZnVuY3Rpb24gX3dhaXRGb3JBbGxBcHBzVG9TdGFydChzYXZlZFdpbmRvd0xpc3QpOiBQcm9taXNlPFdpbk9ialtdIHwgdW5rbm93bj4ge1xuICBsb2coXCJXYWl0aW5nIGZvciBhbGwgYXBwbGljYXRpb25zIHRvIHN0YXJ0Li4uXCIpO1xuXG4gIGxldCB0b3RhbFRpbWVXYWl0ZWQgPSAwO1xuICBsZXQgdGltZW91dDtcblxuICByZXR1cm4gbmV3IFByb21pc2UoKGZ1bGZpbGwsIHJlamVjdCkgPT4ge1xuICAgIGZ1bmN0aW9uIHBvbGxBbGxBcHBzU3RhcnRlZChcbiAgICAgIHNhdmVkV2luZG93TGlzdDogV2luT2JqW10sXG4gICAgICB0aW1lb3V0RHVyYXRpb24gPSBDRkcuUE9MTF9BTExfQVBQU19TVEFSVEVEX0lOVEVSVkFMXG4gICAgKSB7XG4gICAgICB0aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIC8vIGNsZWFyIHRpbWVvdXQgdG8gYmUgc2F2ZVxuICAgICAgICBpZih0aW1lb3V0KSB7XG4gICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0QWN0aXZlV2luZG93TGlzdEZsb3coKVxuICAgICAgICAgIC50aGVuKGN1cnJlbnRXaW5kb3dMaXN0ID0+IHtcbiAgICAgICAgICAgIHRvdGFsVGltZVdhaXRlZCArPSBDRkcuUE9MTF9BTExfQVBQU19TVEFSVEVEX0lOVEVSVkFMO1xuICAgICAgICAgICAgaWYoIV9pc0FsbEFwcHNTdGFydGVkKHNhdmVkV2luZG93TGlzdCwgY3VycmVudFdpbmRvd0xpc3QpKSB7XG4gICAgICAgICAgICAgIGlmKHRvdGFsVGltZVdhaXRlZCA+IENGRy5QT0xMX0FMTF9NQVhfVElNRU9VVCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJQT0xMX0FMTF9NQVhfVElNRU9VVCByZWFjaGVkXCIpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgICAgICAgICBcIlVuYWJsZSB0byBzdGFydCB0aGUgZm9sbG93aW5nIGFwcHNcIixcbiAgICAgICAgICAgICAgICAgIF9nZXROb3RTdGFydGVkQXBwcyhzYXZlZFdpbmRvd0xpc3QsIGN1cnJlbnRXaW5kb3dMaXN0KVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgcmVqZWN0KFwiUE9MTF9BTExfTUFYX1RJTUVPVVQgcmVhY2hlZFwiKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBjYWxsIHJlY3Vyc2l2ZWx5XG4gICAgICAgICAgICAgICAgcG9sbEFsbEFwcHNTdGFydGVkKHNhdmVkV2luZG93TGlzdCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGxvZyhcIkFsbCBhcHBsaWNhdGlvbnMgc3RhcnRlZFwiKTtcbiAgICAgICAgICAgICAgZnVsZmlsbChjdXJyZW50V2luZG93TGlzdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2gocmVqZWN0KTtcbiAgICAgIH0sIHRpbWVvdXREdXJhdGlvbik7XG4gICAgfVxuXG4gICAgLy8gc3RhcnQgb25jZSBpbml0aWFsbHlcbiAgICBwb2xsQWxsQXBwc1N0YXJ0ZWQoc2F2ZWRXaW5kb3dMaXN0LCA1MDApO1xuICB9KS5jYXRjaChfY2F0Y2hHZW5lcmljRXJyKTtcbn1cblxuZnVuY3Rpb24gX2dldE5vdFN0YXJ0ZWRBcHBzKFxuICBzYXZlZFdpbmRvd0xpc3Q6IFdpbk9ialtdLFxuICBjdXJyZW50V2luZG93TGlzdDogV2luT2JqW11cbik6IFdpbk9ialtdIHtcbiAgbGV0IG5vblN0YXJ0ZWRBcHBzID0gW107XG4gIHNhdmVkV2luZG93TGlzdC5mb3JFYWNoKHdpbiA9PiB7XG4gICAgaWYoIV9nZXRNYXRjaGluZ1dpbmRvd0lkKHdpbiwgY3VycmVudFdpbmRvd0xpc3QpKSB7XG4gICAgICBub25TdGFydGVkQXBwcy5wdXNoKHdpbik7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIG5vblN0YXJ0ZWRBcHBzO1xufVxuXG5mdW5jdGlvbiBfaXNBbGxBcHBzU3RhcnRlZChcbiAgc2F2ZWRXaW5kb3dMaXN0OiBXaW5PYmpbXSxcbiAgY3VycmVudFdpbmRvd0xpc3Q6IFdpbk9ialtdXG4pOiBib29sZWFuIHtcbiAgbGV0IGlzQWxsU3RhcnRlZCA9IHRydWU7XG4gIGNvbnN0IGN1cnJlbnRXaW5kb3dMaXN0Q29weSA9IGN1cnJlbnRXaW5kb3dMaXN0LnNsaWNlKDApO1xuICBzYXZlZFdpbmRvd0xpc3QuZm9yRWFjaCh3aW4gPT4ge1xuICAgIGlmKCFfZ2V0TWF0Y2hpbmdXaW5kb3dJZCh3aW4sIGN1cnJlbnRXaW5kb3dMaXN0Q29weSkpIHtcbiAgICAgIGlzQWxsU3RhcnRlZCA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBpbmRleCA9IGN1cnJlbnRXaW5kb3dMaXN0Q29weS5maW5kSW5kZXgoXG4gICAgICAgIHdpbkZyb21DdXJyZW50ID0+IHdpbi53bUNsYXNzTmFtZSA9PT0gd2luRnJvbUN1cnJlbnQud21DbGFzc05hbWVcbiAgICAgICk7XG4gICAgICBjdXJyZW50V2luZG93TGlzdENvcHkuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gaXNBbGxTdGFydGVkO1xufVxuXG5hc3luYyBmdW5jdGlvbiBfZ3Vlc3NBbmRTZXREZXNrdG9wRmlsZVBhdGhzKFxuICB3aW5kb3dMaXN0OiBXaW5PYmpbXSxcbiAgaW5wdXRIYW5kbGVyXG4pOiBQcm9taXNlPFdpbk9ialtdPiB7XG4gIGNvbnN0IHByb21pc2VzID0gd2luZG93TGlzdC5tYXAod2luID0+IF9ndWVzc0ZpbGVQYXRoKHdpbiwgaW5wdXRIYW5kbGVyKSk7XG5cbiAgZm9yIChjb25zdCBwcm9taXNlIG9mIHByb21pc2VzKSB7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IHByb21pc2U7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgX2NhdGNoR2VuZXJpY0VycihlKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHdpbmRvd0xpc3Q7XG59XG5cbmZ1bmN0aW9uIF9ndWVzc0ZpbGVQYXRoKHdpbjogV2luT2JqLCBpbnB1dEhhbmRsZXIpOiBQcm9taXNlPHN0cmluZyB8IHVua25vd24+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChmdWxmaWxsLCByZWplY3QpID0+IHtcbiAgICBmdW5jdGlvbiBjYWxsSW5wdXRIYW5kbGVyKGVycm9yPywgc3Rkb3V0Pykge1xuICAgICAgaWYoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5sb2coYFxcbiBUcnlpbmcgYWx0ZXJuYXRpdmUgZ3Vlc3NpbmcgYXBwcm9hY2ggZm9yIFwiJHt3aW4uc2ltcGxlTmFtZX1cIi4uLi4uYCk7XG4gICAgICAgIGV4ZWMoYGNhdCAvcHJvYy8ke3dpbi53bVBpZH0vY21kbGluZWAsIChlcnJvcjEsIHN0ZG91dDEpID0+IHtcbiAgICAgICAgICBpZihlcnJvcjEgfHwgIXN0ZG91dDEubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFUlIgX2d1ZXNzRmlsZVBhdGgoKScsIGVycm9yMSk7XG4gICAgICAgICAgICByZWplY3QoZXJyb3IxKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgZW50ID0gc3Rkb3V0MS5zcGxpdCgnXFx1MDAwMCcpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coYFxcbiBBbHRlcm5hdGl2ZSBndWVzc2luZyBhcHByb2FjaCBmb3IgXCIke3dpbi5zaW1wbGVOYW1lfVwiIFNVQ0NFU1MgLT4gJHtlbnRbMF19YCk7XG4gICAgICAgICAgICB3aW4uZXhlY3V0YWJsZUZpbGUgPSBlbnRbMF07XG4gICAgICAgICAgICBmdWxmaWxsKHdpbi5leGVjdXRhYmxlRmlsZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlucHV0SGFuZGxlcihlcnJvciwgd2luLCBzdGRvdXQpXG4gICAgICAgICAgLnRoZW4oaW5wdXQgPT4ge1xuICAgICAgICAgICAgaWYoX2lzRGVza3RvcEZpbGUod2luLmV4ZWN1dGFibGVGaWxlKSkge1xuICAgICAgICAgICAgICB3aW4uZGVza3RvcEZpbGVQYXRoID0gaW5wdXQ7XG4gICAgICAgICAgICAgIGZ1bGZpbGwod2luLmRlc2t0b3BGaWxlUGF0aCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB3aW4uZXhlY3V0YWJsZUZpbGUgPSBpbnB1dDtcbiAgICAgICAgICAgICAgZnVsZmlsbCh3aW4uZXhlY3V0YWJsZUZpbGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKHJlamVjdCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYoX2lzRGVza3RvcEZpbGUod2luLmV4ZWN1dGFibGVGaWxlKSkge1xuICAgICAgZmluZERlc2t0b3BGaWxlKHdpbi5leGVjdXRhYmxlRmlsZSlcbiAgICAgICAgLnRoZW4oc3Rkb3V0ID0+IHtcbiAgICAgICAgICBjYWxsSW5wdXRIYW5kbGVyKG51bGwsIHN0ZG91dCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChjYWxsSW5wdXRIYW5kbGVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2FsbElucHV0SGFuZGxlcih0cnVlLCB3aW4uZXhlY3V0YWJsZUZpbGUpO1xuICAgIH1cbiAgfSkuY2F0Y2goX2NhdGNoR2VuZXJpY0Vycik7XG59XG5cbi8vIFRPRE8gY2hlY2sgZm9yIGhvdyBtYW55IGluc3RhbmNlcyB0aGVyZSBzaG91bGQgYmUgcnVubmluZyBvZiBhIHByb2dyYW1cbmFzeW5jIGZ1bmN0aW9uIF9zdGFydFNlc3Npb25Qcm9ncmFtcyhcbiAgd2luZG93TGlzdDogV2luT2JqW10sXG4gIGN1cnJlbnRXaW5kb3dMaXN0OiBXaW5PYmpbXVxuKTogUHJvbWlzZTx2b2lkPiB7XG4gIC8vIHNldCBpbnN0YW5jZXMgc3RhcnRlZCB0byAwXG4gIHdpbmRvd0xpc3QuZm9yRWFjaCh3aW4gPT4gKHdpbi5pbnN0YW5jZXNTdGFydGVkID0gMCkpO1xuICBjb25zdCBwcm9taXNlcyA9IHdpbmRvd0xpc3RcbiAgICAuZmlsdGVyKHdpbiA9PiB7XG4gICAgICBjb25zdCBudW1iZXJPZkluc3RhbmNlc09mV2luID0gX2dldE51bWJlck9mSW5zdGFuY2VzVG9SdW4oXG4gICAgICAgIHdpbixcbiAgICAgICAgd2luZG93TGlzdFxuICAgICAgKTtcbiAgICAgIHJldHVybiAhX2lzUHJvZ3JhbUFscmVhZHlSdW5uaW5nKFxuICAgICAgICB3aW4ud21DbGFzc05hbWUsXG4gICAgICAgIGN1cnJlbnRXaW5kb3dMaXN0LFxuICAgICAgICBudW1iZXJPZkluc3RhbmNlc09mV2luLFxuICAgICAgICB3aW4uaW5zdGFuY2VzU3RhcnRlZFxuICAgICAgKTtcbiAgICB9KVxuICAgIC5tYXAod2luID0+IHtcbiAgICAgIHdpbi5pbnN0YW5jZXNTdGFydGVkICs9IDE7XG4gICAgICByZXR1cm4gc3RhcnRQcm9ncmFtKHdpbi5leGVjdXRhYmxlRmlsZSwgd2luLmRlc2t0b3BGaWxlUGF0aCk7XG4gICAgfSk7XG5cbiAgYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xufVxuXG5mdW5jdGlvbiBfZ2V0TnVtYmVyT2ZJbnN0YW5jZXNUb1J1bihcbiAgd2luZG93VG9NYXRjaDogV2luT2JqLFxuICB3aW5kb3dMaXN0OiBXaW5PYmpbXVxuKTogbnVtYmVyIHtcbiAgcmV0dXJuIHdpbmRvd0xpc3QuZmlsdGVyKHdpbiA9PiB7XG4gICAgcmV0dXJuIHdpbi53bUNsYXNzTmFtZSA9PT0gd2luZG93VG9NYXRjaC53bUNsYXNzTmFtZTtcbiAgfSkubGVuZ3RoO1xufVxuXG5mdW5jdGlvbiBfaXNQcm9ncmFtQWxyZWFkeVJ1bm5pbmcoXG4gIHdtQ2xhc3NOYW1lOiBzdHJpbmcsXG4gIGN1cnJlbnRXaW5kb3dMaXN0OiBXaW5PYmpbXSxcbiAgbnVtYmVyT2ZJbnN0YW5jZXNUb1J1bjogbnVtYmVyLFxuICBpbnN0YW5jZXNTdGFydGVkOiBudW1iZXJcbik6IGJvb2xlYW4ge1xuICBpZighbnVtYmVyT2ZJbnN0YW5jZXNUb1J1bikge1xuICAgIG51bWJlck9mSW5zdGFuY2VzVG9SdW4gPSAxO1xuICB9XG5cbiAgaWYoIWluc3RhbmNlc1N0YXJ0ZWQpIHtcbiAgICBpbnN0YW5jZXNTdGFydGVkID0gMDtcbiAgfVxuXG4gIGxldCBpbnN0YW5jZXNSdW5uaW5nID0gMDtcbiAgY3VycmVudFdpbmRvd0xpc3QuZm9yRWFjaCh3aW4gPT4ge1xuICAgIGlmKHdpbi53bUNsYXNzTmFtZSA9PT0gd21DbGFzc05hbWUpIHtcbiAgICAgIGluc3RhbmNlc1J1bm5pbmcrKztcbiAgICB9XG4gIH0pO1xuICBsb2coXG4gICAgJ1N0YXR1czogXCInICsgd21DbGFzc05hbWUgKyAnXCIgaXMgcnVubmluZzonLFxuICAgIGluc3RhbmNlc1J1bm5pbmcgKyBpbnN0YW5jZXNTdGFydGVkID49IG51bWJlck9mSW5zdGFuY2VzVG9SdW4sXG4gICAgbnVtYmVyT2ZJbnN0YW5jZXNUb1J1bixcbiAgICBpbnN0YW5jZXNTdGFydGVkXG4gICk7XG4gIHJldHVybiBpbnN0YW5jZXNSdW5uaW5nICsgaW5zdGFuY2VzU3RhcnRlZCA+PSBudW1iZXJPZkluc3RhbmNlc1RvUnVuO1xufVxuXG5mdW5jdGlvbiBfaXNEZXNrdG9wRmlsZShleGVjdXRhYmxlRmlsZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gIHJldHVybiBleGVjdXRhYmxlRmlsZSAmJiAhIWV4ZWN1dGFibGVGaWxlLm1hdGNoKC9kZXNrdG9wJC8pO1xufVxuXG5mdW5jdGlvbiBfdXBkYXRlV2luZG93SWRzKFxuICBzYXZlZFdpbmRvd0xpc3Q6IFdpbk9ialtdLFxuICBjdXJyZW50V2luZG93TGlzdDogV2luT2JqW11cbikge1xuICBjb25zdCB3bUNsYXNzTmFtZU1hcCA9IHt9O1xuICBzYXZlZFdpbmRvd0xpc3QuZm9yRWFjaCh3aW4gPT4ge1xuICAgIGlmKCF3bUNsYXNzTmFtZU1hcFt3aW4ud21DbGFzc05hbWVdKSB7XG4gICAgICB3bUNsYXNzTmFtZU1hcFt3aW4ud21DbGFzc05hbWVdID0gX2dldE1hdGNoaW5nV2luZG93cyhcbiAgICAgICAgd2luLFxuICAgICAgICBjdXJyZW50V2luZG93TGlzdFxuICAgICAgKTtcbiAgICB9XG5cbiAgICB3aW4ud2luZG93SWQgPSB3bUNsYXNzTmFtZU1hcFt3aW4ud21DbGFzc05hbWVdWzBdLndpbmRvd0lkO1xuICAgIHdpbi53aW5kb3dJZERlYyA9IHBhcnNlSW50KHdpbi53aW5kb3dJZCwgMTYpO1xuXG4gICAgLy8gcmVtb3ZlIGZpcnN0IGVudHJ5XG4gICAgd21DbGFzc05hbWVNYXBbd2luLndtQ2xhc3NOYW1lXS5zaGlmdCgpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gX2dldE1hdGNoaW5nV2luZG93SWQoXG4gIHdpbjogV2luT2JqLFxuICBjdXJyZW50V2luZG93TGlzdDogV2luT2JqW11cbik6IHN0cmluZyB7XG4gIGNvbnN0IGN1cnJlbnRXaW5kb3cgPSBjdXJyZW50V2luZG93TGlzdC5maW5kKFxuICAgIHdpbkZyb21DdXJyZW50ID0+IHdpbi53bUNsYXNzTmFtZSA9PT0gd2luRnJvbUN1cnJlbnQud21DbGFzc05hbWVcbiAgKTtcbiAgcmV0dXJuIGN1cnJlbnRXaW5kb3cgJiYgY3VycmVudFdpbmRvdy53aW5kb3dJZDtcbn1cblxuZnVuY3Rpb24gX2dldE1hdGNoaW5nV2luZG93cyhcbiAgd2luOiBXaW5PYmosXG4gIGN1cnJlbnRXaW5kb3dMaXN0OiBXaW5PYmpbXVxuKTogV2luT2JqW10ge1xuICByZXR1cm4gY3VycmVudFdpbmRvd0xpc3QuZmlsdGVyKFxuICAgIHdpbkZyb21DdXJyZW50ID0+IHdpbi53bUNsYXNzTmFtZSA9PT0gd2luRnJvbUN1cnJlbnQud21DbGFzc05hbWVcbiAgKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gX3Jlc3RvcmVXaW5kb3dQb3NpdGlvbnMoXG4gIHNhdmVkV2luZG93TGlzdDogV2luT2JqW11cbik6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCBwcm9taXNlcyA9IFtdO1xuICBzYXZlZFdpbmRvd0xpc3QuZm9yRWFjaCh3aW4gPT4ge1xuICAgIHByb21pc2VzLnB1c2gocmVzdG9yZVdpbmRvd1Bvc2l0aW9uKHdpbikpO1xuICAgIHByb21pc2VzLnB1c2gobW92ZVRvV29ya3NwYWNlKHdpbi53aW5kb3dJZCwgd2luLndtQ3VycmVudERlc2t0b3BOcikpO1xuICB9KTtcblxuICBmb3IgKGNvbnN0IHByb21pc2Ugb2YgcHJvbWlzZXMpIHtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgcHJvbWlzZTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBfY2F0Y2hHZW5lcmljRXJyKGUpO1xuICAgIH1cbiAgfVxufVxuIl0sIm5hbWVzIjpbImZzLm1rZGlyU3luYyIsImZzLnJlYWRGaWxlU3luYyIsImZzLndyaXRlRmlsZVN5bmMiLCJzcGF3biIsImZzLmV4aXN0c1N5bmMiLCJmcy51bmxpbmtTeW5jIiwiX2NhdGNoR2VuZXJpY0VyciIsImZzLnVubGluayIsImV4ZWMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7U0FFZ0IsU0FBUyxDQUFDLE9BQU87SUFDL0IsSUFBSTtRQUNGQSxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDdkI7SUFBQyxPQUFPLEdBQUcsRUFBRTtRQUNaLElBQUksR0FBRyxDQUFDLElBQUksS0FBSyxRQUFRLEVBQUU7WUFDekIsTUFBTSxHQUFHLENBQUM7U0FDWDtLQUNGO0FBQ0gsQ0FBQztTQW9CZSxTQUFTO0lBQUMsaUJBQVU7U0FBVixVQUFVLEVBQVYscUJBQVUsRUFBVixJQUFVO1FBQVYsNEJBQVU7O0lBQ2xDLElBQU0sUUFBUSxHQUFHLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxJQUFJLE9BQU8sR0FB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
