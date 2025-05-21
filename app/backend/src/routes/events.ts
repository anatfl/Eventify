import { Router, Response } from 'express';
import { nanoid } from 'nanoid';
import { events, Event } from '../models/event';
import { AuthenticatedRequest } from '../middleware/auth';

const router = Router();

// Allow a logged-in user to create a new event.
router.post('/', (req: AuthenticatedRequest, res: Response): void => {
  const userId = req.userId!;
  const { title, datetime } = req.body;
  const id = nanoid();
  const newEvent: Event = {
    id,
    title,
    datetime,
    ownerId: userId,
    attendees: [userId],
  };
  events.set(id, newEvent);
  res.status(201).json(newEvent);
});

// Each user sees only events they’re attending
// router.get('/', (req: AuthenticatedRequest, res: Response): void => {
//     const userId = req.userId!;
//     const myEvents = [...events.values()].filter(ev =>
//       ev.attendees.includes(userId)
//     );
//     res.json(myEvents);
//   });

// List your events
router.get('/', (req: AuthenticatedRequest, res: Response): void => {
    const userId = req.userId!;
    const my = [...events.values()].filter(ev => ev.attendees.includes(userId));
    res.json(my);
  });


// Let any authenticated user join (RSVP to) an event.
router.post('/:eventId/rsvp', (req: AuthenticatedRequest, res: Response): void => {
    const userId = req.userId!;
    const ev = events.get(req.params.eventId);
    if (!ev) {
      res.status(404).json({ error: 'Event not found' });
      return;
    }
    if (!ev.attendees.includes(userId)) ev.attendees.push(userId);
    res.json(ev);
  });

export default router;
