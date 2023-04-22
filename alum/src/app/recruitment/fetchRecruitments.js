"use client";

import { useEffect, useState } from "react";
import Modal from "./components/modal";
import Loading from "../home/loading";
import Error from "../error";
import Delete from "./components/delete";
import Link from "next/link";

export default function DataFetch({ email }) {
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState("");
  const fetcher = async () => {
    const fetchedData = await fetch("/api/find-recruitments", {
      method: "POST",
      body: JSON.stringify({
        auth_email: email,
      }),
    }).then((e) => e.json());
    if (data.error) {
      setError(true);
      setLoading(false);
    } else {
      setData(fetchedData.data);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetcher();
  }, [refresh]);
  return (
    <>
      {loading ? (
        <Loading></Loading>
      ) : error ? (
        <Error></Error>
      ) : (
        <>
          {data.map((e) => {
            return (
              <Link key={e._id} href={`/view/post/${e._id}`}>
                {e.title},{e.company}, {e.description}
              </Link>
            );
          })}
        </>
      )}
    </>
  );
}
