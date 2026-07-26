import mongoose from 'mongoose';
import User from './src/models/User.js';
import { config } from 'dotenv';

config({ path: './.env.local' });

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    
    // Delete any existing test user
    await User.deleteOne({ username: 'testuser' });
    
    // Create a new user with plain text password
    const user = new User({
      username: 'testuser',
      password: 'testpass123', // Plain text password
      role: 'user'
    });
    
    await user.save();
    console.log('Test user created with plain text password');
    
    // Now try to authenticate
    const foundUser = await User.findOne({ username: 'testuser' });
    console.log('Stored hash:', foundUser.password);
    
    const isMatch = await foundUser.comparePassword('testpass123');
    console.log('Password check for testuser:', isMatch);
    
    // Clean up
    await User.deleteOne({ username: 'testuser' });
    await mongoose.disconnect();
  })
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
