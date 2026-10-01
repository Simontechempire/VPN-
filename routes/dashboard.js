const express = require("express");
const statistics = require("../services/statistics");

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

router.get("/stats", requireAuth, (req, res) => {
  res.json({
    success: true,
    stats: statistics.getStats()
  });
});

module.exports = router;
