# Quick VPS Setup Guide

## Quick Start Commands

### 1. Initial Setup (One-time)

```bash
# Install Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs

# Install PM2
npm install -g pm2

# Install Nginx (optional)
apt install -y nginx
```

### 2. Deploy Application

```bash
# Navigate to project directory
cd /var/www/svn-global

# Install dependencies
npm install

# Copy environment file
cp env.example .env
nano .env  # Edit with your credentials

# Build frontend
npm run build

# Start application
chmod +x start.sh
./start.sh
```

### 3. Configure Nginx (Optional)

```bash
# Copy nginx config
cp nginx.conf.example /etc/nginx/sites-available/svn-global
nano /etc/nginx/sites-available/svn-global  # Update domain name

# Enable site
ln -s /etc/nginx/sites-available/svn-global /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

### 4. Setup SSL (Recommended)

```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d your-domain.com
```

## Common Commands

```bash
# Check application status
pm2 status

# View logs
pm2 logs svn-global-backend

# Restart application
pm2 restart svn-global-backend

# Stop application
pm2 stop svn-global-backend

# Update application
git pull
npm install
npm run build
pm2 restart svn-global-backend
```

## Environment Variables

Key variables to set in `.env`:

- `SUPABASE_URL`: Your Supabase project URL
- `SUPABASE_ANON_KEY`: Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY`: Supabase service role key (for backend)
- `ALLOWED_ORIGINS`: Comma-separated list of allowed origins
- `PORT`: Backend server port (default: 3000)

## Troubleshooting

**Application won't start:**
```bash
pm2 logs svn-global-backend
cat .env  # Verify environment variables
```

**502 Bad Gateway:**
```bash
pm2 status  # Check if backend is running
curl http://localhost:3000/api/health  # Test backend
```

**Port already in use:**
```bash
netstat -tulpn | grep 3000
# Kill process or change PORT in .env
```

For detailed instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

