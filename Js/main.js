	/*----- constants -----*/
const countdownDuration = 60
const icons = {
    '0': 'https://cdn2.iconfinder.com/data/icons/food-and-drink-free/24/Food_Drink_Foods_Hot_Dog_Sandwich_Junk_Food_Fast_Food-512.png',
    '1': 'https://cdn2.iconfinder.com/data/icons/food-and-drink-free/24/Food_Drink_Foods_Donut_Doughnut_Sweet_Dessert-512.png',
    '2': 'https://cdn2.iconfinder.com/data/icons/food-and-drink-free/24/Food_Drink_Foods_Pizza_Slice_Italian_Meal_-512.png',
    '3': 'https://cdn2.iconfinder.com/data/icons/food-and-drink-free/24/Food_Drink_Foods_Cake_Cup_Cake_Meal_Dessert_Sweet-512.png',
    '4': 'https://cdn2.iconfinder.com/data/icons/food-and-drink-free/24/Food_Drink_Foods_Burger_Hamburger_Meal_Fast_Food-512.png',
    '5': 'https://cdn2.iconfinder.com/data/icons/food-and-drink-free/24/Food_Drink_Foods_Noodle_Ramen_Bowl_Meal-512.png',
    '6': 'https://cdn2.iconfinder.com/data/icons/food-and-drink-free/24/Food_Drink_Foods_Bread_Bakery_Breakfast_Meal-07-512.png',
    '7': 'https://cdn2.iconfinder.com/data/icons/food-and-drink-free/24/Food_Drink_Foods_Soup_Meal_Vegetable_Dinner-512.png'
}

	/*----- state variables -----*/
let countdown = countdownDuration
let randomIcon //number between 0-7 to refer to which image is used
let board //arrays within an array to represent the rows and colums
	/*----- cached elements  -----*/
const countdownInterval = setInterval(updateCountdown, 1000)

	/*----- event listeners -----*/
document.getElementById('play-again').addEventListener('click', resetTimer)
document.querySelectorAll('.container').addEventListener('click', revealIcon)
	/*----- functions -----*/
    init()

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

  function revealIcon() {

  }