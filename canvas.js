'use strict'
const canvas = document.getElementById('userCanvas');
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

canvas.width = WIDTH;
canvas.height = HEIGHT;

const c = canvas.getContext('2d');
c.fillStyle = "#303030";
c.fillRect(0, 0, window.innerWidth, window.innerHeight);

function Point3D (x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
}
function Triangle (pointsArray) {

    this.points = pointsArray.map(([x, y, z]) => new Point3D(x, y, z));

    /*for (let i = 0; i < 3; i++) {
        pointsArray[i] = new Point3D(pointsArray[i][0], pointsArray[i][1], pointsArray[i][2]);
    }
    this.points = pointsArray;*/

}
function Mesh (triangles) {

    this.triangles = triangles.map((pointsArray) => new Triangle(pointsArray));

    /*for (let i = 0; i < triangles.length; i++) {
            triangles[i] = new Triangle(triangles[i]);
        }
    this.triangles = triangles;*/
}

function Scene (...meshes) {
    meshes.forEach(mesh => this[mesh] = mesh);
    /*for (let mesh of meshes) {
        this[mesh] = mesh;
    }*/
}
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

console.log(cube.triangles[0].points[0].z);
