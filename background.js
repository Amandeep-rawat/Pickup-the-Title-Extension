// Array of LinkedIn profile URLs
const profileUrls = [
    'https://www.linkedin.com/in/pulkit-dham-371aa4171/',
    'https://www.linkedin.com/in/manvvi-ahuja-958566285/',
    'https://www.linkedin.com/in/anmol-thusoo/',
    // Add more profiles as needed
];

// Listen for the message from popup.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'scrapeLinkedIn') {
        scrapeProfiles();  // Call the function to scrape all profiles
        sendResponse({ success: true });
        return true; // Keeps the message channel open for async response
    }
});

// Function to scrape multiple profiles
async function scrapeProfiles() {
    for (const profileUrl of profileUrls) {
        await openAndScrapeProfile(profileUrl);
    }
}

// Function to open a profile and scrape data
function openAndScrapeProfile(profileUrl) {
    return new Promise((resolve) => {
        // Create or update tab with the LinkedIn profile
        chrome.tabs.query({ url: profileUrl }, (tabs) => {
            if (tabs.length > 0) {
                // Tab already open, activate and scrape
                chrome.tabs.update(tabs[0].id, { active: true }, () => {
                    console.log('Existing tab activated');
                    scrapeLinkedInProfile(tabs[0].id);
                    resolve();  // Resolve the promise when scraping is done
                });
            } else {
                // Tab not open, create a new one and scrape after loading
                chrome.tabs.create({ url: profileUrl }, (tab) => {
                    console.log('New tab created');
                    chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
                        if (tabId === tab.id && changeInfo.status === 'complete') {
                            console.log('Profile tab loaded');
                            scrapeLinkedInProfile(tab.id);
                            chrome.tabs.onUpdated.removeListener(listener);
                            resolve();  // Resolve the promise when scraping is done
                        }
                    });
                });
            }
        });
    });
}

// Function to scrape LinkedIn profile data (already defined earlier)
function scrapeLinkedInProfile(tabId) {
    chrome.scripting.executeScript({
        target: { tabId: tabId },
        function: scrapeProfileData
    });
}

// Scraping function (keep this similar to what you have)
function scrapeProfileData() {
    // Scrape name
    const nameElement = document.querySelector('h1.text-heading-xlarge.inline.t-24.v-align-middle.break-words');
    const name = nameElement ? nameElement.innerText : 'Not found';
    console.log('Scraped name:', name);

    // Scrape about section
    const aboutElement = document.querySelector('.inline-show-more-text--is-collapsed span[aria-hidden="true"]');
    const about = aboutElement ? aboutElement.innerText.trim() : 'Not available';
    console.log('Scraped about:', about);
    
    // Scrape bio
    const bioElement = document.querySelector('.text-body-medium.break-words');
    const bio = bioElement ? bioElement.innerText.trim() : 'Not available';
    console.log('Scraped bio:', bio);

    // Scrape location
    const locationElement = document.querySelector('.text-body-small.inline.t-black--light.break-words');
    const location = locationElement ? locationElement.innerText.trim() : 'Location not found';
    console.log('Scraped location:', location);

    // Scrape follower count
    const followerCountElement = document.querySelector('.pvs-header__optional-link span[aria-hidden="true"]');
    const followerCount = followerCountElement ? followerCountElement.innerText.replace(/\D/g, '') : '0';
    console.log('Scraped follower count:', followerCount);

    // Scrape connection count
    const connectionCountElement = document.querySelector('.t-black--light .t-bold');
    const connectionCount = connectionCountElement ? connectionCountElement.innerText.replace(/\D/g, '') : '0';
    console.log('Scraped connection count:', connectionCount);

    // Scrape the URL
    const url = window.location.href;
    console.log('Scraped URL:', url);

    // Send the scraped data to the backend
    fetch('http://localhost:3000/api/profile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            url: url,
            about: about,
            bio: bio,
            location: location,
            followerCount: followerCount,
            connectionCount: connectionCount
        })
    })
    .then(response => response.json())
    .then(data => console.log('Profile saved:', data))
    .catch(error => console.error('Error:', error));
}
