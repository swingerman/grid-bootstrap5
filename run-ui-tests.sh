#!/bin/bash

# Grid Bootstrap5 UI Test Runner
# Runs UI tests without needing to build CSS (uses existing dist files)

echo "🎯 Grid Bootstrap5 UI Test Runner"
echo "================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the root directory of the grid-bootstrap5 project"
    exit 1
fi

# Check if dist files exist
if [ ! -f "dist/css/grid-bootstrap-next.min.css" ]; then
    echo "❌ Error: CSS distribution files not found. Please ensure dist/css/grid-bootstrap-next.min.css exists"
    exit 1
fi

echo "✅ CSS distribution files found"

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check dependencies
echo "🔍 Checking dependencies..."

if ! command_exists node; then
    echo "❌ Error: Node.js is not installed"
    exit 1
fi

if ! command_exists npx; then
    echo "❌ Error: npx is not available"
    exit 1
fi

echo "✅ Node.js and npx are available"

# Install Playwright if not available
if ! npx playwright --version >/dev/null 2>&1; then
    echo "📦 Installing Playwright..."
    npm install -g @playwright/test playwright 2>/dev/null || {
        echo "⚠️  Global install failed, trying local install..."
        # Create a temporary package.json for Playwright only
        mkdir -p .playwright-temp
        cd .playwright-temp
        npm init -y >/dev/null
        npm install @playwright/test playwright >/dev/null
        cd ..
        export PATH="$PWD/.playwright-temp/node_modules/.bin:$PATH"
    }
fi

# Install browsers
echo "🌐 Installing Playwright browsers..."
npx playwright install chromium >/dev/null 2>&1 || echo "⚠️  Browser install failed, but continuing..."

# Start HTTP server
echo "🚀 Starting HTTP server..."
if command_exists python3; then
    python3 -m http.server 3000 >/dev/null 2>&1 &
    SERVER_PID=$!
elif command_exists python; then
    python -m http.server 3000 >/dev/null 2>&1 &
    SERVER_PID=$!
elif npx http-server --version >/dev/null 2>&1; then
    npx http-server -p 3000 >/dev/null 2>&1 &
    SERVER_PID=$!
else
    echo "❌ Error: No HTTP server available. Please install Python or http-server"
    exit 1
fi

# Wait for server to start
echo "⏳ Waiting for server to start..."
sleep 3

# Test if server is running
if curl -s http://localhost:3000/tests/ui/index.html >/dev/null; then
    echo "✅ Server is running at http://localhost:3000"
else
    echo "❌ Error: Server failed to start"
    kill $SERVER_PID 2>/dev/null
    exit 1
fi

# Run tests
echo "🧪 Running UI tests..."
if npx playwright test; then
    echo "✅ All tests passed!"
    TEST_RESULT=0
else
    echo "❌ Some tests failed"
    TEST_RESULT=1
fi

# Cleanup
echo "🧹 Cleaning up..."
kill $SERVER_PID 2>/dev/null
rm -rf .playwright-temp 2>/dev/null

echo ""
echo "📋 Test Summary:"
echo "  📁 Test pages: tests/ui/pages/"
echo "  📊 Test results: test-results/"
echo "  📸 Screenshots: tests/ui/screenshots/"
echo ""
echo "To view tests manually, run: npm run serve"
echo "Then open: http://localhost:3000/tests/ui/"

exit $TEST_RESULT