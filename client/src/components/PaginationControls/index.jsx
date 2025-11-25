import React, { memo } from 'react';
import PropTypes from 'prop-types';
import './PaginationControls.css'; 


const PaginationControls = ({
                              currentPage,
                              totalCount,
                              limit,
                              onPageChange,
                              adsOnPageCount,
                            }) => {
  const totalPages = Math.ceil(totalCount / limit);

  
  

  const isNextDisabled = currentPage >= totalPages || adsOnPageCount < limit;

  return (
    <div className="pagination">
      <div className="pagination__info">
        Страница <span className="pagination__number">{currentPage}</span> из <span className="pagination__number">{totalPages}</span>
      </div>

      <div className="pagination__actions">
        <button
          className="pagination__btn"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
        >
          &larr; Предыдущая
        </button>

        <button
          className="pagination__btn"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={isNextDisabled}
        >
          Следующая &rarr;
        </button>
      </div>
    </div>
  );
};

PaginationControls.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  adsOnPageCount: PropTypes.number.isRequired,
};

export default memo(PaginationControls);