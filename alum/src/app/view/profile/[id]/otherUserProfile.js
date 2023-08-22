"use client";

import Image from "next/image";
import bg_nsut from "..//..//..//image/bgnsut.png";
import { SocialIcon } from "react-social-icons";

export default function OtherUserProfile({ id, link, userData }) {
  return (
    <>
      <div className="relative profile-info flex flex-col w-full shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
        <div className="image w-full ">
          <Image className="w-full h-[280px]" src={bg_nsut} />
        </div>
        <div className=" relative flex flex-col md:flex-row w-full profile-block md:h-52 h-80 ">
          <div className="">
            <img
              src={`${link}api/image/${id}`}
              width={150}
              height={150}
              style={{ aspectRatio: "1 / 1" }}
              alt="The profile picture"
              id="profile_image_refreshed"
              className="absolute m-auto md:m-0 left-0 right-0 md:left-8 -top-16 border-white border-8 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] w-[150px] md:w-[200px] md:h-[200px]"
            ></img>
            <div className="md:absolute md:left-64 pt-[90px] m-2 md:p-0">
              <div className="flex flex-col md:text-left text-center">
                <p className="m-1 mt-3 font-bold text-2xl">
                  {userData.name || "Name Not Provided"}
                </p>
                <p className="m-1 font-semibold" style={{}}>
                  {userData.batch || "Batch Not Provided"}
                  {userData.instagram && (
                    <a href={userData.instagram}>
                      <SocialIcon
                        bgColor="white"
                        fgColor="black"
                        url={userData.instagram}
                        style={{ marginLeft: 10, height: 35, width: 35 }}
                      ></SocialIcon>
                    </a>
                  )}
                  {userData.facebook && (
                    <a href={userData.facebook}>
                      <SocialIcon
                        bgColor="white"
                        fgColor="black"
                        url={userData.facebook}
                        style={{ marginLeft: 10, height: 35, width: 35 }}
                      ></SocialIcon>
                    </a>
                  )}
                  {userData.linkedin && (
                    <a href={userData.linkedin}>
                      <SocialIcon
                        bgColor="white"
                        fgColor="black"
                        url={userData.linkedin}
                        style={{ marginLeft: 10, height: 35, width: 35 }}
                      ></SocialIcon>
                    </a>
                  )}
                </p>
                <p className="m-1 font-semibold text-[#7d7d7d]">
                  {userData.email}
                </p>
                <p className="m-1">{userData.bio || "No bio provided"}</p>
              </div>
            </div>
          </div>
          {/* <Profile
            data={userData}
            link={link}
            email={data.data.email}
          ></Profile> */}
        </div>
      </div>
      <div className="flex flex-col m-auto justify-center w-full ">
        <div className="profile-right w-full">
          {[
            [userData.occupation, "Work Experience", "occupation"],
            [userData.education, "Education", "education"],
            [userData.projects, "Projects", "projects"],
            [userData.honors, "Honors", "honors"],
          ].map((e) => {
            return (
              <div
                key={e[1]}
                className="category rounded-xl bg-white p-4 my-4 border-2 border-[#868686] mx-auto"
              >
                <div className="main-category-header">{e[1]}</div>
                {e[0].length > 0 ? (
                  e[0].map((f) => {
                    return (
                      <div
                        key={e[0].indexOf(f)}
                        className="category-details my-4"
                      >
                        <div className="category-header">{f.title}</div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <div className="category-subheader">{f.subTitle}</div>
                          {f.duration && (
                            <div className="category-space">|</div>
                          )}
                          <div className="category-sub-subheader">
                            {f.duration}
                          </div>
                        </div>
                        <div
                          className="category-description"
                          dangerouslySetInnerHTML={{ __html: f.description }}
                        ></div>
                      </div>
                    );
                  })
                ) : (
                  <div className="nothing-to-see">Nothing to see here</div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* <div className="profile-page bg-red-100">
        <div className="profile-block">
          <div className="profile-right">
            {[
              [userData.occupation, "occupation", "Work Experience"],
              [userData.education, "education", "Education"],
              [userData.projects, "projects", "Projects"],
              [userData.honors, "honors", "Honors"],
            ].map((e) => {
              return (
                <div key={e[1]} className="category">
                  <hr></hr>
                  <div className="main-category-header">
                    {e[2].toUpperCase()}
                  </div>
                  <hr></hr>
                  {e[0].length > 0 ? (
                    e[0].map((f) => {
                      return (
                        <div key={e[0].indexOf(f)} className="category-details">
                          <div className="category-header">{f.title}</div>
                          <div className="category-subheader">{f.subTitle}</div>
                          <div className="category-sub-subheader">
                            {f.duration}
                          </div>
                          <div
                            className="category-description"
                            dangerouslySetInnerHTML={{ __html: f.description }}
                          ></div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="nothing-to-see">Nothing to see here</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div> */}
    </>
  );
}
