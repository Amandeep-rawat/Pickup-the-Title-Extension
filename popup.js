document.getElementById('start').addEventListener('click', () => {
    console.log('Start button clicked');
    
    // Message the background script to start scraping
    chrome.runtime.sendMessage({ action: 'scrapeLinkedIn' }, (response) => {
        if (response.success) {
            console.log('Scraping started successfully');
        } else {
            console.error('Failed to start scraping:', response.error);
        }
    });
});
