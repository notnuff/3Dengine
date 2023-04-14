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
    this.toString = function () {
        return `(${this.x}, ${this.y}, ${this.z})`
    };

}
function Triangle (pointsArray) {
    if (pointsArray) this.points = pointsArray.map(([x, y, z]) => new Point3D(x, y, z));
    else this.points = [
        new Point3D(undefined, undefined,undefined),
        new Point3D(undefined, undefined,undefined),
        new Point3D(undefined, undefined,undefined),
    ];

    /*else this.points = new Array.from({length: 3},
        () => new Point3D(undefined, undefined, undefined));*/
}


function Mesh (triangles) {
    this.triangles = triangles.map((pointsArray) => new Triangle(pointsArray));

}

function Scene (...meshes) {
    meshes.forEach(mesh => this[mesh] = mesh);
}

//required functions
const degToRad = (theta) => {
    return theta * Math.PI / 180;
};
function matMultiply (vec, m) {
    const resVector = new Point3D();
    const keys = ["x", "y", "z"]
    for (let i = 0; i < 3; i++) {
        const key = keys[i];
        resVector[key] = vec.x * m[0][i] + vec.y * m[1][i] + vec.z * m[2][i] + m[3][i];
    }
    // resVector.x = vec.x * m[0][0] + vec.y * m[1][0] + vec.z * m[2][0] + m[3][0];
    // resVector.y = vec.x * m[0][1] + vec.y * m[1][1] + vec.z * m[2][1] + m[3][1];
    // resVector.z = vec.x * m[0][2] + vec.y * m[1][2] + vec.z * m[2][2] + m[3][2];
    const w = vec.x * m[0][3] + vec.y * m[1][3] + vec.z * m[2][3] + m[3][3];
    if (w) {
        resVector.x /= w; resVector.y /= w; resVector.z /= w;
    }
    return resVector;
}

function drawTriangle(triangle) {
    c.lineWidth = 1;
    c.strokeStyle = "white";
    for(let i = 0; i < 3; i++) {
        c.beginPath();
        c.moveTo(triangle.points[i].x, triangle.points[i].y);
        c.lineTo(triangle.points[(i + 1) % 3].x, triangle.points[(i + 1) % 3].y)
        c.stroke();
    }
}

//Projection matrix
const screenZNear = 0.1;
const screenZFar = 1000;
const fov = 90;
const fovRad = 1 / Math.tan(degToRad(fov * 0.5));
const fAspectRatio = HEIGHT / WIDTH;
const screenZNorm = screenZFar / (screenZFar - screenZNear);
const toCameraDist = 2;
let angle = 0;

const matProject = [
    [fAspectRatio * fovRad, 0, 0, 0],
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
    [[1, 0, 1], [0, 0, 0], [1, 0, 0]]
]);


function animate() {
    requestAnimationFrame(animate);

    c.fillStyle = "#303030";
    c.fillRect(0, 0, window.innerWidth, window.innerHeight);

    angle += degToRad(1);

    let triProjected = new Triangle();
    let triRotated = new Triangle();
    let triTranslated = new Triangle();

    for (let tri of cube.triangles) {
        for (let i = 0; i < 3; i++) {
            triRotated.points[i] = matMultiply(tri.points[i], matRotateY(angle));
        }
        triTranslated = triRotated;
        for (let i = 0; i < 3; i++) {
            triTranslated.points[i].z = triRotated.points[i].z + toCameraDist;
        }

        for (let i = 0; i < 3; i++){
            triProjected.points[i] = matMultiply(triTranslated.points[i], matProject);
            triProjected.points[i].x += 1;
            triProjected.points[i].y += 1;
            triProjected.points[i].x = Math.floor(triProjected.points[i].x * 0.5 * WIDTH);
            triProjected.points[i].y = Math.floor(triProjected.points[i].y * 0.5 * HEIGHT);
        }
        drawTriangle(triProjected);
    }
}
animate();
/*
const testVector = new Point3D(0, 1, 2);
const testMatrix = [
    [0, 1, 2, 3],
    [10, 11, 12, 13],
    [20, 21, 22, 23],
    [30, 31, 32, 33]
];
const mMultRes = matMultiply(testVector, testMatrix);
console.log(mMultRes);
*/

/*
const testTriangle = new Triangle([
    [WIDTH / 3, HEIGHT / 3, 1],
    [2 * WIDTH / 3, HEIGHT / 3, 1],
    [WIDTH / 3, 2 * HEIGHT / 3, 1]
])

drawTriangle(testTriangle);
*/
