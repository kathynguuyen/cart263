// json data
let randomWords;


// input field
let input, finalInput;

// reveres word variables
let result, reverseWord;

// timer
let timerSecondGame = 30;

// instructionsSecondGame
let instructionsSecondGame = `Listen carefully. Write this word backwards. `;
let beginThirdGame = `Final game.`;

function secondGame() {
  push();
  textSize(20);
  textAlign(CENTER);
  fill(255, 255, 255);

  image(phoneInstruction, 0, 0, 700, 500);

  reverseWord = reverseString(word1);
  console.log(reverseWord)
  checkInput();
  countdownSecondGame();

  textSize(50);
  textAlign(CENTER);
  fill(255, 255, 255);
  text("Time: " + timerSecondGame, width / 2, height / 2);


  pop();
}


// took from Pippin's Slamina exercise
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

function checkInput() {
  finalInput = input.value();
  if (finalInput === reverseWord) {
    state = `thirdGame`;
    responsiveVoice.speak(beginThirdGame, "UK English Female", { rate: 1 });
  }
}

function countdownSecondGame() {
  if (frameCount % 60 == 0 && timerSecondGame > 0) {
    timerSecondGame--;
  }
  if (timerSecondGame == 0) {
    state = `death`;
  }
}
