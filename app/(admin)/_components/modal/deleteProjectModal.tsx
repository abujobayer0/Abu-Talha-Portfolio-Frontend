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
import { FaTrashAlt } from "react-icons/fa";

import { TProject } from "@/types/projectsTypes";
import { useDeleteProject } from "@/hooks/projects.hook";

interface TDeleteProjectModalProps {
  project: TProject;
}

export default function DeleteProjectModal({
  project,
}: TDeleteProjectModalProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { mutate: deleteProjectFn, isPending } = useDeleteProject();

  const deleteProjectHandler = async (id: string) => {
    if (!id) {
      console.error("Id is required but not provided.");

      return;
    }

    deleteProjectFn(id);
  };

  return (
    <>
      <Button
        isIconOnly
        radius="full"
        size="sm"
        startContent={<FaTrashAlt className="text-red-500" />}
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
                Delete the {`${project?.title}`} project
              </ModalHeader>

              <ModalBody>
                <p className="text-xs text-default-700">
                  Are you sure?. You want a delete this Project
                </p>
              </ModalBody>
              <ModalFooter>
                <Button size="sm" onPress={onClose}>
                  No
                </Button>
                <Button
                  className="bg-red-500 text-white"
                  isLoading={isPending}
                  size="sm"
                  onClick={() => deleteProjectHandler(project?._id)}
                  onPress={onClose}
                >
                  Yes
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
