import apiClient from './index';
import { botData } from '@/data/bot-data';

export type AgentDataType = typeof botData;
export const getBot = async (): Promise<AgentDataType> => {
  const { data } = await apiClient.get(`bots`);
  return data;
};
