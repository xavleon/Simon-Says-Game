var btnColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
function nextSequence() {
  userClickedPattern = [];
  var randNum = Math.floor(Math.random() * 4);
  var randomChosenColor = btnColors[randNum];
  gamePattern.push(randomChosenColor);
  level++;
  $("h1").text("level " + level);

  $("#" + randomChosenColor)
    .fadeOut()
    .fadeIn();
  playSound(randomChosenColor);
}

$(".btn").on("click", function () {
  var userChosenColor = $(this).attr("id");
  //console.log($(this).attr("id"));
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1); // this gives yo a NUMBER which is used to corss check the element on NUMBER index
  //console.log(
  //  "this is user clicked pattern in the click funtion = " + userClickedPattern
  //);
});

function playSound(variable) {
  //variable is a blank placeholder that is called in this function
  //any argument that gets passed will be put in that placeholder

  var audio = new Audio("sounds/" + variable + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  var currentColor = $("#" + currentColor);
  currentColor.addClass("pressed");
  setTimeout(function () {
    currentColor.removeClass("pressed");
  }, 100);
}

// $(document).keypress(function() {
//   if (!started) {
//     $("#level-title").text("Level " + level);
//     nextSequence();
//     started = true;
//   }
$(document).on("keypress", function (event) {
  // this function detects keypress and calls next sequence if keypress is true.
  if (event.type == "keypress") {
    nextSequence();
  }
});
function checkAnswer(currentLevel) {
  //var currentLevel ;
  //console.log("this is current level = " + currentLevel);
  //console.log(
  //"this is user click pattern in the check answer function= " +
  //userClickedPattern
  //);
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    wrongAnswer();
    startOver();
  }
}

function wrongAnswer() {
  console.log("Wrong");
  $("h1").html("GAME-OVER <br> <br> Press any key to restart");
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 1000);
  playSound("wrong");
}

function startOver() {
  level = 0;
  gamePattern = [];
}

// for (var i = 0; i < btnColors.length; i++) {
//   console.log(btnColors[i]);
//   $("#" + btnColors[i])
//     .fadeOut()
//     .fadeIn();
// }
