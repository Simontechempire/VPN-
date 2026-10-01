#!/bin/bash

set -e

systemctl enable wg-quick@wg0
systemctl start wg-quick@wg0

echo "WireGuard VPN started."
wg show
