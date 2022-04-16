var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var count = 0;

var started = false;

var level = 0;

function nextSequence() {
    
    count = 0;
    userClickedPattern = [];

    var randomNumber = Math.floor(Math.random() * 4);
    var chosenRandomColour = buttonColours[randomNumber];
    gamePattern.push(chosenRandomColour);
    $("#"+chosenRandomColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    level ++;
    $("#level-title").text("level "+level);
    
    playSound(chosenRandomColour);

}

$(document).keypress(function() {
    
    if (!started) {
        nextSequence();
        started = true;
    }

});

// for mobile users
$(document).click(function() {
    
    if (!started) {
        nextSequence();
        started = true;
    }

});


function playSound(name) {

    var audio = new Audio("sounds/"+ name +".mp3");
    audio.play();
    
}

function animatePress(currentColour) {

    $("#"+currentColour).addClass("pressed");

    setTimeout(function() {

        $("#"+currentColour).removeClass("pressed");
    }, 100);

}

$(".btn").click(function() {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

   if (userClickedPattern.length <= gamePattern.length) {
       if (userClickedPattern[count] === gamePattern[count]) {
     
        animatePress(userChosenColour);
        playSound(userChosenColour);

        count++;

       } else {

           $("#level-title").text("Game Over!");
           $("body").addClass("game-over");
           $("<p>Refresh page to play again.</p>").insertAfter("#level-title");
           $("p").addClass("paragraph");

           var sound = "wrong";
           playSound(sound);

           setTimeout(function() {

               $("body").removeClass("game-over");

           },100);

           gamePattern = [];

       }

   }
   if (userClickedPattern.length === gamePattern.length) {

       setTimeout(function() {
           nextSequence();
       }, 200);
   }
       
});