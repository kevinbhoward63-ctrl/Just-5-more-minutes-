@echo off
cd /d "%~dp0"
if not exist node_modules (
  echo Installing, this only happens the first time...
  call npm install
)
call npm start
