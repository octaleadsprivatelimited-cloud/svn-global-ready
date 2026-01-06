# Docker Deployment Validation Checklist

## ✅ Pre-Deployment Checklist

### Required Files (All Present)
- [x] `Dockerfile` - Multi-stage build configuration
- [x] `docker-compose.yml` - Service orchestration
- [x] `.dockerignore` - Build optimization
- [x] `server.js` - Backend server
- [x] `package.json` - Dependencies and scripts

### Dockerfile Validation
- [x] Uses `node:18-alpine` (LTS version)
- [x] Multi-stage build (optimized image size)
- [x] WORKDIR set to `/app`
- [x] Dependencies installed correctly
- [x] Frontend built in builder stage
- [x] EXPOSE 3000 (container port)
- [x] CMD uses `npm run server`
- [x] Health check configured

### docker-compose.yml Validation
- [x] Version 3.8 (compatible)
- [x] Service named `backend`
- [x] Builds from Dockerfile
- [x] Port mapping: `8000:3000` (Hostinger standard)
- [x] Environment variables loaded from `.env`
- [x] Restart policy: `always`
- [x] Health check configured
- [x] Network configured

### Configuration Validation
- [x] Server listens on `0.0.0.0` (required for Docker)
- [x] PORT environment variable supported
- [x] Health endpoint: `/api/health`
- [x] Environment variables properly loaded

## 🚀 Hostinger Build Process

### Expected Build Steps
1. **Clone Repository** ✅
2. **Detect docker-compose.yml** ✅
3. **Build Docker Image**
   - Run: `docker-compose build` or equivalent
   - Build frontend in builder stage
   - Create production image
4. **Start Container**
   - Run: `docker-compose up -d` or equivalent
   - Map port 8000 → 3000
   - Load environment variables
5. **Health Check**
   - Verify `/api/health` endpoint
   - Container status: running

### Expected Output
```
✓ Docker compose files found
✓ Building Docker image...
✓ Starting container...
✓ Application running on port 8000
```

## 🔍 Troubleshooting

### Issue: "No Docker compose files found"
**Solution**: 
- Verify `docker-compose.yml` is in project root
- Check file is committed to repository
- Ensure no typos in filename

### Issue: Build fails
**Check**:
- All dependencies in `package.json`
- `.dockerignore` not excluding required files
- Node.js version compatibility

### Issue: Container won't start
**Check**:
- `.env` file exists with required variables
- Port 8000 not already in use
- Environment variables correctly set

### Issue: Health check fails
**Check**:
- Server is listening on port 3000
- `/api/health` endpoint accessible
- Container logs for errors

## 📊 Port Configuration

| Component | Port | Notes |
|-----------|------|-------|
| Container Internal | 3000 | Fixed, set in Dockerfile |
| Host (Hostinger) | 8000 | Default, can be changed in docker-compose.yml |
| Environment Variable | PORT | Used by server.js (defaults to 3000) |

## ✅ Post-Deployment Verification

After successful deployment:

1. **Health Check**
   ```bash
   curl http://your-domain:8000/api/health
   ```
   Expected: `{"status":"ok","timestamp":"...","environment":"production"}`

2. **Application Access**
   - Visit: `http://your-domain:8000`
   - Should see React frontend
   - API endpoints should work

3. **Container Status**
   ```bash
   docker ps
   ```
   Should show `svn-global-backend` running

## 📝 Notes

- Container always uses port 3000 internally
- Host port 8000 is mapped to container port 3000
- If Hostinger assigns different port, update `docker-compose.yml` ports mapping
- Environment variables loaded from `.env` file
- Logs persisted in `./logs` directory

