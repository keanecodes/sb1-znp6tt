import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuthStore } from '../stores/authStore';
import { startAuthentication } from '@simplewebauthn/browser';

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const LoginForm = styled.form`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  width: 100%;
  max-width: 400px;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.5rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Implement actual authentication logic here
    login({ id: '1', name: username, role: 'student' });
  };

  const handleWebAuthn = async () => {
    try {
      // In a real application, you would fetch the authentication options from your server
      const authOptions = await fetch('/auth/webauthn/generate-authentication-options').then(res => res.json());
      
      const authResult = await startAuthentication(authOptions);
      
      // Send the result to your server for verification
      const verificationResult = await fetch('/auth/webauthn/verify-authentication', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(authResult),
      }).then(res => res.json());
      
      if (verificationResult.verified) {
        login({ id: verificationResult.userId, name: verificationResult.username, role: verificationResult.role });
      }
    } catch (error) {
      console.error('WebAuthn authentication failed:', error);
    }
  };

  return (
    <LoginWrapper>
      <LoginForm onSubmit={handleSubmit}>
        <h2>Login</h2>
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Login</Button>
        <Button type="button" onClick={handleWebAuthn}>Login with WebAuthn</Button>
      </LoginForm>
    </LoginWrapper>
  );
};

export default Login;