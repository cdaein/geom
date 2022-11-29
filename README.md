# @daeinc/geom

A collection of gemetry-related functions. Breaking changes expected in the future.

## Installation

```
npm i @daeinc/geom
```

then,

```js
import { blendPath, ... } from "@daeinc/geom";
```

## Types

```ts
type Pt = number[];
type Pts = number[][];
type GenericObject = Record<string, any>;
```

Three custom types are used.

## Functions

### blendPath

```ts
const blendPath: (
  path1: Pts,
  path2: Pts,
  numBlends: number,
  guidePath?: Pts
) => number[][][];
```

Interpolates two paths to create in-between paths. `numBlends` does not count the two original paths. In other words, the two original paths are not included in the return array. `guidePath` parameter is not yet implemented.

### createShapeFunc

```ts
const createShapeFunc: (
  pts: Pts,
  anchor?: Pt
) => (x: number, y: number, w: number, h: number) => Pts;
```

### dist

```ts
const dist: (pt1: Pt, pt2: Pt) => number;
```

Returns a distance between two points.

### distSq

```ts
const distSq: (pt1: Pt, pt2: Pt) => number;
```

Returns a squared distance between two points. There's another version in `@daeinc/math` that takes `number` arguments.

### extrudePath

```ts
const extrudePath: (
  path: Pts,
  numPointsToExtrude: number,
  offset: Pt,
  mode?: "start" | "end" | "both",
  shapeFunc?: () => Pts
) => number[][];
```

Extrudes a path in 2d space.

### generateSmoothPath

```ts
const generateSmoothPath: (pts: Pts, smoothFactor: number) => number[][];
```

Generates extra points for smooth corners of path. Use with `drawSmoothPath()` from another package, `@daeinc/canvas`

### getAngleBetween

```ts
const getAngleBetween: (pt1: number[], pt2: number[]) => number;
```

Get angle between two points using `Math.atan2()`. `pt2 - pt1` is the order of subtraction.

### getPathLength

```ts
const getPathLength: (path: Pts) => number;
```

Returns the total length of path

### getSegmentLengths

```ts
const getSegmentLengths: (pts: Pts) => number[];
```

Returns an array with each segment length (distance between points).

### interpolateArray

```ts
const interpolateArray: (
  arrStart: number[],
  arrTarget: number[],
  t: number
) => number[];
```

### interpolatePath

```ts
const interpolatePath: (
  pathStart: Pts,
  pathTarget: Pts,
  t: number
) => number[][];
```

Interpolates between two number arrays. Usually used for path data of `[x, y]`.

### interpolateObject

```ts
const interpolateObject: (
  objStart: GenericObject,
  objTarget: GenericObject,
  t: number
) => GenericObject;
```

Interpolates between two objects formatted `{ string: number }`. For example, `{ x: 10, y: 20 }`.

### interpolate

```ts
const interpolate: <T>(
  start: T,
  target: T,
  t: number
) => number | GenericObject | T;
```

Interpolates `number`, `number[]`, `number[][]` or generic object.

### projectPointOnLine

```ts
const projectPointOnLine: (pt: Pt, line: Pts) => Pt;
```

Projects a point on a line.

## reflectPoint

```ts
const reflectPoint: (pt: Pt, axis: Pt | Pts) => Pt;
```

Reflects a point on another point or a line.

### reflectPath

```ts
const reflectPath: (pts: Pts, axis: Pt | Pts) => Pts;
```

Reflects a path either on a point or a line.

### scalePoint

```ts
const scalePoint: (pt: Pt, size: Pt) => Pt;
```

Scales a single point.

### scalePath

```ts
const scalePath: (path: Pts, size: Pt) => Pts;
```

Takes in normalized path data and returns `[ x, y ]` that is scaled to size, `[ width, height ]`.

## To Dos

- reconcile the use of both `Float32Array`(`gl-vec2`) and regular array
- add Canvas mock tests
  - https://github.com/hustcc/jest-canvas-mock
  - https://github.com/americanexpress/jest-image-snapshot/
  - https://yonatankra.com/how-to-test-html5-canvas-with-jest/

## License

MIT
