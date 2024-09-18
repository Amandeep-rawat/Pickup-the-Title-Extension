document.getElementById('getTitleButton').addEventListener('click', () => {
    // Query the active tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        // Get the title of the active tab
        const tabTitle = tabs[0].title;
        // Display the title in the popup
        document.getElementById('title').textContent = `Tab Title: ${tabTitle}`;
    });
});
