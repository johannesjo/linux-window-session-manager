import * as fs from "fs";
import * as path from "path";

export function mkdirSync(dirPath) {
  try {
    fs.mkdirSync(dirPath);
  } catch (err) {
    if (err.code !== "EEXIST") {
      throw err;
    }
  }
}

export function mkfileSync(filePath) {
  try {
    fs.writeFileSync(filePath, { flag: "wx" });
  } catch (err) {
    if (err.code !== "EEXIST") {
      throw err;
    }
  }
}

export function copySync(src, dest) {
  if (!fs.existsSync(src)) {
    return false;
  }
  const data = fs.readFileSync(src, "utf-8");
  fs.writeFileSync(dest, data);
}

export function mergeDeep(...objects) {
  const isObject = obj => obj && typeof obj === "object";

  return objects.reduce((prev, obj) => {
    Object.keys(obj).forEach(key => {
      const pVal = prev[key];
      const oVal = obj[key];

      if (Array.isArray(pVal) && Array.isArray(oVal)) {
        prev[key] = pVal.concat(...oVal);
      } else if (isObject(pVal) && isObject(oVal)) {
        prev[key] = mergeDeep(pVal, oVal);
      } else {
        prev[key] = oVal;
      }
    });

    return prev;
  }, {});
}

export function movedir(from, to) {
  mkdirSync(to);
  let contents = fs.readdirSync(from);

  for (const element of contents) {
    let from_element = path.join(from, element);
    let to_element = path.join(to, element);

    if (fs.lstatSync(from_element).isDirectory()) {
      movedir(from_element, to_element);
    } else {
      fs.copyFileSync(from_element, to_element);
      fs.unlinkSync(from_element);
    }
  }
  fs.rmdirSync(from);
}
