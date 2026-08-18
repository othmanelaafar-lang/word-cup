@echo off
title Coupe du Monde 2026 - Serveur local
echo.
echo  ============================================
echo   Coupe du Monde 2026 - Plans de lecons
echo   Demarrage du serveur local...
echo  ============================================
echo.
echo  Ouvrez votre navigateur sur : http://localhost:8080
echo.
echo  Appuyez sur Ctrl+C pour arreter le serveur.
echo.
cd /d "%~dp0"
start http://localhost:8080
python -m http.server 8080
