import express from 'express';
import User from '../models/User';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    // Clear existing users (optional, but requested for initial setup)
    await User.deleteMany({});

    const users = [
      {
        name: 'Super Admin',
        email: 'laxmisah988@gmail.com',
        password: 'Laxmi@123',
        role: 'SUPER_ADMIN',
        isApproved: true,
      },
      {
        name: 'Company Agent',
        email: 'agent.laxmisah988@gmail.com',
        password: 'Agent@123',
        role: 'COMPANY',
        isApproved: true,
      },
      {
        name: 'Normal Customer',
        email: 'user.laxmisah988@gmail.com',
        password: 'User@123',
        role: 'CUSTOMER',
        isApproved: true,
      },
    ];

    for (const userData of users) {
      await User.create(userData);
    }

    res.json({ message: 'Dummy data seeded successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
