import { mix, reflect, roundF, TWO_PI } from "@daeinc/math";
import { interpolateArray as importedInterpolateArray } from "@daeinc/array";
import {
  add2 as add,
  dot2 as dot,
  mag,
  mul2 as mul,
  sub2 as sub,
  vec2,
  normalize2 as normalize,
} from "@thi.ng/vectors";

// not decided on whether to use custom tuple type
// export type Pt = [number, number, number?]; // a single point [x, y, z?]
// export type Pts = Pt[]; // path or array of points
export type Pt = number[]; // a single point [x, y]
export type Pts = Pt[]; // path or array of points
export type GenericObject = Record<string, any>;

/**
 * Generates an array of paths (excl. original 2 paths).
 *
 * TODO:
 * - guidePath: input another path to use as shaping path.
 *   this path should already be resampled so that path points can be used as numBlends,
 *   or use numBlends param to resample within this function.
 *
 * @param path1 array of `[x, y]` to blend from
 * @param path2 array of `[x, y]` to blend to
 * @param numBlends how many blended paths to generate (excl. two original paths)
 * @param guidePath optional. custom path that blended paths will follow along.
 * @returns 3d array of paths `[number of blends][each blended path][x, y]`
 */
export const blendPath = (
  path1: Pts,
  path2: Pts,
  numBlends: number,
  // guidePath?: Pts
) => {
  return Array(numBlends)
    .fill([])
    .map((_, i) => {
      const t = (i + 1) / (numBlends + 1);
      return interpolatePath(path1, path2, t);
    });
};

/**
 * The resulting function is transformed to draw from center `[0, 0]`.
 *
 * @param pts must be a normalized array (0..1) of `[x, y]`s
 * @param anchor normalized center point `[x, y]`. default: `[0.5, 0.5]`
 * @returns function to draw shape with given params `(x, y, w, h)`
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
 * Calculate distance between two points.
 *
 * @param pt1
 * @param pt2
 * @returns
 */
export const dist = (pt1: Pt, pt2: Pt): number => {
  return Math.sqrt(Math.pow(pt2[0] - pt1[0], 2) + Math.pow(pt2[1] - pt1[1], 2));
};

/**
 * Squared distance `x^2 + y^2` between two points
 *
 * @param pt1
 * @param pt2
 * @returns
 */
export const distSq = (pt1: Pt, pt2: Pt): number => {
  return Math.pow(pt2[0] - pt1[0], 2) + Math.pow(pt2[1] - pt1[1], 2);
};

/**
 * Extrude path in 2d space.
 *
 * TODO:
 * - instead of preventing numPoints<path length, continue to extrude. use modulo.
 * - add custom shapeFunc
 *
 * @param path array of `[ x, y ]`
 * @param numPointsToExtrude how many points to use for extruding (mirroring). useful when extruding same path again.
 * @param offset `[ x, y ]` how much +/- in each dimension. if number, will be converted to number[]
 * @param mode "start" (reverse direction) | "end" | "both" (closed path)
 * @param shapeFunc optional. function on how to extrude if other than straight line
 * @returns path
 */
