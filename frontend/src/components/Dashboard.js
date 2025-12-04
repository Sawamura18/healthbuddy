import React, { useState, useEffect, useContext } from 'react';
import API from '../api';
import { AuthContext } from '../context/AuthContext';
import AssignPatient from './AssignPatient';

export default function Dashboard(){
  const { user } = useContext(AuthContext);
  const [me, setMe] = useState(null);
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState('');

  useEffect(()=>{ fetchMe(); fetchGoals(); }, []);

  async function fetchMe(){
    try {
      const res = await API.get('/users/me');
      setMe(res.data);
    } catch {}
  }
  async function fetchGoals(){
    try {
      const res = await API.get('/goals/me');
      setGoals(res.data);
    } catch {}
  }
  async function addGoal(e){
    e.preventDefault();
    if(!newGoal) return;
    await API.post('/goals', { title: newGoal, target:100, unit:'%' });
    setNewGoal('');
    fetchGoals();
  }
  async function bump(goalId){
    const g = goals.find(x=>x._id===goalId);
    const newProgress = Math.min(100, (g.progress||0) + 10);
    await API.patch(`/goals/${goalId}`, { progress: newProgress });
    fetchGoals();
  }

  return (
    <div>
      <div className="card">
        <h3>Welcome{me?.name ? `, ${me.name}` : ''}</h3>
        <div className="small">Role: {user?.role}</div>
      </div>

      <div className="card">
        <h4>Wellness Goals</h4>
        {goals.length===0 && <div className="small">No goals yet.</div>}
        {goals.map(g => (
          <div className="goal" key={g._id}>
            <div>
              <strong>{g.title}</strong>
              <div className="small">{g.progress}/{g.target} {g.unit}</div>
            </div>
            <div>
              <button className="button" onClick={()=>bump(g._id)}>+ progress</button>
            </div>
          </div>
        ))}
        <form onSubmit={addGoal}>
          <input className="input" placeholder="New goal title" value={newGoal} onChange={e=>setNewGoal(e.target.value)} />
          <button className="button">Add Goal</button>
        </form>
      </div>

      {user?.role==='provider' && <AssignPatient providerId={user.id} />}

      {me?.assignedPatients && me.assignedPatients.length>0 &&
        <div className="card">
          <h4>Assigned Patients</h4>
          {me.assignedPatients.map(p => <div key={p._id} className="goal"><div>{p.name}</div><div className="small">{p.email}</div></div>)}
        </div>
      }
    </div>
  );
}
