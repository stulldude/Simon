/*----- constants -----*/
const AOO = 4;
const TIME_LIT = 1000;
const INACTIVE_OPACITY = '.25';
const ACTIVE_OPACITY = '.8';
const BEEP = 'BEEP';
const BOOP = 'BOOP';
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
let ftr = document.querySelector('footer');
let play = document.getElementById('play');

/*----- event listeners -----*/
document.getElementById('SVGHolder').addEventListener('click', handleBtnClick);
document.querySelector('button').addEventListener('click', init);

/*----- functions -----*/
// start of game, assigns SVG 'buttons' to Choice object, 
function init() {
    playerArray = [];
    lightArray = [];
    CHOICE.c0 = c0;
    CHOICE.c1 = c1;
    CHOICE.c2 = c2;
    CHOICE.c3 = c3;
    currIdx = 0;
    play.setAttribute('disabled', true);
    roundStart();
}

function renderLight(light) {
    CHOICE[`c${light}`].style.opacity = ACTIVE_OPACITY;
    window.setTimeout(function() {
        unrenderLight(light);
    }, TIME_LIT - 200);
}

function unrenderLight(light) {
    CHOICE[`c${light}`].style.opacity = INACTIVE_OPACITY;
}

function unrenderLights() {
    CHOICE.c0.style.opacity = INACTIVE_OPACITY;
    CHOICE.c1.style.opacity = INACTIVE_OPACITY;
    CHOICE.c2.style.opacity = INACTIVE_OPACITY;
    CHOICE.c3.style.opacity = INACTIVE_OPACITY;
}

function handleBtnClick(evt) {   
    if (notPlayable || !evt.target.id) return;
    let num = parseInt(evt.target.id[1]);
    unrenderLights();
    playerInput(num);
    compareChoices();
}

//called whenever the player gets the pattern correctly & on play
function roundStart() {
    notPlayable = true;
    let timeOutAdd = 0;
    playerArray = [];
    lightArray.push(Math.floor(Math.random() * AOO));
    
    lightArray.forEach(function(light, idx) {
        window.setTimeout(function() {
            handleBeepBoop();
            console.log(light + ' this is light')
            renderLight(light);
            if (idx === lightArray.length - 1) {
                currIdx = 0;   
                notPlayable = false;
                console.log(notPlayable)
            }
        }, timeOutAdd * TIME_LIT);
        timeOutAdd++   
    });
}

//takes a num and pushes it to the array
function playerInput(choice) {
    playerArray.push(choice);
    handleBeepBoop();
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
        notPlayable = true
        loss();
    } 
}

function loss() {
    highScore = lightArray.length - 1 > highScore ? lightArray.length - 1 : highScore;
    ftr.innerText = `HIGH SCORE: ${highScore}`;
    play.innerText = 'PLAY';
    play.removeAttribute('disabled');
    console.log('you lose!')
}

function handleBeepBoop() {
    play.innerText = play.innerText === BEEP ? BOOP : BEEP;
}