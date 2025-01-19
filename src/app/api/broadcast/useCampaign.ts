import { useQuery } from '@tanstack/react-query';
import { getCampaign } from 'libs/api-client/broadcast';

export const useCampaign = () => {
  return useQuery({
    queryFn: async () => getCampaign(),
    queryKey: ['campaign'],
  });
};
