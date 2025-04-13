'use client';

import React from 'react';
import Image from 'next/image';

import AnimatedButton from '../../ui/button';

import AchievementsSection from './achivement';

import { TAbout, TBlog, TProject, TSkill } from '@/types';
import { useGetLink } from '@/hooks/links.hook';

interface TAboutProps {
  about: TAbout;
  projects: TProject[];
  skills: TSkill[];
  blogs: TBlog[];
}

export default function About({ about, projects, skills, blogs }: TAboutProps) {
  const { data: link } = useGetLink('67bb2077af9ba724ceece4ec');

  return (
    <section className="flex flex-col lg:flex-row items-center lg:space-x-8 space-y-8 lg:space-y-0">
      {/* Image Section */}
      <div className="w-full lg:w-1/3">
        <Image
          alt={about.me.name}
          className="w-full h-full lg:h-[350px] xl:h-[340px] rounded-lg shadow-lg object-cover"
          height={500}
          src={about.image || 'https://example.com/my-image.jpg'}
          width={500}
        />
      </div>

      {/* Text Section */}
      <div className="bg-default-100/50 backdrop-blur-sm border border-default-100 p-3 rounded-md w-full lg:w-2/3 text-center md:text-left space-y-2 lg:h-[350px] xl:h-[340px]">
        <h2 className="md:text-xl font-bold">{about.title}</h2>
        <p className="text-[12px] md:text-sm text-default-500 mb-4">
          Address: {about.address + ',' + about.country}
        </p>
        <p className="text-default-600 mb-10 text-[10px] md:text-xs">
          {about.description}
        </p>

        {/* Experience, Projects, Companies Worked */}
        <AchievementsSection
          blogs={blogs}
          projects={projects}
          skills={skills}
        />

        {/* Download CV Button */}
        <AnimatedButton
          bgColor="bg-transparent"
          borderColor="border-warning-500 my-5"
          href={
            link?.data?.resume ||
            'https://drive.google.com/file/d/15OqqkOMwSooI_iuQhrb7bCAQLEGug-sN/view?usp=drive_link'
          }
          target="_blank"
          text="View Resume"
          textColor="text-warning"
        />
      </div>
    </section>
  );
}
