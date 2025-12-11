let clouds = [];
let trees = [];
let bushes = [];
let sunY;
let birds = [];
let mountainShapes = []; //Precomputed mountain shapes


// SETUP

function setup() {
    createCanvas(800, 600);
    noStroke();

    sunY = height * 0.2;

    // Clouds
    for (let i = 0; i < 6; i++) {
        clouds.push(new Cloud(random(width), random(height * 0.1, height * 0.3), random(0.5, 2)));
    }

    // Trees
    let x = 0;
    while (x < width) {
        let y = random(height * 0.6, height * 0.95);
        let size = random(40, 100);
        let depth = map(y, height * 0.6, height, 0.3, 1);

        
        let xpos = x + random(-15, 15);

        trees.push(new Tree(xpos, y, size, depth));

        // 
        x += random(35, 55); 
    }

    // 7 extra trees 
    for (let i = 0; i < 7; i++) {
        let x = random(width);
        let y = random(height * 0.6, height * 0.95);
        let size = random(40, 100);
        let depth = map(y, height * 0.6, height, 0.3, 1);
        trees.push(new Tree(x, y, size, depth));
    }

    // Bushes: avoid overlapping tree leaves
    let bushAttempts = 0;
    while (bushes.length < 25 && bushAttempts < 500) {
        let x = random(width);
        let y = random(height * 0.85, height * 0.95);
        let size = random(10, 40);

        // Check if bush overlaps any tree's leaves
        let overlaps = trees.some(t => {
            let leafLeft = t.x - t.size * 0.5;
            let leafRight = t.x + t.size * 0.5;
            let leafTop = t.y - t.size * 1.1;
            let leafBottom = t.y;
            let bushLeft = x - size * 0.5;
            let bushRight = x + size * 0.5;
            let bushTop = y - size * 0.35;
            let bushBottom = y + size * 0.35;

            return !(bushRight < leafLeft || bushLeft > leafRight || bushBottom < leafTop || bushTop > leafBottom);
        });

        if (!overlaps) {
            bushes.push(new Bush(x, y, size));
        }

        bushAttempts++;
    }

    // Birds
    for (let i = 0; i < 12; i++) {
        birds.push(new Bird(random(width), random(height * 0.05, height * 0.3), random(1, 3)));
    }

    // Precompute mountains
    precomputeMountains();
}



// DRAW LOOP

function draw() {
    drawSky();
    drawMountains(); 

    clouds.forEach(c => {
        c.move();
        c.display();
    });

    drawGround();

    // Sort trees by depth: back to front
    trees.sort((a, b) => a.depth - b.depth);

    // Draw trunks 
    for (let t of trees) {
        t.displayTrunk();
    }

    // Draw leaves for all 
    for (let t of trees) {
        t.displayLeaves();
    }

    bushes.forEach(b => b.display());

    // Birds 
    birds.forEach(b => {
        b.move();
        b.display();
    });
}


// SKY

function drawSky() {
    let c1 = color(135, 206, 235);
    let c2 = color(70, 130, 180);
    for (let y = 0; y < height * 0.7; y++) {
        stroke(lerpColor(c1, c2, map(y, 0, height * 0.7, 0, 1)));
        line(0, y, width, y);
    }

    // Sun above mountains
    fill(255, 255, 0);
    noStroke();
    ellipse(width * 0.8, sunY, 60, 60);
}


// GROUND WITH SHADOWS

function drawGround() {
    let c1 = color(34, 139, 34);
    let c2 = color(0, 100, 0);
    for (let y = height * 0.6; y < height; y++) {
        stroke(lerpColor(c1, c2, map(y, height * 0.6, height, 0, 1)));
        line(0, y, width, y);
    }

    // Soft shadows under trees
    for (let t of trees) {
        fill(0, 0, 0, 30);
        ellipse(t.x, t.y + t.size * 0.25, t.size * 0.6, t.size * 0.15);
    }
}


// MOUNTAINS

