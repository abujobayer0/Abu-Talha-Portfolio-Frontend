"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Skeleton } from "@nextui-org/skeleton";

import AddSkillModal from "../../modal/addSkillModal";

const SkillsTableSkeleton = () => {
  return (
    <div>
      <div className="flex justify-end mb-5">
        <AddSkillModal />
      </div>
      <Table aria-label="Loading Skills Table">
        <TableHeader>
          <TableColumn>Image</TableColumn>
          <TableColumn>Name</TableColumn>
          <TableColumn>Level</TableColumn>
          <TableColumn>Category</TableColumn>
          <TableColumn>Action</TableColumn>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 6 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <Skeleton className="h-8 w-8 rounded-md" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-full rounded-md" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-full rounded-md" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-full rounded-md" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-full rounded-md" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SkillsTableSkeleton;
