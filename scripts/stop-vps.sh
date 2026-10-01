#!/bin/bash

set -e

systemctl stop wg-quick@wg0 || true

echo "WireGuard VPN stopped."
