	/*----- constants -----*/
const initialTimerSeconds = 6000
const cardFlipDelay = 500
/*----- state variables -----*/
let flippedCards = []
let matchedPairs = 0
let timerSeconds = initialTimerSeconds
let cardElements
/*----- cached elements -----*/
const gameBoard = document.getElementById('board')
const timerDisplay = document.getElementById('timer')
/*----- event listeners -----*/
function flipCard() {
  const card = this

  // Avoid flipping more than two cards at a time or clicking on already matched cards
  if (flippedCards.length < 2 && !flippedCards.includes(card)) {
    // Show the image
    card.classList.add('flipped')
    flippedCards.push(card)

    if (flippedCards.length === 2) {
      setTimeout(checkMatch, cardFlipDelay); // Delay to show the second card before checking for a match
    }
  }
}
/*----- functions -----*/
function initializeGame() {
  // Convert cards to array and shuffle
  cardElements = Array.from(gameBoard.querySelectorAll('.card'))
  shuffleArray(cardElements)

  // Append shuffled cards back to the game board
  cardElements.forEach(card => {
    gameBoard.appendChild(card)
  })

  // Add event listener to each card
  cardElements.forEach(card => {
    card.addEventListener('click', flipCard);
  })

  updateTimerDisplay()
}

function checkMatch() {
  const [card1, card2] = flippedCards

  if (card1.innerHTML === card2.innerHTML) {
    // Match found
    console.log('Match found!')
    card1.removeEventListener('click', flipCard)
    card2.removeEventListener('click', flipCard)
    matchedPairs++

    if (matchedPairs === cardElements.length / 2) {
      alert('Congratulations! You won!')
      resetGame()
    }
  } else {
    // No match, hide the images 
    console.log('no match, hiding images')
    card1.classList.remove('flipped')
    card2.classList.remove('flipped')
  }

  flippedCards = []
}

function updateTimerDisplay() {
  const minutes = Math.floor(timerSeconds / 60)
  const seconds = timerSeconds % 60
  timerDisplay.textContent = `Timer: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`

  if (timerSeconds === 0) {
    alert('Game Over! Time is up.')
    resetGame()
  } else {
    timerSeconds--
    setTimeout(updateTimerDisplay, 1000) // Update every second
  }
}

function resetGame() {
  // Reset game state
  flippedCards = []
  matchedPairs = 0
  timerSeconds = initialTimerSeconds
  updateTimerDisplay()

  // Reset card state and shuffle
  cardElements.forEach(card => {
    card.classList.remove('flipped')
    gameBoard.appendChild(card)
  })
  shuffleArray(cardElements)
  cardElements.forEach(card => {
    gameBoard.appendChild(card)
  })

  // Add event listener to each card
  cardElements.forEach(card => {
    card.addEventListener('click', flipCard)
  })
}

// Fisher-Yates shuffle algorithm
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
// Call the initialize function
initializeGame()