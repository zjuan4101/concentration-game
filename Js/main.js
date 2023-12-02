	/*----- constants -----*/
const countdownDuration = 60
const icons = [
    'https://cdn2.iconfinder.com/data/icons/food-and-drink-free/24/Food_Drink_Foods_Hot_Dog_Sandwich_Junk_Food_Fast_Food-512.png',
    'https://cdn2.iconfinder.com/data/icons/food-and-drink-free/24/Food_Drink_Foods_Donut_Doughnut_Sweet_Dessert-512.png',
    'https://cdn2.iconfinder.com/data/icons/food-and-drink-free/24/Food_Drink_Foods_Pizza_Slice_Italian_Meal_-512.png',
    'https://cdn2.iconfinder.com/data/icons/food-and-drink-free/24/Food_Drink_Foods_Cake_Cup_Cake_Meal_Dessert_Sweet-512.png',
    'https://cdn2.iconfinder.com/data/icons/food-and-drink-free/24/Food_Drink_Foods_Burger_Hamburger_Meal_Fast_Food-512.png',
    'https://cdn2.iconfinder.com/data/icons/food-and-drink-free/24/Food_Drink_Foods_Noodle_Ramen_Bowl_Meal-512.png',
    'https://cdn2.iconfinder.com/data/icons/food-and-drink-free/24/Food_Drink_Foods_Bread_Bakery_Breakfast_Meal-07-512.png',
    'https://cdn2.iconfinder.com/data/icons/food-and-drink-free/24/Food_Drink_Foods_Soup_Meal_Vegetable_Dinner-512.png'
]
const cards = icons.concat(icons)

	/*----- state variables -----*/
let countdown = countdownDuration
let selectedCards = []
let matchedPairs = 0
let board //arrays within an array to represent the rows and colums
	/*----- cached elements  -----*/
const countdownInterval = setInterval(updateCountdown, 1000)
const gameBoard = document.getElementById('board')
for (let i = 0; cards.length; i++) {
    const card = document.querySelectorAll('.container')
    card.setAttribute('data-index', i)
    card.addEventListener('click', flipCard)
    gameBoard.appendChild(card)
}
	/*----- event listeners -----*/
const playAgainBtn = document.getElementById('play-again').addEventListener('click', resetTimer)
// const boxEls = document.querySelectorAll('.container').addEventListener('click', revealIcon)
	/*----- functions -----*/
    init()
cards.sort(() => Math.random() - 0.5)
    function init() {
        board = [
            [0, 0, 0, 0], // col 0
            [0, 0, 0, 0], // col 1
            [0, 0, 0, 0], // col 2
            [0, 0, 0, 0]  // col 3
            //r0 r1 r2 r3
        ]
    }
   // Initialize the countdown
   function startCountdown() {
    countdownInterval = setInterval(updateCountdown, 1000)
  }

  // Update the countdown every second
  function updateCountdown() {
    document.getElementById('timer').innerHTML = formatTime(countdown)

    if (countdown <= 0) {
      clearInterval(countdownInterval);
      document.getElementById('timer').innerHTML = 'Out of Time!'
    } else {
      countdown--;
    }
  }

  // Reset the timer
  function resetTimer() {
    clearInterval(countdownInterval);
    countdown = countdownDuration;
    document.getElementById('timer').innerHTML = formatTime(countdown)
  }

  // Function to format time in minutes:seconds format
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`
  }
  // Start the countdown when the page loads
  window.onload = startCountdown

  function revealIcon(evt) {
    const colIdx = boxEls.indexOf(evt.target)
    const colArr = board[colIdx]
    const rowIdx = colArr.indexOf(0)
  }
  function flipCard() {
    const index = parseInt(this.getAttribute('data-index'))
    if (selectedCards.length < 2 && !selectedCards.includes(index)) {
        this.innerHTML = cards[index]
        if (selectedCards.length === 2) {
            setTimeout(checkMatch, 500)
        }
    }
  }
  function checkMatch() {
    const [index1, index2] = selectedCards
    const card1 = document.querySelector(`[data-index='${index1}']`)
    const card2 = document.querySelector(`[data-index='${index2}']`)

    if (cards[index1] === cards[index2]) {
        //Matched
        card1.removeEventListener('click', flipCard)
        card2.removeEventListener('click', flipCard)
        matchedPairs++

        if (matchedPairs === icons.length) {
            alert('Congradulations! You won the game!')
        }
    } else {
        // Not matched
        card1.innerHTML = ''
        card2.innerHTML = ''
    }
    selectedCards = []
  }