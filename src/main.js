'use strict';

import {Mesh} from "./Structures/Mesh.js";
import {Triangle} from "./Structures/Triangle.js";
import {
    matRotateX,
    matRotateY,
    matRotateZ,
    matProject,
    matDiagonal,
    matTranslate,
    matPointAt,
} from "./MathStuff/Matrices.js";
import {degToRad, multVecMat, multMatMat, matPointAtCreate, matInverse, matInit} from "./MathStuff/MathFunctions.js";
import {toCameraDist, WIDTH, HEIGHT, c, aspectRatio, fovRad} from "./MathStuff/Constants.js"
import {clearCanvas, drawTriangle, fillTriangle} from "./DrawStuff/DrawFunctions.js";
import {Vec} from "./Structures/Vec.js";
import {Scene} from './Structures/Scene.js'

let angle = 0;

clearCanvas();

const points = ['p1', 'p2', 'p3'];
const coords = ['x', 'y', 'z'];
const vLightDirect = new Vec(1, 1, 1);
vLightDirect.normalize();

const vOffset = new Vec(1, 1, 0);
const vUp = new Vec(0, 1, 0);
const vCamera = new Vec(0, 0, 0);
const vLookDir = new Vec(0, 0, 1);

const keyActions = {
    w: () => {
        console.log("Action for 'w' key");
    },
    a: () => {
        console.log("Action for 'a' key");
    },
    s: () => {
        console.log("Action for 's' key");
    },
    d: () => {
        console.log("Action for 'd' key");
    },
    ArrowUp: () => {
        vCamera.y += 0.05;
    },
    ArrowDown: () => {
        vCamera.y -= 0.05;

    }
};

document.addEventListener('keydown', (event) => {
    if (event.key in keyActions) {
        keyActions[event.key]();
    }
});


function animate() {
    clearCanvas();
    //angle = (angle + degToRad(1)) % degToRad(360);
    const trisToRender = [];
    Object.keys(Scene).forEach(key => {
        const vTarget = Vec.sum(vCamera, vLookDir);

        let matWorld = matDiagonal();
        matWorld = multMatMat(matRotateY(angle), matWorld);
        matWorld = multMatMat(matWorld, matTranslate(0, 0, 20));

        const matCamera = matPointAtCreate(vCamera, vTarget, vUp);
        const matView = matInverse(matCamera);

        for (const tri of Scene[key].triangles) {
            const triProjected = new Triangle();
            const triTransformed = new Triangle();
            const triViewed = new Triangle();

            for (let point of points) {
                triTransformed[point] = multVecMat(tri[point], matWorld);
                //triTransformed[point].w += 4;
                triTransformed[point].toScreen();
            }

            for (let point of points) {
                triViewed[point] = multVecMat(triTransformed[point], matView);
            }

            const toCamVector = triViewed.p1;
            const normal = triViewed.normal();
            const cos = Vec.cos(toCamVector, normal);

            if (cos < 0.0) {
                const illumination = Vec.cos(vLightDirect, normal);
                for (const point of points) {

                    triProjected[point] = multVecMat(triViewed[point], matProject);
                    triProjected[point] = Vec.sum(triProjected[point], vOffset);

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
