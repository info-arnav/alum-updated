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
        email: email,
      }),
    }).then((e) => e.json());
    if (fetchedData.error) {
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
  }, [refresh]);
  return (
    <>
      {loading ? (
        <Loading></Loading>
      ) : error ? (
        <Error></Error>
      ) : (
        <>
          <div className="recruitment-new">
            <Modal
              type="new"
              mainData={data}
              email={email}
              updater={setData}
              refresh={refresh}
              update={setRefresh}
            ></Modal>
          </div>
          <div className="recruitment-grid">
            {data.map((e) => {
              return (
                <div
                  key={e._id}
                  className="recruitment-box bg-[#eef0f8] md:w-[90%] w-[96%] mx-auto my-4 p-2 rounded-2xl "
                >
                  <div className="recruitment-box-header text-xl text-blue-700">
                    {e.title} at {e.company} with {e.stipend} and{" "}
                    {Math.round(
                      (new Date(e.deadline).getTime() - new Date().getTime()) /
                        (1000 * 3600 * 24)
                    )}{" "}
                    Days Left
                  </div>
                  <div className="recruitment-box-body">
                    <p
                      className=" md:w-[95%]"
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
                  <div className="recruitment-box-footer sm:flex-row  flex-col">
                    <Link
                      href={`/view/status/${e._id}`}
                      id="status"
                      className="text-white"
                    >
                      Status
                    </Link>
                    <Modal
                      type="edit"
                      data={e}
                      mainData={data}
                      email={email}
                      updater={setData}
                      position={data.indexOf(e)}
                      refresh={refresh}
                      update={setRefresh}
                    ></Modal>
                    <Delete
                      updater={setData}
                      data={data}
                      position={data.indexOf(e)}
                      refresh={refresh}
                      update={setRefresh}
                      index={e._id}
                      email={email}
                    ></Delete>
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
