@echo off
echo ========================================
echo  Game Night Website - Development Mode
echo ========================================
echo.
echo Starting file watcher and local server...
echo.
echo This will:
echo   - Watch for file changes
echo   - Auto-commit and push to GitHub
echo   - Start local server on http://localhost:8000
echo.
echo Press Ctrl+C to stop
echo.

start "Local Server" cmd /k "npx http-server -p 8000 -o"
timeout /t 2 /nobreak >nul
node watch-and-sync.js
