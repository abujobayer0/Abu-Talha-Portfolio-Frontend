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

import { useDeleteSkill } from "@/hooks/skills.hook";
import { TSkill } from "@/types";

interface TDeleteSkillModalProps {
  skill: TSkill;
}

export default function DeleteSkillModal({ skill }: TDeleteSkillModalProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { mutate: deleteSkillFn, isPending } = useDeleteSkill();

  const deleteSkillHandler = async (id: string) => {
    if (!id) {
      console.error("Id is required but not provided.");

      return;
    }

    deleteSkillFn(id);
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

      <Modal isOpen={isOpen} size="lg" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Delete the {`${skill?.name}`} Skill
              </ModalHeader>

              <ModalBody>
                <p className="text-xs text-default-700">
                  Are you sure?. You want a delete this skill
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
                  onClick={() => deleteSkillHandler(skill?._id)}
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
