import { mix, reflect } from "@daeinc/math";
import { interpolateArray as importedInterpolateArray } from "@daeinc/array";
import vec2 from "gl-vec2";

// not decided on whether to use custom tuple type
// export type Pt = [number, number, number?]; // a single point [x, y, z?]
// export type Pts = Pt[]; // path or array of points
export type Pt = number[]; // a single point [x, y]
export type Pts = number[][]; // path or array of points
export type GenericObject = Record<string, any>;

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
export const blendPath = (
  path1: Pts,
  path2: Pts,
  numBlends: number,
  guidePath?: Pts
) => {
  return Array(numBlends)
    .fill([])
    .map((_, i) => {
      const t = (i + 1) / (numBlends + 1);
      return interpolatePath(path1, path2, t);
    });
};

/**
 * the resulting function is transformed to draw from center [0, 0]
 * @param pts must be a normalized array (0..1) of [x, y]s
 * @param anchor normalized center point [x, y]
 * @returns function to draw shape with given params (x,y,w,h)
 */
export const createShapeFunc = (pts: Pts, anchor: Pt = [0.5, 0.5]) => {
  return (x: number, y: number, w: number, h: number): Pts =>
    pts.map((pt) => {
      const xdiff = pt[0] - anchor[0];
      const ydiff = pt[1] - anchor[1];
      return [x + xdiff * w, y + ydiff * h];
    });
};

/**
 * calculate distance between two point[]s
 * @param pt1
 * @param pt2
 * @returns
 */
export const dist = (pt1: Pt, pt2: Pt): number => {
  return Math.sqrt(Math.pow(pt2[0] - pt1[0], 2) + Math.pow(pt2[1] - pt1[1], 2));
};

/**
 * squared distance (x^2 + y^2) between two point[]s
 * @param pt1
 * @param pt2
 * @returns
 */
export const distSq = (pt1: Pt, pt2: Pt): number => {
  return Math.pow(pt2[0] - pt1[0], 2) + Math.pow(pt2[1] - pt1[1], 2);
};

/**
 * take an array of points and return total length of path
 * @param path array of [ x, y ] points
 * @returns total length of path
 */
export const getPathLength = (path: Pts): number => {
  return path.reduce((totalLen, pt, i, arr) => {
    if (arr.length < 2) return 0; // handle single point length
    if (i === arr.length - 1) return totalLen; // skip last one (no i+1 there)
    return (
      totalLen +
      Math.sqrt(
        Math.pow(arr[i + 1][0] - arr[i][0], 2) +
          Math.pow(arr[i + 1][1] - arr[i][1], 2)
      )
    );
  }, 0);
};

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
export const extrudePath = (
  path: Pts,
  numPointsToExtrude: number,
  offset: Pt,
  mode: "start" | "end" | "both" = "end",
  shapeFunc?: () => Pts
) => {
  if (numPointsToExtrude > path.length) {
    throw new Error(
      "extrudePath(): numPointsToExtrude can't exceed length of path"
    );
  }

  const clone = [...path];

  if (mode === "end") {
    for (let i = path.length - 1; i >= path.length - numPointsToExtrude; i--) {
      const pt = path[i];
      clone.push([pt[0] + offset[0], pt[1] + offset[1]]);
    }
  } else if (mode === "start") {
    // push and reverse (faster than unshift)
    clone.reverse();
    for (let i = 0; i < numPointsToExtrude; i++) {
      const pt = path[i];
      clone.push([pt[0] + offset[0], pt[1] + offset[1]]);
    }
    // clone.reverse();
  } else if (mode === "both") {
    for (let i = path.length - 1; i >= path.length - numPointsToExtrude; i--) {
      const pt = path[i];
      clone.push([pt[0] + offset[0], pt[1] + offset[1]]);
    }
    clone.push(path[0]);
  }

  return clone;
};

export const interpolateArray = importedInterpolateArray; // REVIEW: hmm...

/**
 * mix/lerp 2d number array. usually used for path data of [x, y]
 * @param pathStart array of [x, y] to start
 * @param pathTarget array of [x, y] to target
 * @param t 0..1
 * @returns 2d array
 */
export const interpolatePath = (pathStart: Pts, pathTarget: Pts, t: number) => {
  if (pathStart.length === 0 || pathTarget.length === 0)
    throw new Error("interpolatePath(): path cannot be empty");
  if (pathStart.length !== pathTarget.length)
    throw new Error("interpolatePath(): length must be same");
  return Array(pathStart.length)
    .fill([])
    .map((_, i) => {
      return [
        mix(pathStart[i][0], pathTarget[i][0], t),
        mix(pathStart[i][1], pathTarget[i][1], t),
      ];
    });
};

