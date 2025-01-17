import apiClient from './index';
import { agentData } from '@/data/agent-data';

export type AgentDataType = typeof agentData;
export const getAgent = async (): Promise<AgentDataType> => {
  const { data } = await apiClient.get(`agent`);
  return data;
};

export const addAgent = async (agentData: {
  name: string;
  email: string;
  password: string;
  role: string;
}) => {
  const response = await apiClient.post(`agent`, agentData);
  console.log('Response from create subscription API:', response.data);
  return response;
};
