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
import { FaImage, FaPencilAlt } from "react-icons/fa";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@nextui-org/input";
import { Spinner } from "@nextui-org/spinner";
import Image from "next/image";
import dynamic from "next/dynamic";

import { uploadImageToCloudinary } from "@/utils/uploadImageToCloudinary";
import { useEditBlog } from "@/hooks/blogs.hook";
import { TBlog } from "@/types";

import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function EditBlogModal({ blog }: { blog: TBlog }) {
  const [isImageUploading, setIsImageUploading] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { mutate: editBlogFn, isPending } = useEditBlog();

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: blog,
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
      alert("Image is required but not uploaded.");
      return;
    }

    const blogData = {
      id: blog?._id,
      data: data,
    };

    editBlogFn(blogData);
  };

  return (
    <>
      <Button
        isIconOnly
        className="font-semibold"
        radius="full"
        size="sm"
        startContent={<FaPencilAlt />}
        onPress={onOpen}
      />

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
                Edit the blog
              </ModalHeader>

              <ModalBody>
                <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
                  <ReactQuill
                    value={watch("content")}
                    onChange={(value) => setValue("content", value)}
                  />
                  {errors.content && (
                    <p className="text-error text-xs text-red-500">
                      {errors.content.message}
                    </p>
                  )}

                  <div className="mt-4 cursor-pointer text-xs text-warning-400 my-5 flex gap-2 items-center h-14 rounded-xl px-3 border border-default-200 hover:border-default-400">
                    <FaImage className="text-2xl" />
                    <p>Upload Image</p>
                    <Input
                      accept="image/*"
                      aria-label="Image upload"
                      className="hidden"
                      type="file"
                      variant="bordered"
                      onChange={handleFileUpload}
                    />
                  </div>
                  {errors.imageUrl && (
                    <p className="text-error text-xs text-red-500">
                      Image is required
                    </p>
                  )}

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
                      {isPending ? "Updating..." : "Update"}
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
