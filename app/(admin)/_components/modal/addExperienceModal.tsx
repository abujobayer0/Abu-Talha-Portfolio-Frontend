import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@nextui-org/modal';
import { Button } from '@nextui-org/button';
import { FaPlus, FaImage, FaTrash } from 'react-icons/fa';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Input } from '@nextui-org/input';
import { Select, SelectItem } from '@nextui-org/select';
import { Selection } from '@nextui-org/table';
import { Spinner } from '@nextui-org/spinner';
import Image from 'next/image';

import { useCreateExperience } from '@/hooks/experience.hook'; // Assuming you have a hook for creating experiences
import { useGetAllSkills } from '@/hooks/skills.hook';
import { TSkill } from '@/types';
import { uploadImageToCloudinary } from '@/utils/uploadImageToCloudinary';

export default function AddExperienceModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { mutate: addExperienceFn, isPending } = useCreateExperience(); // Hook to handle experience creation
  const { data } = useGetAllSkills(); // Fetching technologies from the API
  const technologies = data?.data;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      description: '',
      logo: '',
      technologies: [] as string[], // Array to store selected technologies
    },
  });

  // State to hold selected technologies (multiple selection)
  const [selectedTechnologies, setSelectedTechnologies] = useState<Selection>(new Set());

  // State for company logo upload
  const [loadingLogo, setLoadingLogo] = useState(false);
  const [uploadedLogo, setUploadedLogo] = useState<string>('');

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setLoadingLogo(true);
    try {
      const [file] = Array.from(files);
      const url = await uploadImageToCloudinary(file);
      setUploadedLogo(url);
      setValue('logo', url, { shouldValidate: true });
    } catch (error) {
      console.error('Logo upload failed:', error);
    } finally {
      setLoadingLogo(false);
    }
  };

  const handleDeleteLogo = () => {
    setUploadedLogo('');
    setValue('logo', '', { shouldValidate: true });
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    data.technologies = Array.from(selectedTechnologies) as string[];
    console.log(data);
    addExperienceFn(data);
  };

  return (
    <>
      <Button className='font-semibold' color='warning' endContent={<FaPlus />} variant='faded' onPress={onOpen}>
        Add Experience
      </Button>

      <Modal isOpen={isOpen} placement='center' size='lg' onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>Add a New Experience</ModalHeader>

              <ModalBody>
                <form className='space-y-3' onSubmit={handleSubmit(onSubmit)}>
                  <Input
                    label='Job Title'
                    placeholder='Enter job title'
                    variant='bordered'
                    {...register('title', {
                      required: 'Job title is required',
                    })}
                  />
                  {errors.title && <p className='text-error text-xs text-red-500'>{errors.title?.message}</p>}

                  <Input
                    label='Company'
                    placeholder='Enter company name'
                    variant='bordered'
                    {...register('company', {
                      required: 'Company name is required',
                    })}
                  />
                  {errors.company && <p className='text-error text-xs text-red-500'>{errors.company?.message}</p>}

                  {/* Hidden input to validate logo presence */}
                  <input type='hidden' {...register('logo', { required: 'Logo is required' })} />

                  {/* Company Logo Upload */}
                  <div className='space-y-2'>
                    <label htmlFor='logo' className='block text-sm font-medium'>
                      Company Logo
                    </label>
                    <label
                      htmlFor='logo'
                      className='cursor-pointer flex gap-3 items-center h-16 rounded-xl px-4 border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-warning transition-colors dark:hover:border-warning'
                    >
                      <FaImage className='text-2xl text-warning' />
                      <div className='flex-1'>
                        <p className='font-medium'>Upload Company Logo</p>
                        <p className='text-xs text-gray-500 dark:text-gray-400'>PNG, JPG</p>
                      </div>
                      <Input id='logo' accept='image/*' className='hidden' type='file' onChange={handleLogoUpload} />
                    </label>
                    {errors.logo && <p className='text-error text-xs text-red-500'>{String(errors.logo.message)}</p>}

                    {/* Logo Preview */}
                    {loadingLogo ? (
                      <div className='flex items-center justify-center h-24 w-24 bg-gray-100 dark:bg-gray-800 rounded-lg'>
                        <Spinner color='warning' label='Uploading...' />
                      </div>
                    ) : (
                      uploadedLogo && (
                        <div className='relative w-24 h-24'>
                          <div className='relative h-24 w-24 overflow-hidden rounded-lg border-2 border-gray-200 dark:border-gray-700'>
                            <Image alt='Company logo' fill className='object-cover' src={uploadedLogo} sizes='96px' />
                          </div>
                          <button
                            type='button'
                            onClick={handleDeleteLogo}
                            className='absolute -top-2 -right-2 flex items-center justify-center w-6 h-6 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors'
                            aria-label='Delete logo'
                          >
                            <FaTrash size={10} />
                          </button>
                        </div>
                      )
                    )}
                  </div>

                  <Input
                    label='Location'
                    placeholder='Enter location'
                    variant='bordered'
                    {...register('location', {
                      required: 'Location is required',
                    })}
                  />
                  {errors.location && <p className='text-error text-xs text-red-500'>{errors.location?.message}</p>}

                  <Input
                    label='Start Date'
                    type='date'
                    variant='bordered'
                    {...register('startDate', {
                      required: 'Start date is required',
                    })}
                  />
                  {errors.startDate && <p className='text-error text-xs text-red-500'>{errors.startDate?.message}</p>}

                  <Input label='End Date' type='date' variant='bordered' {...register('endDate')} />

                  <Input
                    label='Description'
                    placeholder='Enter job description'
                    variant='bordered'
                    {...register('description', {
                      required: 'Job description is required',
                    })}
                  />
                  {errors.description && <p className='text-error text-xs text-red-500'>{errors.description?.message}</p>}

                  {/* Multiple Select for Technologies */}
                  <Select
                    multiple
                    label='Technologies'
                    placeholder='Select technologies'
                    selectedKeys={selectedTechnologies}
                    selectionMode='multiple'
                    variant='bordered'
                    onSelectionChange={setSelectedTechnologies}
                  >
                    {technologies?.map((technology: TSkill) => (
                      <SelectItem key={technology._id} value={technology._id}>
                        {technology.name}
                      </SelectItem>
                    ))}
                  </Select>
                  {errors.technologies && <p className='text-error text-xs text-red-500'>{errors.technologies.message}</p>}

                  <ModalFooter>
                    <Button className='text-default-900' color='warning' isLoading={isPending} type='submit' onPress={onClose}>
                      {isPending ? 'Creating...' : 'Create'}
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
