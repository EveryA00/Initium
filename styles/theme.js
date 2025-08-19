const theme = {
  colors: {
    // Natural & Organic Color Scheme - Creams, Tans, Earth Tones
    primary: '#D4A574', // Warm tan
    primaryLight: '#E6C08C', // Light cream
    primaryDark: '#B8860B', // Darker tan
    
    // Secondary colors - natural and earthy
    secondary: '#8B7355', // Rich brown
    secondaryLight: '#A0522D', // Light brown
    secondaryDark: '#654321', // Darker brown
    
    // Accent colors - fresh and natural
    accent: '#7FB069', // Sage green
    accentLight: '#9BC53D', // Light sage
    accentDark: '#5A7C65', // Darker sage
    
    // Natural neutral palette
    background: '#FDF6E3', // Warm cream
    surface: '#FFFFFF', // Pure white
    surfaceGlass: 'rgba(255, 255, 255, 0.25)', // Glass effect
    surfaceGlassDark: 'rgba(255, 255, 255, 0.1)', // Darker glass
    
    // Text colors - natural and warm
    text: '#2F1B14', // Deep brown
    textSecondary: '#5D4037', // Medium brown
    textLight: '#8D6E63', // Light brown
    textWhite: '#ffffff', // White text
    
    // Status colors
    success: '#48BB78', // Green
    warning: '#ED8936', // Orange
    error: '#F56565', // Red
    info: '#4299E1', // Blue
    
    // Border and shadow colors
    border: 'rgba(255, 255, 255, 0.2)', // Glass border
    borderLight: 'rgba(255, 255, 255, 0.1)', // Light glass border
    shadow: 'rgba(0, 0, 0, 0.1)', // Light shadow
    shadowDark: 'rgba(0, 0, 0, 0.2)', // Dark shadow
    shadowGlass: 'rgba(255, 255, 255, 0.3)', // Glass shadow
    
    // Gradient definitions - natural and warm
    gradients: {
      primary: 'linear-gradient(135deg, #D4A574 0%, #E6C08C 100%)',
      secondary: 'linear-gradient(135deg, #8B7355 0%, #A0522D 100%)',
      accent: 'linear-gradient(135deg, #7FB069 0%, #9BC53D 100%)',
      hero: 'linear-gradient(135deg, #D4A574 0%, #8B7355 50%, #7FB069 100%)',
      card: 'linear-gradient(135deg, rgba(253, 246, 227, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)',
      glass: 'linear-gradient(135deg, rgba(253, 246, 227, 0.25) 0%, rgba(255, 255, 255, 0.1) 100%)',
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
    border: '1px solid rgba(212, 165, 116, 0.2)',
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
  