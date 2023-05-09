/*---variables-----*/

const currentScore = document.querySelector('.score');
const memoryCards = document.querySelectorAll('.memory-card');
const cardNames = ['#goku','#gon', '#kilua', '#luffy','#vegeta','#zoro'];
let randomPosition = [];

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let flippedCards = 0;
const order = 'order';

/*-----Functions------*/
// startGame(){
//   this.cardToCheck =null;
//   this.matchedCards = [];
//   this.busy =true;
// }

// Fisher-Yates Shuffle Function
function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  console.log(currentIndex);

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

for(let i = 0; i < cardNames.length; i++){
  randomPosition.push(cardNames[i]);
}

randomPosition = shuffle(randomPosition.concat(randomPosition)); // Shuffle the cards and duplicate them

memoryCards.forEach((card, index) => {
  card.dataset.name = randomPosition[index].substring(1); // Assign shuffled card names
  card.children[1].src = `images/${randomPosition[index].substring(1)}.jpg`; // Assign shuffled card images
  card.addEventListener('click', () => {
    card.classList.toggle('flipped');
  });
});

// resets the game!!
document.getElementById('reset-game').addEventListener('click',function(){
    window.location.reload();
    return  false;
});