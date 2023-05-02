import { Point3D } from './Point3D.js';

function Triangle(p1, p2, p3) {
    this.p1 = Point3D.from(p1);
    this.p2 = Point3D.from(p2);
    this.p3 = Point3D.from(p3);
}

Triangle.from = function(pArray) {
    return new Triangle(...pArray);
};

export { Triangle };
