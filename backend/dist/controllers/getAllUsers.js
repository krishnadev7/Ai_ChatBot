import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        return res.status(200).json({ message: "Ok", users });
    }
    catch (error) {
        return res.status(500).json({ message: error });
    }
};
export const userSignUp = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            const hashedPass = await bcrypt.hash(password, 10);
            const user = new User({ name, email, password: hashedPass });
            await user.save();
            return res.status(200).json({ message: "ok", id: user._id.toString() });
        }
        else {
            return res.status(409).send("User already exist");
        }
    }
    catch (error) {
        return res.status(500).json({ message: error });
    }
};
export const userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                return res.status(200).json({ message: "ok", id: user._id.toString() });
            }
            else {
                return res.status(401).send("Invalid Credentials");
            }
        }
        else {
            return res.status(401).send("User not found!");
        }
    }
    catch (error) {
        return res.status(500).json({ message: error });
    }
};
//# sourceMappingURL=getAllUsers.js.map