"use client";

import { useEffect, useState } from "react";
import Loading from "../home/loading";
import Error from "../error";
import Link from "next/link";
import Apply from "../view/recruitment/[id]/apply";

export default function DataFetch({ email }) {
  const [loading, setLoading] = useState(true);
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
      setError(false);
      setData(fetchedData.data);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetcher();
  }, []);
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
                  <div className="recruitment-box-body">
                    <p
                      dangerouslySetInnerHTML={{
                        __html: `<p><b>Duration</b>: ${
                          e.duration || "No Duration Provided"
                        }</p><p><b>Location</b>: ${
                          e.location || "No Location Provided"
                        }</p>
                          ${
                            e.description &&
                            e.description.slice(0, 300) + "......"
                          }`,
                      }}
                    ></p>
                    {e.link && (
                      <a className="recruitment-box-website" href={e.link}>
                        Company site link
                      </a>
                    )}
                  </div>
                  <div className="recruitment-box-footer">
                    <Apply
                      recruitment={e._id}
                      user={email}
                      applicants={e.applicants}
                    ></Apply>
                    <Link href={`/view/recruitment/${e._id}`}>
                      <button>Read More</button>
                    </Link>
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
