"use client";

import { useState } from "react";
export default function Dropdown({ title, content }) {
  const [show, setShow] = useState(false);
  return (
    <>
      <hr></hr>
      <div className="dropdown-header" onClick={(e) => setShow(!show)}>
        <div className="dropdown-title">{title}</div>
        <div className="dropdown-icons">{show ? "x" : "+"}</div>
      </div>
      {show && (
        <div
          className="dropdown-content"
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
      )}
    </>
  );
}
