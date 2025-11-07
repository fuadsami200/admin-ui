import React, { useState } from 'react';
import axios from 'axios';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const API = process.env.REACT_APP_API_BASE;

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const res = await axios.post(`${API}/auth/login`, { email, password });
      const { token, user } = res.data;
      localStorage.setItem('token', token);
      onLogin(user);
    } catch (err) {
      alert(err.response?.data?.error || 'Login failed');
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
      <button>Login</button>
    </form>
  );
}
