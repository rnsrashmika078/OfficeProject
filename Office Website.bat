@echo off
cd /d "%~dp0"  :: Ensure we're in the current directory

:: Run 'serve' command
start cmd /k "npm run dev"

:: Wait for a few seconds to allow the server to start
timeout /t 1 /nobreak

:: Open the browser at localhost:5173
start http://localhost:5173
