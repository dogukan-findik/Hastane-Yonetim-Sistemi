const express = require("express");
const jwt = require("jsonwebtoken");
const { authenticateUser } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/token", (req, res) => {
    const token = jwt.sign({ userId: "fakeUserId123" }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    res.json({ token });
});

router.get("/protected", authenticateUser, (req, res) => {
    res.json({ message: "Bu korumalı bir alan." });
});

module.exports = router;
