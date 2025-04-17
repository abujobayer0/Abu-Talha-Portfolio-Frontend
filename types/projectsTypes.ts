import { TSkill } from './skillsTypes';

export interface TProject {
  category: any;
  _id: string;
  title: string;
  description: string;
  github: {
    frontend: string;
    backend: string;
  };
  live: string;
  technologies: [TSkill];
  images: string[];
  createdAt: string;
  updatedAt: string;
  matchCount?: number;
}
