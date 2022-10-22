// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"jTpY0":[function(require,module,exports) {
"use strict";
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "f1229281419890e5";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, globalThis, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/"); // Web extension context
    var extCtx = typeof chrome === "undefined" ? typeof browser === "undefined" ? null : browser : chrome; // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    } // $FlowFixMe
    ws.onmessage = async function(event) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        acceptedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH); // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear(); // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] ✨ Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>📝 <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", link.getAttribute("href").split("?")[0] + "?" + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension bugfix for Chromium
                    // https://bugs.chromium.org/p/chromium/issues/detail?id=1255412#c12
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3) {
                        if (typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                            extCtx.runtime.reload();
                            return;
                        }
                        asset.url = extCtx.runtime.getURL("/__parcel_hmr_proxy__?url=" + encodeURIComponent(asset.url + "?t=" + Date.now()));
                        return hmrDownload(asset);
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
             // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id]; // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) return true;
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"98uA4":[function(require,module,exports) {
var _canvas = require("@daeinc/canvas");
var _indexJs = require("../dist/index.js");
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
const width = 500;
const height = 500;
canvas.width = width;
canvas.height = height;
document.body.appendChild(canvas);
let count = 0;
function loop() {
    ctx.fillStyle = "lightgray";
    ctx.fillRect(0, 0, width, height);
    const pt = [
        50 + Math.cos(count * 0.03) * 30,
        50 + Math.sin(count * 0.02) * 30, 
    ];
    const path = [
        [
            10,
            10
        ],
        [
            40,
            50
        ],
        [
            10,
            90
        ], 
    ];
    const line = [
        [
            100,
            Math.sin(count * 0.01) * 50 + 50
        ],
        [
            0,
            Math.cos(count * 0.01) * 50 + 50
        ], 
    ];
    const projPt = (0, _indexJs.projectPointOnLine)(pt, line);
    const reflPt = (0, _indexJs.reflectPoint)(pt, line);
    const reflPath = (0, _indexJs.reflectPath)(path, line);
    ctx.save();
    ctx.translate(200, 200);
    ctx.fillStyle = "rgba(255,255,255,0.5)";
    ctx.fillRect(0, 0, 100, 100);
    ctx.beginPath();
    ctx.arc(pt[0], pt[1], 3, 0, Math.PI * 2);
    ctx.fillStyle = "black";
    ctx.fill();
    (0, _canvas.drawPath)(ctx, line);
    ctx.stroke();
    // perpendicular line
    (0, _canvas.drawPath)(ctx, [
        pt,
        reflPt
    ]);
    ctx.strokeStyle = "gray";
    ctx.stroke();
    // projected point
    ctx.beginPath();
    ctx.arc(projPt[0], projPt[1], 2, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();
    // reflected point
    ctx.beginPath();
    ctx.arc(reflPt[0], reflPt[1], 3, 0, Math.PI * 2);
    ctx.fillStyle = "green";
    ctx.fill();
    // original path
    (0, _canvas.drawPath)(ctx, path);
    ctx.strokeStyle = "gray";
    ctx.stroke();
    (0, _canvas.drawPath)(ctx, reflPath);
    ctx.strokeStyle = "gray";
    ctx.stroke();
    ctx.restore();
    count++;
    window.requestAnimationFrame(loop);
}
loop();

},{"../dist/index.js":"7elyk","@daeinc/canvas":"1gUgL"}],"7elyk":[function(require,module,exports) {
"use strict";
var __importDefault = this && this.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.combinePath = exports.calcTByLength = exports.scalePath = exports.scalePoint = exports.reflectPath = exports.reflectPoint = exports.projectPointOnLine = exports.interpolate = exports.interpolateObject = exports.interpolateArray = exports.interpolatePath = exports.extrudePath = exports.getPathLength = exports.distSq = exports.dist = exports.createShapeFunc = exports.blendPath = void 0;
const math_1 = require("@daeinc/math");
const gl_vec2_1 = __importDefault(require("gl-vec2"));
/**
 * generates an array of paths (excl. original 2 paths)
 *
 * TODO:
 * - guidePath: input another path to use as shaping path.
 *   this path should already be resampled so that path points can be used as numBlends,
 *   or use numBlends param to resample within this function.
 * @param path1 array of [x, y] to blend from
 * @param path2 array of [x, y] to blend to
 * @param numBlends how many blended paths to generate (excl. two original paths)
 * @param guidePath optional. custom path that blended paths will follow along.
 * @returns 3d array of paths [number of blends][each blended path][x, y]
 */ const blendPath = (path1, path2, numBlends, guidePath)=>{
    return Array(numBlends).fill([]).map((_, i)=>{
        const t = (i + 1) / (numBlends + 1);
        return (0, exports.interpolatePath)(path1, path2, t);
    });
};
exports.blendPath = blendPath;
/**
 * the resulting function is transformed to draw from center [0, 0]
 * @param pts must be a normalized array (0..1) of [x, y]s
 * @param anchor normalized center point [x, y]
 * @returns function to draw shape with given params (x,y,w,h)
 */ const createShapeFunc = (pts, anchor = [
    0.5,
    0.5
])=>{
    return (x, y, w, h)=>pts.map((pt)=>{
            const xdiff = pt[0] - anchor[0];
            const ydiff = pt[1] - anchor[1];
            return [
                x + xdiff * w,
                y + ydiff * h
            ];
        });
};
exports.createShapeFunc = createShapeFunc;
/**
 * calculate distance between two point[]s
 * @param pt1
 * @param pt2
 * @returns
 */ const dist = (pt1, pt2)=>{
    return Math.sqrt(Math.pow(pt2[0] - pt1[0], 2) + Math.pow(pt2[1] - pt1[1], 2));
};
exports.dist = dist;
/**
 * squared distance (x^2 + y^2) between two point[]s
 * @param pt1
 * @param pt2
 * @returns
 */ const distSq = (pt1, pt2)=>{
    return Math.pow(pt2[0] - pt1[0], 2) + Math.pow(pt2[1] - pt1[1], 2);
};
exports.distSq = distSq;
/**
 * take an array of points and return total length of path
 * @param path array of [ x, y ] points
 * @returns total length of path
 */ const getPathLength = (path)=>{
    return path.reduce((totalLen, pt, i, arr)=>{
        if (arr.length < 2) return 0; // handle single point length
        if (i === arr.length - 1) return totalLen; // skip last one (no i+1 there)
        return totalLen + Math.sqrt(Math.pow(arr[i + 1][0] - arr[i][0], 2) + Math.pow(arr[i + 1][1] - arr[i][1], 2));
    }, 0);
};
exports.getPathLength = getPathLength;
/**
 * extrude path in 2d space
 *
 * TODO:
 * - instead of preventing numPoints<path length, continue to extrude. use modulo.
 * - add custom shapeFunc
 * @param path array of [ x, y ]
 * @param numPointsToExtrude how many points to use for extruding (mirroring). useful when extruding same path again.
 * @param offset [ x, y ] how much +/- in each dimension
 * @param mode start (reverse direction) | end | both (closed path)
 * @param shapeFunc optional. function on how to extrude if other than straight line
 * @returns path
 */ const extrudePath = (path, numPointsToExtrude, offset, mode = "end", shapeFunc)=>{
    if (numPointsToExtrude > path.length) throw new Error("extrudePath(): numPointsToExtrude can't exceed length of path");
    const clone = [
        ...path
    ];
    if (mode === "end") for(let i = path.length - 1; i >= path.length - numPointsToExtrude; i--){
        const pt = path[i];
        clone.push([
            pt[0] + offset[0],
            pt[1] + offset[1]
        ]);
    }
    else if (mode === "start") {
        // push and reverse (faster than unshift)
        clone.reverse();
        for(let i1 = 0; i1 < numPointsToExtrude; i1++){
            const pt1 = path[i1];
            clone.push([
                pt1[0] + offset[0],
                pt1[1] + offset[1]
            ]);
        }
    // clone.reverse();
    } else if (mode === "both") {
        for(let i2 = path.length - 1; i2 >= path.length - numPointsToExtrude; i2--){
            const pt2 = path[i2];
            clone.push([
                pt2[0] + offset[0],
                pt2[1] + offset[1]
            ]);
        }
        clone.push(path[0]);
    }
    return clone;
};
exports.extrudePath = extrudePath;
/**
 * mix/lerp 2d number array. usually used for path data of [x, y]
 * @param pathStart array of [x, y] to start
 * @param pathTarget array of [x, y] to target
 * @param t 0..1
 * @returns 2d array
 */ const interpolatePath = (pathStart, pathTarget, t)=>{
    if (pathStart.length === 0 || pathTarget.length === 0) throw new Error("interpolatePath(): path cannot be empty");
    if (pathStart.length !== pathTarget.length) throw new Error("interpolatePath(): length must be same");
    return Array(pathStart.length).fill([]).map((_, i)=>{
        return [
            (0, math_1.mix)(pathStart[i][0], pathTarget[i][0], t),
            (0, math_1.mix)(pathStart[i][1], pathTarget[i][1], t), 
        ];
    });
};
exports.interpolatePath = interpolatePath;
/**
 * interpolates between two 1d array of any size. for now, numbers only.
 *
 * TODO: expand to take object, nested aray/ojbects. recursive.
 * @param arrStart array to start from
 * @param arrTarget array to interpolate to
 * @param t 0..1
 * @returns 1d array
 */ const interpolateArray = (arrStart, arrTarget, t)=>{
    if (arrStart.length === 0 || arrTarget.length === 0) throw new Error("interpolateArray(): arrays cannot be empty");
    if (arrStart.length !== arrTarget.length) throw new Error("interpolateArray(): length must be same");
    return Array(arrStart.length).fill(0).map((_, i)=>{
        return (0, math_1.mix)(arrStart[i], arrTarget[i], t);
    });
};
exports.interpolateArray = interpolateArray;
/**
 * interpolate object with {string:number}. ie. {x:10}.
 * both objects must have same keys.
 * @param objStart object to start from
 * @param objTarget object to interpolate to
 * @param t 0..1
 * @returns interpolated object
 */ const interpolateObject = (objStart, objTarget, t)=>{
    const obj = {};
    if (Object.keys(objStart).length !== Object.keys(objTarget).length) throw new Error("interpolateObject(): objects must have same keys");
    for(const key in objStart){
        if (!(key in objTarget)) throw new Error("interpolateObject(): objects must have same keys");
        obj[key] = (0, math_1.mix)(objStart[key], objTarget[key], t);
    }
    return obj;
};
exports.interpolateObject = interpolateObject;
/**
 * interpolate number, number[], number[][] or generic object
 * TODO:
 * - currently, string or boolean uses start value. (should it be t=0.5?)
 * - review TS implementation
 * - every if condition is redundant to check start AND target
 * @param start
 * @param target
 * @param t
 * @returns
 */ const interpolate = (// start: number | number[] | Pts | GenericObject,
// target: number | number[] | Pts | GenericObject,
start, target, t)=>{
    if (typeof start !== typeof target) throw new Error("interpolate(): both start and target args must be of same type");
    if (typeof start === "number" && typeof target === "number") return (0, math_1.mix)(start, target, t);
    else if (Array.isArray(start) && Array.isArray(target)) {
        if (start[0].constructor === Array && target[0].constructor === Array) // 2d array
        return (0, exports.interpolatePath)(start, target, t);
        else // 1d array
        return (0, exports.interpolateArray)(start, target, t);
    // } else if (start.constructor === Object) {
    } else if (typeof start === "object" && start !== null && typeof target === "object" && target !== null) // object
    return (0, exports.interpolateObject)(start, target, t);
    else // string or boolean
    return start;
};
exports.interpolate = interpolate;
/**
 * project a point on a line using vector.
 * @param pt point
 * @param line line segment
 * @returns point on the line
 */ const projectPointOnLine = (pt, line)=>{
    const ptVec = gl_vec2_1.default.fromValues(pt[0] - line[1][0], pt[1] - line[1][1]);
    const lineVec = gl_vec2_1.default.fromValues(line[0][0] - line[1][0], line[0][1] - line[1][1]);
    const prod = gl_vec2_1.default.dot(ptVec, lineVec);
    const proj = prod / gl_vec2_1.default.len(lineVec);
    const projVec = gl_vec2_1.default.fromValues(proj, proj);
    const result = gl_vec2_1.default.normalize(lineVec, lineVec);
    gl_vec2_1.default.mul(result, lineVec, projVec);
    gl_vec2_1.default.add(result, result, line[1]);
    return result;
};
exports.projectPointOnLine = projectPointOnLine;
/**
 * reflect a point on another point or a line
 * @param pt source point to be mirrored
 * @param axis mirror axis. either point (or line)
 * @returns
 */ const reflectPoint = (pt, axis)=>{
    if (axis[0].constructor === Array) {
        const projVec = gl_vec2_1.default.fromValues(...(0, exports.projectPointOnLine)(pt, axis));
        const distVec = gl_vec2_1.default.sub([], gl_vec2_1.default.fromValues(pt[0], pt[1]), projVec);
        const reflVec = gl_vec2_1.default.sub(projVec, projVec, distVec);
        return reflVec;
    } else return [
        (0, math_1.reflect)(pt[0], axis[0]),
        (0, math_1.reflect)(pt[1], axis[1]), 
    ];
};
exports.reflectPoint = reflectPoint;
/**
 * reflect a path either on a point or a line
 * @param pts data that needs to be mirrored
 * @param axis mirror axis. either point or line
 * @returns
 */ const reflectPath = (pts, axis)=>{
    return pts.map((pt)=>(0, exports.reflectPoint)(pt, axis));
};
exports.reflectPath = reflectPath;
/**
 * scale a single point
 * @param pt a point [x, y]
 * @param size [width, height] to scale to
 * @returns scaled point [x, y]`
 */ const scalePoint = (pt, size)=>{
    const [x, y] = pt;
    const [w, h] = size;
    return [
        x * w,
        y * h
    ];
};
exports.scalePoint = scalePoint;
/**
 * take normalized path data and return [ x, y ] scaled to width and height
 * @param path array of [x, y] normalized point pairs
 * @param size [width, height] to scale to
 * @returns new array of [x, y]
 */ const scalePath = (path, size)=>{
    return path.map((pt)=>(0, exports.scalePoint)(pt, size));
};
exports.scalePath = scalePath;
/**
 * by default, path t value is based on number of points. this function calculates t based on each segment length.
 *
 * TODO:
 * - implement
 * @param path
 * @returns {number[]} t values for each pt index
 */ const calcTByLength = (path)=>{
    return [];
};
exports.calcTByLength = calcTByLength;
/**
 * combine 2 paths by a single connecting point.
 * if connecting points are the same, then add only one. (no duplicates)
 *
 * TODO:
 * - implementation
 * - what modes to use?: "start-first", "start-last", "end-first", "end-last"?
 * - snap one path to another by automatically moving it?
 * - meet at halfway if two end points are not close enough (threshold)
 * @param path1 array of [x, y]
 * @param path2 array of [x, y]
 * @param mode from which point to which point to connect?
 * @returns path a single combined path
 */ const combinePath = (path1, path2, mode)=>{
    return path1;
};
exports.combinePath = combinePath;

},{"@daeinc/math":"jjGHS","gl-vec2":"82piL"}],"jjGHS":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.snapToArray = exports.snapBy = exports.roundF = exports.reflect = exports.modIncl = exports.modF = exports.mod = exports.lerp = exports.mix = exports.map = exports.floorF = exports.distSq = exports.dist = exports.constrain = exports.clamp = void 0;
/**
 * clamp values between min and max (=constrain)
 * @param val
 * @param min
 * @param max
 * @returns
 */ const clamp = (val, min, max)=>Math.min(Math.max(val, min), max);
exports.clamp = clamp;
/**
 * alias for clamp()
 */ exports.constrain = exports.clamp;
/**
 *
 * @param x1
 * @param y1
 * @param x2
 * @param y2
 * @returns
 */ const dist = (x1, y1, x2, y2)=>{
    return Math.sqrt((0, exports.distSq)(x1, y1, x2, y2));
};
exports.dist = dist;
/**
 * returns squared distance
 * @param x1
 * @param y1
 * @param x2
 * @param y2
 * @returns
 */ const distSq = (x1, y1, x2, y2)=>{
    return (x2 - x1) ** 2 + (y2 - y1) ** 2;
};
exports.distSq = distSq;
/**
 *
 * @param n number
 * @param amp how far it can be away from input
 * @returns
 */ // export const shakeNum = (n: number, amp: number): number =>
//   n + map(Math.random(), 0, 1, -1, 1) * amp;
/**
 * drop decimals after digit. good for array index (floor)
 * @param n float number
 * @param digit how many decimal digits to keep
 * @returns
 */ const floorF = (n, digit)=>{
    n = parseFloat(n.toFixed(digit));
    const factor = Math.pow(10, digit);
    return Math.floor(n * factor) / factor;
};
exports.floorF = floorF;
/**
 *
 * @param val
 * @param s
 * @param e
 * @param ns
 * @param ne
 * @returns
 */ const map = (val, s, e, ns, ne)=>ns + (val - s) / (e - s) * (ne - ns);
exports.map = map;
/**
 * linear interpolation (=lerp)
 * @param a start value
 * @param b stop value
 * @param t amount 0..1
 * @returns
 */ const mix = (a, b, t)=>a * (1 - t) + b * t;
exports.mix = mix;
/**
 * alias for mix()
 */ exports.lerp = exports.mix;
/**
 * NOTE: it may not be accurate with non-integer numbers.
 * @param n
 * @param max
 * @returns
 */ const mod = (n, max)=>{
    return (n % max + max) % max;
};
exports.mod = mod;
/**
 * modulo(%) for float numbers up to precision digit.
 * @param n original number
 * @param max modulo
 * @param precision float precision digits. defaults to 6
 * @returns
 */ const modF = (n, max, precision = 6)=>{
    const mlt = Math.pow(10, precision); // multiplier to make it integer
    const ni = Math.floor(n * mlt);
    const maxi = Math.floor(max * mlt);
    return (ni % maxi + maxi) % maxi / mlt;
};
exports.modF = modF;
/**
 * inclusive modulo. modIncl(1, 3) will include 3.
 * can handle negative number and returns positive value
 * @param n number to update
 * @param max number to divide with
 * @returns number from modulo op. within range 0..max (inclusive)
 */ const modIncl = (n, max)=>{
    if (max < 0) throw new Error("modIncl(): 2nd arg must be >= 0");
    return n === max ? max : (n % max + max) % max;
};
exports.modIncl = modIncl;
/**
 * reflect a scalar value along axis. good for creating reflected version.
 * @param num number to flip
 * @param axis value to reflect against
 * @returns
 */ const reflect = (num, axis)=>{
    return axis - (num - axis);
};
exports.reflect = reflect;
/**
 * good for drawing shapes to include the maximum value (round up)
 * @param n float number
 * @param digit how many float digits to keep
 * @returns
 */ const roundF = (n, digit)=>{
    const factor = Math.pow(10, digit);
    return Math.round(n * factor) / factor;
};
exports.roundF = roundF;
/**
 * snap value to increment
 * @param n original number
 * @param inc increment to snap to.
 * @returns
 *
 */ const snapBy = (n, inc)=>{
    return Math.round(n / inc) * inc;
};
exports.snapBy = snapBy;
/**
 * snap to a value in array. whatever is closest to.
 * @param n original number
 * @param snapArr values to snap to
 * @returns {number | undefined}
 */ const snapToArray = (n, snapArr)=>{
    snapArr.sort((a, b)=>a - b); // sort numbers in order
    if (n <= snapArr[0]) return snapArr[0]; // if less than the smallest one
    else if (n >= snapArr[snapArr.length - 1]) return snapArr[snapArr.length - 1]; // if greater than the largest num
    else for(let i = 0; i < snapArr.length - 1; i++){
        const prev = snapArr[i];
        const next = snapArr[i + 1];
        if (n > prev && n < next) return Math.abs(n - next) <= Math.abs(n - prev) ? next : prev;
    }
    throw new Error("snapToArray(): did not meet any condition");
};
exports.snapToArray = snapToArray;

},{}],"82piL":[function(require,module,exports) {
module.exports = {
    EPSILON: require("./epsilon"),
    create: require("./create"),
    clone: require("./clone"),
    fromValues: require("./fromValues"),
    copy: require("./copy"),
    set: require("./set"),
    equals: require("./equals"),
    exactEquals: require("./exactEquals"),
    add: require("./add"),
    subtract: require("./subtract"),
    sub: require("./sub"),
    multiply: require("./multiply"),
    mul: require("./mul"),
    divide: require("./divide"),
    div: require("./div"),
    inverse: require("./inverse"),
    min: require("./min"),
    max: require("./max"),
    rotate: require("./rotate"),
    floor: require("./floor"),
    ceil: require("./ceil"),
    round: require("./round"),
    scale: require("./scale"),
    scaleAndAdd: require("./scaleAndAdd"),
    distance: require("./distance"),
    dist: require("./dist"),
    squaredDistance: require("./squaredDistance"),
    sqrDist: require("./sqrDist"),
    length: require("./length"),
    len: require("./len"),
    squaredLength: require("./squaredLength"),
    sqrLen: require("./sqrLen"),
    negate: require("./negate"),
    normalize: require("./normalize"),
    dot: require("./dot"),
    cross: require("./cross"),
    lerp: require("./lerp"),
    random: require("./random"),
    transformMat2: require("./transformMat2"),
    transformMat2d: require("./transformMat2d"),
    transformMat3: require("./transformMat3"),
    transformMat4: require("./transformMat4"),
    forEach: require("./forEach"),
    limit: require("./limit")
};

},{"./epsilon":"iJXI0","./create":"2vq2Z","./clone":"7aaIu","./fromValues":"1PQHu","./copy":"3VC11","./set":"eG683","./equals":"5i9tg","./exactEquals":"hsR4x","./add":"kgsY0","./subtract":"7jl3S","./sub":"a1bJU","./multiply":"6umjJ","./mul":"h6rnG","./divide":"64VNN","./div":"7wFMS","./inverse":"530vd","./min":"bF5U2","./max":"5O0kd","./rotate":"kG9AA","./floor":"1EoSB","./ceil":"kB1An","./round":"ylSLB","./scale":"ijYsa","./scaleAndAdd":"3Cioq","./distance":"7Ui9e","./dist":"1ovmd","./squaredDistance":"4hBLD","./sqrDist":"3qjLM","./length":"jYOQD","./len":"7CBIr","./squaredLength":"e1IZo","./sqrLen":"bKn7j","./negate":"78cQ9","./normalize":"5uPFR","./dot":"bwVNO","./cross":"jJL5Q","./lerp":"94IP9","./random":"erLFY","./transformMat2":"krmPX","./transformMat2d":"5gyTg","./transformMat3":"65V1G","./transformMat4":"dP164","./forEach":"2VzZZ","./limit":"cs7tR"}],"iJXI0":[function(require,module,exports) {
module.exports = 0.000001;

},{}],"2vq2Z":[function(require,module,exports) {
module.exports = create;
/**
 * Creates a new, empty vec2
 *
 * @returns {vec2} a new 2D vector
 */ function create() {
    var out = new Float32Array(2);
    out[0] = 0;
    out[1] = 0;
    return out;
}

},{}],"7aaIu":[function(require,module,exports) {
module.exports = clone;
/**
 * Creates a new vec2 initialized with values from an existing vector
 *
 * @param {vec2} a vector to clone
 * @returns {vec2} a new 2D vector
 */ function clone(a) {
    var out = new Float32Array(2);
    out[0] = a[0];
    out[1] = a[1];
    return out;
}

},{}],"1PQHu":[function(require,module,exports) {
module.exports = fromValues;
/**
 * Creates a new vec2 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} a new 2D vector
 */ function fromValues(x, y) {
    var out = new Float32Array(2);
    out[0] = x;
    out[1] = y;
    return out;
}

},{}],"3VC11":[function(require,module,exports) {
module.exports = copy;
/**
 * Copy the values from one vec2 to another
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the source vector
 * @returns {vec2} out
 */ function copy(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    return out;
}

},{}],"eG683":[function(require,module,exports) {
module.exports = set;
/**
 * Set the components of a vec2 to the given values
 *
 * @param {vec2} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} out
 */ function set(out, x, y) {
    out[0] = x;
    out[1] = y;
    return out;
}

},{}],"5i9tg":[function(require,module,exports) {
module.exports = equals;
var EPSILON = require("./epsilon");
/**
 * Returns whether or not the vectors have approximately the same elements in the same position.
 *
 * @param {vec2} a The first vector.
 * @param {vec2} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */ function equals(a, b) {
    var a0 = a[0];
    var a1 = a[1];
    var b0 = b[0];
    var b1 = b[1];
    return Math.abs(a0 - b0) <= EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1));
}

},{"./epsilon":"iJXI0"}],"hsR4x":[function(require,module,exports) {
module.exports = exactEquals;
/**
 * Returns whether or not the vectors exactly have the same elements in the same position (when compared with ===)
 *
 * @param {vec2} a The first vector.
 * @param {vec2} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */ function exactEquals(a, b) {
    return a[0] === b[0] && a[1] === b[1];
}

},{}],"kgsY0":[function(require,module,exports) {
module.exports = add;
/**
 * Adds two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */ function add(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    return out;
}

},{}],"7jl3S":[function(require,module,exports) {
module.exports = subtract;
/**
 * Subtracts vector b from vector a
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */ function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    return out;
}

},{}],"a1bJU":[function(require,module,exports) {
module.exports = require("./subtract");

},{"./subtract":"7jl3S"}],"6umjJ":[function(require,module,exports) {
module.exports = multiply;
/**
 * Multiplies two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */ function multiply(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    return out;
}

},{}],"h6rnG":[function(require,module,exports) {
module.exports = require("./multiply");

},{"./multiply":"6umjJ"}],"64VNN":[function(require,module,exports) {
module.exports = divide;
/**
 * Divides two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */ function divide(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    return out;
}

},{}],"7wFMS":[function(require,module,exports) {
module.exports = require("./divide");

},{"./divide":"64VNN"}],"530vd":[function(require,module,exports) {
module.exports = inverse;
/**
 * Returns the inverse of the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to invert
 * @returns {vec2} out
 */ function inverse(out, a) {
    out[0] = 1.0 / a[0];
    out[1] = 1.0 / a[1];
    return out;
}

},{}],"bF5U2":[function(require,module,exports) {
module.exports = min;
/**
 * Returns the minimum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */ function min(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    return out;
}

},{}],"5O0kd":[function(require,module,exports) {
module.exports = max;
/**
 * Returns the maximum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */ function max(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    return out;
}

},{}],"kG9AA":[function(require,module,exports) {
module.exports = rotate;
/**
 * Rotates a vec2 by an angle
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to rotate
 * @param {Number} angle the angle of rotation (in radians)
 * @returns {vec2} out
 */ function rotate(out, a, angle) {
    var c = Math.cos(angle), s = Math.sin(angle);
    var x = a[0], y = a[1];
    out[0] = x * c - y * s;
    out[1] = x * s + y * c;
    return out;
}

},{}],"1EoSB":[function(require,module,exports) {
module.exports = floor;
/**
 * Math.floor the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to floor
 * @returns {vec2} out
 */ function floor(out, a) {
    out[0] = Math.floor(a[0]);
    out[1] = Math.floor(a[1]);
    return out;
}

},{}],"kB1An":[function(require,module,exports) {
module.exports = ceil;
/**
 * Math.ceil the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to ceil
 * @returns {vec2} out
 */ function ceil(out, a) {
    out[0] = Math.ceil(a[0]);
    out[1] = Math.ceil(a[1]);
    return out;
}

},{}],"ylSLB":[function(require,module,exports) {
module.exports = round;
/**
 * Math.round the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to round
 * @returns {vec2} out
 */ function round(out, a) {
    out[0] = Math.round(a[0]);
    out[1] = Math.round(a[1]);
    return out;
}

},{}],"ijYsa":[function(require,module,exports) {
module.exports = scale;
/**
 * Scales a vec2 by a scalar number
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec2} out
 */ function scale(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    return out;
}

},{}],"3Cioq":[function(require,module,exports) {
module.exports = scaleAndAdd;
/**
 * Adds two vec2's after scaling the second operand by a scalar value
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec2} out
 */ function scaleAndAdd(out, a, b, scale) {
    out[0] = a[0] + b[0] * scale;
    out[1] = a[1] + b[1] * scale;
    return out;
}

},{}],"7Ui9e":[function(require,module,exports) {
module.exports = distance;
/**
 * Calculates the euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} distance between a and b
 */ function distance(a, b) {
    var x = b[0] - a[0], y = b[1] - a[1];
    return Math.sqrt(x * x + y * y);
}

},{}],"1ovmd":[function(require,module,exports) {
module.exports = require("./distance");

},{"./distance":"7Ui9e"}],"4hBLD":[function(require,module,exports) {
module.exports = squaredDistance;
/**
 * Calculates the squared euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} squared distance between a and b
 */ function squaredDistance(a, b) {
    var x = b[0] - a[0], y = b[1] - a[1];
    return x * x + y * y;
}

},{}],"3qjLM":[function(require,module,exports) {
module.exports = require("./squaredDistance");

},{"./squaredDistance":"4hBLD"}],"jYOQD":[function(require,module,exports) {
module.exports = length;
/**
 * Calculates the length of a vec2
 *
 * @param {vec2} a vector to calculate length of
 * @returns {Number} length of a
 */ function length(a) {
    var x = a[0], y = a[1];
    return Math.sqrt(x * x + y * y);
}

},{}],"7CBIr":[function(require,module,exports) {
module.exports = require("./length");

},{"./length":"jYOQD"}],"e1IZo":[function(require,module,exports) {
module.exports = squaredLength;
/**
 * Calculates the squared length of a vec2
 *
 * @param {vec2} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */ function squaredLength(a) {
    var x = a[0], y = a[1];
    return x * x + y * y;
}

},{}],"bKn7j":[function(require,module,exports) {
module.exports = require("./squaredLength");

},{"./squaredLength":"e1IZo"}],"78cQ9":[function(require,module,exports) {
module.exports = negate;
/**
 * Negates the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to negate
 * @returns {vec2} out
 */ function negate(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    return out;
}

},{}],"5uPFR":[function(require,module,exports) {
module.exports = normalize;
/**
 * Normalize a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to normalize
 * @returns {vec2} out
 */ function normalize(out, a) {
    var x = a[0], y = a[1];
    var len = x * x + y * y;
    if (len > 0) {
        //TODO: evaluate use of glm_invsqrt here?
        len = 1 / Math.sqrt(len);
        out[0] = a[0] * len;
        out[1] = a[1] * len;
    }
    return out;
}

},{}],"bwVNO":[function(require,module,exports) {
module.exports = dot;
/**
 * Calculates the dot product of two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} dot product of a and b
 */ function dot(a, b) {
    return a[0] * b[0] + a[1] * b[1];
}

},{}],"jJL5Q":[function(require,module,exports) {
module.exports = cross;
/**
 * Computes the cross product of two vec2's
 * Note that the cross product must by definition produce a 3D vector
 *
 * @param {vec3} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec3} out
 */ function cross(out, a, b) {
    var z = a[0] * b[1] - a[1] * b[0];
    out[0] = out[1] = 0;
    out[2] = z;
    return out;
}

},{}],"94IP9":[function(require,module,exports) {
module.exports = lerp;
/**
 * Performs a linear interpolation between two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec2} out
 */ function lerp(out, a, b, t) {
    var ax = a[0], ay = a[1];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    return out;
}

},{}],"erLFY":[function(require,module,exports) {
module.exports = random;
/**
 * Generates a random vector with the given scale
 *
 * @param {vec2} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec2} out
 */ function random(out, scale) {
    scale = scale || 1.0;
    var r = Math.random() * 2.0 * Math.PI;
    out[0] = Math.cos(r) * scale;
    out[1] = Math.sin(r) * scale;
    return out;
}

},{}],"krmPX":[function(require,module,exports) {
module.exports = transformMat2;
/**
 * Transforms the vec2 with a mat2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat2} m matrix to transform with
 * @returns {vec2} out
 */ function transformMat2(out, a, m) {
    var x = a[0], y = a[1];
    out[0] = m[0] * x + m[2] * y;
    out[1] = m[1] * x + m[3] * y;
    return out;
}

},{}],"5gyTg":[function(require,module,exports) {
module.exports = transformMat2d;
/**
 * Transforms the vec2 with a mat2d
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat2d} m matrix to transform with
 * @returns {vec2} out
 */ function transformMat2d(out, a, m) {
    var x = a[0], y = a[1];
    out[0] = m[0] * x + m[2] * y + m[4];
    out[1] = m[1] * x + m[3] * y + m[5];
    return out;
}

},{}],"65V1G":[function(require,module,exports) {
module.exports = transformMat3;
/**
 * Transforms the vec2 with a mat3
 * 3rd vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat3} m matrix to transform with
 * @returns {vec2} out
 */ function transformMat3(out, a, m) {
    var x = a[0], y = a[1];
    out[0] = m[0] * x + m[3] * y + m[6];
    out[1] = m[1] * x + m[4] * y + m[7];
    return out;
}

},{}],"dP164":[function(require,module,exports) {
module.exports = transformMat4;
/**
 * Transforms the vec2 with a mat4
 * 3rd vector component is implicitly '0'
 * 4th vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec2} out
 */ function transformMat4(out, a, m) {
    var x = a[0], y = a[1];
    out[0] = m[0] * x + m[4] * y + m[12];
    out[1] = m[1] * x + m[5] * y + m[13];
    return out;
}

},{}],"2VzZZ":[function(require,module,exports) {
module.exports = forEach;
var vec = require("./create")();
/**
 * Perform some operation over an array of vec2s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec2. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec2s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */ function forEach(a, stride, offset, count, fn, arg) {
    var i, l;
    if (!stride) stride = 2;
    if (!offset) offset = 0;
    if (count) l = Math.min(count * stride + offset, a.length);
    else l = a.length;
    for(i = offset; i < l; i += stride){
        vec[0] = a[i];
        vec[1] = a[i + 1];
        fn(vec, vec, arg);
        a[i] = vec[0];
        a[i + 1] = vec[1];
    }
    return a;
}

},{"./create":"2vq2Z"}],"cs7tR":[function(require,module,exports) {
module.exports = limit;
/**
 * Limit the magnitude of this vector to the value used for the `max`
 * parameter.
 *
 * @param  {vec2} the vector to limit
 * @param  {Number} max the maximum magnitude for the vector
 * @returns {vec2} out
 */ function limit(out, a, max) {
    var mSq = a[0] * a[0] + a[1] * a[1];
    if (mSq > max * max) {
        var n = Math.sqrt(mSq);
        out[0] = a[0] / n * max;
        out[1] = a[1] / n * max;
    } else {
        out[0] = a[0];
        out[1] = a[1];
    }
    return out;
}

},{}],"1gUgL":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createCanvas = exports.drawPath = exports.drawCircle = void 0;
/**
 *
 * @param ctx
 * @param pt [x, y]
 * @param diam diameter
 */ const drawCircle = (ctx, pt, diam)=>{
    ctx.beginPath();
    ctx.arc(pt[0], pt[1], diam * 0.5, 0, Math.PI * 2);
};
exports.drawCircle = drawCircle;
/**
 * draw a 2d path. need to manually stroke/fill afterwards.
 * @param ctx canvas context 2d
 * @param path array of [ x, y ] point pairs
 * @param close close path or not. default is false
 */ const drawPath = (ctx, path, close = false)=>{
    ctx.beginPath();
    ctx.moveTo(path[0][0], path[0][1]);
    for(let i = 1; i < path.length; i++)ctx.lineTo(path[i][0], path[i][1]);
    if (close) ctx.closePath();
};
exports.drawPath = drawPath;
// TODO
// - respond to device pixel ratio
const createCanvas = ({ width , height ,  })=>{
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    document.body.appendChild(canvas);
    return canvas;
};
exports.createCanvas = createCanvas;

},{}]},["jTpY0","98uA4"], "98uA4", "parcelRequire0536")

//# sourceMappingURL=vector-projection.419890e5.js.map
