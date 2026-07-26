import connectDB from '@/lib/db';
import User from '@/models/User';
import { signToken } from '@/lib/auth';

export async function POST(request) {
  try {
    await connectDB();
    const { username, password } = await request.json();

    if (!username || !password) {
      return new Response(
        JSON.stringify({ success: false, message: 'Username and password are required' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const user = await User.findOne({ username });
    if (!user) {
      return new Response(
        JSON.stringify({ success: false, message: 'Invalid credentials' }),
        {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return new Response(
        JSON.stringify({ success: false, message: 'Invalid credentials' }),
        {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const token = signToken({
      userId: user._id,
      username: user.username,
      role: user.role,
    });

    // Set HTTP-only cookie using header
    const cookie = `token=${token}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24}; SameSite=Strict${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`;

    const response = new Response(
      JSON.stringify({
        success: true,
        message: 'Login successful',
        user: { id: user._id, username: user.username, role: user.role },
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Set-Cookie': cookie
        },
      }
    );

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return new Response(
      JSON.stringify({ success: false, message: error.message || 'Internal server error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
