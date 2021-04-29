let instructionsFirstGame = `You. have. to click ... the doors the. right. amount of time ... from the first. to the third door. in order. Remember this sequence carefully but... backwards. Two.Three.One`;

// images for first beginGame
let phoneInstruction;
let doorLevelOne;

// counters
let timerFirstGame = 60;
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
  text("Timer: " + timerFirstGame, width / 2, height / 2 - 200);

  countdownFirstGame();
  checkDoorCounter();


  image(phoneInstruction,0,0,700,500);
  image(doorLevelOne,0,0,700,500);
  pop();
}


// timer goes down
function countdownFirstGame() {
  if(frameCount % 60 == 0 && timerFirstGame > 0) {
    timerFirstGame--;
  }
  if (timerFirstGame == 0) {
    state = `death`;
  }
}

function checkDoorCounter() {
  if(counterFirstDoor == 1 && counterSecondDoor == 4 && counterThirdDoor == 2) {
    state = `secondGame`;
  }
}
