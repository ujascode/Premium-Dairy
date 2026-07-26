import mongoose from 'mongoose';
import User from './src/models/User.js';
import bcrypt from 'bcryptjs';
import { config } from 'dotenv';

config({ path: './.env.local' });

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    
    const admin = await User.findOne({ username: 'admin' });
    if (!admin) {
      console.log('Admin user not found');
      return;
    }
    
    console.log('Found admin user:', admin.username);
    
    // Update password to correct hash for "admin123"
    const newPassword = 'admin123';
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    
    admin.password = hashedPassword;
    await admin.save();
    
    console.log('Updated password for admin user');
    console.log('New hash:', hashedPassword);
    
    // Verify the update worked
    const isMatch = await bcrypt.compare(newPassword, admin.password);
    console.log('Password verification after update:', isMatch);
    
    await mongoose.disconnect();
  })
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
