"use client";

import { useEffect, useState } from "react";
import Loading from "../home/loading";
import Error from "../error";
import Link from "next/link";

export default function DataFetch({ email }) {
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState("");
  const fetcher = async () => {
    const fetchedData = await fetch("/api/find-recruited-candidates", {
      method: "POST",
      body: JSON.stringify({
        auth_email: email,
        email: email,
      }),
    }).then((e) => e.json());
    if (data.error) {
      setError(true);
      setLoading(false);
    } else {
      setError(false);
      if (data != null) {
        setData(fetchedData.data);
      } else {
        setData([]);
      }
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
          <div className="recruitment-grid">
            {data.map((e) => {
              return (
                <div key={e._id} className="recruitment-box">
                  <div className="recruitment-box-header">
                    {e.title} at {e.company}
                  </div>

                  <div className="recruitment-box-footer sm:flex-row  flex-col">
                    <button
                      className="recuit-button"
                      onClick={(e) => document.getElementById("status").click()}
                    >
                      <Link href={`/view/recruited/${e._id}`} id="status">
                        Applicants
                      </Link>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
}
