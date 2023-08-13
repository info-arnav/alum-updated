"use client";

import Delete from "./delete";
import Modal from "./modal";

export default function Portfolio({
  data,
  email,
  setRefresh,
  refresh,
  setData,
}) {
  return (
    <div className="profile-right w-full">
      {[
        [data.occupation, "Work Experience", "occupation"],
        [data.education, "Education", "education"],
        [data.projects, "Projects", "projects"],
        [data.honors, "Honors", "honors"],
      ].map((e) => {
        return (
          <div
            key={e[1]}
            className="category rounded-xl bg-white p-4 my-4 border-2 border-[#868686] mx-auto"
          >
            <hr></hr>
            <div className="main-category-header">
              {e[1]}
              <div className="header-buttons">
                <Modal
                  email={email}
                  data={data}
                  setRefresh={setRefresh}
                  refresh={refresh}
                  type={e[2]}
                  edit={false}
                  setData={setData}
                ></Modal>
              </div>
            </div>
            <hr></hr>
            {e[0].length > 0 ? (
              e[0].map((f) => {
                return (
                  <div key={e[0].indexOf(f)} className="category-details my-4">
                    <div className="category-header">
                      {f.title}
                      <div className="header-buttons">
                        {" "}
                        <Delete
                          position={e[0].indexOf(f)}
                          type={e[2]}
                          data={data}
                          refresh={refresh}
                          setRefresh={setRefresh}
                          setData={setData}
                          email={email}
                        ></Delete>
                        <Modal
                          email={email}
                          data={data}
                          setRefresh={setRefresh}
                          refresh={refresh}
                          type={e[2]}
                          edit={true}
                          location={e[0].indexOf(f)}
                          setData={setData}
                        ></Modal>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <div className="category-subheader">{f.subTitle}</div>
                      {f.duration && <div className="category-space">|</div>}
                      <div className="category-sub-subheader">{f.duration}</div>
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
  );
}
