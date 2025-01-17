import { useQuery } from '@tanstack/react-query';
import { getContacts } from 'libs/api-client/contact';

export const useContacts = () => {
  return useQuery({
    queryFn: async () => getContacts(),
    queryKey: ['contacts'],
  });
};
