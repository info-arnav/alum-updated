"use client";

import Link from "next/link";
import Image from "next/image";
import heroImg from "..//image/hero.png";
export default function Alum({ logged }) {
  return (
    <main>
      <section
        className="hero"
        style={{
          minHeight: "calc(100vh - 80px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="hero-container md:h-[85vh] w-[80vw] mx-auto flex flex-col md:flex-row justify-between">
          <div className="hero-content max-w-[550px] md:mt-44">
            <h1 className="text-6xl font-bold my-2 tracking-wider">ALUM</h1>
            <h4 className="">The NSUT Networking Site</h4>
            <p className="my-7 text-gray-500">
              Unlock a world of opportunities and connections at Alum, the
              exclusive cross-platform web application designed to empower both
              NSUT alumni and students. Seamlessly connecting generations, Alum
              redefines networking, knowledge sharing, and career advancement
              within the NSUT community.
            </p>
            {!logged && (
              <Link href="/login">
                <div className="button w-fit text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none tracking-widest">
                  Login Now
                </div>
              </Link>
            )}
          </div>
          <div className="hero-img my-auto ">
            <Image className="w-[500px]" src={heroImg} />
          </div>
        </div>
      </section>
      {/* Features */}
      <div
        className="bg-[#1E53CF]"
        style={{
          minHeight: "calc(100vh - 80px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="feature-container flex flex-col justify-around w-[80vw] mx-auto py-4 md:flex md:justify-between">
          <center>
            <div className="feature-content text-white md:max-w-[500px]">
              <h2 className="text-4xl ">Mission</h2>
            </div>
          </center>
        </div>
      </div>

      {/* Slider */}
      <section
        className="bg-black/50 py-4"
        style={{
          minHeight: "calc(100vh - 80px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <center>
          <div className="feature-content text-white md:max-w-[500px]">
            <h2 className="text-4xl ">Why Alum ?</h2>
          </div>
        </center>
      </section>
    </main>
  );
}
