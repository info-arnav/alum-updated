"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import Admin from "./components/admin";
import Alumni from "./components/alumni";
import LoggedOut from "./components/logged-out";
import Pending from "./components/pending";
import Student from "./components/student";
import algoliasearch from "algoliasearch/lite";
import { Hits, InstantSearch, SearchBox } from "react-instantsearch";
import { useState } from "react";

export default function Navigation({ data, keys, LINK }) {
  const searchClient = algoliasearch(keys[0], keys[1]);
  const [value, setValue] = useState("");
  let path = usePathname().toLowerCase();

  function Hit({ hit }) {
    console.log(hit);
    return (
      <div classname="w-full ">
        <a href={`${LINK}/view/profile/${hit.objectID}`}>
          <div className="flex flex-row  border-b-2  border-blue-900  mx-1 bg-[#F5F4FB] items-center p-2 ">
            {/* p-2 md:px-4 md:py-2 */}
            <div className="mr-4">
              <img
                className="w-[60px] h-[60px] rounded-full"
                src={`${LINK}/api/image/${hit.objectID}`}
              ></img>
            </div>

            <div className="flex flex-col w-full">
              <div className="flex justify-between">
                <div className=" text-lg font-semibold">
                  {hit.name || "No Name"}
                </div>
                <div className=" md:mr-8 text-white bg-[#1976D2] px-2 rounded-md text-center h-[70%]">
                  {hit.batch || "-"}
                </div>
              </div>
              <div className="text-sm font-extralight">
                {hit.bio || "No bio provided"}
              </div>
            </div>
          </div>
        </a>
      </div>
    );
  }

  return (
    <nav>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <a href="/" className="nav-image-link">
          <Image
            className="logo"
            src="/logo.png"
            width={40}
            height={40}
            style={{ minHeight: 40, minWidth: 40 }}
            alt="Logo of the Alum portal"
          ></Image>
        </a>
        <a href="/">
          <div className="nav-title" style={{ marginLeft: 15 }}>
            Alum
          </div>
        </a>
      </div>
      {data.loggedIn && data.data.verified && (
        <div
          style={{
            alignItems: "right",
            width: "100%",
            textAlign: "right",
            marginRight: 10,
          }}
        >
          <button
            onClick={(e) => {
              document.querySelector("body").classList.add("no-scroll");
              setValue(true);
            }}
          >
            🔍
          </button>
        </div>
      )}
      {data.loggedIn && data.data.verified ? (
        value ? (
          <div className="absolute bg-black/[.54] flex-col justify-center w-full h-[100vh] top-[60px] ">
            <div
              style={{ marginTop: 10 }}
              className="card overflow-y-auto rounded-lg border-2 border-black relative w-[calc(100%-20px)] h-[calc(100%-80px)] mx-auto bg-white py-4"
            >
              <InstantSearch searchClient={searchClient} indexName="dev_alum">
                <div className="flex flex-row justify-center">
                  <SearchBox searchAsYouType={true} placeholder="Search..." />
                  <button
                    className="form-close"
                    onClick={(e) => {
                      document
                        .querySelector("body")
                        .classList.remove("no-scroll");
                      setValue(false);
                    }}
                  >
                    X
                  </button>
                </div>
                {/* <div className="w-[100%] bg-blue-200"> */}
                <Hits hitComponent={Hit} />
                {/* </div> */}
                {/* <SearchPopup/> */}
              </InstantSearch>
            </div>
          </div>
        ) : (
          <></>
        )
      ) : (
        <></>
      )}
      {data.loggedIn ? (
        data.data.verified ? (
          data.data.type == "student" ? (
            <Student path={path} data={data.data} link={LINK}></Student>
          ) : data.data.type == "alumni" ? (
            <Alumni path={path} data={data.data} link={LINK}></Alumni>
          ) : (
            <Admin path={path} data={data.data} link={LINK}></Admin>
          )
        ) : (
          <Pending path={path} link={LINK}></Pending>
        )
      ) : (
        <LoggedOut path={path}></LoggedOut>
      )}
    </nav>
  );
}
