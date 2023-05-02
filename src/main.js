'use strict';

import {
    Triangle, Point3D, clearCanvas, vecDist, degToRad,
    vecProductNorm, cosBetweenVectors, fillTriangle,
    matMultiply, matProject, matRotateX, matRotateY, matRotateZ,
    HEIGHT, WIDTH, cube, toCameraDist
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

const fileInput = document.getElementById('input');

function handleObj(event) {
    const strType = {
        o: (str) => console.log(str),
    };
    let obj = event.target.result;
    obj = obj.split('\n');
    for (const str of obj) {
        const typeLetter = str[0];
        if (strType[typeLetter]) {
            strType[typeLetter](str);
        }
    }
}
function handleFile() {
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.addEventListener('load', handleObj);
        reader.readAsText(file);
    }
}

fileInput.onchange = handleFile;

function animate() {
    clearCanvas();
    angle = (angle + degToRad(1)) % degToRad(360);
    for (const tri of cube.triangles) {
        for (const point of points) {
            triRotated[point] = matMultiply(tri[point], matRotateY(angle));
            triRotated[point] = matMultiply(triRotated[point], matRotateX(angle));

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
            fillTriangle(triProjected, illumination);
        }
    }
    requestAnimationFrame(animate);
}

animate();
