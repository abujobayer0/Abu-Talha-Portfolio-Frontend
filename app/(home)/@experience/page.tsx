import React from 'react';

import Experience from '../_components/module/experience';

import { getAllExperiences } from '@/service/experienceService/experienceService';

export default async function ExperiencePage() {
  const experienceData = await getAllExperiences();
  const experiences = experienceData?.data;

  return (
    <>
      <Experience experiences={experiences} />
    </>
  );
}
