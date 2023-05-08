


/*---variables-----*/

// Get all memory cards
const memoryCards = document.querySelectorAll('.memory-card');
//select the reset button 
const resetButton = document.getElementById('reset-button')



/*-----Functions------*/
// Add click event listener to each memory card
memoryCards.forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('flipped');
  });
});
//now once the cards are clicked switches to the other card

resetButton.addEventListener('click', function(){
    resetGame();
});

// funtion resetGame(){

// }
function shuffle(array) {

}



