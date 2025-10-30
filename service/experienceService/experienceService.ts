'use server';

import { revalidateTag } from 'next/cache';
import { FieldValues } from 'react-hook-form';

import axiosInstance from '@/lib/axiosInstance';
import { TUpdateData } from '@/types';

// Create experience
export const createExperience = async (experienceData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post('/experiences', experienceData);

    revalidateTag('experiences');

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

// Fetch all experiences
export const getAllExperiences = async () => {
  const { fetchServer } = await import('@/lib/fetchServer');
  const data = await fetchServer('/experiences', {
    tags: ['experiences'],
    params: { sort: '-createdAt' },
    revalidate: 3600, // Revalidate every hour
  });

  return data;
};

// Update experience
export const editExperience = async (experienceData: TUpdateData) => {
  try {
    const { data } = await axiosInstance.patch(
      `/experiences/${experienceData?.id}`,
      experienceData?.data
    );

    revalidateTag('experiences');

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

// Delete experience
export const deleteExperience = async (id: string) => {
  try {
    const { data } = await axiosInstance.delete(`/experiences/${id}`);

    revalidateTag('experiences');

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
