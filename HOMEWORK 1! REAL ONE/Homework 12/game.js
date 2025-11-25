// Game state variables
let player;
let obstacles = [];
let mouseObject = null;
let exitPoint;
let gameWon = false;

// Colors
const BLACK = 0;
const WHITE = 255;
const RED = '#FF0000';
const BLUE = '#0000FF';
const GREEN = '#00FF00';
const YELLOW = '#FFFF00';

// === Function Definitions ===

// Function to create a player
function createPlayer() {
    let playerSize = 30;
    // Store player properties in an object
    player = {
        x: width / 2 - playerSize / 2,
        y: height - playerSize - 10,
        size: playerSize,
        speed: 5
    };
}

// Function to move the player using the keyboard
function movePlayer() {
    if (keyIsDown(LEFT_ARROW)) {
        player.x -= player.speed;
    }
    if (keyIsDown(RIGHT_ARROW)) {
        player.x += player.speed;
    }
    if (keyIsDown(UP_ARROW)) {
        player.y -= player.speed;
    }
    if (keyIsDown(DOWN_ARROW)) {
        player.y += player.speed;
    }
    // Keep player within the screen boundaries
    player.x = constrain(player.x, 0, width - player.size);
    player.y = constrain(player.y, 0, height - player.size);
}

// Function that draws an object to the screen when pressing the mouse
function mousePressed() {
    // p5.js calls this function automatically when the mouse is clicked
    mouseObject = {
        x: mouseX,
        y: mouseY,
        size: 20
    };
}

// Function to draw the mouse-clicked object
function drawMouseObject() {
    if (mouseObject) {
        fill(RED);
        noStroke();
        ellipse(mouseObject.x, mouseObject.y, mouseObject.size, mouseObject.size);
    }
}

// Function that creates multiple obstacles
function createObstacles() {
    for (let i = 0; i < 2; i++) {
        let size = random(20, 50);
        let x = random(width - size);
        let y = random(height - size);
        let color = [random(255), random(255), random(255)];
        let speedX = random([-2, 2]);
        let speedY = random([-2, 2]);
        obstacles.push({
            x: x,
            y: y,
            size: size,
            color: color,
            speedX: speedX,
            speedY: speedY
        });
    }
}

// Function to move each of the obstacles
function moveObstacles() {
    for (let obs of obstacles) {
        obs.x += obs.speedX;
        obs.y += obs.speedY;

        // Wrap around logic: if they leave the screen, have them come back on the other side.
        if (obs.x > width) obs.x = -obs.size;
        if (obs.x < -obs.size) obs.x = width;
        if (obs.y > height) obs.y = -obs.size;
        if (obs.y < -obs.size) obs.y = height;
    }
}

// Function to draw the obstacles
function drawObstacles() {
    for (let obs of obstacles) {
        fill(obs.color);
        noStroke();
        rect(obs.x, obs.y, obs.size, obs.size);
    }
}


// Function to generate a border around the screen
function generateBorder() {
    stroke(WHITE);
    strokeWeight(10);
    noFill();
    rect(0, 0, width, height);
}

// Function to generate the exit
function createExit() {
    let exitSize = 50;
    exitPoint = {
        x: width / 2 - exitSize / 2,
        y: 10,
        size: exitSize
    };
}

// Function to draw the exit
function drawExit() {
    if (exitPoint) {
        fill(GREEN);
        noStroke();
        rect(exitPoint.x, exitPoint.y, exitPoint.size, exitPoint.size);
    }
}

// Function to display the "You win" message
function displayWinMessage() {
    fill(YELLOW);
    textSize(74);
    textAlign(CENTER, CENTER);
    text("You Win!", width / 2, height / 2);
}

// Function to draw the player 
function drawPlayer() {
    if (player) {
        fill(BLUE);
        noStroke();
        rect(player.x, player.y, player.size, player.size);
    }
}

// === p5.js Core Functions ===

function setup() {
    createCanvas(800, 600);
    createPlayer();
    createObstacles();
    createExit();
}

function draw() {
    // 1. Update Game State (Movement, Logic)
    movePlayer();
    moveObstacles();

    // Check for win condition 
    if (player.y <= exitPoint.y + exitPoint.size) {
       gameWon = true;
    }

    
    background(BLACK);
    generateBorder();
    drawPlayer();
    drawObstacles();
    drawMouseObject();
    drawExit();
    
    if (gameWon) {
        displayWinMessage();
    }
}
