/**
Alice in Borderlands
Kathy Nguyen

This
*/

// voice instructions
let beginGame = `Welcome to the game... First game begins now`;

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
  doorLevelOne = loadImage(`assets/images/doorLevelOne.png`);
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

function death() {
  background(255, 0, 0);
}

function mousePressed() {
  // when player press the phone game master gives instructions or talks.
  if (state === `start`) {
    let pBtn = dist(mouseX, mouseY, startButton.x, startButton.y);
    if (pBtn < startButton.size / 2) {
      responsiveVoice.speak(beginGame, "Japanese Female", { rate: 1 });
      state = `firstGame`;
    }
  }

  // instructions for the first game (phone instructions) when mouse pressed
  if (state === `firstGame`) {
    if (mouseX > 40 && mouseX < 85) {
      if (mouseY > 22 && mouseY < 129) {
        responsiveVoice.speak(instructionsFirstGame, "UK English Female", {
          rate: 0.9,
      });
      }
    }
  }

    // first door mouse press
    if (mouseX > 40 && mouseX < 200) {
      if (mouseY > 181 && mouseY < 500) {
        counterFirstDoor++;
        console.log("first door:" + counterFirstDoor);
        if(counterFirstDoor > 1 || counterFirstDoor < 0) {
          state = `death`;
        }
      }
    }

    // second door mouse pressed
    if (mouseX > 270 && mouseX < 483) {
      if (mouseY > 181 && mouseY < 500) {
        counterSecondDoor++;
        console.log("second door:" + counterSecondDoor);
        if(counterSecondDoor > 4 || counterSecondDoor < 0) {
          state = `death`;
        }
      }
    }

    // third door mouse pressed
    if (mouseX > 500 && mouseX < 620) {
      if (mouseY > 181 && mouseY < 500) {
        counterThirdDoor++;
        console.log("3 door:" + counterThirdDoor);
        if(counterThirdDoor > 2 || counterThirdDoor < 0) {
          state = `death`;
        }

      }
    }

}
