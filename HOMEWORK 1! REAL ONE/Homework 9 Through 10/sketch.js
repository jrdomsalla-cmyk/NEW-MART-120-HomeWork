function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(220);

  fill(100)
  rect(225, 80, 50, 200); // Body
  // Head
  fill(255, 200, 150); // Skin tone for the head
  ellipse(250, 150, 150, 120);

  // Hands
  triangle(310, 75, 340, 20, 380, 95)
  triangle(110, 75, 140, 20, 180, 95)
  fill(255, 0, 0) //Ball
  circle(250, 60, 90);
  fill(200, 550, 3)
  // Eyes
  fill(0); // Black for the pupils
  circle(210, 140, 20);
  circle(290, 140, 20);

  // Glasses frames
  // Left lens frame
  noFill(); // Draw an outline for the frame
  stroke(0); // Black for the frames
  strokeWeight(3);
  rect(180, 125, 60, 40, 10); // x, y, width, height, corner radius

  // Right lens frame
  rect(260, 125, 60, 40, 10); // x, y, width, height, corner radius

  // Bridge of the nose connecting the frames
  line(240, 145, 260, 145);
  // Blue jean legs
  fill(52, 69, 133);

  rect(225, 250, 25, 150); // Left leg
  rect(250, 250, 25, 150); // Right leg
  stroke(0);
  strokeWeight(4);
  point(180, 240);
  point(320, 240);
  point(250, 350);
  // Belt Buckle
  fill(255, 200, 0);
  triangle(250, 250, 230, 280, 270, 280);

  // Set text properties for the signature
  textSize(12);       // Smaller text size for the signature
  textAlign(LEFT, BOTTOM); // Align to the bottom left
  fill(0);          // Text color black
  noStroke();       // No stroke
  text('Jacob Domsalla', 10, height - 10); // Display name at the bottom left
// Set text properties for the title
  textSize(34); // Increase text size for the title
  textAlign(RIGHT, TOP); // Align text to the top right
  textStyle(BOLD); // Set the text to bold
  fill(0); // Set text color to black
  noStroke(); // Remove stroke from text
  text('ME!!', width - 10, 10); // Display the title near the top right (with a 10px margin)


}


 