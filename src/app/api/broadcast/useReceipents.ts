import { useQuery } from '@tanstack/react-query';
import { getReceipents } from 'libs/api-client/broadcast';

export const useReceipents = () => {
  return useQuery({
    queryFn: async () => getReceipents(),
    queryKey: ['receipents'],
  });
};
