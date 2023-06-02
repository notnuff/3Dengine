import { Vec } from './Vec.js';

class Triangle {
    constructor(p1, p2, p3) {
        this.p1 = Vec.from(p1);
        this.p2 = Vec.from(p2);
        this.p3 = Vec.from(p3);
    }

    static from(points) {
        //if (!points) return new Triangle();
        if (Array.isArray(points)) {
            const [p1, p2, p3] = points;
            return new Triangle(p1, p2, p3);
        } else {
            const { p1, p2, p3 } = points;
            return new Triangle(p1, p2, p3);
        }
    }

    normal() {
        const v1 = Vec.sub(this.p1, this.p2);
        const v2 = Vec.sub(this.p1, this.p3);
        const vecProd = Vec.crossProd(v1, v2);
        vecProd.normalize();
        return vecProd;
    }
}

export { Triangle };
