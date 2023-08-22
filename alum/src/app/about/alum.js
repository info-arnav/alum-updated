'use client';

import Link from 'next/link';
import Image from 'next/image';
import heroImg from '..//image/alumnibg.png';
import Gallery from '../home/Gallery';
export default function Alum({ logged }) {
  return (
    <main>
      <section
        className="hero mb-4"
        style={
          {
            // minHeight: 'calc(100vh - 80px)',
            // display: 'flex',
            // alignItems: 'center',
            // justifyContent: 'center',
          }
        }
      >
        <div className="hero-container lg:h-[85vh] flex flex-col-reverse lg:flex-row justify-between">
          <div className="hero-content z-10 max-w-[550px] flex pl-4 flex-col  lg:mt-40 mt-16">
            <h1 className="text-5xl lg:text-8xl font-bold my-2 tracking-wider">
              NALUM
            </h1>
            <h4 className="">The NSUT Networking Site</h4>
            <p className="my-7 lg:text-xl text-gray-600">
              Unlock a world of opportunities and connections at Alum, the
              exclusive cross-platform web application designed to empower both
              NSUT alumni and students. Seamlessly connecting generations, Alum
              redefines networking, knowledge sharing, and career advancement
              within the NSUT community.
            </p>
            {!logged && (
              <Link href="/login" className=" w-[135px]">
                <div className="button text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none tracking-widest">
                  Login Now
                </div>
              </Link>
            )}
          </div>
          <div className="hero-img flex justify-end ">
            <Image className="w-full " src={heroImg} />
          </div>
        </div>
      </section>
      {/* Features */}
      <div
        className="bg-[#1E53CF] flex items-center justify-center py-14 px-4"
        // style={{
        //   minHeight: '100vh',
        //   // display: 'flex',
        //   // alignItems: 'center',
        //   // justifyContent: 'center',
        // padding: '20px',
        // }}
      >
        {/* <div className=""> */}
        {/* <center> */}
        <div className="feature-content text-white w-full flex flex-col justify-center">
          <h2 className="text-4xl font-bold text-center mb-8">Mission</h2>
          <div className="card-container text-black w-full flex flex-col items-center justify-center lg:flex-row gap-4 mx-auto">
            <div className="card bg-white  rounded-xl mx-2 h-72 w-[85%] lg:w-[24%] flex flex-col shadow-[0_10px_20px_rgba(0,_0,_0,_0.7)]">
              <div className="m-4">
                <h1 className="text-xl text-[#690585] text-center font-bold mb-2">
                  {/* <span className=""> */}
                  Conneting Alumni
                  {/* </span> */}
                </h1>
                <div className="underLine h-[5px] bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-[length:100%_5px] bg-no-repeat bg-bottom text-center font-bold mb-2"></div>
                <p>
                  Forge meaningful connections between past and present. Our
                  platform bridges the gap, enabling alumni to share their
                  experiences, insights, and expertise with current students.
                  Together, we create a thriving network that nurtures growth.
                </p>
              </div>
            </div>
            <div className="card bg-white  rounded-xl mx-2 h-72 w-[85%] lg:w-[24%] flex flex-col shadow-[0_10px_20px_rgba(0,_0,_0,_0.7)]">
              <div className="m-4">
                <h1 className="text-xl text-[#690585] text-center font-bold mb-2">
                  Providing Internships
                </h1>
                <div className="underLine h-[5px] bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-[length:100%_5px] bg-no-repeat bg-bottom text-center font-bold mb-2"></div>

                <p>
                  Open doors to real-world opportunities. Our platform serves as
                  a launchpad for students to access diverse internships. Alumni
                  and companies collaborate to offer internships that enrich
                  students' learning journeys and prepare them for the
                  professional world.
                </p>
              </div>
            </div>
            <div className="card bg-white  rounded-xl mx-2 h-72 w-[85%] lg:w-[24%] flex flex-col shadow-[0_10px_20px_rgba(0,_0,_0,_0.7)]">
              <div className="p-4">
                <h1 className="text-xl text-[#690585] text-center font-bold mb-2">
                  Mentorship
                </h1>
                <div className="underLine h-[5px] bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-[length:100%_5px] bg-no-repeat bg-bottom text-center font-bold mb-2"></div>

                <p>
                  Guidance that shapes futures. Our mentorship program connects
                  students with experienced alumni who provide invaluable
                  advice, support, and insights. As mentors, alumni inspire the
                  next generation, fostering growth and excellence.
                </p>
              </div>
            </div>
            <div className="card bg-white  rounded-xl mx-2 h-72 w-[85%] lg:w-[24%] flex flex-col shadow-[0_10px_20px_rgba(0,_0,_0,_0.7)]">
              <div className="p-4">
                <h1 className="text-xl text-[#690585] text-center font-bold mb-2">
                  Raising Funds
                </h1>
                <div className="underLine h-[5px] bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-[length:100%_5px] bg-no-repeat bg-bottom text-center font-bold mb-2"></div>

                <p>
                  Investing in dreams. Through collaborative efforts, we empower
                  alumni to contribute to students various projects,
                  scholarships, and innovative projects. By raising funds
                  together, we create a brighter future for the entire
                  community.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* </center> */}
        {/* </div> */}
      </div>

      {/* Slider */}
      <section
        className="bg-black/50 py-4"
        style={{
          minHeight: 'calc(100vh - 80px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <center>
          <div className="feature-content text-white md:max-w-[500px]">
            <h2 className="text-4xl font-bold ">Why Alum ?</h2>
          </div>
        </center>
      </section>
      <section
        className="bg-white/50 py-4"
        style={{
          minHeight: 'calc(100vh - 80px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <center style={{ margin: 10 }}>
          <div className="feature-content text-black md:max-w-[500px]">
            <h2 className="text-4xl font-bold">Gallery</h2>
          </div>
          <Gallery></Gallery>
        </center>
      </section>
    </main>
  );
}
