import React, { useState, useEffect } from 'react';
import API from '../api';

export default function Profile(){
  const [profile, setProfile] = useState({ name:'', profile:{ dob:'', allergies:'', medications:'' }});
  useEffect(()=> load(),[]);
  async function load(){
    const res = await API.get('/users/me');
    setProfile(res.data || {});
  }
  async function save(){
    await API.put('/users/me', profile);
    alert('Saved');
  }
  return (
    <div className="card">
      <h4>Profile</h4>
      <input className="input" value={profile.name||''} onChange={e=>setProfile({...profile, name: e.target.value})} placeholder="Full name"/>
      <input className="input" value={profile.profile?.dob||''} onChange={e=>setProfile({...profile, profile:{...profile.profile, dob: e.target.value}})} placeholder="DOB"/>
      <input className="input" value={profile.profile?.allergies||''} onChange={e=>setProfile({...profile, profile:{...profile.profile, allergies: e.target.value}})} placeholder="Allergies"/>
      <input className="input" value={profile.profile?.medications||''} onChange={e=>setProfile({...profile, profile:{...profile.profile, medications: e.target.value}})} placeholder="Medications"/>
      <button className="button" onClick={save}>Save Profile</button>
    </div>
  );
}
