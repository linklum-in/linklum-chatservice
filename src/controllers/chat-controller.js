import {Chat} from "../db/connection.js"
import {User} from "../db/connection.js"
import dayjs from "dayjs"
import mongoose from "mongoose"



export async function createChat(req,res){
    try {
        const {userId1, userId2} = req.body;
        console.log(userId1,userId2)

        if(!(userId1?.trim()) || !(userId2?.trim())){
            return res.status(400).json({
                message:"Provide all required field!"
            })
        }

        const User1 = await User.findById(userId1);
        if(!User1){
            return res.status(404).json({
                message:"Provide correct userId1 field!"
            })
        }

        const User2 = await User.findById(userId2);
        if(!User2){
            return res.status(404).json({
                message:"Provide correct userId2 field!"
            })
        }

        // console.log(User1 , User2);

        const chatId1 = `${User1._id}${User2._id}`;
        const chatId2 = `${User2._id}${User1._id}`;

        const isChatExist = await Chat.findOne({
            $or: [
                { chatId: chatId1 },
                { chatId: chatId2 }
            ]
        });
        if(isChatExist){
            return res.status(400).json({
                message:"Chat already exist!"
            })
        }

        // console.log(User1._id , User2._id)
        console.log(String(User1.name), User2);

        const newChat = new Chat({
            chatId:chatId1,
            userId1:User1._id,
            userId2:User2._id,
            username1:User1.name,
            username2:User2.name,
            allMessages: [],
            lastMessage:""
        })

        const createdChat = await newChat.save();

        if(!createdChat){
            return res.status(500).json({
                message:"Something went wrong while creating a new chat!"
            })
        }

        return res.status(201).json({
            message:"Chat created successfully",
            chat:createdChat,
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:"Something went wrong while creating a new chat between two users!",
            error:error,
        })
    }
}

export async function updateChatById({chatId , message , sender}){
    try {
        // const {chatId , message , sender} = req.body;

        if(!(chatId?.trim()) || !(message?.trim()) || !(sender?.trim())){
            return{
                message:"Provide all required field!"
            }
        }
        // console.log(chatId, message , sender);
        const existingChat = await Chat.findById(chatId);
        // console.log(existingChat);
        if(!existingChat){
            return {
                message:"no such chat exist"
            }
        }
        const chatToBeUpdated = await Chat.findByIdAndUpdate(existingChat._id ,
            {
                $push :{ allMessages : {sender:sender , message:message, time:dayjs(new Date() ).format('hh:mm A') }},
                lastMessage:message,
            },
            {new:true}
        )

        if(!chatToBeUpdated){
            return {
                message:"Something went wrong while updating chat!",
            }
        }

        return {
            message:"chat updated successfully",
            chat : chatToBeUpdated,
        }
    } catch (error) {
        console.log(error);
        return error;
    }
}

export async function getUserChats(req,res){
    try {
        const {userId} = req.body;


        if(!(userId?.trim())){
            return res.status(400).json({
                message:"Provide username"
            })
        }

        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({
                message:"Provide correct username field!"
            })
        }

        const userChats = await Chat.find({
            $or: [
                { userId1: user._id },
                { userId2: user._id }
            ]
        })

        return res.status(200).json({
            message: "all chats of user",
            chats:userChats
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Something went wrong while fething user chats!"
        })
    }
}

export async function getChatById(req,res){
    try {

        const {chatId} = req.body;

        const existingChat = await Chat.findById(chatId);
        // console.log(existingChat);
        if(!existingChat){
            return res.status(404).json({
                message:"no such chat exist",
            })
        }

        return res.status(200).json({
            message:"Got the chat",
            chat : existingChat,
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Something went wrong while fething chat!"
        })
    }
}