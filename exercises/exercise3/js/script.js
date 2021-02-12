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
  password: `**REDACTED**`,
  favoriteFood: `**REDACTED**`,
  favoriteSport: `**REDACTED**`
}

let instrumentData = undefined;
let objectData = undefined;
let tarotData = undefined;
let foodData = undefined;
let sportData = undefined;


/**
Description of preload
*/
function preload() {
  instrumentData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/music/instruments.json`);
  objectData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/objects/objects.json`);
  tarotData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/divination/tarot_interpretations.json`);
  foodData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/foods/menuItems.json`);
  sportData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/sports/sports.json`);
}


/**
Description of setup
*/
function setup() {
  createCanvas(windowWidth,windowHeight);

  let data = JSON.parse(localStorage.getItem(`spy-profile-data`));
  if (data !== null) {


    // asking user for user and password
    let username = prompt(`Agent! What is your username?!`);
    let password = prompt(`Agent! What is your password?!`);

    if(username === data.name && password === data.password) {
      spyProfile.name = data.name;
      spyProfile.alias = data.alias;
      spyProfile.secretWeapon = data.secretWeapon;
      spyProfile.password = data.password;
      spyProfile.favoriteFood = data.favoriteFood;
      spyProfile.favoriteSport = data.favoriteSport;
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
  spyProfile.favoriteFood = random(foodData.menuItems);
  spyProfile.favoriteSport = random(sportData.sports);

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
  Password: ${spyProfile.password}
  Favorite food: ${spyProfile.favoriteFood}
  Favorite sport: ${spyProfile.favoriteSport}`;

  push();
  textFont(`Courier, monospace`);
  textSize(24);
  textAlign(LEFT,TOP);
  fill(0);
  text(profile, 100, 100);
  text(`Delete your profile by pressing c and refresh the page`,100,500);


  pop();



}


// remove item by pressing a button
function keyPressed() {
  if(key === `c`) {
    localStorage.removeItem(`spy-profile-data`);
  }
}
