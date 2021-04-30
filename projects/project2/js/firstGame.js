// File for the first game (Door game where they have to remember the sequence backwards to go through the doors)

// instructions
let instructionsFirstGame = `You have to click the doors the right amount of times from the first to the third door in order. Remember this sequence carefully but backwards. Two.Three.One`;
let beginSecondGame = `Second game beings now. Backwards game.`;

// images for first beginGame
let phoneInstruction;
let doorLevelOne;

// counters
let timerFirstGame = 40;
let counterFirstDoor = 0;
let counterSecondDoor = 0;
let counterThirdDoor = 0;
let totalDoorCounter = counterFirstDoor + counterSecondDoor + counterThirdDoor;

function firstGame() {
  //display timer on screen
  push();
  textSize(20);
  textAlign(CENTER);
  fill(255, 255, 255);
  text("Time: " + timerFirstGame, width / 2, height / 2 - 200);

  countdownFirstGame();
  checkDoorCounter();

  // image of phone and the doors
  image(phoneInstruction, 0, 0, 700, 500);
  image(doorLevelOne, 0, 0, 700, 500);

  pop();
}

// timer goes down
function countdownFirstGame() {
  if (frameCount % 60 == 0 && timerFirstGame > 0) {
    timerFirstGame--;
  }
  if (timerFirstGame == 0) {
    state = `death`;
  }
}

// check if user pressed the doors the right amount of times in order to pass to second game
function checkDoorCounter() {
  if (
    counterFirstDoor == 1 &&
    counterSecondDoor == 4 &&
    counterThirdDoor == 2
  ) {
    state = `secondGame`;
    responsiveVoice.speak(beginSecondGame, "UK English Female", { rate: 1 });
  }
}
