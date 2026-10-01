const express = require("express");

const router = express.Router();

const USERNAME = process.env.ADMIN_USERNAME || "admin";
const PASSWORD = process.env.ADMIN_PASSWORD || "change-me";

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

  res.json({
    success: true,
    message: "Login successful"
  });
});

router.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.json({
      success: true
    });
  });
});

router.get("/status", (req, res) => {
  res.json({
    authenticated: !!req.session.authenticated
  });
});

module.exports = router;
