import { Vec } from '../Structures/Vec.js';
import { matrices } from './Matrices.js';

function degToRad(theta) {
    return theta * Math.PI / 180;
}

class MatrixOperations {

    static multVecMat(vec, m) {
        const x = vec.x * m[0][0] + vec.y * m[1][0] + vec.z * m[2][0] + vec.w * m[3][0];
        const y = vec.x * m[0][1] + vec.y * m[1][1] + vec.z * m[2][1] + vec.w * m[3][1];
        const z = vec.x * m[0][2] + vec.y * m[1][2] + vec.z * m[2][2] + vec.w * m[3][2];
        const w = vec.x * m[0][3] + vec.y * m[1][3] + vec.z * m[2][3] + vec.w * m[3][3];
        return new Vec(x, y, z, w);
    }

    static multMatMat(mat1, mat2) {
        const resMat = matrices.matInit();
        for (let c = 0; c < 4; c++) {
            for (let r = 0; r < 4; r++) {
                for (let i = 0; i < 4; i++) {
                    resMat[r][c] += mat1[r][i] * mat2[i][c];
                }
            }
        }
        return resMat;
    }

    static matPointAtCreate(pos, target, up) {
        const newForward = Vec.sub(target, pos);
        newForward.normalize();

        const a = Vec.multCoeff(newForward, Vec.dotProd(up, newForward));
        const newUp = Vec.sub(up, a);
        newUp.normalize();

        const newRight = Vec.crossProd(newUp, newForward);

        return [
            [newRight.x, newRight.y, newRight.z, 0],
            [newUp.x, newUp.y, newUp.z, 0],
            [newForward.x, newForward.y, newForward.z, 0],
            [pos.x, pos.y, pos.z, 1]
        ];
    }

    static matInverse(mat) {
        const result = matrices.matInit();
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                result[i][j] = mat[j][i];
                result[3][i] -= mat[3][j] * mat[j][i];
            }
        }
        return result;
    }
}

export { MatrixOperations, degToRad };
