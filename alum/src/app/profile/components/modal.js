"use client";

import { useEffect, useState } from "react";
import arrayBuilder from "./arrayBuilder";
import EditPortfolio from "./editPortfolio";

export default function Modal({
  email,
  data,
  setRefresh,
  refresh,
  type,
  edit,
  location,
  setData,
}) {
  const [show, setShow] = useState(false);
  useEffect(() => {}, [show]);
  return (
    <>
      <button
        className="bg-[#00183F] border-2 text-white rounded-full w-10 h-10 font-bold text-2xl hover:bg-[#084a8d] grid content-center justify-center mx-2"
        onClick={() => {
          document.querySelector("body").classList.add("no-scroll");
          setShow(true);
        }}
      >
        {edit ? (
          <svg
            width="20px"
            height="20px"
            viewBox="0 0 23 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.1746 2.69339L2.53602 13.954C2.13432 14.3816 1.74558 15.2239 1.66783 15.807L1.18838 20.0054C1.01993 21.5215 2.10841 22.5581 3.61154 22.299L7.78405 21.5863C8.36716 21.4826 9.18352 21.055 9.58522 20.6144L20.2238 9.35384C22.0639 7.41013 22.8932 5.1943 20.0294 2.48606C17.1787 -0.196262 15.0147 0.749678 13.1746 2.69339Z"
              stroke="white"
              strokeWidth="1.45778"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          "+"
        )}
      </button>
      {show && (
        <EditPortfolio
          email={email}
          data={data}
          setRefresh={setRefresh}
          refresh={refresh}
          show={setShow}
          type={type}
          edit={edit}
          setData={setData}
          location={location}
          placeholder={arrayBuilder(type)}
        ></EditPortfolio>
      )}
    </>
  );
}
