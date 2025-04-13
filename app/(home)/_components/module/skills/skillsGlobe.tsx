'use client';

import { IconCloud } from '../../ui/iconCloud';

import { useGetSkillsByCategory } from '@/hooks/skills.hook';
import { TSkill } from '@/types';

export function SkillsGlobe() {
  // Fetch data based on selected category
  const { data } = useGetSkillsByCategory(undefined);
  const skills = data?.data as TSkill[];

  const icons = skills?.map((skill) => skill.icon) || [];

  return (
    <div className="relative flex size-full items-center justify-center overflow-hidden">
      <IconCloud images={icons} />
    </div>
  );
}
