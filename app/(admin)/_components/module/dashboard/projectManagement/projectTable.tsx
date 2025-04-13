"use client";

import React from "react";
import { format } from "date-fns";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Avatar } from "@nextui-org/avatar";
import Link from "next/link";
import { Tooltip } from "@nextui-org/tooltip";

import AddProjectModal from "../../../modal/addProjectModal";
import EditProjectModal from "../../../modal/editProjectModal";
import DeleteProjectModal from "../../../modal/deleteProjectModal";

import { TProject } from "@/types/projectsTypes";

interface TProjectTableProps {
  projects: TProject[];
}

export default function ProjectsTable({ projects }: TProjectTableProps) {
  return (
    <div>
      <div className="flex justify-end mb-5">
        <AddProjectModal />
      </div>
      <Table aria-label="Projects Table">
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
        <TableBody emptyContent={"No projects available"}>
          {projects?.map((project) => (
            <TableRow key={project._id}>
              <TableCell>
                <Avatar src={project.images[0]} />
              </TableCell>
              <TableCell>
                <Tooltip className="w-[250px]" content={project.title}>
                  <p className="whitespace-nowrap">
                    {project.title.slice(0, 10) + "..."}
                  </p>
                </Tooltip>
              </TableCell>
              <TableCell>
                <Tooltip className="w-[250px]" content={project.description}>
                  <p className="whitespace-nowrap">
                    {project.description.slice(0, 20) + "..."}
                  </p>
                </Tooltip>
              </TableCell>
              <TableCell>
                <Link
                  className="text-blue-500 whitespace-nowrap"
                  href={project.github.frontend}
                >
                  Frontend
                </Link>
              </TableCell>
              <TableCell>
                <Link
                  className="text-blue-500 whitespace-nowrap"
                  href={project.github.backend}
                >
                  Backend
                </Link>
              </TableCell>
              <TableCell>
                <Link
                  className="text-blue-500 whitespace-nowrap"
                  href={project.live}
                >
                  Live Site
                </Link>
              </TableCell>
              <TableCell>
                <p className="whitespace-nowrap">
                  {format(new Date(project.createdAt), "dd MMM y")}
                </p>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-5 justify-start">
                  <EditProjectModal project={project} />
                  <DeleteProjectModal project={project} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
