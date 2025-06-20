
import express from "express";


const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
    res.json({message : "Welcome to the server - Blogs by Ahsanul"})
})


app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}`);
})