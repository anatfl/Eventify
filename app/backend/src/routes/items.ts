// backend/src/routes/items.ts

import { Router, Response } from 'express';
import { items, Item } from '../models/item';
import { AuthenticatedRequest } from '../middleware/auth';
import crypto from 'crypto';

const router = Router({ mergeParams: true });

// List items for this event
router.get('/', (req: AuthenticatedRequest, res: Response): void => {
  const evId = req.params.eventId!;
  // filter our in-memory items
  const list: Item[] = [...items.values()].filter(i => i.eventId === evId);
  res.json(list);
});

// Add a new item
router.post(
    '/',
    (req: AuthenticatedRequest, res: Response): void => {
      const evId = req.params.eventId!;
      const userId = req.userId!; // must be logged in
      const { name } = req.body;
      if (!name) {
        res.status(400).json({ error: 'Name is required' });
        return;
      }
      const id = crypto.randomUUID(); // or nanoid()
      const newItem: Item = { id, eventId: evId, name };
      items.set(id, newItem);
      res.status(201).json(newItem);
    }
  );
  
// Claim or unclaim an item
router.patch(
    '/:itemId/claim',
    (req: AuthenticatedRequest, res: Response): void => {
      const userId = req.userId!;
      const item = items.get(req.params.itemId!);
      if (!item) {
        res.status(404).json({ error: 'Item not found' });
        return;
      }
      // toggle claimedBy
      item.claimedBy = item.claimedBy === userId ? undefined : userId;
      res.json(item);
    }
  );
export default router;
