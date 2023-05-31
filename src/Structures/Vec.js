function Vec(x, y, z, w) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w || 1;
}
Vec.from = function(pArray) {
    if (pArray) {
        if (Array.isArray(pArray)) return new Vec(pArray[0], pArray[1], pArray[2]);
        else return new Vec(pArray.x, pArray.y, pArray.z);
    }
    return new Vec();
};

Vec.prototype.toString = function() {
    return `(${this.x}, ${this.y}, ${this.z})`;
};

Vec.prototype.length = function () {
    return Math.sqrt(Vec.dotProd(this, this));
}

Vec.prototype.normalize = function () {
    const l = this.length() || 1;
    this.x /= l;
    this.y /= l;
    this.z /= l;
}

Vec.prototype.toScreen = function () {
    this.x /= this.z;
    this.y /= this.z;
    this.z /= this.z;
}
Vec.dotProd = function (vec1, vec2) {
    return vec1.x * vec2.x + vec1.y * vec2.y + vec1.z * vec2.z;
}

Vec.crossProd = function (vec1, vec2) {
    const x = vec1.y * vec2.z - vec1.z * vec2.y;
    const y = vec1.z * vec2.x - vec1.x * vec2.z;
    const z = vec1.x * vec2.y - vec1.y * vec2.x;
    return new Vec(x, y, z);
}

Vec.sum = function (vec1, vec2) {
    const x = vec1.x + vec2.x;
    const y = vec1.y + vec2.y;
    const z = vec1.z + vec2.z;
    return new Vec(x, y, z);
}

Vec.sub = function (vec1, vec2) {
    const x = vec1.x - vec2.x;
    const y = vec1.y - vec2.y;
    const z = vec1.z - vec2.z;
    return new Vec(x, y, z);
}

Vec.multCoeff = function (vec, coefficient) {
    const x = vec.x * coefficient;
    const y = vec.y * coefficient;
    const z = vec.z * coefficient;
    return new Vec(x, y, z);
}

Vec.divCoeff = function (vec, coefficient) {
    const x = vec.x / coefficient;
    const y = vec.y / coefficient;
    const z = vec.z / coefficient;
    return new Vec(x, y, z);
}

Vec.cos = function (vec1, vec2) {
    const vec1dist = vec1.length();
    const vec2dist = vec2.length();
    const cos = Vec.dotProd(vec1, vec2) / vec1dist / vec2dist;
    return cos;
}

export { Vec };
