"use strict";
import { getWindowGeometry, goToViewport } from "./x11Wrapper";
import { getActiveWindowList } from "./otherCmd";
import { CFG } from "./config";
import { WinObj } from "./model";

const findup = require("findup-sync");

const HOME_DIR = process.env["HOME"];
const DEFAULT_DESKTOP_FILE_LOCATIONS = [
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

export function goToFirstWorkspace() {
  return goToViewport(0, 0);
}

export function findDesktopFile(fileName) {
  return new Promise((fulfill, reject) => {
    const desktopFileLocations =
      CFG.DESKTOP_FILE_LOCATIONS || DEFAULT_DESKTOP_FILE_LOCATIONS;

    const parentDirs = desktopFileLocations.map(parentDir => {
      return parentDir.replace("{home}", HOME_DIR);
    });

    let firstFile;
    const match = parentDirs.find(dir => {
      firstFile = findup(fileName, { cwd: dir });

      if (!firstFile) {
        // snap desktop files now look like this => firefox_firefox.desktop
        firstFile = findup(`${fileName.replace(".desktop", "_")}${fileName}`, {
          cwd: dir
        });
      }
      return firstFile;
    });

    if (!firstFile || !match) {
      const err = `ERR: findDesktopFile() cant find file "${fileName}"! Searched desktopFileLocations:`;
      console.error(err, desktopFileLocations);
      reject(err);
    } else {
      fulfill(firstFile);
    }
  }).catch(_catchGenericErr);
}

export function getActiveWindowListFlow(): Promise<WinObj[] | any> {
  return new Promise(async (fulfill, reject) => {
    return getActiveWindowList().then(async (windowList: any[]) => {
      const promises = windowList.map(win => {
        return getWindowGeometry(win.windowId).then((geo: any) => {
          for (let prop in geo) {
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

      // we're using a waterfall because we're dealing with x11 requests
      if (promises.length) {
        for (const promise of promises) {
          try {
            await promise;
          } catch (e) {
            reject(e);
          }
        }
        _addParsedExecutableFilesFromWmClassNames(windowList).then(
          windowListWithWmClassNames => {
            fulfill(windowListWithWmClassNames);
          }
        );
      } else {
        fulfill([]);
      }
    });
  }).catch(_catchGenericErr);
}

// MIXED
function _addParsedExecutableFilesFromWmClassNames(windowList): Promise<any> {
  return new Promise(async (fulfill, reject) => {
    const promises = windowList
      .filter(win => !win.executableFile)
      .map(win => {
        return _parseExecutableFileFromWmClassName(win.wmClassName).then(
          fileName => {
            win.executableFile = fileName;
          }
        );
      });

    if (promises.length) {
      for (const promise of promises) {
        try {
          await promise;
        } catch (e) {
          reject(e);
        }
      }
      fulfill(windowList);
    } else {
      fulfill(windowList);
    }
  }).catch(_catchGenericErr);
}

function _parseExecutableFileFromWmClassName(wmClassName): Promise<any> {
  return new Promise((fulfill, reject) => {
    const executableFileFromMap =
      CFG.WM_CLASS_AND_EXECUTABLE_FILE_MAP[wmClassName];
    if (executableFileFromMap) {
      fulfill(executableFileFromMap);
    } else {
      const splitValues = wmClassName.split(".");
      const fileName = splitValues[0];
      if (_isChromeApp(fileName)) {
        _parseChromeAppDesktopFileName(fileName)
          .then(fulfill)
          .catch(reject);
      } else {
        fulfill(fileName + ".desktop");
      }
    }
  }).catch(_catchGenericErr);
}

function _parseSimpleWindowName(wmClassName) {
  const splitValues = wmClassName.split(".");
  if (splitValues[1]) {
    return splitValues[1];
  } else {
    return wmClassName;
  }
}

function _isChromeApp(fileName) {
  return !!fileName.match(/^crx_/);
}

function _parseChromeAppDesktopFileName(fileName) {
  return new Promise((resolve, reject) => {
    // we wan't to search from desktop files only
    const locateStr = fileName.replace("crx_", "*") + "*.desktop";
    findDesktopFile(locateStr)
      .then(resolve)
      .catch(reject);
  }).catch(_catchGenericErr);
}
