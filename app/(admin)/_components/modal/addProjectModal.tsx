'use client';

import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@nextui-org/modal';
import { Button } from '@nextui-org/button';
import {
  FaImage,
  FaPlus,
  FaTrash,
  FaGithub,
  FaLink,
  FaEdit,
} from 'react-icons/fa';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Input } from '@nextui-org/input';
import { Spinner } from '@nextui-org/spinner';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { Select, SelectItem } from '@nextui-org/select';
import { Selection } from '@nextui-org/table';

import { useCreateProject } from '@/hooks/projects.hook';
import { uploadImageToCloudinary } from '@/utils/uploadImageToCloudinary';
import { useGetAllSkills } from '@/hooks/skills.hook';
import { TSkill } from '@/types';
import 'react-quill/dist/quill.snow.css';

// Dynamic import with SSR disabled for ReactQuill
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => (
    <div className="h-32 w-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg">
      <Spinner color="warning" />
    </div>
  ),
});

// Quill modules configuration
const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link'],
    ['clean'],
  ],
};

export default function AddProjectModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { mutate: addProjectFn, isPending } = useCreateProject();
  const [loadingImages, setLoadingImages] = useState(false);
  const { data } = useGetAllSkills();
  const skills = data?.data;
  const [mountedEditor, setMountedEditor] = useState(false);

  // Initialize form with react-hook-form
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      github: {
        frontend: '',
        backend: '',
      },
      live: '',
      technologies: [] as string[],
      images: [] as string[],
    },
  });

  // State to hold selected technologies (multiple selection)
  const [selectedTechnologies, setSelectedTechnologies] = useState<Selection>(
    new Set()
  );
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  // Ensure Quill editor is only mounted client-side
  useEffect(() => {
    setMountedEditor(true);
  }, []);

  // Handle modal close - reset form
  const handleCloseModal = () => {
    reset({
      title: '',
      description: '',
      github: {
        frontend: '',
        backend: '',
      },
      live: '',
      technologies: [],
      images: [],
    });
    setUploadedImages([]);
    setSelectedTechnologies(new Set());
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      setLoadingImages(true);
      try {
        const uploadedUrls = await Promise.all(
          Array.from(files).map(uploadImageToCloudinary)
        );

        setUploadedImages((prevImages) => [...prevImages, ...uploadedUrls]);
        setValue('images', [...watch('images'), ...uploadedUrls]); // update form state
      } catch (error) {
        console.error('Image upload failed:', error);
      } finally {
        setLoadingImages(false);
      }
    }
  };

  const handleDeleteImage = (index: number) => {
    const newImages = uploadedImages.filter(
      (_, imgIndex) => imgIndex !== index
    );
    setUploadedImages(newImages);
    setValue('images', newImages); // update form state
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (data.images.length === 0) {
      alert('At least one image is required.');
      return;
    }

    if (!data.title.trim()) {
      alert('Project title is required.');
      return;
    }

    data.technologies = Array.from(selectedTechnologies) as string[];
    console.log('Submitting project data:', data);
    addProjectFn(data);
  };

  return (
    <>
      <Button
        className="font-semibold"
        color="warning"
        endContent={<FaPlus />}
        variant="shadow"
        onPress={onOpen}
        size="lg"
        radius="full"
      >
        Add Project
      </Button>

      <Modal
        isOpen={isOpen}
        placement="center"
        size="2xl"
        onOpenChange={(open) => {
          if (!open) handleCloseModal();
          onOpenChange();
        }}
        className="dark:bg-gray-900"
        backdrop="blur"
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 border-b pb-4">
                <div className="flex items-center gap-2">
                  <FaEdit className="text-warning" />
                  <span>Add a New Project</span>
                </div>
              </ModalHeader>

              <ModalBody className="py-6">
                <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                  {/* Project Title */}
                  <div>
                    <Input
                      id="title"
                      label="Project Title"
                      placeholder="Enter your project title..."
                      variant="bordered"
                      radius="lg"
                      className="w-full"
                      classNames={{
                        label: 'text-sm font-medium',
                        input: 'text-base',
                        inputWrapper:
                          'shadow-sm border-2 focus-within:border-warning',
                      }}
                      {...register('title', {
                        required: 'Project title is required',
                      })}
                      isInvalid={!!errors.title}
                      errorMessage={errors.title?.message?.toString()}
                    />
                  </div>

                  {/* Rich Text Editor for Description */}
                  <div className="space-y-2">
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium"
                    >
                      Project Description
                    </label>
                    <div className="rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-700 focus-within:border-warning transition-colors">
                      {mountedEditor && (
                        <ReactQuill
                          id="description"
                          theme="snow"
                          modules={quillModules}
                          value={watch('description')}
                          onChange={(value) => setValue('description', value)}
                          placeholder="Describe your amazing project..."
                          className="bg-white dark:bg-gray-800 min-h-32"
                        />
                      )}
                    </div>
                    {errors.description && (
                      <p className="text-error text-xs text-red-500">
                        {errors.description.message?.toString()}
                      </p>
                    )}
                  </div>

                  {/* GitHub URLs */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="GitHub Frontend URL"
                      placeholder="Enter frontend repository URL"
                      variant="bordered"
                      radius="lg"
                      startContent={<FaGithub className="text-warning" />}
                      classNames={{
                        label: 'text-sm font-medium',
                        input: 'text-base',
                        inputWrapper:
                          'shadow-sm border-2 focus-within:border-warning',
                      }}
                      {...register('github.frontend', {
                        required: 'Frontend GitHub URL is required',
                      })}
                      isInvalid={!!errors.github?.frontend}
                      errorMessage={errors.github?.frontend?.message?.toString()}
                    />

                    <Input
                      label="GitHub Backend URL"
                      placeholder="Enter backend repository URL"
                      variant="bordered"
                      radius="lg"
                      startContent={<FaGithub className="text-warning" />}
                      classNames={{
                        label: 'text-sm font-medium',
                        input: 'text-base',
                        inputWrapper:
                          'shadow-sm border-2 focus-within:border-warning',
                      }}
                      {...register('github.backend', {
                        required: 'Backend GitHub URL is required',
                      })}
                      isInvalid={!!errors.github?.backend}
                      errorMessage={errors.github?.backend?.message?.toString()}
                    />
                  </div>

                  {/* Live Site URL */}
                  <Input
                    label="Live Site URL"
                    placeholder="Enter the live site URL"
                    variant="bordered"
                    radius="lg"
                    startContent={<FaLink className="text-warning" />}
                    classNames={{
                      label: 'text-sm font-medium',
                      input: 'text-base',
                      inputWrapper:
                        'shadow-sm border-2 focus-within:border-warning',
                    }}
                    {...register('live', {
                      required: 'Live site URL is required',
                    })}
                    isInvalid={!!errors.live}
                    errorMessage={errors.live?.message?.toString()}
                  />

                  {/* Skill Categories Selection */}
                  <div className="space-y-2">
                    <Select
                      label="Technologies Used"
                      placeholder="Select technologies used in the project"
                      selectedKeys={selectedTechnologies}
                      selectionMode="multiple"
                      variant="bordered"
                      radius="lg"
                      classNames={{
                        label: 'text-sm font-medium',
                        trigger:
                          'shadow-sm border-2 focus-within:border-warning h-14',
                      }}
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
                        {errors.technologies.message?.toString()}
                      </p>
                    )}
                  </div>

                  {/* Image Upload */}
                  <div className="space-y-2">
                    <label
                      htmlFor="image"
                      className="block text-sm font-medium"
                    >
                      Project Images
                    </label>
                    <label
                      htmlFor="image"
                      className="cursor-pointer flex gap-3 items-center h-16 rounded-xl px-4 border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-warning transition-colors dark:hover:border-warning"
                    >
                      <FaImage className="text-2xl text-warning" />
                      <div className="flex-1">
                        <p className="font-medium">Upload Project Images</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Select multiple images to showcase your project
                        </p>
                      </div>
                      <Input
                        id="image"
                        multiple
                        accept="image/*"
                        className="hidden"
                        type="file"
                        onChange={handleFileUpload}
                      />
                    </label>
                    {errors.images && (
                      <p className="text-error text-xs text-red-500">
                        At least one image is required
                      </p>
                    )}
                  </div>

                  {/* Image Preview */}
                  {loadingImages ? (
                    <div className="flex items-center justify-center h-24 w-full bg-gray-100 dark:bg-gray-800 rounded-lg">
                      <Spinner color="warning" label="Uploading images..." />
                    </div>
                  ) : (
                    uploadedImages.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex flex-wrap gap-3">
                          {uploadedImages.map((img, index) => (
                            <div key={index} className="relative">
                              <div className="relative h-24 w-24 overflow-hidden rounded-lg border-2 border-gray-200 dark:border-gray-700">
                                <Image
                                  alt={`Project image ${index + 1}`}
                                  fill
                                  className="object-cover"
                                  src={img}
                                  sizes="96px"
                                />
                              </div>
                              <button
                                type="button"
                                onClick={() => handleDeleteImage(index)}
                                className="absolute -top-2 -right-2 flex items-center justify-center w-6 h-6 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                aria-label="Delete image"
                              >
                                <FaTrash size={10} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )
                  )}

                  <ModalFooter className="px-0 pb-0 pt-4 border-t">
                    <Button
                      color="default"
                      variant="light"
                      onPress={onClose}
                      radius="full"
                    >
                      Cancel
                    </Button>
                    <Button
                      className="font-medium"
                      color="warning"
                      isLoading={isPending}
                      type="submit"
                      radius="full"
                      size="lg"
                    >
                      {isPending ? 'Creating...' : 'Create Project'}
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
