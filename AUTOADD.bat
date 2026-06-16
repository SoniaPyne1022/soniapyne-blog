@echo off
:: Resolve Windows terminal character encoding issues (UTF-8)
chcp 65001 >nul

:: Change directory to the current script's location (Core for "Bash Here")
cd /d "%~dp0"

echo Current working directory: %cd%
echo ====================================================================

:: Check for Git Bash in the default installation path; fallback to environment variable if not found
set "MY_BASH=bash"
if exist "C:\Program Files\Git\bin\bash.exe" (
    set "MY_BASH=C:\Program Files\Git\bin\bash.exe"
)

:: [Line 1] Execute Git Workflow via Git Bash (Add -> Commit -> Push)
echo [Step 1/2] Executing Hexo clean, generate, and deploy...
"%MY_BASH%" -c "hexo clean && hexo g && hexo d"

echo.

:: [Line 2] Execute Hexo Workflow via Git Bash (Clean -> Generate -> Deploy)
echo [Step 2/2] Executing Git commit and push...
"%MY_BASH%" -c "git add . && git commit -m 'update' && git push"

echo ====================================================================
echo All steps have been executed sequentially!
pause