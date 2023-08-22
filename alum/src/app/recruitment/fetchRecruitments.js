"use client";

import { useEffect, useState } from "react";
import Loading from "../home/loading";
import Error from "../error";
import Read from "./Read.js";

export default function DataFetch({ email }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState("");
  const [expanded_data, set_expanded_data] = useState({});
  const [refresh, setRefresh] = useState(true);
  const [selected_idx, set_selected_idx] = useState(-1);
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
  }, [refresh]);

  const ReadHandler = (e, idx) => {
    set_selected_idx((prev) => idx);
    set_expanded_data((prev) => {
      return e;
    });
  };
  const setProfiles = (applicants) => {
    data[selected_idx].applicants = applicants;
    setData(data);
    setRefresh(!refresh);
  };
  return (
    <>
      {loading ? (
        <Loading></Loading>
      ) : error ? (
        <Error></Error>
      ) : (
        <>
          <div className="xl:grid xl:grid-cols-5 xl:divide-x divide-y">
            <div
              className="recruitment-grid mb-[40px] col-span-2 overflow-x-scroll xl:overflow-x-hidden max-w-screen xl:overflow-y-scroll xl:h-[calc(100vh-80px)] xl:min-h-[400px] xl:block flex flex-row whitespace-nowrap xl:bg-white bg-[#f9f9f9]"
              style={{ marginBottom: 10 }}
            >
              {data.map((e, idx) => {
                if (
                  e.deadline == null ||
                  Math.round(
                    (new Date(e.deadline).getTime() - new Date().getTime()) /
                      (1000 * 3600 * 24)
                  ) >= 0
                ) {
                  return (
                    <div
                      onClick={() => ReadHandler(e, idx)}
                      key={e._id}
                      className={`recruitment-box m-[20px] xl:py-[20px] xl:px-[25px] p-[15px] rounded-[25px] w-[100%] xl:overflow-hidden border-2 xl:border-[#b8b8b8] border-[#797979] hover:border-[#00183F] xl:w-auto bg-[#ffffff] xl:bg-white 
                     ${idx == selected_idx && `border-2 border-black`}`}
                    >
                      <div className="recruitment-box-header">
                        {/* {e.title} at {e.company} */}
                        <img className="CompanyLogo"></img>
                        <div>
                          {/* <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png"
                          alt="compimage"></img> */}
                          <h1 className="font-bold text-2xl">{e.title}</h1>
                          <h5 className="text-[#878686]">{e.company}</h5>
                        </div>
                      </div>
                      <div className="recruitment-box-body flex justify-between">
                        {/* <p
                      dangerouslySetInnerHTML={{
                        __html: `<p></p><b>Duration</b>: ${
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
                    )} */}
                        {/* <div className=" text-center">
                        <svg
                          className="inline m-1"
                          width="16"
                          height="16"
                          viewBox="0 0 18 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 9.9999V6.43989C1 2.01989 4.13 0.209895 7.96 2.4199L11.05 4.1999L14.14 5.9799C17.97 8.1899 17.97 11.8099 14.14 14.0199L11.05 15.7999L7.96 17.5799C4.13 19.7899 1 17.9799 1 13.5599V9.9999Z"
                            stroke="#5B5B5B"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <p className="inline">Email</p> 
                        <p>{e.email || "No data"}</p>
                      </div> */}
                        <div className=" text-center">
                          <svg
                            className="inline m-1"
                            width="16"
                            height="16"
                            viewBox="0 0 18 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M1 9.9999V6.43989C1 2.01989 4.13 0.209895 7.96 2.4199L11.05 4.1999L14.14 5.9799C17.97 8.1899 17.97 11.8099 14.14 14.0199L11.05 15.7999L7.96 17.5799C4.13 19.7899 1 17.9799 1 13.5599V9.9999Z"
                              stroke="#5B5B5B"
                              strokeWidth="1.5"
                              strokeMiterlimit="10"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <p className="inline">Start Date</p>
                          <p className="text-[#878686]">
                            {e.deadline || "No data"}
                          </p>
                        </div>
                        <div className=" text-center">
                          <svg
                            className="inline m-1"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M8 1.99988V4.99988M16 1.99988V4.99988M3.5 9.08988H20.5M21 8.49988V16.9999C21 19.9999 19.5 21.9999 16 21.9999H8C4.5 21.9999 3 19.9999 3 16.9999V8.49988C3 5.49988 4.5 3.49988 8 3.49988H16C19.5 3.49988 21 5.49988 21 8.49988Z"
                              stroke="#5B5B5B"
                              strokeWidth="1.5"
                              strokeMiterlimit="10"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M15.695 13.6999H15.704M15.695 16.6999H15.704M11.995 13.6999H12.005M11.995 16.6999H12.005M8.29401 13.6999H8.30401M8.29401 16.6999H8.30401"
                              stroke="#5B5B5B"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <p className="inline">Duration</p>
                          <p className=" text-[#878686]">
                            {e.duration || "No Duration Provided"}
                          </p>
                        </div>
                        <div className="text-center">
                          <svg
                            className="inline m-1"
                            width="22"
                            height="18"
                            viewBox="0 0 22 19"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clipPath="url(#clip0_26_186)">
                              <path
                                d="M16 18.4999H6C3 18.4999 1 16.9999 1 13.4999V6.49988C1 2.99988 3 1.49988 6 1.49988H16C19 1.49988 21 2.99988 21 6.49988V13.4999C21 16.9999 19 18.4999 16 18.4999Z"
                                stroke="#5B5B5B"
                                strokeWidth="1.5"
                                strokeMiterlimit="10"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M18 4.99988H15M7 14.9999H4M11 12.9999C11.7956 12.9999 12.5587 12.6838 13.1213 12.1212C13.6839 11.5586 14 10.7955 14 9.99988C14 9.20423 13.6839 8.44117 13.1213 7.87856C12.5587 7.31595 11.7956 6.99988 11 6.99988C10.2044 6.99988 9.44129 7.31595 8.87868 7.87856C8.31607 8.44117 8 9.20423 8 9.99988C8 10.7955 8.31607 11.5586 8.87868 12.1212C9.44129 12.6838 10.2044 12.9999 11 12.9999Z"
                                stroke="#5B5B5B"
                                strokeWidth="1.5"
                                strokeMiterlimit="10"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_26_186">
                                <rect width="22" height="19" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>

                          <p className="inline">Stipend</p>
                          <p className=" text-[#878686]">
                            {e.stipend || "No data"}
                          </p>
                        </div>
                      </div>
                      {/* <div className="recruitment-box-footer">
                    <Apply
                      recruitment={e._id}
                      user={email}
                      applicants={e.applicants}
                    ></Apply>
                    <Link href={`/view/recruitment/${e._id}`}>
                      <button>Read More</button>
                    </Link>
                  </div> */}
                      <div className="grid grid-cols-2 divide-x w-[80%] mt-4 mb-2">
                        <div>
                          <svg
                            className="inline"
                            width="22"
                            height="22"
                            viewBox="0 0 22 22"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M15.97 13.4399C17.34 13.6699 18.85 13.4299 19.91 12.7199C21.32 11.7799 21.32 10.2399 19.91 9.29988C18.84 8.58988 17.31 8.34988 15.94 8.58988M6 13.4399C4.63 13.6699 3.12 13.4299 2.06 12.7199C0.650002 11.7799 0.650002 10.2399 2.06 9.29988C3.13 8.58988 4.66 8.34988 6.03 8.58988M17 6.15988C16.9371 6.14987 16.8729 6.14987 16.81 6.15988C16.1426 6.13574 15.5108 5.85309 15.048 5.37164C14.5852 4.89019 14.3277 4.24768 14.33 3.57988C14.33 2.14988 15.48 0.999878 16.91 0.999878C17.5943 0.999878 18.2505 1.2717 18.7343 1.75554C19.2182 2.23939 19.49 2.89562 19.49 3.57988C19.4882 4.24815 19.228 4.88983 18.7639 5.37069C18.2998 5.85155 17.6678 6.13433 17 6.15988ZM4.97 6.15988C5.03 6.14988 5.1 6.14988 5.16 6.15988C5.82737 6.13574 6.45921 5.85309 6.922 5.37164C7.38478 4.89019 7.64226 4.24768 7.64 3.57988C7.64 2.14988 6.49 0.999878 5.06 0.999878C4.37574 0.999878 3.71951 1.2717 3.23567 1.75554C2.75182 2.23939 2.48 2.89562 2.48 3.57988C2.49 4.97988 3.59 6.10988 4.97 6.15988ZM11 13.6299C10.9371 13.6199 10.8729 13.6199 10.81 13.6299C10.1426 13.6057 9.51079 13.3231 9.04801 12.8416C8.58522 12.3602 8.32775 11.7177 8.33 11.0499C8.33 9.61988 9.48 8.46988 10.91 8.46988C11.5943 8.46988 12.2505 8.7417 12.7343 9.22554C13.2182 9.70939 13.49 10.3656 13.49 11.0499C13.48 12.4499 12.38 13.5899 11 13.6299ZM8.09 16.7799C6.68 17.7199 6.68 19.2599 8.09 20.1999C9.69 21.2699 12.31 21.2699 13.91 20.1999C15.32 19.2599 15.32 17.7199 13.91 16.7799C12.32 15.7199 9.69 15.7199 8.09 16.7799Z"
                              stroke="#5B5B5B"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <p className="inline px-2">
                            {e.applicants ? e.applicants.length : 0} Applied
                          </p>
                        </div>
                        <div className=" px-2">
                          <svg
                            className="inline"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M10 4.99988V9.99988M18.75 10.2499C18.75 15.0799 14.83 18.9999 10 18.9999C5.17 18.9999 1.25 15.0799 1.25 10.2499C1.25 5.41988 5.17 1.49988 10 1.49988C14.83 1.49988 18.75 5.41988 18.75 10.2499Z"
                              stroke="#5B5B5B"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <p className="inline px-2">
                            {e.deadline
                              ? Math.round(
                                  (new Date(e.deadline).getTime() -
                                    new Date().getTime()) /
                                    (1000 * 3600 * 24)
                                )
                              : "Na"}{" "}
                            Days Left
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
            <div className="Description col-span-3">
              <Read
                info={expanded_data}
                email={email}
                profiles={
                  data[selected_idx]
                    ? data[selected_idx].applicants
                      ? data[selected_idx].applicants
                      : []
                    : []
                }
                setProfiles={setProfiles}
              ></Read>
            </div>
          </div>
        </>
      )}
    </>
  );
}
