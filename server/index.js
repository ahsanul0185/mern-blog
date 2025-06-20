
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
 
mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log("db connected successfully")
    })
    .catch((err) => {
        console.log(err)
    })



const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
    res.json({message : "Welcome to the server - Blogs by Ahsanul"})
})


app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}`);
})