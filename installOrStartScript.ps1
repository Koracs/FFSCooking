if (-not (Get-Command npm)){
    Write-Host "please install npm"
    break;
}

$currentPath = Split-Path $MyInvocation.MyCommand.Path -Parent

$backendPath = $currentPath+"\backend\"
$frontendPath = $currentPath+"\frontend\"

$input = Read-Host "Press 1 to install the client-server componentens based on their package.json`nPress 2 to run the client-server componentens based on their package.json"
if( $input -eq 1) {
    if(-not (Test-Path -Path $backendPath)) {
        mkdir -p $backendPath
    }
     
    & npm --prefix $backendPath install --silent

    if(-not (Test-Path -Path $frontendPath)) {
        mkdir -p $frontendPath
    }
    & "npm" --prefix $frontendPath install --silent

    Write-Host "finished"
}
elseif ($input -eq 2) {

    invoke-expression "cmd /c start powershell -Command { & 'npm' --prefix $backendPath 'start'}"
    invoke-expression "cmd /c start powershell -Command { & 'npm' --prefix $frontendPath start --silent}"
}