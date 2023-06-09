'use strict';

//import { Mesh } from './Structures/Mesh.js';
import { Triangle } from './Structures/Triangle.js';
import { matrices } from './MathStuff/Matrices.js';
import { degToRad, MatrixOperations} from './MathStuff/MathFunctions.js';
import { constants } from './MathStuff/Constants.js';
import {
    clearCanvas,
    drawTriangle,
    fillTriangle
} from './DrawStuff/DrawFunctions.js';
import { Vec } from './Structures/Vec.js';
import { Scene } from './Structures/Scene.js';

let angle = 0;

clearCanvas();

const points = ['p1', 'p2', 'p3'];
const vLightDirect = new Vec(1, 1, 1);
vLightDirect.normalize();

const vOffset = new Vec(1, 1, 0);
const vUp = new Vec(0, 1, 0);
const vCamera = new Vec(0, 0, 0);
const vLookDir = new Vec(0, 0, 1);

const keyActions = {
    w: () => {
        vCamera.z += 0.1;
    },
    a: () => {
        vCamera.x += 0.1;
    },
    s: () => {
        vCamera.z -= 0.1;
    },
    d: () => {
        vCamera.x -= 0.1;
    },
    ArrowUp: () => {
        vCamera.y += 0.1;
    },
    ArrowDown: () => {
        vCamera.y -= 0.1;
    },
    ArrowLeft: () => {
        console.log('Action for \'ArrowLeft\' key');
    },
    ArrowRight: () => {
        console.log('Action for \'ArrowRight\' key');
    }
};

document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (key in keyActions) {
        keyActions[key]();
    }
});

function animate() {
    clearCanvas();
    angle = (angle + degToRad(1)) % degToRad(360);
    const trisToRender = [];

    for (const key of Object.keys(Scene)) {
        const vTarget = Vec.sum(vCamera, vLookDir);

        let matWorld = matrices.matDiagonal();
        matWorld = MatrixOperations.multMatMat(matWorld, matrices.matTranslate(0, 0, 5));

        const matCamera = MatrixOperations.matPointAtCreate(vCamera, vTarget, vUp);
        const matView = MatrixOperations.matInverse(matCamera);

        for (const tri of Scene[key].triangles) {
            const triProjected = new Triangle();
            const triTransformed = new Triangle();
            const triViewed = new Triangle();

            for (const point of points) {
                triTransformed[point] = MatrixOperations.multVecMat(tri[point], matWorld);
                triViewed[point] = MatrixOperations.multVecMat(triTransformed[point], matView);
            }

            const toCamVector = triViewed.p1;
            const normal = triViewed.normal();

            if (Vec.dotProd(normal, toCamVector) <= 0.0) {
                const illumination = Vec.cos(vLightDirect, normal);
                for (const point of points) {
                    triProjected[point] = MatrixOperations.multVecMat(triViewed[point], matrices.matProject);

                    triProjected[point].toScreen();
                    triProjected[point].x *= -1;
                    triProjected[point].y *= -1;

                    triProjected[point] = Vec.sum(triProjected[point], vOffset);

                    triProjected[point].x = triProjected[point].x * 0.5 * constants.width;
                    triProjected[point].y = triProjected[point].y * 0.5 * constants.height;
                }
                trisToRender.push([Triangle.from(triProjected), illumination]);
            }
        }
    }

    trisToRender.sort((a, b) => {
        let res = 0;
        let maxA = -Infinity, maxB = -Infinity;
        for (const p of points) {
            maxA = Math.max(maxA, a[0][p].z);
            maxB = Math.max(maxB, b[0][p].z);
            res += b[0][p].z - a[0][p].z;
        }
        return maxA - maxB + res;
    });

    for (const [tri, illum] of trisToRender) {
        fillTriangle(tri, illum);
    }

    requestAnimationFrame(animate);
}

animate();
