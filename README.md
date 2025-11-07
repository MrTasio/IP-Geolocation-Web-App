# IP Geolocation Web App

A simple web application to search and display IP address geolocation information on an interactive map.

## Features
- User authentication (login/logout)
- Search any IP address
- View location on interactive map
- Search history with localStorage
- Responsive design (mobile & desktop)

## Tech Stack
- **Frontend**: React, Material-UI, Leaflet
- **Backend**: Node.js, Express
- **Database**: PostgreSQL (Neon)
- **Authentication**: JWT

## Installation

### Prerequisites
- Node.js installed
- Neon PostgreSQL account (free at https://neon.tech)

### Step 1: Clone the Repository
```bash
git clone <your-repo-url>
cd Ip-Geo-Location
```

### Step 2: Setup Backend
```bash
cd backend
npm install
```

Create a `.env` file in the backend folder:
```
PORT=8000
JWT_SECRET=your_secret_key_here
NODE_ENV=development
DATABASE_URL=your_neon_connection_string_here
```

Setup the database:
```bash
npm run setup
npm run seed
```

Start the backend server:
```bash
npm run dev
```

### Step 3: Setup Frontend
Open a new terminal:
```bash
cd frontend
npm install
```

Create a `.env` file in the frontend folder:
```
REACT_APP_API_URL=http://localhost:8000
```

Start the frontend:
```bash
npm start
```

### Step 4: Access the App
Open your browser and go to: `http://localhost:3000`

## Test Credentials
- **Email**: test@example.com
- **Password**: password123

## How to Use
1. Login with the test credentials
2. The app will show your current IP location on the map
3. Use the search bar to look up any IP address
4. Click on search history to revisit previous searches
5. Click the logout button (top-right) to logout
