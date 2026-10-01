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

router.get("/status", requireAuth, async (req, res) => {
  try {
    const status = await vpnService.getStatus();

    res.json({
      success: true,
      status
    });
  } catch (error) {
    console.error("VPN STATUS ERROR:", error);

    res.status(502).json({
      success: false,
      message: "VPN server is unavailable"
    });
  }
});

router.post("/on", requireAuth, async (req, res) => {
  try {
    const status = await vpnService.enable();

    res.json({
      success: true,
      message: "Data Saver enabled",
      status
    });
  } catch (error) {
    console.error("VPN ON ERROR:", error);

    res.status(502).json({
      success: false,
      message: "Could not connect to the VPN server"
    });
  }
});

router.post("/off", requireAuth, async (req, res) => {
  try {
    const status = await vpnService.disable();

    res.json({
      success: true,
      message: "Data Saver disabled",
      status
    });
  } catch (error) {
    console.error("VPN OFF ERROR:", error);

    res.status(502).json({
      success: false,
      message: "Could not connect to the VPN server"
    });
  }
});

module.exports = router;
