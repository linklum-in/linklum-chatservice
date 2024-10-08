import mongoose from "mongoose";

// Connection to the User Database
const userDbUri = process.env.USER_DB_MONGODB_URI; 
const chatDbUri = process.env.CHAT_DB_MONGODB_URI;

// Function to connect to both databases
export async function connectDatabases() {
    try {
        // Create connections for both databases
        const userDbConnection = mongoose.createConnection(userDbUri);
        console.log('User Database connected successfully');

        const chatDbConnection = mongoose.createConnection(chatDbUri);
        console.log('Chat Database connected successfully');

        // console.log("userDbConnectionResponse : ", userDbConnection)
        // console.log("chatDbConnectionResponse : ", chatDbConnection)

        return { userDbConnection, chatDbConnection };

    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
    }
}

