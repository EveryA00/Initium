import React, { useState } from "react";
import {
  SubmitButton,
  SuccessMessage,
  Error,
  Container,
  FormWrapper,
  InputWrapper,
  FormTitle,
  FormDescription,
  LinkText,
  ForgotPasswordLink
} from "../styles/signInStyledComponents";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Enhanced email validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Enhanced password validation
  const validatePassword = (password) => {
    if (password.length < 8) {
      return "Password must be at least 8 characters long";
    }
    if (!/(?=.*[a-z])/.test(password)) {
      return "Password must contain at least one lowercase letter";
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      return "Password must contain at least one uppercase letter";
    }
    if (!/(?=.*\d)/.test(password)) {
      return "Password must contain at least one number";
    }
    return null;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  // Handle input blur for real-time validation
  const handleBlur = (e) => {
    const { name, value } = e.target;
    const newErrors = { ...errors };

    if (name === "email" && value) {
      if (!validateEmail(value)) {
        newErrors.email = "Please enter a valid email address";
      } else {
        delete newErrors.email;
      }
    }

    if (name === "password" && value) {
      const passwordError = validatePassword(value);
      if (passwordError) {
        newErrors.password = passwordError;
      } else {
        delete newErrors.password;
      }
    }

    setErrors(newErrors);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Clear previous messages
    setSuccessMessage("");
    
    const newErrors = {};

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Validate password
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else {
      const passwordError = validatePassword(formData.password);
      if (passwordError) {
        newErrors.password = passwordError;
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    // Call Express backend API
    try {
      const res = await fetch("http://localhost:3001/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        // Handle rate limiting specifically
        if (res.status === 429) {
          setErrors({ 
            general: "Too many sign-in attempts. Please wait a moment and try again." 
          });
        } else if (data.errors && Array.isArray(data.errors)) {
          // Handle multiple validation errors from backend
          const backendErrors = {};
          data.errors.forEach(error => {
            if (error.includes('email')) backendErrors.email = error;
            else if (error.includes('password')) backendErrors.password = error;
            else backendErrors.general = error;
          });
          setErrors(backendErrors);
        } else {
          setErrors({ general: data.message || "Sign-in failed. Please check your credentials." });
        }
        setSuccessMessage("");
      } else {
        setErrors({});
        setSuccessMessage("Signed in successfully! Welcome back.");
        
        // Store token and user data in localStorage
        if (data.data && data.data.token) {
          localStorage.setItem('token', data.data.token);
          localStorage.setItem('user', JSON.stringify(data.data.user));
        }
        
        // Reset form and redirect to home page after successful sign-in
        setTimeout(() => {
          setFormData({ email: "", password: "" });
          setSuccessMessage("");
          // Redirect to home page as signed-in user
          window.location.href = '/';
        }, 2000);
      }
    } catch (err) {
      setErrors({ general: "Server error. Please try again later." });
      setSuccessMessage("");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container>
      <FormWrapper>
        <FormTitle>Welcome Back</FormTitle>
        <FormDescription>Sign in to your account to continue</FormDescription>
        
        {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
        {errors.general && <Error>{errors.general}</Error>}
        
        <form onSubmit={handleSubmit} noValidate>
          <InputWrapper>
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your email"
              aria-describedby={errors.email ? "email-error" : undefined}
              aria-invalid={!!errors.email}
              required
            />
            {errors.email && <Error id="email-error" role="alert">{errors.email}</Error>}
          </InputWrapper>

          <InputWrapper>
            <label htmlFor="password">Password</label>
            <div style={{ position: 'relative' }}>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter your password"
                aria-describedby={errors.password ? "password-error" : undefined}
                aria-invalid={!!errors.password}
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
            {errors.password && <Error id="password-error" role="alert">{errors.password}</Error>}
          </InputWrapper>

          <ForgotPasswordLink href="/forgot-password">
            Forgot your password?
          </ForgotPasswordLink>

          <SubmitButton 
            type="submit" 
            disabled={isSubmitting}
            aria-describedby={isSubmitting ? "submitting-message" : undefined}
          >
            {isSubmitting ? "Signing In..." : "Sign In"}
          </SubmitButton>
          
          {isSubmitting && (
            <div id="submitting-message" style={{ marginTop: '10px', color: '#666' }}>
              Please wait while we sign you in...
            </div>
          )}
        </form>

        <LinkText>
          Don't have an account? <a href="/createAccount">Sign up here</a>
        </LinkText>
      </FormWrapper>
    </Container>
  );
};

export default SignIn;