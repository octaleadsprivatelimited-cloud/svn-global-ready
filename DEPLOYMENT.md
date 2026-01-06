# Hostinger VPS Deployment Guide

This guide will help you deploy the SVN Global application to a Hostinger VPS server.

## Prerequisites

- Hostinger VPS with Ubuntu/Debian Linux
- SSH access to your VPS
- Domain name pointed to your VPS IP (optional but recommended)
- Node.js 18+ installed
- PM2 installed globally
- Nginx installed (optional but recommended)

## Step 1: Server Setup

### 1.1 Connect to your VPS

```bash
ssh root@your-vps-ip
```

### 1.2 Update system packages

```bash
apt update && apt upgrade -y
```

### 1.3 Install Node.js 18+

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs
node --version  # Verify installation
```

### 1.4 Install PM2 globally

```bash
npm install -g pm2
```

### 1.5 Install Nginx (optional but recommended)

```bash
apt install -y nginx
systemctl enable nginx
systemctl start nginx
```

## Step 2: Application Deployment

### 2.1 Clone or upload your project

```bash
# Option 1: Clone from Git
cd /var/www
git clone your-repository-url svn-global
cd svn-global

# Option 2: Upload via SCP
# From your local machine:
# scp -r . root@your-vps-ip:/var/www/svn-global
```

### 2.2 Install dependencies

```bash
cd /var/www/svn-global
npm install
```

### 2.3 Configure environment variables

```bash
cp .env.example .env
nano .env
```

Update the following variables:
- `SUPABASE_URL`: Your Supabase project URL
- `SUPABASE_ANON_KEY`: Your Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role key (for backend)
- `ALLOWED_ORIGINS`: Your domain(s), e.g., `https://your-domain.com`
- `VITE_SUPABASE_URL`: Same as SUPABASE_URL
- `VITE_SUPABASE_PUBLISHABLE_KEY`: Same as SUPABASE_ANON_KEY
- `VITE_SUPABASE_PROJECT_ID`: Your Supabase project ID

### 2.4 Build the frontend

```bash
npm run build
```

This creates a `dist` folder with the production build.

### 2.5 Create logs directory

```bash
mkdir -p logs
```

## Step 3: Start the Application

### 3.1 Start with PM2

```bash
npm run pm2:start
```

Or manually:

```bash
pm2 start ecosystem.config.cjs
```

### 3.2 Check PM2 status

```bash
pm2 status
pm2 logs svn-global-backend
```

### 3.3 Save PM2 configuration

```bash
pm2 save
pm2 startup  # Follow the instructions to enable auto-start on boot
```

## Step 4: Configure Nginx (Optional but Recommended)

### 4.1 Create Nginx configuration

```bash
cp nginx.conf.example /etc/nginx/sites-available/svn-global
nano /etc/nginx/sites-available/svn-global
```

Update `your-domain.com` with your actual domain name.

### 4.2 Enable the site

```bash
ln -s /etc/nginx/sites-available/svn-global /etc/nginx/sites-enabled/
nginx -t  # Test configuration
systemctl reload nginx
```

### 4.3 Set up SSL with Let's Encrypt (Recommended)

```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d your-domain.com -d www.your-domain.com
```

Follow the prompts and update the nginx config to use HTTPS.

## Step 5: Firewall Configuration

### 5.1 Configure UFW firewall

```bash
ufw allow 22/tcp    # SSH
ufw allow 80/tcp    # HTTP
ufw allow 443/tcp   # HTTPS
ufw allow 3000/tcp  # Backend (if not using Nginx)
ufw enable
```

## Step 6: Verify Deployment

### 6.1 Check backend health

```bash
curl http://localhost:3000/api/health
```

### 6.2 Check via domain (if configured)

Visit `http://your-domain.com` or `https://your-domain.com` in your browser.

## Maintenance Commands

### Restart the application

```bash
npm run pm2:restart
# or
pm2 restart svn-global-backend
```

### Stop the application

```bash
npm run pm2:stop
# or
pm2 stop svn-global-backend
```

### View logs

```bash
pm2 logs svn-global-backend
# or
tail -f logs/pm2-combined.log
```

### Update the application

```bash
cd /var/www/svn-global
git pull  # If using Git
npm install
npm run build
pm2 restart svn-global-backend
```

## Troubleshooting

### Application won't start

1. Check PM2 logs: `pm2 logs svn-global-backend`
2. Verify environment variables: `cat .env`
3. Check if port 3000 is available: `netstat -tulpn | grep 3000`
4. Verify Node.js version: `node --version`

### 502 Bad Gateway (Nginx)

1. Check if backend is running: `pm2 status`
2. Check backend logs: `pm2 logs svn-global-backend`
3. Verify backend is listening: `curl http://localhost:3000/api/health`
4. Check Nginx error logs: `tail -f /var/log/nginx/error.log`

### Database connection issues

1. Verify Supabase credentials in `.env`
2. Check Supabase project status
3. Verify network connectivity: `curl https://your-supabase-url`

### Permission issues

```bash
# Fix ownership if needed
chown -R www-data:www-data /var/www/svn-global
chmod -R 755 /var/www/svn-global
```

## Security Recommendations

1. **Use HTTPS**: Always use SSL certificates for production
2. **Firewall**: Only open necessary ports
3. **Environment Variables**: Never commit `.env` to version control
4. **Regular Updates**: Keep system and dependencies updated
5. **Backups**: Regularly backup your database and application files
6. **Monitoring**: Set up monitoring for your application (PM2 Plus, or other tools)

## Additional Resources

- [PM2 Documentation](https://pm2.keymetrics.io/docs/usage/quick-start/)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [Hostinger VPS Documentation](https://www.hostinger.com/tutorials/vps)

