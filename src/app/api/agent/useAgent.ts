import { useQuery } from '@tanstack/react-query';
import { getAgent } from 'libs/api-client/human';

export const useAgent = () => {
  return useQuery({
    queryFn: async () => getAgent(),
    queryKey: ['agent'],
  });
};
