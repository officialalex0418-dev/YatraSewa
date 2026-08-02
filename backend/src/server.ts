import http from 'http';
import app from './app';
import mongoose from 'mongoose';
import { Server } from 'socket.io';

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || '';

const server = http.createServer(app);

// Socket.io initialization
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

// Seat Locking Map: tripId -> { seatNumber -> { userId, expiresAt } }
const lockedSeats: Map<string, Map<string, { userId: string; expiresAt: number }>> = new Map();

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('lockSeat', ({ tripId, seatNumber, userId }) => {
    if (!lockedSeats.has(tripId)) {
      lockedSeats.set(tripId, new Map());
    }

    const tripLocks = lockedSeats.get(tripId)!;
    const now = Date.now();

    // Check if seat is already locked by someone else
    if (tripLocks.has(seatNumber) && tripLocks.get(seatNumber)!.expiresAt > now && tripLocks.get(seatNumber)!.userId !== userId) {
      socket.emit('seatLockFailed', { seatNumber, message: 'Seat is already locked' });
    } else {
      // Lock seat for 5 minutes
      tripLocks.set(seatNumber, { userId, expiresAt: now + 5 * 60 * 1000 });
      io.emit('seatLocked', { tripId, seatNumber, userId });
    }
  });

  socket.on('unlockSeat', ({ tripId, seatNumber, userId }) => {
    const tripLocks = lockedSeats.get(tripId);
    if (tripLocks && tripLocks.get(seatNumber)?.userId === userId) {
      tripLocks.delete(seatNumber);
      io.emit('seatUnlocked', { tripId, seatNumber });
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Database connection
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Database connection error:', err);
    process.exit(1);
  });

export { io };
