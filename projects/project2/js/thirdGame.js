// Third Game: Speed Game

let counter = 0;

// timerThirdGame
let timerThirdGame = 20;

// instructions
let instructionsThirdGame = `Find a book and show it to the camera before the timer runs out`;

// User's webcam
let video;
// The name of our model
let modelName = `CocoSsd`;
// ObjectDetector object (using the name of the model for clarify)
let cocossd;
// The current set of predictions made by CocoSsd once it's running
let predictions = [];

/**
Called when CocoSsd has detected at least one object in the video feed
*/
function gotResults(err, results) {
  // If there's an error, report it
  if (err) {
    console.error(err);
  }
  // Otherwise, save the results into our predictions array
  else {
    predictions = results;
  }
  // Ask CocoSsd to detect objects again so it's continuous
  cocossd.detect(video, gotResults);
}

/**
Displays a simple loading screen with the loading model's name
*/
function loading() {
  background(0);

  push();
  textSize(32);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  fill(255,255,255);
  text(`Loading ${modelName}...`, width / 2, height / 2);
  pop();
}

/**
Displays the webcam.
If there are currently objects detected it outlines them and labels them
with the name and confidence value.
*/
function thirdGame() {
  // Display the webcam
  image(video, 100, 100, 550, 350);

  // Check if there currently predictions to display
  if (predictions) {
    // If so run through the array of predictions
    for (let i = 0; i < predictions.length; i++) {
      // Get the object predicted
      let object = predictions[i];
      if (object.label === `book`) {
        state = `win`;
      }

      // Highlight it on the canvas
      highlightObject(object);
    }
  }

  console.log(counter);

  // display instructions
  image(phoneInstruction, 0, 0, 700, 500);

}

/**
Provided with a detected object it draws a box around it and includes its
label and confidence value
*/
function highlightObject(object) {
  // Display a box around it
  push();
  noFill();
  stroke(255, 255, 0);
  rect(object.x, object.y, object.width, object.height);
  pop();
  // Display the label and confidence in the center of the box
  push();
  textSize(18);
  fill(255, 255, 0);
  textAlign(CENTER, CENTER);
  text(`${object.label}, ${object.confidence.toFixed(2)}`, object.x + object.width / 2, object.y + object.height / 2);
  pop();
}

// countdown
function countdownThirdGame() {
  if (frameCount % 60 == 0 && timerThirdGame > 0) {
    timerThirdGame--;
  }
  if (timeThirdGame == 0) {
    state = `death`;
  }
}
