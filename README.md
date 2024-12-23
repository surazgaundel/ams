# Artist Management System (AMS)
This project is an Artist Management System (AMS) built with a React frontend and a Node.js/Express backend. It allows users to manage artists, users, and songs.

# Table of Contents
- Features
- Installation
- Usage
- API Endpoints

# Features
- User authentication (login/signup)
- Manage artists, users, and songs
- Pagination for listing items
- Import and export artists as CSV
- Responsive design

# Installation

Prerequisites
- Node.js (v14 or higher)
- MongoDB

Backend Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ams.git
cd ams/server
```

2. Install dependencies:
```bash
npm install
```
3. Create a .env file in the server directory with the following content:
```bash
PORT=4000
DB_CONNECT_URL=mongodb://127.0.0.1:27017/ams
ACCESS_TOKEN_KEY='YOUR_SECRET_KEY'
```
4. Start the backend server:
```bash
npm start
```

# Frontend Setup
1. Navigate to the client directory:
```bash
cd client
```
2. Install dependencies:
```bash
npm install
```
3. Start the frontend development server:
```bash
npm run dev
```

# Usage
1.Open your browser and navigate to http://localhost:5173.
2.Sign up or log in to access the dashboard.
3.Use the navigation bar to manage artists, users, and songs.

# API Endpoints
1. Authentication
- ``POST /auth/login`` - Login a user
- ``POST /auth/signup`` - Signup a new user

2. Users
- ``GET /users`` - Get all users with pagination
- ``POST /users`` - Create a new user
- ``PUT /users/:id`` - Update a user
- ``DELETE /users/:id`` - Delete a user

3. Artists
- ``GET /artists`` - Get all artists with pagination
- ``POST /artists`` - Create a new artist
- ``PUT /artists/:id`` - Update an artist
- ``DELETE /artists/:id`` - Delete an artist
- ``POST /artists/import`` - Import artists from CSV
- ``GET /artists/export`` - Export artists to CSV

4.Songs
- ``GET /musics`` - Get all songs with pagination
- ``GET /musics/artist/:artistId`` - Get all songs for a specific artist
-POST /musics/artist/:artistId - Add a new song for an artist
-PUT /musics/:id - Update a song
-DELETE /musics/:id - Delete a song

Image
Login:![image](https://github.com/user-attachments/assets/daebed55-4e27-4ba9-b8c1-7b20daff735f)
Dashboard:![image](https://github.com/user-attachments/assets/d29f407e-f173-4714-a217-218d821ada55)

