import {Router} from 'express'
import { verifyToken } from '../utils/tokenManager.js';
import { chatValidator, validate } from '../utils/validators.js';
import { deleteChats, generateChatCompletion, sendChatsToUser } from '../controllers/chatControllers.js';

const chatRoutes = Router();

chatRoutes.post('/new',validate(chatValidator), verifyToken, generateChatCompletion)

chatRoutes.get("/all-chats", verifyToken, sendChatsToUser);
chatRoutes.delete("/delete", verifyToken, deleteChats);

export default chatRoutes;