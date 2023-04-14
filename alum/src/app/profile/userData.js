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
          {userData.occupation.map((e) => {
            return <div key={e.index}>Some occupation Data</div>;
          })}
          <br></br>
          {userData.education.map((e) => {
            return <div key={e.index}>Some Educational Data</div>;
          })}
          {userData.projects.map((e) => {
            return <div key={e.index}>Some projects Data</div>;
          })}
          {userData.honors.map((e) => {
            return <div key={e.index}>Some honors Data</div>;
          })}
          {userData.applications.map((e) => {
            return <div key={e.index}>Some applications Data</div>;
          })}
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
