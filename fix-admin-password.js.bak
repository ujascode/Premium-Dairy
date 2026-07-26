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
      console.log('Admin user NOT found - creating new one');
      
      const hashedPassword = await bcrypt.hash('admin123', 12);
      const newAdmin = new User({
        username: 'admin',
        password: hashedPassword,
        role: 'admin'
      });
      
      await newAdmin.save();
      console.log('Admin user created with password "admin123"');
    } else {
      console.log('Admin user found - updating password');
      
      const hashedPassword = await bcrypt.hash('admin123', 12);
      admin.password = hashedPassword;
      await admin.save();
      
      console.log('Admin user password updated to "admin123"');
    }
    
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
