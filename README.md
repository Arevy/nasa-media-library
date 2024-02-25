# Nasa Media Library Search

This **React-based application** enables users to explore and search NASA's extensive media library, offering detailed views of space imagery and information. It's designed to provide an intuitive user interface for accessing NASA's vast collection of space-related images and videos.

## Live Demo

[Visit the app](https://rainbow-zuccutto-a3279e.netlify.app/)

## Technology Stack

- **React.js**: A JavaScript library for building user interfaces.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **MobX**: A simple, scalable state management solution.
- **SCSS**: A preprocessor scripting language that is interpreted or compiled into Cascading Style Sheets (CSS).
- **Jest**: A delightful JavaScript Testing Framework with a focus on simplicity.

## Getting Started

### Prerequisites

- Node.js (v16.15.1 recommended)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Arevy/nasa-media-library.git
2. Navigate to the project directory:
   ```bash
   cd nasa-media-library
3. Install dependencies:
   ```bash
   npm install

## Available Scripts

- `npm start`: Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
- `npm test`: Launches the test runner in the interactive watch mode.
- `npm run build`: Builds the app for production to the `build` folder.
- `npm run eject`: Removes the single build dependency from your project.

## Features

- **Search Functionality**: Users can search through NASA's media library using specific criteria.
- **Detailed Views**: Provides detailed information about space imagery and videos.
- **Responsive Design**: Ensures a seamless experience across various devices and screen sizes.


## Project Overview

This application is a client-side React single-page application that allows users to search and view items from the NASA Media Library. It features a responsive design to ensure usability on mobile devices and includes basic tests for code reliability.

## Features and Instructions

- **Search Page**: Enables users to search the NASA Media Library via the `/search` endpoint, including filters for year start and year end. It includes input validations according to the API specification, a search button, and displays results with thumbnails, titles, location, and photographer's name, linking to detailed views.
- **Show Page**: Displays detailed information about a specific item from the search results, including title, location, photographer's name, description, keywords, date, and images from the collection. A back button is provided to return to the search results.

## Usage

To utilize this application:

1. Navigate to the search page to start exploring the NASA Media Library.
2. Enter your search criteria and optional year filters to narrow down results.
3. Click on a search result to view detailed information on the show page.

## API Reference

For more details on the API used for this project, refer to the NASA Media Library API documentation: [https://images.nasa.gov/docs/images.nasa.gov_api_docs.pdf](https://images.nasa.gov/docs/images.nasa.gov_api_docs.pdf)

## Additional Notes

- The application focuses on image collections (`media_type=image`).
- For detailed views, it selects unique images from the collection, prioritizing your preferences for image versions.

## Contributing

Contributions are welcome! Please open an issue first to discuss what you would like to change.

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Acknowledgments

- NASA API for providing access to their media library.
- Create React App documentation for guidance on setup and deployment.

## Created by

Aurelian Mihai
