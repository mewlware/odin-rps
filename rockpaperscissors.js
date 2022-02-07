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

function playRound(playerSelection, computerSelection) {
    playerSelection = playerSelection.toLowerCase();
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

function alertWinner(winner, type='session') {
    if (type === 'round' && winner === 'tie') {
        alert(`It's a ${winner}!`);
    } else if (type === 'session' && winner === 'tie') {
        alert(`It's an overall tie!`);
    } else if (type === 'round') {
        alert(`The winner of that round is... ${winner}!`);
    } else if (type === 'session') {
        alert(`The overall winner is.... ${winner}!`);
    } else {
        throw 'winner or type variable invalid';
    }
}

function game() {
    let playerSelection;
    let winner;
    let countPlayerWins = 0;
    let countComputerWins = 0;

    for (let i = 0; i < 5; i++) {
        playerSelection = window.prompt("Choose: Rock, Paper, or Scissors");
        winner = playRound(playerSelection, computerPlay());
        alertWinner(winner, 'round');

        if (winner === 'computer') {
            countComputerWins++;
        } else if (winner === 'player') {
            countPlayerWins++;
        }
    }

    if (countComputerWins === countPlayerWins) {
        alertWinner('tie');
    } else if (countComputerWins > countPlayerWins) {
        alertWinner('computer');
    } else if (countPlayerWins > countComputerWins) {
        alertWinner('player');
    }
}