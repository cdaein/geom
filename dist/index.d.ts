export declare type Pt = number[];
export declare type Pts = number[][];
export declare type GenericObject = Record<string, any>;
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
export declare const blendPath: (path1: Pts, path2: Pts, numBlends: number, guidePath?: Pts) => number[][][];
/**
 * the resulting function is transformed to draw from center [0, 0]
 * @param pts must be a normalized array (0..1) of [x, y]s
 * @param anchor normalized center point [x, y]
 * @returns function to draw shape with given params (x,y,w,h)
 */
export declare const createShapeFunc: (pts: Pts, anchor?: Pt) => (x: number, y: number, w: number, h: number) => Pts;
/**
 * calculate distance between two point[]s
 * @param pt1
 * @param pt2
 * @returns
 */
export declare const dist: (pt1: Pt, pt2: Pt) => number;
/**
 * squared distance (x^2 + y^2) between two point[]s
 * @param pt1
 * @param pt2
 * @returns
 */
export declare const distSq: (pt1: Pt, pt2: Pt) => number;
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
export declare const extrudePath: (path: Pts, numPointsToExtrude: number, offset: Pt, mode?: "start" | "end" | "both", shapeFunc?: () => Pts) => number[][];
/**
 * generate extra points for smooth hard corners of path
 *
 * TODO: test
 *
 * @param pts point array
 * @param smoothFactor how smooth
 * @returns point array
 */
export declare const generateSmoothPath: (pts: Pts, smoothFactor: number) => import("@thi.ng/vectors").Vec[];
/**
 * atan2() gives angle between [-PI, PI]
 *
 * REVIEW: order or points matter, so what's the best way?
 *
 * @param pt1
 * @param pt2
 * @returns angle between [-PI, PI]
 */
export declare const getAngleBetween: (pt1: Pt, pt2: Pt) => number;
/**
 * take an array of points and return total length of path
 *
 * REVIEW:
 * - which is better, this or using getSegmentLengths()?
 *
 * @param path array of [ x, y ] points
 * @returns total length of path
 */
export declare const getPathLength: (path: Pts) => number;
/**
 * converts angle [-pi, pi] to [0, 2pi)
 * @param pt1
 * @param pt2
 * @returns angle between [0, TWO_PI]
 */
export declare const getPositiveAngleBetween: (pt1: Pt, pt2: Pt) => number;
/**
 * calculate each segment length(distance)
 * @param pts array of points [ x, y ]
 * @returns array of segment lengths
 */
export declare const getSegmentLengths: (pts: Pts) => number[];
export declare const interpolateArray: (arrStart: number[], arrTarget: number[], t: number) => number[];
/**
 * mix/lerp 2d number array. usually used for path data of [x, y]
 * @param pathStart array of [x, y] to start
 * @param pathTarget array of [x, y] to target
 * @param t 0..1
 * @returns 2d array
 */
export declare const interpolatePath: (pathStart: Pts, pathTarget: Pts, t: number) => number[][];
/**
 * interpolate object with {string:number}. ie. {x:10}.
 * both objects must have same keys.
 * @param objStart object to start from
 * @param objTarget object to interpolate to
 * @param t 0..1
 * @returns interpolated object
 */
export declare const interpolateObject: (objStart: GenericObject, objTarget: GenericObject, t: number) => GenericObject;
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
export declare const interpolate: <T>(start: T, target: T, t: number) => number | GenericObject | T;
/**
 * project a point on a line using vector.
 * @param pt point
 * @param line line segment
 * @returns point on the line
 */
export declare const projectPointOnLine: (pt: Pt, line: Pts) => Pt;
/**
 * reflect a point on another point or a line
 * @param pt source point to be mirrored
 * @param axis mirror axis. either point (or line)
 * @returns
 */
export declare const reflectPoint: (pt: Pt, axis: Pt | Pts) => Pt;
/**
 * reflect a path either on a point or a line
 * @param pts data that needs to be mirrored
 * @param axis mirror axis. either point or line
 * @returns
 */
export declare const reflectPath: (pts: Pts, axis: Pt | Pts) => Pts;
/**
 * TODO: haven't tested "anchor" yet
 * REVIEW: need to round the result?
 * @param pt
 * @param angle
 * @param anchor
 * @returns
 */
export declare const rotatePoint: (pt: Pt, angle: number, anchor?: number[], precision?: number) => number[];
/**
 * scale a single point
 * @param pt a point [x, y]
 * @param size [width, height] to scale to
 * @returns scaled point [x, y]`
 */
export declare const scalePoint: (pt: Pt, size: Pt) => Pt;
/**
 * take normalized path data and return [ x, y ] scaled to width and height
 * @param path array of [x, y] normalized point pairs
 * @param size [width, height] to scale to
 * @returns new array of [x, y]
 */
export declare const scalePath: (path: Pts, size: Pt) => Pts;
/**
 * by default, path t value is based on number of points. this function calculates t based on each segment length.
 *
 * TODO:
 * - implement
 * @param path
 * @returns {number[]} t values for each pt index
 */
export declare const calcTByLength: (path: Pts) => number[];
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
export declare const combinePath: (path1: Pts, path2: Pts, mode: string) => Pts;
//# sourceMappingURL=index.d.ts.map