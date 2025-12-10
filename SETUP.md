# BlueStar Frontend Setup Guide

## Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure the API URL**

   Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

   Edit `.env` and set your Rails backend URL:
   ```
   VITE_API_URL=http://localhost:3000
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`

## Backend Requirements

Make sure your Rails backend is running and accessible at the URL specified in your `.env` file.

### Required Backend Routes

The frontend expects these endpoints to be available:

- Authentication:
  - `POST /signup`
  - `POST /login`
  - `GET /me`

- Observations:
  - `GET /observations`
  - `GET /observations/:id`
  - `POST /observations`
  - `PATCH /observations/:id`
  - `DELETE /observations/:id`

- Reference Data:
  - `GET /star_patterns`
  - `GET /star_patterns/:id`
  - `GET /wave_patterns`
  - `GET /wave_patterns/:id`
  - `GET /bird_migrations`
  - `GET /bird_migrations/:id`

### CORS Configuration

Ensure your Rails backend allows CORS requests from your frontend origin. Add this to your Rails `config/initializers/cors.rb`:

```ruby
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'http://localhost:5173', 'http://127.0.0.1:5173'

    resource '*',
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head],
      credentials: false
  end
end
```

And add the rack-cors gem to your Gemfile:
```ruby
gem 'rack-cors'
```

## Testing the Application

1. **Sign Up**: Create a new account at `/signup`
2. **Login**: Access your account at `/login`
3. **Dashboard**: View all navigation patterns at `/dashboard`
4. **Observations**:
   - View your observations at `/observations`
   - Create new observations at `/observations/new`
   - Edit existing observations by clicking the Edit button

## Troubleshooting

### "Network Error" on API requests
- Check that your Rails backend is running
- Verify the `VITE_API_URL` in `.env` matches your backend URL
- Ensure CORS is properly configured in Rails

### JWT token issues
- Clear your browser's localStorage
- Log out and log back in
- Check that your Rails backend is returning the JWT token correctly

### Styling issues
- Clear your browser cache
- Make sure all CSS files are properly imported

## Features Included

- Animated starry background
- Rotating compass animation
- Palm tree silhouettes with sway animation
- Responsive design for mobile and desktop
- Protected routes requiring authentication
- Full CRUD operations for observations
- Real-time form validation
- Error handling and user feedback

## Browser Support

The application works best in modern browsers:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

Enjoy navigating with BlueStar!
