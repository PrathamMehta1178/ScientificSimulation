let angle, velocity;
let projectile;
let g = 9.81; // Gravity
let t = 0; // Time
let startX, startY; // Starting position

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight - 120); // Adjust canvas size
    canvas.parent('simulationContainer');
    startX = 50;
    startY = height - 50;
    noLoop(); // Stop the draw loop initially
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight - 120); // Adjust canvas size on window resize
    startY = height - 50; // Adjust the starting Y position
    if (projectile) {
        noLoop();
        startSimulation(); // Restart the simulation on resize
    }
}

function startSimulation() {
    angle = radians(parseFloat(document.getElementById('angle').value));
    velocity = parseFloat(document.getElementById('velocity').value);
    projectile = {
        x: startX,
        y: startY,
        vx: velocity * cos(angle),
        vy: -velocity * sin(angle) // Negative because p5 y-axis goes down
    };
    t = 0;
    loop(); // Start the draw loop
}

function draw() {
    background(255);
    fill(0);
    textSize(16);
    text('Launch Angle: ' + degrees(angle).toFixed(2) + '°', 10, 20);
    text('Initial Velocity: ' + velocity + ' m/s', 10, 40);
    text('Time: ' + t.toFixed(2) + ' s', 10, 60);

    if (projectile) {
        // Update position
        projectile.x = startX + projectile.vx * t;
        projectile.y = startY + projectile.vy * t + 0.5 * g * t * t;

        // Draw projectile
        ellipse(projectile.x, projectile.y, 20, 20);

        // Stop simulation if projectile hits the ground
        if (projectile.y >= height) {
            noLoop();
        }

        // Update time
        t += 0.05;
    }
}
