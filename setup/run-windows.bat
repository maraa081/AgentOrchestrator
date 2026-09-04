@echo off
REM Lanceur Windows simple : powershell -ExecutionPolicy Bypass -File setup\run-windows.ps1
powershell -ExecutionPolicy Bypass -File "%~dp0run-windows.ps1" %*
