let globeParticles = [];
let floatingParticles = [];
const globeRadius = 200;
let rotationAngle = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);

  const totalParticles = 500;
  for (let i = 0; i < totalParticles; i++) {
    let theta = random(TWO_PI);
    let phi = random(-PI / 2, PI / 2);

    let colors = [
      [200, 200, 255],
      [180, 180, 200],
      [150, 150, 255],
      [220, 220, 220],
    ];
    let [r, g, b] = random(colors);

    globeParticles.push({
      theta: theta,
      phi: phi,
      color: color(r, g, b, 150),
    });
  }
}

function draw() {
  background(0, 0, 0, 25);

  let centerX = width / 2;
  let centerY = height / 2;

  // Rotate globe
  rotationAngle += 0.002; // slow rotation

  // Draw globe particles
  for (let p of globeParticles) {
    let x3 = globeRadius * cos(p.phi) * cos(p.theta + rotationAngle);
    let y3 = globeRadius * sin(p.phi);
    let z3 = globeRadius * cos(p.phi) * sin(p.theta + rotationAngle);

    // Perspective projection
    let perspective = 500 / (500 + z3);
    let x2 = centerX + x3 * perspective;
    let y2 = centerY + y3 * perspective;

    fill(p.color);
    noStroke();
    ellipse(x2, y2, 6 * perspective);
  }

  // Floating background particles
  if (frameCount % 3 === 0) {
    floatingParticles.push({
      x: random(width),
      y: random(height),
      velocity: 0.2 + random(),
      angle: random(TWO_PI),
      color: color(random([200, 255]), 0, random([200, 255]), 120),
      life: 0,
      maxLife: 100 + random(100),
    });
  }

  for (let i = floatingParticles.length - 1; i >= 0; i--) {
    let p = floatingParticles[i];
    p.x += cos(p.angle) * p.velocity;
    p.y += sin(p.angle) * p.velocity;
    p.velocity *= 0.99;
    p.life++;
    fill(p.color);
    noStroke();
    ellipse(p.x, p.y, 6);

    if (p.life > p.maxLife) {
      floatingParticles.splice(i, 1);
    }
  }
}

// Mouse move spawns floating particles
function mouseMoved() {
  for (let i = 0; i < 5; i++) {
    floatingParticles.push({
      x: mouseX,
      y: mouseY,
      velocity: 0.2 + random(),
      angle: random(TWO_PI),
      color: color(random([200, 255]), 0, random([200, 255]), 120),
      life: 0,
      maxLife: 100 + random(100),
    });
  }
}

// Extra burst on click
function mousePressed() {
  for (let i = 0; i < 150; i++) {
    floatingParticles.push({
      x: mouseX,
      y: mouseY,
      velocity: 0.2 + random(),
      angle: random(TWO_PI),
      color: color(random([200, 255]), 0, random([200, 255]), 120),
      life: 0,
      maxLife: 100 + random(100),
    });
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
