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
  let fetchOptions = {};

  fetchOptions = {
    cache: 'no-store',
    next: {
      tags: ['skills'],
    },
  };

  const { data } = await axiosInstance.get('/skills', { fetchOptions });

  return data;
};

// Fetch skills based on the category
export const getSkillsByCategory = async (category?: SkillCategory) => {
  let fetchOptions = {};

  fetchOptions = {
    cache: 'no-store',
    next: {
      tags: ['skills'],
    },
  };

  const { data } = await axiosInstance.get('/skills', {
    params: { category },
    fetchOptions,
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
