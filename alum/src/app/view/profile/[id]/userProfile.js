"use client";

import Error from "@/app/error";
import Loading from "@/app/home/loading";
import { useEffect, useState } from "react";

export default function UserProfile({ id, link, data }) {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    const getDoc = async () => {
      const res = await fetch(`/api/get-user-info`, {
        method: "POST",
        body: JSON.stringify({
          auth_email: data.data.email,
          id: id,
        }),
        cache: "no-cache",
      }).then((e) => e.json());
      if (res.error) {
        setError(true);
        setLoading(false);
      } else {
        [
          [res.data.education, "education"],
          [res.data.occupation, "occupation"],
          [res.data.projects, "projects"],
          [res.data.honors, "honors"],
          [res.data.applications, "applications"],
        ].forEach((e) => {
          try {
            res.data[e[1]] = JSON.parse(e[0]);
          } catch {
            res.data[e[1]] = [];
          }
        });
        setUserData(res.data);
        setLoading(false);
      }
    };
    getDoc();
  }, []);
  return (
    <>
      {loading ? (
        <Loading></Loading>
      ) : error ? (
        <Error></Error>
      ) : (
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
      )}
    </>
  );
}
