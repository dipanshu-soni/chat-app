require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

const connectDB = require('./config/db');
connectDB();

app.get('/', (req, res) => {
    res.send("ChatSphere server is running !");
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}.`);
});