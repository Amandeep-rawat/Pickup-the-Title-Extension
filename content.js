


// Function to interact with LinkedIn posts
async function performInteractions(likeCount, commentCount) {




    const posts = document.querySelectorAll('.feed-shared-update-v2');
    let likesDone = 0;
    let commentsDone = 0;



    // Function to pause execution for a given number of milliseconds
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));





    // Iterate through each post
    for (let index = 0; index < posts.length; index++) {
        const post = posts[index];
        const authorNameElement = post.querySelector('span.update-components-actor__name');
        const authorName = authorNameElement ? authorNameElement.innerText : "Unknown Author";
// Like logic
        if (likesDone < likeCount) {
           
           
           
           
            const likeButton = post.querySelector('button[aria-label="React Like"], button[aria-label="Unreact Like"]');

            
            if (likeButton) {
                console.log("opening like button ")
                console.log("like button is this ",likeButton)
                await delay(5000);
                likeButton.click(); // Simulate click
                console.log(`Liked post ${index + 1} by ${authorName}`);
                await delay(2000);
                if (likeButton.getAttribute('aria-pressed') === 'true') {
                    console.log(`Successfully liked post ${index + 1} by ${authorName}`);
                } else {
                    console.log(`Failed to like post ${index + 1} by ${authorName}. Retrying...`);
                    likeButton.click(); // Retry click if necessary
                }

                likesDone++;
                await delay(5000); // Additional delay to allow for processing    
            
            } else {
                console.log(`No like button found for post ${index + 1} by ${authorName}`);
            }
        }

        // Comment logic
        if (commentsDone < commentCount) {
            const commentButton = post.querySelector('button[aria-label="Comment"]');

            if (commentButton) {
                console.log("opening comment button ")
                commentButton.click(); // Open comment box
                await delay(500); // Wait for the comment box to appear

                const commentInput = post.querySelector('.ql-editor p');
                
                if (commentInput || postButton) {
                    commentInput.innerHTML = 'CFBR';
                    await delay(2000) 
                    const postButton = post.querySelector('.comments-comment-box__submit-button.mt3.artdeco-button.artdeco-button--1.artdeco-button--primary.ember-view');
                    console.log("this is post button ",postButton)
                    postButton.click(); // Submit the comment
                    console.log(`Commented on post ${index + 1} by ${authorName}`);
                    commentsDone++;
                    await delay(1000); // Wait a bit to ensure the comment is submitted
                } else {
                    console.log(`No comment input or submit button found for post ${index + 1} by ${authorName}`);
                }
            } else {
                console.log(`No comment button found for post ${index + 1} by ${authorName}`);
            }
        }

        // Stop the loop if both likeCount and commentCount have been fulfilled
        if (likesDone >= likeCount && commentsDone >= commentCount) {
            break; // Exit the loop early if done
        }
    }

    // Notify background script that the interaction is complete
    chrome.runtime.sendMessage({ action: 'interactionComplete', likesDone, commentsDone });
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'startInteractions') {
        performInteractions(request.likeCount, request.commentCount);
        sendResponse({ success: true });
    }
});
