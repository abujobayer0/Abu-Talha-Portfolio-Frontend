'use server';

import { revalidateTag } from 'next/cache';
import { FieldValues } from 'react-hook-form';

import { SkillCategory } from '@/constants/skills.constants';
import axiosInstance from '@/lib/axiosInstance';
import { TUpdateData } from '@/types';

// Create skill
export const createSkill = async (skillData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post('/skills', skillData);

    revalidateTag('skills');

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

// Fetch all skills
export const getAllSkills = async () => {
  const { fetchServer } = await import('@/lib/fetchServer');
  const data = await fetchServer('/skills', {
    tags: ['skills'],
    revalidate: 3600, // Revalidate every hour
  });

  return data;
};

// Fetch skills based on the category
export const getSkillsByCategory = async (category?: SkillCategory) => {
  const { fetchServer } = await import('@/lib/fetchServer');
  const data = await fetchServer('/skills', {
    tags: ['skills'],
    params: { category },
    revalidate: 3600, // Revalidate every hour
  });

  return data;
};

// Update skill
export const editSkill = async (skillData: TUpdateData) => {
  try {
    const { data } = await axiosInstance.patch(
      `/skills/${skillData?.id}`,
      skillData?.data
    );

    revalidateTag('skills');

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

// Delete skill
export const deleteSkill = async (id: string) => {
  try {
    const { data } = await axiosInstance.delete(`/skills/${id}`);

    revalidateTag('skills');

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
