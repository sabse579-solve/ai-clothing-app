Write-Host "Cleaning React Native Project..." -ForegroundColor Cyan

# Delete node_modules in root
if (Test-Path ".\node_modules") {
    Write-Host "Deleting root node_modules..."
    Remove-Item -Recurse -Force ".\node_modules"
}

# Delete node_modules in mobile folder
if (Test-Path ".\mobile\node_modules") {
    Write-Host "Deleting mobile node_modules..."
    Remove-Item -Recurse -Force ".\mobile\node_modules"
}

# Delete .bundle
if (Test-Path ".\.bundle") {
    Write-Host "Deleting .bundle folder..."
    Remove-Item -Recurse -Force ".\.bundle"
}

# Clean Android builds
if (Test-Path ".\mobile\android\build") {
    Write-Host "Deleting android/build..."
    Remove-Item -Recurse -Force ".\mobile\android\build"
}

if (Test-Path ".\mobile\android\.gradle") {
    Write-Host "Deleting android/.gradle..."
    Remove-Item -Recurse -Force ".\mobile\android\.gradle"
}

if (Test-Path ".\mobile\android\app\build") {
    Write-Host "Deleting android/app/build..."
    Remove-Item -Recurse -Force ".\mobile\android\app\build"
}

# Clean iOS Pods if exist
if (Test-Path ".\mobile\ios\Pods") {
    Write-Host "Deleting ios/Pods..."
    Remove-Item -Recurse -Force ".\mobile\ios\Pods"
}

Write-Host "Cleanup complete!" -ForegroundColor Green