function precomputeMountains() {
    let baseY = height * 0.6;
    let colors = [color(120, 120, 120), color(150, 150, 150), color(180, 180, 180)];

    for (let i = 0; i < 3; i++) {
        let peakHeight = random(100, 200) * (i + 0.5);
        let shapePoints = [];
        let x = 0;
        while (x <= width) {
            let y = baseY - peakHeight * noise(x * 0.005, i * 10);
            shapePoints.push({x, y});
            x += 10;
        }
        mountainShapes.push({color: colors[i], points: shapePoints});
    }
}

function drawMountains() {
    noStroke();
    for (let m of mountainShapes) {
        // subtle gradient near base
        let grad = lerpColor(m.color, color(0, 0, 0, 50), 0.3);
        fill(grad);
        beginShape();
        vertex(0, height * 0.6);
        for (let p of m.points) {
            vertex(p.x, p.y);
        }
        vertex(width, height * 0.6);
        endShape(CLOSE);
    }
}


// CLOUD CLASS

class Cloud {
    constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.size = random(40, 80);
    }
    move() {
        this.x += this.speed;
        if (this.x > width + 50) {
            this.x = -50;
            this.y = random(height * 0.1, height * 0.3);
        }
    }
    display() {
        fill(255, 255, 255, random(180, 220)); 
        noStroke();
        ellipse(this.x, this.y, this.size, this.size * 0.7);
        ellipse(this.x + this.size * 0.5, this.y, this.size * 0.8, this.size * 0.6);
        ellipse(this.x - this.size * 0.4, this.y + 0.1 * this.size, 0.7 * this.size, 0.5 * this.size);
    }
}

// TREE CLASS WITH SHADOWS

class Tree {
    constructor(x, y, size, depth) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.depth = depth;
        this.leafColor = lerpColor(color(0, 100, 0), color(34, 139, 34), depth);
        this.trunkColor = color(101, 67, 33);
    }
    displayTrunk() {
        fill(this.trunkColor);
        rect(this.x, this.y, this.size * 0.15, this.size * 0.5);
        fill(0, 0, 0, 50); // shadow on right
        rect(this.x + this.size * 0.08, this.y, this.size * 0.07, this.size * 0.5);
    }
    displayLeaves() {
        // main leaves
        fill(this.leafColor);
        triangle(this.x - this.size * 0.5, this.y,
                 this.x + this.size * 0.5, this.y,
                 this.x, this.y - this.size);
        triangle(this.x - this.size * 0.4, this.y - this.size * 0.3,
                 this.x + this.size * 0.4, this.y - this.size * 0.3,
                 this.x, this.y - this.size * 1.1);

        // subtle shadow behind leaves
        fill(0, 50);
        triangle(this.x - this.size * 0.48, this.y - 2,
                 this.x + this.size * 0.48, this.y - 2,
                 this.x, this.y - this.size + 5);
        triangle(this.x - this.size * 0.38, this.y - this.size * 0.28,
                 this.x + this.size * 0.38, this.y - this.size * 0.28,
                 this.x, this.y - this.size * 1.05);
    }
}


// BUSH CLASS WITH SHADOWS

class Bush {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
    }
    display() {
        fill(0, 0, 0, 40); // shadow below
        ellipse(this.x, this.y + this.size * 0.1, this.size * 0.8, this.size * 0.3);

        fill(0, 128, 0);
        ellipse(this.x, this.y, this.size, this.size * 0.7);
        ellipse(this.x + this.size * 0.3, this.y - this.size * 0.1, this.size * 0.6, this.size * 0.5);
        ellipse(this.x - this.size * 0.3, this.y - this.size * 0.1, this.size * 0.6, this.size * 0.5);
    }
}


// BIRD CLASS

class Bird {
    constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.size = random(10, 20);
    }
    move() {
        this.x += this.speed;
        if (this.x > width + 20) this.x = -20;
    }
    display() {
        fill(0);
        noStroke();
        triangle(this.x, this.y,
                 this.x - this.size / 2, this.y + this.size / 2,
                 this.x + this.size / 2, this.y + this.size / 2);
    }
}
