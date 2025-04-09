import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from '../lib/socket.js';



export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({_id: {$ne: loggedInUserId}}).select("-password") // find all users except the logged in user | $ne = not equal to

        res.status(200).json(filteredUsers)
    } catch (error) {
        console.log("Error in getUsersForSidebar:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getMessages = async (req, res) => {
    try {
        const {id: userToChatId} = req.params
        const myUserId = req.user._id

        const messages = await Message.find({ $or: [
            {senderId: myUserId, receiverId: userToChatId},
            {senderId: userToChatId, receiverId: myUserId}
        ]})

        res.status(200).json(messages)
    } catch (error) {
        console.log("Error in getMessages:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const sendMessage = async (req, res) => {
    try 
    {
        const {text, image} = req.body
        const {id: receiverId} = req.params
        const senderId = req.user._id

        let imageUrl;

        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url

        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl
        })

        await newMessage.save()

        // todo: realtime functionality to be added with socket.io

        const receiverSocketId = await getReceiverSocketId(receiverId)
        if(receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage)
        }

        res.status(201).json(newMessage)
    } catch (error) {
        console.log("Error in sendMessage:", error.message);
        res.status(500).json({ message: "Internal Server Error" });

    }
    }