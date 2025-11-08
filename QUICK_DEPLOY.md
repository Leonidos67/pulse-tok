# 🚀 Быстрая инструкция по деплою на Vercel

## Команды для отправки на GitHub

```bash
# 1. Инициализация (если еще не сделано)
git init
git add .
git commit -m "Prepare for Vercel deployment"

# 2. Создайте репозиторий на GitHub (https://github.com/new)
# 3. Добавьте remote (замените YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/pulsetok.git
git branch -M main
git push -u origin main
```

## Что вводить в Vercel

### При импорте проекта:

| Поле | Значение |
|------|----------|
| **Project Name** | `pulsetok` |
| **Framework Preset** | `Vite` |
| **Root Directory** | `./` |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |
| **Install Command** | `npm install` |

### Environment Variables (ВСТАВЬТЕ ПЕРЕД DEPLOY!):

| Key | Value | Environment |
|-----|-------|-------------|
| `TIKTOK_CLIENT_KEY` | `aw3kxewbgdb39tz9` | Production, Preview, Development |
| `TIKTOK_CLIENT_SECRET` | `oefvbMlkQ3kKiqhpf41ICGQjlvzRBvD5` | Production, Preview, Development |
| `TIKTOK_REDIRECT_URI` | `https://YOUR_DOMAIN.vercel.app/auth/callback` | Production, Preview, Development |
| `NODE_ENV` | `production` | Production |

**Примечание:** `TIKTOK_REDIRECT_URI` можно оставить пустым - приложение автоматически использует VERCEL_URL.

## После деплоя:

1. Получите ваш Vercel URL (например: `https://pulsetok-abc123.vercel.app`)
2. В TikTok Developer Portal добавьте Redirect URI: `https://pulsetok-abc123.vercel.app/auth/callback`
3. Готово! 🎉

## Обновление кода:

```bash
git add .
git commit -m "Описание изменений"
git push
```

Vercel автоматически задеплоит изменения!

