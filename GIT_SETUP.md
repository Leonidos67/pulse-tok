# Настройка Git для деплоя

## Проблема: Git требует настройки имени и email

Если вы получили ошибку:
```
Author identity unknown
*** Please tell me who you are.
```

## Решение: Настройте Git конфигурацию

### Вариант 1: Через PowerShell (рекомендуется)

Выполните эти команды в PowerShell в директории проекта:

```powershell
# Настройка имени и email
git config --global user.name "Ваше Имя"
git config --global user.email "ваш@email.com"

# Или только для этого репозитория (без --global):
git config user.name "Ваше Имя"
git config user.email "ваш@email.com"
```

### Вариант 2: Через файл setup-git.ps1

Запустите созданный файл `setup-git.ps1`:

```powershell
.\setup-git.ps1
```

### Вариант 3: Вручную в терминале

1. Откройте PowerShell в директории проекта
2. Выполните:
   ```powershell
   git config --global user.name "Leonid"
   git config --global user.email "your-email@example.com"
   ```
   (замените на ваш реальный email)

## После настройки Git

Выполните команды для отправки на GitHub:

```bash
# Проверка статуса
git status

# Добавление всех файлов
git add .

# Создание коммита
git commit -m "Prepare for Vercel deployment"

# Если еще не добавлен remote, добавьте:
git remote add origin https://github.com/YOUR_USERNAME/pulsetok.git

# Отправка на GitHub
git branch -M main
git push -u origin main
```

## Проверка конфигурации

Проверьте, что настройки применены:

```bash
git config --global user.name
git config --global user.email
```

## Использование вашего GitHub email

Если у вас есть GitHub аккаунт, используйте email, связанный с GitHub:

1. Перейдите на https://github.com/settings/emails
2. Найдите ваш email (обычно он скрыт, например: `username@users.noreply.github.com`)
3. Используйте его в команде:
   ```bash
   git config --global user.email "username@users.noreply.github.com"
   ```

## Готово!

После настройки Git вы сможете делать коммиты и отправлять код на GitHub для деплоя на Vercel.

