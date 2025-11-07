import React, { useState } from "react";
import axios from "axios";

const BASE = process.env.REACT_APP_API_BASE || "REACT_APP_API_BASE_NOT_SET";

export default function App() {
  const [log, setLog] = useState("");

  async function test() {
    try {
      const r = await axios.get(`${BASE}/api/testdb`, { timeout: 10000 });
      setLog(JSON.stringify(r.data, null, 2));
    } catch (e) {
      let msg = e.toString();
      if (e.response) msg += " | resp: " + JSON.stringify(e.response.data);
      setLog(msg);
      console.error(e);
    }
  }

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif", direction: "rtl" }}>
      <h2>لوحة التحكم (Admin UI)</h2>
      <div>REACT_APP_API_BASE = <b>{BASE}</b></div>
      <button onClick={test} style={{ marginTop: 12 }}>اختبار الاتصال بالسيرفر</button>
      <pre style={{ whiteSpace: "pre-wrap", marginTop: 12 }}>{log}</pre>
    </div>
  );
}
