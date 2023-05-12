import { degToRad } from './MathFunctions.js';
const canvas = document.getElementById('userCanvas');

let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;
canvas.width = WIDTH;
canvas.height = HEIGHT;
window.addEventListener('resize',
    function(){
        WIDTH = window.innerWidth;
        canvas.width = WIDTH;
        HEIGHT = window.innerHeight;
        canvas.height = HEIGHT;
        aspectRatio = HEIGHT / WIDTH;
})


const c = canvas.getContext('2d');

const screenZNear = 0.1;
const screenZFar = 1000;
const fov = 90;
const fovRad = 1 / Math.tan(degToRad(fov * 0.5));
let aspectRatio = HEIGHT / WIDTH;
const screenZNorm = screenZFar / (screenZFar - screenZNear);
const toCameraDist = 5;

export {
    screenZNear,
    screenZFar,
    fovRad,
    aspectRatio,
    screenZNorm,
    toCameraDist,
    HEIGHT, WIDTH,
    c, canvas
};
