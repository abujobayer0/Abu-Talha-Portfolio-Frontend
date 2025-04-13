// pages/experience.tsx
'use client';

import dynamic from 'next/dynamic';

import { Title } from '../../ui/title';

import { TExperiences } from '@/types/experiencesTypes';

const ClientExperience = dynamic(() => import('./experienceCard'), {
  ssr: false,
});

interface TExperiencesProps {
  experiences: TExperiences[];
}

export default function ExperiencePage({ experiences }: TExperiencesProps) {
  return (
    <>
      <Title title1="Experience" title2="Experience" />
      <ClientExperience experiences={experiences} />
    </>
  );
}
