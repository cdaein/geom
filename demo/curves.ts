import { createCanvas } from "@daeinc/canvas";
import { drawPath, drawSmoothPath } from "@daeinc/draw";
import { generateSmoothPath } from "../dist/index.js";
import type { Pt, Pts } from "../dist/index";

const width = 500;
const height = 500;
const { canvas, context: ctx } = createCanvas({ width, height }) as {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
};

const path = [
  [50, 50],
  [200, 80],
  [350, 50],
  [450, 120],
  [250, 200],
  [50, 350],
  [80, 480],
];

const pathSmooth = generateSmoothPath(path, 0.3);

// console.log(path);
// console.log(pathSmooth);

ctx.fillStyle = `#808080`;
ctx.fillRect(0, 0, width, height);

drawPath(ctx, path);
ctx.strokeStyle = `yellow`;
ctx.stroke();

drawSmoothPath(ctx, pathSmooth);
ctx.strokeStyle = `white`;
ctx.lineWidth = 8;
ctx.stroke();
