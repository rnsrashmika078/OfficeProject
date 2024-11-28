@echo off
cd /d "%~dp0"  :: Ensure we're in the current directory

:: Check if Node.js is installed
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo Node.js not found. Installing using fnm...
    :: Install fnm (Fast Node Manager) using winget
    winget install Schniz.fnm
    
    :: Configure fnm environment
    fnm env --use-on-cd | Out-String | Invoke-Expression
    
    :: Install Node.js version 22 if missing
    fnm use --install-if-missing 22
    
    echo Node.js installed successfully.
) else (
    echo Node.js is already installed.
)

:: Run 'serve' command
start cmd /k "npm run dev"

:: Wait for a few seconds to allow the server to start
timeout /t 1 /nobreak

:: Open the browser at localhost:5173
start http://localhost:5173
