'use server';

import { revalidateTag } from 'next/cache';
import { FieldValues } from 'react-hook-form';

import axiosInstance from '@/lib/axiosInstance';
import { TUpdateData } from '@/types';

// Create project
export const createProject = async (projectData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post('/projects', projectData);

    revalidateTag('projects');

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

// Fetch all project
export const getAllProjects = async (query?: Record<string, any>) => {
  const fetchOptions = {
    cache: 'no-store',
    next: {
      tags: ['projects'],
    },
  };

  const { data } = await axiosInstance.get('/projects', {
    params: query,
    ...fetchOptions,
  });

  return data;
};

// Fetch all project
export const getSingleProject = async (projectId: string) => {
  const { data } = await axiosInstance.get(`/projects/${projectId}`);

  return data;
};

// Update project
export const editProject = async (projectData: TUpdateData) => {
  try {
    const { data } = await axiosInstance.patch(
      `/projects/${projectData?.id}`,
      projectData?.data
    );

    revalidateTag('projects');

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

// Delete project
export const deleteProject = async (id: string) => {
  try {
    const { data } = await axiosInstance.delete(`/projects/${id}`);

    revalidateTag('projects');

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
