import { Router } from "express";
import { getUserChats, getChatById, createChat} from "../controllers/chat-controller.js"

const chatRouter = Router();

// get chat that alredy have been started for a user
chatRouter.route('/getuserchats').post(getUserChats);

chatRouter.route('/getchatbyid').post(getChatById);

chatRouter.route('/createchat').post(createChat);

export default chatRouter;