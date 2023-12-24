document.addEventListener('DOMContentLoaded', function () {
    const drawCardButton = document.getElementById('draw-card-button');
    const topCard = document.getElementById('top-card');
    const bottomCard = document.getElementById('bottom-card'); // Reference to the bottom card
    const promptElement = document.getElementById('prompt');
    let seenPrompts = [];
    let prompts = []; // Array to store your prompts
    let isFirstLoad = true; // Flag to track the first interaction

    // Load initial prompts
    loadPrompts();

    // Function to flip the card
    function flipCard() {
        topCard.classList.toggle('flipped');
    }

    // Function to draw a new card
    function drawNewCard() {
        if (isFirstLoad) {
            flipCard();
            isFirstLoad = false;
            bottomCard.style.display = 'none'; // Hide the bottom card after the first flip
        } else {
            if (!topCard.classList.contains('flipped')) {
                flipCard();
                setTimeout(loadNextPrompt, 600);
            } else {
                loadNextPrompt();
            }
        }
    }

    topCard.addEventListener('click', drawNewCard);
    drawCardButton.addEventListener('click', drawNewCard);

    // Load prompts
    function loadPrompts() {
        fetch('prompts.json')
            .then(response => response.json())
            .then(data => {
                prompts = data;
                loadNewPrompt(promptElement);
            })
            .catch(error => {
                console.error('Error fetching prompts:', error);
            });
    }

    function loadNewPrompt(element) {
        const newPrompt = getNextPrompt();
        if (newPrompt) {
            element.textContent = newPrompt;
        }
    }

    function loadNextPrompt() {
        loadNewPrompt(promptElement);
        if (!topCard.classList.contains('flipped')) {
            flipCard();
        }
    }

    function getNextPrompt() {
        const availablePrompts = prompts.filter(prompt => !seenPrompts.includes(prompt));
        if (availablePrompts.length === 0) {
            alert("No more prompts available!");
            return null;
        }
        const randomIndex = Math.floor(Math.random() * availablePrompts.length);
        const randomPrompt = availablePrompts[randomIndex];
        seenPrompts.push(randomPrompt);
        return randomPrompt;
    }
});
