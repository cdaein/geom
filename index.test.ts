// import { describe, expect, test } from "@jest/globals";
import { describe, expect, test } from "vitest";
import {
  scalePoint,
  scalePath,
  reflectPoint,
  reflectPath,
  projectPointOnLine,
  getPathLength,
  createShapeFunc,
  interpolatePath,
  interpolateObject,
  interpolate,
  extrudePath,
  blendPath,
} from "./index";
import type { Pts } from "./index";

const pts: Pts = [
  [0, 0], // t=0
  [20, 20], // t=0.333..
  [40, 40], // t=0.666..
  [60, 60], // t=0.999..
];
const pts2: Pts = [
  [20, 20], // t=0
  [40, 40], // t=0.333..
  [60, 60], // t=0.666..
  [80, 80], // t=0.999..
];
const normPts: Pts = [
  [0, 0],
  [0.5, 0.0],
  [0.5, 1.0],
  [1.0, 1.0],
];

describe("getPathLength()", () => {
  test("pts.length of 1 will return 0", () => {
    expect(getPathLength([pts[0]])).toBe(0);
    expect(getPathLength([pts[1]])).toBe(0);
  });
  test("pts.length of 2 will return line length", () => {
    /* [0,0] to [20,20], length is sqrt(800) */
    expect(getPathLength([pts[0], pts[1]])).toBeCloseTo(Math.sqrt(800));
  });
  test("pts.length of 3 or more returns total length", () => {
    expect(getPathLength(pts)).toBeCloseTo(Math.sqrt(7200));
    expect(getPathLength(pts)).toBeCloseTo(10 * Math.sqrt(72));
  });
});

describe("scalePoint", () => {
  test("not normalized: scale at 1 (same as original)", () => {
    expect(scalePoint(pts[0], [1, 1])).toStrictEqual(pts[0]);
    expect(scalePoint(pts[1], [1, 1])).toStrictEqual(pts[1]);
    expect(scalePoint(pts[2], [1, 1])).toStrictEqual(pts[2]);
  });
  test("not normalized: scale up", () => {
    // can use strictEqual here b/c I'm comparing equation itself.
    expect(scalePoint(pts[1], [2, 2])).toStrictEqual([
      pts[1][0] * 2,
      pts[1][1] * 2,
    ]);
    expect(scalePoint(pts[1] /* 20 */, [3.21, 1])[0]).toBeCloseTo(64.2);
    expect(scalePoint(pts[2] /* 40 */, [10.73, 9.003])).toStrictEqual([
      pts[2][0] * 10.73,
      pts[2][1] * 9.003,
    ]);
  });
  test("not normalized: scale down", () => {
    // prettier-ignore
    expect(scalePoint(pts[1], [0.5, 0.5])).toStrictEqual([ pts[1][0] * 0.5, pts[1][1] * 0.5 ]);
    expect(scalePoint(pts[1], [1, 0.5])[1]).toBeCloseTo(10);
    expect(scalePoint(pts[1], [1, 0.25])[1]).toBeCloseTo(5);
  });
  test("normalized: scale at 1 (same as original)", () => {
    expect(scalePoint(normPts[0], [1, 1])).toStrictEqual(normPts[0]);
    expect(scalePoint(normPts[1], [1, 1])).toStrictEqual(normPts[1]);
    expect(scalePoint(normPts[2], [1, 1])).toStrictEqual(normPts[2]);
  });
  test("normalized: scale up", () => {
    // prettier-ignore
    expect(scalePoint(normPts[0], [2, 2])).toStrictEqual([ normPts[0][0] * 2, normPts[0][1] * 2 ]);
    expect(scalePoint(normPts[1] /* [0.5, 0.0] */, [3.21, 1])[0]).toBeCloseTo(
      1.605
    );
    // prettier-ignore
    expect(scalePoint(normPts[2], [10.73, 9.003])).toStrictEqual([ normPts[2][0] * 10.73, normPts[2][1] * 9.003 ]);
  });
  test("normalized: scale down", () => {
    // prettier-ignore
    expect(scalePoint(normPts[0], [0.35, 0.35])).toStrictEqual([ normPts[0][0] * 0.35, normPts[0][1] * 0.35 ]);
    expect(scalePoint(normPts[1] /* [0.5, 0.0] */, [0.25, 1])[0]).toBeCloseTo(
      0.125
    );
  });
});

