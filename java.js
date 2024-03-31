let playerScore = 0;
let computerScore = 0;
let roundWinner = ''

function getComputerChoice() {
    const choices = ["Rock", "Paper", "Scissors"];

    const random = Math.floor(Math.random() * choices.length);
    return random, choices[random];
}


function playRound(playerSelection, computerSelection) {
    if(playerSelection === computerSelection) {
        roundWinner = "tie";
    }
    if(
    (playerSelection === 'Rock' && computerSelection === 'Paper') ||
    (playerSelection === 'Paper' && computerSelection === 'Scissors') ||
    (playerSelection === 'Scissors' && computerSelection === 'Rock')
    ) {
        computerScore ++;
        roundWinner = "computer";
    };
    if(
    (playerSelection === 'Scissors' && computerSelection === 'Paper') ||
    (playerSelection === 'Rock' && computerSelection === 'Scissors') ||
    (playerSelection === 'Paper' && computerSelection === 'Rock') 
    ){
        playerScore++;
        roundWinner = "player";
    }  
    updateScoreMessage(roundWinner, playerSelection, computerSelection)
}


function isGameOver() {
    return playerScore === 5 || computerScore === 5;
}

const scoreInfo = document.getElementById("scoreInfo");
const scoreMessage = document.getElementById("scoreMessage");
const rockBtn = document.getElementById("rockBtn");
const paperBtn = document.getElementById("paperBtn");
const scissorBtn = document.getElementById("scissorBtn");
const playerSign = document.getElementById("playerSign");
const computerSign = document.getElementById("computerSign");
const playerScores = document.getElementById("playerScore");
const computerScores = document.getElementById("computerScore");
const endgameModal = document.getElementById("endgameModal");
const endgameMsg = document.getElementById("endgameMsg");
const restartBtn = document.getElementById("restartBtn");
const overlay = document.getElementById("overlay");

rockBtn.addEventListener('click', () => handleClick('Rock'));
paperBtn.addEventListener('click', () => handleClick("Paper"));
scissorBtn.addEventListener('click', () => handleClick("Scissors"));
restartBtn.addEventListener('click', restartGame)
overlay.addEventListener('click', closeEndgameModal)

function handleClick(playerSelection) {
    if (isGameOver()) {
      openEndgameModal()
      return
    }
  
    const computerSelection = getComputerChoice()
    playRound(playerSelection, computerSelection)
    updateChoices(playerSelection, computerSelection)
    updateScores()
  
    if (isGameOver()) {
      openEndgameModal()
      setFinalMessage()
    }
  }

function updateChoices(playerSelection, computerSelection) {
    switch(playerSelection) {
        case 'Rock':
            playerSign.textContent = "✊";
            break;
        case 'Paper':
            playerSign.textContent = '✋';
            break;
        case 'Scissors':
            playerSign.textContent = '✌️';
            break;
    }
    switch(computerSelection) {
        case 'Rock':
            playerSign.textContent = "✊";
            break;
        case 'Paper':
            playerSign.textContent = '✋';
            break;
        case 'Scissors':
            playerSign.textContent = '✌️';
            break;
    }
};
function updateScores() {
    if(roundWinner === "tie") {
        scoreInfo.textContent = "It's a Tie!";
    }
    else if (roundWinner === "player") {
        scoreInfo.textContent = "You Won!"
    }
    else if (roundWinner === "computer") {
        scoreInfo.textContent = "You Lost!"
    }

    playerScores.textContent = `Player: ${playerScore}`
    computerScores.textContent = `Computer: ${computerScore}`
}

function updateScoreMessage(roundWinner, playerSelection, computerSelection) {
    if (roundWinner === 'player') {
        scoreMessage.textContent = `${playerSelection} beats ${computerSelection}`
    }
    else if (roundWinner === 'computer') {
        scoreMessage.textContent = `${playerSelection} is beaten by ${computerSelection}`
    }
    else if (roundWinner === 'tie'){
        scoreMessage.textContent = `${playerSelection} ties with ${computerSelection}`
    }
}

function openEndgameModal() {
    endgameModal.classList.add('active')
    overlay.classList.add('active')
}

function closeEndgameModal() {
    endgameModal.classList.remove('active')
    overlay.classList.remove('active')
}

function setFinalMessage() {
    return playerScore > computerScore
      ? (endgameMsg.textContent = 'You won!')
      : (endgameMsg.textContent = 'You lost...')
}

function restartGame() {
    playerScore = 0
    computerScore = 0
    scoreInfo.textContent = "Who's going to win?!"
    scoreMessage.textContent = "You VS Computer"
    playerScores.textContent = "Player: 0"
    computerScores.textContent = "Computer: 0"
    playerSign.textContent = "🧑"
    computerSign.textContent = "💻"
    endgameModal.classList.remove('active')
    overlay.classList.remove('active')
}