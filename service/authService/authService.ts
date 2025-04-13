"use server";

import { jwtDecode } from "jwt-decode";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

import { TAuthor } from "@/types";
import axiosInstance from "@/lib/axiosInstance";

export const loginUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/users/login", userData);

    if (data.success) {
      cookies().set("accessToken", data?.data?.accessToken);
    }

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

// Fetch admin
export const getAdmin = async () => {
  let fetchOptions = {};

  fetchOptions = {
    cache: "no-store",
    next: {
      tags: ["users"],
    },
  };

  const { data } = await axiosInstance.get("/users", { fetchOptions });

  return data;
};

// Update admin
export const editAdmin = async (adminData: Partial<TAuthor>) => {
  try {
    const { data } = await axiosInstance.patch(`/users`, adminData);

    revalidateTag("users");

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const logout = () => {
  cookies().delete("accessToken");
  cookies().delete("refreshToken");
};

export const getCurrentUser = async () => {
  const accessToken = cookies().get("accessToken")?.value;

  let decodedToken = null;

  if (accessToken) {
    decodedToken = await jwtDecode(accessToken);

    return {
      _id: decodedToken.id,
      email: decodedToken.email,
      role: decodedToken.role,
    };
  }

  return decodedToken;
};
