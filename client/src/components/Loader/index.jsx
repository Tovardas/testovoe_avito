import React, { memo } from 'react';
import './Loader.css'; 

const Loader = () => {
  return (
    <div className="loader-wrapper">
      <div className="loader-spinner"></div>
    </div>
  );
};

export default memo(Loader);