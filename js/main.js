/*----- constants -----*/
const AOO = 4;
const TIME_LIT = 1000;
const COLORS = {}
/*----- app's state (variables) -----*/
let playerArray;
let lightArray;
let currIdx;
let highScore = 0;
/*----- cached element references -----*/
/*----- event listeners -----*/
document.getElementById('SVGHolder').addEventListener('click', handleBtnClick);
document.querySelector('button').addEventListener('click', init);
/*----- functions -----*/
console.log('hi');

// start of game, initializes variables
function init() {
    playerArray = [];
    lightArray = [];
    console.log(`currIdx = ${currIdx} in init`)
    currIdx = 0;
    roundStart();
    render();
}

function render() {

}

function handleBtnClick(evt) {
    let num = parseInt(evt.target.id[1]);
    console.log(num)
    playerInput(num);
    compareChoices();
}

//called whenever the player gets the pattern correctly
function roundStart() {
    disableBtns();
    let timeOutAdd = 0;
    console.log(`currIdx = ${currIdx} in round start.\nShould be 0`)
    playerArray = [];
    lightArray.push(Math.floor(Math.random() * AOO));
    
    lightArray.forEach(function(light) {
        window.setTimeout(function() {
            //render light
            
            if (currIdx === lightArray.length - 1) enableBtns();
            console.log(currIdx + ' after if statement');
        }, (TIME_LIT + (timeOutAdd * TIME_LIT))); 
        timeOutAdd++   
    });
    //enable buttons
    //currIdx reset for player choices
}

//takes a num and pushes it to the array
function playerInput(choice) {
    console.log(choice + typeof choice);
    playerArray.push(choice);
}

function compareChoices() {
    console.log(currIdx);
    console.log(playerArray[currIdx] + 'current guess');
    console.log(lightArray[currIdx] + 'expected guess');
    if (playerArray[currIdx] === lightArray[currIdx]) {
        currIdx++;
        //light up the button
        if (playerArray.length === lightArray.length)  roundStart();
    } else {
        //buttons disable
        disableBtns();
        loss();
        //handle loss

        console.log('you lose!')
    } 
}

function disableBtns() {
    currIdx = 0;
    console.log('-btn disabled-');
    document.querySelectorAll('button').forEach(btn => btn.disabled = true);
}

function enableBtns() {
    currIdx = 0;
    console.log(currIdx + ' in enableBtns')
    console.log('-btn engaged-');
    document.querySelectorAll('button').forEach(btn => btn.disabled = false);
}

function loss() {
    highScore = lightArray.length - 1 > highScore ? lightArray.length - 1 : highScore;
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