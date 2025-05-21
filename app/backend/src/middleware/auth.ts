// backend/src/middleware/auth.ts
import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'MySuperSecret123!';

export interface AuthenticatedRequest extends Request {
  userId?: string;
}

// ✓ Typed as RequestHandler so Express knows this is middleware
export const verifyToken: RequestHandler = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    console.log('❌ Missing or malformed header'); // temporaty
    res.status(401).json({ error: 'Missing token' });
    return;               // <— early return, no value returned
  }


  const token = auth.slice(7);
  console.log('🔐 token to verify:', token); // temporary


  try {
    const payload = jwt.verify(token, JWT_SECRET) as { id: string };
    console.log('✅ token valid, payload:', payload); // temporary
    req.userId = payload.id;
    next();                // <— continue
  } catch (err) {
    console.log('❌ token verify error:', err); // temporary
    res.status(401).json({ error: 'Invalid or expired token' });
    return;               // <— early return, no value returned
  }
};

