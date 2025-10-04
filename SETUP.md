# Prompt Share Hub - Complete Setup Guide

## Quick Start

1. **Install Dependencies:**
   ```bash
   # Backend
   cd backend
   npm install

   # Frontend
   cd ../frontend
   npm install
   ```

2. **Environment Setup:**
   - Backend `.env` is already configured with MongoDB Atlas
   - No additional setup needed

3. **Start the Application:**
   ```bash
   # Option 1: Use the startup script (Windows)
   double-click start.bat

   # Option 2: Manual start
   # Terminal 1 - Backend
   cd backend
   npm run dev

   # Terminal 2 - Frontend
   cd frontend
   npm start
   ```

4. **Access the Application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5002

## Features Implemented

### Authentication
- ✅ User registration and login
- ✅ JWT token-based authentication
- ✅ Protected routes
- ✅ User profile management

### Prompt Management
- ✅ Create, read, update, delete prompts
- ✅ Categories: ChatGPT, Midjourney, DALL-E, Coding, Writing, Marketing, Other
- ✅ Tags system
- ✅ Public/private prompts
- ✅ Rich text prompt editor

### Social Features
- ✅ Like/unlike prompts
- ✅ View counts
- ✅ User profiles with prompt history
- ✅ Author attribution

### Search & Discovery
- ✅ Search by title, description, tags
- ✅ Filter by category
- ✅ Sort by newest, most popular, most liked
- ✅ Responsive grid layout

### User Interface
- ✅ Modern, responsive design with Tailwind CSS
- ✅ Mobile-friendly interface
- ✅ Loading states and error handling
- ✅ Intuitive navigation

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Prompts
- `GET /api/prompts` - Get all public prompts (with filters)
- `POST /api/prompts` - Create new prompt (protected)
- `GET /api/prompts/:id` - Get specific prompt
- `PUT /api/prompts/:id` - Update prompt (protected)
- `DELETE /api/prompts/:id` - Delete prompt (protected)
- `POST /api/prompts/:id/like` - Toggle like (protected)
- `GET /api/prompts/my/prompts` - Get user's prompts (protected)

## Database Schema

### User Model
- username, email, password
- profilePicture, bio, role
- savedPrompts array
- Password hashing with bcrypt

### Prompt Model
- title, promptText, description
- category, tags array
- author reference, likes array
- views count, isPublic flag
- timestamps

## Tech Stack

### Frontend
- React.js 19.2.0
- Tailwind CSS 4.1.14
- Axios for API calls
- JWT decode for authentication
- Context API for state management

### Backend
- Node.js with Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- CORS enabled

### Database
- MongoDB Atlas (cloud database)
- Pre-configured connection string

## Usage Instructions

1. **Register/Login:** Create an account or login with existing credentials
2. **Browse Prompts:** View all public prompts on the home page
3. **Search & Filter:** Use the search bar and filters to find specific prompts
4. **Create Prompts:** Click "Create" to add new prompts with categories and tags
5. **Manage Prompts:** View and edit your prompts in "My Prompts" section
6. **Interact:** Like prompts and view detailed prompt information

## Development Notes

- Frontend runs on port 3000
- Backend runs on port 5002
- Database is hosted on MongoDB Atlas
- All API calls are configured for the correct backend URL
- Authentication tokens are stored in localStorage
- Responsive design works on mobile and desktop

The application is now fully functional and ready for use!