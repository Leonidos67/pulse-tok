import { Router, Request, Response } from 'express';
import crypto from 'crypto';

const router = Router();

// TikTok OAuth configuration
const CLIENT_KEY = process.env.TIKTOK_CLIENT_KEY || '';
const CLIENT_SECRET = process.env.TIKTOK_CLIENT_SECRET || '';
// Use VERCEL_URL for production, fallback to localhost for development
const getRedirectUri = () => {
  if (process.env.TIKTOK_REDIRECT_URI) {
    return process.env.TIKTOK_REDIRECT_URI;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}/auth/callback`;
  }
  return 'http://localhost:5173/auth/callback';
};
const REDIRECT_URI = getRedirectUri();
const TIKTOK_AUTH_URL = 'https://www.tiktok.com/v2/auth/authorize/';
const TIKTOK_TOKEN_URL = 'https://open.tiktokapis.com/v2/oauth/token/';

// Store states in memory (in production, use Redis or database)
const stateStore = new Map<string, { createdAt: number }>();

/**
 * Initialize TikTok OAuth flow
 * Creates CSRF state token and redirects to TikTok authorization page
 */
router.get('/oauth', (req: Request, res: Response) => {
  try {
    // Generate CSRF state token using Node.js crypto
    const state = crypto.randomBytes(30).toString('hex');

    // Store state with timestamp (expires in 10 minutes)
    stateStore.set(state, { createdAt: Date.now() });
    
    // Clean up old states (older than 10 minutes)
    const tenMinutesAgo = Date.now() - 10 * 60 * 1000;
    for (const [key, value] of stateStore.entries()) {
      if (value.createdAt < tenMinutesAgo) {
        stateStore.delete(key);
      }
    }

    // Set state in HTTP-only cookie for additional security
    res.cookie('csrfState', state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 10 * 60 * 1000 // 10 minutes
    });

    // Build authorization URL
    // Request scopes: basic (included in Login Kit), profile, and stats
    const params = new URLSearchParams({
      client_key: CLIENT_KEY,
      scope: 'user.info.basic,user.info.profile,user.info.stats',
      response_type: 'code',
      redirect_uri: REDIRECT_URI,
      state: state
    });

    const authUrl = `${TIKTOK_AUTH_URL}?${params.toString()}`;
    
    res.json({ authUrl, state });
  } catch (error) {
    console.error('Error initiating OAuth:', error);
    res.status(500).json({ error: 'Failed to initiate OAuth flow' });
  }
});

/**
 * Exchange authorization code for access token
 * Called by frontend after receiving code from TikTok
 */
router.post('/exchange', async (req: Request, res: Response) => {
  try {
    const { code, state } = req.body;

    // Verify state
    const cookieState = req.cookies.csrfState;
    if (!state || state !== cookieState) {
      // Also check in-memory store
      if (!stateStore.has(state as string)) {
        console.error('Invalid or missing state token');
        return res.status(400).json({ error: 'Invalid or missing state token' });
      }
    }

    // Clean up state
    if (state) {
      stateStore.delete(state as string);
      res.clearCookie('csrfState');
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

      // Return tokens to frontend (in production, store tokens securely on server)
      res.json({
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
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * Get user info using access token
 */
router.get('/user-info', async (req: Request, res: Response) => {
  try {
    const accessToken = req.headers.authorization?.replace('Bearer ', '');

    if (!accessToken) {
      return res.status(401).json({ error: 'Access token required' });
    }

    // Request user info with specific fields
    // See: https://developers.tiktok.com/doc/tiktok-api-v2-user-info/
    const fields = 'open_id,union_id,avatar_url,display_name,username,profile_deep_link,is_verified,follower_count,following_count,likes_count,video_count';
    const userInfoUrl = `https://open.tiktokapis.com/v2/user/info/?fields=${encodeURIComponent(fields)}`;
    
    const userInfoResponse = await fetch(userInfoUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!userInfoResponse.ok) {
      const errorData = await userInfoResponse.text();
      console.error('User info error:', errorData);
      return res.status(userInfoResponse.status).json({ 
        error: 'Failed to fetch user info',
        details: errorData 
      });
    }

    const userData = await userInfoResponse.json();
    res.json(userData);
  } catch (error) {
    console.error('Error fetching user info:', error);
    res.status(500).json({ error: 'Failed to fetch user info' });
  }
});

export { router as tiktokOAuthRoutes };

