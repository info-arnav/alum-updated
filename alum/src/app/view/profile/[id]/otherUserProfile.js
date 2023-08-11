"use client";

export default function OtherUserProfile({ id, link, userData }) {
  return (
    <>
      <div className="profile-page">
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
