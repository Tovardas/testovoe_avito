import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { useStats } from '../../hooks/useStats';
import StatsCard from '../../components/StatsCard';
import Loader from '../../components/Loader';
import './stats.css';


const COLORS = {
  approved: '#4caf50',
  rejected: '#f44336',
  requestChanges: '#ff9800',
  primary: '#007bff'
};

const PIE_COLORS = [COLORS.approved, COLORS.rejected, COLORS.requestChanges];

const StatsPage = () => {
  const [period, setPeriod] = useState('week'); 
  const { summary, activity, decisions, categories, isLoading, error } = useStats(period);

  if (isLoading) return <Loader />;
  if (error) return <div className="stats-error">Ошибка: {error}</div>;

  

  const decisionsData = decisions ? [
    { name: 'Одобрено', value: decisions.approved },
    { name: 'Отклонено', value: decisions.rejected },
    { name: 'На доработку', value: decisions.requestChanges },
  ].filter(item => item.value > 0) : [];

  const categoriesData = categories ? Object.entries(categories).map(([name, count]) => ({
    name,
    count
  })).sort((a, b) => b.count - a.count) : [];

  
  const formatTime = (totalSeconds) => {
    if (!totalSeconds) return '0с';

    const sec = Math.round(totalSeconds);
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;

    if (h > 0) return `${h}ч ${m}м ${s}с`;
    if (m > 0) return `${m}м ${s}с`;
    return `${s}с`;
  };

  return (
    <div className="stats-page">
      <div className="stats-page__header">
        <h1>Статистика модератора</h1>

        <div className="stats-page__controls">
          <button
            className={`stats-btn ${period === 'today' ? 'active' : ''}`}
            onClick={() => setPeriod('today')}
          >
            Сегодня
          </button>
          <button
            className={`stats-btn ${period === 'week' ? 'active' : ''}`}
            onClick={() => setPeriod('week')}
          >
            Неделя
          </button>
          <button
            className={`stats-btn ${period === 'month' ? 'active' : ''}`}
            onClick={() => setPeriod('month')}
          >
            Месяц
          </button>
        </div>
      </div>

      {}
      <div className="stats-page__grid">
        <StatsCard
          title="Всего проверено"
          value={summary?.totalReviewed || 0}
          color="#007bff"
        />
        <StatsCard
          title="Процент одобрения"
          value={`${Math.round(summary?.approvedPercentage || 0)}%`}
          color={COLORS.approved}
        />
        <StatsCard
          title="Процент отклонения"
          value={`${Math.round(summary?.rejectedPercentage || 0)}%`}
          color={COLORS.rejected}
        />
        <StatsCard
          title="Ср. время проверки"
          value={formatTime(summary?.averageReviewTime)}
          subtext="на одно объявление"
          color="#607d8b"
        />
      </div>

      {}
      <div className="stats-page__charts-layout">

        {}
        <div className="chart-container chart-container--full">
          <h3>Активность проверки (по дням)</h3>
          {}
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activity}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="date"
                  tickFormatter={(str) => new Date(str).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })}
                />
                <YAxis />
                <Tooltip
                  labelFormatter={(str) => new Date(str).toLocaleDateString('ru-RU')}
                />
                <Legend />
                <Bar dataKey="approved" name="Одобрено" stackId="a" fill={COLORS.approved} />
                <Bar dataKey="rejected" name="Отклонено" stackId="a" fill={COLORS.rejected} />
                <Bar dataKey="requestChanges" name="Доработка" stackId="a" fill={COLORS.requestChanges} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {}
        <div className="chart-container">
          <h3>Распределение решений</h3>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={decisionsData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {decisionsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {}
        <div className="chart-container">
          <h3>Популярные категории</h3>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoriesData} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} tick={{fontSize: 12}} />
                <Tooltip />
                <Bar dataKey="count" name="Объявлений" fill="#8884d8" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};

export default StatsPage;