describe("scalePath()", () => {
  test("not normalized: scale at 1 (same as original)", () => {
    expect(scalePath(pts, [1, 1])).toStrictEqual(pts);
  });
  test("not normalized: scale up", () => {
    expect(scalePath([pts[1]], [2, 2])).toStrictEqual([
      [pts[1][0] * 2, pts[1][1] * 2],
    ]);
    expect(scalePath([pts[2]] /* [[40, 40]] */, [2.5, 0])[0]).toStrictEqual([
      100, 0,
    ]);
    // prettier-ignore
    expect(scalePath([pts[3]] /* [[60, 60]] */, [0, 3.2142])[0]).toStrictEqual([ 0, 192.852 ]);
  });
  test("not normalized: scale down", () => {
    expect(scalePath([pts[1]], [0.25, 0.4])).toStrictEqual([
      [pts[1][0] * 0.25, pts[1][1] * 0.4],
    ]);
    expect(scalePath([pts[2]] /* [[40, 40]] */, [0.2, 0])[0]).toStrictEqual([
      8, 0,
    ]);
    expect(scalePath([pts[3]] /* [[60, 60]] */, [0, 0.2142])[0]).toStrictEqual([
      0, 12.852,
    ]);
  });
  test("normalized: scale at 1 (same as original)", () => {
    expect(scalePath(normPts, [1, 1])).toStrictEqual(normPts);
  });
  test("normalized: scale up", () => {
    expect(scalePath([normPts[1]], [2, 2])).toStrictEqual([
      [normPts[1][0] * 2, normPts[1][1] * 2],
    ]);
    expect(scalePath([normPts[1]] /* [[.5, 0]] */, [2.2, 0])[0]).toStrictEqual([
      1.1, 0,
    ]);
    expect(
      scalePath([normPts[2]] /* [[.5, 1]] */, [3.2142, 0])[0]
    ).toStrictEqual([1.6071, 0]);
  });
  test("normalized: scale down", () => {
    expect(scalePath([normPts[1]], [0.25, 0.4])).toStrictEqual([
      [normPts[1][0] * 0.25, normPts[1][1] * 0.4],
    ]);
    expect(scalePath([normPts[1]] /* [[.5, 0]] */, [0.2, 0])[0]).toStrictEqual([
      0.1, 0,
    ]);
    expect(scalePath([normPts[2]] /* [[.5, 1]] */, [0.43, 0])[0]).toStrictEqual(
      [0.215, 0]
    );
  });
});

// prettier-ignore
describe("reflectPoint()", () => {
  test("reflects on x axis only", () => {
    expect(reflectPoint([0, 50], [20, 50])).toStrictEqual([40, 50]);
    expect(reflectPoint([20, 50], [20, 50])).toStrictEqual([20, 50]);
    expect(reflectPoint([50, 50], [20, 50])).toStrictEqual([-10, 50]);
    expect(reflectPoint([-40, 50], [0, 50])).toStrictEqual([40, 50]);
  });
  test("reflects on y axis only", () => {
    expect(reflectPoint([40, 50], [40, 80])).toStrictEqual([40, 110]);
    expect(reflectPoint([40, 80], [40, 80])).toStrictEqual([40, 80]);
    expect(reflectPoint([-100, 80], [40, 80])).toStrictEqual([180, 80]);
    expect(reflectPoint([30, 0], [30, 0])).toStrictEqual([30, 0]);
  });
  test("reflects on two axis", () => {
    expect(reflectPoint([0, 0], [0, 0])).toStrictEqual([0, 0]);
    expect(reflectPoint([-20, 40], [0, 0])).toStrictEqual([20, -40]);
    expect(reflectPoint([0, 0], [30, 20])).toStrictEqual([60, 40]);
    expect(reflectPoint([70, -30], [30, 20])).toStrictEqual([-10, 70]);
  });
  test("reflects on line axis", () => {
    expect(reflectPoint([10, 10], [[0, 50], [100, 50]])).toEqual([10,90]);
    expect(reflectPoint([30, 10], [[0, 0], [100, 100]])).toEqual([10, 30]);
  });
});

//prettier-ignore
describe("reflectPath()", () => {

  test("reflects on point", () => {
    const pts = [[0, 0], [20, 50], [0, 100]];
    const refl = [[100, 100], [80, 50], [100, 0]];
    expect(reflectPath(pts, [50, 50])).toEqual(refl);
  });
  test("reflects on line", () => {
    const pts = [[0,0], [20,20], [40,40], [60,60]];
    const refl = [[0, 100], [20, 80], [40, 60], [60, 40]];
    expect(reflectPath(pts, [[0, 50], [100, 50]])[0]).toEqual(refl[0]);
    expect(reflectPath(pts, [[0, 50], [100, 50]])[1]).toEqual(refl[1]);
    expect(reflectPath(pts, [[0, 50], [100, 50]])[2]).toEqual(refl[2]);
    expect(reflectPath(pts, [[0, 50], [100, 50]])[3]).toEqual(refl[3]);
  });
});

