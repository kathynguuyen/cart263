"use strict";

/**
Kathy Nguyen

Project 01: Inspired by the korean movie Space Sweepers.
*/

// agent profile (login and password)
let agentProfile = {
  name: `**REDACTED**`,
  password: `**REDACTED**`
}


// user's webcam
let video = undefined;

// handpose model
let handpose = undefined;

// current set of predictions
let predictions = [];

// counter how many user pops
let counter = 0;

// the Bubble
let bubble = undefined;

let bubbleSFX;

let state = `loading`;

// fonts
let titleFont;
let paragraphFont;

let objectData = undefined;

/**
Description of preload
Load fonts, pictures and sounds
*/
function preload() {

  // load sounds
  bubbleSFX = loadSound(`assets/sounds/popSound.mp3`);

  // load fonts
  titleFont = loadFont(`assets/fonts/Awakenning.ttf`);
  paragraphFont = loadFont(`assets/fonts/Petrichor.ttf`);

  // random words for password
  objectData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/objects/objects.json`);
}


/**
Description of setup
*/
function setup() {

  createCanvas(640,480);
  // access user's webcam
  video = createCapture(VIDEO);
  video.hide();


  //store the info somewhere
  let data = JSON.parse(localStorage.getItem(`agent-profile-data`));

  // load the handpose model
  handpose = ml5.handpose(video, {
    flipHorizontal: true
  },   function() {
      console.log(`Model loaded.`);
      state = `title`;
    });

    // listen for predictions
    handpose.on(`predict`, function (results) {
      console.log(results);
      predictions = results;
    });

    // our Bubble
    bubble = {
      x: random(width),
      y: height,
      size: 100,
      vx: 0,
      vy: -2
    };


    // annyang commands
    if(annyang) {
      let commands = {
        'My name is *name': nameInput,
        'Existing user is *name': nameInput
      };
      annyang.addCommands(commands);
      annyang.start();
    }

}


/**
Description of draw()
*/
function draw() {
  background(0);

  if (state === `loading`) {
    loading();
  } else if (state === `title`) {
    title();
  } else if (state === `instructions`) {
    instructions();
  } else if (state === `running`) {
    running();
  }

}


/** function loading ---------------------------------------------------
*/
function loading() {
  push();
  textFont(paragraphFont);
  textSize(30);
  fill(255,255,255);
  textAlign(CENTER,CENTER);
  text(`Space Sweeper Agent Loading...`, width / 2, height / 2);
  pop();
}

/** end of loading  ---------------------------------------------------
*/

/** function title ------------------------------------------------------
*/
function title() {
  push();
  displayTitle();
  helloAgent();
  pop();
}


// display the main title of the game
function displayTitle(){
  textFont(titleFont);
  textAlign(CENTER,CENTER);
  textSize(50);
  fill(255,255,255);
  text(`SPACE SWEEPERS`, width / 2, height / 2 - 150);
}

function helloAgent() {
  textFont(paragraphFont);
  textAlign(CENTER,CENTER);
  textSize(15);
  fill(255,255,255);
  text(`Hello, Space Sweeper Agent! `, width / 2, height / 2 - 40);
  text(`Welcome to your first day at Space Sweeper, please say: 'My name is '______' `, width/ 2, height / 2);
  text(`Else, please say 'Existing user is: '______' `, width/ 2, height / 2 + 30);
}


function nameInput(name) {
  if(state === `title`) {

    agentProfile.name = name.toUpperCase();
    console.log(agentProfile.name);
    state = `instructions`;
    generateAgentProfile();

  }
}


function generateAgentProfile() {
  spyProfile.password = random(objectData.objects);
}

/** end of function title -----------------------------------------------
*/


/** function instructions  ------------------------------------------------------
*/
function instructions() {
  push();
  textFont(paragraphFont);
  textAlign(CENTER,CENTER);
  textSize(15);
  fill(255,255,255);
  text(`Hello, ${agentProfile.name}`, width / 2, height / 2 - 40);
  text(`Pop the asteroids with your index finger using your camera!`, width / 2, height / 2);
  text(`Press any key to continue`, width / 2, height / 2 + 50);
  pop();
}


function running() {

  push();
  fill(255,255,255);
  textSize(30);
  text("score:" + counter, 100,100);
  pop();

  if (predictions.length > 0) {
    let hand = predictions[0];
    let index = hand.annotations.indexFinger;
    let tip = index[3];
    let base = index[0];
    let tipX = tip[0];
    let tipY = tip[1];
    let baseX = base[0];
    let baseY = base[1];

    // pin body
    push();
    noFill();
    stroke(255,255,255);
    strokeWeight(2);
    line(baseX, baseY, tipX, tipY);
    pop();


    // pin head
    push();
    noStroke();
    fill(255,0,0);
    ellipse(baseX, baseY, 20);
    pop();



    // check bubble popping
    let d = dist(tipX, tipY, bubble.x, bubble.y);
    if (d < bubble.size/2) {
      bubble.x = random(width);
      bubble.y = height;
      counter++;
      // sound effect when bubble pops
      bubbleSFX.play();
    }
  }

  // move the Bubble
  bubble.x += bubble.vx;
  bubble.y += bubble.vy;

  if (bubble.y < 0) {
    bubble.x = random(width);
    bubble.y = height;
  }

  push();
  fill(0,100,200);
  noStroke();
  ellipse(bubble.x, bubble.y, bubble.size);
  pop();


}


function keyPressed() {
  if (state === `title`) {
    state = `instructions`;
  } else if (state === `instructions`) {
    state = `running`;
  }
}
