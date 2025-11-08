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
    // Try multiple IP services
    const ipServices = [
      'https://api.ipify.org?format=json',
      'https://ipapi.co/json/',
      'https://api.myip.com',
    ];

    for (const service of ipServices) {
      try {
        const response = await fetch(service, {
          signal: AbortSignal.timeout(5000), // 5 second timeout
        });
        
        if (response.ok) {
          const data = await response.json();
          return res.json({
            ip: data.ip || data.query,
            service: service,
            fullData: data,
          });
        }
      } catch (err) {
        // Try next service
        continue;
      }
    }

    return res.status(500).json({ error: 'Failed to get IP from external services' });
  } catch (error) {
    console.error('Error getting external IP:', error);
    return res.status(500).json({ error: 'Failed to get external IP address' });
  }
}

