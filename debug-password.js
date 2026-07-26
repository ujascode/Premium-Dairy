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
    
    console.log('Admin user found:');
    console.log('  ID:', admin._id.toString());
    console.log('  Username:', admin.username);
    console.log('  Role:', admin.role);
    console.log('  Password hash:', admin.password);
    
    // Try to manually verify the password
    const testPassword = 'admin123';
    console.log(`\nTrying to verify password: "${testPassword}"`);
    
    const match = await bcrypt.compare(testPassword, admin.password);
    console.log('bcrypt.compare result:', match);
    
    // Also test with our method
    const methodMatch = await admin.comparePassword(testPassword);
    console.log('admin.comparePassword result:', methodMatch);
    
    // Let's also see what happens if we hash the password again
    const newHash = await bcrypt.hash(testPassword, 12);
    console.log('\nNew hash for "admin123":', newHash);
    console.log('Existing hash:        ', admin.password);
    console.log('Hashes match:', newHash === admin.password);
    
    await mongoose.disconnect();
  })
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
