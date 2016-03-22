// Site scripts
var time = 25; // minutes

var d = new Date();
var n = d.getTime();
var startTime = d;
var time = 10;
var pomodoros = 0;


// globals
intervalId = undefined;

element = document.getElementById("timer");
element.addEventListener("dblclick", startTimer);

reset();
updatePomodoro();

function startTimer() {
    if (intervalId == undefined) {
        reset();
        intervalId = setInterval(countdown, 1000, minutesSet,secondsSet,element);
    }
}


function reset() {
    d = new Date();
    startTime = d.getTime();    
    minutesSet = 25;
    secondsSet = 0;
    element.innerHTML = getCountdownText(minutesSet, secondsSet);    
}

function twodigits(n) {
    return n > 9 ? "" + n: "0" + n;
}


function getCountdownText(minutesRemaining, secondsRemaining) {
    return twodigits(minutesRemaining) + ":" + twodigits(secondsRemaining);
}

function countdown(minutesSet, secondsSet, element) {
    var d = new Date();
    var currentTime = d.getTime();
    
    // get passed seconds    
    totalSecondsPassed = Math.round((currentTime-startTime) / 1000);


    // minutes
    minutesPassed = Math.floor(totalSecondsPassed / 60);
    minutesRemaining = minutesSet - minutesPassed;
    
    // seconds
    secondsPassed  = totalSecondsPassed % 60;    
    
    secondsRemaining = secondsSet - secondsPassed;
    if (minutesRemaining > 0 && secondsRemaining < 0 ) {
        secondsRemaining += 60;
        minutesRemaining--;
    }
    console.log(totalSecondsPassed + "ts/" + minutesPassed + "mp/" + secondsPassed + "sp/" + minutesRemaining + "mr/" + secondsRemaining + "sr");

    
    text = getCountdownText(minutesRemaining, secondsRemaining);
    element.innerHTML = text;
    
    if (minutesRemaining <=0 <= secondsRemaining <= 0) { 
        clearInterval(intervalId);
        intervalId = undefined;
        var audio = new Audio('sound/ding.mp3');
        audio.play();        
        pomodoros++;
        updatePomodoro();a
	reset();
    }        
}

function updatePomodoro() {    
    var pomodorosDiv = document.getElementById("pomodoros");
    var pomodorosStr = "";        
    pomodorosStr = "<img class='img' src='img/pomodoro.png'/>" + " " + pomodoros;
    pomodorosDiv.innerHTML = pomodorosStr;
}
