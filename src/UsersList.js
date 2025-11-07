import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API = process.env.REACT_APP_API_BASE;

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem('token');

  async function load() {
    try {
      const res = await axios.get(`${API}/users`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(res.data.users || []);
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to load users');
    }
  }

  useEffect(()=>{ load(); }, []);

  async function handleDelete(id) {
    if (!window.confirm('Delete this user?')) return;
    await axios.delete(`${API}/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    load();
  }

  return (
    <div>
      <h3>Users</h3>
      <ul>
        {users.map(u => (
          <li key={u.id}>
            {u.name} - {u.email}
            <button onClick={()=>handleDelete(u.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
