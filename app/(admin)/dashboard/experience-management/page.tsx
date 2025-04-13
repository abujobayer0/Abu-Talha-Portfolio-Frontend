import React, { Suspense } from "react";

import ProjectsTableSkeleton from "../../_components/ui/skeleton/projectTableSkeleton";
import ExperienceTable from "../../_components/module/dashboard/experienceManagement/experienceTable";

import { getAllExperiences } from "@/service/experienceService/experienceService";

export default async function ExperienceManagement() {
  const data = await getAllExperiences();
  const experiences = data?.data;

  return (
    <Suspense fallback={<ProjectsTableSkeleton />}>
      <ExperienceTable experiences={experiences} />
    </Suspense>
  );
}
