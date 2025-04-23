import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignupPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateUsername = (name) => {
    return /^[a-zA-Z0-9]{4,}$/.test(name); // only letters & numbers, min 4 chars
  };

  const validatePassword = (pass) => {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(pass); // min 6 chars, letter + number
  };

  const handleSignup = (e) => {
    e.preventDefault();

    if (!validateUsername(username)) {
      setError('Username must be at least 4 characters and contain only letters and numbers.');
      return;
    }

    if (!validatePassword(password)) {
      setError('Password must be at least 6 characters and include at least one letter and one number.');
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = existingUsers.some((user) => user.username === username);

    if (userExists) {
      setError('User already exists!');
      return;
    }

    existingUsers.push({ username, password });
    localStorage.setItem('users', JSON.stringify(existingUsers));
    navigate('/login');
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h2 className="text-center mb-4">Create Account</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSignup}>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError('');
            }}
          />
        </div>
        <div className="mb-4">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError('');
            }}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Sign Up
        </button>
      </form>

      <p className="text-center mt-3">
        Already have an account? <a href="/login">Log In</a>
      </p>
    </div>
  );
}

export default SignupPage;
