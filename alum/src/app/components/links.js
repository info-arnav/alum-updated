"use client";

import Link from "next/link";
import { useState } from "react";
import Logout from "../logout";

export default function Links({ links, path, logout }) {
  const [show, setShow] = useState(false);
  let action = () => {
    if (!show) {
      document.querySelector("body").classList.add("preventScroll");
    } else {
      document.querySelector("body").classList.remove("preventScroll");
    }
    setShow(!show);
  };
  return (
    <>
      <div className="nav-links">
        {links.map((e) => {
          return (
            <div
              key={e[0].toLowerCase()}
              className={`nav-sub-links ${
                e[1].toLowerCase() == path.toLowerCase() && "active"
              }`}
            >
              <Link href={e[1].toLowerCase()}>{e[0]}</Link>
            </div>
          );
        })}
        {logout && (
          <div className={`nav-sub-links`} onClick={Logout}>
            <a>Logout</a>
          </div>
        )}
      </div>
      <div className="nav-small" onClick={action}>
        {!show ? (
          <svg viewBox="0 0 100 50" width="29" height="29" onClick={action}>
            <rect width="80" height="12" rx="10"></rect>
            <rect y="20" width="80" height="12" rx="10"></rect>
            <rect y="40" width="80" height="12" rx="10"></rect>
          </svg>
        ) : (
          <svg
            style={{ width: 30 }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            onClick={action}
            id="cross"
          >
            <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"></path>
          </svg>
        )}
      </div>
      <div className="nav-mobile-view">
        <div
          className="block"
          style={{
            height: show ? "100%" : "0px",
            transition: "height 0.5s",
          }}
        >
          <div className="items">
            {links.map((e) => {
              return (
                <a key={e[0].toLowerCase()} href={e[1].toLowerCase()}>
                  {e[0]}
                </a>
              );
            })}
            {logout && <a onClick={Logout}>Logout</a>}
          </div>
          <div className="footer"></div>
        </div>
      </div>
    </>
  );
}
