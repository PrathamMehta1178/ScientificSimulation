let Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Events = Matter.Events;

let engine;
let world;
let balls = [];
let ballCount = 10;
let speed = 1;

function setup() {
    createCanvas(800, 600).parent('simulation');

    // Create an engine
    engine = Engine.create();
    world = engine.world;

    // Create walls
    let walls = [
        Bodies.rectangle(width / 2, 0, width, 20, { isStatic: true }),
        Bodies.rectangle(width / 2, height, width, 20, { isStatic: true }),
        Bodies.rectangle(0, height / 2, 20, height, { isStatic: true }),
        Bodies.rectangle(width, height / 2, 20, height, { isStatic: true })
    ];

    World.add(world, walls);

    // Create balls
    for (let i = 0; i < ballCount; i++) {
        createBall();
    }

    // Set initial frame rate
    frameRate(60 * speed); // Default frame rate with speed adjustment
}

function draw() {
    background(200);

    // Update ball positions
    for (let ball of balls) {
        ellipse(ball.position.x, ball.position.y, ball.circleRadius * 2);
    }

    // Update the engine
    Engine.update(engine, 1000 / 60); // Fixed time step for physics simulation
}

function createBall() {
    let radius = random(10, 30);
    let ball = Bodies.circle(random(50, width - 50), random(50, height - 50), radius, {
        restitution: 1, // Bounce
        friction: 0,
        frictionAir: 0,
        density: 0.04
    });
    World.add(world, ball);
    balls.push(ball);
}

function updateSpeed(value) {
    speed = parseFloat(value);
    document.getElementById('speedValue').innerText = speed;

    frameRate(60 * speed); // Adjust frame rate based on speed
}

function updateBallCount(value) {
    ballCount = parseInt(value);
    document.getElementById('ballCountValue').innerText = ballCount;

    // Remove all existing balls
    for (let ball of balls) {
        World.remove(world, ball);
    }
    balls = [];

    // Create new balls
    for (let i = 0; i < ballCount; i++) {
        createBall();
    }
}
