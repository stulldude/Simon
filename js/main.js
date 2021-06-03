/*----- constants -----*/
/*----- app's state (variables) -----*/
/*----- cached element references -----*/
/*----- event listeners -----*/
/*----- functions -----*/



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