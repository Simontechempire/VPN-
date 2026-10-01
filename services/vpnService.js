const VPN_API_URL = process.env.VPN_API_URL;
const VPN_API_TOKEN = process.env.VPN_API_TOKEN;

async function request(endpoint, method = "GET") {
  if (!VPN_API_URL || !VPN_API_TOKEN) {
    throw new Error("VPN API is not configured");
  }

  const response = await fetch(`${VPN_API_URL}${endpoint}`, {
    method,
    headers: {
      "Authorization": `Bearer ${VPN_API_TOKEN}`,
      "Content-Type": "application/json"
    }
  });

  if (!response.ok) {
    throw new Error(`VPN server returned ${response.status}`);
  }

  return response.json();
}

async function enable() {
  return request("/vpn/on", "POST");
}

async function disable() {
  return request("/vpn/off", "POST");
}

async function getStatus() {
  return request("/vpn/status");
}

module.exports = {
  enable,
  disable,
  getStatus
};
