import {Vec} from "../Structures/Vec.js";

const degToRad = (theta) => {
    return theta * Math.PI / 180;
};

function matInit() {
    return [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
}

function multVecMat(vec, m) {

    const x = vec.x * m[0][0] + vec.y * m[1][0] + vec.z * m[2][0] + vec.w * m[3][0];
    const y = vec.x * m[0][1] + vec.y * m[1][1] + vec.z * m[2][1] + vec.w * m[3][1];
    const z = vec.x * m[0][2] + vec.y * m[1][2] + vec.z * m[2][2] + vec.w * m[3][2];
    const w = vec.x * m[0][3] + vec.y * m[1][3] + vec.z * m[2][3] + vec.w * m[3][3];

    return new Vec(x, y, z, w);
}

function multMatMat(mat1, mat2) {
    const resMat = matInit();
    for (let c = 0; c < 4; c++)
        for (let r = 0; r < 4; r++)
            resMat[r][c] = mat1[r][0] * mat2[0][c] + mat1[r][1] * mat2[1][c] + mat1[r][2] * mat2[2][c] + mat1[r][3] * mat2[3][c];
    return resMat;
}


function matPointAtCreate(pos, target, up) {
    let newForward = Vec.sub(target, pos);
    newForward.normalize()

    let a = Vec.multCoeff(newForward, Vec.dotProd(up, newForward));
    let newUp = Vec.sub(up, a);
    newUp.normalize()

    // New Right direction is easy, its just cross product
    let newRight = Vec.crossProd(newUp, newForward);

    return [
        [newRight.x, newRight.y, newRight.z, 0],
        [newUp.x, newUp.y, newUp.z, 0],
        [newForward.x, newForward.y, newForward.z, 0],
        [pos.x, pos.y, pos.z, 1]
    ]
}


function matInverse(m) {
    /*const result = matInit();
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            result[i][j] = mat[j][i];
            result[3][i] -= mat[3][j] * mat[j][i]
        }
    }
    return result;*/
    const matrix = new Array(4).fill(0).map(() => new Array(4).fill(0));

    matrix[0][0] = m[0][0];
    matrix[0][1] = m[1][0];
    matrix[0][2] = m[2][0];
    matrix[0][3] = 0.0;

    matrix[1][0] = m[0][1];
    matrix[1][1] = m[1][1];
    matrix[1][2] = m[2][1];
    matrix[1][3] = 0.0;

    matrix[2][0] = m[0][2];
    matrix[2][1] = m[1][2];
    matrix[2][2] = m[2][2];
    matrix[2][3] = 0.0;

    matrix[3][0] = -(m[3][0] * matrix[0][0] + m[3][1] * matrix[1][0] + m[3][2] * matrix[2][0]);
    matrix[3][1] = -(m[3][0] * matrix[0][1] + m[3][1] * matrix[1][1] + m[3][2] * matrix[2][1]);
    matrix[3][2] = -(m[3][0] * matrix[0][2] + m[3][1] * matrix[1][2] + m[3][2] * matrix[2][2]);
    matrix[3][3] = 1.0;

    return matrix;
}

export {degToRad, multVecMat, multMatMat, matPointAtCreate, matInverse, matInit};
