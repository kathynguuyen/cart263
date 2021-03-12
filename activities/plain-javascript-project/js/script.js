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

let line1 = random(fiveSyllableLines);
let line2 = random(sevenSyllableLines);
let line3 = random(fiveSyllableLines);

console.log(line1);
console.log(line2);
console.log(line3);

function random(array) {
  let index = Math.floor(Math.random() * array.length);
  return array[index];
}
