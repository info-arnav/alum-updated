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

export default function Navigation({ data, keys }) {
  const searchClient = algoliasearch(keys[0], keys[1]);
  const [value, setValue] = useState("");
  let path = usePathname().toLowerCase();
  function Hit({ hit }) {
    return <div>{hit.name}</div>;
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
          <>
            <InstantSearch searchClient={searchClient} indexName="dev_alum">
              <SearchBox searchAsYouType={true} />
              <Hits hitComponent={Hit} />
            </InstantSearch>
            <button onClick={(e) => setValue(false)}>Stop</button>
          </>
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
