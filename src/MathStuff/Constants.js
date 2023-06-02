import { degToRad } from './MathFunctions.js';
const canvas = document.getElementById('userCanvas');

let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;
window.addEventListener('resize',
    () => {
        width = window.innerWidth;
        canvas.width = width;
        height = window.innerHeight;
        canvas.height = height;
        aspectRatio = height / width;
    });

const c = canvas.getContext('2d');

const screenZNear = 0.1;
const screenZFar = 1000;
const fov = 90;
const fovRad = 1 / Math.tan(degToRad(fov * 0.5));
let aspectRatio = height / width;
const screenZNorm = screenZFar / (screenZFar - screenZNear);
const toCameraDist = 5;

export {
    screenZNear,
    screenZFar,
    fovRad,
    aspectRatio,
    screenZNorm,
    toCameraDist,
    height, width,
    c, canvas
};
