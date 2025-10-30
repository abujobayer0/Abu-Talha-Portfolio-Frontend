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
export const getAllBlogs = async (query?: Record<string, any>) => {
  const { fetchServer } = await import('@/lib/fetchServer');
  const data = await fetchServer('/blogs', {
    tags: ['blogs'],
    params: query,
    revalidate: 3600, // Revalidate every hour
  });

  return data;
};

export const getSingleBlog = async (blogId: string) => {
  const { fetchServer } = await import('@/lib/fetchServer');
  const data = await fetchServer(`/blogs/${blogId}`, {
    tags: ['blogs', `blog-${blogId}`],
    revalidate: 3600, // Revalidate every hour
  });

  return data;
};

// Update blog
export const editBlog = async (BlogData: TUpdateData) => {
  try {
    const { data } = await axiosInstance.patch(`/blogs/${BlogData?.id}`, BlogData?.data);

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
