# Search Extractor

**Search Extractor** is a web application that allows users to query multiple APIs, aggregate responses, and save selected results. It combines a clean frontend with a Node.js backend to provide fast and structured access to information from multiple sources.

## Features

- Query multiple APIs simultaneously:
  - **Wikipedia**
  - **HackerNews**
  - **OpenLibrary**
  - **GitHub**
- Responses are mapped into structured objects and displayed in tables.
- Users can select individual rows from any table and save them as a JSON file.
- Option to save **all rows from all four tables** at once.
- Interactive and intuitive interface with Angular frontend and Express backend.

## Tech Stack

- **Frontend:** Angular
- **Backend:** Express.js running on Node.js
- **Data Format:** JSON
- **APIs Integrated:** Wikipedia, HackerNews, OpenLibrary, GitHub

## Installation

1. Clone the repository:  
   https://github.com/Pajuman/Search-extractor.git
2. Navigate to the project directory:  
   cd search-extractor/backend
3. Install dependencies:  
   npm install

## Running Locally

Start the Node.js server:  
node server.js

## Usage

1. Enter your query in the search input.
2. Select which APIs to query.
3. Submit the search.
4. Results from each API will appear in separate tables.
5. You can:

- Select individual rows to save to a JSON file.
- Save all rows from all four tables at once.

The output is saved in a **JSON format** suitable for further processing or storage.

## Notes

- Ensure you have **Node.js and npm installed**.
- No additional API keys are required for the default APIs used.

