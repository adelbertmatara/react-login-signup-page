import React, { useState } from 'react';
import api from '../api';
import zxcvbn from 'zxcvbn';

const Signup = ({ onSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    const { score } = zxcvbn(e.target.value);
    setPasswordStrength(score);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordStrength < 2) {
      setError('Password is too weak');
      return;
    }
    if (!termsAccepted) {
      setError('You must accept the terms of service');
      return;
    }

    try {
      const user = await api.signup(email, password);
      onSignup(user);
      // Implement email verification logic here
      await api.sendVerificationEmail(email);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleResetPassword = async () => {
    try {
      await api.resetPassword(email);
      setError('Password reset email sent');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        {password && (
          <progress
            value={passwordStrength}
            max="4"
            style={{ width: '100%', height: '10px', marginBottom: '10px' }}
          />
        )}
        <label>
          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            required
          />
          I accept the <a href="/terms">Terms of Service</a>
        </label>
        <button type="submit">Sign Up</button>
      </form>
      <button onClick={handleResetPassword}>Reset Password</button>
    </div>
  );
};

export default Signup;
