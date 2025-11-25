
import client from './client';

export const fetchAds = async (params = {}) => {
  try {
    const response = await client.get('/api/v1/ads', { params });

    return response.data;
  } catch (error) {
    throw new Error('Не удалось загрузить список объявлений.');
  }
};


export const fetchAdById = async (id) => {
  if (!id) {
    throw new Error('Требуется ID для загрузки объявления.');
  }
  try {
    
    const response = await client.get(`/api/v1/ads/${id}`);

    
    return response.data;
  } catch (error) {
    
    throw new Error(`Не удалось загрузить объявление ${id}.`);
  }
};

