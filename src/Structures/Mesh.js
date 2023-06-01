import { Triangle } from './Triangle.js';

class Mesh {
    constructor(triangles) {
        this.triangles = triangles.map((points) => Triangle.from(points));
    }

    push(triangle) {
        this.triangles.push(Triangle.from(triangle));
    }
}

export { Mesh };
