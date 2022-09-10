// Declare deck variables
let deck1 = []
let deck2 = []
let deck3 = []
let deck4 = []
let cardToRemove

const masterDeck = ["dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"]

// Cached element references
let deck1El = document.getElementById('deck1')
let deck2El = document.getElementById('deck2')
let deck3El = document.getElementById('deck3')
let deck4El = document.getElementById('deck4')


console.log(deck1El, deck2El, deck3El, deck4El)
// Event listeners

document.getElementById('btn-1').addEventListener('click', ()=> console.log('clicked'))
document.getElementById('btn-2').addEventListener('click', ()=> console.log('clicked'))

// Functions

init()



function init() {
  const shuffledDeck = shuffle([...masterDeck])
  deck2 = shuffledDeck.slice(0, 26)
  deck4 = shuffledDeck.slice(26)
}

function shuffle(array) {
  let j, x, i;
  for (i = array.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = array[i];
      array[i] = array[j];
      array[j] = x;
  }
  return array
}

// Function to handle a button click:
    // Randomly select number from total cards remaining
    // Assign card with the random index to a variable
    // Add card picked to deck 2
    // Pass card picked to render function to display


// Function to render deck state
	 // Remove outline class when first card is picked
   // Removes previous picked card from deck 2 class list
   // Add current card picked to deck 2 element
	 // Adjust shadow when deck gets above/below halfway full
	 // Remove card back color and add outline when last card is picked
