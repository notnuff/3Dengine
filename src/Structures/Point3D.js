function Point3D (x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
}
Point3D.from = function (pArray) {
    if (pArray) return new Point3D(pArray[0], pArray[1], pArray[2]);
    return new Point3D();
}
Point3D.prototype.toString = function () {
    return `(${this.x}, ${this.y}, ${this.z})`
}

export {Point3D}
