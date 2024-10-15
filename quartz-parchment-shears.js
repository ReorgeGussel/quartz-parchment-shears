let score = JSON.parse(localStorage.getItem('score'));

if (!score) {
    score = {
        wins: 0,
        losses: 0,
        ties: 0
    }
}

const scoreOnPage = document.querySelector('.score');
updatePage();

function playGame(playerMove) {
    const computerMove = pickComputerMove();
    let result = '';

    if (playerMove === '✌️') {
        if (computerMove === '✊') {
            result = 'Loss.';
        } else if (computerMove === '🖐️') {
            result = 'Win.';
        } else if (computerMove === '✌️') {
            result = 'Tie.';
        }  
    } else if (playerMove === '🖐️') {
        if (computerMove === '✊') {
            result = 'Win.';
        } else if (computerMove === '🖐️') {
            result = 'Tie.';
        } else if (computerMove === '✌️') {
            result = 'Loss.';
        }
    } else if (playerMove === '✊') {
        if (computerMove === '✊') {
            result = 'Tie.';
        } else if (computerMove === '🖐️') {
            result = 'Loss.';
        } else if (computerMove === '✌️') {
            result = 'Win.';
        }
    }

    if (result === 'Win.') {
        score.wins += 1;
    } else if (result === 'Loss.') {
        score.losses += 1;
    } else if (result === 'Tie.') {
        score.ties += 1;
    }

    localStorage.setItem('score', JSON.stringify(score));
    updatePage();

    console.log(result);

    document.querySelector('.result').innerText = result;

    document.querySelector('.moves').innerText = `Your Move: ${playerMove}. \nComputer's move: ${computerMove}.`;
}

let resetMessageContainer = document.querySelector('.reset-confirmation-message-container').classList;

document.querySelector('.reset-button').addEventListener('click', () => {
    if (!resetMessageContainer.contains('reset-confirmation-message-container-active')) {
        resetMessageContainer.add('reset-confirmation-message-container-active'); 
    }
});

document.querySelector('.reset-yes-button').addEventListener('click', () => {
    if (resetMessageContainer.contains('reset-confirmation-message-container-active')) {
        resetMessageContainer.remove('reset-confirmation-message-container-active');
        resetScore();
    }
});

document.querySelector('.reset-no-button').addEventListener('click', () => {
    if (resetMessageContainer.contains('reset-confirmation-message-container-active')) {
        resetMessageContainer.remove('reset-confirmation-message-container-active');
    }
});

function resetScore() {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updatePage();
    document.querySelector('.result').innerText = '';
    document.querySelector('.moves').innerText = '';
}

document.querySelector('.autoplay-button').addEventListener('click', () => {
    autoPlay();
});

let isAutoPlaying = false;
let intervalId;

function autoPlay() {
    let autoPlayButton = document.querySelector('.autoplay-button').classList;
    
    if (!autoPlayButton.contains('autoplay-toggled-on')) {
        autoPlayButton.add('autoplay-toggled-on'); 
    } else {
        autoPlayButton.remove('autoplay-toggled-on');
    }

    if (!isAutoPlaying) {
        intervalId = setInterval(function() {
            const playerMove = pickComputerMove();
            playGame(playerMove);
        }, 1000);     
        isAutoPlaying = true;
        document.querySelector('.autoplay-button').innerText = 'Stop Playing';
    } else {
        clearInterval(intervalId);
        isAutoPlaying = false;
        document.querySelector('.autoplay-button').innerText = 'Auto Play';
    }
}

function pickComputerMove() {
    const randomNumber = Math.random();
    let computerMove = '';
    if (randomNumber >= 0 && randomNumber < 1/3) {
        console.log(randomNumber);
        computerMove = '✊';
    }
    else if (randomNumber >= 1/3 && randomNumber < 2/3) {
        console.log(randomNumber);
        computerMove = '🖐️';
    }
    else if (randomNumber >= 2/3 && randomNumber <= 1) {
        console.log(randomNumber);
        computerMove = '✌️';
    }

    console.log(computerMove);
    return computerMove;
}

function updatePage() {
    scoreOnPage.innerText = `Wins: ${score.wins} | Losses: ${score.losses} | Ties: ${score.ties}`;
}