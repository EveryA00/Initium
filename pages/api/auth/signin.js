export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { email, password } = req.body;

    // Simple validation
    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email and password are required' 
      });
    }

    // Mock authentication - for demo purposes, accept any valid email format
    if (email.includes('@') && password.length >= 6) {
      // Mock successful authentication
      const mockUser = {
        id: 1,
        name: email.split('@')[0],
        email: email,
        role: 'user'
      };

      const mockToken = 'mock-jwt-token-' + Date.now();

      return res.status(200).json({
        success: true,
        message: 'Sign in successful',
        data: {
          user: mockUser,
          token: mockToken
        }
      });
    } else {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }
  } catch (error) {
    console.error('Sign in error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
} 