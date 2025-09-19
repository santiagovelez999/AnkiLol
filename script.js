document.addEventListener('DOMContentLoaded', () => {
    let cards = [];
    let currentIndex = 0;

    let shuffled = [];
    let shuffleIndex = 0;

    const categorySelect = document.getElementById('categorySelect');
    const flashcard = document.getElementById('flashcard');
    const front = document.getElementById('front');
    const back = document.getElementById('back');
    const nextBtn = document.querySelector('.next-btn');

    function safeIsArray(x) {
        return Array.isArray(x);
    }

    function showEmptyState() {
        if (front) front.textContent = "No hay tarjetas 😢";
        if (back) back.textContent = "";
        if (flashcard) flashcard.classList.remove('flipped');
    }

    function shuffleCards() {
        shuffled = cards.slice();
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        shuffleIndex = 0;
    }

    // --- cargar categoría ---
    function loadCategory(key) {
        if (!categories || Object.keys(categories).length === 0) {
            cards = [];
            showEmptyState();
            return;
        }

        let realKey = Object.keys(categories).find(
            k => k.toLowerCase() === String(key).toLowerCase()
        );
        if (!realKey) realKey = Object.keys(categories)[0];

        const candidate = categories[realKey];
        if (!safeIsArray(candidate)) {
            console.warn(`La categoría '${realKey}' no es un array`, candidate);
            cards = [];
            showEmptyState();
            return;
        }

        cards = candidate.slice();
        if (cards.length === 0) {
            showEmptyState();
            return;
        }

        shuffleCards();
        nextCard();
    }

    window.addCategory = function (name, items = []) {
        if (!name || typeof name !== 'string') {
            console.warn('addCategory: nombre inválido');
            return;
        }
        const key = name.trim();
        categories[key] = Array.isArray(items) ? items : [];
        updateSelectOptions(key);
        loadCategory(key);
    };

    function updateSelectOptions(selectedKey) {
        if (!categorySelect) return;
        categorySelect.innerHTML = "";
        Object.keys(categories || {}).forEach(key => {
            const opt = document.createElement('option');
            opt.value = key;
            opt.textContent = key.charAt(0).toUpperCase() + key.slice(1);
            categorySelect.appendChild(opt);
        });
        if (selectedKey && categories[selectedKey]) {
            categorySelect.value = selectedKey;
        }
    }

    function nextCard() {
        if (!safeIsArray(cards) || cards.length === 0) {
            showEmptyState();
            return;
        }

        if (shuffleIndex >= shuffled.length) {
            shuffleCards();
        }

        const card = shuffled[shuffleIndex];
        currentIndex = cards.indexOf(card);
        updateCard();
        if (flashcard) flashcard.classList.remove('flipped');

        shuffleIndex++;
    }

    function updateCard() {
        if (!safeIsArray(cards) || cards.length === 0) {
            showEmptyState();
            return;
        }
        const c = cards[currentIndex] || {};
        front.textContent = c.word || "";
        back.textContent = c.translation || "";
    }

    if (flashcard) {
        flashcard.addEventListener('click', () => flashcard.classList.toggle('flipped'));
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', nextCard);
    }
    if (categorySelect) {
        categorySelect.addEventListener('change', (e) => {
            loadCategory(e.target.value);
        });
    }

    updateSelectOptions();
    const firstKey = Object.keys(categories || {})[0];
    if (categorySelect && firstKey) categorySelect.value = firstKey;
    loadCategory(firstKey);
});
