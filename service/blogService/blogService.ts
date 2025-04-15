'use server';

import { revalidateTag } from 'next/cache';
import { FieldValues } from 'react-hook-form';

import axiosInstance from '@/lib/axiosInstance';
import { TUpdateData } from '@/types';

// Create blog
export const createBlog = async (BlogData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post('/blogs', BlogData);

    revalidateTag('blogs');

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

// Fetch all blog
export const getAllBlogs = async () => {
  let fetchOptions = {};

  fetchOptions = {
    next: {
      tags: ['blogs'],
    },
  };

  const { data } = await axiosInstance.get('/blogs', { fetchOptions });

  return data;
};

export const getSingleBlog = async (blogId: string) => {
  const { data } = await axiosInstance.get(`/blogs/${blogId}`);

  return data;
};

// Update blog
export const editBlog = async (BlogData: TUpdateData) => {
  try {
    const { data } = await axiosInstance.patch(
      `/blogs/${BlogData?.id}`,
      BlogData?.data
    );

    revalidateTag('blogs');

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

// Delete blog
export const deleteBlog = async (id: string) => {
  try {
    const { data } = await axiosInstance.delete(`/blogs/${id}`);

    revalidateTag('blogs');

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
