var canvas = document.getElementById("mapCanvas");
var ctx = canvas.getContext("2d");
var bcr = canvas.getBoundingClientRect();

window.onload = function() {
    document.body.addEventListener("mousemove", collisionListener);

    // Can make this dynamic 
    var mapImg = new Image();
    mapImg.src = "../img/OSM_Export.png";
    mapImg.onload = function() {
        ctx.drawImage(mapImg, 0, 0);
        drawPins(pins);
    };
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

function drawPin(pin, isFilling) {
    ctx.save();
    ctx.translate(pin.x, pin.y); 
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(2, -10, -20, -25, 0, -30);
    ctx.bezierCurveTo(20, -25, -2, -10, 0, 0);
    if (fill) {
        ctx.fillStyle = pin.colour;
        ctx.fill();
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1.5; 
        ctx.stroke();
    }
    // ctx.beginPath();
    ctx.arc(0, -21, pin.r, 0, 2 * Math.PI); 
    // ctx.closePath();
    if (fill) {
        ctx.fillStyle = "black";
        ctx.fill();
        return; 
    }
    return ctx.isPointInPath(/* mouseX, mouseY */);

    //
    ctx.closePath();
    ctx.restore();
}

function drawPins(pins) {
    for (pin in pins) {
        drawPin(pins[pin], true);
    }
}

function hoverEffects() {
    document.body.style.cursor = "pointer";
}

function unhoverEffects() {
    document.body.style.cursor = "auto"; 
}

function isColliding(e, pin) {
    xDist = e.offsetX - pin.x;
    yDist = e.offsetY - pin.y - 4.5; // const 
    dist = Math.sqrt((xDist ** 2) + (yDist ** 2));
    return dist <= pin.r; 
}

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