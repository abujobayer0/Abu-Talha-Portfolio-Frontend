"use client";

import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { FaImage, FaPlus } from "react-icons/fa";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@nextui-org/input";
import { Spinner } from "@nextui-org/spinner";
import Image from "next/image";
import dynamic from "next/dynamic";

import { useCreateBlog } from "@/hooks/blogs.hook";
import { uploadImageToCloudinary } from "@/utils/uploadImageToCloudinary";
import "react-quill/dist/quill.snow.css";

// Dynamically import the ReactQuill component to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function AddBlogModal() {
  const [isImageUploading, setIsImageUploading] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { mutate: addBlogFn, isPending } = useCreateBlog();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      content: "",
      imageUrl: "",
    },
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setIsImageUploading(true);
      const uploadedUrl = await uploadImageToCloudinary(file);

      setValue("imageUrl", uploadedUrl);
      setIsImageUploading(false);
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!data.imageUrl) {
      console.error("Image is required but not uploaded.");

      return;
    }
    console.log(data);
    addBlogFn(data);
  };

  return (
    <>
      <Button
        className="font-semibold"
        color="warning"
        endContent={<FaPlus />}
        variant="faded"
        onPress={onOpen}
      >
        Add Blog
      </Button>

      <Modal
        isOpen={isOpen}
        placement="center"
        size="lg"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add a New Blog Post
              </ModalHeader>

              <ModalBody>
                {/* Form - Using React Hook Form */}
                <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
                  <div className="space-y-2">
                    <label
                      htmlFor="content"
                      className="block text-sm font-medium"
                    >
                      Content
                    </label>
                    <div className="rounded border border-default-200 text-default-700">
                      <ReactQuill
                        id="content"
                        theme="snow"
                        value={watch("content")}
                        onChange={(value) => setValue("content", value)}
                      />
                    </div>
                  </div>
                  {errors.content && (
                    <p className="text-error text-xs text-red-500">
                      {errors.content.message}
                    </p>
                  )}

                  <label
                    htmlFor="image"
                    className="mt-4 cursor-pointer text-xs text-warning-400 my-5 flex gap-2 items-center h-14 rounded-xl px-3 border border-default-200 hover:border-default-400"
                  >
                    <FaImage className="text-2xl" />
                    <p>Upload Image</p>
                    <Input
                      id="image"
                      accept="image/*"
                      className="hidden"
                      type="file"
                      variant="bordered"
                      onChange={handleFileUpload}
                    />
                  </label>
                  {errors.imageUrl && (
                    <p className="text-error text-xs text-red-500">
                      Image is required
                    </p>
                  )}

                  {/* Show loader or uploaded image preview */}
                  {isImageUploading ? (
                    <div className="p-2">
                      <Spinner color="warning" size="sm" />
                    </div>
                  ) : (
                    watch("imageUrl") && (
                      <Image
                        alt="Blog Image"
                        className="h-48 w-full mt-2 object-cover rounded-md border-dashed border-default-200 p-1"
                        height={500}
                        src={watch("imageUrl")}
                        width={500}
                      />
                    )
                  )}

                  <ModalFooter>
                    <Button
                      className="text-default-900"
                      color="warning"
                      isLoading={isPending}
                      type="submit"
                      onPress={onClose}
                    >
                      {isPending ? "Creating..." : "Create"}
                    </Button>
                  </ModalFooter>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
