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
    <>
      {[
        [data.occupation, "occupation"],
        [data.education, "education"],
        [data.projects, "projects"],
        [data.honors, "honors"],
      ].map((e) => {
        return (
          <div key={e[1]}>
            {e[1].toUpperCase()}
            <Modal
              email={email}
              data={data}
              setRefresh={setRefresh}
              refresh={refresh}
              type={e[1]}
              edit={false}
              setData={setData}
            ></Modal>
            {e[0].map((f) => {
              return (
                <div key={e[0].indexOf(f)}>
                  <Delete
                    position={e[0].indexOf(f)}
                    type={e[1]}
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
                    type={e[1]}
                    edit={true}
                    location={e[0].indexOf(f)}
                    setData={setData}
                  ></Modal>
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
