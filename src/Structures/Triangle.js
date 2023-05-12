import { Vec } from './Vec.js';

function Triangle(p1, p2, p3) {
    this.p1 = Vec.from(p1);
    this.p2 = Vec.from(p2);
    this.p3 = Vec.from(p3);
}

Triangle.from = function(pArray) {
    if (Array.isArray(pArray)) return new Triangle(...pArray);
    return new Triangle(pArray.p1, pArray.p2, pArray.p3);
};

Triangle.prototype.normal = function () {
    const v1 = Vec.sub(this.p1, this.p2);
    const v2 = Vec.sub(this.p1, this.p3);
    const vecProd = Vec.crossProd(v1,v2);
    vecProd.normalize();
    return vecProd;
}
export { Triangle };
