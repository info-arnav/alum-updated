"use client";

import UserProfile from "@/app/profile/userProfile";
import OtherUserProfile from "./otherUserProfile";
import { useEffect, useState } from "react";
import Loading from "@/app/home/loading";
import Error from "@/app/error";

export default function Check({ id, link, data }) {
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
        setError(false);
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
      ) : userData.email == data.data.email ? (
        <UserProfile data={data} link={link}></UserProfile>
      ) : (
        <OtherUserProfile
          id={id}
          link={link}
          userData={userData}
        ></OtherUserProfile>
      )}
    </>
  );
}
