// @ts-ignore - Vercel types will be available at runtime
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const accessToken = req.headers.authorization?.replace('Bearer ', '');

    if (!accessToken) {
      return res.status(401).json({ error: 'Access token required' });
    }

    // Request user info with specific fields
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
    return res.json(userData);
  } catch (error) {
    console.error('Error fetching user info:', error);
    return res.status(500).json({ error: 'Failed to fetch user info' });
  }
}

