// backend/src/routes/auth.ts

import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { nanoid } from 'nanoid';
import { users, User } from '../models/user';

// create a Router _instance_ from express
const router = express.Router();

const JWT_SECRET = 'MySuperSecret123!';

// Signup
router.post(
  '/signup',
  async (req: Request, res: Response): Promise<void> => {
    const { name, email, password } = req.body;

    // Already registered?
    if ([...users.values()].some(u => u.email === email)) {
      res.status(400).json({ error: 'Email already in use' });
      return;
    }

    const id = nanoid();
    const passwordHash = await bcrypt.hash(password, 10);
    const user: User = { id, name, email, passwordHash };
    users.set(id, user);

    const token = jwt.sign({ id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id, name, email } });
  }
);

// Login
router.post(
  '/login',
  async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    const user = [...users.values()].find(u => u.email === email);

    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: user.id, name: user.name, email } });
  }
);

export default router;
