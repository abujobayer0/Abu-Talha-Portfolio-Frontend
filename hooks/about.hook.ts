import { useMutation, useQuery } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

import {
  createAbout,
  deleteAbout,
  getAllAbout,
  editAbout,
} from "@/service/aboutService/aboutService"; // Update the import path for the About service
import { TUpdateData } from "@/types";

// Create About
export const useCreateAbout = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["about"],
    mutationFn: (aboutData) => createAbout(aboutData), // Use createAbout function
    onSuccess: () => {
      toast.success("About created successfully.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

// Get all About
export const useGetAllAbout = () => {
  return useQuery({
    queryKey: ["about"],
    queryFn: () => getAllAbout(), // Use getAllAbout function
  });
};

// Edit About
export const useEditAbout = () => {
  return useMutation({
    mutationKey: ["about"],
    mutationFn: (aboutData: TUpdateData) => editAbout(aboutData), // Use editAbout function
    onSuccess: () => {
      toast.success("About updated successfully.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

// Delete About
export const useDeleteAbout = () => {
  return useMutation({
    mutationKey: ["about"],
    mutationFn: (id: string) => deleteAbout(id), // Use deleteAbout function
    onSuccess: () => {
      toast.success("About deleted successfully.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
