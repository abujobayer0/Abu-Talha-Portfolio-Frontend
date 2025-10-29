import React, { Suspense } from 'react';

import EducationTable from '../../_components/module/dashboard/educationManagement/educationTable';
import EducationTableSkeleton from '../../_components/ui/skeleton/educationTableSkeleton';

import { getAllEducations } from '@/service/educationService/educationService';

export default async function EducationManagement() {
  const data = await getAllEducations();

  const educations = data?.data;

  return (
    <Suspense fallback={<EducationTableSkeleton />}>
      <EducationTable educations={educations} />
    </Suspense>
  );
}
