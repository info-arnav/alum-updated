"use client";
import bg_nsut from "..//..//..//image/bgnsut.png";

export default function OtherUserProfile({ id, link, userData }) {
  return (
    <>
      <div className="relative profile-info flex flex-col w-full shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
        <div className="image w-full ">
          <Image className="w-full h-[280px]" src={bg_nsut} />
        </div>
        <div className=" relative flex flex-col md:flex-row w-full profile-block md:h-52 h-80 ">
          {/* <Profile
            data={userData}
            link={link}
            email={data.data.email}
          ></Profile> */}
        </div>
      </div>

      <div className="profile-page bg-red-100">
        <div className="profile-block">
          <img
            src={`${link}api/image/${id}`}
            width={200}
            height={200}
            alt="The profile picture"
            id="profile_image_refreshed"
          ></img>
          <p>{userData.name || "Name Not Provided"}</p>
          <p>{userData.email}</p>
          <p>{userData.batch || "Batch Not Provided"}</p>
          <p
            dangerouslySetInnerHTML={{
              __html: userData.bio || "Bio Not Provided",
            }}
          ></p>
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
      </div>
    </>
  );
}
