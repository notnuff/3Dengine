import {Point3D} from "./Point3D.js";
import {vecDist} from "../MathStuff/MathFunctions";
function Vec (x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
}

Vec.from = function(pArray) {
    if (pArray) return new Vec(pArray[0], pArray[1], pArray[2]);
    return new Vec();
};

Vec.prototype = Object.create(Point3D.prototype);

Vec.prototype.length = function () {
    const length = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    return length;
}

Vec.prototype.normalize = function () {
    const l = this.length();
    console.log(this);
    this.x /= l;
    this.y /= l;
    this.z /= l;
}

Vec.prototype.crossProd = function (vec2) {
    const result = this.x * vec2.x + this.y * vec2.y + this.z * vec2.z;
    return result;
}


Vec.prototype.vecProd = function (vec2) {
    const x = this.y * vec2.z - this.z * vec2.y;
    const y = this.z * vec2.x - this.x * vec2.z;
    const z = this.x * vec2.y - this.y * vec2.x;
    return new Vec(x, y, z);
}

Vec.prototype.sum = function (vec2) {
    const x = this.x + vec2.x;
    const y = this.y + vec2.y;
    const z = this.z + vec2.z;
    return new Vec(x, y, z);
}

Vec.prototype.diff = function (vec2) {
    const x = this.x - vec2.x;
    const y = this.y - vec2.y;
    const z = this.z - vec2.z;
    return new Vec(x, y, z);
}

export {Vec};
