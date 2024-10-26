const cards = ['🦚', '🐥', '🐒', '🦖'];
let board = document.getElementById ('board');
let flippedCard = null; // To track one flipped card
let shuffledCards;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createColumnOfCards() {
    shuffledCards = shuffle([...cards]); // Create a shuffled copy

    shuffledCards.forEach((card) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.cardValue = card;
        

        cardElement.addEventListener('click', () => flipOneCard(cardElement));
        board.appendChild(cardElement);
    });
}




// Initialize game with a one-colum test

function initColumnTest() {
    board.innerHTML = ''; // Clear previous content
    createColumnOfCards(); // Create a one-column of cards
}

initColumnTest(); // Start the column test