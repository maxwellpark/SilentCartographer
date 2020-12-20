var canvas = document.getElementById("mapCanvas");
var ctx = canvas.getContext("2d");
var rect = canvas.getBoundingClientRect();
var coordsContainer = document.getElementById("coordContainer");
var xRatio = canvas.width / rect.width; 
var yRatio = canvas.height / rect.height;
var ratio = 1.25;
var pointLength = 12; // rename  
var pointWidth = 2;

window.onload = function() {
    document.body.addEventListener("mousemove", collisionListener);
    document.body.addEventListener("mousemove", function(e) {
        // delay with timeout?
        window.mousePos = {
            // x: e.pageX,
            // y: e.pageY
            x: e.offsetX,
            y: e.offsetY
        };
    })
    // canvas.height = canvas.width * ratio;

    // Can make this dynamic 
    var mapImg = new Image();
    mapImg.src = "../img/OSM_Export.png";
    mapImg.onload = function() {
        ctx.drawImage(mapImg, 0, 0);
        drawPins(pins);
    };

    addCoordParagraphs();
}   

window.onresize = function() {
    rect = canvas.getBoundingClientRect();
}

// Read these in from an external json/geojson file 
var pins = {
    a: {
        x: 50, y: 50, w: 100, h: 100, r: 8, colour: "black", url: "a.html"
    },
    b: {
        x: 150, y: 150, w: 100, h: 100, r: 8, colour: "black", url: "b.html"
    }
};

function addCoordParagraphs() 
{
    for (pin in pins) {
        var node = document.createElement("p");
        node.innerText = `${pins[pin].x}, ${pins[pin].y}`;
        coordsContainer.appendChild(node);
    }
}

// Todo: separate out into one method that draws, 
// The other calls isPointInPath
function drawPin(pin) {
    // ctx.translate(pin.x, pin.y); 
    ctx.beginPath();
    // ctx.moveTo(0, 0); // try removing this 
    ctx.moveTo(pin.x, pin.y);
    ctx.arc(pin.x, pin.y - pointLength, pin.r, 0, 2 * Math.PI);
    ctx.fillStyle = pin.colour; 
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(pin.x, pin.y - pointLength);
    ctx.lineWidth = pointWidth;
    ctx.lineTo(pin.x, pin.y);
    ctx.strokeStyle = pin.colour;
    ctx.stroke();
}

function drawPins(pins) {
    for (pin in pins) {
        drawPin(pins[pin]);
    }
}

function hoverEffects() {
    document.body.style.cursor = "pointer";
}

function unhoverEffects() {
    document.body.style.cursor = "auto"; 
}

function isColliding(e, pin) {
    let xDist = (e.clientX - rect.left) / (rect.right - rect.left) * canvas.width - pin.x;
    let yDist = (e.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height - pin.y - pointLength; 
    // let xDist = e.offsetX - pin.x;
    // let yDist = e.offsetY - pin.y - pointLength; // const 
    let dist = Math.sqrt((xDist ** 2) + (yDist ** 2));
    return dist <= pin.r; 
}

function isInPath(e, pin) {}

function collisionListener(e) {
    e.preventDefault();
    for (pin in pins) {
        if (isColliding(e, pins[pin])) {
            hoverEffects();
            return;
        }
        else {
            unhoverEffects();
        }
    }
}