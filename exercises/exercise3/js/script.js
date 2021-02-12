"use strict";

/**
Spy Profile Generator
Kathy Nguyen

Generates a randomized spy profile for the user, and password protects it
*/



let spyProfile = {
  name: `**REDACTED**`,
  alias: `**REDACTED**`,
  secretWeapon: `**REDACTED**`,
  password: `**REDACTED**`
}

let instrumentData = undefined;
let objectData = undefined;
let tarotData = undefined;


/**
Description of preload
*/
function preload() {
  instrumentData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/music/instruments.json`);
  objectData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/objects/objects.json`);
  tarotData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/divination/tarot_interpretations.json`);
}


/**
Description of setup
*/
function setup() {
  createCanvas(windowWidth,windowHeight);

  let data = JSON.parse(localStorage.getItem(`spy-profile-data`));
  if (data !== null) {

    let password = prompt(`Agent! What is your password?!`);
    if(password === data.password) {
      spyProfile.name = data.name;
      spyProfile.alias = data.alias;
      spyProfile.secretWeapon = data.secretWeapon;
      spyProfile.password = data.password;
    }

  } else {
    generateProfile();
  }
}


function generateProfile() {
  spyProfile.name = prompt(`Agent! What is your name?`);
  let instrument = random(instrumentData.instruments);
  spyProfile.alias = `The ${instrument}`;
  spyProfile.secretWeapon = random(objectData.objects);
  let card = random(tarotData.tarot_interpretations);
  spyProfile.password = random(card.keywords);

  localStorage.setItem(`spy-profile-data`,JSON.stringify(spyProfile));
}


/**
Description of draw()
*/
function draw() {
  background(255);

  let profile = `** SPY PROFILE! DO NOT DISTRIBUTE! **

  Name: ${spyProfile.name}
  Alias: ${spyProfile.alias}
  Secret Weapon: ${spyProfile.secretWeapon}
  Password: ${spyProfile.password}`;

  push();
  textFont(`Courier, monospace`);
  textSize(24);
  textAlign(LEFT,TOP);
  fill(0);
  text(profile, 100, 100);
  text(`Delete your profile by pressing c`,100,500);


  pop();



}



function keyPressed() {
  if(key === `c`) {
    localStorage.removeItem(`spy-profile-data`);
  }
}
