import { verifyToken } from './src/lib/auth.js';
import { config } from 'dotenv';

config({ path: './.env.local' });

// Simulate what the middleware does
const cookieString = "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2YTY2MDNlMWM1MTE0ZDkzZTJmZTUwNjciLCJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzg1MDcxNDEzLCJleHAiOjE3ODUxNTc4MTN9.OSVpEXhcf3QGzemi_Q7E4VORF-1moZ8_FYYpJ54Lm6o; HttpOnly; Path=/; Max-Age=86400; SameSite=Strict";

// Extract token from cookie string (simplified)
const token = cookieString.split('=')[1].split(';')[0];
console.log('Extracted token:', token);

try {
  const decoded = verifyToken(token);
  console.log('Token verified in middleware simulation:');
  console.log('  userId:', decoded.userId);
  console.log('  username:', decoded.username);
  console.log('  role:', decoded.role);
  
  // Check if role is admin (as middleware does)
  if (decoded.role === 'admin') {
    console.log('User is admin - access should be granted');
  } else {
    console.log('User is NOT admin - access denied');
  }
} catch (error) {
  console.error('Token verification failed in middleware simulation:', error.message);
}
