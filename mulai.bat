@echo off
title AMRT.dev - Dev Server

cd /d "%~dp0"
echo.
echo  ==========================================
echo   AMRT.dev - Starting Development Server
echo  ==========================================
echo.

REM Matikan node lama di port 3000
echo  Menutup server lama...
for /f "tokens=5" %%a in ('netstat -aon 2^>nul ^| findstr ":3000 "') do (
  taskkill /f /pid %%a >nul 2>&1
)
timeout /t 2 /nobreak >nul

echo  Server baru akan dimulai...
echo.
echo  URL:   http://localhost:3000
echo  Admin: http://localhost:3000/admin
echo.
echo  Tekan Ctrl+C untuk menghentikan server.
echo  ==========================================
echo.

REM Buka browser otomatis setelah 45 detik (tunggu compile pertama selesai)
start /min "" cmd /c "timeout /t 45 /nobreak > nul && start http://localhost:3000"

REM Jalankan dev server
npm run dev
