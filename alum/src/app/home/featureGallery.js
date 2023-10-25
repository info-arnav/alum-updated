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

export default function FeatureGallery({ data }) {
  return (
    <main className="gallery-section" id="gallery feature-gallary">
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
          slideShadows: false,
        }}
        autoplay={{
          disableOnInteraction: true,
        }}
        // pagination={true}
        navigation={true}
        modules={[EffectCoverflow, Navigation]}
        className="mySwiper"
      >
        {data.map((e) => (
          <SwiperSlide>
            <div
              style={{
                backgroundColor: "white",
                width: "100%",
                height: "100%",
                overflow: "hidden",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                color: "black",
                padding: 20,
                overflowX: "auto",
                overflowY: "auto",
              }}
            >
              <p
                style={{
                  marginBottom: 20,
                  fontWeight: "bold",
                  fontSize: 20,
                  maxWidth: "calc(100vw - 20px)",
                }}
              >
                {e[0]}
              </p>
              <p
                style={{
                  maxWidth: "calc(100vw - 100px)",
                }}
              >
                {e[1]}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </main>
  );
}
