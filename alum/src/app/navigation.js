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
                <div className=" text-lg font-semibold">{hit.name}</div>
                <div className=" md:mr-8 text-white bg-[#1976D2] px-2 rounded-md text-center h-[70%]">
                  {hit.batch}
                </div>
              </div>
              <div
                className="text-sm font-extralight"
                dangerouslySetInnerHTML={{ __html: hit.bio }}
              ></div>
            </div>
          </div>
        </a>
      </div>
    );
  }

  return (
    <nav>
      <a href="/" className="nav-image-link">
        <Image
          className="logo"
          src="/logo.png"
          width={40}
          height={40}
          alt="Logo of the Alum portal"
        ></Image>
      </a>
      <a href="/">
        <div className="nav-title">Alum</div>
      </a>
      {data.loggedIn && data.data.verified ? (
        value ? (
          <div className="absolute bg-black/[.54] flex-col justify-center w-full h-[100vh] top-[60px] ">
            <div className="card overflow-y-auto rounded-lg border-2 border-black relative w-[90%] md:w-[50%] h-[80%] mx-auto bg-white py-4">
              <InstantSearch searchClient={searchClient} indexName="dev_alum">
                <div className="flex flex-row justify-center">
                  <SearchBox searchAsYouType={true} />
                  <button
                    className="form-close"
                    onClick={(e) => setValue(false)}
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
          <button onClick={(e) => setValue(true)}>Search</button>
        )
      ) : (
        <input placeholder="login to search" disabled></input>
      )}
      {data.loggedIn ? (
        data.data.verified ? (
          data.data.type == "student" ? (
            <Student path={path}></Student>
          ) : data.data.type == "alumni" ? (
            <Alumni path={path}></Alumni>
          ) : (
            <Admin path={path}></Admin>
          )
        ) : (
          <Pending path={path}></Pending>
        )
      ) : (
        <LoggedOut path={path}></LoggedOut>
      )}
    </nav>
  );
}
