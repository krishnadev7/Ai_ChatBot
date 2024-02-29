import express from 'express'
import {config} from 'dotenv'
import appRouter from './routes';

config();
const app = express();

//middlewares
app.use(express.json());

app.use('/api/v1',appRouter);

export default app;