import { drawPath } from "@daeinc/draw";
import {
  projectPointOnLine,
  reflectPoint,
  reflectPath,
} from "../dist/index.js";

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
const width = 500;
const height = 500;
canvas.width = width;
canvas.height = height;
document.body.appendChild(canvas);

let count = 0;

function loop() {
  ctx.fillStyle = "lightgray";
  ctx.fillRect(0, 0, width, height);

  const pt: [number, number] = [
    50 + Math.cos(count * 0.03) * 30,
    50 + Math.sin(count * 0.02) * 30,
  ];
  const path = [
    [10, 10],
    [40, 50],
    [10, 90],
  ];
  const line = [
    [100, Math.sin(count * 0.01) * 50 + 50],
    [0, Math.cos(count * 0.01) * 50 + 50],
  ];
  const projPt = projectPointOnLine(pt, line);
  const reflPt = reflectPoint(pt, line);
  const reflPath = reflectPath(path, line);

  ctx.save();
  ctx.translate(200, 200);

  ctx.fillStyle = "rgba(255,255,255,0.5)";
  ctx.fillRect(0, 0, 100, 100);

  ctx.beginPath();
  ctx.arc(pt[0], pt[1], 3, 0, Math.PI * 2);
  ctx.fillStyle = "black";
  ctx.fill();

  drawPath(ctx, line);
  ctx.stroke();

  // perpendicular line
  drawPath(ctx, [pt, reflPt]);
  ctx.strokeStyle = "gray";
  ctx.stroke();

  // projected point
  ctx.beginPath();
  ctx.arc(projPt[0], projPt[1], 2, 0, Math.PI * 2);
  ctx.fillStyle = "red";
  ctx.fill();

  // reflected point
  ctx.beginPath();
  ctx.arc(reflPt[0], reflPt[1], 3, 0, Math.PI * 2);
  ctx.fillStyle = "green";
  ctx.fill();

  // original path
  drawPath(ctx, path);
  ctx.strokeStyle = "gray";
  ctx.stroke();

  drawPath(ctx, reflPath);
  ctx.strokeStyle = "gray";
  ctx.stroke();

  ctx.restore();

  count++;
  window.requestAnimationFrame(loop);
}

loop();
