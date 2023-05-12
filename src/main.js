'use strict';

import {
    Triangle, Point3D, clearCanvas, vecDist, degToRad,
    vecProductNorm, vCosBetween, fillTriangle,
    matMultiply, matProject, matRotateX, matRotateY, matRotateZ,
    HEIGHT, WIDTH, cube, toCameraDist, Mesh, Scene, Vec
} from './modules.js';

let angle = 0;

clearCanvas();

const triProjected = new Triangle();
const triRotated = new Triangle();
let triTranslated = new Triangle();

const toCamVector = new Vec();
const v1 = new Vec(), v2 = new Vec();
const points = ['p1', 'p2', 'p3'];
const coords = ['x', 'y', 'z'];
const lightDirect = new Vec(1, 1, 1);
lightDirect.normalize();


let frame = 0;
function animate() {
    clearCanvas();
    angle = (angle + degToRad(1)) % degToRad(360);
    const trisToRender = [];
    Object.keys(Scene).forEach(key => {
        for (const tri of Scene[key].triangles) {
            for (const point of points) {
                triRotated[point] = matMultiply(tri[point], matRotateY(angle));
                //triRotated[point] = matMultiply(triRotated[point], matRotateX(angle));

            }
            triTranslated = triRotated;
            for (const point of points) {
                triTranslated[point].z = triRotated[point].z + toCameraDist;
            }

            for (const coord of coords) {
                toCamVector[coord] = triTranslated.p1[coord];
                v1[coord] = triTranslated.p2[coord] - triTranslated.p1[coord];
                v2[coord] = triTranslated.p3[coord] - triTranslated.p2[coord];
            }

            const normal = triTranslated.normal();
            const cos = vCosBetween(toCamVector, normal);
            if (cos < 0) {
                const illumination = vCosBetween(lightDirect, normal);
                for (const point of points) {
                    triProjected[point] = matMultiply(triTranslated[point], matProject);
                    triProjected[point].x += 1;
                    triProjected[point].y += 1;
                    triProjected[point].x = Math.floor(triProjected[point].x * 0.5 * WIDTH);
                    triProjected[point].y = Math.floor(triProjected[point].y * 0.5 * HEIGHT);
                }
                trisToRender.push([{p1: triProjected.p1, p2: triProjected.p2, p3: triProjected.p3}, illumination]);
            }
        }
   })
    trisToRender.sort((a, b) =>
        b[0].p1.z + b[0].p2.z + b[0].p3.z - a[0].p1.z - a[0].p2.z - a[0].p3.z);

    for (let [tri, illum] of trisToRender) {
        fillTriangle(tri, illum);
    }

    requestAnimationFrame(animate);
}

animate();
