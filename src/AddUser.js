import React, { useState } from 'react';
import axios from 'axios';

const API = process.env.REACT_APP_API_BASE;

export default function AddUser({ onAdded }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const token = localStorage.getItem('token');

  async function handleAdd(e) {
    e.preventDefault();
    try {
      await axios.post(`${API}/users`, { name, email, password }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setName(''); setEmail(''); setPassword('');
      onAdded?.();
    } catch (err) {
      alert(err.response?.data?.error || 'Add failed');
    }
  }

  return (
    <form onSubmit={handleAdd}>
      <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input type="password" placeholder="Password (optional)" value={password} onChange={e=>setPassword(e.target.value)} />
      <button>Add user</button>
    </form>
  );
}
