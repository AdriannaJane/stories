document.addEventListener('DOMContentLoaded', function () {
    const drawCardButton = document.getElementById('draw-card-button');
    const card = document.getElementById('card');
    const promptElement = document.getElementById('prompt');
    let seenPrompts = [];

    drawCardButton.addEventListener('click', function () {
        if (!card.classList.contains('flipped')) {
            card.classList.add('flipped');
            drawNewPrompt();
        } else {
            card.classList.remove('flipped');
            setTimeout(drawNewPrompt, 600); // Adjust this to match the duration of your flip transition
        }
    });

    function drawNewPrompt() {
        fetch('prompts.json')
            .then(response => response.json())
            .then(prompts => {
                console.log("Fetched Prompts: ", prompts); // Logging fetched prompts
                const availablePrompts = prompts.filter(prompt => !seenPrompts.includes(prompt));
                if (availablePrompts.length === 0) {
                    alert("No more prompts available!");
                    return;
                }
                const randomIndex = Math.floor(Math.random() * availablePrompts.length);
                const randomPrompt = availablePrompts[randomIndex];
                seenPrompts.push(randomPrompt);
                promptElement.textContent = randomPrompt;
            })
            .catch(error => {
                console.error('Error fetching prompts:', error); // Logging any fetch errors
            });
    }
});


// document.addEventListener('DOMContentLoaded', function () {
//     const drawCardButton = document.getElementById('draw-card-button');
//     const card = document.getElementById('card');
//     const promptElement = document.getElementById('prompt');
//     let seenPrompts = [];

//     drawCardButton.addEventListener('click', function () {
//         if (!card.classList.contains('flipped')) {
//             card.classList.add('flipped');
//             drawNewPrompt();
//         } else {
//             card.classList.remove('flipped');
//             // Optional: delay drawing a new prompt until card flips back
//             setTimeout(drawNewPrompt, 600);
//         }
//     });

//     function drawNewPrompt() {
//         fetch('prompts.json')
//             .then(response => response.json())
//             .then(prompts => {
//                 const availablePrompts = prompts.filter(prompt => !seenPrompts.includes(prompt));
//                 if (availablePrompts.length === 0) {
//                     alert("No more prompts available!");
//                     return;
//                 }
//                 const randomIndex = Math.floor(Math.random() * availablePrompts.length);
//                 const randomPrompt = availablePrompts[randomIndex];
//                 seenPrompts.push(randomPrompt);
//                 promptElement.textContent = randomPrompt;
//             })
//             .catch(error => console.error('Error:', error));
//     }
// });
