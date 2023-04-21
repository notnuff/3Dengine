import {Triangle} from "./Triangle.js";

function Mesh (triangles) {
    this.triangles = triangles.map(pointsArray => Triangle.from(pointsArray));
}

Mesh.prototype.push = function (triangle) {
    this.triangles.push(Triangle.from(triangle));
}
export {Mesh}
