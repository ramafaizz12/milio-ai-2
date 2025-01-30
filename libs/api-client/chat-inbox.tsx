import { allChatData } from '@/data/all-chats';
import apiClient from './index';

export type ChatDataType = typeof allChatData;
export const getChats = async (): Promise<ChatDataType> => {
  const { data } = await apiClient.get(`chat`);
  return data;
};
