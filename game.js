var buttonColours = ["red", "blue", "yellow", "green"];
var gamePattern = [];
var userClickedPattern = [];


var started = false; 
var level = 0;

$(document).keypress(function(){
    
    if(!started ){
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
    }
});


$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    //2.
    checkAnswer(userClickedPattern.length - 1);
});

function nextSequence(){

    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level); 

    var randomNumber = Math.floor(Math.random()*4);

    var randomChosenNumber = buttonColours[randomNumber];

    gamePattern.push(randomChosenNumber);

    var selectedColor = $("#" + randomChosenNumber)

    selectedColor.fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenNumber);

}

function playSound(name){
    var audio = new Audio ("sounds/" + name + ".mp3");
    audio.play();
}
function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100)
}
//1.
function checkAnswer(currentLevel){
    //3.
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("success");
        if(userClickedPattern.length === gamePattern.length){
        setTimeout(function(){
            nextSequence();
        }, 1000)
    }
    }
    else{
        playSound(wrong);
        $("#level-title").text("Game Over, Press Any key to Restart"); 

        console.log("wrong");
        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over")
        }, 200);

        startOver();
    }

}

function startOver(){
    level = 0;
    gamePattern = [];
    started= false;

}




