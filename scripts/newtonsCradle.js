// module aliases
const Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      Bodies = Matter.Bodies,
      Composites = Matter.Composites,
      Mouse = Matter.Mouse,
      MouseConstraint = Matter.MouseConstraint,
      World = Matter.World,
      aBody = Matter.Body;

// create an engine
const engine = Engine.create(),
      world = engine.world;

// create a renderer
const render = Render.create({
    element: document.getElementById('simulationContainer'),
    engine: engine,
    options: {
        width: 800,
        height: 600,
        wireframes: false
    }
});

Render.run(render);

// create runner
const runner = Runner.create();
Runner.run(runner, engine);

// function to create newton's cradle
function createCradle(length) {
    const cradle = Composites.newtonsCradle(280, 100, 5, 30, length);
    aBody.translate(cradle.bodies[0], { x: -length * 0.9, y: -length * 0.5 });
    return cradle;
}

// initial length of string
let stringLength = 200;

// add bodies
let cradle = createCradle(stringLength);
World.add(world, cradle);

// function to update string length
function updateStringLength(length) {
    stringLength = parseInt(length);

    // remove the existing cradle
    World.remove(world, cradle);

    // create a new cradle with the updated string length
    cradle = createCradle(stringLength);
    World.add(world, cradle);
}

// add mouse control
const mouse = Mouse.create(render.canvas),
      mouseConstraint = MouseConstraint.create(engine, {
          mouse: mouse,
          constraint: {
              stiffness: 0.2,
              render: {
                  visible: false
              }
          }
      });

World.add(world, mouseConstraint);

// keep the mouse in sync with rendering
render.mouse = mouse;

// fit the render viewport to the scene
Render.lookAt(render, {
    min: { x: 0, y: 0 },
    max: { x: 800, y: 600 }
});

// an example of using beforeUpdate event on an engine
Matter.Events.on(engine, 'beforeUpdate', function(event) {
    // move the first pendulum back and forth
    if ((event.timestamp % 2000) < 1000) {
        aBody.translate(cradle.bodies[0], { x: -2, y: 0 });
    } else {
        aBody.translate(cradle.bodies[0], { x: 2, y: 0 });
    }
});
