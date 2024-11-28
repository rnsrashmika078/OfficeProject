
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { useNavigate  } from 'react-router-dom';

function Test() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLoginClick = async () => {
    if (!email.trim() || !password.trim()) {
      setError('Both email and password fields are required!');
      return;
    }

    try {
      const response = await fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        navigate('/admin/dashboard');
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '500px', border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
      <h1 className="text-center">Administration - TEST</h1>
      <p className="lead text-center">Login Page for Administration</p>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input
          type="email"
          className="form-control"
          id="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter Admin Email"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input
          type="password"
          className="form-control"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Enter Admin Password"
        />
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="d-flex justify-content-center gap-2">
        <button type="button" className="btn btn-primary" onClick={handleLoginClick}>Log in</button>
      </div>
    </div>
  );
}

export default Test;
