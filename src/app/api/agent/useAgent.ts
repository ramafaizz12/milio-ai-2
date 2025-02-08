import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getAgent, addAgent } from 'libs/api-client/human';

export const useAgent = () => {
  return useQuery({
    queryFn: async () => getAgent(),
    queryKey: ['agent'],
  });
};

export function useCreateAgent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addAgent,

    onSuccess: () => {
      // Refresh daftar bot setelah berhasil membuat
      queryClient.invalidateQueries({ queryKey: ['agent'] });
    },
  });
}
