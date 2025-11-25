// Variables to control movement and animation states
let xPos1; // Position for the (left eye)
let directionX1; // Direction for the (left eye)
let speedX1; // Random speed for the (left eye)

let yPos1; // Position for the (right eye)
let directionY1; // Direction for the (right eye)
let speedY1; // Random speed for the (right eye)
let xPos2; // Position for the (ball)
let yPos2;
let directionX2;
let directionY2;
let speedDiag; // Combined speed for the (ball)

let titleSize; // Variable for the title text size
let sizeDirection = 1; 
let sizeCounter = 0; 

function setup() {
  createCanvas(500, 500);

  // Initialize starting positions
  xPos1 = 210; // Start at the original left eye X position
  yPos1 = 140; // Start at the original right eye Y position
  xPos2 = 250; // Start at the original ball X position
  yPos2 = 60; // Start at the original ball Y position

  // Initialize random speeds for different movements
  speedX1 = random(1, 4); // Speed for left eye (x-axis)
  speedY1 = random(2, 5); // Speed for right eye (y-axis)
  speedDiag = random(3, 6); // Speed for ball (diagonal)

  // Initialize directions (1 for positive, -1 for negative)
  directionX1 = 1;
  directionY1 = 1;
  directionX2 = 1;
  directionY2 = 1;

  titleSize = 10; // Initial size for the title text
}

function draw() {
  background(220);



  // X-axis movement (Left Eye)
  xPos1 += directionX1 * speedX1;
  if (xPos1 > 240 || xPos1 < 180) { // Constrain movement within the glasses frame width
    directionX1 *= -1; // Reverse direction
    speedX1 = random(1, 4); // Randomize speed after reversing
  }

  // Y-axis movement (Right Eye)
  yPos1 += directionY1 * speedY1;
  if (yPos1 > 165 || yPos1 < 125) { // Constrain movement within the glasses frame height
    directionY1 *= -1; // Reverse direction
    speedY1 = random(2, 5); // Randomize speed after reversing
  }

  // Diagonal movement (Ball/Hat)
  xPos2 += directionX2 * speedDiag;
  yPos2 += directionY2 * speedDiag;
  // Reverse X direction if it hits canvas edges
  if (xPos2 > width - 45 || xPos2 < 45) {
    directionX2 *= -1;
    speedDiag = random(3, 6); // Randomize speed
  }
  // Reverse Y direction if it hits canvas edges
  if (yPos2 > height - 45 || yPos2 < 45) {
    directionY2 *= -1;
    speedDiag = random(3, 6); // Randomize speed
  }

  //

  // Make the title get larger five times and then get smaller five times. Repeat forever.
  if (frameCount % 10 === 0) { // Change size every 10 frames for visibility
    titleSize += sizeDirection * 1; // Change size by 1 unit
    sizeCounter++;

    if (sizeCounter >= 5) {
      sizeDirection *= -1; // Reverse direction (from grow to shrink, or vice versa)
      sizeCounter = 0; // Reset the counter
    }
  }

  

  // Body
  fill(100)
  rect(225, 80, 50, 200);

  // Head
  fill(255, 200, 150); // Skin tone for the head
  ellipse(250, 150, 150, 120);

  // Hands 
  triangle(310, 75, 340, 20, 380, 95)
  triangle(110, 75, 140, 20, 180, 95)
  fill(255, 0, 0)

  // Ball (Diagonal movement)
  circle(xPos2, yPos2, 90);
  fill(200, 550, 3)

  // Eyes
  fill(0); // Black for the pupils

  // Left Eye (Moves along X-axis)
  circle(xPos1, 140, 20);

  // Right Eye (Moves along Y-axis)
  circle(290, yPos1, 20);

  // Glasses frames 
  noFill();
  stroke(0);
  strokeWeight(3);
  rect(180, 125, 60, 40, 10);
  rect(260, 125, 60, 40, 10);
  line(240, 145, 260, 145);

  // Blue jean legs 
  fill(52, 69, 133);
  rect(225, 250, 25, 150);
  rect(250, 250, 25, 150);

  // Points 
  stroke(0);
  strokeWeight(4);
  point(180, 240);
  point(320, 240);
  point(250, 350);

  // Belt Buckle 
  fill(255, 200, 0);
  triangle(250, 250, 230, 280, 270, 280);

  // Title (Dynamic Size)
  fill(0); // Set text color back to black
  noStroke(); // Remove stroke from text
  textSize(titleSize); // Use the dynamic size variable
  text('Jacob Domsalla', 10, 30);
}