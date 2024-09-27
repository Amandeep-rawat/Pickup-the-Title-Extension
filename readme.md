# LinkedIn Profile Scraper Chrome Extension

## Overview

This project is a Chrome extension that automates interactions with LinkedIn posts. It allows users to automatically like posts and add comments. The extension can be configured to interact with a set number of posts by adjusting the input fields for likes and comments.

## Features

- **Automatic Liking**: Automatically like a specified number of LinkedIn posts.
- **Automatic Commenting**: Automatically comment on a set number of posts.
- **Easy Configuration**: Input fields to specify the number of likes and comments.
- **Real-Time Interaction**: Runs in the background while interacting with the open LinkedIn feed.

## Files

- `manifest.json`: Defines the permissions, content scripts, and background worker for the extension.
- `popup.html`: The popup UI that allows users to input the number of likes and comments.
- `popup.js`: Handles user input and sends messages to the background script to start scraping.
- `background.js`: Manages tab creation, ensures the LinkedIn feed is open, and injects the content script.
- `content.js`: Handles the actual interaction with the LinkedIn posts, including liking and commenting.
- `icon.png`: The extension icon displayed in the Chrome toolbar.

## How It Works

1. **Popup Interface**: The user sets the number of likes and comments in the popup and clicks the start button.
2. **Background Script**: The `background.js` ensures the LinkedIn feed is open and ready for interaction, injecting `content.js` into the page.
3. **Content Script**: `content.js` iterates over the posts in the LinkedIn feed, performing the likes and comments as per the user's input.
4. **Interaction Completion**: Once the set number of interactions is complete, the extension notifies the user through the console.
