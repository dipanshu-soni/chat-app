const User = require("../models/User");
const Message = require("../models/Message");

const sendMessage = async (req, res) => {
    try
    {
        const sender = req.user._id;
        const receiver = req.params.receiverId;
        const {text} = req.body;

        const receiverUser = await User.findById(receiver);
        if(!receiverUser)
        {
            res.status(404).json({
                message: "Receiver not found !",
                success: false
            });
        }

        if(!text || !text.trim())
        {
            return res.status(400).json({
                message: "Text cannot be empty !",
                success: false
            });
        }

        if(sender.toString() === receiver)
        {
            return res.status(400).json({
                message: "You can't message yourself !",
                success: false
            });
        }

        const message = await Message.create({
            sender,
            receiver,
            text: text.trim()
        });

        return res.status(201).json({
            message: "Message sent !",
            success: true,
            data: message
        });
    }
    catch(error)
    {
        console.log("Error: ", error);
        res.status(500).json({
            message: "Failed to send the message !"
        });
    }
};

const getMessages = async (req, res) => {
    try
    {
        const sender = req.user._id;
        const receiver = req.params.receiverId;

        const receiverUser = await User.findById(receiver);
        if(!receiverUser)
        {
            return res.status(404).json({
                message: "Receiver not found !",
                success: false
            });
        }

        const messages = await Message.find({
            $or: [
                {sender: sender, receiver: receiver},
                {sender: receiver,receiver: sender}
            ]
        }).sort({createdAt: 1});

        return res.status(200).json({
            success: true,
            message: "Conversation fetched !",
            messages: messages
        })
    }
    catch(error)
    {
        console.log("Get Messages Error: ", error);
        res.status(500).json({
            success: false,
            message: "Can't fetch the conversation !"
        });
    }
}

module.exports = {sendMessage, getMessages};