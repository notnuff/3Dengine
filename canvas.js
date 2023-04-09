const canvas = document.getElementById('userCanvas');
const w = window.innerWidth;
canvas.width = w;
const h = window.innerHeight;
canvas.height = h;

const c = canvas.getContext('2d');
c.fillStyle = "#303030";
c.fillRect(0, 0, window.innerWidth, window.innerHeight);
