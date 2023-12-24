
// document.addEventListener('DOMContentLoaded', function () {
//     const drawCardButton = document.getElementById('draw-card-button');
//     const topCard = document.getElementById('top-card');
//     const promptElement = document.getElementById('prompt');
//     let seenPrompts = [];
//     let prompts = []; // Array to store your prompts
//     let isFirstLoad = true; // Flag to track the first interaction
//     let isDragging = false;
//     let startX, startY, endX, endY;

//     // Load initial prompts
//     loadPrompts();

//     // Function to flip the card to show the back
//     function flipCardToShowBack() {
//         if (!topCard.classList.contains('flipped')) {
//             topCard.classList.add('flipped');
//         }
//     }

//     // Function to handle card click
//     function onCardClick() {
//         if (topCard.classList.contains('flipped')) {
//             if (!isFirstLoad) {
//                 flyAway(1000, 0); // Fly off-screen if it's not the first load
//             }
//         } else {
//             flipCardToShowBack();
//         }
//         isFirstLoad = false;
//     }

//     topCard.addEventListener('click', onCardClick);

//     // // Function to draw a new card
//     // function drawNewCard() {
//     //     flyAway(1000, 0);
//     // }



//     drawCardButton.addEventListener('click', onCardClick);

//     // Load prompts
//     function loadPrompts() {
//         fetch('prompts.json')
//             .then(response => response.json())
//             .then(data => {
//                 prompts = data;
//                 loadNewPrompt(promptElement);
//             })
//             .catch(error => {
//                 console.error('Error fetching prompts:', error);
//             });
//     }

//     function loadNewPrompt(element) {
//         const newPrompt = getNextPrompt();
//         if (newPrompt) {
//             element.textContent = newPrompt;
//         }
//     }

//     function getNextPrompt() {
//         const availablePrompts = prompts.filter(prompt => !seenPrompts.includes(prompt));
//         if (availablePrompts.length === 0) {
//             alert("No more prompts available!");
//             return null;
//         }
//         const randomIndex = Math.floor(Math.random() * availablePrompts.length);
//         const randomPrompt = availablePrompts[randomIndex];
//         seenPrompts.push(randomPrompt);
//         return randomPrompt;
//     }

//     // Drag functionality for the top card
//     topCard.addEventListener('mousedown', startDrag);
//     topCard.addEventListener('touchstart', startDrag);

//     function startDrag(e) {
//         isDragging = true;
//         startX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
//         startY = e.type.includes('mouse') ? e.pageY : e.touches[0].pageY;
//         topCard.classList.add('dragging');

//         document.addEventListener('mousemove', onDragging);
//         document.addEventListener('touchmove', onDragging);
//         document.addEventListener('mouseup', stopDrag);
//         document.addEventListener('touchend', stopDrag);
//     }

//     function onDragging(e) {
//         if (!isDragging) return;
//         let currentX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
//         let currentY = e.type.includes('mouse') ? e.pageY : e.touches[0].pageY;

//         let deltaX = currentX - startX;
//         let deltaY = currentY - startY;

//         topCard.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
//     }

//     function stopDrag(e) {
//         endX = e.type.includes('mouse') ? e.pageX : e.changedTouches[0].pageX;
//         endY = e.type.includes('mouse') ? e.pageY : e.changedTouches[0].pageY;

//         let deltaX = endX - startX;
//         let deltaY = endY - startY;

//         if (Math.abs(deltaX) > 50 || Math.abs(deltaY) > 50) { // Threshold for drag
//             flyAway(deltaX, deltaY);
//         } else {
//             resetDragState();
//         }
//     }

//     function resetDragState() {
//         isDragging = false;
//         topCard.classList.remove('dragging');
//         topCard.style.removeProperty('transform');
//         document.removeEventListener('mousemove', onDragging);
//         document.removeEventListener('touchmove', onDragging);
//         document.removeEventListener('mouseup', stopDrag);
//         document.removeEventListener('touchend', stopDrag);
//     }

//     function flyAway(deltaX, deltaY) {
//         isDragging = false;
//         topCard.classList.remove('dragging');
//         topCard.style.transition = 'transform 0.5s, opacity 0.5s';
//         topCard.style.transform = `translate(${deltaX * 3}px, ${deltaY * 3}px)`;
//         topCard.style.opacity = '0';

//         setTimeout(() => {
//             resetTopCard();
//         }, 500);
//     }

//     function resetTopCard() {
//         topCard.remove();
//         topCard.style.removeProperty('transform');
//         topCard.style.removeProperty('opacity');
//         topCard.style.removeProperty('transition');
//         document.getElementById('card-container').appendChild(topCard);
//         topCard.classList.remove('flipped');
//         loadNewPrompt(promptElement);
//     }
// });

document.addEventListener('DOMContentLoaded', function () {
    const drawCardButton = document.getElementById('draw-card-button');
    const topCard = document.getElementById('top-card');
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
            // Only flip the card on the first load
            flipCard();
            isFirstLoad = false;
        } else {
            // Load next prompt without flipping if card is already flipped
            if (topCard.classList.contains('flipped')) {
                loadNextPrompt();
            } else {
                flipCard();
                setTimeout(loadNextPrompt, 600); // Delay to load next prompt after flipping
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
