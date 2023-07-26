var gamePattern=[];
var userPattern=[];
var userColor;
var level=0;
var started=false;
var buttonColors=["green","red","yellow","blue"];

//starting the game on one keypress
$(document).on("keypress",function(){
    if(!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started=true;
    }
});

function restart(){
    level=0; 
    started=false;
    gamePattern=[];
}

//function to animate a button when clicked via mouse click
function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){$("#"+currentColor).removeClass("pressed");},100);
}

//function to play sound 
function playSound(name){
    var audio=new Audio("./sounds/"+name+".mp3");
    audio.play();
}

//function to generate next sequence 
function nextSequence(){
    //First the userPattern array needs to be emptied to put the new values that the user types
    userPattern=[];

    $("#level-title").text("Level "+(++level));

    var randomNumber=Math.floor(Math.random()*4);
    var randomColor=buttonColors[randomNumber];
    gamePattern.push(randomColor);
    
    $("#"+randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomColor);
}

//function to check answer
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userPattern[currentLevel]){

        //If the length of gamePattern and userPattern is same and contents are same
        // that means user has successfully cleared the level so time to call the next sequence 
        if(gamePattern.length===userPattern.length){
            setTimeout(function(){nextSequence();},1000);
        }
    }else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){$("body").removeClass("game-over");},200);
        $("#level-title").text("Game Over,Press Any Key to Restart")
        restart();
    }

}

//when a button is clicked
$(".btn").on("click",function(){
    userColor=$(this).attr("id");
    userPattern.push(userColor);

    animatePress(userColor);
    playSound(userColor);

    checkAnswer(userPattern.length-1);
});
