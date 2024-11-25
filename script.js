// script.js
const cards = document.querySelectorAll('.memory-card');
const timerElement = document.getElementById('timer');
const resetButton = document.getElementById('reset-button');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let timer;
let time = 0;
let isGameActive = false;

function startTimer() {
    timer = setInterval(() => {
        time++;
        timerElement.textContent = `Tiempo: ${time}s`;
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
}

function resetTimer() {
    stopTimer();
    time = 0;
    timerElement.textContent = 'Tiempo: 0s';
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    if (!isGameActive) {
        isGameActive = true;
        startTimer();
    }

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    if (document.querySelectorAll('.memory-card:not(.flip)').length === 0) {
        stopTimer();
    }

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function resetGame() {
    resetBoard();
    resetTimer();
    isGameActive = false;

    cards.forEach(card => {
        card.classList.remove('flip');
        card.addEventListener('click', flipCard);
    });

    shuffleCards();
}

function shuffleCards() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 16);
        card.style.order = randomPos;
    });
}

resetButton.addEventListener('click', resetGame);
shuffleCards();

cards.forEach(card => card.addEventListener('click', flipCard));
