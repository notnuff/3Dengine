import { c } from '../CanvasProperties.js';

const points = ['p1', 'p2', 'p3'];

function drawTriangle(triangle, color) {
    c.lineWidth = 1;
    c.strokeStyle = `rgb(${color}, ${color}, ${color})`;
    for (let i = 0; i < 3; i++) {
        c.beginPath();
        c.moveTo(triangle[points[i]].x, triangle[points[i]].y);
        c.lineTo(triangle[points[(i + 1) % 3]].x, triangle[points[(i + 1) % 3]].y);
        c.stroke();
    }
}

function fillTriangle(triangle, cos) {
    const color = -cos * 255 * 0.5 + 100;
    drawTriangle(triangle, 0);
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
