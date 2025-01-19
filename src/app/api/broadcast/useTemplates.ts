import { useQuery } from '@tanstack/react-query';
import { getTemplate } from 'libs/api-client/broadcast';

export const useTemplates = () => {
  return useQuery({
    queryFn: async () => getTemplate(),
    queryKey: ['templates'],
  });
};
