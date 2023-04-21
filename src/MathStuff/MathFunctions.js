const degToRad = (theta) => {
    return theta * Math.PI / 180;
};
function matMultiply (vec, m) {
    let x = vec.x * m[0][0] + vec.y * m[1][0] + vec.z * m[2][0] + m[3][0];
    let y = vec.x * m[0][1] + vec.y * m[1][1] + vec.z * m[2][1] + m[3][1];
    let z = vec.x * m[0][2] + vec.y * m[1][2] + vec.z * m[2][2] + m[3][2];
    const w = vec.x * m[0][3] + vec.y * m[1][3] + vec.z * m[2][3] + m[3][3];

    if (w) {
        x /= w; y /= w; z /= w;
    }
    return {x, y, z};
}
const vecDist = vec => Math.sqrt(vec.x * vec.x + vec.y * vec.y + vec.z * vec.z);
const vecDotMultiply = (vec1, vec2) => {
    return vec1.x * vec2.x + vec1.y * vec2.y + vec1.z * vec2.z;
}
const vecProductNorm = (vec1, vec2) => {
    let x = vec1.y * vec2.z - vec1.z * vec2.y;
    let y = vec1.z * vec2.x - vec1.x * vec2.z;
    let z = vec1.x * vec2.y - vec1.y * vec2.x;
    const dis = vecDist({x, y, z});
    x /=  dis; y /= dis; z /= dis;
    return {x, y, z};
}
function cosBetweenVectors (vec1, vec2) {
    const vec1dist = vecDist(vec1);
    const vec2dist = vecDist(vec2);
    const cos = vecDotMultiply(vec1, vec2) / vec1dist / vec2dist;
    return cos;
}
export {degToRad, matMultiply, cosBetweenVectors, vecProductNorm, vecDist}
