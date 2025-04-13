import React from 'react';
import { Navbar } from '@/app/(home)/_components/ui/navbar';
import {
  getAllProjects,
  getSingleProject,
} from '@/service/projectService/projectService';
import { TProject } from '@/types';
import ProjectDetails from '@/app/(home)/_components/module/pojectDetaisl';
import MoreProductsSlider from '@/app/(home)/_components/module/pojectDetaisl/moreProductSlide';

interface TDetailsParams {
  params: { projectId: string };
}

export default async function ProjectDetailsPage({ params }: TDetailsParams) {
  const projectId = params.projectId;
  const projectData = await getSingleProject(projectId);
  const productsData = await getAllProjects();
  const project = projectData?.data;
  const projects = productsData?.data as TProject[];

  return (
    <div className="pt-4 px-2">
      <Navbar />
      <div className="mt-4">
        <ProjectDetails project={project} />
        <MoreProductsSlider projects={projects} />{' '}
        <div className="w-full h-full">
          <div className="absolute top-0 left-0 w-full h-[60px] bg-[#9333ea] blur-[150px] transform rotate-45" />
        </div>
      </div>
    </div>
  );
}
