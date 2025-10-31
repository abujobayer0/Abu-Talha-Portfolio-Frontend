'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { getAllProjects, getSingleProject } from '@/service/projectService/projectService';
import { TProject } from '@/types';
import { siteConfig } from '@/config/site';

const ProjectDetails = dynamic(() => import('@/app/(home)/_components/module/pojectDetaisl'), { ssr: false });

export default function ProjectDetailsPage(props: any) {
  const { projectId } = props.params || {};
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState<TProject | null>(null);
  const [projects, setProjects] = useState<TProject[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);
    Promise.all([getSingleProject(projectId), getAllProjects()])
      .then(([projectData, productsData]) => {
        if (!mounted) return;
        setProject(projectData?.data || null);
        setProjects(Array.isArray(productsData?.data) ? productsData.data : []);
        setLoading(false);
      })
      .catch((err) => {
        if (mounted) {
          setError('Could not load project.');
          setProject(null);
          setProjects([]);
          setLoading(false);
        }
      });
    return () => {
      mounted = false;
    };
  }, [projectId]);

  if (loading) {
    return (
      <div className='pt-4 px-2'>
        <div className='mt-4 max-w-7xl mx-auto px-4 py-8'>
          <div className='animate-pulse space-y-6'>
            <div className='h-8 w-1/2 bg-gray-200 dark:bg-gray-800 rounded' />
            <div className='aspect-[16/9] w-full bg-gray-200 dark:bg-gray-800 rounded-2xl' />
            <div className='h-4 w-2/3 bg-gray-200 dark:bg-gray-800 rounded' />
            <div className='h-4 w-5/6 bg-gray-200 dark:bg-gray-800 rounded' />
            <div className='grid grid-cols-2 md:grid-cols-3 gap-4 pt-4'>
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className='h-28 bg-gray-200 dark:bg-gray-800 rounded-xl' />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className='pt-4 px-2'>
        <div className='mt-4 max-w-3xl mx-auto px-4 py-16 text-center'>
          <h1 className='text-2xl font-semibold mb-2'>Unable to load project</h1>
          <p className='text-muted-foreground mb-6'>Something went wrong while fetching this project.</p>
          <button className='px-4 py-2 rounded bg-primary text-primary-foreground' onClick={() => window.location.reload()}>
            Retry
          </button>
        </div>
      </div>
    );
  }
  if (!project) {
    return (
      <div className='max-w-7xl mx-auto px-4 py-16'>
        <h1 className='text-2xl font-semibold mb-2'>Project unavailable</h1>
        <p className='text-muted-foreground'>
          The project you’re looking for could not be loaded. It may have been removed or is temporarily unavailable.
        </p>
      </div>
    );
  }
  const baseUrl = siteConfig.url.replace(/\/$/, '');
  const canonical = `${baseUrl}/projects/${projectId}`;
  const description = (project.description || '').replace(/<[^>]+>/g, '').slice(0, 160);
  const image = Array.isArray(project.images) && project.images.length > 0 ? project.images[0] : siteConfig.ogImage;
  const created = (project as any).createdAt || new Date().toISOString();
  const modified = (project as any).updatedAt || created;

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CreativeWork',
            name: project.title,
            description,
            image: [image],
            url: canonical,
            author: { '@type': 'Person', name: 'Abu Talha Md Jobayer' },
            dateCreated: created,
            dateModified: modified,
          }),
        }}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
              { '@type': 'ListItem', position: 2, name: 'Projects', item: `${baseUrl}/projects` },
              { '@type': 'ListItem', position: 3, name: project.title, item: canonical },
            ],
          }),
        }}
      />
      <ProjectDetails project={project} projects={projects} currentId={projectId} />
    </>
  );
}
