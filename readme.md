# Course Selling App - Backend API

This is the backend for a comprehensive Course Selling Application built using the MERN stack (MongoDB, Express, React, Node.js). This backend provides RESTful APIs for two distinct user roles: **Users** (Students) and **Admins** (Course Creators).

## Features

### Role-Based Access Control

The API is divided into distinct roles and namespaces:

- **Admin**: Can create, update, and manage courses they created.
- **User**: Can view all available courses, purchase courses, and view their purchased courses.

### Security

- **Authentication**: JWT (JSON Web Tokens) based authentication for secure route access.
- **Password Hashing**: `bcrypt` is used to securely hash and store user and admin passwords.
- **Authorization Middlewares**: Custom middlewares (`userMiddleware`, `adminMiddleware`) to strictly protect routes from unauthorized access.

### Database

- **MongoDB**: Utilizes Mongoose ODM to define strictly typed schemas for users, admins, courses, and purchases.
- **Data Integrity**: Enforces relationships between models (e.g., matching a course `creatorId` when updating a course, cross-referencing purchases).

---

## API Endpoints

### 🩺 Health Check

- `GET /health` - Returns the server health status.

### 👑 Admin Routes (`/api/v1/admin`)

Endpoints dedicated to course creators.

- `POST /signup` - Register a new admin account (requires `email`, `password`, `firstName`, `lastName`).
- `POST /signin` - Authenticate an admin and receive a JWT token.
- `POST /course` - Create a new course (requires Admin Authentication).
- `PUT /course` - Update an existing course (requires Admin Authentication & verifies creator ownership).
- `GET /course/bulk` - Fetch all courses created by the currently authenticated admin.

### 👤 User Routes (`/api/v1/user`)

Endpoints dedicated to end-users (students).

- `POST /signup` - Register a new user account (requires `email`, `password`, `firstName`, `lastName`).
- `POST /signin` - Authenticate a user and receive a JWT token.
- `GET /purchases` - Fetch all courses purchased by the currently authenticated user.

### 📚 Course Routes (`/api/v1/course`)

Endpoints handling public course listings and purchasing functionality.

- `GET /preview` - View all available courses across the platform (Public endpoint).
- `POST /purchase` - Purchase a specific course (requires User Authentication, expects `courseId`).

---

## Tech Stack

- **Node.js** & **Express.js** - Server routing and logic.
- **MongoDB** & **Mongoose** - Database modeling and interaction.
- **jsonwebtoken (JWT)** - Stateless API Authentication.
- **bcrypt** - Cryptographic password hashing.
- **cors** - For cross-origin resource sharing requests.
- **dotenv** - Environment variable management.

---

## Getting Started

1. **Clone the repository** and navigate to the project root.
2. **Install Dependencies:**
   ```bash
   npm install
   ```
3. **Environment Setup:** Create a `.env` file referencing `.env.example` and set:
   - Your MongoDB URI
   - `JWT_USER_PASSWORD`
   - `JWT_ADMIN_PASSWORD`
4. **Run the Server:**
   ```bash
   node server.js
   ```
   _The server will start on port 8001 (or as defined in your environment)._
