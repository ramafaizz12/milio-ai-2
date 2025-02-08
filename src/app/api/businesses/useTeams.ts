import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getTeams } from 'libs/api-client/businesses';

export const useTeams = () => {
  return useQuery({
    queryFn: async () => getTeams(),
    queryKey: ['teams'],
  });
};
