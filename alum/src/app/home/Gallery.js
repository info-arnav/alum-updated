"use client";
import React from "react";
import Image from "next/image";
// Import Swiper React components
// import { useEffect } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";

// Import Swiper styles

import "swiper/swiper.min.css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/navigation";

// import "../globals.css";
// import AOS from "aos";
// import "aos/dist/aos.css";

// import required modules
import { EffectCoverflow } from "swiper";
import { useEffect } from "react";

export default function Gallery() {
  let images = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
  return (
    <main className="gallery-section" id="gallery">
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 105,
          modifier: 1,
          slideShadows: true,
        }}
        autoplay={{
          disableOnInteraction: false,
        }}
        // pagination={true}
        navigation={true}
        modules={[EffectCoverflow, Autoplay, Navigation]}
        className="mySwiper"
      >
        {images.map((e) => (
          <SwiperSlide>
            <img
              src={`/gallary/meet%20(${e}).jpg`}
              alt={`image number ${e} of alumni meet`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </main>
  );
}
