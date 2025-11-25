import React, { memo } from 'react';
import PropTypes from 'prop-types';
import AdElement from '../AdElement'; 
import './AdsContainer.css'; 

const AdsContainer = memo(({ adsArray }) => {
  return (
    <div className="ads-container">
      {adsArray && adsArray.length > 0 ? (
        adsArray.map(ad => (
          <AdElement
            key={ad.id}
            ad={ad}
          />
        ))
      ) : (
        <div className="ads-container__empty">
          <p>Объявления не найдены.</p>
        </div>
      )}
    </div>
  );
});

AdsContainer.propTypes = {
  adsArray: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default AdsContainer;