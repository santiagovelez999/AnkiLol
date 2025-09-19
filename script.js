let currentIndex = 0;
const HISTORY_SIZE = 3;
let recentHistory = [];

const flashcard = document.getElementById("flashcard");
const front = document.getElementById("front");
const back = document.getElementById("back");

flashcard.addEventListener("click", () => {
    flashcard.classList.toggle("flipped");
});

function nextCard() {
    if (cards.length === 0) return;

    let newIndex;
    let attempts = 0;
    do {
        newIndex = Math.floor(Math.random() * cards.length);
        attempts++;
        if (attempts > 10) break; // evita bucle infinito
    } while ((newIndex === currentIndex || recentHistory.includes(newIndex)) && cards.length > 1);

    currentIndex = newIndex;
    updateCard();
    flashcard.classList.remove("flipped");

    recentHistory.push(currentIndex);
    if (recentHistory.length > HISTORY_SIZE) {
        recentHistory.shift();
    }
}

function updateCard() {
    if (cards.length > 0) {
        front.textContent = cards[currentIndex].word;
        back.textContent = cards[currentIndex].translation;
    }
}

updateCard();