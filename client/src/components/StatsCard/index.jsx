import React from 'react';
import PropTypes from 'prop-types';
import './StatsCard.css';

const StatsCard = ({ title, value, subtext, color = '#007bff' }) => {
  return (
    <div className="stats-card" style={{ borderTopColor: color }}>
      <h3 className="stats-card__title">{title}</h3>
      <div className="stats-card__value" style={{ color }}>{value}</div>
      {subtext && <div className="stats-card__subtext">{subtext}</div>}
    </div>
  );
};

StatsCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  subtext: PropTypes.string,
  color: PropTypes.string,
};

export default StatsCard;