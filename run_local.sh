#!/bin/bash

echo "Starting local server for Simmer Coming Soon page..."
echo "Open your browser and navigate to http://localhost:8000"
echo "Press Ctrl+C to stop the server"

# Check if Python 3 is available
if command -v python3 &>/dev/null; then
    python3 -m http.server
# If not, try Python 2
elif command -v python &>/dev/null; then
    python -m SimpleHTTPServer
# If neither is available
else
    echo "Error: Python is not installed. Please install Python or use another web server."
    exit 1
fi 