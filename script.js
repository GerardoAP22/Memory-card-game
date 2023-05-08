// Get all memory cards
const memoryCards = document.querySelectorAll('.memory-card');

// Add click event listener to each memory card
memoryCards.forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('flipped');
  });
});
