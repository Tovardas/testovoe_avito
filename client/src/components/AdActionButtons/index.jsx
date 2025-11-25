import React, { memo } from 'react';
import PropTypes from 'prop-types';
import './AdActionButtons.css'; 

const AdActionButtons = ({
                           status,
                           isLoading,
                           onApprove,
                           onReject,
                           onRequestChanges
                         }) => {

  const isApproved = status === 'approved';
  const isRejected = status === 'rejected';

  
  const isDisabled = isLoading || isApproved || isRejected;

  return (
    <div className="ad-actions">

      {}
      <button
        onClick={onApprove}
        disabled={isDisabled}
        className={`ad-actions__btn ad-actions__btn--approve ${isLoading ? 'ad-actions__btn--loading' : ''}`}
      >
        {isLoading ? 'Обработка...' : isApproved ? 'Уже одобрено' : 'Одобрить'}
      </button>

      {}
      <button
        onClick={onReject}
        disabled={isDisabled}
        className="ad-actions__btn ad-actions__btn--reject"
      >
        {isRejected ? 'Уже отклонено' : 'Отклонить'}
      </button>

      {}
      <button
        onClick={onRequestChanges}
        disabled={isDisabled}
        className="ad-actions__btn ad-actions__btn--changes"
      >
        На доработку
      </button>
    </div>
  );
};

AdActionButtons.propTypes = {
  status: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
  onApprove: PropTypes.func.isRequired,
  onReject: PropTypes.func.isRequired,
  onRequestChanges: PropTypes.func.isRequired,
};

export default memo(AdActionButtons);