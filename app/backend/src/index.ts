// src/index.ts
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';
import { verifyToken } from './middleware/auth';
import eventsRoutes from './routes/events';
import itemsRoutes from './routes/items';

const app = express();
app.use(cors(), express.json());

app.use('/auth', authRoutes);

app.use('/events', verifyToken, eventsRoutes);

app.use('/events/:eventId/items', verifyToken, itemsRoutes);

app.get('/', (req, res) => {
  res.send('🎉 API is up and running!');
});

app.listen(3000, () => console.log('✅ Listening on :3000'));

