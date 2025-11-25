let obstacles = [];
let staticObstacles = [];
let exitZone;
let player;
let won = false;

function setup() {
  createCanvas(800, 600);

  // Create initial moving obstacles
  for (let i = 0; i < 5; i++) {
    obstacles.push({
      x: random(width),
      y: random(height),
      w: random(30, 60),
      h: random(30, 60),
      col: color(random(255), random(255), random(255)),
      vx: random(-2, 2),
      vy: random(-2, 2)
    });
  }

  // Player starting position
  player = { x: 50, y: height / 2, size: 25 };

  // Exit zone
  exitZone = {
    x: width - 100,
    y: height / 2 - 50,
    w: 80,
    h: 100
  };
}

function draw() {
  background(30);

  // Draw exit
  fill(0, 255, 0);
  rect(exitZone.x, exitZone.y, exitZone.w, exitZone.h);
  fill(255);
  textSize(20);
  text("EXIT", exitZone.x + 20, exitZone.y + 55);

  // Draw and move moving obstacles
  for (let obs of obstacles) {
    fill(obs.col);
    rect(obs.x, obs.y, obs.w, obs.h);

    obs.x += obs.vx;
    obs.y += obs.vy;

    // Wrap around screen
    if (obs.x > width) obs.x = -obs.w;
    if (obs.x + obs.w < 0) obs.x = width;
    if (obs.y > height) obs.y = -obs.h;
    if (obs.y + obs.h < 0) obs.y = height;
  }

  // Draw static obstacles added by mouse clicks
  for (let sobs of staticObstacles) {
    fill(sobs.col);
    rect(sobs.x, sobs.y, sobs.w, sobs.h);
  }

  // Draw player
  fill(0, 150, 255);
  ellipse(player.x, player.y, player.size);

  // Player movement (arrow keys)
  if (keyIsDown(LEFT_ARROW)) player.x -= 3;
  if (keyIsDown(RIGHT_ARROW)) player.x += 3;
  if (keyIsDown(UP_ARROW)) player.y -= 3;
  if (keyIsDown(DOWN_ARROW)) player.y += 3;

  // Check win condition (player reaches exit)
  if (
    player.x > exitZone.x &&
    player.x < exitZone.x + exitZone.w &&
    player.y > exitZone.y &&
    player.y < exitZone.y + exitZone.h
  ) {
    won = true;
  }

  if (won) {
    fill(255, 255, 0);
    textSize(50);
    text("YOU WIN!", width / 2 - 120, height / 2);
    noLoop();
  }
}

function mousePressed() {
  // Add new non-moving obstacle at mouse location
  staticObstacles.push({
    x: mouseX,
    y: mouseY,
    w: random(20, 60),
    h: random(20, 60),
    col: color(random(255), random(255), random(255))
  });
}
