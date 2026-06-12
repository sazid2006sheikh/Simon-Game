let gameSeq = [];
let userSeq = [];

// All available button colors
let btns = ["yellow", "red", "purple", "green"];

// Checking whether game started or not
let started = false;

// Current game level
let level = 0;

let h2 = document.querySelector("h2");


// Starts the game after pressing any keyboard key
document.addEventListener("keypress", function () {

    if (started == false) {

        console.log("Game Started");

        started = true;

        levelUp();
    }

});


// Flash animation when computer selects button
function gameFlash(btn) {

    btn.classList.add("flash");

    setTimeout(function () {

        btn.classList.remove("flash");

    }, 250);

}


// Flash animation when player clicks button
function userFlash(btn) {

    btn.classList.add("userflash");

    setTimeout(function () {

        btn.classList.remove("userflash");

    }, 250);

}



// Increasing level and generating new random color
function levelUp() {

    // User sequence becomes empty for new level
    userSeq = [];

    level++;

    h2.innerText = `Level ${level}`;


    // Random button selection
    let randIdx = Math.floor(Math.random() * 3);

    let randColor = btns[randIdx];

    let randBtn = document.querySelector(`.${randColor}`);


    // Store computer generated pattern
    gameSeq.push(randColor);

    console.log(gameSeq);


    // Show animation
    gameFlash(randBtn);

}



// Compare user input with computer pattern
function checkAns(idx) {


    if (userSeq[idx] === gameSeq[idx]) {


        // When user completes full sequence move next level
        if (userSeq.length == gameSeq.length) {

            setTimeout(levelUp, 1000);

        }


    } else {


        // Game over screen
        h2.innerHTML =
            `Game Over! Your score was <b><u>${level}</u></b>
            <br> Press any key to restart`;



        // Little shake animation on losing
        document.body.animate(
            [
                { transform: "translateX(-10px)" },
                { transform: "translateX(10px)" },
                { transform: "translateX(0px)" }
            ],

            {
                duration: 250,
                iterations: 2
            }
        );


        reset();

    }

}



// Button click handling
function btnPress() {


    let btn = this;


    // User click animation
    userFlash(btn);


    // Getting clicked button color
    let userColor = btn.getAttribute("id");


    // Store user pattern
    userSeq.push(userColor);


    // Check answer
    checkAns(userSeq.length - 1);

}



// Adding event listener to all buttons
let allBtns = document.querySelectorAll(".btn");


for (btn of allBtns) {

    btn.addEventListener("click", btnPress);

}



// Reset everything after game over
function reset() {

    started = false;

    gameSeq = [];

    userSeq = [];

    level = 0;

}