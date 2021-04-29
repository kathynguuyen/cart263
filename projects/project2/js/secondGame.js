// json data
let randomWords;
let currentWord = ``;

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


function checkInput() {
  finalInput = input.value();
  if (finalInput === word1) {
    state = `death`;
  }
}
