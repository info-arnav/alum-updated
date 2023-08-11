"use client";

import Loading from "@/app/home/loading";
import { useEffect, useState } from "react";
import Recruit_Table from "./Recruit_Table";

export default function Applicants({ email, id }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [subLoading, setSubLoading] = useState(false);
  let recruitsArray = [];
  let otherArray = [];
  const onSubmit = async () => {
    setError(false);
    setSubLoading(true);
    let name, position;
    const res = await fetch(`/api/get-post-meta-data`, {
      method: "POST",
      body: JSON.stringify({
        id: id,
      }),
      cache: "no-cache",
    }).then((e) => e.json());
    position = res.data.title;
    name = res.data.company;
    await fetch(`/api/recruitment-close`, {
      method: "POST",
      body: JSON.stringify({
        _id: id,
        auth_email: email,
        emails: otherArray,
        recruited: recruitsArray,
        company: name,
        position: position,
      }),
      cache: "no-cache",
    })
      .then((e) => e.json())
      .then((e) => {
        if (e.error) {
          setError(true);
          setSubLoading(false);
        } else {
          location.replace("/recruitment");
          setError(false);
          setSubLoading(false);
        }
      });
  };
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
    otherArray = updatedData;
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

          {/* <form>
            <table>
              {data ? (
                data.map((e) => {
                  return (
                    <>
                      <tr>
                        <td>
                          <input
                            type="checkbox"
                            onChange={(f) => {
                              if (f.target.checked) {
                                recruitsArray.push(e);
                                otherArray.splice(recruitsArray.indexOf(e), 1);
                              } else {
                                recruitsArray.splice(
                                  recruitsArray.indexOf(e),
                                  1
                                );
                                otherArray.push(e);
                              }
                            }}
                          />
                        </td>
                        <td>
                          <div key={e}>{e}</div>
                        </td>
                      </tr>
                    </>
                  );
                })
              ) : (
                <div>No Applicants</div>
              )}
            </table>
          </form> */}
          {error && "Some error occured"}
          <button
            className="text-white m-4 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            onClick={onSubmit}
            disabled={subLoading}
          >
            {subLoading ? "Processing..." : "Recruit"}
          </button>
        </>
      )}
    </>
  );
}
