"use client";

import { useEffect, useState } from "react";
import Profile from "./components/profile";
import EditProfile from "./components/editProfile";
import Error from "../error";
import Loading from "../home/loading";
import Portfolio from "./components/portfolio";
import Image from "next/image";
import bg_nsut from "..//image/bgnsut.png";

export default function UserProfile({ data, link }) {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(true);
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    const getDoc = async () => {
      const res = await fetch(`/api/get-user-info`, {
        method: "POST",
        body: JSON.stringify({
          auth_email: data.data.email,
          email: data.data.email,
        }),
        cache: "no-cache",
      }).then((e) => e.json());
      if (res.error) {
        setError(true);
        setLoading(false);
      } else {
        [
          [res.data.education, "education"],
          [res.data.occupation, "occupation"],
          [res.data.projects, "projects"],
          [res.data.honors, "honors"],
          [res.data.applications, "applications"],
        ].forEach((e) => {
          try {
            res.data[e[1]] = JSON.parse(e[0]);
          } catch {
            res.data[e[1]] = [];
          }
        });
        setError(false);
        setUserData(res.data);
        setLoading(false);
      }
    };
    getDoc();
  }, [refresh]);
  useEffect(() => {}, [show, userData]);
  return (
    <>
      {loading ? (
        <Loading></Loading>
      ) : error ? (
        <Error></Error>
      ) : (
        <div className="profile-page flex flex-col w-full -mt-4">
          <div className="relative profile-info flex flex-col w-full shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
            <div className="image w-full ">
              <Image className="w-full h-[280px]" src={bg_nsut} />
            </div>
            <div className=" relative flex flex-col md:flex-row w-full profile-block md:h-52 h-80 ">
              <Profile
                data={userData}
                link={link}
                email={data.data.email}
              ></Profile>
              <div className="md:absolute md:bottom-2 md:top-16 md:right-2">
                <button
                  className="bg-[#00183F] text-white h-10 rounded-full px-8 hover:bg-[#002d75]"
                  onClick={() => {
                    document.querySelector("body").classList.add("no-scroll");
                    setShow(true);
                  }}
                >
                  Edit Profile
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col m-auto justify-center w-full ">
            {show && (
              <EditProfile
                data={userData}
                link={link}
                email={data.data.email}
                setShow={setShow}
                setRefresh={setRefresh}
                refresh={refresh}
                setData={setUserData}
              ></EditProfile>
            )}
            <Portfolio
              data={userData}
              email={data.data.email}
              setRefresh={setRefresh}
              refresh={refresh}
              setData={setUserData}
            ></Portfolio>
          </div>
        </div>
      )}
    </>
  );
}
