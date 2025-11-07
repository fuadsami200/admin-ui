import React, { useEffect, useState } from 'react';
import axios from 'axios';
const API = process.env.REACT_APP_API_BASE;

export default function Stats() {
  const [stats, setStats] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(()=>{
    axios.get(`${API}/stats`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(r=>setStats(r.data.stats))
    .catch(()=>setStats(null));
  }, []);

  if (!stats) return <div>Loading stats...</div>;
  return <div>👥 Total Users: {stats.users_count}</div>;
}
