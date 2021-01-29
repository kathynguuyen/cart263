"use strict";

/**
Where's sausage dog
Activity 1 - Kathy Nguyen
*/

const NUM_rambutan_IMAGES = 10;
const NUM_rambutanS = 100;

let rambutanImages = [];
let rambutans = [];

let sausageDogImage = undefined;
let sausageDog;

/**
Description of preload
*/
function preload() {
  for(let i = 0; i < NUM_rambutan_IMAGES; i++) {
    let rambutanImage = loadImage(`assets/images/rambutan${i}.png`);
    rambutanImages.push(rambutanImage);
  }

  sausageDogImage = loadImage(`assets/images/sausage-dog.png`);
}


/**
Description of setup
*/
function setup() {
  createCanvas(windowWidth,windowHeight);

  // create the rambutanImages
  for (let i = 0; i < NUM_rambutanS; i++) {
    let x = random(0,width);
    let y = random(0, height);
    let rambutanImage = random(rambutanImages);
    let rambutan = new rambutan(x,y, rambutanImage);
    rambutans.push(rambutan);
  }

  let x = random(0,width);
  let y = random(0,height);
  sausageDog = new SausageDog(x,y, sausageDogImage);
 }




/**
Description of draw()
*/
function draw() {
  background(255,255,0);

  for(let i = 0; i < rambutans.length; i++) {
    rambutans[i].update();

  }

  sausageDog.update();
}

function mousePressed() {
  sausageDog.mousePressed();
}
