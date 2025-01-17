import { useQuery } from '@tanstack/react-query';
import { getAllPlatform } from 'libs/api-client/connected-platform';

export const usePlatform = () => {
  return useQuery({
    queryFn: async () => getAllPlatform(),
    queryKey: ['platform'],
  });
};
