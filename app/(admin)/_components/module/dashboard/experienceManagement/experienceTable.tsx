'use client';

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@nextui-org/table';
import React from 'react';
import { format } from 'date-fns';
import { Tooltip } from '@nextui-org/tooltip';

import AddExperienceModal from '../../../modal/addExperienceModal';
import EditExperienceModal from '../../../modal/editExperienceModal';
import DeleteExperienceModal from '../../../modal/deleteExperienceModal';

import { TExperience } from '@/types';

interface TExperienceTableProps {
  experiences: TExperience[];
}

export default function ExperienceTable({
  experiences,
}: TExperienceTableProps) {
  // Helper function to trim text to a specified length
  const getTrimmedText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };

  return (
    <div>
      <div className="flex justify-end mb-5">
        <AddExperienceModal />
      </div>
      <Table aria-label="Experience Table">
        <TableHeader>
          <TableColumn>Title</TableColumn>
          <TableColumn>Company</TableColumn>
          <TableColumn>Location</TableColumn>
          <TableColumn>Start Date</TableColumn>
          <TableColumn>End Date</TableColumn>
          <TableColumn>Description</TableColumn>
          <TableColumn>Action</TableColumn>
        </TableHeader>
        <TableBody emptyContent={'No experiences available'}>
          {experiences?.map((experience) => (
            <TableRow key={experience._id}>
              <TableCell>
                <p className="whitespace-nowrap">{experience.title}</p>
              </TableCell>
              <TableCell>
                <p className="whitespace-nowrap">{experience.company}</p>
              </TableCell>
              <TableCell>
                <p className="whitespace-nowrap">{experience.location}</p>
              </TableCell>
              <TableCell>
                <p className="whitespace-nowrap">
                  {' '}
                  {experience.startDate
                    ? format(new Date(experience.startDate), 'dd MMM y')
                    : 'N/A'}
                </p>
              </TableCell>
              <TableCell>
                <p className="whitespace-nowrap">
                  {experience.endDate
                    ? format(new Date(experience.endDate), 'yyyy-MM-dd')
                    : 'Present'}
                </p>
              </TableCell>
              <TableCell>
                {' '}
                <Tooltip className="w-[250px]" content={experience.description}>
                  <span className="whitespace-nowrap">
                    {getTrimmedText(experience.description, 20)}
                  </span>
                </Tooltip>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-5 justify-start">
                  <EditExperienceModal experience={experience} />
                  <DeleteExperienceModal experience={experience} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
