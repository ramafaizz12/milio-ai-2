import { useQuery } from '@tanstack/react-query';
import { getChats } from 'libs/api-client/chat-inbox';

export const useChats = () => {
  return useQuery({
    queryFn: async () => getChats(),
    queryKey: ['chats'],
  });
};
