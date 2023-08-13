"use client";

import Loading from "@/app/home/loading";
import { useEffect, useState } from "react";
import Table_Content from "./Table_Content";

export default function Applicants({ email, id }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [subLoading, setSubLoading] = useState(false);
  const [recruitsArray, setRecruitsArray] = useState([]);
  const [otherArray, setOtherArray] = useState([]);
  const onSubmit = async () => {
    setError(false);
    setSubLoading(true);
    let name, position;
    const res = await fetch(`/api/get-post-all-data`, {
      method: "POST",
      body: JSON.stringify({
        email: email,
      }),
      cache: "no-cache",
    }).then((e) => e.json());
    position = res.data.title;
    name = res.data.company;
    description = res.data.description;
    duration = res.data.duration;
    stipend = res.data.stipend;
    deadline = res.data.deadline;
    email = res.data.email;
    link = res.data.link;
    location = res.data.location;
    await fetch(`/api/recruitment-close`, {
      method: "POST",
      body: JSON.stringify({
        id: id,
        auth_email: email,
        emails: otherArray,
        recruited: recruitsArray,
        company: name,
        position: position,
        description: body.description,
        duration: body.duration,
        stipend: body.stipend,
        deadline: body.deadline,
        email: body.email,
        link: body.link,
        location: body.location,
      }),
      cache: "no-cache",
    })
      .then((e) => e.json())
      .then((e) => {
        if (e.error) {
          setError(true);
          setSubLoading(false);
        } else {
          location.replace(
            `/view/recruited/${e.id.data.insertOneRecruited._id}`
          );
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
    let updatedData =
      tempData.data.data.recruitments[0].applicants == null
        ? []
        : tempData.data.data.recruitments[0].applicants;
    setOtherArray([...updatedData]);
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
          <div className=" overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <tbody>
                {data ? (
                  data.map((e) => {
                    return (
                      <div key={e}>
                        <Table_Content
                          key={e}
                          info={{
                            email: e,
                            resume: async () => {
                              const res = await fetch(`/api/get-user-info`, {
                                method: "POST",
                                body: JSON.stringify({
                                  auth_email: email,
                                  email: e,
                                }),
                                cache: "no-cache",
                              }).then((e) => e.json());
                              console.log(res);
                            },
                          }}
                          recruitsArray={recruitsArray}
                          setRecruitsArray={setRecruitsArray}
                          otherArray={otherArray}
                          setOtherArray={setOtherArray}
                        />
                      </div>
                    );
                  })
                ) : (
                  <div>No Applicants</div>
                )}{" "}
              </tbody>
            </table>
          </div>
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
