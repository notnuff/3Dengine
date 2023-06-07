import { constants } from '../MathStuff/Constants.js';

const points = ['p1', 'p2', 'p3'];
const c = constants.context;
function drawTriangle(triangle, color) {
    c.lineWidth = 1;
    c.strokeStyle = `rgb(${color}, ${color}, ${color})`;
    for (let i = 0; i < 3; i++) {
        c.beginPath();
        const curr = points[i];
        const next = points[(i + 1) % 3];
        c.moveTo(triangle[curr].x, triangle[curr].y);
        c.lineTo(triangle[next].x, triangle[next].y);
        c.stroke();
    }
}

function fillTriangle(triangle, cos) {
    const color = -cos * 255 * 0.5 + 100;
    //drawTriangle(triangle, color);
    c.beginPath();
    c.moveTo(triangle.p1.x, triangle.p1.y);
    c.lineTo(triangle.p2.x, triangle.p2.y);
    c.lineTo(triangle.p3.x, triangle.p3.y);
    c.fillStyle = `rgb(${color}, ${color}, ${color})`;
    c.fill();
}

function clearCanvas() {
    c.fillStyle = '#303030';
    c.fillRect(0, 0, window.innerWidth, window.innerHeight);
}

export { drawTriangle, fillTriangle, clearCanvas };
