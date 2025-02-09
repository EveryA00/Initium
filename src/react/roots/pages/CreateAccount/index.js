import React, { useState } from "react";
import { Styled } from "./styledComponents";

const CreateAccount = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate form on submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.includes("@")) newErrors.email = "Invalid email address";
    if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSuccessMessage("");
    } else {
      setErrors({});
      setSuccessMessage("Account created successfully!");
    }
  };

  return (
    <Styled.Container>
      <Styled.FormWrapper>
        <h2>Create Account</h2>
        {successMessage && <Styled.SuccessMessage>{successMessage}</Styled.SuccessMessage>}
        <form onSubmit={handleSubmit}>
          <Styled.InputWrapper>
            <label>Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} />
            {errors.name && <Styled.Error>{errors.name}</Styled.Error>}
          </Styled.InputWrapper>

          <Styled.InputWrapper>
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
            {errors.email && <Styled.Error>{errors.email}</Styled.Error>}
          </Styled.InputWrapper>

          <Styled.InputWrapper>
            <label>Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} />
            {errors.password && <Styled.Error>{errors.password}</Styled.Error>}
          </Styled.InputWrapper>

          <Styled.InputWrapper>
            <label>Confirm Password</label>
            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
            {errors.confirmPassword && <Styled.Error>{errors.confirmPassword}</Styled.Error>}
          </Styled.InputWrapper>

          <Styled.SubmitButton type="submit">Create Account</Styled.SubmitButton>
        </form>
      </Styled.FormWrapper>
    </Styled.Container>
  );
};

export default CreateAccount;