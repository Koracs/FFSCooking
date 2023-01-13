if (-not (Get-Command npm)){
    Write-Host "please install npm"
    break;
}

$currentPath = Split-Path $MyInvocation.MyCommand.Path -Parent

$backendPath = $currentPath+"\backend\"
$frontendPath = $currentPath+"\frontend\"

if(Test-Path -Path $backendPath) {
    Write-Host "start backend installation"
	& cd $backendPath
    & npm install $backendPath --prefix $backendPath
    Write-Host "backend finished"
} else {
    Write-Host "backend path for node modules already exists, please check manually your installation"
}

if(Test-Path -Path $frontendPath) {
    Write-Host "start frontend installation"
	& cd $frontendPath
    & npm install $frontendPath --prefix $frontendPath
    Write-Host "frontend finished"
} else {
    Write-Host "frontend path for node modules already exists, please check manually your installation"
}
    
Write-Host "Please press any key"
Read-Host
