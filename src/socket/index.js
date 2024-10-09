import { Server} from "socket.io";
import { updateChatByChatId } from "../controllers/chat-controller.js";
// import { updateGroupChatById } from "./controllers/groupchat_controllers.js";

export function initializeSocketIO (io) {
    try {
        io.on("connection", (socket) => {

            console.log("User connected");
            console.log("ID:", socket.id)
        
            socket.on('join_room', ({ roomId, userId }) => {
                socket.join(roomId) // join a unique room
                console.log(`user: ${userId} joined in room : ${roomId}`)
            });
        
            socket.on('send_message', async ({ message, roomId, fromUserName, fromUserId, isGroupChat }) => {
                // Broadcast message to everyone in the room (including sender)  
                // console.log(isGroupChat);
                if(isGroupChat === false){
                    const chat = await updateChatByChatId({chatId:roomId, message:message , sender:fromUserName})
                    io.to(roomId).emit('receive_message', { message, fromUserId, fromUserName, updatedChat:chat, isGroupChat });
                }
                else if(isGroupChat === true){
                    // const groupChat = await updateGroupChatById({groupId:roomId, message:message, sender:fromUserName});
                    // io.to(roomId).emit('receive_message', { message, fromUserId, fromUserName, updatedChat:groupChat, isGroupChat })
                    console.log("No Group chat feature yet!!")
                }
            });
        
            socket.on("disconnect", () => {
                console.log(`user disconnected ${socket.id}`)
            })
        })
    } catch (error) {
        console.log("Error connecting Socket!")
        console.log(error)
    }
}

