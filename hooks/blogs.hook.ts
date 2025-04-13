import { useMutation, useQuery } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  editBlog,
} from "@/service/blogService/blogService";
import { TUpdateData } from "@/types";

// Create blogs
export const useCreateBlog = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["add_blogs"],
    mutationFn: (blogData) => createBlog(blogData),
    onSuccess: () => {
      toast.success("Blog created successfully.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

// Get all blogs
export const useGetAllBlogs = () => {
  return useQuery({
    queryKey: ["get_blogs"],
    queryFn: () => getAllBlogs(),
  });
};

// Edit blogs
export const useEditBlog = () => {
  return useMutation({
    mutationKey: ["edit_blogs"],
    mutationFn: (blogData: TUpdateData) => editBlog(blogData),
    onSuccess: () => {
      toast.success("Blog updated successfully.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

// Delete blogs
export const useDeleteBlog = () => {
  return useMutation({
    mutationKey: ["delete_blogs"],
    mutationFn: (id: string) => deleteBlog(id),
    onSuccess: () => {
      toast.success("Blog deleted successfully.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
