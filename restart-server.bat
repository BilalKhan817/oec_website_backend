@echo off
cd /d "d:\OEC\oec_website_backend"
echo Killing any existing node processes on port 3000...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000 ^| findstr LISTENING') do taskkill /F /PID %%a 2>nul
timeout /t 2 /nobreak >nul
echo Starting backend server...
node index.js
