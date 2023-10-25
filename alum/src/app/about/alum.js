"use client";

import Link from "next/link";
import Image from "next/image";
import heroImg from "..//image/hero.png";
import FeatureGallery from "../home/featureGallery";
import Gallery from "../home/Gallery";
export default function Nalum({ logged }) {
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
            <h1 className="text-6xl font-bold my-2 tracking-wider">Nalum</h1>
            <h4 className="">The NSUT Alumni Student Networking Platform</h4>
            <p className="my-7 text-gray-500">
              Unlock a world of opportunities and connections at Nalum, the
              exclusive cross-platform web application designed to empower both
              NSUT alumni and students. Seamlessly connecting generations, Nalum
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
        className="bg-[#f0f0f0]"
        style={{
          minHeight: "calc(100vh - 80px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="feature-container flex flex-col justify-around w-[80vw] mx-auto py-4 md:flex md:justify-between">
          <center>
            <div className="feature-content text-black">
              <img
                src="/banner.webp"
                style={{
                  width: "100%",
                  maxWidth: 700,
                  borderRadius: 20,
                  marginBottom: 50,
                }}
              ></img>
              <h2 className="text-4xl" style={{ fontWeight: "bold" }}>
                Our Mission
              </h2>
              <br></br>
              <p>
                Our mission at NALUM is to create a robust and interconnected
                platform that bridges the gap between NSUT's alumni and current
                students. By facilitating meaningful interactions, knowledge
                exchange, and mentorship, we aim to empower personal and
                professional growth, fostering a dynamic community that thrives
                on collaboration and mutual success.
              </p>
            </div>
          </center>
        </div>
      </div>

      {/* Slider */}
      <section
        className="bg-[#d2e1e7]/80 py-4"
        style={{
          minHeight: "calc(100vh - 80px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          paddingTop: 80,
          paddingBottom: 80,
        }}
      >
        <center style={{ width: "100%" }}>
          <div
            style={{
              width: "100%",
            }}
          >
            <h2 className="text-4xl " style={{ fontWeight: "bold" }}>
              Feautres ?
            </h2>
            <FeatureGallery
              data={[
                [
                  "Connected Networking",
                  "Seamlessly connect with NSUT alumni and students, fostering a vibrant community that thrives on collaboration and shared experiences.",
                ],

                [
                  "Profile Transition",
                  "Effortlessly update your profile status from student to alumni upon graduation, ensuring that your professional journey is accurately reflected.",
                ],

                [
                  "Dynamic Opportunities",
                  "Explore and share a spectrum of internship and job opportunities exclusively within the NSUT network, enabling mutual growth and advancement.",
                ],

                [
                  "Knowledge Exchange Hub",
                  "Engage in illuminating knowledge-sharing sessions led by seasoned alumni experts, offering valuable insights, advice, and inspiration for personal and career development.",
                ],

                [
                  "Guided Mentorship",
                  "Cultivate valuable connections with mentors across various industries and fields, providing guidance and support as you navigate academic and professional milestones.",
                ],
              ]}
            ></FeatureGallery>
          </div>
        </center>
      </section>
      <section
        className="bg-white/50 py-4"
        style={{
          minHeight: "calc(100vh - 80px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <center style={{ margin: 10 }}>
          <div className="feature-content text-black md:max-w-[500px]">
            <h2 className="text-4xl " style={{ fontWeight: "bold" }}>
              Gallery
            </h2>
          </div>
          <Gallery></Gallery>
        </center>
      </section>
    </main>
  );
}
