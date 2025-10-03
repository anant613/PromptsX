# Prompt Share Hub
A community-driven platform for sharing and discovering AI prompts across different language models.

## Project Overview
This web application allows users to share, discover, and organize prompts used with various AI models like ChatGPT, DALL-E, Stable Diffusion, etc.

## Features
- User authentication and profiles
- CRUD operations for prompts
- Categories and tags for organizing prompts
- Voting and commenting system
- Search functionality
- Model-specific prompt templates
- Bookmark favorite prompts

## Tech Stack
- Frontend:
  - React.js
  - Tailwind CSS
  - JWT for authentication
- Backend:
  - Node.js
  - Express.js
  - MongoDB
- Deployment:
  - Vercel/Netlify for frontend
  - MongoDB Atlas for database

## Setup Instructions
1. Create a new project directory:
   ```bash
   mkdir prompt-web
   cd prompt-web
   ```
2. Initialize frontend:
   ```bash
   npx create-react-app client
   cd client
   npm install tailwindcss axios jwt-decode
   ```
3. Initialize backend:
   ```bash
   mkdir server
   cd server
   npm init -y
   npm install express mongoose cors jsonwebtoken bcryptjs dotenv
   ```
4. Set up environment variables:
   ```
   MONGODB_URI=mongodb://localhost:27017/promptshare
   PORT=5000
   JWT_SECRET=your-secret-key
   ```
5. Run development servers:
   ```bash
   # Terminal 1 - Frontend
   cd client
   npm start

   # Terminal 2 - Backend
   cd server
   node index.js
   ```

## Project Structure
```
prompt-web/
├── client/          # Frontend React application
├── server/          # Backend Node.js server
├── models/          # Database models
├── controllers/     # Route controllers
└── config/          # Configuration files
```

## API Endpoints
- `POST /api/prompts` - Create new prompt
- `GET /api/prompts` - Get all prompts
- `GET /api/prompts/:id` - Get specific prompt
- `PUT /api/prompts/:id` - Update prompt
- `DELETE /api/prompts/:id` - Delete prompt

## Contributing
Feel free to contribute by opening issues or submitting pull requests.

## License
MIT License
