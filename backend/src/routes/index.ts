import {Router} from 'express';
import chatRoutes from './chatRoutes.js';
import userRoutes from './userRoutes.js';

const appRouter = Router();

appRouter.use('/user',userRoutes); //api/v1/user
appRouter.use('/chat',chatRoutes); //api/v1/chats

export default appRouter;