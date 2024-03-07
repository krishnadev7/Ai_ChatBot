import {Router} from 'express'
import { getAllUsers, userLogin, userSignUp } from '../controllers/getAllUsers.js';
import { loginValidator, signupValidator, validate } from '../utils/validators.js';

const userRoutes = Router();

userRoutes.get('/',getAllUsers);
userRoutes.post('/signup',validate(signupValidator),userSignUp);
userRoutes.post('/login',validate(loginValidator),userLogin);

export default userRoutes;