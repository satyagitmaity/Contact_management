const express = require("express");
const { registerUser, loginUser, currentUser, updateUser } = require("../Controllers/userController");
const validateToken = require("../Middleware/validateTokenHandler");

const router = express.Router();

router.post("/register",registerUser )
router.post("/login", loginUser )
router.get("/current", validateToken, currentUser)
router.put("/update/:id", validateToken, updateUser)

module.exports = router;