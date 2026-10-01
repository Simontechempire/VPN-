const express = require("express");

const router = express.Router();

const USERNAME = process.env.ADMIN_USERNAME;
const PASSWORD = process.env.ADMIN_PASSWORD;

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Username and password are required"
    });
  }

  if (username !== USERNAME || password !== PASSWORD) {
    return res.status(401).json({
      success: false,
      message: "Invalid login details"
    });
  }

  req.session.authenticated = true;

  req.session.save((err) => {
    if (err) {
      console.error("Session save error:", err);

      return res.status(500).json({
        success: false,
        message: "Could not create login session"
      });
    }

    res.json({
      success: true,
      message: "Login successful"
    });
  });
});

router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Logout failed"
      });
    }

    res.clearCookie("datasaver.sid");

    res.json({
      success: true
    });
  });
});

router.get("/status", (req, res) => {
  res.json({
    authenticated: req.session.authenticated === true
  });
});

module.exports = router;
