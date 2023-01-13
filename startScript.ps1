if (-not (Get-Command npm)){
    Write-Host "please install npm"
    break;
}

$currentPath = Split-Path $MyInvocation.MyCommand.Path -Parent

$backendPath = $currentPath+"\backend\"
$frontendPath = $currentPath+"\frontend\"

if(Test-Path -Path $backendPath+"\node_modules") {
    invoke-expression "cmd /c start powershell -Command { & 'npm' start --prefix $backendPath --silent}"
} else {
    Write-Host "node modules for backend not available, please verify your installation"
}
if(Test-Path -Path $frontendPath+"\node_modules") {
    invoke-expression "cmd /c start powershell -Command { & 'npm' start--prefix $frontendPath  --silent}"
} else {
    Write-Host "node modules for frontend not available, please verify your installation"
}
Write-Host "Please press any key"
Read-Host