/**
Alice in Borderlands
Kathy Nguyen

This is a prototype of the responsive voice.
The game master will give instructions through the phone.
This prototype will also include the timer test.
*/

// Code goes here

let beginGame = `Welcome to the game. Are you ready to start?`;

// timer to 10 seconds
let countdown = 10;

// states
let state = `start`;

let phone = {
  x: 100,
  y: 100,
  size: 55,
};

function setup() {
  createCanvas(640, 480);
  // timer countdown
  setInterval(countdownTime, 1000);
}

function draw() {
  background(0);

  if (state === `start`) {
    start();
  }

  if (state === `death`) {
    death();
  }
}

function start() {
  // temporary phone
  ellipse(phone.x, phone.y, phone.size);

  //display timer on screen
  push();
  textSize(50);
  textAlign(CENTER);
  fill(255, 255, 255);
  text("Timer: " + countdown, width / 2, height / 2);
  pop();
}

function death() {
  background(255, 0, 0);
}

function mousePressed() {
  // when player press the phone game master gives instructions or talks.
  let pBtn = dist(mouseX, mouseY, phone.x, phone.y);
  if (pBtn < phone.size / 2) {
    responsiveVoice.speak(beginGame, "Japanese Female");
  }
}

// timer goes down
function countdownTime() {
  if (countdown > 0) {
    countdown--;
  }
  // if countdown is at 0, the player dies
  if(countdown === 0) {
    state = `death`;
  }
}
