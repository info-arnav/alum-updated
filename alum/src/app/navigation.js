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
      <div classname="w-full">
        <a href={`${LINK}/view/profile/${hit.objectID}`}>
          <div className="flex flex-row justify-between items-center p-2 md:px-4 md:py-2">
            <div>
              <img
                className="w-[50px] h-[50px]"
                src={`${LINK}/api/image/${hit.objectID}`}
              ></img>
            </div>
            <div>{hit.name}</div>
            <div>{hit.batch}</div>
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
          <div className="absolute bg-black/[.54] flex-col justify-center w-full h-[100vh] top-[60px] p-4  ">
            <div className="card relative w-[90%] md:w-[60%] h-[80%] mx-auto bg-white">
              <InstantSearch
                className="color-blue"
                searchClient={searchClient}
                indexName="dev_alum"
              >
                <div className="flex flex-row justify-center">
                  <SearchBox className="ml-5" searchAsYouType={true} />
                  <button onClick={(e) => setValue(false)}>Stop</button>
                </div>
                {/* <div className="flex  text-center w-[100%]"> */}
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
