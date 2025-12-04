import React, { useState, useContext } from 'react';
import API from '../api';
import { AuthContext } from '../context/AuthContext';

export default function Login(){
  const [email,setEmail]=useState(''), [password,setPassword]=useState(''), [mode,setMode]=useState('login'), [name,setName]=useState(''), [role,setRole]=useState('patient'), [err,setErr]=useState('');
  const { login } = useContext(AuthContext);

  const submit = async (e)=>{
    e.preventDefault();
    try{
      const url = mode==='login' ? '/auth/login' : '/auth/register';
      const body = mode==='login' ? { email, password } : { name, email, password, role };
      const res = await API.post(url, body);
      login(res.data.token, res.data.user);
    }catch(err){ setErr(err.response?.data?.message || 'Error'); }
  };

  return (
    <form onSubmit={submit}>
      <h3>{mode==='login' ? 'Login' : 'Register'}</h3>
      {mode==='register' && <input className="input" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />}
      <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input className="input" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      {mode==='register' &&
        <div>
          <label className="small">Role:</label>
          <select className="input" value={role} onChange={e=>setRole(e.target.value)}>
            <option value="patient">Patient</option>
            <option value="provider">Provider</option>
          </select>
        </div>
      }
      <button className="button" type="submit">{mode==='login' ? 'Login' : 'Register'}</button>
      <div style={{marginTop:8}}>
        <button type="button" onClick={()=>setMode(mode==='login'?'register':'login')} className="small">{mode==='login' ? 'Create account' : 'Already have account?'}</button>
      </div>
      {err && <div style={{color:'red'}}>{err}</div>}
    </form>
  );
}
