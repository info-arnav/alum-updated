import Image from "next/image";
import bgImage from "..//image/alumnibg.png";
import Gallery from "./Gallery";

export default function Alumni() {
  return (
    <main className="background h-[100vh] -mt-4">
      {/*
      <div className="title">Welcome to Alum</div>
      <div className="message">
        Please wait for the platform to be fully functional.
      </div>
      <div className="type">
        You are logged in as a <b>Alumni</b>
      </div> */}
      <section className="banner flex flex-row">
        <div className="content ml-5 mt-32">
          <h1 className="text-6xl font-bold my-4">Welcome</h1>
          <div className="relative  ml-4 -top-3 ">
            <h2 className="text-3xl font-bold ">to Alum</h2>

            <p className="max-w-[400px]">
              Alumni are the brand ambassadors of their university. The world
              recognizes any university by its alumni. The alumni carry the
              tradition and value system of their university to the outside
              world.
            </p>
          </div>
          <br></br>
          <div className="mt-10 justify-start w-[50vw]">
            <p className="text-blue-700 text-6xl font-bold ">Stay Connected</p>
          </div>
        </div>

        <div className="w-full ">
          <Image
            src={bgImage}
            className=" h-[250px] w-[90%] md:w-[70%] md:h-[70vh] absolute mb-8 right-0 -z-10"
            alt="Logo of the Alum portal"
          ></Image>
        </div>
      </section>

      <section className="">
        <Gallery></Gallery>
      </section>
    </main>
  );
}
