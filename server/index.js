import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config();

mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log("db connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(express.json());
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the server - Blogs by Ahsanul" });
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
 
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(statusCode).json({
        success : false,
        statusCode,
        message
    });
});