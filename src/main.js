import {Mesh} from "./Structures/Mesh.js";
import {Triangle} from "./Structures/Triangle.js";
import {matRotateX, matRotateY, matRotateZ, matProject} from "./MathStuff/Matrices.js";
import {degToRad, matMultiply} from "./MathStuff/MathFunctions.js";
import {toCameraDist} from "./MathStuff/Constants.js"
import {WIDTH, HEIGHT} from "./UserStuff/CanvasProperties.js";
import {clearCanvas, drawTriangle} from "./DrawStuff/DrawFunctions.js";
import {cube} from "./UserStuff/CubeExample.js";

'use strict'
let angle = 0;

clearCanvas();
function animate() {
    clearCanvas();

    angle = (angle + degToRad(1)) % degToRad(360);

    let triProjected = new Triangle();
    let triRotated = new Triangle();
    let triTranslated = new Triangle();

    const points = ["p1", "p2", "p3"];
    for (let tri of cube.triangles) {

        for (let point of points) {
            triRotated[point] = matMultiply(tri[point], matRotateX(angle));
            triRotated[point] = matMultiply(triRotated[point], matRotateZ(angle));
        }
        triTranslated = triRotated;
        for (let point of points) {
            triTranslated[point].z = triRotated[point].z + toCameraDist;
        }

        for (let point of points){
            triProjected[point] = matMultiply(triTranslated[point], matProject);
            triProjected[point].x += 1;
            triProjected[point].y += 1;
            triProjected[point].x = Math.floor(triProjected[point].x * 0.5 * WIDTH);
            triProjected[point].y = Math.floor(triProjected[point].y * 0.5 * HEIGHT);
        }
        drawTriangle(triProjected);

    }
    requestAnimationFrame(animate);
}
animate();
