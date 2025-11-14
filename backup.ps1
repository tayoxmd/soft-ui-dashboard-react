# Backup Script
$timestamp = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"
$source = Get-Location
$backupDir1 = "C:\Users\xmd55\Desktop\Backup\Github-Backup"
$backupDir2 = "C:\Users\xmd55\Desktop\Backup\CPanel-Backup"

# Create backup directories if they don't exist
if (-not (Test-Path $backupDir1)) {
    New-Item -ItemType Directory -Path $backupDir1 -Force | Out-Null
}
if (-not (Test-Path $backupDir2)) {
    New-Item -ItemType Directory -Path $backupDir2 -Force | Out-Null
}

# GitHub Backup (before update)
$backup1 = Join-Path $backupDir1 "backup_before_$timestamp"
Write-Host "Creating GitHub backup before update..."
Copy-Item -Path $source -Destination $backup1 -Recurse -Exclude @("node_modules", ".git", "*.log") -Force
Write-Host "GitHub backup created: $backup1"

# CPanel Backup (before update) - ready for deployment
$backup2 = Join-Path $backupDir2 "backup_before_$timestamp"
Write-Host "Creating CPanel backup before update..."
# For CPanel, we need to copy only production-ready files
$cpanelFiles = @("src", "public", "package.json", "package-lock.json", "jsconfig.json", "gulpfile.js", "README.md")
New-Item -ItemType Directory -Path $backup2 -Force | Out-Null
foreach ($file in $cpanelFiles) {
    if (Test-Path $file) {
        Copy-Item -Path $file -Destination (Join-Path $backup2 $file) -Recurse -Force
    }
}
# Copy build folder if exists
if (Test-Path "build") {
    Copy-Item -Path "build" -Destination (Join-Path $backup2 "build") -Recurse -Force
}
Write-Host "CPanel backup created: $backup2"


