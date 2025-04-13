import { useMutation, useQuery } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

import { TAuthor } from "@/types";
import {
  editAdmin,
  getAdmin,
  loginUser,
} from "@/service/authService/authService";

export const useUserLoginMutation = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_REGISTER"],
    mutationFn: async (userData) => await loginUser(userData),
    onSuccess: () => {
      toast.success("Login successful", { duration: 2000 });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

// Get all blogs
export const useGetAdmin = () => {
  return useQuery({
    queryKey: ["get_admin"],
    queryFn: () => getAdmin(),
  });
};

// Edit blogs
export const useEditAdmin = () => {
  return useMutation({
    mutationKey: ["edit_admin"],
    mutationFn: (blogData: Partial<TAuthor>) => editAdmin(blogData),
    onSuccess: () => {
      toast.success("Admin updated successfully.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
