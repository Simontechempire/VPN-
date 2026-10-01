# ⚡ Data Saver VPN

A legal data-saving VPN control dashboard.

## Features

- VPN ON/OFF control
- Data usage statistics
- Data-saving configuration
- Ad/tracker blocking controls
- Image optimization controls
- Video-saving controls
- User authentication
- Render deployment support

## Architecture

Render hosts the dashboard and control API.

A separate VPS is used for the actual VPN infrastructure.

## Security

Never commit `.env` or VPN private keys to GitHub.

Use Render environment variables for secrets.

## Development

Install dependencies:

npm install

Start:

npm start
