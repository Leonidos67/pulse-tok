# Команды для деплоя на Vercel

## Шаг 1: Отправка кода на GitHub

### Если Git еще не инициализирован:

```bash
# Инициализация Git
git init

# Добавление всех файлов
git add .

# Создание первого коммита
git commit -m "Initial commit: PulseTok with TikTok OAuth"

# Создайте репозиторий на GitHub:
# 1. Перейдите на https://github.com/new
# 2. Создайте новый репозиторий (например: pulsetok)
# 3. НЕ добавляйте README, .gitignore или license (они уже есть)

# Добавление remote (замените YOUR_USERNAME на ваш GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/pulsetok.git

# Отправка на GitHub
git branch -M main
git push -u origin main
```

### Если Git уже инициализирован:

```bash
# Проверка статуса
git status

# Добавление всех изменений
git add .

# Создание коммита
git commit -m "Prepare for Vercel deployment"

# Отправка на GitHub
git push
```

## Шаг 2: Деплой на Vercel

### Через веб-интерфейс Vercel:

1. Перейдите на [https://vercel.com](https://vercel.com)
2. Нажмите **"Sign Up"** или **"Log In"**
3. Войдите через GitHub
4. Нажмите **"Add New..."** → **"Project"**
5. Выберите ваш репозиторий `pulsetok`
6. Нажмите **"Import"**

### Настройка проекта в Vercel:

#### Project Name:
```
pulsetok
```

#### Framework Preset:
```
Vite
```
(выберите из выпадающего списка)

#### Root Directory:
```
./
```
(оставьте по умолчанию)

#### Build Command:
```
npm run build
```
(заполнено автоматически)

#### Output Directory:
```
dist
```
(заполнено автоматически)

#### Install Command:
```
npm install
```
(заполнено автоматически)

### Настройка переменных окружения:

**ПЕРЕД НАЖАТИЕМ "Deploy"** нажмите на **"Environment Variables"** и добавьте:

#### 1. TIKTOK_CLIENT_KEY
- **Key:** `TIKTOK_CLIENT_KEY`
- **Value:** `aw3kxewbgdb39tz9`
- **Environment:** Production, Preview, Development (выберите все три галочки)

#### 2. TIKTOK_CLIENT_SECRET
- **Key:** `TIKTOK_CLIENT_SECRET`
- **Value:** `oefvbMlkQ3kKiqhpf41ICGQjlvzRBvD5`
- **Environment:** Production, Preview, Development (выберите все три галочки)

#### 3. TIKTOK_REDIRECT_URI
- **Key:** `TIKTOK_REDIRECT_URI`
- **Value:** `https://YOUR_VERCEL_DOMAIN.vercel.app/auth/callback`
- **Environment:** Production, Preview, Development
- **ВАЖНО:** После первого деплоя вы получите URL (например: `pulsetok-abc123.vercel.app`), тогда обновите это значение на: `https://pulsetok-abc123.vercel.app/auth/callback`

**Альтернатива:** Оставьте это поле пустым - приложение автоматически использует VERCEL_URL.

#### 4. NODE_ENV
- **Key:** `NODE_ENV`
- **Value:** `production`
- **Environment:** Production

### Деплой:

1. После настройки всех переменных нажмите **"Deploy"**
2. Дождитесь завершения сборки (2-5 минут)
3. После успешного деплоя вы получите URL: `https://pulsetok-abc123.vercel.app`

## Шаг 3: Обновление Redirect URI в TikTok

1. После деплоя получите ваш Vercel URL (например: `https://pulsetok-abc123.vercel.app`)
2. Перейдите в [TikTok Developer Portal](https://developers.tiktok.com/)
3. Откройте ваше приложение
4. Перейдите в **"Login Kit"** → **"Web"**
5. Добавьте новый Redirect URI:
   ```
   https://pulsetok-abc123.vercel.app/auth/callback
   ```
   (замените на ваш реальный Vercel URL)
6. Нажмите **"Save"**

## Шаг 4: Обновление переменных в Vercel (опционально)

Если вы хотите явно указать Redirect URI:

1. В Vercel перейдите в настройки проекта → **"Environment Variables"**
2. Найдите `TIKTOK_REDIRECT_URI`
3. Обновите значение на: `https://YOUR_VERCEL_DOMAIN.vercel.app/auth/callback`
4. Нажмите **"Save"**
5. Vercel автоматически выполнит новый деплой

## Последующие обновления

После внесения изменений в код:

```bash
# Добавить изменения
git add .

# Создать коммит
git commit -m "Описание изменений"

# Отправить на GitHub
git push
```

Vercel автоматически задеплоит новые изменения!

## Проверка работы

1. Откройте ваш Vercel URL: `https://pulsetok-abc123.vercel.app`
2. Перейдите на страницу входа: `https://pulsetok-abc123.vercel.app/login`
3. Нажмите "Войти через TikTok"
4. Проверьте, что авторизация работает

## Troubleshooting

### Ошибка при деплое
- Проверьте логи в Vercel Dashboard
- Убедитесь, что все зависимости в `package.json`
- Проверьте, что `npm run build` работает локально

### CORS ошибки
- Проверьте настройки CORS в `api/index.ts`
- Убедитесь, что переменные окружения установлены

### Redirect URI ошибки
- Убедитесь, что Redirect URI в TikTok точно совпадает с Vercel URL
- Проверьте, что используется HTTPS (не HTTP)

## Полезные команды

```bash
# Проверка статуса Git
git status

# Просмотр последних коммитов
git log --oneline

# Проверка remote репозитория
git remote -v

# Локальная сборка (для проверки)
npm run build
```

