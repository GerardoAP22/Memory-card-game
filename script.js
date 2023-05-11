const cards = document.querySelectorAll('.memory-card');
const resetButton = document.getElementById('reset-button');

let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
//we lock the bord after 2 cards are being check for matche so we cant turn more cards while they are being checkMatch

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip')

  if (!hasFlippedCard) {
    //first Click
    hasFlippedCard = true;
    firstCard = this;
    return;
  } 
    //second click
    hasFlippedCard = false;
    secondCard = this;

    checkForMatch();
  }

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework
//ternary operator //lets you write the if statment in less lines
//isMatch is condition ? true : false
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  //its a match!!
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  //if its a match it stops the card to be clicked again
  resetBoard();
}
//gives time to check if the cards match
function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flip')
    secondCard.classList.remove('flip')
    resetBoard();
  }, 1500);
  //if cards dont match it will unflip them after 1.5s

}
function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
} 

(function shuffle(){
  cards.forEach(card => {
    let randomPos = Math.floor (Math.random() * 12)
    card.style. order = randomPos;
  });
}  )();

document.getElementById('reset-game').addEventListener('click',function(){
  window.location.reload();
  return  false;
});
//calls the function that flips name
cards.forEach(card => card.addEventListener('click', flipCard))
