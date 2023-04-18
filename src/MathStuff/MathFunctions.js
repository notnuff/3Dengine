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


export {degToRad, matMultiply}
