/**
Alice in Borderlands
Kathy Nguyen

This is a prototype of the responsive voice.
The game master will give instructions through the phone.
*/


// Code goes here

let beginGame = `Welcome to the game. Are you ready to start?`
let saying = ``;

let state = `start`

function setup() {
  createCanvas(640, 480);
}

function draw(){
  background(0);

  if (state === `start`) {
    start();
  }
}



function start(){
  speak();

  push();
  textSize(20);
  textAlign(CENTER);
  fill(255,255,255);
  text(beginGame, width/2, height /2);
  pop();
}

function speak(){
  setTimeout(responsiveVoice.speak(beginGame, "Japanese Female"),10);
}
