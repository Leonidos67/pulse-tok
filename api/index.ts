import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { tiktokOAuthRoutes } from '../server/routes/tiktok-oauth.js';
import { ipRoutes } from '../server/routes/ip.js';

const app = express();

// Middleware
// Get the current deployment URL
const getCurrentUrl = () => {
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  if (process.env.VERCEL) {
    // Vercel автоматически устанавливает VERCEL_URL
    return process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '';
  }
  return '';
};

const allowedOrigins = [
  getCurrentUrl(),
  process.env.NEXT_PUBLIC_APP_URL || '',
  'http://localhost:5173',
  'http://localhost:3000',
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // В production разрешаем все origins от Vercel
    if (process.env.VERCEL) {
      return callback(null, true);
    }
    
    // В development проверяем список разрешенных
    if (allowedOrigins.includes(origin) || process.env.NODE_ENV === 'development') {
      callback(null, true);
    } else {
      callback(null, true); // Разрешаем для упрощения, можно ужесточить
    }
  },
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/tiktok', tiktokOAuthRoutes);
app.use('/api/ip', ipRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Export the Express app as a serverless function
export default app;

