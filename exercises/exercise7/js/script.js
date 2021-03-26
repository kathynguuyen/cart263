var audioElement = new Audio('assets/sounds/win.wav');

"use strict";



$(`#solved-dialog`).dialog({
  autoOpen: false,
  buttons: {
    "I know.": function() {
      $(this).dialog(`close`);
    }
  }
});


$(`#instructions-dialog`).dialog({
  autoOpen: true,
  modal: true,
});


$(`.secret`).one(`mouseover`, function(event) {
  $(this).addClass(`found`,500);
  $(this).draggable({
    helper: `clone`
  });
});




$(`#answer`).droppable({
  drop: function(event, ui){
    let letter = ui.draggable.text();
    $(this).append(letter);
    ui.draggable.draggable(`disable`);
    ui.draggable.removeClass(`found`);
    // check if user gets the answer
    if($(this).text() === `Today`) {
      audioElement.play();
      $(`#solved-dialog`).dialog(`open`);
    }
  }
});
