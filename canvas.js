'use strict'
const canvas = document.getElementById('userCanvas');
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

canvas.width = WIDTH;
canvas.height = HEIGHT;

const c = canvas.getContext('2d');
c.fillStyle = "#303030";
c.fillRect(0, 0, window.innerWidth, window.innerHeight);

//3D structures

function Point3D (x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
}
Point3D.from = function (pArray) {
    if (pArray) return new Point3D(pArray[0], pArray[1], pArray[2]);
    return new Point3D();
}
Point3D.prototype.toString = function () {
    return `(${this.x}, ${this.y}, ${this.z})`
}

function Triangle (p1, p2, p3) {
    this.p1 = Point3D.from(p1);
    this.p2 = Point3D.from(p2);
    this.p3 = Point3D.from(p3);
    /*else this.points = new Array.from({length: 3},
        () => new Point3D(undefined, undefined, undefined));*/
}

Triangle.from = function (pArray) {
    return new Triangle(pArray[0], pArray[1], pArray[2]);
}
function Mesh (triangles) {
    this.triangles = triangles.map(pointsArray => Triangle.from(pointsArray));

}

function Scene (...meshes) {
    meshes.forEach(mesh => this[mesh] = mesh);
}

//required functions
const degToRad = (theta) => {
    return theta * Math.PI / 180;
};
function matMultiply (vec, m) {
    let x = (vec.x * m[0][0] + vec.y * m[1][0] + vec.z * m[2][0] + m[3][0]);
    let y = (vec.x * m[0][1] + vec.y * m[1][1] + vec.z * m[2][1] + m[3][1]);
    let z = (vec.x * m[0][2] + vec.y * m[1][2] + vec.z * m[2][2] + m[3][2]);
    const w = vec.x * m[0][3] + vec.y * m[1][3] + vec.z * m[2][3] + m[3][3];

    if (w) {
        x /= w; y /= w; z /= w;
    }
   /* const resVector = {};
    let i = 0;
    const keys = ["x", "y", "z"];
    for (let key of keys) {
        resVector[key] = vec.x * m[0][i] + vec.y * m[1][i] + vec.z * m[2][i] + m[3][i];
        i++;
    }
    if (w) {
        for (let key of keys) resVector[key] /= w;
    }*/
    return {x, y, z};
}

function drawTriangle(triangle) {
    c.lineWidth = 1;
    c.strokeStyle = "white";
    const points = ["p1", "p2", "p3"];
    for(let i = 0; i < 3; i++) {
        c.beginPath();
        c.moveTo(triangle[points[i]].x, triangle[points[i]].y);
        c.lineTo(triangle[points[(i + 1) % 3]].x, triangle[points[(i + 1) % 3]].y)
        c.stroke();
    }
}

//Projection matrix
const screenZNear = 0.1;
const screenZFar = 1000;
const fov = 90;
const fovRad = 1 / Math.tan(degToRad(fov * 0.5));
const aspectRatio = HEIGHT / WIDTH;
const screenZNorm = screenZFar / (screenZFar - screenZNear);
const toCameraDist = 2;
let angle = 0;

const matProject = [
    [aspectRatio * fovRad, 0, 0, 0],
    [0, fovRad, 0, 0],
    [0, 0,  screenZNorm, 1],
    [0, 0, -screenZNear * screenZNorm, 0]
];

const matRotateX = (angle) => ([
    [1, 0, 0, 0],
    [0, Math.cos(angle), -Math.sin(angle), 0],
    [0, Math.sin(angle), Math.cos(angle), 0],
    [0, 0, 0, 1]
]);

const matRotateY = (angle) => ([
    [Math.cos(angle), 0, Math.sin(angle), 0],
    [0, 1, 0, 0],
    [-Math.sin(angle), 0, Math.cos(angle), 0],
    [0, 0, 0, 1]
]);

const matRotateZ = (angle) => ([
    [Math.cos(angle), -Math.sin(angle), 0, 0],
    [Math.sin(angle), Math.cos(angle), 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1]
]);


//test mesh
const cube = new Mesh([
    // south
    [[0, 0, 0], [0, 1, 0], [1, 1, 0]],
    [[0, 0, 0], [1, 1, 0], [1, 0, 0]],

    // east
    [[1, 0, 0], [1, 1, 0], [1, 1, 1]],
    [[1, 0, 0], [1, 1, 1], [1, 0, 1]],

    // north
    [[1, 0, 1], [1, 1, 1], [0, 1, 1]],
    [[1, 0, 1], [0, 1, 1], [0, 0, 1]],

    // west
    [[0, 0, 1], [0, 1, 1], [0, 1, 0]],
    [[0, 0, 1], [0, 1, 0], [0, 0, 0]],

    // top
    [[0, 1, 0], [0, 1, 1], [1, 1, 1]],
    [[0, 1, 0], [1, 1, 1], [1, 1, 0]],

    // bottom
    [[1, 0, 1], [0, 0, 1], [0, 0, 0]],
    [[1, 0, 1], [0, 0, 0], [1, 0, 0]],
]);


function animate() {
    requestAnimationFrame(animate);

    c.fillStyle = "#303030";
    c.fillRect(0, 0, window.innerWidth, window.innerHeight);

    angle = (angle + degToRad(1)) % degToRad(360);

    let triProjected = new Triangle();
    let triRotated = new Triangle();
    let triTranslated = new Triangle();
    const points = ["p1", "p2", "p3"];
    for (let tri of cube.triangles) {

        for (let point of points) {
            triRotated[point] = matMultiply(tri[point], matRotateY(angle));
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
}
animate();
