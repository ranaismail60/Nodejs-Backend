# Student Management System API

A RESTful API for managing student records built with Node.js, Express, and MongoDB.

## Features

- Complete CRUD operations for student records
- Search and filtering capabilities
- Pagination support
- Input validation and error handling
- Soft delete functionality
- Proper HTTP status codes and JSON responses

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- MongoDB Compass (for viewing data)

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/student_management
   NODE_ENV=development
   ```

4. Start MongoDB service on your local machine

5. Start the server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Students

- `POST /api/students` - Create a new student
- `GET /api/students` - Get all students (with optional filtering and pagination)
- `GET /api/students/:id` - Get a single student by ID
- `GET /api/students/search?name=...` - Search students by name
- `PUT /api/students/:id` - Update a student (full update)
- `PATCH /api/students/:id` - Partially update a student
- `DELETE /api/students/:id` - Delete a student
- `PATCH /api/students/:id/deactivate` - Soft delete (deactivate) a student

### Sample Request Body for POST

```json
{
  "rollNumber": "21-CS-105",
  "name": "Ali Hassan",
  "email": "ali.hassan@university.edu",
  "department": "Computer Science",
  "cgpa": 3.78,
  "enrollmentYear": 2021
}
```

## Query Parameters

- `GET /api/students?department=Computer Science&page=1&limit=10`

## Project Structure

```
├── config/
│   └── database.js          # Database connection
├── controllers/
│   └── studentController.js # Business logic for students
├── middleware/
│   └── validation.js        # Input validation middleware
├── models/
│   └── Student.js           # Student Mongoose schema
├── routes/
│   └── studentRoutes.js     # Student API routes
├── .env                     # Environment variables
├── package.json
├── server.js                # Main application file
└── README.md
```

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- express-validator
- CORS
- dotenv