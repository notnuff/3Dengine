import {c} from "../UserStuff/CanvasProperties.js";

function clearCanvas () {
    c.fillStyle = "#303030";
    c.fillRect(0, 0, window.innerWidth, window.innerHeight);
}

function drawTriangle(triangle) {
    c.lineWidth = 1;
    c.strokeStyle = "white";
    const points = ["p1", "p2", "p3"];
    for(let i = 0; i < 3; i++) {
        c.beginPath();
        c.moveTo(triangle[points[i]].x, triangle[points[i]].y);
        c.lineTo(triangle[points[(i + 1) % 3]].x, triangle[points[(i + 1) % 3]].y)
        c.stroke();
    }
}
export {drawTriangle, clearCanvas}
