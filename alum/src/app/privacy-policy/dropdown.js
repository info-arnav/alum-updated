"use client";

import { useState } from "react";
export default function Dropdown({ title, content, index }) {
  const [show, setShow] = useState(false);
  return (
    <>
      <hr></hr>
      <div className="dropdown-header" onClick={(e) => setShow(!show)}>
        <div className="dropdown-title">{title}</div>
        <div className="dropdown-icons">
          <div
            className="dropdown-sign"
            style={{
              transform: show
                ? "translateX(0%) translateY(0%) rotate(-45deg)"
                : "rotate(0deg)",
            }}
          >
            +
          </div>
        </div>
      </div>
      <div
        className="dropdown-content"
        style={{
          height: !show ? "0px" : `100%`,
        }}
      >
        <div
          id={`height-dropdown-${index}`}
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
      </div>
    </>
  );
}
