import { aspectRatio, fovRad, screenZNorm, screenZNear } from './Constants.js';

const matRotateX = (angle) => ([
    [1, 0, 0, 0],
    [0, Math.cos(angle), -Math.sin(angle), 0],
    [0, Math.sin(angle), Math.cos(angle), 0],
    [0, 0, 0, 1]
]);

const matRotateY = (angle) => ([
    [Math.cos(angle), 0, Math.sin(angle), 0],
    [0, 1, 0, 0],
    [-Math.sin(angle), 0, Math.cos(angle), 0],
    [0, 0, 0, 1]
]);

const matRotateZ = (angle) => ([
    [Math.cos(angle), -Math.sin(angle), 0, 0],
    [Math.sin(angle), Math.cos(angle), 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1]
]);

const matProject = [
    [aspectRatio * fovRad, 0, 0, 0],
    [0, fovRad, 0, 0],
    [0, 0, screenZNorm, 1],
    [0, 0, -screenZNear * screenZNorm, 0]
];

export { matRotateX, matRotateY, matRotateZ, matProject };
