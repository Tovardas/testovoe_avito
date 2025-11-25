import { useState, useEffect } from 'react';

export const useStats = (period) => {
  const [data, setData] = useState({
    summary: null,
    activity: [],
    decisions: null,
    categories: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        
        const query = `?period=${period}`;
        const baseUrl = '/api/v1'; 

        
        const [summaryRes, activityRes, decisionsRes, categoriesRes] = await Promise.all([
          fetch(`${baseUrl}/stats/summary${query}`),
          fetch(`${baseUrl}/stats/chart/activity${query}`),
          fetch(`${baseUrl}/stats/chart/decisions${query}`),
          fetch(`${baseUrl}/stats/chart/categories${query}`),
        ]);

        if (!summaryRes.ok || !activityRes.ok || !decisionsRes.ok || !categoriesRes.ok) {
          throw new Error('Ошибка загрузки статистики');
        }

        const summary = await summaryRes.json();
        const activity = await activityRes.json();
        const decisions = await decisionsRes.json();
        const categories = await categoriesRes.json();

        setData({ summary, activity, decisions, categories });
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [period]);

  return { ...data, isLoading, error };
};