// Iteration 1: Declare variables required for this game
const gameBody = document.querySelector('#game-body');
const timerdiv = document.querySelector('#timer');
const maxLives = document.querySelector('#max-lives');
const lives = document.querySelector('#lives');
var zombieID = 0;

// Iteration 1.2: Add shotgun sound
const gunSound = new Audio('https://freespecialeffects.co.uk/soundfx/weapons/shotgun_3.wav');
gameBody.onclick = () => {
    gunSound.pause();
    gunSound.currentTime = 0;
    gunSound.play();
};

// Iteration 1.3: Add background sound
const backgroundAudio = new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/soundtrack.mp3');
backgroundAudio.play();
backgroundAudio.loop = true;

// Iteration 1.4: Add lives
const maximumLives = 4;
let currentLives = 4;

// Iteration 2: Write a function to make a zombie
function makeZombie() {
    console.log("check", RandomNumber_range(1, 6))
    gameBody.innerHTML += `<img src="./assets/zombie-${RandomNumber_range(1, 6)}.png" class="zombie-image" id="zombie${zombieID}" alt="xt">`
    let currentZombie = document.getElementById("zombie" + zombieID);
    currentZombie.style.transform = `translateX(${RandomNumber_range(20, 80)}vw)`;
    currentZombie.style.animationDuration = `${RandomNumber_range(2, 5)}s`;

    currentZombie.onclick = () => {
        zombieDestroy(currentZombie);
    }
}

// Iteration 3: Write a function to check if the player missed a zombie
function zombieMiss(currentZombie) {
    if (currentZombie.getBoundingClientRect().top <= 0) {
        currentLives--;
        return true;
    }
    return false;
}

// Iteration 4: Write a function to destroy a zombie when it is shot or missed
function zombieDestroy(currentZombie) {
    currentZombie.style.display = "none";
    zombieID++;
    makeZombie();
}

// Iteration 5: Creating timer
let seconds = parseInt(timerdiv.textContent);


var timer = setInterval(() => {
    seconds--;

    document.getElementById("timer").textContent = seconds;
    let zombie = document.getElementById('zombie' + zombieID);
    if (zombieMiss(zombie)) {
        zombieDestroy(zombie);
        if (currentLives === 0) {
            clearInterval(timer);
            location.href = './game-over.html';
            return
        }
    }
    if (seconds == 0) {
        clearInterval(timer);
        location.href = './win.html';
        return
    }
}, 1000);

// Iteration 6: Write a code to start the game by calling the first zombie
makeZombie();

// Iteration 7: Write the helper function to get a random integer
function RandomNumber_range(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }