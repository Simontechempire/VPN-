#!/bin/bash

set -e

echo "Installing WireGuard..."

apt update
apt install -y wireguard qrencode

echo "Enabling IP forwarding..."

cat > /etc/sysctl.d/99-datasaver-vpn.conf <<EOF
net.ipv4.ip_forward=1
net.ipv6.conf.all.forwarding=1
EOF

sysctl --system

echo "Generating server keys..."

mkdir -p /etc/wireguard
chmod 700 /etc/wireguard

umask 077

wg genkey | tee /etc/wireguard/server_private.key \
  | wg pubkey > /etc/wireguard/server_public.key

echo "WireGuard installation complete."
echo "Server public key:"
cat /etc/wireguard/server_public.key
