"use strict";

const animals = [
  "alligator",
  "alpaca",
  "antelope",
  "ape",
  "baboon",
  "bat",
  "bear",
  "beaver",
  "bison",
  "boar",
  "buffalo",
  "bull",
  "camel",
  "canary",
  "capybara",
  "cat",
  "chameleon",
  "cheetah",
  "chimpanzee",
  "chinchilla",
  "chipmunk",
  "cougar",
  "cow",
  "coyote",
  "crocodile",
  "crow",
  "deer",
  "dingo",
  "dog",
  "donkey",
  "elephant",
  "elk",
  "ferret",
  "fish",
  "fox",
  "frog",
  "giraffe",
  "gnu",
  "goat",
  "gopher",
  "gorilla",
  "grizzly bear",
  "hamster",
  "hedgehog",
  "hippopotamus",
  "hog",
  "horse",
  "jaguar",
  "kangaroo",
  "koala",
  "lamb",
  "lemur",
  "leopard",
  "lion",
  "lizard",
  "llama",
  "lynx",
  "mandrill",
  "marmoset",
  "mink",
  "mole",
  "mongoose",
  "monkey",
  "moose",
  "mountain goat",
  "mouse",
  "mule",
  "muskrat",
  "mustang",
  "mynah bird",
  "newt",
  "ocelot",
  "opossum",
  "orangutan",
  "oryx",
  "otter",
  "ox",
  "panda",
  "panther",
  "parakeet",
  "parrot",
  "pig",
  "platypus",
  "polar bear",
  "porcupine",
  "puma",
  "rabbit",
  "raccoon",
  "ram",
  "rat",
  "reindeer",
  "reptile",
  "rhinoceros",
  "salamander",
  "seal",
  "sheep",
  "shrew",
  "silver fox",
  "skunk",
  "sloth",
  "snake",
  "squirrel",
  "tapir",
  "tiger",
  "toad",
  "turtle",
  "walrus",
  "whale",
  "wildcat",
  "wolf",
  "wolverine",
  "woodchuck",
  "zebra"
];

let currentAnimal = ``;
let currentAnswer = ``;
let state = `title`;
let counter = 0;
let correctSFX;
let incorrectSFX;


/**
load all the images and sounds
*/
function preload() {

  correctSFX= loadSound(`assets/sounds/correct.wav`);
  incorrectSFX = loadSound(`assets/sounds/incorrect.wav`);

}

/**
Description of setup
*/
function setup() {

  createCanvas(windowWidth, windowHeight);

  if (annyang) {
    let commands = {
      'I think it is *animal': guessAnimal
    };
    annyang.addCommands(commands);
    annyang.start();

    textSize(32);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
  }
}


/**
Description of draw()
*/
function draw() {

  if(state === `title`) {
  title();
}
else if (state === `game`) {
  game();
}
else if (state === `end`) {
  end();
}

}




/**
Reverses the provided string
*/
function reverseString(string) {
  // Split the string into an array of characters
  let characters = string.split('');
  // Reverse the array of characters
  let reverseCharacters = characters.reverse();
  // Join the array of characters back into a string
  let result = reverseCharacters.join('');
  // Return the result
  return result;
}


function title() {
  push();
  background(219,112,147);
  textAlign(CENTER,CENTER);
  textSize(50);
  fill(255,255,255);
  text(`GUESS THE ANIMAL IN REVERSE`, width / 2, height / 2);
  text(`Press any key to start`, width / 2, height / 2 + 50);
  pop();

}


function end() {
  push();
  background(219,112,147);
  textAlign(CENTER,CENTER);
  textSize(50);
  fill(255,255,255);
  text(`GOOD JOB, YOU WON WOOHOOO`, width / 2, height / 2);
  pop();

}



function game() {
  push();
  background(219,112,147);

  fill(255,255,255);
  textSize(30);
  text(`PRESS YOUR MOUSE AND GUESS THE ANIMAL SAID IN REVERSE, say: "I think it is ______"`, width/2, height/2 - 100);
  text("score:" + counter, width/2 , height / 2 - 200);
  if (currentAnswer === currentAnimal) {
    fill(0,255,0);
  }
  else {
    fill(255,0,0);
  }
  // display the current answer
  text(currentAnswer, width / 2, height / 2);


  pop();
}

function mousePressed() {

  if (state === `game`) {
    currentAnimal = random(animals);
    let reverseAnimal = reverseString(currentAnimal);``
    responsiveVoice.speak(reverseAnimal);
  }

}


function guessAnimal(animal) {
  currentAnswer = animal.toLowerCase();

  if(currentAnswer === currentAnimal) {
    counter++;
    correctSFX.play();
  } else {
    incorrectSFX.play();
  }

  if (counter === 2) {
    state = `end`;
  }

  console.log(currentAnswer);
}



function keyPressed() {
  if (state === `title`) {
    state = `game`;
  }
}
