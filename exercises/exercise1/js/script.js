"use strict";

/**
Where's sausage dog
Activity 1 - Kathy Nguyen
*/

const NUM_RAMBUTAN_IMAGES = 2;
const NUM_RAMBUTANS = 150;

let rambutanImages = [];
let rambutans = [];

let hedgehogImage;
let hedgehog;

let swirlSound;
let gameMusic;

let state = `title`;

/**
load all the images and sounds
*/
function preload() {
  for(let i = 0; i < NUM_RAMBUTAN_IMAGES; i++) {
    let rambutanImage = loadImage(`assets/images/rambutan${i}.png`);
    rambutanImages.push(rambutanImage);
  }

  hedgehogImage = loadImage(`assets/images/hedgehog.png`);

  swirlSound = loadSound(`assets/sounds/swirlSound.wav`);
  gameMusic = loadSound(`assets/sounds/gameMusic.mp3`);


}


/**
create hedgehogs and rambutan
*/
function setup() {
  createCanvas(windowWidth,windowHeight);


  // create the rambutanImages
  for (let i = 0; i < NUM_RAMBUTANS; i++) {
    let x = random(0,width);
    let y = random(0, height);
    let rambutanImage = random(rambutanImages);
    let rambutan = new Rambutan(x,y, rambutanImage);
    rambutans.push(rambutan);
  }

  let x = random(0,width);
  let y = random(0,height);
  hedgehog = new Hedgehog(x,y, hedgehogImage);

  gameMusic.setVolume(0.2);
  gameMusic.play();
  gameMusic.loop();

 }




/**
Description of draw()
*/
function draw() {
  background(255, 255, 255);
  if(state === `title`) {
    title();
  }
  else if (state === `simulation`) {
    simulation();
  }
  else if (state === `end`) {
    end();
  }


}

function mousePressed() {
  hedgehog.mousePressed();
}


function title() {
  push();
  textAlign(CENTER,CENTER);
  textSize(50);
  text(`FIND THE HEDGEHOG`, width / 2, height / 2);
  text(`Press any key to start`, width / 2, height / 2 + 50);
  pop();

}

function simulation() {
  for(let i = 0; i < rambutans.length; i++) {
    rambutans[i].update();

  }

  hedgehog.update();


  if (hedgehog.found) {
    state = `end`
  }
}


function keyPressed() {
  if (state === `title`) {
    state = `simulation`;
  }
}


function end() {
  textAlign(CENTER,CENTER);
  textSize(50);
  text(`WOOHOO, you found the hedgehog`, width / 2, height / 2);
  hedgehog.update();
}
