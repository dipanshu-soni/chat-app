const express = require('express');
const router = express.Router();
const {registerUser, loginUser} = require('../controllers/authController');
const authMiddleware = require("../middleware/authMiddleware");
router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/test', authMiddleware, (req, res) => {
    res.json({
        message: "Protected route accessed successfully !",
        user: req.user
    });
});
module.exports = router;