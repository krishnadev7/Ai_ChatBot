import { Router } from 'express';
import { verifyToken } from '../utils/tokenManager.js';
import { chatValidator, validate } from '../utils/validators.js';
import { generateChatCompletion } from '../controllers/chatControllers.js';
const chatRoutes = Router();
chatRoutes.get('/new', validate(chatValidator), verifyToken, generateChatCompletion);
export default chatRoutes;
//# sourceMappingURL=chatRoutes.js.map