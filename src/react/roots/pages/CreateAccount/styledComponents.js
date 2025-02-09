import styled from "styled-components";

// Styled Components
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f4f4f4;
`;

const FormWrapper = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 350px;
  text-align: center;
`;

const InputWrapper = styled.div`
  margin-bottom: 1rem;
  text-align: left;

  label {
    font-weight: bold;
    display: block;
    margin-bottom: 5px;
  }

  input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
`;

const Error = styled.p`
  color: red;
  font-size: 0.9rem;
  margin-top: 5px;
`;

const SuccessMessage = styled.p`
  color: green;
  font-size: 1rem;
  margin-bottom: 1rem;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background: #0056b3;
  }
`;

export const Styled = {
  SubmitButton,
  SuccessMessage,
  Error,
  Container,
  FormWrapper,
  InputWrapper
}