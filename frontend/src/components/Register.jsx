import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role] = useState('user'); // Fixed to 'user' as per requirement
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:5001/auth/newuser', {
                email,
                password,
                role
            });
            localStorage.setItem('token', data.token);
            localStorage.setItem('role', data.role);
            navigate('/user');
        } catch (err) {
            setError(err.response?.data?.msg || 'Registration failed');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', marginTop: '10em', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
            <h2>Create Account</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleRegister}>
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
                <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px' }}>
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;