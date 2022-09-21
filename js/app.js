// Declare deck variables
let deck1 = [];
let deck2 = [];
let deck3 = [];
let deck4 = [];
let cardToRemove1;
let cardToRemove2;
let p1Deck = [];
let p2Deck = [];
let p1War = [];
let p2War = [];

const masterDeck = ["dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"];

const masterDeckMap = {
  "dA" : 14,   "hA" : 14,  "cA" : 14,  "sA" : 14,
  "dQ" : 12,   "hQ" : 12,  "cQ" : 12,  "sQ" : 12,
  "dK" : 13,   "hK" : 13,  "cK" : 13,  "sK" : 13,
  "dJ" : 11,   "hJ" : 11,  "cJ" : 11,  "sJ" : 11,
  "d10" : 10, "h10" : 10, "c10" : 10, "s10" : 10,
  "d09" : 9,  "h09" : 9,  "c09" : 9,  "s09" : 9,
  "d08" : 8,  "h08" : 8,  "c08" : 8,  "s08" : 8,
  "d07" : 7,  "h07" : 7,  "c07" : 7,  "s07" : 7, 
  "d06" : 6,  "h06" : 6,  "c06" : 6,  "s06" : 6,
  "d05" : 5,  "h05" : 5,  "c05" : 5,  "s05" : 5,
  "d04" : 4,  "h04" : 4,  "c04" : 4,  "s04" : 4,
  "d03" : 3,  "h03" : 3,  "c03" : 3,  "s03" : 3,
  "d02" : 2,  "h02" : 2,  "c02" : 2,  "s02" : 2,

}

// Cached element references
let deck1El = document.getElementById("deck1");
let deck2El = document.getElementById("deck2");
let deck3El = document.getElementById("deck3");
let deck4El = document.getElementById("deck4");
let p1DeckEl = document.getElementById("p1Deck");
let p2DeckEl = document.getElementById("p2Deck");
let player1cards = document.querySelector(".player1cards");
let player2cards = document.querySelector(".player2cards");
let winMessage = document.getElementById("win-message");

// Event listeners

document.getElementById("btn-1").addEventListener("click", () => handleClick());

// Functions

init();

function init() {
  const shuffledDeck = shuffle([...masterDeck]);
  deck2 = shuffledDeck.slice(0, 26);
  deck4 = shuffledDeck.slice(26);
  player1cards.textContent = "26";
  player2cards.textContent = "26";
}

// Fischer-yates shuffle
function shuffle(array) {
  let j, x, i;
  for (i = array.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = array[i];
    array[i] = array[j];
    array[j] = x;
  }
  return array;
}

// Function to handle a button click:

function handleClick() {
  p1DeckEl.classList.remove(...p1DeckEl.classList);
  p2DeckEl.classList.remove(...p2DeckEl.classList);
  p1DeckEl.style.backgroundColor = "#c3c3c380";
  p2DeckEl.style.backgroundColor = "#c3c3c380";
  if (deck2.length > 0) {
    let cardPicked1 = deck2.pop();
    console.log(deck2.length, "deck2");
    let cardPicked2 = deck4.pop();
    console.log(deck4.length, "deck4");
    deck1.push(cardPicked1);
    deck3.push(cardPicked2);
    compareCards(cardPicked1, cardPicked2);
    render(cardPicked1, cardPicked2);
    player1cards.textContent = deck2.length;
    player2cards.textContent = deck4.length;
  }
  getWinner();
}

function compareCards(cardPicked1, cardPicked2) {
  if (masterDeckMap[cardPicked1] === masterDeckMap[cardPicked2]) {
    handleTie(cardPicked1, cardPicked2);
    winMessage.textContent = "It's a tie, that means War!";
  }
  if (masterDeckMap[cardPicked1] > masterDeckMap[cardPicked2]) {
    deck2.unshift(cardPicked1, cardPicked2);
    deck1 = [];
    deck3 = [];
    winMessage.textContent = "Player 1 has won this hand!";
  } else if (masterDeckMap[cardPicked2] > masterDeckMap[cardPicked1]) {
    deck4.unshift(cardPicked1, cardPicked2);
    deck1 = [];
    deck3 = [];
    winMessage.textContent = "Player 2 has won this hand!";
  }
}

