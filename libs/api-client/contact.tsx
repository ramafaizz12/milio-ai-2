import { getRandomArrayElement } from '@core/utils/get-random-array-element';
import apiClient from './index';
import { contactData } from '@/data/contact-data';
import { avatarIds } from '@core/utils/get-avatar';

export type ContactDataType = (typeof contactData.data)[number];
export const getContacts = async (): Promise<ContactDataType[]> => {
  const { data } = await apiClient.get(`contacts`);
  console.log('Data from getContacts API:', data.data);
  const modifiedData = await data.data.map((contact: ContactDataType) => ({
    ...contact,
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
  }));
  return modifiedData;
};
