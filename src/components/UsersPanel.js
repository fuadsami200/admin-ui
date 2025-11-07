// src/components/UsersPanel.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const BASE = process.env.REACT_APP_API_BASE || "";

export default function UsersPanel() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [log, setLog] = useState("");

  async function loadUsers() {
    try {
      const r = await axios.get(`${BASE}/api/users`);
      if (r.data && r.data.ok) setUsers(r.data.users || []);
      else setLog("Failed: " + JSON.stringify(r.data));
    } catch (e) {
      setLog("Error: " + e.toString());
    }
  }

  async function addUser(e) {
    e.preventDefault();
    if (!name || !email) return setLog("Please enter name and email");
    try {
      const r = await axios.post(`${BASE}/api/users`, { name, email });
      if (r.data && r.data.ok) {
        setLog("Added user id: " + r.data.user.id);
        setName(""); setEmail("");
        loadUsers();
      } else setLog("Failed: " + JSON.stringify(r.data));
    } catch (err) {
      setLog("Error: " + (err.response?.data?.error || err.message));
    }
  }

  useEffect(() => { loadUsers(); }, []);

  return (
    <div style={{ padding: 16, fontFamily: "sans-serif" }}>
      <h3>Users</h3>

      <form onSubmit={addUser} style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} required />
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <button type="submit">Add user</button>
      </form>

      <div>
        <strong>List:</strong>
        <ul>
          {users.map(u => (
            <li key={u.id}>
              {u.id} — {u.name} — {u.email} — {new Date(u.created_at).toLocaleString()}
            </li>
          ))}
        </ul>
        {users.length === 0 && <div>No users yet</div>}
      </div>

      <pre style={{ marginTop: 12, whiteSpace: "pre-wrap" }}>{log}</pre>
    </div>
  );
}
