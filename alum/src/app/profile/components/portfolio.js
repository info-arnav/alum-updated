"use client";

import { useEffect, useState } from "react";
import AddItem from "./addItem";
import Occupation from "./addItem";

export default function Portfolio({ data, email, setRefresh, refresh }) {
  const [showOccupation, setShowOccupation] = useState(false);
  const [showEducation, setShowEducation] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [showHonors, setShowHonors] = useState(false);
  const [showApplications, setShowApplications] = useState(false);
  useEffect(() => {}, [
    showOccupation,
    showEducation,
    showProjects,
    showHonors,
    showApplications,
  ]);
  return (
    <>
      {[
        [data.occupation, "occupation", setShowOccupation, showOccupation],
        [data.education, "education", setShowEducation, showEducation],
        [data.projects, "projects", setShowProjects, showProjects],
        [data.honors, "honors", setShowHonors, showHonors],
        [
          data.applications,
          "applications",
          setShowApplications,
          showApplications,
        ],
      ].map((e) => {
        return (
          <div key={e[1]}>
            <button onClick={() => e[2](true)}>Add new</button>
            {e[3] && (
              <AddItem
                email={email}
                data={data}
                setRefresh={setRefresh}
                refresh={refresh}
                show={e[2]}
                type={[e[1]]}
              ></AddItem>
            )}
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
