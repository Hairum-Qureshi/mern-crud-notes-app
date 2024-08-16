# MERN CRUD Notes App

## Overview

Welcome to the Anonymous Notes - A MERN CRUD Anonymous Notes App! This is a full-stack application built using MongoDB, Express.js, React, and Node.js (the MERN stack) plus TailwindCSS. The app allows users to create, view, edit, and delete sticky notes without the need to log in. It's designed to provide a simple and intuitive interface for managing your notes and content. The main objective of this project is to get more familiar with the MERN stack and being more familiar with TailwindCSS.

## Features

- **Create Notes:** Users can easily create new sticky notes with customizable content.
- **View Notes:** All created notes are displayed in an organized list, making it easy to browse through them.
- **Edit Notes:** Users can update the content of their existing sticky notes.
- **Delete Notes:** Remove sticky notes that are no longer needed.
- **No Login Required:** Enjoy the full functionality of the app without the need for authentication - do note rate limiting is implemented

## Technologies Used

- **MongoDB:** NoSQL database to store sticky notes data.
- **Express.js:** Web framework for Node.js to handle backend operations.
- **React:** Frontend library for building the user interface.
- **Node.js:** JavaScript runtime for server-side development.
- **TailwindCSS:** an open-source CSS framework

## Installation

To get started with the app, follow these steps:

1. **Clone the Repository:**

```bash
  git clone https://github.com/Hairum-Qureshi/mern-crud-notes-app.git
  cd "MERN CRUD Note App"
```

2. **Install Dependencies:**

- Navigate to the server directory and install backend dependencies:

  ```bash
  cd backend
  npm install
  ```

- Navigate to the client directory and install frontend dependencies:

  ```bash
  cd ../frontend
  npm install
  ```

3. **Configure Environment Variables:**

- Create a `.env` file in the `server` directory and add your MongoDB connection string:

  ```
  MONGO_URI=your_mongodb_connection_string
  ```

  ```
  PORT=4000
  ```

  ```
  JWT_SECRET=your_jwt_secret
  ```

4. **Run the Application:**

- Start the backend server:

  ```bash
  cd server
  npm start
  ```

- In a new terminal window, start the frontend development server:

  ```bash
  cd client
  npm start
  ```

The application should now be running at `http://localhost:4000`.

## Usage

- **Create a Note:** Click on the "Add Note" button, enter your content, and save.
- **Edit a Note:** Click on the "Edit" button next to a note, update the content, and save changes.
- **Delete a Note:** Click on the "Delete" button next to a note to remove it.

### Configuration for Deployment

When deploying the application, ensure you update the URLs in the client-side code to match your deployed environment:

- **API Base URL:** Update the base URL used to connect to the backend API. Replace any instances of http://localhost:4000 with the URL of your deployed backend service.
