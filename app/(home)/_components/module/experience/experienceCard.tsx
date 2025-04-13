'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { format } from 'date-fns';

import { TExperiences } from '@/types/experiencesTypes';

interface TExperiencesProps {
  experiences: TExperiences[];
}

const MAX_CHAR = 150;

const ClientExperience: React.FC<TExperiencesProps> = ({ experiences }) => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {experiences.map((exp) => {
        const isExpanded = expanded[exp._id];
        const isLong = exp.description.length > MAX_CHAR;

        return (
          <div
            key={exp._id}
            className="bg-default-100/50 backdrop-blur-sm rounded-lg p-3 flex flex-col items-start justify-start border border-default-100"
          >
            <div className="flex items-center justify-between w-full gap-3 mb-4">
              <div className="flex items-center gap-3">
                <Image
                  alt="logo"
                  className="size-10 rounded-full object-cover"
                  height={1000}
                  src={exp.logo}
                  width={1000}
                />
                <div className="flex flex-col">
                  <p className=" text-xs md:text-sm text-default-600 font-medium">
                    {exp.company}
                  </p>
                  <h3 className="text-[9px] md:text-[12px] font-medium">
                    {exp.title}
                  </h3>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-[8px] md:text-[10px] font-medium bg-white/20 px-3 py-1 rounded-full">
                  {format(new Date(exp.startDate), 'MMM yyyy')} -{' '}
                  {exp.endDate
                    ? format(new Date(exp.endDate), 'MMM yyyy')
                    : 'Present'}
                </span>
                <span className="text-[8px] md:text-[10px] italic">
                  {exp.location}
                </span>
              </div>
            </div>

            <p className="text-[10px] md:text-xs text-default-700 mb-2 text-start">
              {isExpanded || !isLong
                ? exp.description
                : `${exp.description.slice(0, MAX_CHAR)}...`}
            </p>

            {isLong && (
              <button
                className="text-[8px] md:text-[10px] text-warning hover:underline mb-4"
                onClick={() => toggleExpand(exp._id)}
              >
                {isExpanded ? 'See less' : 'See more'}
              </button>
            )}

            <div className="flex flex-wrap items-start gap-3">
              {exp.technologies.map((tech) => (
                <div
                  key={tech._id}
                  className="flex items-center gap-2 border border-default-200 rounded px-3 py-1"
                >
                  <Image
                    alt={tech.name}
                    className="rounded-full size-3 bg-cover object-cover"
                    height={500}
                    src={tech.icon}
                    width={500}
                  />
                  <span className="text-[8px] md:text-[10px]">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ClientExperience;
