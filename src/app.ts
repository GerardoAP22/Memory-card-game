type Card = HTMLElement;
const cards = document.querySelectorAll<HTMLDivElement>('.memory-card');
const resetButton = document.querySelector<HTMLButtonElement>('#reset-game');
const zoroSoundPath: string = "audio-sounds/zoro.mp3";
const zoroAudio: HTMLAudioElement = new Audio(zoroSoundPath);
zoroAudio.volume = 0.1;
const luffySoundPath: string = "audio-sounds/luffy.mp3";
const luffyAudio: HTMLAudioElement = new Audio(luffySoundPath);

let hasFlippedCard: boolean = false;
let firstCard: Card | null;
let secondCard: Card | null;
let lockBoard: boolean = false;
let gameStarted: boolean = false;

const startButton = document.querySelector<HTMLButtonElement>("#start-button"); 
const initialScreen = document.querySelector<HTMLElement>('.initial-screen')!;

startButton?.addEventListener('click', () => {
  initialScreen?.classList.add('hidden');
  gameStarted = true;
});

function flipCard(this: Card) {
  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.add('flip')

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

(function shuffle(){
  cards.forEach(card => {
    let randomPos = Math.floor (Math.random() * 12);
    card.style.order = randomPos.toString();
  });
})();

resetButton?.addEventListener('click',function(){
  window.location.reload();
  return  false;
});

cards.forEach(card => card.addEventListener('click', flipCard));