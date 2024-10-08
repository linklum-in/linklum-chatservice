import "dotenv/config"

import express from "express";
import http from "http";
import mongoose from "mongoose"
import cors from "cors"
import { connectDatabases } from "./src/db/connection.js";

const app = express();
const server = http.createServer(app);


app.use(cors({
    origin:"*",
    credentials:true
}));
app.use(express.json({}));
app.use(express.urlencoded({extended:true}));

const PORT = process.env.PORT || 4000;

// connecting databases =>
try {
   connectDatabases()
   .then((res) => {
    server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
   })
   .catch((err) => {
    console.log(err)
   })
} catch (error) {
    console.error('Error in Connection', error.message);
}

app.get('/' , (req,res) => {
    return res.send("Welcome to Alumni Portal Chat Microservice")
})

