import type { Metadata } from 'next';

import Project from '../_components/module/projects';
import { Title } from '../_components/ui/title';
import PaginationControls from '../_components/ui/paginationControl';

import { getAllProjects } from '@/service/projectService/projectService';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Explore client projects and case studies',
};

interface ProjectsPageProps {
  searchParams: {
    page?: string;
  };
}

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const currentPage = Number(searchParams.page) || 1;
  const limit = 6;

  const data = await getAllProjects({
    limit,
    page: currentPage,
    sort: '-updatedAt',
  });

  const projects = data?.data;
  const totalItems = data?.meta?.total || 0;
  const totalPages = Math.ceil(totalItems / limit);

  return (
    <div>
      <Title title1='Projects' title2='Case Studies' />
      <Project projects={projects} />
      <PaginationControls currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
