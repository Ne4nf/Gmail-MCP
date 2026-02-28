# Simple Submission Package Creator

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "Creating Submission Package..." -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

$submissionFolder = "TechNextAsia-AI-Intern-Test-Submission"
$zipFile = "TechNextAsia-AI-Intern-Test.zip"

# Clean up old submission
if (Test-Path $submissionFolder) {
    Remove-Item $submissionFolder -Recurse -Force
}
if (Test-Path $zipFile) {
    Remove-Item $zipFile -Force
}

# Create submission folder
New-Item -ItemType Directory -Path $submissionFolder -Force | Out-Null
New-Item -ItemType Directory -Path "$submissionFolder\screenshots" -Force | Out-Null

Write-Host "Copying source files..." -ForegroundColor Yellow

# Copy source files
$files = @(
    "gmail-mcp-server.js",
    "todo-mcp-server.js",
    "authorize-gmail.js",
    "package.json",
    "package-lock.json",
    "client_secret_425114907013-2oen4a4prekk0rndu8r9e1901irc8rnj.apps.googleusercontent.com.json",
    "START-HERE.md",
    "BAI-TEST-HUONG-DAN.md",
    "CLAUDE-CODE-GUIDE.md",
    "SEND-WITH-ATTACHMENTS.md",
    "README.md",
    "SUBMISSION.md",
    ".gitignore"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        Copy-Item $file $submissionFolder -Force
        Write-Host "  + $file" -ForegroundColor Green
    }
}

# Copy screenshots if any
if (Test-Path "screenshots") {
    $screenshots = Get-ChildItem "screenshots\*.png" -ErrorAction SilentlyContinue
    if ($screenshots) {
        foreach ($screenshot in $screenshots) {
            Copy-Item $screenshot.FullName "$submissionFolder\screenshots\" -Force
            Write-Host "  + screenshots\$($screenshot.Name)" -ForegroundColor Green
        }
    }
}

Write-Host "`nCreating ZIP file..." -ForegroundColor Yellow
Compress-Archive -Path "$submissionFolder\*" -DestinationPath $zipFile -Force

$zipSize = (Get-Item $zipFile).Length / 1MB
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "SUCCESS!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "`nSubmission package created:" -ForegroundColor White
Write-Host "  File: $zipFile" -ForegroundColor Cyan
Write-Host "  Size: $([math]::Round($zipSize, 2)) MB" -ForegroundColor Cyan

Write-Host "`nFolder: $submissionFolder\" -ForegroundColor Yellow
Write-Host "`nNext steps:" -ForegroundColor White
Write-Host "  1. Add screenshots to screenshots\ folder if not done" -ForegroundColor Gray
Write-Host "  2. Fill out SUBMISSION.md with your details" -ForegroundColor Gray
Write-Host "  3. Send $zipFile to TechNext Asia" -ForegroundColor Gray

Write-Host "`nOpening submission folder..." -ForegroundColor Yellow
Start-Sleep -Seconds 2
explorer $submissionFolder
