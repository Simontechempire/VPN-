async function checkAuth() {

  const response = await fetch("/api/auth/status");
  const data = await response.json();

  if (!data.authenticated) {
    window.location.href = "/login.html";
  }
}

async function loadVPNStatus() {

  const response = await fetch("/api/vpn/status");

  if (response.status === 401) {
    window.location.href = "/login.html";
    return;
  }

  const data = await response.json();

  document.getElementById("vpnStatus").textContent =
    data.status.enabled ? "ON" : "OFF";
}

async function loadStats() {

  const response =
    await fetch("/api/dashboard/stats");

  if (response.status === 401) {
    window.location.href = "/login.html";
    return;
  }

  const data = await response.json();

  const stats = data.stats;

  document.getElementById("saved").textContent =
    `${stats.dataSavedMB} MB`;

  document.getElementById("used").textContent =
    `${stats.dataUsedMB} MB`;

  document.getElementById("users").textContent =
    stats.connectedUsers;

  document.getElementById("uptime").textContent =
    `${stats.uptime}s`;
}

async function setVPN(action) {

  const response =
    await fetch(`/api/vpn/${action}`, {
      method: "POST"
    });

  if (response.status === 401) {
    window.location.href = "/login.html";
    return;
  }

  const data = await response.json();

  document.getElementById("vpnStatus").textContent =
    data.status.enabled ? "ON" : "OFF";
}

async function logout() {

  await fetch("/api/auth/logout", {
    method: "POST"
  });

  window.location.href = "/login.html";
}

checkAuth();
loadVPNStatus();
loadStats();

setInterval(() => {
  loadVPNStatus();
  loadStats();
}, 5000);
