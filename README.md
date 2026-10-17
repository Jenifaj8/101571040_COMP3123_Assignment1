
# COMP3123 Assignment 1

## Project Description

A RESTful Employee Management API developed using Node.js, Express.js, MongoDB Atlas, and Mongoose.

The application supports user registration, authentication, and employee management using JSON Web Tokens (JWT). Each authenticated user can manage their own employee records.

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
- Input validation
- API rate limiting
- Request logging
- Centralized error handling
- Health-check endpoint
- Vercel deployment

## Project Architecture

The application follows a modular Express.js structure.

- **Server:** Configures Express, middleware, database connectivity, and API routes.
- **Routes:** Define the endpoints for user authentication and employee management.
- **Controllers:** Process API requests and return responses.
- **Models:** Define MongoDB schemas using Mongoose.
- **Middleware:** Handles authentication, security, rate limiting, logging, and errors.
- **Database:** MongoDB Atlas stores user and employee records.

This structure separates responsibilities and makes the application easier to maintain.

## Installation

1. Clone the repository:

   `git clone https://github.com/Jenifaj8/101571040_COMP3123_Assignment1.git`

2. Open the project folder:

   `cd 101571040_COMP3123_Assignment1`

3. Install dependencies:

   `npm install`

4. Copy `.env.example` to `.env`.

5. Update `.env` with your MongoDB Atlas connection string and JWT secret.

6. Start the server:

   `node src/server.js`

The application runs locally at:

http://localhost:8081

## Environment Variables

Create a `.env` file using the following structure:

```env
PORT=8081
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
```

The `.env` file is excluded from GitHub to protect sensitive information.

For Vercel deployment, configure `MONGODB_URI` and `JWT_SECRET` in the Vercel Environment Variables settings.

## API Endpoints

### User Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/user/signup` | Register a new user |
| POST | `/api/v1/user/login` | Authenticate a user and return a JWT |

### Employee Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/emp/employees` | Create an employee |
| GET | `/api/v1/emp/employees` | Retrieve all employees belonging to the user |
| GET | `/api/v1/emp/employees/:id` | Retrieve an employee by ID |
| PUT | `/api/v1/emp/employees/:id` | Update an employee |
| DELETE | `/api/v1/emp/employees?eid=EMPLOYEE_ID` | Delete an employee |

All employee endpoints require JWT authentication.

### Authorization Header

Include the JWT token in the request headers:

`Authorization: Bearer YOUR_JWT_TOKEN`

## JWT Authentication

The application uses JSON Web Tokens (JWT) to protect employee endpoints.

When a user successfully logs in, the API generates a JWT token.

The client must include this token in the Authorization header when making requests to protected employee endpoints.

The authentication middleware verifies the token before allowing access.

Requests with missing or invalid tokens are rejected.

## Employee Ownership Protection

Each employee record is associated with the user who created it.

The application uses the authenticated user's identity to restrict access to employee records.

Users can retrieve, update, and delete only their own employees.

For example, User 2 cannot retrieve, update, or delete employee records belonging to User 1.

This prevents unauthorized access to another user's data.

## Input Validation

The API validates incoming request data before processing it.

Validation includes:

- Required fields for user registration and login
- Valid email formats
- Duplicate user registration
- Required employee information
- Valid employee IDs
- Valid salary values
- Missing or invalid authentication tokens

Invalid requests return appropriate HTTP error responses, such as:

- `400 Bad Request`
- `401 Unauthorized`
- `404 Not Found`
- `409 Conflict`

## Security

The application includes several security features:

- Passwords are hashed using bcryptjs before storage.
- JWT authentication protects employee endpoints.
- Employee ownership prevents users from accessing other users' records.
- Helmet adds HTTP security headers.
- CORS middleware supports cross-origin requests.
- Rate limiting restricts repeated API requests.

### API Rate Limiting

Rate limiting helps protect the API from excessive requests and potential abuse.

The application uses `express-rate-limit` with the following configuration:

- **Time window:** 15 minutes
- **Maximum requests:** 100 requests per client within the time window
- **Protected endpoints:** API routes covered by the rate-limiting middleware

When a client exceeds the configured limit, the server responds with:

`429 Too Many Requests`

Rate limiting was tested using Postman by temporarily lowering the request limit to confirm the `429` response. The limit was then restored to 100 requests.

## Health Check

**Endpoint:**

`GET /health`

The health-check endpoint returns a JSON response indicating that the server is running.

Example response:

```json
{
  "status": "OK",
  "message": "Server is running"
}
```

## Request Logging

The application uses Morgan middleware to record HTTP requests.

When running locally, request logs are saved in:

`logs/access.log`

The logs include request methods, endpoints, status codes, and other request information.

The logs folder is excluded from GitHub.

When deployed on Vercel, request information is written to the Vercel deployment logs instead of a local log file.

## API Testing

The API was tested using Postman.

### User Authentication Tests

- Successful user registration — `201 Created`
- Missing registration fields — `400 Bad Request`
- Duplicate registration — `409 Conflict`
- Invalid email format — `400 Bad Request`
- Successful login — `200 OK`
- Incorrect password — `401 Unauthorized`
- Missing login fields — `400 Bad Request`
- User not found — `401 Unauthorized`

### Employee Management Tests

- Create employee — `201 Created`
- Create employee without JWT — `401 Unauthorized`
- Retrieve all employees — `200 OK`
- Retrieve employee by ID — `200 OK`
- Invalid employee ID — `400 Bad Request`
- Employee not found — `404 Not Found`
- Update employee — `200 OK`
- Invalid salary — `400 Bad Request`
- Delete employee — `204 No Content`
- Retrieve deleted employee — `404 Not Found`

### Authorization Tests

Two test users were created to verify employee ownership.

- User 2 cannot retrieve User 1's employee.
- User 2 cannot update User 1's employee.
- User 2 cannot delete User 1's employee.
- User 2 retrieves an empty employee list when no employees belong to that user.

### Server and Security Tests

- Health-check endpoint — `200 OK`
- Invalid route — `404 Not Found`
- Helmet security response headers
- Rate limiting — `429 Too Many Requests`
- HTTP request logging

The exported Postman collection is included in:

`postman_collection.json`

Screenshots of the API tests and responses are provided in the testing documentation.

## Vercel Deployment

The COMP3123 Assignment 1 REST API is deployed on Vercel and uses MongoDB Atlas for database storage.

**Live API:**

https://101571040-comp-3123-assignment1.vercel.app

### Verified Deployment Endpoints

The following endpoints were successfully tested on Vercel:

| Method | Endpoint | Result |
|--------|----------|--------|
| GET | `/health` | 200 OK |
| POST | `/api/v1/user/login` | 200 OK |
| GET | `/api/v1/emp/employees` | 200 OK |

The deployed API successfully connects to MongoDB Atlas, authenticates users, and retrieves employee records using JWT authentication.

## Test Credentials 

The following test account was created for API testing and can be used by the professor to verify authentication and protected endpoints.

**Email:** `testuser1@example.com`

**Password:** `TestPass123!`

**Login endpoint:**

`POST /api/v1/user/login`

**Example login request:**

```json
{
  "email": "testuser1@example.com",
  "password": "TestPass123!"
}
```

After successful login, copy the returned JWT token and use it as a Bearer token to test the employee endpoints.

These credentials are for assignment testing only and are not personal or database administrator credentials.

## GitHub Repository

https://github.com/Jenifaj8/101571040_COMP3123_Assignment1

## Author

Jenifa Joseph

Student ID: 101571040

George Brown Polytechnic
