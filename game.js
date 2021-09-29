var istriggered = true;
var colors = ["red", "yellow", "blue", "green"];
var gamePattern = [];
var userPattern = [];
var selectedButton;
var level = 1;

$(".button").click(function() {
  $("h1").text("Game has been Started");
  $(".button").fadeOut(100);
  while (istriggered) {
    istriggered = false;
    gameSequence();
    gameStarted();
  }
})

function gameSequence() {

  $("h1").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var lastindexcolor = colors[randomNumber];
  gamePattern.push(lastindexcolor);
  selectedButton = $("#" + lastindexcolor);

  var gameButtonSound = new Audio(lastindexcolor + ".mp3");
  gameButtonSound.play();

  selectedButton.addClass("pressed");
  setTimeout(function() {
    selectedButton.removeClass("pressed");
  }, 100);

}

function gameStarted() {

  $("div .btn").click(function() {

    var userSelectedbutton = $(this).attr("id");
    userPattern.push(userSelectedbutton);

    var userButtonSound = new Audio(userSelectedbutton + ".mp3");
    userButtonSound.play();

    compareSequences(userPattern.length - 1);

    selectedButton = $("#" + userSelectedbutton);

    selectedButton.addClass("pressed");
    setTimeout(function() {
      selectedButton.removeClass("pressed");
    }, 100);
  })
}



function compareSequences(Pattern) {
  if (userPattern[Pattern] === gamePattern[Pattern]) {
    if (userPattern.length === gamePattern.length) {
       level++;
      if(level < 15)
      {
        setTimeout(function() {
          gameSequence();
          userPattern = [];
        }, 1000);
      }
      else if(level === 15){
      $("h1").text("You Won");
      }
    }
  } else {
    $("h1").text("Game Over , Refresh to Start");
    $("body").addClass("game-over");
    var wrongSound = new Audio("wrong.mp3");
    wrongSound.play();
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 100);
    startAgain();
  }
}

function startAgain() {
  level = 1;
  istriggered = false;
  gamePattern = [];

}
