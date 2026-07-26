import { verifyToken } from './src/lib/auth.js';
import { config } from 'dotenv';

config({ path: './.env.local' });

// This is the token we got from the cookie
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2YTY2MDNlMWM1MTE0ZDkzZTJmZTUwNjciLCJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzg1MDcxNDEzLCJleHAiOjE3ODUxNTc4MTN9.OSVpEXhcf3QGzemi_Q7E4VORF-1moZ8_FYYpJ54Lm6o";

try {
  const decoded = verifyToken(token);
  console.log('Token verified successfully:');
  console.log('  userId:', decoded.userId);
  console.log('  username:', decoded.username);
  console.log('  role:', decoded.role);
} catch (error) {
  console.error('Token verification failed:', error.message);
}
