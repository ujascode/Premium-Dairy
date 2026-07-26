import mongoose from 'mongoose';
import User from './src/models/User.js';
import { config } from 'dotenv';

config({ path: './.env.local' });

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    
    const admin = await User.findOne({ username: 'admin' });
    if (admin) {
      console.log('Admin user found:', {
        id: admin._id,
        username: admin.username,
        role: admin.role
      });
      
      // Check if password is set
      if (admin.password) {
        console.log('Password is set (hashed)');
      } else {
        console.log('Password is NOT set');
      }
    } else {
      console.log('Admin user NOT found');
    }
    
    await mongoose.disconnect();
  })
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
