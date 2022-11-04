# @daeinc/geom

A collection of gemetry-related functions. Breaking changes expected in the future.

## Installation

```
npm i @daeinc/geom
```

## Functions

```ts
export declare type Pt = number[];
export declare type Pts = number[][];
export declare type GenericObject = Record<string, any>;
/**
 * generates an array of paths (excl. original 2 paths)
 * @param path1 array of [x, y] to blend from
 * @param path2 array of [x, y] to blend to
 * @param numBlends how many blended paths to generate (excl. two original paths)
 * @param guidePath optional. custom path that blended paths will follow along.
 * @returns 3d array of paths [number of blends][each blended path][x, y]
 */
export declare const blendPath: (
  path1: Pts,
  path2: Pts,
  numBlends: number,
  guidePath?: Pts
) => number[][][];
/**
 * the resulting function is transformed to draw from center [0, 0]
 * @param pts must be a normalized array (0..1) of [x, y]s
 * @param anchor normalized center point [x, y]
 * @returns function to draw shape with given params (x,y,w,h)
 */
export declare const createShapeFunc: (
  pts: Pts,
  anchor?: Pt
) => (x: number, y: number, w: number, h: number) => Pts;
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
 * take an array of points and return total length of path
 * @param path array of [ x, y ] points
 * @returns total length of path
 */
export declare const getPathLength: (path: Pts) => number;
/**
 * extrude path in 2d space
 * @param path array of [ x, y ]
 * @param numPointsToExtrude how many points to use for extruding (mirroring). useful when extruding same path again.
 * @param offset [ x, y ] how much +/- in each dimension
 * @param mode start (reverse direction) | end | both (closed path)
 * @param shapeFunc optional. function on how to extrude if other than straight line
 * @returns path
 */
export declare const extrudePath: (
  path: Pts,
  numPointsToExtrude: number,
  offset: Pt,
  mode?: "start" | "end" | "both",
  shapeFunc?: () => Pts
) => number[][];
export declare const interpolateArray: (
  arrStart: number[],
  arrTarget: number[],
  t: number
) => number[];
/**
 * mix/lerp 2d number array. usually used for path data of [x, y]
 * @param pathStart array of [x, y] to start
 * @param pathTarget array of [x, y] to target
 * @param t 0..1
 * @returns 2d array
 */
export declare const interpolatePath: (
  pathStart: Pts,
  pathTarget: Pts,
  t: number
) => number[][];
/**
 * interpolate object with {string:number}. ie. {x:10}.
 * both objects must have same keys.
 * @param objStart object to start from
 * @param objTarget object to interpolate to
 * @param t 0..1
 * @returns interpolated object
 */
export declare const interpolateObject: (
  objStart: GenericObject,
  objTarget: GenericObject,
  t: number
) => GenericObject;
/**
 * interpolate number, number[], number[][] or generic object
 * @param start
 * @param target
 * @param t
 * @returns
 */
export declare const interpolate: <T>(
  start: T,
  target: T,
  t: number
) => number | GenericObject | T;
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
```

## To Dos

- reconcile the use of both `Float32Array`(`gl-vec2`) and regular array
- add Canvas mock tests
  - https://github.com/hustcc/jest-canvas-mock
  - https://github.com/americanexpress/jest-image-snapshot/
  - https://yonatankra.com/how-to-test-html5-canvas-with-jest/

## License

MIT
