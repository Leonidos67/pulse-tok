# Настройка Git конфигурации
git config --global user.name "Leonid"
git config --global user.email "leonid@example.com"

# Проверка конфигурации
Write-Host "Git конфигурация:" -ForegroundColor Green
git config --global user.name
git config --global user.email

Write-Host "`nТеперь можно выполнить:" -ForegroundColor Yellow
Write-Host "git add ." -ForegroundColor Cyan
Write-Host "git commit -m 'Prepare for Vercel deployment'" -ForegroundColor Cyan
Write-Host "git push" -ForegroundColor Cyan

