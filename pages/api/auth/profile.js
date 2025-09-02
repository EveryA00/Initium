export default function handler(req, res) {
  if (req.method === 'GET') {
    // Mock user profile data - in a real app, this would fetch from database
    const mockUserProfile = {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 (555) 123-4567',
      address: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States',
      role: 'user'
    };

    return res.status(200).json({
      success: true,
      message: 'Profile retrieved successfully',
      data: {
        user: mockUserProfile
      }
    });
  }

  if (req.method !== 'PUT') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { name, email, phone, address, city, state, zipCode, country } = req.body;

    // Simple validation
    if (!name || !email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name and email are required' 
      });
    }

    if (!email.includes('@')) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email address'
      });
    }

    // Mock successful profile update
    const updatedUser = {
      id: 1,
      name: name,
      email: email,
      phone: phone || '',
      address: address || '',
      city: city || '',
      state: state || '',
      zipCode: zipCode || '',
      country: country || 'United States',
      role: 'user'
    };

    return res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        user: updatedUser
      }
    });
  } catch (error) {
    console.error('Profile update error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
} 