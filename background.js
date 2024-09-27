

// Listen for the message from popup.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'startScraping') {
        const likeCount = request.likeCount; // Get like count from popup
        const commentCount = request.commentCount; // Get comment count from popup
        



        // Check if a LinkedIn feed tab is already open
        chrome.tabs.query({ url: 'https://www.linkedin.com/feed/' }, (tabs) => {
            if (tabs.length > 0) {
                // If the LinkedIn feed tab is open, focus on it
                chrome.tabs.update(tabs[0].id, { active: true }, () => {
                    console.log('LinkedIn feed tab is already open. Focusing on it.');



                    // Inject content script into the active LinkedIn tab
                    chrome.scripting.executeScript({
                        target: { tabId: tabs[0].id },
                        files: ['content.js']
                    }, () => {
                        // Send message to content script to start interactions
                        chrome.tabs.sendMessage(tabs[0].id, { action: 'startInteractions', likeCount, commentCount }, (response) => {
                            if (chrome.runtime.lastError) {
                                console.error('Error sending message to content script:', chrome.runtime.lastError.message);
                            } else {
                                console.log('Response from content script:', response);
                            }
                        });
                    });
                });
            } else {
                // If no LinkedIn feed tab is open, create a new one
                chrome.tabs.create({ url: 'https://www.linkedin.com/feed/' }, (tab) => {
                    // Wait for the LinkedIn feed tab to load
                    chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
                        if (tabId === tab.id && changeInfo.status === 'complete') {
                            console.log('LinkedIn feed loaded');

                            // Inject content script into the new LinkedIn tab
                            chrome.scripting.executeScript({
                                target: { tabId: tab.id },
                                files: ['content.js']
                            }, () => {




                                
                                // Send message to content script to start interactions
                                chrome.tabs.sendMessage(tab.id, { action: 'startInteractions', likeCount, commentCount }, (response) => {
                                    if (chrome.runtime.lastError) {
                                        console.error('Error sending message to content script:', chrome.runtime.lastError.message);
                                    } else {
                                        console.log('Response from content script:', response);
                                    }
                                });
                            });

                            // Remove the listener once the tab is loaded
                            chrome.tabs.onUpdated.removeListener(listener);
                        }
                    });
                });
            }
        });

        return true; // Keeps the message channel open for async response
    }
});
