import { TSkill } from './skillsTypes';

export interface TExperiences {
  _id: string;
  title: string;
  logo: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  technologies: TSkill[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
