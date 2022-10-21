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

},{"../dist/index.js":"7elyk","@daeinc/canvas":"88W4y"}],"7elyk":[function(require,module,exports) {
"use strict";
var __importDefault = this && this.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.combinePath = exports.blendPath = exports.extrudePath = exports.interpolate = exports.interpolateObject = exports.interpolateArray = exports.interpolatePath = exports.createShapeFunc = exports.getPathLength = exports.projectPointOnLine = exports.distSq = exports.dist = exports.reflectPath = exports.reflectPoint = exports.scalePath = exports.scalePoint = void 0;
const math_1 = require("@daeinc/math");
// import { sub, scale, dot, len, normalize } from "gl-vec3";
const victor_1 = __importDefault(require("victor"));
/**
 * scale a single point
 * @param pt a point [x, y]
 * @param size [width, height] to scale to
 * @returns scaled point [x, y]
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
 * REVIEW: why did I floor values? to adhere to pixel grid?
 * @param path array of [ x, y ] normalized point pairs
 * @param w width to scale to
 * @param h height to scale to
 * @returns new array of [ x, y ]
 */ const scalePath = (path, size)=>{
    return path.map((pt)=>(0, exports.scalePoint)(pt, size));
// return path.map((pt, i) => {
//   return [Math.floor(pt[0] * w), Math.floor(pt[1] * h)];
// });
};
exports.scalePath = scalePath;
/**
 * reflect a point on another point or a line
 * @param pt source point to be mirrored
 * @param axis mirror axis. either point (or line)
 * @returns
 */ const reflectPoint = (pt, axis)=>{
    if (axis[0].constructor === Array) {
        const vecProj = victor_1.default.fromArray((0, exports.projectPointOnLine)(pt, axis));
        const vecDist = victor_1.default.fromArray(pt).subtract(vecProj);
        const vecRefl = vecProj.subtract(vecDist);
        return vecRefl.toArray();
    } else return [
        (0, math_1.reflect)(pt[0], axis[0]),
        (0, math_1.reflect)(pt[1], axis[1]), 
    ];
};
exports.reflectPoint = reflectPoint;
/**
 * TODO: implement
 * - mirror path against line
 * TODO: test
 * @param pts data that needs to be mirrored
 * @param axis mirror axis. either point or line
 * @returns
 */ const reflectPath = (pts, axis)=>{
    if (axis[0].constructor === Array) return pts.map((pt)=>{
        const vecProj = victor_1.default.fromArray((0, exports.projectPointOnLine)(pt, axis));
        const vecDist = victor_1.default.fromArray(pt).subtract(vecProj);
        const vecRefl = vecProj.subtract(vecDist);
        return vecRefl.toArray();
    });
    else return pts.map((pt)=>(0, exports.reflectPoint)(pt, axis));
};
exports.reflectPath = reflectPath;
/**
 * TODO: test
 * @param pt1
 * @param pt2
 * @returns
 */ const dist = (pt1, pt2)=>{
    return Math.sqrt(Math.pow(pt2[0] - pt1[0], 2) + Math.pow(pt2[1] - pt1[1], 2));
};
exports.dist = dist;
/**
 * TODO: test
 * squared distance. (x^2 + y^2)
 * @param pt1
 * @param pt2
 * @returns
 */ const distSq = (pt1, pt2)=>{
    return Math.pow(pt2[0] - pt1[0], 2) + Math.pow(pt2[1] - pt1[1], 2);
};
exports.distSq = distSq;
/**
 * project a point on a line using vector.
 * NOTE: implementation is not great as I haven't decided which vector library to use yet.
 * @param pt point
 * @param line line segment
 * @returns point on the line
 */ const projectPointOnLine = (pt, line)=>{
    const ptVec = new victor_1.default(pt[0] - line[1][0], pt[1] - line[1][1]);
    const lineVec = new victor_1.default(line[0][0] - line[1][0], line[0][1] - line[1][1]);
    const prod = ptVec.dot(lineVec);
    const proj = prod / lineVec.length();
    const result = lineVec.normalize().multiply(new victor_1.default(proj, proj)) // Victor doesn't have mult(scalar)
    .add(victor_1.default.fromArray(line[1]));
    return result.toArray();
};
exports.projectPointOnLine = projectPointOnLine;
/**
 * take an array of points and return total length of path
 * when using g.js: https://g.js.org/ref/pathLength.html
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
 * pts array must be normalized (0..1)
 * the resulting function is transformed to draw from center [0, 0].
 * REVIEW: re-use scalePoint() and scalePath()
 * @param pts normalized array of [x, y]s
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
 * mix/lerp 2d array. usually used for path data of [x, y]
 * pathStart and pathTarget must be the same length
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
 * REVIEW:
 * - currently, string or boolean uses start value. (should it be t=0.5?)
 * - should i place it in utils/math?
 * TODO:
 * - Typescript-wise, this is a mess now.
 * - generic type: is this working? i only need to test a few types.
 * - first if type checking is not working for array===object
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
 * extrude path in 2d space
 * TODO: instead of preventing numPoints<path length, continue to extrude. use modulo.
 * TODO: custom shapeFunc
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
 * generates an array of paths (excl. original 2 paths)
 * TODO:
 * - guidePath: input another path to use as shaping path.
 *   this path should already be resampled so that path points can be used as numBlends,
 *   or use numBlends param to resample within this function.
 * 22.07.29
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
 * combine 2 paths by a single connecting point.
 * if connecting points are the same, then add only one. (no duplicates)
 *
 * TODO:
 * - implementation
 * - what modes to use?: "start-first", "start-last", "end-first", "end-last"?
 * - snap one path to another by automatically moving it?
 * @param path1 array of [x, y]
 * @param path2 array of [x, y]
 * @param mode from which point to which point to connect?
 * @returns path a single combined path
 */ const combinePath = (path1, path2, mode)=>{
    return path1;
};
exports.combinePath = combinePath; // module.exports = {
 //   getIdx,
 //   getSegment,
 //   getLocalT,
 //   getPos,
 //   scalePath,
 //   getPathLength,
 //   drawPath,
 //   createShapeFunc,
 //   interpolatePath,
 //   interpolateArray,
 //   interpolateObject,
 //   interpolate,
 //   extrudePath,
 //   blendPath,
 //   combinePath,
 // };

},{"@daeinc/math":"1EO4r","victor":"91UHF"}],"1EO4r":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.modIncl = exports.modf = exports.mod = exports.reflect = exports.snapToArray = exports.snapBy = exports.roundFloat = exports.floorFloat = exports.shakeNum = exports.constrain = exports.clamp = exports.map = exports.lerp = exports.mix = void 0;
/**
 * linear interpolation
 * @param a start value
 * @param b stop value
 * @param t amount 0..1
 * @returns
 */ const mix = (a, b, t)=>a * (1 - t) + b * t;
