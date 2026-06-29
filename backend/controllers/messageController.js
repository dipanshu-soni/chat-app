const Message = require("../models/Message");
const User = require("../models/User");

const sendMessage = async (req, res) => {
    try
    {
        const sender = req.user._id;
        const receiver = req.params.receiverId;
        const text = req.body.text;

        const receiverUser = await User.findById(receiver);
        if(!receiverUser)
        {
            return res.status(404).json({
                success: false,
                message: "Receiver not found !"
            });
        }

        if(!text || !text.trim())
        {
            return res.status(400).json({
                message: "Text cannot be empty !"
            });
        }

        if(sender.toString() === receiver)
        {
            return res.status(400).json({
                success: false,
                message: "You cannot message yourself !"
            });
        }

        const message = await Message.create({
            sender,
            receiver,
            text: text.trim()
        });

        return res.status(201).json({
            message: "Message sent !",
            data: message,
            success: true
        });
    }
    catch(error)
    {
        console.log("Error: ", error);
        res.status(500).json({
            message: "Failed to send the message !",
            success: false
        });
    }
};

module.exports = sendMessage;