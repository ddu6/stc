var t={d:(n,e)=>{for(var o in e)t.o(e,o)&&!t.o(n,o)&&Object.defineProperty(n,o,{enumerable:!0,get:e[o]})},o:(t,n)=>Object.prototype.hasOwnProperty.call(t,n),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},n={};t.d(n,{Si:()=>X,AT:()=>_,MY:()=>Y,yd:()=>J,h8:()=>z,l7:()=>F,gh:()=>j,Rs:()=>E,t$:()=>k,aV:()=>N,XY:()=>M,kC:()=>R,OO:()=>H,Ws:()=>$,fK:()=>D,wS:()=>m,Xg:()=>A,TA:()=>w,yr:()=>G,dG:()=>U,tC:()=>O,TW:()=>C,q0:()=>L,xU:()=>P,_C:()=>B,lV:()=>V,$P:()=>q,Iz:()=>S,c4:()=>I,od:()=>W,dt:()=>y,FW:()=>b});var e={};t.r(e),t.d(e,{parse:()=>u});var o={};t.r(o),t.d(o,{parse:()=>g});var i={};t.r(i),t.d(i,{isRelURL:()=>m,urlsStrToAbsURLs:()=>y,urlsToAbsURLs:()=>b});var s={};t.r(s),t.d(s,{parsePositionStr:()=>T,positionToUnitOrLines:()=>v,stringifyPosition:()=>x});var r={};t.r(r),t.d(r,{lineToInlinePlainString:()=>A,lineToPlainString:()=>w,stdnToInlinePlainString:()=>O,stdnToInlinePlainStringLine:()=>C,stdnToPlainString:()=>L,stringToId:()=>P,unitToInlinePlainString:()=>S,unitToPlainString:()=>I});var a={};t.r(a),t.d(a,{removeAfter:()=>G,removeBefore:()=>U});var c={};t.r(c),t.d(c,{extractContext:()=>F,extractGlobalChildren:()=>j,extractGlobalOptionArray:()=>E,extractGlobalStrings:()=>k,extractGlobalURLs:()=>N,extractLastGlobalOption:()=>M,extractPartToOffset:()=>R,extractUnitOrLineToHeading:()=>H,extractUnitOrLineToPart:()=>$,extractUnitOrLineToPosition:()=>D,urlToAbsURL:()=>W});var l={};function f(t,n=!1){let e=0,o=!1,i=!1,s=0,r=!1;const a=[];for(let c=0;c<t.length;c++){if(!0===i){i=!1;continue}const l=t[c];if("line"!==r)if("block"!==r)if("'"!==l){if(o)"\\"===l&&(i=!0);else if("{"!==l&&"["!==l)if("}"!==l&&"]"!==l){if(!(e>0))if(","!==l&&"\n"!==l){if(!(s<c))if(0!==l.trimEnd().length){if("/"===l){const n=t[c+1];if("/"===n){c++,r="line",s=c+1;continue}if("*"===n){c++,r="block",s=c+1;continue}}}else s=c+1}else{const n=t.slice(s,c).trimEnd();n.length>0&&a.push(n),s=c+1}}else{if(e--,e<0){const n=t.slice(s,c).trimEnd();n.length>0&&a.push(n);break}0===e&&(a.push(t.slice(s,c+1)),s=c+1)}else if(e++,1===e&&!n){const n=t.slice(s,c).trimEnd();n.length>0&&a.push(n),s=c}}else{if(!o){if(o=!0,0===e&&!n){const n=t.slice(s,c).trimEnd();n.length>0&&a.push(n),s=c}continue}o=!1,0===e&&(a.push(t.slice(s,c+1)),s=c+1)}else"*"===l&&"/"===t[c+1]&&(c++,r=!1),s=c+1;else"\n"===l&&(r=!1),s=c+1}if(!o&&0===e){const n=t.slice(s).trimEnd();n.length>0&&a.push(n)}return a}function u(t){if(0===(t=t.trimStart()).length)return;const n=t[0];return"'"===n?function(t){const n=[];let e=!1;for(const o of t)if(!0!==e)if("\\"!==o){if("'"===o)break;n.push(o)}else e=!0;else e=!1,"\\"!==o&&"'"!==o&&n.push("\\"),n.push(o);return n.join("")}(t.slice(1)):"["===n?function(t){const n=[];for(const e of f(t)){const t=u(e);if(void 0===t)return;n.push(t)}return n}(t.slice(1)):"{"===n?function(t){const n={};for(const e of f(t,!0)){const t=e.match(/^\s*([\w-]+)/);if(null===t){const t=u(e);if(void 0===t)return;n.__=t;continue}const o=t[1],i=t[0].length;let s=e.slice(i).trimEnd();if(0===s.length)n[o]=!0;else{const t=u(s);if(void 0===t)return;n[o]=t}}return n}(t.slice(1)):"true"===(t=t.trimEnd())||"false"!==t&&(/^(?:[+-]?Infinity|NaN|0x[\dA-Fa-f]+|0o[0-7]+|0b[01]+|[+-]?(?:\d*\.?\d+|\d+\.)(?:e[+-]?\d+)?)$/.test(t)?Number(t):/[\n\r',\[\]{}]/.test(t)?void 0:t)}function h(t){let n="div",e=[];const o={};for(const i in t){const s=t[i];if(void 0!==s)if("__"!==i)Array.isArray(s)?(n=i,e=d(s)):o[i]="object"!=typeof s?s:h(s);else{if(n="katex",!Array.isArray(s)){e=d([s]);continue}e=d(s)}}return{tag:n,options:o,children:e}}function p(t){const n=[];for(const e of t)if("string"!=typeof e)"object"!=typeof e||Array.isArray(e)||n.push(h(e));else for(const t of e)t>=" "&&n.push(t);return n}function d(t){const n=[];for(const e of t)Array.isArray(e)?n.push(p(e)):n.push(p([e]));return n}function g(t){const n=u(`[${t}]`);if(Array.isArray(n))return d(n)}function m(t){return!t.startsWith("#")&&!/^[a-z][a-z0-9+.-]*:/i.test(t)}async function b(t,n,e=[]){const o=[];for(const i of t){const t=new URL(i,n);t.pathname.endsWith(".urls")||t.pathname.endsWith(".urls.txt")?e.includes(t.href)||o.push((async()=>{try{const n=await fetch(t.href);return n.ok?await y(await n.text(),t.href,e.concat(t.href)):[]}catch(t){return console.log(t),[]}})()):o.push(t.href)}return(await Promise.all(o)).flat()}async function y(t,n,e=[]){const o=u(`[${t}]`);if(!Array.isArray(o))return[];const i=[];for(const t of o)"string"==typeof t&&i.push(t);return await b(i,n,e)}function T(t){return t.trim().split(/\s+/).map((t=>/^\d+$/.test(t)?Number(t):t.startsWith('"')?t.slice(1,-1):t))}function x(t){return t.map((t=>"number"==typeof t?t:/^\d+$/.test(t)?`'${t}'`:t)).join(" ")}function v(t,n,e=0){const o=[];if(0===t.length||0===n.length)return o;const i=t[0];if("number"!=typeof i)return o;const s=n[Math.min(n.length-1,i+e)];if(void 0===s)return o;o.push(s);let r=s;for(let n=1;n<t.length;n++){const e=t[n];if("number"==typeof e){if(Array.isArray(r)){const t=r[e];if("object"!=typeof t)break;o.push(r=t);continue}const t=r.children[e];if(void 0===t)break;o.push(r=t);continue}if(Array.isArray(r))break;const i=r.options[e];if("object"!=typeof i)break;o.push(r=i)}return o}function I(t){return L(t.children)}function w(t){let n="";for(const e of t)n+="string"!=typeof e?I(e):e;return n}function L(t){const n=[];for(const e of t)n.push(w(e));return n.join("\n")}function S(t){return O(t.children)}function A(t){let n="";for(const e of t)n+="string"!=typeof e?S(e):e;return n}function O(t){for(const n of t){const t=A(n);if(t.length>0)return t}return""}function C(t){for(const n of t)if(A(n).length>0)return n;return[]}function P(t){return Array.from(t.slice(0,100).matchAll(/[a-zA-Z0-9]+/g)).join("-").toLowerCase()}function U(t,n){for(;;){for(;null!==t.previousSibling;)t.previousSibling.remove();if(null===t.parentNode||t.parentNode===n)break;t=t.parentNode}}function G(t,n){for(;;){for(;null!==t.nextSibling;)t.nextSibling.remove();if(null===t.parentNode||t.parentNode===n)break;t=t.parentNode}}function j(t,n){const e=n[t];return void 0===e?[]:e.childrenArray.flat()}function E(t,n,e){const o=e[n];return void 0===o?[]:o.optionArrays[t]??[]}function k(t,n,e){const o=E(t,n,e),i=[];for(const t of o)"string"==typeof t&&i.push(t);return i}async function N(t,n,e){return await b(k(t,n,e),location.href)}function M(t,n,e){const o=E(t,n,e);if(0!==o.length)return o[o.length-1]}function $(t){const n=new Map;function e(t,i){n.set(t,i);for(const n in t.options){const o=t.options[n];"object"==typeof o&&e(o,i)}o(t.children,i)}function o(t,o){for(const i of t){n.set(i,o);for(const t of i)"string"!=typeof t&&e(t,o)}}for(const n of t)o(n.value,n);return n}function R(t){const n=new Map;let e=0;for(const o of t)n.set(o,e),e+=o.value.length;return n}function D(t){const n=new Map;function e(t,i){n.set(t,i);for(const n in t.options){const o=t.options[n];"object"==typeof o&&e(o,i.concat(n))}o(t.children,i)}function o(t,o){for(let i=0;i<t.length;i++){const s=t[i],r=o.concat(i);n.set(s,r);for(let t=0;t<s.length;t++){const n=s[t];"string"!=typeof n&&e(n,r.concat(t))}}}return o(t,[]),n}function H(t,n){const e=new Map;if(0===n.length)return e;let o,i=0,s=n[0];function r(t){e.set(t,o),i<n.length&&t===s.unit&&(o=s,s=n[++i]);for(const n in t.options){const e=t.options[n];"object"==typeof e&&r(e)}a(t.children)}function a(t){for(const n of t){e.set(n,o);for(const t of n)"string"!=typeof t&&r(t)}}return a(t),e}function W(t,n,e){if(!m(t))return t;const o=e.get(n);if(void 0===o)return t;try{return new URL(t,o.url).href}catch(n){return console.log(n),t}}async function F(t,{builtInTagToUnitCompiler:n,style:e,headSTDN:o,footSTDN:i,root:s}={}){const r={},a={};void 0!==n&&Object.assign(a,n);const c=[],l=[],f=$(t),u=t.map((t=>t.value)).flat(),h=(o??[]).concat(u).concat(i??[]);for(const t of h){if(0===t.length)continue;const n=t[0];if("string"!=typeof n)if("global"!==n.tag){if(!0===n.options.global){let t=r[n.tag];void 0===t&&(r[n.tag]=t={optionArrays:{},childrenArray:[]});for(const e in n.options){if("global"===e||"__"===e)continue;let o=n.options[e];if(void 0===o)continue;"string"==typeof o&&(e.endsWith("href")||e.endsWith("src"))&&m(o)&&(o=W(o,n,f));const i=t.optionArrays[e];void 0!==i?i.push(o):t.optionArrays[e]=[o]}t.childrenArray.push(n.children)}}else{const t=n.options.mod;"string"==typeof t&&(c.push(`https://cdn.jsdelivr.net/gh/st-mod/${t}/main.css`),l.push(`https://cdn.jsdelivr.net/gh/st-mod/${t}/ucs.js`));const e=n.options.css;"string"==typeof e&&c.push(`https://cdn.jsdelivr.net/gh/st-mod/${e}/main.css`);const o=n.options.ucs;"string"==typeof o&&l.push(`https://cdn.jsdelivr.net/gh/st-mod/${o}/ucs.js`);{const t=n.options["mod-gh"];"string"==typeof t&&(c.push(`https://cdn.jsdelivr.net/gh/${t}/main.css`),l.push(`https://cdn.jsdelivr.net/gh/${t}/ucs.js`))}{const t=n.options["css-gh"];"string"==typeof t&&c.push(`https://cdn.jsdelivr.net/gh/${t}/main.css`)}{const t=n.options["ucs-gh"];"string"==typeof t&&l.push(`https://cdn.jsdelivr.net/gh/${t}/ucs.js`)}{const t=n.options["css-src"];"string"==typeof t&&c.push(W(t,n,f))}{const t=n.options["ucs-src"];"string"==typeof t&&l.push(W(t,n,f))}}}const p=(await b(c,location.href)).map((t=>`@import ${JSON.stringify(t)};`)).join("");void 0!==e&&(e.textContent=p);for(const t of await b(l,location.href))try{Object.assign(a,await new Function(`return import(${JSON.stringify(t)})`)())}catch(t){console.log(t)}const d=new _(r);d.countSTDN(u);const{headings:g,idToIndexInfo:y,indexInfoArray:T,title:x,titleInfo:v,unitToId:I}=d,w=R(t),L=H(u,g),S=D(u);return{css:p,fullSTDN:h,headings:g,indexInfoArray:T,idToIndexInfo:y,parts:t,partToOffset:w,stdn:u,tagToGlobalOptions:r,tagToUnitCompiler:a,title:x,titleInfo:v,unitToId:I,unitOrLineToHeading:L,unitOrLineToPart:f,unitOrLineToPosition:S,root:s,extractGlobalChildren:t=>j(t,r),extractGlobalOptionArray:(t,n)=>E(t,n,r),extractGlobalStrings:(t,n)=>k(t,n,r),extractGlobalURLs:(t,n)=>N(t,n,r),extractLastGlobalOption:(t,n)=>M(t,n,r),urlToAbsURL:(t,n)=>W(t,n,f)}}t.r(l),t.d(l,{Counter:()=>_});class _{constructor(t){this.tagToGlobalOptions=t,this.currentHeadingIndex=[],this.orbitToCurrentIndex={},this.baseIdToCount={},this.headings=[],this.idToIndexInfo={},this.indexInfoArray=[],this.unitToId=new Map,this.title=""}createIndex(t,n){if("heading"===t){if(this.currentHeadingIndex.length<n)for(let t=this.currentHeadingIndex.length;t<n;t++)this.currentHeadingIndex.push(0);else{for(let t=n;t<this.currentHeadingIndex.length;t++)this.currentHeadingIndex[t]=0;for(const t in this.orbitToCurrentIndex){const e=this.orbitToCurrentIndex[t];if(!(void 0===e||e.length<n))for(let t=n;t<e.length;t++)e[t]=0}}return this.currentHeadingIndex[n-1]++,this.currentHeadingIndex.slice(0,n)}let e=this.orbitToCurrentIndex[t];if(void 0===e&&(e=[],this.orbitToCurrentIndex[t]=e),e.length<n)for(let t=e.length;t<n;t++)e.push(0);if(this.currentHeadingIndex.length<n-1)for(let t=this.currentHeadingIndex.length;t<n-1;t++)this.currentHeadingIndex.push(0);const o=this.currentHeadingIndex.slice(0,n-1);return o.push(++e[n-1]),o}countUnit(t){if("global"===t.tag||!0===t.options.global||!0===(t.options["no-count"]??M("no-count",t.tag,this.tagToGlobalOptions))||void 0!==this.unitToId.get(t))return;const n=P("string"==typeof t.options.id?t.options.id:S(t)),e=this.baseIdToCount[n]=(this.baseIdToCount[n]??0)+1,o=e>1||0===n.length?`${n}~${e}`:n;this.unitToId.set(t,o);let i=t.options.orbit??M("orbit",t.tag,this.tagToGlobalOptions);"string"==typeof i&&0!==i.length||(i="h1"===t.tag||"h2"===t.tag||"h3"===t.tag||"h4"===t.tag||"h5"===t.tag||"h6"===t.tag?"heading":t.tag);let s=t.options.level??M("level",t.tag,this.tagToGlobalOptions)??M("level",i,this.tagToGlobalOptions);if("number"!=typeof s||s<=0||s%1!=0)switch(t.tag){case"h2":s=2;break;case"h3":s=3;break;case"h4":s=4;break;case"h5":s=5;break;case"h6":s=6;break;default:s=1}const r={index:this.createIndex(i,s),id:o,orbit:i,unit:t};if(this.idToIndexInfo[o]=r,this.indexInfoArray.push(r),"heading"===i&&this.headings.push(r),0===this.title.length&&"title"===t.tag&&(this.title=S(t),this.titleInfo=r),!0!==(t.options["no-count-inside"]??M("no-count-inside",t.tag,this.tagToGlobalOptions))){for(const n in t.options){const e=t.options[n];"object"==typeof e&&this.countUnit(e)}this.countSTDN(t.children)}}countSTDN(t){for(const n of t)for(const t of n)"string"!=typeof t&&this.countUnit(t)}}const B=["address","article","aside","footer","header","h1","h2","h3","h4","h5","h6","main","nav","section","blockquote","dd","div","dl","dt","figcaption","figure","hr","li","ol","p","pre","ul","a","abbr","b","bdi","bdo","br","cite","code","data","dfn","em","i","kbd","mark","q","rp","rt","ruby","s","samp","small","span","strong","sub","sup","time","u","var","wbr","area","audio","img","map","track","video","iframe","del","ins","caption","col","colgroup","table","tbody","td","tfoot","th","thead","tr"],V=["a","abbr","b","bdi","bdo","br","cite","code","data","dfn","em","i","kbd","mark","q","rp","rt","ruby","s","samp","small","span","strong","sub","sup","time","u","var","wbr","area","audio","img","map","track","video","iframe","del","ins","col","colgroup","table","tbody","tfoot","thead","tr"],q=["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence","filter","animate","animateMotion","animateTransform","circle","clipPath","defs","desc","ellipse","g","image","line","linearGradient","marker","mask","mpath","path","pattern","polygon","polyline","radialGradient","rect","set","stop","svg","symbol","text","textPath","tspan","use"];function z(t){const n=document.createElement("span");return n.classList.add("unit","warn"),n.textContent=t,n}class X{constructor(t){this.context=t,this.ston=e,this.stdn=o,this.position=s,this.base=r,this.urls=i,this.dom=a,this.counter=l,this.extractor=c,this.compile=Y,this.supportedHTMLTags=B,this.supportedHTMLTagsWithInlineChildren=V,this.supportedSVGTags=q,this.createErrorElement=z,this.elementToUnitOrLine=new Map,this.unitOrLineToElements=new Map,this.unitToCompiling=new Map}registerElement(t,n){this.elementToUnitOrLine.set(t,n);let e=this.unitOrLineToElements.get(n);void 0===e&&this.unitOrLineToElements.set(n,e=[]),e.push(t)}async compileUnit(t){if(!0===this.unitToCompiling.get(t)){const n=this.createErrorElement("Loop");return this.registerElement(n,t),n}if("global"===t.tag||!0===t.options.global){const n=document.createElement("div");return n.classList.add("unit","global"),this.registerElement(n,t),n}this.unitToCompiling.set(t,!0);let n=t.options["compile-with"]??M("compile-with",t.tag,this.context.tagToGlobalOptions);"string"==typeof n&&0!==n.length||(n=t.tag);const e=this.context.tagToUnitCompiler[n];let o;if(void 0!==e){try{o=await e(t,this)}catch(t){console.log(t),o=this.createErrorElement("Broken")}if(o.classList.contains("unit")&&o.classList.contains("warn"))return this.registerElement(o,t),this.unitToCompiling.set(t,!1),o}else B.includes(n)?(o=document.createElement(n),V.includes(n)?o.append(await this.compileInlineSTDN(t.children)):o.append(await this.compileSTDN(t.children))):q.includes(n)?(o=document.createElementNS("http://www.w3.org/2000/svg",n),o.append(await this.compileInlineSTDN(t.children))):(o=document.createElement("div"),o.append(await this.compileSTDN(t.children)));o.classList.add("unit");try{o.classList.add(n),"string"==typeof t.options.class&&o.classList.add(...t.options.class.trim().split(/\s+/));for(const n of E("class",t.tag,this.context.tagToGlobalOptions))"string"==typeof n&&o.classList.add(...n.trim().split(/\s+/))}catch(t){console.log(t)}const i=[];let s=o.getAttribute("style");null!==s&&i.push(s),"string"==typeof t.options.style&&i.push(t.options.style);for(const n of E("style",t.tag,this.context.tagToGlobalOptions))"string"==typeof n&&i.push(n);if(i.length>0)try{o.setAttribute("style",i.join("; "))}catch(t){console.log(t)}const r=this.context.unitToId.get(t);void 0!==r&&(o.id=r);for(const n in t.options){if("id"===n||"class"===n||"style"===n)continue;if(o.hasAttribute(n))continue;let e=t.options[n];if(!0===e?e="":"number"==typeof e&&(e=e.toString()),"string"==typeof e){(n.endsWith("href")||n.endsWith("src"))&&m(e)&&(e=this.context.urlToAbsURL(e,t));try{o.setAttribute(n,e)}catch(t){console.log(t)}}}return this.registerElement(o,t),this.unitToCompiling.set(t,!1),o}async compileInline(t){return"string"!=typeof t?await this.compileUnit(t):new Text(t)}async compileLine(t){const n=new DocumentFragment;for(const e of t)n.append(await this.compileInline(e));return n}async compileInlineSTDN(t){const n=new DocumentFragment;for(let e=0;e<t.length;e++)n.append(await this.compileLine(t[e])),e!==t.length-1&&n.append(new Text("\n"));return n}async compileSTDN(t){const n=new DocumentFragment;for(const e of t){const t=document.createElement("div");t.classList.add("st-line"),n.append(t),t.append(await this.compileLine(e)),this.registerElement(t,e)}return n}}async function Y(t,n={}){const e=[];for(const{value:n,url:o}of t){const t=g(n);void 0!==t&&e.push({value:t,url:o})}const o=await F(e,n),i=new X(o);return{compiler:i,documentFragment:await i.compileSTDN(o.stdn)}}async function J(t,n={}){const e=[];for(const n of await b(t,location.href))e.push((async()=>{try{const t=await fetch(n);return t.ok?[{value:await t.text(),url:n}]:[]}catch(t){return console.log(t),[]}})());return await Y((await Promise.all(e)).flat(),n)}var K=n.Si,Z=n.AT,Q=n.MY,tt=n.yd,nt=n.h8,et=n.l7,ot=n.gh,it=n.Rs,st=n.t$,rt=n.aV,at=n.XY,ct=n.kC,lt=n.OO,ft=n.Ws,ut=n.fK,ht=n.wS,pt=n.Xg,dt=n.TA,gt=n.yr,mt=n.dG,bt=n.tC,yt=n.TW,Tt=n.q0,xt=n.xU,vt=n._C,It=n.lV,wt=n.$P,Lt=n.Iz,St=n.c4,At=n.od,Ot=n.dt,Ct=n.FW;export{K as Compiler,Z as Counter,Q as compile,tt as compileURLs,nt as createErrorElement,et as extractContext,ot as extractGlobalChildren,it as extractGlobalOptionArray,st as extractGlobalStrings,rt as extractGlobalURLs,at as extractLastGlobalOption,ct as extractPartToOffset,lt as extractUnitOrLineToHeading,ft as extractUnitOrLineToPart,ut as extractUnitOrLineToPosition,ht as isRelURL,pt as lineToInlinePlainString,dt as lineToPlainString,gt as removeAfter,mt as removeBefore,bt as stdnToInlinePlainString,yt as stdnToInlinePlainStringLine,Tt as stdnToPlainString,xt as stringToId,vt as supportedHTMLTags,It as supportedHTMLTagsWithInlineChildren,wt as supportedSVGTags,Lt as unitToInlinePlainString,St as unitToPlainString,At as urlToAbsURL,Ot as urlsStrToAbsURLs,Ct as urlsToAbsURLs};