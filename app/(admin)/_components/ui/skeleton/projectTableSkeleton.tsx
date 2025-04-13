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

import AddProjectModal from "../../modal/addProjectModal";

const ProjectsTableSkeleton = () => {
  return (
    <div>
      <div className="flex justify-end mb-5">
        <AddProjectModal />
      </div>
      <Table aria-label="Loading Projects Table">
        <TableHeader>
          <TableColumn>Image</TableColumn>
          <TableColumn>Title</TableColumn>
          <TableColumn>Description</TableColumn>
          <TableColumn>GitHub (Frontend)</TableColumn>
          <TableColumn>GitHub (Backend)</TableColumn>
          <TableColumn>Live Site</TableColumn>
          <TableColumn>Created At</TableColumn>
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

export default ProjectsTableSkeleton;
