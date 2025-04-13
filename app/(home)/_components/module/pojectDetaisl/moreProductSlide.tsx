// MoreProductsSlider.tsx

"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ProjectCard from "@/app/(home)/_components/module/projects/projectCard";
import { TProject } from "@/types";

interface MoreProductsSliderProps {
  projects: TProject[];
}

const MoreProductsSlider: React.FC<MoreProductsSliderProps> = ({
  projects,
}) => {
  return (
    <div className="my-10">
      <h2 className="text-2xl font-semibold mb-4">More Projects</h2>
      <Swiper
        spaceBetween={20}
        slidesPerView={1} // Default for xs screens
        breakpoints={{
          640: { slidesPerView: 1 }, // sm
          1024: { slidesPerView: 2 }, // lg
          1280: { slidesPerView: 3 }, // xl
        }}
        className="py-4"
      >
        {projects.map((project) => (
          <SwiperSlide key={project._id}>
            <div className="m-3">
              <ProjectCard project={project} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MoreProductsSlider;
