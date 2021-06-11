/*----- constants -----*/
const AOO = 4;
const TIME_LIT = 1000;
const INACTIVE_OPACITY = '.25';
const ACTIVE_OPACITY = '.8';
const BEEP = 'BEEP';
const BOOP = 'BOOP';
const CHOICE = {
    c0: {el: null, sound: 'sounds/Sound1.mp3'},
    c1: {el: null, sound: 'sounds/Sound2.mp3'},
    c2: {el: null, sound: 'sounds/Sound3.mp3'},
    c3: {el: null, sound: 'sounds/Sound4.mp3'},
}
const audioPlayer = new Audio();

/*----- app's state (variables) -----*/
let playerArray;
let lightArray;
let currIdx;
let score;
let highScore;
let myStorage;
let notPlayable = true;
let audioOnlyMode = false;
let muteMode = false;

/*----- cached element references -----*/
let ftr = document.querySelector('footer');
let play = document.getElementById('play');
let aMode = document.getElementById('aMode');
let mute = document.getElementById('mute')
CHOICE.c0.el = document.getElementById('c0');
CHOICE.c1.el = document.getElementById('c1');
CHOICE.c2.el = document.getElementById('c2');
CHOICE.c3.el = document.getElementById('c3');

/*----- event listeners -----*/
document.getElementById('SVGHolder').addEventListener('click', handleBtnClick);
play.addEventListener('click', handleMode);
aMode.addEventListener('click', handleAudioMode)
mute.addEventListener('click', function() {muteMode = !muteMode})

/*----- functions -----*/
init();

// start of game, assigns SVG 'buttons' to Choice object, 
function init() {
    playerArray = [];
    lightArray = [];
    myStorage = window.localStorage;
    score = 0;
    currIdx = 0;
    setHighScore();
}

function renderScore() {
    ftr.innerText = `HIGH SCORE: ${highScore}\nSCORE: ${score}`;
}

function renderLight(light) {
    CHOICE[`c${light}`].el.style.opacity = ACTIVE_OPACITY;
    window.setTimeout(function() {
        unrenderLight(light);
    }, TIME_LIT - 200);
}

function renderPattern() {
    lightArray.forEach(function(light, idx) {
        window.setTimeout(function() {
            handleBeepBoop();
            playSound(light);
            if (!audioOnlyMode) renderLight(light);
            if (idx === lightArray.length - 1) {
                currIdx = 0;   
                notPlayable = false;
            }
        }, idx * TIME_LIT);
    });
}

function unrenderLight(light) {
    CHOICE[`c${light}`].el.style.opacity = INACTIVE_OPACITY;
}

// unrenders all lights so when player chooses quickly, previous lights arent still lit
function unrenderLights() {
    CHOICE.c0.el.style.opacity = INACTIVE_OPACITY;
    CHOICE.c1.el.style.opacity = INACTIVE_OPACITY;
    CHOICE.c2.el.style.opacity = INACTIVE_OPACITY;
    CHOICE.c3.el.style.opacity = INACTIVE_OPACITY;
}

function handleMode() {
    disableEl(play);
    disableEl(aMode);
    if (audioOnlyMode) {
        soundWarmUp();
        setTimeout(roundStart, TIME_LIT * 4.5);
    } else roundStart();
}

// called whenever the player gets the pattern correct & on play
function roundStart() {
    notPlayable = true;
    playerArray = [];
    lightArray.push(Math.floor(Math.random() * AOO));
    renderPattern();
}

function handleBtnClick(evt) {  
    if (notPlayable || !evt.target.id) return;
    let num = parseInt(evt.target.id[1]);
    unrenderLights();
    playerInput(num);
    compareChoices();
}

// takes a num and pushes it to the player array
function playerInput(choice) {
    playerArray.push(choice);
    handleBeepBoop();
}

// compares current choice to correct choice
function compareChoices() {
    if (playerArray[currIdx] === lightArray[currIdx]) {
        playSound(playerArray[currIdx]);
        if (!audioOnlyMode) renderLight(playerArray[currIdx]);
        currIdx++;
        if (playerArray.length === lightArray.length) {
            window.setTimeout(roundStart, TIME_LIT * 1.2);
        }
    } else {
        notPlayable = true
        loss();
    } 
}

function loss() {
    setHighScore();
    play.innerText = 'PLAY';
    play.removeAttribute('disabled');
    aMode.removeAttribute('disabled');
    lightArray = []
    console.log('you lose!')
}

function setHighScore() {
    highScore = myStorage.getItem('highScore');
    if (!highScore) highScore = 0;
    score = lightArray.length > 0 ? lightArray.length - 1 : 0;
    highScore = score > highScore ? score : highScore;
    myStorage.setItem('highScore', `${highScore}`);
    renderScore();
}

function handleBeepBoop() {
    play.innerText = play.innerText === BEEP ? BOOP : BEEP;
}

function playSound(light) {
    if (muteMode) return;
    audioPlayer.src = CHOICE[`c${light}`].sound;
    audioPlayer.play();
}

// switches between audio only and normal. Also disables and falsifies mute functionality
function handleAudioMode() {
    audioOnlyMode = !audioOnlyMode;
    if (audioOnlyMode) {
        disableEl(mute);
        muteMode = false;
    } else mute.removeAttribute('disabled');
    aMode.innerText = audioOnlyMode ? 'AUDIO ONLY: ON ' : 'AUDIO ONLY: OFF'
}

// lights up and sounds off each button before an audio only round
function soundWarmUp() {
    for (let i = 0; i < 4; i++) {
        window.setTimeout(function() {
            renderLight(i);
            playSound(i);
        }, TIME_LIT * i);
    }
}

function disableEl(el) {
    el.setAttribute('disabled', 'true');
}