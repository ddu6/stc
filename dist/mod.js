"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multiCompile = exports.compile = void 0;
const urls_1 = require("./urls");
const stdn_1 = require("stdn");
const compiler_1 = require("./compiler");
const countext_1 = require("./countext");
__exportStar(require("./base"), exports);
__exportStar(require("./urls"), exports);
__exportStar(require("./compiler"), exports);
__exportStar(require("./counter"), exports);
__exportStar(require("./countext"), exports);
async function compile(string, dir = '', options = {}) {
    const doc = (0, stdn_1.parse)(string);
    if (doc === undefined) {
        return undefined;
    }
    const context = await (0, countext_1.extractContext)(doc, dir, options);
    const compiler = new compiler_1.Compiler(context);
    return {
        documentFragment: await compiler.compileSTDN(doc),
        context,
    };
}
exports.compile = compile;
async function multiCompile(parts, options = {}) {
    const doc = [];
    const partLengths = [];
    for (const { string, dir } of parts) {
        const stdn = (0, stdn_1.parse)(string);
        if (stdn === undefined) {
            partLengths.push(0);
            continue;
        }
        (0, urls_1.fixURLInSTDN)(stdn, dir);
        doc.push(...stdn);
        partLengths.push(stdn.length);
    }
    const context = await (0, countext_1.extractContext)(doc, '', options);
    const compiler = new compiler_1.Compiler(context);
    return {
        documentFragment: await compiler.compileSTDN(doc),
        context,
        partLengths
    };
}
exports.multiCompile = multiCompile;
