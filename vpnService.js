let enabled = false;

function enable() {
  enabled = true;

  return getStatus();
}

function disable() {
  enabled = false;

  return getStatus();
}

function getStatus() {
  return {
    enabled,
    mode: enabled ? "DATA_SAVER" : "OFF"
  };
}

module.exports = {
  enable,
  disable,
  getStatus
};
