const levelSettings = {
    1: { columns: 3, rows: 3, requiredPairs: 3, time: 60 },
    2: { columns: 4, rows: 4, requiredPairs: 5, time: 90 },
    3: { columns: 4, rows: 6, requiredPairs: 8, time: 120 },
};

let currentLevel = 1;
let timeLeft, timer, wrongGuesses, matchedPairs;
const maxWrongGuesses = 5;
const board = document.getElementById ('board');
const timerDisplay = document.getElementById('time');
const wrongCountDisplay = document.getElementById('wrong-count');
const levelDisplay = document.getElementById('level-count');
const restartButton = document.getElementById('restart-button');
let flippedCards = []; // To track one flipped card

// Initialize the game
function initializeGame() {
    const { rows, columns, requiredPairs, time } = levelSettings[currentLevel];
    board.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    timeLeft = time;
    wrongGuesses = 0;
    matchedPairs = 0;
    updateDisplay();
    setupBoard( rows * columns, requiredPairs);
    startTimer();
}

// Update display for timer, wrong guesses, and level
function updateDisplay() {
    timerDisplay.innerText = timeLeft;
    wrongCountDisplay.innerText = wrongGuesses;
    levelDisplay.innerText = currentLevel;
} 

// Set up the board with shuffled cards based on the levels
function setupBoard(totalCards, requiredPairs) {
    board.innerHTML = '';
    const symbols = ['🦚', '🐥', '🐒', '🦖', '🐢', '🐬', '🐸', '🦜', '🦋', '🦄', '🐼', '🐧'];
    let cards = [...symbols.slice(0, requiredPairs), ...symbols.slice(0, requiredPairs)];

// Ensure we have exactly totalCards by adding or removing pairs as needed
while (cards.length < totalCards) {
    cards = [...cards, ...cards.slice(0, totalCards - cards.length)];
}
shuffle(cards);

// Create cards on the board
cards.forEach((symbol) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.symbol = symbol;
    card.innerText = symbol; // Hide the card value initially
    card.addEventListener('click', flipCard);
    board.appendChild(card);
});

// Hide symbols after 5 seconds
setTimeout(() => {
    document.querySelectorAll('.card').forEach(card => card.innerText = '?');
}, 5000);
}

// Flip card function
function flipCard() {
    if (this.classList.contains('flipped') || flippedCards.length === 2) return;

    this.classList.add('flipped');
    this.innerText = this.dataset.symbol;
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        checkForMatch();
    }
}

// Check for match between the two flipped cards
function checkForMatch() {
    let [card1, card2] = flippedCards;
    if (card1.dataset.symbol === card2.dataset.symbol) {
        matchedPairs++;
        if (matchedPairs === levelSettings[currentLevel].requiredPairs) {
            winLevel();
        }
    } else {
        wrongGuesses++;
        wrongCountDisplay.innerText = wrongGuesses;
        if (wrongGuesses >= maxWrongGuesses) {
            loseGame();
            return;
        }
        setTimeout(() => {
            card1.classList.remove('flipped');
            card1.innerText = '?';
            card2.classList.remove('flipped');
            card2.innerText = '?';
        }, 1000);
    }
    flippedCards = [];
}

// Handle winning a level
function winLevel() {
    clearInterval(timer);
    if (currentLevel < 3) {
        alert(`Congratulations! You completed level ${currentLevel}`);
        currentLevel++;
        initializeGame();
    } else {
        alert("Congratulations! You've won the game!");
        restartButton.style.display = "block";
    }
}

// Timer countdown function
function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            alert("Time's up! You lose!");
            restartButton.style.display = "block";
        }
    }, 1000);
}

// Lose game function
function loseGame() {
    clearInterval(timer);
    alert("Too many wrong guesses! You Lose!");
    restartButton.style.display = "block";
}

// Shuffle function
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i+1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

//Restart the game 
function restartGame() {
    currentLevel = 1;
    initializeGame();
    restartButton.style.display = "none";
}

// Start the game
initializeGame();
restartButton.addEventListener('click', restartGame);
