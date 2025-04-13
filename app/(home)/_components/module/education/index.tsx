"use client";

import React, { useState } from "react";
import { format } from "date-fns";

import { Title } from "../../ui/title";

import { TEducation } from "@/types";

interface TEducationProps {
  educations: TEducation[];
}

export default function Education({ educations }: TEducationProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {educations.map((edu) => (
        <EducationCard key={edu._id} education={edu} />
      ))}
    </div>
  );
}

interface EducationCardProps {
  education: TEducation;
}

const EducationCard = ({ education }: EducationCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxDescriptionLength = 150; // Adjust this value for how much text you want to show initially

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="bg-default-50 border border-default-200 rounded-lg p-6">
      <h3 className="text-2xl font-bold text-warning mb-2">
        {education.degree}
      </h3>
      <p className="text-lg font-semibold text-default-700">
        {education.institution}
      </p>
      <p className="text-sm text-default-500 mb-4">{education.location}</p>
      <p className="text-sm text-default-500 mb-4">
        {format(new Date(education.startDate), "dd MMM yyyy")} -{" "}
        {education.endDate
          ? format(new Date(education.endDate), "dd MMM yyyy")
          : "Present"}
      </p>
      <p className="text-default-600 mb-4">
        {isExpanded
          ? education.description
          : `${education.description.substring(0, maxDescriptionLength)}...`}
        <button className="text-warning text-xs ml-2" onClick={toggleExpand}>
          {isExpanded ? "See Less" : "See More"}
        </button>
      </p>
      <p className="text-sm font-semibold">
        Subjects: {education.subjects.join(", ")}
      </p>
    </div>
  );
};
