"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringToId = exports.unitToInlinePlainString = exports.lineToInlinePlainString = exports.stdnToInlinePlainString = exports.unitToPlainString = exports.lineToPlainString = exports.stdnToPlainString = void 0;
function stdnToPlainString(stdn) {
    const array = [];
    for (const line of stdn) {
        array.push(lineToPlainString(line));
    }
    return array.join('\n');
}
exports.stdnToPlainString = stdnToPlainString;
function lineToPlainString(line) {
    let string = '';
    for (const inline of line) {
        if (typeof inline === 'string') {
            string += inline;
            continue;
        }
        string += unitToPlainString(inline);
    }
    return string;
}
exports.lineToPlainString = lineToPlainString;
function unitToPlainString(unit) {
    return stdnToPlainString(unit.children);
}
exports.unitToPlainString = unitToPlainString;
function stdnToInlinePlainString(stdn) {
    if (stdn.length === 0) {
        return '';
    }
    return lineToInlinePlainString(stdn[0]);
}
exports.stdnToInlinePlainString = stdnToInlinePlainString;
function lineToInlinePlainString(line) {
    let string = '';
    for (const inline of line) {
        if (typeof inline === 'string') {
            string += inline;
            continue;
        }
        string += unitToInlinePlainString(inline);
    }
    return string;
}
exports.lineToInlinePlainString = lineToInlinePlainString;
function unitToInlinePlainString(unit) {
    return stdnToInlinePlainString(unit.children);
}
exports.unitToInlinePlainString = unitToInlinePlainString;
function stringToId(string) {
    return Array.from(string.slice(0, 100).matchAll(/[a-zA-Z0-9]+/g)).join('-').toLowerCase();
}
exports.stringToId = stringToId;
