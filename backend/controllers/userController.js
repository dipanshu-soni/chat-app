const User = require("../models/User");

const getAllUsers = async (req, res) => {
    try
    {
        const users = await User.find({
            _id: {
                $ne: req.user._id
            }
        }).select("name username profilePic");

        return res.status(200).json({
            success: true,
            count: users.length,
            users
        });
    }
    catch(error)
    {
        console.log("Get Users Error: ", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch users !"
        });
    }
};

module.exports = getAllUsers;