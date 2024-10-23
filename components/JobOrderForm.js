// components/JobOrderForm.js
import { useState } from 'react';

export default function JobOrderForm() {
  const [jobTitle, setJobTitle] = useState('');
  const [clientId, setClientId] = useState('');
  const [roleLevel, setRoleLevel] = useState('Junior'); // Default to 'Junior'
  const [status, setStatus] = useState('Open'); // Default to 'Open'
  const [createdBy, setCreatedBy] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data
    const jobOrderData = {
      job_title: jobTitle,
      client_id: parseInt(clientId), // Ensure clientId is parsed as a number
      role_level: roleLevel,
      status: status,
      created_by: createdBy,
    };

    // Send the data to the API \pages\api\job-orders\assign-job-order.js
    const response = await fetch('/api/job-orders/assign-job-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jobOrderData),
    });

    if (response.ok) {
      alert('Job order created successfully!');
      // Optionally, reset the form after successful submission
      setJobTitle('');
      setClientId('');
      setRoleLevel('Junior');
      setStatus('Open');
      setCreatedBy('');
    } else {
      alert('Failed to create job order.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label htmlFor="jobTitle" className="block text-gray-700 font-bold mb-2">Job Title</label>
        <input
          id="jobTitle"
          type="text"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="clientId" className="block text-gray-700 font-bold mb-2">Client ID</label>
        <input
          id="clientId"
          type="number"
          value={clientId}
          onChange={(e) => setClientId(e.target.value)}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="roleLevel" className="block text-gray-700 font-bold mb-2">Role Level</label>
        <select
          id="roleLevel"
          value={roleLevel}
          onChange={(e) => setRoleLevel(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="Junior">Junior</option>
          <option value="Mid-Level">Mid-Level</option>
          <option value="Senior">Senior</option>
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="status" className="block text-gray-700 font-bold mb-2">Status</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="Open">Open</option>
          <option value="Filled">Filled</option>
          <option value="Closed">Closed</option>
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="createdBy" className="block text-gray-700 font-bold mb-2">Created By</label>
        <input
          id="createdBy"
          type="text"
          value={createdBy}
          onChange={(e) => setCreatedBy(e.target.value)}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Create Job Order
      </button>
    </form>
  );
}
