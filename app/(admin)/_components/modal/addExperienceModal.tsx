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
import { FaPlus } from "react-icons/fa";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { Selection } from "@nextui-org/table";

import { useCreateExperience } from "@/hooks/experience.hook"; // Assuming you have a hook for creating experiences
import { useGetAllSkills } from "@/hooks/skills.hook";
import { TSkill } from "@/types";

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
      title: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
      technologies: [] as string[], // Array to store selected technologies
    },
  });

  // State to hold selected technologies (multiple selection)
  const [selectedTechnologies, setSelectedTechnologies] = useState<Selection>(
    new Set(),
  );

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    data.technologies = Array.from(selectedTechnologies) as string[];
    console.log(data);
    addExperienceFn(data);
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
        Add Experience
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
                Add a New Experience
              </ModalHeader>

              <ModalBody>
                <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
                  <Input
                    label="Job Title"
                    placeholder="Enter job title"
                    variant="bordered"
                    {...register("title", {
                      required: "Job title is required",
                    })}
                  />
                  {errors.title && (
                    <p className="text-error text-xs text-red-500">
                      {errors.title?.message}
                    </p>
                  )}

                  <Input
                    label="Company"
                    placeholder="Enter company name"
                    variant="bordered"
                    {...register("company", {
                      required: "Company name is required",
                    })}
                  />
                  {errors.company && (
                    <p className="text-error text-xs text-red-500">
                      {errors.company?.message}
                    </p>
                  )}

                  <Input
                    label="Location"
                    placeholder="Enter location"
                    variant="bordered"
                    {...register("location", {
                      required: "Location is required",
                    })}
                  />
                  {errors.location && (
                    <p className="text-error text-xs text-red-500">
                      {errors.location?.message}
                    </p>
                  )}

                  <Input
                    label="Start Date"
                    type="date"
                    variant="bordered"
                    {...register("startDate", {
                      required: "Start date is required",
                    })}
                  />
                  {errors.startDate && (
                    <p className="text-error text-xs text-red-500">
                      {errors.startDate?.message}
                    </p>
                  )}

                  <Input
                    label="End Date"
                    type="date"
                    variant="bordered"
                    {...register("endDate")}
                  />

                  <Input
                    label="Description"
                    placeholder="Enter job description"
                    variant="bordered"
                    {...register("description", {
                      required: "Job description is required",
                    })}
                  />
                  {errors.description && (
                    <p className="text-error text-xs text-red-500">
                      {errors.description?.message}
                    </p>
                  )}

                  {/* Multiple Select for Technologies */}
                  <Select
                    multiple
                    label="Technologies"
                    placeholder="Select technologies"
                    selectedKeys={selectedTechnologies}
                    selectionMode="multiple"
                    variant="bordered"
                    onSelectionChange={setSelectedTechnologies}
                  >
                    {technologies?.map((technology: TSkill) => (
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
