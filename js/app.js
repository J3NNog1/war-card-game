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

document.getElementById('btn-1').addEventListener('click', ()=> handleClick())

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

function handleClick() {
  if (deck2.length > 0 )  {
    let randIdx = Math.floor(Math.random() * deck2.length)
    let cardPicked1 = deck2.splice(randIdx, 1)
    let cardPicked2 = deck4.splice(randIdx, 1)
    
    deck1.push(cardPicked1)
    deck3.push(cardPicked2)

    console.log(deck2, 'deck2')
    console.log(deck1, 'deck1')
    console.log(deck3, 'deck3')
    console.log(deck4, 'deck4')
  render()
  }
}
    

// Function to render deck state
function render(cardPicked1, cardPicked2) {
	 // Remove outline class when first card is picked
   // Removes previous picked card from deck 2 class list
   // Add current card picked to deck 2 element
	 // Adjust shadow when deck gets above/below halfway full
	 // Remove card back color and add outline when last card is picked
}