const theme = {
  colors: {
    // Professional green brand colors - fresh and sophisticated
    primary: '#2D5A27', // Deep forest green - professional and natural
    primaryLight: '#4A7C59', // Lighter forest green
    primaryDark: '#1A3D1F', // Darker forest green
    
    // Secondary colors - fresh and vibrant
    secondary: '#68B984', // Fresh mint green
    secondaryLight: '#8BC34A', // Light lime green
    secondaryDark: '#4CAF50', // Darker green
    
    // Accent colors
    accent: '#A8E6CF', // Soft mint accent
    accentLight: '#C8F4D9', // Very light mint
    
    // Neutral colors - sophisticated with green undertones
    background: '#F7FAF7', // Very light green-tinted white
    surface: '#FFFFFF', // Pure white
    text: '#1A202C', // Dark charcoal
    textSecondary: '#4A5568', // Medium gray
    textLight: '#718096', // Light gray
    
    // Status colors - sophisticated new tones
    success: '#38A169', // Professional green
    warning: '#D97706', // Sophisticated amber
    error: '#DC2626', // Rich crimson
    info: '#3182CE', // Professional blue
    
    // Border and shadow colors
    border: '#E2E8F0', // Light gray
    borderLight: '#F0F8F0', // Very light green-tinted gray
    shadow: 'rgba(0, 0, 0, 0.08)',
    shadowDark: 'rgba(0, 0, 0, 0.15)',
  },
  
  typography: {
    // Professional font stack
    body: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    heading: '"Poppins", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    
    // Font sizes with professional scale
    fontSize: '16px',
    fontSizeSmall: '14px',
    fontSizeLarge: '18px',
    
    // Heading sizes - more conservative
    h1: '2.5rem', // 40px
    h2: '2rem',   // 32px
    h3: '1.75rem', // 28px
    h4: '1.5rem', // 24px
    h5: '1.25rem', // 20px
    h6: '1.125rem', // 18px
    
    // Font weights
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    
    // Line heights
    lineHeight: 1.6,
    lineHeightTight: 1.4,
    lineHeightLoose: 1.8,
  },
  
  spacing: {
    xs: '0.25rem',   // 4px
    sm: '0.5rem',    // 8px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    xxl: '3rem',     // 48px
    xxxl: '4rem',    // 64px
  },
  
  borderRadius: {
    sm: '0.25rem',   // 4px
    md: '0.5rem',    // 8px
    lg: '0.75rem',   // 12px
    xl: '1rem',      // 16px
    full: '9999px',  // Full circle
  },
  
  shadows: {
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
  
  breakpoints: {
    mobile: '640px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1280px',
  },
  
  transitions: {
    fast: '0.15s ease-in-out',
    normal: '0.3s ease-in-out',
    slow: '0.5s ease-in-out',
  },
};

export default theme;
  