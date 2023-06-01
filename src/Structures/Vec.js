class Vec {
    constructor(x, y, z, w) {
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
        this.w = w || 1;
    }

    static from(points) {
        if (!points) return new Vec();
        if (Array.isArray(points)) {
            const [x, y, z] = points;
            return new Vec(x, y, z);
        } else {
            const { x, y, z } = points;
            return new Vec(x, y, z);
        }
    }

    toString() {
        return `(${this.x}, ${this.y}, ${this.z})`;
    }

    length() {
        return Math.sqrt(Vec.dotProd(this, this));
    }

    normalize() {
        const l = this.length() || 1;
        this.x /= l;
        this.y /= l;
        this.z /= l;
    }

    toScreen() {
        this.x /= this.w;
        this.y /= this.w;
        this.z /= this.w;
    }

    static dotProd(vec1, vec2) {
        return vec1.x * vec2.x + vec1.y * vec2.y + vec1.z * vec2.z;
    }

    static crossProd(vec1, vec2) {
        const x = vec1.y * vec2.z - vec1.z * vec2.y;
        const y = vec1.z * vec2.x - vec1.x * vec2.z;
        const z = vec1.x * vec2.y - vec1.y * vec2.x;
        return new Vec(x, y, z);
    }

    static sum(vec1, vec2) {
        const x = vec1.x + vec2.x;
        const y = vec1.y + vec2.y;
        const z = vec1.z + vec2.z;
        return new Vec(x, y, z);
    }

    static sub(vec1, vec2) {
        const x = vec1.x - vec2.x;
        const y = vec1.y - vec2.y;
        const z = vec1.z - vec2.z;
        return new Vec(x, y, z);
    }

    static multCoeff(vec, coefficient) {
        const x = vec.x * coefficient;
        const y = vec.y * coefficient;
        const z = vec.z * coefficient;
        return new Vec(x, y, z);
    }

    static divCoeff(vec, coefficient) {
        const x = vec.x / coefficient;
        const y = vec.y / coefficient;
        const z = vec.z / coefficient;
        return new Vec(x, y, z);
    }

    static cos(vec1, vec2) {
        const vec1dist = vec1.length();
        const vec2dist = vec2.length();
        const cos = Vec.dotProd(vec1, vec2) / vec1dist / vec2dist;
        return cos;
    }
}

export { Vec };
