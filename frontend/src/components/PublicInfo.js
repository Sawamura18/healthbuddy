import React, { useEffect, useState } from 'react';
import API from '../api';

export default function PublicInfo(){
  const [info, setInfo] = useState(null);
  useEffect(()=>{ API.get('/public-info').then(r=>setInfo(r.data)).catch(()=>{}); },[]);
  if(!info) return <div>Loading public info...</div>;
  return (
    <div>
      <h4>Latest Health Information</h4>
      {info.items.map((it, idx)=> (
        <div key={idx} className="card">
          <h5>{it.title}</h5>
          <p className="small">{it.body}</p>
        </div>
      ))}
    </div>
  );
}
