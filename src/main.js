import {Mesh} from "./Structures/Mesh.js";
import {Triangle} from "./Structures/Triangle.js";
import {matRotateX, matRotateY, matRotateZ, matProject} from "./MathStuff/Matrices.js";
import {degToRad, matMultiply, vecProductNorm} from "./MathStuff/MathFunctions.js";
import {toCameraDist} from "./MathStuff/Constants.js"
import {WIDTH, HEIGHT, c} from "./CanvasProperties.js";
import {clearCanvas, drawTriangle, fillTriangle} from "./DrawStuff/DrawFunctions.js";
import {cube} from "../resources/CubeExample.js";
import {cosBetweenVectors} from "./MathStuff/MathFunctions.js";
import {Point3D} from "./Structures/Point3D.js";

'use strict'
let angle = 0;

clearCanvas();

let triProjected = new Triangle();
let triRotated = new Triangle();
let triTranslated = new Triangle();

let toCamVector = new Point3D();
let normal = new Point3D();
let v1 = new Point3D(), v2 = new Point3D();
const points = ["p1", "p2", "p3"];
const coords = ["x", "y", "z"];
let cos;

function animate() {
    clearCanvas();
    angle = (angle + degToRad(1)) % degToRad(360);
    for (let tri of cube.triangles) {
            for (let point of points) {
                triRotated[point] = matMultiply(tri[point], matRotateY(angle));
            }
            triTranslated = triRotated;
            for (let point of points) {
                triTranslated[point].z = triRotated[point].z + toCameraDist;
            }

            for (let point of points) {
                triProjected[point] = matMultiply(triTranslated[point], matProject);
                triProjected[point].x += 1;
                triProjected[point].y += 1;
                triProjected[point].x = Math.floor(triProjected[point].x * 0.5 * WIDTH);
                triProjected[point].y = Math.floor(triProjected[point].y * 0.5 * HEIGHT);
            }
        for (let coord of coords) {
            toCamVector[coord] = triTranslated.p1[coord];
            v1[coord] = triTranslated.p2[coord] - triTranslated.p1[coord];
            v2[coord] = triTranslated.p3[coord] - triTranslated.p2[coord];
        }
        normal = vecProductNorm(v1, v2);
        cos = cosBetweenVectors(toCamVector, normal);
        if (cos < 0){
            fillTriangle(triProjected, cos);
        }

    }
    requestAnimationFrame(animate);
}
animate();
