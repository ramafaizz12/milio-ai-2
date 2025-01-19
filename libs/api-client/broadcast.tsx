import apiClient from './index';
import { receipentsData } from '@/data/receipents-data';
import { campaignData } from '@/data/campaign-data';
import { TemplatesData } from '@/data/templates-data';
export type ReceipentsDataType = typeof receipentsData;
export type CampaignDataType = typeof campaignData;
export type TemplatesDataType = typeof TemplatesData;
export const getReceipents = async (): Promise<ReceipentsDataType> => {
  const { data } = await apiClient.get(`broadcast/recipients`);
  return data;
};

export const createReceipents = async (
  name: string,
  platform_id: string,
  contact_ids: number[]
): Promise<ReceipentsDataType[]> => {
  const { data } = await apiClient.post(`broadcast/recipients`, {
    name: name,
    platform_id: platform_id,
    contact_ids: contact_ids,
  });
  return data;
};

export const getCampaign = async (): Promise<CampaignDataType> => {
  const { data } = await apiClient.get(`broadcast/campaigns`);
  return data;
};

export const getTemplate = async (): Promise<TemplatesDataType> => {
  const { data } = await apiClient.get(`broadcast/templates/meta`);
  return data;
};
