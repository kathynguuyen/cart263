/**
Haiku Generator
Kathy Nguyen

Generates a random haiku!
*/

"use strict";

// Code goes here

let fiveSyllableLines = [
  `0, to be a tree`,
  `The cat does not know`,
  `We are all forests`,
  `You have done your best`,
  `They are all gone now`
 ];

let sevenSyllableLines = [
  `Say the things left unsaid`,
  `Never believe the wind's lies`,
  `The autmn stretches its legs`,
  `Nothing can satisfy you`,
  `They will not come back again`
];

let haikuTitle = [
  `chicken`,
  `dragon`,
  `fire`,
  `lobster`,
  `broccoli`
];

let header = random(haikuTitle);
let line1 = random(fiveSyllableLines);
let line2 = random(sevenSyllableLines);
let line3 = random(fiveSyllableLines);

let title = document.getElementById(`title`);
let line1P = document.getElementById(`line-1`);
let line2P = document.getElementById(`line-2`);
let line3P = document.getElementById(`line-3`);

title.innerText = header;
line1P.innerText = line1;
line2P.innerText = line2;
line3P.innerText = line3;


line1P.addEventListener(`click`, lineClicked);
line2P.addEventListener(`click`, lineClicked);
line3P.addEventListener(`click`, lineClicked);
title.addEventListener(`click`, lineClicked);

function changeTitle(event) {
  setNewLine(event.target);
}


function lineClicked(event) {
  fadeOut(event.target, 1);
}

function fadeOut(element, opacity) {
  opacity -= 0.01;
  element.style[`opacity`] = opacity;
  if(opacity > 0) {
    requestAnimationFrame(function() {
      fadeOut(element, opacity);
    });
  }
  else {
    setNewLine(element);
    fadeIn(element, 0);
  }
}


function fadeIn(element, opacity) {
  opacity += 0.01;
  element.style[`opacity`] = opacity;
  if (opacity < 1) {
    requestAnimationFrame(function() {
      fadeIn(element, opacity);
    });
  }
}

function setNewLine(element) {
  if (element === line1P || element === line3P) {
    element.innerText = random(fiveSyllableLines);
  }
  else if (element === line2P) {
    element.innerText = random(sevenSyllableLines);
  }
  else if (element === title) {
    element.innerText = random(haikuTitle);
  }
}


function random(array) {
  let index = Math.floor(Math.random() * array.length);
  return array[index];
}
