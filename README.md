# @daeinc/geom

A collection of gemetry-related functions. Breaking changes expected in the future.

## Installation

```
npm i @daeinc/geom
```

then

```js
import { blendPath } from "@daeinc/geom";
```

## Functions

```ts
type Pt = number[];
type Pts = number[][];
type GenericObject = Record<string, any>;

/**
 * generates an array of paths (excl. original 2 paths)
 * @param path1 array of [x, y] to blend from
 * @param path2 array of [x, y] to blend to
 * @param numBlends how many blended paths to generate (excl. two original paths)
 * @param guidePath optional. custom path that blended paths will follow along.
 * @returns 3d array of paths [number of blends][each blended path][x, y]
 */
const blendPath: (
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
const createShapeFunc: (
  pts: Pts,
  anchor?: Pt
) => (x: number, y: number, w: number, h: number) => Pts;

const dist: (pt1: Pt, pt2: Pt) => number;

const distSq: (pt1: Pt, pt2: Pt) => number;

const generateSmoothPath: (pts: Pts, smoothFactor: number) => number[][];

/**
 * take an array of points and return total length of path
 * @param path array of [ x, y ] points
 * @returns total length of path
 */
const getPathLength: (path: Pts) => number;

/**
 * extrude path in 2d space
 * @param path array of [ x, y ]
 * @param numPointsToExtrude how many points to use for extruding (mirroring). useful when extruding same path again.
 * @param offset [ x, y ] how much +/- in each dimension
 * @param mode start (reverse direction) | end | both (closed path)
 * @param shapeFunc optional. function on how to extrude if other than straight line
 * @returns path
 */
const extrudePath: (
  path: Pts,
  numPointsToExtrude: number,
  offset: Pt,
  mode?: "start" | "end" | "both",
  shapeFunc?: () => Pts
) => number[][];

const interpolateArray: (
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
const interpolatePath: (
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
const interpolateObject: (
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
const interpolate: <T>(
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
const projectPointOnLine: (pt: Pt, line: Pts) => Pt;

const reflectPoint: (pt: Pt, axis: Pt | Pts) => Pt;

const reflectPath: (pts: Pts, axis: Pt | Pts) => Pts;

const scalePoint: (pt: Pt, size: Pt) => Pt;

const scalePath: (path: Pts, size: Pt) => Pts;
```

## To Dos

- reconcile the use of both `Float32Array`(`gl-vec2`) and regular array
- add Canvas mock tests
  - https://github.com/hustcc/jest-canvas-mock
  - https://github.com/americanexpress/jest-image-snapshot/
  - https://yonatankra.com/how-to-test-html5-canvas-with-jest/

## License

MIT
