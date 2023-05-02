const canvas = document.getElementById('userCanvas');
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
canvas.width = WIDTH;
canvas.height = HEIGHT;
const c = canvas.getContext('2d');

export { canvas, WIDTH, HEIGHT, c };
