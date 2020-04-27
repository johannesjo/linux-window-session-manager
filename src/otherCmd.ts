"use strict";

import { IS_DEBUG } from "./isDebug";
import { CFG } from "./config";
import { spawn } from "child_process";
import { parseCmdArgs } from "./parseCmdToSpawn";
import { WinObj, WinObjIdOnly } from "./model";
import { log } from "./log";
import { getActiveWindowIds, getDisplays, getWindowInfo } from "./x11Wrapper";

// 500kb
const MAX_BUFFER = 1024 * 500;
const EXEC_OPTS = {
  maxBuffer: MAX_BUFFER
};

// display
// -------
export function getConnectedDisplaysId(): string {
  const displays = getDisplays();
  return displays
    .map(screen => screen.pixel_width + "x" + screen.pixel_height)
    .join(";");
}

// Other
// --------
export async function getAdditionalMetaDataForWin(
  win: WinObjIdOnly
): Promise<WinObj> {
  const stdout = await getWindowInfo(win.windowId);
  const lines = stdout.split("\n");
  const winCopy: any = { ...win };

  lines.forEach(line => {
    const words = line.split(" ");
    const propertyName = words[0];

    // remove property name and "="
    words.splice(0, 2);
    const value = words.join(" ");
    const propertyNameFromMap = CFG.WM_META_MAP[propertyName];
    // parse wmClassName
    if (propertyName === "WM_CLASS(STRING)") {
      const propertyNameFromMap = CFG.WM_META_MAP[propertyName];
      const classNames = value.split(", ");
      let className = "";
      classNames.forEach(state => {
        if (state !== "") {
          className += state.replace(/"/g, "") + ".";
        }
      });
      winCopy[propertyNameFromMap] = className.substr(0, className.length - 2);
    }
    // parse states
    else if (propertyName === "_NET_WM_STATE(ATOM)") {
      const states = value.split(", ");
      winCopy.states = [];
      states.forEach(state => {
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
      } else {
        winCopy[propertyNameFromMap] = value;
      }
    }
  });
  // console.log(winCopy);
  return winCopy;
}

// TODO prettify args structure
export function startProgram(
  executableFile: string,
  desktopFilePath: string,
  executableArgs: string
): Promise<void> {
  IS_DEBUG &&
    console.log("DEBUG: startProgram():", executableFile, desktopFilePath);

  let cmd;
  let args = [];
  if (desktopFilePath) {
    cmd = `awk`;

    if (executableArgs) {
      args.push(
        `/^Exec=/ {sub("^Exec=", ""); gsub(" ?%[cDdFfikmNnUuv]", " ${executableArgs}"); exit system($0)}`
      );
    } else {
      args.push(
        '/^Exec=/ {sub("^Exec=", ""); gsub(" ?%[cDdFfikmNnUuv]", ""); exit system($0)}'
      );
    }

    args.push(desktopFilePath);
  } else {
    const parsedCmd = parseCmdArgs(executableFile);
    cmd = parsedCmd[0];
    args = parsedCmd[1];
    if (executableArgs) {
      args = args.concat([executableArgs]);
    }
  }

  return new Promise(fulfill => {
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
export async function getActiveWindowList(): Promise<WinObj[]> {
  const windowIds = await getActiveWindowIds();
  const windowList: WinObjIdOnly[] = [];
  windowIds.forEach(windowId => {
    windowList.push({
      windowId: windowId,
      windowIdDec: parseInt(windowId, 16)
    });
  });

  // add meta data right away
  const promises = windowList.map(win => getAdditionalMetaDataForWin(win));

  const windowsWithData: WinObj[] = (await Promise.all(promises)) as WinObj[];

  IS_DEBUG && console.log("DEBUG: getActiveWindowList():", windowList);
  return windowsWithData.filter(_filterInvalidWindows);
}

function _filterInvalidWindows(win: WinObj): boolean {
  // filter none normal windows, excluded class names and incomplete windows
  // NOTE: if there is no type we assume it's normal too
  const isNormalWindow =
    (!win.wmType || win.wmType.includes("_NET_WM_WINDOW_TYPE_NORMAL")) &&
    (!win.wmRole || win.wmRole !== "pop-up");

  const isNotExcluded = !_isExcludedWmClassName(win.wmClassName);
  const hasWmClassName = !!win.wmClassName;

  // warn if no wmClassName even though there should be
  if (isNormalWindow && isNotExcluded && !hasWmClassName) {
    console.warn(win.windowId + " has no wmClassName. Win: ", win);
  }

  return isNormalWindow && isNotExcluded && hasWmClassName;
}

function _isExcludedWmClassName(wmClassName): boolean {
  return CFG.WM_CLASS_EXCLUSIONS.indexOf(wmClassName) > -1;
}

function _catchGenericErr(err): void {
  console.error("otherCmd: Generic Error", err, err.stack);
  log("otherCmd:", arguments);
}
