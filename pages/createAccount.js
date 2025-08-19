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
  PasswordStrength
} from "../styles/createAccountStyledComponents";

const CreateAccount = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Enhanced email validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Enhanced password validation
  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 8) {
      errors.push("Password must be at least 8 characters long");
    }
    if (!/(?=.*[a-z])/.test(password)) {
      errors.push("Password must contain at least one lowercase letter");
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      errors.push("Password must contain at least one uppercase letter");
    }
    if (!/(?=.*\d)/.test(password)) {
      errors.push("Password must contain at least one number");
    }
    return errors;
  };

  // Calculate password strength
  const getPasswordStrength = (password) => {
    if (!password) return { score: 0, label: "", color: "" };
    
    let score = 0;
    if (password.length >= 8) score++;
    if (/(?=.*[a-z])/.test(password)) score++;
    if (/(?=.*[A-Z])/.test(password)) score++;
    if (/(?=.*\d)/.test(password)) score++;
    if (/(?=.*[!@#$%^&*])/.test(password)) score++;

    const labels = ["Very Weak", "Weak", "Fair", "Good", "Strong"];
    const colors = ["#ff4444", "#ff8800", "#ffbb33", "#00C851", "#007E33"];
    
    return {
      score: Math.min(score, 4),
      label: labels[Math.min(score, 4)],
      color: colors[Math.min(score, 4)]
    };
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

    if (name === "name" && value) {
      if (value.trim().length < 2) {
        newErrors.name = "Name must be at least 2 characters long";
      } else if (value.trim().length > 50) {
        newErrors.name = "Name cannot exceed 50 characters";
      } else {
        delete newErrors.name;
      }
    }

    if (name === "email" && value) {
      if (!validateEmail(value)) {
        newErrors.email = "Please enter a valid email address";
      } else {
        delete newErrors.email;
      }
    }

    if (name === "password" && value) {
      const passwordErrors = validatePassword(value);
      if (passwordErrors.length > 0) {
        newErrors.password = passwordErrors[0];
      } else {
        delete newErrors.password;
      }
    }

    if (name === "confirmPassword" && value) {
      if (value !== formData.password) {
        newErrors.confirmPassword = "Passwords do not match";
      } else {
        delete newErrors.confirmPassword;
      }
    }

    setErrors(newErrors);
  };

  // Validate form on submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage("");
    
    const newErrors = {};

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters long";
    } else if (formData.name.trim().length > 50) {
      newErrors.name = "Name cannot exceed 50 characters";
    }

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
      const passwordErrors = validatePassword(formData.password);
      if (passwordErrors.length > 0) {
        newErrors.password = passwordErrors[0];
      }
    }

    // Validate confirm password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    // No validation errors, call backend
    try {
              const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        // Handle rate limiting specifically
        if (res.status === 429) {
          setErrors({ 
            general: "Too many account creation attempts. Please wait a moment and try again." 
          });
        } else if (data.errors && Array.isArray(data.errors)) {
          // Handle multiple validation errors from backend
          const backendErrors = {};
          data.errors.forEach(error => {
            if (error.includes('email')) backendErrors.email = error;
            else if (error.includes('password')) backendErrors.password = error;
            else if (error.includes('name')) backendErrors.name = error;
            else backendErrors.general = error;
          });
          setErrors(backendErrors);
        } else {
          setErrors({ general: data.message || "Something went wrong" });
        }
        setSuccessMessage("");
      } else {
        setErrors({});
        setSuccessMessage("Account created successfully! Welcome to our juice store!");
        
        // Store token and user data in localStorage
        if (data.data && data.data.token) {
          localStorage.setItem('token', data.data.token);
          localStorage.setItem('user', JSON.stringify(data.data.user));
          
          // Update success message to indicate automatic sign-in
          setSuccessMessage("Account created successfully! You are now signed in. Welcome to our juice store!");
          
          // Reset form and redirect to home page after a short delay
          setTimeout(() => {
            setFormData({
              name: "",
              email: "",
              password: "",
              confirmPassword: "",
            });
            setSuccessMessage("");
            // Redirect to home page as signed-in user
            window.location.href = '/';
          }, 2000);
        } else {
          setSuccessMessage("Account created successfully! Please sign in to continue.");
          // Reset form after successful signup
          setTimeout(() => {
            setFormData({
              name: "",
              email: "",
              password: "",
              confirmPassword: "",
            });
            setSuccessMessage("");
          }, 3000);
        }
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

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <Container>
      <FormWrapper>
        <FormTitle>Create Your Account</FormTitle>
        <FormDescription>Join our juice community and start your healthy journey</FormDescription>
        
        {errors.general && <Error>{errors.general}</Error>}
        {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
        
        <form onSubmit={handleSubmit} noValidate>
          <InputWrapper>
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your full name"
              aria-describedby={errors.name ? "name-error" : undefined}
              aria-invalid={!!errors.name}
              required
            />
            {errors.name && <Error id="name-error" role="alert">{errors.name}</Error>}
          </InputWrapper>

          <InputWrapper>
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your email address"
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
                placeholder="Create a strong password"
                aria-describedby={errors.password ? "password-error" : "password-strength"}
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
            {formData.password && (
              <PasswordStrength>
                <div style={{ color: passwordStrength.color, fontSize: '12px' }}>
                  Password Strength: {passwordStrength.label}
                </div>
                <div style={{ 
                  width: '100%', 
                  height: '4px', 
                  background: '#eee', 
                  borderRadius: '2px',
                  marginTop: '4px'
                }}>
                  <div style={{
                    width: `${(passwordStrength.score / 4) * 100}%`,
                    height: '100%',
                    background: passwordStrength.color,
                    borderRadius: '2px',
                    transition: 'width 0.3s ease'
                  }}></div>
                </div>
              </PasswordStrength>
            )}
            {errors.password && <Error id="password-error" role="alert">{errors.password}</Error>}
          </InputWrapper>

          <InputWrapper>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div style={{ position: 'relative' }}>
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Confirm your password"
                aria-describedby={errors.confirmPassword ? "confirm-password-error" : undefined}
                aria-invalid={!!errors.confirmPassword}
                required
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
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
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? "🙈" : "👁️"}
              </button>
            </div>
            {errors.confirmPassword && (
              <Error id="confirm-password-error" role="alert">{errors.confirmPassword}</Error>
            )}
          </InputWrapper>

          <SubmitButton 
            type="submit" 
            disabled={isSubmitting}
            aria-describedby={isSubmitting ? "submitting-message" : undefined}
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </SubmitButton>
          
          {isSubmitting && (
            <div id="submitting-message" style={{ marginTop: '10px', color: '#666', textAlign: 'center' }}>
              Please wait while we create your account...
            </div>
          )}
        </form>

        <LinkText>
          Already have an account? <a href="/signIn">Sign in here</a>
        </LinkText>
      </FormWrapper>
    </Container>
  );
};

export default CreateAccount;
