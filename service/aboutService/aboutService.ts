"use server";

import { revalidateTag } from "next/cache";
import { FieldValues } from "react-hook-form";

import axiosInstance from "@/lib/axiosInstance";
import { TUpdateData } from "@/types";

// Create About
export const createAbout = async (aboutData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/about", aboutData);

    revalidateTag("about");

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

// Fetch all About
export const getAllAbout = async () => {
  const fetchOptions = {
    cache: "no-store",
    next: {
      tags: ["about"],
    },
  };

  const { data } = await axiosInstance.get("/about", { fetchOptions });

  return data;
};

// Update About
export const editAbout = async (aboutData: TUpdateData) => {
  try {
    const { data } = await axiosInstance.patch(
      `/about/${aboutData?.id}`,
      aboutData?.data,
    );

    revalidateTag("about");

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

// Delete About
export const deleteAbout = async (id: string) => {
  try {
    const { data } = await axiosInstance.delete(`/about/${id}`);

    revalidateTag("about");

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
