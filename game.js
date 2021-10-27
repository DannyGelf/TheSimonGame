let buttonColors = ["red", "blue", "green", "yellow"];
let userClickedPattern = [];
let gamePattern = [];
let level = 0;
let gameOn = false;
let firstGame = true;

function nextSequence() {
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];
  playSound(randomChosenColor);
  gamePattern.push(randomChosenColor);
  console.log("Game Patterm " + gamePattern);
  $("#" + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  level++;
  $("#level-title").text("Level " + level);
  userClickedPattern = [];
}

$(document).keypress(function (event) {
  if (event.key === "a" && level === 0 && firstGame) {
    game = true;
    nextSequence();
    $("#level-title").text("Level " + level);
    console.log(this.key);
  }
});

$(".btn").click(function (event) {
  if (level > 0 && game) {
    let userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    console.log("User Pattern " + userClickedPattern);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
  }
});

function playSound(name) {
  let audioName = "sounds/" + name + ".mp3";
  let audio = new Audio(audioName);
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function animateGameOver() {
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 300);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    playSound("wrong");
    animateGameOver();
    $("h1").text("Game Over, Press Any Key to Restart");
    gameOn = false
    startOver();
  }

  function startOver() {
  
    $(document).keypress(function (event) {
      if (gameOn === false) {
      userClickedPattern = [];
      gamePattern = [];
      level = 0;
      firstGame = false;
      nextSequence();
      gameOn = true
      $("#level-title").text("Level " + level);
     }
    });
    
 
  }
}
