
import React, { memo } from 'react';
import PropTypes from 'prop-types';

const TotalCountDisplay = memo(({ totalCount }) => (
  <p>Всего найдено объявлений: **{totalCount}**</p>
));

TotalCountDisplay.propTypes = {
  totalCount: PropTypes.number.isRequired,
};

export default TotalCountDisplay;