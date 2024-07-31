let angleA=0;
let angleV=0;
let bob;
let len = 300;
let origin;
let gravity = 1;

function setup(){
createCanvas(800,600);
origin = createVector(400,0);
angle = PI/4;
bob = createVector();
}

function draw(){
background(0);

let force = gravity *sin(angle);
angleA = (-1 *force)/len;
angleV += angleA;       
angle += angleV;

bob.x = len *sin(angle) + origin.x;
bob.y = len*cos(angle) +origin.y;

stroke(255);
strokeWeight(8);
fill(127);
line(origin.x,origin.y,bob.x,bob.y)
circle(bob.x,bob.y,50)
}
function changeHeight(l){
return len = l
}

var slider = document.getElementById('height')
slider.addEventListener('change', function(){ changeHeight(this.value)});
