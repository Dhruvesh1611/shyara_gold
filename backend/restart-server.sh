#!/bin/bash

# Kill any process on port 5000
echo "Stopping any process on port 5000..."
lsof -ti:5000 | xargs kill -9 2>/dev/null || true

# Wait a moment
sleep 2

# Start the backend server
echo "Starting backend server..."
node userreg.js
