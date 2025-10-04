# Postman Test URLs

## Base URL
```
http://localhost:5002
```

## Quick Test Links

### 1. Health Check
```
GET http://localhost:5002/
```

### 2. Register User
```
POST http://localhost:5002/api/auth/register
Content-Type: application/json

{
  "username": "testuser",
  "email": "test@example.com", 
  "password": "password123"
}
```

### 3. Login User
```
POST http://localhost:5002/api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}
```

### 4. Get All Prompts
```
GET http://localhost:5002/api/prompts
```

### 5. Create Prompt (Need Token)
```
POST http://localhost:5002/api/prompts
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "title": "Test Prompt",
  "promptText": "Write a story about...",
  "description": "A test prompt",
  "category": "Writing",
  "tags": ["test", "story"]
}
```

## Import Collection
Import file: `Postman_Collection.json`