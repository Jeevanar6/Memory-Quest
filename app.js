const levelConfigurations = {
    1: { columns: 3, rows: 3, totalCards: 9, requiredPairs: 3, time: 60 },
    2: { columns: 4, rows: 4, totalCards: 16, requiredPairs: 5, time: 90 },
    3: { columns: 4, rows: 6, totalCards: 24, requiredPairs: 8, time: 120 },
};

let currentLevel = 1;
let timeLeft, timer, wrongGuesses, matchedPairs;
const maxWrongGuesses = 5;
const board = document.getElementById ('board');
const timerDisplay = document.getElementById('time');
const wrongCountDisplay = document.getElementById('wrong-count');
const levelDisplay = document.getElementById('level-count');
const RestartButton = document.getElementById('restart-button');
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
    board.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
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

    setTimeout(hideAllCards, 5000); // Hide symbols after 5 seconds
}



function flipOneCard(card) {
    console.log("before") // To know the function is working when it is called
    if (!flippedCard) {
        console.log("after") // This appears after a card is flipped
        card.classList.add('flipped');
        card.innerText = card.dataset.cardValue; // Show card value
        flippedCard = card; // Track this flipped card. For the following clicks the function is no longer null as it holds the first card i clicked, causing the condition to be false. 
    } else {
        flippedCard = null; // Resets the function and flips more cards
    }
}


// Initialize game with a one-column test

function initColumnTest() {
    board.innerHTML = ''; // Clear previous content
    createColumnOfCards(); // Create a one-column of cards
}

initColumnTest(); // Start the column test