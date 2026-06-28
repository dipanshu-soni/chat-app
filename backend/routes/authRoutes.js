const express = require('express');
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {registerUser, loginUser, getCurrentUser} = require('../controllers/authController');
router.post('/register', registerUser);   
router.post('/login', loginUser);

router.get('/test', authMiddleware, (req, res) => {
    res.json({
        message: "Protected route accessed successfully !",
        user: req.user
    });
});

// Returns the currently logged-in user's information.
router.get("/me", authMiddleware, getCurrentUser);
module.exports = router;