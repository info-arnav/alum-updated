"use client";

import Modal from "./modal";

export default function Portfolio({ data, email, setRefresh, refresh }) {
  return (
    <>
      {[
        [data.occupation, "occupation"],
        [data.education, "education"],
        [data.projects, "projects"],
        [data.honors, "honors"],
        [data.applications, "applications"],
      ].map((e) => {
        return (
          <div key={e[1]}>
            <Modal
              email={email}
              data={data}
              setRefresh={setRefresh}
              refresh={refresh}
              type={[e[1]]}
              edit={false}
            ></Modal>
            {e[0].map((f) => {
              return (
                <div key={e[0].indexOf(f)}>
                  <button onClick={() => {}}>Delete</button>
                  <Modal
                    email={email}
                    data={data}
                    setRefresh={setRefresh}
                    refresh={refresh}
                    type={[e[1]]}
                    edit={true}
                    location={e[0].indexOf(f)}
                  ></Modal>
                  {f.position}
                </div>
              );
            })}
          </div>
        );
      })}
    </>
  );
}
