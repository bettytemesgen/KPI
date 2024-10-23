import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function SetKPITargets() {
  const [userId, setUserId] = useState(null);
  const [targetData, setTargetData] = useState({
    period: 'WEEKLY',
    targetTimeToFill: '',
    targetCandidatesSubmitted: '',
  });
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const storedUserId = sessionStorage.getItem('userId');
    setUserId(parseInt(storedUserId));
  }, []);

  const handleSetTargets = async () => {
    try {
      await axios.post('/api/kpis/set-targets', {
        userId,
        period: targetData.period,
        targetData: {
          targetTimeToFill: parseFloat(targetData.targetTimeToFill),
          targetCandidatesSubmitted: parseInt(targetData.targetCandidatesSubmitted),
        },
      });
      setMessage('KPI targets set successfully.');
    } catch (error) {
      console.error(error);
      setMessage('Failed to set KPI targets.');
    }
  };

  return (
    <div className="p-6 shadow-lg mt-6">
      <h2 className="text-xl font-semibold mb-4">Set KPI Targets</h2>
      {message && <p>{message}</p>}
      <div className="mb-4">
        <label className="block text-gray-700">Period</label>
        <select
          value={targetData.period}
          onChange={(e) => setTargetData({ ...targetData, period: e.target.value })}
          className="w-full p-2 border rounded"
        >
          <option value="WEEKLY">Weekly</option>
          <option value="MONTHLY">Monthly</option>
          <option value="QUARTERLY">Quarterly</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Target Time to Fill (days)</label>
        <input
          type="number"
          value={targetData.targetTimeToFill}
          onChange={(e) => setTargetData({ ...targetData, targetTimeToFill: e.target.value })}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Target Candidates Submitted</label>
        <input
          type="number"
          value={targetData.targetCandidatesSubmitted}
          onChange={(e) => setTargetData({ ...targetData, targetCandidatesSubmitted: e.target.value })}
          className="w-full p-2 border rounded"
        />
      </div>
      <button onClick={handleSetTargets} className="bg-blue-500 text-white px-4 py-2 rounded">
        Set Targets
      </button>
    </div>
  );
}
