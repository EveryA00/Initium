export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { name, email, password } = req.body;

    // Simple validation
    if (!name || !email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, email and password are required' 
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      });
    }

    if (!email.includes('@')) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email address'
      });
    }

    // Mock successful registration
    const mockUser = {
      id: Date.now(),
      name: name,
      email: email,
      role: 'user'
    };

    const mockToken = 'mock-jwt-token-' + Date.now();

    return res.status(201).json({
      success: true,
      message: 'Account created successfully',
      data: {
        user: mockUser,
        token: mockToken
      }
    });
  } catch (error) {
    console.error('Sign up error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
} 