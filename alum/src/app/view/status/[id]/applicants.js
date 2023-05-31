"use client";

import Loading from "@/app/home/loading";
import { useEffect, useState } from "react";

export default function Applicants({ email, id }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const fetcher = async () => {
    const tempData = await fetch(`/api/get-recruitment-status`, {
      method: "POST",
      body: JSON.stringify({
        _id: id,
        auth_email: email,
      }),
      cache: "no-cache",
    }).then((e) => e.json());
    let updatedData = tempData.data.data.recruitments[0].applicants;
    setData(updatedData);
    setLoading(false);
  };
  useEffect(() => {
    fetcher();
  }, []);
  return (
    <>
      {loading ? (
        <Loading></Loading>
      ) : (
        <>
          {data.map((e) => {
            return <div>{e}</div>;
          })}
        </>
      )}
    </>
  );
}
