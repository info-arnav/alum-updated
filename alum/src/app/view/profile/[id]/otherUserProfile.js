"use client";

export default function OtherUserProfile({ id, link, userData }) {
  return (
    <>
      <img
        src={`${link}api/image/${id}`}
        width={100}
        height={100}
        alt="The profile picture"
        id="profile_image_refreshed"
      ></img>
      {userData.name || "Name Not Provided"}
      {userData.email}
      {userData.batch || "Batch Not Provided"}
      {userData.bio || "Bio Not Provided"}
      {[
        [userData.occupation, "occupation"],
        [userData.education, "education"],
        [userData.projects, "projects"],
        [userData.honors, "honors"],
      ].map((e) => {
        return (
          <div key={e[1]}>
            {e[1].toUpperCase()}
            {e[0].map((f) => {
              return (
                <div key={e[0].indexOf(f)}>
                  {f.title},{f.subTitle},{f.description},{f.duration}
                </div>
              );
            })}
          </div>
        );
      })}
    </>
  );
}
