// json data
let randomWords;


// input field
let input, finalInput;

// reveres word variables
let result, reverseWord;

function secondGame() {
  push();
  textSize(20);
  textAlign(CENTER);
  fill(255, 255, 255);

  image(phoneInstruction, 0, 0, 700, 500);

  reverseWord = reverseString(word1);
  console.log(reverseWord)
  checkInput();

  text(word1, width / 2, height / 2);

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
  }
}
