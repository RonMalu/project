# BlueStar - Micronesian Wayfinding Navigator

An interactive React frontend for the BlueStar wayfinding application, connecting to a Ruby on Rails backend. This application helps users track and record traditional Micronesian navigation observations including star patterns, wave patterns, and bird migrations.

## Features

- **Authentication**: Secure JWT-based login and signup
- **Dashboard**: View all available star patterns, wave patterns, and bird migrations
- **Observations Management**: Create, view, edit, and delete your navigation observations
- **Beautiful UI**: Themed with starry backgrounds, animated compass, and palm tree silhouettes
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- React 18
- React Router DOM for routing
- Axios for API requests
- Vite for fast development and building
- CSS3 with custom animations

## Prerequisites

- Node.js (v16 or higher)
- Running Ruby on Rails backend API

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

3. Update the `.env` file with your Rails backend API URL:
```
VITE_API_URL=http://localhost:3000
```

## Running the Application

Development mode:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## Project Structure

```
src/
├── components/         # Reusable components
│   ├── Compass.jsx
│   ├── Navbar.jsx
│   ├── PalmTrees.jsx
│   ├── ProtectedRoute.jsx
│   └── StarryBackground.jsx
├── context/           # React context providers
│   └── AuthContext.jsx
├── pages/            # Page components
│   ├── Dashboard.jsx
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── ObservationForm.jsx
│   ├── Observations.jsx
│   └── Signup.jsx
├── services/         # API services
│   └── api.js
└── styles/           # CSS files
    ├── Auth.css
    ├── Compass.css
    ├── Dashboard.css
    ├── Home.css
    ├── Navbar.css
    ├── ObservationForm.css
    ├── Observations.css
    └── PalmTrees.css
```

## API Integration

The app connects to your Rails backend with the following endpoints:

- `POST /signup` - User registration
- `POST /login` - User authentication
- `GET /me` - Get current user
- `GET /observations` - Get all observations
- `POST /observations` - Create observation
- `PATCH /observations/:id` - Update observation
- `DELETE /observations/:id` - Delete observation
- `GET /star_patterns` - Get all star patterns
- `GET /wave_patterns` - Get all wave patterns
- `GET /bird_migrations` - Get all bird migrations

## Authentication

The app uses JWT tokens stored in localStorage. The token is automatically included in all API requests via an Axios interceptor.

## Contributing

This is a custom frontend for the BlueStar wayfinding system. Make sure your Rails backend is running before starting the frontend development server.
# project
