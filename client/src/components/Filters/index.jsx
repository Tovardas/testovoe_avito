import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Filters.css'; 

const STATUS_OPTIONS = [
  { value: 'pending', label: 'На модерации' },
  { value: 'approved', label: 'Одобрено' },
  { value: 'rejected', label: 'Отклонено' },
  { value: 'draft', label: 'Черновик' },
];

const SORT_OPTIONS = [
  { value: 'createdAt', label: 'По дате создания' },
  { value: 'price', label: 'По цене' },
  { value: 'priority', label: 'По приоритету' },
];

const CATEGORIES = [
  { id: 1, name: 'Недвижимость' },
  { id: 2, name: 'Транспорт' },
  { id: 3, name: 'Работа' },
  { id: 4, name: 'Услуги' },
  { id: 5, name: 'Животные' },
  { id: 6, name: 'Мода' },
  { id: 7, name: 'Детское' },
];

const Filters = ({ filters, onChange, onReset }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (JSON.stringify(localFilters) !== JSON.stringify(filters)) {
        onChange(localFilters);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [localFilters, onChange, filters]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleStatusChange = (statusValue) => {
    setLocalFilters(prev => {
      const currentStatuses = prev.status || [];
      let newStatuses;

      if (currentStatuses.includes(statusValue)) {
        newStatuses = currentStatuses.filter(s => s !== statusValue);
      } else {
        newStatuses = [...currentStatuses, statusValue];
      }

      return { ...prev, status: newStatuses };
    });
  };

  return (
    <div className="filters">
      <div className="filters__header">
        <h3 className="filters__title">Фильтры и поиск</h3>
        <button onClick={onReset} className="filters__reset-btn">
          Сбросить все
        </button>
      </div>

      <div className="filters__grid">
        {}
        <div className="filters__field">
          <label className="filters__label">Поиск</label>
          <input
            type="text"
            name="search"
            value={localFilters.search || ''}
            onChange={handleChange}
            placeholder="Название или описание..."
            className="filters__input"
          />
        </div>

        {}
        <div className="filters__field">
          <label className="filters__label">Категория</label>
          <select
            name="categoryId"
            value={localFilters.categoryId || ''}
            onChange={handleChange}
            className="filters__input"
          >
            <option value="">Все категории</option>
            {CATEGORIES.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        {}
        <div className="filters__field">
          <label className="filters__label">Цена</label>
          <div className="filters__row">
            <input
              type="number"
              name="minPrice"
              value={localFilters.minPrice || ''}
              onChange={handleChange}
              placeholder="От"
              className="filters__input"
            />
            <input
              type="number"
              name="maxPrice"
              value={localFilters.maxPrice || ''}
              onChange={handleChange}
              placeholder="До"
              className="filters__input"
            />
          </div>
        </div>

        {}
        <div className="filters__field">
          <label className="filters__label">Сортировка</label>
          <div className="filters__row">
            <select
              name="sortBy"
              value={localFilters.sortBy || 'createdAt'}
              onChange={handleChange}
              className="filters__input"
            >
              {SORT_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <select
              name="sortOrder"
              value={localFilters.sortOrder || 'desc'}
              onChange={handleChange}
              className="filters__input filters__input--small"
            >
              <option value="asc">↑ Возр</option>
              <option value="desc">↓ Убыв</option>
            </select>
          </div>
        </div>
      </div>

      {}
      <div className="filters__status-section">
        <label className="filters__label">Статус:</label>
        <div className="filters__status-group">
          {STATUS_OPTIONS.map(opt => (
            <label key={opt.value} className="filters__checkbox-label">
              <input
                type="checkbox"
                checked={(localFilters.status || []).includes(opt.value)}
                onChange={() => handleStatusChange(opt.value)}
                className="filters__checkbox"
              />
              {opt.label}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

Filters.propTypes = {
  filters: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
};

export default memo(Filters);