// GLOBAL VALUES

let computerTotalWins = 0;
let playerTotalWins = 0;

// HANDLER FUNCTIONS

/*Chooses what hand the computer plays
by converting mathematical random numbers
into possible hands */
function computerPlay() {
    let computerHand = Math.floor(Math.random() * 3);
    let computerSelection;
    if (computerHand === 0) {
        computerSelection = 'rock';
    } else if (computerHand === 1) {
        computerSelection = 'paper';
    } else if (computerHand === 2) {
        computerSelection = 'scissors';
    }
    return computerSelection
}

/* Decides who wins in each rounds by comparing hands */
function playRound(playerSelection, computerSelection) {
    console.log(`${playerSelection} + ${computerSelection}`);
    if (!playerSelection) {
        return;
    }
    if (playerSelection === computerSelection) {
        return 'tie';
    } else if (playerSelection === 'rock' && computerSelection === 'paper') {
        return 'computer';
    } else if (playerSelection === 'rock' && computerSelection === 'scissors') {
        return 'player';
    } else if (playerSelection === 'paper' && computerSelection === 'rock') {
        return 'player';
    } else if (playerSelection === 'paper' && computerSelection === 'scissors') {
        return 'computer';
    } else if (playerSelection === 'scissors' && computerSelection === 'rock') {
        return 'computer';
    } else if (playerSelection === 'scissors' && computerSelection === 'paper') {
        return 'player';
    } else {
        throw 'the only acceptable input are "rock", "paper" or "scissors"';
    }
}

/* Changes DOM to show winner of the round */
function showResult(winner) {
    const resultText = document.querySelector('.resultText');
    if (winner === 'computer') {
        resultText.textContent = 'Computer is the winner!';
    } else if (winner === 'player') {
        resultText.textContent = 'Player is the winner!';
    } else if (winner === 'tie') {
        resultText.textContent = 'Tie! No one gets points.';
    } else if (!winner) {
        resultText.textContent = '';
    }
}

/* Changes DOM to show entire session winner */
function showOverallWinner(winner) {
    const resultText = document.querySelector('.resultText');
    const totalWins = document.getElementById("totalWins");

    totalWins.style.display = "none";
    totalWins.hidden = true;

    resultText.classList.remove('resultText');
    resultText.classList.add('overallWinner');
    
    if (winner === "player") {
        resultText.textContent = "Player wins the entire session!"
    } else if (winner === "computer") {
        resultText.textContent = "Computer wins the entire session!"
    }

}

/* Changes DOM to reset hidden elements when game is reset */
function resetHidden() {
    const resultText = document.querySelector('.overallWinner');
    const totalWins = document.getElementById("totalWins");

    const playerHand = document.querySelector('.playerHand');
    const computerHand = document.querySelector('.computerHand');

    resultText.classList.add('resultText');
    resultText.classList.remove('overallWinner');
    
    playerHand.textContent = "?";
    computerHand.textContent = "?";
    resultText.textContent = "";

    totalWins.style.display = "flex";
    totalWins.hidden = false;
}

/* Changes DOM to update total wins for each player */
function updateTotalWins(playerTotalWins, computerTotalWins) {
    const pPlayerWins = document.querySelector('.playerTotalWins');
    const pComputerWins = document.querySelector('.computerTotalWins');

    pPlayerWins.textContent = `${playerTotalWins}`;
    pComputerWins.textContent = `${computerTotalWins}`;
}

/* Changes DOM to show each player's hands */
function showHand(playerSelection, computerSelection) {
    const playerHand = document.querySelector('.playerHand');
    const computerHand = document.querySelector('.computerHand');

    switch(playerSelection) {
        case 'rock':
            playerHand.textContent = 'Rock';
            break;
        case 'paper':
            playerHand.textContent = 'Paper';
            break;
        case 'scissors':
            playerHand.textContent = 'Scissors';
            break;
    }
    switch(computerSelection) {
        case 'rock':
            computerHand.textContent = 'Rock';
            break;
        case 'paper':
            computerHand.textContent = 'Paper';
            break;
        case 'scissors':
            computerHand.textContent = 'Scissors';
            break;
    }
}

function playWrapper(e) {
    removeClickability();

    console.log("let's play!");
    let playerSelection = e.currentTarget.getAttribute('class');
    let computerSelection = computerPlay();

    showHand(playerSelection, computerSelection);
    winner = playRound(playerSelection, computerSelection);
    console.log(`${winner}`);

    if (winner === 'computer') {
        computerTotalWins++;
    } else if (winner === 'player') {
        playerTotalWins++;
    }

    showResult(winner);
    updateTotalWins(playerTotalWins, computerTotalWins);

    if (playerTotalWins === 5) {
        showOverallWinner("player");
        return;
    } else if (computerTotalWins === 5) {
        showOverallWinner("computer");
        return;
    } else {
        allowClickability();
    }
}

function allowClickability() {
    const hands = document.querySelector('.containerHand').children;
    for (let hand of hands) {
        hand.addEventListener('click', playWrapper);
    }
}

function removeClickability() {
    const hands = document.querySelector('.containerHand').children;
    for (let hand of hands) {
        hand.removeEventListener('click', playWrapper);
    }
}

function sessionWrapper() {
    allowClickability();
}


// Start Session

sessionWrapper();

const toggleRules = document.querySelector('#hideRules');
toggleRules.addEventListener('click', () => {
    const rules = document.getElementById("rules");
    rules.classList.toggle('hidden');
    if (toggleRules.textContent === "Hide Rules") {
        toggleRules.textContent = "Show Rules";
    } else {
        toggleRules.textContent = "Hide Rules";
    }
})

const resetGame = document.querySelector('#reset');
resetGame.addEventListener('click', () => {
    computerTotalWins = 0;
    playerTotalWins = 0;
    updateTotalWins(playerTotalWins, computerTotalWins);
    resetHidden();
    showResult(null);
    sessionWrapper();
})