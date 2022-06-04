// Setup Canvas 
let cnv = document.getElementById("canvasEl");
let ctx = cnv.getContext("2d");
cnv.width = 1200;
cnv.height = 1000;

// Object Variables
let player = new Player();
let obstacles = new Obstacle();

// push
let pushedArray = pushArray(10);

// Screen States
let state = "start";


requestAnimationFrame(animate);

function animate() {

    if (state === "start") {
        startScreen();
    } else if (state === "game") {
        gameScreen();
    } else if (state === "end") {
        endScreen();
    } else if (state === "reset") {
        reset();
    }



    requestAnimationFrame(animate);
}

addEventListener("keydown", player.move);
addEventListener("mousedown", mouseDownHandler)