import { useMutation, useQuery } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

import {
  createProject,
  deleteProject,
  getAllProjects,
  editProject,
} from "@/service/projectService/projectService";
import { TUpdateData } from "@/types";

// Create projects
export const useCreateProject = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["add_projects"],
    mutationFn: (projectData) => createProject(projectData),
    onSuccess: () => {
      toast.success("Projects create successfully.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

// Get all projects
export const useGetAllProjects = () => {
  return useQuery({
    queryKey: ["get_projects"],
    queryFn: () => getAllProjects(),
  });
};

// Edit projects
export const useEditProject = () => {
  return useMutation({
    mutationKey: ["edit_projects"],
    mutationFn: (projectData: TUpdateData) => editProject(projectData),
    onSuccess: () => {
      toast.success("Projects update successfully.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

// Delete projects
export const useDeleteProject = () => {
  return useMutation({
    mutationKey: ["delete_projects"],
    mutationFn: (id: string) => deleteProject(id),
    onSuccess: () => {
      toast.success("Projects deleted successfully.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
