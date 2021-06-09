/*----- constants -----*/
const AOO = 4;
const TIME_LIT = 1000;
const INACTIVE_OPACITY = '.25';
const ACTIVE_OPACITY = '.8';
const BEEP = 'BEEP';
const BOOP = 'BOOP';
const CHOICE = {
    c0: {id: null, sound: 'sounds/Sound1.mp3'},
    c1: {id: null, sound: 'sounds/Sound2.mp3'},
    c2: {id: null, sound: 'sounds/Sound3.mp3'},
    c3: {id: null, sound: 'sounds/Sound4.mp3'},
}

/*----- app's state (variables) -----*/
let playerArray;
let lightArray;
let currIdx;
let highScore;
let myStorage;
let notPlayable = true;
let audioOnlyMode = false;
let muteMode = false;

/*----- cached element references -----*/
let c0 = document.getElementById('c0');
let c1 = document.getElementById('c1');
let c2 = document.getElementById('c2');
let c3 = document.getElementById('c3');
let ftr = document.querySelector('footer');
let play = document.getElementById('play');
let aMode = document.getElementById('aMode');
let mute = document.getElementById('mute')
const audioPlayer = new Audio();

/*----- event listeners -----*/
document.getElementById('SVGHolder').addEventListener('click', handleBtnClick);
play.addEventListener('click', init);
aMode.addEventListener('click', handleAudioMode)
mute.addEventListener('click', function() {muteMode = !muteMode})

/*----- functions -----*/

// start of game, assigns SVG 'buttons' to Choice object, 
function init() {
    playerArray = [];
    lightArray = [];
    myStorage = window.localStorage;
    CHOICE.c0.id = c0;
    CHOICE.c1.id = c1;
    CHOICE.c2.id = c2;
    CHOICE.c3.id = c3;
    currIdx = 0;
    setHighScore();
    if (audioOnlyMode) {
        soundWarmUp();
        setTimeout(roundStart, TIME_LIT * 4.5);
    } else roundStart();
    play.setAttribute('disabled', true);
    aMode.setAttribute('disabled', true)
}

function renderLight(light) {
    CHOICE[`c${light}`].id.style.opacity = ACTIVE_OPACITY;
    window.setTimeout(function() {
        unrenderLight(light);
    }, TIME_LIT - 200);
}

function unrenderLight(light) {
    CHOICE[`c${light}`].id.style.opacity = INACTIVE_OPACITY;
}

// unrenders all lights so when player chooses quickly, previous lights arent still lit
function unrenderLights() {
    CHOICE.c0.id.style.opacity = INACTIVE_OPACITY;
    CHOICE.c1.id.style.opacity = INACTIVE_OPACITY;
    CHOICE.c2.id.style.opacity = INACTIVE_OPACITY;
    CHOICE.c3.id.style.opacity = INACTIVE_OPACITY;
}

function handleBtnClick(evt) {   
    if (notPlayable || !evt.target.id) return;
    let num = parseInt(evt.target.id[1]);
    unrenderLights();
    playerInput(num);
    compareChoices();
}

// called whenever the player gets the pattern correct & on play
function roundStart() {
    notPlayable = true;
    let timeOutAdd = 0;
    playerArray = [];
    lightArray.push(Math.floor(Math.random() * AOO));
    
    lightArray.forEach(function(light, idx) {
        window.setTimeout(function() {
            handleBeepBoop();
            console.log(light + ' this is light')
            playSound(light);
            if (!audioOnlyMode) renderLight(light);
            if (idx === lightArray.length - 1) {
                currIdx = 0;   
                notPlayable = false;
                console.log(notPlayable)
            }
        }, timeOutAdd * TIME_LIT);
        timeOutAdd++   
    });
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
    console.log('you lose!')
}

function setHighScore() {
    highScore = myStorage.getItem('highScore');
    if (!highScore) highScore = 0;
    highScore = lightArray.length - 1 > highScore ? lightArray.length - 1 : highScore;
    myStorage.setItem('highScore', `${highScore}`);
    ftr.innerText = `HIGH SCORE: ${highScore}`;
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
        mute.setAttribute('disabled', 'true');
        muteMode = false;
    } else mute.removeAttribute('disabled');
    console.log(audioOnlyMode);
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