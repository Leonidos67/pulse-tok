// @ts-ignore - Vercel types will be available at runtime
import type { VercelRequest, VercelResponse } from '@vercel/node';
import cookie from 'cookie';

const TIKTOK_TOKEN_URL = 'https://open.tiktokapis.com/v2/oauth/token/';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { code, state } = req.body;
    const CLIENT_KEY = process.env.TIKTOK_CLIENT_KEY || '';
    const CLIENT_SECRET = process.env.TIKTOK_CLIENT_SECRET || '';
    const REDIRECT_URI = process.env.TIKTOK_REDIRECT_URI || 
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}/auth/callback` : 'http://localhost:5173/auth/callback');

    // Verify state from cookie
    const cookies = cookie.parse(req.headers.cookie || '');
    const cookieState = cookies.csrfState;

    if (!state || state !== cookieState) {
      return res.status(400).json({ error: 'Invalid or missing state token' });
    }

    if (!code) {
      return res.status(400).json({ error: 'Missing authorization code' });
    }

    // Exchange authorization code for access token
    try {
      const tokenResponse = await fetch(TIKTOK_TOKEN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_key: CLIENT_KEY,
          client_secret: CLIENT_SECRET,
          code: code as string,
          grant_type: 'authorization_code',
          redirect_uri: REDIRECT_URI,
        }),
      });

      if (!tokenResponse.ok) {
        const errorData = await tokenResponse.text();
        console.error('Token exchange error:', errorData);
        return res.status(tokenResponse.status).json({ 
          error: 'Token exchange failed',
          details: errorData 
        });
      }

      const tokenData = await tokenResponse.json();

      // Clear state cookie
      res.setHeader('Set-Cookie', cookie.serialize('csrfState', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 0,
        path: '/'
      }));

      return res.json({
        access_token: tokenData.data?.access_token,
        refresh_token: tokenData.data?.refresh_token,
        expires_in: tokenData.data?.expires_in,
        scope: tokenData.data?.scope,
        token_type: tokenData.data?.token_type || 'Bearer',
      });
    } catch (tokenError) {
      console.error('Error exchanging token:', tokenError);
      return res.status(500).json({ error: 'Failed to exchange token' });
    }
  } catch (error) {
    console.error('Error in exchange:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

