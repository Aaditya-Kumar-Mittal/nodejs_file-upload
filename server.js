require("dotenv").config();

const port = process.env.PORT || 3000;
const express = require("express");
const app = express();
const connectToDatabase = require("./database/database");
const authRoutes = require("./routes/auth/auth-routes");
const homeRoutes = require("./routes/home-routes");
const adminRoutes = require("./routes/admin-routes");
const imageUploadRoutes = require("./routes/image-routes");

app.use(express.json());

// Authentication Routes
app.use("/api/auth", authRoutes);

app.use("/api/home", homeRoutes);

app.use("/api/admin", adminRoutes);

// File Upload Routes
app.use("/api/image", imageUploadRoutes);

connectToDatabase();

app.listen(port, () => {
  console.log(`Server is listening and running on port ${port}`);
});
