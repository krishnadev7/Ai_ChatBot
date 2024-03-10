import { Request, Response, NextFunction } from "express";
import User from "../models/UserModel.js";
import bcrypt, { compare } from "bcrypt";
import { createToken } from "../utils/tokenManager.js";
import { COOKIE_NAME } from "../utils/constants.js";

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find();
    return res.status(200).json({ message: "Ok", users });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const userSignUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      const hashedPass = await bcrypt.hash(password, 10);
      const user = new User({ name, email, password: hashedPass });
      await user.save();

      // creating token and store cookei
      res.clearCookie(COOKIE_NAME,{
        path: "/",
        domain: "localhost",
        httpOnly: true,
        signed: true,
      });

      const token = createToken(user._id.toString(), user.email, "7d");
      const expires = new Date();
      expires.setDate(expires.getDate() + 7);

      res.cookie(COOKIE_NAME, token, {
        path: "/",
        domain: "localhost",
        expires,
        httpOnly: true,
        signed: true,
      });
      
      return res.status(200).json({ message: "ok", email: user.email, name: user.name});
    } else {
      return res.status(409).send("User already exist");
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        res.clearCookie(COOKIE_NAME,{
          path: "/",
          domain: "localhost",
          httpOnly: true,
          signed: true,
        });

        const token = createToken(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);

        res.cookie(COOKIE_NAME, token, {
          path: "/",
          domain: "localhost",
          expires,
          httpOnly: true,
          signed: true,
        });

        return res.status(200).json({ message: "ok", email: user.email, name: user.name });
      } else {
        return res.status(401).send("Invalid Credentials");
      }
    } else {
      return res.status(401).send("User not found!");
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //user token check
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }
    return res
      .status(200)
      .json({ message: "OK", name: user.name, email: user.email });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};