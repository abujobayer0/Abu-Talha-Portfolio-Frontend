import { useMutation, useQuery } from '@tanstack/react-query';
import { FieldValues } from 'react-hook-form';
import { toast } from 'sonner';

import { TUpdateData } from '@/types';
import {
  createLink,
  deleteLink,
  editLink,
  getLink as getLink,
} from '@/service/linksService/linksService';

// Create link
export const useCreateLink = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ['add_links'],
    mutationFn: (linkData) => createLink(linkData),
    onSuccess: () => {
      toast.success('Link created successfully.');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

// Edit link
export const useEditLink = () => {
  return useMutation({
    mutationKey: ['edit_links'],
    mutationFn: (linkData: TUpdateData) => editLink(linkData),
    onSuccess: () => {
      toast.success('Link updated successfully.');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

// Delete link
export const useDeleteLink = () => {
  return useMutation({
    mutationKey: ['delete_links'],
    mutationFn: (id: string) => deleteLink(id),
    onSuccess: () => {
      toast.success('Link deleted successfully.');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

// Get all links
export const useGetAllLinks = () => {
  return useQuery({
    queryKey: ['get_links'],
    queryFn: () => getLink(),
  });
};

// Get links based on category
export const useGetLink = (id: string) => {
  return useQuery({
    queryKey: ['get_links_by_category', id || 'Social'],
    queryFn: () => getLink(id),
    enabled: true,
  });
};
