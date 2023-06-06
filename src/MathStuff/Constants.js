import { degToRad } from './MathFunctions.js';

class Constants {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.context = this.canvas.getContext('2d');
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.aspectRatio = this.height / this.width;
        this.screenZNear = 0.1;
        this.screenZFar = 1000;
        this.fov = 90;
        this.fovRad = 1 / Math.tan(degToRad(this.fov * 0.5));
        this.screenZNorm = this.screenZFar / (this.screenZFar - this.screenZNear);
        this.toCameraDist = 5;

        this.updateCanvasSize();
        window.addEventListener('resize', () => this.updateCanvasSize());
    }

    updateCanvasSize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.aspectRatio = this.height / this.width;
    }
}

const canvas = 'userCanvas';
const constants = new Constants(canvas)


export { constants };

/*
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
*/
