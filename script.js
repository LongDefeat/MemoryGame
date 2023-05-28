"use strict";

const gameContainer = document.getElementById("game");
let card1 = null;
let card2 = null;
let cardsFlipped = 0;
let noClicking = false;

let currentScore = Number(0);
// let cardFrontColor = "darkgray";

// Gets best score from localStorage or sets it to zero
let bestScore = JSON.parse(localStorage.getItem("bestScore")) || Number(0);

const currentScoreContainer = document.querySelector("#current-score");
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
  "purple",
];

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

function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement("div");
    newDiv.classList.add(color);
    newDiv.addEventListener("click", handleCardClick);
    gameContainer.append(newDiv);
  }
}

function handleCardClick(event) {
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
      setTimeout(function () {
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
// Animate heading colors
function animateHeading() {
  const h1 = document.querySelector("h1");
  const text = h1.innerText;
  const colors = [
    "#FF0000",
    "#FF7F00",
    "#FFFF00",
    "#00FF00",
    "#0000FF",
    "#8B00FF",
  ];

  let animatedText = "";
  for (let i = 0; i < text.length; i++) {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    animatedText += `<span style="color: ${randomColor}">${text[i]}</span>`;
  }

  h1.innerHTML = animatedText;
}

animateHeading();
setInterval(animateHeading, 3000); // Change colors every 3 seconds

// RESET BUTTON
const restartBtn = document.querySelector("#restart-btn");
restartBtn.addEventListener("click", function (event) {
  window.location.reload();
});

// when the DOM loads
createDivsForColors(shuffledColors);
