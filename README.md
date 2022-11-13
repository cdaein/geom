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

const blendPath: (
  path1: Pts,
  path2: Pts,
  numBlends: number,
  guidePath?: Pts
) => number[][][];

const createShapeFunc: (
  pts: Pts,
  anchor?: Pt
) => (x: number, y: number, w: number, h: number) => Pts;

const dist: (pt1: Pt, pt2: Pt) => number;

const distSq: (pt1: Pt, pt2: Pt) => number;

const generateSmoothPath: (pts: Pts, smoothFactor: number) => number[][];

const getPathLength: (path: Pts) => number;

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

const interpolatePath: (
  pathStart: Pts,
  pathTarget: Pts,
  t: number
) => number[][];

const interpolateObject: (
  objStart: GenericObject,
  objTarget: GenericObject,
  t: number
) => GenericObject;

const interpolate: <T>(
  start: T,
  target: T,
  t: number
) => number | GenericObject | T;

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
