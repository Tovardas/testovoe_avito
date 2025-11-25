import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './Notification.css';

const Notification = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    if (!message) return;

    
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [message, onClose]); 

  if (!message) return null;

  
  const typeClass = type === 'error' ? 'notification--error' : 'notification--success';

  return (
    <div className={`notification ${typeClass}`}>
      <span className="notification__message">{message}</span>
      <button
        className="notification__close"
        onClick={onClose}
        aria-label="Закрыть уведомление"
      >
        ✕
      </button>
    </div>
  );
};

Notification.propTypes = {
  message: PropTypes.string,
  type: PropTypes.oneOf(['success', 'error']),
  onClose: PropTypes.func.isRequired,
};

export default Notification;