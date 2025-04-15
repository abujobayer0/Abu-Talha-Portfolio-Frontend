'use server';

import { revalidateTag } from 'next/cache';
import { FieldValues } from 'react-hook-form';

import axiosInstance from '@/lib/axiosInstance';
import { TUpdateData } from '@/types';

// Create education
export const createEducation = async (educationData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post('/educations', educationData);

    revalidateTag('educations');

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

// Fetch all education
export const getAllEducations = async () => {
  let fetchOptions = {};

  fetchOptions = {
    next: {
      tags: ['educations'],
    },
  };

  const { data } = await axiosInstance.get('/educations', { fetchOptions });

  return data;
};

// Update education
export const editEducation = async (educationData: TUpdateData) => {
  try {
    const { data } = await axiosInstance.patch(
      `/educations/${educationData?.id}`,
      educationData?.data
    );

    revalidateTag('educations');

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

// Delete education
export const deleteEducation = async (id: string) => {
  try {
    const { data } = await axiosInstance.delete(`/educations/${id}`);

    revalidateTag('educations');

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