export const extrudePath = (
  path: Pts,
  numPointsToExtrude: number,
  offset: Pt | number,
  mode: "start" | "end" | "both" = "end",
  // shapeFunc?: () => Pts
) => {
  if (numPointsToExtrude > path.length) {
    throw new Error(
      "extrudePath(): numPointsToExtrude can't exceed length of path",
    );
  }

  if (typeof offset === "number") {
    offset = [offset, offset];
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

/**
 * Generate extra points for smooth hard corners of path.
 *
 * TODO: test
 *
 * @param pts point array
 * @param smoothFactor how smooth
 * @returns point array
 */
export const generateSmoothPath = (pts: Pts, smoothFactor: number) => {
  const smoothPoints = [];
  smoothPoints.push(pts[0]);
  for (let i = 0; i < pts.length - 1; i++) {
    const a = pts[i];
    const b = pts[i + 1];
    const diff = sub([], b, a);
    const diffScaled1 = mul([], diff, [smoothFactor, smoothFactor]);
    const mid1 = add([], a, diffScaled1);
    const diffScaled2 = mul([], diff, [1 - smoothFactor, 1 - smoothFactor]);
    const mid2 = add([], a, diffScaled2);
    smoothPoints.push(mid1, mid2, b);
  }
  return smoothPoints;
};

/**
 * `atan2()` gives angle between `[-PI, PI]`.
 *
 * REVIEW: order or points matter, so what's the best way?
 *
 * @param pt1
 * @param pt2
 * @returns angle between `[-PI, PI]`
 */
export const getAngleBetween = (pt1: Pt, pt2: Pt) => {
  return Math.atan2(pt2[1] - pt1[1], pt2[0] - pt1[0]);
};

/**
 * Take an array of points and return total length of path.
 *
 * REVIEW:
 * - which is better, this or using getSegmentLengths()?
 *
 * @param path array of `[ x, y ]` points
 * @returns total length of path
 */
export const getPathLength = (path: Pts): number => {
  return path.reduce((totalLen, _pt, i, arr) => {
    if (arr.length < 2) return 0; // handle single point length
    if (i === arr.length - 1) return totalLen; // skip last one (no i+1 there)
    return (
      totalLen +
      Math.sqrt(
        Math.pow(arr[i + 1][0] - arr[i][0], 2) +
          Math.pow(arr[i + 1][1] - arr[i][1], 2),
      )
    );
  }, 0);
};

/**
 * Converts angle `[-pi, pi]` to `[0, 2pi)`
 * @param pt1
 * @param pt2
 * @returns angle between [0, TWO_PI]
 */
export const getPositiveAngleBetween = (pt1: Pt, pt2: Pt) => {
  const angle = getAngleBetween(pt1, pt2);
  return angle >= 0 ? angle : angle + TWO_PI;
};

/**
 * Calculate each segment length(distance).
 * @param pts array of points [ x, y ]
 * @returns array of segment lengths
 */
export const getSegmentLengths = (pts: Pts) => {
  const result: number[] = [];
  for (let i = 0; i < pts.length - 1; i++) {
    const d = dist(pts[i], pts[i + 1]);
    result.push(d);
  }
  return result;
};

export const interpolateArray = importedInterpolateArray; // REVIEW: hmm...

/**
 * Mix/lerp 2d number array. usually used for path data of `[x, y]`
 *
 * @param pathStart array of `[x, y]` to start
 * @param pathTarget array of `[x, y]` to target
 * @param t 0..1
 * @param out array to mutate
 * @returns 2d array
 */
export const interpolatePath = (
  pathStart: Pts,
  pathTarget: Pts,
  t: number,
  out?: Pts,
) => {
  if (pathStart.length === 0 || pathTarget.length === 0)
    throw new Error("interpolatePath(): path cannot be empty");
  if (pathStart.length !== pathTarget.length)
    throw new Error("interpolatePath(): length must be same");

  out = out || new Array(pathStart.length).fill([]).map(() => [0, 0]);
  for (let i = 0; i < pathStart.length; i++) {
    out[i][0] = mix(pathStart[i][0], pathTarget[i][0], t);
    out[i][1] = mix(pathStart[i][1], pathTarget[i][1], t);
  }
  return out;
};

/**
 * interpolate object with `{string: number}`. ie. `{ x: 10 }`.
 * both objects must have same keys.
 *
 * TODO: can i mutate object with out parameter?
 *
 * @param objStart object to start from
 * @param objTarget object to interpolate to
 * @param t 0..1
 * @returns interpolated object
 */
export const interpolateObject = (
  objStart: GenericObject,
  objTarget: GenericObject,
  t: number,
): GenericObject => {
  if (Object.keys(objStart).length !== Object.keys(objTarget).length)
    throw new Error("interpolateObject(): objects must have same keys");

  const out: GenericObject = {};

  for (const key in objStart) {
    if (!(key in objTarget))
      throw new Error("interpolateObject(): objects must have same keys");

    out[key] = mix(objStart[key], objTarget[key], t);
  }
  return out;
};

// type InterpolateArg = number | Pt | Pts | GenericObject;

/**
 * Interpolate number, number[], number[][] or generic object
 *
 * TODO:
 * - currently, string or boolean uses start value. (should it be t=0.5?)
 * - review TS implementation
 * - every if condition is redundant to check start AND target
 *
 * @param start
 * @param target
 * @param t
 * @param out array to mutate (with 1d or 2d array)
 * @returns
 */
// export const interpolate = (
//   start: number | Pt | Pts | GenericObject,
//   target: number | Pt | Pts | GenericObject,
//   t: number,
//   out?: number | Pt | Pts | GenericObject,
// ): number | Pt | Pts | GenericObject => {
// FIX: issue when T is number
export function interpolate<T>(start: T, target: T, t: number, out?: T): T {
  if (typeof start !== typeof target)
    throw new Error("interpolate(): start and target must be of same type");
  if (typeof start === "number" && typeof target === "number") {
    return mix(start, target, t) as T;
  } else if (Array.isArray(start) && Array.isArray(target)) {
    if (start[0].constructor === Array && target[0].constructor === Array) {
      // 2d array
      return interpolatePath(start as Pts, target as Pts, t, out as Pts) as T;
    } else {
      // 1d array
      out = out || (new Array(start.length) as T);
      return interpolateArray(start as Pt, target as Pt, t, out as Pt) as T;
    }
    // } else if (start.constructor === Object) {
  } else if (
    typeof start === "object" &&
    start !== null &&
    typeof target === "object" &&
    target !== null
  ) {
    // object
    return interpolateObject(start, target, t) as T;
  } else {
    // string or boolean
    return start;
  }
}

/**
 * Computes the polar coordinate from radius and angle (and optional offset).
 *
 * @param r - radius
 * @param theta - angle
 * @param offset - `[x, y]`. The default is `[0, 0]`
 * @returns `[x, y]` coordinate
 */
export const polar = (r: number, theta: number, offset: Pt = [0, 0]): Pt => [
  r * Math.cos(theta) + offset[0],
  r * Math.sin(theta) + offset[1],
];

/**
 * project a point on a line using vector.
 * @param pt point
 * @param line line segment
 * @returns point on the line
 */
export const projectPointOnLine = (pt: Pt, line: Pts): Pt => {
  const ptVec = vec2(pt[0] - line[1][0], pt[1] - line[1][1]);
  const lineVec = vec2(line[0][0] - line[1][0], line[0][1] - line[1][1]);
  const prod = dot(ptVec, lineVec);
  const proj = prod / mag(lineVec);
  const projVec = vec2(proj, proj);

  const result = normalize(lineVec, lineVec);
  mul(result, lineVec, projVec);
  add(result, result, line[1]);

  return [result[0], result[1]];
};

/**
 * reflect a point on another point or a line
 * @param pt source point to be mirrored
 * @param axis mirror axis. either point (or line)
 * @returns
 */
export const reflectPoint = (pt: Pt, axis: Pt | Pts): Pt => {
  if (axis[0].constructor === Array) {
    const projVec = vec2(
      ...(projectPointOnLine(pt, axis as Pts) as [number, number]),
    );
    const distVec = sub([], vec2(pt[0], pt[1]), projVec);
    const reflVec = sub(projVec, projVec, distVec);
    return [reflVec[0], reflVec[1]];
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
 * TODO: haven't tested "anchor" yet
 * REVIEW: need to round the result?
 * @param pt
 * @param angle
 * @param anchor
 * @returns
 */
export const rotatePoint = (
  pt: Pt,
  angle: number,
  anchor = [0, 0],
  precision = 5,
) => {
  const x = anchor[0] + Math.cos(angle) * pt[0];
  const y = anchor[1] + Math.sin(angle) * pt[1];
  return [roundF(x, precision), roundF(y, precision)];
};

/**
 * scale a single point
 * @param pt a point [x, y]
 * @param size [width, height] to scale to. if number, it is converted to number[]
 * @returns scaled point [x, y]`
 */
export const scalePoint = (pt: Pt, size: Pt | number): Pt => {
  const [x, y] = pt;
  const [w, h] = typeof size === "number" ? [size, size] : size;
  return [x * w, y * h];
};

/**
 * take normalized path data and return [ x, y ] scaled to width and height
 * @param path array of [x, y] normalized point pairs
 * @param size [width, height] to scale to. if number, it is scaled to number[]
 * @returns new array of [x, y]
 */
export const scalePath = (path: Pts, size: Pt | number): Pts => {
  size = typeof size === "number" ? [size, size] : size;
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
// export const calcTByLength = (path: Pts): number[] => {
//   return [];
// };

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
// export const combinePath = (path1: Pts, path2: Pts, mode: string) => {
//   return path1;
// };
