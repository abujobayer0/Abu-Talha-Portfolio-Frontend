'use server';

import { revalidateTag } from 'next/cache';
import { FieldValues } from 'react-hook-form';

import axiosInstance from '@/lib/axiosInstance';
import { TUpdateData } from '@/types';

// Create link
export const createLink = async (linkData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post('/links', linkData);

    revalidateTag('links');

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

// Fetch all links
export const getAllLinks = async () => {
  const fetchOptions = {
    cache: 'no-store',
    next: {
      tags: ['links'],
    },
  };
  const { data } = await axiosInstance.get('/links', { fetchOptions });

  return data;
};

// Fetch links by category
export const getLink = async (id?: string) => {
  const fetchOptions = {
    cache: 'no-store',
    next: {
      tags: ['links'],
    },
  };
  const { data } = await axiosInstance.get(`/links/${id}`, {
    fetchOptions,
  });

  return data;
};

// Update link
export const editLink = async (linkData: TUpdateData) => {
  try {
    const { data } = await axiosInstance.patch(
      `/links/${linkData?.id}`,
      linkData?.data
    );

    revalidateTag('links');

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

// Delete link
export const deleteLink = async (id: string) => {
  try {
    const { data } = await axiosInstance.delete(`/links/${id}`);

    revalidateTag('links');

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
