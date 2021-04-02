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

let phone = {
  x: 100,
  y: 100,
  size: 55
}

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

  // temporary phone
  ellipse(phone.x,phone.y,phone.size);

}

function mousePressed(){

    let pBtn = dist(mouseX, mouseY, phone.x, phone.y);
      if(pBtn < phone.size / 2) {
        responsiveVoice.speak(beginGame, "Japanese Female");
      }


}
