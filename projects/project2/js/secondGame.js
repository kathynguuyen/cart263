// File for the second game (Backwards game where user have to type in the word they hear backwards as fast as possible)
// Contains JSON library


// json data
let randomWords;


// input field
let input, finalInput;

// reveres word variables
let result, reverseWord;

// timer
let timerSecondGame = 30;

// instructionsSecondGame
let instructionsSecondGame = `Listen carefully. Type this word backwards in the box above. `;
let beginThirdGame = `Final game. Speed game.`;


function secondGame() {

  // picture of phone
  image(phoneInstruction, 0, 0, 700, 500);

  // reverse the word
  reverseWord = reverseString(word1);
  console.log(reverseWord)

  checkInput();
  countdownSecondGame();


  // print the timer in the middle top
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

// check what the user input in the box
function checkInput() {
  finalInput = input.value();
  if (finalInput === reverseWord) { // if they input the correct backwards word they go to level 3
    state = `thirdGame`;
    responsiveVoice.speak(beginThirdGame, "UK English Female", { rate: 1 });
  }
}

// timer for the second game
function countdownSecondGame() {
  if (frameCount % 60 == 0 && timerSecondGame > 0) {
    timerSecondGame--;
  }
  if (timerSecondGame == 0) {
    state = `death`;
  }
}
