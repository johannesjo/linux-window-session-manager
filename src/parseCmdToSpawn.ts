'use strict';

export const parseCmdArgs = (cmd) => {
    let cmdAllSplit = cmd.split(/ /);
    let mainCommand = cmdAllSplit[0];
    let args = [];
    cmdAllSplit.map(function (s, i) {
        if (i !== 0) {
            args[i - 1] = cmdAllSplit[i];
        }
    });
    return [mainCommand, _mergeQuotedStringParams(args)];
};

function _mergeQuotedStringParams(args) {
    const newArgs = [];
    let isInQuotation = false;
    let currentQuotationArg;

    // TODO make it work with more different quotation types
    args.forEach((arg) => {
        // match quotation end
        if (arg.match(/'$/)) {
            currentQuotationArg += ' ' + arg.slice(0, arg.length - 1);
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
            currentQuotationArg += ' ' + arg;
        } else if (arg !== '') {
            newArgs.push(arg);
        }
    });

    return newArgs;
}
