'use client';

import React, { useState } from 'react';
import { Input, Textarea } from '@nextui-org/input';
import { Card, CardBody } from '@nextui-org/card';
import { Button } from '@nextui-org/button';
import Image from 'next/image';
import { Chip } from '@nextui-org/chip';
import { Spinner } from '@nextui-org/spinner';

import { useEditAbout } from '@/hooks/about.hook';
import { useEditAdmin } from '@/hooks/auth.hook';
import { uploadImageToCloudinary } from '@/utils/uploadImageToCloudinary';
import { TAbout } from '@/types';

interface TProfileProps {
  about: TAbout[]; // Ensure TAbout[] is typed correctly
}

export default function About({ about }: TProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isImageUploading, setIsImageUploading] = useState(false); // For image upload loading
  const { mutate: editAboutFn, isPending: aboutIsPending } = useEditAbout();
  const { mutate: editAdminFn, isPending: adminIsPending } = useEditAdmin();

  const profileData = {
    ...about[0].me,
    title: about[0].title,
    description: about[0].description,
    country: about[0].country,
    address: about[0].address,
    district: about[0].district,
  };

  const adminData = {
    name: about[0].me.name,
    image: about[0].me.image,
  };

  const [editableData, setEditableData] = useState(profileData);
  const [editableAdminData, setEditableAdminData] = useState(adminData);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setEditableData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAdminInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setEditableAdminData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setIsImageUploading(true);
      const uploadedUrl = await uploadImageToCloudinary(file);

      setEditableAdminData((prevData) => ({ ...prevData, image: uploadedUrl }));
      setIsImageUploading(false);
    }
  };

  const handleSaveClick = async () => {
    try {
      const editAboutData = {
        id: about[0]._id,
        data: {
          title: editableData.title,
          description: editableData.description,
          country: editableData.country,
          address: editableData.address,
          district: editableData.district,
        },
      };

      const editAdminData = {
        name: editableAdminData.name,
        image: editableAdminData.image,
      };

      editAboutFn(editAboutData);
      editAdminFn(editAdminData);

      console.log('Data successfully saved:', {
        about: editableData,
        admin: editableAdminData,
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <div className="w-full p-4">
      <Card>
        <CardBody>
          <div className="flex items-center mb-4">
            {isEditing ? (
              <>
                {' '}
                <label className="cursor-pointer my-4 flex items-center">
                  <Input
                    accept="image/*"
                    className="hidden"
                    type="file"
                    variant="bordered"
                    onChange={handleFileUpload}
                  />
                  {isImageUploading ? (
                    <div className="w-24 h-24 rounded-full border border-default-200 flex items-center justify-center">
                      <Spinner color="warning" />
                    </div>
                  ) : (
                    <Image
                      alt="Uploaded Image"
                      className="rounded-full size-24 object-cover"
                      height={50}
                      src={editableAdminData.image}
                      width={50}
                    />
                  )}
                </label>
              </>
            ) : (
              <>
                <Image
                  alt={editableAdminData.name}
                  className="w-24 h-24 rounded-full border-2 object-cover border-default-300"
                  height={500}
                  src={editableAdminData.image}
                  width={500}
                />
              </>
            )}

            <div className="ml-4">
              <h2 className="text-2xl font-bold">{editableAdminData.name}</h2>
              <p className="text-sm text-default-500">{editableData.role}</p>
            </div>
          </div>

          {isEditing ? (
            <div>
              <Input
                className="mb-2"
                label="Name"
                name="name"
                value={editableAdminData.name}
                variant="bordered"
                onChange={handleAdminInputChange}
              />

              <Input
                className="mb-2"
                label="Title"
                name="title"
                value={editableData.title}
                variant="bordered"
                onChange={handleInputChange}
              />
              <Textarea
                className="mb-2"
                label="Description"
                name="description"
                rows={3}
                value={editableData.description}
                variant="bordered"
                onChange={handleInputChange}
              />
              <Input
                className="mb-2"
                label="Country"
                name="country"
                value={editableData.country}
                variant="bordered"
                onChange={handleInputChange}
              />
              <Input
                className="mb-2"
                label="Address"
                name="address"
                value={editableData.address}
                variant="bordered"
                onChange={handleInputChange}
              />
              <Input
                className="mb-2"
                label="District"
                name="district"
                value={editableData.district}
                variant="bordered"
                onChange={handleInputChange}
              />
              <Button
                className="w-full"
                color="warning"
                disabled={aboutIsPending || adminIsPending}
                isLoading={aboutIsPending || adminIsPending}
                size="sm"
                onClick={handleSaveClick}
              >
                Save
              </Button>
            </div>
          ) : (
            <div>
              <h3 className="text-lg font-semibold">{editableData.title}</h3>
              <p className="mb-2 text-xs">{editableData.description}</p>
              <div className="border-t border-default-200 my-2" />
              <div className="flex flex-col gap-3">
                <Chip>Country: {editableData.country}</Chip>
                <Chip>Address: {editableData.address}</Chip>
                <Chip>District: {editableData.district}</Chip>
              </div>
            </div>
          )}

          <Button
            className="mt-4 w-full text-default-900"
            color="warning"
            size="sm"
            variant="faded"
            onClick={handleEditClick}
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}
