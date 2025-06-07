# 🔐 Node.js Authentication & Authorization with File Upload

## 🛡️ Technology Stack

![Node.js](https://img.shields.io/badge/Node.js-green?style=for-the-badge&logo=node.js&logoColor=green&label=Platform) ![Express.js](https://img.shields.io/badge/Express.js-lightgreen?style=for-the-badge&logo=express&logoColor=lightgreen&label=Framework) ![Postman](https://img.shields.io/badge/Postman-orange?style=for-the-badge&logo=postman&logoColor=orangee&label=Tool) ![JavaScript](https://img.shields.io/badge/JavaScript-FFF44F?style=for-the-badge&logo=javascript&logoColor=FFF44F&label=Language) ![MongoDB](https://img.shields.io/badge/MongoDB-darkgreen?style=for-the-badge&logo=mongodb&logoColor=darkgreen&label=Database) ![Cloudinary](https://img.shields.io/badge/Cloudinary-0033CC?style=for-the-badge&logo=cloudinary&logoColor=0033CC&label=Image%20Storage) ![JWT](https://img.shields.io/badge/JWT-7F00FF?style=for-the-badge&logo=jsonwebtokens&logoColor=white&label=Authentication) ![bcrypt](https://img.shields.io/badge/bcrypt-FF69B4?style=for-the-badge&logo=lock&logoColor=white&label=Passwords) ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white&label=Deployment) ![Render](https://img.shields.io/badge/Render-2F80ED?style=for-the-badge&logo=render&logoColor=2F80ED&label=Deployment)

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
  - [📄 Pagination in Image Fetching](#-pagination-in-image-fetching)
    - [🛠️ Implementation Details](#️-implementation-details)
      - [📥 Controller Function: `fetchImagesController`](#-controller-function-fetchimagescontroller)
    - [🔍 Query Parameters](#-query-parameters)
    - [📊 Example Usage](#-example-usage)
      - [🔗 Request](#-request)
      - [📥 Response](#-response)
    - [🧪 Testing with Postman](#-testing-with-postman)
    - [📈 Benefits of Pagination](#-benefits-of-pagination)
    - [🔄 Alternative: Infinite Scrolling](#-alternative-infinite-scrolling)
  - [📦 Installation \& Run Locally](#-installation--run-locally)
  - [🚀 Deployment Guide](#-deployment-guide)
    - [⚙️ Prepare for Deployment](#️-prepare-for-deployment)
    - [🚀 Deploying on Render](#-deploying-on-render)
    - [🚀 Deploying on Vercel](#-deploying-on-vercel)
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

- 🔐 **User Registration** with password hashing using `bcryptjs`.
- 🔑 **User Login** with secure access token generation using `jsonwebtoken`.
- 🧱 **Token-Based Authentication** for securing API routes and managing sessions.
- 📥 **Middleware for Token Verification** to protect sensitive routes.
- 👮 **Role-Based Access Control** for `admin` and `user` level permissions.
- 🔄 **Change Password Functionality** with secure validation and `bcryptjs` re-hashing.
- 🧾 **Pagination Support** for efficient image fetching with `page`, `limit`, `sortBy`, and `sortOrder` query params.
- ❌ **Delete Image Feature** with secure removal from both **Cloudinary** and the database.
- 📤 **File Upload** using `Multer` for multipart data and `Cloudinary` for cloud media storage.
- ⚙️ **Environment Configuration** using `.env` file to securely store secrets and API keys.
- 🧪 **API Testing** using **Postman** with various test cases for authentication, uploads, and pagination.

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

## 📄 Pagination in Image Fetching

Pagination is essential for efficiently managing large datasets by dividing them into manageable chunks. In this project, we've implemented pagination for the image fetching functionality, allowing users to retrieve images page by page, enhancing performance and user experience.

### 🛠️ Implementation Details

#### 📥 Controller Function: `fetchImagesController`

```javascript
const fetchImagesController = async (req, res) => {
  try {
    // Extract query parameters with default values
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;
    const sortBy = req.query.sortBy || "createdAt";
    const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;

    // Calculate the number of documents to skip
    const skip = (page - 1) * limit;

    // Count total number of images
    const totalImages = await Image.countDocuments({});

    // Calculate total number of pages
    const totalPages = Math.ceil(totalImages / limit);

    // Construct sort object dynamically
    const sortObject = { [sortBy]: sortOrder };

    // Fetch images with pagination and sorting
    const images = await Image.find().sort(sortObject).skip(skip).limit(limit);

    // Respond with paginated data
    return res.status(200).json({
      success: true,
      currentPage: page,
      totalPages: totalPages,
      totalImages: totalImages,
      message: "Images fetched successfully!",
      data: images,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error occurred while fetching images! Please try again.",
    });
  }
};
```

### 🔍 Query Parameters

| Parameter   | Type   | Default     | Description                                                         |
| ----------- | ------ | ----------- | ------------------------------------------------------------------- |
| `page`      | Number | `1`         | The current page number to retrieve.                                |
| `limit`     | Number | `3`         | The number of images to display per page.                           |
| `sortBy`    | String | `createdAt` | The field by which to sort the images.                              |
| `sortOrder` | String | `desc`      | The order of sorting: `asc` for ascending or `desc` for descending. |

### 📊 Example Usage

#### 🔗 Request

```api
GET /api/images?page=2&limit=5&sortBy=createdAt&sortOrder=asc
```

#### 📥 Response

```json
{
  "success": true,
  "currentPage": 2,
  "totalPages": 4,
  "totalImages": 20,
  "message": "Images fetched successfully!",
  "data": [
    {
      "_id": "60d21b4667d0d8992e610c85",
      "url": "https://res.cloudinary.com/demo/image/upload/v1624444444/sample.jpg",
      "publicId": "sample",
      "uploadedBy": "60d0fe4f5311236168a109ca",
      "createdAt": "2021-06-24T14:00:00.000Z",
      "updatedAt": "2021-06-24T14:00:00.000Z"
    }
    // More image objects...
  ]
}
```

---

### 🧪 Testing with Postman

To test the pagination functionality:

1. Open Postman.
2. Create a new `GET` request to `http://localhost:3000/api/images`.
3. Add query parameters:

   - `page`: The page number you want to retrieve.
   - `limit`: The number of images per page.
   - `sortBy`: The field to sort by (e.g., `createdAt`).
   - `sortOrder`: The order of sorting (`asc` or `desc`).

4. Send the request and observe the paginated response.

### 📈 Benefits of Pagination

- **Performance Optimization**: Reduces the amount of data transferred in a single request, leading to faster response times.
- **Improved User Experience**: Allows users to navigate through data easily without overwhelming them with too much information at once.
- **Scalability**: Efficiently handles large datasets by loading data in chunks.

### 🔄 Alternative: Infinite Scrolling

Instead of traditional pagination, infinite scrolling loads more data as the user scrolls down the page. This approach provides a seamless user experience, especially in applications like social media feeds. However, it can be more complex to implement and may lead to performance issues if not handled properly.

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

## 🚀 Deployment Guide

This section outlines the steps to deploy your Node.js application to cloud platforms like Render and Vercel.

### ⚙️ Prepare for Deployment

Before deploying, ensure your project is ready:

1. **Push to GitHub**: Always ensure your latest code changes are pushed to your GitHub repository. This is a prerequisite for most cloud deployment platforms.

2. **Create `.gitignore`**:
   To prevent sensitive information and unnecessary files from being committed to your Git repository, create a `.gitignore` file in the root of your project:

   ```file
   # Environment variables
   .env

   # Node modules
   node_modules/

   # Uploads (if using local storage before Cloudinary upload)
   uploads/

   # Log files
   npm-debug.log*
   yarn-debug.log*
   yarn-error.log*

   # OS generated files
   .DS_Store
   .env.local
   .env.development.local
   .env.test.local
   .env.production.local
   ```

3. **Generate a Strong JWT Secret Key**:
   For enhanced security, generate a strong, random secret key for your JWT tokens. You can use OpenSSL in your terminal:

   ```bash
   openssl rand -hex 64
   ```

   Copy the generated key and add it to your `.env` file as `JWT_SECRET`.

### 🚀 Deploying on Render

Render is a unified platform to build and run all your apps and websites with automatic deploys from Git.

**Render Link**: [https://nodejs-file-upload-u0sb.onrender.com](https://nodejs-file-upload-u0sb.onrender.com)

**Steps to Deploy:**

1. **Create a New Web Service**:

   - Log in to your Render dashboard.
   - Click "New" and select "Web Service".

2. **Connect to GitHub**:

   - Select "Build and deploy from a Git repository".
   - Connect your GitHub account and select the repository where your project is hosted.

3. **Configure Your Service**:

   - **Name**: Give your service a meaningful name (e.g., `nodejs-auth-upload`).
   - **Region**: Choose a region close to your users.
   - **Branch**: Select the branch you want to deploy (e.g., `main` or `master`).
   - **Root Directory**: If your `package.json` is not in the root, specify the path (e.g., `/backend`).
   - **Runtime**: Select `Node`.
   - **Build Command**: `npm install`
   - **Start Command**: `npm start` (or `npm run dev` if that's your production start script)

4. **Add Environment Variables**:

   - Go to the "Environment" section.
   - Add all the variables from your local `.env` file (e.g., `MONGO_URI`, `JWT_SECRET`, `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`).
   - Ensure your `MONGO_URI` is publicly accessible or configured for Render's IP ranges.

5. **Deploy**:

   - Click "Create Web Service". Render will now fetch your code, install dependencies, and run your application. You can monitor the deployment logs from the dashboard.

### 🚀 Deploying on Vercel

Vercel is a platform for frontend developers, providing a streamlined deployment experience for serverless functions and web applications.

**Vercel Link**: [https://nodejs-file-upload.vercel.app/](https://nodejs-file-upload.vercel.app/)

**Steps to Deploy:**

1. **Configure `vercel.json` (for Serverless Functions)**:
   Since Vercel is primarily for frontends and serverless functions, you'll need to configure your `server.js` (or entry point) to run as a serverless function. Create a `vercel.json` file in the root of your project:

   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "server.js",
         "use": "@vercel/node"
       }
     ],
     "routes": [
       {
         "src": "/(.*)",
         "dest": "server.js"
       }
     ]
   }
   ```

   - **`src`**: Points to your main server file (e.g., `server.js`).
   - **`use`**: Specifies the Vercel builder to use (`@vercel/node`).
   - **`routes`**: This is crucial. It tells Vercel to route all incoming requests (`/(.*)`) to your `server.js` file, allowing your Express routes to handle them.

2. **Create a New Project on Vercel**:

   - Log in to your Vercel dashboard.
   - Click "Add New..." and select "Project".

3. **Import Git Repository**:

   - Select "Import Git Repository" and choose the repository where your project is hosted.

4. **Configure Project Settings**:

   - **Framework Preset**: Select `Other` (or `Node.js` if available, though `Other` generally works best with a custom `vercel.json`).
   - **Root Directory**: If your project is in a subdirectory (e.g., `backend/`), specify it here.
   - **Build & Output Settings**: Vercel will usually auto-detect. If not, set:
     - **Build Command**: `npm install`
     - **Output Directory**: This is usually handled by `@vercel/node`.
   - **Environment Variables**:
     - Go to the "Environment Variables" section.
     - Add all the variables from your local `.env` file (e.g., `MONGO_URI`, `JWT_SECRET`, `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`).

5. **Deploy**:

   - Click "Deploy". Vercel will automatically build and deploy your application. You'll get a unique URL for your deployed project.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

> **Note**: The code samples provided in this README are for illustrative purposes only and should not be used in production environments.
