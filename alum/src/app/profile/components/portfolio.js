"use client";

import { useEffect, useState } from "react";
import Occupation from "./occupation";

export default function Portfolio({ data, email, setRefresh, refresh }) {
  const [showOccupation, setShowOccupation] = useState(false);
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
        [data.occupation],
        [data.education],
        [data.projects],
        [data.honors],
        [data.applications],
      ].map((e) => {
        return (
          <>
            {e[0].map((e) => {
              return (
                <div key={data.occupation.indexOf(e)}>
                  <button>Delete</button>
                  <button>Edit</button>
                  {e.position}
                </div>
              );
            })}
          </>
        );
      })}
    </>
  );
}
