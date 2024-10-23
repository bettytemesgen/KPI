// JobOrderModal.js

import React from 'react';
import { FaClock } from 'react-icons/fa';
import JobOrderForm from './JobOrderForm'; // Assuming you have a separate component for the form
import Modal from './Modal'; // Modal component to display the form

const JobOrderModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Create a New Job Order</h1>
        <JobOrderForm onClose={onClose} />
      </div>
    </Modal>
  );
};

export default JobOrderModal;
