/**
Alice in Borderlands
Kathy Nguyen

This
*/

// Code goes here

let beginGame = `Welcome to the game. Are you ready to start?`;

// timer to 10 seconds
let countdown = 10;

// states
let state = `start`;

let startButton = {
  x: 350,
  y: 400,
  size: 55,
};

// fonts
let titleFont;
let paragraphFont;

// images
let phoneInstruction;

/**
Description of preload
Load fonts, pictures and sounds
*/
function preload() {
  // load sounds


  // load fonts
  titleFont = loadFont(`assets/fonts/FjallaOne-Regular.ttf`);
  paragraphFont = loadFont(`assets/fonts/VarelaRound-Regular.ttf`);

  // load images
  phoneInstruction = loadImage(`assets/images/phoneInstructions.png`);
}

function setup() {
  createCanvas(700, 500);


}

function draw() {
  background(0);

  if (state === `start`) {
    start();
  }

  if (state === `firstGame`) {
    firstGame();
  }

  if (state === `death`) {
    death();
  }
}


function start() {
  // display of the start screen
  push();
  textFont(titleFont);
  textAlign(CENTER, CENTER);
  textSize(50);
  fill(139,0,0);
  text(`ALICE IN BORDERLANDS`, width / 2, height / 2 - 150);
  textFont(paragraphFont);
  textAlign(CENTER, CENTER);
  textSize(30);
  fill(255,255,255);
  text(`Press this button to start`, width / 2, height / 2);
  pop();

  // display startButton
  fill(139,0,0);
  ellipse(startButton.x , startButton.y , startButton.size);
}

function firstGame() {


  //display timer on screen
  push();
  textSize(20);
  textAlign(CENTER);
  fill(255, 255, 255);
  text("Timer: " + countdown, width / 2, height / 2 - 200);

  countdownTime();


  image(phoneInstruction,0,0,700,500);
  pop();
}

function death() {
  background(255, 0, 0);
}

function mousePressed() {
  // when player press the phone game master gives instructions or talks.
  let pBtn = dist(mouseX, mouseY, startButton.x, startButton.y);
  if (pBtn < startButton.size / 2) {
    responsiveVoice.speak(beginGame, "Japanese Female");
    state = `firstGame`;
  }
}

// timer goes down
function countdownTime() {
  if(frameCount % 60 == 0 && countdown > 0) {
    countdown--;
  }
  if (countdown == 0) {
    state = `death`;
  }
}
