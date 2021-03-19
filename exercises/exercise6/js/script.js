"use strict";

var audio = new Audio('assets/sounds/beep.mp3');

$(`.top-secret`).on(`click`, redact);
setInterval(revelation, 500);


  function redact(event){
    $(this).removeClass(`revealed`);
    $(this).addClass(`redacted`);
    audio.play();
  }

  function revelation() {
    $(`.redacted`).each(attemptReveal);
  }

  function attemptReveal() {
    let r = Math.random();
    if (r < 0.1) {
      $(this).removeClass(`redacted`);
      $(this).addClass(`revealed`);
    }
  }
