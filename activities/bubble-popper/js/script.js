"use strict";

/**
Kathy Nguyen

Activity 4 : Bubble Popper
*/

// user's webcam
let video = undefined;

let predictions = [];

/**
Description of preload
*/
function preload() {

}


/**
Description of setup
*/
function setup() {

  createCanvas(640,480);

  // access user's webcam
  video = createCapture(VIDEO);
  video.hide();

  // load the handpose model
  handpose = ml5.handpose(video, {
    flipHorizontal: true
  },   function() {
      console.log(`Model loaded.`);
    });

    // listen for predictions
    handpose.on(`predict`, function (results) {
      console.log(results);
      predictions = results;
    });
}


/**
Description of draw()
*/
function draw() {
  background(0);

  if (predictions.length > 0) {
    let hand = predictions[0];
    let index = hand.annotations.indexFinger;
  }
}
