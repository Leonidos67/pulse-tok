// @ts-ignore - Vercel types will be available at runtime
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get IP from various possible headers
    const socket = req.socket as { remoteAddress?: string } | undefined;
    const ip = 
      (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
      (req.headers['x-real-ip'] as string) ||
      req.headers['x-vercel-forwarded-for'] as string ||
      socket?.remoteAddress ||
      'unknown';

    return res.json({ 
      ip: ip,
      headers: {
        'x-forwarded-for': req.headers['x-forwarded-for'],
        'x-real-ip': req.headers['x-real-ip'],
        'x-vercel-forwarded-for': req.headers['x-vercel-forwarded-for'],
      }
    });
  } catch (error) {
    console.error('Error getting IP:', error);
    return res.status(500).json({ error: 'Failed to get IP address' });
  }
}

