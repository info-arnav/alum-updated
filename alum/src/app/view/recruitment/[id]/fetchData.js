"use client";

import Error from "@/app/error";
import Loading from "@/app/home/loading";
import { useEffect, useState } from "react";

export default function FetchData({ data, id }) {
  const [fetchedData, setFetchedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const getData = async () => {
    try {
      const res = await fetch(`/api/find-recruitments`, {
        method: "POST",
        body: JSON.stringify({
          auth_email: data.data.email,
          _id: id,
        }),
        cache: "no-cache",
      }).then((e) => e.json());
      setFetchedData(res.data[0]);
      setError(false);
      setLoading(false);
    } catch {
      setError(true);
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      {loading ? (
        <Loading></Loading>
      ) : error ? (
        <Error></Error>
      ) : (
        <>{fetchedData.title}</>
      )}
    </>
  );
}
