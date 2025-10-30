import React from 'react';

import Experience from '../_components/module/experience';

import { getAllExperiences } from '@/service/experienceService/experienceService';

// Enable ISR: revalidate every hour
export const revalidate = 3600;

export default async function ExperiencePage() {
  const experienceData = await getAllExperiences();
  const experiences = experienceData?.data;

  return (
    <>
      <Experience experiences={experiences} />
    </>
  );
}
