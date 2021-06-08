/*----- constants -----*/
const AOO = 4;
const TIME_LIT = 1000;
const CHOICE = {
    c0: null,
    c1: null,
    c2: null,
    c3: null
}
/*----- app's state (variables) -----*/
let playerArray;
let lightArray;
let currIdx;
let highScore = 0;
let notPlayable = true;
/*----- cached element references -----*/
let c0 = document.getElementById('c0');
let c1 = document.getElementById('c1');
let c2 = document.getElementById('c2');
let c3 = document.getElementById('c3');
/*----- event listeners -----*/
document.getElementById('SVGHolder').addEventListener('click', handleBtnClick);
document.querySelector('button').addEventListener('click', init);
/*----- functions -----*/
console.log('hi');

// start of game, initializes variables
function init() {
    playerArray = [];
    lightArray = [];
    CHOICE.c0 = c0;
    CHOICE.c1 = c1;
    CHOICE.c2 = c2;
    CHOICE.c3 = c3;
    currIdx = 0;
    roundStart();
}

function renderLight(light) {
    CHOICE[`c${light}`].style.opacity = '1';
    window.setTimeout(function() {
        unrenderLight(light);
    }, TIME_LIT - 200);
}

function unrenderLight(light) {
    CHOICE[`c${light}`].style.opacity = '.6';
}

function unrenderLights() {
    CHOICE.c0.style.opacity = '.6';
    CHOICE.c1.style.opacity = '.6';
    CHOICE.c2.style.opacity = '.6';
    CHOICE.c3.style.opacity = '.6';
}

function handleBtnClick(evt) {
    
    if (notPlayable || !evt.target.id) return;
    let num = parseInt(evt.target.id[1]);
    unrenderLights();
    playerInput(num);
    compareChoices();
}

//called whenever the player gets the pattern correctly
function roundStart() {
    notPlayable = true;
    let timeOutAdd = 0;
    playerArray = [];
    lightArray.push(Math.floor(Math.random() * AOO));
    
    lightArray.forEach(function(light) {
        window.setTimeout(function() {
            //render light
            renderLight(light);
            if (currIdx === lightArray.length - 1) {
                currIdx = 0;   
                notPlayable = false;
            }
        }, timeOutAdd * TIME_LIT);
        timeOutAdd++   
    });
    //enable buttons
    //currIdx reset for player choices
}

//takes a num and pushes it to the array
function playerInput(choice) {
    playerArray.push(choice);
}

function compareChoices() {
    if (playerArray[currIdx] === lightArray[currIdx]) {
        renderLight(playerArray[currIdx]);
        currIdx++;
        //light up the button
        if (playerArray.length === lightArray.length) {
            window.setTimeout(roundStart, TIME_LIT * 1.2);
        }
    } else {
        //buttons disable
        notPlayable = true
        loss();
        //handle loss

        console.log('you lose!')
    } 
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