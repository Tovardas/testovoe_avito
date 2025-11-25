import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './DecisionModal.css'; 

const DecisionModal = ({ isOpen, onClose, onSubmit, title, options = [] }) => {
  const [reason, setReason] = useState('');
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (isOpen && options.length > 0) {
      setReason(options[0]);
      setComment('');
    }
  }, [isOpen, options]);

  if (!isOpen) return null;

  const isOtherSelected = reason === 'Другое';

  const handleSubmit = () => {
    const finalComment = isOtherSelected ? comment : '';

    if (isOtherSelected && !finalComment.trim()) {
      alert('Пожалуйста, напишите комментарий');
      return;
    }

    onSubmit({ reason, comment: finalComment });
  };

  
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="decision-modal" onClick={handleOverlayClick}>
      <div className="decision-modal__content">
        <h3 className="decision-modal__title">{title}</h3>

        <label className="decision-modal__field">
          <span className="decision-modal__label-text">Причина:</span>
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="decision-modal__select"
          >
            {options.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </label>

        {isOtherSelected && (
          <label className="decision-modal__field decision-modal__field--anim">
            <span className="decision-modal__label-text">
              Комментарий (обязательно):
            </span>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="decision-modal__textarea"
              placeholder="Укажите подробную причину..."
              autoFocus
            />
          </label>
        )}

        <div className="decision-modal__actions">
          <button
            onClick={onClose}
            className="decision-modal__btn decision-modal__btn--cancel"
          >
            Отмена
          </button>
          <button
            onClick={handleSubmit}
            className="decision-modal__btn decision-modal__btn--submit"
          >
            Подтвердить
          </button>
        </div>
      </div>
    </div>
  );
};

DecisionModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default DecisionModal;