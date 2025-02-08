import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getBusinesses, createBusiness } from 'libs/api-client/businesses';

export const useBusinesses = () => {
  return useQuery({
    queryFn: async () => getBusinesses(),
    queryKey: ['bisnis'],
  });
};

export function useCreateBusinesses() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBusiness,

    onSuccess: () => {
      // Refresh daftar bot setelah berhasil membuat
      queryClient.invalidateQueries({ queryKey: ['bisnis'] });
    },
  });
}
