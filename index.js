import "dotenv/config"

import express from "express";
import http from "http";
import mongoose from "mongoose"
import cors from "cors"

const app = express();
const server = http.createServer(app);


app.use(cors({
    origin:"*",
    credentials:true
}));
app.use(express.json({}));
app.use(express.urlencoded({extended:true}));


try {
    mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected successfully');
} catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
}


const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));