/**
 * interpolate object with {string:number}. ie. {x:10}.
 * both objects must have same keys.
 * @param objStart object to start from
 * @param objTarget object to interpolate to
 * @param t 0..1
 * @returns interpolated object
 */
export const interpolateObject = (
  objStart: GenericObject,
  objTarget: GenericObject,
  t: number
): GenericObject => {
  const obj: GenericObject = {};
  if (Object.keys(objStart).length !== Object.keys(objTarget).length)
    throw new Error("interpolateObject(): objects must have same keys");
  for (const key in objStart) {
    if (!(key in objTarget))
      throw new Error("interpolateObject(): objects must have same keys");
    obj[key] = mix(objStart[key], objTarget[key], t);
  }
  return obj;
};

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
export const interpolate = <T>(
  // start: number | number[] | Pts | GenericObject,
  // target: number | number[] | Pts | GenericObject,
  start: T,
  target: T,
  t: number
) => {
  if (typeof start !== typeof target)
    throw new Error(
      "interpolate(): both start and target args must be of same type"
    );
  if (typeof start === "number" && typeof target === "number") {
    return mix(start, target, t);
  } else if (Array.isArray(start) && Array.isArray(target)) {
    if (start[0].constructor === Array && target[0].constructor === Array) {
      // 2d array
      return interpolatePath(start, target, t);
    } else {
      // 1d array
      return interpolateArray(start, target, t);
    }
    // } else if (start.constructor === Object) {
  } else if (
    typeof start === "object" &&
    start !== null &&
    typeof target === "object" &&
    target !== null
  ) {
    // object
    return interpolateObject(start, target, t);
  } else {
    // string or boolean
    return start;
  }
};

/**
 * project a point on a line using vector.
 * @param pt point
 * @param line line segment
 * @returns point on the line
 */
export const projectPointOnLine = (pt: Pt, line: Pts): Pt => {
  const ptVec = vec2.fromValues(pt[0] - line[1][0], pt[1] - line[1][1]);
  const lineVec = vec2.fromValues(
    line[0][0] - line[1][0],
    line[0][1] - line[1][1]
  );
  const prod = vec2.dot(ptVec, lineVec);
  const proj = prod / vec2.len(lineVec);
  const projVec = vec2.fromValues(proj, proj);

  const result = vec2.normalize(lineVec, lineVec);
  vec2.mul(result, lineVec, projVec);
  vec2.add(result, result, line[1]);

  return result;
};

/**
 * reflect a point on another point or a line
 * @param pt source point to be mirrored
 * @param axis mirror axis. either point (or line)
 * @returns
 */
export const reflectPoint = (pt: Pt, axis: Pt | Pts): Pt => {
  if (axis[0].constructor === Array) {
    const projVec = vec2.fromValues(
      ...(projectPointOnLine(pt, axis as Pts) as [number, number])
    );
    const distVec = vec2.sub([], vec2.fromValues(pt[0], pt[1]), projVec);
    const reflVec = vec2.sub(projVec, projVec, distVec);
    return reflVec;
  } else {
    return [
      reflect(pt[0], axis[0] as number),
      reflect(pt[1], axis[1] as number),
    ];
  }
};

/**
 * reflect a path either on a point or a line
 * @param pts data that needs to be mirrored
 * @param axis mirror axis. either point or line
 * @returns
 */
export const reflectPath = (pts: Pts, axis: Pt | Pts): Pts => {
  return pts.map((pt) => reflectPoint(pt, axis));
};

/**
 * scale a single point
 * @param pt a point [x, y]
 * @param size [width, height] to scale to
 * @returns scaled point [x, y]`
 */
export const scalePoint = (pt: Pt, size: Pt): Pt => {
  const [x, y] = pt;
  const [w, h] = size;
  return [x * w, y * h];
};

/**
 * take normalized path data and return [ x, y ] scaled to width and height
 * @param path array of [x, y] normalized point pairs
 * @param size [width, height] to scale to
 * @returns new array of [x, y]
 */
export const scalePath = (path: Pts, size: Pt): Pts => {
  return path.map((pt) => scalePoint(pt, size));
};

/**
 * by default, path t value is based on number of points. this function calculates t based on each segment length.
 *
 * TODO:
 * - implement
 * @param path
 * @returns {number[]} t values for each pt index
 */
export const calcTByLength = (path: Pts): number[] => {
  return [];
};

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
export const combinePath = (path1: Pts, path2: Pts, mode: string) => {
  return path1;
};
