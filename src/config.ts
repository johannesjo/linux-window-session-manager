import { mergeDeep, mkdirSync, movedir } from "./utility";
import { DEFAULT_CFG } from "./defaultConfig";
import * as fs from "fs";
import { log } from "./log";

let cfg;

export const CFG_DATA_DIR_LEGACY = _getUserHome() + "/.lwsm";
export const CFG_DATA_DIR = _getUserHome() + "/.config/lwsm";
export const CFG_FILE_PATH = CFG_DATA_DIR + "/config.json";
export const SESSION_DATA_DIR = CFG_DATA_DIR + "/sessionData";

// INIT
// ------------
try {
  // if CFG_DATA_DIR_LEGACY exists, move it to CFG_DATA_DIR
  // if (fs.existsSync(CFG_DATA_DIR_LEGACY)) {
  //   if (!fs.existsSync(CFG_DATA_DIR)) {
  //     movedir(CFG_DATA_DIR_LEGACY, CFG_DATA_DIR);
  //     log(
  //       `lwsm: moved config directory ${CFG_DATA_DIR_LEGACY} to ${CFG_DATA_DIR}`
  //     );
  //   } else {
  //     log(`lwsm: ignored legacy config directory ${CFG_DATA_DIR_LEGACY}`);
  //   }
  // }

  // if config is already in place
  const fromFile = JSON.parse(fs.readFileSync(CFG_FILE_PATH, "utf8"));
  cfg = mergeDeep(DEFAULT_CFG, fromFile);
} catch (e) {
  log(
    "lwsm: no config file present or it contains invalid json. Creating new one..."
  );

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

export const CFG = cfg;

function _getUserHome() {
  return process.env[process.platform === "win32" ? "USERPROFILE" : "HOME"];
}
