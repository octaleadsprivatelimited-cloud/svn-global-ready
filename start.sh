#!/bin/bash

# Startup script for Hostinger VPS deployment

echo "Starting SVN Global application..."

# Load environment variables
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
fi

# Build frontend if dist doesn't exist
if [ ! -d "dist" ]; then
    echo "Building frontend..."
    npm run build
fi

# Create logs directory if it doesn't exist
mkdir -p logs

# Start with PM2
echo "Starting PM2 process..."
pm2 start ecosystem.config.cjs

# Save PM2 configuration
pm2 save

echo "Application started successfully!"
echo "Check status with: pm2 status"
echo "View logs with: pm2 logs svn-global-backend"

