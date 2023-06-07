import {constants} from './Constants.js';

class Matrices {
    get matProject() {
        const matProject = [
            [constants.aspectRatio * constants.fovRad, 0, 0, 0],
            [0, constants.fovRad, 0, 0],
            [0, 0, constants.screenZNorm, 1],
            [0, 0, -constants.screenZNear * constants.screenZNorm, 0]
        ];
        return matProject;
    }
    matDiagonal() {
        return [
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]
        ];
    }
    matInit() {
        return [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];
    }
    matRotateX(angle) {
        return [
            [1, 0, 0, 0],
            [0, Math.cos(angle), -Math.sin(angle), 0],
            [0, Math.sin(angle), Math.cos(angle), 0],
            [0, 0, 0, 1]
        ];
    }

    matRotateY(angle) {
        return [
            [Math.cos(angle), 0, Math.sin(angle), 0],
            [0, 1, 0, 0],
            [-Math.sin(angle), 0, Math.cos(angle), 0],
            [0, 0, 0, 1]
        ];
    }

    matRotateZ(angle) {
        return [
            [Math.cos(angle), -Math.sin(angle), 0, 0],
            [Math.sin(angle), Math.cos(angle), 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]
        ];
    }

    matTranslate(x, y, z) {
        return [
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [x, y, z, 1],
        ];
    }
}

const matrices = new Matrices();

export { matrices };
