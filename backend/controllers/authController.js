const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
    try
    {
        const {name, username, email, password} = req.body;

        if(!name || !username || !email || !password)
        {
            return res.status(400).json({
                message: "These are required fields !"
            });
        }

        const existingUser = await User.findOne({email});
        if(existingUser)
        {
            return res.status(400).json({
                message: "User already exists with this email !"
            });
        }
        const hashed_password = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            username,
            email,
            password: hashed_password
        });

        await newUser.save();
        return res.status(201).json({
            message: "User registered successfully !"
        });
    }
    catch(error)
    {
        res.status(500).json({
            message: "Error in registering !",
            error: error.message
        });
        console.log(error);
    }
};

const loginUser = async (req, res) => {
    try
    {
        const {email, password} = req.body;

        if(!email || !password)
        {
            return res.status(400).json({
                message: "These are required fields !"
            });
        }

        const existingUser = await User.findOne({email});
        if(!existingUser)
        {
            return res.status(400).json({
                message: "User does not exists !"
            });
        }

        const isMatch = await bcrypt.compare(password, existingUser.password);
        if(!isMatch)
        {
            return res.status(401).json({
                message: "Incorrect Password !"
            });
        }

        const token = jwt.sign(
            {userId: existingUser._id},
            process.env.JWT_SECRET,
            {expiresIn: "3h"}
        );

        res.status(200).json({
            message: "Login successful !",
            token: token
        });
    }
    catch(error)
    {
        res.status(500).json({
            message: "Error in logging in !"
        });
        console.log(error);
    }
};

module.exports = {registerUser, loginUser};