const cards = document.querySelectorAll('.memory-card');
//cards hold all the values of the cards under the class called memory-card

const resetButton = document.getElementById('reset-button');
// id under the name reset-button gets stored in the variable called resetButton
const zoroSoundPath = "audio-sounds/zoro.mp3";
const zoroAudio  = new Audio(zoroSoundPath)
zoroAudio.volume = 0.1;
// These lines create an Audio object for the sound file at the path audio-sounds/zoro.mp3, sets its volume to 0.1, and stores it in the zoroAudio variable
//adjust the volume of every sound by adding .volume^^^
const luffySoundPath = "audio-sounds/luffy.mp3";
const luffyAudio = new Audio(luffySoundPath)
//  creats a new path for the audio luffy

let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let gameStarted = false;
//we lock the board after 2 cards are being check for matche so we cant turn more cards while they are being checkMatch



  // cards.addEventListener('click', function(){
  //   audio.play();
  //   console.log("Just clicked the button!");
  // });

//flip card function that checks which card is being fliped first or secodn, and plays the assigned aout depending on whic card is being clicked

const startButton = document.getElementById("start-button"); 

const initialScreen = document.querySelector('.initial-screen');

//adds an event listener to the "Match them" button and hiddes the initial screen
startButton.addEventListener('click', () => {
  initialScreen.classList.add('hidden');
  gameStarted = true;
  });



function flipCard() {
 
// first checks if the board is locked
  if (lockBoard) return;

  //then checks if the card clicked is the same as the firstCard that was flipped ovder 
  if (this === firstCard) return;
//if the conditios above are false it will add a flip function to the card
  this.classList.add('flip')
  

  if (!hasFlippedCard) {
    //first Click
    hasFlippedCard = true;
    firstCard = this;
    zoroAudio.play();
    return;
  } 
    //second click
    hasFlippedCard = false;
    secondCard = this;
  luffyAudio.play();
  //checkForMatch function is called only after the second card has been clicked
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
  //if its a match it stops the card to be clicked again^^^


  //resetBoard after two cards have been clicked it puts it back to initial stat of the lockboard and hasFlipped
  resetBoard();
    // Check if all cards are matched
    const matchedCards = document.querySelectorAll('.flip');
    if (matchedCards.length === cards.length) {
      setTimeout(() => {//given a set timer to wait a 1.5 seconds before it plays
        // All cards are matched, play the audio
        const allMatchedAudio = new Audio('audio-sounds/victory.mp3');
        allMatchedAudio.volume = 0.1;
        allMatchedAudio.play();
      }, 1500);
    }
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

}//stat of the board after evey secondCard has been clicked
function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
} 
//randomizing the position of each card for every new game
(function shuffle(){
  cards.forEach(card => {
    let randomPos = Math.floor (Math.random() * 12)//Math.random give  a number between 0 and 1 and then multiplys it wiht 12 // then math.floor will round up the number to the nearest integer
    card.style.order = randomPos
  });
}  )();


//button that restarts the game from the begining
document.getElementById('reset-game').addEventListener('click',function(){
  window.location.reload();
  return  false;
});

//calls the function that flips name
cards.forEach(card => card.addEventListener('click', flipCard))
