import {Request,Response,NextFunction} from 'express';
import User from '../models/UserModel.js';
import bcrypt from 'bcrypt';

export const getAllUsers = async(req:Request,res:Response,next:NextFunction) => {
    try {
        const users = await User.find();
        return res.status(200).json({message:"Ok",users});
    } catch (error) {
        return res.status(500).json({message:error})
    }
}

export const userSignUp = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const {name,email,password} = req.body;
        const hashedPass = await bcrypt.hash(password,10);
        const user = new User({name,email,password:hashedPass});
        await user.save();
        return res.status(200).json({message:"ok",id:user._id.toString() });
    } catch (error) {
        return res.status(500).json({message:error});
    }
}