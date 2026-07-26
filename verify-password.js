import mongoose from 'mongoose';
import User from './src/models/User.js';
import { config } from 'dotenv';

config({ path: './.env.local' });

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    
    const admin = await User.findOne({ username: 'admin' });
    if (!admin) {
      console.log('Admin user NOT found');
      await mongoose.disconnect();
      return;
    }
    
    console.log('Admin user found:', {
      id: admin._id,
      username: admin.username,
      role: admin.role,
      hasPassword: !!admin.password
    });
    
    // Test the password
    const isMatch = await admin.comparePassword('admin123');
    console.log('Password verification for "admin123":', isMatch);
    
    // Also test a wrong password
    const wrongMatch = await admin.comparePassword('wrongpassword');
    console.log('Password verification for "wrongpassword":', wrongMatch);
    
    await mongoose.disconnect();
  })
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
