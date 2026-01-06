# Docker Deployment Guide for Hostinger

This guide explains the Docker-based deployment setup for Hostinger VPS.

## Files Overview

### Dockerfile
- **Multi-stage build**: Builds frontend in first stage, runs production server in second stage
- **Optimized**: Only production dependencies in final image
- **Health check**: Built-in health check endpoint
- **Port**: Exposes port 3000 (configurable via PORT environment variable)

### docker-compose.yml
- **Service**: Single `backend` service
- **Port mapping**: Maps host port (default 8000) to container port 3000
- **Environment**: Loads from `.env` file
- **Restart policy**: Always restart on failure
- **Health check**: Monitors application health

## Hostinger Build Process

When Hostinger detects `docker-compose.yml`:

1. **Build Stage**: 
   - Runs `docker-compose build` or equivalent
   - Builds Docker image using Dockerfile
   - Installs dependencies and builds frontend

2. **Deploy Stage**:
   - Runs `docker-compose up -d` or equivalent
   - Starts container with environment variables
   - Maps ports as configured

## Environment Variables

Required in `.env` file:

```env
# Server Configuration
PORT=3000
NODE_ENV=production

# Supabase Configuration
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# CORS Configuration
ALLOWED_ORIGINS=https://your-domain.com
```

## Port Configuration

- **Container Port**: 3000 (internal, fixed)
- **Host Port**: Configurable via `PORT` environment variable in docker-compose.yml
- **Hostinger**: May assign a specific port - update `docker-compose.yml` ports mapping if needed

Example port mapping:
```yaml
ports:
  - "8000:3000"  # Host:Container
```

## Build Commands

### Local Testing

```bash
# Build image
docker-compose build

# Start container
docker-compose up -d

# View logs
docker-compose logs -f backend

# Stop container
docker-compose down
```

### Hostinger

Hostinger will automatically:
1. Detect `docker-compose.yml`
2. Build the Docker image
3. Start the container
4. Map ports according to configuration

## Troubleshooting

### "No Docker compose files found"
- ✅ Ensure `docker-compose.yml` is in project root
- ✅ Ensure file is committed to repository
- ✅ Check file permissions

### Port conflicts
- Update `docker-compose.yml` ports mapping
- Ensure PORT environment variable matches Hostinger's assignment

### Build failures
- Check `.dockerignore` excludes unnecessary files
- Verify all dependencies are in `package.json`
- Review build logs in Hostinger dashboard

### Container won't start
- Verify `.env` file exists with required variables
- Check logs: `docker-compose logs backend`
- Verify health check endpoint: `/api/health`

## Health Check

The application includes a health check endpoint:
- **URL**: `http://localhost:3000/api/health`
- **Response**: `{"status":"ok","timestamp":"...","environment":"production"}`

This is used by Docker and Hostinger to verify the application is running.

## Production Considerations

1. **Environment Variables**: Never commit `.env` to repository
2. **Secrets**: Use Hostinger's environment variable management
3. **Logs**: Logs are persisted in `./logs` directory (mounted volume)
4. **Restarts**: Container auto-restarts on failure
5. **Updates**: Rebuild and restart container for updates

## Migration from PM2

If migrating from PM2-based deployment:

1. Docker replaces PM2 for process management
2. No need for `ecosystem.config.cjs` in Docker (but kept for VPS deployment)
3. Environment variables work the same way
4. Logs are handled by Docker logging

## Support

For Hostinger-specific issues:
- Check Hostinger documentation
- Review container logs in Hostinger dashboard
- Verify environment variables are set correctly

