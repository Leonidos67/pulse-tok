// @ts-ignore - Vercel types will be available at runtime
import type { VercelRequest, VercelResponse } from '@vercel/node';
import crypto from 'crypto';
import cookie from 'cookie';

// Store states in memory (in production, use Redis or database)
// Note: In serverless, this will be per-instance, consider using external storage
const stateStore = new Map<string, { createdAt: number }>();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const CLIENT_KEY = process.env.TIKTOK_CLIENT_KEY || '';
    const REDIRECT_URI = process.env.TIKTOK_REDIRECT_URI || 
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}/auth/callback` : 'http://localhost:5173/auth/callback');
    const TIKTOK_AUTH_URL = 'https://www.tiktok.com/v2/auth/authorize/';

    // Generate CSRF state token
    const state = crypto.randomBytes(30).toString('hex');

    // Store state with timestamp (expires in 10 minutes)
    stateStore.set(state, { createdAt: Date.now() });
    
    // Clean up old states
    const tenMinutesAgo = Date.now() - 10 * 60 * 1000;
    for (const [key, value] of stateStore.entries()) {
      if (value.createdAt < tenMinutesAgo) {
        stateStore.delete(key);
      }
    }

    // Set state in HTTP-only cookie
    res.setHeader('Set-Cookie', cookie.serialize('csrfState', state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 10 * 60 * 1000,
      path: '/'
    }));

    // Build authorization URL
    const params = new URLSearchParams({
      client_key: CLIENT_KEY,
      scope: 'user.info.basic,user.info.profile,user.info.stats',
      response_type: 'code',
      redirect_uri: REDIRECT_URI,
      state: state
    });

    const authUrl = `${TIKTOK_AUTH_URL}?${params.toString()}`;
    
    return res.json({ authUrl, state });
  } catch (error) {
    console.error('Error initiating OAuth:', error);
    return res.status(500).json({ error: 'Failed to initiate OAuth flow' });
  }
}

