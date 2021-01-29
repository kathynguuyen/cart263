"use strict";

/**
Where's sausage dog
Activity 1 - Kathy Nguyen
*/

const NUM_ANIMAL_IMAGES = 2;
const NUM_ANIMALS = 100;

let animalImages = [];
let animals = [];

let hedgehogImage;
let hedgehog;

/**
Description of preload
*/
function preload() {
  for(let i = 0; i < NUM_ANIMAL_IMAGES; i++) {
    let animalImage = loadImage(`assets/images/rambutan${i}.png`);
    animalImages.push(animalImage);
  }

  hedgehogImage = loadImage(`assets/images/hedgehog.png`);
}


/**
Description of setup
*/
function setup() {
  createCanvas(windowWidth,windowHeight);

  // create the animalImages
  for (let i = 0; i < NUM_ANIMALS; i++) {
    let x = random(0,width);
    let y = random(0, height);
    let animalImage = random(animalImages);
    let animal = new Animal(x,y, animalImage);
    animals.push(animal);
  }

  let x = random(0,width);
  let y = random(0,height);
  hedgehog = new Hedgehog(x,y, hedgehogImage);
 }




/**
Description of draw()
*/
function draw() {


  for(let i = 0; i < animals.length; i++) {
    animals[i].update();

  }

  hedgehog.update();
}

function mousePressed() {
  hedgehog.mousePressed();
}
