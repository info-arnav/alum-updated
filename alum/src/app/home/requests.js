"use client";

import { useEffect, useState } from "react";
import Error from "../error";
import Loading from "./loading";

export default function Requests({ status }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState("");
  const [error, setError] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const process = async (type, position, second_email) => {
    let temproryData = data;
    temproryData.splice(position, 1);
    await fetch(`/api/requests-action`, {
      method: "POST",
      body: JSON.stringify({
        email: status.data.email,
        second_email: second_email,
        verified: type == "approve" ? "true" : "false",
        error:
          type == "approve"
            ? ""
            : "Your profile was rejected. Please upload new files for verification.",
      }),
      cache: "no-cache",
    }).then((e) => e.json());
    setData(temproryData);
    setRefresh(!refresh);
  };
  const fetchRequests = async () => {
    const res = await fetch(`/api/requests`, {
      method: "POST",
      body: JSON.stringify({
        email: status.data.email,
      }),
      cache: "no-cache",
    }).then((e) => e.json());
    if (res.error) {
      setError(true);
      setLoading(false);
    } else {
      setError(false);
      setData(res.data);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchRequests();
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
              <div key={data.indexOf(e)}>
                {e.email}
                <button
                  onClick={() => {
                    process("approve", data.indexOf(e), e.email);
                  }}
                >
                  Approve
                </button>
                <button
                  onClick={() => {
                    process("reject", data.indexOf(e), e.email);
                  }}
                >
                  Reject
                </button>
              </div>
            );
          })}
        </>
      )}
    </>
  );
}
