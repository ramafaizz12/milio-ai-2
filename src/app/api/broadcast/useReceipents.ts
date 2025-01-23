import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { getReceipents, createReceipents } from 'libs/api-client/broadcast';

export const useReceipents = () => {
  return useQuery({
    queryFn: async () => getReceipents(),
    queryKey: ['receipents'],
  });
};
// export function useCreateUser() {
//   return useMutation(createReceipents);
// }
