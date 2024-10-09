import "dotenv/config"

import express from "express";
import http from "http";
import cors from "cors"
import { Server } from "socket.io"
import { connectDatabases } from "./src/db/connection.js";
import { initializeSocketIO } from "./src/socket/index.js";
import chatRouter from "./src/routes/chat-routes.js";


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
} catch (error) {
    console.error('Error in Connection', error.message);
}

const io = new Server(server, {
    pingTimeout: 120000,
    cors: {
        origin: `*`,
        methods: ["GET", "POST"]
    },
})

initializeSocketIO(io)

app.use('/api/chat' , chatRouter);
app.use('/api/groupchat' , () => {})
  
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

app.get('/' , (req,res) => {
    return res.send("Welcome to Alumni Portal Chat Microservice")
})

