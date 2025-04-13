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

import AddExperienceModal from "../../modal/addExperienceModal";

const EducationTableSkeleton = () => {
  return (
    <div>
      <div className="flex justify-end mb-5">
        <AddExperienceModal />
      </div>
      <Table aria-label="Loading Education Table">
        <TableHeader>
          <TableColumn>Institution</TableColumn>
          <TableColumn>Location</TableColumn>
          <TableColumn>Start Date</TableColumn>
          <TableColumn>End Date</TableColumn>
          <TableColumn>Grade</TableColumn>
          <TableColumn>Subjects</TableColumn>
          <TableColumn>Degree</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 6 }).map((_, index) => (
            <TableRow key={index}>
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

export default EducationTableSkeleton;
