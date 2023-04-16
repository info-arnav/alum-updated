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
                <div>
                  <button onClick={() => {}}>Delete</button>
                  <button>Edit</button>
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
