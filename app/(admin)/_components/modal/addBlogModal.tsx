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
import { FaImage, FaPlus, FaHeading, FaEdit } from 'react-icons/fa';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Input } from '@nextui-org/input';
import { Spinner } from '@nextui-org/spinner';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

import { useCreateBlog } from '@/hooks/blogs.hook';
import { uploadImageToCloudinary } from '@/utils/uploadImageToCloudinary';
import 'react-quill/dist/quill.snow.css';

// Dynamic import with SSR disabled for ReactQuill
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => (
    <div className="h-64 w-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg">
      <Spinner color="warning" />
    </div>
  ),
});

// Quill modules configuration
const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ color: [] }, { background: [] }],
    ['link', 'image', 'video'],
    ['clean'],
  ],
};

export default function AddBlogModal() {
  const [isImageUploading, setIsImageUploading] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [mountedEditor, setMountedEditor] = useState(false);

  const { mutate: addBlogFn, isPending } = useCreateBlog();

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
      content: '',
      imageUrl: '',
    },
  });

  // Ensure Quill editor is only mounted client-side
  useEffect(() => {
    setMountedEditor(true);
  }, []);

  // Handle modal close - reset form
  const handleCloseModal = () => {
    reset({
      title: '',
      content: '',
      imageUrl: '',
    });
  };

  // Handle image upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setIsImageUploading(true);
      try {
        const uploadedUrl = await uploadImageToCloudinary(file);
        setValue('imageUrl', uploadedUrl);
      } catch (error) {
        console.error('Image upload failed:', error);
      } finally {
        setIsImageUploading(false);
      }
    }
  };

  // Form submission handler
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!data.imageUrl) {
      console.error('Image is required but not uploaded.');
      return;
    }

    if (!data.title.trim()) {
      console.error('Title is required.');
      return;
    }

    console.log('Submitting blog data:', data);
    addBlogFn(data);
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
        New Blog Post
      </Button>

      <Modal
        isOpen={isOpen}
        placement="center"
        size="3xl"
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
                  <span>Create a New Blog Post</span>
                </div>
              </ModalHeader>

              <ModalBody className="py-6">
                <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                  {/* Title Field */}
                  <div>
                    <Input
                      id="title"
                      label="Blog Title"
                      placeholder="Enter a catchy title..."
                      variant="bordered"
                      radius="lg"
                      startContent={<FaHeading className="text-warning" />}
                      className="w-full"
                      classNames={{
                        label: 'text-sm font-medium',
                        input: 'text-base',
                        inputWrapper:
                          'shadow-sm border-2 focus-within:border-warning',
                      }}
                      {...register('title', { required: 'Title is required' })}
                      isInvalid={!!errors.title}
                      errorMessage={errors.title?.message?.toString()}
                    />
                  </div>

                  {/* Rich Text Editor */}
                  <div className="space-y-2">
                    <label
                      htmlFor="content"
                      className="block text-sm font-medium"
                    >
                      Content
                    </label>
                    <div className="rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-700 focus-within:border-warning transition-colors">
                      {mountedEditor && (
                        <ReactQuill
                          id="content"
                          theme="snow"
                          modules={quillModules}
                          value={watch('content')}
                          onChange={(value) => setValue('content', value)}
                          placeholder="Write your amazing blog post here..."
                          className="bg-white dark:bg-gray-800 min-h-64"
                        />
                      )}
                    </div>
                    {errors.content && (
                      <p className="text-error text-xs text-red-500">
                        {errors.content.message?.toString()}
                      </p>
                    )}
                  </div>

                  {/* Image Upload */}
                  <div className="space-y-2">
                    <label
                      htmlFor="image"
                      className="block text-sm font-medium"
                    >
                      Featured Image
                    </label>
                    <label
                      htmlFor="image"
                      className="cursor-pointer flex gap-3 items-center h-16 rounded-xl px-4 border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-warning transition-colors dark:hover:border-warning"
                    >
                      <FaImage className="text-2xl text-warning" />
                      <div className="flex-1">
                        <p className="font-medium">Upload Featured Image</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Recommended size: 1200×630px
                        </p>
                      </div>
                      <Input
                        id="image"
                        accept="image/*"
                        className="hidden"
                        type="file"
                        onChange={handleFileUpload}
                      />
                    </label>
                    {errors.imageUrl && (
                      <p className="text-error text-xs text-red-500">
                        Image is required
                      </p>
                    )}
                  </div>

                  {/* Image Preview */}
                  {isImageUploading ? (
                    <div className="flex items-center justify-center h-48 w-full bg-gray-100 dark:bg-gray-800 rounded-lg">
                      <Spinner color="warning" label="Uploading image..." />
                    </div>
                  ) : (
                    watch('imageUrl') && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="relative h-48 w-full overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
                          <Image
                            alt="Blog Featured Image"
                            className="object-cover"
                            fill
                            src={watch('imageUrl')}
                            sizes="(max-width: 768px) 100vw, 600px"
                          />
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
                      {isPending ? 'Publishing...' : 'Publish Post'}
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
