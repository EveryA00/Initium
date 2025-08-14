import React from 'react';
import { styled } from 'styled-components';

const TestContainer = styled.div`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.xl};
  margin: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  text-align: center;
`;

const TestButton = styled.button`
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: none;
  cursor: pointer;
  margin: ${({ theme }) => theme.spacing.md};
`;

const TestPage = () => {
  return (
    <div>
      <h1>Styled Components Test</h1>
      <TestContainer>
        <h2>This should have a green background</h2>
        <p>If you see this with a green background, styled-components is working!</p>
        <TestButton>Test Button</TestButton>
      </TestContainer>
    </div>
  );
};

export default TestPage; 