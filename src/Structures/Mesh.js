import {Triangle} from "./Triangle.js";

function Mesh (triangles) {
    this.triangles = triangles.map(pointsArray => Triangle.from(pointsArray));

}

export {Mesh}
