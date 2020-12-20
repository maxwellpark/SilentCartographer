var canvas = document.getElementById("mapCanvas");
var ctx = canvas.getContext("2d");

ctx.translate(200, 200);
ctx.beginPath();
ctx.arc(0, 0, 10, 0, 2 * Math.PI);
ctx.fillStyle = "#00FF00";
ctx.fill();
// ctx.translate(200, 200);
ctx.beginPath();
ctx.moveTo(0, 0 + 10);
ctx.lineTo(0, 0 + 20);
ctx.strokeStyle = "#00FF00";
ctx.stroke();
