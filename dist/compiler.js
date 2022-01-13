import * as ston from 'ston';
import * as stdn from 'stdn';
import * as base from './base';
import * as urls from './urls';
import * as counter from './counter';
import * as extractor from './extractor';
import { compile, multiCompile } from './mod';
export const supportedHTMLTags = [
    'address', 'article', 'aside', 'footer', 'header', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'main', 'nav', 'section',
    'blockquote', 'dd', 'div', 'dl', 'dt', 'figcaption', 'figure', 'hr', 'li', 'ol', 'p', 'pre', 'ul',
    'a', 'abbr', 'b', 'bdi', 'bdo', 'br', 'cite', 'code', 'data', 'dfn', 'em', 'i', 'kbd', 'mark', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'small', 'span', 'strong', 'sub', 'sup', 'time', 'u', 'var', 'wbr',
    'area', 'audio', 'img', 'map', 'track', 'video',
    'iframe',
    'del', 'ins',
    'caption', 'col', 'colgroup', 'table', 'tbody', 'td', 'tfoot', 'th', 'thead', 'tr'
];
export const supportedHTMLTagsWithInlineChildren = [
    'a', 'abbr', 'b', 'bdi', 'bdo', 'br', 'cite', 'code', 'data', 'dfn', 'em', 'i', 'kbd', 'mark', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'small', 'span', 'strong', 'sub', 'sup', 'time', 'u', 'var', 'wbr',
    'area', 'audio', 'img', 'map', 'track', 'video',
    'iframe',
    'del', 'ins',
    'col', 'colgroup', 'table', 'tbody', 'tfoot', 'thead', 'tr'
];
export const supportedSVGTags = [
    'animate', 'animateMotion', 'animateTransform', 'circle', 'clipPath', 'defs', 'desc', 'ellipse', 'g', 'image', 'line', 'marker', 'mask', 'mpath', 'path', 'pattern', 'polygon', 'polyline', 'rect', 'svg', 'symbol', 'text', 'textPath', 'tspan', 'use'
];
export const supportedAttributes = [
    'accesskey', 'align', 'allow', 'alt', 'autoplay', 'cite', 'class', 'cols', 'colspan', 'controls', 'coords', 'crossorigin', 'datetime', 'decoding', 'default', 'dir', 'download', 'draggable', 'for', 'headers', 'href', 'hreflang', 'id', 'kind', 'label', 'lang', 'loop', 'muted', 'name', 'open', 'ping', 'poster', 'preload', 'referrerpolicy', 'rel', 'reversed', 'rows', 'rowspan', 'sandbox', 'scope', 'span', 'spellcheck', 'src', 'srcdoc', 'srclang', 'srcset', 'start', 'style', 'tabindex', 'target', 'title', 'translate', 'usemap', 'value',
    'begin', 'dur', 'end', 'min', 'max', 'restart', 'repeatCount', 'repeatDur', 'fill',
    'calcMode', 'values', 'keyTimes', 'keySplines', 'from', 'to', 'by',
    'attributeName', 'additive', 'accumulate',
    'clipPathUnits', 'crossorigin', 'd', 'dx', 'dy', 'height', 'href', 'keyPoints', 'lengthAdjust', 'markerHeight', 'markerUnits', 'markerWidth', 'maskContentUnits', 'maskUnits', 'method', 'orient', 'path', 'pathLength', 'patternContentUnits', 'patternTransform', 'patternUnits', 'points', 'preserveAspectRatio', 'refX', 'refY', 'rotate', 'side', 'spacing', 'startOffset', 'textLength', 'type', 'viewBox', 'width', 'x', 'x1', 'x2', 'y', 'y1', 'y2'
];
export function createErrorElement(err) {
    const element = document.createElement('span');
    element.classList.add('unit', 'warn');
    element.textContent = err;
    return element;
}
export class Compiler {
    constructor(context) {
        this.context = context;
        this.supportedHTMLTags = supportedHTMLTags;
        this.supportedHTMLTagsWithInlineChildren = supportedHTMLTagsWithInlineChildren;
        this.supportedSVGTags = supportedSVGTags;
        this.supportedAttributes = supportedAttributes;
        this.ston = ston;
        this.stdn = stdn;
        this.base = base;
        this.urls = urls;
        this.counter = counter;
        this.extractor = extractor;
        this.compile = compile;
        this.multiCompile = multiCompile;
        this.createErrorElement = createErrorElement;
        this.unitToCompiling = new Map();
    }
    async compileUnit(unit) {
        if (this.unitToCompiling.get(unit) === true) {
            return this.createErrorElement('Loop');
        }
        if (unit.tag === 'global' || unit.options.global === true) {
            const element = document.createElement('div');
            element.classList.add('unit', 'global');
            return element;
        }
        this.unitToCompiling.set(unit, true);
        let realTag = unit.options['compile-with'] ?? extractor.extractLastGlobalOption('compile-with', unit.tag, this.context.tagToGlobalOptions);
        if (typeof realTag !== 'string' || realTag.length === 0) {
            realTag = unit.tag;
        }
        const unitCompiler = this.context.tagToUnitCompiler[realTag];
        let element;
        if (unitCompiler !== undefined) {
            try {
                element = await unitCompiler(unit, this);
            }
            catch (err) {
                console.log(err);
                element = this.createErrorElement('Broken');
            }
            if (element.classList.contains('unit') && element.classList.contains('warn')) {
                this.unitToCompiling.set(unit, false);
                return element;
            }
        }
        else {
            if (supportedHTMLTags.includes(realTag)) {
                element = document.createElement(realTag);
                if (supportedHTMLTagsWithInlineChildren.includes(realTag)) {
                    element.append(await this.compileInlineSTDN(unit.children));
                }
                else {
                    element.append(await this.compileSTDN(unit.children));
                }
            }
            else if (supportedSVGTags.includes(realTag)) {
                element = document.createElementNS("http://www.w3.org/2000/svg", realTag);
                element.append(await this.compileInlineSTDN(unit.children));
            }
            else {
                element = document.createElement('div');
                element.append(await this.compileSTDN(unit.children));
            }
        }
        element.classList.add('unit');
        try {
            element.classList.add(realTag);
            if (typeof unit.options.class === 'string') {
                element.classList.add(...unit.options.class.trim().split(/\s+/));
            }
            for (const val of extractor.extractGlobalOptionArray('class', unit.tag, this.context.tagToGlobalOptions)) {
                if (typeof val === 'string') {
                    element.classList.add(...val.trim().split(/\s+/));
                }
            }
        }
        catch (err) {
            console.log(err);
        }
        const id = this.context.unitToId.get(unit);
        if (id !== undefined) {
            element.id = id;
        }
        for (const key of Object.keys(unit.options)) {
            if (key === 'id' || key === 'class') {
                continue;
            }
            let attr = key;
            if (!key.startsWith('data-') && !supportedAttributes.includes(key)) {
                attr = `data-${key}`;
            }
            if (element.hasAttribute(attr)) {
                continue;
            }
            let val = unit.options[key];
            if (val === true) {
                val = '';
            }
            else if (typeof val === 'number') {
                val = val.toString();
            }
            if (typeof val !== 'string') {
                continue;
            }
            if (this.context.dir.length > 0
                && (attr.endsWith('href') || attr.endsWith('src'))
                && urls.isRelURL(val)) {
                val = new URL(val, this.context.dir).href;
            }
            try {
                element.setAttribute(attr, val);
            }
            catch (err) {
                console.log(err);
            }
        }
        this.unitToCompiling.set(unit, false);
        return element;
    }
    async compileInline(inline) {
        if (typeof inline !== 'string') {
            return await this.compileUnit(inline);
        }
        return new Text(inline);
    }
    async compileLine(line) {
        const df = new DocumentFragment();
        for (const inline of line) {
            df.append(await this.compileInline(inline));
        }
        return df;
    }
    async compileInlineSTDN(stdn) {
        const df = new DocumentFragment();
        for (let i = 0; i < stdn.length; i++) {
            df.append(await this.compileLine(stdn[i]));
            if (i !== stdn.length - 1) {
                df.append(new Text('\n'));
            }
        }
        return df;
    }
    async compileSTDN(stdn) {
        const df = new DocumentFragment();
        for (const line of stdn) {
            const div = document.createElement('div');
            div.classList.add('st-line');
            df.append(div);
            div.append(await this.compileLine(line));
        }
        return df;
    }
}
