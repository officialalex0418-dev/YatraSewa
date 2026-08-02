import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User';

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || '');
    console.log('Connected to MongoDB for seeding...');

    // Clear existing users
    await User.deleteMany({});
    console.log('Cleared existing users');

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

    for (const user of users) {
      await User.create(user);
    }

    console.log('Seed data created successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
