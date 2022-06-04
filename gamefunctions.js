class Player {
    constructor() {
        // Dimensions
        this.width = 20;
        this.height = 20;

        // Position
        this.position = {
            x: 500,
            y: 500
        }

        // Velocity
        this.velocity = {
            x: 7,
            y: 7
        }
    }

    draw() {
        fill("white");
        rect(this.position.x, this.position.y, this.width, this.height, "fill");
    }

    // Key Press to Move
    move(event) {
        if (event.keyCode == 87) {
            player.position.y -= player.velocity.y;
        } else if (event.keyCode == 83) {
            player.position.y += player.velocity.y;
        } else if (event.keyCode == 65) {
            player.position.x -= player.velocity.x;
        } else if (event.keyCode == 68) {
            player.position.x += player.velocity.x;
        }
    }

}

class Obstacle {
    constructor() {

        this.width = 15;
        this.height = 15;

        // Position
        this.position = {
            x: randomInt(0, cnv.width),
            y: 0
        }

        // Velocity
        this.velocity = {
            x: 0,
            y: randomDec(0.5, 3)
        }

    }

    // Draw Function
    draw() {
        fill(randomRGB());
        rect(this.position.x, this.position.y, this.width, this.height, "fill");
    }

    move() {
        this.position.y += this.velocity.y;
        if (this.position.y >= cnv.height) {
            this.position.y = 0;
        }
    }

}

let obsArray = [];

function pushArray(total) {
    for (n = 1; n <= total; n++) {
        obsArray.push(new Obstacle());
    }
    return obsArray;
}


// Score Variables
let score = 0;
let rate = 1;

// Score
function gameScore() {
    score += rate;
    fill("white");
    text(score, 20, 20, "fill");
}

// Test if two rectangle objects intersect
function rectCollide(rect1, rect2) {
    let le1 = rect1.position.x;
    let re1 = rect1.position.x + rect1.width;
    let te1 = rect1.position.y;
    let be1 = rect1.position.y + rect1.height;
    let le2 = rect2.position.x;
    let re2 = rect2.position.x + rect2.width;
    let te2 = rect2.position.y;
    let be2 = rect2.position.y + rect2.height;
    return le1 < re2 && re1 > le2 && be1 > te2 && te1 < be2;
}


// Game Harder
function addObs() {
    obsArray.push(new Obstacle);
}

function smallerObs() {
    obstacles.height -= 2;
    obstacles.width -= 2;
}

setInterval(addObs, 5000);



//Screens
function startScreen() {
    background("lightblue");
    fill("black");
    font("44px Times New Roman");
    text("Asteroid Avoider", 470, 500, "fill");
    font("20px Times New Roman");
    text("Click to Play", 550, 540, "fill");
}

function gameScreen() {
    // Clear Canvas
    background("black")

    // Player Function
    for (let obstacles of pushedArray) {
        obstacles.draw()
        if (rectCollide(player, obstacles)) {
            state = "end"
        }
        obstacles.move();
    }

    player.draw();

    gameScore();
}

// EndGame
function endScreen() {
    background("lightblue");
    fill("black");
    font("44px Comic Sans MS");
    text("GAME OVER", 500, 500, "fill");
    font("20px Comic Sans MS");
    text("Click to Play Again", 550, 540, "fill");
    text("You Scored " + score + " points!", 540, 570, "fill");
    rate = 0;
}

function reset() {
    location.reload();
}


function mouseDownHandler() {
    if (state === "start") {
        state = "game";
    } else if (state === "end") {
        state = "reset";
    }
}