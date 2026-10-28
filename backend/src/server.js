import express from 'express';
import dotenv from 'dotenv';
import path from "path"

import connectDB from './config/db.js';
import noteRoutes from "./routes/note.js"
import rateLimiter from './middleware/rateLimiter.js';
import cors from 'cors'


const __dirname = path.resolve();

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors())
app.use(rateLimiter);

app.use("/api/notes", noteRoutes);

app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    console.error(err);

    return res.status(500).json({
        success: false,
        message: "Internal server error"
    });
});

if(process.env.NODE_ENV ==="production"){
app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("/{*path}", (req, res)=>{
    res.sendFile(path.join(__dirname, "../frontend","dist","index.html"))
})
}



connectDB().then(() =>{
      app.listen(PORT, () => {
            console.log(`Server running on PORT ${PORT}`)
      })
});