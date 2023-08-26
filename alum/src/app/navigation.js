"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import Admin from "./components/admin";
import Alumni from "./components/alumni";
import LoggedOut from "./components/logged-out";
import Pending from "./components/pending";
import Student from "./components/student";
import { useState } from "react";
import Algolia from "./search/algolia";
import MongoSearch from "./search/mongo";

export default function Navigation({ data, keys, LINK }) {
  const [value, setValue] = useState("");
  let path = usePathname().toLowerCase();

  return (
    <>
      {" "}
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
              width={30}
              height={30}
              style={{ minHeight: 30, minWidth: 30 }}
              alt="Logo of the Nalum portal"
            ></Image>
          </a>
          <a href="/">
            <div className="nav-title" style={{ marginLeft: 15 }}>
              Nalum
            </div>
          </a>
        </div>
        {data.loggedIn && data.data.verified && (
          <div
            style={{
              alignItems: "right",
              marginLeft: 35,
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-search"
                viewBox="0 0 16 16"
              >
                {" "}
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />{" "}
              </svg>
            </button>
          </div>
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
      {data.loggedIn && data.data.verified ? (
        value ? (
          <div className="modal">
            {" "}
            <div
              style={{ marginBottom: 20, marginTop: 0 }}
              className="card overflow-y-auto rounded-lg border-2 border-black relative w-[calc(100%-20px)] mx-auto bg-white py-4 custom-search-height"
            >
              {/* <MongoSearch
                keys={keys}
                setShow={setValue}
                data={data}
                link={link}
              ></MongoSearch> */}
              <Algolia
                keys={keys}
                setShow={setValue}
                data={data}
                link={LINK}
              ></Algolia>
            </div>
          </div>
        ) : (
          <></>
        )
      ) : (
        <></>
      )}
    </>
  );
}
