// json data
let randomWords;


let input;

let finalInput;



function secondGame() {
  push();
  textSize(20);
  textAlign(CENTER);
  fill(255, 255, 255);
  text(word1, width / 2, height / 2);
  image(phoneInstruction, 0, 0, 700, 500);

  checkInput();

  pop();
}


// took from Pippin's Slamina exercise
/**
Reverses the provided string
*/
function reverseString(word1) {
  // Split the string into an array of characters
  let characters = word1.split('');
  // Reverse the array of characters
  let reverseCharacters = characters.reverse();
  // Join the array of characters back into a string
  let result = reverseCharacters.join('');
  // Return the result
  return result;
}

function checkInput() {
  finalInput = input.value();
  if (finalInput === word1) {
    state = `death`;
  }
}
