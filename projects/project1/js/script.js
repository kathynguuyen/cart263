"use strict";

/**
Kathy Nguyen

Project 01: Inspired by the korean movie Space Sweepers.
*/

// agent profile (login and password)
let agentProfile = {
  name: `**REDACTED**`,
  password: `**REDACTED**`,
}

let gameData = {
  highScore = 0
}

// user's webcam
let video = undefined;

// handpose model
let handpose = undefined;

// current set of predictions
let predictions = [];

// counter how many user pops
let counter = 0;

// the rock
let rock = undefined;

// rocket (obstacle)
let rocket = undefined;

let rockSFX;

let state = `loading`;

// fonts
let titleFont;
let paragraphFont;

// images
let rocketImg;
let backgroundImg;
let rockImg;



/**
Description of preload
Load fonts, pictures and sounds
*/
function preload() {

  // load sounds
  rockSFX = loadSound(`assets/sounds/popSound.mp3`);

  // load fonts
  titleFont = loadFont(`assets/fonts/Awakenning.ttf`);
  paragraphFont = loadFont(`assets/fonts/Petrichor.ttf`);


  // load images
  rocketImg = loadImage("assets/images/rocket.png");
  backgroundImg = loadImage("assets/images/background.png");
  rockImg = loadImage("assets/images/rock.png");
}


/**
Description of setup
*/
function setup() {


  createCanvas(640,480);
  // access user's webcam
  video = createCapture(VIDEO);
  video.hide();


  let data = JSON.parse(localStorage.getItem('space-sweeper-high-score-data'));
  if(data !== null) {
    gameData = data;
  }

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

    // our rock
    rock = {
      x: random(width),
      y: height,
      size: 50,
      vx: 0,
      vy: -2,
      img: rockImg
    };

    // rocket
      rocket = {
        x: random(width),
        y: height,
        size: 50,
        vx: 0,
        vy: -2,
        minSpeed: 3,
        maxSpeed: 5
      }



    // annyang commands
    if(annyang) {
      let commands = {
        'My name is *name': nameInput
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
  } else if (state === `lose`) {
    lose();
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
}


function nameInput(name) {
  if(state === `title`) {

    agentProfile.name = name.toUpperCase();
    console.log(agentProfile.name);
    state = `instructions`;
    generateAgentProfile();

  }
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
  text(`Collect the asteroids with your index finger using your camera!`, width / 2, height / 2);
  text(`Avoid the rockets!`, width / 2, height / 2);
  text(`Press any key to continue`, width / 2, height / 2 + 50);
  pop();
}


function running() {

  push();
  image(backgroundImg, 0, 0, 640, 480);
  fill(255,255,255);
  textSize(30);
  text("High score:" + gameData.highScore, 100,100);
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
    ellipse(baseX, baseY, 50, 50);
    pop();



    // check rock destroy
    let d = dist(tipX, tipY, rock.x, rock.y);


    if (d < rock.size/2) {
      rock.x = random(width);
      rock.y = height;
      counter++;

      if(counter > gameData.highScore) {
        gameData.highScore = counter;
        localStorage.setItem(`space-sweeper-high-score-data`, JSON.stringify(gameData));
      }
      // sound effect when rock pops
      rockSFX.play();
    }

    let d2 = dist(tipX, tipY, rocket.x, rocket.y);
    if (d2 < rocket.size/2) {
      state = `lose`;
    }

  }




  // move the rock
  rock.x += rock.vx;
  rock.y += rock.vy;

  // move the rocket
  rocket.x += rocket.vx;
  rocket.y += rocket.vy;

  if (rock.y < 0) {
    rock.x = random(width);
    rock.y = height;
  }


    if (rocket.y < 0) {
      rocket.x = random(width);
      rocket.y = height;
      rocket.vy = random(rocket.minSpeed, rocket.maxSpeed);
}



  push();
  fill(0,100,200);
  noStroke();
  image(rockImg,rock.x, rock.y, 50,50);
  pop();



  image(rocketImg,rocket.x, rocket.y, 50,50);



}


function keyPressed() {
  if (state === `title`) {
    state = `instructions`;
  } else if (state === `instructions`) {
    state = `running`;
  }
}
