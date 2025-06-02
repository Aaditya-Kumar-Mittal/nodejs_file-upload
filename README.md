# 🔐 Node.js Authentication & Authorization with File Upload

## 🛡️ Technology Stack

![Node.js](https://img.shields.io/badge/Node.js-green?style=for-the-badge&logo=node.js&logoColor=white&label=Platform) ![Express.js](https://img.shields.io/badge/Express.js-lightgreen?style=for-the-badge&logo=express&logoColor=black&label=Framework) ![Postman](https://img.shields.io/badge/Postman-orange?style=for-the-badge&logo=postman&logoColor=white&label=Tool) ![JavaScript](https://img.shields.io/badge/JavaScript-FFF44F?style=for-the-badge&logo=javascript&logoColor=black&label=Language) ![MongoDB](https://img.shields.io/badge/MongoDB-darkgreen?style=for-the-badge&logo=mongodb&logoColor=white&label=Database) ![Cloudinary](https://img.shields.io/badge/Cloudinary-0033CC?style=for-the-badge&logo=cloudinary&logoColor=white&label=Image%20Storage) ![JWT](https://img.shields.io/badge/JWT-7F00FF?style=for-the-badge&logo=jsonwebtokens&logoColor=white&label=Authentication) ![bycrypt](https://img.shields.io/badge/bcrypt-FF69B4?style=for-the-badge&logo=lock&logoColor=white&label=Passwords)

## 📑 Table of Contents

- [🔐 Node.js Authentication \& Authorization with File Upload](#-nodejs-authentication--authorization-with-file-upload)
  - [🛡️ Technology Stack](#️-technology-stack)
  - [📑 Table of Contents](#-table-of-contents)
  - [📌 Introduction](#-introduction)
  - [🚀 Features](#-features)
  - [📂 Project Structure](#-project-structure)
  - [🔗 Technologies Used](#-technologies-used)
  - [📡 API Endpoints](#-api-endpoints)
  - [🔐 Authentication Flow](#-authentication-flow)
  - [🛡️ Authorization Flow](#️-authorization-flow)
  - [📤 File Upload with Multer \& Cloudinary](#-file-upload-with-multer--cloudinary)
  - [📦 Installation \& Run Locally](#-installation--run-locally)
  - [📄 License](#-license)

---

## 📌 Introduction

This project demonstrates a comprehensive implementation of **user authentication and authorization** using `Node.js`, `Express`, `JWT`, and `bcryptjs`, along with **file upload functionality** using `Multer` and `Cloudinary`. It showcases how to:

- Securely hash passwords.
- Create and verify JWT tokens.
- Use middleware to protect routes.
- Implement role-based access control.
- Upload and manage files using Cloudinary.

It serves as a solid foundation for any project requiring secure login, authentication, user role handling, and file uploads.

---

## 🚀 Features

- 🔐 User Registration with password hashing using `bcryptjs`.
- 🔑 User Login with access token generation using `jsonwebtoken`.
- 📥 Middleware for token verification and protected routes.
- 👮 Role-based access control (admin/user).
- 🧱 Secure token-based authentication.
- 🧪 Tested using Postman.
- ⚙️ Environment configuration using `.env`.
- 📤 File upload functionality using `Multer` and `Cloudinary`.

---

## 📂 Project Structure

```bash
nodejs_authentication-authorization/
│
│── config/
│   └── config-cloudinary.js      # Cloudinary configuration
├── controllers/
│   ├── auth-controller.js         # Handles user registration and login
│   └── image-controller.js        # Handles image upload
├── database/
│   └── database.js               # Database connection
├── middlewares/
│   ├── auth-middleware.js         # Verifies JWT token
│   ├── admin-middleware.js        # Checks for admin role
│   ├── home-middleware.js         # Checks for user role
│   └── image-upload-middleware.js       # Handles file uploads using Multer
├── models/
│   ├── User.js                   # Mongoose user schema
│   └── Image.js                  # Mongoose image schema
├── routes/
│   ├── auth
│   │   ├── auth-routes.js             # Authentication routes
│   ├── admin-routes.js            # Protected admin routes
│   ├── home-routes.js             # Protected home routes
│   └── image-routes.js            # Image upload routes
├── helpers/
│   └── helper-cloudinary.js             # Cloudinary configuration
├── .env                          # Environment variables
├── server.js                     # Entry point
└── package.json                  # Project metadata
```

---

## 🔗 Technologies Used

| Category    | Tools                      |
| ----------- | -------------------------- |
| Server      | Node.js, Express           |
| Database    | MongoDB, Mongoose          |
| Auth        | bcryptjs, jsonwebtoken     |
| Middleware  | Custom Express Middlewares |
| File Upload | Multer, Cloudinary         |
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
| POST   | `/api/upload`        | Upload image (admin only)  |

---

## 🔐 Authentication Flow

1. **Registration**:

   - Password is hashed using `bcryptjs` before storing in the database.

     ```js
     const hashedPassword = await bcrypt.hash(password, saltRounds);
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
     req.user = decoded;
     ```

---

## 🛡️ Authorization Flow

1. **authMiddleware.js**:

   - Ensures the user is logged in via a valid JWT token.

2. **adminMiddleware.js**:

   - Checks if `req.user.role === 'admin'` before allowing access.

3. **Route Example**:

   ```js
   router.get("/admin/welcome", authMiddleware, adminMiddleware, (req, res) => {
     res.json({ message: "Welcome Admin!" });
   });
   ```

---

## 📤 File Upload with Multer & Cloudinary

1. **Multer Configuration** (`uploadMiddleware.js`):

   ```js
   const multer = require("multer");
   const path = require("path");

   const storage = multer.diskStorage({
     destination: function (req, file, cb) {
       cb(null, "uploads/");
     },
     filename: function (req, file, cb) {
       const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
       cb(
         null,
         file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
       );
     },
   });

   const fileFilter = (req, file, cb) => {
     if (file.mimetype.startsWith("image")) {
       cb(null, true);
     } else {
       cb(new Error("Only images are allowed!"), false);
     }
   };

   const upload = multer({
     storage: storage,
     limits: { fileSize: 1024 * 1024 * 5 }, // 5MB
     fileFilter: fileFilter,
   });

   module.exports = upload;
   ```

2. **Cloudinary Configuration** (`cloudinary.js`):

   ```js
   const cloudinary = require("cloudinary").v2;

   cloudinary.config({
     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
     api_key: process.env.CLOUDINARY_API_KEY,
     api_secret: process.env.CLOUDINARY_API_SECRET,
   });

   module.exports = cloudinary;
   ```

3. **Image Upload Controller** (`imageController.js`):

   ```js
   const cloudinary = require("../utils/cloudinary");
   const Image = require("../models/Image");

   const uploadImage = async (req, res) => {
     try {
       if (!req.file) {
         return res.status(400).json({ message: "No file uploaded." });
       }

       const result = await cloudinary.uploader.upload(req.file.path);

       const newImage = new Image({
         url: result.secure_url,
         publicId: result.public_id,
         uploadedBy: req.user.userId,
       });

       await newImage.save();

       res
         .status(201)
         .json({ message: "Image uploaded successfully!", image: newImage });
     } catch (error) {
       res.status(500).json({ message: "Image upload failed.", error });
     }
   };

   module.exports = { uploadImage };
   ```

4. **Image Upload Route** (`imageRoutes.js`):

   ```js
   const express = require("express");
   const router = express.Router();
   const upload = require("../middlewares/uploadMiddleware");
   const authMiddleware = require("../middlewares/authMiddleware");
   const adminMiddleware = require("../middlewares/adminMiddleware");
   const { uploadImage } = require("../controllers/imageController");

   router.post(
     "/upload",
     authMiddleware,
     adminMiddleware,
     upload.single("image"),
     uploadImage
   );

   module.exports = router;
   ```

---

## 📦 Installation & Run Locally

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/nodejs_authentication-authorization.git
cd nodejs_authentication-authorization

# 2. Install dependencies
npm install

# 3. Setup environment variables
touch .env
# Add the following:
# MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/auth
# JWT_SECRET=your_jwt_secret
# CLOUDINARY_CLOUD_NAME=your_cloud_name
# CLOUDINARY_API_KEY=your_api_key
# CLOUDINARY_API_SECRET=your_api_secret

# 4. Run the server
npm run dev
```

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

> **Note**: The code samples provided in this README are for illustrative purposes only and should not be used in production environments.
