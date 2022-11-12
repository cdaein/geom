"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.combinePath = exports.calcTByLength = exports.scalePath = exports.scalePoint = exports.reflectPath = exports.reflectPoint = exports.projectPointOnLine = exports.interpolate = exports.interpolateObject = exports.interpolatePath = exports.interpolateArray = exports.extrudePath = exports.getPathLength = exports.generateSmoothPath = exports.distSq = exports.dist = exports.createShapeFunc = exports.blendPath = void 0;
const math_1 = require("@daeinc/math");
const array_1 = require("@daeinc/array");
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
 */
const blendPath = (path1, path2, numBlends, guidePath) => {
    return Array(numBlends)
        .fill([])
        .map((_, i) => {
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
 */
const createShapeFunc = (pts, anchor = [0.5, 0.5]) => {
    return (x, y, w, h) => pts.map((pt) => {
        const xdiff = pt[0] - anchor[0];
        const ydiff = pt[1] - anchor[1];
        return [x + xdiff * w, y + ydiff * h];
    });
};
exports.createShapeFunc = createShapeFunc;
/**
 * calculate distance between two point[]s
 * @param pt1
 * @param pt2
 * @returns
 */
const dist = (pt1, pt2) => {
    return Math.sqrt(Math.pow(pt2[0] - pt1[0], 2) + Math.pow(pt2[1] - pt1[1], 2));
};
exports.dist = dist;
/**
 * squared distance (x^2 + y^2) between two point[]s
 * @param pt1
 * @param pt2
 * @returns
 */
const distSq = (pt1, pt2) => {
    return Math.pow(pt2[0] - pt1[0], 2) + Math.pow(pt2[1] - pt1[1], 2);
};
exports.distSq = distSq;
/**
 * generate extra points for smooth hard corners of path
 *
 * TODO: test
 *
 * @param pts point array
 * @param smoothFactor how smooth
 * @returns point array
 */
const generateSmoothPath = (pts, smoothFactor) => {
    const smoothPoints = [];
    smoothPoints.push(pts[0]);
    for (let i = 0; i < pts.length - 1; i++) {
        const a = pts[i];
        const b = pts[i + 1];
        const diff = gl_vec2_1.default.sub([], b, a);
        const diffScaled1 = gl_vec2_1.default.mul([], diff, [smoothFactor, smoothFactor]);
        const mid1 = gl_vec2_1.default.add([], a, diffScaled1);
        const diffScaled2 = gl_vec2_1.default.mul([], diff, [
            1 - smoothFactor,
            1 - smoothFactor,
        ]);
        const mid2 = gl_vec2_1.default.add([], a, diffScaled2);
        smoothPoints.push(mid1, mid2, b);
    }
    return smoothPoints;
};
exports.generateSmoothPath = generateSmoothPath;
/**
 * take an array of points and return total length of path
 * @param path array of [ x, y ] points
 * @returns total length of path
 */
const getPathLength = (path) => {
    return path.reduce((totalLen, pt, i, arr) => {
        if (arr.length < 2)
            return 0; // handle single point length
        if (i === arr.length - 1)
            return totalLen; // skip last one (no i+1 there)
        return (totalLen +
            Math.sqrt(Math.pow(arr[i + 1][0] - arr[i][0], 2) +
                Math.pow(arr[i + 1][1] - arr[i][1], 2)));
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
 */
const extrudePath = (path, numPointsToExtrude, offset, mode = "end", shapeFunc) => {
    if (numPointsToExtrude > path.length) {
        throw new Error("extrudePath(): numPointsToExtrude can't exceed length of path");
    }
    const clone = [...path];
    if (mode === "end") {
        for (let i = path.length - 1; i >= path.length - numPointsToExtrude; i--) {
            const pt = path[i];
            clone.push([pt[0] + offset[0], pt[1] + offset[1]]);
        }
    }
    else if (mode === "start") {
        // push and reverse (faster than unshift)
        clone.reverse();
        for (let i = 0; i < numPointsToExtrude; i++) {
            const pt = path[i];
            clone.push([pt[0] + offset[0], pt[1] + offset[1]]);
        }
        // clone.reverse();
    }
    else if (mode === "both") {
        for (let i = path.length - 1; i >= path.length - numPointsToExtrude; i--) {
            const pt = path[i];
            clone.push([pt[0] + offset[0], pt[1] + offset[1]]);
        }
        clone.push(path[0]);
    }
    return clone;
};
exports.extrudePath = extrudePath;
exports.interpolateArray = array_1.interpolateArray; // REVIEW: hmm...
/**
 * mix/lerp 2d number array. usually used for path data of [x, y]
 * @param pathStart array of [x, y] to start
 * @param pathTarget array of [x, y] to target
 * @param t 0..1
 * @returns 2d array
 */
const interpolatePath = (pathStart, pathTarget, t) => {
    if (pathStart.length === 0 || pathTarget.length === 0)
        throw new Error("interpolatePath(): path cannot be empty");
    if (pathStart.length !== pathTarget.length)
        throw new Error("interpolatePath(): length must be same");
    return Array(pathStart.length)
        .fill([])
        .map((_, i) => {
        return [
            (0, math_1.mix)(pathStart[i][0], pathTarget[i][0], t),
            (0, math_1.mix)(pathStart[i][1], pathTarget[i][1], t),
        ];
    });
};
exports.interpolatePath = interpolatePath;
/**
 * interpolate object with {string:number}. ie. {x:10}.
 * both objects must have same keys.
 * @param objStart object to start from
 * @param objTarget object to interpolate to
 * @param t 0..1
 * @returns interpolated object
 */
const interpolateObject = (objStart, objTarget, t) => {
    const obj = {};
    if (Object.keys(objStart).length !== Object.keys(objTarget).length)
        throw new Error("interpolateObject(): objects must have same keys");
    for (const key in objStart) {
        if (!(key in objTarget))
            throw new Error("interpolateObject(): objects must have same keys");
        obj[key] = (0, math_1.mix)(objStart[key], objTarget[key], t);
    }
    return obj;
};
exports.interpolateObject = interpolateObject;
/**
 * interpolate number, number[], number[][] or generic object
 *
 * TODO:
 * - currently, string or boolean uses start value. (should it be t=0.5?)
 * - review TS implementation
 * - every if condition is redundant to check start AND target
 * @param start
 * @param target
 * @param t
 * @returns
 */
const interpolate = (
// start: number | number[] | Pts | GenericObject,
// target: number | number[] | Pts | GenericObject,
start, target, t) => {
    if (typeof start !== typeof target)
        throw new Error("interpolate(): both start and target args must be of same type");
    if (typeof start === "number" && typeof target === "number") {
        return (0, math_1.mix)(start, target, t);
    }
    else if (Array.isArray(start) && Array.isArray(target)) {
        if (start[0].constructor === Array && target[0].constructor === Array) {
            // 2d array
            return (0, exports.interpolatePath)(start, target, t);
        }
        else {
            // 1d array
            return (0, exports.interpolateArray)(start, target, t);
        }
        // } else if (start.constructor === Object) {
    }
    else if (typeof start === "object" &&
        start !== null &&
        typeof target === "object" &&
        target !== null) {
        // object
        return (0, exports.interpolateObject)(start, target, t);
    }
    else {
        // string or boolean
        return start;
    }
};
exports.interpolate = interpolate;
/**
 * project a point on a line using vector.
 * @param pt point
 * @param line line segment
 * @returns point on the line
 */
const projectPointOnLine = (pt, line) => {
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
 */
const reflectPoint = (pt, axis) => {
    if (axis[0].constructor === Array) {
        const projVec = gl_vec2_1.default.fromValues(...(0, exports.projectPointOnLine)(pt, axis));
        const distVec = gl_vec2_1.default.sub([], gl_vec2_1.default.fromValues(pt[0], pt[1]), projVec);
        const reflVec = gl_vec2_1.default.sub(projVec, projVec, distVec);
        return reflVec;
    }
    else {
        return [
            (0, math_1.reflect)(pt[0], axis[0]),
            (0, math_1.reflect)(pt[1], axis[1]),
        ];
    }
};
exports.reflectPoint = reflectPoint;
/**
 * reflect a path either on a point or a line
 * @param pts data that needs to be mirrored
 * @param axis mirror axis. either point or line
 * @returns
 */
const reflectPath = (pts, axis) => {
    return pts.map((pt) => (0, exports.reflectPoint)(pt, axis));
};
exports.reflectPath = reflectPath;
/**
 * scale a single point
 * @param pt a point [x, y]
 * @param size [width, height] to scale to
 * @returns scaled point [x, y]`
 */
const scalePoint = (pt, size) => {
    const [x, y] = pt;
    const [w, h] = size;
    return [x * w, y * h];
};
exports.scalePoint = scalePoint;
/**
 * take normalized path data and return [ x, y ] scaled to width and height
 * @param path array of [x, y] normalized point pairs
 * @param size [width, height] to scale to
 * @returns new array of [x, y]
 */
const scalePath = (path, size) => {
    return path.map((pt) => (0, exports.scalePoint)(pt, size));
};
exports.scalePath = scalePath;
/**
 * by default, path t value is based on number of points. this function calculates t based on each segment length.
 *
 * TODO:
 * - implement
 * @param path
 * @returns {number[]} t values for each pt index
 */
const calcTByLength = (path) => {
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
 */
const combinePath = (path1, path2, mode) => {
    return path1;
};
exports.combinePath = combinePath;
//# sourceMappingURL=index.js.map