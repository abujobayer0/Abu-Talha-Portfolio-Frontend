import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@nextui-org/input";
import { FaPencilAlt } from "react-icons/fa";

import { TEducation } from "@/types";
import { useEditEducation } from "@/hooks/educations.hook";

interface TEditEducationModalProps {
  education: TEducation;
}

export default function EditEducationModal({
  education,
}: TEditEducationModalProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { mutate: editEducationFn, isPending } = useEditEducation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      institution: education.institution,
      location: education.location,
      startDate: education.startDate.split("T")[0],
      endDate: education.endDate.split("T")[0],
      grade: education.grade,
      subjects: education.subjects.join(", "),
      degree: education.degree, // Assuming you have a degree field in education
      description: education.description || "", // Default to empty if not available
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const educationData = {
      id: education?._id,
      data: {
        degree: data.degree, // Degree field
        institution: data.institution,
        location: data.location,
        startDate: new Date(data.startDate).toISOString(),
        endDate: data.endDate ? new Date(data.endDate).toISOString() : null,
        description: data.description || "",
        grade: data.grade,
        subjects: data.subjects
          .split(",")
          .map((subject: string) => subject.trim()),
      },
    };

    await editEducationFn(educationData);
    onOpenChange();
  };

  return (
    <>
      <Button
        isIconOnly
        className="font-semibold"
        radius="full"
        startContent={<FaPencilAlt />}
        onPress={onOpen}
      />

      <Modal isOpen={isOpen} size="lg" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit Education
              </ModalHeader>
              <ModalBody>
                <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
                  <Input
                    label="Degree"
                    placeholder="Enter degree"
                    variant="bordered"
                    {...register("degree", { required: "Degree is required" })}
                  />
                  {errors.degree && (
                    <p className="text-error text-xs text-red-500">
                      {errors.degree.message}
                    </p>
                  )}

                  <Input
                    label="Institution"
                    placeholder="Enter institution name"
                    variant="bordered"
                    {...register("institution", {
                      required: "Institution is required",
                    })}
                  />
                  {errors.institution && (
                    <p className="text-error text-xs text-red-500">
                      {errors.institution.message}
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
                      {errors.location.message}
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
                      {errors.startDate.message}
                    </p>
                  )}

                  <Input
                    label="End Date"
                    type="date"
                    variant="bordered"
                    {...register("endDate")}
                  />

                  <Input
                    label="Grade"
                    placeholder="Enter grade"
                    variant="bordered"
                    {...register("grade", { required: "Grade is required" })}
                  />
                  {errors.grade && (
                    <p className="text-error text-xs text-red-500">
                      {errors.grade.message}
                    </p>
                  )}

                  <Input
                    label="Subjects"
                    placeholder="Enter subjects (comma separated)"
                    variant="bordered"
                    {...register("subjects", {
                      required: "Subjects are required",
                    })}
                  />
                  {errors.subjects && (
                    <p className="text-error text-xs text-red-500">
                      {errors.subjects.message}
                    </p>
                  )}

                  <Input
                    label="Description"
                    placeholder="Enter a brief description"
                    variant="bordered"
                    {...register("description")}
                  />

                  <ModalFooter>
                    <Button
                      className="text-default-900"
                      color="warning"
                      isLoading={isPending}
                      type="submit"
                      onPress={onClose}
                    >
                      {isPending ? "Saving..." : "Save"}
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
