import React, { useState } from "react";
import { Styled } from "../styles/signInStyledComponents";

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
    <Styled.Container>
      <Styled.FormWrapper>
        <h2>Sign In</h2>
        {successMessage && <Styled.SuccessMessage>{successMessage}</Styled.SuccessMessage>}
        <form onSubmit={handleSubmit}>
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

          <Styled.SubmitButton type="submit">Sign In</Styled.SubmitButton>
        </form>
      </Styled.FormWrapper>
    </Styled.Container>
  );
};

export default SignIn;