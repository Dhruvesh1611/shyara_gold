
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserProfileStorageSetter } from '../utils/LocalStorageEncryption'
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:5001/auth/login', {
        email,
        password
      });
      console.log(data)

      // Redirect based on role
      if (data.role === 'admin') {
        UserProfileStorageSetter("user_credentials_config", data.user)
        navigate('/admin'); // Use navigate instead of history.push
      } else if (data.role === 'owner') {
        UserProfileStorageSetter("user_credentials_config", data.user)
        navigate('/owner');
      } else {
        UserProfileStorageSetter("user_credentials_config", data.user)
        navigate('/home');
      }
    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed');
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register'); // Use navigate instead of history.push
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: '15px' }}>
          <label>Role: </label>
          <select value={role} onChange={(e) => setRole(e.target.value)} style={{ width: '100%', padding: '5px' }}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="owner">Owner</option>
          </select>
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Email: </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '5px' }}
          />
        </div>
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}>
          Login
        </button>
      </form>
      {role === 'user' && (
        <div style={{ marginTop: '15px' }}>
          <p>Don't have an account? <button onClick={handleRegisterRedirect} style={{ background: 'none', border: 'none', color: '#007bff', textDecoration: 'underline', cursor: 'pointer' }}>Create one</button></p>
        </div>
      )}
    </div>
  );
};

export default Login;