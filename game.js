var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).keydown(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
})

$(".btn").click(function() {
    var userChosenColor = $(this).attr("id");
 
    userClickedPattern.push(userChosenColor);
 
    animatePress(userChosenColor);
    playSound(userChosenColor);
 
    checkAnswer(userClickedPattern.length-1);
});

function nextSequence() {
    var randNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randNumber];
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    gamePattern.push(randomChosenColor);

    playSound(randomChosenColor);
    
}

function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence()
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("h1").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");

        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}