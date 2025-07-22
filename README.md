# WanderLust Hotel-Booking
Build a complete hotel booking website using Nodejs and MongoDb database.

🌍 Wanderlust - Travel Destination Sharing Platform
Wanderlust is a full-stack web application that allows users to explore, create, and share travel destinations. It includes user authentication, session handling, and secure CRUD operations. This project is built using the MVC architecture and follows clean Express routing conventions.

🚀 Features
🧭 Explore destinations created by other users

✍️ Create, edit, and delete your own travel posts

👤 User authentication and authorization (Passport.js)

🛡️ Protected routes with access control

💾 MongoDB for storing user and listing data

🗂️ Organized using MVC pattern and Express Router

🎨 Dynamic front-end using EJS templating

🍪 Sessions and cookies for persistent login

⚠️ Custom error handling middleware

✅ Flash messages and form validation

🛠️ Tech Stack
Technology	Purpose
Node.js	Server-side JavaScript runtime
Express.js	Backend web framework
MongoDB	NoSQL database
Mongoose	MongoDB ODM for schema definitions
Passport.js	Authentication middleware
EJS	Templating engine for dynamic HTML
express-session	Session management
connect-flash	Flash messages for UX feedback
method-override	For PUT/DELETE support in forms

🔐 Authentication & Authorization
Passport-local used for login/signup

Sessions maintained via express-session

Only authenticated users can:

Create new listings

Edit or delete their own listings

Middleware checks for:

isLoggedIn: Blocks unauthenticated access

isAuthor: Ensures listing ownership before edits/deletion

❌ Error Handling
Centralized error middleware using custom ExpressError class

404 Not Found handling for unmatched routes

Flash messages for user feedback on form errors or access denial
