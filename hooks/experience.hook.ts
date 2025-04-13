import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

import { TUpdateData } from "@/types";
import {
  createExperience,
  deleteExperience,
  editExperience,
} from "@/service/experienceService/experienceService";

// Create experiences
export const useCreateExperience = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["add_experience"],
    mutationFn: (experienceData) => createExperience(experienceData),
    onSuccess: () => {
      toast.success("Experience created successfully.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

// Edit experiences
export const useEditExperience = () => {
  return useMutation({
    mutationKey: ["edit_experience"],
    mutationFn: (experienceData: TUpdateData) => editExperience(experienceData),
    onSuccess: () => {
      toast.success("Experience updated successfully.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

// Delete experiences
export const useDeleteExperience = () => {
  return useMutation({
    mutationKey: ["delete_experience"],
    mutationFn: (id: string) => deleteExperience(id),
    onSuccess: () => {
      toast.success("Experience deleted successfully.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
