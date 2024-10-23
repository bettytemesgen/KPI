// components/PeerComparison.js
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function PeerComparison() {
  const [peerKPIs, setPeerKPIs] = useState([]);

  useEffect(() => {
    axios.get('/api/peer-comparison').then((response) => {
      setPeerKPIs(response.data);
    });
  }, []);

  return (
    <div>
      <h2 className="text-xl mt-4">Peer Comparison</h2>
      <ul>
        {peerKPIs.map((kpi, index) => (
          <li key={index}>
            {kpi.metric}: {kpi.value}
          </li>
        ))}
      </ul>
    </div>
  );
}
