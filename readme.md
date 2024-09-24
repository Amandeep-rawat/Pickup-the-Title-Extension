# LinkedIn Profile Scraper

## Description
The **LinkedIn Profile Scraper** is a Chrome extension designed to automate the scraping of public LinkedIn profile data. It extracts essential information such as the user's name, about section, bio, location, follower count, and connection count. The collected data is then sent to a backend server for storage and analysis.

## Features
- Scrapes multiple LinkedIn profiles from an array of URLs.
- Collects the following data from each profile:
  - Name
  - About section
  - Bio
  - Location
  - Follower count
  - Connection count
- Sends the scraped data to a backend API for storage.

## Installation
1. Clone the repository or download the project files.
2. Open Chrome and go to `chrome://extensions/`.
3. Enable "Developer mode" by toggling the switch in the top right corner.
4. Click on "Load unpacked" and select the directory containing the extension files.
5. The extension will be added to your Chrome browser.

## Usage
1. Click on the extension icon in the Chrome toolbar.
2. In the popup, click the "Start" button to begin scraping the LinkedIn profiles.
3. The extension will scrape data from the specified profiles and send it to the backend.

## Backend API
The scraped data is sent to the following API endpoint:
- `POST http://localhost:3000/api/profile`

Ensure your backend server is running and configured to receive the data.

## Contributing
Contributions are welcome! If you have suggestions for improvements or new features, please feel free to submit a pull request.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments
- Thanks to the Chrome extension documentation and tutorials that helped guide the development of this project.
