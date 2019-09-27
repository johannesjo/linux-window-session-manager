import * as fs from 'fs';


export function mkdirSync(dirPath) {
    try {
        fs.mkdirSync(dirPath);
    } catch (err) {
        if (err.code !== 'EEXIST') {
            throw err;
        }
    }
}

export function mkfileSync(filePath) {
    try {
        fs.writeFileSync(filePath, {flag: 'wx'});
    } catch (err) {
        if (err.code !== 'EEXIST') {
            throw err;
        }
    }
}

export function copySync(src, dest) {
    if (!fs.existsSync(src)) {
        return false;
    }
    const data = fs.readFileSync(src, 'utf-8');
    fs.writeFileSync(dest, data);
}
