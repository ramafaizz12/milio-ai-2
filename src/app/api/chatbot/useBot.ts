import { useQuery } from '@tanstack/react-query';
import { getBot } from 'libs/api-client/chatbot';

export const useBot = () => {
  return useQuery({
    queryFn: async () => getBot(),
    queryKey: ['bots'],
  });
};
