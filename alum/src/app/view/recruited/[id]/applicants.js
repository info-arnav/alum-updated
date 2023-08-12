"use client";

import Loading from "@/app/home/loading";
import { useEffect, useState } from "react";
import Recruit_Table from "./Recruit_Table";

export default function Applicants({ email, id }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [subLoading, setSubLoading] = useState(false);
  const fetcher = async () => {
    const tempData = await fetch(`/api/get-recruiteds-status`, {
      method: "POST",
      body: JSON.stringify({
        _id: id,
        auth_email: email,
      }),
      cache: "no-cache",
    }).then((e) => e.json());
    let updatedData =
      tempData.data.data.recruiteds[0].applicants == null
        ? []
        : tempData.data.data.recruiteds[0].applicants;
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
          <form>
            <Recruit_Table />
          </form>

          <table>
            {data ? (
              data.map((e) => {
                return (
                  <div key={e}>
                    <tr>
                      <td>
                        <div key={e}>{e}</div>
                      </td>
                    </tr>
                  </div>
                );
              })
            ) : (
              <div>No Applicants</div>
            )}
          </table>
        </>
      )}
    </>
  );
}
