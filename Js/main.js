/*----- Constants -----*/
const initialTimerSeconds = 60
const cardFlipDelay = 500

/*----- State Variables -----*/
let flippedCards = []
let matchedPairs = 0
let timerSeconds = initialTimerSeconds
let cardElements

/*----- Cached Elements -----*/
const gameBoard = document.getElementById('board')
const gameInfo = document.getElementById('game-info')
const playAgainBtn = document.getElementById('play-again')
const messageElement = document.getElementById('message')
const timerElement = document.getElementById('timer')
const instructionsElement = document.getElementById('instructions')

/*----- Event Listeners -----*/
playAgainBtn.addEventListener('click', resetGame)
gameBoard.addEventListener('click', handleCardClick)

/*----- Functions -----*/
// Initializes the memory card game by setting up event listeners and calling the resetGame function
function initializeGame() {
  cardElements = Array.from(gameBoard.querySelectorAll('.card'))
  resetGame()
}

// Handles the click event on a card. It flips the card and checks for matches
function handleCardClick(event) {
  // Hide instructions when the first card is clicked
  instructionsElement.style.display = 'none'

  const card = event.target.closest('.card')

  if (!card || flippedCards.length === 2 || flippedCards.includes(card) || matchedPairs === cardElements.length / 2) {
    return
  }

  flipCard(card)

  if (flippedCards.length === 2) {
    setTimeout(checkMatch, cardFlipDelay)
  }
}

// Flips the given card by adding the 'flipped' class and adding it to the flippedCards array
function flipCard(card) {
  card.classList.add('flipped')
  flippedCards.push(card)
}

// Checks if the flipped cards match. If they do, it disables the cards; otherwise, it unflips them
function checkMatch() {
  const [card1, card2] = flippedCards

  if (card1.innerHTML === card2.innerHTML) {
    disableMatchedCards()
    matchedPairs++

    if (matchedPairs === cardElements.length / 2) {
      showGameResult('Congratulations! You won!')
    }
  } else {
    setTimeout(() => {
      unflipCards(card1, card2)
    }, cardFlipDelay)
  }

  flippedCards = []
}

// Disables the matched cards by removing the click event listener
function disableMatchedCards() {
  flippedCards.forEach(card => {
    card.removeEventListener('click', handleCardClick)
  })
}

// Unflips the given cards by removing the 'flipped' class
function unflipCards(card1, card2) {
  card1.classList.remove('flipped')
  card2.classList.remove('flipped')
}

// Updates the timer display and checks for game over conditions
function updateTimerDisplay() {
  const minutes = Math.floor(timerSeconds / 60)
  const seconds = timerSeconds % 60
  timerElement.textContent = `Timer: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`

  if (timerSeconds === 0) {
    showGameResult('Game Over! Time is up.')
    instructionsElement.style.display = 'none'
  } else if(matchedPairs === cardElements.length / 2) { 
    timerSeconds = 60
    return
  } else {
    timerSeconds--
    setTimeout(updateTimerDisplay, 1000)
  }
}
// Displays the game result message and handles game over conditions
function showGameResult(message) {
  if (message === 'Congratulations! You won!' || message === 'Game Over! Time is up.') {
    hideTimer()
    hideGameBoard()
  } else {
    showTimer()
  }

  messageElement.textContent = message
  playAgainBtn.style.display = 'block'
}

// Hides the timer element
function hideTimer() {
  timerElement.style.display = 'none'
}

// Displays the timer element
function showTimer() {
  timerElement.style.display = 'block'
}

// Hides the game board element
function hideGameBoard() {
  gameBoard.style.display = 'none'
}

// Resets the game state, shuffles the cards, and sets up the initial game display
function resetGame() {
  gameBoard.style.display = 'grid'
  playAgainBtn.style.display = 'none'
  messageElement.textContent = ''
  messageElement.style.display = 'block'
  flippedCards = []
  matchedPairs = 0
  timerSeconds = initialTimerSeconds
  showTimer()
  updateTimerDisplay()

  cardElements.forEach(card => {
    card.classList.remove('flipped')
    card.addEventListener('click', handleCardClick)
  })

  shuffleArray(cardElements)

  cardElements.forEach(card => {
    gameBoard.appendChild(card)
  })

  // Show instructions when the game is reset
  instructionsElement.style.display = 'block'
}

// Shuffles the given array using the Fisher-Yates algorithm
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Call the initialize function
initializeGame()