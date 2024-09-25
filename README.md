# Social Media Application

This is a simple social media application built with Next.js for the frontend and Express.js with MySQL for the backend. The application allows users to create posts, like posts, and follow other users.

## Features

- **User Authentication**: Users can log in and log out using JSON Web Tokens (JWT).
- **Post Creation**: Users can create new posts with text and images.
- **Like Posts**: Users can like posts, and the like count updates accordingly.
- **Follow Users**: Users can follow and unfollow other users.
- **View Posts**: Users can view a list of posts with their respective like counts.

## Technology Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Express.js, MySQL, Node.js
- **Database**: MySQL

## Getting Started

### Prerequisites

- Node.js
- MySQL Server
- npm 

### Setting Up the Backend

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd backend
   ```

- Install dependencies:

- npm install


- Create a MySQL database for the application.
 - Run the SQL scripts provided in the /backend/db directory to set up the necessary tables (posts, likes, users, etc.).
- Configure environment variables:

- Create a .env file in the backend directory and set the following variables:
```
DB_HOST=localhost
DB_USER=<your_db_user>
DB_PASSWORD=<your_db_password>
DB_NAME=<your_db_name>
JWT_SECRET=<your_jwt_secret>
```
Start the backend server:

```
npm start
The backend server should be running at http://localhost:5000.
```
- Setting Up the Frontend
- Clone the repository (if not already done):

```
git clone <repository-url>

Install dependencies:
```
``
npm install
Start the frontend server:

npm run dev
The frontend should be accessible at http://localhost:3000.
```
- API Endpoints
```
```
GET /api/posts: Fetch all posts.
POST /api/posts: Create a new post (requires authentication).
POST /api/posts/:id/like: Like a post (requires authentication).

Users
POST /api/users/:id/follow: Follow a user (requires authentication).
POST /api/users/:id/unfollow: Unfollow a user (requires authentication).

Usage
Login with email , password.
aSign up with username , email, password.
Log in using your credentials 
Create posts using the post creation form.
Like posts by clicking the like button.
Follow users to see their posts in your feed.

```
