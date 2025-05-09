import React, { useState } from "react";
import {
  SubmitButton,
  SuccessMessage,
  Error,
  Container,
  FormWrapper,
  InputWrapper
} from "../styles/signInStyledComponents";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.email.includes("@")) newErrors.email = "Invalid email address";
    if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSuccessMessage("");
    } else {
      setErrors({});
      setSuccessMessage("Signed in successfully!");
    }
  };

  return (
    <Container>
      <FormWrapper>
        <h2>Sign In</h2>
        {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
        <form onSubmit={handleSubmit}>
          <InputWrapper>
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
            {errors.email && <Error>{errors.email}</Error>}
          </InputWrapper>

          <InputWrapper>
            <label>Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} />
            {errors.password && <Error>{errors.password}</Error>}
          </InputWrapper>

          <SubmitButton type="submit">Sign In</SubmitButton>
        </form>
      </FormWrapper>
    </Container>
  );
};

export default SignIn;