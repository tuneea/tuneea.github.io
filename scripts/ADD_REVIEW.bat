@echo off
chcp 65001 >nul
if "%~3"=="" (
  echo Usage: ADD_REVIEW.bat "Name" "City" "Review text"
  exit /b 1
)
gh workflow run add-review.yml --repo tuneea/tuneea.github.io -f "name=%~1" -f "city=%~2" -f "text=%~3"
if errorlevel 1 exit /b 1
echo Review queued.
