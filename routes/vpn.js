const express = require("express");

const vpnService = require("../services/vpnService");

const router = express.Router();

function requireAuth(req, res, next) {
  if (!req.session.authenticated) {
    return res.status(401).json({
      success: false,
      message: "Authentication required"
    });
  }

  next();
}

router.get("/status", requireAuth, (req, res) => {
  res.json({
    success: true,
    status: vpnService.getStatus()
  });
});

router.post("/on", requireAuth, (req, res) => {
  const status = vpnService.enable();

  res.json({
    success: true,
    message: "Data Saver enabled",
    status
  });
});

router.post("/off", requireAuth, (req, res) => {
  const status = vpnService.disable();

  res.json({
    success: true,
    message: "Data Saver disabled",
    status
  });
});

module.exports = router;
