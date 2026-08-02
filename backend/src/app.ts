import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();

import authRoutes from './routes/authRoutes';
import bookingRoutes from './routes/bookingRoutes';
import tripRoutes from './routes/tripRoutes';
import companyRoutes from './routes/companyRoutes';
import seedRoutes from './routes/seedRoutes';
import adminRoutes from './routes/adminRoutes';

const app: Application = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan('dev'));

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/bookings', bookingRoutes);
app.use('/api/v1/trips', tripRoutes);
app.use('/api/v1/company', companyRoutes);
app.use('/api/v1/seed', seedRoutes);
app.use('/api/v1/admin', adminRoutes);

// Test Route
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'YatraSewa API is running...' });
});

export default app;
