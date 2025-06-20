import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import userRoutes from "./routes/user.route.js"
import authRoutes from "./routes/auth.route.js"

dotenv.config();

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("db connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the server - Blogs by Ahsanul" });
});

app.use(express.json());

app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});


app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
