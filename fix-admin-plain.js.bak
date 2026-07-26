import mongoose from 'mongoose';
import User from './src/models/User.js';
import { config } from 'dotenv';

config({ path: './.env.local' });

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    
    // Find the admin user
    const admin = await User.findOne({ username: 'admin' });
    if (!admin) {
      console.log('Admin user NOT found');
      await mongoose.disconnect();
      return;
    }
    
    console.log('Found admin user:', admin.username);
    
    // Set password to plain text - the pre-save hook will hash it
    admin.password = 'admin123';
    
    // Save will trigger the pre-save hook to hash the password
    await admin.save();
    
    console.log('Admin password set to plain text - hook will hash it');
    
    // Verify the fix
    const updatedAdmin = await User.findOne({ username: 'admin' });
    const isMatch = await updatedAdmin.comparePassword('admin123');
    console.log('Password verification after fix:', isMatch);
    
    await mongoose.disconnect();
  })
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
