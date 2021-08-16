'use strict';

const gameContainer = document.getElementById("game");
let card1 = null;
let card2 = null;
let cardsFlipped = 0;
let noClicking = false;

let currentScore = Number(0);
// let cardFrontColor = "darkgray";

// Gets best score from localStorage or sets it to zero
let bestScore = JSON.parse(localStorage.getItem('bestScore')) || Number(0);

const currentScoreContainer = document.querySelector('#current-score');
currentScoreContainer.innerText = currentScore;


const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {

  for (let color of colorArray) {
    const newDiv = document.createElement("div");
    newDiv.classList.add(color);
    newDiv.addEventListener("click", handleCardClick);
    gameContainer.append(newDiv);
  }

    // <-------------MY CODE------------>
    // for (let color of colorArray) {

      // const newDiv = document.createElement('div');
      // newDiv.classList.add('memory-card');

      // const newFrontFace = document.createElement('div');
      //   newFrontFace.classList.add('front-face');
      //   newFrontFace.style.backgroundColor = color;

      // const newBackFace = document.createElement('div');
      //   newBackFace.classList.add('back-face');
      //   newBackFace.style.backgroundColor = 'darkgray';

     


    // append the div to the element with an id of game

    // <-------------ALSO MY CODE-------------->

     // call a function handleCardClick when a div is clicked on

      // newDiv.addEventListener("click", handleCardClick);

//     newDiv.append(newFrontFace);
//     newDiv.append(newBackFace);
//     gameContainer.append(newDiv);
//   }
// }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked

  //<-------------SOLUTION CODE--------------->
  if (noClicking) return;

  let currentCard = event.target;
  currentCard.style.backgroundColor = currentCard.classList[0];

  if (!card1 || !card2) {
    currentCard.classList.add("flip");
    card1 = card1 || currentCard;
    card2 = currentCard === card1 ? null : currentCard;
  }

  if (card1 && card2) {
    noClicking = true;
    // debugger
    let match1 = card1.className;
    let match2 = card2.className;

    if (match1 === match2) {
      cardsFlipped += 2;
      card1.removeEventListener("click", handleCardClick);
      card2.removeEventListener("click", handleCardClick);
      card1 = null;
      card2 = null;
      noClicking = false;
    } else {
      setTimeout(function() {
        card1.style.backgroundColor = "";
        card2.style.backgroundColor = "";
        card1.classList.remove("flip");
        card2.classList.remove("flip");
        card1 = null;
        card2 = null;
        noClicking = false;
      }, 1000);
    }
  }

  if (cardsFlipped === COLORS.length) alert("game over!");
}

// <-------------MY CODE--------------->
//   this.classList.toggle('flip');
//   let newFrontface = document.querySelector(".memory-card .flip");
//   let newFrontFace = document.querySelector(".memory-card .flip");


//   // cards.forEach(card => addEventListener('click', flipCard))
  
// }


// <-----------RESET BUTTON-------------->
const restartBtn = document.querySelector('#restart-btn');
restartBtn.addEventListener('click',function(event){
  window.location.reload();
});



// when the DOM loads
createDivsForColors(shuffledColors);
