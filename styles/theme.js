const theme = {
  colors: {
    // Simplified Color Scheme - White and Brown
    primary: '#5D4037', // Dark brown
    primaryLight: '#8D6E63', // Medium brown
    primaryDark: '#3E2723', // Very dark brown
    
    // Secondary colors - white variations
    secondary: '#FFFFFF', // Pure white
    secondaryLight: '#FAFAFA', // Off white
    secondaryDark: '#F5F5F5', // Light gray
    
    // Accent colors - consistent with primary
    accent: '#5D4037', // Same as primary for consistency
    accentLight: '#8D6E63', // Medium brown
    accentDark: '#3E2723', // Very dark brown
    
    // Background and surface colors
    background: '#FFFFFF', // Pure white
    surface: '#FFFFFF', // Pure white
    surfaceGlass: 'rgba(255, 255, 255, 0.9)', // Glass effect
    surfaceGlassDark: 'rgba(255, 255, 255, 0.8)', // Darker glass
    
    // Text colors - brown variations
    text: '#3E2723', // Very dark brown
    textSecondary: '#5D4037', // Dark brown
    textLight: '#8D6E63', // Medium brown
    textWhite: '#ffffff', // White text
    textDark: '#3E2723', // Very dark brown
    
    // Status colors
    success: '#4CAF50', // Green
    warning: '#FF9800', // Orange
    error: '#F44336', // Red
    info: '#2196F3', // Blue
    
    // Border and shadow colors
    border: 'rgba(93, 64, 55, 0.2)', // Brown border
    borderLight: 'rgba(93, 64, 55, 0.1)', // Light brown border
    shadow: 'rgba(0, 0, 0, 0.1)', // Light shadow
    shadowDark: 'rgba(0, 0, 0, 0.2)', // Dark shadow
    shadowGlass: 'rgba(255, 255, 255, 0.9)', // Glass shadow
    
    // Gradient definitions - simplified
    gradients: {
      primary: 'linear-gradient(135deg, #5D4037 0%, #8D6E63 100%)',
      secondary: 'linear-gradient(135deg, #FFFFFF 0%, #FAFAFA 100%)',
      accent: 'linear-gradient(135deg, #5D4037 0%, #8D6E63 100%)',
      hero: 'linear-gradient(135deg, rgba(93, 64, 55, 0.8) 0%, rgba(255, 255, 255, 0.9) 100%)',
      card: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%)',
      glass: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.8) 100%)',
    }
  },
  
  typography: {
    // Modern font stack
    body: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    heading: '"Poppins", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    display: '"Playfair Display", "Times New Roman", serif', // For hero text
    
    // Font sizes
    fontSize: '16px',
    fontSizeSmall: '14px',
    fontSizeLarge: '18px',
    
    // Modern heading sizes
    h1: '3.5rem', // 56px
    h2: '2.5rem', // 40px
    h3: '2rem',   // 32px
    h4: '1.5rem', // 24px
    h5: '1.25rem', // 20px
    h6: '1.125rem', // 18px
    
    // Font weights
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    
    // Line heights
    lineHeight: 1.6,
    lineHeightTight: 1.3,
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
    hero: '6rem',    // 96px
  },
  
  borderRadius: {
    sm: '0.375rem',  // 6px
    md: '0.75rem',   // 12px
    lg: '1rem',      // 16px
    xl: '1.5rem',    // 24px
    full: '9999px',  // Full circle
  },
  
  shadows: {
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    glass: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    glassHover: '0 12px 40px 0 rgba(31, 38, 135, 0.45)',
  },
  
  breakpoints: {
    mobile: '640px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1280px',
    ultra: '1536px',
  },
  
  transitions: {
    fast: '0.15s cubic-bezier(0.4, 0, 0.2, 1)',
    normal: '0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '0.5s cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: '0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },

  // Glassmorphism effects - natural and warm
  glass: {
    background: 'rgba(253, 246, 227, 0.3)',
    backdrop: 'blur(10px)',
    border: '1px solid rgba(139, 115, 85, 0.2)',
  },

  // Animation keyframes
  keyframes: {
    fadeIn: `
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    `,
    slideIn: `
      from { transform: translateX(-100%); }
      to { transform: translateX(0); }
    `,
    scaleIn: `
      from { transform: scale(0.9); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    `,
    float: `
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    `,
  }
};

export default theme;
  