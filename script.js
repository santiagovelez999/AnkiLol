
let currentIndex = 0;

const flashcard = document.getElementById("flashcard");
const front = document.getElementById("front");
const back = document.getElementById("back");

// Hacer flip de la carta
flashcard.addEventListener("click", () => {
    flashcard.classList.toggle("flipped");
});

// Cambiar entre módulos (Estudiar / Agregar)
function showModule(module) {
    document.getElementById("study").style.display = "none";
    document.getElementById("add").style.display = "none";
    document.getElementById(module).style.display = "block";
}

// Pasar a la siguiente carta
function nextCard() {
    if (cards.length === 0) return;
    currentIndex = (currentIndex + 1) % cards.length;
    updateCard();
    flashcard.classList.remove("flipped"); // reinicia a frente
}

// Actualizar carta en pantalla
function updateCard() {
    if (cards.length > 0) {
        front.textContent = cards[currentIndex].word;
        back.textContent = cards[currentIndex].translation;
    }
}

// Agregar palabra desde el formulario
function addCard(event) {
    event.preventDefault();
    const word = document.getElementById("newWord").value.trim();
    const translation = document.getElementById("newTranslation").value.trim();

    if (word && translation) {
        cards.push({ word, translation });
        document.getElementById("newWord").value = "";
        document.getElementById("newTranslation").value = "";
        alert("Palabra agregada con éxito ✅");
    }
}

// Mostrar la primera carta al inicio
updateCard();
