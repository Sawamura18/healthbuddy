import React, { createContext, useState, useEffect } from 'react';
import { setToken } from '../api';
import jwtDecode from 'jwt-decode';

export const AuthContext = createContext();

export function AuthProvider({ children }){
  const [user, setUser] = useState(null);

  useEffect(()=>{
    const token = localStorage.getItem('token');
    if(token){
      try{
        const decoded = jwtDecode(token);
        setToken(token);
        setUser({ id: decoded.id, role: decoded.role, token });
      }catch(e){ localStorage.removeItem('token'); }
    }
  },[]);

  const login = (token, userObj) => {
    localStorage.setItem('token', token);
    setToken(token);
    setUser({ ...userObj, token });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}