function handleTie(cardPicked1, cardPicked2) {
  p1War = deck2.splice(deck2.length - 4, 4);
  p2War = deck4.splice(deck4.length - 4, 4);
  deck1.push(...p1War);
  deck3.push(...p2War);
  if (masterDeckMap[p1War.at(-1)] === masterDeckMap[p2War.at(-1)]) {
    handleTie();
    winMessage.textContent = "It's a tie, that means War... again!";
  }
  if (masterDeckMap[p1War.at(-1)] > masterDeckMap[p2War.at(-1)]) {
    deck2.unshift(...p1War, ...p2War);
    if (cardPicked1 !== undefined) {
      deck2.unshift(cardPicked1, cardPicked2);
    }
    p1Deck = [];
    p2Deck = [];
    deck1 = [];
    deck3 = [];
    cardPicked1 = "";
    cardPicked2 = "";
    winMessage.textContent = "Player 1 has won this War!";
  }
  if (masterDeckMap[p1War.at(-1)] < masterDeckMap[p2War.at(-1)]) {
    deck4.unshift(...p1War, ...p2War);
    if (cardPicked2 !== undefined) {
      deck4.unshift(cardPicked1, cardPicked2);
    }
    p1Deck = [];
    p2Deck = [];
    deck1 = [];
    deck3 = [];
    cardPicked1 = "";
    cardPicked2 = "";
    winMessage.textContent = "Player 2 has won this War!";
  }
  p1DeckEl.classList.add(p1War.at(-1));
  p2DeckEl.classList.add(p2War.at(-1));
  p1DeckEl.style.backgroundColor = "white";
  p2DeckEl.style.backgroundColor = "white";
  console.log(deck2.length);
}

function render(cardPicked1, cardPicked2) {
  deck1El.classList.remove("outline");
  deck3El.classList.remove("outline");

  deck1El.classList.remove(cardToRemove1);
  deck3El.classList.remove(cardToRemove2);

  cardToRemove1 = cardPicked1;
  cardToRemove2 = cardPicked2;

  deck1El.classList.add(cardPicked1);
  deck3El.classList.add(cardPicked2);

  p1DeckEl.classList.add("outline");
  p2DeckEl.classList.add("outline");
  p1DeckEl.classList.add("large");
  p2DeckEl.classList.add("large");
  p1DeckEl.classList.add("card");
  p2DeckEl.classList.add("card");

  if (deck2.length === 13) {
    deck1El.classList.add("shadow");
    deck3El.classList.add("shadow");
    deck2El.classList.remove("shadow");
    deck4El.classList.remove("shadow");
  }
  if (deck2.length === 0) {
    deck2El.classList.add("outline");
    deck4El.classList.add("outline");
    deck2El.classList.remove("back-blue");
    deck4El.classList.remove("back-blue");
  }
}

function renderBooks() {
  if (p1Deck.length === 0) {
    p1DeckEl.classList.add("outline");
    p1DeckEl.classList.remove("back-red");
  } else {
    p1DeckEl.classList.add(`card large ${p1Deck.at(-1)}`);
  }
  if (p2Deck.length === 0) {
    p2DeckEl.classList.add("outline");
    p2DeckEl.classList.remove("back-red");
  } else {
    p2DeckEl.className = `card large ${p2Deck.at(-1)}`;
  }
}

function getWinner() {
  if (deck2.length === 52 || deck4.length === 0) {
    winMessage.textContent = "Congratulations Player 1 has Won the Game";
  }
  if (deck4.length === 52 || deck2.length === 0) {
    winMessage.textContent = "Congratulations Player 2 has Won the Game";
  }
}

//*** DONE display the war cards
//*** DONE render my win message
//*** DONE make a condition if player runs out of cards they lose
