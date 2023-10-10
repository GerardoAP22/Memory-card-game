"use strict";
const cards = document.querySelectorAll('.memory-card');
const resetButton = document.querySelector('#reset-game');
const zoroSoundPath = "audio-sounds/zoro.mp3";
const zoroAudio = new Audio(zoroSoundPath);
zoroAudio.volume = 0.1;
const luffySoundPath = "audio-sounds/luffy.mp3";
const luffyAudio = new Audio(luffySoundPath);
let hasFlippedCard = false;
let firstCard;
let secondCard;
let lockBoard = false;
let gameStarted = false;
const startButton = document.querySelector("#start-button");
const initialScreen = document.querySelector('.initial-screen');
startButton?.addEventListener('click', () => {
    initialScreen?.classList.add('hidden');
    gameStarted = true;
});
function flipCard() {
    if (lockBoard)
        return;
    if (this === firstCard)
        return;
    this.classList.add('flip');
    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        zoroAudio.play();
        return;
    }
    hasFlippedCard = false;
    secondCard = this;
    luffyAudio.play();
    checkForMatch();
}
function checkForMatch() {
    let isMatch = firstCard?.dataset.framework === secondCard?.dataset.framework;
    isMatch ? disableCards() : unflipCards();
}
function disableCards() {
    firstCard?.removeEventListener('click', flipCard);
    secondCard?.removeEventListener('click', flipCard);
    resetBoard();
    const matchedCards = document.querySelectorAll('.flip');
    if (matchedCards.length === cards.length) {
        setTimeout(() => {
            const allMatchedAudio = new Audio('audio-sounds/victory.mp3');
            allMatchedAudio.volume = 0.1;
            allMatchedAudio.play();
        }, 1500);
    }
}
function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard?.classList.remove('flip');
        secondCard?.classList.remove('flip');
        resetBoard();
    }, 1500);
}
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}
(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos.toString();
    });
})();
resetButton?.addEventListener('click', function () {
    window.location.reload();
    return false;
});
cards.forEach(card => card.addEventListener('click', flipCard));
