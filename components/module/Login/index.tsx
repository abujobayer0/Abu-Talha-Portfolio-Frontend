"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { FaLock } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";

import { useUserLoginMutation } from "@/hooks/auth.hook";

// Define types for the form inputs
interface LoginFormInputs {
  email: string;
  password: string;
}

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const {
    mutate: handleUserLogin,
    isPending,
    isSuccess,
    isError,
  } = useUserLoginMutation();

  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormInputs>();

  // Handle form submission
  const onSubmit = (data: LoginFormInputs) => {
    handleUserLogin(data);
  };

  // Handle success or error states after login mutation
  useEffect(() => {
    if (isSuccess) {
      reset();
      toast.success("Login successful!");
      router.push(redirect ? redirect : "/");
    }

    if (isError) {
      toast.error("Login failed. Please try again.");
    }
  }, [isSuccess, isError, reset, router]);

  return (
    <form
      className="space-y-3 h-screen flex justify-center flex-col w-full md:w-1/2 xl:w-1/3 mx-auto"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col space-y-5 border border-default-200 p-5 rounded-xl">
        <div className="flex flex-col items-start gap-1 h-16">
          {/* Email input */}
          <Input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              },
            })}
            endContent={
              <IoMail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
            label="Email"
            placeholder="Enter your email"
            variant="bordered"
          />
          {errors.email && (
            <p className="text-red-500 text-xs ml-2">{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col items-start gap-1 h-16">
          {/* Password input */}
          <Input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            endContent={
              <FaLock className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
            label="Password"
            placeholder="Enter your password"
            type="password"
            variant="bordered"
          />
          {errors.password && (
            <p className="text-red-500 text-xs ml-2">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Login Button */}
        <Button
          className="mt-5 text-white"
          color="warning"
          disabled={isPending}
          isLoading={isPending}
          type="submit"
          variant="shadow"
        >
          {isPending ? "Logging in..." : "Login"}
        </Button>
      </div>
    </form>
  );
}
