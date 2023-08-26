"use client";

import { useState } from "react";
import Loading from "../home/loading";

export default function MongoSearch({ keys, setShow, data, link }) {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const search = () => {
    setLoading(true);
  };
  return (
    <div>
      <div
        className="flex flex-row justify-center"
        style={{ alignItems: "center", justifyContent: "center" }}
      >
        <input
          className="searchbar"
          style={{ marginRight: 5 }}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search..."
        ></input>
        <button
          style={{ marginRight: 65, marginBottom: "20px" }}
          onClick={search}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />{" "}
          </svg>
        </button>
        <button
          className="form-close"
          onClick={(e) => {
            document.querySelector("body").classList.remove("no-scroll");
            setShow(false);
          }}
        >
          X
        </button>
      </div>
      {loading ? <Loading></Loading> : ""}
    </div>
  );
}
