import User from "../models/UserModel.js";
import { openAiConfig } from "../config/openAiConfig.js";
import { OpenAIApi } from "openai";
export const generateChatCompletion = async (req, res, next) => {
    const { message } = req.body;
    try {
        const user = await User.findById(res.locals.jwtData);
        if (!user) {
            return res.status(401).json({ message: "User not found! or token malfuntioned" });
        }
        const chats = user.chats.map(({ role, content }) => ({ role, content }));
        chats.push({ content: message, role: "user" });
        user.chats.push({ content: message, role: "user" });
        // sending request to openai api
        const config = openAiConfig();
        const openai = new OpenAIApi(config);
        const chatresponse = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: chats,
        });
        user.chats.push(chatresponse.data.choices[0].message);
        await user.save();
        return res.status(200).json({ chats: user.chats });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong!!!" });
    }
};
//# sourceMappingURL=chatControllers.js.map