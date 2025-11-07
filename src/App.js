// src/App.js
import React from "react";
import UsersPanel from "./components/UsersPanel";

export default function App() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Admin UI</h1>
      <UsersPanel />
    </div>
  );
}
