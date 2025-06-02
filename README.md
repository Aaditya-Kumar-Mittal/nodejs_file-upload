# 🔐 Node.js Authentication & Authorization

![Platform](https://img.shields.io/badge/platform-Node.js-greem) ![Language](https://img.shields.io/badge/language-JavaScript-yellow) ![Authentication](https://img.shields.io/badge/authentication-JWT-violet) ![Hashing](https://img.shields.io/badge/passwords-bcryptjs-indigo) ![Middleware](https://img.shields.io/badge/middleware-Express.js-purple)

## 📑 Table of Contents

- [🔐 Node.js Authentication \& Authorization](#-nodejs-authentication--authorization)
  - [📑 Table of Contents](#-table-of-contents)
  - [📌 Introduction](#-introduction)
  - [🚀 Features](#-features)
  - [📂 Project Structure](#-project-structure)
  - [🔗 Technologies Used](#-technologies-used)
  - [📡 API Endpoints](#-api-endpoints)
  - [🔐 Authentication Flow](#-authentication-flow)
  - [🛡️ Authorization Flow](#️-authorization-flow)
  - [📦 Installation \& Run Locally](#-installation--run-locally)
  - [📄 License](#-license)

---

## 📌 Introduction

This project demonstrates a complete implementation of **user authentication and authorization** using `Node.js`, `Express`, `JWT`, and `bcryptjs`. It showcases how to:

- Hash passwords securely.
- Create and verify JWT tokens.
- Use middleware to protect routes.
- Implement role-based access control.

It serves as a solid foundation for any project requiring secure login, authentication, and user role handling.

---

## 🚀 Features

- 🔐 User Registration with password hashing using `bcryptjs`
- 🔑 User Login with access token generation using `jsonwebtoken`
- 📥 Middleware for token verification and protected routes
- 👮 Role-based access control (admin/user)
- 🧱 Secure token-based authentication
- 🧪 Tested using Postman
- ⚙️ Environment configuration using `.env`

---

## 📂 Project Structure

```md
nodejs_authentication-authorization/
│
├── controllers/
│ └── authController.js # Handles user registration and login
├── database/
| └── database.js
├── middlewares/
│ ├── auth-middleware.js # Verifies JWT token
│ └── admin-middleware.js # Checks for admin role
│
├── models/
│ └── User.js # Mongoose user schema
│
├── routes/
│ ├── auth
│ │ └── auth-routes.js # Authentication routes
│ └── admin-routes.js # Protected admin routes
| └── gome-routes.js # Protected home routes
│
├── .env # Environment variables
├── server.js # Entry point
└── package.json # Project metadata
```

---

## 🔗 Technologies Used

| Category    | Tools                      |
| ----------- | -------------------------- |
| Server      | Node.js, Express           |
| Database    | MongoDB, Mongoose          |
| Auth        | bcryptjs, jsonwebtoken     |
| Middleware  | Custom Express Middlewares |
| Testing     | Postman                    |
| Environment | dotenv                     |

---

## 📡 API Endpoints

| Method | Endpoint             | Description                |
| ------ | -------------------- | -------------------------- |
| POST   | `/api/register`      | Register new user          |
| POST   | `/api/login`         | Login and get access token |
| GET    | `/api/admin/welcome` | Protected admin route      |
| GET    | `/api/home/welcome`  | Protected home route       |

---

## 🔐 Authentication Flow

1. **Registration**:

   - Password is hashed using `bcryptjs` before storing in the database.
   - Example:

     ```js
     const hashedPassword = await bcrypt.hash(password, number);
     ```

2. **Login**:

   - User provides email and password.
   - If valid, JWT token is issued:

     ```js
     const token = jwt.sign(
       { userId, username, role },
       process.env.JWT_SECRET,
       { expiresIn: "1h" }
     );
     ```

3. **Token Verification** (middleware):

   - Middleware extracts token from headers and verifies it:

     ```js
     const decoded = jwt.verify(token, process.env.JWT_SECRET);
     req.userInfo = decoded;
     ```

---

## 🛡️ Authorization Flow

1. **auth-middleware.js**:

   - Ensures the user is logged in via a valid JWT token.

2. **admin-middleware.js**:

   - Checks if `req.userInfo.role === 'admin'` before allowing access.

3. **Route Example**:

   ```js
   router.get("/admin/welcome", authMiddleware, adminMiddleware, (req, res) => {
     res.json({ message: "Welcome Admin!" });
   });
   ```

---

## 📦 Installation & Run Locally

```bash
# 1. Clone the repository
git clone https://github.com/Aaditya-Kumar-Mittal/nodejs_authentication-authorization.git
cd nodejs_authentication-authorization

# 2. Install dependencies
npm install

# 3. Setup environment variables
touch .env
# Add the following:
# MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/auth
# JWT_SECRET=your_jwt_secret

# 4. Run the server
npm run dev
```

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
