import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './AdElement.css';

const AdElement = memo(({ ad }) => {
  const navigate = useNavigate();

  const handleOpen = () => {
    navigate(`/item/${ad.id}`);
  };

  const mainImage = ad.images && ad.images.length > 0 ? ad.images[0] : null;

  const formattedPrice = ad.price
    ? new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(ad.price)
    : 'Цена не указана';

  const formattedDate = new Date(ad.createdAt).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const getStatusClass = (status) => {
    switch (status) {
      case 'approved': return 'ad-card__status--approved';
      case 'rejected': return 'ad-card__status--rejected';
      case 'pending': return 'ad-card__status--pending';
      default: return 'ad-card__status--draft';
    }
  };

  const statusLabels = {
    approved: 'Одобрено',
    rejected: 'Отклонено',
    pending: 'На модерации',
    draft: 'Черновик'
  };

  return (
    <div className="ad-card">
      {}
      <div className="ad-card__image-container">
        {mainImage ? (
          <img src={mainImage} alt={ad.title} className="ad-card__image" />
        ) : (
          <div className="ad-card__placeholder">
            Нет фото
          </div>
        )}

        {}
        {ad.priority === 'urgent' && (
          <div className="ad-card__priority-badge">
            Срочно
          </div>
        )}
      </div>

      <div className="ad-card__content">
        <div className="ad-card__header">
          {}
          <h3 className="ad-card__title" title={ad.title}>
            {ad.title}
          </h3>

          {}
          <div className="ad-card__price">
            {formattedPrice}
          </div>
        </div>

        <div className="ad-card__info">
          {}
          <div className="ad-card__row">
            <span className="ad-card__label">Категория:</span>
            <span className="ad-card__value">{ad.category}</span>
          </div>

          {}
          <div className="ad-card__row">
            <span className="ad-card__label">Дата:</span>
            <span className="ad-card__value">{formattedDate}</span>
          </div>
        </div>

        <div className="ad-card__footer">
          {}
          <span className={`ad-card__status ${getStatusClass(ad.status)}`}>
            {statusLabels[ad.status] || ad.status}
          </span>

          <button className="ad-card__button" onClick={handleOpen}>
            Открыть
          </button>
        </div>
      </div>
    </div>
  );
});

AdElement.propTypes = {
  ad: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number,
    category: PropTypes.string,
    status: PropTypes.string.isRequired,
    priority: PropTypes.string,
    createdAt: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default AdElement;