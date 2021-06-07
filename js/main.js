/*----- constants -----*/
const AOO = 4;
const TIME_LIT = 1000;
const COLORS = {
    
}
/*----- app's state (variables) -----*/
let playerArray;
let lightArray;
let currIdx;
let highScore;
/*----- cached element references -----*/
/*----- event listeners -----*/
/*----- functions -----*/
console.log('hi');

// start of game, initializes variables
function init() {
    playerArray = [];
    lightArray = [1, 1, 1];
    currIdx = 0;
    roundStart();
    render();
}

function render() {

}

function handleBtnClick(evt) {
    playerInput(evt.value);
    if (playerArray[currIdx] === lightArray[currIdx]) {
        currIdx++;
        //light up the button
        if (playerArray.length === lightArray.length)  roundStart();
    } else {
        //buttons disable

    }
}

//called whenever the player gets the pattern correctly
function roundStart() {
    disableBtns();
    let curr = 0;
    playerArray = [];
    lightArray.push(Math.floor(Math.random() * AOO));

    lightArray.forEach(function(light) {
        window.setTimeout(function() {
            console.log('yo');
            console.log(curr);
            if (curr === lightArray.length) enableBtns();
        }, (1000 + (curr * 1000))); 
        curr++   
    });
    //enable buttons
}

//takes a num and pushes it to the array
function playerInput(choice) {
    playerArray.push(choice);
}

function disableBtns() {
    console.log('-btn disabled-');
    document.querySelectorAll('button').forEach(btn => btn.disabled = true);
}

function enableBtns() {
    console.log('-btn engaged-');
    document.querySelectorAll('button').forEach(btn => btn.disabled = false);
}

/*
single player so no players needed
constants:
    - AMOUNT_OF_OPTIONS  -- normally game is played with 4
    - TIME_LIT
    - COLOR ASSIGNMENTS  -- 1: red, 2: blue etc.
variables:
    - array that holds correct lights from <1 - AMOUNT_OF_OPTIONS>
        i.e. AOO = 4, array [1, 4, 3, 1, etc.]
    - array that resets every time 'round' starts over that holds player choice
    - currentIndex that resets each 'round'
gameflow:
Press start
    playerArray = []
    lightArray = []
    start is disabled
    buttons are disabled
    if playerArray.length === lightArray[idx]
        playerArray = []
        lightArray.push(random num between 1 - AOO)
        loop through lightArray
            light up the button on HTML that correlates to lightArray[i]
        buttons are enabled
        player will attempt to click buttons in order seen
            button pressed will add the buttons value (1 2 3 etc) to the player array
        if playerArray[currIdx] is !equal to lightArray[idx]
            buttons disabled
            You lose will appear
            high score is updated if applicable
            start will reenable
*/