exports.mix = mix;
exports.lerp = exports.mix;
const map = (val, s, e, ns, ne)=>ns + (val - s) / (e - s) * (ne - ns);
exports.map = map;
const clamp = (val, min, max)=>Math.min(Math.max(val, min), max);
exports.clamp = clamp;
exports.constrain = exports.clamp;
/**
 *
 * @param n number
 * @param amp how far it can be away from input
 * @returns
 */ const shakeNum = (n, amp)=>n + (0, exports.map)(Math.random(), 0, 1, -1, 1) * amp;
exports.shakeNum = shakeNum;
/**
 * drop decimals after digit. good for array index (floor)
 * @param n float number
 * @param digit how many decimal digits to keep
 * @returns
 */ const floorFloat = (n, digit)=>{
    n = parseFloat(n.toFixed(digit));
    const factor = Math.pow(10, digit);
    return Math.floor(n * factor) / factor;
};
exports.floorFloat = floorFloat;
/**
 * good for drawing shapes to include the maximum value (round up)
 * @param n float number
 * @param digit how many float digits to keep
 * @returns
 */ const roundFloat = (n, digit)=>{
    const factor = Math.pow(10, digit);
    return Math.round(n * factor) / factor;
};
exports.roundFloat = roundFloat;
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
 * REVIEW: allow undefined? or throw error?
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
};
exports.snapToArray = snapToArray;
/**
 * mirror value along axis. good for creating mirrored version.
 * @param num number to flip
 * @param axis value to mirror against
 * @returns
 */ const reflect = (num, axis)=>{
    return axis - (num - axis);
};
exports.reflect = reflect;
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
 */ const modf = (n, max, precision = 6)=>{
    const mlt = Math.pow(10, precision); // multiplier to make it integer
    const ni = Math.floor(n * mlt);
    const maxi = Math.floor(max * mlt);
    return (ni % maxi + maxi) % maxi / mlt;
};
exports.modf = modf;
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
exports.modIncl = modIncl; // module.exports = {
 //   mix,
 //   lerp,
 //   map,
 //   clamp,
 //   constrain,
 //   shakeNum,
 //   floorFloat,
 //   roundFloat,
 //   snapBy,
 //   snapToArray,
 //   flip,
 // };

},{}],"91UHF":[function(require,module,exports) {
exports = module.exports = Victor;
/**
 * # Victor - A JavaScript 2D vector class with methods for common vector operations
 */ /**
 * Constructor. Will also work without the `new` keyword
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 50);
 *     var vec2 = Victor(42, 1337);
 *
 * @param {Number} x Value of the x axis
 * @param {Number} y Value of the y axis
 * @return {Victor}
 * @api public
 */ function Victor(x, y) {
    if (!(this instanceof Victor)) return new Victor(x, y);
    /**
	 * The X axis
	 *
	 * ### Examples:
	 *     var vec = new Victor.fromArray(42, 21);
	 *
	 *     vec.x;
	 *     // => 42
	 *
	 * @api public
	 */ this.x = x || 0;
    /**
	 * The Y axis
	 *
	 * ### Examples:
	 *     var vec = new Victor.fromArray(42, 21);
	 *
	 *     vec.y;
	 *     // => 21
	 *
	 * @api public
	 */ this.y = y || 0;
}
/**
 * # Static
 */ /**
 * Creates a new instance from an array
 *
 * ### Examples:
 *     var vec = Victor.fromArray([42, 21]);
 *
 *     vec.toString();
 *     // => x:42, y:21
 *
 * @name Victor.fromArray
 * @param {Array} array Array with the x and y values at index 0 and 1 respectively
 * @return {Victor} The new instance
 * @api public
 */ Victor.fromArray = function(arr) {
    return new Victor(arr[0] || 0, arr[1] || 0);
};
/**
 * Creates a new instance from an object
 *
 * ### Examples:
 *     var vec = Victor.fromObject({ x: 42, y: 21 });
 *
 *     vec.toString();
 *     // => x:42, y:21
 *
 * @name Victor.fromObject
 * @param {Object} obj Object with the values for x and y
 * @return {Victor} The new instance
 * @api public
 */ Victor.fromObject = function(obj) {
    return new Victor(obj.x || 0, obj.y || 0);
};
/**
 * # Manipulation
 *
 * These functions are chainable.
 */ /**
 * Adds another vector's X axis to this one
 *
 * ### Examples:
 *     var vec1 = new Victor(10, 10);
 *     var vec2 = new Victor(20, 30);
 *
 *     vec1.addX(vec2);
 *     vec1.toString();
 *     // => x:30, y:10
 *
 * @param {Victor} vector The other vector you want to add to this one
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */ Victor.prototype.addX = function(vec) {
    this.x += vec.x;
    return this;
};
/**
 * Adds another vector's Y axis to this one
 *
 * ### Examples:
 *     var vec1 = new Victor(10, 10);
 *     var vec2 = new Victor(20, 30);
 *
 *     vec1.addY(vec2);
 *     vec1.toString();
 *     // => x:10, y:40
 *
 * @param {Victor} vector The other vector you want to add to this one
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */ Victor.prototype.addY = function(vec) {
    this.y += vec.y;
    return this;
};
/**
 * Adds another vector to this one
 *
 * ### Examples:
 *     var vec1 = new Victor(10, 10);
 *     var vec2 = new Victor(20, 30);
 *
 *     vec1.add(vec2);
 *     vec1.toString();
 *     // => x:30, y:40
 *
 * @param {Victor} vector The other vector you want to add to this one
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */ Victor.prototype.add = function(vec) {
    this.x += vec.x;
    this.y += vec.y;
    return this;
};
/**
 * Adds the given scalar to both vector axis
 *
 * ### Examples:
 *     var vec = new Victor(1, 2);
 *
 *     vec.addScalar(2);
 *     vec.toString();
 *     // => x: 3, y: 4
 *
 * @param {Number} scalar The scalar to add
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */ Victor.prototype.addScalar = function(scalar) {
    this.x += scalar;
    this.y += scalar;
    return this;
};
/**
 * Adds the given scalar to the X axis
 *
 * ### Examples:
 *     var vec = new Victor(1, 2);
 *
 *     vec.addScalarX(2);
 *     vec.toString();
 *     // => x: 3, y: 2
 *
 * @param {Number} scalar The scalar to add
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */ Victor.prototype.addScalarX = function(scalar) {
    this.x += scalar;
    return this;
};
/**
 * Adds the given scalar to the Y axis
 *
 * ### Examples:
 *     var vec = new Victor(1, 2);
 *
 *     vec.addScalarY(2);
 *     vec.toString();
 *     // => x: 1, y: 4
 *
 * @param {Number} scalar The scalar to add
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */ Victor.prototype.addScalarY = function(scalar) {
    this.y += scalar;
    return this;
};
/**
 * Subtracts the X axis of another vector from this one
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 50);
 *     var vec2 = new Victor(20, 30);
 *
 *     vec1.subtractX(vec2);
 *     vec1.toString();
 *     // => x:80, y:50
 *
 * @param {Victor} vector The other vector you want subtract from this one
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */ Victor.prototype.subtractX = function(vec) {
    this.x -= vec.x;
    return this;
};
/**
 * Subtracts the Y axis of another vector from this one
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 50);
 *     var vec2 = new Victor(20, 30);
 *
 *     vec1.subtractY(vec2);
 *     vec1.toString();
 *     // => x:100, y:20
 *
 * @param {Victor} vector The other vector you want subtract from this one
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */ Victor.prototype.subtractY = function(vec) {
    this.y -= vec.y;
    return this;
};
/**
 * Subtracts another vector from this one
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 50);
 *     var vec2 = new Victor(20, 30);
 *
 *     vec1.subtract(vec2);
 *     vec1.toString();
 *     // => x:80, y:20
 *
 * @param {Victor} vector The other vector you want subtract from this one
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */ Victor.prototype.subtract = function(vec) {
    this.x -= vec.x;
    this.y -= vec.y;
    return this;
};
/**
 * Subtracts the given scalar from both axis
 *
 * ### Examples:
 *     var vec = new Victor(100, 200);
 *
 *     vec.subtractScalar(20);
 *     vec.toString();
 *     // => x: 80, y: 180
 *
 * @param {Number} scalar The scalar to subtract
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */ Victor.prototype.subtractScalar = function(scalar) {
    this.x -= scalar;
    this.y -= scalar;
    return this;
};
/**
 * Subtracts the given scalar from the X axis
 *
 * ### Examples:
 *     var vec = new Victor(100, 200);
 *
 *     vec.subtractScalarX(20);
 *     vec.toString();
 *     // => x: 80, y: 200
 *
 * @param {Number} scalar The scalar to subtract
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */ Victor.prototype.subtractScalarX = function(scalar) {
    this.x -= scalar;
    return this;
};
/**
 * Subtracts the given scalar from the Y axis
 *
 * ### Examples:
 *     var vec = new Victor(100, 200);
 *
 *     vec.subtractScalarY(20);
 *     vec.toString();
 *     // => x: 100, y: 180
 *
 * @param {Number} scalar The scalar to subtract
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */ Victor.prototype.subtractScalarY = function(scalar) {
    this.y -= scalar;
    return this;
};
/**
 * Divides the X axis by the x component of given vector
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *     var vec2 = new Victor(2, 0);
 *
 *     vec.divideX(vec2);
 *     vec.toString();
 *     // => x:50, y:50
 *
 * @param {Victor} vector The other vector you want divide by
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */ Victor.prototype.divideX = function(vector) {
    this.x /= vector.x;
    return this;
};
/**
 * Divides the Y axis by the y component of given vector
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *     var vec2 = new Victor(0, 2);
 *
 *     vec.divideY(vec2);
 *     vec.toString();
 *     // => x:100, y:25
 *
 * @param {Victor} vector The other vector you want divide by
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */ Victor.prototype.divideY = function(vector) {
    this.y /= vector.y;
    return this;
};
/**
 * Divides both vector axis by a axis values of given vector
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *     var vec2 = new Victor(2, 2);
 *
 *     vec.divide(vec2);
 *     vec.toString();
 *     // => x:50, y:25
 *
 * @param {Victor} vector The vector to divide by
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */ Victor.prototype.divide = function(vector) {
    this.x /= vector.x;
    this.y /= vector.y;
    return this;
};
/**
 * Divides both vector axis by the given scalar value
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.divideScalar(2);
 *     vec.toString();
 *     // => x:50, y:25
 *
 * @param {Number} The scalar to divide by
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */ Victor.prototype.divideScalar = function(scalar) {
    if (scalar !== 0) {
        this.x /= scalar;
        this.y /= scalar;
    } else {
        this.x = 0;
        this.y = 0;
    }
    return this;
};
/**
 * Divides the X axis by the given scalar value
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.divideScalarX(2);
 *     vec.toString();
 *     // => x:50, y:50
 *
 * @param {Number} The scalar to divide by
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */ Victor.prototype.divideScalarX = function(scalar) {
    if (scalar !== 0) this.x /= scalar;
    else this.x = 0;
    return this;
};
/**
 * Divides the Y axis by the given scalar value
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.divideScalarY(2);
 *     vec.toString();
 *     // => x:100, y:25
 *
 * @param {Number} The scalar to divide by
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */ Victor.prototype.divideScalarY = function(scalar) {
    if (scalar !== 0) this.y /= scalar;
    else this.y = 0;
    return this;
};
/**
 * Inverts the X axis
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.invertX();
 *     vec.toString();
 *     // => x:-100, y:50
 *
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */ Victor.prototype.invertX = function() {
    this.x *= -1;
    return this;
};
/**
 * Inverts the Y axis
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.invertY();
 *     vec.toString();
 *     // => x:100, y:-50
 *
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */ Victor.prototype.invertY = function() {
    this.y *= -1;
    return this;
};
/**
 * Inverts both axis
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.invert();
 *     vec.toString();
 *     // => x:-100, y:-50
 *
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */ Victor.prototype.invert = function() {
    this.invertX();
    this.invertY();
    return this;
};
/**
 * Multiplies the X axis by X component of given vector
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *     var vec2 = new Victor(2, 0);
 *
 *     vec.multiplyX(vec2);
 *     vec.toString();
 *     // => x:200, y:50
 *
 * @param {Victor} vector The vector to multiply the axis with
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */ Victor.prototype.multiplyX = function(vector) {
    this.x *= vector.x;
    return this;
};
/**
 * Multiplies the Y axis by Y component of given vector
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *     var vec2 = new Victor(0, 2);
 *
 *     vec.multiplyX(vec2);
 *     vec.toString();
 *     // => x:100, y:100
 *
 * @param {Victor} vector The vector to multiply the axis with
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */ Victor.prototype.multiplyY = function(vector) {
    this.y *= vector.y;
    return this;
};
/**
 * Multiplies both vector axis by values from a given vector
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *     var vec2 = new Victor(2, 2);
 *
 *     vec.multiply(vec2);
 *     vec.toString();
 *     // => x:200, y:100
 *
 * @param {Victor} vector The vector to multiply by
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */ Victor.prototype.multiply = function(vector) {
    this.x *= vector.x;
    this.y *= vector.y;
    return this;
};
/**
 * Multiplies both vector axis by the given scalar value
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.multiplyScalar(2);
 *     vec.toString();
 *     // => x:200, y:100
 *
 * @param {Number} The scalar to multiply by
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */ Victor.prototype.multiplyScalar = function(scalar) {
    this.x *= scalar;
    this.y *= scalar;
    return this;
};
/**
 * Multiplies the X axis by the given scalar
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.multiplyScalarX(2);
 *     vec.toString();
 *     // => x:200, y:50
 *
 * @param {Number} The scalar to multiply the axis with
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */ Victor.prototype.multiplyScalarX = function(scalar) {
    this.x *= scalar;
    return this;
};
/**
 * Multiplies the Y axis by the given scalar
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.multiplyScalarY(2);
 *     vec.toString();
 *     // => x:100, y:100
 *
 * @param {Number} The scalar to multiply the axis with
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */ Victor.prototype.multiplyScalarY = function(scalar) {
    this.y *= scalar;
    return this;
};
/**
 * Normalize
 *
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */ Victor.prototype.normalize = function() {
    var length = this.length();
    if (length === 0) {
        this.x = 1;
        this.y = 0;
    } else this.divide(Victor(length, length));
    return this;
};
Victor.prototype.norm = Victor.prototype.normalize;
/**
 * If the absolute vector axis is greater than `max`, multiplies the axis by `factor`
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.limit(80, 0.9);
 *     vec.toString();
 *     // => x:90, y:50
 *
 * @param {Number} max The maximum value for both x and y axis
 * @param {Number} factor Factor by which the axis are to be multiplied with
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */ Victor.prototype.limit = function(max, factor) {
    if (Math.abs(this.x) > max) this.x *= factor;
    if (Math.abs(this.y) > max) this.y *= factor;
    return this;
};
/**
 * Randomizes both vector axis with a value between 2 vectors
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.randomize(new Victor(50, 60), new Victor(70, 80`));
 *     vec.toString();
 *     // => x:67, y:73
 *
 * @param {Victor} topLeft first vector
 * @param {Victor} bottomRight second vector
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */ Victor.prototype.randomize = function(topLeft, bottomRight) {
    this.randomizeX(topLeft, bottomRight);
    this.randomizeY(topLeft, bottomRight);
    return this;
};
/**
 * Randomizes the y axis with a value between 2 vectors
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.randomizeX(new Victor(50, 60), new Victor(70, 80`));
 *     vec.toString();
 *     // => x:55, y:50
 *
 * @param {Victor} topLeft first vector
 * @param {Victor} bottomRight second vector
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */ Victor.prototype.randomizeX = function(topLeft, bottomRight) {
    var min = Math.min(topLeft.x, bottomRight.x);
    var max = Math.max(topLeft.x, bottomRight.x);
    this.x = random(min, max);
    return this;
};
/**
 * Randomizes the y axis with a value between 2 vectors
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.randomizeY(new Victor(50, 60), new Victor(70, 80`));
 *     vec.toString();
 *     // => x:100, y:66
 *
 * @param {Victor} topLeft first vector
 * @param {Victor} bottomRight second vector
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */ Victor.prototype.randomizeY = function(topLeft, bottomRight) {
    var min = Math.min(topLeft.y, bottomRight.y);
    var max = Math.max(topLeft.y, bottomRight.y);
    this.y = random(min, max);
    return this;
};
/**
 * Randomly randomizes either axis between 2 vectors
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.randomizeAny(new Victor(50, 60), new Victor(70, 80));
 *     vec.toString();
 *     // => x:100, y:77
 *
 * @param {Victor} topLeft first vector
 * @param {Victor} bottomRight second vector
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */ Victor.prototype.randomizeAny = function(topLeft, bottomRight) {
    if (!!Math.round(Math.random())) this.randomizeX(topLeft, bottomRight);
    else this.randomizeY(topLeft, bottomRight);
    return this;
};
/**
 * Rounds both axis to an integer value
 *
 * ### Examples:
 *     var vec = new Victor(100.2, 50.9);
 *
 *     vec.unfloat();
 *     vec.toString();
 *     // => x:100, y:51
 *
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */ Victor.prototype.unfloat = function() {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    return this;
};
/**
 * Rounds both axis to a certain precision
 *
 * ### Examples:
 *     var vec = new Victor(100.2, 50.9);
 *
 *     vec.unfloat();
 *     vec.toString();
 *     // => x:100, y:51
 *
 * @param {Number} Precision (default: 8)
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */ Victor.prototype.toFixed = function(precision) {
    if (typeof precision === "undefined") precision = 8;
    this.x = this.x.toFixed(precision);
    this.y = this.y.toFixed(precision);
    return this;
};
/**
 * Performs a linear blend / interpolation of the X axis towards another vector
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 100);
 *     var vec2 = new Victor(200, 200);
 *
 *     vec1.mixX(vec2, 0.5);
 *     vec.toString();
 *     // => x:150, y:100
 *
 * @param {Victor} vector The other vector
 * @param {Number} amount The blend amount (optional, default: 0.5)
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */ Victor.prototype.mixX = function(vec, amount) {
    if (typeof amount === "undefined") amount = 0.5;
    this.x = (1 - amount) * this.x + amount * vec.x;
    return this;
};
/**
 * Performs a linear blend / interpolation of the Y axis towards another vector
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 100);
 *     var vec2 = new Victor(200, 200);
 *
 *     vec1.mixY(vec2, 0.5);
 *     vec.toString();
 *     // => x:100, y:150
 *
 * @param {Victor} vector The other vector
 * @param {Number} amount The blend amount (optional, default: 0.5)
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */ Victor.prototype.mixY = function(vec, amount) {
    if (typeof amount === "undefined") amount = 0.5;
    this.y = (1 - amount) * this.y + amount * vec.y;
    return this;
};
/**
 * Performs a linear blend / interpolation towards another vector
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 100);
 *     var vec2 = new Victor(200, 200);
 *
 *     vec1.mix(vec2, 0.5);
 *     vec.toString();
 *     // => x:150, y:150
 *
 * @param {Victor} vector The other vector
 * @param {Number} amount The blend amount (optional, default: 0.5)
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */ Victor.prototype.mix = function(vec, amount) {
    this.mixX(vec, amount);
    this.mixY(vec, amount);
    return this;
};
/**
 * # Products
 */ /**
 * Creates a clone of this vector
 *
 * ### Examples:
 *     var vec1 = new Victor(10, 10);
 *     var vec2 = vec1.clone();
 *
 *     vec2.toString();
 *     // => x:10, y:10
 *
 * @return {Victor} A clone of the vector
 * @api public
 */ Victor.prototype.clone = function() {
    return new Victor(this.x, this.y);
};
/**
 * Copies another vector's X component in to its own
 *
 * ### Examples:
 *     var vec1 = new Victor(10, 10);
 *     var vec2 = new Victor(20, 20);
 *     var vec2 = vec1.copyX(vec1);
 *
 *     vec2.toString();
 *     // => x:20, y:10
 *
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */ Victor.prototype.copyX = function(vec) {
    this.x = vec.x;
    return this;
};
/**
 * Copies another vector's Y component in to its own
 *
 * ### Examples:
 *     var vec1 = new Victor(10, 10);
 *     var vec2 = new Victor(20, 20);
 *     var vec2 = vec1.copyY(vec1);
 *
 *     vec2.toString();
 *     // => x:10, y:20
 *
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */ Victor.prototype.copyY = function(vec) {
    this.y = vec.y;
    return this;
};
/**
 * Copies another vector's X and Y components in to its own
 *
 * ### Examples:
 *     var vec1 = new Victor(10, 10);
 *     var vec2 = new Victor(20, 20);
 *     var vec2 = vec1.copy(vec1);
 *
 *     vec2.toString();
 *     // => x:20, y:20
 *
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */ Victor.prototype.copy = function(vec) {
    this.copyX(vec);
    this.copyY(vec);
    return this;
};
/**
 * Sets the vector to zero (0,0)
 *
 * ### Examples:
 *     var vec1 = new Victor(10, 10);
 *		 var1.zero();
 *     vec1.toString();
 *     // => x:0, y:0
 *
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */ Victor.prototype.zero = function() {
    this.x = this.y = 0;
    return this;
};
/**
 * Calculates the dot product of this vector and another
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 50);
 *     var vec2 = new Victor(200, 60);
 *
 *     vec1.dot(vec2);
 *     // => 23000
 *
 * @param {Victor} vector The second vector
 * @return {Number} Dot product
 * @api public
 */ Victor.prototype.dot = function(vec2) {
    return this.x * vec2.x + this.y * vec2.y;
};
Victor.prototype.cross = function(vec2) {
    return this.x * vec2.y - this.y * vec2.x;
};
/**
 * Projects a vector onto another vector, setting itself to the result.
 *
 * ### Examples:
 *     var vec = new Victor(100, 0);
 *     var vec2 = new Victor(100, 100);
 *
 *     vec.projectOnto(vec2);
 *     vec.toString();
 *     // => x:50, y:50
 *
 * @param {Victor} vector The other vector you want to project this vector onto
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */ Victor.prototype.projectOnto = function(vec2) {
    var coeff = (this.x * vec2.x + this.y * vec2.y) / (vec2.x * vec2.x + vec2.y * vec2.y);
    this.x = coeff * vec2.x;
    this.y = coeff * vec2.y;
    return this;
};
Victor.prototype.horizontalAngle = function() {
    return Math.atan2(this.y, this.x);
};
Victor.prototype.horizontalAngleDeg = function() {
    return radian2degrees(this.horizontalAngle());
};
Victor.prototype.verticalAngle = function() {
    return Math.atan2(this.x, this.y);
};
Victor.prototype.verticalAngleDeg = function() {
    return radian2degrees(this.verticalAngle());
};
Victor.prototype.angle = Victor.prototype.horizontalAngle;
Victor.prototype.angleDeg = Victor.prototype.horizontalAngleDeg;
Victor.prototype.direction = Victor.prototype.horizontalAngle;
Victor.prototype.rotate = function(angle) {
    var nx = this.x * Math.cos(angle) - this.y * Math.sin(angle);
    var ny = this.x * Math.sin(angle) + this.y * Math.cos(angle);
    this.x = nx;
    this.y = ny;
    return this;
};
Victor.prototype.rotateDeg = function(angle) {
    angle = degrees2radian(angle);
    return this.rotate(angle);
};
Victor.prototype.rotateTo = function(rotation) {
    return this.rotate(rotation - this.angle());
};
Victor.prototype.rotateToDeg = function(rotation) {
    rotation = degrees2radian(rotation);
    return this.rotateTo(rotation);
};
Victor.prototype.rotateBy = function(rotation) {
    var angle = this.angle() + rotation;
    return this.rotate(angle);
};
Victor.prototype.rotateByDeg = function(rotation) {
    rotation = degrees2radian(rotation);
    return this.rotateBy(rotation);
};
/**
 * Calculates the distance of the X axis between this vector and another
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 50);
 *     var vec2 = new Victor(200, 60);
 *
 *     vec1.distanceX(vec2);
 *     // => -100
 *
 * @param {Victor} vector The second vector
 * @return {Number} Distance
 * @api public
 */ Victor.prototype.distanceX = function(vec) {
    return this.x - vec.x;
};
/**
 * Same as `distanceX()` but always returns an absolute number
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 50);
 *     var vec2 = new Victor(200, 60);
 *
 *     vec1.absDistanceX(vec2);
 *     // => 100
 *
 * @param {Victor} vector The second vector
 * @return {Number} Absolute distance
 * @api public
 */ Victor.prototype.absDistanceX = function(vec) {
    return Math.abs(this.distanceX(vec));
};
/**
 * Calculates the distance of the Y axis between this vector and another
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 50);
 *     var vec2 = new Victor(200, 60);
 *
 *     vec1.distanceY(vec2);
 *     // => -10
 *
 * @param {Victor} vector The second vector
 * @return {Number} Distance
 * @api public
 */ Victor.prototype.distanceY = function(vec) {
    return this.y - vec.y;
};
/**
 * Same as `distanceY()` but always returns an absolute number
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 50);
 *     var vec2 = new Victor(200, 60);
 *
 *     vec1.distanceY(vec2);
 *     // => 10
 *
 * @param {Victor} vector The second vector
 * @return {Number} Absolute distance
 * @api public
 */ Victor.prototype.absDistanceY = function(vec) {
    return Math.abs(this.distanceY(vec));
};
/**
 * Calculates the euclidean distance between this vector and another
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 50);
 *     var vec2 = new Victor(200, 60);
 *
 *     vec1.distance(vec2);
 *     // => 100.4987562112089
 *
 * @param {Victor} vector The second vector
 * @return {Number} Distance
 * @api public
 */ Victor.prototype.distance = function(vec) {
    return Math.sqrt(this.distanceSq(vec));
};
/**
 * Calculates the squared euclidean distance between this vector and another
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 50);
 *     var vec2 = new Victor(200, 60);
 *
 *     vec1.distanceSq(vec2);
 *     // => 10100
 *
 * @param {Victor} vector The second vector
 * @return {Number} Distance
 * @api public
 */ Victor.prototype.distanceSq = function(vec) {
    var dx = this.distanceX(vec), dy = this.distanceY(vec);
    return dx * dx + dy * dy;
};
/**
 * Calculates the length or magnitude of the vector
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.length();
 *     // => 111.80339887498948
 *
 * @return {Number} Length / Magnitude
 * @api public
 */ Victor.prototype.length = function() {
    return Math.sqrt(this.lengthSq());
};
/**
 * Squared length / magnitude
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.lengthSq();
 *     // => 12500
 *
 * @return {Number} Length / Magnitude
 * @api public
 */ Victor.prototype.lengthSq = function() {
    return this.x * this.x + this.y * this.y;
};
Victor.prototype.magnitude = Victor.prototype.length;
/**
 * Returns a true if vector is (0, 0)
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *     vec.zero();
 *
 *     // => true
 *
 * @return {Boolean}
 * @api public
 */ Victor.prototype.isZero = function() {
    return this.x === 0 && this.y === 0;
};
/**
 * Returns a true if this vector is the same as another
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 50);
 *     var vec2 = new Victor(100, 50);
 *     vec1.isEqualTo(vec2);
 *
 *     // => true
 *
 * @return {Boolean}
 * @api public
 */ Victor.prototype.isEqualTo = function(vec2) {
    return this.x === vec2.x && this.y === vec2.y;
};
/**
 * # Utility Methods
 */ /**
 * Returns an string representation of the vector
 *
 * ### Examples:
 *     var vec = new Victor(10, 20);
 *
 *     vec.toString();
 *     // => x:10, y:20
 *
 * @return {String}
 * @api public
 */ Victor.prototype.toString = function() {
    return "x:" + this.x + ", y:" + this.y;
};
/**
 * Returns an array representation of the vector
 *
 * ### Examples:
 *     var vec = new Victor(10, 20);
 *
 *     vec.toArray();
 *     // => [10, 20]
 *
 * @return {Array}
 * @api public
 */ Victor.prototype.toArray = function() {
    return [
        this.x,
        this.y
    ];
};
/**
 * Returns an object representation of the vector
 *
 * ### Examples:
 *     var vec = new Victor(10, 20);
 *
 *     vec.toObject();
 *     // => { x: 10, y: 20 }
 *
 * @return {Object}
 * @api public
 */ Victor.prototype.toObject = function() {
    return {
        x: this.x,
        y: this.y
    };
};
var degrees = 180 / Math.PI;
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function radian2degrees(rad) {
    return rad * degrees;
}
function degrees2radian(deg) {
    return deg / degrees;
}

},{}],"88W4y":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.drawPath = void 0;
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

},{}]},["jTpY0","98uA4"], "98uA4", "parcelRequire0536")

//# sourceMappingURL=vector-projection.419890e5.js.map
