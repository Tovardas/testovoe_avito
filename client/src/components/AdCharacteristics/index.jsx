import React, { memo } from 'react';
import PropTypes from 'prop-types';
import './AdCharacteristics.css'; 

const AdCharacteristics = ({ category, price, characteristics }) => {
  
  const formattedPrice = price
    ? new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(price)
    : 'Не указана';

  return (
    <div className="ad-characteristics">
      <h3 className="ad-characteristics__title">Характеристики</h3>
      <table className="ad-characteristics__table">
        <tbody>
        {}
        <tr>
          <td className="ad-characteristics__key">Категория</td>
          <td className="ad-characteristics__value">{category}</td>
        </tr>
        <tr>
          <td className="ad-characteristics__key">Цена</td>
          <td className="ad-characteristics__value">{formattedPrice}</td>
        </tr>

        {}
        {characteristics && Object.entries(characteristics).map(([key, val]) => (
          <tr key={key}>
            <td className="ad-characteristics__key">{key}</td>
            <td className="ad-characteristics__value">{val}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};

AdCharacteristics.propTypes = {
  category: PropTypes.string,
  price: PropTypes.number,
  characteristics: PropTypes.object,
};

export default memo(AdCharacteristics);