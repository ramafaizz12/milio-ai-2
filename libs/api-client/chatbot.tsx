import apiClient from './index';
import { botData } from '@/data/bot-data';

export type AgentDataType = typeof botData;
export const getBot = async (): Promise<AgentDataType> => {
  const { data } = await apiClient.get(`bots`);
  return data;
};

export const deleteBot = async (id: string) => {
  return await apiClient.delete(`bots/${id}`);
};

export const createBot = async (data: {
  name: string;
  description: string;
}) => {
  return await apiClient.post(`bots`, data);
};

export const trainBot = async (id: string, file: string) => {
  return await apiClient.post(`bots/${id}/training/files`, file);
};

export const UpdateBot = async (
  id: string,
  data: {
    name: string;
    description: string;
    tone: string;
    goals_behavior: string;
    human_handover: {
      condition: string;
      keywords: string[];
    };
  }
) => {
  return await apiClient.patch(`bots/${id}`, data);
};
