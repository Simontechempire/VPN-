const settings = {
  adBlocking: true,
  trackerBlocking: true,
  imageOptimization: true,
  videoSaver: true,
  caching: true
};

function getSettings() {
  return settings;
}

function updateSettings(newSettings) {
  Object.assign(settings, newSettings);
  return settings;
}

module.exports = {
  getSettings,
  updateSettings
};
