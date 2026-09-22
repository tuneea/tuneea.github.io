@echo off
chcp 65001 >nul
if "%~1"=="" (
  echo Usage: SET_REVIEW_KEY.bat github_pat_xxxxx
  echo Create the token here:
  echo https://github.com/settings/personal-access-tokens/new
  echo Resource owner: tuneea
  echo Only repository: reviews
  echo Permission: Issues = Read and write
  echo Contents / Actions / Secrets / Administration = No access
  exit /b 1
)
py -3 "%~dp0check_review_key.py" "%~1"
if errorlevel 1 exit /b 1
> "%~dp0..\js\review-inbox.js" echo window.TuneReviewInbox = { repo: "tuneea/reviews", token: "%~1" };
echo Key saved to js/review-inbox.js
