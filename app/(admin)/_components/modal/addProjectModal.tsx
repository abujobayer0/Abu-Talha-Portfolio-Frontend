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
import { FaImage, FaPlus, FaTrash } from "react-icons/fa";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@nextui-org/input";
import Image from "next/image";
import { Spinner } from "@nextui-org/spinner";
import { Select, SelectItem } from "@nextui-org/select";
import { Selection } from "@nextui-org/table";

import { useCreateProject } from "@/hooks/projects.hook";
import { uploadImageToCloudinary } from "@/utils/uploadImageToCloudinary";
import { useGetAllSkills } from "@/hooks/skills.hook";
import { TSkill } from "@/types";

export default function AddProjectModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { mutate: addProjectFn, isPending } = useCreateProject();
  const [loadingImages, setLoadingImages] = useState(false);
  const { data } = useGetAllSkills();
  const skills = data?.data;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      github: {
        frontend: "",
        backend: "",
      },
      live: "",
      technologies: [] as string[],
      images: [] as string[],
    },
  });

  // State to hold selected technologies (multiple selection)
  const [selectedTechnologies, setSelectedTechnologies] = useState<Selection>(
    new Set(),
  );
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      setLoadingImages(true);
      const uploadedUrls = await Promise.all(
        Array.from(files).map(uploadImageToCloudinary),
      );

      setUploadedImages((prevImages) => [...prevImages, ...uploadedUrls]);
      setValue("images", [...watch("images"), ...uploadedUrls]); // update form state
      setLoadingImages(false);
    }
  };

  const handleDeleteImage = (index: number) => {
    const newImages = uploadedImages.filter(
      (_, imgIndex) => imgIndex !== index,
    );
    setUploadedImages(newImages);
    setValue("images", newImages); // update form state
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (data.images.length === 0) {
      alert("At least one image is required.");
      return;
    }

    data.technologies = Array.from(selectedTechnologies) as string[];
    addProjectFn(data);
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
        Add Project
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
                Add a New Project
              </ModalHeader>
              <ModalBody>
                <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
                  <Input
                    label="Project Title"
                    placeholder="Enter project title"
                    variant="bordered"
                    {...register("title", {
                      required: "Project title is required",
                    })}
                  />
                  {errors.title && (
                    <p className="text-error text-xs text-red-500">
                      {errors.title.message}
                    </p>
                  )}

                  <Input
                    label="Description"
                    placeholder="Enter project description"
                    variant="bordered"
                    {...register("description", {
                      required: "Project description is required",
                    })}
                  />
                  {errors.description && (
                    <p className="text-error text-xs text-red-500">
                      {errors.description.message}
                    </p>
                  )}

                  <Input
                    label="GitHub (Frontend)"
                    placeholder="Enter frontend GitHub URL"
                    variant="bordered"
                    {...register("github.frontend", {
                      required: "Frontend GitHub URL is required",
                    })}
                  />
                  {errors.github?.frontend && (
                    <p className="text-error text-xs text-red-500">
                      {errors.github.frontend.message}
                    </p>
                  )}

                  <Input
                    label="GitHub (Backend)"
                    placeholder="Enter backend GitHub URL"
                    variant="bordered"
                    {...register("github.backend", {
                      required: "Backend GitHub URL is required",
                    })}
                  />
                  {errors.github?.backend && (
                    <p className="text-error text-xs text-red-500">
                      {errors.github.backend.message}
                    </p>
                  )}

                  <Input
                    label="Live Site URL"
                    placeholder="Enter live site URL"
                    variant="bordered"
                    {...register("live", {
                      required: "Live site URL is required",
                    })}
                  />
                  {errors.live && (
                    <p className="text-error text-xs text-red-500">
                      {errors.live.message}
                    </p>
                  )}

                  {/* Multiple Select for Skill Categories */}
                  <Select
                    multiple
                    label="Skill Category"
                    placeholder="Select skill category"
                    selectedKeys={selectedTechnologies}
                    selectionMode="multiple"
                    variant="bordered"
                    onSelectionChange={setSelectedTechnologies}
                  >
                    {skills?.map((technology: TSkill) => (
                      <SelectItem key={technology._id} value={technology._id}>
                        {technology.name}
                      </SelectItem>
                    ))}
                  </Select>
                  {errors.technologies && (
                    <p className="text-error text-xs text-red-500">
                      {errors.technologies.message}
                    </p>
                  )}

                  {/* Image Upload */}
                  <label
                    htmlFor="file-upload"
                    className="mt-4 cursor-pointer text-xs text-warning-400 my-5 flex gap-2 items-center h-14 rounded-xl px-3 border border-default-200 hover:border-default-400"
                  >
                    <FaImage className="text-2xl" />
                    <p>Upload Images</p>
                    <Input
                      id="file-upload"
                      multiple
                      accept="image/*"
                      className="hidden"
                      type="file"
                      variant="bordered"
                      onChange={handleFileUpload}
                    />
                  </label>
                  {errors.images && (
                    <p className="text-error text-xs text-red-500">
                      At least one image is required
                    </p>
                  )}

                  {/* Display Uploaded Images */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {loadingImages ? (
                      <Spinner color="warning" size="sm" />
                    ) : (
                      uploadedImages.map((img, index) => (
                        <div key={index} className="relative">
                          <Image
                            alt={`Uploaded image ${index + 1}`}
                            className="h-14 w-14 mt-2 object-cover rounded-md border border-dashed border-default-200 p-1"
                            height={100}
                            src={img}
                            width={100}
                          />
                          <button
                            type="button"
                            onClick={() => handleDeleteImage(index)}
                            className="absolute -top-2 -right-2 size-4 bg-red-600 text-white rounded-full p-1"
                          >
                            X
                          </button>
                        </div>
                      ))
                    )}
                  </div>

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
