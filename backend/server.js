require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

const connectDB = require('./config/db');
const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

startServer();

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const userRoutes = require("./routes/userRoutes");
app.use('/api', userRoutes);

const messageRoutes = require("./routes/messageRoutes");
app.use("/api", messageRoutes);

app.get('/', (req, res) => {
    res.send("ChatSphere server is running !");
});