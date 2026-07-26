import mongoose from 'mongoose';
import { config } from 'dotenv';

try {
  config({ path: './.env.local' });
  console.log('MongoDB URI:', process.env.MONGODB_URI);
  
  mongoose.connect(process.env.MONGODB_URI);
  
  const db = mongoose.connection;
  db.once('open', () => {
    console.log('Connected to MongoDB');
    db.close();
  });
  
  db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}
