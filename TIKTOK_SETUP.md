# Настройка TikTok OAuth Login

Этот проект реализует вход через TikTok с использованием официального Login Kit для Web.

## Предварительные требования

1. Зарегистрируйте приложение на [TikTok for Developers](https://developers.tiktok.com/)
2. Получите `CLIENT_KEY` и `CLIENT_SECRET` из панели разработчика
3. Настройте Redirect URI в настройках приложения
4. **Для новых приложений:** Настройте Sandbox Environment и добавьте тестовых пользователей (см. [SANDBOX_SETUP.md](./SANDBOX_SETUP.md))

## Установка

### 1. Установите зависимости

```bash
npm install
```

### 2. Настройте переменные окружения

Создайте файл `.env` в корне проекта (можно скопировать из `.env.example`):

```env
# TikTok OAuth Configuration
TIKTOK_CLIENT_KEY=your_client_key_here
TIKTOK_CLIENT_SECRET=your_client_secret_here
TIKTOK_REDIRECT_URI=http://localhost:5173/auth/callback

# Server Configuration
PORT=3001
NODE_ENV=development
```

**Важно:** Замените `your_client_key_here` и `your_client_secret_here` на ваши реальные credentials из TikTok Developer Portal.

### 3. Настройка Sandbox Environment (для новых приложений)

**⚠️ ВАЖНО:** Для новых приложений TikTok ТРЕБУЕТ использование Sandbox environment перед полным одобрением.

1. В Developer Portal перейдите в ваше приложение
2. Найдите раздел **"Sandbox"** или **"Add a Sandbox"**
3. Нажмите **"Add Sandbox Tester"**
4. Добавьте TikTok username тестовых пользователей (минимум 1, рекомендуется 2-3)
5. Тестовые пользователи должны принять приглашение в своем TikTok аккаунте

**Особенности Sandbox:**
- Только добавленные тестовые пользователи могут авторизоваться
- Можно использовать localhost для тестирования
- Необходимо для прохождения ревью приложения
- После одобрения приложение автоматически перейдет в production режим

Подробная инструкция: [SANDBOX_SETUP.md](./SANDBOX_SETUP.md)

### 4. Настройте Redirect URI в TikTok Developer Portal

1. Войдите в [TikTok for Developers](https://developers.tiktok.com/)
2. Перейдите в ваше приложение
3. В разделе "Login Kit" -> "Web" добавьте Redirect URI:
   - `http://localhost:5173/auth/callback` (для разработки/sandbox)
   - `https://yourdomain.com/auth/callback` (для production)

**Ограничения Redirect URI:**
- Максимум 10 URI
- Длина каждого URI должна быть менее 512 символов
- URI должны быть абсолютными и начинаться с `https` (кроме localhost в sandbox)
- URI должны быть статическими (без параметров)
- URI не могут включать фрагменты (#)

**Примечание:** В sandbox режиме можно использовать `http://localhost` для тестирования.

### 5. Запустите сервер и клиент

#### Вариант 1: Запуск всех сервисов одновременно

```bash
npm run dev:all
```

Это запустит:
- Frontend (Vite) на http://localhost:5173
- Backend (Express) на http://localhost:3001

#### Вариант 2: Запуск отдельно

Терминал 1 (Backend):
```bash
npm run dev:server
```

Терминал 2 (Frontend):
```bash
npm run dev
```

## Использование

1. Откройте http://localhost:5173/login
2. Нажмите "Войти через TikTok"
3. Вы будете перенаправлены на страницу авторизации TikTok
4. После авторизации вы вернетесь на страницу успешного входа
5. Токены доступа будут сохранены в localStorage

## Архитектура

### OAuth Flow

1. **Инициация OAuth** (`/api/tiktok/oauth`)
   - Генерируется CSRF state token
   - Возвращается URL авторизации TikTok

2. **Авторизация на TikTok**
   - Пользователь перенаправляется на TikTok
   - Пользователь входит и дает разрешение

3. **Callback** (`/auth/callback`)
   - TikTok перенаправляет на `/auth/callback` с кодом авторизации
   - Frontend отправляет код на сервер для обмена на токен

4. **Обмен токена** (`/api/tiktok/exchange`)
   - Сервер обменивает код на access_token и refresh_token
   - Возвращает токены frontend

5. **Успешный вход** (`/auth/success`)
   - Получение информации о пользователе
   - Сохранение токенов
   - Перенаправление в панель управления

### API Endpoints

#### `GET /api/tiktok/oauth`
Инициирует OAuth flow. Возвращает URL авторизации.

**Response:**
```json
{
  "authUrl": "https://www.tiktok.com/v2/auth/authorize/?...",
  "state": "csrf_state_token"
}
```

#### `POST /api/tiktok/exchange`
Обменивает код авторизации на токен доступа.

**Request Body:**
```json
{
  "code": "authorization_code",
  "state": "csrf_state_token"
}
```

**Response:**
```json
{
  "access_token": "user_access_token",
  "refresh_token": "refresh_token",
  "expires_in": 3600,
  "scope": "user.info.basic",
  "token_type": "Bearer"
}
```

#### `GET /api/tiktok/user-info`
Получает информацию о пользователе.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response:**
```json
{
  "data": {
    "user": {
      "open_id": "user_open_id",
      "union_id": "user_union_id",
      "avatar_url": "https://...",
      "display_name": "User Name",
      "username": "username",
      ...
    }
  }
}
```

#### `GET /api/ip`
Получает IP адрес клиента.

**Response:**
```json
{
  "ip": "127.0.0.1"
}
```

#### `GET /api/ip/external`
Получает IP адрес из внешнего сервиса.

**Response:**
```json
{
  "ip": "xxx.xxx.xxx.xxx",
  "service": "https://api.ipify.org?format=json"
}
```

## Безопасность

### Текущая реализация (Development)

- Токены хранятся в `localStorage` (небезопасно для production)
- CSRF защита через state token
- HTTP-only cookies для state token

### Рекомендации для Production

1. **Хранение токенов:**
   - Храните токены на сервере в безопасном хранилище (database, Redis)
   - Используйте HTTP-only cookies для передачи токенов
   - Реализуйте refresh token rotation

2. **Безопасность:**
   - Используйте HTTPS везде
   - Валидируйте и санитизируйте все входные данные
   - Реализуйте rate limiting
   - Используйте безопасное хранилище для state tokens (Redis, database)

3. **Обработка ошибок:**
   - Не раскрывайте чувствительную информацию в ошибках
   - Логируйте ошибки на сервере
   - Предоставляйте понятные сообщения пользователю

## Troubleshooting

### Ошибка: "Invalid redirect URI"
- Убедитесь, что Redirect URI в `.env` точно совпадает с настроенным в TikTok Developer Portal
- URI должен быть абсолютным (начинаться с `http://` или `https://`)
- Для localhost используйте `http://localhost:5173/auth/callback`

### Ошибка: "Invalid client_key"
- Проверьте, что `TIKTOK_CLIENT_KEY` в `.env` правильный
- Убедитесь, что приложение активно в TikTok Developer Portal

### Ошибка: "Token exchange failed"
- Проверьте `TIKTOK_CLIENT_SECRET` в `.env`
- Убедитесь, что код авторизации не был использован повторно
- Проверьте, что Redirect URI совпадает при обмене токена

### Ошибка: CORS
- Убедитесь, что сервер запущен на порту 3001
- Проверьте настройки CORS в `server/index.ts`

## Дополнительные ресурсы

- [TikTok Login Kit для Web](https://developers.tiktok.com/doc/login-kit-web)
- [TikTok API Documentation](https://developers.tiktok.com/doc/)
- [OAuth 2.0 RFC](https://oauth.net/2/)

## Поддержка

При возникновении проблем:
1. Проверьте консоль браузера (F12)
2. Проверьте логи сервера
3. Убедитесь, что все переменные окружения установлены правильно
4. Проверьте настройки приложения в TikTok Developer Portal

