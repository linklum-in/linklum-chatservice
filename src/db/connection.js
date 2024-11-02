import mongoose from "mongoose";
import userSchema from "../models/user-model.js";
import chatSchema from "../models/chat-model.js";

// Connection to the User Database
const userDbUri = process.env.USER_DB_MONGODB_URI; 
const chatDbUri = process.env.CHAT_DB_MONGODB_URI;

// Function to connect to both databases
let User;
let Chat;
export async function connectDatabases() {
    try {
        // Create connections for both databases
        const userDbConnection = mongoose.createConnection(userDbUri,{useNewUrlParser: true,useUnifiedTopology: true})
        console.log('User Database connected successfully');

        const chatDbConnection = mongoose.createConnection(chatDbUri,{useNewUrlParser: true,useUnifiedTopology: true})
        console.log('Chat Database connected successfully');

        // console.log("userDbConnectionResponse : ", userDbConnection)
        // console.log("chatDbConnectionResponse : ", chatDbConnection)
        User = userDbConnection.model('User', userSchema);
        Chat = chatDbConnection.model("Chat" , chatSchema);

        if(!User && !Chat){
           throw "Models not connected!"
        }

        return { userDbConnection, chatDbConnection };

    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
    }
}

export {Chat , User}

