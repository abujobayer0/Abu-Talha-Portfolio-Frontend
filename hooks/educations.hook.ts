import { useMutation, useQuery } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

import {
  createEducation,
  deleteEducation,
  getAllEducations,
  editEducation,
} from "@/service/educationService/educationService";
import { TUpdateData } from "@/types";

// Create Educations
export const useCreateEducation = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["educations"],
    mutationFn: (educationData) => createEducation(educationData),
    onSuccess: () => {
      toast.success("Educations create successfully.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

// Get all Educations
export const useGetAllEducations = () => {
  return useQuery({
    queryKey: ["educations"],
    queryFn: () => getAllEducations(),
  });
};

// Edit Educations
export const useEditEducation = () => {
  return useMutation({
    mutationKey: ["educations"],
    mutationFn: (educationData: TUpdateData) => editEducation(educationData),
    onSuccess: () => {
      toast.success("Educations update successfully.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

// Delete Educations
export const useDeleteEducation = () => {
  return useMutation({
    mutationKey: ["educations"],
    mutationFn: (id: string) => deleteEducation(id),
    onSuccess: () => {
      toast.success("Educations deleted successfully.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
