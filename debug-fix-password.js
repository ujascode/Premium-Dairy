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
      console.log('Admin user NOT found');
      await mongoose.disconnect();
      return;
    }
    
    console.log('Current hash in DB:', admin.password);
    
    // Generate hash for "admin123"
    const plainPassword = 'admin123';
    const hash = await bcrypt.hash(plainPassword, 12);
    console.log('Generated hash for "admin123":', hash);
    
    // Update the password
    admin.password = hash;
    await admin.save();
    console.log('Updated password in database');
    
    // Fetch again to verify
    const updatedAdmin = await User.findOne({ username: 'admin' });
    console.log('Hash after save:', updatedAdmin.password);
    
    // Verify the password
    const isMatch = await updatedAdmin.comparePassword(plainPassword);
    console.log('Password verification result:', isMatch);
    
    // Also test with bcrypt.compare directly
    const directMatch = await bcrypt.compare(plainPassword, updatedAdmin.password);
    console.log('Direct bcrypt.compare result:', directMatch);
    
    await mongoose.disconnect();
  })
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
