"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

interface TThumbnailSliderProps {
  images: string[];
  currentImageIndex: number;
  handleImageChange: (index: number) => void;
}

const ThumbnailSlider: React.FC<TThumbnailSliderProps> = ({
  images,
  currentImageIndex,
  handleImageChange,
}) => {
  return (
    <Swiper
      spaceBetween={10}
      slidesPerView={4} // Default for xs screens
      breakpoints={{
        640: { slidesPerView: 4 }, // sm
        1024: { slidesPerView: 5 }, // lg
        1280: { slidesPerView: 6 }, // xl
      }}
      onSlideChange={(swiper) => handleImageChange(swiper.activeIndex)}
      className="w-full"
    >
      {images.map((image: string, index: number) => (
        <SwiperSlide key={index}>
          <Image
            src={image}
            alt={`Thumbnail ${index + 1}`}
            className={`w-24 h-16 m-2 object-cover rounded-lg cursor-pointer transition-transform duration-200 ease-in-out hover:scale-105 ${
              currentImageIndex === index ? "border-2 border-warning" : ""
            }`}
            onClick={() => handleImageChange(index)}
            width={500}
            height={500}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ThumbnailSlider;
