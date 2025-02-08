import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getDivision } from 'libs/api-client/businesses';

export const useDivisions = () => {
  return useQuery({
    queryFn: async () => getDivision(),
    queryKey: ['division'],
  });
};
