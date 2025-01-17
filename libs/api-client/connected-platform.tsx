import { platformData } from '@/data/all-platform';
import apiClient from './index';

export type PlatformDataType = typeof platformData;
export const getAllPlatform = async (): Promise<PlatformDataType> => {
  const { data } = await apiClient.get(`platform`);
  console.log('Data from getAllPlatform API:', data);
  return data;
};

export const metaStartDialog = async () => {
  return await apiClient.get(`auth/meta/start`);
};
