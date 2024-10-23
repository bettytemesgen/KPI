// components/Modal.js

import PortalContainer from './PortalContainer';

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <PortalContainer>
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded shadow-lg max-w-md">
          <button className="absolute top-0 right-0 p-2 m-2 text-gray-600 hover:text-gray-800" onClick={onClose}>
            Close Modal
          </button>
          <p>Modal Content Here</p>
        </div>
      </div>
    </PortalContainer>
  );
};

export default Modal;
