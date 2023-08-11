"use client";
import React from "react";
import Image from "next/image";
// Import Swiper React components
// import { useEffect } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";
import img1 from "..//image/alumnibg.png";
import img2 from "..//image/alumnibg.png";
import img4 from "..//image/alumnibg.png";
import img3 from "..//image/login1.png";
import img5 from "..//image/alumnibg.png";
import img6 from "..//image/login1.png";
import img7 from "..//image/alumnibg.png";
import img8 from "..//image/alumnibg.png";
import img9 from "..//image/alumnibg.png";
import img10 from "..//image/alumnibg.png";
import img11 from "..//image/alumnibg.png";
import img12 from "..//image/alumnibg.png";

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

export default function Gallery() {
  //   useEffect(() => {
  //     AOS.init({ duration: 1000 });
  //   }, []);

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
        <SwiperSlide>
          <Image src={img1} alt="img-1" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={img2} alt="img-2" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={img4} alt="img-3" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={img3} alt="img-4" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={img5} alt="img-5" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={img6} alt="img-6" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={img7} alt="img-7" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={img8} alt="img-8" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={img9} alt="img-9" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={img10} alt="img-10" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={img11} alt="img-11" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={img12} alt="img-12" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={img1} alt="img-1" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={img2} alt="img-2" />
        </SwiperSlide>
      </Swiper>
    </main>
  );
}
