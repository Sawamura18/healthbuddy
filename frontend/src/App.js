import React, { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import PublicInfo from './components/PublicInfo';

export default function App(){
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="container">
      <div className="header">
        <h2>Healthcare Portal</h2>
        <div className="nav">
          <a href="#public">Public</a>
          {user ? <button className="button" onClick={logout}>Logout</button> : null}
        </div>
      </div>

      {!user ? (
        <>
          <div className="card"><PublicInfo /></div>
          <div className="card"><Login /></div>
        </>
      ) : (
        <>
          <Dashboard />
          <Profile />
        </>
      )}
    </div>
  );
}
