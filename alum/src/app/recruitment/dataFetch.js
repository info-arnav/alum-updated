"use client";

import { useEffect, useState } from "react";
import Modal from "./components/modal";
import Loading from "../home/loading";
import Error from "../error";
import Delete from "./components/delete";

export default function DataFetch({ email }) {
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState("");
  const fetcher = async () => {
    const fetchedData = await fetch("/api/find-recruitments", {
      method: "POST",
      body: JSON.stringify({
        email: email,
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
          <Modal
            type="new"
            mainData={data}
            email={email}
            updater={setData}
            refresh={refresh}
            update={setRefresh}
          ></Modal>
          {data.map((e) => {
            return (
              <div key={e._id}>
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
                {e.title}, {e.description}
                <br></br>
              </div>
            );
          })}
        </>
      )}
    </>
  );
}
