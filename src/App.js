import React, { useState } from 'react';
import Login from './Login';
import AddUser from './AddUser';
import UsersList from './UsersList';
import Stats from './Stats';

function App() {
  const [user, setUser] = useState(null);

  return (
    <div style={{padding:20}}>
      {!user ? (
        <Login onLogin={setUser} />
      ) : (
        <>
          <h2>Welcome, {user.name}</h2>
          <button onClick={()=>{ localStorage.removeItem('token'); setUser(null); }}>Logout</button>
          <AddUser onAdded={()=>window.location.reload()} />
          <UsersList />
          <Stats />
        </>
      )}
    </div>
  );
}

export default App;
