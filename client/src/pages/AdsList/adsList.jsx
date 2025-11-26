import React, { useCallback, useMemo } from 'react';
import { useAds } from '../../hooks/useAds';
import { useSearchParams } from 'react-router-dom';

import AdsContainer from '../../components/AdsContainer';
import Filters from '../../components/Filters';
import PaginationControls from '../../components/PaginationControls';
import TotalCountDisplay from "../../components/TotalCountDisplay";
import Loader from "../../components/Loader";

import './AdsList.css';

const Header = React.memo(() => (
  <h1>Список объявлений на модерации</h1>
));

const AdsList = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo(() => ({
    page: Number(searchParams.get('page')) || 1,
    limit: Number(searchParams.get('limit')) || 10,
    search: searchParams.get('search') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    categoryId: searchParams.get('categoryId') || '',
    sortBy: searchParams.get('sortBy') || 'createdAt',
    sortOrder: searchParams.get('sortOrder') || 'desc',
    status: searchParams.getAll('status'),
  }), [searchParams]);

  const { data, isLoading, isFetching, isError, error } = useAds(filters);

  const handleFiltersChange = useCallback((newFilters) => {
    setSearchParams(prev => {
      const params = new URLSearchParams();
      params.set('page', '1');
      params.set('limit', String(newFilters.limit || 10));

      if (newFilters.search) params.set('search', newFilters.search);
      if (newFilters.minPrice) params.set('minPrice', newFilters.minPrice);
      if (newFilters.maxPrice) params.set('maxPrice', newFilters.maxPrice);
      if (newFilters.categoryId) params.set('categoryId', newFilters.categoryId);
      if (newFilters.sortBy) params.set('sortBy', newFilters.sortBy);
      if (newFilters.sortOrder) params.set('sortOrder', newFilters.sortOrder);

      if (newFilters.status && Array.isArray(newFilters.status)) {
        newFilters.status.forEach(s => params.append('status', s));
      }

      return params;
    });
  }, [setSearchParams]);

  const handlePageChange = useCallback((newPage) => {
    setSearchParams(prevSearchParams => {
      const newParams = new URLSearchParams(prevSearchParams);
      newParams.set('page', String(newPage));
      return newParams;
    });
  }, [setSearchParams]);

  const handleResetFilters = useCallback(() => {
    setSearchParams({ page: 1, limit: 10 });
  }, [setSearchParams]);

  if (isError) {
    return (
      <div className="ads-list-page">
        <div className="ads-list__error">Ошибка: {error.message}</div>
      </div>
    );
  }

  const adsArray = data?.ads || [];
  const totalCount = data?.pagination?.totalItems || 0;

  const isFirstLoading = isLoading;

  return (
    <div className="ads-list-page">
      <Header />

      <Filters
        filters={filters}
        onChange={handleFiltersChange}
        onReset={handleResetFilters}
      />

      <TotalCountDisplay totalCount={totalCount} />

      <div className="ads-list__content-wrapper">
        {isFirstLoading && <Loader />}
        {!isFirstLoading && (
          <>
            {isFetching && (
              <div className="ads-list__overlay">
                <Loader />
              </div>
            )}
            <div className={`ads-list__container ${isFetching ? 'ads-list__container--loading' : ''}`}>
              <AdsContainer adsArray={adsArray} />
            </div>
          </>
        )}
      </div>

      <PaginationControls
        currentPage={filters.page}
        totalCount={totalCount}
        limit={filters.limit}
        onPageChange={handlePageChange}
        adsOnPageCount={adsArray.length}
        disabled={isFetching}
      />
    </div>
  );
};

export default AdsList;