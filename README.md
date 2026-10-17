
# COMP3123 Assignment 1

## Project Description

A RESTful Employee Management API developed using Node.js, Express.js, MongoDB Atlas, and Mongoose.

The application supports user authentication and employee management using JSON Web Tokens (JWT).

## Technologies Used

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JSON Web Tokens (JWT)
- bcryptjs
- express-rate-limit
- Morgan
- Helmet
- CORS
- Postman
- Vercel

## Features

- User signup and login
- Password hashing using bcryptjs
- JWT authentication
- Create employee
- Retrieve all employees
- Retrieve employee by ID
- Update employee
- Delete employee
- Employee ownership protection
- API rate limiting
- Request logging
- Centralized error handling
- Health-check endpoint
- Vercel deployment

## Installation

1. Clone the repository.
2. Open the project folder.
3. Install dependencies:

   `npm install`

4. Copy `.env.example` to `.env`.
5. Update `.env` with your MongoDB Atlas connection string and JWT secret.
6. Start the server:

   `node src/server.js`

The application runs locally on:

http://localhost:8081

## Environment Variables

```env
PORT=8081
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
```

For Vercel deployment, configure `MONGODB_URI` and `JWT_SECRET` in the Vercel Environment Variables settings.

## API Endpoints

### User Authentication

POST /api/v1/user/signup

POST /api/v1/user/login

### Employee Management

POST /api/v1/emp/employees

GET /api/v1/emp/employees

GET /api/v1/emp/employees/:id

PUT /api/v1/emp/employees/:id

DELETE /api/v1/emp/employees?eid=EMPLOYEE_ID

Employee endpoints require JWT authentication.

Authorization header:

`Bearer YOUR_JWT_TOKEN`

## Health Check

GET /health

Returns a JSON response indicating that the server is running.

## Security

- Passwords are hashed before storage.
- JWT tokens protect employee endpoints.
- Users can only access their own employees.
- Rate limiting restricts repeated API requests.
- Helmet provides additional HTTP security headers.

## Logging

HTTP requests are recorded locally in:

`logs/access.log`

The logs folder is excluded from Git.

When deployed on Vercel, HTTP requests are logged to the Vercel deployment logs instead of a local file.

## Testing

The API was tested using Postman.

Tests include:

- Successful signup and login
- Invalid login credentials
- Duplicate registration
- Employee creation and retrieval
- Employee updates and deletion
- Invalid employee IDs
- Missing JWT tokens
- Unauthorized employee access
- Employee ownership protection
- Health-check endpoint
- Invalid routes
- Rate limiting (429 Too Many Requests)
- Helmet security response headers

The exported Postman collection is included in:

`postman_collection.json`

## Vercel Deployment

The COMP3123 Assignment 1 REST API is deployed on Vercel and uses MongoDB Atlas for database storage.

**Live API:**

https://101571040-comp-3123-assignment1.vercel.app

### Verified Endpoints

The following endpoints were successfully tested on Vercel using Postman:

- `GET /health` — Health check (200 OK)
- `POST /api/v1/user/login` — User login (200 OK)
- `GET /api/v1/emp/employees` — Retrieve employees with JWT authentication (200 OK)

The deployed API successfully connects to MongoDB Atlas and supports JWT authentication and employee retrieval.

## Author

Jenifa Joseph

Student ID: 101571040

George Brown Polytechnic
