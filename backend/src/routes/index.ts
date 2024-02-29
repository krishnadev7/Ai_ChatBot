import {Router} from 'express';

const appRouter = Router();

appRouter.use('/user',userRoutes); //api/v1/user
appRouter.use('/chat',chatRoutes); //api/v1/chats

export default appRouter;