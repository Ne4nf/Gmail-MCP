# Prepare Submission Package

Write-Host @"
╔══════════════════════════════════════════════════════════╗
║     TechNext Asia AI Intern Test                         ║
║     Submission Package Preparation                       ║
║     Platform: Claude Code                                ║
╚══════════════════════════════════════════════════════════╝
"@ -ForegroundColor Cyan

$projectPath = $PSScriptRoot
$projectName = Split-Path $projectPath -Leaf
$submissionPath = Join-Path (Split-Path $projectPath) "Submission-$projectName"
$zipPath = Join-Path (Split-Path $projectPath) "$projectName-Submission.zip"

Write-Host "`n📋 Step 1: Creating submission folder..." -ForegroundColor Yellow

# Create submission directory
if (Test-Path $submissionPath) {
    Remove-Item $submissionPath -Recurse -Force
}
New-Item -ItemType Directory -Path $submissionPath | Out-Null
New-Item -ItemType Directory -Path "$submissionPath\screenshots" | Out-Null

Write-Host "   ✓ Created: $submissionPath" -ForegroundColor Green

# Files to include
$filesToCopy = @(
    "gmail-mcp-server.js",
    "todo-mcp-server.js",
    "package.json",
    "package-lock.json",
    "START-HERE.md",
    "BAI-TEST-HUONG-DAN.md",
    "CLAUDE-CODE-GUIDE.md",
    "README.md",
    "QUICKSTART.md",
    "TESTING.md",
    "SUBMISSION.md",
    "prepare-submission.ps1",
    ".gitignore",
    "client_secret_425114907013-2oen4a4prekk0rndu8r9e1901irc8rnj.apps.googleusercontent.com.json"
)

Write-Host "`n📁 Step 2: Copying source files..." -ForegroundColor Yellow

foreach ($file in $filesToCopy) {
    $sourcePath = Join-Path $projectPath $file
    if (Test-Path $sourcePath) {
        Copy-Item $sourcePath $submissionPath -Force
        Write-Host "   ✓ $file" -ForegroundColor Green
    } else {
        Write-Host "   ⚠ Skipped: $file (not found)" -ForegroundColor DarkYellow
    }
}

# Copy node_modules (optional - comment out if too large)
# Write-Host "`n📦 Step 3: Copying node_modules..." -ForegroundColor Yellow
# if (Test-Path "$projectPath\node_modules") {
#     Copy-Item "$projectPath\node_modules" "$submissionPath\node_modules" -Recurse -Force
#     Write-Host "   ✓ node_modules copied" -ForegroundColor Green
# }

Write-Host "`n📸 Step 3: Screenshot directory created" -ForegroundColor Yellow
Write-Host "   Please copy your screenshots to:" -ForegroundColor White
Write-Host "   $submissionPath\screenshots\" -ForegroundColor Cyan
Write-Host ""
Write-Host "   Required screenshots:" -ForegroundColor White
Write-Host "   1. claude-code-mcp-status.png" -ForegroundColor Gray
Write-Host "   2. gmail-authorization.png" -ForegroundColor Gray
Write-Host "   3. gmail-search-result.png" -ForegroundColor Gray
Write-Host "   4. gmail-email-detail.png" -ForegroundColor Gray
Write-Host "   5. gmail-reply-success.png" -ForegroundColor Gray
Write-Host "   6. todo-add-tasks.png" -ForegroundColor Gray
Write-Host "   7. todo-statistics.png" -ForegroundColor Gray
Write-Host "   8. todo-claude-code-usage.png" -ForegroundColor Gray

Write-Host "`n📝 Step 4: Creating submission checklist..." -ForegroundColor Yellow

$checklist = @"
SUBMISSION CHECKLIST
═══════════════════════════════════════════════════════

Before zipping and submitting, please verify:

□ Gmail MCP
  □ Server code complete (gmail-mcp-server.js)
  □ Can search emails
  □ Can get email details  
  □ Can reply to emails
  □ Screenshots included

□ Todo MCP
  □ Server code complete (todo-mcp-server.js)
  □ All 6 tools working (add, list, complete, delete, update, stats)
  □ Resources working (todo://list)
  □ Screenshots included

□ Documentation
  □ README.md with setup instructions
  □ QUICKSTART.md completed
  □ SUBMISSION.md filled out with your details
  □ All screenshots in screenshots/ folder

□ Testing
  □ Both servers tested with Claude Desktop
  □ Found application email and got details
  □ Replied to email via MCP (not Gmail UI)
  □ Todo server fully tested

□ Files
  □ Source code clean and commented
  □ package.json included
  □ OAuth client_secret included
  □ .gitignore appropriate
  □ No sensitive tokens (token.json excluded)

□ Submission
  □ SUBMISSION.md filled with your info
  □ Explanation for Todo MCP choice written
  □ All screenshots clear and readable
  □ Ready to zip

═══════════════════════════════════════════════════════

Created: $(Get-Date -Format "yyyy-MM-dd HH:mm")
"@

$checklist | Out-File "$submissionPath\CHECKLIST.txt" -Encoding UTF8
Write-Host "   ✓ Created CHECKLIST.txt" -ForegroundColor Green

Write-Host "`n⏳ Step 5: Creating ZIP file..." -ForegroundColor Yellow
Write-Host "   Please copy screenshots first, then press any key to continue..." -ForegroundColor DarkYellow
Write-Host "   (Or press Ctrl+C to exit and run this script again later)" -ForegroundColor DarkGray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

# Check if screenshots exist
$screenshotCount = (Get-ChildItem "$submissionPath\screenshots" -File -ErrorAction SilentlyContinue).Count
if ($screenshotCount -eq 0) {
    Write-Host "   ⚠ No screenshots found! Please add them before zipping." -ForegroundColor Red
    Write-Host "   Creating zip anyway..." -ForegroundColor DarkYellow
}

# Create zip
if (Test-Path $zipPath) {
    Remove-Item $zipPath -Force
}

Compress-Archive -Path "$submissionPath\*" -DestinationPath $zipPath -Force
Write-Host "   ✓ Created: $zipPath" -ForegroundColor Green

$zipSize = (Get-Item $zipPath).Length / 1MB
Write-Host "   📊 Size: $([math]::Round($zipSize, 2)) MB" -ForegroundColor Cyan

Write-Host @"

╔══════════════════════════════════════════════════════════╗
║                  ✅ PREPARATION COMPLETE                 ║
╚══════════════════════════════════════════════════════════╝

📦 Submission package ready:
   $zipPath

📝 Before submitting:
   1. Review CHECKLIST.txt in submission folder
   2. Verify all screenshots are included
   3. Fill out SUBMISSION.md with your details
   4. Test the zip file by extracting and reviewing

📧 Submit to TechNext Asia:
   - Attach the ZIP file
   - Include SUBMISSION.md content in email body
   - Or upload to requested platform

🎯 Good luck with your application!

"@ -ForegroundColor Green

Write-Host "Press any key to open submission folder..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

# Open submission folder
Invoke-Item $submissionPath
