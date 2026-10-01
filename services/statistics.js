const startedAt = Date.now();

function getStats() {
  const uptimeSeconds = Math.floor(
    (Date.now() - startedAt) / 1000
  );

  return {
    uptime: uptimeSeconds,
    dataSavedMB: 0,
    dataUsedMB: 0,
    connectedUsers: 0
  };
}

module.exports = {
  getStats
};
