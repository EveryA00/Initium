# Express Backend for Juice Store

This Express backend provides authentication and user management APIs for the juice store application.

## 🚀 Features

### Authentication
- **User Registration** (`POST /api/auth/signup`)
- **User Login** (`POST /api/auth/signin`)
- **Profile Management** (`GET /api/auth/me`, `PUT /api/auth/profile`)
- **JWT Token Authentication**
- **Password Hashing with bcrypt**

### User Management (Admin)
- **Get All Users** (`GET /api/users`)
- **Get User by ID** (`GET /api/users/:id`)
- **Update User** (`PUT /api/users/:id`)
- **Delete User** (`DELETE /api/users/:id`)
- **Activate/Deactivate Users** (`POST /api/users/:id/activate`, `POST /api/users/:id/deactivate`)

### Security Features
- **Rate Limiting** (100 requests per 15 minutes, 5 auth requests per 15 minutes)
- **CORS Protection**
- **Helmet Security Headers**
- **Input Validation & Sanitization**
- **Password Strength Requirements**
- **JWT Token Expiration**

## 📁 Project Structure

```
next-backend/
├── express-server.js          # Main Express server
├── config/
│   └── database.js           # MongoDB connection
├── models/
│   └── User.js              # User model with validation
├── routes/
│   ├── auth.js              # Authentication routes
│   └── users.js             # User management routes
├── middleware/
│   ├── auth.js              # JWT authentication middleware
│   └── validation.js        # Input validation middleware
└── .env.example             # Environment variables template
```

## 🛠️ Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Create a `.env` file in the root directory:
```bash
# Server Configuration
NODE_ENV=development
EXPRESS_PORT=3001
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/juice-store

# Security
BCRYPT_ROUNDS=12

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
AUTH_RATE_LIMIT_MAX_REQUESTS=5

# CORS
ALLOWED_ORIGINS=http://localhost:3000
```

### 3. MongoDB Setup
Make sure MongoDB is running locally or update the `MONGODB_URI` in your `.env` file.

### 4. Start the Servers

#### Option 1: Run Both Servers (Recommended)
```bash
npm run dev:both
```

#### Option 2: Run Servers Separately
```bash
# Terminal 1 - Next.js Frontend
npm run dev

# Terminal 2 - Express Backend
npm run dev:api
```

## 🔌 API Endpoints

### Authentication Routes

#### POST /api/auth/signup
Create a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Account created successfully!",
  "data": {
    "user": {
      "_id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "isEmailVerified": false,
      "isActive": true,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    },
    "token": "jwt_token_here"
  }
}
```

#### POST /api/auth/signin
Authenticate user and get access token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Signed in successfully!",
  "data": {
    "user": {
      "_id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "lastLogin": "2024-01-01T00:00:00.000Z"
    },
    "token": "jwt_token_here"
  }
}
```

#### GET /api/auth/me
Get current user profile (requires authentication).

**Headers:**
```
Authorization: Bearer jwt_token_here
```

#### PUT /api/auth/profile
Update user profile (requires authentication).

**Headers:**
```
Authorization: Bearer jwt_token_here
```

**Request Body:**
```json
{
  "name": "John Updated",
  "email": "john.updated@example.com"
}
```

### User Management Routes (Admin Only)

#### GET /api/users
Get all users with pagination.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Headers:**
```
Authorization: Bearer admin_jwt_token_here
```

#### GET /api/users/:id
Get user by ID.

#### PUT /api/users/:id
Update user by ID.

#### DELETE /api/users/:id
Delete user by ID.

#### POST /api/users/:id/activate
Activate a deactivated user.

#### POST /api/users/:id/deactivate
Deactivate a user.

## 🔒 Security Features

### Password Requirements
- Minimum 8 characters
- At least one lowercase letter
- At least one uppercase letter
- At least one number

### Rate Limiting
- General API: 100 requests per 15 minutes
- Authentication: 5 requests per 15 minutes

### JWT Token
- Expires in 7 days
- Includes user ID for authentication

### Input Validation
- Email format validation
- Name length validation (2-50 characters)
- Password strength validation
- Input sanitization

## 🧪 Testing

Run the test suite:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

Generate coverage report:
```bash
npm run test:coverage
```

## 🚨 Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "errors": ["Detailed error messages"] // Optional
}
```

Common HTTP Status Codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (invalid/missing token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `429` - Too Many Requests (rate limited)
- `500` - Internal Server Error

## 🔧 Development

### Adding New Routes
1. Create route file in `routes/` directory
2. Import and use in `express-server.js`
3. Add validation middleware if needed
4. Add authentication middleware if required

### Database Schema Updates
1. Update the User model in `models/User.js`
2. Add validation rules
3. Update API responses if needed

### Environment Variables
Add new variables to `.env.example` and document their purpose.

## 📊 Health Check

Check if the server is running:
```bash
curl http://localhost:3001/api/health
```

Response:
```json
{
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "environment": "development"
}
```

## 🚀 Production Deployment

1. Set `NODE_ENV=production`
2. Use a strong `JWT_SECRET`
3. Configure MongoDB connection string
4. Set up proper CORS origins
5. Use environment-specific rate limiting
6. Set up monitoring and logging

## 🤝 Contributing

1. Follow the existing code structure
2. Add proper error handling
3. Include input validation
4. Write tests for new features
5. Update documentation

## 📝 License

This project is part of the Juice Store application. 