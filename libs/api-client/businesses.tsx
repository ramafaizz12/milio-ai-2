import { AxiosResponse } from 'axios';
import apiClient from './index';
import { allBusinesses } from '@/data/all-businesses';
import { allTeams } from '@/data/all-teams';
import { allDivision } from '@/data/all-division';

export type BusinessType = typeof allBusinesses;
export const getBusinesses = async (): Promise<BusinessType> => {
  const { data } = await apiClient.get(`businesses`);
  return data;
};

export type DivisionsType = typeof allDivision;
export const getDivision = async (): Promise<DivisionsType> => {
  const { data } = await apiClient.get(`businesses/divisions`);
  return data;
};

export async function createBusiness(data: {
  name: string;
}): Promise<AxiosResponse<any>> {
  return await apiClient.post('/businesses', data);
}

export type TeamsType = typeof allTeams;
export const getTeams = async (): Promise<TeamsType> => {
  const { data } = await apiClient.get(`businesses/divisions/teams`);
  return data;
};
