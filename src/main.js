'use strict';

import {Mesh} from "./Structures/Mesh.js";
import {Triangle} from "./Structures/Triangle.js";
import {matRotateX, matRotateY, matRotateZ, matProject, matDiagonal, matTranslate} from "./MathStuff/Matrices.js";
import {degToRad, multVecMat, multMatMat} from "./MathStuff/MathFunctions.js";
import {toCameraDist, WIDTH, HEIGHT, c, aspectRatio, fovRad} from "./MathStuff/Constants.js"
import {clearCanvas, drawTriangle, fillTriangle} from "./DrawStuff/DrawFunctions.js";
import {Vec} from "./Structures/Vec.js";
import {Scene} from './Structures/Scene.js'

let angle = 0;

clearCanvas();

const points = ['p1', 'p2', 'p3'];
const coords = ['x', 'y', 'z'];
const lightDirect = new Vec(1, 1, 1);
const vecOffset = new Vec(1,1,0);
lightDirect.normalize();

let frame = 0;
function animate() {
    clearCanvas();
    angle = (angle + degToRad(1)) % degToRad(360);
    const trisToRender = [];
    Object.keys(Scene).forEach(key => {

        let matWorld;
        matWorld = multMatMat(matRotateZ(angle), matRotateX(angle));
        matWorld = multMatMat(matWorld, matTranslate(0, 0, 20));

        for (const tri of Scene[key].triangles) {
            const triProjected = new Triangle();
            const triTransformed = new Triangle();

            for (let point of points) {
                triTransformed[point] = multVecMat(tri[point], matWorld);
                triTransformed[point].w += 3;
                triTransformed[point].toScreen();
            }

            const toCamVector = triTransformed.p1;
            const normal = triTransformed.normal();
            const cos = Vec.cos(toCamVector, normal);
            //console.log(cos);
            if (cos <= 0.1) {
                const illumination = Vec.cos(lightDirect, normal);
                for (const point of points) {
                    triProjected[point] = multVecMat(triTransformed[point], matProject);
                    triProjected[point] = Vec.sum(triProjected[point], vecOffset);
                    triProjected[point].x = Math.floor(triProjected[point].x * 0.5 * WIDTH);
                    triProjected[point].y = Math.floor(triProjected[point].y * 0.5 * HEIGHT);
                }
                trisToRender.push([Triangle.from(triProjected), illumination]);
            }
        }
   })

    trisToRender.sort((a, b) => {
        let res = 0;
        for (let p of points) {
            res += b[0][p].z - a[0][p].z;
        }
        return res;
    })
    for (let [tri, illum] of trisToRender) fillTriangle(tri, illum);

    requestAnimationFrame(animate);
}

animate();
