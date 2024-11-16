# MERN CRUD Notes App

## Overview

Welcome to the Anonymous Notes - A MERN CRUD Anonymous Notes App! This is a full-stack application built using MongoDB, Express.js, React, and Node.js (the MERN stack) plus TailwindCSS. The app allows users to create, view, edit, and delete sticky notes without the need to log in. It's designed to provide a simple and intuitive interface for managing your notes and content. The main objective of this project is to get more familiar with the MERN stack and being more familiar with TailwindCSS.

## Features

- **Create Notes:** Users can easily create new sticky notes with customizable content.
- **View Notes:** All created notes are displayed in an organized list, making it easy to browse through them.
- **Edit Notes:** Users can update the content of their existing sticky notes.
- **Delete Notes:** Remove lengthy notes and sticky notes that are no longer needed.
- **No Login Required:** Enjoy the full functionality of the app without the need for authentication - do note rate limiting is implemented

## Technologies Used

- **MongoDB:** NoSQL database to store note data.
- **Express.js:** Web framework for Node.js to handle API operations.
- **React:** Frontend library for building the user interface.
- **Node.js:** JavaScript runtime for server-side development.
- **TailwindCSS:** an open-source CSS framework
- **Vite:** a JavaScript build tool that helps developers create modern web applications faster and more efficiently
- **TypeScript:** a Superset of JavaScript with type annotations

## Installation

To get started with the app, follow these steps:

1. **Clone the Repository:**

```bash
  git clone https://github.com/Hairum-Qureshi/mern-crud-notes-app.git
  cd "MERN CRUD Note App"
```

2. **Install Dependencies:**

- Navigate to the server directory and install API dependencies:

  ```bash
  cd API
  npm install
  ```

- Navigate to the client directory and install frontend dependencies:

  ```bash
  cd ../frontend
  npm install
  ```

3. **Configure Environment Variables:**

- Create a `.env` file in the `server` directory and add the following:

  ```
  MONGO_URI = your_mongodb_connection_string 
  ```

  ```
  PORT = 4000
  ```

  ```
  JWT_SECRET = your_jwt_secret
  ```

  ```
  NODE_ENV = "development"
  ```

  ```
  FRONTEND_URL = http://localhost:5173
  ```

  **This project also uses Nodemailer for the contact form functionality. In order to make that work, you will need the following variables:**
  ```
  EMAIL = your.email@gmail.com
  ```
  
  ```
  APP_PASS = your-google-app-password
  ```

- Create a `.env` file in the `frontend` directory (make sure it's **not** created inside of the `src` folder) and add the following:
 
  ```
  VITE_BACKEND_BASE_URL = "http://localhost:4000" 
  ```

  ```
  VITE_FRONTEND_BASE_URL = "http://localhost:5173"
  ```
  
4. **Run the Application:**

- Start the API server:

  ```bash
  cd API
  npm run dev
  ```

- In a new terminal window, start the frontend development server:

  ```bash
  cd ../frontend
  npm run dev
  ```

The application should now be running at `http://localhost:4000`.

For me, React's PORT started at 5174. If that's not the case for you and it's 5173, you will need to change the CORS configuration in `server.ts`. Replace the `corsOptions` code with:

```
const corsOptions = { 
	origin: ["http://localhost:5173", "http://localhost:5174"], // I just utilized my env variable "FRONTEND_URL" here instead of an array
	credentials: true,
	optionSuccessStatus: 200
};
```

## Usage

- **Create a Note:** Click on the "Add Note" button, enter your content, and save.
- **Edit a Note:** Click on the "Edit" button next to a note, update the content, and save changes.
- **Delete a Note:** Click on the "Delete" button next to a note to remove it.

## Node.js Version

This project uses Node.js version 20.11.1. To ensure compatibility and avoid potential issues, please use the same version. The required version is specified in the .nvmrc file located at the root of the repository.
If you are using Node Version Manager (NVM), you can easily switch to the correct version by running:

```
nvm install
nvm use
```

### Configuration for Deployment

When deploying the application, ensure you update the URLs in the client-side code to match your deployed environment:

- **API Base URL:** Update the base URL used to connect to the backend API. Replace any instances of http://localhost:4000 with the URL of your deployed API service; this can easily be done by updating the URL inside of the frontend `.env` file.
