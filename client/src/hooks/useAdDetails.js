
import { useState, useEffect, useCallback } from 'react';


export const useAdDetails = (id) => {
  const [ad, setAd] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchAd = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/v1/ads/${id}`);
        if (!response.ok) throw new Error('Ошибка загрузки объявления');
        const data = await response.json();
        setAd(data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAd();
  }, [id]);

  return { ad, isLoading, error, setAd };
};


export const useAdActions = () => {

  
  const performAction = async (url, method, body = null) => {
    const options = {
      method,
      headers: { 'Content-Type': 'application/json' },
    };
    if (body) options.body = JSON.stringify(body);

    const response = await fetch(url, options);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Ошибка выполнения действия');
    }
    return await response.json();
  };

  const approveAd = (id) => {
    return performAction(`/api/v1/ads/${id}/approve`, 'POST');
  };

  const rejectAd = (id, reason, comment) => {
    return performAction(`/api/v1/ads/${id}/reject`, 'POST', { reason, comment });
  };

  
  const requestChangesAd = (id, reason, comment) => {
    return performAction(`/api/v1/ads/${id}/request-changes`, 'POST', { reason, comment });
  };

  return { approveAd, rejectAd, requestChangesAd };
};