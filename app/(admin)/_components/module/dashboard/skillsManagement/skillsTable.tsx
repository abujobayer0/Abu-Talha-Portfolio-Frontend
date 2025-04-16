'use client';

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@nextui-org/table';
import { Avatar } from '@nextui-org/avatar';
import React from 'react';
import AddSkillModal from '../../../modal/addSkillModal';
import EditSkillModal from '../../../modal/editSkillModal';
import DeleteSkillModal from '../../../modal/deleteSkillModal';
import { TSkill } from '@/types';

interface TSkillsTableProps {
  skills: TSkill[];
}

export default function SkillsTable({ skills }: TSkillsTableProps) {
  return (
    <div className="p-6 bg-white dark:bg-zinc-900 rounded-2xl shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100">
          Skills Overview
        </h2>
        <AddSkillModal />
      </div>

      <Table
        aria-label="Skills Table"
        removeWrapper
        isStriped
        classNames={{
          base: 'rounded-xl overflow-hidden',
          th: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 font-semibold text-sm uppercase',
          td: 'text-zinc-700 dark:text-zinc-200 text-sm',
          table: 'min-w-full',
        }}
      >
        <TableHeader>
          <TableColumn>Image</TableColumn>
          <TableColumn>Name</TableColumn>
          <TableColumn>Level</TableColumn>
          <TableColumn>Category</TableColumn>
          <TableColumn className="text-center">Actions</TableColumn>
        </TableHeader>
        <TableBody emptyContent={'No skills available'}>
          {skills?.map((skill) => (
            <TableRow
              key={skill._id}
              className="hover:bg-zinc-50 dark:hover:bg-zinc-800 transition"
            >
              <TableCell>
                <Avatar
                  src={skill.icon}
                  size="md"
                  className="border border-zinc-200 dark:border-zinc-700"
                />
              </TableCell>
              <TableCell>
                <span className="font-medium whitespace-nowrap">
                  {skill.name}
                </span>
              </TableCell>
              <TableCell>
                <span className="text-sm opacity-80 whitespace-nowrap">
                  {skill.level}
                </span>
              </TableCell>
              <TableCell>
                <span className="text-sm opacity-80 whitespace-nowrap">
                  {skill.category}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-start gap-3">
                  <EditSkillModal skill={skill} />
                  <DeleteSkillModal skill={skill} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
