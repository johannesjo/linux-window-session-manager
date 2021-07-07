'use strict';

var fs = require('fs');
var path = require('path');
var child_process = require('child_process');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
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
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
        console.log("DisplayID: " + connectedDisplaysId);
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
                console.log("DisplayID: " + connectedDisplaysId);
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

module.exports = index;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlsaXR5LnRzIiwiLi4vc3JjL2RlZmF1bHRDb25maWcudHMiLCIuLi9zcmMvbG9nLnRzIiwiLi4vc3JjL2NvbmZpZy50cyIsIi4uL3NyYy9pc0RlYnVnLnRzIiwiLi4vc3JjL3BhcnNlQ21kVG9TcGF3bi50cyIsIi4uL3NyYy94MTFXcmFwcGVyLnRzIiwiLi4vc3JjL290aGVyQ21kLnRzIiwiLi4vc3JjL21ldGFXcmFwcGVyLnRzIiwiLi4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGZzIGZyb20gXCJmc1wiO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tIFwicGF0aFwiO1xuXG5leHBvcnQgZnVuY3Rpb24gbWtkaXJTeW5jKGRpclBhdGgpIHtcbiAgdHJ5IHtcbiAgICBmcy5ta2RpclN5bmMoZGlyUGF0aCk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGlmIChlcnIuY29kZSAhPT0gXCJFRVhJU1RcIikge1xuICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbWtmaWxlU3luYyhmaWxlUGF0aCkge1xuICB0cnkge1xuICAgIGZzLndyaXRlRmlsZVN5bmMoZmlsZVBhdGgsIHsgZmxhZzogXCJ3eFwiIH0pO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBpZiAoZXJyLmNvZGUgIT09IFwiRUVYSVNUXCIpIHtcbiAgICAgIHRocm93IGVycjtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvcHlTeW5jKHNyYywgZGVzdCkge1xuICBpZiAoIWZzLmV4aXN0c1N5bmMoc3JjKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBjb25zdCBkYXRhID0gZnMucmVhZEZpbGVTeW5jKHNyYywgXCJ1dGYtOFwiKTtcbiAgZnMud3JpdGVGaWxlU3luYyhkZXN0LCBkYXRhKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlRGVlcCguLi5vYmplY3RzKSB7XG4gIGNvbnN0IGlzT2JqZWN0ID0gb2JqID0+IG9iaiAmJiB0eXBlb2Ygb2JqID09PSBcIm9iamVjdFwiO1xuXG4gIHJldHVybiBvYmplY3RzLnJlZHVjZSgocHJldiwgb2JqKSA9PiB7XG4gICAgT2JqZWN0LmtleXMob2JqKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICBjb25zdCBwVmFsID0gcHJldltrZXldO1xuICAgICAgY29uc3Qgb1ZhbCA9IG9ialtrZXldO1xuXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShwVmFsKSAmJiBBcnJheS5pc0FycmF5KG9WYWwpKSB7XG4gICAgICAgIHByZXZba2V5XSA9IHBWYWwuY29uY2F0KC4uLm9WYWwpO1xuICAgICAgfSBlbHNlIGlmIChpc09iamVjdChwVmFsKSAmJiBpc09iamVjdChvVmFsKSkge1xuICAgICAgICBwcmV2W2tleV0gPSBtZXJnZURlZXAocFZhbCwgb1ZhbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwcmV2W2tleV0gPSBvVmFsO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHByZXY7XG4gIH0sIHt9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1vdmVkaXIoZnJvbSwgdG8pIHtcbiAgbWtkaXJTeW5jKHRvKTtcbiAgbGV0IGNvbnRlbnRzID0gZnMucmVhZGRpclN5bmMoZnJvbSk7XG5cbiAgZm9yIChjb25zdCBlbGVtZW50IG9mIGNvbnRlbnRzKSB7XG4gICAgbGV0IGZyb21fZWxlbWVudCA9IHBhdGguam9pbihmcm9tLCBlbGVtZW50KTtcbiAgICBsZXQgdG9fZWxlbWVudCA9IHBhdGguam9pbih0bywgZWxlbWVudCk7XG5cbiAgICBpZiAoZnMubHN0YXRTeW5jKGZyb21fZWxlbWVudCkuaXNEaXJlY3RvcnkoKSkge1xuICAgICAgbW92ZWRpcihmcm9tX2VsZW1lbnQsIHRvX2VsZW1lbnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmcy5jb3B5RmlsZVN5bmMoZnJvbV9lbGVtZW50LCB0b19lbGVtZW50KTtcbiAgICAgIGZzLnVubGlua1N5bmMoZnJvbV9lbGVtZW50KTtcbiAgICB9XG4gIH1cbiAgZnMucm1kaXJTeW5jKGZyb20pO1xufVxuIiwiZXhwb3J0IGNvbnN0IERFRkFVTFRfQ0ZHID0ge1xuICBHSVZFX1gxMV9USU1FX1RJTUVPVVQ6IDgwLFxuICBQT0xMX0FMTF9BUFBTX1NUQVJURURfSU5URVJWQUw6IDIwMDAsXG4gIFBPTExfQUxMX01BWF9USU1FT1VUOiAxMjAwMDAsXG4gIFNBVkVfU0VTU0lPTl9JTl9QUkVUVFlfRk9STUFUOiB0cnVlLFxuICBXTV9DTEFTU19BTkRfRVhFQ1VUQUJMRV9GSUxFX01BUDoge1xuICAgIFwiZ25vbWUtdGVybWluYWwtc2VydmVyLkdub21lLXRlcm1pbmFsXCI6IFwiZ25vbWUtdGVybWluYWxcIixcbiAgICBcImdvb2dsZS1jaHJvbWUuR29vZ2xlLWNocm9tZVwiOiBcImdvb2dsZS1jaHJvbWUuZGVza3RvcFwiLFxuICAgIFwiYnJhdmUtYnJvd3Nlci5CcmF2ZS1icm93c2VyXCI6IFwiYnJhdmUtYnJvd3Nlci5kZXNrdG9wXCIsXG4gICAgXCJNYWlsLlRodW5kZXJiaXJkXCI6IFwidGh1bmRlcmJpcmQuZGVza3RvcFwiLFxuICAgIFwibmF1dGlsdXMuTmF1dGlsdXNcIjogXCJuYXV0aWx1c1wiLFxuICAgIFwib3JnLmdub21lLk5hdXRpbHVzLk9yZy5nbm9tZS5OYXV0aWx1c1wiOiBcIm5hdXRpbHVzXCIsXG4gICAgXCJOYXZpZ2F0b3IuRmlyZWZveFwiOiBcImZpcmVmb3guZGVza3RvcFwiLFxuICAgIFwiTmF2aWdhdG9yLlBhbGVcIjogXCJwYWxlbW9vbi5kZXNrdG9wXCIsXG4gICAgXCJza3lwZS5Ta3lwZVwiOiBcInNreXBlZm9ybGludXguZGVza3RvcFwiLFxuICAgIFwic3VuLWF3dC1YMTEtWEZyYW1lUGVlci5qZXRicmFpbnMtaWRlYVwiOiBcImpldGJyYWlucy1pZGVhLmRlc2t0b3BcIixcbiAgICBcIlZpcnR1YWxCb3guVmlydHVhbEJveFwiOiBcInZpcnR1YWxib3guZGVza3RvcFwiLFxuICAgIFwiVGVsZWdyYW0uVGVsZWdyYW1EZXNrdG9wXCI6IFwidGVsZWdyYW0tZGVza3RvcF90ZWxlZ3JhbWRlc2t0b3AuZGVza3RvcFwiLFxuICAgIFwidGVsZWdyYW0tZGVza3RvcC5UZWxlZ3JhbURlc2t0b3BcIjogXCJ0ZWxlZ3JhbWRlc2t0b3AuZGVza3RvcFwiLFxuICAgIFwia2VlcGFzc3hjLmtlZXBhc3N4Y1wiOiBcImtlZXBhc3N4Y19rZWVwYXNzeGMuZGVza3RvcFwiLFxuICAgIFwic2xhY2suU2xhY2tcIjogXCJjb20uc2xhY2suU2xhY2suZGVza3RvcFwiLFxuICAgIFwic2lnbmFsLlNpZ25hbFwiOiBcInNpZ25hbC1kZXNrdG9wLmRlc2t0b3BcIixcbiAgICBcIm1pY3Jvc29mdCB0ZWFtcyAtIHByZXZpZXcuTWljcm9zb2Z0IFRlYW1zIC0gUHJldmlld1wiOiBcInRlYW1zLmRlc2t0b3BcIlxuICB9LFxuICBXTV9DTEFTU19FWENMVVNJT05TOiBbXG4gICAgXCJOL0FcIixcbiAgICBcInRpbGRhLlRpbGRhXCIsXG4gICAgXCJQb3B1cC5kZXNrdG9wXCIsXG4gICAgXCJ1cGRhdGUtbWFuYWdlci5VcGRhdGUtbWFuYWdlclwiLFxuICAgIFwiZGVza3RvcF93aW5kb3cuTmF1dGlsdXNcIixcbiAgICBcImVsZWN0cm9uLkVsZWN0cm9uXCIsXG4gICAgXCJndWFrZS5NYWluLnB5XCIsXG4gICAgXCJnbm9tZS1zb2Z0d2FyZS5Hbm9tZS1zb2Z0d2FyZVwiXG4gIF0sXG4gIFdNX01FVEFfTUFQOiB7XG4gICAgXCJXTV9XSU5ET1dfUk9MRShTVFJJTkcpXCI6IFwid21Sb2xlXCIsXG4gICAgXCJXTV9DTEFTUyhTVFJJTkcpXCI6IFwid21DbGFzc05hbWVcIixcbiAgICBcIl9ORVRfV01fU1RBVEUoQVRPTSlcIjogXCJzdGF0ZXNcIixcbiAgICBcIl9ORVRfV01fREVTS1RPUChDQVJESU5BTClcIjogXCJ3bUN1cnJlbnREZXNrdG9wTnJcIixcbiAgICBcIldNX05BTUUoVVRGOF9TVFJJTkcpXCI6IFwid21UaXRsZVwiLFxuICAgIFwiX05FVF9XTV9QSUQoQ0FSRElOQUwpXCI6IFwid21QaWRcIixcbiAgICBcIl9ORVRfV01fV0lORE9XX1RZUEUoQVRPTSlcIjogXCJ3bVR5cGVcIixcbiAgICBcIl9CQU1GX0RFU0tUT1BfRklMRShTVFJJTkcpXCI6IFwiZXhlY3V0YWJsZUZpbGVcIlxuICB9LFxuICBXTV9NRVRBX01BUF9OVU1CRVJfVFlQRVM6IFtcbiAgICBcIl9ORVRfV01fUElEKENBUkRJTkFMKVwiLFxuICAgIFwiX05FVF9XTV9ERVNLVE9QKENBUkRJTkFMKVwiXG4gIF0sXG4gIERFU0tUT1BfRklMRV9MT0NBVElPTlM6IFtcbiAgICBcIntob21lfS8ubG9jYWwvc2hhcmUvYXBwbGljYXRpb25zXCIsXG4gICAgXCJ7aG9tZX0vLmdub21lL2FwcHNcIixcbiAgICBcIi91c3Ivc2hhcmUvYXBwbGljYXRpb25zXCIsXG4gICAgXCIvdXNyL2xvY2FsL3NoYXJlL2FwcGxpY2F0aW9uc1wiLFxuICAgIFwiL3Vzci9zaGFyZS9hcHAtaW5zdGFsbFwiLFxuICAgIFwie2hvbWV9Ly5jb25maWcvYXV0b3N0YXJ0XCIsXG4gICAgXCIvdmFyL2xpYi9zbmFwZC9kZXNrdG9wL2FwcGxpY2F0aW9uc1wiLFxuICAgIFwiL3Zhci9saWIvZmxhdHBhay9hcHBcIixcbiAgICBcIi92YXIvbGliL2ZsYXRwYWsvZXhwb3J0cy9zaGFyZS9hcHBsaWNhdGlvbnNcIixcbiAgICBcIntob21lfS8ubG9jYWwvc2hhcmUvZmxhdHBhay9leHBvcnRzL3NoYXJlL2FwcGxpY2F0aW9uc1wiLFxuICAgIFwiL3NuYXAvYmluXCJcbiAgXVxufTtcbiIsImV4cG9ydCBjb25zdCBsb2cgPSAoLi4uYXJncykgPT4gY29uc29sZS5sb2coLi4uYXJncyk7XG4iLCJpbXBvcnQgeyBtZXJnZURlZXAsIG1rZGlyU3luYywgbW92ZWRpciB9IGZyb20gXCIuL3V0aWxpdHlcIjtcbmltcG9ydCB7IERFRkFVTFRfQ0ZHIH0gZnJvbSBcIi4vZGVmYXVsdENvbmZpZ1wiO1xuaW1wb3J0ICogYXMgZnMgZnJvbSBcImZzXCI7XG5pbXBvcnQgeyBsb2cgfSBmcm9tIFwiLi9sb2dcIjtcblxubGV0IGNmZztcblxuZXhwb3J0IGNvbnN0IENGR19EQVRBX0RJUl9MRUdBQ1kgPSBfZ2V0VXNlckhvbWUoKSArIFwiLy5sd3NtXCI7XG5leHBvcnQgY29uc3QgQ0ZHX0RBVEFfRElSID0gX2dldFVzZXJIb21lKCkgKyBcIi8uY29uZmlnL2x3c21cIjtcbmV4cG9ydCBjb25zdCBDRkdfRklMRV9QQVRIID0gQ0ZHX0RBVEFfRElSICsgXCIvY29uZmlnLmpzb25cIjtcbmV4cG9ydCBjb25zdCBTRVNTSU9OX0RBVEFfRElSID0gQ0ZHX0RBVEFfRElSICsgXCIvc2Vzc2lvbkRhdGFcIjtcblxuLy8gSU5JVFxuLy8gLS0tLS0tLS0tLS0tXG50cnkge1xuICAvLyBpZiBDRkdfREFUQV9ESVJfTEVHQUNZIGV4aXN0cywgbW92ZSBpdCB0byBDRkdfREFUQV9ESVJcbiAgaWYgKGZzLmV4aXN0c1N5bmMoQ0ZHX0RBVEFfRElSX0xFR0FDWSkpIHtcbiAgICBpZiAoIWZzLmV4aXN0c1N5bmMoQ0ZHX0RBVEFfRElSKSkge1xuICAgICAgbW92ZWRpcihDRkdfREFUQV9ESVJfTEVHQUNZLCBDRkdfREFUQV9ESVIpO1xuICAgICAgbG9nKFxuICAgICAgICBgbHdzbTogbW92ZWQgY29uZmlnIGRpcmVjdG9yeSAke0NGR19EQVRBX0RJUl9MRUdBQ1l9IHRvICR7Q0ZHX0RBVEFfRElSfWBcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvZyhgbHdzbTogaWdub3JlZCBsZWdhY3kgY29uZmlnIGRpcmVjdG9yeSAke0NGR19EQVRBX0RJUl9MRUdBQ1l9YCk7XG4gICAgfVxuICB9XG5cbiAgLy8gaWYgY29uZmlnIGlzIGFscmVhZHkgaW4gcGxhY2VcbiAgY29uc3QgZnJvbUZpbGUgPSBKU09OLnBhcnNlKGZzLnJlYWRGaWxlU3luYyhDRkdfRklMRV9QQVRILCBcInV0ZjhcIikpO1xuICBjZmcgPSBtZXJnZURlZXAoREVGQVVMVF9DRkcsIGZyb21GaWxlKTtcbn0gY2F0Y2ggKGUpIHtcbiAgbG9nKFxuICAgIFwibHdzbTogbm8gY29uZmlnIGZpbGUgcHJlc2VudCBvciBpdCBjb250YWlucyBpbnZhbGlkIGpzb24uIENyZWF0aW5nIG5ldyBvbmUuLi5cIlxuICApO1xuXG4gIC8vIGlmIHRoZXJlIGlzIG5vIGNvbmZpZyB5ZXQgbG9hZCBkZWZhdWx0IGNmZyBhbmQgY3JlYXRlIGZpbGVzIGFuZCBkaXJzXG4gIGNmZyA9IERFRkFVTFRfQ0ZHO1xuXG4gIC8vIHNhdmUgZXhlY3V0YWJsZSBwYXRocyB0byBjZmdcbiAgY2ZnLkNNRF9KU0ZJTEVfUEFUSCA9IF9fZGlybmFtZSArIFwiLy4uL2NtZC5qc1wiO1xuICBjZmcuSlNGSUxFX0lOREVYX1BBVEggPSBfX2Rpcm5hbWUgKyBcIi9pbmRleC5qc1wiO1xuXG4gIG1rZGlyU3luYyhDRkdfREFUQV9ESVIpO1xuICBta2RpclN5bmMoU0VTU0lPTl9EQVRBX0RJUik7XG5cbiAgLy8gd3JpdGUgY29uZmlnIHRvIHVzZXIgZGlyXG4gIGZzLndyaXRlRmlsZVN5bmMoQ0ZHX0ZJTEVfUEFUSCwgSlNPTi5zdHJpbmdpZnkoY2ZnLCBudWxsLCAyKSwgXCJ1dGY4XCIpO1xufVxuXG4vLyBhbHNvIG1ha2UgZGF0YSBkaXJzIGFjY2Vzc2libGUgdG8gdGhlIG91dHNpZGVcbmNmZy5EQVRBX0RJUiA9IENGR19EQVRBX0RJUjtcbmNmZy5TRVNTSU9OX0RBVEFfRElSID0gU0VTU0lPTl9EQVRBX0RJUjtcblxuZXhwb3J0IGNvbnN0IENGRyA9IGNmZztcblxuZnVuY3Rpb24gX2dldFVzZXJIb21lKCkge1xuICByZXR1cm4gcHJvY2Vzcy5lbnZbcHJvY2Vzcy5wbGF0Zm9ybSA9PT0gXCJ3aW4zMlwiID8gXCJVU0VSUFJPRklMRVwiIDogXCJIT01FXCJdO1xufVxuIiwiZXhwb3J0IGNvbnN0IElTX0RFQlVHID0gcHJvY2Vzcy5hcmd2LmluZGV4T2YoXCItLWRlYnVnXCIpID4gLTE7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0IGNvbnN0IHBhcnNlQ21kQXJncyA9IGNtZCA9PiB7XG4gIGxldCBjbWRBbGxTcGxpdCA9IGNtZC5zcGxpdCgvIC8pO1xuICBsZXQgbWFpbkNvbW1hbmQgPSBjbWRBbGxTcGxpdFswXTtcbiAgbGV0IGFyZ3MgPSBbXTtcbiAgY21kQWxsU3BsaXQubWFwKGZ1bmN0aW9uKHMsIGkpIHtcbiAgICBpZiAoaSAhPT0gMCkge1xuICAgICAgYXJnc1tpIC0gMV0gPSBjbWRBbGxTcGxpdFtpXTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gW21haW5Db21tYW5kLCBfbWVyZ2VRdW90ZWRTdHJpbmdQYXJhbXMoYXJncyldO1xufTtcblxuZnVuY3Rpb24gX21lcmdlUXVvdGVkU3RyaW5nUGFyYW1zKGFyZ3MpIHtcbiAgY29uc3QgbmV3QXJncyA9IFtdO1xuICBsZXQgaXNJblF1b3RhdGlvbiA9IGZhbHNlO1xuICBsZXQgY3VycmVudFF1b3RhdGlvbkFyZztcblxuICAvLyBUT0RPIG1ha2UgaXQgd29yayB3aXRoIG1vcmUgZGlmZmVyZW50IHF1b3RhdGlvbiB0eXBlc1xuICBhcmdzLmZvckVhY2goYXJnID0+IHtcbiAgICAvLyBtYXRjaCBxdW90YXRpb24gZW5kXG4gICAgaWYgKGFyZy5tYXRjaCgvJyQvKSkge1xuICAgICAgY3VycmVudFF1b3RhdGlvbkFyZyArPSBcIiBcIiArIGFyZy5zbGljZSgwLCBhcmcubGVuZ3RoIC0gMSk7XG4gICAgICBuZXdBcmdzLnB1c2goY3VycmVudFF1b3RhdGlvbkFyZyk7XG4gICAgICBjdXJyZW50UXVvdGF0aW9uQXJnID0gdW5kZWZpbmVkO1xuICAgICAgaXNJblF1b3RhdGlvbiA9IGZhbHNlO1xuICAgIH1cbiAgICAvLyBtYXRjaCBxdW90YXRpb24gc3RhcnRcbiAgICBlbHNlIGlmIChhcmcubWF0Y2goL14nLykpIHtcbiAgICAgIGlzSW5RdW90YXRpb24gPSB0cnVlO1xuICAgICAgY3VycmVudFF1b3RhdGlvbkFyZyA9IGFyZy5zdWJzdHIoMSwgYXJnLmxlbmd0aCk7XG4gICAgfVxuICAgIC8vIHdoaWxlIGluIHF1b3RhdGlvblxuICAgIGVsc2UgaWYgKGlzSW5RdW90YXRpb24pIHtcbiAgICAgIGN1cnJlbnRRdW90YXRpb25BcmcgKz0gXCIgXCIgKyBhcmc7XG4gICAgfSBlbHNlIGlmIChhcmcgIT09IFwiXCIpIHtcbiAgICAgIG5ld0FyZ3MucHVzaChhcmcpO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIG5ld0FyZ3M7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgbG9nIH0gZnJvbSBcIi4vbG9nXCI7XG5pbXBvcnQgeyBDRkcgfSBmcm9tIFwiLi9jb25maWdcIjtcblxuY29uc3QgeDExID0gcmVxdWlyZShcIngxMVwiKTtcblxuZXhwb3J0IGxldCBYO1xubGV0IHJvb3Q7XG5sZXQgZGlzcGxheTtcblxuLy8gZXhwb3J0IGNvbnN0IGdldFdpbmRvd0luZm8gPSB3cmFwWDExKF9nZXRXaW5kb3dJbmZvKTtcbmV4cG9ydCBjb25zdCBnZXRYID0gKCkgPT4gWDtcblxuZnVuY3Rpb24gY2F0Y2hHZW5lcmljRXJyKGVycikge1xuICBjb25zb2xlLmVycm9yKFwieDExV3JhcHBlcjogXCIsIGVyciwgZXJyLnN0YWNrKTtcbn1cblxubGV0IGlzQ2xpZW50SW5pdGlhbGl6ZWQgPSBmYWxzZTtcbmxldCBpbml0UHJvbWlzZTtcblxuZXhwb3J0IGZ1bmN0aW9uIGluaXRYMTEoKTogUHJvbWlzZTxhbnk+IHtcbiAgaWYgKGlzQ2xpZW50SW5pdGlhbGl6ZWQpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cbiAgaWYgKGluaXRQcm9taXNlKSB7XG4gICAgcmV0dXJuIGluaXRQcm9taXNlO1xuICB9XG4gIGluaXRQcm9taXNlID0gbmV3IFByb21pc2UoKGZ1bGZpbGwsIHJlamVjdCkgPT4ge1xuICAgIHgxMVxuICAgICAgLmNyZWF0ZUNsaWVudCgoZXJyLCBkaXNwbGF5SW4pID0+IHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRpc3BsYXkgPSBkaXNwbGF5SW47XG4gICAgICAgICAgWCA9IGRpc3BsYXkuY2xpZW50O1xuXG4gICAgICAgICAgcm9vdCA9IGRpc3BsYXkuc2NyZWVuWzBdLnJvb3Q7XG4gICAgICAgICAgaXNDbGllbnRJbml0aWFsaXplZCA9IHRydWU7XG4gICAgICAgICAgZnVsZmlsbCgpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLm9uKFwiZXJyb3JcIiwgZXJyID0+IHtcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgfSk7XG4gIH0pLmNhdGNoKGNhdGNoR2VuZXJpY0Vycik7XG4gIHJldHVybiBpbml0UHJvbWlzZTtcbn1cblxuLy8gTUVUSE9EU1xuLy8gLS0tLS0tLVxuZXhwb3J0IGZ1bmN0aW9uIGdldERpc3BsYXlzKCk6IGFueVtdIHtcbiAgaWYgKCFkaXNwbGF5KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiWDExIG5vdCBpbml0aWFsaXplZCAvIE5vIHNjcmVlbiBhdmFpbGFibGVcIik7XG4gIH1cbiAgcmV0dXJuIGRpc3BsYXkuc2NyZWVuO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0V2luZG93R2VvbWV0cnkod2luSWQpIHtcbiAgY29uc3QgZ2VvOiBhbnkgPSB7fTtcblxuICByZXR1cm4gbmV3IFByb21pc2UoKGZ1bGZpbGwsIHJlamVjdCkgPT4ge1xuICAgIFguVHJhbnNsYXRlQ29vcmRpbmF0ZXMod2luSWQsIHJvb3QsIDAsIDAsIChlcnIsIHJlcykgPT4ge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGdlby54ID0gcmVzLmRlc3RYO1xuICAgICAgICBnZW8ueSA9IHJlcy5kZXN0WTtcblxuICAgICAgICBYLkdldEdlb21ldHJ5KHdpbklkLCAoZXJyLCByZXMpID0+IHtcbiAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZ2VvLndpZHRoID0gcmVzLndpZHRoO1xuICAgICAgICAgICAgZ2VvLmhlaWdodCA9IHJlcy5oZWlnaHQ7XG4gICAgICAgICAgICBmdWxmaWxsKGdlbyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSkuY2F0Y2goY2F0Y2hHZW5lcmljRXJyKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEFjdGl2ZVdpbmRvd0lkcygpOiBQcm9taXNlPHN0cmluZ1tdPiB7XG4gIGNvbnN0IFBST1BfTkFNRSA9IFwiX05FVF9DTElFTlRfTElTVFwiO1xuICBjb25zdCBwcm9wSWQgPSBhd2FpdCBfZ2V0UHJvcGVydHlJZEJ5TmFtZShyb290LCBQUk9QX05BTUUpO1xuICBjb25zdCBpZFN0ciA9IGF3YWl0IGdldFByb3Aocm9vdCwgcHJvcElkIGFzIG51bWJlcik7XG4gIHJldHVybiBfcGFyc2VXaW5kb3dJZHMoaWRTdHIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVzdG9yZVdpbmRvd1Bvc2l0aW9uKHdpbikge1xuICBsb2coJ1Jlc3RvcmluZyB3aW5kb3cgcG9zaXRpb24gZm9yIFwiJyArIHdpbi53bUNsYXNzTmFtZSArICdcIicpO1xuICBjb25zdCBTVEFURVNfVE9fUkVTRVQgPSBbXG4gICAgXCJfTkVUX1dNX1NUQVRFX01BWElNSVpFRF9WRVJUXCIsXG4gICAgXCJfTkVUX1dNX1NUQVRFX01BWElNSVpFRF9IT1JaXCJcbiAgXTtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChmdWxmaWxsLCByZWplY3QpID0+IHtcbiAgICBzZXRTdGF0ZSh3aW4ud2luZG93SWQsIFwicmVtb3ZlXCIsIFNUQVRFU19UT19SRVNFVClcbiAgICAgIC5jYXRjaChyZWplY3QpXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIFguTW92ZVJlc2l6ZVdpbmRvdyh3aW4ud2luZG93SWQsIHdpbi54LCB3aW4ueSwgd2luLndpZHRoLCB3aW4uaGVpZ2h0KTtcbiAgICAgICAgc2V0U3RhdGUod2luLndpbmRvd0lkLCBcImFkZFwiLCB3aW4uc3RhdGVzKVxuICAgICAgICAgIC5jYXRjaChyZWplY3QpXG4gICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgZnVsZmlsbCgpO1xuICAgICAgICAgIH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChyZWplY3QpO1xuICB9KS5jYXRjaChjYXRjaEdlbmVyaWNFcnIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xvc2VXaW5kb3cod2luSWQpIHtcbiAgcmV0dXJuIF9zZW5kWDExQ2xpZW50TWVzc2FnZSh3aW5JZCwgXCJfTkVUX0NMT1NFX1dJTkRPV1wiKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1vdmVUb1dvcmtzcGFjZSh3aW5JZCwgd29ya1NwYWNlTnIpIHtcbiAgLy8gTk9URTogaWYgaXQgZG9lc24ndCB3b3JrIHdlIG1pZ2h0IGFsc28gd2FudCB0byB1c2UgX1dJTl9XT1JLU1BBQ0VcbiAgcmV0dXJuIF9zZW5kWDExQ2xpZW50TWVzc2FnZSh3aW5JZCwgXCJfTkVUX1dNX0RFU0tUT1BcIiwgW1xuICAgIHtcbiAgICAgIHZhbHVlOiB3b3JrU3BhY2VOclxuICAgIH1cbiAgXSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnb1RvVmlld3BvcnQoeCwgeSkge1xuICByZXR1cm4gX3NlbmRYMTFDbGllbnRNZXNzYWdlKHJvb3QsIFwiX05FVF9ERVNLVE9QX1ZJRVdQT1JUXCIsIFtcbiAgICB7IHZhbHVlOiB4IH0sXG4gICAgeyB2YWx1ZTogeSB9XG4gIF0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0U3RhdGUod2lkLCBhY3Rpb25TdHIsIHN0YXRlc1RvSGFuZGxlKSB7XG4gIGNvbnN0IEFDVElPTlNfTUFQID0ge1xuICAgIHJlbW92ZTogMCxcbiAgICBhZGQ6IDEsXG4gICAgdG9nZ2xlOiAyXG4gIH07XG4gIGNvbnN0IGFjdGlvbiA9IEFDVElPTlNfTUFQW2FjdGlvblN0cl07XG4gIGxldCBwcm9wZXJ0aWVzOiBhbnlbXSA9IFt7IHZhbHVlOiBhY3Rpb24gfV07XG5cbiAgLy8gYWxsIHByb3BlcnRpZXMgbmVlZCB0byBiZSBsb29rZWQgdXAgZm9yIHRoZWlyIGF0b20gaWRcbiAgaWYgKEFycmF5LmlzQXJyYXkoc3RhdGVzVG9IYW5kbGUpICYmIHN0YXRlc1RvSGFuZGxlLmxlbmd0aCA+IDApIHtcbiAgICBzdGF0ZXNUb0hhbmRsZS5mb3JFYWNoKHN0YXRlUHJvcGVydHkgPT4ge1xuICAgICAgcHJvcGVydGllcy5wdXNoKHtcbiAgICAgICAgaXNBdG9tOiB0cnVlLFxuICAgICAgICB2YWx1ZTogc3RhdGVQcm9wZXJ0eVxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIF9zZW5kWDExQ2xpZW50TWVzc2FnZSh3aWQsIFwiX05FVF9XTV9TVEFURVwiLCBwcm9wZXJ0aWVzKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cbn1cblxuY29uc3QgUFJPUFNfVE9fR0VUID0gW1xuICBcIldNX0NMQVNTXCIsXG4gIFwiX05FVF9XTV9TVEFURVwiLFxuICBcIl9ORVRfV01fREVTS1RPUFwiLFxuICBcIldNX05BTUVcIixcbiAgXCJfTkVUX1dNX1BJRFwiLFxuICBcIl9ORVRfV01fV0lORE9XX1RZUEVcIixcbiAgXCJfQkFNRl9ERVNLVE9QX0ZJTEVcIlxuXTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFdpbmRvd0luZm8od2lkKTogUHJvbWlzZTxhbnk+IHtcbiAgLy8gWC5HZXRHZW9tZXRyeSh3aWQsIGZ1bmN0aW9uIChlcnIsIGNsaWVudEdlb20pIHtcbiAgLy8gICBjb25zb2xlLmxvZyhcIndpbmRvdyBnZW9tZXRyeTogXCIsIGNsaWVudEdlb20pO1xuICAvLyB9KTtcblxuICBjb25zdCBwcm9wczogYW55W10gPSBhd2FpdCBfeENiVG9Qcm9taXNlKFguTGlzdFByb3BlcnRpZXMsIHdpZCk7XG5cbiAgY29uc3QgcHJvbWlzZXMgPSBwcm9wcy5tYXAoYXN5bmMgZnVuY3Rpb24ocCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBwcm9wTmFtZSA9IGF3YWl0IF94Q2JUb1Byb21pc2UoWC5HZXRBdG9tTmFtZSwgcCk7XG4gICAgICAgIGlmIChQUk9QU19UT19HRVQuaW5jbHVkZXMocHJvcE5hbWUpKSB7XG4gICAgICAgICAgY29uc3QgcHJvcFZhbCA9IGF3YWl0IF94Q2JUb1Byb21pc2UoXG4gICAgICAgICAgICBYLkdldFByb3BlcnR5LFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIHdpZCxcbiAgICAgICAgICAgIHAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDEwMDAwMDAwXG4gICAgICAgICAgKTtcbiAgICAgICAgICBjb25zdCB0eXBlTmFtZSA9IGF3YWl0IF94Q2JUb1Byb21pc2UoWC5HZXRBdG9tTmFtZSwgcHJvcFZhbC50eXBlKTtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhwcm9wVmFsLCB0eXBlTmFtZSwgcHJvcE5hbWUpO1xuICAgICAgICAgIGNvbnN0IGRlY29kZWREYXRhID0gYXdhaXQgX2RlY29kZVByb3BlcnR5KHR5cGVOYW1lLCBwcm9wVmFsLmRhdGEpO1xuICAgICAgICAgIHJlc29sdmUocHJvcE5hbWUgKyBcIihcIiArIHR5cGVOYW1lICsgXCIpID0gXCIgKyBkZWNvZGVkRGF0YSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzb2x2ZShcIlwiKTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICByZWplY3QoZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xuXG4gIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbihyZXN1bHRzID0+IHtcbiAgICByZXR1cm4gcmVzdWx0cy5qb2luKFwiXFxuXCIpO1xuICB9KTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFByb3AoaWQgPSByb290LCBwcm9wSWQ6IG51bWJlcik6IFByb21pc2U8YW55PiB7XG4gIGNvbnN0IHByb3BWYWwgPSBhd2FpdCBfeENiVG9Qcm9taXNlKFxuICAgIFguR2V0UHJvcGVydHksXG4gICAgMCxcbiAgICBpZCxcbiAgICBwcm9wSWQsXG4gICAgMCxcbiAgICAwLFxuICAgIDEwMDAwMDAwXG4gICk7XG4gIGNvbnN0IHR5cGVOYW1lID0gYXdhaXQgX3hDYlRvUHJvbWlzZShYLkdldEF0b21OYW1lLCBwcm9wVmFsLnR5cGUpO1xuICByZXR1cm4gYXdhaXQgX2RlY29kZVByb3BlcnR5KHR5cGVOYW1lLCBwcm9wVmFsLmRhdGEpO1xufVxuXG4vLyBIRUxQRVJcbi8vIC0tLS0tLVxuZnVuY3Rpb24gX3hDYlRvUHJvbWlzZShmbiwgLi4uYXJncyk6IGFueSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgoZnVsZmlsbCwgcmVqZWN0KSA9PiB7XG4gICAgZm4uYXBwbHkoWCwgW1xuICAgICAgLi4uYXJncyxcbiAgICAgIChlcnIsIHJlcykgPT4ge1xuICAgICAgICByZXR1cm4gZXJyID8gcmVqZWN0KGVycikgOiBmdWxmaWxsKHJlcyk7XG4gICAgICB9XG4gICAgXSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBfY291bnRlcihpbml0aWFsVmFsLCBtb2RpZmllcikge1xuICAvLyB0byBzdGFydCBhdCB2YWwgd2UgbmVlZCB0byBzdWJ0cmFjdCB0aGUgbW9kaWZpZXIgZmlyc3RcbiAgbGV0IHZhbCA9IGluaXRpYWxWYWwgLSBtb2RpZmllcjtcbiAgcmV0dXJuICgpID0+IHtcbiAgICB2YWwgKz0gbW9kaWZpZXI7XG4gICAgcmV0dXJuIHZhbDtcbiAgfTtcbn1cblxuZnVuY3Rpb24gX2dldEF0b21zKGxpc3QsIGNiKSB7XG4gIGNvbnN0IHJlcyA9IHt9O1xuICBjb25zdCBnZXRBdG9tID0gKCkgPT4ge1xuICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIGNiKG51bGwsIHJlcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG5hbWUgPSBsaXN0LnNoaWZ0KCk7XG4gICAgICBYLkludGVybkF0b20oZmFsc2UsIG5hbWUsIChlcnIsIGF0b20pID0+IHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIHJldHVybiBjYihlcnIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc1tuYW1lXSA9IGF0b207XG4gICAgICAgICAgZ2V0QXRvbSgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG4gIGdldEF0b20oKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gX2dldFByb3BlcnR5SWRCeU5hbWUoXG4gIHdpZDogc3RyaW5nLFxuICBuYW1lVG9HZXQ6IHN0cmluZ1xuKTogUHJvbWlzZTxudW1iZXI+IHtcbiAgY29uc3QgcHJvcHM6IGFueVtdID0gYXdhaXQgX3hDYlRvUHJvbWlzZShYLkxpc3RQcm9wZXJ0aWVzLCB3aWQpO1xuICBjb25zdCBwcm9taXNlcyA9IHByb3BzLm1hcChhc3luYyBmdW5jdGlvbihwKSB7XG4gICAgY29uc3QgcHJvcE5hbWUgPSBhd2FpdCBfeENiVG9Qcm9taXNlKFguR2V0QXRvbU5hbWUsIHApO1xuICAgIGlmIChuYW1lVG9HZXQgPT09IHByb3BOYW1lKSB7XG4gICAgICByZXR1cm4gcDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfSk7XG5cbiAgY29uc3QgcmVzID0gYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuICByZXR1cm4gcmVzLmZpbmQoaXRlbSA9PiBpdGVtID4gMCk7XG59XG5cbmZ1bmN0aW9uIF9zZW5kWDExQ2xpZW50TWVzc2FnZShcbiAgd2lkLFxuICBldmVudE5hbWUsXG4gIGV2ZW50UHJvcGVydGllcyA9IFtdLFxuICBvcHRpb25hbEV2ZW50TWFzaz9cbikge1xuICBpZiAoZXZlbnRQcm9wZXJ0aWVzLmxlbmd0aCA+IDQpIHtcbiAgICB0aHJvdyBcIm9ubHkgc3VwcG9ydHMgNCBwcm9wZXJ0aWVzIGF0IG9uY2UgbWF4XCI7XG4gIH1cblxuICBjb25zdCBvZmZzZXRDb3VudGVyID0gX2NvdW50ZXIoNCwgNCk7XG4gIGNvbnN0IGV2ZW50TWFzayA9IG9wdGlvbmFsRXZlbnRNYXNrIHx8IHgxMS5ldmVudE1hc2suU3Vic3RydWN0dXJlUmVkaXJlY3Q7XG5cbiAgLy8gY3JlYXRlIGF0b21zIHRvIGxvb2sgdXBcbiAgbGV0IGF0b21zTGlzdCA9IFtdO1xuICBhdG9tc0xpc3QucHVzaChldmVudE5hbWUpO1xuICBldmVudFByb3BlcnRpZXMuZm9yRWFjaChldmVudFByb3BlcnR5ID0+IHtcbiAgICBpZiAoZXZlbnRQcm9wZXJ0eS5pc0F0b20pIHtcbiAgICAgIGF0b21zTGlzdC5wdXNoKGV2ZW50UHJvcGVydHkudmFsdWUpO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gc3RhcnQgYnVmZmVyIGlucHV0XG4gIGNvbnN0IGRhdGEgPSBuZXcgQnVmZmVyKDMyKTtcbiAgZGF0YS5maWxsKDApO1xuICBkYXRhLndyaXRlSW50OCgzMywgMCk7IC8vIDMzID0gQ2xpZW50TWVzc2FnZVxuICBkYXRhLndyaXRlSW50OCgzMiwgMSk7IC8vIGZvcm1hdFxuICBkYXRhLndyaXRlVUludDMyTEUod2lkLCBvZmZzZXRDb3VudGVyKCkpO1xuXG4gIHJldHVybiBuZXcgUHJvbWlzZSgoZnVsZmlsbCwgcmVqZWN0KSA9PiB7XG4gICAgX2dldEF0b21zKGF0b21zTGlzdCwgKGVyciwgYXRvbXMpID0+IHtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgIHRocm93IGVycjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRhdGEud3JpdGVVSW50MzJMRShhdG9tc1tldmVudE5hbWVdLCBvZmZzZXRDb3VudGVyKCkpO1xuXG4gICAgICAgIGV2ZW50UHJvcGVydGllcy5mb3JFYWNoKGV2ZW50UHJvcGVydHkgPT4ge1xuICAgICAgICAgIGlmIChldmVudFByb3BlcnR5LmlzQXRvbSkge1xuICAgICAgICAgICAgZGF0YS53cml0ZVVJbnQzMkxFKGF0b21zW2V2ZW50UHJvcGVydHkudmFsdWVdLCBvZmZzZXRDb3VudGVyKCkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkYXRhLndyaXRlVUludDMyTEUoZXZlbnRQcm9wZXJ0eS52YWx1ZSwgb2Zmc2V0Q291bnRlcigpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxldCBzb3VyY2VJbmRpY2F0aW9uID0gMTtcbiAgICAgICAgZGF0YS53cml0ZVVJbnQzMkxFKHNvdXJjZUluZGljYXRpb24sIG9mZnNldENvdW50ZXIoKSk7XG5cbiAgICAgICAgWC5TZW5kRXZlbnQocm9vdCwgMCwgZXZlbnRNYXNrLCBkYXRhKTtcblxuICAgICAgICAvLyB3ZSBuZWVkIGEgbGl0dGxlIHRpbWUgZm9yIHRoZSBidWZmZXIgdG8gYmUgcHJvY2Vzc2VkXG4gICAgICAgIHNldFRpbWVvdXQoZnVsZmlsbCwgQ0ZHLkdJVkVfWDExX1RJTUVfVElNRU9VVCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pLmNhdGNoKGNhdGNoR2VuZXJpY0Vycik7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIF9kZWNvZGVQcm9wZXJ0eSh0eXBlLCBkYXRhKTogUHJvbWlzZTxhbnk+IHtcbiAgdHJ5IHtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgXCJTVFJJTkdcIjoge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBbXTtcbiAgICAgICAgbGV0IHMgPSBcIlwiO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICBpZiAoZGF0YVtpXSA9PSAwKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaChzKTtcbiAgICAgICAgICAgIHMgPSBcIlwiO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIHMgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShkYXRhW2ldKTtcbiAgICAgICAgfVxuICAgICAgICByZXN1bHQucHVzaChzKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdC5tYXAocXVvdGl6ZSkuam9pbihcIiwgXCIpO1xuICAgICAgfVxuICAgICAgY2FzZSBcIkFUT01cIjpcbiAgICAgICAgaWYgKGRhdGEubGVuZ3RoID4gMzIpIHtcbiAgICAgICAgICByZXR1cm4gXCJMT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PTkdcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHByb21pc2VzID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkgKz0gNCkge1xuICAgICAgICAgIGNvbnN0IGEgPSBkYXRhLnVucGFjayhcIkxcIiwgaSlbMF07XG4gICAgICAgICAgcHJvbWlzZXMucHVzaChfeENiVG9Qcm9taXNlKFguR2V0QXRvbU5hbWUsIGEpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICByZXR1cm4gcmVzLmpvaW4oXCIsIFwiKTtcbiAgICAgICAgfSk7XG5cbiAgICAgIGNhc2UgXCJDQVJESU5BTFwiOlxuICAgICAgY2FzZSBcIklOVEVHRVJcIjoge1xuICAgICAgICBjb25zdCByZXMgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSArPSA0KSB7XG4gICAgICAgICAgcmVzLnB1c2goZGF0YS51bnBhY2soXCJMXCIsIGkpWzBdKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzLmpvaW4oXCIsIFwiKTtcbiAgICAgIH1cbiAgICAgIGNhc2UgXCJXSU5ET1dcIjpcbiAgICAgICAgY29uc3QgcmVzID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkgKz0gNCkge1xuICAgICAgICAgIHJlcy5wdXNoKGRhdGEudW5wYWNrKFwiTFwiLCBpKVswXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICBcIndpbmRvdyBpZCMgXCIgK1xuICAgICAgICAgIHJlc1xuICAgICAgICAgICAgLm1hcChuID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIFwiMHhcIiArIG4udG9TdHJpbmcoMTYpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5qb2luKFwiLCBcIilcbiAgICAgICAgKTtcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIFwiV1RGIFwiICsgdHlwZTtcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjb25zb2xlLmxvZyh0eXBlLCBkYXRhKTtcbiAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgIHRocm93IG5ldyBFcnJvcihlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBxdW90aXplKGkpIHtcbiAgcmV0dXJuICdcIicgKyBpICsgJ1wiJztcbn1cblxuZnVuY3Rpb24gX3BhcnNlV2luZG93SWRzKHN0ckluKTogc3RyaW5nW10ge1xuICBjb25zdCBzdHIgPSBzdHJJbi5yZXBsYWNlKFwid2luZG93IGlkIyBcIiwgXCJcIik7XG4gIGNvbnN0IHNwbGl0ID0gc3RyLnNwbGl0KFwiLCBcIik7XG4gIHJldHVybiBzcGxpdFswXSA9PT0gXCJcIiA/IFtdIDogc3BsaXQ7XG59XG5cbi8vY29uc3QgdGVzdEZuID0gd3JhcFgxMShjbG9zZVdpbmRvdyk7XG4vL3Rlc3RGbignMHgwNGEwMDAwMScpLnRoZW4oKGdlbykgPT4ge1xuLy99KTtcblxuLy9jb25zdCB0ZXN0Rm4gPSB3cmFwWDExKG1vdmVUb1dvcmtzcGFjZSk7XG4vL3Rlc3RGbignMHgwNGUwMDAwMSAnLCAyKTtcblxuLy9jb25zdCB0ZXN0Rm5YID0gd3JhcFgxMShyZXN0b3JlV2luZG93UG9zaXRpb24pO1xuLy90ZXN0Rm5YKHtcbi8vICB3aW5kb3dJZDogJzB4MDRhMDAwMDEnLFxuLy8gIHg6IDAsXG4vLyAgeTogMCxcbi8vICB3aWR0aDogNTAwLFxuLy8gIGhlaWdodDogNTAwLFxuLy8gIHN0YXRlczogW1xuLy8gICAgJ19ORVRfV01fU1RBVEVfTUFYSU1JWkVEX1ZFUlQnXG4vLyAgXVxuLy99KTtcblxuLy9jb25zdCB0ZXN0Rm4yID0gd3JhcFgxMShzZXRTdGF0ZSk7XG4vL3Rlc3RGbjIoJzB4MDRhMDAwMDEnLCAncmVtb3ZlJywgWydfTkVUX1dNX1NUQVRFX01BWElNSVpFRF9WRVJUJywgJ19ORVRfV01fU1RBVEVfTUFYSU1JWkVEX0hPUlonLCAnX05FVF9XTV9TVEFURV9GVUxMU0NSRUVOJ10pXG4vLyAgLnRoZW4oKHJlcykgPT4ge1xuLy8gICAgY29uc29sZS5sb2coJ05PUk1BTCcsIHJlcyk7XG4vLyAgfSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgSVNfREVCVUcgfSBmcm9tIFwiLi9pc0RlYnVnXCI7XG5pbXBvcnQgeyBDRkcgfSBmcm9tIFwiLi9jb25maWdcIjtcbmltcG9ydCB7IHNwYXduIH0gZnJvbSBcImNoaWxkX3Byb2Nlc3NcIjtcbmltcG9ydCB7IHBhcnNlQ21kQXJncyB9IGZyb20gXCIuL3BhcnNlQ21kVG9TcGF3blwiO1xuaW1wb3J0IHsgV2luT2JqLCBXaW5PYmpJZE9ubHkgfSBmcm9tIFwiLi9tb2RlbFwiO1xuaW1wb3J0IHsgbG9nIH0gZnJvbSBcIi4vbG9nXCI7XG5pbXBvcnQgeyBnZXRBY3RpdmVXaW5kb3dJZHMsIGdldERpc3BsYXlzLCBnZXRXaW5kb3dJbmZvIH0gZnJvbSBcIi4veDExV3JhcHBlclwiO1xuXG4vLyA1MDBrYlxuY29uc3QgTUFYX0JVRkZFUiA9IDEwMjQgKiA1MDA7XG5jb25zdCBFWEVDX09QVFMgPSB7XG4gIG1heEJ1ZmZlcjogTUFYX0JVRkZFUlxufTtcblxuLy8gZGlzcGxheVxuLy8gLS0tLS0tLVxuZXhwb3J0IGZ1bmN0aW9uIGdldENvbm5lY3RlZERpc3BsYXlzSWQoKTogc3RyaW5nIHtcbiAgY29uc3QgZGlzcGxheXMgPSBnZXREaXNwbGF5cygpO1xuICByZXR1cm4gZGlzcGxheXNcbiAgICAubWFwKHNjcmVlbiA9PiBzY3JlZW4ucGl4ZWxfd2lkdGggKyBcInhcIiArIHNjcmVlbi5waXhlbF9oZWlnaHQpXG4gICAgLmpvaW4oXCI7XCIpO1xufVxuXG4vLyBPdGhlclxuLy8gLS0tLS0tLS1cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRBZGRpdGlvbmFsTWV0YURhdGFGb3JXaW4oXG4gIHdpbjogV2luT2JqSWRPbmx5XG4pOiBQcm9taXNlPFdpbk9iaj4ge1xuICBjb25zdCBzdGRvdXQgPSBhd2FpdCBnZXRXaW5kb3dJbmZvKHdpbi53aW5kb3dJZCk7XG4gIGNvbnN0IGxpbmVzID0gc3Rkb3V0LnNwbGl0KFwiXFxuXCIpO1xuICBjb25zdCB3aW5Db3B5OiBhbnkgPSB7IC4uLndpbiB9O1xuXG4gIGxpbmVzLmZvckVhY2gobGluZSA9PiB7XG4gICAgY29uc3Qgd29yZHMgPSBsaW5lLnNwbGl0KFwiIFwiKTtcbiAgICBjb25zdCBwcm9wZXJ0eU5hbWUgPSB3b3Jkc1swXTtcblxuICAgIC8vIHJlbW92ZSBwcm9wZXJ0eSBuYW1lIGFuZCBcIj1cIlxuICAgIHdvcmRzLnNwbGljZSgwLCAyKTtcbiAgICBjb25zdCB2YWx1ZSA9IHdvcmRzLmpvaW4oXCIgXCIpO1xuICAgIGNvbnN0IHByb3BlcnR5TmFtZUZyb21NYXAgPSBDRkcuV01fTUVUQV9NQVBbcHJvcGVydHlOYW1lXTtcbiAgICAvLyBwYXJzZSB3bUNsYXNzTmFtZVxuICAgIGlmIChwcm9wZXJ0eU5hbWUgPT09IFwiV01fQ0xBU1MoU1RSSU5HKVwiKSB7XG4gICAgICBjb25zdCBwcm9wZXJ0eU5hbWVGcm9tTWFwID0gQ0ZHLldNX01FVEFfTUFQW3Byb3BlcnR5TmFtZV07XG4gICAgICBjb25zdCBjbGFzc05hbWVzID0gdmFsdWUuc3BsaXQoXCIsIFwiKTtcbiAgICAgIGxldCBjbGFzc05hbWUgPSBcIlwiO1xuICAgICAgY2xhc3NOYW1lcy5mb3JFYWNoKHN0YXRlID0+IHtcbiAgICAgICAgaWYgKHN0YXRlICE9PSBcIlwiKSB7XG4gICAgICAgICAgY2xhc3NOYW1lICs9IHN0YXRlLnJlcGxhY2UoL1wiL2csIFwiXCIpICsgXCIuXCI7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgd2luQ29weVtwcm9wZXJ0eU5hbWVGcm9tTWFwXSA9IGNsYXNzTmFtZS5zdWJzdHIoMCwgY2xhc3NOYW1lLmxlbmd0aCAtIDIpO1xuICAgIH1cbiAgICAvLyBwYXJzZSBzdGF0ZXNcbiAgICBlbHNlIGlmIChwcm9wZXJ0eU5hbWUgPT09IFwiX05FVF9XTV9TVEFURShBVE9NKVwiKSB7XG4gICAgICBjb25zdCBzdGF0ZXMgPSB2YWx1ZS5zcGxpdChcIiwgXCIpO1xuICAgICAgd2luQ29weS5zdGF0ZXMgPSBbXTtcbiAgICAgIHN0YXRlcy5mb3JFYWNoKHN0YXRlID0+IHtcbiAgICAgICAgaWYgKHN0YXRlICE9PSBcIlwiKSB7XG4gICAgICAgICAgd2luQ29weS5zdGF0ZXMucHVzaChzdGF0ZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICAvLyBwYXJzZSBzaW1wbGUgc3RyaW5ncyBhbmQgaW50ZWdlcnNcbiAgICBlbHNlIGlmIChwcm9wZXJ0eU5hbWVGcm9tTWFwKSB7XG4gICAgICAvLyBzcGVjaWFsIGhhbmRsZSBudW1iZXIgdHlwZXNcbiAgICAgIGlmIChDRkcuV01fTUVUQV9NQVBfTlVNQkVSX1RZUEVTLmluZGV4T2YocHJvcGVydHlOYW1lKSA+IC0xKSB7XG4gICAgICAgIHdpbkNvcHlbcHJvcGVydHlOYW1lRnJvbU1hcF0gPSBwYXJzZUludCh2YWx1ZSwgMTApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2luQ29weVtwcm9wZXJ0eU5hbWVGcm9tTWFwXSA9IHZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG4gIC8vIGNvbnNvbGUubG9nKHdpbkNvcHkpO1xuICByZXR1cm4gd2luQ29weTtcbn1cblxuLy8gVE9ETyBwcmV0dGlmeSBhcmdzIHN0cnVjdHVyZVxuZXhwb3J0IGZ1bmN0aW9uIHN0YXJ0UHJvZ3JhbShcbiAgZXhlY3V0YWJsZUZpbGU6IHN0cmluZyxcbiAgZGVza3RvcEZpbGVQYXRoOiBzdHJpbmdcbik6IFByb21pc2U8dm9pZD4ge1xuICBJU19ERUJVRyAmJlxuICAgIGNvbnNvbGUubG9nKFwiREVCVUc6IHN0YXJ0UHJvZ3JhbSgpOlwiLCBleGVjdXRhYmxlRmlsZSwgZGVza3RvcEZpbGVQYXRoKTtcblxuICBsZXQgY21kO1xuICBsZXQgYXJncyA9IFtdO1xuICBpZiAoZGVza3RvcEZpbGVQYXRoKSB7XG4gICAgY21kID0gYGF3a2A7XG4gICAgYXJncy5wdXNoKFxuICAgICAgJy9eRXhlYz0vIHtzdWIoXCJeRXhlYz1cIiwgXCJcIik7IGdzdWIoXCIgPyVbY0RkRmZpa21OblV1dl1cIiwgXCJcIik7IGV4aXQgc3lzdGVtKCQwKX0nXG4gICAgKTtcbiAgICBhcmdzLnB1c2goZGVza3RvcEZpbGVQYXRoKTtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBwYXJzZWRDbWQgPSBwYXJzZUNtZEFyZ3MoZXhlY3V0YWJsZUZpbGUpO1xuICAgIGNtZCA9IHBhcnNlZENtZFswXTtcbiAgICBhcmdzID0gcGFyc2VkQ21kWzFdO1xuICB9XG5cbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bGZpbGwgPT4ge1xuICAgIHNwYXduKGNtZCwgYXJncywge1xuICAgICAgc3RkaW86IFwiaWdub3JlXCIsXG4gICAgICBkZXRhY2hlZDogdHJ1ZVxuICAgIH0pLnVucmVmKCk7XG5cbiAgICAvLyBjdXJyZW50bHkgd2UgaGF2ZSBubyBlcnJvciBoYW5kbGluZyBhcyB0aGUgcHJvY2VzcyBpcyBzdGFydGVkIGRldGFjaGVkXG4gICAgZnVsZmlsbCgpO1xuICB9KTtcbn1cblxuLy8gR0VUIEFDVElWRSBXSU5ET1cgTElTVFxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEFjdGl2ZVdpbmRvd0xpc3QoKTogUHJvbWlzZTxXaW5PYmpbXT4ge1xuICBjb25zdCB3aW5kb3dJZHMgPSBhd2FpdCBnZXRBY3RpdmVXaW5kb3dJZHMoKTtcbiAgY29uc3Qgd2luZG93TGlzdDogV2luT2JqSWRPbmx5W10gPSBbXTtcbiAgd2luZG93SWRzLmZvckVhY2god2luZG93SWQgPT4ge1xuICAgIHdpbmRvd0xpc3QucHVzaCh7XG4gICAgICB3aW5kb3dJZDogd2luZG93SWQsXG4gICAgICB3aW5kb3dJZERlYzogcGFyc2VJbnQod2luZG93SWQsIDE2KVxuICAgIH0pO1xuICB9KTtcblxuICAvLyBhZGQgbWV0YSBkYXRhIHJpZ2h0IGF3YXlcbiAgY29uc3QgcHJvbWlzZXMgPSB3aW5kb3dMaXN0Lm1hcCh3aW4gPT4gZ2V0QWRkaXRpb25hbE1ldGFEYXRhRm9yV2luKHdpbikpO1xuXG4gIGNvbnN0IHdpbmRvd3NXaXRoRGF0YTogV2luT2JqW10gPSAoYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZXMpKSBhcyBXaW5PYmpbXTtcblxuICBJU19ERUJVRyAmJiBjb25zb2xlLmxvZyhcIkRFQlVHOiBnZXRBY3RpdmVXaW5kb3dMaXN0KCk6XCIsIHdpbmRvd0xpc3QpO1xuICByZXR1cm4gd2luZG93c1dpdGhEYXRhLmZpbHRlcihfZmlsdGVySW52YWxpZFdpbmRvd3MpO1xufVxuXG5mdW5jdGlvbiBfZmlsdGVySW52YWxpZFdpbmRvd3Mod2luOiBXaW5PYmopOiBib29sZWFuIHtcbiAgLy8gZmlsdGVyIG5vbmUgbm9ybWFsIHdpbmRvd3MsIGV4Y2x1ZGVkIGNsYXNzIG5hbWVzIGFuZCBpbmNvbXBsZXRlIHdpbmRvd3NcbiAgLy8gTk9URTogaWYgdGhlcmUgaXMgbm8gdHlwZSB3ZSBhc3N1bWUgaXQncyBub3JtYWwgdG9vXG4gIGNvbnN0IGlzTm9ybWFsV2luZG93ID1cbiAgICAoIXdpbi53bVR5cGUgfHwgd2luLndtVHlwZS5pbmNsdWRlcyhcIl9ORVRfV01fV0lORE9XX1RZUEVfTk9STUFMXCIpKSAmJlxuICAgICghd2luLndtUm9sZSB8fCB3aW4ud21Sb2xlICE9PSBcInBvcC11cFwiKTtcblxuICBjb25zdCBpc05vdEV4Y2x1ZGVkID0gIV9pc0V4Y2x1ZGVkV21DbGFzc05hbWUod2luLndtQ2xhc3NOYW1lKTtcbiAgY29uc3QgaGFzV21DbGFzc05hbWUgPSAhIXdpbi53bUNsYXNzTmFtZTtcblxuICAvLyB3YXJuIGlmIG5vIHdtQ2xhc3NOYW1lIGV2ZW4gdGhvdWdoIHRoZXJlIHNob3VsZCBiZVxuICBpZiAoaXNOb3JtYWxXaW5kb3cgJiYgaXNOb3RFeGNsdWRlZCAmJiAhaGFzV21DbGFzc05hbWUpIHtcbiAgICBjb25zb2xlLndhcm4od2luLndpbmRvd0lkICsgXCIgaGFzIG5vIHdtQ2xhc3NOYW1lLiBXaW46IFwiLCB3aW4pO1xuICB9XG5cbiAgcmV0dXJuIGlzTm9ybWFsV2luZG93ICYmIGlzTm90RXhjbHVkZWQgJiYgaGFzV21DbGFzc05hbWU7XG59XG5cbmZ1bmN0aW9uIF9pc0V4Y2x1ZGVkV21DbGFzc05hbWUod21DbGFzc05hbWUpOiBib29sZWFuIHtcbiAgcmV0dXJuIENGRy5XTV9DTEFTU19FWENMVVNJT05TLmluZGV4T2Yod21DbGFzc05hbWUpID4gLTE7XG59XG5cbmZ1bmN0aW9uIF9jYXRjaEdlbmVyaWNFcnIoZXJyKTogdm9pZCB7XG4gIGNvbnNvbGUuZXJyb3IoXCJvdGhlckNtZDogR2VuZXJpYyBFcnJvclwiLCBlcnIsIGVyci5zdGFjayk7XG4gIGxvZyhcIm90aGVyQ21kOlwiLCBhcmd1bWVudHMpO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5pbXBvcnQgeyBnZXRXaW5kb3dHZW9tZXRyeSwgZ29Ub1ZpZXdwb3J0IH0gZnJvbSBcIi4veDExV3JhcHBlclwiO1xuaW1wb3J0IHsgZ2V0QWN0aXZlV2luZG93TGlzdCB9IGZyb20gXCIuL290aGVyQ21kXCI7XG5pbXBvcnQgeyBDRkcgfSBmcm9tIFwiLi9jb25maWdcIjtcbmltcG9ydCB7IFdpbk9iaiB9IGZyb20gXCIuL21vZGVsXCI7XG5cbmNvbnN0IGZpbmR1cCA9IHJlcXVpcmUoXCJmaW5kdXAtc3luY1wiKTtcblxuY29uc3QgSE9NRV9ESVIgPSBwcm9jZXNzLmVudltcIkhPTUVcIl07XG5jb25zdCBERUZBVUxUX0RFU0tUT1BfRklMRV9MT0NBVElPTlMgPSBbXG4gIFwie2hvbWV9Ly5sb2NhbC9zaGFyZS9hcHBsaWNhdGlvbnNcIixcbiAgXCJ7aG9tZX0vLmdub21lL2FwcHMvXCIsXG4gIFwiL3Vzci9zaGFyZS9hcHBsaWNhdGlvbnNcIixcbiAgXCIvdXNyL2xvY2FsL3NoYXJlL2FwcGxpY2F0aW9uc1wiLFxuICBcIi91c3Ivc2hhcmUvYXBwLWluc3RhbGxcIlxuXTtcblxuZnVuY3Rpb24gX2NhdGNoR2VuZXJpY0VycihlcnIpIHtcbiAgY29uc29sZS5lcnJvcihcIkdlbmVyaWMgRXJyb3IgaW4gTWV0YSBXcmFwcGVyXCIsIGVyciwgZXJyLnN0YWNrKTtcbiAgdGhyb3cgZXJyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ29Ub0ZpcnN0V29ya3NwYWNlKCkge1xuICByZXR1cm4gZ29Ub1ZpZXdwb3J0KDAsIDApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmluZERlc2t0b3BGaWxlKGZpbGVOYW1lKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgoZnVsZmlsbCwgcmVqZWN0KSA9PiB7XG4gICAgY29uc3QgZGVza3RvcEZpbGVMb2NhdGlvbnMgPVxuICAgICAgQ0ZHLkRFU0tUT1BfRklMRV9MT0NBVElPTlMgfHwgREVGQVVMVF9ERVNLVE9QX0ZJTEVfTE9DQVRJT05TO1xuXG4gICAgY29uc3QgcGFyZW50RGlycyA9IGRlc2t0b3BGaWxlTG9jYXRpb25zLm1hcChwYXJlbnREaXIgPT4ge1xuICAgICAgcmV0dXJuIHBhcmVudERpci5yZXBsYWNlKFwie2hvbWV9XCIsIEhPTUVfRElSKTtcbiAgICB9KTtcblxuICAgIGxldCBmaXJzdEZpbGU7XG4gICAgY29uc3QgbWF0Y2ggPSBwYXJlbnREaXJzLmZpbmQoZGlyID0+IHtcbiAgICAgIGZpcnN0RmlsZSA9IGZpbmR1cChmaWxlTmFtZSwgeyBjd2Q6IGRpciB9KTtcblxuICAgICAgaWYgKCFmaXJzdEZpbGUpIHtcbiAgICAgICAgLy8gc25hcCBkZXNrdG9wIGZpbGVzIG5vdyBsb29rIGxpa2UgdGhpcyA9PiBmaXJlZm94X2ZpcmVmb3guZGVza3RvcFxuICAgICAgICBmaXJzdEZpbGUgPSBmaW5kdXAoYCR7ZmlsZU5hbWUucmVwbGFjZShcIi5kZXNrdG9wXCIsIFwiX1wiKX0ke2ZpbGVOYW1lfWAsIHtcbiAgICAgICAgICBjd2Q6IGRpclxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmaXJzdEZpbGU7XG4gICAgfSk7XG5cbiAgICBpZiAoIWZpcnN0RmlsZSB8fCAhbWF0Y2gpIHtcbiAgICAgIGNvbnN0IGVyciA9IGBFUlI6IGZpbmREZXNrdG9wRmlsZSgpIGNhbnQgZmluZCBmaWxlIFwiJHtmaWxlTmFtZX1cIiEgU2VhcmNoZWQgZGVza3RvcEZpbGVMb2NhdGlvbnM6YDtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyLCBkZXNrdG9wRmlsZUxvY2F0aW9ucyk7XG4gICAgICByZWplY3QoZXJyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZnVsZmlsbChmaXJzdEZpbGUpO1xuICAgIH1cbiAgfSkuY2F0Y2goX2NhdGNoR2VuZXJpY0Vycik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRBY3RpdmVXaW5kb3dMaXN0RmxvdygpOiBQcm9taXNlPFdpbk9ialtdIHwgYW55PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAoZnVsZmlsbCwgcmVqZWN0KSA9PiB7XG4gICAgcmV0dXJuIGdldEFjdGl2ZVdpbmRvd0xpc3QoKS50aGVuKGFzeW5jICh3aW5kb3dMaXN0OiBhbnlbXSkgPT4ge1xuICAgICAgY29uc3QgcHJvbWlzZXMgPSB3aW5kb3dMaXN0Lm1hcCh3aW4gPT4ge1xuICAgICAgICByZXR1cm4gZ2V0V2luZG93R2VvbWV0cnkod2luLndpbmRvd0lkKS50aGVuKChnZW86IGFueSkgPT4ge1xuICAgICAgICAgIGZvciAobGV0IHByb3AgaW4gZ2VvKSB7XG4gICAgICAgICAgICBpZiAoZ2VvLmhhc093blByb3BlcnR5KHByb3ApKSB7XG4gICAgICAgICAgICAgIHdpbltwcm9wXSA9IGdlb1twcm9wXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBUT0RPIG9yZ2FuaXplIGFkZGluZyBvZiBhbGwgdGhvc2UgZGlmZmVyZW50IHByb3BlcnRpZXMgYmV0dGVyXG4gICAgICAgICAgLy8gYWRkIG1pc3Npbmcgc3RhdGljIHByb3BlcnRpZXNcbiAgICAgICAgICB3aW4uc2ltcGxlTmFtZSA9IF9wYXJzZVNpbXBsZVdpbmRvd05hbWUod2luLndtQ2xhc3NOYW1lKTtcbiAgICAgICAgICByZXR1cm4gd2luO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyB3ZSdyZSB1c2luZyBhIHdhdGVyZmFsbCBiZWNhdXNlIHdlJ3JlIGRlYWxpbmcgd2l0aCB4MTEgcmVxdWVzdHNcbiAgICAgIGlmIChwcm9taXNlcy5sZW5ndGgpIHtcbiAgICAgICAgZm9yIChjb25zdCBwcm9taXNlIG9mIHByb21pc2VzKSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGF3YWl0IHByb21pc2U7XG4gICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfYWRkUGFyc2VkRXhlY3V0YWJsZUZpbGVzRnJvbVdtQ2xhc3NOYW1lcyh3aW5kb3dMaXN0KS50aGVuKFxuICAgICAgICAgIHdpbmRvd0xpc3RXaXRoV21DbGFzc05hbWVzID0+IHtcbiAgICAgICAgICAgIGZ1bGZpbGwod2luZG93TGlzdFdpdGhXbUNsYXNzTmFtZXMpO1xuICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZ1bGZpbGwoW10pO1xuICAgICAgfVxuICAgIH0pO1xuICB9KS5jYXRjaChfY2F0Y2hHZW5lcmljRXJyKTtcbn1cblxuLy8gTUlYRURcbmZ1bmN0aW9uIF9hZGRQYXJzZWRFeGVjdXRhYmxlRmlsZXNGcm9tV21DbGFzc05hbWVzKHdpbmRvd0xpc3QpOiBQcm9taXNlPGFueT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKGZ1bGZpbGwsIHJlamVjdCkgPT4ge1xuICAgIGNvbnN0IHByb21pc2VzID0gd2luZG93TGlzdFxuICAgICAgLmZpbHRlcih3aW4gPT4gIXdpbi5leGVjdXRhYmxlRmlsZSlcbiAgICAgIC5tYXAod2luID0+IHtcbiAgICAgICAgcmV0dXJuIF9wYXJzZUV4ZWN1dGFibGVGaWxlRnJvbVdtQ2xhc3NOYW1lKHdpbi53bUNsYXNzTmFtZSkudGhlbihcbiAgICAgICAgICBmaWxlTmFtZSA9PiB7XG4gICAgICAgICAgICB3aW4uZXhlY3V0YWJsZUZpbGUgPSBmaWxlTmFtZTtcbiAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICB9KTtcblxuICAgIGlmIChwcm9taXNlcy5sZW5ndGgpIHtcbiAgICAgIGZvciAoY29uc3QgcHJvbWlzZSBvZiBwcm9taXNlcykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGF3YWl0IHByb21pc2U7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICByZWplY3QoZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGZ1bGZpbGwod2luZG93TGlzdCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZ1bGZpbGwod2luZG93TGlzdCk7XG4gICAgfVxuICB9KS5jYXRjaChfY2F0Y2hHZW5lcmljRXJyKTtcbn1cblxuZnVuY3Rpb24gX3BhcnNlRXhlY3V0YWJsZUZpbGVGcm9tV21DbGFzc05hbWUod21DbGFzc05hbWUpOiBQcm9taXNlPGFueT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKGZ1bGZpbGwsIHJlamVjdCkgPT4ge1xuICAgIGNvbnN0IGV4ZWN1dGFibGVGaWxlRnJvbU1hcCA9XG4gICAgICBDRkcuV01fQ0xBU1NfQU5EX0VYRUNVVEFCTEVfRklMRV9NQVBbd21DbGFzc05hbWVdO1xuICAgIGlmIChleGVjdXRhYmxlRmlsZUZyb21NYXApIHtcbiAgICAgIGZ1bGZpbGwoZXhlY3V0YWJsZUZpbGVGcm9tTWFwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qgc3BsaXRWYWx1ZXMgPSB3bUNsYXNzTmFtZS5zcGxpdChcIi5cIik7XG4gICAgICBjb25zdCBmaWxlTmFtZSA9IHNwbGl0VmFsdWVzWzBdO1xuICAgICAgaWYgKF9pc0Nocm9tZUFwcChmaWxlTmFtZSkpIHtcbiAgICAgICAgX3BhcnNlQ2hyb21lQXBwRGVza3RvcEZpbGVOYW1lKGZpbGVOYW1lKVxuICAgICAgICAgIC50aGVuKGZ1bGZpbGwpXG4gICAgICAgICAgLmNhdGNoKHJlamVjdCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmdWxmaWxsKGZpbGVOYW1lICsgXCIuZGVza3RvcFwiKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pLmNhdGNoKF9jYXRjaEdlbmVyaWNFcnIpO1xufVxuXG5mdW5jdGlvbiBfcGFyc2VTaW1wbGVXaW5kb3dOYW1lKHdtQ2xhc3NOYW1lKSB7XG4gIGNvbnN0IHNwbGl0VmFsdWVzID0gd21DbGFzc05hbWUuc3BsaXQoXCIuXCIpO1xuICBpZiAoc3BsaXRWYWx1ZXNbMV0pIHtcbiAgICByZXR1cm4gc3BsaXRWYWx1ZXNbMV07XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHdtQ2xhc3NOYW1lO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9pc0Nocm9tZUFwcChmaWxlTmFtZSkge1xuICByZXR1cm4gISFmaWxlTmFtZS5tYXRjaCgvXmNyeF8vKTtcbn1cblxuZnVuY3Rpb24gX3BhcnNlQ2hyb21lQXBwRGVza3RvcEZpbGVOYW1lKGZpbGVOYW1lKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgLy8gd2Ugd2FuJ3QgdG8gc2VhcmNoIGZyb20gZGVza3RvcCBmaWxlcyBvbmx5XG4gICAgLy8gY2hyb21lIHdtIGNsYXNzIHVzZXMgcHJlZml4IGNyeF8gKG9uZSB1bmRlcnNjb3JlKVxuICAgIC8vIGVkZ2Ugd20gY2xhc3MgdXNlcyBwcmVmaXggY3J4X18gKHR3byB1bmRlcnNjb3JlcylcbiAgICBjb25zdCBsb2NhdGVTdHIgPSBmaWxlTmFtZS5yZXBsYWNlKC9jcnhfXz8vLCBcIipcIikgKyBcIiouZGVza3RvcFwiO1xuICAgIGZpbmREZXNrdG9wRmlsZShsb2NhdGVTdHIpXG4gICAgICAudGhlbihyZXNvbHZlKVxuICAgICAgLmNhdGNoKHJlamVjdCk7XG4gIH0pLmNhdGNoKF9jYXRjaEdlbmVyaWNFcnIpO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5pbXBvcnQgeyBDRkcsIFNFU1NJT05fREFUQV9ESVIgfSBmcm9tIFwiLi9jb25maWdcIjtcbmltcG9ydCAqIGFzIGZzIGZyb20gXCJmc1wiO1xuaW1wb3J0IHsgZ2V0Q29ubmVjdGVkRGlzcGxheXNJZCwgc3RhcnRQcm9ncmFtIH0gZnJvbSBcIi4vb3RoZXJDbWRcIjtcbmltcG9ydCB7XG4gIGNsb3NlV2luZG93LFxuICBnZXRYLFxuICBpbml0WDExLFxuICBtb3ZlVG9Xb3Jrc3BhY2UsXG4gIHJlc3RvcmVXaW5kb3dQb3NpdGlvblxufSBmcm9tIFwiLi94MTFXcmFwcGVyXCI7XG5pbXBvcnQge1xuICBmaW5kRGVza3RvcEZpbGUsXG4gIGdldEFjdGl2ZVdpbmRvd0xpc3RGbG93LFxuICBnb1RvRmlyc3RXb3Jrc3BhY2Vcbn0gZnJvbSBcIi4vbWV0YVdyYXBwZXJcIjtcbmltcG9ydCB7IGxvZyB9IGZyb20gXCIuL2xvZ1wiO1xuaW1wb3J0IHsgV2luT2JqIH0gZnJvbSBcIi4vbW9kZWxcIjtcbmltcG9ydCB7IGV4ZWMgfSBmcm9tIFwiY2hpbGRfcHJvY2Vzc1wiO1xuXG4vLyBpbXBvcnQgKiBhcyBTdG9yZSBmcm9tICdqZnMnO1xuY29uc3QgU3RvcmUgPSByZXF1aXJlKFwiamZzXCIpO1xuXG4vLyBjcmVhdGUgZGF0YSBzdG9yZVxuY29uc3QgZGIgPSBuZXcgU3RvcmUoU0VTU0lPTl9EQVRBX0RJUiwge1xuICBwcmV0dHk6IENGRy5TQVZFX1NFU1NJT05fSU5fUFJFVFRZX0ZPUk1BVFxufSk7XG5cbi8vIHNldHVwIG1ldGEgd3JhcHBlclxuXG4vLyBFWFBPUlRcbi8vIC0tLS0tLVxuZXhwb3J0IGRlZmF1bHQge1xuICBsaXN0U2Vzc2lvbnMsXG4gIHJlbmFtZVNlc3Npb24sXG4gIHNhdmVTZXNzaW9uLFxuICByZW1vdmVTZXNzaW9uLFxuICByZXN0b3JlU2Vzc2lvbixcbiAgZ2V0U2Vzc2lvbnMsXG4gIGdldFg6IGdldFgsXG5cbiAgZ2V0Q29ubmVjdGVkRGlzcGxheXNJZCxcbiAgcmVzZXRDZmc6ICgpID0+IHtcbiAgICBjb25zdCBjb25maWdGaWxlUGF0aCA9IENGRy5EQVRBX0RJUiArIFwiL2NvbmZpZy5qc29uXCI7XG4gICAgaWYgKGZzLmV4aXN0c1N5bmMoY29uZmlnRmlsZVBhdGgpKSB7XG4gICAgICBmcy51bmxpbmtTeW5jKGNvbmZpZ0ZpbGVQYXRoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5lcnJvcihcIk5vIENvbmZpZyBwcmVzZW50IGluIFwiICsgY29uZmlnRmlsZVBhdGgpO1xuICAgIH1cbiAgfSxcbiAgZ2V0Q2ZnOiAoKSA9PiB7XG4gICAgcmV0dXJuIENGRztcbiAgfSxcbiAgZ2V0RGI6ICgpID0+IHtcbiAgICByZXR1cm4gZGI7XG4gIH1cbn07XG5cbi8vIEhFTFBFUlxuLy8gLS0tLS0tLS1cbmZ1bmN0aW9uIF9jYXRjaEdlbmVyaWNFcnIoZXJyKSB7XG4gIGNvbnNvbGUuZXJyb3IoXCJHZW5lcmljIEVycm9yIGluIE1haW4gSGFuZGxlclwiLCBlcnIsIGVyci5zdGFjayk7XG4gIC8vIHRocm93IGVycjtcbn1cblxuZnVuY3Rpb24gZ2V0U2Vzc2lvbnMoKSB7XG4gIHJldHVybiBkYi5hbGxTeW5jKCk7XG59XG5cbi8vIE1BSU4gRlVOQ1RJT05TXG4vLyAtLS0tLS0tLS0tLS0tLVxuZnVuY3Rpb24gbGlzdFNlc3Npb25zKCkge1xuICBsZXQgbGlzdCA9IE9iamVjdC5rZXlzKGdldFNlc3Npb25zKCkpO1xuICBsaXN0LmZvckVhY2gobmFtZSA9PiB7XG4gICAgbG9nKG5hbWUpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gcmVuYW1lU2Vzc2lvbihvbGROYW1lOiBzdHJpbmcsIG5ld05hbWU6IHN0cmluZykge1xuICBsZXQgb2JqID0gZGIuZ2V0U3luYyhvbGROYW1lKTtcbiAgaWYgKG9iai5tZXNzYWdlKSB7XG4gICAgaWYgKG9iai5tZXNzYWdlID09PSBcImNvdWxkIG5vdCBsb2FkIGRhdGFcIikge1xuICAgICAgbG9nKGBFcnJvcjogQ291bGQgbm90IGZpbmQgYSBzZXNzaW9uIG5hbWVkICcke29sZE5hbWV9J2ApO1xuICAgIH0gZWxzZSB7XG4gICAgICBsb2cob2JqLm1lc3NhZ2UpO1xuICAgIH1cbiAgICByZXR1cm47XG4gIH1cbiAgZGIuc2F2ZVN5bmMobmV3TmFtZSwgb2JqKTtcbiAgZGIuZGVsZXRlKG9sZE5hbWUpO1xufVxuXG5mdW5jdGlvbiBzYXZlU2Vzc2lvbihzZXNzaW9uTmFtZTogc3RyaW5nLCBpbnB1dEhhbmRsZXJzKTogUHJvbWlzZTxhbnk+IHtcbiAgY29uc3Qgc2Vzc2lvblRvSGFuZGxlID0gc2Vzc2lvbk5hbWUgfHwgXCJERUZBVUxUXCI7XG5cbiAgcmV0dXJuIGluaXRYMTEoKVxuICAgIC50aGVuKCgpID0+IHtcbiAgICAgIHJldHVybiBnZXRBY3RpdmVXaW5kb3dMaXN0RmxvdygpO1xuICAgIH0pXG4gICAgLnRoZW4od2luZG93TGlzdCA9PiB7XG4gICAgICAvLyBkZXNrdG9wIGZpbGUgcGF0aHMgYW5kIGNvbm5lY3RlZCBkaXNwbGF5IGlkc1xuICAgICAgcmV0dXJuIF9ndWVzc0FuZFNldERlc2t0b3BGaWxlUGF0aHMoXG4gICAgICAgIHdpbmRvd0xpc3QsXG4gICAgICAgIGlucHV0SGFuZGxlcnMuZGVza3RvcEZpbGVQYXRoXG4gICAgICApO1xuICAgIH0pXG4gICAgLnRoZW4od2luZG93TGlzdCA9PiB7XG4gICAgICBjb25zdCBjb25uZWN0ZWREaXNwbGF5c0lkID0gZ2V0Q29ubmVjdGVkRGlzcGxheXNJZCgpO1xuICAgICAgY29uc29sZS5sb2coXCJEaXNwbGF5SUQ6IFwiICsgY29ubmVjdGVkRGlzcGxheXNJZCk7XG4gICAgICByZXR1cm4gc2F2ZVNlc3Npb25Gb3JEaXNwbGF5VG9EYihcbiAgICAgICAgc2Vzc2lvblRvSGFuZGxlLFxuICAgICAgICBjb25uZWN0ZWREaXNwbGF5c0lkLFxuICAgICAgICB3aW5kb3dMaXN0XG4gICAgICApO1xuICAgIH0pXG4gICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICBjb25zb2xlLmVycm9yKFwic2F2ZVNlc3Npb24oKTogQW4gZXJyb3Igb2NjdXJyZWRcIiwgZXJyKTtcbiAgICAgIHRocm93IGVycjtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gc2F2ZVNlc3Npb25Gb3JEaXNwbGF5VG9EYihcbiAgc2Vzc2lvblRvSGFuZGxlOiBzdHJpbmcsXG4gIGNvbm5lY3RlZERpc3BsYXlzSWQ6IHN0cmluZyxcbiAgd2luZG93TGlzdDogV2luT2JqW11cbik6IFByb21pc2U8dm9pZD4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKGZ1bGZpbGwsIHJlamVjdCkgPT4ge1xuICAgIC8vIGNoZWNrIGlmIGVudHJ5IGV4aXN0cyBhbmQgdXBkYXRlXG4gICAgZGIuZ2V0KHNlc3Npb25Ub0hhbmRsZSwgKGVyciwgc2Vzc2lvbkRhdGEpID0+IHtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgLy8gTk9URTogd2UncmUgbm90IGZhaWxpbmcgYmVjYXVzZSwgdGhlIGNhc2UgaXMgcHJvYmFibHkgdGhhdCB0aGVyZSBpcyBubyBzZXNzaW9uIGZpbGUgeWV0XG4gICAgICAgIGxvZyhcbiAgICAgICAgICBgc2F2ZVNlc3Npb25Gb3JEaXNwbGF5VG9EYjogbm8gc2Vzc2lvbiBmaWxlIHByZXNlbnQgeWV0IGZvciBcIiR7c2Vzc2lvblRvSGFuZGxlfVwiLCBjcmVhdGluZyBhIG5ldyBvbmUuLi5gXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIGlmICghc2Vzc2lvbkRhdGEpIHtcbiAgICAgICAgLy8gY3JlYXRlIG5ldyBvYmplY3RcbiAgICAgICAgc2Vzc2lvbkRhdGEgPSB7XG4gICAgICAgICAgbmFtZTogc2Vzc2lvblRvSGFuZGxlXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICBpZiAoXG4gICAgICAgICFzZXNzaW9uRGF0YS5kaXNwbGF5c0NvbWJpbmF0aW9ucyB8fFxuICAgICAgICAhQXJyYXkuaXNBcnJheShzZXNzaW9uRGF0YS5kaXNwbGF5c0NvbWJpbmF0aW9ucylcbiAgICAgICkge1xuICAgICAgICAvLyBjcmVhdGUgbmV3IGFycmF5XG4gICAgICAgIHNlc3Npb25EYXRhLmRpc3BsYXlzQ29tYmluYXRpb25zID0gW107XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGV4aXN0aW5nRGlzcGxheUVudHJ5ID0gc2Vzc2lvbkRhdGEuZGlzcGxheXNDb21iaW5hdGlvbnMuZmluZChcbiAgICAgICAgZW50cnkgPT4gZW50cnkuaWQgPT09IGNvbm5lY3RlZERpc3BsYXlzSWRcbiAgICAgICk7XG4gICAgICBpZiAoZXhpc3RpbmdEaXNwbGF5RW50cnkpIHtcbiAgICAgICAgZXhpc3RpbmdEaXNwbGF5RW50cnkud2luZG93TGlzdCA9IHdpbmRvd0xpc3Q7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZXNzaW9uRGF0YS5kaXNwbGF5c0NvbWJpbmF0aW9ucy5wdXNoKHtcbiAgICAgICAgICBpZDogY29ubmVjdGVkRGlzcGxheXNJZCxcbiAgICAgICAgICB3aW5kb3dMaXN0XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBkYi5zYXZlKHNlc3Npb25Ub0hhbmRsZSwgc2Vzc2lvbkRhdGEsIGVyciA9PiB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsb2coXCJTQVZFRCBTRVNTSU9OOiBcIiArIHNlc3Npb25Ub0hhbmRsZSk7XG4gICAgICAgICAgZnVsZmlsbCgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHJlc3RvcmVTZXNzaW9uKFxuICBzZXNzaW9uTmFtZTogc3RyaW5nLFxuICBpc0Nsb3NlQWxsT3BlbldpbmRvd3M6IGJvb2xlYW5cbik6IFByb21pc2U8YW55PiB7XG4gIGNvbnN0IHNlc3Npb25Ub0hhbmRsZSA9IHNlc3Npb25OYW1lIHx8IFwiREVGQVVMVFwiO1xuXG4gIHJldHVybiBuZXcgUHJvbWlzZSgoZnVsZmlsbCwgcmVqZWN0KSA9PiB7XG4gICAgZGIuZ2V0KHNlc3Npb25Ub0hhbmRsZSB8fCBcIkRFRkFVTFRcIiwgKGVyciwgc2Vzc2lvbkRhdGEpID0+IHtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgbGV0IHNhdmVkV2luZG93TGlzdDtcblxuICAgICAgaW5pdFgxMSgpXG4gICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICByZXR1cm4gX2Nsb3NlQWxsV2luZG93c0lmU2V0KGlzQ2xvc2VBbGxPcGVuV2luZG93cyk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKGdvVG9GaXJzdFdvcmtzcGFjZSlcbiAgICAgICAgLnRoZW4oZ2V0Q29ubmVjdGVkRGlzcGxheXNJZClcbiAgICAgICAgLnRoZW4oY29ubmVjdGVkRGlzcGxheXNJZCA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJEaXNwbGF5SUQ6IFwiICsgY29ubmVjdGVkRGlzcGxheXNJZCk7XG4gICAgICAgICAgaWYgKCFzZXNzaW9uRGF0YS5kaXNwbGF5c0NvbWJpbmF0aW9ucykge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgbm8gZGlzcGxheSBjb21iaW5hdGlvbnMgc2F2ZWQgeWV0YCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgZGlzcGxheUVudHJ5ID0gc2Vzc2lvbkRhdGEuZGlzcGxheXNDb21iaW5hdGlvbnMuZmluZChcbiAgICAgICAgICAgIGVudHJ5ID0+IGVudHJ5LmlkID09PSBjb25uZWN0ZWREaXNwbGF5c0lkXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIGlmIChkaXNwbGF5RW50cnkpIHtcbiAgICAgICAgICAgIHNhdmVkV2luZG93TGlzdCA9IGRpc3BsYXlFbnRyeS53aW5kb3dMaXN0O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAgICAgICBgbm8gZGF0YSBmb3IgY3VycmVudCBkaXNwbGF5IGlkICcke2Nvbm5lY3RlZERpc3BsYXlzSWR9JyBzYXZlZCB5ZXRgXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZ2V0QWN0aXZlV2luZG93TGlzdEZsb3coKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oY3VycmVudFdpbmRvd0xpc3QgPT4ge1xuICAgICAgICAgIHJldHVybiBfc3RhcnRTZXNzaW9uUHJvZ3JhbXMoc2F2ZWRXaW5kb3dMaXN0LCBjdXJyZW50V2luZG93TGlzdCk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAvLyBnZXRzIGN1cnJlbnQgd2luZG93IGxpc3QgYnkgaXRzZWxmIGFuZCByZXR1cm5zIHRoZSB1cGRhdGVkIHZhcmlhbnRcbiAgICAgICAgICByZXR1cm4gX3dhaXRGb3JBbGxBcHBzVG9TdGFydChzYXZlZFdpbmRvd0xpc3QpO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbihcbiAgICAgICAgICAodXBkYXRlZEN1cnJlbnRXaW5kb3dMaXN0OiBXaW5PYmpbXSkgPT5cbiAgICAgICAgICAgIG5ldyBQcm9taXNlKHJlc29sdmUgPT5cbiAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh1cGRhdGVkQ3VycmVudFdpbmRvd0xpc3QpO1xuICAgICAgICAgICAgICB9LCAyNTApXG4gICAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgICAgLnRoZW4oKHVwZGF0ZWRDdXJyZW50V2luZG93TGlzdDogV2luT2JqW10pID0+IHtcbiAgICAgICAgICBfdXBkYXRlV2luZG93SWRzKHNhdmVkV2luZG93TGlzdCwgdXBkYXRlZEN1cnJlbnRXaW5kb3dMaXN0KTtcbiAgICAgICAgICByZXR1cm4gX3Jlc3RvcmVXaW5kb3dQb3NpdGlvbnMoc2F2ZWRXaW5kb3dMaXN0KTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIGxvZyhcIlJFU1RPUkVEIFNFU1NJT046IFwiICsgc2Vzc2lvblRvSGFuZGxlKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihcIkFuIGVycm9yIG9jY3VycmVkXCIsIGVycik7XG4gICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKGZ1bGZpbGwpO1xuICAgIH0pO1xuICB9KS5jYXRjaChfY2F0Y2hHZW5lcmljRXJyKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU2Vzc2lvbihzZXNzaW9uTmFtZTogc3RyaW5nKTogUHJvbWlzZTx1bmtub3duPiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgoZnVsZmlsbCwgcmVqZWN0KSA9PiB7XG4gICAgZnMudW5saW5rKENGRy5TRVNTSU9OX0RBVEFfRElSICsgXCIvXCIgKyBzZXNzaW9uTmFtZSArIFwiLmpzb25cIiwgZXJyb3IgPT4ge1xuICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZnVsZmlsbCgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KS5jYXRjaChfY2F0Y2hHZW5lcmljRXJyKTtcbn1cblxuZnVuY3Rpb24gX2Nsb3NlQWxsV2luZG93c0lmU2V0KGlzQ2xvc2VBbGw6IGJvb2xlYW4pOiBQcm9taXNlPHVua25vd24+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChmdWxmaWxsLCByZWplY3QpID0+IHtcbiAgICBpZiAoaXNDbG9zZUFsbCkge1xuICAgICAgbG9nKFwiQ2xvc2luZyBvcGVuZWQgYXBwbGljYXRpb25zXCIpO1xuICAgICAgZ2V0QWN0aXZlV2luZG93TGlzdEZsb3coKVxuICAgICAgICAudGhlbigoY3VycmVudFdpbmRvd0xpc3Q6IGFueVtdKSA9PiB7XG4gICAgICAgICAgY3VycmVudFdpbmRvd0xpc3QuZm9yRWFjaCh3aW4gPT4ge1xuICAgICAgICAgICAgY2xvc2VXaW5kb3cod2luLndpbmRvd0lkKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIF93YWl0Rm9yQWxsQXBwc1RvQ2xvc2UoKVxuICAgICAgICAgICAgLnRoZW4oZnVsZmlsbClcbiAgICAgICAgICAgIC5jYXRjaChyZWplY3QpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2gocmVqZWN0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZnVsZmlsbCgpO1xuICAgIH1cbiAgfSkuY2F0Y2goX2NhdGNoR2VuZXJpY0Vycik7XG59XG5cbmZ1bmN0aW9uIF93YWl0Rm9yQWxsQXBwc1RvQ2xvc2UoKTogUHJvbWlzZTx1bmtub3duPiB7XG4gIGxldCB0b3RhbFRpbWVXYWl0ZWQgPSAwO1xuICByZXR1cm4gbmV3IFByb21pc2UoKGZ1bGZpbGwsIHJlamVjdCkgPT4ge1xuICAgIGZ1bmN0aW9uIHBvbGxBbGxBcHBzQ2xvc2VkKCkge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGdldEFjdGl2ZVdpbmRvd0xpc3RGbG93KClcbiAgICAgICAgICAudGhlbigoY3VycmVudFdpbmRvd0xpc3Q6IFdpbk9ialtdKSA9PiB7XG4gICAgICAgICAgICB0b3RhbFRpbWVXYWl0ZWQgKz0gQ0ZHLlBPTExfQUxMX0FQUFNfU1RBUlRFRF9JTlRFUlZBTDtcbiAgICAgICAgICAgIGlmIChjdXJyZW50V2luZG93TGlzdC5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICAgICAgaWYgKHRvdGFsVGltZVdhaXRlZCA+IENGRy5QT0xMX0FMTF9NQVhfVElNRU9VVCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJQT0xMX0FMTF9NQVhfVElNRU9VVCByZWFjaGVkXCIpO1xuICAgICAgICAgICAgICAgIHJlamVjdChcIlBPTExfQUxMX01BWF9USU1FT1VUIHJlYWNoZWRcIik7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gY2FsbCByZWN1cnNpdmVseVxuICAgICAgICAgICAgICAgIHBvbGxBbGxBcHBzQ2xvc2VkKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGZ1bGZpbGwoY3VycmVudFdpbmRvd0xpc3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKHJlamVjdCk7XG4gICAgICB9LCBDRkcuUE9MTF9BTExfQVBQU19TVEFSVEVEX0lOVEVSVkFMKTtcbiAgICB9XG5cbiAgICAvLyBzdGFydCBvbmNlIGluaXRpYWxseVxuICAgIHBvbGxBbGxBcHBzQ2xvc2VkKCk7XG4gIH0pLmNhdGNoKF9jYXRjaEdlbmVyaWNFcnIpO1xufVxuXG5mdW5jdGlvbiBfd2FpdEZvckFsbEFwcHNUb1N0YXJ0KHNhdmVkV2luZG93TGlzdCk6IFByb21pc2U8V2luT2JqW10gfCB1bmtub3duPiB7XG4gIGxvZyhcIldhaXRpbmcgZm9yIGFsbCBhcHBsaWNhdGlvbnMgdG8gc3RhcnQuLi5cIik7XG5cbiAgbGV0IHRvdGFsVGltZVdhaXRlZCA9IDA7XG4gIGxldCB0aW1lb3V0O1xuXG4gIHJldHVybiBuZXcgUHJvbWlzZSgoZnVsZmlsbCwgcmVqZWN0KSA9PiB7XG4gICAgZnVuY3Rpb24gcG9sbEFsbEFwcHNTdGFydGVkKFxuICAgICAgc2F2ZWRXaW5kb3dMaXN0OiBXaW5PYmpbXSxcbiAgICAgIHRpbWVvdXREdXJhdGlvbiA9IENGRy5QT0xMX0FMTF9BUFBTX1NUQVJURURfSU5URVJWQUxcbiAgICApIHtcbiAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgLy8gY2xlYXIgdGltZW91dCB0byBiZSBzYXZlXG4gICAgICAgIGlmICh0aW1lb3V0KSB7XG4gICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0QWN0aXZlV2luZG93TGlzdEZsb3coKVxuICAgICAgICAgIC50aGVuKGN1cnJlbnRXaW5kb3dMaXN0ID0+IHtcbiAgICAgICAgICAgIHRvdGFsVGltZVdhaXRlZCArPSBDRkcuUE9MTF9BTExfQVBQU19TVEFSVEVEX0lOVEVSVkFMO1xuICAgICAgICAgICAgaWYgKCFfaXNBbGxBcHBzU3RhcnRlZChzYXZlZFdpbmRvd0xpc3QsIGN1cnJlbnRXaW5kb3dMaXN0KSkge1xuICAgICAgICAgICAgICBpZiAodG90YWxUaW1lV2FpdGVkID4gQ0ZHLlBPTExfQUxMX01BWF9USU1FT1VUKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlBPTExfQUxMX01BWF9USU1FT1VUIHJlYWNoZWRcIik7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICAgICAgICAgIFwiVW5hYmxlIHRvIHN0YXJ0IHRoZSBmb2xsb3dpbmcgYXBwc1wiLFxuICAgICAgICAgICAgICAgICAgX2dldE5vdFN0YXJ0ZWRBcHBzKHNhdmVkV2luZG93TGlzdCwgY3VycmVudFdpbmRvd0xpc3QpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICByZWplY3QoXCJQT0xMX0FMTF9NQVhfVElNRU9VVCByZWFjaGVkXCIpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIGNhbGwgcmVjdXJzaXZlbHlcbiAgICAgICAgICAgICAgICBwb2xsQWxsQXBwc1N0YXJ0ZWQoc2F2ZWRXaW5kb3dMaXN0KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgbG9nKFwiQWxsIGFwcGxpY2F0aW9ucyBzdGFydGVkXCIpO1xuICAgICAgICAgICAgICBmdWxmaWxsKGN1cnJlbnRXaW5kb3dMaXN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaChyZWplY3QpO1xuICAgICAgfSwgdGltZW91dER1cmF0aW9uKTtcbiAgICB9XG5cbiAgICAvLyBzdGFydCBvbmNlIGluaXRpYWxseVxuICAgIHBvbGxBbGxBcHBzU3RhcnRlZChzYXZlZFdpbmRvd0xpc3QsIDUwMCk7XG4gIH0pLmNhdGNoKF9jYXRjaEdlbmVyaWNFcnIpO1xufVxuXG5mdW5jdGlvbiBfZ2V0Tm90U3RhcnRlZEFwcHMoXG4gIHNhdmVkV2luZG93TGlzdDogV2luT2JqW10sXG4gIGN1cnJlbnRXaW5kb3dMaXN0OiBXaW5PYmpbXVxuKTogV2luT2JqW10ge1xuICBsZXQgbm9uU3RhcnRlZEFwcHMgPSBbXTtcbiAgc2F2ZWRXaW5kb3dMaXN0LmZvckVhY2god2luID0+IHtcbiAgICBpZiAoIV9nZXRNYXRjaGluZ1dpbmRvd0lkKHdpbiwgY3VycmVudFdpbmRvd0xpc3QpKSB7XG4gICAgICBub25TdGFydGVkQXBwcy5wdXNoKHdpbik7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIG5vblN0YXJ0ZWRBcHBzO1xufVxuXG5mdW5jdGlvbiBfaXNBbGxBcHBzU3RhcnRlZChcbiAgc2F2ZWRXaW5kb3dMaXN0OiBXaW5PYmpbXSxcbiAgY3VycmVudFdpbmRvd0xpc3Q6IFdpbk9ialtdXG4pOiBib29sZWFuIHtcbiAgbGV0IGlzQWxsU3RhcnRlZCA9IHRydWU7XG4gIGNvbnN0IGN1cnJlbnRXaW5kb3dMaXN0Q29weSA9IGN1cnJlbnRXaW5kb3dMaXN0LnNsaWNlKDApLmZpbHRlcihcbiAgICAvLyBzb21lIGFwcHMgaGF2ZSBhIHNwbGFzaCBzY3JlZW4gKGludGVsbGlqIGlkZWEpLCB3ZSB3YW50IHRvIHdhaXQgZm9yIHRob3NlXG4gICAgd2luRnJvbUN1cnJlbnQgPT5cbiAgICAgICF3aW5Gcm9tQ3VycmVudC5zdGF0ZXM/LmluY2x1ZGVzKFwiX05FVF9XTV9TVEFURV9TS0lQX1RBU0tCQVJcIilcbiAgKTtcblxuICBzYXZlZFdpbmRvd0xpc3QuZm9yRWFjaCh3aW4gPT4ge1xuICAgIGlmICghX2dldE1hdGNoaW5nV2luZG93SWQod2luLCBjdXJyZW50V2luZG93TGlzdENvcHkpKSB7XG4gICAgICBpc0FsbFN0YXJ0ZWQgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgaW5kZXggPSBjdXJyZW50V2luZG93TGlzdENvcHkuZmluZEluZGV4KFxuICAgICAgICB3aW5Gcm9tQ3VycmVudCA9PiB3aW4ud21DbGFzc05hbWUgPT09IHdpbkZyb21DdXJyZW50LndtQ2xhc3NOYW1lXG4gICAgICApO1xuICAgICAgY3VycmVudFdpbmRvd0xpc3RDb3B5LnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGlzQWxsU3RhcnRlZDtcbn1cblxuYXN5bmMgZnVuY3Rpb24gX2d1ZXNzQW5kU2V0RGVza3RvcEZpbGVQYXRocyhcbiAgd2luZG93TGlzdDogV2luT2JqW10sXG4gIGlucHV0SGFuZGxlclxuKTogUHJvbWlzZTxXaW5PYmpbXT4ge1xuICBjb25zdCBwcm9taXNlcyA9IHdpbmRvd0xpc3QubWFwKHdpbiA9PiBfZ3Vlc3NGaWxlUGF0aCh3aW4sIGlucHV0SGFuZGxlcikpO1xuXG4gIGZvciAoY29uc3QgcHJvbWlzZSBvZiBwcm9taXNlcykge1xuICAgIHRyeSB7XG4gICAgICBhd2FpdCBwcm9taXNlO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIF9jYXRjaEdlbmVyaWNFcnIoZSk7XG4gICAgfVxuICB9XG4gIHJldHVybiB3aW5kb3dMaXN0O1xufVxuXG5mdW5jdGlvbiBfZ3Vlc3NGaWxlUGF0aCh3aW46IFdpbk9iaiwgaW5wdXRIYW5kbGVyKTogUHJvbWlzZTxzdHJpbmcgfCB1bmtub3duPiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgoZnVsZmlsbCwgcmVqZWN0KSA9PiB7XG4gICAgZnVuY3Rpb24gY2FsbElucHV0SGFuZGxlcihlcnJvcj8sIHN0ZG91dD8pIHtcbiAgICAgIGlmIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICBgXFxuIFRyeWluZyBhbHRlcm5hdGl2ZSBndWVzc2luZyBhcHByb2FjaCBmb3IgXCIke3dpbi5zaW1wbGVOYW1lfVwiLi4uLi5gXG4gICAgICAgICk7XG4gICAgICAgIGV4ZWMoYGNhdCAvcHJvYy8ke3dpbi53bVBpZH0vY21kbGluZWAsIChlcnJvcjEsIHN0ZG91dDEpID0+IHtcbiAgICAgICAgICBpZiAoZXJyb3IxIHx8ICFzdGRvdXQxLmxlbmd0aCkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkVSUiBfZ3Vlc3NGaWxlUGF0aCgpXCIsIGVycm9yMSk7XG4gICAgICAgICAgICByZWplY3QoZXJyb3IxKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgZW50ID0gc3Rkb3V0MS5zcGxpdChcIlxcdTAwMDBcIik7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgICAgYFxcbiBBbHRlcm5hdGl2ZSBndWVzc2luZyBhcHByb2FjaCBmb3IgXCIke3dpbi5zaW1wbGVOYW1lfVwiIFNVQ0NFU1MgLT4gJHtlbnRbMF19YFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHdpbi5leGVjdXRhYmxlRmlsZSA9IGVudFswXTtcbiAgICAgICAgICAgIGZ1bGZpbGwod2luLmV4ZWN1dGFibGVGaWxlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaW5wdXRIYW5kbGVyKGVycm9yLCB3aW4sIHN0ZG91dClcbiAgICAgICAgICAudGhlbihpbnB1dCA9PiB7XG4gICAgICAgICAgICBpZiAoX2lzRGVza3RvcEZpbGUod2luLmV4ZWN1dGFibGVGaWxlKSkge1xuICAgICAgICAgICAgICB3aW4uZGVza3RvcEZpbGVQYXRoID0gaW5wdXQ7XG4gICAgICAgICAgICAgIGZ1bGZpbGwod2luLmRlc2t0b3BGaWxlUGF0aCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB3aW4uZXhlY3V0YWJsZUZpbGUgPSBpbnB1dDtcbiAgICAgICAgICAgICAgZnVsZmlsbCh3aW4uZXhlY3V0YWJsZUZpbGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKHJlamVjdCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKF9pc0Rlc2t0b3BGaWxlKHdpbi5leGVjdXRhYmxlRmlsZSkpIHtcbiAgICAgIGZpbmREZXNrdG9wRmlsZSh3aW4uZXhlY3V0YWJsZUZpbGUpXG4gICAgICAgIC50aGVuKHN0ZG91dCA9PiB7XG4gICAgICAgICAgY2FsbElucHV0SGFuZGxlcihudWxsLCBzdGRvdXQpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goY2FsbElucHV0SGFuZGxlcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNhbGxJbnB1dEhhbmRsZXIodHJ1ZSwgd2luLmV4ZWN1dGFibGVGaWxlKTtcbiAgICB9XG4gIH0pLmNhdGNoKF9jYXRjaEdlbmVyaWNFcnIpO1xufVxuXG4vLyBUT0RPIGNoZWNrIGZvciBob3cgbWFueSBpbnN0YW5jZXMgdGhlcmUgc2hvdWxkIGJlIHJ1bm5pbmcgb2YgYSBwcm9ncmFtXG5hc3luYyBmdW5jdGlvbiBfc3RhcnRTZXNzaW9uUHJvZ3JhbXMoXG4gIHdpbmRvd0xpc3Q6IFdpbk9ialtdLFxuICBjdXJyZW50V2luZG93TGlzdDogV2luT2JqW11cbik6IFByb21pc2U8dm9pZD4ge1xuICAvLyBzZXQgaW5zdGFuY2VzIHN0YXJ0ZWQgdG8gMFxuICB3aW5kb3dMaXN0LmZvckVhY2god2luID0+ICh3aW4uaW5zdGFuY2VzU3RhcnRlZCA9IDApKTtcbiAgY29uc3QgcHJvbWlzZXMgPSB3aW5kb3dMaXN0XG4gICAgLmZpbHRlcih3aW4gPT4ge1xuICAgICAgY29uc3QgbnVtYmVyT2ZJbnN0YW5jZXNPZldpbiA9IF9nZXROdW1iZXJPZkluc3RhbmNlc1RvUnVuKFxuICAgICAgICB3aW4sXG4gICAgICAgIHdpbmRvd0xpc3RcbiAgICAgICk7XG4gICAgICByZXR1cm4gIV9pc1Byb2dyYW1BbHJlYWR5UnVubmluZyhcbiAgICAgICAgd2luLndtQ2xhc3NOYW1lLFxuICAgICAgICBjdXJyZW50V2luZG93TGlzdCxcbiAgICAgICAgbnVtYmVyT2ZJbnN0YW5jZXNPZldpbixcbiAgICAgICAgd2luLmluc3RhbmNlc1N0YXJ0ZWRcbiAgICAgICk7XG4gICAgfSlcbiAgICAubWFwKHdpbiA9PiB7XG4gICAgICB3aW4uaW5zdGFuY2VzU3RhcnRlZCArPSAxO1xuICAgICAgcmV0dXJuIHN0YXJ0UHJvZ3JhbSh3aW4uZXhlY3V0YWJsZUZpbGUsIHdpbi5kZXNrdG9wRmlsZVBhdGgpO1xuICAgIH0pO1xuXG4gIGF3YWl0IFByb21pc2UuYWxsKHByb21pc2VzKTtcbn1cblxuZnVuY3Rpb24gX2dldE51bWJlck9mSW5zdGFuY2VzVG9SdW4oXG4gIHdpbmRvd1RvTWF0Y2g6IFdpbk9iaixcbiAgd2luZG93TGlzdDogV2luT2JqW11cbik6IG51bWJlciB7XG4gIHJldHVybiB3aW5kb3dMaXN0LmZpbHRlcih3aW4gPT4ge1xuICAgIHJldHVybiB3aW4ud21DbGFzc05hbWUgPT09IHdpbmRvd1RvTWF0Y2gud21DbGFzc05hbWU7XG4gIH0pLmxlbmd0aDtcbn1cblxuZnVuY3Rpb24gX2lzUHJvZ3JhbUFscmVhZHlSdW5uaW5nKFxuICB3bUNsYXNzTmFtZTogc3RyaW5nLFxuICBjdXJyZW50V2luZG93TGlzdDogV2luT2JqW10sXG4gIG51bWJlck9mSW5zdGFuY2VzVG9SdW46IG51bWJlcixcbiAgaW5zdGFuY2VzU3RhcnRlZDogbnVtYmVyXG4pOiBib29sZWFuIHtcbiAgaWYgKCFudW1iZXJPZkluc3RhbmNlc1RvUnVuKSB7XG4gICAgbnVtYmVyT2ZJbnN0YW5jZXNUb1J1biA9IDE7XG4gIH1cblxuICBpZiAoIWluc3RhbmNlc1N0YXJ0ZWQpIHtcbiAgICBpbnN0YW5jZXNTdGFydGVkID0gMDtcbiAgfVxuXG4gIGxldCBpbnN0YW5jZXNSdW5uaW5nID0gMDtcbiAgY3VycmVudFdpbmRvd0xpc3QuZm9yRWFjaCh3aW4gPT4ge1xuICAgIGlmICh3aW4ud21DbGFzc05hbWUgPT09IHdtQ2xhc3NOYW1lKSB7XG4gICAgICBpbnN0YW5jZXNSdW5uaW5nKys7XG4gICAgfVxuICB9KTtcbiAgbG9nKFxuICAgICdTdGF0dXM6IFwiJyArIHdtQ2xhc3NOYW1lICsgJ1wiIGlzIHJ1bm5pbmc6JyxcbiAgICBpbnN0YW5jZXNSdW5uaW5nICsgaW5zdGFuY2VzU3RhcnRlZCA+PSBudW1iZXJPZkluc3RhbmNlc1RvUnVuLFxuICAgIG51bWJlck9mSW5zdGFuY2VzVG9SdW4sXG4gICAgaW5zdGFuY2VzU3RhcnRlZFxuICApO1xuICByZXR1cm4gaW5zdGFuY2VzUnVubmluZyArIGluc3RhbmNlc1N0YXJ0ZWQgPj0gbnVtYmVyT2ZJbnN0YW5jZXNUb1J1bjtcbn1cblxuZnVuY3Rpb24gX2lzRGVza3RvcEZpbGUoZXhlY3V0YWJsZUZpbGU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICByZXR1cm4gZXhlY3V0YWJsZUZpbGUgJiYgISFleGVjdXRhYmxlRmlsZS5tYXRjaCgvZGVza3RvcCQvKTtcbn1cblxuZnVuY3Rpb24gX3VwZGF0ZVdpbmRvd0lkcyhcbiAgc2F2ZWRXaW5kb3dMaXN0OiBXaW5PYmpbXSxcbiAgY3VycmVudFdpbmRvd0xpc3Q6IFdpbk9ialtdXG4pIHtcbiAgY29uc3Qgd21DbGFzc05hbWVNYXAgPSB7fTtcbiAgc2F2ZWRXaW5kb3dMaXN0LmZvckVhY2god2luID0+IHtcbiAgICBpZiAoIXdtQ2xhc3NOYW1lTWFwW3dpbi53bUNsYXNzTmFtZV0pIHtcbiAgICAgIHdtQ2xhc3NOYW1lTWFwW3dpbi53bUNsYXNzTmFtZV0gPSBfZ2V0TWF0Y2hpbmdXaW5kb3dzKFxuICAgICAgICB3aW4sXG4gICAgICAgIGN1cnJlbnRXaW5kb3dMaXN0XG4gICAgICApO1xuICAgIH1cblxuICAgIHdpbi53aW5kb3dJZCA9IHdtQ2xhc3NOYW1lTWFwW3dpbi53bUNsYXNzTmFtZV1bMF0ud2luZG93SWQ7XG4gICAgd2luLndpbmRvd0lkRGVjID0gcGFyc2VJbnQod2luLndpbmRvd0lkLCAxNik7XG5cbiAgICAvLyByZW1vdmUgZmlyc3QgZW50cnlcbiAgICB3bUNsYXNzTmFtZU1hcFt3aW4ud21DbGFzc05hbWVdLnNoaWZ0KCk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBfZ2V0TWF0Y2hpbmdXaW5kb3dJZChcbiAgd2luOiBXaW5PYmosXG4gIGN1cnJlbnRXaW5kb3dMaXN0OiBXaW5PYmpbXVxuKTogc3RyaW5nIHtcbiAgY29uc3QgY3VycmVudFdpbmRvdyA9IGN1cnJlbnRXaW5kb3dMaXN0LmZpbmQoXG4gICAgd2luRnJvbUN1cnJlbnQgPT4gd2luLndtQ2xhc3NOYW1lID09PSB3aW5Gcm9tQ3VycmVudC53bUNsYXNzTmFtZVxuICApO1xuICByZXR1cm4gY3VycmVudFdpbmRvdyAmJiBjdXJyZW50V2luZG93LndpbmRvd0lkO1xufVxuXG5mdW5jdGlvbiBfZ2V0TWF0Y2hpbmdXaW5kb3dzKFxuICB3aW46IFdpbk9iaixcbiAgY3VycmVudFdpbmRvd0xpc3Q6IFdpbk9ialtdXG4pOiBXaW5PYmpbXSB7XG4gIHJldHVybiBjdXJyZW50V2luZG93TGlzdC5maWx0ZXIoXG4gICAgd2luRnJvbUN1cnJlbnQgPT4gd2luLndtQ2xhc3NOYW1lID09PSB3aW5Gcm9tQ3VycmVudC53bUNsYXNzTmFtZVxuICApO1xufVxuXG5hc3luYyBmdW5jdGlvbiBfcmVzdG9yZVdpbmRvd1Bvc2l0aW9ucyhcbiAgc2F2ZWRXaW5kb3dMaXN0OiBXaW5PYmpbXVxuKTogUHJvbWlzZTx2b2lkPiB7XG4gIGNvbnN0IHByb21pc2VzID0gW107XG4gIGxldCBsYXN0X2Rlc2t0b3BfbnIgPSAwO1xuXG4gIC8vIFNvcnQgdGhlIHdpbmRvdyBvYmplY3RzIGJhc2VkIG9uIHdoaWNoIHdvcmtzcGFjZSB0aGV5IGFyZSBsb2NhdGUsXG4gIC8vIHNvIHRoZSB3aW5kb3dzIGNhbiBiZSBtb3ZlZCB3b3Jrc3BhY2UgYnkgd29ya3NwYWNlXG4gIC8vIFRoaXMgaXMgbmVlZGVkIGJlY2F1c2UgdGhlIHdpbmRvdyBtYW5hZ2VyIGp1c3QgY3JlYXRlcyBhbiBhZGRpdGlvbmFsIHdvcmtzcGFjZSB3aGVuXG4gIC8vIHRoZSBwcmV2aW91cyBvbmUgaGFzIHNvbWUgd2luZG93IG9uIGl0LlxuICBzYXZlZFdpbmRvd0xpc3QgPSBzYXZlZFdpbmRvd0xpc3QuY29uY2F0KCkuc29ydCgoYSwgYikgPT4ge1xuICAgIC8vIE5PVEU6IHdlIG5lZWQgdG8gZmFsbGJhY2sgdG8gemVybyBiZWNhdXNlIG90aGVyd2lzZSB3ZSBnZXQgTkFOIGZvciB1bmRlZmluZWQgYW5kIHRoaXNcbiAgICAvLyBtZXNzZXMgdXAgZXZlcnl0aGluZ1xuICAgIHJldHVybiAoYS53bUN1cnJlbnREZXNrdG9wTnIgfHwgMCkgLSAoYi53bUN1cnJlbnREZXNrdG9wTnIgfHwgMCk7XG4gIH0pO1xuXG4gIGZvciAoY29uc3Qgd2luIG9mIHNhdmVkV2luZG93TGlzdCkge1xuICAgIHByb21pc2VzLnB1c2gocmVzdG9yZVdpbmRvd1Bvc2l0aW9uKHdpbikpO1xuICAgIHByb21pc2VzLnB1c2gobW92ZVRvV29ya3NwYWNlKHdpbi53aW5kb3dJZCwgd2luLndtQ3VycmVudERlc2t0b3BOcikpO1xuXG4gICAgLy8gVGhlIHByb21pc2VzIGFyZSBub3QgZXhlY3V0ZWQgdW50aWwgdGhlIGxhc3QgaXRlbSBpcyByZWFjaGVkIG9yXG4gICAgLy8gdGhlIGRlc2t0b3BfbnIgaXMgZGlmZmVyZW50IGZyb20gdGhlIHByZXZpb3VzIGVudHJ5IGFuZCB3aGljaCBjYXNlXG4gICAgLy8gdGhlIGFwcCB3YWl0cyBmb3IgdGhvc2UgdG8gZmluaXNoIGJlZm9yZSBjb250aW51aW5nIHRoZSBwcm9jZXNzXG4gICAgaWYgKFxuICAgICAgd2luLndtQ3VycmVudERlc2t0b3BOciAhPT0gbGFzdF9kZXNrdG9wX25yIHx8XG4gICAgICB3aW4gPT09IHNhdmVkV2luZG93TGlzdC5zbGljZSgtMSlbMF1cbiAgICApIHtcbiAgICAgIGZvciAoY29uc3QgcHJvbWlzZSBvZiBwcm9taXNlcykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGF3YWl0IHByb21pc2U7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICBfY2F0Y2hHZW5lcmljRXJyKGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsYXN0X2Rlc2t0b3BfbnIgPSB3aW4ud21DdXJyZW50RGVza3RvcE5yO1xuICAgICAgcHJvbWlzZXMubGVuZ3RoID0gMDtcbiAgICB9XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJmcy5ta2RpclN5bmMiLCJmcy5yZWFkZGlyU3luYyIsInBhdGguam9pbiIsImZzLmxzdGF0U3luYyIsImZzLmNvcHlGaWxlU3luYyIsImZzLnVubGlua1N5bmMiLCJmcy5ybWRpclN5bmMiLCJmcy5leGlzdHNTeW5jIiwiZnMucmVhZEZpbGVTeW5jIiwiZnMud3JpdGVGaWxlU3luYyIsInNwYXduIiwiX2NhdGNoR2VuZXJpY0VyciIsImZzLnVubGluayIsImV4ZWMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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
