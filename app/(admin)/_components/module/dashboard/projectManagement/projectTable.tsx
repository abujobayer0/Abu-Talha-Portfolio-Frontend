'use client';

import React from 'react';
import { format } from 'date-fns';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/table';
import { Avatar } from '@nextui-org/avatar';
import Link from 'next/link';
import { Tooltip } from '@nextui-org/tooltip';
import { ExternalLink, Github, Globe, Calendar, Image as ImageIcon } from 'lucide-react';

import AddProjectModal from '../../../modal/addProjectModal';
import EditProjectModal from '../../../modal/editProjectModal';
import DeleteProjectModal from '../../../modal/deleteProjectModal';

import { TProject } from '@/types/projectsTypes';

interface TProjectTableProps {
  projects: TProject[];
}

export default function ProjectsTable({ projects }: TProjectTableProps) {
  return (
    <div className='p-6 bg-white/30 dark:bg-gray-800/30 backdrop-blur-md rounded-2xl border border-purple-100 dark:border-purple-900/50 shadow-lg'>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-xl font-semibold text-purple-900 dark:text-purple-100'>Projects Management</h2>
        <AddProjectModal />
      </div>

      <Table
        aria-label='Projects Table'
        removeWrapper
        isStriped
        classNames={{
          base: 'rounded-xl overflow-hidden',
          th: 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 font-semibold text-sm uppercase border-b border-purple-200 dark:border-purple-800',
          td: 'text-gray-700 dark:text-gray-200 text-sm border-b border-purple-100/50 dark:border-purple-900/30',
          tr: 'hover:bg-purple-50/50 dark:hover:bg-purple-900/10 transition-colors',
          table: 'min-w-full',
        }}
      >
        <TableHeader>
          <TableColumn>
            <span className='flex items-center gap-2'>
              <ImageIcon className='w-4 h-4' />
              Image
            </span>
          </TableColumn>
          <TableColumn>Title</TableColumn>
          <TableColumn>
            <span className='flex items-center gap-2'>
              <Github className='w-4 h-4' />
              GitHub Links
            </span>
          </TableColumn>
          <TableColumn>
            <span className='flex items-center gap-2'>
              <Globe className='w-4 h-4' />
              Live Site
            </span>
          </TableColumn>
          <TableColumn>
            <span className='flex items-center gap-2'>
              <Calendar className='w-4 h-4' />
              Created At
            </span>
          </TableColumn>
          <TableColumn className='text-center'>Actions</TableColumn>
        </TableHeader>
        <TableBody emptyContent={'No projects available'}>
          {projects?.map((project) => (
            <TableRow key={project._id}>
              <TableCell>
                <Avatar src={project.images[0]} className='w-12 h-12 border-2 border-purple-200 dark:border-purple-800' />
              </TableCell>
              <TableCell>
                <Tooltip className='max-w-xs' content={project.title}>
                  <p className='font-medium text-purple-800 dark:text-purple-200 whitespace-nowrap cursor-help'>
                    {project.title.length > 20 ? project.title.slice(0, 20) + '...' : project.title}
                  </p>
                </Tooltip>
              </TableCell>
              <TableCell>
                <div className='flex flex-col gap-2'>
                  {project.github?.frontend && (
                    <Link
                      className='flex items-center gap-1.5 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors text-sm font-medium'
                      href={project.github.frontend}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <Github className='w-3.5 h-3.5' />
                      <span>Frontend</span>
                      <ExternalLink className='w-3 h-3' />
                    </Link>
                  )}
                  {project.github?.backend && (
                    <Link
                      className='flex items-center gap-1.5 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors text-sm font-medium'
                      href={project.github.backend}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <Github className='w-3.5 h-3.5' />
                      <span>Backend</span>
                      <ExternalLink className='w-3 h-3' />
                    </Link>
                  )}
                  {!project.github?.frontend && !project.github?.backend && <span className='text-gray-400 text-xs'>No links</span>}
                </div>
              </TableCell>
              <TableCell>
                {project.live ? (
                  <Link
                    className='flex items-center gap-1.5 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors text-sm font-medium whitespace-nowrap'
                    href={project.live}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <Globe className='w-4 h-4' />
                    <span>View Live</span>
                    <ExternalLink className='w-3 h-3' />
                  </Link>
                ) : (
                  <span className='text-gray-400 text-xs'>Not available</span>
                )}
              </TableCell>
              <TableCell>
                <span className='flex items-center gap-1.5 text-gray-600 dark:text-gray-400 whitespace-nowrap'>
                  <Calendar className='w-3.5 h-3.5' />
                  {format(new Date(project.createdAt), 'dd MMM y')}
                </span>
              </TableCell>
              <TableCell>
                <div className='flex items-center gap-3 justify-center'>
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
