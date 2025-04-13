import React from "react";

import Education from "../_components/module/education";

import { getAllEducations } from "@/service/educationService/educationService";

export default async function EducationPage() {
  const data = await getAllEducations();
  const educations = data?.data;

  return <Education educations={educations} />;
}
