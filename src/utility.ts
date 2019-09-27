import * as fs from 'fs';
import {CFG} from './config';


function _catchGenericErr(err) {
    console.error('util: Generic Error', err, err.stack);
    console.log('util:', arguments);
}


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
