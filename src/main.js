'use strict';

import {
    Triangle, Point3D, clearCanvas, vecDist, degToRad,
    vecProductNorm, cosBetweenVectors, fillTriangle,
    matMultiply, matProject, matRotateX, matRotateY, matRotateZ,
    HEIGHT, WIDTH, cube, toCameraDist, Mesh, Scene
} from './modules.js';

let angle = 0;

clearCanvas();

const triProjected = new Triangle();
const triRotated = new Triangle();
let triTranslated = new Triangle();

const toCamVector = new Point3D();
let normal = new Point3D();
const v1 = new Point3D(), v2 = new Point3D();
const points = ['p1', 'p2', 'p3'];
const coords = ['x', 'y', 'z'];
let cos;
const lightDirect = new Point3D(1, 1, 1);

const l = vecDist(lightDirect);
lightDirect.x /= l;
lightDirect.y /= l;
lightDirect.z /= l;


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
            normal = vecProductNorm(v1, v2);
            cos = cosBetweenVectors(toCamVector, normal);
            if (cos < 0) {
                const illumination = cosBetweenVectors(lightDirect, normal);
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
