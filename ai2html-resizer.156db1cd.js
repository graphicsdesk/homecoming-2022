parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"bSCl":[function(require,module,exports) {
"use strict";function t(){const t=document.querySelectorAll(".g-artboard[data-min-width]"),e={};t.forEach(t=>{const n=t.parentNode,i=e[n.id]||n.getBoundingClientRect().width,l=t.getAttribute("data-min-width"),o=t.getAttribute("data-max-width");e[n.id]=i,t.style.display=+l<=i&&(+o>=i||null===o)?"block":"none"})}function e(){document.documentElement.classList.contains("g-resizer-v3-init")||(document.documentElement.classList.add("g-resizer-v3-init"),t(),window.addEventListener("resize",n(t,200)))}function n(t,e){let n,i,l,o,d=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},a=0;const u=Date.now||(()=>(new Date).getTime()),c=function(){a=!1===d.leading?0:u(),n=null,o=t.apply(i,l),n||(i=l=null)};return function(){const r=u();a||!1!==d.leading||(a=r);const s=e-(r-a);return i=this,l=arguments,s<=0||s>e?(n&&(clearTimeout(n),n=null),a=r,o=t.apply(i,l),n||(i=l=null)):n||!1===d.trailing||(n=setTimeout(c,s)),o}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=e;
},{}]},{},["bSCl"], "script")
//# sourceMappingURL=https://spectator-static-assets.s3.amazonaws.com/homecoming-2022/ai2html-resizer.156db1cd.js.map