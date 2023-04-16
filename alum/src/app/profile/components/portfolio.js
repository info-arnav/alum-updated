"use client";

import { useEffect, useState } from "react";
import Occupation from "./occupation";

export default function Portfolio({ data, email, setRefresh, refresh }) {
  const [showOccupation, setShowOccupation] = useState(false);
  const handleSubmit = async () => {};
  useEffect(() => {}, [showOccupation]);
  return (
    <>
      <button onClick={() => setShowOccupation(true)}>Add new</button>
      {showOccupation && (
        <Occupation
          email={email}
          data={data}
          setRefresh={setRefresh}
          refresh={refresh}
          show={setShowOccupation}
        ></Occupation>
      )}
      {[
        [data.occupation, "occupation"],
        [data.education, "education"],
        [data.projects, "projects"],
        [data.honors, "honors"],
        [data.applications, "applications"],
      ].map((e) => {
        return (
          <div key={e[1]}>
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
