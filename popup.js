




// Get the button and input field elements
const startButton = document.getElementById('start');
const likeCountInput = document.getElementById('likeCount');
const commentCountInput = document.getElementById('commentCount'); // New line for comment count input





// Function to check if the inputs are valid and enable/disable the button
function checkInputValidity() {
    const likeCount = parseInt(likeCountInput.value);
    const commentCount = parseInt(commentCountInput.value);

    if (!isNaN(likeCount) && likeCount > 0 && !isNaN(commentCount) && commentCount > 0) {
        startButton.disabled = false; // Enable button if valid input
    } else {
        startButton.disabled = true; // Disable button if invalid input
    }
}

// Add event listener to input fields to check validity on input change
likeCountInput.addEventListener('input', checkInputValidity);
commentCountInput.addEventListener('input', checkInputValidity);

// Add click listener to the start button to begin scraping
startButton.addEventListener('click', () => {
    const likeCount = parseInt(likeCountInput.value);
    const commentCount = parseInt(commentCountInput.value);

    // Send a message to the background script to start scraping
    chrome.runtime.sendMessage({ action: 'startScraping', likeCount, commentCount }, (response) => {
        if (response && response.success) {
            console.log('Scraping started successfully.');
            startButton.disabled = true; // Optionally disable button after starting
            likeCountInput.value = ''; // Clear input after starting
            commentCountInput.value = ''; // Clear comment count input after starting
        } else {
            console.error('Error starting scraping:', chrome.runtime.lastError);
            alert('Failed to start scraping. Please try again.');
        }
    });
});