// prettier-ignore
describe("projectPointOnLine()", () => {
  const pt = [10, 10];
  const line = [[100, 0],[0, 100]];
  test("can project a point on a point that uses origin (0,0)", () => {
    expect(projectPointOnLine([4, 7], [[8, 4],[0, 0]])[0]).toBeCloseTo(6);
    expect(projectPointOnLine([4, 7], [[8, 4],[0, 0]])[1]).toBeCloseTo(3);
  });
  test("can project a point on a line", () => {
    // due to gl-vec2 TypedArray, can't compare as array.
    expect(projectPointOnLine(pt, line)[0]).toBeCloseTo(50);
    expect(projectPointOnLine(pt, line)[1]).toBeCloseTo(50);
  });
});

/*
[
  [0, 0],
  [0.5, 0.0],
  [0.5, 1.0],
  [1.0, 1.0],
];
*/

describe("createShapeFunc()", () => {
  // test("throws error with non-normalized path", () => {
  //   // REVIEW: shoud it throw an error?
  // });
  test("returns a shape function at anchor [0, 0]", () => {
    // prettier-ignore
    expect(createShapeFunc(normPts, [0, 0])(0, 0, 10, 10)).toStrictEqual([
      [0, 0], [5, 0], [5, 10], [10, 10],
    ]);
    // prettier-ignore
    expect(createShapeFunc(normPts, [0, 0])(5, 5, 10, 10)).toStrictEqual([
      [5, 5], [10, 5], [10, 15], [15, 15],
    ]);
  });
  test("returns a shape function at anchor [0.5, 0.5]", () => {
    // prettier-ignore
    expect(createShapeFunc(normPts, [0.5, 0.5])(0, 0, 10, 10)).toStrictEqual([
      [-5, -5], [0, -5], [0, 5], [5, 5],
    ]);
    // prettier-ignore
    expect(createShapeFunc(normPts, [0.5, 0.5])(5, 5, 10, 10)).toStrictEqual([
      [0, 0], [5, 0], [5, 10], [10, 10],
    ]);
  });
  test("returns a shape function at anchor [1.0, 1.0]", () => {
    // prettier-ignore
    expect(createShapeFunc(normPts, [1.0, 1.0])(0, 0, 10, 10)).toStrictEqual([
      [-10, -10], [-5, -10], [-5, 0], [0, 0],
    ]);
    // prettier-ignore
    expect(createShapeFunc(normPts, [1.0, 1.0])(10, 10, 10, 10)).toStrictEqual([
      [0, 0], [5, 0], [5, 10], [10, 10],
    ]);
  });
});

describe("interpolatePath()", () => {
  test("throws error when either path length is 0", () => {
    expect(() => interpolatePath([], pts, 0.0)).toThrow("path cannot be empty");
    expect(() => interpolatePath(pts, [], 0.0)).toThrow("path cannot be empty");
  });
  test("throws error when paths don't have same length", () => {
    expect(() => interpolatePath(pts, pts.slice(1, 3), 0.0)).toThrow(
      "length must be same"
    );
    expect(() => interpolatePath(pts.slice(0, 3), pts, 0.0)).toThrow(
      "length must be same"
    );
  });
  test("returns pathStart at t=0", () => {
    expect(interpolatePath(pts, pts2, 0.0)).toStrictEqual(pts);
  });
  test("returns pathTarget at t=1", () => {
    expect(interpolatePath(pts, pts2, 1.0)).toStrictEqual(pts2);
  });
  test("returns in-between path at any t=0..1", () => {
    expect(interpolatePath(pts, pts2, 0.5)).toStrictEqual([
      [10, 10],
      [30, 30],
      [50, 50],
      [70, 70],
    ]);
  });
});

