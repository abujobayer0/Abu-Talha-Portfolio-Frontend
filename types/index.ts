import { SVGProps } from "react";
import { FieldValues } from "react-hook-form";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface TUpdateData {
  id: string;
  data: FieldValues;
}

export * from "./skillsTypes";
export * from "./projectsTypes";
export * from "./educationTypes";
export * from "./experienceTypes";
export * from "./blogsTypes";
export * from "./aboutTypes";
