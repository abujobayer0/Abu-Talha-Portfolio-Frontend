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
import { FaPlus } from "react-icons/fa";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Input, Textarea } from "@nextui-org/input";

import { useCreateEducation } from "@/hooks/educations.hook";

export default function AddEducationModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { mutate: addEducationFn, isPending } = useCreateEducation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      degree: "",
      institution: "",
      location: "",
      startDate: "",
      endDate: "",
      grade: "",
      description: "",
      subjects: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const addData = {
      degree: data.degree,
      institution: data.institution,
      location: data.location,
      startDate: new Date(data.startDate).toISOString().split("T")[0], // Format as 'YYYY-MM-DD'
      endDate: data.endDate
        ? new Date(data.endDate).toISOString().split("T")[0]
        : null,
      grade: data.grade,
      description: data.description,
      subjects: data.subjects
        .split(",")
        .map((subject: string) => subject.trim()), // Split subjects by comma
    };

    console.log(addData);
    addEducationFn(addData);
    onOpenChange(); // Close the modal after submission
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
        Add Education
      </Button>

      <Modal isOpen={isOpen} size="lg" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add New Education
              </ModalHeader>
              <ModalBody>
                <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
                  <Input
                    label="Degree"
                    placeholder="Enter degree"
                    variant="bordered"
                    {...register("degree", {
                      required: "Degree is required",
                    })}
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
                    {...register("endDate", {
                      required: "End date is required",
                    })}
                  />
                  {errors.endDate && (
                    <p className="text-error text-xs text-red-500">
                      {errors.endDate.message}
                    </p>
                  )}

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

                  <Textarea
                    label="Description"
                    placeholder="Enter description of your studies"
                    variant="bordered"
                    {...register("description", {
                      required: "Description is required",
                    })}
                  />
                  {errors.description && (
                    <p className="text-error text-xs text-red-500">
                      {errors.description.message}
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
