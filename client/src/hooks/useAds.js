


import { useQuery } from '@tanstack/react-query';


import { fetchAds } from '../api/adsApi';


export const useAds = (filters = {}) => {
  
  
  
  const queryKey = ['ads', filters];
  
  const queryResult = useQuery({
    queryKey: queryKey,
    queryFn: () => fetchAds(filters), 
  });

  
  return queryResult;
};