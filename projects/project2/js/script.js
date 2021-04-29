/**
Alice in Borderlands
Kathy Nguyen

Game inspired by Alice in Borderlands.
Escape room type of game.
*/

"use strict";

// voice instructions
let beginGame = `Welcome to the game... First game begins now. Door game.`;

// states
let state = `loading`;

let startButton = {
  x: 350,
  y: 400,
  size: 55,
};

// fonts
let titleFont;
let paragraphFont;

// sounds
let BGM;
let phoneSFX;

// random word chosen from the JSON data file
let word1;


/**
Description of preload
Load fonts, pictures and sounds
*/
function preload() {
  // load sounds
  BGM = loadSound(`assets/sounds/BGM.mp3`);
  phoneSFX = loadSound(`assets/sounds/phoneSound.wav`);

  // load fonts
  titleFont = loadFont(`assets/fonts/FjallaOne-Regular.ttf`);
  paragraphFont = loadFont(`assets/fonts/VarelaRound-Regular.ttf`);

  // load images
  phoneInstruction = loadImage(`assets/images/phoneInstructions.png`);
  doorLevelOne = loadImage(`assets/images/doorLevelOne.png`);

  // load json file data
  randomWords = loadJSON(
    `https://raw.githubusercontent.com/dariusk/corpora/master/data/objects/objects.json`
  );
}

function setup() {
  createCanvas(700, 500);

  // starts webcam
  video = createCapture(VIDEO);
  video.hide();

  // Start the CocoSsd model and when it's ready start detection
  // and switch to the running state
  cocossd = ml5.objectDetector('cocossd', {}, function() {
    // Ask CocoSsd to start detecting objects, calls gotResults
    // if it finds something
    cocossd.detect(video, gotResults);
    // Switch to the running state
    state = `thirdGame`;
  });

  // input box for second game
  input = createInput();
  input.position(610, 185);

  // randomize a word in the JSON file array
  word1 = random(randomWords.objects);

  // play background music
  BGM.play();
  BGM.loop();
  BGM.setVolume(0.05);
}

function draw() {
  background(0);

  if (state === `loading`) {
    loading();
  }

  if (state === `start`) {
    start();
  }

  if (state === `firstGame`) {
    firstGame();
  }

  if (state === `secondGame`) {
    secondGame();
  }

  if (state === `thirdGame`) {
    thirdGame();
  }

  if (state === `death`) {
    death();
  }

  if (state === `win`) {
    win();
  }

}

// start page of the game ------------------------------------------
function start() {
  // display of the start screen
  push();
  textFont(titleFont);
  textAlign(CENTER, CENTER);
  textSize(50);
  fill(139, 0, 0);
  text(`ALICE IN BORDERLANDS`, width / 2, height / 2 - 150);
  textFont(paragraphFont);
  textAlign(CENTER, CENTER);
  textSize(30);
  fill(255, 255, 255);
  text(`Press this button to start`, width / 2, height / 2);
  pop();

  // display startButton
  fill(139, 0, 0);
  ellipse(startButton.x, startButton.y, startButton.size);
}


// death state when user runs out of time or makes a mistake --------------------------------------------
function death() {
  push();
  background(255, 0, 0);
  textFont(paragraphFont);
  textAlign(CENTER, CENTER);
  textSize(30);
  fill(255, 255, 255);
  text(`You are dead.`, width / 2, height / 2);
  pop();
}

// when user finishes all the levels -------------------------------------------------------
function win() {
  push();
  background(255, 255, 255);
  textFont(paragraphFont);
  textAlign(CENTER, CENTER);
  textSize(30);
  fill(0, 0, 0);
  text(`You have escaped. Good job!`, width / 2, height / 2);
  pop();
}



// function when player press their mouse ----------------------------------------
function mousePressed() {
  // when player press the phone game master gives instructions or talks. -----------------------------------------------------
  if (state === `start`) {
    let pBtn = dist(mouseX, mouseY, startButton.x, startButton.y);
    if (pBtn < startButton.size / 2) {
      responsiveVoice.speak(beginGame, "UK English Female", { rate: 1 });
      state = `firstGame`;
    }
  }

  // instructions for the first game (phone instructions) when mouse pressed -----------------------------------------------
  if (state === `firstGame`) {
    if (mouseX > 40 && mouseX < 85) {
      if (mouseY > 22 && mouseY < 129) {
        phoneSFX.play();
        responsiveVoice.speak(instructionsFirstGame, "UK English Female", {
          rate: 0.9,
        });
      }
    }
    // first door mouse press
    if (mouseX > 40 && mouseX < 200) {
      if (mouseY > 181 && mouseY < 500) {
        counterFirstDoor++;
        console.log("first door:" + counterFirstDoor);
        if (counterFirstDoor > 1 || counterFirstDoor < 0) {
          state = `death`;
        }
      }
    }

    // second door mouse pressed
    if (mouseX > 270 && mouseX < 483) {
      if (mouseY > 181 && mouseY < 500) {
        counterSecondDoor++;
        console.log("second door:" + counterSecondDoor);
        if (counterSecondDoor > 4 || counterSecondDoor < 0) {
          state = `death`;
        }
      }
    }

    // third door mouse pressed
    if (mouseX > 500 && mouseX < 620) {
      if (mouseY > 181 && mouseY < 500) {
        counterThirdDoor++;
        console.log("3 door:" + counterThirdDoor);
        if (counterThirdDoor > 2 || counterThirdDoor < 0) {
          state = `death`;
        }
      }
    }
  }

  // instructions for the second game (phone instructions) when mouse pressed -----------------------------------------------
  if (state === `secondGame`) {
    if (mouseX > 40 && mouseX < 85) {
      if (mouseY > 22 && mouseY < 129) {
        phoneSFX.play();
        responsiveVoice.speak(instructionsSecondGame + word1, "UK English Female", {
          rate: 0.9,
        });
      }
    }
}
    // instructions for the third game (phone instructions) when mouse pressed -----------------------------------------------
    if (state === `thirdGame`) {
      if (mouseX > 40 && mouseX < 85) {
        if (mouseY > 22 && mouseY < 129) {
          phoneSFX.play();
          responsiveVoice.speak(instructionsThirdGame, "UK English Female", {
            rate: 0.9,
          });
        }
      }
    }
}
