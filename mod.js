var t={d:(n,e)=>{for(var i in e)t.o(e,i)&&!t.o(n,i)&&Object.defineProperty(n,i,{enumerable:!0,get:e[i]})},o:(t,n)=>Object.prototype.hasOwnProperty.call(t,n),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},n={};t.d(n,{Si:()=>J,AT:()=>V,MY:()=>K,l7:()=>F,gh:()=>G,Rs:()=>P,t$:()=>H,aV:()=>M,XY:()=>R,qP:()=>O,VO:()=>L,wS:()=>A,Xg:()=>N,TA:()=>k,wT:()=>Z,r$:()=>C,tC:()=>E,q0:()=>_,xU:()=>q,AG:()=>B,_C:()=>z,lV:()=>X,$P:()=>Y,Iz:()=>$,c4:()=>W,dt:()=>U,FW:()=>D});var e={};t.r(e),t.d(e,{parse:()=>h,parseWithIndex:()=>u,stringify:()=>g,stringifyWithComment:()=>p});var i={};t.r(i),t.d(i,{format:()=>j,parse:()=>v,stringify:()=>w});var o={};t.r(o),t.d(o,{fixURLInSTDN:()=>O,fixURLInUnit:()=>L,isRelURL:()=>A,relURLToAbsURL:()=>C,urlsStrToAbsURLs:()=>U,urlsToAbsURLs:()=>D});var s={};t.r(s),t.d(s,{lineToInlinePlainString:()=>N,lineToPlainString:()=>k,stdnToInlinePlainString:()=>E,stdnToPlainString:()=>_,stringToId:()=>q,unitToInlinePlainString:()=>$,unitToPlainString:()=>W});var r={};t.r(r),t.d(r,{extractContext:()=>F,extractGlobalChildren:()=>G,extractGlobalOptionArray:()=>P,extractGlobalStrings:()=>H,extractGlobalURLs:()=>M,extractLastGlobalOption:()=>R});var a={};function c(t,n,e=!1){let i=0,o=!1,s=!1,r=0,a=!1,c=[];const l=[];for(let d=0;d<t.length;d++){if(!0===s){s=!1;continue}const u=t[d];if("line"!==a)if("block"!==a)if("'"!==u){if(o){if("\\"===u){s=!0;continue}}else if("{"!==u&&"["!==u)if("}"!==u&&"]"!==u){if(!(i>0))if(","!==u&&"\n"!==u){if(!(r<d))if(0!==u.trimEnd().length){if("/"===u){const n=t[d+1];if("/"===n){r=d,d++,a="line";continue}if("*"===n){r=d,d++,a="block";continue}}}else r=d+1}else{const e=t.slice(r,d).trimEnd();e.length>0&&(l.push({value:e,index:n+r,comment:c.join("\n")}),c=[]),r=d+1}}else{if(i--,i<0){const e=t.slice(r,d).trimEnd();e.length>0&&(l.push({value:e,index:n+r,comment:c.join("\n")}),c=[]);break}0===i&&(l.push({value:t.slice(r,d+1),index:n+r,comment:c.join("\n")}),c=[],r=d+1)}else if(i++,1===i&&!e){const e=t.slice(r,d).trimEnd();e.length>0&&(l.push({value:e,index:n+r,comment:c.join("\n")}),c=[]),r=d}}else{if(!o){if(o=!0,0===i&&!e){const e=t.slice(r,d).trimEnd();e.length>0&&(l.push({value:e,index:n+r,comment:c.join("\n")}),c=[]),r=d}continue}o=!1,0===i&&(l.push({value:t.slice(r,d+1),index:n+r,comment:c.join("\n")}),c=[],r=d+1)}else"*"===u&&"/"===t[d+1]&&(d++,a=!1,c.push(t.slice(r,d+1).replace(/\n[ ]*/g,"\n ")),r=d+1);else"\n"===u&&(a=!1,c.push(t.slice(r,d).trimEnd()),r=d+1)}if(!o&&0===i&&!1===a){const e=t.slice(r).trimEnd();e.length>0&&l.push({value:e,index:n+r,comment:c.join("\n")})}return l}function l(t,n=!1){let e=0,i=!1,o=!1,s=0,r=!1;const a=[];for(let c=0;c<t.length;c++){if(!0===o){o=!1;continue}const l=t[c];if("line"!==r)if("block"!==r)if("'"!==l){if(i){if("\\"===l){o=!0;continue}}else if("{"!==l&&"["!==l)if("}"!==l&&"]"!==l){if(!(e>0))if(","!==l&&"\n"!==l){if(!(s<c))if(0!==l.trimEnd().length){if("/"===l){const n=t[c+1];if("/"===n){c++,r="line",s=c+1;continue}if("*"===n){c++,r="block",s=c+1;continue}}}else s=c+1}else{const n=t.slice(s,c).trimEnd();n.length>0&&a.push(n),s=c+1}}else{if(e--,e<0){const n=t.slice(s,c).trimEnd();n.length>0&&a.push(n);break}0===e&&(a.push(t.slice(s,c+1)),s=c+1)}else if(e++,1===e&&!n){const n=t.slice(s,c).trimEnd();n.length>0&&a.push(n),s=c}}else{if(!i){if(i=!0,0===e&&!n){const n=t.slice(s,c).trimEnd();n.length>0&&a.push(n),s=c}continue}i=!1,0===e&&(a.push(t.slice(s,c+1)),s=c+1)}else"*"===l&&"/"===t[c+1]&&(c++,r=!1),s=c+1;else"\n"===l&&(r=!1),s=c+1}if(!i&&0===e){const n=t.slice(s).trimEnd();n.length>0&&a.push(n)}return a}function d(t){const n=[];let e=!1;for(const i of t)if(!0!==e)if("\\"!==i){if("'"===i)break;n.push(i)}else e=!0;else e=!1,"\\"!==i&&"'"!==i&&n.push("\\"),n.push(i);return n.join("")}function u(t,n=0,e=""){n+=t.length;const i=function(t,n){if(0===t.length)return;const e=t[0];return"'"===e?d(t.slice(1)):"["===e?function(t,n){return function(t){const n=[];for(const{value:e,index:i,comment:o}of t){const t=u(e,i,o);if(void 0===t)return;n.push(t)}return n}(c(t,n))}(t.slice(1),n+1):"{"===e?function(t,n){return function(t){const n={};for(const{value:e,index:i,comment:o}of t){const t=e.match(/^\s*([\w-]+)/);if(null===t){const t=u(e,i,o);if(void 0===t)return;n.__=t;continue}const s=t[1],r=t[0].length;let a=e.slice(r).trimEnd();if(0===a.length)n[s]={value:!0,index:i+r,comment:o};else{const t=u(a,i+r,o);if(void 0===t)return;n[s]=t}}return n}(c(t,n,!0))}(t.slice(1),n+1):"true"===(t=t.trimEnd())||"false"!==t&&(/^(?:[+-]?Infinity|NaN|0x[\da-fA-F]+|0o[0-7]+|0b[01]+|[+-]?(?:\d*\.?\d+|\d+\.)(?:e[+-]?\d+)?)$/.test(t)?Number(t):/[',{}\[\]\n\r]/.test(t)?void 0:t)}(t=t.trimStart(),n-=t.length);if(void 0!==i)return{value:i,index:n,comment:e}}function h(t){if(0===(t=t.trimStart()).length)return;const n=t[0];return"'"===n?d(t.slice(1)):"["===n?function(t){return function(t){const n=[];for(const e of t){const t=h(e);if(void 0===t)return;n.push(t)}return n}(l(t))}(t.slice(1)):"{"===n?function(t){return function(t){const n={};for(const e of t){const t=e.match(/^\s*([\w-]+)/);if(null===t){const t=h(e);if(void 0===t)return;n.__=t;continue}const i=t[1],o=t[0].length;let s=e.slice(o).trimEnd();if(0===s.length)n[i]=!0;else{const t=h(s);if(void 0===t)return;n[i]=t}}return n}(l(t,!0))}(t.slice(1)):"true"===(t=t.trimEnd())||"false"!==t&&(/^(?:[+-]?Infinity|NaN|0x[\da-fA-F]+|0o[0-7]+|0b[01]+|[+-]?(?:\d*\.?\d+|\d+\.)(?:e[+-]?\d+)?)$/.test(t)?Number(t):/[',{}\[\]\n\r]/.test(t)?void 0:t)}function f(t,n){if(n&&t.length>0&&t[0].trim().length>0&&(1===t.length||t[t.length-1].trim().length>0)&&!/[',{}\[\]\n\r]/.test(t)&&"true"!==t&&"false"!==t&&!/^(?:[+-]?Infinity|NaN|0x[\da-fA-F]+|0o[0-7]+|0b[01]+|[+-]?(?:\d*\.?\d+|\d+\.)(?:e[+-]?\d+)?)$/.test(t)&&!t.startsWith("//")&&!t.startsWith("/*"))return t;const e=["'"];for(let n=0;n<t.length;n++){const i=t[n];if("\\"!==i)"'"!==i?e.push(i):e.push("\\'");else{if(n===t.length-1){e.push("\\\\");break}const o=t[n+1];if("\\"===o||"'"===o){e.push("\\\\");continue}e.push(i)}}return e.push("'"),e.join("")}function p(t,n={}){return void 0===t?"":"number"==typeof t?t.toString():"string"==typeof t?f(t,n.useUnquotedString):!0===t?"true":!1===t?"false":Array.isArray(t)?function(t,{indentTarget:n,indentLevel:e,addDecorativeComma:i,addDecorativeSpace:o,useUnquotedString:s}){n=n??"none",e=e??0,i=i??"never";const r=[],a=t.length>1&&("all"===n||"array"===n||"arrayInObjectAndThis"===n)||void 0!==t.find((t=>t.comment.length>0)),c=e+(a?1:0);"arrayInObjectAndThis"===n&&(n="arrayInObject");const l="always"===o||"afterComma"===o?", ":",";let d;for(let e=0;e<t.length;e++){const{value:u,comment:h}=t[e];let f;f=void 0===d?p(u,{indentTarget:n,indentLevel:c,addDecorativeComma:i,addDecorativeSpace:o,useUnquotedString:s}):d,e!==t.length-1&&(d=p(t[e+1].value,{indentTarget:n,indentLevel:c,addDecorativeComma:i,addDecorativeSpace:o,useUnquotedString:s})),a||e===t.length-1||"always"!==i&&(f.endsWith("'")||f.endsWith("}")||f.endsWith("]")||void 0!==d&&(d.endsWith("'")||d.endsWith("}")||d.endsWith("]")))?(h.length>0&&r.push(...h.split("\n")),r.push(f)):r.push(f+l)}let u="\n";for(let t=0;t<e;t++)u+="    ";let h=u;return e>=0&&(h+="    "),a?"["+h+r.join(h)+u+"]":"["+r.join("")+"]"}(t,n):function(t,{indentTarget:n,indentLevel:e,addDecorativeComma:i,addDecorativeSpace:o,useUnquotedString:s}){n=n??"none",e=e??0,i=i??"never";const r=[],a=Object.keys(t);let c=a.length>1&&("all"===n||"object"===n);if(!c)for(const n of a){const e=t[n];if(void 0!==e&&e.comment.length>0){c=!0;break}}const l=e+(c?1:0);"arrayInObject"===n&&(n="arrayInObjectAndThis");const d="always"===o||"afterComma"===o?", ":",",u="always"===o||"afterKey"===o?" ":"";for(let e=0;e<a.length;e++){const h=a[e];if(null===h.match(/^[\w-]+$/))continue;const f=t[h];if(void 0===f)continue;const{value:g,comment:m}=f,y=p(g,{indentTarget:n,indentLevel:l,addDecorativeComma:i,addDecorativeSpace:o,useUnquotedString:"__"===h&&"string"==typeof g?void 0:s});m.length>0&&r.push(...m.split("\n")),y.startsWith("'")||y.startsWith("[")||y.startsWith("{")?c||e===a.length-1||"always"!==i&&"inObject"!==i?r.push(("__"===h?"":h+u)+y):r.push(("__"===h?"":h+u)+y+d):"true"===y?c||e===a.length-1?r.push(h):r.push(h+d):c||e===a.length-1?r.push(h+" "+y):r.push(h+" "+y+d)}let h="\n";for(let t=0;t<e;t++)h+="    ";let f=h;return e>=0&&(f+="    "),c?"{"+f+r.join(f)+h+"}":"{"+r.join("")+"}"}(t,n)}function g(t,n={}){return void 0===t?"":"number"==typeof t?t.toString():"string"==typeof t?f(t,n.useUnquotedString):!0===t?"true":!1===t?"false":Array.isArray(t)?function(t,{indentTarget:n,indentLevel:e,addDecorativeComma:i,addDecorativeSpace:o,useUnquotedString:s}){n=n??"none",e=e??0,i=i??"never";const r=[],a=t.length>1&&("all"===n||"array"===n||"arrayInObjectAndThis"===n),c=e+(a?1:0);"arrayInObjectAndThis"===n&&(n="arrayInObject");const l="always"===o||"afterComma"===o?", ":",";let d;for(let e=0;e<t.length;e++){let u;u=void 0===d?g(t[e],{indentTarget:n,indentLevel:c,addDecorativeComma:i,addDecorativeSpace:o,useUnquotedString:s}):d,e!==t.length-1&&(d=g(t[e+1],{indentTarget:n,indentLevel:c,addDecorativeComma:i,addDecorativeSpace:o,useUnquotedString:s})),a||e===t.length-1||"always"!==i&&(u.endsWith("'")||u.endsWith("}")||u.endsWith("]")||void 0!==d&&(d.endsWith("'")||d.endsWith("}")||d.endsWith("]")))?r.push(u):r.push(u+l)}let u="\n";for(let t=0;t<e;t++)u+="    ";let h=u;return e>=0&&(h+="    "),a?"["+h+r.join(h)+u+"]":"["+r.join("")+"]"}(t,n):function(t,{indentTarget:n,indentLevel:e,addDecorativeComma:i,addDecorativeSpace:o,useUnquotedString:s}){n=n??"none",e=e??0,i=i??"never";const r=[],a=Object.keys(t),c=a.length>1&&("all"===n||"object"===n),l=e+(c?1:0);"arrayInObject"===n&&(n="arrayInObjectAndThis");const d="always"===o||"afterComma"===o?", ":",",u="always"===o||"afterKey"===o?" ":"";for(let e=0;e<a.length;e++){const h=a[e];if(null===h.match(/^[\w-]+$/))continue;const f=t[h];if(void 0===f)continue;const p=g(f,{indentTarget:n,indentLevel:l,addDecorativeComma:i,addDecorativeSpace:o,useUnquotedString:"__"===h&&"string"==typeof f?void 0:s});p.startsWith("'")||p.startsWith("[")||p.startsWith("{")?c||e===a.length-1||"always"!==i&&"inObject"!==i?r.push(("__"===h?"":h+u)+p):r.push(("__"===h?"":h+u)+p+d):"true"===p?c||e===a.length-1?r.push(h):r.push(h+d):c||e===a.length-1?r.push(h+" "+p):r.push(h+" "+p+d)}let h="\n";for(let t=0;t<e;t++)h+="    ";let f=h;return e>=0&&(f+="    "),c?"{"+f+r.join(f)+h+"}":"{"+r.join("")+"}"}(t,n)}function m(t){let n="div",e=[],i={};for(const o of Object.keys(t)){let s=t[o];if(void 0!==s)if("__"!==o)if(Array.isArray(s))n=o,e=b(s);else if("object"!=typeof s)i[o]=s;else{if(s=s.__,void 0===s)continue;"string"==typeof s?s=[{__:s}]:Array.isArray(s)||(s=[s]),i[o]=b(s)}else Array.isArray(s)||(s=[s]),n="katex",e=b(s)}return{tag:n,children:e,options:i}}function y(t){const n=[];for(const e of t)if("string"!=typeof e)"object"!=typeof e||Array.isArray(e)||n.push(m(e));else for(const t of e)t>=" "&&n.push(t);return n}function b(t){const n=[];for(const e of t)Array.isArray(e)?n.push(y(e)):n.push(y([e]));return n}function v(t){const n=h("["+t+"]");if(Array.isArray(n))return b(n)}function T(t){const n={},{tag:e,children:i,options:o}=t;for(const t of Object.keys(o)){let e=o[t];n[t]="object"==typeof e?{__:I(e)}:e}return"katex"===e?n.__=function(t){const n=S(t);if(1===n.length){const t=n[0];if("string"==typeof t)return t}return n}(i):("div"!==e||i.length>0)&&(n[e]=S(i)),n}function x(t){const n=[];let e="";for(const i of t)"object"!=typeof i?e+=i:(e.length>0&&(n.push(e),e=""),n.push(T(i)));return e.length>0&&n.push(e),1===n.length?n[0]:n}function S(t){const n=[];for(const e of t)n.push(x(e));return n}function I(t){const n=S(t);if(1===n.length){const t=n[0];if("object"==typeof t&&!Array.isArray(t)){const n=Object.keys(t);if(1===n.length&&"__"===n[0]){const n=t.__;if("string"==typeof n)return n}}}return n}function w(t){return void 0===t?"":t.length<2?g(S(t),{indentTarget:"arrayInObjectAndThis",addDecorativeComma:"inObject",addDecorativeSpace:"always",useUnquotedString:!0}).slice(1,-1).trim():g(S(t),{indentLevel:-1,indentTarget:"arrayInObjectAndThis",addDecorativeComma:"inObject",addDecorativeSpace:"always",useUnquotedString:!0}).slice(1,-1).trim()}function j(t){const n=u("["+t+"]");return void 0!==n&&Array.isArray(n.value)?n.value.length<2?p(n.value,{indentTarget:"arrayInObjectAndThis",addDecorativeComma:"inObject",addDecorativeSpace:"always",useUnquotedString:!0}).slice(1,-1).trim():p(n.value,{indentLevel:-1,indentTarget:"arrayInObjectAndThis",addDecorativeComma:"inObject",addDecorativeSpace:"always",useUnquotedString:!0}).slice(1,-1).trim():t}function A(t){return!t.startsWith("#")&&!/^[a-z][a-z0-9+.-]*:/i.test(t)}function C(t,n){try{return new URL(t,n).href}catch(n){return console.log(n),t}}function L(t,n){for(const e of Object.keys(t.options)){const i=t.options[e];Array.isArray(i)?O(i,n):"string"==typeof i&&(e.endsWith("href")||e.endsWith("src"))&&A(i)&&(t.options[e]=C(i,n))}O(t.children,n)}function O(t,n){for(const e of t)for(const t of e)"string"!=typeof t&&L(t,n)}async function D(t,n,e=[]){const i=[];for(const o of t)try{const t=new URL(o,n);if(!t.pathname.endsWith(".urls")&&!t.pathname.endsWith(".urls.txt")){i.push(t.href);continue}if(e.includes(t.href))continue;const s=await fetch(t.href);if(!s.ok)continue;i.push(...await U(await s.text(),t.href,e.concat(t.href)))}catch(t){console.log(t)}return i}async function U(t,n,e=[]){const i=h("["+t+"]");if(!Array.isArray(i))return[];const o=[];for(const t of i)"string"==typeof t&&o.push(t);return await D(o,n,e)}function _(t){const n=[];for(const e of t)n.push(k(e));return n.join("\n")}function k(t){let n="";for(const e of t)n+="string"!=typeof e?W(e):e;return n}function W(t){return _(t.children)}function E(t){for(const n of t){const t=N(n);if(t.length>0)return t}return""}function N(t){let n="";for(const e of t)n+="string"!=typeof e?$(e):e;return n}function $(t){return E(t.children)}function q(t){return Array.from(t.slice(0,100).matchAll(/[a-zA-Z0-9]+/g)).join("-").toLowerCase()}function P(t,n,e){const i=e[n];return void 0===i?[]:i[t]??[]}function R(t,n,e){const i=P(t,n,e);if(0!==i.length)return i[i.length-1]}function G(t,n){const e=n[t];if(void 0===e)return[];const i=e.__;return void 0===i?[]:i.flat()}function H(t,n,e){const i=P(t,n,e),o=[];for(const t of i)"string"==typeof t&&o.push(t);return o}async function M(t,n,e,i){return await D(H(t,n,e),i)}async function F(t,n,e={}){0===n.length&&(n=location.href);const i={},o={};void 0!==e.builtInTagToUnitCompiler&&Object.assign(o,e.builtInTagToUnitCompiler);const s=[],r=[],a=(e.headSTDN??[]).concat(t).concat(e.footSTDN??[]);for(const t of a){if(0===t.length)continue;const n=t[0];if("string"!=typeof n)if("global"!==n.tag){if(!0===n.options.global){let t=i[n.tag];void 0===t&&(i[n.tag]=t={}),void 0===t.__?t.__=[n.children]:t.__.push(n.children);for(const e of Object.keys(n.options)){if("global"===e||"__"===e)continue;const i=n.options[e];if(void 0===i)continue;const o=t[e];void 0===o?t[e]=[i]:o.push(i)}}}else{const t=n.options.mod;"string"==typeof t&&(s.push(`https://cdn.jsdelivr.net/gh/st-mod/${t}/main.css`),r.push(`https://cdn.jsdelivr.net/gh/st-mod/${t}/ucs.js`));const e=n.options.css;"string"==typeof e&&s.push(`https://cdn.jsdelivr.net/gh/st-mod/${e}/main.css`);const i=n.options.ucs;"string"==typeof i&&r.push(`https://cdn.jsdelivr.net/gh/st-mod/${i}/ucs.js`);{const t=n.options["mod-gh"];"string"==typeof t&&(s.push(`https://cdn.jsdelivr.net/gh/${t}/main.css`),r.push(`https://cdn.jsdelivr.net/gh/${t}/ucs.js`))}{const t=n.options["css-gh"];"string"==typeof t&&s.push(`https://cdn.jsdelivr.net/gh/${t}/main.css`)}{const t=n.options["ucs-gh"];"string"==typeof t&&r.push(`https://cdn.jsdelivr.net/gh/${t}/ucs.js`)}{const t=n.options["css-src"];"string"==typeof t&&s.push(t)}{const t=n.options["ucs-src"];"string"==typeof t&&r.push(t)}}}const c=(await D(s,n)).map((t=>`@import ${JSON.stringify(t)};`)).join("");void 0!==e.style&&(e.style.textContent=c);for(const t of await D(r,n))try{Object.assign(o,await new Function(`return import(${JSON.stringify(t)})`)())}catch(t){console.log(t)}const l=new V(i);return l.countSTDN(t),{css:c,dir:n,indexInfoArray:l.indexInfoArray,idToIndexInfo:l.idToIndexInfo,tagToGlobalOptions:i,tagToUnitCompiler:o,title:l.title,unitToId:l.unitToId,root:e.root??window}}t.r(a),t.d(a,{Counter:()=>V});class V{constructor(t){this.tagToGlobalOptions=t,this.currentHeadingIndex=[],this.orbitToCurrentIndex={},this.baseIdToCount={},this.indexInfoArray=[],this.idToIndexInfo={},this.unitToId=new Map,this.title=""}createIndex(t,n){if("heading"===t){if(this.currentHeadingIndex.length<n)for(let t=this.currentHeadingIndex.length;t<n;t++)this.currentHeadingIndex.push(0);else{for(let t=n;t<this.currentHeadingIndex.length;t++)this.currentHeadingIndex[t]=0;for(const t of Object.keys(this.orbitToCurrentIndex)){const e=this.orbitToCurrentIndex[t];if(!(void 0===e||e.length<n))for(let t=n;t<e.length;t++)e[t]=0}}return this.currentHeadingIndex[n-1]++,this.currentHeadingIndex.slice(0,n)}let e=this.orbitToCurrentIndex[t];if(void 0===e&&(e=[],this.orbitToCurrentIndex[t]=e),e.length<n)for(let t=e.length;t<n;t++)e.push(0);if(this.currentHeadingIndex.length<n-1)for(let t=this.currentHeadingIndex.length;t<n-1;t++)this.currentHeadingIndex.push(0);const i=this.currentHeadingIndex.slice(0,n-1);return i.push(++e[n-1]),i}countUnit(t){if("global"===t.tag||!0===t.options.global||!0===(t.options["no-count"]??R("no-count",t.tag,this.tagToGlobalOptions)))return;0===this.title.length&&"title"===t.tag&&(this.title=$(t));const n=q("string"==typeof t.options.id?t.options.id:$(t)),e=this.baseIdToCount[n]=(this.baseIdToCount[n]??0)+1,i=e>1||0===n.length?`${n}~${e}`:n;let o=t.options.orbit??R("orbit",t.tag,this.tagToGlobalOptions);"string"==typeof o&&0!==o.length||(o="h1"===t.tag||"h2"===t.tag||"h3"===t.tag||"h4"===t.tag||"h5"===t.tag||"h6"===t.tag?"heading":t.tag);let s=t.options.level??R("level",t.tag,this.tagToGlobalOptions)??R("level",o,this.tagToGlobalOptions);if("number"!=typeof s||s<=0||s%1!=0)switch(t.tag){case"h2":s=2;break;case"h3":s=3;break;case"h4":s=4;break;case"h5":s=5;break;case"h6":s=6;break;default:s=1}const r={index:this.createIndex(o,s),id:i,orbit:o,unit:t};this.indexInfoArray.push(r),this.idToIndexInfo[i]=r,this.unitToId.set(t,i);for(const n of Object.keys(t.options)){const e=t.options[n];Array.isArray(e)&&this.countSTDN(e)}this.countSTDN(t.children)}countSTDN(t){for(const n of t)for(const t of n)"string"!=typeof t&&this.countUnit(t)}}const z=["address","article","aside","footer","header","h1","h2","h3","h4","h5","h6","main","nav","section","blockquote","dd","div","dl","dt","figcaption","figure","hr","li","ol","p","pre","ul","a","abbr","b","bdi","bdo","br","cite","code","data","dfn","em","i","kbd","mark","q","rp","rt","ruby","s","samp","small","span","strong","sub","sup","time","u","var","wbr","area","audio","img","map","track","video","iframe","del","ins","caption","col","colgroup","table","tbody","td","tfoot","th","thead","tr"],X=["a","abbr","b","bdi","bdo","br","cite","code","data","dfn","em","i","kbd","mark","q","rp","rt","ruby","s","samp","small","span","strong","sub","sup","time","u","var","wbr","audio","img","track","video","iframe","del","ins","col","colgroup","table","tbody","tfoot","thead","tr"],Y=["animate","animateMotion","circle","clipPath","ellipse","foreignObject","g","image","mask","path","pattern","rect","svg","text","textPath","tspan","use"],B=["accesskey","align","allow","alt","autoplay","cite","class","cols","colspan","controls","coords","crossorigin","datetime","decoding","default","dir","download","draggable","for","headers","href","hreflang","id","kind","label","lang","loop","muted","name","open","ping","poster","preload","referrerpolicy","rel","reversed","rows","rowspan","sandbox","scope","span","spellcheck","src","srcdoc","srclang","srcset","start","style","tabindex","target","title","translate","usemap","value","attributeName","begin","d","dur","fill","keyPoints","keyTimes","path","preserveAspectRatio","repeatCount","rotate","textLength","values","viewBox","x","y","width","height"];class J{constructor(t){this.context=t,this.supportedHTMLTags=z,this.supportedHTMLTagsWithInlineChildren=X,this.supportedSVGTags=Y,this.supportedHTMLAttributes=B,this.ston=e,this.stdn=i,this.base=s,this.urls=o,this.counter=a,this.extractor=r,this.compile=K,this.multiCompile=Z,this.unitToCompiling=new Map}createErrorElement(t){const n=document.createElement("span");return n.classList.add("unit","warn"),n.textContent=t,n}async compileUnit(t){if(!0===this.unitToCompiling.get(t))return this.createErrorElement("Loop");if("global"===t.tag||!0===t.options.global){const t=document.createElement("div");return t.classList.add("unit","global"),t}this.unitToCompiling.set(t,!0);let n=t.options["compile-with"]??R("compile-with",t.tag,this.context.tagToGlobalOptions);"string"==typeof n&&0!==n.length||(n=t.tag);const e=this.context.tagToUnitCompiler[n];let i;if(void 0!==e){try{i=await e(t,this)}catch(t){console.log(t),i=this.createErrorElement("Broken")}if(i.classList.contains("unit")&&i.classList.contains("warn"))return this.unitToCompiling.set(t,!1),i}else z.includes(n)?(i=document.createElement(n),X.includes(n)?i.append(await this.compileInlineSTDN(t.children)):i.append(await this.compileSTDN(t.children))):Y.includes(n)?(i=document.createElementNS("http://www.w3.org/2000/svg",n),i.append(await this.compileInlineSTDN(t.children))):(i=document.createElement("div"),i.append(await this.compileSTDN(t.children)));i.classList.add("unit");try{i.classList.add(n),"string"==typeof t.options.class&&i.classList.add(...t.options.class.trim().split(/\s+/));for(const n of P("class",t.tag,this.context.tagToGlobalOptions))"string"==typeof n&&i.classList.add(...n.trim().split(/\s+/))}catch(t){console.log(t)}const o=this.context.unitToId.get(t);void 0!==o&&(i.id=o);for(const n of Object.keys(t.options)){if("id"===n||"class"===n)continue;let e=n;if(n.startsWith("data-")||B.includes(n)||(e=`data-${n}`),i.hasAttribute(e))continue;let o=t.options[n];if(!0===o?o="":"number"==typeof o&&(o=o.toString()),"string"==typeof o){this.context.dir.length>0&&e.endsWith("href")&&A(o)&&(o=C(o,this.context.dir));try{i.setAttribute(e,o)}catch(t){console.log(t)}}}return this.unitToCompiling.set(t,!1),i}async compileInline(t){return"string"!=typeof t?await this.compileUnit(t):new Text(t)}async compileLine(t){const n=new DocumentFragment;for(const e of t)n.append(await this.compileInline(e));return n}async compileInlineSTDN(t){const n=new DocumentFragment;for(let e=0;e<t.length;e++)n.append(await this.compileLine(t[e])),e!==t.length-1&&n.append(new Text("\n"));return n}async compileSTDN(t){const n=new DocumentFragment;for(const e of t){const t=document.createElement("div");t.classList.add("st-line"),n.append(t),t.append(await this.compileLine(e))}return n}}async function K(t,n="",e={}){const i=v(t);if(void 0===i)return;const o=await F(i,n,e),s=new J(o);return{documentFragment:await s.compileSTDN(i),compiler:s,doc:i}}async function Z(t,n={}){const e=[],i=[];for(const{string:n,dir:o}of t){const t=v(n);void 0!==t?(O(t,o),e.push(...t),i.push(t.length)):i.push(0)}const o=await F(e,"",n),s=new J(o);return{documentFragment:await s.compileSTDN(e),partLengths:i,compiler:s,doc:e}}var Q=n.Si,tt=n.AT,nt=n.MY,et=n.l7,it=n.gh,ot=n.Rs,st=n.t$,rt=n.aV,at=n.XY,ct=n.qP,lt=n.VO,dt=n.wS,ut=n.Xg,ht=n.TA,ft=n.wT,pt=n.r$,gt=n.tC,mt=n.q0,yt=n.xU,bt=n.AG,vt=n._C,Tt=n.lV,xt=n.$P,St=n.Iz,It=n.c4,wt=n.dt,jt=n.FW;export{Q as Compiler,tt as Counter,nt as compile,et as extractContext,it as extractGlobalChildren,ot as extractGlobalOptionArray,st as extractGlobalStrings,rt as extractGlobalURLs,at as extractLastGlobalOption,ct as fixURLInSTDN,lt as fixURLInUnit,dt as isRelURL,ut as lineToInlinePlainString,ht as lineToPlainString,ft as multiCompile,pt as relURLToAbsURL,gt as stdnToInlinePlainString,mt as stdnToPlainString,yt as stringToId,bt as supportedHTMLAttributes,vt as supportedHTMLTags,Tt as supportedHTMLTagsWithInlineChildren,xt as supportedSVGTags,St as unitToInlinePlainString,It as unitToPlainString,wt as urlsStrToAbsURLs,jt as urlsToAbsURLs};