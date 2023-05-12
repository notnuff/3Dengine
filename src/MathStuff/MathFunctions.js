import {Vec} from "../Structures/Vec.js";

const degToRad = (theta) => {
    return theta * Math.PI / 180;
};

function multVecMat(vec, m) {
    const x = vec.x * m[0][0] + vec.y * m[1][0] + vec.z * m[2][0] + vec.w * m[3][0];
    const y = vec.x * m[0][1] + vec.y * m[1][1] + vec.z * m[2][1] + vec.w * m[3][1];
    const z = vec.x * m[0][2] + vec.y * m[1][2] + vec.z * m[2][2] + vec.w * m[3][2];
    const w = vec.x * m[0][3] + vec.y * m[1][3] + vec.z * m[2][3] + vec.w * m[3][3];

    return new Vec (x, y, z, w);
}

function multMatMat(mat1, mat2) {
    const resMat = [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ]
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            for (let k = 0; k < 4; k++)
                resMat[i][j] += mat1[i][k] * mat2[k][j];
        }
    }
    return resMat;
}

export { degToRad, multVecMat, multMatMat };
