let instructionsFirstGame = `You. have. to click ... the doors the. right. amount of time ... from the first. to the third doors. Remember this sequence carefully but... backwards. Two.Three.One`;

// images for first beginGame
let phoneInstruction;
let doorLevelOne;

// timer to 10 seconds
let countdown = 500;


function firstGame() {


  //display timer on screen
  push();
  textSize(20);
  textAlign(CENTER);
  fill(255, 255, 255);
  text("Timer: " + countdown, width / 2, height / 2 - 200);

  countdownTime();

  // display images of the game
  image(phoneInstruction,0,0,700,500);
  image(doorLevelOne,0,0,700,500);
  pop();
}


// timer goes down
function countdownTime() {
  if(frameCount % 60 == 0 && countdown > 0) {
    countdown--;
  }
  if (countdown == 0) {
    state = `death`;
  }
}
