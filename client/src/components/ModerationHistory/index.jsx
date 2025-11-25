import React from 'react';
import PropTypes from 'prop-types';
import './ModerationHistory.css';

const ModerationHistory = ({ history = [] }) => {
  if (!history || history.length === 0) return null;

  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('ru-RU', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  
  const actionLabels = {
    approved: 'Одобрено',
    rejected: 'Отклонено',
    requestChanges: 'Запрошены изменения',
    created: 'Создано',
    updated: 'Обновлено'
  };

  return (
    <div className="moderation-history">
      <h3 className="moderation-history__title">История модерации</h3>
      <ul className="moderation-history__list">
        {history.map((item, index) => (
          <li key={index} className="moderation-history__item">

            <div className="moderation-history__header">
              <span className="moderation-history__action">
                {actionLabels[item.action] || item.action}
              </span>
              <span className="moderation-history__date">
                {formatDate(item.timestamp)}
              </span>
            </div>

            <div className="moderation-history__meta">
              Модератор: {item.moderatorName || 'Система'}
            </div>

            {item.reason && (
              <div className="moderation-history__reason">
                Причина: {item.reason}
              </div>
            )}

            {item.comment && (
              <div className="moderation-history__comment">
                "{item.comment}"
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

ModerationHistory.propTypes = {
  history: PropTypes.arrayOf(
    PropTypes.shape({
      action: PropTypes.string.isRequired,
      timestamp: PropTypes.string.isRequired,
      moderatorName: PropTypes.string,
      reason: PropTypes.string,
      comment: PropTypes.string,
    })
  ),
};

export default ModerationHistory;