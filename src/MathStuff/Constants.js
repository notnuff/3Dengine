import { WIDTH, HEIGHT } from '../CanvasProperties.js';
import { degToRad } from './MathFunctions.js';

const screenZNear = 0.1;
const screenZFar = 1000;
const fov = 90;
const fovRad = 1 / Math.tan(degToRad(fov * 0.5));
const aspectRatio = HEIGHT / WIDTH;
const screenZNorm = screenZFar / (screenZFar - screenZNear);
const toCameraDist = 5;

export {
    screenZNear,
    screenZFar,
    fovRad,
    aspectRatio,
    screenZNorm,
    toCameraDist
};
