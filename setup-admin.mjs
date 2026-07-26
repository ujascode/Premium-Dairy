import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { config } from 'dotenv';
import User from './src/models/User.js';

config({ path: './.env.local' });

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const existingAdmin = await User.findOne({ username: 'admin' });
    if (existingAdmin) {
      console.log('Admin user already exists');
    } else {
      const hashedPassword = await bcrypt.hash('admin123', 12);
      const admin = new User({
        username: 'admin',
        password: hashedPassword,
        role: 'admin',
      });
      await admin.save();
      console.log('Admin user created successfully');
    }

    await mongoose.disconnect();
  } catch (error) {
    console.error('Error setting up admin user:', error);
    process.exit(1);
  }
};

createAdmin();
