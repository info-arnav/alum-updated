'use client';
import Link from 'next/link';
import Image from 'next/image';
import heroImg from '..//image/hero.png';
import Slider from './Slider.js';
import { Carousel } from '@material-tailwind/react';
import { useState, useEffect } from 'react';
import FeatureCard from './featureCard';
// DAtabase Format is like this

const alumniData = [
  {
    id: 1,
    image:
      'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80',
    name: 'DR. Abhishej Gupta',
    desc: 'UPSC AIR 1',
  },
  {
    id: 2,
    image:
      'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80',
    name: 'Shantanu',
    desc: 'UPSC AIR 1',
  },
  {
    id: 3,
    image:
      'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80',
    name: 'Gopal',
    desc: 'UPSC AIR 1',
  },
  {
    id: 4,
    name: 'Rohit',
    image:
      'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80',
    desc: 'UPSC AIR 1',
  },
  {
    id: 5,
    name: 'Aditya',
    image:
      'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80',
    desc: 'UPSC AIR 1',
  },
  {
    id: 6,
    name: 'Aditya',
    image:
      'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80',
    desc: 'UPSC AIR 1',
  },
  {
    id: 7,
    name: 'Aditya',
    image:
      'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80',
    desc: 'UPSC AIR 1',
  },
];
const featureData = [
  {
    id: 1,
    feature: 'Connect',
    desc: 'Lorem ipsum dolor sit  adipisicing elit. Minus quia eos vero ducimus impedit debitis.',
  },
  {
    id: 2,
    feature: 'Grab Internships',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus ducimus impedit debitis.',
  },
  {
    id: 3,
    feature: 'Recruit',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.  vero ducimus impedit debitis.',
  },
];
export default function LoggedOut() {
  const [custom_alumni_array, set_custom_array] = useState([]);

  const set_data = () => {
    set_custom_array((prev) => {
      return [];
    });
    const disp_size = 2; // no of sloder displayed together in carousel
    for (let i = 0; i < alumniData.length; i += disp_size) {
      if (i + disp_size > alumniData.length) {
        set_custom_array((prev) => {
          return [...prev, alumniData.slice(i)];
        });
      } else {
        set_custom_array((prev) => {
          return [...prev, alumniData.slice(i, i + disp_size)];
        });
      }
    }
  };

  useEffect(() => {
    set_data();
  }, []);

  console.log(custom_alumni_array);

  return (
    <main>
      {/* <div className="banner">
        <div className="content-container">
          <div className="title">ALUM</div>
          <div className="content">The NSUT Networking Site</div>
          <Link href="/register">
            <div className="button">REGISTER NOW</div>
          </Link>
        </div>
      </div>
      <div className="block"></div> */}

      {/* Hero */}
      <section className="hero">
        <div className="hero-container md:h-[85vh] w-[80vw] mx-auto flex flex-col md:flex-row justify-between">
          <div className="hero-content max-w-[550px] md:mt-44">
            <h1 className="text-6xl font-bold my-2 tracking-wider">ALUM</h1>
            <h4 className="">The NSUT Networking Site</h4>
            <p className="my-7 text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea dolor
              maxime excepturi deserunt impedit vel doloribus, odit, vitae
              aperiam commodi non aliquam nulla illo veniam. Reprehen.
            </p>
            <Link href="/register">
              <div className="button w-fit text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none tracking-widest">
                Register Now
              </div>
            </Link>
          </div>
          <div className="hero-img my-auto ">
            <Image className="w-[500px]" src={heroImg} />
          </div>
        </div>
      </section>
      {/* Features */}
      <section className="h-[40vh] bg-[#1E53CF]">
        <div className="feature-container w-[80vw] mx-auto py-4 flex justify-between">
          <div className="feature-content text-white md:max-w-[500px]">
            <h2 className="text-4xl ">Features</h2>
            <p className="my-4">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Doloribus nobis perferendis similique exercitationem velit magni
              quo! Quisquam cum repudiandae deleniti.
            </p>
          </div>
          <div className="feature-cards grid grid-cols-3 gap-4">
            {featureData.map((e) => {
              return <FeatureCard {...e} />;
            })}
          </div>
        </div>
      </section>

      {/* Slider */}
      <section className="bg-black/50 py-4">
        <Carousel
          transition={{ duration: 1 }}
          className="rounded-xl my-8 text-red-200 py-14 autoplay"
          navigation={({ setActiveIndex, activeIndex, length }) => (
            <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
              {new Array(length).fill('').map((_, i) => (
                <span
                  key={i}
                  className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                    activeIndex === i ? 'bg-white w-8' : 'bg-white/50 w-4'
                  }`}
                  onClick={() => setActiveIndex(i)}
                />
              ))}
            </div>
          )}
        >
          {custom_alumni_array.map((e) => {
            return (
              <div className="flex flex-row">
                {e.map((elem) => {
                  return <Slider info={elem} />;
                })}
              </div>
            );
          })}
        </Carousel>
      </section>
    </main>
  );
}