describe("interpolateObject()", () => {
  const obj1 = { x: 10, y: 20 };
  const obj2 = { x: 30, y: 80 };
  const obj3 = { y: 100, z: 100 };
  const obj4 = { y: 60, x: 60, z: 60 };

  test("throws error when keys don't match", () => {
    expect(() => interpolateObject(obj1, obj3, 0.5)).toThrow(
      "objects must have same keys"
    );
    expect(() => interpolateObject(obj3, obj1, 0.5)).toThrow(
      "objects must have same keys"
    );
    expect(() => interpolateObject(obj1, obj4, 0.5)).toThrow(
      "objects must have same keys"
    );
    expect(() => interpolateObject(obj4, obj1, 0.5)).toThrow(
      "objects must have same keys"
    );
  });
  test("returns objStart at t=0", () => {
    expect(interpolateObject(obj1, obj2, 0.0)).toStrictEqual({ x: 10, y: 20 });
  });
  test("returns objTarget at t=1", () => {
    expect(interpolateObject(obj1, obj2, 1.0)).toStrictEqual({ x: 30, y: 80 });
  });
  test("returns in-between values at any t", () => {
    expect(interpolateObject(obj1, obj2, 0.5)).toStrictEqual({ x: 20, y: 50 });
    expect(interpolateObject(obj1, obj2, 0.25)).toStrictEqual({ x: 15, y: 35 });
  });
});

describe("interpolate()", () => {
  // TODO: need a better way to check type. (array===object)
  // test("throws error when types don't match", () => {
  //   expect(() => interpolate([10, 20], { x: 30, y: 40 }, 0.5)).toThrow(
  //     "both start and target args must be of same type"
  //   );
  // });
  test("returns number", () => {
    expect(interpolate(10, 30, 0.5)).toBe(20);
  });
  test("returns 1d array", () => {
    expect(interpolate([10, 100], [30, 40], 0.5)).toStrictEqual([20, 70]);
  });
  test("re-use 1d array", () => {
    const start = [10, 100];
    const end = [30, 40];
    interpolate(start, end, 0.5, start);
    expect(start).toStrictEqual([20, 70]);
  });
  test("returns 2d array", () => {
    expect(
      interpolate(
        [
          [10, 100],
          [2, 4],
        ],
        [
          [30, 40],
          [4, 8],
        ],
        0.5
      )
    ).toStrictEqual([
      [20, 70],
      [3, 6],
    ]);
  });
  test("re-use 2d array", () => {
    const a = [
      [0, 100],
      [200, 300],
    ];
    const b = [
      [100, 200],
      [500, 600],
    ];
    interpolate(a, b, 0.5, a);
    expect(a).toStrictEqual([
      [50, 150],
      [350, 450],
    ]);
  });
  test("returns object", () => {
    expect(interpolate({ x: 3, y: 3 }, { x: 9, y: 9 }, 0.5)).toStrictEqual({
      x: 6,
      y: 6,
    });
  });
  // test("re-use object", () => {
  //   const a = { x: 0, y: 100 };
  //   const b = { x: 100, y: 500 };
  //   interpolate(a, b, 0.5, a);
  //   expect(a).toStrictEqual({ x: 50, y: 300 });
  // });
});

describe("extrudePath()", () => {
  const pts: Pts = [
    [0, 0], // t=0
    [20, 20], // t=0.333..
    [40, 40], // t=0.666..
    [60, 60], // t=0.999..
  ];

  test("throws error if numPointsToExtrude is greater than path length", () => {
    expect(() => extrudePath(pts, 5, [10, 0])).toThrow(
      "numPointsToExtrude can't exceed length of path"
    );
  });
  test("extrudes 1 point in different modes", () => {
    expect(extrudePath(pts, 1, [10, 0], "end")).toStrictEqual([
      ...pts,
      [70, 60],
    ]);
    expect(extrudePath(pts, 1, [10, 0], "start")).toStrictEqual([
      ...[...pts].reverse(),
      [10, 0],
    ]);
  });
  test("extrudes 3 point in different modes", () => {
    expect(extrudePath(pts, 3, [10, 0], "end")).toStrictEqual([
      ...pts,
      [70, 60],
      [50, 40],
      [30, 20],
    ]);
    // prettier-ignore
    expect(extrudePath(pts, 3, [10, 0], "start")).toStrictEqual([
      ...[...pts].reverse(), [10, 0], [30, 20], [50, 40],
    ]);
    // prettier-ignore
    expect(
      extrudePath([[0, 0], [1, 1], [2, 2]], 2, [10, 0], "both")).toStrictEqual([
        [0, 0], [1, 1], [2, 2], [12, 2], [11, 1], [0, 0]
      ]);
  });
});

describe("blendPath()", () => {
  const path1: Pts = [
    [0, 0],
    [10, 10],
  ];
  const path2: Pts = [
    [10, 10],
    [30, 30],
  ];
  test("can create 1 blend", () => {
    expect(blendPath(path1, path2, 1)[0]).toStrictEqual([
      [5, 5],
      [20, 20],
    ]);
  });
  test("can create 50 blend", () => {
    expect(blendPath(path1, path2, 50).length).toBe(50);
  });
});
