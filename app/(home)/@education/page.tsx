import React from 'react';

import Education from '../_components/module/education';

import { getAllEducations } from '@/service/educationService/educationService';

// Enable ISR: revalidate every hour
export const revalidate = 3600;

export default async function EducationPage() {
  const data = await getAllEducations();
  const educations = data?.data;

  return <Education educations={educations} />;
}
