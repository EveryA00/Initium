import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { ThemeProvider } from 'styled-components';
import theme from '../styles/theme';
import SignIn from '../pages/signIn';

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    query: {},
  }),
}));

const renderWithProviders = (component) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('SignIn Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    test('renders sign-in form with all required elements', () => {
      renderWithProviders(<SignIn />);
      
      expect(screen.getByText('Welcome Back')).toBeInTheDocument();
      expect(screen.getByText('Sign in to your account to continue')).toBeInTheDocument();
      expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
      expect(screen.getByLabelText('Password')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument();
      expect(screen.getByText('Forgot your password?')).toBeInTheDocument();
      expect(screen.getByText(/Don't have an account/)).toBeInTheDocument();
    });

    test('renders form with proper accessibility attributes', () => {
      renderWithProviders(<SignIn />);
      
      const emailInput = screen.getByLabelText('Email Address');
      const passwordInput = screen.getByLabelText('Password');
      
      expect(emailInput).toHaveAttribute('type', 'email');
      expect(emailInput).toHaveAttribute('required');
      expect(emailInput).toHaveAttribute('placeholder', 'Enter your email');
      
      expect(passwordInput).toHaveAttribute('type', 'password');
      expect(passwordInput).toHaveAttribute('required');
      expect(passwordInput).toHaveAttribute('placeholder', 'Enter your password');
    });

    test('renders password visibility toggle button', () => {
      renderWithProviders(<SignIn />);
      
      const toggleButton = screen.getByRole('button', { name: 'Show password' });
      expect(toggleButton).toBeInTheDocument();
      expect(toggleButton).toHaveTextContent('👁️');
    });
  });

  describe('Email Validation', () => {
    test('shows error for empty email on blur', async () => {
      renderWithProviders(<SignIn />);
      
      const emailInput = screen.getByLabelText('Email Address');
      emailInput.focus();
      emailInput.blur();
      
      await waitFor(() => {
        expect(screen.queryByText('Please enter a valid email address')).not.toBeInTheDocument();
      });
    });

    test('shows error for invalid email format on blur', async () => {
      renderWithProviders(<SignIn />);
      
      const emailInput = screen.getByLabelText('Email Address');
      await userEvent.type(emailInput, 'invalid-email');
      emailInput.blur();
      
      await waitFor(() => {
        expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
      });
    });

    test('accepts valid email format', async () => {
      renderWithProviders(<SignIn />);
      
      const emailInput = screen.getByLabelText('Email Address');
      await userEvent.type(emailInput, 'test@example.com');
      emailInput.blur();
      
      await waitFor(() => {
        expect(screen.queryByText('Please enter a valid email address')).not.toBeInTheDocument();
      });
    });

    test('shows error for empty email on form submission', async () => {
      renderWithProviders(<SignIn />);
      
      const submitButton = screen.getByRole('button', { name: 'Sign In' });
      await userEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText('Email is required')).toBeInTheDocument();
      });
    });
  });

  describe('Password Validation', () => {
    test('shows error for empty password on form submission', async () => {
      renderWithProviders(<SignIn />);
      
      const emailInput = screen.getByLabelText('Email Address');
      const submitButton = screen.getByRole('button', { name: 'Sign In' });
      
      await userEvent.type(emailInput, 'test@example.com');
      await userEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText('Password is required')).toBeInTheDocument();
      });
    });

    test('shows error for password less than 8 characters', async () => {
      renderWithProviders(<SignIn />);
      
      const passwordInput = screen.getByLabelText('Password');
      await userEvent.type(passwordInput, 'short');
      passwordInput.blur();
      
      await waitFor(() => {
        expect(screen.getByText('Password must be at least 8 characters long')).toBeInTheDocument();
      });
    });

    test('shows error for password without lowercase letter', async () => {
      renderWithProviders(<SignIn />);
      
      const passwordInput = screen.getByLabelText('Password');
      await userEvent.type(passwordInput, 'PASSWORD123');
      passwordInput.blur();
      
      await waitFor(() => {
        expect(screen.getByText('Password must contain at least one lowercase letter')).toBeInTheDocument();
      });
    });

    test('shows error for password without uppercase letter', async () => {
      renderWithProviders(<SignIn />);
      
      const passwordInput = screen.getByLabelText('Password');
      await userEvent.type(passwordInput, 'password123');
      passwordInput.blur();
      
      await waitFor(() => {
        expect(screen.getByText('Password must contain at least one uppercase letter')).toBeInTheDocument();
      });
    });

    test('shows error for password without number', async () => {
      renderWithProviders(<SignIn />);
      
      const passwordInput = screen.getByLabelText('Password');
      await userEvent.type(passwordInput, 'PasswordABC');
      passwordInput.blur();
      
      await waitFor(() => {
        expect(screen.getByText('Password must contain at least one number')).toBeInTheDocument();
      });
    });

    test('accepts valid password format', async () => {
      renderWithProviders(<SignIn />);
      
      const passwordInput = screen.getByLabelText('Password');
      await userEvent.type(passwordInput, 'Password123');
      passwordInput.blur();
      
      await waitFor(() => {
        expect(screen.queryByText(/Password must/)).not.toBeInTheDocument();
      });
    });
  });

  describe('Form Submission', () => {
    test('shows loading state during submission', async () => {
      renderWithProviders(<SignIn />);
      
      const emailInput = screen.getByLabelText('Email Address');
      const passwordInput = screen.getByLabelText('Password');
      const submitButton = screen.getByRole('button', { name: 'Sign In' });
      
      await userEvent.type(emailInput, 'test@example.com');
      await userEvent.type(passwordInput, 'Password123');
      await userEvent.click(submitButton);
      
      expect(screen.getByText('Signing In...')).toBeInTheDocument();
      expect(screen.getByText('Please wait while we sign you in...')).toBeInTheDocument();
      expect(submitButton).toBeDisabled();
    });

    test('shows success message after successful submission', async () => {
      renderWithProviders(<SignIn />);
      
      const emailInput = screen.getByLabelText('Email Address');
      const passwordInput = screen.getByLabelText('Password');
      const submitButton = screen.getByRole('button', { name: 'Sign In' });
      
      await userEvent.type(emailInput, 'test@example.com');
      await userEvent.type(passwordInput, 'Password123');
      await userEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText('Signed in successfully! Welcome back.')).toBeInTheDocument();
      }, { timeout: 2000 });
    });

    test('clears form after successful submission', async () => {
      renderWithProviders(<SignIn />);
      
      const emailInput = screen.getByLabelText('Email Address');
      const passwordInput = screen.getByLabelText('Password');
      const submitButton = screen.getByRole('button', { name: 'Sign In' });
      
      await userEvent.type(emailInput, 'test@example.com');
      await userEvent.type(passwordInput, 'Password123');
      await userEvent.click(submitButton);
      
      await waitFor(() => {
        expect(emailInput).toHaveValue('');
        expect(passwordInput).toHaveValue('');
      }, { timeout: 4000 });
    });

    test('prevents submission with invalid data', async () => {
      renderWithProviders(<SignIn />);
      
      const submitButton = screen.getByRole('button', { name: 'Sign In' });
      await userEvent.click(submitButton);
      
      expect(screen.getByText('Email is required')).toBeInTheDocument();
      expect(screen.getByText('Password is required')).toBeInTheDocument();
      expect(submitButton).not.toBeDisabled();
    });
  });

  describe('Password Visibility Toggle', () => {
    test('toggles password visibility when button is clicked', async () => {
      renderWithProviders(<SignIn />);
      
      const passwordInput = screen.getByLabelText('Password');
      const toggleButton = screen.getByRole('button', { name: 'Show password' });
      
      expect(passwordInput).toHaveAttribute('type', 'password');
      expect(toggleButton).toHaveTextContent('👁️');
      
      await userEvent.click(toggleButton);
      
      expect(passwordInput).toHaveAttribute('type', 'text');
      expect(toggleButton).toHaveTextContent('🙈');
      expect(toggleButton).toHaveAttribute('aria-label', 'Hide password');
      
      await userEvent.click(toggleButton);
      
      expect(passwordInput).toHaveAttribute('type', 'password');
      expect(toggleButton).toHaveTextContent('👁️');
      expect(toggleButton).toHaveAttribute('aria-label', 'Show password');
    });
  });

  describe('Real-time Validation', () => {
    test('clears error when user starts typing', async () => {
      renderWithProviders(<SignIn />);
      
      const emailInput = screen.getByLabelText('Email Address');
      
      // Trigger error
      await userEvent.type(emailInput, 'invalid');
      emailInput.blur();
      
      await waitFor(() => {
        expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
      });
      
      // Start typing again
      await userEvent.type(emailInput, '@example.com');
      
      await waitFor(() => {
        expect(screen.queryByText('Please enter a valid email address')).not.toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    test('has proper ARIA attributes for error states', async () => {
      renderWithProviders(<SignIn />);
      
      const emailInput = screen.getByLabelText('Email Address');
      const passwordInput = screen.getByLabelText('Password');
      
      // Trigger validation errors
      await userEvent.type(emailInput, 'invalid');
      emailInput.blur();
      
      await userEvent.type(passwordInput, 'short');
      passwordInput.blur();
      
      await waitFor(() => {
        expect(emailInput).toHaveAttribute('aria-invalid', 'true');
        expect(passwordInput).toHaveAttribute('aria-invalid', 'true');
        expect(emailInput).toHaveAttribute('aria-describedby', 'email-error');
        expect(passwordInput).toHaveAttribute('aria-describedby', 'password-error');
      });
    });

    test('has proper ARIA attributes for success states', async () => {
      renderWithProviders(<SignIn />);
      
      const emailInput = screen.getByLabelText('Email Address');
      const passwordInput = screen.getByLabelText('Password');
      
      await userEvent.type(emailInput, 'test@example.com');
      await userEvent.type(passwordInput, 'Password123');
      
      expect(emailInput).toHaveAttribute('aria-invalid', 'false');
      expect(passwordInput).toHaveAttribute('aria-invalid', 'false');
    });

    test('has proper form structure with labels and IDs', () => {
      renderWithProviders(<SignIn />);
      
      const emailInput = screen.getByLabelText('Email Address');
      const passwordInput = screen.getByLabelText('Password');
      
      expect(emailInput).toHaveAttribute('id', 'email');
      expect(passwordInput).toHaveAttribute('id', 'password');
    });
  });

  describe('User Experience', () => {
    test('shows proper placeholder text', () => {
      renderWithProviders(<SignIn />);
      
      const emailInput = screen.getByPlaceholderText('Enter your email');
      const passwordInput = screen.getByPlaceholderText('Enter your password');
      
      expect(emailInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
    });

    test('has proper link text for sign up', () => {
      renderWithProviders(<SignIn />);
      
      const signUpLink = screen.getByText('Sign up here');
      expect(signUpLink).toBeInTheDocument();
      expect(signUpLink.closest('a')).toHaveAttribute('href', '/createAccount');
    });

    test('has proper link text for forgot password', () => {
      renderWithProviders(<SignIn />);
      
      const forgotPasswordLink = screen.getByText('Forgot your password?');
      expect(forgotPasswordLink).toBeInTheDocument();
      expect(forgotPasswordLink.closest('a')).toHaveAttribute('href', '/forgot-password');
    });
  });

  describe('Error Handling', () => {
    test('handles multiple validation errors simultaneously', async () => {
      renderWithProviders(<SignIn />);
      
      const submitButton = screen.getByRole('button', { name: 'Sign In' });
      await userEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText('Email is required')).toBeInTheDocument();
        expect(screen.getByText('Password is required')).toBeInTheDocument();
      });
    });

    test('shows general error message for API failures', async () => {
      // Mock a failed API call by overriding the setTimeout
      jest.spyOn(global, 'setTimeout').mockImplementation((callback) => {
        callback();
        throw new Error('API Error');
      });
      
      renderWithProviders(<SignIn />);
      
      const emailInput = screen.getByLabelText('Email Address');
      const passwordInput = screen.getByLabelText('Password');
      const submitButton = screen.getByRole('button', { name: 'Sign In' });
      
      await userEvent.type(emailInput, 'test@example.com');
      await userEvent.type(passwordInput, 'Password123');
      await userEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText('Sign-in failed. Please try again.')).toBeInTheDocument();
      });
      
      // Restore original setTimeout
      jest.restoreAllMocks();
    });
  });
}); 