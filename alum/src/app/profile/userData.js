"use client";

import { useEffect, useState } from "react";
import EditProfile from "./editProfile";

export default function UserData({ data, link }) {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    const getDoc = async () => {
      const res = await fetch(`/api/get-user-info`, {
        method: "POST",
        body: JSON.stringify({
          email: data.data.email,
        }),
        cache: "no-cache",
      }).then((e) => e.json());
      if (res.error) {
        setError(true);
        setLoading(false);
      } else {
        try {
          res.data.education = JSON.parse(res.data.education);
        } catch {
          res.data.education = [];
        }
        try {
          res.data.occupation = JSON.parse(res.data.occupation);
        } catch {
          res.data.occupation = [];
        }
        try {
          res.data.projects = JSON.parse(res.data.projects);
        } catch {
          res.data.projects = [];
        }
        try {
          res.data.honors = JSON.parse(res.data.honors);
        } catch {
          res.data.honors = [];
        }
        try {
          res.data.applications = JSON.parse(res.data.applications);
        } catch {
          res.data.applications = [];
        }
        setUserData(res.data);
        setLoading(false);
        setLoading(false);
      }
    };
    getDoc();
  }, []);
  return (
    <>
      {loading ? (
        <>Loading....</>
      ) : (
        <>
          <img src={`${link}api/image/${data.data.email}`}></img>
          <br></br>
          {userData.name || "Name Not Provided"}
          <br></br>
          {data.data.email}
          <br></br>
          {userData.batch || "Batch Not Provided"}
          <br></br>
          {userData.bio || "Bio Not Provided"}
          <br></br>
          {userData.occupation.map((e) => (
            <>Some occupation Data</>
          ))}
          <br></br>
          {userData.education.map((e) => (
            <>Some Educational Data</>
          ))}
          {userData.projects.map((e) => (
            <>Some projects Data</>
          ))}
          {userData.honors.map((e) => (
            <>Some honors Data</>
          ))}
          {userData.applications.map((e) => (
            <>Some applications Data</>
          ))}
          <EditProfile
            data={UserData}
            link={link}
            email={data.data.email}
          ></EditProfile>
        </>
      )}
    </>
  );
}
