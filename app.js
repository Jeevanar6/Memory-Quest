const levelConfigurations = {
    1: { columns: 3, rows: 3, totalCards: 9 },
    2: { columns: 4, rows: 4, totalCards: 16 },
    3: { columns: 4, rows: 6, totalCards: 24 },
};

const cards = ['🦚', '🐥', '🐒', '🦖', '🐢', '🐬', '🐸', '🦜', '🦋', '🦄', '🐼', '🐧'];
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

function setupGrid(columns) {
    board.style.gridTemplateColums = `repeat(${columns}, 1fr)`;
}

function createBoard(level) {
    const { columns, rows, totalCards } = levelConfigurations[level];
    setupGrid(columns);
}

function createColumnOfCards() {
    shuffledCards = shuffle([...cards]); // Create a shuffled copy

    shuffledCards.forEach((card) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.cardValue = card;
        cardElement.innerText = '?'; // Hide the card value initially

        // Add click event to flip a card
        cardElement.addEventListener('click', () => flipOneCard(cardElement));
        board.appendChild(cardElement);
    });
}

function flipOneCard(card) {
    if (!flippedCard) {
        card.classList.add('flipped');
        card.innerText = card.dataset.cardValue; // Show card value
        flippedCard = card; // Track this flipped card
    }
}






// Initialize game with a one-colum test

function initColumnTest() {
    board.innerHTML = ''; // Clear previous content
    createColumnOfCards(); // Create a one-column of cards
}

initColumnTest(); // Start the column test