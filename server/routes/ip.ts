import { Router, Request, Response } from 'express';

const router = Router();

/**
 * Get client IP address
 */
router.get('/', (req: Request, res: Response) => {
  try {
    // Get IP from various possible headers
    const ip = 
      (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
      (req.headers['x-real-ip'] as string) ||
      req.socket.remoteAddress ||
      req.ip ||
      'unknown';

    res.json({ 
      ip: ip,
      headers: {
        'x-forwarded-for': req.headers['x-forwarded-for'],
        'x-real-ip': req.headers['x-real-ip'],
      }
    });
  } catch (error) {
    console.error('Error getting IP:', error);
    res.status(500).json({ error: 'Failed to get IP address' });
  }
});

/**
 * Get IP from external service
 */
router.get('/external', async (req: Request, res: Response) => {
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

    res.status(500).json({ error: 'Failed to get IP from external services' });
  } catch (error) {
    console.error('Error getting external IP:', error);
    res.status(500).json({ error: 'Failed to get external IP address' });
  }
});

export { router as ipRoutes };

