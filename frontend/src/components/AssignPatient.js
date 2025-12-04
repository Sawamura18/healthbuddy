import React, { useState } from 'react';
import API from '../api';

export default function AssignPatient({ providerId }){
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');

  async function lookupAndAssign(e){
    e.preventDefault();
    setMsg('');
    try {
      const found = await API.get('/users_lookup', { params: { email } });
      const patient = found.data;
      await API.post(`/assign/provider/${providerId}`, { patientId: patient._id });
      setMsg(`Assigned ${patient.email}`);
      setEmail('');
    } catch(err){
      setMsg(err.response?.data?.message || 'Error');
    }
  }

  return (
    <div className="card">
      <h4>Assign Patient</h4>
      <form onSubmit={lookupAndAssign}>
        <input className="input" placeholder="Patient email" value={email} onChange={e=>setEmail(e.target.value)} />
        <button className="button">Assign</button>
      </form>
      {msg && <div className="small" style={{marginTop:8}}>{msg}</div>}
    </div>
  );
}
