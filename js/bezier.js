var canvas = document.getElementById("mapCanvas");
var ctx = canvas.getContext("2d");

// Todo: calculate relative position of cp's for each pin 
var cp1x = canvas.width / 4, cp1y = canvas.height / 4, 
cp2x = canvas.width / 2, cp2y = canvas.height / 2, 
endx = canvas.width - cp1x, endy = canvas.height - cp1y; 

ctx.strokeStyle = "#FF0000";

ctx.beginPath();
ctx.moveTo(0, 0);
// ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, endx, endy);
ctx.bezierCurveTo(20, 100, 200, 100, 200, 20);
ctx.closePath();
ctx.stroke();

ctx.translate(400, 400);
ctx.beginPath();
ctx.bezierCurveTo(5, -15, -30, -20, 0, -40);
ctx.stroke();