"use strict";

setInterval(revelation, 500);

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
